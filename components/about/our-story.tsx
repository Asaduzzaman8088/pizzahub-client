export function OurStory() {
  return (
    <section className="border-b border-border/40 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
              📖 Our Origin Story
            </span>
            <h2 className="mt-4 font-heading text-3xl font-black text-foreground sm:text-4xl">
              From a Kitchen Table Idea to a National Platform
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                It started in 2021 when our co-founder Rafi — a lifelong pizza
                obsessive — moved to a new city and couldn&apos;t find the authentic
                wood-fired pies he grew up eating. Every chain tasted the same.
                Every app showed him the same big-box options.
              </p>
              <p>
                He teamed up with his friend Zara, a full-stack developer, and
                together they mapped out every independent pizzeria within 20
                miles. The results were staggering — dozens of incredible
                neighborhood kitchens, invisible online, turning away customers
                daily simply because they couldn&apos;t afford their own delivery
                infrastructure.
              </p>
              <p>
                PizzaHub launched in beta with just 12 vendors in one city. Within
                six months, word spread through the food community. Today we
                support over 320 verified artisan vendors across the country,
                serving more than 48,000 monthly customers who know real pizza
                when they taste it.
              </p>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"
                alt="Artisan pizza being baked"
                className="h-48 w-full rounded-3xl object-cover shadow-md"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80"
                alt="Neighborhood pizzeria kitchen"
                className="h-32 w-full rounded-3xl object-cover shadow-md"
              />
            </div>
            <div className="mt-8 space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80"
                alt="Fresh pizza out of the oven"
                className="h-32 w-full rounded-3xl object-cover shadow-md"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1548369937-47519962c11a?w=600&q=80"
                alt="Happy customers enjoying pizza"
                className="h-48 w-full rounded-3xl object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
