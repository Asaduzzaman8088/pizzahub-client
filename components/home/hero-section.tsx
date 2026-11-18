"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "motion/react"
import {
  ArrowRight,
  Flame,
  Search,
  Store,
  Star,
  Pizza,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/menu")
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-border/40 py-12 md:py-16 lg:py-20">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-brand/15 blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-brand-secondary/15 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-bold text-brand shadow-xs">
            <span className="flex size-2 rounded-full bg-brand animate-pulse" />
            <Flame className="size-3.5 text-brand" />
            <span>Over 45+ Local Artisanal Pizzerias Baking Right Now</span>
          </div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 font-heading text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hot, Handcrafted Pizza. <br />
            <span className="bg-linear-to-r from-brand via-brand-hover to-brand-secondary bg-clip-text text-transparent">
              Baked To Perfection.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl leading-relaxed"
          >
            Discover authentic Neapolitan, Detroit square crusts, and New York slices crafted by passionate local pizzaiolos. Hand-stretched dough, 900° wood fire, delivered within 30 minutes.
          </motion.p>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-9 flex max-w-2xl items-center rounded-2xl border border-border bg-card/90 p-1.5 shadow-xl shadow-brand/5 backdrop-blur-md transition-all focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20"
          >
            <div className="flex items-center pl-3 text-muted-foreground">
              <Search className="size-5 text-brand" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by pizza name, toppings, or pizzeria (e.g. Margherita, Truffle, Pepperoni)..."
              className="w-full bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand/25 transition hover:bg-brand-hover"
            >
              <span>Search Menu</span>
              <ArrowRight className="size-4" />
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Popular:</span>
            {[
              { name: "Napoli Margherita", query: "Margherita" },
              { name: "Crispy Pepperoni", query: "Pepperoni" },
              { name: "Detroit Square", query: "Detroit" },
              { name: "White Truffle", query: "Truffle" },
              { name: "Hot Honey Sausage", query: "Honey" },
            ].map((tag) => (
              <button
                key={tag.name}
                type="button"
                onClick={() => router.push(`/menu?search=${encodeURIComponent(tag.query)}`)}
                className="rounded-full border border-border bg-muted/60 px-3 py-1 font-medium transition hover:border-brand/50 hover:bg-card hover:text-brand"
              >
                {tag.name}
              </button>
            ))}
          </div>

          {/* Direct CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-brand px-7 text-base font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-hover hover:scale-[1.02] transition-transform"
              )}
            >
              <Pizza className="size-5" />
              <span>Explore Full Menu</span>
            </Link>

            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-border px-6 text-base font-bold hover:bg-muted hover:border-brand/40"
              )}
            >
              <Store className="size-5 text-brand-secondary" />
              <span>Register as Pizzeria Vendor</span>
            </Link>
          </div>
        </div>

        {/* Live Metrics Grid Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-md sm:grid-cols-4 lg:p-8"
        >
          <div className="flex flex-col items-center border-b border-border/60 pb-4 text-center sm:border-r sm:border-b-0 sm:pb-0">
            <span className="font-heading text-3xl font-black text-brand lg:text-4xl">
              45+
            </span>
            <span className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
              Artisan Pizzerias
            </span>
            <span className="text-[11px] text-muted-foreground/80">Locally vetted</span>
          </div>

          <div className="flex flex-col items-center border-b border-border/60 pb-4 text-center sm:border-r sm:border-b-0 sm:pb-0">
            <span className="font-heading text-3xl font-black text-brand-secondary lg:text-4xl">
              28 min
            </span>
            <span className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
              Avg Oven-to-Door Time
            </span>
            <span className="text-[11px] text-muted-foreground/80">Thermal lock insulated</span>
          </div>

          <div className="flex flex-col items-center text-center sm:border-r sm:border-b-0">
            <span className="font-heading text-3xl font-black text-foreground lg:text-4xl">
              18,500+
            </span>
            <span className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
              Fresh Pizzas Baked
            </span>
            <span className="text-[11px] text-muted-foreground/80">Across local districts</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 font-heading text-3xl font-black text-amber-500 lg:text-4xl">
              <span>4.9</span>
              <Star className="size-6 fill-amber-400 text-amber-400" />
            </div>
            <span className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
              Customer Satisfaction
            </span>
            <span className="text-[11px] text-muted-foreground/80">Over 3,200 reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
