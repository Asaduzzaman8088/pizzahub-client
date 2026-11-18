"use client"

import { useState } from "react"
import { Copy, Check, Tag, Sparkles, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const coupons = [
  {
    code: "PIZZAHUB20",
    discount: "20% OFF",
    description: "Any artisan pizza from verified vendors. Valid this week only.",
    expiry: "Ends Sunday 11:59 PM",
    color: "from-brand to-brand-hover",
    badge: "Most Popular",
  },
  {
    code: "FIRSTSLICE",
    discount: "FREE Delivery",
    description: "Zero delivery fee on your very first PizzaHub order.",
    expiry: "One-time use per account",
    color: "from-amber-500 to-orange-600",
    badge: "New Users",
  },
  {
    code: "WOODFIRED15",
    discount: "15% OFF",
    description: "Exclusively on Neapolitan and wood-fired pizza categories.",
    expiry: "Valid all month",
    color: "from-emerald-600 to-teal-700",
    badge: "Category Deal",
  },
]

export function CouponBanner() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(`Code "${code}" copied! Paste it at checkout to save.`)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  return (
    <section className="border-b border-border/40 bg-muted/20 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-black text-foreground sm:text-3xl">
            🎟️ Exclusive Coupon Codes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Click any code to copy it instantly — apply at checkout for instant savings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${coupon.color} p-6 text-white shadow-lg`}
            >
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  <Sparkles className="size-3 text-yellow-200" />
                  {coupon.badge}
                </div>

                <div className="text-3xl font-black">{coupon.discount}</div>
                <p className="mt-1 text-sm text-white/85 leading-relaxed">
                  {coupon.description}
                </p>
                <p className="mt-2 text-xs text-white/65 font-medium">
                  ⏰ {coupon.expiry}
                </p>

                {/* Code + Copy Button */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/30 bg-black/25 px-3 py-2.5 backdrop-blur-md">
                    <Tag className="size-3.5 text-yellow-300 shrink-0" />
                    <span className="font-mono text-sm font-black tracking-widest text-yellow-200 truncate">
                      {coupon.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="flex shrink-0 items-center gap-1 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-gray-800 transition hover:bg-white/90 active:scale-95"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-brand px-8 font-bold text-white hover:bg-brand-hover"
            )}
          >
            Browse All Pizzas
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
