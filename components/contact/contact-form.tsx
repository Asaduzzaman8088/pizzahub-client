"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const subjects = [
  "Order Support",
  "Vendor Partnership",
  "Billing & Payments",
  "Report a Bug",
  "Media & Press",
  "General Inquiry",
]

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.")
      return
    }
    if (form.message.trim().length < 20) {
      toast.error("Message must be at least 20 characters.")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800))
    setIsSubmitting(false)
    setSubmitted(true)
    toast.success("Message sent! We'll reply within a few hours.")
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-12 text-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="flex size-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle className="size-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-black text-foreground">
            Message Received! 🎉
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Thanks, <strong>{form.name}</strong>! We got your message and will
            reply to <strong>{form.email}</strong> within a few hours. In the
            meantime, check our FAQ below for quick answers.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm({ name: "", email: "", subject: "", message: "" })
          }}
          className="text-sm font-semibold text-brand underline underline-offset-4 transition hover:text-brand-hover"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-black text-foreground">
          Send Us a Message
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the form below and we&apos;ll get back to you within a few hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name + Email row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              Full Name <span className="text-brand">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              Email Address <span className="text-brand">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="">Select a subject…</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            Your Message <span className="text-brand">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you…"
            rows={6}
            required
            className="w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {form.message.length}/500 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full gap-2 bg-brand font-bold text-white hover:bg-brand-hover disabled:opacity-60"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  )
}
