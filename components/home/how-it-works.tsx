import { Pizza, Flame, Truck, ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Pick Your Crust & Pizzeria",
    description: "Browse verified local artisan kitchens by pizza style, neighborhood distance, or special dietary preferences.",
    icon: Pizza,
    highlight: "50+ Artisanal Options",
  },
  {
    step: "02",
    title: "Hand-Stretched & Wood-Fired",
    description: "Your pie is never pre-made. Master pizzaiolos shape cold-fermented dough and fire it live at 900°F upon order.",
    icon: Flame,
    highlight: "900° Authentic Brick Hearth",
  },
  {
    step: "03",
    title: "Thermal-Lock Fast Delivery",
    description: "Piping hot delivery in commercial thermal bags keeps cheese gooey and crust crisp within 30 minutes of oven pull.",
    icon: Truck,
    highlight: "Guaranteed Piping Hot",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wider">
            Simplicity & Precision
          </span>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl text-foreground">
            How PizzaHub Delivers Perfection
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            From raw ingredients to your kitchen table in three effortless, transparent steps.
          </p>
        </div>

        {/* 3 Steps Process */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-xs transition-all duration-300 hover:border-brand/40 hover:shadow-lg"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between">
                  <span className="font-heading text-4xl font-black text-brand/20 transition-colors group-hover:text-brand">
                    {item.step}
                  </span>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-6" />
                  </div>
                </div>

                <div className="mt-8">
                  <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
                    {item.highlight}
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                    <span>Phase {idx + 1} of ordering</span>
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
