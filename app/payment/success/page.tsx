import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Payment Successful | PizzaHub",
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <CheckCircle2 className="mx-auto size-14 text-emerald-600 dark:text-emerald-400" />
          <h1 className="mt-4 font-heading text-2xl font-black text-foreground">
            Payment Successful
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you! Your Premium subscription will activate as soon as Stripe confirms the
            payment via webhook. This usually takes a few seconds.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/vendor/subscription"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover"
            >
              View Subscription
            </Link>
            <Link
              href="/dashboard/vendor"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
