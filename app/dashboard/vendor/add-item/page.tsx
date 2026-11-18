"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImagePlus, Loader2, PlusCircle } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { apiFetch } from "@/lib/api"
import type { MenuCategory } from "@/lib/types"

const CATEGORIES: { value: MenuCategory; label: string }[] = [
  { value: "neapolitan", label: "Neapolitan Wood-Fired" },
  { value: "new-york", label: "New York Foldable" },
  { value: "deep-dish", label: "Chicago Deep Dish" },
  { value: "detroit", label: "Detroit Square" },
  { value: "gourmet", label: "Gourmet White" },
  { value: "vegan", label: "Vegan & Plant-Based" },
  { value: "gluten-free", label: "Gluten-Free Cauliflower" },
]

export default function AddMenuItemPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    itemName: "",
    category: "neapolitan" as MenuCategory,
    description: "",
    longDescription: "",
    price: "",
    location: "",
    images: "",
    deliveryTime: "30-40 min",
    deliveryFee: "0",
    doughFermentation: "",
    ovenTemperature: "",
    ingredients: "",
  })
  const [flags, setFlags] = useState({
    isVegetarian: false,
    isSpicy: false,
    isGlutenFree: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await apiFetch("/menu", {
        method: "POST",
        body: {
          ...form,
          price: Number(form.price),
          deliveryFee: Number(form.deliveryFee) || 0,
          images: form.images
            .split(/[\n,]/)
            .map((url) => url.trim())
            .filter(Boolean),
          ingredients: form.ingredients
            .split(/[\n,]/)
            .map((ingredient) => ingredient.trim())
            .filter(Boolean),
          ...flags,
        },
      })
      toast.success("Pizza submitted for admin approval.")
      router.push("/dashboard/vendor/menu")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create the menu item.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"

  return (
    <DashboardShell
      role="vendor"
      title="Add New Pizza"
      description="New listings are reviewed by an admin before they go live."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-6 rounded-2xl border border-border bg-card p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-foreground">Pizza name *</label>
            <input
              required
              value={form.itemName}
              onChange={(e) => update("itemName", e.target.value)}
              placeholder="Margherita Di Bufala D.O.P."
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Category *</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className={`mt-1 ${inputClass}`}
            >
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Price (USD) *</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              placeholder="18.99"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-foreground">Short description *</label>
            <input
              required
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="San Marzano tomatoes, buffalo mozzarella, fresh basil."
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-foreground">Full description</label>
            <textarea
              rows={4}
              value={form.longDescription}
              onChange={(e) => update("longDescription", e.target.value)}
              placeholder="Tell customers what makes this pizza special..."
              className={`mt-1 resize-none ${inputClass}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Location / district *</label>
            <input
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Little Italy, Manhattan"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Delivery time</label>
            <input
              value={form.deliveryTime}
              onChange={(e) => update("deliveryTime", e.target.value)}
              placeholder="30-40 min"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Delivery fee (USD)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.deliveryFee}
              onChange={(e) => update("deliveryFee", e.target.value)}
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Dough fermentation</label>
            <input
              value={form.doughFermentation}
              onChange={(e) => update("doughFermentation", e.target.value)}
              placeholder="72-hour cold fermentation"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Oven temperature</label>
            <input
              value={form.ovenTemperature}
              onChange={(e) => update("ovenTemperature", e.target.value)}
              placeholder="900°F wood-fired"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 text-xs font-bold text-foreground">
              <ImagePlus className="size-4 text-brand" />
              Image URLs * <span className="font-normal text-muted-foreground">(one per line)</span>
            </label>
            <textarea
              required
              rows={3}
              value={form.images}
              onChange={(e) => update("images", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className={`mt-1 resize-none ${inputClass}`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-foreground">
              Ingredients <span className="font-normal text-muted-foreground">(comma separated)</span>
            </label>
            <textarea
              rows={2}
              value={form.ingredients}
              onChange={(e) => update("ingredients", e.target.value)}
              placeholder="San Marzano tomatoes, Buffalo mozzarella, Fresh basil"
              className={`mt-1 resize-none ${inputClass}`}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-border pt-4">
          {(
            [
              ["isVegetarian", "Vegetarian"],
              ["isSpicy", "Spicy"],
              ["isGlutenFree", "Gluten-free"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={flags[key]}
                onChange={(e) => setFlags((prev) => ({ ...prev, [key]: e.target.checked }))}
                className="size-4 rounded border-input accent-brand"
              />
              {label}
            </label>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-hover disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <PlusCircle className="size-4" />
            )}
            {isSubmitting ? "Submitting..." : "Submit for Approval"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/vendor/menu")}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </DashboardShell>
  )
}
