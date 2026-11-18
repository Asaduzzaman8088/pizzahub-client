"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { apiFetch } from "@/lib/api"
import type { User } from "@/lib/types"

export interface SignUpInput {
  name: string
  email: string
  password: string
  role: "customer" | "vendor"
  businessName?: string
}

interface AuthContextValue {
  user: User | null
  isPending: boolean
  refresh: () => Promise<User | null>
  signIn: (email: string, password: string) => Promise<User>
  signUp: (input: SignUpInput) => Promise<User>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isPending, setIsPending] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const data = await apiFetch<{ user: User }>("/auth/me")
      setUser(data.user)
      return data.user
    } catch {
      setUser(null)
      return null
    } finally {
      setIsPending(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const signIn = useCallback(async (email: string, password: string) => {
    const data = await apiFetch<{ user: User }>("/auth/login", {
      method: "POST",
      body: { email, password },
    })
    setUser(data.user)
    return data.user
  }, [])

  const signUp = useCallback(async (input: SignUpInput) => {
    const data = await apiFetch<{ user: User }>("/auth/register", {
      method: "POST",
      body: input,
    })
    setUser(data.user)
    return data.user
  }, [])

  const signOut = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" })
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({ user, isPending, refresh, signIn, signUp, signOut }),
    [user, isPending, refresh, signIn, signUp, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>")
  }
  return context
}
