import type { ApiData, FilterOptions, TrendDataPoint } from "./types"
import { mockApiData, mockTrendData } from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class ApiService {
  static async getApiData(filters?: FilterOptions): Promise<ApiData[]> {
    await delay(300) // Simulate network delay

    let filteredData = [...mockApiData]

    if (filters) {
      // Apply coverage range filter
      if (filters.coverageRange) {
        filteredData = filteredData.filter(
          (api) =>
            api.coveragePercentage >= filters.coverageRange[0] && api.coveragePercentage <= filters.coverageRange[1],
        )
      }

      // Apply usage filter
      if (filters.usageFilter === "used") {
        filteredData = filteredData.filter((api) => api.usageCount > 0)
      } else if (filters.usageFilter === "unused") {
        filteredData = filteredData.filter((api) => api.usageCount === 0)
      }

      // Apply search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        filteredData = filteredData.filter(
          (api) => api.name.toLowerCase().includes(query) || api.documentation.toLowerCase().includes(query),
        )
      }
    }

    return filteredData
  }

  static async getTrendData(): Promise<TrendDataPoint[]> {
    await delay(200)
    return mockTrendData
  }

  static async getSummaryStats(): Promise<{
    totalApis: number
    averageCoverage: number
    totalUsage: number
    lastUpdated: string
  }> {
    await delay(100)

    const totalApis = mockApiData.length
    const averageCoverage = Math.round(mockApiData.reduce((sum, api) => sum + api.coveragePercentage, 0) / totalApis)
    const totalUsage = mockApiData.reduce((sum, api) => sum + api.usageCount, 0)
    const lastUpdated = new Date().toISOString().split("T")[0]

    return {
      totalApis,
      averageCoverage,
      totalUsage,
      lastUpdated,
    }
  }
}
