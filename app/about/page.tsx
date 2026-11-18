import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { ValuePropsSection } from "@/components/value-props-section"
import { AboutHero } from "@/components/about/about-hero"
import { OurStory } from "@/components/about/our-story"
import { OurValues } from "@/components/about/our-values"
import { TeamSection } from "@/components/about/team-section"
import { MilestonesSection } from "@/components/about/milestones-section"
import { AboutCta } from "@/components/about/about-cta"

export const metadata = {
  title: "About Us | PizzaHub — Our Story, Mission & Team",
  description:
    "Learn how PizzaHub started, our mission to connect pizza lovers with artisan neighborhood kitchens, our values, and the passionate team behind the platform.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <OurStory />
        <OurValues />
        <MilestonesSection />
        <TeamSection />
        <AboutCta />
      </main>
      <ValuePropsSection />

      <NewsletterSection />
      <Footer />
    </div>
  )
}

