"use client"

import { Suspense, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Briefcase,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Store,
  Trash2,
  UploadCloud,
  User,
  UserPlus,
} from "lucide-react"
import { toast } from "sonner"

import { BrandMark } from "@/components/brand-mark"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { buttonVariants } from "@/components/ui/button"
import { GoogleAuthButton } from "@/components/google-auth-button"
import { useAuth } from "@/lib/auth-client"
import { uploadToImgbb } from "@/lib/imgbb"
import { cn } from "@/lib/utils"

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signUp } = useAuth()

  const initialRole = searchParams.get("role") === "vendor" ? "vendor" : "customer"
  const [role, setRole] = useState<"customer" | "vendor">(initialRole)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [image, setImage] = useState("")
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const handlePhoto = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return

    setIsUploadingPhoto(true)
    try {
      setImage(await uploadToImgbb(file))
      toast.success("Profile photo uploaded.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not upload the photo.")
    } finally {
      setIsUploadingPhoto(false)
      if (photoInputRef.current) photoInputRef.current.value = ""
    }
  }

  const redirectParam = searchParams.get("redirect")
  const redirectTo =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include an uppercase and lowercase letter."
      )
      return
    }

    setIsSubmitting(true)

    try {
      const user = await signUp({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        businessName: role === "vendor" ? businessName.trim() : undefined,
        image: image || undefined,
      })
      toast.success(`Welcome to PizzaHub, ${user.name}!`)
      router.push(redirectTo || `/dashboard/${user.role}`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create your account.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl shadow-black/5">
      <div className="flex flex-col items-center text-center">
        <BrandMark className="size-12" sizes="48px" />
        <h1 className="mt-4 font-heading text-2xl font-black tracking-tight text-foreground">
          Sign Up
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Order from artisan kitchens or open your own storefront.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
            role === "customer"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User className="size-4" />
          Customer
        </button>
        <button
          type="button"
          onClick={() => setRole("vendor")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
            role === "vendor"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Store className="size-4" />
          Vendor
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="flex items-center gap-4">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Profile preview"
              className="size-14 rounded-full object-cover ring-2 ring-brand/20"
            />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
              <User className="size-6" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-foreground">
              Profile photo{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </p>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => void handlePhoto(e.target.files)}
              className="hidden"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-hover disabled:opacity-50"
              >
                {isUploadingPhoto ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <UploadCloud className="size-3.5" />
                )}
                {isUploadingPhoto ? "Uploading..." : image ? "Change photo" : "Upload photo"}
              </button>
              {image && (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  disabled={isUploadingPhoto}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition hover:text-destructive disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-xs font-bold text-foreground">
            Full name
          </label>
          <div className="relative mt-1">
            <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="w-full rounded-xl border border-input bg-background py-2.5 pr-3 pl-10 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        {role === "vendor" && (
          <div>
            <label htmlFor="businessName" className="block text-xs font-bold text-foreground">
              Business name
            </label>
            <div className="relative mt-1">
              <Briefcase className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="businessName"
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Bella Napoli Wood Ovens"
                className="w-full rounded-xl border border-input bg-background py-2.5 pr-3 pl-10 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>
        )}

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
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 chars, 1 uppercase, 1 lowercase"
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
          <p className="mt-1 text-[11px] text-muted-foreground">
            Use at least 6 characters with one uppercase and one lowercase letter.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploadingPhoto}
          className={cn(
            buttonVariants(),
            "w-full justify-center gap-2 rounded-xl bg-brand font-bold text-white shadow-md hover:bg-brand-hover disabled:opacity-60"
          )}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <UserPlus className="size-4" />
          )}
          <span>{isSubmitting ? "Creating account..." : "Create Account"}</span>
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

      <GoogleAuthButton
        mode="sign-up"
        role={role}
        businessName={role === "vendor" ? businessName.trim() : undefined}
        redirectTo={redirectTo}
      />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-bold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-linear-to-b from-brand/5 to-background px-4 py-16">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading sign up...
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
