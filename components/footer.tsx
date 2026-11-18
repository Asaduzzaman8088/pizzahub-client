import Link from "next/link"
import { Heart, Phone, Mail, MapPin } from "lucide-react"

import { BrandMark } from "@/components/brand-mark"

function XLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  )
}

function InstagramLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17C2.41 8.5 2.4 8.85 2.4 12s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4C15.5 4.01 15.15 4 12 4zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.14-2.99a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
    </svg>
  )
}

function YouTubeLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z" />
    </svg>
  )
}

const pizzaCategories = [
  { label: "Classic Pizzas", href: "/menu?category=classic" },
  { label: "Vegetarian Pizzas", href: "/menu?category=vegetarian" },
  { label: "Meat Lovers", href: "/menu?category=meat-lovers" },
  { label: "Specialty & Gourmet", href: "/menu?category=specialty" },
  { label: "Sides & Appetizers", href: "/menu?category=sides" },
  { label: "Beverages & Desserts", href: "/menu?category=beverages" },
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
            <Link
              href="/"
              aria-label="PizzaHub Homepage"
              className="group inline-flex items-center gap-3"
            >
              <BrandMark className="size-14 p-1.5" sizes="56px" />

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-2xl font-black tracking-tight text-foreground">
                    Pizza<span className="text-brand">Hub</span>
                  </span>
                  <span className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand uppercase">
                    Artisan
                  </span>
                </div>
                <span className="-mt-1 text-[11px] font-medium tracking-wider text-muted-foreground">
                  Wood-Fired &amp; Delivered Hot
                </span>
              </div>
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

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-2">
              {[
                { label: "X", href: "https://x.com", icon: <XLogo /> },
                { label: "Facebook", href: "https://facebook.com", icon: <FacebookLogo /> },
                { label: "Instagram", href: "https://instagram.com", icon: <InstagramLogo /> },
                { label: "YouTube", href: "https://youtube.com", icon: <YouTubeLogo /> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition hover:border-brand/40 hover:text-brand"
                >
                  {social.icon}
                </a>
              ))}
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
