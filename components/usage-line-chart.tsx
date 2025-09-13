"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

interface UsageLineChartProps {
  loading?: boolean
}

export function UsageLineChart({ loading }: UsageLineChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Mock trend data
  const trendData = [
    { month: "Jan", totalUsage: 12500, activeAPIs: 145, newAPIs: 12 },
    { month: "Feb", totalUsage: 13200, activeAPIs: 152, newAPIs: 8 },
    { month: "Mar", totalUsage: 14100, activeAPIs: 158, newAPIs: 15 },
    { month: "Apr", totalUsage: 15300, activeAPIs: 164, newAPIs: 11 },
    { month: "May", totalUsage: 16800, activeAPIs: 171, newAPIs: 9 },
    { month: "Jun", totalUsage: 18200, activeAPIs: 178, newAPIs: 13 },
    { month: "Jul", totalUsage: 19500, activeAPIs: 185, newAPIs: 7 },
    { month: "Aug", totalUsage: 21000, activeAPIs: 192, newAPIs: 14 },
  ]

  return (
    <Card className="animate-in slide-in-from-right-5 duration-700">
      <CardHeader>
        <CardTitle className="text-slate-800">API Usage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="apisGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Area
              type="monotone"
              dataKey="totalUsage"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#usageGradient)"
              animationDuration={1500}
              animationBegin={300}
            />
            <Line
              type="monotone"
              dataKey="activeAPIs"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
              animationDuration={1200}
              animationBegin={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
