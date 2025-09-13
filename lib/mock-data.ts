import type { ApiCoverage, ApiUsage, ApiData } from "./types"

// Mock API coverage data (sample from the provided data)
export const mockApiCoverage: ApiCoverage = {
  av_ac3_parse_header: {
    full_size: 22,
    covered_lines: 22,
    apidoc:
      "int av_ac3_parse_header(const uint8_t *buf, size_t size, uint8_t *bitstream_id, uint16_t *frame_size)\nBrief: Extract the bitstream ID and the frame size from AC-3 data.",
  },
  av_adts_header_parse: {
    full_size: 13,
    covered_lines: 0,
    apidoc:
      "int av_adts_header_parse(const uint8_t *buf, uint32_t *samples, uint8_t *frames)\nBrief: Extract the number of samples and frames from AAC data.\nDetails: buf \n \n \n pointer to AAC data buffer  \n \n \n \n \n samples \n \n \n Pointer to where number of samples is written  \n \n \n \n \n frames \n \n \n Pointer to where number of frames is written  \n \n \n \n Returns 0 on success, error code on failure.",
  },
  av_frame_alloc: {
    full_size: 15,
    covered_lines: 15,
    apidoc: "AVFrame * av_frame_alloc(void)\nBrief: Allocate an AVFrame and set its fields to default values.",
  },
  av_malloc: {
    full_size: 8,
    covered_lines: 8,
    apidoc:
      "void * av_malloc(size_t size)\nBrief: Allocate a memory block with alignment suitable for all memory accesses.",
  },
  av_frame_free: {
    full_size: 12,
    covered_lines: 12,
    apidoc: "void av_frame_free(AVFrame **frame)\nBrief: Free the frame and any dynamically allocated objects in it.",
  },
}

// Mock API usage data (sample from the provided data)
export const mockApiUsage: ApiUsage[] = [
  {
    api_name: "av_frame_alloc",
    usage_count: "25",
    total_clients: "604",
  },
  {
    api_name: "av_malloc",
    usage_count: "25",
    total_clients: "604",
  },
  {
    api_name: "av_frame_free",
    usage_count: "25",
    total_clients: "604",
  },
  {
    api_name: "avcodec_find_decoder",
    usage_count: "25",
    total_clients: "604",
  },
  {
    api_name: "av_adts_header_parse",
    usage_count: "0",
    total_clients: "604",
  },
]

// Generate additional mock data for demonstration
function generateMockData(): ApiData[] {
  const baseApis = Object.keys(mockApiCoverage)
  const data: ApiData[] = []

  // Add real data first
  baseApis.forEach((apiName) => {
    const coverage = mockApiCoverage[apiName]
    const usage = mockApiUsage.find((u) => u.api_name === apiName)

    data.push({
      name: apiName,
      fullSize: coverage.full_size,
      coveredLines: coverage.covered_lines,
      coveragePercentage: Math.round((coverage.covered_lines / coverage.full_size) * 100),
      usageCount: Number.parseInt(usage?.usage_count || "0"),
      totalClients: Number.parseInt(usage?.total_clients || "604"),
      usagePercentage: Math.round(
        (Number.parseInt(usage?.usage_count || "0") / Number.parseInt(usage?.total_clients || "604")) * 100,
      ),
      documentation: coverage.apidoc,
      lastUpdated: new Date().toISOString().split("T")[0],
    })
  })

  // Generate additional mock data to simulate a larger dataset
  const additionalApis = [
    "avcodec_open2",
    "av_read_frame",
    "av_write_trailer",
    "av_strdup",
    "avcodec_alloc_context3",
    "av_frame_unref",
    "sws_scale",
    "sws_freeContext",
    "avformat_open_input",
    "av_free",
    "av_rescale_q",
    "avformat_close_input",
    "avcodec_free_context",
    "avformat_new_stream",
    "avformat_write_header",
    "av_dict_set",
    "avformat_find_stream_info",
    "sws_getContext",
  ]

  additionalApis.forEach((apiName) => {
    const fullSize = Math.floor(Math.random() * 100) + 5
    const coveredLines = Math.floor(Math.random() * fullSize)
    const usageCount = Math.floor(Math.random() * 30)

    data.push({
      name: apiName,
      fullSize,
      coveredLines,
      coveragePercentage: Math.round((coveredLines / fullSize) * 100),
      usageCount,
      totalClients: 604,
      usagePercentage: Math.round((usageCount / 604) * 100),
      documentation: `Mock documentation for ${apiName}`,
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    })
  })

  return data
}

export const mockApiData = generateMockData()

// Mock trend data for line charts
export const mockTrendData = [
  { date: "2024-01-01", coverage: 65, apis: 150 },
  { date: "2024-01-15", coverage: 68, apis: 155 },
  { date: "2024-02-01", coverage: 72, apis: 160 },
  { date: "2024-02-15", coverage: 75, apis: 165 },
  { date: "2024-03-01", coverage: 78, apis: 170 },
  { date: "2024-03-15", coverage: 82, apis: 175 },
]
