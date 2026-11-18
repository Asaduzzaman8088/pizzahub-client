"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Star,
  Clock,
  Heart,
  Store,
  MapPin,
  Flame,
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  Award,
  X,
  MessageSquare,
  Plus,
  Minus,
  Loader2,
  RotateCcw,
} from "lucide-react"
import { toast } from "sonner"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { ValuePropsSection } from "@/components/value-props-section"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMenuItem, useMenu } from "@/hooks/use-menu"
import { useAuth } from "@/lib/auth-client"
import { apiFetch } from "@/lib/api"

export default function PizzaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user } = useAuth()

  const { item: pizza, isLoading, error, reload } = useMenuItem(resolvedParams.id)
  const { items: allItems } = useMenu({ limit: 50 })

  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  // Order Form State
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0]
    return today
  })
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("As soon as possible (30-40 min)")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [bakingNotes, setBakingNotes] = useState("")
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false)

  // User auth details
  const userRole = user?.role || "customer"

  useEffect(() => {
    if (!user || user.role !== "customer") {
      setIsWishlisted(false)
      return
    }

    let active = true
    ;(async () => {
      try {
        const data = await apiFetch<{ itemIds: string[] }>("/wishlist")
        if (active) setIsWishlisted(data.itemIds?.includes(resolvedParams.id) ?? false)
      } catch {
        if (active) setIsWishlisted(false)
      }
    })()

    return () => {
      active = false
    }
  }, [user, resolvedParams.id])

  const handleToggleWishlist = async () => {
    if (!pizza) return

    if (!user) {
      toast.error("Please sign in to save favorites.")
      router.push(`/sign-in?redirect=/menu/${pizza.id}`)
      return
    }
    if (user.role !== "customer") {
      toast.error("Only customer accounts can save favorites.")
      return
    }

    const nextState = !isWishlisted
    setIsWishlisted(nextState)

    try {
      if (nextState) {
        await apiFetch("/wishlist", { method: "POST", body: { itemId: pizza.id } })
        toast.success("Added to your favorite pizzas!")
      } else {
        await apiFetch(`/wishlist/${pizza.id}`, { method: "DELETE" })
        toast.info("Removed from your wishlist.")
      }
    } catch (err) {
      setIsWishlisted(!nextState)
      toast.error(err instanceof Error ? err.message : "Could not update your wishlist.")
    }
  }

  const handleOpenOrderModal = () => {
    if (!pizza) return

    if (!user) {
      toast.error("Please sign in as a customer to place an order.")
      router.push(`/sign-in?redirect=/menu/${pizza.id}`)
      return
    }

    if (userRole === "vendor" || userRole === "admin") {
      toast.error(
        `Accounts with role '${userRole}' cannot place customer orders. Please use a customer account.`
      )
      return
    }

    setOrderModalOpen(true)
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pizza) return

    if (!deliveryAddress.trim()) {
      toast.error("Please provide your delivery address.")
      return
    }

    setIsSubmittingOrder(true)
    try {
      await apiFetch("/orders", {
        method: "POST",
        body: {
          itemId: pizza.id,
          quantity,
          deliveryDate,
          deliveryAddress: deliveryAddress.trim(),
          message: [deliveryTimeSlot, bakingNotes.trim()].filter(Boolean).join(" — "),
        },
      })
      setOrderModalOpen(false)
      toast.success(
        `Order confirmed! ${quantity}x ${pizza.name} has been sent to ${pizza.vendorName}.`
      )
      router.push("/dashboard/customer/orders")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not place your order.")
    } finally {
      setIsSubmittingOrder(false)
    }
  }

  // Similar pizzas in same category or district
  const relatedPizzas = allItems.filter((p) => p.id !== pizza?.id).slice(0, 3)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading pizza details...
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !pizza) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-8" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Pizza not found</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            {error || "This pizza may have been removed or is no longer available."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => void reload()}
              className={cn(
                buttonVariants(),
                "gap-2 bg-brand font-bold text-white hover:bg-brand-hover"
              )}
            >
              <RotateCcw className="size-4" />
              Try Again
            </button>
            <Link
              href="/menu"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2 font-bold")}
            >
              <ArrowLeft className="size-4" />
              Back to Menu
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
            <span>/</span>
            <Link href="/menu" className="hover:text-brand">
              Menu
            </Link>
            <span>/</span>
            <span className="text-foreground">{pizza.name}</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-7">
              {/* Main Feature Image */}
              <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-lg sm:h-[480px]">
                <Image
                  src={pizza.images[activeImageIdx] || pizza.images[0]}
                  alt={pizza.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-bold text-white shadow-md">
                    {pizza.categoryLabel}
                  </span>
                  {pizza.isFeatured && (
                    <span className="rounded-full bg-brand-secondary px-3 py-1 text-xs font-bold text-black shadow-md">
                      Featured Special
                    </span>
                  )}
                </div>

                <button
                  onClick={handleToggleWishlist}
                  aria-label="Wishlist"
                  className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-white hover:text-rose-500"
                >
                  <Heart
                    className={cn(
                      "size-5 transition-colors",
                      isWishlisted ? "fill-rose-500 text-rose-500" : "text-white"
                    )}
                  />
                </button>
              </div>

              {/* Thumbnails */}
              {pizza.images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {pizza.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={cn(
                        "relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                        activeImageIdx === idx
                          ? "border-brand shadow-md scale-102"
                          : "border-border opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Baking Specs Bar */}
              <div className="mt-8 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-xs sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Flame className="size-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase">
                      Hearth Heat
                    </p>
                    <p className="font-heading text-xs font-bold text-foreground">
                      {pizza.ovenTemperature}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/15 text-brand-secondary">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase">
                      Dough Rise
                    </p>
                    <p className="font-heading text-xs font-bold text-foreground">
                      {pizza.doughFermentation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:col-span-1 col-span-2">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase">
                      Ingredients
                    </p>
                    <p className="font-heading text-xs font-bold text-foreground">
                      100% Certified Origin
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Order Action Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-border bg-card p-7 shadow-xl lg:p-8">
                {/* Rating & Vendor Header */}
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500">
                    <Star className="size-4.5 fill-amber-400 text-amber-400" />
                    <span>{pizza.rating}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      ({pizza.reviewCount} customer reviews)
                    </span>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Approved Item
                  </span>
                </div>

                {/* Pizza Name */}
                <h1 className="mt-4 font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  {pizza.name}
                </h1>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-heading text-3xl font-black text-brand">
                    ${pizza.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    + ${pizza.deliveryFee === 0 ? "Free" : pizza.deliveryFee.toFixed(2)} delivery fee
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {pizza.longDescription}
                </p>

                {/* Ingredients List */}
                <div className="mt-6">
                  <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider">
                    Fresh Oven Ingredients:
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {pizza.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                      >
                        ✓ {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantity Control & Quick Order Trigger */}
                <div className="mt-8 rounded-2xl border border-border/80 bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Select Quantity:</span>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-40"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-heading font-black text-foreground">
                      ${(pizza.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Button */}
                <div className="mt-6 space-y-2.5">
                  <button
                    onClick={handleOpenOrderModal}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full justify-center gap-2 rounded-2xl bg-brand py-6 font-heading text-base font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-hover"
                    )}
                  >
                    <ShoppingBag className="size-5" />
                    <span>Order Now (${(pizza.price * quantity).toFixed(2)})</span>
                  </button>

                  <p className="text-center text-[11px] text-muted-foreground">
                    🔒 Orders prepared live on demand. Real-time temperature lock delivery.
                  </p>
                </div>

                {/* Pizzeria Vendor Card */}
                <div className="mt-8 rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Store className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-heading text-sm font-bold text-foreground">
                          {pizza.vendorName}
                        </h4>
                        <ShieldCheck className="size-3.5 text-emerald-500" />
                      </div>
                      <p className="text-xs text-muted-foreground">{pizza.vendorAddress}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                          <CheckCircle className="size-3" />
                          Hygiene Vetted Kitchen
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Pizzas Strip */}
          <div className="mt-20 border-t border-border/60 pt-12">
            <h3 className="font-heading text-2xl font-black text-foreground">
              You Might Also Crave
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Other artisan creations hand-stretched in neighboring ovens.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPizzas.map((item) => (
                <Link
                  key={item.id}
                  href={`/menu/${item.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-xs transition hover:border-brand/40 hover:shadow-md"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-bold text-brand uppercase">
                      {item.categoryLabel}
                    </span>
                    <h4 className="truncate font-heading text-sm font-bold text-foreground group-hover:text-brand">
                      {item.name}
                    </h4>
                    <p className="font-heading text-sm font-black text-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Order Now Modal Dialog */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in-0">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8 text-foreground">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border/60 pb-4">
              <div>
                <span className="text-xs font-bold text-brand uppercase">Place Pizza Order</span>
                <h3 className="font-heading text-xl font-black text-foreground">
                  {pizza.name}
                </h3>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Order Form */}
            <form onSubmit={handleOrderSubmit} className="mt-5 space-y-4">
              {/* Order Summary Line */}
              <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3 text-xs">
                <div>
                  <span className="font-semibold text-foreground">
                    {quantity}x {pizza.name}
                  </span>
                  <p className="text-muted-foreground">{pizza.vendorName}</p>
                </div>
                <span className="font-heading text-sm font-black text-brand">
                  ${(pizza.price * quantity).toFixed(2)}
                </span>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block text-xs font-bold text-foreground">
                  Delivery Date <span className="text-brand">*</span>
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Calendar className="size-4" />
                  </div>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2.5 pr-3 pl-10 text-xs text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Delivery Time Slot */}
              <div>
                <label className="block text-xs font-bold text-foreground">
                  Delivery Time Slot <span className="text-brand">*</span>
                </label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background py-2.5 px-3 text-xs text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-hidden"
                >
                  <option value="As soon as possible (30-40 min)">
                    ⚡ As soon as possible (30-40 min)
                  </option>
                  <option value="Lunch: 12:00 PM - 1:00 PM">Lunch: 12:00 PM - 1:00 PM</option>
                  <option value="Afternoon: 2:00 PM - 3:00 PM">Afternoon: 2:00 PM - 3:00 PM</option>
                  <option value="Dinner: 6:00 PM - 7:00 PM">Dinner: 6:00 PM - 7:00 PM</option>
                  <option value="Late Evening: 8:00 PM - 9:00 PM">Late Evening: 8:00 PM - 9:00 PM</option>
                </select>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-foreground">
                  Delivery Street Address <span className="text-brand">*</span>
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <MapPin className="size-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B, New York, NY"
                    className="w-full rounded-xl border border-input bg-background py-2.5 pr-3 pl-10 text-xs text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Special Baking / Delivery Message */}
              <div>
                <label className="block text-xs font-bold text-foreground">
                  Special Kitchen Message / Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={bakingNotes}
                  onChange={(e) => setBakingNotes(e.target.value)}
                  placeholder="e.g. Extra well-done blistered crust, please leave at door, gate code #1234"
                  className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-hidden"
                />
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <button
                  type="button"
                  onClick={() => setOrderModalOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "flex-1 justify-center rounded-xl font-bold"
                  )}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className={cn(
                    buttonVariants(),
                    "flex-1 justify-center gap-2 rounded-xl bg-brand font-bold text-white shadow-md hover:bg-brand-hover disabled:opacity-50"
                  )}
                >
                  <ShoppingBag className="size-4" />
                  <span>{isSubmittingOrder ? "Confirming..." : "Confirm Order"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ValuePropsSection />

      <NewsletterSection />

      <Footer />
    </div>
  )
}
