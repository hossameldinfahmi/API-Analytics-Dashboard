"use client"

import { useState, useEffect, useMemo } from "react"
import type { ApiData, FilterOptions } from "@/lib/types"
import { ApiService } from "@/lib/api-service"
import { useDebouncedValue } from "./use-debounced-value"

export function useApiData(filters?: FilterOptions) {
  const [data, setData] = useState<ApiData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Debounce search query to avoid excessive API calls
  const debouncedFilters = useDebouncedValue(filters, 300)

  // Memoize the filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => debouncedFilters, [debouncedFilters])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ApiService.getApiData(memoizedFilters)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [memoizedFilters])

  return { data, loading, error, refetch: () => fetchData() }
}

export function useSummaryStats() {
  const [stats, setStats] = useState({
    totalApis: 0,
    averageCoverage: 0,
    totalUsage: 0,
    lastUpdated: "",
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const result = await ApiService.getSummaryStats()
      setStats(result)
    } catch (err) {
      console.error("Failed to fetch summary stats:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, loading }
}
