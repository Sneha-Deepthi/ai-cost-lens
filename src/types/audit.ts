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

export type RecommendationConfidence =
  | "low"
  | "medium"
  | "high"

export type RecommendationCategory =
  | "governance"
  | "premium-tier"
  | "overlap"
  | "workflow"
  | "billing"
  | "api-optimization"

export type AuditRecommendation = {
  toolId: string

  title: string

  reasoning: string

  action: string

  estimatedMonthlySavings: number

  severity: RecommendationSeverity

  confidence: RecommendationConfidence

  category: RecommendationCategory

  sourceRule: string
}

export type AuditResult = {
  totalMonthlySpend: number

  estimatedMonthlySavings: number

  estimatedAnnualSavings: number

  savingsPercent: number

  optimizationScore: number

  recommendations: AuditRecommendation[]

  isAlreadyOptimal: boolean

  isHighSavings: boolean
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