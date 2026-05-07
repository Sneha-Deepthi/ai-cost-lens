export type ToolPlan = {
    id: string
    tool: string
    vendor: string
    category:
    | "general-ai"
    | "coding-ai"
    | "app-builder"

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
    // -----------------------------
    // ChatGPT
    // -----------------------------

    {
    id: "chatgpt-plus",
    tool: "ChatGPT",
    vendor: "OpenAI",
    category: "general-ai",
    plan: "Plus",
    monthlyPrice: 1999,
    pricingModel: "subscription",
    bestFor: [
        "writing",
        "research",
        "coding",
        "data-analysis",
    ],
    strengths: [
        "multimodal workflows",
        "deep research",
        "data analysis",
        "reasoning",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
    },

    {
    id: "chatgpt-team",
    tool: "ChatGPT",
    vendor: "OpenAI",
    category: "general-ai",
    plan: "Team",
    monthlyPrice: 1800,
    pricingModel: "subscription",
    bestFor: [
        "collaboration",
        "shared-workspace",
        "business-productivity",
    ],
    strengths: [
        "admin console",
        "shared projects",
        "company knowledge",
        "centralized billing",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
    },

    {
    id: "chatgpt-enterprise",
    tool: "ChatGPT",
    vendor: "OpenAI",
    category: "general-ai",
    plan: "Enterprise",
    monthlyPrice: null,
    pricingModel: "custom",
    bestFor: [
        "compliance",
        "large-organizations",
        "governance",
    ],
    strengths: [
        "SCIM",
        "audit logs",
        "enterprise governance",
        "priority support",
    ],
    teamFeatures: true,
    enterpriseFeatures: true,
    usageType: "enterprise",
    },

    // -----------------------------
    // Claude
    // -----------------------------

    {
    id: "claude-pro",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Pro",
    monthlyPrice: 1700,
    pricingModel: "subscription",
    bestFor: [
        "writing",
        "research",
        "reasoning",
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
    id: "claude-max",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Max",
    monthlyPrice: 8500,
    pricingModel: "subscription",
    bestFor: [
        "heavy-ai-usage",
        "advanced-productivity",
    ],
    strengths: [
        "high usage limits",
        "priority access",
        "advanced reasoning",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
    },

    {
    id: "claude-team",
    tool: "Claude",
    vendor: "Anthropic",
    category: "general-ai",
    plan: "Team",
    monthlyPrice: 2100,
    pricingModel: "subscription",
    bestFor: [
        "team-collaboration",
        "shared-ai-workflows",
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

    // -----------------------------
    // Cursor
    // -----------------------------

    {
    id: "cursor-pro",
    tool: "Cursor",
    vendor: "Cursor",
    category: "coding-ai",
    plan: "Pro",
    monthlyPrice: 2000,
    pricingModel: "subscription",
    bestFor: [
        "coding",
        "debugging",
        "engineering",
    ],
    strengths: [
        "IDE-native AI",
        "developer productivity",
        "AI-assisted coding",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
    },

    {
    id: "cursor-business",
    tool: "Cursor",
    vendor: "Cursor",
    category: "coding-ai",
    plan: "Business",
    monthlyPrice: 4000,
    pricingModel: "subscription",
    bestFor: [
        "engineering teams",
        "collaboration",
    ],
    strengths: [
        "RBAC",
        "SSO",
        "team analytics",
        "centralized billing",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
    },

    // -----------------------------
    // GitHub Copilot
    // -----------------------------

    {
    id: "copilot-individual",
    tool: "GitHub Copilot",
    vendor: "GitHub",
    category: "coding-ai",
    plan: "Individual",
    monthlyPrice: 1000,
    pricingModel: "subscription",
    bestFor: [
        "solo developers",
        "coding",
    ],
    strengths: [
        "IDE integration",
        "autocomplete",
        "developer productivity",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
    },

    {
    id: "copilot-business",
    tool: "GitHub Copilot",
    vendor: "GitHub",
    category: "coding-ai",
    plan: "Business",
    monthlyPrice: 1900,
    pricingModel: "subscription",
    bestFor: [
        "engineering teams",
        "governance",
    ],
    strengths: [
        "policy controls",
        "centralized billing",
        "team management",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
    },

    // -----------------------------
    // Gemini
    // -----------------------------

    {
    id: "gemini-pro",
    tool: "Gemini",
    vendor: "Google",
    category: "general-ai",
    plan: "Pro",
    monthlyPrice: 1950,
    pricingModel: "subscription",
    bestFor: [
        "research",
        "productivity",
        "google-workspace",
    ],
    strengths: [
        "workspace integration",
        "multimodal reasoning",
        "research workflows",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
    },

    {
    id: "gemini-ultra",
    tool: "Gemini",
    vendor: "Google",
    category: "general-ai",
    plan: "Ultra",
    monthlyPrice: 24500,
    pricingModel: "subscription",
    bestFor: [
        "heavy-ai-usage",
        "advanced reasoning",
    ],
    strengths: [
        "premium multimodal workflows",
        "high usage limits",
        "advanced AI reasoning",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
    },

    // -----------------------------
    // Lovable
    // -----------------------------

    {
    id: "lovable-pro",
    tool: "Lovable",
    vendor: "Lovable",
    category: "app-builder",
    plan: "Pro",
    monthlyPrice: 2500,
    pricingModel: "subscription",
    bestFor: [
        "mvp-development",
        "rapid prototyping",
        "startup workflows",
    ],
    strengths: [
        "AI app generation",
        "Supabase integrations",
        "rapid iteration",
    ],
    teamFeatures: false,
    enterpriseFeatures: false,
    usageType: "individual",
    },

    {
    id: "lovable-business",
    tool: "Lovable",
    vendor: "Lovable",
    category: "app-builder",
    plan: "Business",
    monthlyPrice: 5000,
    pricingModel: "subscription",
    bestFor: [
        "startup teams",
        "collaborative product workflows",
    ],
    strengths: [
        "shared workspaces",
        "SSO",
        "team collaboration",
    ],
    teamFeatures: true,
    enterpriseFeatures: false,
    usageType: "team",
    },
]