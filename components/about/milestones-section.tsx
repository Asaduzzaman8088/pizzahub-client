const milestones = [
  {
    year: "2021",
    quarter: "Q3",
    title: "The Idea Sparks",
    description:
      "Co-founders Rafi and Zara sketch the first PizzaHub wireframe on a napkin after failing to find artisan pizza in their new city.",
    color: "bg-brand",
  },
  {
    year: "2022",
    quarter: "Q1",
    title: "Beta Launch",
    description:
      "PizzaHub goes live in private beta with 12 hand-picked artisan vendors and 400 early-access customers in one metro area.",
    color: "bg-amber-500",
  },
  {
    year: "2022",
    quarter: "Q3",
    title: "10,000 Orders Milestone",
    description:
      "The platform hits 10,000 total orders, confirming product-market fit. The team grows to 8 full-time members.",
    color: "bg-emerald-600",
  },
  {
    year: "2023",
    quarter: "Q1",
    title: "Vendor Premium Subscriptions",
    description:
      "We launch the premium vendor tier — giving pizzerias unlimited menu listings, featured placement, and advanced analytics.",
    color: "bg-purple-600",
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "National Expansion",
    description:
      "PizzaHub expands to 15 cities with 200+ verified vendors. Customer base crosses 25,000 monthly active users.",
    color: "bg-sky-600",
  },
  {
    year: "2024",
    quarter: "Q2",
    title: "320+ Vendors, 48K+ Customers",
    description:
      "The platform achieves its strongest quarter. 48,000 monthly customers and 320+ vendors trust PizzaHub as their pizza marketplace.",
    color: "bg-orange-500",
  },
]

export function MilestonesSection() {
  return (
    <section className="border-b border-border/40 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
            🗓️ Journey So Far
          </span>
          <h2 className="mt-4 font-heading text-3xl font-black text-foreground sm:text-4xl">
            Our Milestones
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            From a napkin sketch to a thriving national platform — here&apos;s how PizzaHub grew.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border sm:left-1/2 sm:-ml-px" />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const isRight = i % 2 === 0
              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    isRight ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Mobile / Desktop dot */}
                  <div
                    className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full ${m.color} text-white font-heading text-xs font-black sm:absolute sm:left-1/2 sm:-translate-x-1/2`}
                  >
                    {m.year.slice(2)}
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-6 flex-1 rounded-2xl border border-border bg-card p-5 shadow-xs sm:ml-0 sm:max-w-[45%] ${
                      isRight ? "sm:mr-auto sm:pr-10" : "sm:ml-auto sm:pl-10"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <span
                        className={`inline-block size-2 rounded-full ${m.color}`}
                      />
                      {m.year} · {m.quarter}
                    </div>
                    <h3 className="mt-1 font-heading text-base font-bold text-foreground">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
