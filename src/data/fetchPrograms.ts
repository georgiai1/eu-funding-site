import type { FundingProgram, DataCache } from '../types'
import { staticPrograms } from './programs'

const CACHE_KEY = 'eu-funding-cache'
const STALE_AFTER_MS = 3 * 24 * 60 * 60 * 1000 // 3 days

const EU_API_URL = 'https://api.tech.ec.europa.eu/search-api/prod/rest/search'

interface EUApiResult {
  title?: string
  content?: string
  reference?: string
  status?: string
  deadlineDate?: string
  programmePeriod?: string[]
  url?: string
}

function mapApiResult(result: EUApiResult, index: number): FundingProgram | null {
  if (!result.title) return null

  const title = result.title.replace(/<[^>]*>/g, '')
  const description = (result.content || '').replace(/<[^>]*>/g, '').slice(0, 300)

  const statusRaw = (result.status || '').toLowerCase()
  const status = statusRaw.includes('open') ? 'open' as const
    : statusRaw.includes('forthcoming') ? 'upcoming' as const
    : 'closed' as const

  return {
    id: `api-${result.reference || index}`,
    title,
    description,
    fundingBody: 'European Commission',
    category: 'digital',
    status,
    minFunding: 0,
    maxFunding: 0,
    deadline: result.deadlineDate || null,
    url: result.url || 'https://ec.europa.eu/info/funding-tenders/opportunities/portal',
    eligibility: ['See program details'],
    tags: result.programmePeriod || ['eu-funded'],
  }
}

async function fetchFromEUApi(): Promise<FundingProgram[]> {
  const params = new URLSearchParams({
    apiKey: 'SEDIA',
    text: 'digital technology innovation',
    pageSize: '20',
    pageNumber: '1',
  })

  const response = await fetch(`${EU_API_URL}?${params}`, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(8000),
  })

  if (!response.ok) throw new Error(`API ${response.status}`)

  const data = await response.json()
  const results: EUApiResult[] = data?.results || []

  return results
    .map((r, i) => mapApiResult(r, i))
    .filter((p): p is FundingProgram => p !== null)
}

function getCache(): DataCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function setCache(cache: DataCache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage full or unavailable
  }
}

function isStale(cache: DataCache): boolean {
  return Date.now() - cache.lastFetched > STALE_AFTER_MS
}

function mergePrograms(staticList: FundingProgram[], apiList: FundingProgram[]): FundingProgram[] {
  const seen = new Set(staticList.map(p => p.id))
  const unique = apiList.filter(p => !seen.has(p.id))
  return [...staticList, ...unique]
}

export async function getPrograms(): Promise<{ programs: FundingProgram[]; source: 'static' | 'api' | 'cache'; isRefreshing: boolean }> {
  const cache = getCache()

  // Fresh cache — use it
  if (cache && !isStale(cache)) {
    return { programs: cache.programs, source: 'cache', isRefreshing: false }
  }

  // Stale or no cache — return static immediately, refresh in background
  const immediate = cache?.programs || staticPrograms

  // Try to fetch fresh data in background
  const refreshPromise = fetchFromEUApi()
    .then(apiPrograms => {
      const merged = mergePrograms(staticPrograms, apiPrograms)
      setCache({ programs: merged, lastFetched: Date.now(), source: 'api' })
      return merged
    })
    .catch(() => {
      // API failed — cache static data so we don't retry for 3 days
      setCache({ programs: staticPrograms, lastFetched: Date.now(), source: 'static' })
      return null
    })

  return {
    programs: immediate,
    source: cache ? 'cache' : 'static',
    isRefreshing: true,
    // @ts-expect-error -- consumer can await this for fresh data
    refreshPromise,
  }
}

export { STALE_AFTER_MS }
