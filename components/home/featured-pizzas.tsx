"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  Star,
  Clock,
  Heart,
  Store,
  ShoppingBag,
  Sparkles,
  Flame,
  CheckCircle,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PizzaItem {
  id: string
  name: string
  category: string
  description: string
  price: number
  vendorName: string
  vendorLocation: string
  rating: number
  reviewCount: number
  deliveryTime: string
  image: string
  isFeatured: boolean
  tags: string[]
}

const featuredPizzas: PizzaItem[] = [
  {
    id: "pizza-1",
    name: "Margherita Di Bufala D.O.P.",
    category: "Neapolitan",
    description: "Certified San Marzano tomatoes, imported campana buffalo mozzarella, fresh sweet basil & organic olive oil.",
    price: 18.99,
    vendorName: "Bella Napoli Wood Ovens",
    vendorLocation: "Little Italy, NY",
    rating: 4.9,
    reviewCount: 384,
    deliveryTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80",
    isFeatured: true,
    tags: ["Vegetarian", "Chef's Signature", "Wood-Fired"],
  },
  {
    id: "pizza-2",
    name: "Crispy Cup Double Pepperoni",
    category: "New York Style",
    description: "Charred cupping pepperoni with curled crispy edges, spicy honey drizzle, low moisture whole-milk mozzarella.",
    price: 21.5,
    vendorName: "Brooklyn Crust & Co.",
    vendorLocation: "Williamsburg, NY",
    rating: 4.9,
    reviewCount: 512,
    deliveryTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
    isFeatured: true,
    tags: ["Best Seller", "Spicy", "Crispy Edge"],
  },
  {
    id: "pizza-3",
    name: "Black Truffle & Foraged Mushroom",
    category: "Gourmet White",
    description: "Cremini and chanterelle mushrooms, white truffle cream, fontina, whipped ricotta and cracked black pepper.",
    price: 24.99,
    vendorName: "Osteria Del Forno",
    vendorLocation: "SoHo, NY",
    rating: 5.0,
    reviewCount: 228,
    deliveryTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
    isFeatured: true,
    tags: ["Gourmet", "Truffle", "Vegetarian"],
  },
  {
    id: "pizza-4",
    name: "Detroit Motor City Vodka Sausage",
    category: "Detroit Square",
    description: "Thick caramelized cheese perimeter, house-made fennel sausage, creamy vodka sauce and crushed oregano.",
    price: 22.0,
    vendorName: "Square Pan Artisans",
    vendorLocation: "Queens, NY",
    rating: 4.8,
    reviewCount: 194,
    deliveryTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80",
    isFeatured: true,
    tags: ["Cheesy Crust", "House Sauce"],
  },
  {
    id: "pizza-5",
    name: "Chicago Deep Dish Supreme",
    category: "Deep Dish",
    description: "Two inches of molten mozzarella, layers of seasoned ground chuck, green peppers, mushrooms and chunky plum sauce.",
    price: 26.5,
    vendorName: "Windy City Iron Skillet",
    vendorLocation: "Midtown, NY",
    rating: 4.9,
    reviewCount: 410,
    deliveryTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=700&q=80",
    isFeatured: true,
    tags: ["Heavy Crust", "Cheese Pull"],
  },
  {
    id: "pizza-6",
    name: "Sweet Hot Honey & Prosciutto Crudo",
    category: "Artisan Fusion",
    description: "24-month aged Prosciutto di Parma laid over melted stracciatella, fresh baby arugula and habanero honey.",
    price: 23.5,
    vendorName: "Roma Artisan Hearth",
    vendorLocation: "Greenwich Village, NY",
    rating: 4.9,
    reviewCount: 340,
    deliveryTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    isFeatured: true,
    tags: ["Sweet & Savory", "Prosciutto D.O.P"],
  },
]

export function FeaturedPizzas() {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedPizza, setSelectedPizza] = useState<PizzaItem | null>(null)

  const toggleWishlist = (id: string, name: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id))
      toast.info(`Removed ${name} from your favorites.`)
    } else {
      setWishlist([...wishlist, id])
      toast.success(`Added ${name} to your favorites! ❤️`)
    }
  }

  const handleQuickOrder = (pizza: PizzaItem) => {
    toast.success(`Redirecting to place order for ${pizza.name}...`)
  }

  return (
    <section id="featured" className="border-b border-border/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand">
              <Flame className="size-3.5 text-brand" />
              <span>Chef Vetted & Approved</span>
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
            <span>Explore All 50+ Pizzas</span>
            <Eye className="size-4" />
          </Link>
        </div>

        {/* 6 Grid Cards */}
        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredPizzas.map((pizza) => {
            const isFavorite = wishlist.includes(pizza.id)

            return (
              <div
                key={pizza.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="rounded-full bg-brand px-3 py-1 font-heading text-xs font-bold text-white shadow-md">
                      {pizza.category}
                    </span>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => toggleWishlist(pizza.id, pizza.name)}
                      aria-label="Add to wishlist"
                      className="flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white hover:text-rose-500"
                    >
                      <Heart
                        className={cn(
                          "size-4.5 transition-colors",
                          isFavorite ? "fill-rose-500 text-rose-500" : "text-white"
                        )}
                      />
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
                    {/* Rating & Review Counter */}
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
                        <span className="truncate max-w-[140px] font-medium">
                          {pizza.vendorName}
                        </span>
                      </div>
                    </div>

                    {/* Pizza Title */}
                    <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-foreground transition group-hover:text-brand">
                      {pizza.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed sm:text-sm">
                      {pizza.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {pizza.tags.map((tag) => (
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
      </div>
    </section>
  )
}
