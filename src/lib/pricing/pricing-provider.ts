import { toolPlans, ToolPlan } from "@/data/tools";

export function getCurrentPricing(): ToolPlan[] {
  return toolPlans;
}

export function createPricingSnapshot(): ToolPlan[] {
  return structuredClone(toolPlans);
}

export function getPlanById(
  id: string,
  pricingData: ToolPlan[] = toolPlans
) {
  return pricingData.find((plan) => plan.id === id);
}