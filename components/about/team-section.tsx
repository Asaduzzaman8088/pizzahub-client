import { Globe, Link, ExternalLink } from "lucide-react"

const team = [
  {
    name: "Rafi Al-Mansoor",
    role: "Co-Founder & CEO",
    bio: "Serial food entrepreneur with 10 years in the restaurant industry. Rafi's obsession with authentic pizza is the heartbeat of PizzaHub.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    socials: [
      { icon: Globe, label: "Website", href: "#" },
      { icon: Link, label: "LinkedIn", href: "#" },
      { icon: ExternalLink, label: "Twitter", href: "#" },
    ],
  },
  {
    name: "Zara Hossain",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer and open-source contributor. Zara architected PizzaHub's real-time ordering engine from day one.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    socials: [
      { icon: Globe, label: "Website", href: "#" },
      { icon: Link, label: "LinkedIn", href: "#" },
      { icon: ExternalLink, label: "GitHub", href: "#" },
    ],
  },
  {
    name: "Marcus Chen",
    role: "Head of Vendor Success",
    bio: "Former pizzeria owner himself, Marcus knows exactly what vendors need to thrive. He personally onboards every premium partner.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    socials: [
      { icon: Globe, label: "Website", href: "#" },
      { icon: Link, label: "LinkedIn", href: "#" },
      { icon: ExternalLink, label: "Twitter", href: "#" },
    ],
  },
  {
    name: "Priya Nair",
    role: "Lead Product Designer",
    bio: "Human-centered designer with a passion for food photography and intuitive interfaces. Priya shapes every pixel of PizzaHub's experience.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    socials: [
      { icon: Globe, label: "Website", href: "#" },
      { icon: Link, label: "LinkedIn", href: "#" },
      { icon: ExternalLink, label: "Twitter", href: "#" },
    ],
  },
]

export function TeamSection() {
  return (
    <section className="border-b border-border/40 bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
            👥 The People Behind PizzaHub
          </span>
          <h2 className="mt-4 font-heading text-3xl font-black text-foreground sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A small but passionate team that eats pizza (sometimes for research purposes) and builds software for the love of great food.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Avatar */}
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                {/* Social links over image */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {member.socials.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition hover:bg-white/40"
                      aria-label={`${member.name} — ${label}`}
                    >
                      <Icon className="size-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-brand">{member.role}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
