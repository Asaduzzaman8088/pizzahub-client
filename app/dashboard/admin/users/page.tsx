"use client"

import { useState } from "react"
import { Ban, CheckCircle2, Loader2, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { EmptyBlock, ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { Role, User } from "@/lib/types"

interface UsersResponse {
  users: User[]
  total: number
}

const ROLE_STYLES: Record<Role, string> = {
  customer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  vendor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [busyId, setBusyId] = useState<string | null>(null)

  const params = new URLSearchParams({ limit: "100" })
  if (search.trim()) params.set("search", search.trim())
  if (role) params.set("role", role)

  const { data, isLoading, error, reload } = useApi<UsersResponse>(`/admin/users?${params}`)

  const updateUser = async (userId: string, body: Record<string, unknown>, message: string) => {
    setBusyId(userId)
    try {
      await apiFetch(`/admin/users/${userId}`, { method: "PATCH", body })
      toast.success(message)
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the user.")
    } finally {
      setBusyId(null)
    }
  }

  const deleteUser = async (user: User) => {
    if (!window.confirm(`Delete ${user.name} and all related data? This cannot be undone.`)) return
    setBusyId(user.id)
    try {
      await apiFetch(`/admin/users/${user.id}`, { method: "DELETE" })
      toast.success("User deleted.")
      await reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the user.")
    } finally {
      setBusyId(null)
    }
  }

  const users = data?.users ?? []

  return (
    <DashboardShell role="admin" title="Manage Users" description="Search, block, promote, or remove accounts.">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or business..."
            className="w-full rounded-xl border border-input bg-card py-2.5 pr-3 pl-10 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm font-semibold text-foreground outline-none focus:border-brand"
        >
          <option value="">All roles</option>
          <option value="customer">Customers</option>
          <option value="vendor">Vendors</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {isLoading ? (
        <LoadingBlock label="Loading users..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : users.length === 0 ? (
        <EmptyBlock title="No users found" description="Try a different search or role filter." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="border-b border-border bg-muted/40 text-left text-xs font-bold text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => {
                  const isSelf = currentUser?.id === user.id
                  const isBusy = busyId === user.id

                  return (
                    <tr key={user.id}>
                      <td className="px-4 py-3">
                        <p className="font-bold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        {user.businessName && (
                          <p className="text-[11px] text-muted-foreground">{user.businessName}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
                            ROLE_STYLES[user.role]
                          )}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
                            user.isBlocked
                              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          )}
                        >
                          {user.isBlocked ? "blocked" : "active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {isBusy && <Loader2 className="size-4 animate-spin text-muted-foreground" />}

                          <select
                            value={user.role}
                            disabled={isBusy || isSelf}
                            onChange={(e) =>
                              void updateUser(
                                user.id,
                                { role: e.target.value },
                                `Role updated to ${e.target.value}.`
                              )
                            }
                            className="rounded-lg border border-border bg-background px-2 py-1.5 text-[11px] font-bold disabled:opacity-50"
                            aria-label="Change role"
                          >
                            <option value="customer">customer</option>
                            <option value="vendor">vendor</option>
                            <option value="admin">admin</option>
                          </select>

                          <button
                            onClick={() =>
                              void updateUser(
                                user.id,
                                { isBlocked: !user.isBlocked },
                                user.isBlocked ? "User unblocked." : "User blocked."
                              )
                            }
                            disabled={isBusy || isSelf}
                            className="flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground disabled:opacity-50"
                          >
                            {user.isBlocked ? (
                              <CheckCircle2 className="size-3" />
                            ) : (
                              <Ban className="size-3" />
                            )}
                            {user.isBlocked ? "Unblock" : "Block"}
                          </button>

                          <button
                            onClick={() => void deleteUser(user)}
                            disabled={isBusy || isSelf}
                            className="flex items-center gap-1 rounded-lg border border-destructive/40 px-2 py-1.5 text-[11px] font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50"
                          >
                            <Trash2 className="size-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
