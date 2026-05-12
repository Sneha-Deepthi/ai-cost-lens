type Props = {
  totalMonthlySpend: number
  estimatedMonthlySavings: number
}

export function AuditSummary({
  totalMonthlySpend,
  estimatedMonthlySavings,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Total Monthly Spend
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-900">
            ₹
            {totalMonthlySpend.toLocaleString()}
          </h2>

          <p className="mt-4 text-sm text-slate-500">
            Current estimated monthly AI tooling expenditure.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-green-200 bg-linear-to-br from-green-50 to-emerald-100 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-200 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-wide text-green-700">
            Estimated Savings
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-tight text-green-700">
            ₹
            {estimatedMonthlySavings.toLocaleString()}
          </h2>

          <p className="mt-4 text-sm text-green-700/80">
            Potential monthly savings identified through optimization opportunities.
          </p>
        </div>
      </div>
    </div>
  )
}