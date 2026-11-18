"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How do I apply a coupon code?",
    a: "After clicking 'Order Now' on any pizza item, you'll see an order summary. Enter your coupon code in the 'Promo Code' field and it will automatically deduct the discount before you confirm.",
  },
  {
    q: "Can I combine multiple coupon codes?",
    a: "Only one coupon code can be applied per order. We recommend using the code that gives you the highest discount for your specific order total.",
  },
  {
    q: "Do deals apply to all vendors?",
    a: "Platform-wide coupons like PIZZAHUB20 apply to all verified vendors. Vendor-specific promotions are marked clearly on the deal card and only work with that vendor's items.",
  },
  {
    q: "When do Happy Hour discounts start?",
    a: "Happy Hour runs Monday through Friday, 3:00 PM to 5:00 PM in your local timezone. Discounts are applied automatically — no code required.",
  },
  {
    q: "What if my deal has expired?",
    a: "Expired deals and coupon codes will show an error at checkout. Check back on this page for fresh daily deals, or subscribe to our newsletter for exclusive early-access codes.",
  },
  {
    q: "Are combo packages available from all vendors?",
    a: "Combo packages are pre-configured bundles from featured vendors. When you click 'Order This Combo', you'll be directed to the menu where you can select the included items. Availability may vary by vendor and location.",
  },
]

export function DealsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
            <HelpCircle className="size-4" />
            Deals FAQ
          </div>
          <h2 className="mt-3 font-heading text-2xl font-black text-foreground sm:text-3xl">
            Got Questions About Deals?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to know about saving big on PizzaHub.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground transition hover:bg-muted/40"
              >
                <span className="text-sm leading-snug">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === i && "rotate-180 text-brand"
                  )}
                />
              </button>
              {openIndex === i && (
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
