"use client"

import { useCallback, useEffect, useState } from "react"

import { apiFetch } from "@/lib/api"
import type { MenuItem } from "@/lib/types"

interface MenuListResponse {
  success: boolean
  count: number
  total: number
  items: MenuItem[]
}

export function useMenu(params: { limit?: number; featured?: boolean } = {}) {
  const { limit = 50, featured } = params
  const [items, setItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const query = new URLSearchParams({ limit: String(limit) })
      if (featured) query.set("featured", "true")
      const data = await apiFetch<MenuListResponse>(`/menu?${query.toString()}`)
      setItems(data.items ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load the menu.")
    } finally {
      setIsLoading(false)
    }
  }, [limit, featured])

  useEffect(() => {
    void load()
  }, [load])

  return { items, isLoading, error, reload: load }
}

interface MenuItemResponse {
  success: boolean
  item: MenuItem
}

export function useMenuItem(id: string) {
  const [item, setItem] = useState<MenuItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiFetch<MenuItemResponse>(`/menu/${id}`)
      setItem(data.item)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load this pizza.")
      setItem(null)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  return { item, isLoading, error, reload: load }
}
