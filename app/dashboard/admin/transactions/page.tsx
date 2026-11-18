"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { EmptyBlock, ErrorBlock, LoadingBlock } from "@/components/dashboard/ui"
import { useApi } from "@/hooks/use-api"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/lib/types"

interface TransactionsResponse {
  transactions: Transaction[]
  total: number
}

const FILTERS = [
  { value: "", label: "All" },
  { value: "succeeded", label: "Succeeded" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
]

const STATUS_STYLES: Record<Transaction["status"], string> = {
  succeeded: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  failed: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
}

export default function AdminTransactionsPage() {
  const [status, setStatus] = useState("")
  const path = status
    ? `/admin/transactions?limit=100&status=${status}`
    : "/admin/transactions?limit=100"
  const { data, isLoading, error, reload } = useApi<TransactionsResponse>(path)

  const transactions = data?.transactions ?? []

  return (
    <DashboardShell
      role="admin"
      title="Transactions"
      description="Read-only record of vendor subscription payments."
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatus(filter.value)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-bold transition",
              status === filter.value
                ? "bg-brand text-white shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingBlock label="Loading transactions..." />
      ) : error ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : transactions.length === 0 ? (
        <EmptyBlock
          title="No transactions yet"
          description="Vendor Premium subscription payments will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="border-b border-border bg-muted/40 text-left text-xs font-bold text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">
                        {transaction.vendor?.name || "Unknown vendor"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.vendor?.email || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 capitalize">{transaction.plan}</td>
                    <td className="px-4 py-3 font-heading font-black text-brand">
                      ${Number(transaction.amount || 0).toFixed(2)}{" "}
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                        {transaction.currency}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
                          STATUS_STYLES[transaction.status]
                        )}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <CreditCard className="size-3.5" />
            {data?.total ?? transactions.length} transaction(s). Records are read-only.
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
