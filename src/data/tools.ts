import {
  WorkflowType,
} from "@/types/audit"

export type UseCase = WorkflowType

export type PlanTier =
  | "individual"
  | "team"
  | "enterprise"
  | "premium_individual"

export interface PlanEntry {
  tool: string

  plan: string

  monthlyPerSeat: number

  annualPerSeat: number

  tier: PlanTier

  useCaseFit: UseCase[]

  nextCheaperPlanId: string | null
}

export const PLAN_CATALOGUE: Record<string, PlanEntry> = {
  // ── Cursor ──────────────────────────────────────────────────────────────────
  // Source: https://cursor.com/pricing  — verified May 2026
  cursor_hobby: {
    tool: "Cursor",
    plan: "Hobby",
    monthlyPerSeat: 0,
    annualPerSeat: 0,
    tier: "individual",
    useCaseFit: ["coding"],
    nextCheaperPlanId: null,
  },
  cursor_pro: {
    tool: "Cursor",
    plan: "Pro",
    monthlyPerSeat: 20,
    annualPerSeat: 20,
    tier: "individual",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "cursor_hobby",
  },
  cursor_teams: {
    tool: "Cursor",
    plan: "Teams",
    monthlyPerSeat: 40,
    annualPerSeat: 40,
    tier: "team",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "cursor_pro",
  },
  cursor_enterprise: {
    tool: "Cursor",
    plan: "Enterprise",
    monthlyPerSeat: 60, // custom pricing — conservative floor used
    annualPerSeat: 60,
    tier: "enterprise",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "cursor_teams",
  },

  // ── GitHub Copilot ──────────────────────────────────────────────────────────
  // Source: https://github.com/features/copilot/plans  — verified May 2026
  copilot_individual: {
    tool: "GitHub Copilot",
    plan: "Individual",
    monthlyPerSeat: 10,
    annualPerSeat: 10,
    tier: "individual",
    useCaseFit: ["coding"],
    nextCheaperPlanId: null,
  },
  copilot_business: {
    tool: "GitHub Copilot",
    plan: "Business",
    monthlyPerSeat: 19,
    annualPerSeat: 19,
    tier: "team",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "copilot_individual",
  },
  copilot_enterprise: {
    tool: "GitHub Copilot",
    plan: "Enterprise",
    monthlyPerSeat: 39,
    annualPerSeat: 39,
    tier: "enterprise",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "copilot_business",
  },

  // ── Claude ──────────────────────────────────────────────────────────────────
  // Source: https://claude.com/pricing  — verified May 2026
  claude_free: {
    tool: "Claude",
    plan: "Free",
    monthlyPerSeat: 0,
    annualPerSeat: 0,
    tier: "individual",
    useCaseFit: ["writing", "research", "mixed"],
    nextCheaperPlanId: null,
  },
  claude_pro: {
    tool: "Claude",
    plan: "Pro",
    monthlyPerSeat: 20,
    annualPerSeat: 17, // $17/mo billed annually
    tier: "individual",
    useCaseFit: ["writing", "research", "coding", "mixed"],
    nextCheaperPlanId: "claude_free",
  },
  claude_max: {
    tool: "Claude",
    plan: "Max",
    monthlyPerSeat: 100,
    annualPerSeat: 100,
    tier: "premium_individual",
    useCaseFit: ["writing", "research", "coding", "mixed"],
    nextCheaperPlanId: "claude_pro",
  },
  claude_team_standard: {
    tool: "Claude",
    plan: "Team (Standard)",
    monthlyPerSeat: 25,
    annualPerSeat: 20, // $20/seat/mo billed annually
    tier: "team",
    useCaseFit: ["writing", "research", "coding", "mixed"],
    nextCheaperPlanId: "claude_pro",
  },
  claude_team_premium: {
    tool: "Claude",
    plan: "Team (Premium)",
    monthlyPerSeat: 125,
    annualPerSeat: 100, // $100/seat/mo billed annually
    tier: "team",
    useCaseFit: ["writing", "research", "coding", "mixed"],
    nextCheaperPlanId: "claude_team_standard",
  },
  claude_enterprise: {
    tool: "Claude",
    plan: "Enterprise",
    monthlyPerSeat: 150, // custom pricing — conservative floor used
    annualPerSeat: 150,
    tier: "enterprise",
    useCaseFit: ["writing", "research", "coding", "mixed"],
    nextCheaperPlanId: "claude_team_standard",
  },
  claude_api: {
    tool: "Claude",
    plan: "API (Direct)",
    monthlyPerSeat: 0, // usage-based, not a fixed seat cost
    annualPerSeat: 0,
    tier: "individual",
    useCaseFit: ["coding", "mixed"],
    nextCheaperPlanId: null,
  },

  // ── ChatGPT ─────────────────────────────────────────────────────────────────
  // Source: https://chatgpt.com/pricing  — verified May 2026
  chatgpt_plus: {
    tool: "ChatGPT",
    plan: "Plus",
    monthlyPerSeat: 20,
    annualPerSeat: 20,
    tier: "individual",
    useCaseFit: ["writing", "research", "data", "mixed", "coding"],
    nextCheaperPlanId: null,
  },
  chatgpt_team: {
    tool: "ChatGPT",
    plan: "Team",
    monthlyPerSeat: 30,
    annualPerSeat: 25, // $25/user/mo billed annually
    tier: "team",
    useCaseFit: ["writing", "research", "data", "mixed", "coding"],
    nextCheaperPlanId: "chatgpt_plus",
  },
  chatgpt_enterprise: {
    tool: "ChatGPT",
    plan: "Enterprise",
    monthlyPerSeat: 60, // custom pricing — conservative floor used
    annualPerSeat: 60,
    tier: "enterprise",
    useCaseFit: ["writing", "research", "data", "mixed", "coding"],
    nextCheaperPlanId: "chatgpt_team",
  },
  chatgpt_api: {
    tool: "ChatGPT",
    plan: "API (Direct)",
    monthlyPerSeat: 0,
    annualPerSeat: 0,
    tier: "individual",
    useCaseFit: ["coding", "mixed"],
    nextCheaperPlanId: null,
  },

  // ── Gemini ──────────────────────────────────────────────────────────────────
  // Source: https://gemini.google/subscriptions/  — verified May 2026
  // Ultra price: $24,500/mo ≈ $295 USD — rounded to $300
  gemini_pro: {
    tool: "Gemini",
    plan: "Pro",
    monthlyPerSeat: 20,
    annualPerSeat: 20,
    tier: "individual",
    useCaseFit: ["writing", "research", "data", "mixed"],
    nextCheaperPlanId: null,
  },
  gemini_ultra: {
    tool: "Gemini",
    plan: "Ultra",
    monthlyPerSeat: 300,
    annualPerSeat: 300,
    tier: "premium_individual",
    useCaseFit: ["writing", "research", "data", "mixed"],
    nextCheaperPlanId: "gemini_pro",
  },
  gemini_api: {
    tool: "Gemini",
    plan: "API (Direct)",
    monthlyPerSeat: 0,
    annualPerSeat: 0,
    tier: "individual",
    useCaseFit: ["coding", "mixed"],
    nextCheaperPlanId: null,
  },

  // ── Windsurf ─────────────────────────────────────────────────────────────────
  // Source: https://windsurf.com/pricing  — verified May 2026
  windsurf_free: {
    tool: "Windsurf",
    plan: "Free",
    monthlyPerSeat: 0,
    annualPerSeat: 0,
    tier: "individual",
    useCaseFit: ["coding"],
    nextCheaperPlanId: null,
  },
  windsurf_pro: {
    tool: "Windsurf",
    plan: "Pro",
    monthlyPerSeat: 20,
    annualPerSeat: 20,
    tier: "individual",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "windsurf_free",
  },
  windsurf_teams: {
    tool: "Windsurf",
    plan: "Teams",
    monthlyPerSeat: 40,
    annualPerSeat: 40,
    tier: "team",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "windsurf_pro",
  },
  windsurf_max: {
    tool: "Windsurf",
    plan: "Max",
    monthlyPerSeat: 200,
    annualPerSeat: 200,
    tier: "premium_individual",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "windsurf_pro",
  },
  windsurf_enterprise: {
    tool: "Windsurf",
    plan: "Enterprise",
    monthlyPerSeat: 60, // custom pricing — conservative floor used
    annualPerSeat: 60,
    tier: "enterprise",
    useCaseFit: ["coding"],
    nextCheaperPlanId: "windsurf_teams",
  },

  // ── Lovable ──────────────────────────────────────────────────────────────────
  // Source: https://lovable.dev/pricing  — verified May 2026
  lovable_free: {
    tool: "Lovable",
    plan: "Free",
    monthlyPerSeat: 0,
    annualPerSeat: 0,
    tier: "individual",
    useCaseFit: ["coding", "mixed"],
    nextCheaperPlanId: null,
  },
  lovable_pro: {
    tool: "Lovable",
    plan: "Pro",
    monthlyPerSeat: 25,
    annualPerSeat: 25,
    tier: "individual",
    useCaseFit: ["coding", "mixed"],
    nextCheaperPlanId: "lovable_free",
  },
  lovable_business: {
    tool: "Lovable",
    plan: "Business",
    monthlyPerSeat: 50,
    annualPerSeat: 50,
    tier: "team",
    useCaseFit: ["coding", "mixed"],
    nextCheaperPlanId: "lovable_pro",
  },
};
