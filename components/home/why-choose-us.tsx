"use client"

import { motion } from "motion/react"
import { Flame, ShieldCheck, HeartHandshake, Sparkles, Truck, Award } from "lucide-react"

const reasons = [
  {
    icon: Flame,
    title: "72-Hour Cold Fermented Dough",
    description: "Slow fermentation breaks down starches for light, airy digestion and unmistakable blistered leopard-spotting.",
  },
  {
    icon: Award,
    title: "San Marzano & D.O.P. Imports",
    description: "Authentic volcanic soil San Marzano tomatoes, freshly stretched fior di latte, and cold-pressed extra virgin olive oil.",
  },
  {
    icon: HeartHandshake,
    title: "Baker-First Economic Model",
    description: "Unlike predatory delivery apps, we empower independent neighborhood pizzerias to thrive with fair vendor splits.",
  },
  {
    icon: Truck,
    title: "Thermal-Lock Temperature Guarantee",
    description: "High-grade heated delivery bags preserve piping oven temperature and prevent soggy crusts in transit.",
  },
  {
    icon: ShieldCheck,
    title: "Strict Kitchen Vetting",
    description: "Every kitchen undergoes physical hygiene inspections, dough quality tests, and real ingredient audits.",
  },
  {
    icon: Sparkles,
    title: "Instant Remake Promise",
    description: "If your pizza arrives cold, disturbed, or not to your exact specifications, our kitchen remakes it immediately.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-us" className="border-b border-border/40 py-12 lg:py-16 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-brand-secondary/15 px-3 py-1 text-xs font-bold text-brand-secondary uppercase tracking-wider">
            The Artisan Difference
          </span>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl text-foreground">
            Why Pizza Enthusiasts Choose PizzaHub
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            We don’t do mass-produced conveyor-belt fast food. We connect you with passionate artisans devoted to the craft.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                className="group relative rounded-3xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:border-brand/40 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
