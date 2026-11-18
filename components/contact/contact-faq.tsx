"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How long does it take to get a response?",
    a: "Our support team typically responds within 2–4 hours during business hours. For urgent order issues, we aim to respond within 30 minutes. After-hours messages are handled first thing the next morning.",
  },
  {
    q: "I have a problem with my order. What should I do?",
    a: "First, check your order status in your Customer Dashboard under 'My Orders'. If the issue persists — wrong item, late delivery, or missing order — use the form above and select 'Order Support' as the subject. Include your order ID for fastest resolution.",
  },
  {
    q: "How do I report a vendor issue?",
    a: "If you have concerns about a specific vendor's food quality, accuracy, or conduct, please use the contact form and select 'General Inquiry'. Our vendor quality team investigates all reports within 24 hours.",
  },
  {
    q: "I want to list my pizzeria on PizzaHub. Who do I contact?",
    a: "We'd love to have you! Sign up with the 'vendor' role at our registration page and your account will be reviewed within 24 hours. For premium onboarding support or special partnership inquiries, use the form above and select 'Vendor Partnership'.",
  },
  {
    q: "Can I request a refund for my order?",
    a: "Refund eligibility depends on order status. If your order hasn't been accepted by the vendor yet, you can cancel it directly from your dashboard. For post-delivery refund requests, contact us within 24 hours with photos if possible — we'll review and respond within one business day.",
  },
  {
    q: "Is PizzaHub available in my city?",
    a: "We currently operate in 15+ major cities across the US. Use the location filter on our Explore Menu page to see if vendors are available near you. We're expanding rapidly — sign up for our newsletter to be notified when we launch in new areas.",
  },
]

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-t border-border/40 bg-muted/20 py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
            <HelpCircle className="size-4" />
            Frequently Asked Questions
          </div>
          <h2 className="mt-3 font-heading text-2xl font-black text-foreground sm:text-3xl">
            Quick Answers
          </h2>
          <p className="mt-2 text-muted-foreground">
            Check here before sending a message — your answer might already be here.
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
