"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

import { apiFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-client"

interface WishlistState {
  userId: string | null
  ids: string[]
}

interface WishlistContextValue {
  itemIds: string[]
  isWishlisted: (itemId: string) => boolean
  isToggling: (itemId: string) => boolean
  toggleWishlist: (itemId: string, itemName?: string) => Promise<void>
  refresh: () => Promise<void>
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user, isPending } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const [state, setState] = useState<WishlistState>({ userId: null, ids: [] })
  const [togglingIds, setTogglingIds] = useState<string[]>([])

  const isCustomer = user?.role === "customer"

  useEffect(() => {
    if (isPending || !user || user.role !== "customer") return

    let active = true
    ;(async () => {
      try {
        const data = await apiFetch<{ itemIds: string[] }>("/wishlist")
        if (active) setState({ userId: user.id, ids: data.itemIds ?? [] })
      } catch {
        if (active) setState({ userId: user.id, ids: [] })
      }
    })()

    return () => {
      active = false
    }
  }, [isPending, user])

  const itemIds = useMemo(
    () => (isCustomer && state.userId === user?.id ? state.ids : []),
    [isCustomer, state, user?.id]
  )

  const isWishlisted = useCallback(
    (itemId: string) => itemIds.includes(itemId),
    [itemIds]
  )

  const isToggling = useCallback(
    (itemId: string) => togglingIds.includes(itemId),
    [togglingIds]
  )

  const refresh = useCallback(async () => {
    if (!user || user.role !== "customer") return
    try {
      const data = await apiFetch<{ itemIds: string[] }>("/wishlist")
      setState({ userId: user.id, ids: data.itemIds ?? [] })
    } catch {
      setState({ userId: user.id, ids: [] })
    }
  }, [user])

  const toggleWishlist = useCallback(
    async (itemId: string, itemName?: string) => {
      if (!user) {
        toast.error("Please sign in to save favorites.")
        router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`)
        return
      }
      if (user.role !== "customer") {
        toast.error("Only customer accounts can save favorites.")
        return
      }
      if (togglingIds.includes(itemId)) return

      const alreadySaved = itemIds.includes(itemId)
      const nextIds = alreadySaved
        ? itemIds.filter((id) => id !== itemId)
        : [...itemIds, itemId]

      setTogglingIds((ids) => [...ids, itemId])
      setState({ userId: user.id, ids: nextIds })

      try {
        if (alreadySaved) {
          await apiFetch(`/wishlist/${itemId}`, { method: "DELETE" })
          toast.info(itemName ? `Removed ${itemName} from your wishlist.` : "Removed from your wishlist.")
        } else {
          await apiFetch("/wishlist", { method: "POST", body: { itemId } })
          toast.success(itemName ? `Saved ${itemName} to your wishlist!` : "Added to your wishlist!")
        }
      } catch (err) {
        setState({ userId: user.id, ids: itemIds })
        toast.error(err instanceof Error ? err.message : "Could not update your wishlist.")
      } finally {
        setTogglingIds((ids) => ids.filter((id) => id !== itemId))
      }
    },
    [itemIds, pathname, router, togglingIds, user]
  )

  const value = useMemo(
    () => ({ itemIds, isWishlisted, isToggling, toggleWishlist, refresh }),
    [itemIds, isWishlisted, isToggling, toggleWishlist, refresh]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a <WishlistProvider>")
  }
  return context
}
