"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import type { ApiData } from "@/lib/types"

interface CoverageLineChartProps {
  data: ApiData[]
  loading?: boolean
}

export function CoverageLineChart({ data, loading }: CoverageLineChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coverage Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coverage Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    )
  }

  // Group data by coverage percentage ranges for line chart
  const coverageRanges = [
    { range: "0-20%", count: 0 },
    { range: "21-40%", count: 0 },
    { range: "41-60%", count: 0 },
    { range: "61-80%", count: 0 },
    { range: "81-100%", count: 0 },
  ]

  data.forEach((api) => {
    const coverage = api.coveragePercentage || 0
    if (coverage <= 20) coverageRanges[0].count++
    else if (coverage <= 40) coverageRanges[1].count++
    else if (coverage <= 60) coverageRanges[2].count++
    else if (coverage <= 80) coverageRanges[3].count++
    else coverageRanges[4].count++
  })

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Coverage Distribution</CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <div style={{ backgroundColor: "white", color: "#1f2937" }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={coverageRanges} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" stroke="#1f2937" fontSize={12} tick={{ fill: "#1f2937", fontSize: 12 }} />
              <YAxis stroke="#1f2937" fontSize={12} tick={{ fill: "#1f2937", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  color: "#1f2937",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: "#1d4ed8" }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
