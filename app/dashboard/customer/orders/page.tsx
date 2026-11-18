"use client"

import { useState } from "react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import type { Order } from "@/lib/types"

interface OrdersResponse {
  orders: Order[]
}

export default function CustomerOrdersPage() {
  const { data, isLoading, error, reload } = useApi<OrdersResponse>("/orders/my")
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const cancelOrder = async (order: Order) => {
    setCancellingId(order.id)
    try {
      await apiFetch(`/orders/${order.id}/status`, {
        method: "PATCH",
        body: { status: "cancelled" },
      })
      toast.success("Order cancelled.")
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not cancel the order.")
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <DashboardShell role="customer" title="My Orders" description="All your pizza orders and their status.">
      {isLoading ? (
        <LoadingBlock label="Loading orders..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : (
        <OrdersTable
          orders={data?.orders ?? []}
          emptyTitle="No orders yet"
          emptyDescription="Your future pizza orders will appear here."
          renderActions={(order) =>
            order.status === "pending" ? (
              <button
                onClick={() => void cancelOrder(order)}
                disabled={cancellingId === order.id}
                className="rounded-lg border border-destructive/40 px-3 py-1.5 text-[11px] font-bold text-destructive transition hover:bg-destructive/10 disabled:opacity-50"
              >
                {cancellingId === order.id ? "Cancelling..." : "Cancel"}
              </button>
            ) : null
          }
        />
      )}
    </DashboardShell>
  )
}
