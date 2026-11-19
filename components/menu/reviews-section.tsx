"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Loader2, MessageSquare, Star, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import { confirmAction } from "@/lib/confirm"
import { useAuth } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { Review } from "@/lib/types"

interface ReviewsResponse {
  success: boolean
  count: number
  reviews: Review[]
}

interface ReviewsSectionProps {
  itemId: string
  onReviewChange?: () => void
}

function StarRating({ value, size = "size-4" }: { value: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            size,
            index < value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  )
}

function ReviewForm({
  itemId,
  existing,
  onDone,
}: {
  itemId: string
  existing?: Review
  onDone: () => Promise<void>
}) {
  const [rating, setRating] = useState(existing?.rating ?? 5)
  const [comment, setComment] = useState(existing?.comment ?? "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (comment.trim().length < 3) {
      toast.error("Please write a comment of at least 3 characters.")
      return
    }

    setIsSubmitting(true)
    try {
      await apiFetch(`/menu/${itemId}/reviews`, {
        method: "POST",
        body: { rating, comment: comment.trim() },
      })
      toast.success(existing ? "Your review was updated." : "Thanks for your review!")
      await onDone()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your review.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 rounded-2xl border border-border bg-muted/20 p-4">
      <p className="text-sm font-bold text-foreground">
        {existing ? "Update your review" : "Write a review"}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Rating</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const next = index + 1
            return (
              <button
                key={next}
                type="button"
                onClick={() => setRating(next)}
                aria-label={`Rate ${next} out of 5`}
                className="rounded p-0.5 transition hover:scale-110"
              >
                <Star
                  className={cn(
                    "size-5",
                    next <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        rows={3}
        maxLength={500}
        placeholder="Tell other pizza lovers what you thought..."
        className="mt-3 w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-[11px] text-muted-foreground">{comment.length}/500</span>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-hover disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
          {existing ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </form>
  )
}

export function ReviewsSection({ itemId, onReviewChange }: ReviewsSectionProps) {
  const { user, isPending } = useAuth()
  const pathname = usePathname()
  const { data, isLoading, error, reload } = useApi<ReviewsResponse>(`/menu/${itemId}/reviews`)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const reviews = data?.reviews ?? []
  const myReview =
    user?.role === "customer"
      ? reviews.find((review) => review.customer?.id === user.id)
      : undefined
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

  const handleChanged = async () => {
    await reload()
    onReviewChange?.()
  }

  const performRemoveReview = async (review: Review) => {
    setDeletingId(review.id)
    try {
      await apiFetch(`/reviews/${review.id}`, { method: "DELETE" })
      toast.info("Review deleted.")
      await handleChanged()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the review.")
    } finally {
      setDeletingId(null)
    }
  }

  const removeReview = (review: Review) => {
    confirmAction("Delete this review? This cannot be undone.", () => {
      void performRemoveReview(review)
    })
  }

  return (
    <section className="mt-16 border-t border-border/60 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-2xl font-black text-foreground">
            <MessageSquare className="size-5 text-brand" />
            Customer Reviews
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Honest notes from people who ordered this pizza.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2">
          <StarRating value={Math.round(average)} />
          <span className="font-heading text-sm font-black text-foreground">
            {reviews.length > 0 ? average.toFixed(1) : "New"}
          </span>
          <span className="text-xs text-muted-foreground">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading reviews...
        </div>
      ) : error ? (
        <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
          <button
            onClick={() => void reload()}
            className="ml-2 font-bold underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-3">
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                <MessageSquare className="mx-auto size-8 text-muted-foreground/50" />
                <p className="mt-2 text-sm font-bold text-foreground">No reviews yet</p>
                <p className="text-xs text-muted-foreground">
                  Be the first to share your thoughts on this pizza.
                </p>
              </div>
            ) : (
              reviews.map((review) => {
                const canDelete =
                  user?.role === "admin" || review.customer?.id === user?.id
                const initials = (review.customer?.name || "P")
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()

                return (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-9 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {review.customer?.name || "Pizza Lover"}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <StarRating value={review.rating} size="size-3.5" />
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>

                    {canDelete && (
                      <button
                        onClick={() => void removeReview(review)}
                        disabled={deletingId === review.id}
                        className="mt-3 flex items-center gap-1 rounded-lg border border-destructive/30 px-2.5 py-1 text-[11px] font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50"
                      >
                        {deletingId === review.id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Trash2 className="size-3" />
                        )}
                        Delete
                      </button>
                    )}
                  </article>
                )
              })
            )}
          </div>

          <div className="lg:col-span-2">
            {isPending ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Checking your account...
              </div>
            ) : user?.role === "customer" ? (
              <ReviewForm
                key={myReview?.id ?? "new"}
                itemId={itemId}
                existing={myReview}
                onDone={handleChanged}
              />
            ) : (
              <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                {user ? (
                  "Only customer accounts can leave reviews."
                ) : (
                  <>
                    <Link
                      href={`/sign-in?redirect=${encodeURIComponent(pathname)}`}
                      className="font-bold text-brand hover:underline"
                    >
                      Sign in
                    </Link>{" "}
                    as a customer to leave a review.
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
