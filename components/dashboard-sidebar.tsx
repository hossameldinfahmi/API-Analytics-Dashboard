"use client"

import { useState } from "react"
import { BarChart3, Database, Filter, Home, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Overview", active: true },
  { icon: BarChart3, label: "Coverage Analysis", active: false },
  { icon: TrendingUp, label: "Usage Trends", active: false },
  { icon: Database, label: "API Details", active: false },
  { icon: Filter, label: "Advanced Filters", active: false },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4">
          {!collapsed && <span className="font-semibold">Navigation</span>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "px-2",
              )}
            >
              <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
