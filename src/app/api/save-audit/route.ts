import { NextResponse }
from "next/server"

import { supabase }
from "@/lib/supabase"

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json()

    const {
      totalMonthlySpend,
      estimatedMonthlySavings,
      estimatedAnnualSavings,
      optimizationScore,
      recommendations,
      perToolBreakdown,
    } = body

    const { data, error } =
      await supabase
        .from("audits")
        .insert([
          {
            total_monthly_spend:
              totalMonthlySpend,

            estimated_monthly_savings:
              estimatedMonthlySavings,

            estimated_annual_savings:
              estimatedAnnualSavings,

            optimization_score:
              optimizationScore,

            recommendations,

            per_tool_breakdown:
              perToolBreakdown,
          },
        ])
        .select()
        .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,

      id: data.id,
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