type Props = {
  title: string

  value: string

  subtitle?: string
}

export function MetricCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="rounded-2xl border p-6">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}