import { Mail, Phone, MessageSquare } from "lucide-react"

export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-br from-brand via-brand-hover to-rose-800 py-20 text-white">
      <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 size-[500px] rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
          💬 We&apos;re Here to Help
        </div>
        <h1 className="mt-5 font-heading text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Get in Touch with{" "}
          <span className="text-amber-300">PizzaHub</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85 leading-relaxed">
          Whether you have a question about an order, want to list your pizzeria,
          or just want to chat about pizza — our team is available 7 days a week
          and responds within a few hours.
        </p>

        {/* Quick contact pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:support@pizzahub.com"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition hover:bg-white/25"
          >
            <Mail className="size-4 text-amber-300" />
            support@pizzahub.com
          </a>
          <a
            href="tel:+18001234567"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition hover:bg-white/25"
          >
            <Phone className="size-4 text-amber-300" />
            +1 (800) 123-4567
          </a>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur-md">
            <MessageSquare className="size-4 text-amber-300" />
            Mon–Sun · 9 AM – 10 PM
          </span>
        </div>
      </div>
    </section>
  )
}
