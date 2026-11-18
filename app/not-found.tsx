import Link from "next/link"
import { Pizza } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-brand/10 text-brand">
          <Pizza className="size-10" />
        </div>
        <h1 className="font-heading text-4xl font-black">404 — Page not found</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          This slice seems to have been eaten. The page you are looking for does not exist or has
          been moved.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover"
          >
            Back Home
          </Link>
          <Link
            href="/menu"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            Browse Menu
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
