export type ToolPlan = {
  id: string

  tool: string

  vendor: string

  category:
    | "general-ai"
    | "coding-ai"
    | "app-builder"
    | "api"

  plan: string

  monthlyPrice: number | null

  pricingModel:
    | "subscription"
    | "usage-based"
    | "custom"

  bestFor: string[]

  strengths: string[]

  teamFeatures: boolean

  enterpriseFeatures: boolean

  usageType:
    | "individual"
    | "team"
    | "enterprise"
}

export const toolPlans: ToolPlan[] = [
  // =========================================================
  // ChatGPT
  // =========================================================

  {
    id: "chatgpt_plus",
    tool: "ChatGPT",
    vendor: "OpenAI",
    category: "general-ai",
    plan: "Plus",
    monthlyPrice: 20,
    pricingModel: "subscription",
    bestFor: [
      "writing",
      "research",
      "coding",
      "data",
      "mixed",
    ],
    strengths: [
      "reasoning",
      "multimodal workflows",
      "deep research",
      "data analysis",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "chatgpt_team",
    tool: "ChatGPT",
    vendor: "OpenAI",
    category: "general-ai",
    plan: "Team",
    monthlyPrice: 30,
    pricingModel: "subscription",
    bestFor: [
      "collaboration",
      "shared-workspace",
      "business-productivity",
    ],
    strengths: [
      "admin console",
      "shared projects",
      "analytics",
      "centralized billing",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
  },

  {
    id: "chatgpt_enterprise",
    tool: "ChatGPT",
    vendor: "OpenAI",
    category: "general-ai",
    plan: "Enterprise",
    monthlyPrice: null,
    pricingModel: "custom",
    bestFor: [
      "compliance",
      "governance",
      "large organizations",
    ],
    strengths: [
      "SCIM",
      "audit logs",
      "RBAC",
      "advanced governance",
    ],
    teamFeatures: true,
    enterpriseFeatures: true,
    usageType: "enterprise",
  },

  {
    id: "chatgpt_api",
    tool: "OpenAI API",
    vendor: "OpenAI",
    category: "api",
    plan: "API Direct",
    monthlyPrice: null,
    pricingModel: "usage-based",
    bestFor: [
      "automation",
      "ai-products",
      "agents",
    ],
    strengths: [
      "token-based scaling",
      "flexible integrations",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  // =========================================================
  // Claude
  // =========================================================

  {
    id: "claude_free",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Free",
    monthlyPrice: 0,
    pricingModel: "subscription",
    bestFor: [
      "casual usage",
      "evaluation",
    ],
    strengths: [
      "writing",
      "reasoning",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "claude_pro",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Pro",
    monthlyPrice: 20,
    pricingModel: "subscription",
    bestFor: [
      "writing",
      "research",
      "mixed",
    ],
    strengths: [
      "long-context reasoning",
      "documentation",
      "summarization",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "claude_max",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Max",
    monthlyPrice: 100,
    pricingModel: "subscription",
    bestFor: [
      "heavy-ai-usage",
      "advanced-productivity",
    ],
    strengths: [
      "priority access",
      "high usage limits",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "claude_team",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Team",
    monthlyPrice: 25,
    pricingModel: "subscription",
    bestFor: [
      "collaboration",
      "team-productivity",
    ],
    strengths: [
      "SSO",
      "shared projects",
      "centralized billing",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
  },

  {
    id: "claude_enterprise",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Enterprise",
    monthlyPrice: null,
    pricingModel: "custom",
    bestFor: [
      "compliance",
      "governance",
    ],
    strengths: [
      "SCIM",
      "audit logs",
      "admin controls",
    ],
    teamFeatures: true,
    enterpriseFeatures: true,
    usageType: "enterprise",
  },

  {
    id: "claude_api",
    tool: "Anthropic API",
    vendor: "Anthropic",
    category: "api",
    plan: "API Direct",
    monthlyPrice: null,
    pricingModel: "usage-based",
    bestFor: [
      "agents",
      "automation",
      "ai-products",
    ],
    strengths: [
      "model flexibility",
      "token-based scaling",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  // =========================================================
  // Cursor
  // =========================================================

  {
    id: "cursor_hobby",
    tool: "Cursor",
    vendor: "Cursor",
    category: "coding-ai",
    plan: "Hobby",
    monthlyPrice: 0,
    pricingModel: "subscription",
    bestFor: [
      "students",
      "evaluation",
    ],
    strengths: [
      "basic coding workflows",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "cursor_pro",
    tool: "Cursor",
    vendor: "Cursor",
    category: "coding-ai",
    plan: "Pro",
    monthlyPrice: 20,
    pricingModel: "subscription",
    bestFor: [
      "coding",
      "engineering",
    ],
    strengths: [
      "IDE-native AI",
      "developer productivity",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "cursor_teams",
    tool: "Cursor",
    vendor: "Cursor",
    category: "coding-ai",
    plan: "Teams",
    monthlyPrice: 40,
    pricingModel: "subscription",
    bestFor: [
      "engineering teams",
    ],
    strengths: [
      "RBAC",
      "SSO",
      "analytics",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
  },

  {
    id: "cursor_enterprise",
    tool: "Cursor",
    vendor: "Cursor",
    category: "coding-ai",
    plan: "Enterprise",
    monthlyPrice: null,
    pricingModel: "custom",
    bestFor: [
      "enterprise engineering",
    ],
    strengths: [
      "audit logs",
      "SCIM",
      "advanced governance",
    ],
    teamFeatures: true,
    enterpriseFeatures: true,
    usageType: "enterprise",
  },

  // =========================================================
  // GitHub Copilot
  // =========================================================

  {
    id: "copilot_individual",
    tool: "GitHub Copilot",
    vendor: "GitHub",
    category: "coding-ai",
    plan: "Individual",
    monthlyPrice: 10,
    pricingModel: "subscription",
    bestFor: [
      "solo developers",
    ],
    strengths: [
      "autocomplete",
      "IDE integration",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "copilot_business",
    tool: "GitHub Copilot",
    vendor: "GitHub",
    category: "coding-ai",
    plan: "Business",
    monthlyPrice: 19,
    pricingModel: "subscription",
    bestFor: [
      "engineering teams",
    ],
    strengths: [
      "policy controls",
      "centralized billing",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
  },

  {
    id: "copilot_enterprise",
    tool: "GitHub Copilot",
    vendor: "GitHub",
    category: "coding-ai",
    plan: "Enterprise",
    monthlyPrice: 39,
    pricingModel: "subscription",
    bestFor: [
      "enterprise engineering",
    ],
    strengths: [
      "audit controls",
      "enterprise security",
    ],
    teamFeatures: true,
    enterpriseFeatures: true,
    usageType: "enterprise",
  },

  // =========================================================
  // Gemini
  // =========================================================

  {
    id: "gemini_pro",
    tool: "Gemini",
    vendor: "Google",
    category: "general-ai",
    plan: "Pro",
    monthlyPrice: 20,
    pricingModel: "subscription",
    bestFor: [
      "research",
      "workspace productivity",
    ],
    strengths: [
      "workspace integration",
      "multimodal reasoning",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "gemini_ultra",
    tool: "Gemini",
    vendor: "Google",
    category: "general-ai",
    plan: "Ultra",
    monthlyPrice: 300,
    pricingModel: "subscription",
    bestFor: [
      "heavy AI usage",
      "advanced reasoning",
    ],
    strengths: [
      "premium multimodal workflows",
      "high usage limits",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "gemini_api",
    tool: "Gemini API",
    vendor: "Google",
    category: "api",
    plan: "API Direct",
    monthlyPrice: null,
    pricingModel: "usage-based",
    bestFor: [
      "automation",
      "multimodal applications",
    ],
    strengths: [
      "scalable infrastructure",
      "token-based pricing",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  // =========================================================
  // Windsurf
  // =========================================================

  {
    id: "windsurf_free",
    tool: "Windsurf",
    vendor: "Windsurf",
    category: "coding-ai",
    plan: "Free",
    monthlyPrice: 0,
    pricingModel: "subscription",
    bestFor: [
      "students",
      "evaluation",
    ],
    strengths: [
      "basic Cascade workflows",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "windsurf_pro",
    tool: "Windsurf",
    vendor: "Windsurf",
    category: "coding-ai",
    plan: "Pro",
    monthlyPrice: 20,
    pricingModel: "subscription",
    bestFor: [
      "daily development",
      "coding",
    ],
    strengths: [
      "multi-file editing",
      "agentic workflows",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "windsurf_teams",
    tool: "Windsurf",
    vendor: "Windsurf",
    category: "coding-ai",
    plan: "Teams",
    monthlyPrice: 40,
    pricingModel: "subscription",
    bestFor: [
      "engineering teams",
    ],
    strengths: [
      "team management",
      "shared workflows",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
  },

  {
    id: "windsurf_max",
    tool: "Windsurf",
    vendor: "Windsurf",
    category: "coding-ai",
    plan: "Max",
    monthlyPrice: 200,
    pricingModel: "subscription",
    bestFor: [
      "power users",
    ],
    strengths: [
      "highest usage limits",
      "premium workflows",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "windsurf_enterprise",
    tool: "Windsurf",
    vendor: "Windsurf",
    category: "coding-ai",
    plan: "Enterprise",
    monthlyPrice: null,
    pricingModel: "custom",
    bestFor: [
      "enterprise engineering",
    ],
    strengths: [
      "RBAC",
      "SSO",
      "governance",
    ],
    teamFeatures: true,
    enterpriseFeatures: true,
    usageType: "enterprise",
  },

  // =========================================================
  // Lovable
  // =========================================================

  {
    id: "lovable_free",
    tool: "Lovable",
    vendor: "Lovable",
    category: "app-builder",
    plan: "Free",
    monthlyPrice: 0,
    pricingModel: "subscription",
    bestFor: [
      "experimentation",
      "prototyping",
    ],
    strengths: [
      "basic app generation",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "lovable_pro",
    tool: "Lovable",
    vendor: "Lovable",
    category: "app-builder",
    plan: "Pro",
    monthlyPrice: 25,
    pricingModel: "subscription",
    bestFor: [
      "mvp development",
      "rapid prototyping",
    ],
    strengths: [
      "AI app generation",
      "Supabase integrations",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
  },

  {
    id: "lovable_business",
    tool: "Lovable",
    vendor: "Lovable",
    category: "app-builder",
    plan: "Business",
    monthlyPrice: 50,
    pricingModel: "subscription",
    bestFor: [
      "startup teams",
    ],
    strengths: [
      "shared workspaces",
      "SSO",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
  },

  {
    id: "lovable_enterprise",
    tool: "Lovable",
    vendor: "Lovable",
    category: "app-builder",
    plan: "Enterprise",
    monthlyPrice: null,
    pricingModel: "custom",
    bestFor: [
      "enterprise prototyping",
    ],
    strengths: [
      "governance",
      "volume scaling",
    ],
    teamFeatures: true,
    enterpriseFeatures: true,
    usageType: "enterprise",
  },
]