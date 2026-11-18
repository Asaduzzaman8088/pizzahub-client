import Link from "next/link"
import { Percent, Gift, Truck, Star, Clock, Zap } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const deals = [
  {
    id: 1,
    icon: Percent,
    iconBg: "bg-brand/10 text-brand",
    badge: "Tuesday Special",
    badgeColor: "bg-brand/10 text-brand",
    title: "Two-for-Tuesday Detroit Slices",
    description:
      "Every Tuesday, buy any square Detroit-style pie and get a second one at 50% off. The ultimate midweek comfort treat for sharing with family.",
    savings: "Save up to $12",
    validUntil: "Every Tuesday",
    cta: "Order Detroit Style",
    href: "/menu?category=detroit",
  },
  {
    id: 2,
    icon: Gift,
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    badge: "Free Add-On",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    title: "Free Garlic Knots Over $35",
    description:
      "Spend $35 or more on any order and receive a complimentary basket of freshly baked garlic knots with house-made pecorino romano dipping sauce.",
    savings: "Worth $6.99",
    validUntil: "Ongoing",
    cta: "Build Your Order",
    href: "/menu",
  },
  {
    id: 3,
    icon: Truck,
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    badge: "New Customer",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    title: "$0 Delivery on First Order",
    description:
      "Welcome to PizzaHub! Your very first order ships absolutely free, no minimum spend required. Use code FIRSTSLICE at checkout to activate.",
    savings: "Save delivery fee",
    validUntil: "First order only",
    cta: "Claim Free Delivery",
    href: "/menu",
  },
  {
    id: 4,
    icon: Star,
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    badge: "Weekend Only",
    badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    title: "Weekend Feast Bundle — 3 Pizzas",
    description:
      "Order any 3 artisan pizzas on Saturday or Sunday and receive a 10% bundle discount on your total. Perfect for game nights and family gatherings.",
    savings: "10% bundle discount",
    validUntil: "Sat & Sun only",
    cta: "Shop the Bundle",
    href: "/menu",
  },
  {
    id: 5,
    icon: Clock,
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    badge: "Happy Hour",
    badgeColor: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    title: "Happy Hour — 25% Off (3 PM – 5 PM)",
    description:
      "Every weekday afternoon, all menu items drop 25% between 3 PM and 5 PM. Early dinner never tasted this good or cost this little.",
    savings: "Up to 25% off",
    validUntil: "Mon–Fri 3–5 PM",
    cta: "Order Now",
    href: "/menu",
  },
  {
    id: 6,
    icon: Zap,
    iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    badge: "Flash Deal",
    badgeColor: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    title: "Flash Deal: Margherita for $7.99",
    description:
      "Classic Neapolitan Margherita — San Marzano tomatoes, fresh buffalo mozzarella, basil — at an unbeatable price. Limited quantities per day.",
    savings: "Save $5 today",
    validUntil: "While stocks last",
    cta: "Grab This Deal",
    href: "/menu/margherita-bufala",
  },
]

export function DealsGrid() {
  return (
    <section className="border-b border-border/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-black text-foreground sm:text-3xl">
            🏷️ Today&apos;s Best Deals
          </h2>
          <p className="mt-2 text-muted-foreground">
            New discounts added every day — bookmark this page and never miss a saving.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => {
            const Icon = deal.icon
            return (
              <div
                key={deal.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${deal.iconBg}`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${deal.badgeColor}`}
                      >
                        {deal.badge}
                      </span>
                      <h3 className="mt-1 font-heading text-base font-bold text-foreground leading-tight">
                        {deal.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {deal.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ✓ {deal.savings}
                    </span>
                    <span className="text-muted-foreground">
                      📅 {deal.validUntil}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border px-6 py-4">
                  <Link
                    href={deal.href}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "w-full justify-center bg-brand text-white hover:bg-brand-hover font-semibold"
                    )}
                  >
                    {deal.cta}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
