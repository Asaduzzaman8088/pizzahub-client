import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react"

const contactDetails = [
  {
    icon: Mail,
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    label: "Email Us",
    value: "support@pizzahub.com",
    sub: "We reply within 2–4 hours",
    href: "mailto:support@pizzahub.com",
  },
  {
    icon: Phone,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    label: "Call Us",
    value: "+1 (800) 123-4567",
    sub: "Mon–Sun · 9 AM to 10 PM",
    href: "tel:+18001234567",
  },
  {
    icon: MapPin,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    label: "Headquarters",
    value: "147 Artisan Ave, Suite 302",
    sub: "Brooklyn, New York, NY 11201",
    href: "https://maps.google.com",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    label: "Live Chat",
    value: "Open in Dashboard",
    sub: "Available for logged-in users",
    href: "/sign-in",
  },
]

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 10:00 PM" },
  { day: "Saturday", time: "10:00 AM – 9:00 PM" },
  { day: "Sunday", time: "11:00 AM – 7:00 PM" },
]

const socials = [
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-500/10 hover:text-pink-500" },
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-sky-500/10 hover:text-sky-500" },
  { icon: Twitter, label: "Twitter / X", href: "#", color: "hover:bg-slate-500/10 hover:text-slate-600 dark:hover:text-slate-300" },
]

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact detail cards */}
      {contactDetails.map(({ icon: Icon, iconBg, iconColor, label, value, sub, href }) => (
        <a
          key={label}
          href={href}
          className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md hover:border-brand/30"
        >
          <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`size-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-0.5 font-semibold text-foreground group-hover:text-brand transition-colors">
              {value}
            </p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        </a>
      ))}

      {/* Business Hours */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
        <div className="mb-3 flex items-center gap-2">
          <Clock className="size-4 text-brand" />
          <span className="text-sm font-bold text-foreground">Support Hours</span>
        </div>
        <div className="space-y-2">
          {hours.map(({ day, time }) => (
            <div key={day} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{day}</span>
              <span className="font-semibold text-foreground">{time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
        <p className="mb-3 text-sm font-bold text-foreground">Follow PizzaHub</p>
        <div className="flex gap-2">
          {socials.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition ${color}`}
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
