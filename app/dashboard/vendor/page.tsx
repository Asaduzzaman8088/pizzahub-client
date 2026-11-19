"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, DollarSign, Package, ShoppingBag, X } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { MiniBarChart } from "@/components/dashboard/mini-bar-chart"
import { ErrorBlock, LoadingBlock, StatCard } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Order } from "@/lib/types"

interface VendorDashboardResponse {
  stats: {
    totalItems: number
    approvedItems: number
    pendingItems: number
    rejectedItems: number
    totalOrders: number
    ordersByStatus: Record<string, number>
    revenue: number
    subscriptionPlan: string
    subscriptionExpiresAt: string | null
  }
  recentOrders: Order[]
}

export default function VendorDashboardPage() {
  const { data, isLoading, error, reload } = useApi<VendorDashboardResponse>("/dashboard/vendor")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const stats = data?.stats

  const updateStatus = async (order: Order, status: "accepted" | "rejected") => {
    setUpdatingId(order.id)
    try {
      await apiFetch(`/orders/${order.id}/status`, { method: "PATCH", body: { status } })
      toast.success(`Order ${status}.`)
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
      title="Vendor Overview"
      description="Monitor your pizzeria's orders, listings, and revenue."
    >
      {isLoading ? (
        <LoadingBlock label="Loading your dashboard..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Revenue"
              value={`$${(stats?.revenue ?? 0).toFixed(2)}`}
              hint="Accepted orders"
              accent="emerald"
              icon={<DollarSign className="size-4" />}
            />
            <StatCard
              label="Orders"
              value={stats?.totalOrders ?? 0}
              hint={`${stats?.ordersByStatus.pending ?? 0} awaiting action`}
              icon={<ShoppingBag className="size-4" />}
            />
            <StatCard
              label="Menu Items"
              value={stats?.totalItems ?? 0}
              hint={`${stats?.approvedItems ?? 0} approved · ${stats?.pendingItems ?? 0} pending`}
              accent="amber"
              icon={<Package className="size-4" />}
            />
            <StatCard
              label="Plan"
              value={<span className="capitalize">{stats?.subscriptionPlan ?? "free"}</span>}
              hint={
                stats?.subscriptionExpiresAt
                  ? `Renews ${new Date(stats.subscriptionExpiresAt).toLocaleDateString()}`
                  : "Upgrade for unlimited listings"
              }
              accent="purple"
              icon={<Package className="size-4" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <MiniBarChart
              title="Orders by status"
              data={[
                { label: "Pending", value: stats?.ordersByStatus.pending ?? 0, color: "bg-amber-500" },
                { label: "Accepted", value: stats?.ordersByStatus.accepted ?? 0, color: "bg-emerald-500" },
                { label: "Rejected", value: stats?.ordersByStatus.rejected ?? 0, color: "bg-rose-500" },
                { label: "Cancelled", value: stats?.ordersByStatus.cancelled ?? 0, color: "bg-slate-400" },
              ]}
            />
            <MiniBarChart
              title="Menu items"
              data={[
                { label: "Approved", value: stats?.approvedItems ?? 0, color: "bg-emerald-500" },
                { label: "Pending", value: stats?.pendingItems ?? 0, color: "bg-amber-500" },
                { label: "Rejected", value: stats?.rejectedItems ?? 0, color: "bg-rose-500" },
              ]}
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-heading text-lg font-bold">Recent Orders</h2>
              <div className="flex gap-2">
                <Link
                  href="/dashboard/vendor/menu"
                  className={cn(buttonVariants({ variant: "outline" }), "text-xs font-bold")}
                >
                  Manage Menu
                </Link>
                <Link
                  href="/dashboard/vendor/add-item"
                  className={cn(
                    buttonVariants(),
                    "bg-brand text-xs font-bold text-white hover:bg-brand-hover"
                  )}
                >
                  Add Pizza
                </Link>
              </div>
            </div>
            <OrdersTable
              orders={data?.recentOrders ?? []}
              perspective="vendor"
              emptyTitle="No orders yet"
              emptyDescription="New customer orders will appear here for you to accept or reject."
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
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
