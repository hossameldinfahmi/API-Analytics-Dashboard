"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import type { ApiData } from "@/lib/types"

interface ApiUsageLineChartProps {
  data: ApiData[]
  loading?: boolean
}

export function ApiUsageLineChart({ data, loading }: ApiUsageLineChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Usage Trends</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Usage Trends</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    )
  }

  // Create trend data based on API usage
  const trendData = data
    .filter((api) => api.usageCount !== undefined)
    .sort((a, b) => (a.usageCount || 0) - (b.usageCount || 0))
    .slice(0, 10)
    .map((api, index) => ({
      name: api.name?.substring(0, 15) + "..." || `API ${index + 1}`,
      usage: api.usageCount || 0,
      clients: api.totalClients || 0,
    }))

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">API Usage Trends</CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <div style={{ backgroundColor: "white", color: "#1f2937" }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                stroke="#1f2937"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: "#1f2937", fontSize: 12 }}
              />
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
                dataKey="usage"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: "#7c3aed" }}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="clients"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#059669" }}
                animationDuration={1400}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
