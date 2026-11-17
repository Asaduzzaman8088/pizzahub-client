"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How does PizzaHub ensure the pizza arrives piping hot?",
    a: "Every verified vendor on our platform uses commercial-grade thermal lock insulation bags. Orders are routed directly from the oven pull to dedicated neighborhood drivers, maintaining a minimum 145°F interior temperature upon delivery within 30 minutes.",
  },
  {
    q: "How can I order from an artisan pizzeria on PizzaHub?",
    a: "Simply create a free customer account, explore our menu by category or location, click on your desired pizza to view ingredients and vendor details, select your delivery time, and hit 'Place Order'. Payment is handled smoothly with cash on delivery or instant card checkout.",
  },
  {
    q: "What is the difference between Free and Premium for Pizzeria Vendors?",
    a: "All vendors can join for free and list up to 3 active menu items with complete dashboard management. When ready to scale, vendors can upgrade to the Premium Subscription for $29/month via Stripe Checkout to unlock unlimited menu items, featured spotlight status on the homepage, and priority vendor support.",
  },
  {
    q: "Can I customize dietary preferences (Vegan, Gluten-Free)?",
    a: "Yes! Use our category filters to find 100% plant-based pizzas made with artisanal cashew cheeses, or cauliflower and rice-flour gluten-free crusts baked in dedicated oven sections to minimize cross-contamination.",
  },
  {
    q: "What if I need to cancel or change my pizza order?",
    a: "Customers can cancel their pending order directly from their Customer Dashboard under 'My Orders' at any time before the pizzeria accepts the order into the oven. Once accepted, please contact the pizzeria directly via the hotline provided on your order receipt.",
  },
]

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="border-b border-border/40 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wider">
            <HelpCircle className="size-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Everything you need to know about our artisan pizzas, vendor subscriptions, and delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-200",
                  isOpen
                    ? "border-brand/40 bg-card shadow-md shadow-brand/5"
                    : "border-border bg-card/60 hover:border-brand/20"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors sm:p-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base font-bold text-foreground sm:text-lg">
                    {faq.q}
                  </span>
                  <div
                    className={cn(
                      "ml-4 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180 bg-brand text-white"
                    )}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border/60 px-5 pt-3 pb-5 sm:px-6 sm:pb-6 animate-in fade-in-50 duration-200">
                    <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
