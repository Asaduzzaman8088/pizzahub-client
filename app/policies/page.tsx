import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Policies | PizzaHub",
  description:
    "PizzaHub delivery coverage, refunds and cancellations, privacy, terms of service, and kitchen quality standards.",
}

const sections = [
  {
    id: "delivery",
    title: "Delivery Coverage & Zones",
    body: [
      "PizzaHub delivers through independently vetted pizzerias across our listed districts. Availability depends on the vendor's kitchen area and current order volume.",
      "Delivery windows are shown at checkout. If a vendor cannot fulfil an order in the selected window, the order is rejected and no charge is made.",
    ],
  },
  {
    id: "refund",
    title: "Refund & Cancellation Policy",
    body: [
      "Customers may cancel a pending order from the Customer Dashboard before the vendor accepts it. Orders that are already accepted, rejected, or cancelled cannot be cancelled again.",
      "If an order arrives damaged, cold, or incorrect, contact the vendor through the order record so the kitchen can remake or refund it.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    body: [
      "We store only the account, order, and profile information required to run the marketplace. Passwords are handled by Better Auth and are never returned to the client.",
      "Profile photos and menu images are hosted through ImgBB. Payment card details are handled entirely by Stripe and never reach our servers.",
    ],
  },
  {
    id: "terms",
    title: "Terms of Service",
    body: [
      "Accounts must provide accurate information and may not impersonate another person or business. Vendor accounts must keep menu items, availability, and pricing accurate.",
      "PizzaHub may suspend accounts that abuse the platform, submit misleading listings, or attempt to bypass role and ownership checks.",
    ],
  },
  {
    id: "standards",
    title: "Quality & Hygiene Standards",
    body: [
      "Vendors agree to maintain safe food-handling practices, accurate ingredient declarations, and honest delivery estimates. Menu items are reviewed by an admin before they appear publicly.",
      "We may remove listings that fail quality checks or receive repeated verified complaints.",
    ],
  },
]

export default function PoliciesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-wide text-brand uppercase">PizzaHub</p>
        <h1 className="mt-2 font-heading text-3xl font-black tracking-tight sm:text-4xl">
          Policies & Standards
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The rules that keep orders, payments, and kitchens on the same page.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6"
            >
              <h2 className="font-heading text-xl font-black">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
