import { NextResponse }
from "next/server"

import { resend }
from "@/lib/resend"

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json()

    const { email, estimatedMonthlySavings} = body

    const credexMessage =
    estimatedMonthlySavings > 500
        ? `
        <p>
            Based on your audit results,
            Credex may reach out regarding
            high-impact optimization
            opportunities for your AI stack.
        </p>
        `
        : `
        <p>
            We'll notify you when new
            optimization opportunities
            apply to your AI tooling stack.
        </p>
        `

    await resend.emails.send({
      from:
        `AI Cost Lens <${process.env.MAIL_ID}>`,

      to: email,

      subject:
        "Your AI Audit Has Been Saved",

      html: `
        <h2>Audit Saved Successfully</h2>

        <p>
          Thanks for using AI Cost Lens.
        </p>

        ${credexMessage}
      `,
    })

    return NextResponse.json({
      success: true,
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