"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { EmptyBlock, ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import type { MenuItem } from "@/lib/types"

interface WishlistResponse {
  items: MenuItem[]
}

export default function CustomerWishlistPage() {
  const { data, isLoading, error, reload } = useApi<WishlistResponse>("/wishlist")

  const remove = async (itemId: string) => {
    try {
      await apiFetch(`/wishlist/${itemId}`, { method: "DELETE" })
      toast.info("Removed from your wishlist.")
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove the item.")
    }
  }

  const items = data?.items ?? []

  return (
    <DashboardShell role="customer" title="Wishlist" description="Your saved favorite pizzas.">
      {isLoading ? (
        <LoadingBlock label="Loading wishlist..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : items.length === 0 ? (
        <EmptyBlock
          title="Your wishlist is empty"
          description="Tap the heart on any pizza to save it here for later."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs"
            >
              <div className="relative h-44 w-full bg-muted">
                {item.images?.[0] && (
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold text-white">
                  {item.categoryLabel}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-base font-bold">{item.name}</h3>
                  <span className="font-heading text-sm font-black text-brand">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.vendorName}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    href={`/menu/${item.id}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white hover:bg-brand-hover"
                  >
                    <Heart className="size-3.5" />
                    View & Order
                  </Link>
                  <button
                    onClick={() => void remove(item.id)}
                    aria-label="Remove from wishlist"
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
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
