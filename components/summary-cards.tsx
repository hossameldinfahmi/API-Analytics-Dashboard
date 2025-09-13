"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Database, TrendingUp, Users } from "lucide-react"
import { useSummaryStats } from "@/hooks/use-api-data"
import { Skeleton } from "@/components/ui/skeleton"

export function SummaryCards() {
  const { stats, loading } = useSummaryStats()

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Total APIs Tracked",
      value: stats.totalApis.toLocaleString(),
      description: "Active API endpoints",
      icon: Database,
      trend: "+12% from last month",
    },
    {
      title: "Average Coverage",
      value: `${stats.averageCoverage}%`,
      description: "Test coverage across all APIs",
      icon: Activity,
      trend: "+5% from last month",
    },
    {
      title: "Total API Calls",
      value: stats.totalUsage.toLocaleString(),
      description: "Across all clients",
      icon: TrendingUp,
      trend: "+18% from last month",
    },
    {
      title: "Active Clients",
      value: "604",
      description: "Using tracked APIs",
      icon: Users,
      trend: "+3% from last month",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <p className="text-xs text-accent mt-1">{card.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
