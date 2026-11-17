"use client"

import { useState } from "react"
import { Sparkles, X, Clock, PhoneCall } from "lucide-react"
import { Navbar } from "@/components/navbar"

export function Header() {
  const [promoVisible, setPromoVisible] = useState(true)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md transition-colors">
      {/* Top Announcement / Promo Bar */}
      {promoVisible && (
        <aside
          aria-label="Promotional announcement"
          className="relative flex items-center justify-between border-b border-brand/20 bg-linear-to-r from-brand via-brand-hover to-brand-secondary px-4 py-1.5 text-xs font-semibold text-white transition-all sm:px-8"
        >
          <div className="mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-200 animate-spin" />
              <span>
                <strong>Limited Offer:</strong> 20% off on all artisan wood-fired pizzas with code{" "}
                <span className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-[11px] font-bold text-amber-200">
                  PIZZAHUB20
                </span>
              </span>
            </span>

            <span className="hidden items-center gap-1 md:inline-flex text-white/90">
              <Clock className="size-3 text-amber-200" />
              <span>Fresh oven-to-door in 30 mins</span>
            </span>

            <span className="hidden items-center gap-1 lg:inline-flex text-white/90">
              <PhoneCall className="size-3 text-amber-200" />
              <span>Toll-Free: +1 (800) 749-9248</span>
            </span>
          </div>

          <button
            onClick={() => setPromoVisible(false)}
            aria-label="Dismiss banner"
            className="rounded p-0.5 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </aside>
      )}

      {/* Main Navigation Bar */}
      <Navbar />
    </header>
  )
}
