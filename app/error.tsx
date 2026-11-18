"use client"

import { AlertTriangle } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-10" />
        </div>
        <h1 className="font-heading text-3xl font-black">Something went wrong</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
        <button
          onClick={reset}
          className="mt-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover"
        >
          Try again
        </button>
      </main>
      <Footer />
    </div>
  )
}
