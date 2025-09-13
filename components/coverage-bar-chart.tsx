"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { ApiData } from "@/lib/types"

interface CoverageBarChartProps {
  data: ApiData[]
  loading?: boolean
}

export function CoverageBarChart({ data, loading }: CoverageBarChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Coverage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group APIs by coverage ranges
  const coverageRanges = [
    { range: "0-20%", min: 0, max: 20, color: "#ef4444" },
    { range: "21-40%", min: 21, max: 40, color: "#f97316" },
    { range: "41-60%", min: 41, max: 60, color: "#eab308" },
    { range: "61-80%", min: 61, max: 80, color: "#22c55e" },
    { range: "81-100%", min: 81, max: 100, color: "#10b981" },
  ]

  const chartData = coverageRanges.map(({ range, min, max, color }) => {
    const count = data.filter((api) => {
      const coverage = (api.covered_lines / api.full_size) * 100
      return coverage >= min && coverage <= max
    }).length

    return {
      range,
      count,
      fill: color,
    }
  })

  return (
    <Card className="animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-slate-800">API Coverage Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="range" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
              formatter={(value) => [`${value} APIs`, "Count"]}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1000} animationBegin={200} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
