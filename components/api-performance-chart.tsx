"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts"
import type { ApiData } from "@/lib/types"

interface ApiPerformanceChartProps {
  data: ApiData[]
  loading?: boolean
}

export function ApiPerformanceChart({ data, loading }: ApiPerformanceChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-slate-500">No data available</div>
        </CardContent>
      </Card>
    )
  }

  // Get top 10 most used APIs
  const topAPIs = data
    .filter((api) => api && api.name && typeof api.usageCount === "number")
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 10)
    .map((api) => ({
      name: api.name && api.name.length > 15 ? api.name.substring(0, 15) + "..." : api.name || "Unknown",
      fullName: api.name || "Unknown API",
      usage: api.usageCount || 0,
      coverage: api.coveragePercentage || 0,
      clients: api.totalClients || 0,
    }))

  return (
    <Card className="animate-in slide-in-from-left-5 duration-700 bg-white">
      <CardHeader>
        <CardTitle className="text-slate-800">Top API Performance</CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <div style={{ backgroundColor: "white", color: "#1f2937" }}>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={topAPIs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                stroke="#1f2937"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: "#1f2937", fontSize: 11 }}
              />
              <YAxis yAxisId="left" stroke="#1f2937" fontSize={12} tick={{ fill: "#1f2937", fontSize: 12 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#1f2937"
                fontSize={12}
                tick={{ fill: "#1f2937", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
                formatter={(value, name) => {
                  if (name === "usage") return [`${value} calls`, "Usage Count"]
                  if (name === "coverage") return [`${value}%`, "Coverage"]
                  return [value, name]
                }}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload
                  return item ? item.fullName : label
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="usage"
                fill="#10b981"
                radius={[2, 2, 0, 0]}
                animationDuration={1000}
                animationBegin={400}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="coverage"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                animationDuration={1200}
                animationBegin={800}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
