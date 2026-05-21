import {
  PLAN_CATALOGUE,
  PlanEntry,
} from "@/data/tools"

export function getCurrentPricing(): Record<
  string,
  PlanEntry
> {
  return PLAN_CATALOGUE
}

export function createPricingSnapshot(): Record<
  string,
  PlanEntry
> {
  return structuredClone(
    PLAN_CATALOGUE
  )
}

export function getPlanById(
  id: string,
  pricingData: Record<
    string,
    PlanEntry
  > = PLAN_CATALOGUE
) {
  return pricingData[id] ?? null
}