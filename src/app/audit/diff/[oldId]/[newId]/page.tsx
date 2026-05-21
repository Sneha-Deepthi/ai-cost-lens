import { notFound } from "next/navigation"

import { supabase } from "@/lib/supabase"

import { PerToolBreakdown } from "@/components/audit/per-tool-breakdown"

import { MetricCard } from "@/components/dashboard/metric-card"

import { getRecommendationDiff } from "@/lib/audit/get-recommendation-diff"

import { AuditRecommendation, PricingChange,} from "@/types/audit"

type Props = {
  params: Promise<{
    oldId: string
    newId: string
  }>
}

export default async function AuditDiffPage({
  params,
}: Props) {
  const {
    oldId,
    newId,
  } = await params

  const { data: oldAudit } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", oldId)
      .single()

  const { data: newAudit } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", newId)
      .single()

  if (!oldAudit || !newAudit) {
    notFound()
  }

  const recommendationDiffs =
  getRecommendationDiff(
    oldAudit.recommendations,
    newAudit.recommendations
  )
  const oldResult =
    oldAudit.audit_result

  const newResult =
    newAudit.audit_result

  const delta =
    newResult.estimatedMonthlySavings -
    oldResult.estimatedMonthlySavings

  const pricingChanges =
    newAudit.pricing_changes || []

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-950 p-10 text-white">
          <p className="text-sm uppercase tracking-wide text-slate-400">
            Re-Audit Comparison
          </p>

          <h1 className="mt-4 text-5xl font-black leading-tight">
            Your AI Tooling Recommendations Changed
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                Previous Savings
              </p>

              <h2 className="mt-2 text-4xl font-black">
                $
                {oldResult.estimatedMonthlySavings}
              </h2>
            </div>

            <div className="rounded-2xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                Updated Savings
              </p>

              <h2 className="mt-2 text-4xl font-black">
                $
                {newResult.estimatedMonthlySavings}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-500/20 p-6">
              <p className="text-sm text-emerald-200">
                Savings Delta
              </p>

              <h2 className="mt-2 text-4xl font-black text-emerald-300">
                {delta >= 0 ? "+" : "-"}$
                {Math.abs(delta)}
              </h2>
            </div>
          </div>
        </section>

        {pricingChanges.length > 0 && (
          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold">
              Pricing Changes Detected
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pricingChanges.map(
                (
                  change: PricingChange,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
                  >
                    <h3 className="text-lg font-semibold">
                      {change.tool}
                    </h3>

                    <div className="mt-3 flex items-center gap-3 text-sm">
                      <span className="rounded-lg bg-red-100 px-3 py-1 text-red-700">
                        $
                        {change.oldPrice}
                      </span>

                      <span className="text-slate-500">
                        →
                      </span>

                      <span className="rounded-lg bg-emerald-100 px-3 py-1 text-emerald-700">
                        $
                        {change.newPrice}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        <div className="mb-6">
  <p className="text-lg text-slate-600">
    {
      recommendationDiffs.filter(
        (diff) =>
          diff.status !==
          "unchanged"
      ).length
    }{" "}
    recommendation changes detected
    after pricing updates.

    Estimated annual savings impact:
    $
    {(
      (newResult
        ?.estimatedAnnualSavings || 0) -
      (oldResult
        ?.estimatedAnnualSavings || 0)
    ).toLocaleString()}
  </p>
</div>

<section className="grid gap-8 xl:grid-cols-2">

  <div className="space-y-6">
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        Previous Audit
      </p>

      <h2 className="mt-2 text-3xl font-black">
        Original Recommendations
      </h2>
    </div>

    <section className="grid gap-4 md:grid-cols-2">
      <MetricCard
        title="Monthly Spend"
        value={`$${oldResult.totalMonthlySpend}`}
        subtitle="Original tooling spend"
      />

      <MetricCard
        title="Monthly Savings"
        value={`$${oldResult.estimatedMonthlySavings}`}
        subtitle="Original savings"
      />

      <MetricCard
        title="Annual Savings"
        value={`$${oldResult.estimatedAnnualSavings}`}
        subtitle="Original annual savings"
      />

      <MetricCard
        title="Optimization Score"
        value={`${oldResult.optimizationScore}/100`}
        subtitle="Original optimization score"
      />
    </section>

    <div className="space-y-4">
  {(
    oldResult.recommendations || []
  ).map(
    (recommendation: AuditRecommendation) => {
      const diff =
        recommendationDiffs.find(
          (item) =>
            item.title ===
            recommendation.title
        )

      const status =
        diff?.status ||
        "unchanged"

      return (
        <div
          key={recommendation.title}
          className={`rounded-3xl border p-6 shadow-sm transition ${
            status ===
            "removed"
              ? "border-red-300 bg-red-50"
              : status ===
                "unchanged"
              ? "border-slate-200 bg-slate-50 opacity-60"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">
                {
                  recommendation.title
                }
              </h3>

              <p className="mt-3 text-slate-600">
                {
                  recommendation.reasoning
                }
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                status ===
                "removed"
                  ? "bg-red-200 text-red-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {status ===
              "removed"
                ? "Removed"
                : "Unchanged"}
            </span>
          </div>
        </div>
      )
    }
  )}
</div>

    <PerToolBreakdown
      breakdown={
        oldResult.perToolBreakdown
      }
    />
  </div>

  <div className="space-y-6">

    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
      <p className="text-sm font-medium text-emerald-700">
        Updated Audit
      </p>

      <h2 className="mt-2 text-3xl font-black">
        New Recommendations
      </h2>
    </div>

    <section className="grid gap-4 md:grid-cols-2">
      <MetricCard
        title="Monthly Spend"
        value={`$${newResult.totalMonthlySpend}`}
        subtitle="Updated tooling spend"
      />

      <MetricCard
        title="Monthly Savings"
        value={`$${newResult.estimatedMonthlySavings}`}
        subtitle="Updated savings"
      />

      <MetricCard
        title="Annual Savings"
        value={`$${newResult.estimatedAnnualSavings}`}
        subtitle="Updated annual savings"
      />

      <MetricCard
        title="Optimization Score"
        value={`${newResult.optimizationScore}/100`}
        subtitle="Updated optimization score"
      />
    </section>

    <div className="space-y-4">
  {(
    newResult.recommendations || []
  ).map(
    (recommendation: AuditRecommendation) => {
      const diff =
        recommendationDiffs.find(
          (item) =>
            item.title ===
            recommendation.title
        )

      const status =
        diff?.status ||
        "unchanged"

      return (
        <div
          key={recommendation.title}
          className={`rounded-3xl border p-6 shadow-sm transition ${
            status === "new"
              ? "border-emerald-300 bg-emerald-50"
              : status ===
                "updated"
              ? "border-amber-300 bg-amber-50"
              : "border-slate-200 bg-slate-50 opacity-60"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">
                {
                  recommendation.title
                }
              </h3>

              <p className="mt-3 text-slate-600">
                {
                  recommendation.reasoning
                }
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                status === "new"
                  ? "bg-emerald-200 text-emerald-700"
                  : status ===
                    "updated"
                  ? "bg-amber-200 text-amber-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {status === "new"
                ? "New"
                : status ===
                  "updated"
                ? "Updated"
                : "Unchanged"}
            </span>
          </div>
        </div>
      )
    }
  )}
</div>

    <PerToolBreakdown
      breakdown={
        newResult.perToolBreakdown
      }
    />
  </div>
</section>
      </div>
    </main>
  )
}