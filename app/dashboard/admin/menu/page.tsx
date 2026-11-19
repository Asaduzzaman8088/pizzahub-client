"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, Loader2, PowerOff, Search, Sparkles, Trash2, X } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { EmptyBlock, ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import { confirmAction } from "@/lib/confirm"
import { cn } from "@/lib/utils"
import type { MenuItem, MenuStatus } from "@/lib/types"

interface AdminMenuResponse {
  items: MenuItem[]
}

const STATUS_STYLES: Record<MenuStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  inactive: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
}

export default function AdminMenuPage() {
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const [busyId, setBusyId] = useState<string | null>(null)

  const params = new URLSearchParams()
  if (status) params.set("status", status)
  if (search.trim()) params.set("search", search.trim())
  const query = params.toString()
  const path = query ? `/menu/admin/all?${query}` : "/menu/admin/all"
  const { data, isLoading, error, reload } = useApi<AdminMenuResponse>(path)

  const performRemoveItem = async (item: MenuItem) => {
    setBusyId(item.id)
    try {
      await apiFetch(`/menu/${item.id}`, { method: "DELETE" })
      toast.success("Menu item deleted.")
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the item.")
    } finally {
      setBusyId(null)
    }
  }

  const removeItem = (item: MenuItem) => {
    confirmAction(`Delete "${item.name}" permanently? This cannot be undone.`, () => {
      void performRemoveItem(item)
    })
  }

  const act = async (item: MenuItem, body: Record<string, unknown>, message: string) => {
    setBusyId(item.id)
    try {
      const endpoint = "status" in body ? `/menu/${item.id}/status` : `/menu/${item.id}/feature`
      await apiFetch(endpoint, { method: "PATCH", body })
      toast.success(message)
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the item.")
    } finally {
      setBusyId(null)
    }
  }

  const items = data?.items ?? []

  return (
    <DashboardShell
      role="admin"
      title="Menu Moderation"
      description="Approve vendor submissions and curate featured pizzas."
    >
      <div className="mb-4 relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu items by name..."
          className="w-full rounded-xl border border-input bg-card py-2.5 pr-3 pl-10 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {[
          { value: "", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
          { value: "inactive", label: "Inactive" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setStatus(option.value)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-bold transition",
              status === option.value
                ? "bg-brand text-white shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingBlock label="Loading menu items..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : items.length === 0 ? (
        <EmptyBlock title="No items found" description="Nothing matches this status filter." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const isBusy = busyId === item.id
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {item.images?.[0] && (
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-heading text-base font-bold">{item.name}</p>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                        STATUS_STYLES[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                    {item.isFeatured && (
                      <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.vendorName} &middot; {item.categoryLabel} &middot;{" "}
                    {item.location || item.vendorLocation}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className="mr-2 font-heading text-lg font-black text-brand">
                    ${item.price.toFixed(2)}
                  </span>
                  {isBusy && <Loader2 className="size-4 animate-spin text-muted-foreground" />}

                  {item.status !== "approved" && (
                    <button
                      onClick={() => void act(item, { status: "approved" }, "Item approved.")}
                      disabled={isBusy}
                      className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <Check className="size-3" />
                      Approve
                    </button>
                  )}
                  {item.status !== "rejected" && (
                    <button
                      onClick={() => void act(item, { status: "rejected" }, "Item rejected.")}
                      disabled={isBusy}
                      className="flex items-center gap-1 rounded-lg border border-rose-300 px-3 py-1.5 text-[11px] font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                    >
                      <X className="size-3" />
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() =>
                      void act(
                        item,
                        { isFeatured: !item.isFeatured },
                        item.isFeatured ? "Removed from featured." : "Marked as featured."
                      )
                    }
                    disabled={isBusy}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-3 py-1.5 text-[11px] font-bold disabled:opacity-50",
                      item.isFeatured
                        ? "border-brand/40 text-brand hover:bg-brand/5"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Sparkles className="size-3" />
                    {item.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                  {item.status !== "inactive" && (
                    <button
                      onClick={() =>
                        void act(item, { status: "inactive" }, "Item marked inactive.")
                      }
                      disabled={isBusy}
                      className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      <PowerOff className="size-3" />
                      Inactive
                    </button>
                  )}
                  <button
                    onClick={() => void removeItem(item)}
                    disabled={isBusy}
                    className="flex items-center gap-1 rounded-lg border border-destructive/40 px-3 py-1.5 text-[11px] font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50"
                  >
                    <Trash2 className="size-3" />
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardShell>
  )
}
