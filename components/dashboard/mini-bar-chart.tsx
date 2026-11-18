interface ChartDatum {
  label: string
  value: number
  color?: string
}

export function MiniBarChart({ title, data }: { title: string; data: ChartDatum[] }) {
  const max = Math.max(1, ...data.map((item) => item.value))

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-heading text-sm font-bold text-foreground">{title}</h3>
      <div className="mt-4 space-y-3">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground capitalize">{item.label}</span>
              <span className="font-bold text-foreground">{item.value}</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-2 rounded-full ${item.color ?? "bg-brand"}`}
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
