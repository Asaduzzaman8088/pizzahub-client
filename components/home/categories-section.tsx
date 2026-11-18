"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"

export interface CategoryCard {
  id: string
  title: string
  tagline: string
  count: string
  image: string
  popularTopping: string
}

const categories: CategoryCard[] = [
  {
    id: "classic",
    title: "Classic Pizzas",
    tagline: "Timeless Margheritas, pepperoni and cheese pies baked on blistered stone decks.",
    count: "12 Items",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    popularTopping: "San Marzano & Fior di Latte",
  },
  {
    id: "vegetarian",
    title: "Vegetarian Pizzas",
    tagline: "Garden-fresh pies with cashew mozzarella, roasted vegetables and cauliflower crusts.",
    count: "10 Items",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Cashew Ricotta & Fire-Roasted Peppers",
  },
  {
    id: "meat-lovers",
    title: "Meat Lovers",
    tagline: "Cupping pepperoni, fennel sausage, smoked bacon and aged prosciutto in every slice.",
    count: "9 Items",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Double Pepperoni & Hot Honey",
  },
  {
    id: "specialty",
    title: "Specialty & Gourmet",
    tagline: "Black truffle, quattro formaggi and adventurous chef-driven flavor combinations.",
    count: "7 Items",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Wild Foraged Mushrooms & Fontina",
  },
  {
    id: "sides",
    title: "Sides & Appetizers",
    tagline: "Garlic knots, crispy wings and bruschetta to round out the perfect pizza night.",
    count: "6 Items",
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Garlic Butter & Marinara Dip",
  },
  {
    id: "beverages",
    title: "Beverages & Desserts",
    tagline: "Italian sodas, fresh lemonade, tiramisu and gelato to finish on a sweet note.",
    count: "8 Items",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Tiramisu & Pistachio Gelato",
  },
]

export function CategoriesSection() {
  return (
    <section className="border-b border-border/40 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/15 px-3 py-1 text-xs font-bold text-brand-secondary">
              <Sparkles className="size-3.5" />
              <span>Handcrafted Crust Styles</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl text-foreground">
              Explore By Pizza Style
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              From historic Naples ovens to Michigan squares, discover regional masterpieces.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-brand-hover"
          >
            <span>View All Categories</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Category Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
            <Link
              href={`/menu?category=${cat.id}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5"
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
                
                {/* Count Badge */}
                <div className="absolute top-3.5 right-3.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {cat.count}
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
                    {cat.popularTopping}
                  </span>
                  <h3 className="font-heading text-xl font-black text-white">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
                  {cat.tagline}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-brand transition group-hover:text-brand-hover">
                  <span>Browse {cat.title}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
