export type WorkflowType =
    | "coding"
    | "writing"
    | "research"
    | "data-analysis"
    | "general-productivity"

export type SubscriptionInput = {
    toolId: string
    seats: number
    monthlySpend: number
}

export type AuditInput = {
    companyName: string
    teamSize: number
    workflows: WorkflowType[]
    subscriptions: SubscriptionInput[]
}

export type RecommendationSeverity =
    | "low"
    | "medium"
    | "high"

export type AuditRecommendation = {
    title: string
    description: string
    estimatedSavings: number
    severity: RecommendationSeverity
}

export type AuditResult = {
    totalMonthlySpend: number
    estimatedMonthlySavings: number
    recommendations: AuditRecommendation[]
}