import { AuditRecommendation } from "@/types/audit"

type Props = {
  recommendation: AuditRecommendation
}

export function RecommendationCard({
  recommendation,
}: Props) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">
            {recommendation.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {recommendation.description}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Savings
          </p>

          <p className="font-bold text-green-600">
            ₹
            {recommendation.estimatedSavings.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize">
          {recommendation.severity} priority
        </span>
      </div>
    </div>
  )
}