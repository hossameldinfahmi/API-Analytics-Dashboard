"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CoverageLineChart } from "@/components/coverage-line-chart"
import { ApiUsageLineChart } from "@/components/api-usage-line-chart"
import { ApiPerformanceChart } from "@/components/api-performance-chart"
import { ApiDataTable } from "@/components/api-data-table"
import { BasicFilters } from "@/components/basic-filters"
import { useApiData } from "@/hooks/use-api-data"
import type { FilterOptions } from "@/lib/types"

export function MainContent() {
  const [filters, setFilters] = useState<FilterOptions>({
    coverageRange: [0, 100],
    usageFilter: "all",
    searchQuery: "",
    dateRange: ["2024-01-01", "2024-12-31"],
  })

  const { data, loading, error } = useApiData(filters)

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-destructive">Error loading data: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          API Analytics Dashboard
        </h2>
      </div>

      <BasicFilters filters={filters} onFiltersChange={setFilters} totalCount={23} filteredCount={data.length} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-200">
          <TabsTrigger
            value="overview"
            className="text-slate-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="coverage"
            className="text-slate-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
          >
            Coverage Analysis
          </TabsTrigger>
          <TabsTrigger
            value="usage"
            className="text-slate-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
          >
            Usage Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <CoverageLineChart data={data} loading={loading} />
            <ApiUsageLineChart data={data} loading={loading} />
          </div>

          <ApiPerformanceChart data={data} loading={loading} />
          <ApiDataTable data={data} loading={loading} />
        </TabsContent>

        <TabsContent value="coverage" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <CoverageLineChart data={data} loading={loading} />
            <ApiPerformanceChart data={data} loading={loading} />
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-6">
            <ApiUsageLineChart data={data} loading={loading} />
            <ApiPerformanceChart data={data} loading={loading} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
