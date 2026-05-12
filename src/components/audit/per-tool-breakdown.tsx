type Props = {
  breakdown: {
    toolId: string

    displayName: string

    currentMonthlySpend: number

    recommendation: string

    estimatedSavings: number

    note: string
  }[]
}

export function PerToolBreakdown({
  breakdown,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Per-Tool Breakdown
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Detailed analysis of current AI tooling spend and optimization opportunities.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-4 font-medium">
                Tool
              </th>

              <th className="pb-4 font-medium">
                Current Spend
              </th>

              <th className="pb-4 font-medium">
                Recommendation
              </th>

              <th className="pb-4 font-medium">
                Monthly Savings
              </th>
            </tr>
          </thead>

          <tbody>
            {breakdown.map(
              (tool) => (
                <tr
                  key={tool.toolId}
                  className="border-b align-top"
                >
                  <td className="py-5 font-medium">
                    {tool.displayName}
                  </td>

                  <td className="py-5">
                    ₹
                    {tool.currentMonthlySpend.toLocaleString()}
                  </td>

                  <td className="py-5">
                    <div className="space-y-2">
                      <p className="font-medium">
                        {
                          tool.recommendation
                        }
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {tool.note}
                      </p>
                    </div>
                  </td>

                  <td className="py-5 font-semibold text-green-600">
                    ₹
                    {tool.estimatedSavings.toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}