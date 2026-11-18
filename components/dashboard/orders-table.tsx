import Image from "next/image"
import type { ReactNode } from "react"
import { MapPin, Package } from "lucide-react"

import { EmptyBlock, StatusBadge } from "@/components/dashboard/ui"
import type { Order } from "@/lib/types"

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    })
  } catch {
    return value
  }
}

interface OrdersTableProps {
  orders: Order[]
  perspective?: "customer" | "vendor" | "admin"
  emptyTitle?: string
  emptyDescription?: string
  renderActions?: (order: Order) => ReactNode
}

export function OrdersTable({
  orders,
  perspective = "customer",
  emptyTitle = "No orders yet",
  emptyDescription,
  renderActions,
}: OrdersTableProps) {
  if (orders.length === 0) {
    return <EmptyBlock title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
              {order.item?.images?.[0] ? (
                <Image
                  src={order.item.images[0]}
                  alt={order.item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <Package className="size-6" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-heading text-sm font-bold text-foreground">
                  {order.item?.name || "Deleted item"}
                </p>
                <StatusBadge status={order.status} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Qty {order.quantity} &middot; ${order.totalPrice.toFixed(2)} &middot;{" "}
                {formatDate(order.createdAt)}
              </p>
              {perspective === "customer" && order.vendor && (
                <p className="mt-1 text-xs text-muted-foreground">
                  From <span className="font-semibold text-foreground">{order.vendor.name}</span>
                </p>
              )}
              {perspective !== "customer" && order.customer && (
                <p className="mt-1 text-xs text-muted-foreground">
                  For <span className="font-semibold text-foreground">{order.customer.name}</span>{" "}
                  ({order.customer.email})
                </p>
              )}
              {order.deliveryAddress && (
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {order.deliveryAddress}
                </p>
              )}
            </div>

            <div className="text-left sm:text-right">
              <p className="font-heading text-lg font-black text-brand">
                ${order.totalPrice.toFixed(2)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Deliver {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
              {renderActions && <div className="mt-2 flex justify-start sm:justify-end">{renderActions(order)}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
