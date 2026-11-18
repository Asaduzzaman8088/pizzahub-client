"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import {
  Pizza,
  Menu,
  X,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ShoppingBag,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Shield,
  Heart,
  ChevronDown,
  Sparkles,
  Store,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

import { BrandMark } from "@/components/brand-mark"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-client"

export interface NavItem {
  label: string
  href: string
  badge?: string
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore Menu", href: "/menu" },
  { label: "Hot Deals", href: "/hot-deals", badge: "20% OFF" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Authenticated session provided by the server JWT API
  const { user, isPending, signOut } = useAuth()

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setProfileDropdownOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Successfully logged out. Come back hungry!")
      router.push("/")
      router.refresh()
    } catch {
      toast.error("Failed to sign out. Please try again.")
    }
  }

  // Determine user info and role (default to "customer" if not set)
  const userRole = (user?.role || "customer") as "customer" | "vendor" | "admin"
  const userName = user?.name || "Pizza Lover"
  const userEmail = user?.email || ""
  const userImage = user?.image || ""

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="w-full">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="PizzaHub Homepage"
        >
          <BrandMark className="size-12" sizes="48px" priority />

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-2xl font-black tracking-tight text-foreground">
                Pizza<span className="text-brand">Hub</span>
              </span>
              <span className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand uppercase">
                Artisan
              </span>
            </div>
            <span className="-mt-1 text-[11px] font-medium tracking-wider text-muted-foreground">
              Wood-Fired & Delivered Hot
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-secondary text-secondary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-brand px-1.5 py-0.2 text-[10px] font-bold text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Action Controls & Authentication Area */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex size-9.5 items-center justify-center rounded-xl border border-border bg-card/50 text-muted-foreground shadow-xs transition hover:border-brand/40 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4.5 text-amber-400" />
            ) : (
              <Moon className="size-4.5 text-slate-700" />
            )}
          </button>

          {/* Conditional Auth Section */}
          {isPending ? (
            <div className="flex size-9.5 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            /* Logged-In User Profile Avatar & Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="group flex items-center gap-2.5 rounded-full border border-border/80 bg-card p-1 pr-3 shadow-xs transition hover:border-brand/50 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand/40"
                title={`Signed in as ${userName}`}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
              >
                {/* Avatar with image or initials */}
                {userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userImage}
                    alt={userName}
                    className="size-8 rounded-full object-cover ring-2 ring-brand/20"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-brand font-heading text-xs font-bold text-white ring-2 ring-brand/20">
                    {getInitials(userName)}
                  </div>
                )}

                <div className="flex flex-col text-left">
                  <span className="max-w-[110px] truncate text-xs font-bold text-foreground">
                    {userName}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground capitalize">
                    {userRole}
                  </span>
                </div>

                <ChevronDown
                  className={cn(
                    "size-3.5 text-muted-foreground transition-transform duration-200",
                    profileDropdownOpen && "rotate-180 text-brand"
                  )}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl transition animate-in fade-in-0 zoom-in-95">
                  {/* User Profile Header Card */}
                  <div className="mb-2 rounded-xl bg-muted/60 p-3">
                    <div className="flex items-center gap-2.5">
                      {userImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={userImage}
                          alt={userName}
                          className="size-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-brand font-heading text-sm font-bold text-white">
                          {getInitials(userName)}
                        </div>
                      )}
                      <div className="flex flex-col overflow-hidden">
                        <p className="truncate text-sm font-bold text-foreground">
                          {userName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {userEmail}
                        </p>
                        <div className="mt-1">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                              userRole === "admin"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                : userRole === "vendor"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            )}
                          >
                            {userRole}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0.5 border-t border-border/60 pt-1 text-sm font-medium">
                    {/* Role-Specific Navigation Links */}
                    {userRole === "customer" && (
                      <>
                        <Link
                          href="/dashboard/customer"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <LayoutDashboard className="size-4 text-brand" />
                          <span>Customer Dashboard</span>
                        </Link>
                        <Link
                          href="/dashboard/customer/orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <ShoppingBag className="size-4 text-brand-secondary" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          href="/dashboard/customer/wishlist"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Heart className="size-4 text-rose-500" />
                          <span>Favorite Pizzas</span>
                        </Link>
                      </>
                    )}

                    {userRole === "vendor" && (
                      <>
                        <Link
                          href="/dashboard/vendor"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Store className="size-4 text-brand" />
                          <span>Vendor Overview</span>
                        </Link>
                        <Link
                          href="/dashboard/vendor/menu"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Pizza className="size-4 text-brand-secondary" />
                          <span>My Menu Items</span>
                        </Link>
                        <Link
                          href="/dashboard/vendor/add-item"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <PlusCircle className="size-4 text-emerald-500" />
                          <span>Add New Pizza</span>
                        </Link>
                        <Link
                          href="/dashboard/vendor/subscription"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Sparkles className="size-4 text-amber-500" />
                          <span>Upgrade to Premium</span>
                        </Link>
                      </>
                    )}

                    {userRole === "admin" && (
                      <>
                        <Link
                          href="/dashboard/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Shield className="size-4 text-purple-500" />
                          <span>Admin Control Panel</span>
                        </Link>
                        <Link
                          href="/dashboard/admin/users"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <User className="size-4 text-blue-500" />
                          <span>Manage Users</span>
                        </Link>
                        <Link
                          href="/dashboard/admin/menu"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Pizza className="size-4 text-brand" />
                          <span>Manage Menu Items</span>
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Profile Settings */}
                  <div className="mt-2 border-t border-border/60 pt-1.5">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <Settings className="size-4 text-slate-500" />
                      <span>Profile Settings</span>
                    </Link>
                  </div>

                  {/* Sign Out Button */}
                  <div className="mt-2 border-t border-border/60 pt-1.5">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-destructive transition hover:bg-destructive/10"
                    >
                      <LogOut className="size-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged-Out State: Login and Register buttons */
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1.5 font-semibold text-foreground hover:bg-muted"
                )}
              >
                <LogIn className="size-4 text-brand" />
                <span>Log In</span>
              </Link>

              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "gap-1.5 bg-brand font-semibold text-white shadow-sm shadow-brand/20 hover:bg-brand-hover"
                )}
              >
                <UserPlus className="size-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:bg-muted"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4.5 text-amber-400" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile navigation menu"
            className="flex size-9.5 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 pt-3 pb-6 shadow-lg md:hidden">
          {/* User profile banner if logged in */}
          {user && (
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-muted/60 p-3">
              {userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userImage}
                  alt={userName}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-brand font-heading text-sm font-bold text-white">
                  {getInitials(userName)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">{userName}</span>
                <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
              </div>
            </div>
          )}

          {/* Nav links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? "bg-secondary text-secondary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Dashboard shortcut if logged in */}
            {user && (
              <Link
                href={`/dashboard/${userRole}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold text-brand hover:bg-brand/5"
              >
                <LayoutDashboard className="size-4" />
                <span>Go to Dashboard</span>
              </Link>
            )}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            {user ? (
              <button
                onClick={handleSignOut}
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  "w-full justify-center gap-2"
                )}
              >
                <LogOut className="size-4" />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-center font-semibold"
                  )}
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "w-full justify-center bg-brand font-semibold text-white hover:bg-brand-hover"
                  )}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
