import { mockAudit } from "@/data/mock-audit"

import { generateAudit } from "@/engine/recommendation-engine"

import { AuditSummary } from "@/components/audit/audit-summary"

import { RecommendationsList } from "@/components/audit/recommendations-list"

export default function Home() {
  const result = generateAudit(mockAudit)

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          AI Cost Lens
        </h1>

        <p className="mt-2 text-muted-foreground">
          AI subscription audit and optimization dashboard
        </p>
      </div>

      <AuditSummary
        totalMonthlySpend={result.totalMonthlySpend}
        estimatedMonthlySavings={
          result.estimatedMonthlySavings
        }
      />

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">
          Recommendations
        </h2>

        <RecommendationsList
          recommendations={result.recommendations}
        />
      </div>
    </main>
  )
}