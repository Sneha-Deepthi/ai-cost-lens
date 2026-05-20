import { NextResponse } from "next/server"

import { supabase } from "@/lib/supabase"

import { PLAN_CATALOGUE } from "@/data/tools"

import { detectPricingChanges } from "@/lib/pricing/detect-pricing-changes"

import { generateReaudit } from "@/lib/reaudit/generate-reaudit"

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

    const updatedAudit =
        generateReaudit(
            audit.input_stack
        )

      if (changes.length > 0) {
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