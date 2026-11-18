import type { ReactNode } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import type { OrderStatus } from "@/lib/types"

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "brand",
}: {
  label: string
  value: ReactNode
  hint?: string
  icon?: ReactNode
  accent?: "brand" | "emerald" | "amber" | "blue" | "purple"
}) {
  const accents: Record<string, string> = {
    brand: "bg-brand/10 text-brand",
    emerald: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    blue: "bg-blue-500/10 text-blue-600",
    purple: "bg-purple-500/10 text-purple-600",
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">{label}</p>
        {icon && (
          <span className={cn("flex size-9 items-center justify-center rounded-xl", accents[accent])}>
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 font-heading text-3xl font-black tracking-tight text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  accepted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  cancelled: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase",
        STATUS_STYLES[status]
      )}
    >
      {status}
    </span>
  )
}

export function LoadingBlock({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-dashed border-border p-12 text-sm text-muted-foreground">
      <Loader2 className="mr-2 size-4 animate-spin" />
      {label}
    </div>
  )
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-destructive/40 p-10 text-center">
      <AlertTriangle className="size-8 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyBlock({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-12 text-center">
      <p className="font-heading text-lg font-bold text-foreground">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
