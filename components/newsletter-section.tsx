"use client"

import { useState } from "react"
import { Pizza, Send, Sparkles } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }

    setIsSubscribing(true)
    setTimeout(() => {
      setIsSubscribing(false)
      setEmail("")
      toast.success(
        "Welcome to the Pizza Club! Your 15% discount code has been sent."
      )
    }, 600)
  }

  return (
    <section className="border-t border-border/40 bg-muted/20 py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-linear-to-br from-brand via-brand-hover to-rose-800 p-8 text-white shadow-2xl sm:p-12">
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider backdrop-blur-md">
                <Pizza className="size-3.5 text-amber-200" />
                <span>Pizza Club</span>
              </div>

              <h2 className="mt-4 font-heading text-3xl font-black tracking-tight text-white sm:text-4xl">
                Join the Pizza Club — Get 15% Off
              </h2>

              <p className="mt-3 text-sm text-white/90 leading-relaxed sm:text-base">
                Subscribe for fresh menu drops, members-only deals, and a
                welcome discount on your first artisan order.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md shrink-0">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email address"
                  className="w-full rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-white focus:ring-2 focus:ring-white/40 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand shadow-lg transition hover:bg-white/90 disabled:opacity-60"
                >
                  <span>{isSubscribing ? "Joining..." : "Join"}</span>
                  <Send className="size-4" />
                </button>
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 text-xs text-white/80">
                <Sparkles className="size-3 text-amber-200" />
                No spam — just hot slices and exclusive offers.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
