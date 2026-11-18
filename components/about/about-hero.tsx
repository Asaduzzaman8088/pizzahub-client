import { Pizza, Users, Award } from "lucide-react"

const stats = [
  { icon: Pizza, value: "1,200+", label: "Artisan Pizzas Listed" },
  { icon: Users, value: "48,000+", label: "Happy Customers" },
  { icon: Award, value: "320+", label: "Verified Vendors" },
]

export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-br from-brand via-brand-hover to-rose-800 py-14 text-white">
      <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 size-[500px] rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
          🍕 Our Story
        </div>
        <h1 className="mt-5 font-heading text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Connecting Pizza Lovers{" "}
          <span className="text-amber-300">with Artisan Kitchens</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85 leading-relaxed">
          PizzaHub was born from a simple belief — that the world&apos;s best pizzas
          aren&apos;t hiding in chain restaurants, they&apos;re crafted with love in
          neighborhood kitchens around the corner. We built the platform to
          bridge that gap.
        </p>

        {/* Stats Row */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 px-8 py-5 backdrop-blur-sm"
            >
              <Icon className="size-6 text-amber-300" />
              <span className="font-heading text-3xl font-black">{value}</span>
              <span className="text-sm text-white/75 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
