export type FundingStatus = 'open' | 'upcoming' | 'closed'
export type FundingCategory = 'ai' | 'digital' | 'green-tech' | 'innovation' | 'startup' | 'research' | 'infrastructure'

export interface FundingProgram {
  id: string
  title: string
  description: string
  fundingBody: string
  category: FundingCategory
  status: FundingStatus
  minFunding: number
  maxFunding: number
  deadline: string | null
  url: string
  eligibility: string[]
  tags: string[]
}

export interface DataCache {
  programs: FundingProgram[]
  lastFetched: number
  source: 'static' | 'api'
}
