"use client"

import { useEffect, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  CreditCard,
  Heart,
  LayoutDashboard,
  Loader2,
  LogOut,
  Pizza,
  PlusCircle,
  Settings,
  ShoppingBag,
  Shield,
  Sparkles,
  Store,
  User,
  Users,
} from "lucide-react"
import { toast } from "sonner"

import { useAuth } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { Role } from "@/lib/types"

interface NavLink {
  label: string
  href: string
  icon: ReactNode
}

const NAV_LINKS: Record<Role, NavLink[]> = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: <LayoutDashboard className="size-4" /> },
    { label: "My Orders", href: "/dashboard/customer/orders", icon: <ShoppingBag className="size-4" /> },
    { label: "Wishlist", href: "/dashboard/customer/wishlist", icon: <Heart className="size-4" /> },
    { label: "Profile Settings", href: "/dashboard/profile", icon: <Settings className="size-4" /> },
  ],
  vendor: [
    { label: "Overview", href: "/dashboard/vendor", icon: <LayoutDashboard className="size-4" /> },
    { label: "My Menu", href: "/dashboard/vendor/menu", icon: <Pizza className="size-4" /> },
    { label: "Add Item", href: "/dashboard/vendor/add-item", icon: <PlusCircle className="size-4" /> },
    { label: "Customer Orders", href: "/dashboard/vendor/orders", icon: <ShoppingBag className="size-4" /> },
    { label: "Subscription", href: "/dashboard/vendor/subscription", icon: <Sparkles className="size-4" /> },
    { label: "Profile Settings", href: "/dashboard/profile", icon: <Settings className="size-4" /> },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: <LayoutDashboard className="size-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="size-4" /> },
    { label: "Menu Moderation", href: "/dashboard/admin/menu", icon: <Pizza className="size-4" /> },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: <CreditCard className="size-4" /> },
    { label: "Profile Settings", href: "/dashboard/profile", icon: <Settings className="size-4" /> },
  ],
}

const ROLE_LABEL: Record<Role, string> = {
  customer: "Customer",
  vendor: "Vendor",
  admin: "Admin",
}

interface DashboardShellProps {
  role: Role
  title: string
  description?: string
  children: ReactNode
}

export function DashboardShell({ role, title, description, children }: DashboardShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isPending, signOut } = useAuth()

  useEffect(() => {
    if (!isPending && !user) {
      router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [isPending, user, router, pathname])

  if (isPending || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading dashboard...
      </div>
    )
  }

  if (user.role !== role) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4 text-center">
        <Shield className="size-10 text-destructive" />
        <h1 className="font-heading text-2xl font-bold text-foreground">Access denied</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This dashboard is for {ROLE_LABEL[role]} accounts. You are signed in as a{" "}
          {ROLE_LABEL[user.role]}.
        </p>
        <Link href={`/dashboard/${user.role}`} className="text-sm font-bold text-brand hover:underline">
          Go to my dashboard
        </Link>
      </div>
    )
  }

  const links = NAV_LINKS[user.role]

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Logged out successfully.")
      router.push("/")
      router.refresh()
    } catch {
      toast.error("Failed to log out.")
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/60 lg:flex">
        <Link href="/" className="flex items-center gap-2 border-b border-border px-5 py-5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/gourmet-slice-logo.png"
              alt="PizzaHub logo"
              width={96}
              height={64}
              sizes="36px"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="font-heading text-xl font-black">
            Pizza<span className="text-brand">Hub</span>
          </span>
        </Link>

        <nav className="flex-1 space-y-1 p-3">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  active
                    ? "bg-brand text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-3">
          <Link
            href="/menu"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <Store className="size-4" />
            Browse Menu
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/60 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold tracking-wide text-brand uppercase">
              {ROLE_LABEL[user.role]} Dashboard
            </p>
            <h1 className="font-heading text-2xl font-black tracking-tight">{title}</h1>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Link
              href="/dashboard/profile"
              title="Profile settings"
              aria-label="Profile settings"
              className="shrink-0"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="size-9 rounded-full object-cover ring-2 ring-brand/20"
                />
              ) : (
                <div className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {user.name?.slice(0, 1).toUpperCase() || <User className="size-4" />}
                </div>
              )}
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"
            >
              <LogOut className="size-3.5" />
              Log out
            </button>
          </div>
        </header>

        <div className="border-b border-border bg-card/30 px-4 py-2 lg:hidden">
          <nav className="flex gap-1 overflow-x-auto">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition",
                    active ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
