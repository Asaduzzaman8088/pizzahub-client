export async function uploadToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("ImgBB is not configured. Add NEXT_PUBLIC_IMGBB_API_KEY to your environment.")
  }

  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
    { method: "POST", body: formData }
  )

  const payload = await response.json().catch(() => null)

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.error?.message || "Image upload failed. Please try again.")
  }

  return payload.data.display_url || payload.data.url
}
