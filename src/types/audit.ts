export type WorkflowType =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed"

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

export type PrimaryUseCase =
    | "coding"
    | "writing"
    | "data"
    | "research"
    | "mixed"

export type SubscriptionFormItem = {
    id: string
    toolId: string
    monthlySpend: number
    seats: number
}

export type AuditFormState = {
    companyName: string
    teamSize: number
    primaryUseCase: PrimaryUseCase
    subscriptions: SubscriptionFormItem[]
}