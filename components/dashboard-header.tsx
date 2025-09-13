"use client"

import { PerformanceIndicator } from "@/components/performance-indicator"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">API</span>
            </div>
            <h1 className="text-xl font-semibold">API Coverage Analytics</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <PerformanceIndicator />
        </div>
      </div>
    </header>
  )
}
