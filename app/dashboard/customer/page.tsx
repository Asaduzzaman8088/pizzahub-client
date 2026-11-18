"use client"

import Link from "next/link"
import { DollarSign, Heart, ShoppingBag, Star } from "lucide-react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { ErrorBlock, LoadingBlock, StatCard } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Order } from "@/lib/types"

interface CustomerDashboardResponse {
  stats: {
    totalOrders: number
    ordersByStatus: Record<string, number>
    totalSpent: number
    wishlistCount: number
    reviewCount: number
  }
  recentOrders: Order[]
}

export default function CustomerDashboardPage() {
  const { data, isLoading, error, reload } =
    useApi<CustomerDashboardResponse>("/dashboard/customer")

  const stats = data?.stats

  return (
    <DashboardShell
      role="customer"
      title="Welcome back"
      description="Track your orders, favorites, and spending in one place."
    >
      {isLoading ? (
        <LoadingBlock label="Loading your dashboard..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Orders"
              value={stats?.totalOrders ?? 0}
              hint={`${stats?.ordersByStatus.pending ?? 0} pending`}
              icon={<ShoppingBag className="size-4" />}
            />
            <StatCard
              label="Total Spent"
              value={`$${(stats?.totalSpent ?? 0).toFixed(2)}`}
              hint="Accepted orders"
              accent="emerald"
              icon={<DollarSign className="size-4" />}
            />
            <StatCard
              label="Wishlist"
              value={stats?.wishlistCount ?? 0}
              hint="Saved favorites"
              accent="amber"
              icon={<Heart className="size-4" />}
            />
            <StatCard
              label="Reviews"
              value={stats?.reviewCount ?? 0}
              hint="Pizzas reviewed"
              accent="purple"
              icon={<Star className="size-4" />}
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold">Recent Orders</h2>
              <Link
                href="/dashboard/customer/orders"
                className="text-xs font-bold text-brand hover:underline"
              >
                View all
              </Link>
            </div>
            <OrdersTable
              orders={data?.recentOrders ?? []}
              emptyTitle="No orders yet"
              emptyDescription="Browse the menu and place your first artisan pizza order."
            />
            <Link
              href="/menu"
              className={cn(
                buttonVariants(),
                "mt-4 inline-flex gap-2 bg-brand font-bold text-white hover:bg-brand-hover"
              )}
            >
              <ShoppingBag className="size-4" />
              Browse Menu
            </Link>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
