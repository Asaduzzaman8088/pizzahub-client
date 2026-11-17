"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Pizza,
  Send,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Flame,
} from "lucide-react"
import { toast } from "sonner"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Menu", href: "/menu" },
  { label: "Hot Deals & Combos", href: "/#deals" },
  { label: "About Our Pizzeria", href: "/#about" },
  { label: "Track Your Order", href: "/dashboard/customer/orders" },
]

const pizzaCategories = [
  { label: "Neapolitan Wood-Fired", href: "/menu?category=neapolitan" },
  { label: "Chicago Deep Dish", href: "/menu?category=deep-dish" },
  { label: "Detroit Square Slices", href: "/menu?category=detroit" },
  { label: "Gourmet White Truffle", href: "/menu?category=gourmet" },
  { label: "Vegan & Plant-Based", href: "/menu?category=vegan" },
  { label: "Gluten-Free Cauliflower", href: "/menu?category=gluten-free" },
]

const vendorLinks = [
  { label: "Become a PizzaHub Vendor", href: "/sign-up" },
  { label: "Vendor Dashboard", href: "/dashboard/vendor" },
  { label: "Premium Kitchen Subscription", href: "/dashboard/vendor/subscription" },
  { label: "Quality & Hygiene Standards", href: "/#standards" },
  { label: "Vendor Success Stories", href: "/#testimonials" },
]

const supportLinks = [
  { label: "Help Center & FAQs", href: "/#faq" },
  { label: "Delivery Coverage & Zones", href: "/#delivery-zones" },
  { label: "Refund & Cancellation Policy", href: "/#refund-policy" },
  { label: "Privacy Policy", href: "/#privacy" },
  { label: "Terms of Service", href: "/#terms" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }

    setIsSubscribing(true)
    setTimeout(() => {
      setIsSubscribing(false)
      setEmail("")
      toast.success("Welcome to the Pizza Club! Your 15% discount code has been sent.")
    }, 600)
  }

  return (
    <footer className="border-t border-border bg-card/60 text-card-foreground transition-colors">
      {/* Upper Value Proposition Strip */}
      <div className="border-b border-border/60 bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Flame className="size-5.5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  Wood-Fired Ovens
                </h4>
                <p className="text-xs text-muted-foreground">
                  Baked at 900°F for crispy blistered crusts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/15 text-brand-secondary">
                <Clock className="size-5.5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  30-Minute Guarantee
                </h4>
                <p className="text-xs text-muted-foreground">
                  Thermal lock insulation keeps every slice hot.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Award className="size-5.5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  Certified Master Pizzaiolos
                </h4>
                <p className="text-xs text-muted-foreground">
                  Local authentic recipes and fresh local dough.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ShieldCheck className="size-5.5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  100% Quality Guaranteed
                </h4>
                <p className="text-xs text-muted-foreground">
                  Not thrilled? We remake it or refund instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Bio & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/20">
                <Pizza className="size-5.5" />
              </div>
              <span className="font-heading text-2xl font-black tracking-tight text-foreground">
                Pizza<span className="text-brand">Hub</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              PizzaHub unites premier neighborhood pizzerias and hungry pizza enthusiasts. From 72-hour cold-fermented dough to San Marzano tomatoes and fior di latte, we treat pizza like high art.
            </p>

            {/* Direct Contact Info */}
            <div className="mt-5 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-brand shrink-0" />
                <span>452 Broadway Avenue, Culinary District, NY 10013</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-brand shrink-0" />
                <span>Toll-Free Hotline: +1 (800) 749-9248 (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-brand shrink-0" />
                <span>orders@pizzahub-artisan.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <p className="font-heading text-xs font-bold text-foreground uppercase tracking-wider">
                🍕 Join the Pizza Club — Get 15% Off
              </p>
              <form onSubmit={handleNewsletterSubmit} className="mt-2.5 flex max-w-sm gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-50"
                >
                  <span>{isSubscribing ? "Subscribing..." : "Join"}</span>
                  <Send className="size-3" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 1: Explore & Menu */}
          <div>
            <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">
              Explore Menu
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {pizzaCategories.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links & Platform */}
          <div>
            <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">
              For Vendors
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {vendorLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">
              Help & Policies
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Badges */}
      <div className="border-t border-border/80 bg-background/80 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} PizzaHub Platform Inc. Handcrafted with</span>
            <Heart className="size-3.5 fill-rose-500 text-rose-500" />
            <span>for pizza lovers everywhere.</span>
          </p>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="rounded border border-border bg-muted/60 px-2 py-0.5 font-semibold text-foreground">
              Stripe Verified
            </span>
            <span className="rounded border border-border bg-muted/60 px-2 py-0.5 font-semibold text-foreground">
              SSL 256-Bit Secure
            </span>
            <span className="rounded border border-border bg-muted/60 px-2 py-0.5 font-semibold text-foreground">
              Contactless Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
