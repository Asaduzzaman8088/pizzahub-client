import Link from "next/link"
import { ArrowRight, Store } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AboutCta() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand via-brand-hover to-rose-800 p-10 text-center text-white shadow-2xl sm:p-16">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10">
            <div className="mb-4 text-5xl">🍕</div>
            <h2 className="font-heading text-3xl font-black sm:text-4xl">
              Ready to Be Part of the Story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85 leading-relaxed">
              Whether you're a pizza lover looking for the real thing, or a neighborhood
              kitchen ready to reach thousands of new customers — PizzaHub is built for you.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/menu"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 bg-white px-8 font-bold text-brand hover:bg-white/90 shadow-xl"
                )}
              >
                <span>Explore Artisan Pizzas</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/40 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Store className="size-4" />
                List Your Pizzeria
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
