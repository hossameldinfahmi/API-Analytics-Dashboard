"use client"

import { useMemo } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { ApiData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CoverageScatterPlotProps {
  data: ApiData[]
  loading?: boolean
}

export function CoverageScatterPlot({ data, loading }: CoverageScatterPlotProps) {
  const chartData = useMemo(() => {
    return data.map((api) => ({
      name: api.name,
      coverage: api.coveragePercentage,
      usage: api.usagePercentage,
      size: Math.max(api.fullSize / 2, 5), // Size for bubble effect
      usageCount: api.usageCount,
      coveredLines: api.coveredLines,
      fullSize: api.fullSize,
    }))
  }, [data])

  const CustomTooltip = useMemo(
    () =>
      ({ active, payload }: any) => {
        if (active && payload && payload.length) {
          const data = payload[0].payload
          return (
            <div className="bg-popover text-popover-foreground p-3 rounded-lg border shadow-lg">
              <p className="font-semibold">{data.name}</p>
              <p className="text-sm">Coverage: {data.coverage}%</p>
              <p className="text-sm">Usage: {data.usage}%</p>
              <p className="text-sm">
                Lines: {data.coveredLines}/{data.fullSize}
              </p>
              <p className="text-sm">Calls: {data.usageCount}</p>
            </div>
          )
        }
        return null
      },
    [],
  )

  const getColor = (coverage: number, usage: number) => {
    if (coverage >= 80 && usage >= 10) return "hsl(var(--chart-1))" // High coverage, high usage - blue
    if (coverage >= 80 && usage < 10) return "hsl(var(--chart-2))" // High coverage, low usage - orange
    if (coverage < 80 && usage >= 10) return "hsl(var(--chart-3))" // Low coverage, high usage - red
    return "hsl(var(--chart-4))" // Low coverage, low usage - gray
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coverage vs Usage Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted rounded-lg animate-pulse">
            <p className="text-muted-foreground">Loading scatter plot...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coverage vs Usage Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Each point represents an API. Size indicates code complexity.</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              dataKey="coverage"
              name="Coverage %"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="hsl(var(--foreground))"
            />
            <YAxis
              type="number"
              dataKey="usage"
              name="Usage %"
              domain={[0, "dataMax + 5"]}
              tickFormatter={(value) => `${value}%`}
              stroke="hsl(var(--foreground))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter dataKey="usage" fill="hsl(var(--chart-1))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.coverage, entry.usage)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
            <span>High Coverage, High Usage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
            <span>High Coverage, Low Usage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
            <span>Low Coverage, High Usage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
            <span>Low Coverage, Low Usage</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
