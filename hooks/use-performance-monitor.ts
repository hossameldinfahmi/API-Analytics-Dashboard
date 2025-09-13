"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  renderTime: number
  memoryUsage: number
  isSlowDevice: boolean
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    isSlowDevice: false,
  })

  useEffect(() => {
    const measurePerformance = () => {
      // Measure render time
      const renderStart = performance.now()

      requestAnimationFrame(() => {
        const renderEnd = performance.now()
        const renderTime = renderEnd - renderStart

        // Estimate memory usage (if available)
        const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

        // Detect slow devices based on render time and hardware concurrency
        const isSlowDevice = renderTime > 16 || navigator.hardwareConcurrency <= 2

        setMetrics({
          renderTime,
          memoryUsage,
          isSlowDevice,
        })
      })
    }

    measurePerformance()

    // Monitor performance periodically
    const interval = setInterval(measurePerformance, 5000)
    return () => clearInterval(interval)
  }, [])

  return metrics
}
