"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronUp, ChevronDown, Search, Eye } from "lucide-react"
import type { ApiData } from "@/lib/types"
import { VirtualizedTable } from "@/components/virtualized-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ApiDataTableProps {
  data: ApiData[]
  loading?: boolean
}

type SortField = "name" | "coveragePercentage" | "usageCount" | "fullSize"
type SortDirection = "asc" | "desc"

export function ApiDataTable({ data, loading }: ApiDataTableProps) {
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [useVirtualization, setUseVirtualization] = useState(data.length > 100)

  const sortedAndFilteredData = useMemo(() => {
    const filtered = data.filter(
      (api) =>
        api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.documentation.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [data, sortField, sortDirection, searchQuery])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

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

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button variant="ghost" size="sm" className="h-auto p-0 font-semibold" onClick={() => handleSort(field)}>
      {children}
      {sortField === field &&
        (sortDirection === "asc" ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />)}
    </Button>
  )

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center bg-muted rounded-lg animate-pulse">
            <p className="text-muted-foreground">Loading API data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Details</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Showing {sortedAndFilteredData.length} of {data.length} APIs
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="virtualization"
              checked={useVirtualization}
              onCheckedChange={setUseVirtualization}
              disabled={data.length <= 100}
            />
            <Label htmlFor="virtualization" className="text-sm">
              Virtualization {data.length > 100 && "(Recommended for large datasets)"}
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {useVirtualization ? (
          <VirtualizedTable data={sortedAndFilteredData} height={500} />
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <SortButton field="name">API Name</SortButton>
                  </TableHead>
                  <TableHead>
                    <SortButton field="coveragePercentage">Coverage</SortButton>
                  </TableHead>
                  <TableHead>
                    <SortButton field="usageCount">Usage</SortButton>
                  </TableHead>
                  <TableHead>
                    <SortButton field="fullSize">Size</SortButton>
                  </TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredData.map((api) => (
                  <TableRow key={api.name}>
                    <TableCell className="font-mono text-sm">{api.name}</TableCell>
                    <TableCell>
                      <Badge className={getCoverageColor(api.coveragePercentage)}>{api.coveragePercentage}%</Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {api.coveredLines}/{api.fullSize} lines
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getUsageColor(api.usageCount)}>{api.usageCount} calls</Badge>
                      <div className="text-xs text-muted-foreground mt-1">{api.usagePercentage}% of clients</div>
                    </TableCell>
                    <TableCell>{api.fullSize} lines</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{api.lastUpdated}</TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
