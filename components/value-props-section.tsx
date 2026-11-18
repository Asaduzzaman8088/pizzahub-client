import { Flame, Clock, Award, ShieldCheck } from "lucide-react"

export function ValuePropsSection() {
  return (
    <section className="border-t border-border/40 bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Flame className="size-5.5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                Wood-Fired Ovens
              </h4>
              <p className="text-xs text-muted-foreground">
                Baked at 900°F for crispy blistered crusts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/15 text-brand-secondary">
              <Clock className="size-5.5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                30-Minute Guarantee
              </h4>
              <p className="text-xs text-muted-foreground">
                Thermal lock insulation keeps every slice hot.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Award className="size-5.5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                Certified Master Pizzaiolos
              </h4>
              <p className="text-xs text-muted-foreground">
                Local authentic recipes and fresh local dough.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="size-5.5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                100% Quality Guaranteed
              </h4>
              <p className="text-xs text-muted-foreground">
                Not thrilled? We remake it or refund instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
