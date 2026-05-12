import { AuditRecommendation } from "@/types/audit"

import { RecommendationCard } from "./recommendation-card"

type Props = {
  recommendations: AuditRecommendation[]
}

export function RecommendationsList({
  recommendations,
}: Props) {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-10 text-center shadow-sm">
        <h3 className="text-2xl font-bold text-green-700">
          No optimization opportunities detected
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Your current AI tooling setup appears reasonably optimized based on the provided inputs.
        </p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <RecommendationCard
          key={index}
          recommendation={recommendation}
        />
      ))}
    </div>
  )
}