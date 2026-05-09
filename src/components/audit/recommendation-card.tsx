import { AuditRecommendation } from "@/types/audit"

type Props = {
  recommendation: AuditRecommendation
}

const severityStyles = {
  high: "bg-red-100 text-red-700",
  medium:
    "bg-yellow-100 text-yellow-700",
  low: "bg-gray-100 text-gray-700",
}

export function RecommendationCard({
  recommendation,
}: Props) {
  return (
    <div className="rounded-2xl border p-5 hover:shadow-sm transition-shadow">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">
              {recommendation.title}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                severityStyles[
                  recommendation.severity
                ]
              }`}
            >
              {recommendation.severity.toUpperCase()}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {recommendation.reasoning}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Savings
          </p>

          <p className="font-bold text-green-600">
            ₹
            {recommendation.estimatedMonthlySavings.toLocaleString()}

            <span className="text-sm font-medium text-muted-foreground">
              /month
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}