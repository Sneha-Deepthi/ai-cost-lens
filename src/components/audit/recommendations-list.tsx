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
      <div className="rounded-2xl border p-6 text-center">
        <h3 className="text-lg font-semibold">
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