import { toolPlans } from "@/data/tools"

import {
    AuditInput,
    AuditRecommendation,
    AuditResult,
} from "@/types/audit"

export function generateAudit(
    input: AuditInput
): AuditResult {
    const recommendations: AuditRecommendation[] = []

    let estimatedSavings = 0

  // -----------------------------------
  // Rule 1:
  // Small teams using team plans
  // -----------------------------------

    input.subscriptions.forEach((subscription) => {
        const tool = toolPlans.find(
            (tool) => tool.id === subscription.toolId
        )

        if (!tool) return

        if (
        input.teamSize <= 2 &&
        tool.usageType === "team"
        ) {
        const savings = Math.round(
            subscription.monthlySpend * 0.4
        )

        recommendations.push({
            title: `${tool.tool} ${tool.plan} may be unnecessary`,
            description:
            "Your team size is very small, so collaboration and governance features may be underutilized.",
            estimatedSavings: savings,
            severity: "medium",
        })

        estimatedSavings += savings
        }
    })

  // -----------------------------------
  // Rule 2:
  // Overlapping conversational AI tools
  // -----------------------------------

    const conversationalTools = input.subscriptions.filter(
        (subscription) =>
        subscription.toolId.includes("chatgpt") ||
        subscription.toolId.includes("claude") ||
        subscription.toolId.includes("gemini")
    )

  if (conversationalTools.length >= 3) {
    recommendations.push({
      title:
        "Potential overlap across conversational AI tools",

      description:
        "Your organization may have overlapping spend across multiple general-purpose AI assistants.",

      estimatedSavings: 3000,

      severity: "high",
    })

    estimatedSavings += 3000
  }

  // -----------------------------------
  // Rule 3:
  // Premium plans with moderate usage
  // -----------------------------------

  input.subscriptions.forEach((subscription) => {
    if (
      subscription.toolId.includes("max") ||
      subscription.toolId.includes("ultra")
    ) {
      const savings = Math.round(
        subscription.monthlySpend * 0.5
      )

      recommendations.push({
        title:
          "Premium AI tier may exceed operational needs",

        description:
          "Your current usage pattern may not require premium AI usage limits.",

        estimatedSavings: savings,

        severity: "medium",
      })

      estimatedSavings += savings
    }
  })

  // -----------------------------------
  // Rule 4:
  // Multiple coding assistants overlap
  // -----------------------------------

  const codingTools = input.subscriptions.filter(
    (subscription) =>
      subscription.toolId.includes("cursor") ||
      subscription.toolId.includes("copilot") ||
      subscription.toolId.includes("windsurf")
  )

  if (codingTools.length >= 2) {
    recommendations.push({
      title:
        "Multiple AI coding assistants detected",

      description:
        "Your organization may have overlapping engineering tooling across multiple AI coding assistants.",

      estimatedSavings: 2000,

      severity: "medium",
    })

    estimatedSavings += 2000
  }

  // -----------------------------------
  // Total spend calculation
  // -----------------------------------

  const totalMonthlySpend = input.subscriptions.reduce(
    (sum, subscription) =>
      sum + subscription.monthlySpend,
    0
  )

  return {
    totalMonthlySpend,

    estimatedMonthlySavings: estimatedSavings,

    recommendations,
  }
}