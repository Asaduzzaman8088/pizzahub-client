import Link from "next/link"
import { ArrowRight, Flame, ShieldCheck, Sparkles, Truck, UtensilsCrossed } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const highlights = [
  {
    icon: Flame,
    title: "Wood-Fired & Artisanal",
    description: "Prepared by passionate master pizzaiolos using slow-fermented dough and premium ingredients.",
  },
  {
    icon: Truck,
    title: "Thermal-Lock Fast Delivery",
    description: "Guaranteed piping hot right to your doorstep within 30 minutes of oven pull.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Top Vendors",
    description: "Every pizzeria on our platform passes strict hygiene, authenticity, and taste standards.",
  },
  {
    icon: Sparkles,
    title: "Vendor Growth Platform",
    description: "Local pizzerias unlock premium discovery, instant payouts, and loyal neighborhood followings.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 py-20 lg:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-40 right-[-10%] -z-10 h-[360px] w-[360px] rounded-full bg-brand-secondary/15 blur-[120px]"
          />

          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold text-brand">
              <span className="flex size-2 rounded-full bg-brand animate-pulse" />
              The #1 Artisan Pizza Marketplace
            </div>

            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Hot, Handcrafted Pizza. <br />
              <span className="text-brand">Baked to Perfection.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Explore authentic Neapolitan, Chicago deep dish, Detroit style, and gourmet slices from the best neighborhood pizzerias — delivered hot and fresh.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/menu"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 bg-brand text-base font-semibold text-white shadow-lg shadow-brand/25 hover:bg-brand-hover"
                )}
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-border text-base font-semibold hover:bg-muted"
                )}
              >
                <UtensilsCrossed className="size-4 text-brand-secondary" />
                <span>Join as a Vendor</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="why-us" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Why Pizza Lovers & Pizzerias Choose PizzaHub
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Built from the crust up to bring communities together around extraordinary pizza.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="group relative rounded-2xl border border-border bg-card p-6 shadow-xs transition hover:border-brand/40 hover:shadow-md"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
