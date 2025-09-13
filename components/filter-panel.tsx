"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter, RotateCcw } from "lucide-react"
import type { FilterOptions } from "@/lib/types"

interface FilterPanelProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onClose?: () => void
  totalCount: number
  filteredCount: number
}

export function FilterPanel({ filters, onFiltersChange, onClose, totalCount, filteredCount }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters)

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
  }

  const handleResetFilters = () => {
    const resetFilters: FilterOptions = {
      coverageRange: [0, 100],
      usageFilter: "all",
      searchQuery: "",
      dateRange: ["2024-01-01", "2024-12-31"],
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  const hasActiveFilters =
    localFilters.coverageRange[0] > 0 ||
    localFilters.coverageRange[1] < 100 ||
    localFilters.usageFilter !== "all" ||
    localFilters.searchQuery.length > 0

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {filteredCount} of {totalCount} APIs
          </span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              {
                Object.values(localFilters).filter((v) => v !== "all" && v !== "" && JSON.stringify(v) !== "[0,100]")
                  .length
              }{" "}
              active
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Filter */}
        <div className="space-y-2">
          <Label htmlFor="search">Search APIs</Label>
          <Input
            id="search"
            placeholder="Search by name or documentation..."
            value={localFilters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
          />
        </div>

        {/* Coverage Range Filter */}
        <div className="space-y-3">
          <Label>Test Coverage Range</Label>
          <div className="px-2">
            <Slider
              value={localFilters.coverageRange}
              onValueChange={(value) => updateFilter("coverageRange", value as [number, number])}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{localFilters.coverageRange[0]}%</span>
            <span>{localFilters.coverageRange[1]}%</span>
          </div>
        </div>

        {/* Usage Filter */}
        <div className="space-y-2">
          <Label htmlFor="usage-filter">Usage Status</Label>
          <Select value={localFilters.usageFilter} onValueChange={(value) => updateFilter("usageFilter", value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select usage status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All APIs</SelectItem>
              <SelectItem value="used">Used APIs &gt;0 calls</SelectItem>
              <SelectItem value="unused">Unused APIs 0 calls</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label>Date Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="start-date" className="text-xs text-muted-foreground">
                From
              </Label>
              <Input
                id="start-date"
                type="date"
                value={localFilters.dateRange[0]}
                onChange={(e) => updateFilter("dateRange", [e.target.value, localFilters.dateRange[1]])}
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-xs text-muted-foreground">
                To
              </Label>
              <Input
                id="end-date"
                type="date"
                value={localFilters.dateRange[1]}
                onChange={(e) => updateFilter("dateRange", [localFilters.dateRange[0], e.target.value])}
              />
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="space-y-2">
          <Label>Quick Filters</Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateFilter("coverageRange", [80, 100])
                updateFilter("usageFilter", "used")
              }}
            >
              High Coverage + Used
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateFilter("coverageRange", [0, 50])
                updateFilter("usageFilter", "used")
              }}
            >
              Low Coverage + Used
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateFilter("usageFilter", "unused")
              }}
            >
              Unused APIs
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleResetFilters}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
