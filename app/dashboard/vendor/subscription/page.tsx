"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"

interface SubscriptionStatus {
  plan: string
  subscriptionExpiresAt: string | null
  stripeConfigured: boolean
}

const PERKS = [
  "Unlimited menu listings (free plan caps at 3)",
  "Featured spotlight on the homepage",
  "Priority vendor support",
  "Discounted platform commission",
]

export default function VendorSubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" />
          Loading subscription...
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  )
}

function SubscriptionContent() {
  const { data, isLoading, error, reload } = useApi<SubscriptionStatus>("/stripe/status")
  const searchParams = useSearchParams()
  const [isWorking, setIsWorking] = useState<"checkout" | null>(null)

  useEffect(() => {
    const checkout = searchParams.get("checkout")
    if (checkout === "success") {
      toast.success("Payment received. Your Premium plan is activating.")
      void reload()
    } else if (checkout === "cancelled") {
      toast.info("Checkout cancelled. You are still on the free plan.")
    }
  }, [searchParams, reload])

  const isPremium = data?.plan === "premium"

  const startCheckout = async () => {
    setIsWorking("checkout")
    try {
      const session = await apiFetch<{ url?: string }>("/stripe/create-checkout-session", {
        method: "POST",
      })
      if (!session.url) throw new Error("Stripe did not return a checkout URL.")
      window.location.href = session.url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not start checkout.")
      setIsWorking(null)
    }
  }

  return (
    <DashboardShell
      role="vendor"
      title="Premium Subscription"
      description="Unlock unlimited listings and grow your pizzeria."
    >
      {isLoading ? (
        <LoadingBlock label="Loading subscription..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : (
        <div className="grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
              Current plan
            </p>
            <p className="mt-2 font-heading text-3xl font-black capitalize">
              {data?.plan ?? "free"}
            </p>
            {data?.subscriptionExpiresAt && (
              <p className="mt-1 text-sm text-muted-foreground">
                Active until {new Date(data.subscriptionExpiresAt).toLocaleDateString()}
              </p>
            )}

            <div className="mt-6 space-y-2">
              {PERKS.map((perk) => (
                <p key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {perk}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-brand/30 bg-linear-to-br from-brand/10 to-brand-secondary/10 p-6">
            <div className="flex items-center gap-2 text-brand">
              <Sparkles className="size-5" />
              <p className="font-heading text-xl font-black">Premium Vendor</p>
            </div>
            <p className="mt-2 font-heading text-4xl font-black">
              $19.99
              <span className="ml-1 font-sans text-sm font-semibold text-muted-foreground">
                / month
              </span>
            </p>

            {isPremium ? (
              <div className="mt-6 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                You are on the Premium plan.
              </div>
            ) : !data?.stripeConfigured ? (
              <div className="mt-6 rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
                Premium checkout is not configured yet. Please try again later.
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => void startCheckout()}
                  disabled={isWorking !== null}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-hover disabled:opacity-50"
                >
                  {isWorking === "checkout" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  Upgrade with Stripe
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Secure payment powered by Stripe.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
