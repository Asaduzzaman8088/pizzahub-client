import { Star, CheckCircle, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Elena Rostova",
    role: "Verified Pizza Enthusiast",
    location: "Greenwich Village, NY",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    pizzaOrdered: "Margherita Di Bufala D.O.P.",
    rating: 5,
    comment:
      "Having lived in Naples for two years, I was skeptical about finding true cornicione crust in Manhattan. PizzaHub delivered a pie with perfect blistered leoparding and gooey buffalo cheese — still steaming hot at my door in 24 minutes!",
  },
  {
    name: "Marcus Vance",
    role: "Culinary Editor & Food Critic",
    location: "Brooklyn, NY",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    pizzaOrdered: "Crispy Cup Double Pepperoni",
    rating: 5,
    comment:
      "The Detroit Pan square slices from Square Pan Artisans on PizzaHub are world-class. The Wisconsin brick cheese caramelized crispy crown is unmatched. It completely changes the food delivery game in New York.",
  },
  {
    name: "Chef Marco Bellini",
    role: "Master Baker & Vendor Partner",
    location: "Little Italy, NY",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    pizzaOrdered: "Bella Napoli Wood Ovens (Vendor)",
    rating: 5,
    comment:
      "As a pizzeria owner, large corporate apps squeezed our margins dry. On PizzaHub, we keep over 90% of our orders, control our daily oven capacity, and have grown a loyal community of genuine pizza purists.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-border/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wider">
            Voices of the Community
          </span>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl text-foreground">
            Loved By Chefs & Pizza Aficionados
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Read unedited feedback from verified pizza lovers and our master baking partners.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-xs transition-all duration-300 hover:border-brand/40 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="size-6 text-brand/20" />
                </div>

                <p className="mt-5 text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-8 border-t border-border/60 pt-5">
                <div className="flex items-center gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="size-11 rounded-full object-cover ring-2 ring-brand/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        {t.name}
                      </h4>
                      <CheckCircle className="size-3.5 text-emerald-500" />
                    </div>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <p className="text-[11px] font-medium text-brand">{t.pizzaOrdered}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
