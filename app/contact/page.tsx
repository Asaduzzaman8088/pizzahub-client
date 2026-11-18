import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { ValuePropsSection } from "@/components/value-props-section"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFaq } from "@/components/contact/contact-faq"

export const metadata = {
  title: "Contact Us | PizzaHub — We'd Love to Hear From You",
  description:
    "Get in touch with the PizzaHub team for support, vendor partnerships, media inquiries, or general questions. We're here to help 7 days a week.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <ContactHero />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </section>
        <ContactFaq />
      </main>
      <ValuePropsSection />

      <NewsletterSection />
      <Footer />
    </div>
  )
}

