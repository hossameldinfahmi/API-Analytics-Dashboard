"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, X } from "lucide-react"
import type { FilterOptions } from "@/lib/types"

interface BasicFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  totalCount: number
  filteredCount: number
}

export function BasicFilters({ filters, onFiltersChange, totalCount, filteredCount }: BasicFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery || "")

  const handleSearchChange = (value: string) => {
    setLocalSearch(value)
    onFiltersChange({
      ...filters,
      searchQuery: value,
    })
  }

  const handleUsageFilterChange = (value: string) => {
    onFiltersChange({
      ...filters,
      usageFilter: value as "all" | "high" | "medium" | "low" | "unused",
    })
  }

  const handleDateRangeChange = (field: "start" | "end", value: string) => {
    const newDateRange = [...filters.dateRange] as [string, string]
    if (field === "start") {
      newDateRange[0] = value
    } else {
      newDateRange[1] = value
    }
    onFiltersChange({
      ...filters,
      dateRange: newDateRange,
    })
  }

  const clearAllFilters = () => {
    setLocalSearch("")
    onFiltersChange({
      coverageRange: [0, 100],
      usageFilter: "all",
      searchQuery: "",
      dateRange: ["2024-01-01", "2024-12-31"],
    })
  }

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.usageFilter !== "all" ||
    filters.dateRange[0] !== "2024-01-01" ||
    filters.dateRange[1] !== "2024-12-31"

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search APIs..."
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Usage Filter */}
          <div className="min-w-[150px]">
            <Select value={filters.usageFilter} onValueChange={handleUsageFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Usage Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Usage</SelectItem>
                <SelectItem value="high">High Usage</SelectItem>
                <SelectItem value="medium">Medium Usage</SelectItem>
                <SelectItem value="low">Low Usage</SelectItem>
                <SelectItem value="unused">Unused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="flex gap-2 items-center">
            <Calendar className="h-4 w-4 text-gray-400" />
            <Input
              type="date"
              value={filters.dateRange[0]}
              onChange={(e) => handleDateRangeChange("start", e.target.value)}
              className="w-36"
            />
            <span className="text-gray-400">to</span>
            <Input
              type="date"
              value={filters.dateRange[1]}
              onChange={(e) => handleDateRangeChange("end", e.target.value)}
              className="w-36"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-gray-800 bg-transparent"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}

          {/* Results Count */}
          <div className="text-sm text-gray-600 ml-auto">
            Showing {filteredCount} of {totalCount} APIs
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
