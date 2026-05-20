import { PlanEntry } from "@/data/tools"

export type PricingChange = {
  planId: string

  tool: string

  plan: string

  oldPrice: number

  newPrice: number
}

export function detectPricingChanges(
  oldSnapshot: Record<string, PlanEntry>,
  currentPricing: Record<string, PlanEntry>
): PricingChange[] {
  const changes: PricingChange[] = []

  for (const [planId, oldPlan] of Object.entries(
    oldSnapshot
  )) {
    const currentPlan =
      currentPricing[planId]

    if (!currentPlan) {
      continue
    }

    if (
      oldPlan.monthlyPerSeat !==
      currentPlan.monthlyPerSeat
    ) {
      changes.push({
        planId,

        tool: currentPlan.tool,

        plan: currentPlan.plan,

        oldPrice:
          oldPlan.monthlyPerSeat,

        newPrice:
          currentPlan.monthlyPerSeat,
      })
    }
  }

  return changes
}