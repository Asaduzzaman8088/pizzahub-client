"use client"

import { useRef, useState } from "react"
import { Loader2, Save, Trash2, UploadCloud, User as UserIcon } from "lucide-react"
import { toast } from "sonner"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { apiFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-client"
import { uploadToImgbb } from "@/lib/imgbb"

export default function ProfileSettingsPage() {
  const { user, isPending, refresh } = useAuth()
  const [name, setName] = useState(user?.name ?? "")
  const [image, setImage] = useState(user?.image ?? "")
  const [businessName, setBusinessName] = useState(user?.businessName ?? "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const url = await uploadToImgbb(file)
      setImage(url)
      toast.success("Photo uploaded. Click Save changes to apply it.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not upload the photo.")
    } finally {
      setIsUploading(false)
      if (photoInputRef.current) photoInputRef.current.value = ""
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (newPassword && !/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(newPassword)) {
      toast.error(
        "New password must be at least 6 characters and include an uppercase and lowercase letter."
      )
      return
    }

    const body: Record<string, unknown> = { name: name.trim(), image: image.trim() }
    if (user?.role === "vendor" && businessName.trim()) body.businessName = businessName.trim()
    if (newPassword) {
      body.currentPassword = currentPassword
      body.newPassword = newPassword
    }

    setIsSaving(true)
    try {
      await apiFetch("/auth/me", { method: "PATCH", body })
      await refresh()
      setCurrentPassword("")
      setNewPassword("")
      toast.success("Profile updated successfully.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update your profile.")
    } finally {
      setIsSaving(false)
    }
  }

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"

  return (
    <DashboardShell
      role={user?.role ?? "customer"}
      title="Profile Settings"
      description="Update your personal details and password."
    >
      {isPending || !user ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading your profile...
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl space-y-6 rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex flex-wrap items-center gap-5">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={name || "Profile"}
                className="size-20 rounded-full object-cover ring-2 ring-brand/20"
              />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white">
                {name?.slice(0, 1).toUpperCase() || <UserIcon className="size-7" />}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="font-heading text-lg font-bold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <span className="mt-1 inline-flex rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-bold text-brand uppercase">
                {user.role}
              </span>

              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => void handlePhotoChange(e.target.files)}
                className="hidden"
              />

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-hover disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <UploadCloud className="size-3.5" />
                  )}
                  {isUploading ? "Uploading..." : image ? "Change photo" : "Upload photo"}
                </button>

                {image && (
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition hover:border-destructive/40 hover:text-destructive disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <p className="mt-1.5 text-[11px] text-muted-foreground">
                JPG or PNG, uploaded securely to ImgBB. Click Save changes to apply it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground">Full name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground">
                Profile image URL{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://... or upload a photo above"
                className={`mt-1 ${inputClass}`}
              />
            </div>

            {user.role === "vendor" && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground">Business name</label>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-5">
            <p className="font-heading text-sm font-bold">Change password</p>
            <p className="mb-3 text-xs text-muted-foreground">
              Leave both fields blank to keep your current password.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground">Current password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground">New password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-hover disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </form>
      )}
    </DashboardShell>
  )
}
