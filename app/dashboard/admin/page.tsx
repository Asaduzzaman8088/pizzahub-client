"use client"

import Link from "next/link"
import { DollarSign, Package, Shield, Users } from "lucide-react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { ErrorBlock, LoadingBlock, StatCard } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Order } from "@/lib/types"

interface AdminDashboardResponse {
  stats: {
    totalUsers: number
    usersByRole: { customer: number; vendor: number; admin: number }
    totalOrders: number
    ordersByStatus: Record<string, number>
    revenue: number
    totalItems: number
    pendingItems: number
  }
  recentOrders: Order[]
}

export default function AdminDashboardPage() {
  const { data, isLoading, error, reload } = useApi<AdminDashboardResponse>("/dashboard/admin")
  const stats = data?.stats

  return (
    <DashboardShell
      role="admin"
      title="Admin Control Panel"
      description="Platform-wide health, users, and marketplace activity."
    >
      {isLoading ? (
        <LoadingBlock label="Loading platform stats..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Users"
              value={stats?.totalUsers ?? 0}
              hint={`${stats?.usersByRole.customer ?? 0} customers · ${stats?.usersByRole.vendor ?? 0} vendors`}
              accent="blue"
              icon={<Users className="size-4" />}
            />
            <StatCard
              label="Orders"
              value={stats?.totalOrders ?? 0}
              hint={`${stats?.ordersByStatus.pending ?? 0} pending`}
              icon={<Package className="size-4" />}
            />
            <StatCard
              label="Revenue"
              value={`$${(stats?.revenue ?? 0).toFixed(2)}`}
              hint="Accepted orders"
              accent="emerald"
              icon={<DollarSign className="size-4" />}
            />
            <StatCard
              label="Pending Items"
              value={stats?.pendingItems ?? 0}
              hint={`${stats?.totalItems ?? 0} total listings`}
              accent="amber"
              icon={<Shield className="size-4" />}
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-heading text-lg font-bold">Recent Orders</h2>
              <div className="flex gap-2">
                <Link
                  href="/dashboard/admin/users"
                  className={cn(buttonVariants({ variant: "outline" }), "text-xs font-bold")}
                >
                  Manage Users
                </Link>
                <Link
                  href="/dashboard/admin/menu"
                  className={cn(
                    buttonVariants(),
                    "bg-brand text-xs font-bold text-white hover:bg-brand-hover"
                  )}
                >
                  Moderate Menu
                </Link>
              </div>
            </div>
            <OrdersTable
              orders={data?.recentOrders ?? []}
              perspective="admin"
              emptyTitle="No orders yet"
              emptyDescription="Platform orders will appear here."
            />
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
