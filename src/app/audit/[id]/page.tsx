import { notFound }
from "next/navigation"

import { supabase }
from "@/lib/supabase"

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

  return {
    title:
      "AI Spend Audit Report",

    description:
      `Public audit report ${id}`,

    openGraph: {
      title:
        "AI Spend Audit Report",

      description:
        "See how much this team could save on AI tooling.",

      type: "website",
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        "AI Spend Audit Report",

      description:
        "See how much this team could save on AI tooling.",
    },
  }
}

export default async function AuditPage({
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

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight">
          AI Spend Audit
        </h1>

        <p className="mt-3 text-muted-foreground">
          Public optimization report
          generated with AI Cost Lens.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Monthly Spend
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            $
            {data.total_monthly_spend}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Monthly Savings
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            $
            {
              data.estimated_monthly_savings
            }
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Annual Savings
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            $
            {
              data.estimated_annual_savings
            }
          </h2>
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight">
          Recommendations
        </h2>

        <div className="mt-6">
        {data.recommendations.length === 0 ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h3 className="text-xl font-semibold text-green-700">
                Your AI stack is already well optimized
            </h3>

            <p className="mt-2 text-green-700/80">
                No major cost-saving opportunities
                were detected for this tooling setup.
                Current subscriptions appear aligned
                with the team's usage patterns.
            </p>
            </div>
        ) : (
            <div className="space-y-4">
            {data.recommendations.map(
                (
                recommendation: any,
                index: number
                ) => (
                <div
                    key={index}
                    className="rounded-2xl border p-5"
                >
                    <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">
                        {
                            recommendation.title
                        }
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                        {
                            recommendation.reasoning
                        }
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                        Savings
                        </p>

                        <p className="text-2xl font-bold text-green-600">
                        $
                        {
                            recommendation.estimatedMonthlySavings
                        }
                        </p>
                    </div>
                    </div>
                </div>
                )
            )}
            </div>
        )}
        </div>
      </div>
    </main>
  )
}