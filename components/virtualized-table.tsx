"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { ApiData } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface VirtualizedTableProps {
  data: ApiData[]
  height?: number
}

const ITEMS_PER_PAGE = 50

export function VirtualizedTable({ data, height = 400 }: VirtualizedTableProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return data.slice(startIndex, endIndex)
  }, [data, currentPage])

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800"
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getUsageColor = (count: number) => {
    if (count >= 20) return "bg-blue-100 text-blue-800"
    if (count >= 10) return "bg-purple-100 text-purple-800"
    if (count > 0) return "bg-gray-100 text-gray-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="rounded-md border">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-muted/50 border-b font-semibold text-sm">
        <div>API Name</div>
        <div>Coverage</div>
        <div>Usage</div>
        <div>Size</div>
        <div>Last Updated</div>
        <div>Actions</div>
      </div>

      {/* Table Rows */}
      <div style={{ height: height - 100 }} className="overflow-auto">
        {paginatedData.map((api, index) => (
          <div key={api.name} className="flex items-center border-b border-border">
            <div className="flex-1 grid grid-cols-6 gap-4 px-4 py-3">
              <div className="font-mono text-sm truncate">{api.name}</div>
              <div>
                <Badge className={getCoverageColor(api.coveragePercentage)}>{api.coveragePercentage}%</Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  {api.coveredLines}/{api.fullSize} lines
                </div>
              </div>
              <div>
                <Badge className={getUsageColor(api.usageCount)}>{api.usageCount} calls</Badge>
                <div className="text-xs text-muted-foreground mt-1">{api.usagePercentage}% of clients</div>
              </div>
              <div className="text-sm">{api.fullSize} lines</div>
              <div className="text-sm text-muted-foreground">{api.lastUpdated}</div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-mono">{api.name}</DialogTitle>
                      <DialogDescription>API Documentation and Details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold">Coverage</h4>
                          <p>
                            {api.coveragePercentage}% ({api.coveredLines}/{api.fullSize} lines)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Usage</h4>
                          <p>
                            {api.usageCount} calls ({api.usagePercentage}% of clients)
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Documentation</h4>
                        <pre className="text-sm bg-muted p-3 rounded-lg overflow-auto whitespace-pre-wrap">
                          {api.documentation}
                        </pre>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {currentPage * ITEMS_PER_PAGE + 1} to {Math.min((currentPage + 1) * ITEMS_PER_PAGE, data.length)} of{" "}
            {data.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
