import Link from "next/link"
import { Store, Sparkles, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function VendorCta() {
  return (
    <section id="vendors" className="border-b border-border/40 py-16 lg:py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-12 lg:p-16">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 size-96 rounded-full bg-brand/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 size-96 rounded-full bg-brand-secondary/5 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/15 px-3 py-1 text-xs font-bold text-brand-secondary">
                <Store className="size-3.5" />
                <span>Pizzeria Partners Wanted</span>
              </div>

              <h2 className="mt-4 font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Own an Artisan Pizzeria? <br />
                <span className="text-brand">Grow with PizzaHub.</span>
              </h2>

              <p className="mt-4 text-sm text-muted-foreground sm:text-base leading-relaxed">
                Connect directly with thousands of authentic pizza lovers in your neighborhood. We don’t take ruinous 30% cuts — enjoy transparent terms, instant Stripe payouts, and a dedicated vendor command center.
              </p>

              {/* Vendor Feature Bullets */}
              <div className="mt-6 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4.5 text-brand shrink-0" />
                  <span className="font-semibold text-foreground">
                    0% Commission on your first 30 days of orders.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4.5 text-brand shrink-0" />
                  <span className="font-semibold text-foreground">
                    Instant Stripe transfers directly into your business bank account.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4.5 text-brand shrink-0" />
                  <span className="font-semibold text-foreground">
                    Upgrade to Premium for unlimited menu items & featured spotlight placement.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4.5 text-brand shrink-0" />
                  <span className="font-semibold text-foreground">
                    Simple tablet & mobile order acceptance interface.
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 bg-brand font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-hover"
                  )}
                >
                  <Store className="size-4" />
                  <span>Register as a Vendor</span>
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-border font-bold hover:bg-muted"
                  )}
                >
                  <span>Vendor Portal Login</span>
                </Link>
              </div>
            </div>

            {/* Vendor Stats Card */}
            <div className="rounded-3xl border border-border/80 bg-muted/40 p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <TrendingUp className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground">
                      +145% Average Revenue Lift
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                      Pizzerias on PizzaHub expand customer discovery far beyond street foot traffic into local residential districts.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-6 flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-secondary/15 text-brand-secondary">
                    <Sparkles className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground">
                      Free Tier: 3 Active Pizzas
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                      Start completely free of charge. Upgrade anytime to Premium via Stripe for unlimited menu capacity.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-6 flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground">
                      Fast-Track Approval
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                      Submit menu photos via ImgBB and get admin kitchen verification within 24 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
