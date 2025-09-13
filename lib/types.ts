// API Coverage data structure
export interface ApiCoverage {
  [apiName: string]: {
    full_size: number
    covered_lines: number
    apidoc: string
  }
}

// API Usage data structure
export interface ApiUsage {
  api_name: string
  usage_count: string
  total_clients: string
}

// Combined API data for dashboard
export interface ApiData {
  name: string
  fullSize: number
  coveredLines: number
  coveragePercentage: number
  usageCount: number
  totalClients: number
  usagePercentage: number
  documentation: string
  lastUpdated: string
}

// Filter options
export interface FilterOptions {
  coverageRange: [number, number]
  usageFilter: "all" | "used" | "unused"
  searchQuery: string
  dateRange: [string, string]
}

// Chart data types
export interface ChartDataPoint {
  name: string
  coverage: number
  usage: number
  size: number
}

export interface TrendDataPoint {
  date: string
  coverage: number
  apis: number
}
