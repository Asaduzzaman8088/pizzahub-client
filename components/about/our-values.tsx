import { Heart, Shield, Leaf, Zap, Users, Star } from "lucide-react"

const values = [
  {
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    title: "Passion for Craft",
    description:
      "Every vendor on PizzaHub is verified for artisan quality. We refuse to list mass-produced or chain-style offerings. If the dough isn't hand-stretched, it doesn't qualify.",
  },
  {
    icon: Shield,
    iconColor: "text-brand",
    iconBg: "bg-brand/10",
    title: "Trust & Transparency",
    description:
      "Real vendor profiles, genuine customer reviews, and no hidden fees. What you see on the menu is exactly what arrives at your door — with the price shown upfront.",
  },
  {
    icon: Leaf,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
    title: "Local-First Philosophy",
    description:
      "We exist to empower neighborhood kitchens, not compete with them. Every order through PizzaHub puts money directly into local hands and supports food entrepreneurs.",
  },
  {
    icon: Zap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    title: "Speed & Reliability",
    description:
      "Our platform is built for real-time order tracking, instant vendor notifications, and fast confirmation. We know hunger can't wait — and we don't make it.",
  },
  {
    icon: Users,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-500/10",
    title: "Community Building",
    description:
      "PizzaHub is more than an app — it's a food community. Customers share reviews, vendors collaborate on features, and everyone wins when great pizza is accessible.",
  },
  {
    icon: Star,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-500/10",
    title: "Relentless Improvement",
    description:
      "We ship updates weekly based on direct customer and vendor feedback. Our team tastes every type of pizza so we understand the product as deeply as you do.",
  },
]

export function OurValues() {
  return (
    <section className="border-b border-border/40 bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
            💡 Our Core Values
          </span>
          <h2 className="mt-4 font-heading text-3xl font-black text-foreground sm:text-4xl">
            What We Stand For
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Six principles that guide every decision we make — from product features to vendor
            onboarding to customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, iconColor, iconBg, title, description }) => (
            <div
              key={title}
              className="rounded-3xl border border-border bg-card p-6 shadow-xs transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-2xl ${iconBg}`}
              >
                <Icon className={`size-6 ${iconColor}`} />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
