import Link from "next/link"
import { XCircle } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Payment Cancelled | PizzaHub",
}

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 text-center">
          <XCircle className="mx-auto size-14 text-rose-500" />
          <h1 className="mt-4 font-heading text-2xl font-black text-foreground">
            Payment Cancelled
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No charge was made. You can upgrade to Premium whenever you are ready.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/vendor/subscription"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover"
            >
              Try Again
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
