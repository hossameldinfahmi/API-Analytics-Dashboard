"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { FilterOptions } from "@/lib/types"

interface FilterSummaryProps {
  filters: FilterOptions
  onRemoveFilter: (filterKey: keyof FilterOptions) => void
  onClearAll: () => void
}

export function FilterSummary({ filters, onRemoveFilter, onClearAll }: FilterSummaryProps) {
  const activeFilters = []

  // Coverage range filter
  if (filters.coverageRange[0] > 0 || filters.coverageRange[1] < 100) {
    activeFilters.push({
      key: "coverageRange" as const,
      label: `Coverage: ${filters.coverageRange[0]}%-${filters.coverageRange[1]}%`,
    })
  }

  // Usage filter
  if (filters.usageFilter !== "all") {
    const usageLabels = {
      used: "Used APIs",
      unused: "Unused APIs",
    }
    activeFilters.push({
      key: "usageFilter" as const,
      label: usageLabels[filters.usageFilter as keyof typeof usageLabels],
    })
  }

  // Search query
  if (filters.searchQuery) {
    activeFilters.push({
      key: "searchQuery" as const,
      label: `Search: "${filters.searchQuery}"`,
    })
  }

  // Date range (only show if not default)
  if (filters.dateRange[0] !== "2024-01-01" || filters.dateRange[1] !== "2024-12-31") {
    activeFilters.push({
      key: "dateRange" as const,
      label: `Date: ${filters.dateRange[0]} to ${filters.dateRange[1]}`,
    })
  }

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
      <span className="text-sm font-medium">Active filters:</span>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
            {filter.label}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-1 hover:bg-transparent"
              onClick={() => onRemoveFilter(filter.key)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={onClearAll} className="ml-auto">
        Clear all
      </Button>
    </div>
  )
}
