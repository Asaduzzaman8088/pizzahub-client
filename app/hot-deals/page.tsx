import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { ValuePropsSection } from "@/components/value-props-section"
import { HotDealsHero } from "@/components/deals/hot-deals-hero"
import { DealsGrid } from "@/components/deals/deals-grid"
import { CouponBanner } from "@/components/deals/coupon-banner"
import { ComboOffers } from "@/components/deals/combo-offers"
import { DealsFaq } from "@/components/deals/deals-faq"

export const metadata = {
  title: "Hot Deals & Combos | PizzaHub — Save Big on Artisan Pizzas",
  description:
    "Grab the best pizza deals today. Limited-time discounts, combo meals, and exclusive coupon codes from PizzaHub's verified neighborhood kitchens.",
}

export default function HotDealsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HotDealsHero />
        <CouponBanner />
        <DealsGrid />
        <ComboOffers />
        <DealsFaq />
      </main>
      <ValuePropsSection />

      <NewsletterSection />
      <Footer />
    </div>
  )
}

