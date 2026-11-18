import Link from "next/link"
import { ArrowRight, Users, Pizza, Utensils } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const combos = [
  {
    id: 1,
    name: "Date Night Duo",
    items: ["Margherita Bufala (12\")", "Prosciutto e Rucola (12\")", "2 Craft Sodas"],
    originalPrice: "$47.98",
    comboPrice: "$36.99",
    savings: "Save $10.99",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    tag: "Most Romantic",
    tagColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    serves: "2 people",
  },
  {
    id: 2,
    name: "Family Feast Pack",
    items: ["Chicago Deep Dish (14\")", "BBQ Chicken Supreme (14\")", "Garlic Knots ×2"],
    originalPrice: "$79.97",
    comboPrice: "$59.99",
    savings: "Save $19.98",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80",
    tag: "Best Value",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    serves: "4–5 people",
  },
  {
    id: 3,
    name: "Solo Satisfaction",
    items: ["Any 10\" Personal Pizza", "House Salad", "Garlic Dip"],
    originalPrice: "$24.97",
    comboPrice: "$17.99",
    savings: "Save $6.98",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80",
    tag: "Perfect Solo",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
    serves: "1 person",
  },
]

export function ComboOffers() {
  return (
    <section id="combos" className="border-b border-border/40 bg-muted/20 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-black text-foreground sm:text-3xl">
            🍕 Combo Meal Packages
          </h2>
          <p className="mt-2 text-muted-foreground">
            Curated bundles designed for every occasion — solo lunches, date nights, and big family feasts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span
                  className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold ${combo.tagColor}`}
                >
                  {combo.tag}
                </span>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Users className="size-3" />
                  {combo.serves}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-lg font-black text-foreground">
                  {combo.name}
                </h3>

                <ul className="mt-3 space-y-1">
                  {combo.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Utensils className="size-3.5 text-brand shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">
                      {combo.originalPrice}
                    </span>
                    <div className="font-heading text-2xl font-black text-brand">
                      {combo.comboPrice}
                    </div>
                  </div>
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {combo.savings}
                  </span>
                </div>

                <Link
                  href="/menu"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "mt-4 w-full justify-center gap-1.5 bg-brand font-semibold text-white hover:bg-brand-hover"
                  )}
                >
                  <Pizza className="size-3.5" />
                  Order This Combo
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
