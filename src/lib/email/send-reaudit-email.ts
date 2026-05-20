import { resend } from "@/lib/resend"

type Props = {
  email: string

  auditId: string

  oldSavings: number

  newSavings: number

  delta: number
}

export async function sendReauditEmail({
  email,
  auditId,
  oldSavings,
  newSavings,
  delta,
}: Props) {
  const result =
  await resend.emails.send({
    from:
      "AI Cost Lens <onboarding@resend.dev>",

    to: email,

    subject:
      "Your AI audit has changed",

    html: `
      <div style="font-family:sans-serif;padding:24px;">
        <h1>AI Pricing Change Detected</h1>

        <p>
          One or more AI tools in your stack changed pricing.
        </p>

        <p>
          Previous estimated savings:
          <strong>$${oldSavings}/mo</strong>
        </p>

        <p>
          Updated estimated savings:
          <strong>$${newSavings}/mo</strong>
        </p>

        <p>
          Difference:
          <strong>$${delta}/mo</strong>
        </p>

        <a
          href="http://localhost:3000/audit/${auditId}"
          style="
            display:inline-block;
            margin-top:20px;
            padding:12px 20px;
            background:black;
            color:white;
            text-decoration:none;
            border-radius:8px;
          "
        >
          View Updated Audit
        </a>
      </div>
    `,
  })
  console.log(result)

  return result
}