"use client"

import Link from "next/link"
import { Flame, ArrowRight, Tag, Clock, Zap } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Active Deals", value: "12+", icon: Tag },
  { label: "Deals Ending Soon", value: "5", icon: Clock },
  { label: "Max Savings", value: "35%", icon: Zap },
]

export function HotDealsHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-br from-brand via-brand-hover to-rose-800 py-20 text-white">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 size-[500px] rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
          <Flame className="size-4 text-amber-300 animate-pulse" />
          <span>Limited-Time Offers — Grab Them Before They're Gone!</span>
        </div>

        <h1 className="mt-5 font-heading text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          🔥 Hot Deals &{" "}
          <span className="text-amber-300">Exclusive Combos</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/85 leading-relaxed">
          Stack coupon codes, claim daily specials, and unlock combo discounts on
          handcrafted wood-fired pizzas from verified neighborhood kitchens near
          you. Fresh savings, every single day.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/menu"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-white px-8 font-bold text-brand hover:bg-white/90 shadow-xl"
            )}
          >
            <span>Order Now & Save</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#combos"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/40 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            View Combos
          </Link>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 px-4 py-4 backdrop-blur-sm text-center"
            >
              <Icon className="size-5 text-amber-300" />
              <span className="font-heading text-2xl font-black">{value}</span>
              <span className="text-xs text-white/75 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
