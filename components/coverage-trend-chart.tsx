"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTrendData } from "@/lib/mock-data"

export function CoverageTrendChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg border shadow-lg">
          <p className="font-semibold">{new Date(label).toLocaleDateString()}</p>
          <p className="text-sm">Coverage: {payload[0].value}%</p>
          <p className="text-sm">APIs: {payload[1]?.value || 0}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coverage Trends Over Time</CardTitle>
        <p className="text-sm text-muted-foreground">Test coverage progression across all APIs</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={mockTrendData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <defs>
              <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              stroke="hsl(var(--foreground))"
            />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} stroke="hsl(var(--foreground))" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="coverage"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fill="url(#coverageGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
