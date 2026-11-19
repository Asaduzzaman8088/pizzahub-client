"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Pencil, PlusCircle, Power, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { EmptyBlock, ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import { confirmAction } from "@/lib/confirm"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MenuItem, MenuStatus } from "@/lib/types"

interface VendorMenuResponse {
  items: MenuItem[]
}

const STATUS_STYLES: Record<MenuStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  inactive: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
}

export default function VendorMenuPage() {
  const { data, isLoading, error, reload } = useApi<VendorMenuResponse>("/menu/vendor/mine")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const toggleAvailability = async (item: MenuItem) => {
    setTogglingId(item.id)
    try {
      await apiFetch(`/menu/${item.id}/availability`, {
        method: "PATCH",
        body: { isAvailable: !item.isAvailable },
      })
      toast.success(item.isAvailable ? "Item marked unavailable." : "Item marked available.")
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update availability.")
    } finally {
      setTogglingId(null)
    }
  }

  const performRemove = async (item: MenuItem) => {
    setDeletingId(item.id)
    try {
      await apiFetch(`/menu/${item.id}`, { method: "DELETE" })
      toast.success("Menu item deleted.")
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the item.")
    } finally {
      setDeletingId(null)
    }
  }

  const remove = (item: MenuItem) => {
    confirmAction(`Delete "${item.name}"? This cannot be undone.`, () => {
      void performRemove(item)
    })
  }

  const items = data?.items ?? []

  return (
    <DashboardShell
      role="vendor"
      title="My Menu"
      description="Manage the pizzas you have listed on PizzaHub."
    >
      <div className="mb-4 flex justify-end">
        <Link
          href="/dashboard/vendor/add-item"
          className={cn(
            buttonVariants(),
            "gap-2 bg-brand text-sm font-bold text-white hover:bg-brand-hover"
          )}
        >
          <PlusCircle className="size-4" />
          Add New Pizza
        </Link>
      </div>

      {isLoading ? (
        <LoadingBlock label="Loading your menu..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : items.length === 0 ? (
        <EmptyBlock
          title="No menu items yet"
          description="Add your first pizza to start receiving orders."
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
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
                  {!item.isAvailable && (
                    <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 uppercase dark:bg-slate-800 dark:text-slate-300">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.categoryLabel} &middot; {item.location || item.vendorLocation}
                </p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.description}</p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <span className="font-heading text-lg font-black text-brand">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex flex-wrap justify-end gap-2">
                  <Link
                    href={`/menu/${item.id}`}
                    className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/vendor/menu/${item.id}/edit`}
                    className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => void toggleAvailability(item)}
                    disabled={togglingId === item.id}
                    className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    <Power className="size-3" />
                    {item.isAvailable ? "Mark unavailable" : "Mark available"}
                  </button>
                  <button
                    onClick={() => void remove(item)}
                    disabled={deletingId === item.id}
                    className="flex items-center gap-1 rounded-lg border border-destructive/40 px-3 py-1.5 text-[11px] font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50"
                  >
                    <Trash2 className="size-3" />
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
