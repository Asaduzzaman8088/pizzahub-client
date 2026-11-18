import Link from "next/link"
import Image from "next/image"
import { Heart, Phone, Mail, MapPin } from "lucide-react"

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
  return (
    <footer className="border-t border-border bg-card/60 text-card-foreground transition-colors">
      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Bio & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-11 items-center justify-center rounded-xl bg-white p-1 shadow-md shadow-brand/20 ring-1 ring-black/5">
                <Image
                  src="/images/gourmet-slice-logo.png"
                  alt="PizzaHub Gourmet Slice Logo"
                  width={96}
                  height={64}
                  sizes="44px"
                  className="h-full w-full object-contain"
                />
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
