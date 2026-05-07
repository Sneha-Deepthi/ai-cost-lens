import { AuditRecommendation } from "@/types/audit"

import { RecommendationCard } from "./recommendation-card"

type Props = {
  recommendations: AuditRecommendation[]
}

export function RecommendationsList({
  recommendations,
}: Props) {
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