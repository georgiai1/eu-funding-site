import { useState, useEffect, useMemo } from 'react'
import type { FundingProgram, FundingCategory, FundingStatus } from '../types'
import { staticPrograms } from '../data/programs'
import { getPrograms } from '../data/fetchPrograms'

interface Filters {
  search: string
  category: FundingCategory | 'all'
  status: FundingStatus | 'all'
}

export function usePrograms() {
  const [programs, setPrograms] = useState<FundingProgram[]>(staticPrograms)
  const [isLoading, setIsLoading] = useState(true)
  const [source, setSource] = useState<'static' | 'api' | 'cache'>('static')
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: 'all',
    status: 'all',
  })

  useEffect(() => {
    let mounted = true

    async function load() {
      const result = await getPrograms()
      if (!mounted) return

      setPrograms(result.programs)
      setSource(result.source)
      setIsLoading(false)

      // If refreshing, wait for fresh data
      if (result.isRefreshing && 'refreshPromise' in result) {
        const fresh = await (result as any).refreshPromise
        if (fresh && mounted) {
          setPrograms(fresh)
          setSource('api')
        }
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    return programs.filter(p => {
      if (filters.category !== 'all' && p.category !== filters.category) return false
      if (filters.status !== 'all' && p.status !== filters.status) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fundingBody.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [programs, filters])

  const stats = useMemo(() => ({
    total: programs.length,
    open: programs.filter(p => p.status === 'open').length,
    upcoming: programs.filter(p => p.status === 'upcoming').length,
    totalFunding: programs.reduce((sum, p) => sum + p.maxFunding, 0),
  }), [programs])

  return { programs: filtered, allPrograms: programs, isLoading, source, filters, setFilters, stats }
}
