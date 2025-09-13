export class PerformanceUtils {
  // Debounce function to limit API calls
  static debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }) as T
  }

  // Throttle function for scroll events
  static throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }) as T
  }

  // Chunk large arrays for processing
  static chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  // Memory-efficient data processing
  static processDataInBatches<T, R>(
    data: T[],
    processor: (item: T) => R,
    batchSize = 100,
    onProgress?: (progress: number) => void,
  ): Promise<R[]> {
    return new Promise((resolve) => {
      const results: R[] = []
      const chunks = this.chunkArray(data, batchSize)
      let processedChunks = 0

      const processChunk = () => {
        if (processedChunks < chunks.length) {
          const chunk = chunks[processedChunks]
          const chunkResults = chunk.map(processor)
          results.push(...chunkResults)
          processedChunks++

          if (onProgress) {
            onProgress((processedChunks / chunks.length) * 100)
          }

          // Use setTimeout to prevent blocking the main thread
          setTimeout(processChunk, 0)
        } else {
          resolve(results)
        }
      }

      processChunk()
    })
  }

  // Lazy loading utility
  static createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit,
  ): IntersectionObserver {
    return new IntersectionObserver(callback, {
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
    })
  }
}
