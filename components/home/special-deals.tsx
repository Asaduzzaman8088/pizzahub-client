"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, Check, Sparkles, Percent, Tag, ArrowRight, Gift } from "lucide-react"
import { toast } from "sonner"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SpecialDeals() {
  const [copied, setCopied] = useState(false)
  const couponCode = "PIZZAHUB20"

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode)
    setCopied(true)
    toast.success(`Coupon code ${couponCode} copied to clipboard! Enjoy 20% off at checkout.`)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="deals" className="border-b border-border/40 py-16 lg:py-20 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Card */}
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-linear-to-br from-brand via-brand-hover to-brand-secondary p-8 text-white shadow-2xl sm:p-12 lg:p-14">
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-black tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="size-3.5 text-amber-200" />
                <span>Limited Time Flavor Pass</span>
              </div>

              <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white">
                Get 20% Off Your Entire Artisan Order
              </h2>

              <p className="mt-3 text-sm text-white/90 sm:text-base leading-relaxed">
                Applies automatically to any handcrafted pizza from verified neighborhood kitchens. Experience genuine wood-fired flavor at an unbeatable price today.
              </p>

              {/* Coupon Pill with One-Click Copy */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-black/30 px-4 py-2.5 backdrop-blur-md">
                  <Tag className="size-4 text-amber-300" />
                  <span className="font-mono text-lg font-black tracking-widest text-amber-300">
                    {couponCode}
                  </span>
                  <button
                    onClick={handleCopyCoupon}
                    className="flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-xs font-bold text-brand transition hover:bg-white/90"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <span className="text-xs text-white/80">
                  *Valid for all registered customers this week.
                </span>
              </div>
            </div>

            {/* Quick Action Link */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/menu"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 bg-white px-8 font-black text-brand shadow-lg hover:bg-white/90"
                )}
              >
                <span>Claim Promo Now</span>
                <ArrowRight className="size-4 text-brand" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Value Deal Cards Below */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Percent className="size-6" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                Two-for-Tuesday Detroit Slices
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Buy one square pie, get the second at 50% off every Tuesday.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Gift className="size-6" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                Free Garlic Knots Over $35
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Includes freshly grated pecorino dip with every family meal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                $0 Delivery on First Order
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                No delivery charge on your inaugural PizzaHub experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
