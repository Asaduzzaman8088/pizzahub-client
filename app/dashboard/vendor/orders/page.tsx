"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { Order } from "@/lib/types"

interface OrdersResponse {
  orders: Order[]
}

const FILTERS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "cancelled", label: "Cancelled" },
]

export default function VendorOrdersPage() {
  const [status, setStatus] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const path = status ? `/orders/vendor?status=${status}` : "/orders/vendor"
  const { data, isLoading, error, reload } = useApi<OrdersResponse>(path)

  const updateStatus = async (order: Order, nextStatus: "accepted" | "rejected") => {
    setUpdatingId(order.id)
    try {
      await apiFetch(`/orders/${order.id}/status`, {
        method: "PATCH",
        body: { status: nextStatus },
      })
      toast.success(`Order ${nextStatus}.`)
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the order.")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <DashboardShell
      role="vendor"
      title="Customer Orders"
      description="Accept or reject pending orders for your pizzeria."
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatus(filter.value)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-bold transition",
              status === filter.value
                ? "bg-brand text-white shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingBlock label="Loading orders..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : (
        <OrdersTable
          orders={data?.orders ?? []}
          perspective="vendor"
          emptyTitle="No orders found"
          emptyDescription="Customer orders for your menu items will appear here."
          renderActions={(order) =>
            order.status === "pending" ? (
              <div className="flex gap-2">
                <button
                  onClick={() => void updateStatus(order, "accepted")}
                  disabled={updatingId === order.id}
                  className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  <Check className="size-3" />
                  Accept
                </button>
                <button
                  onClick={() => void updateStatus(order, "rejected")}
                  disabled={updatingId === order.id}
                  className="flex items-center gap-1 rounded-lg border border-rose-300 px-3 py-1.5 text-[11px] font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                >
                  <X className="size-3" />
                  Reject
                </button>
              </div>
            ) : null
          }
        />
      )}
    </DashboardShell>
  )
}
