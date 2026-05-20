import { notFound } from "next/navigation"

import { supabase } from "@/lib/supabase"

import { RecommendationsList } from "@/components/audit/recommendations-list"

import { PerToolBreakdown } from "@/components/audit/per-tool-breakdown"

import { MetricCard } from "@/components/dashboard/metric-card"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: Props) {
  const { id } =
    await params

  const shareUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/share/${id}`

  return {
    title:
      "AI Spend Audit Report",

    description:
      "See how much this team could save on AI tooling using AI Cost Lens.",

    openGraph: {
      title:
        "AI Spend Audit Report",

      description:
        "See how much this team could save on AI tooling using AI Cost Lens.",

      url: shareUrl,

      siteName:
        "AI Cost Lens",

      type: "website",
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        "AI Spend Audit Report",

      description:
        "See how much this team could save on AI tooling using AI Cost Lens.",
    },
  }
}

export default async function SharePage({
  params,
}: Props) {
  const { id } =
    await params

  const { data } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single()

  if (!data) {
    notFound()
  }

  const audit = data.audit_result

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-6xl space-y-8 p-8">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_35%)]" />

          <div className="relative">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur">
              Public Audit Report
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight">
              AI Spend Audit
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Public optimization report generated with AI Cost Lens.
            </p>

            <p className="mt-6 text-sm text-slate-400">
              Publicly shareable AI tooling optimization report.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <MetricCard
            title="Monthly Spend"
            value={`$${audit.totalMonthlySpend.toLocaleString()}`}
            subtitle="Current AI tooling expenditure"
          />

          <MetricCard
            title="Monthly Savings"
            value={`$${audit.estimatedMonthlySavings.toLocaleString()}`}
            subtitle="Potential monthly optimization savings"
          />

          <MetricCard
            title="Annual Savings"
            value={`$${audit.estimatedAnnualSavings.toLocaleString()}`}
            subtitle="Projected annual savings opportunities"
          />

          <MetricCard
            title="Optimization Score"
            value={`${audit.optimizationScore}/100`}
            subtitle="Higher means better tooling efficiency"
          />
        </section>

        {audit.estimatedMonthlySavings > 500 && (
          <section className="rounded-3xl bg-linear-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-100">
              High Savings Opportunity
            </p>

            <h2 className="mt-3 text-3xl font-black">
              You could save $
              {audit.estimatedAnnualSavings.toLocaleString()}
              /year
            </h2>

            <p className="mt-4 max-w-2xl text-indigo-100">
              Credex helps startups optimize AI infrastructure spend through discounted AI credits and tooling recommendations.
            </p>
          </section>
        )}

        {data.summary && (
          <section className="rounded-3xl border border-indigo-100 bg-linear-to-br from-indigo-50 to-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight">
              AI Audit Summary
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              {data.summary}
            </p>
          </section>
        )}

        <section>
          <RecommendationsList
            recommendations={
              audit.recommendations
            }
          />
        </section>

        <section>
          <PerToolBreakdown
            breakdown={
              audit.perToolBreakdown
            }
          />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Share this audit report
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Send this public optimization report to your team.
              </p>
            </div>

            <a
              href={`/audit/${id}`}
              className="rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
            >
              Explore Full Audit
            </a>
          </div>
        </section>

        <footer className="pb-10 pt-2 text-center">
          <p className="text-sm text-slate-500">
            Generated with{" "}
            <span className="font-semibold text-slate-700">
              AI Cost Lens
            </span>
          </p>
        </footer>
      </div>
    </main>
  )
}