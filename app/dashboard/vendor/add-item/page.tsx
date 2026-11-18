"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ImagePlus, Loader2, PlusCircle, Trash2, UploadCloud } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { apiFetch } from "@/lib/api"
import { uploadToImgbb } from "@/lib/imgbb"
import type { MenuCategory } from "@/lib/types"

const CATEGORIES: { value: MenuCategory; label: string }[] = [
  { value: "classic", label: "Classic Pizzas" },
  { value: "vegetarian", label: "Vegetarian Pizzas" },
  { value: "meat-lovers", label: "Meat Lovers" },
  { value: "specialty", label: "Specialty & Gourmet Pizzas" },
  { value: "sides", label: "Sides & Appetizers" },
  { value: "beverages", label: "Beverages & Desserts" },
]

export default function AddMenuItemPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    itemName: "",
    category: "classic" as MenuCategory,
    description: "",
    longDescription: "",
    price: "",
    location: "",
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
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setIsUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        uploaded.push(await uploadToImgbb(file))
      }
      setImageUrls((prev) => [...prev, ...uploaded])
      toast.success(
        `${uploaded.length} image${uploaded.length === 1 ? "" : "s"} uploaded successfully.`
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not upload the image.")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one pizza image.")
      return
    }

    setIsSubmitting(true)

    try {
      await apiFetch("/menu", {
        method: "POST",
        body: {
          ...form,
          price: Number(form.price),
          deliveryFee: Number(form.deliveryFee) || 0,
          images: imageUrls,
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
              Pizza images *{" "}
              <span className="font-normal text-muted-foreground">(uploaded to ImgBB)</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => void handleFiles(e.target.files)}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand/40 bg-brand/5 px-4 py-6 text-sm font-bold text-brand transition hover:bg-brand/10 disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <UploadCloud className="size-5" />
              )}
              {isUploading ? "Uploading to ImgBB..." : "Upload pizza images"}
            </button>

            {imageUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {imageUrls.map((url) => (
                  <div
                    key={url}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                  >
                    <Image src={url} alt="Uploaded pizza" fill sizes="120px" className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageUrls((prev) => prev.filter((item) => item !== url))}
                      aria-label="Remove image"
                      className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-rose-600"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            disabled={isSubmitting || isUploading}
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
