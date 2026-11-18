"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, HelpCircle, Loader2, Sparkles, X } from "lucide-react"
import { toast } from "sonner"

import { useAuth } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: { access_token?: string; error?: string }) => void
          }) => {
            requestAccessToken: (options?: { prompt?: string }) => void
          }
        }
      }
    }
  }
}

export function GoogleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  )
}

interface GoogleAuthButtonProps {
  mode?: "sign-in" | "sign-up"
  role?: "customer" | "vendor"
  businessName?: string
  redirectTo?: string | null
  className?: string
}

export function GoogleAuthButton({
  mode = "sign-in",
  role = "customer",
  businessName,
  redirectTo,
  className,
}: GoogleAuthButtonProps) {
  const router = useRouter()
  const { signInWithGoogle } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [demoEmail, setDemoEmail] = useState("alex.pizza@gmail.com")
  const [demoName, setDemoName] = useState("Alex Morgan")
  const scriptLoadedRef = useRef(false)

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim()

  // Load Google Identity Services script
  useEffect(() => {
    if (scriptLoadedRef.current || typeof window === "undefined") return
    if (document.getElementById("google-gsi-client")) {
      scriptLoadedRef.current = true
      return
    }

    const script = document.createElement("script")
    script.id = "google-gsi-client"
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => {
      scriptLoadedRef.current = true
    }
    script.onerror = () => {
      scriptLoadedRef.current = false
      script.remove()
      toast.error("Could not load Google sign-in. Check your connection and try again.")
    }
    document.head.appendChild(script)
  }, [])

  const handleLiveGoogleLogin = () => {
    if (!googleClientId) {
      setShowConfigModal(true)
      return
    }

    if (!window.google?.accounts?.oauth2) {
      toast.error("Google services are still loading. Please try again in a moment.")
      return
    }

    setIsLoading(true)

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        scope: "email profile openid",
        callback: async (response) => {
          if (response.error || !response.access_token) {
            setIsLoading(false)
            if (response.error !== "access_denied") {
              toast.error(response.error || "Google authentication was cancelled.")
            }
            return
          }

          try {
            const user = await signInWithGoogle({
              accessToken: response.access_token,
              role,
              businessName,
            })
            toast.success(
              mode === "sign-up"
                ? `Welcome to PizzaHub, ${user.name}!`
                : `Welcome back, ${user.name}!`
            )
            router.push(redirectTo || `/dashboard/${user.role}`)
            router.refresh()
          } catch (error) {
            toast.error(
              error instanceof Error ? error.message : "Unable to authenticate with Google."
            )
          } finally {
            setIsLoading(false)
          }
        },
      })

      client.requestAccessToken({ prompt: "select_account" })
    } catch (err) {
      setIsLoading(false)
      toast.error(err instanceof Error ? err.message : "Could not launch Google Sign-In.")
    }
  }

  const handleDemoGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const user = await signInWithGoogle({
        isDemo: true,
        demoEmail: demoEmail.trim() || "alex.pizza@gmail.com",
        demoName: demoName.trim() || "Alex Morgan",
        role,
        businessName,
      })
      setShowConfigModal(false)
      toast.success(
        mode === "sign-up"
          ? `Welcome to PizzaHub, ${user.name}!`
          : `Welcome back, ${user.name}!`
      )
      router.push(redirectTo || `/dashboard/${user.role}`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Demo Google login failed.")
    } finally {
      setIsLoading(false)
    }
  }

  const buttonText =
    mode === "sign-up"
      ? role === "vendor"
        ? "Sign up as Vendor with Google"
        : "Sign up with Google"
      : "Continue with Google"

  return (
    <>
      <button
        type="button"
        onClick={handleLiveGoogleLogin}
        disabled={isLoading}
        className={cn(
          "relative flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-xs transition hover:bg-muted/80 hover:border-muted-foreground/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60",
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        ) : (
          <GoogleIcon className="size-5 shrink-0" />
        )}
        <span>{isLoading ? "Connecting to Google..." : buttonText}</span>
      </button>

      {/* Configuration / Quick Demo Modal if NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured */}
      {showConfigModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                <GoogleIcon className="size-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Google Authentication
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ready to test or configure live OAuth
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-brand/20 bg-brand/5 p-4 text-xs text-foreground space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-brand">
                <Sparkles className="size-4" />
                <span>Instant Demo Mode Ready</span>
              </div>
              <p className="text-muted-foreground">
                No Google Cloud account needed right now! Test the full Google login & signup flow
                with one click below.
              </p>

              <div className="space-y-2 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground">Name</label>
                  <input
                    type="text"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="mt-0.5 w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground">
                    Google Email
                  </label>
                  <input
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="alex.pizza@gmail.com"
                    className="mt-0.5 w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-brand"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoGoogleLogin}
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2 font-bold text-white shadow-xs hover:bg-brand-hover"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}
                <span>Test Demo Google Login</span>
              </button>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <HelpCircle className="size-4 text-muted-foreground" />
                <span>To use real Google accounts:</span>
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
                <li>Create an OAuth 2.0 Web Client ID in Google Cloud Console.</li>
                <li>Add origin: <code className="text-foreground">http://localhost:3000</code></li>
                <li>
                  Add to <code className="text-foreground">pizzahub-client/.env.local</code>:
                  <div className="mt-1 rounded bg-muted p-1.5 font-mono text-[11px] text-foreground select-all">
                    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
                  </div>
                </li>
                <li>
                  Add the same ID plus your secret to <code className="text-foreground">pizzahub-server/.env</code>:
                  <div className="mt-1 rounded bg-muted p-1.5 font-mono text-[11px] text-foreground select-all">
                    GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
                    <br />
                    GOOGLE_CLIENT_SECRET=your_client_secret
                  </div>
                </li>
              </ol>
            </div>

            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="mt-5 w-full rounded-xl border border-border py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
