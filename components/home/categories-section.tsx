import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

export interface CategoryCard {
  id: string
  title: string
  tagline: string
  count: string
  image: string
  popularTopping: string
}

const categories: CategoryCard[] = [
  {
    id: "neapolitan",
    title: "Neapolitan Wood-Fired",
    tagline: "High-heat blistered crust, sweet San Marzano tomatoes & fresh fior di latte.",
    count: "14 Pizzas",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Fresh Basil & Extra Virgin Olive Oil",
  },
  {
    id: "deep-dish",
    title: "Chicago Deep Dish",
    tagline: "Thick buttery cornmeal crust, two inches of molten cheese and chunky spiced sauce.",
    count: "9 Pizzas",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Italian Fennel Sausage & Crushed Garlic",
  },
  {
    id: "detroit",
    title: "Detroit Square Slices",
    tagline: "Caramelized Wisconsin brick cheese edges with pillowy, airy focaccia dough.",
    count: "8 Pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Spicy Cup Pepperoni & Hot Honey",
  },
  {
    id: "new-york",
    title: "New York Foldable Slices",
    tagline: "Crispy yet pliable wide slices with dried oregano and savory low-moisture mozzarella.",
    count: "16 Pizzas",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Double Pepperoni & Garlic Knots",
  },
  {
    id: "gourmet",
    title: "Gourmet Truffle & White",
    tagline: "No tomato sauce — rich ricotta, black truffle sauce, caramelized onions and thyme.",
    count: "7 Pizzas",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Wild Foraged Mushrooms & Fontina",
  },
  {
    id: "vegan",
    title: "Vegan & Plant-Based",
    tagline: "Hand-crafted cashew mozzarella, smoky seitan crumbles, and local charred veggies.",
    count: "10 Pizzas",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=80",
    popularTopping: "Cashew Ricotta & Fire-Roasted Peppers",
  },
]

export function CategoriesSection() {
  return (
    <section className="border-b border-border/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/15 px-3 py-1 text-xs font-bold text-brand-secondary">
              <Sparkles className="size-3.5" />
              <span>Handcrafted Crust Styles</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl text-foreground">
              Explore By Pizza Style
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              From historic Naples ovens to Michigan squares, discover regional masterpieces.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-brand-hover"
          >
            <span>View All Categories</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Category Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5"
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
                
                {/* Count Badge */}
                <div className="absolute top-3.5 right-3.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {cat.count}
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
                    {cat.popularTopping}
                  </span>
                  <h3 className="font-heading text-xl font-black text-white">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
                  {cat.tagline}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-brand transition group-hover:text-brand-hover">
                  <span>Browse {cat.title}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
