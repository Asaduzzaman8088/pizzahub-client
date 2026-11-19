"use client"

import Link from "next/link"
import Image from "next/image"
import { AlertTriangle, Clock, Heart, Loader2, MapPin, RotateCcw, ShoppingBag, Star, Store } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { useMenu } from "@/hooks/use-menu"
import { useWishlist } from "@/lib/wishlist-client"
import { cn } from "@/lib/utils"

export function FeaturedPizzas() {
  const { items, isLoading, error, reload } = useMenu({ limit: 6, featured: true })
  const { isWishlisted, isToggling, toggleWishlist } = useWishlist()

  return (
    <section id="featured" className="border-b border-border/40 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand">
              <span>Chef Vetted &amp; Approved</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl text-foreground">
              Featured Artisan Pizzas
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              The highest-rated artisan pies baked fresh in local neighborhood brick ovens today.
            </p>
          </div>

          <Link
            href="/menu"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "gap-2 border-border font-bold hover:border-brand/40 hover:text-brand"
            )}
          >
            <span>Explore Full Menu</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
              >
                <div className="h-60 w-full animate-pulse bg-muted" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="my-14 flex flex-col items-center justify-center rounded-3xl border border-dashed border-destructive/40 bg-card p-10 text-center">
            <AlertTriangle className="size-8 text-destructive" />
            <p className="mt-3 font-heading text-lg font-bold text-foreground">
              We couldn&apos;t load the featured pizzas
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <button
              onClick={() => void reload()}
              className={cn(buttonVariants(), "mt-5 gap-2 bg-brand font-bold text-white hover:bg-brand-hover")}
            >
              <RotateCcw className="size-4" />
              Try Again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="my-14 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-heading text-lg font-bold text-foreground">No featured pizzas yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Admins can feature approved pizzas from the moderation dashboard.
            </p>
            <Link
              href="/menu"
              className={cn(buttonVariants(), "mt-5 bg-brand font-bold text-white hover:bg-brand-hover")}
            >
              Browse the Menu
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {items.map((pizza) => {
              const favorite = isWishlisted(pizza.id)
              const tags = [
                ...(pizza.isVegetarian ? ["Vegetarian"] : []),
                ...(pizza.isSpicy ? ["Spicy"] : []),
                ...(pizza.isGlutenFree ? ["Gluten-Free"] : []),
                ...pizza.ingredients.slice(0, 2),
              ].slice(0, 3)

              return (
                <div
                  key={pizza.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-muted">
                    {pizza.images?.[0] && (
                      <Image
                        src={pizza.images[0]}
                        alt={pizza.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="rounded-full bg-brand px-3 py-1 font-heading text-xs font-bold text-white shadow-md">
                        {pizza.categoryLabel}
                      </span>

                      <button
                        onClick={() => void toggleWishlist(pizza.id, pizza.name)}
                        disabled={isToggling(pizza.id)}
                        aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
                        className="flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white hover:text-rose-500 disabled:opacity-60"
                      >
                        {isToggling(pizza.id) ? (
                          <Loader2 className="size-4.5 animate-spin" />
                        ) : (
                          <Heart
                            className={cn(
                              "size-4.5 transition-colors",
                              favorite ? "fill-rose-500 text-rose-500" : "text-white"
                            )}
                          />
                        )}
                      </button>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3.5 left-3.5 rounded-xl bg-black/75 px-3 py-1.5 backdrop-blur-md">
                      <span className="font-heading text-lg font-black text-white">
                        ${pizza.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Delivery ETA */}
                    <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 rounded-xl bg-black/75 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Clock className="size-3.5 text-amber-300" />
                      <span>{pizza.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Rating & Vendor */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                          <Star className="size-4 fill-amber-400 text-amber-400" />
                          <span>{pizza.reviewCount > 0 ? pizza.rating : "New"}</span>
                          <span className="text-muted-foreground font-normal">
                            ({pizza.reviewCount})
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Store className="size-3.5 text-brand" />
                          <span className="truncate max-w-[140px] font-medium">
                            {pizza.vendorName}
                          </span>
                          {pizza.vendorIsPremium && (
                            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 uppercase dark:bg-amber-900/30 dark:text-amber-300">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3 text-brand" />
                        <span className="truncate">{pizza.vendorLocation}</span>
                      </div>

                      <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-foreground transition group-hover:text-brand">
                        {pizza.name}
                      </h3>

                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed sm:text-sm">
                        {pizza.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 flex items-center gap-2.5 border-t border-border/60 pt-4">
                      <Link
                        href={`/menu/${pizza.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "flex-1 justify-center rounded-xl border-border font-bold hover:bg-muted"
                        )}
                      >
                        <span>Details</span>
                      </Link>

                      <Link
                        href={`/menu/${pizza.id}?order=1`}
                        className={cn(
                          buttonVariants({ size: "sm" }),
                          "flex-1 justify-center gap-1.5 rounded-xl bg-brand font-bold text-white shadow-md shadow-brand/20 hover:bg-brand-hover"
                        )}
                      >
                        <ShoppingBag className="size-4" />
                        <span>Order Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
