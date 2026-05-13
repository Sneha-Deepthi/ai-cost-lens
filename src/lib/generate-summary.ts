import OpenAI from "openai"

import {
    AuditResult,
} from "@/types/audit"

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
})

function buildFallbackSummary(
  audit: AuditResult
) {
  if (
    audit.isAlreadyOptimal
  ) {
    return `
Your AI tooling setup appears reasonably optimized based on the provided subscriptions and workflows.

Current opportunities for savings are limited, which suggests your organization is already making relatively efficient tooling decisions.

Continue periodically reviewing usage patterns, annual billing opportunities, and overlapping subscriptions as your team grows.
`
  }

  return `
Your organization may be overspending on AI tooling across overlapping subscriptions, premium plans, or governance-heavy tiers.

The audit identified approximately $${audit.estimatedMonthlySavings.toLocaleString()} in potential monthly savings, equivalent to roughly $${audit.estimatedAnnualSavings.toLocaleString()} annually.

Reviewing redundant tooling, plan downgrades, and billing optimizations could significantly improve operational efficiency.
`
}

export async function generateSummary(
  audit: AuditResult
) {
  try {
    const recommendations =
      audit.recommendations
        .slice(0, 5)
        .map(
          (
            recommendation
          ) =>
            `- ${recommendation.title}: ${recommendation.reasoning}`
        )
        .join("\n")

    const prompt = `
You are generating a concise executive audit summary for a startup reviewing its AI tooling spend.

Audit data:
- Total monthly spend: $${audit.totalMonthlySpend}
- Estimated monthly savings: $${audit.estimatedMonthlySavings}
- Estimated annual savings: $${audit.estimatedAnnualSavings}
- Optimization score: ${audit.optimizationScore}/100

Top recommendations:
${recommendations}

Requirements:
- Write approximately 100 words
- Professional but concise tone
- Sound financially credible
- Mention operational efficiency
- Do not exaggerate savings
- Avoid marketing language
- Make the summary feel tailored to the audit
`

    const response =
      await openai.chat.completions.create(
        {
          model: "gpt-4.1-mini",

          messages: [
            {
              role: "system",

              content:
                "You are an AI infrastructure financial analyst.",
            },

            {
              role: "user",

              content: prompt,
            },
          ],

          temperature: 0.5,
        }
      )

    return (
      response.choices[0]
        ?.message?.content ||
      buildFallbackSummary(
        audit
      )
    )
  } catch (error) {
    console.error(
      "Summary generation failed:",
      error
    )

    return buildFallbackSummary(
      audit
    )
  }
}