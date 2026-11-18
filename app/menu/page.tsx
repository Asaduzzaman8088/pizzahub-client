"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  Clock,
  Heart,
  Store,
  MapPin,
  X,
  RotateCcw,
  ShoppingBag,
  ArrowUpDown,
  Sparkles,
  Check,
} from "lucide-react"
import { toast } from "sonner"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { ValuePropsSection } from "@/components/value-props-section"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MENU_ITEMS, type MenuItem } from "@/lib/menu-data"

const categories = [
  { id: "all", label: "All Styles" },
  { id: "neapolitan", label: "Neapolitan" },
  { id: "new-york", label: "New York" },
  { id: "detroit", label: "Detroit Square" },
  { id: "deep-dish", label: "Deep Dish" },
  { id: "gourmet", label: "Gourmet White" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
]

const locations = [
  "All Districts",
  "Little Italy, Manhattan",
  "Williamsburg, Brooklyn",
  "SoHo, Manhattan",
  "Astoria, Queens",
  "Midtown, Manhattan",
  "Greenwich Village, Manhattan",
]

const sortOptions = [
  { id: "featured", label: "Featured & Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
  { id: "speed", label: "Fastest Delivery" },
]

function MenuCatalog() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Filter States
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [selectedLocation, setSelectedLocation] = useState("All Districts")
  const [sortBy, setSortBy] = useState("featured")
  const [onlyVegetarian, setOnlyVegetarian] = useState(false)
  const [onlySpicy, setOnlySpicy] = useState(false)
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  // Sync state if query params change
  useEffect(() => {
    const qSearch = searchParams.get("search")
    const qCategory = searchParams.get("category")
    if (qSearch !== null) setSearch(qSearch)
    if (qCategory !== null) setCategory(qCategory)
  }, [searchParams])

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    let result = [...MENU_ITEMS]

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.vendorName.toLowerCase().includes(q) ||
          item.ingredients.some((ing) => ing.toLowerCase().includes(q))
      )
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((item) => item.category === category)
    }

    // District / Location filter
    if (selectedLocation !== "All Districts") {
      result = result.filter((item) => item.vendorLocation === selectedLocation)
    }

    // Dietary filters
    if (onlyVegetarian) {
      result = result.filter((item) => item.isVegetarian)
    }
    if (onlySpicy) {
      result = result.filter((item) => item.isSpicy)
    }
    if (onlyGlutenFree) {
      result = result.filter((item) => item.isGlutenFree)
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "speed":
        result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime))
        break
      default:
        // featured first
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    return result
  }, [search, category, selectedLocation, sortBy, onlyVegetarian, onlySpicy, onlyGlutenFree])

  const toggleWishlist = (id: string, name: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id))
      toast.info(`Removed ${name} from your favorites.`)
    } else {
      setWishlist([...wishlist, id])
      toast.success(`Saved ${name} to your wishlist! ❤️`)
    }
  }

  const resetFilters = () => {
    setSearch("")
    setCategory("all")
    setSelectedLocation("All Districts")
    setSortBy("featured")
    setOnlyVegetarian(false)
    setOnlySpicy(false)
    setOnlyGlutenFree(false)
    router.replace("/menu")
  }

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    selectedLocation !== "All Districts" ||
    sortBy !== "featured" ||
    onlyVegetarian ||
    onlySpicy ||
    onlyGlutenFree

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-border/60 pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wider">
            <Flame className="size-3.5 text-brand" />
            <span>Curated Artisan Menu</span>
          </div>
          <h1 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-5xl text-foreground">
            Explore Handcrafted Pizzas
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Baked to order by certified master pizzaiolos across New York&apos;s culinary districts.
          </p>
        </div>

        {/* Total Results Count */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-xs">
          <Sparkles className="size-4 text-brand" />
          <span className="text-xs font-bold text-foreground sm:text-sm">
            {filteredItems.length} {filteredItems.length === 1 ? "Pizza Available" : "Pizzas Available"}
          </span>
        </div>
      </div>

      {/* Main Filter & Search Control Bar */}
      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* Search Input Box */}
          <div className="relative md:col-span-6 lg:col-span-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
              <Search className="size-4.5 text-brand" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by pizza, topping, or pizzeria..."
              className="w-full rounded-2xl border border-input bg-card py-3 pr-10 pl-10 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-hidden"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* District Location Selector */}
          <div className="relative md:col-span-3 lg:col-span-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
              <MapPin className="size-4 text-brand" />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-input bg-card py-3 pr-8 pl-10 text-sm font-medium text-foreground shadow-xs focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-hidden"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative md:col-span-3 lg:col-span-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
              <ArrowUpDown className="size-4 text-brand" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-input bg-card py-3 pr-8 pl-10 text-sm font-medium text-foreground shadow-xs focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-hidden"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Horizontal Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = category === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm",
                  isSelected
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "border border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Dietary Filters & Clear Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/30 p-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-foreground">Dietary Preferences:</span>

            <button
              onClick={() => setOnlyVegetarian(!onlyVegetarian)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1 font-semibold transition",
                onlyVegetarian
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {onlyVegetarian && <Check className="size-3" />}
              <span>Vegetarian</span>
            </button>

            <button
              onClick={() => setOnlySpicy(!onlySpicy)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1 font-semibold transition",
                onlySpicy
                  ? "border-rose-600 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                  : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {onlySpicy && <Check className="size-3" />}
              <span>Spicy / Hot Honey</span>
            </button>

            <button
              onClick={() => setOnlyGlutenFree(!onlyGlutenFree)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1 font-semibold transition",
                onlyGlutenFree
                  ? "border-amber-600 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {onlyGlutenFree && <Check className="size-3" />}
              <span>Gluten-Free</span>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-lg text-xs font-bold text-destructive hover:underline"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Pizza Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <Search className="size-8" />
          </div>
          <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
            No artisan pizzas match your current filters
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Try adjusting your search keyword, switching district locations, or clearing your dietary filters.
          </p>
          <button
            onClick={resetFilters}
            className={cn(
              buttonVariants(),
              "mt-6 gap-2 bg-brand font-bold text-white shadow-md hover:bg-brand-hover"
            )}
          >
            <RotateCcw className="size-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((pizza) => {
            const isFav = wishlist.includes(pizza.id)

            return (
              <div
                key={pizza.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={pizza.images[0]}
                    alt={pizza.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="rounded-full bg-brand px-3 py-1 font-heading text-xs font-bold text-white shadow-md">
                      {pizza.categoryLabel}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(pizza.id, pizza.name)}
                      aria-label="Add to favorites"
                      className="flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white hover:text-rose-500"
                    >
                      <Heart
                        className={cn(
                          "size-4.5 transition-colors",
                          isFav ? "fill-rose-500 text-rose-500" : "text-white"
                        )}
                      />
                    </button>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3.5 left-3.5 rounded-xl bg-black/75 px-3 py-1.5 backdrop-blur-md">
                    <span className="font-heading text-lg font-black text-white">
                      ${pizza.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery Time */}
                  <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 rounded-xl bg-black/75 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Clock className="size-3.5 text-amber-300" />
                    <span>{pizza.deliveryTime}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Rating & Vendor Location */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span>{pizza.rating}</span>
                        <span className="text-muted-foreground font-normal">
                          ({pizza.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Store className="size-3.5 text-brand" />
                        <span className="max-w-[140px] truncate font-medium">
                          {pizza.vendorName}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/menu/${pizza.id}`}>
                      <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-foreground transition group-hover:text-brand">
                        {pizza.name}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed sm:text-sm">
                      {pizza.description}
                    </p>

                    {/* Ingredients summary pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {pizza.ingredients.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground"
                        >
                          {ing}
                        </span>
                      ))}
                      {pizza.ingredients.length > 3 && (
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          +{pizza.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-2.5 border-t border-border/60 pt-4">
                    <Link
                      href={`/menu/${pizza.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "flex-1 justify-center rounded-xl border-border font-bold hover:bg-muted"
                      )}
                    >
                      <span>View Details</span>
                    </Link>

                    <Link
                      href={`/menu/${pizza.id}`}
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
  )
}

export default function MenuPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 py-16 text-center">
              <div className="inline-block size-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
              <p className="mt-4 text-sm text-muted-foreground">Loading artisan menu...</p>
            </div>
          }
        >
          <MenuCatalog />
        </Suspense>
      </main>

      <ValuePropsSection />

      <NewsletterSection />

      <Footer />
    </div>
  )
}
