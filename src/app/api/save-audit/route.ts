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
      email,
      inputStack,
      auditResult,
      pricingSnapshot,
      summary,
    } = body

    const { data, error } =
      await supabase
        .from("audits")
        .insert([
          {
            email,

            input_stack:
              inputStack,

            audit_result:
              auditResult,

            pricing_snapshot:
              pricingSnapshot,

            summary,
            
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