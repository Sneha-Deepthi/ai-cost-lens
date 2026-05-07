type Props = {
  totalMonthlySpend: number
  estimatedMonthlySavings: number
}

export function AuditSummary({
  totalMonthlySpend,
  estimatedMonthlySavings,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border p-6">
        <p className="text-sm text-muted-foreground">
          Total Monthly Spend
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₹{totalMonthlySpend.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-2xl border p-6">
        <p className="text-sm text-muted-foreground">
          Estimated Savings
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          ₹{estimatedMonthlySavings.toLocaleString()}
        </h2>
      </div>
    </div>
  )
}