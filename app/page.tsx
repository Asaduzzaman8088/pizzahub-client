import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedPizzas } from "@/components/home/featured-pizzas"
import { SpecialDeals } from "@/components/home/special-deals"
import { HowItWorks } from "@/components/home/how-it-works"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { Testimonials } from "@/components/home/testimonials"
import { VendorCta } from "@/components/home/vendor-cta"
import { FaqSection } from "@/components/home/faq-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      {/* Top Header with Notification Bar & Navbar */}
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section with Live Stats & Search */}
        <HeroSection />

        {/* 2. 6 Handcrafted Pizza Categories */}
        <CategoriesSection />

        {/* 3. 6 Approved Featured Pizzas Grid */}
        <FeaturedPizzas />

        {/* 4. Special Deals & One-Click Coupon Banner */}
        <SpecialDeals />

        {/* 5. 3-Step Ordering Process */}
        <HowItWorks />

        {/* 6. Why Choose PizzaHub Deep-Dive */}
        <WhyChooseUs />

        {/* 7. Real Testimonials from Customers & Chefs */}
        <Testimonials />

        {/* 8. Pizzeria Vendor Growth CTA */}
        <VendorCta />

        {/* 9. Interactive FAQ Section */}
        <FaqSection />
      </main>

      {/* Modern Comprehensive Footer */}
      <Footer />
    </div>
  )
}
