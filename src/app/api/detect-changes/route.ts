import { NextResponse } from "next/server"

import { supabase } from "@/lib/supabase"

import { PLAN_CATALOGUE } from "@/data/tools"

import { detectPricingChanges } from "@/lib/pricing/detect-pricing-changes"

import { generateReaudit } from "@/lib/reaudit/generate-reaudit"

import { sendReauditEmail } from "@/lib/email/send-reaudit-email"

export async function POST() {
  try {
    const { data: audits, error } =
      await supabase
        .from("audits")
        .select("*")
        .not("pricing_snapshot", "is", null)

    if (error) {
      throw error
    }

    const userNotifications:
        Record<
        string,
        {
            auditId: string

            newAuditId: string

            changes: any[]

            oldSavings: number

            newSavings: number

            delta: number
        }[]
        > = {}

    const affectedAudits = []

    for (const audit of audits) {
      if (!audit.pricing_snapshot) {
        continue
      }
      const changes =
        detectPricingChanges(
          audit.pricing_snapshot,
          PLAN_CATALOGUE
        )

      if (changes.length > 0) {
        const updatedAudit =
        generateReaudit(
            audit.input_stack
        )

        const {
        data: newAudit,
        error: insertError,
        } = await supabase
        .from("audits")
        .insert([
            {
            email: audit.email,

            input_stack:
                audit.input_stack,

            audit_result:
                updatedAudit,

            pricing_snapshot:
                PLAN_CATALOGUE,

            total_monthly_spend:
                updatedAudit.totalMonthlySpend,

            estimated_monthly_savings:
                updatedAudit.estimatedMonthlySavings,

            estimated_annual_savings:
                updatedAudit.estimatedAnnualSavings,

            optimization_score:
                updatedAudit.optimizationScore,

            recommendations:
                updatedAudit.recommendations,

            per_tool_breakdown:
                updatedAudit.perToolBreakdown,
            },
        ])
        .select()
        .single()

        if (insertError) {
        console.error(insertError)

        continue
        }

        if (!userNotifications[audit.email]) {
        userNotifications[audit.email] = []
        }

        userNotifications[audit.email].push({
        auditId: audit.id,

        newAuditId: newAudit.id,

        changes,

        oldSavings:
            audit.audit_result
            .estimatedMonthlySavings,

        newSavings:
            updatedAudit
            .estimatedMonthlySavings,

        delta:
            updatedAudit
            .estimatedMonthlySavings -
            audit.audit_result
            .estimatedMonthlySavings,
        })

        affectedAudits.push({
        auditId: audit.id,

        email: audit.email,

        changes,

        oldSavings:
            audit.audit_result
            .estimatedMonthlySavings,

        newSavings:
            updatedAudit
            .estimatedMonthlySavings,

        delta:
            updatedAudit
            .estimatedMonthlySavings -
            audit.audit_result
            .estimatedMonthlySavings,
        })
      }
    }

    for (const [
    email,
    notifications,
    ] of Object.entries(
    userNotifications
    )) {
    await sendReauditEmail({
        email,

        notifications,
    })
    }

    return NextResponse.json({
      success: true,

      affectedAudits,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    )
  }
}