"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react"
import { toast } from "sonner"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { buttonVariants } from "@/components/ui/button"
import { GoogleAuthButton } from "@/components/google-auth-button"
import { useAuth } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectParam = searchParams.get("redirect")
  const redirectTo =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const user = await signIn(email.trim(), password)
      toast.success(`Welcome back, ${user.name}!`)
      router.push(redirectTo || `/dashboard/${user.role}`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl shadow-black/5">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
          <Image
            src="/images/gourmet-slice-logo.png"
            alt="PizzaHub logo"
            width={96}
            height={64}
            sizes="44px"
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="mt-4 font-heading text-2xl font-black tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to order pizzas, track deliveries, and manage your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-foreground">
            Email address
          </label>
          <div className="relative mt-1">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-input bg-background py-2.5 pr-3 pl-10 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-bold text-foreground">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-input bg-background py-2.5 pr-10 pl-10 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants(),
            "w-full justify-center gap-2 rounded-xl bg-brand font-bold text-white shadow-md hover:bg-brand-hover disabled:opacity-60"
          )}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LogIn className="size-4" />
          )}
          <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
        </button>
      </form>

      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
          or continue with
        </span>
      </div>

      <GoogleAuthButton mode="sign-in" redirectTo={redirectTo} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to PizzaHub?{" "}
        <Link href="/sign-up" className="font-bold text-brand hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-linear-to-b from-brand/5 to-background px-4 py-16">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading sign in...
            </div>
          }
        >
          <SignInForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
