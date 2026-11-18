"use client"

import { useCallback, useEffect, useState } from "react"

import { apiFetch } from "@/lib/api"

export function useApi<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(path))
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!path) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      setData(await apiFetch<T>(path))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.")
    } finally {
      setIsLoading(false)
    }
  }, [path])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, reload: load, setData }
}
