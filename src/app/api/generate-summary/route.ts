import { NextResponse }
from "next/server"

import {
  generateSummary,
} from "@/lib/generate-summary"

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json()

    const summary =
      await generateSummary(
        body
      )

    return NextResponse.json({
      summary,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed to generate summary",
      },
      {
        status: 500,
      }
    )
  }
}