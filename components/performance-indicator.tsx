"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Activity, Zap, AlertTriangle } from "lucide-react"
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor"

export function PerformanceIndicator() {
  const { renderTime, memoryUsage, isSlowDevice } = usePerformanceMonitor()

  const getPerformanceStatus = () => {
    if (renderTime < 8) return { status: "excellent", color: "bg-green-500", icon: Zap }
    if (renderTime < 16) return { status: "good", color: "bg-blue-500", icon: Activity }
    return { status: "slow", color: "bg-yellow-500", icon: AlertTriangle }
  }

  const { status, color, icon: Icon } = getPerformanceStatus()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className="flex items-center gap-1 text-secondary-foreground">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <Icon className="h-3 w-3" />
            <span>Performance</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <p>Status: {status}</p>
            <p>Render time: {renderTime.toFixed(1)}ms</p>
            {memoryUsage > 0 && <p>Memory: {(memoryUsage / 1024 / 1024).toFixed(1)}MB</p>}
            {isSlowDevice && <p className="text-yellow-500">Slow device detected</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
