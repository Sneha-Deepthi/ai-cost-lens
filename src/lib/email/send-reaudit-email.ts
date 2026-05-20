import { resend } from "@/lib/resend"

type Notification = {
  auditId: string

  newAuditId: string

  changes: {
    tool: string

    plan: string

    oldPrice: number

    newPrice: number
  }[]

  oldSavings: number

  newSavings: number

  delta: number
}

type Props = {
  email: string

  notifications: Notification[]
}

export async function sendReauditEmail({
  email,
  notifications,
}: Props) {
  const auditsHtml =
    notifications
      .map((notification) => {
        const changesHtml =
          notification.changes
            .map(
              (change) => `
                <li>
                  <strong>
                    ${change.tool} ${change.plan}
                  </strong>
                  :
                  $${change.oldPrice}
                  → $${change.newPrice}
                </li>
              `
            )
            .join("")

        return `
          <div style="margin-bottom:32px;padding:24px;border:1px solid #e2e8f0;border-radius:16px;">
            <h2>
              AI Pricing Changes Detected
            </h2>

            <p>
              Previous Monthly Savings:
              <strong>
                $${notification.oldSavings}
              </strong>
            </p>

            <p>
              Updated Monthly Savings:
              <strong>
                $${notification.newSavings}
              </strong>
            </p>

            <p>
              Savings Delta:
              <strong>
                +$${notification.delta}
              </strong>
            </p>

            <h3>
              Pricing Changes
            </h3>

            <ul>
              ${changesHtml}
            </ul>

            <a
              href="https://aicostlens.vercel.app/audit/diff/${notification.auditId}/${notification.newAuditId}"
              style="
                display:inline-block;
                margin-top:16px;
                padding:12px 20px;
                background:black;
                color:white;
                text-decoration:none;
                border-radius:10px;
                font-weight:600;
              "
            >
              View Updated Recommendations
            </a>
          </div>
        `
      })
      .join("")

  const result =
    await resend.emails.send({
      from:
        "AI Cost Lens <onboarding@resend.dev>",

      to: email,

      subject:
        "Your AI Spend Audit Has Changed",

      html: `
        <div style="font-family:sans-serif;max-width:720px;margin:auto;padding:40px;">
          <h1>
            AI Tool Pricing Updates Detected
          </h1>

          <p>
            One or more tools in your AI stack changed pricing.
            We regenerated your audits automatically.
          </p>

          ${auditsHtml}
        </div>
      `,
    })

  console.log(result)

  return result
}