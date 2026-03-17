import { ProgramCard } from './ProgramCard'
import { FilterBar } from './FilterBar'
import { Inbox } from 'lucide-react'
import type { FundingProgram, FundingCategory, FundingStatus } from '../types'

interface ProgramListProps {
  programs: FundingProgram[]
  filters: {
    search: string
    category: FundingCategory | 'all'
    status: FundingStatus | 'all'
  }
  onFiltersChange: (filters: ProgramListProps['filters']) => void
  source: 'static' | 'api' | 'cache'
  isLoading: boolean
}

export function ProgramList({ programs, filters, onFiltersChange, source, isLoading }: ProgramListProps) {
  return (
    <section id="programs" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Funding Programs
          </h2>
          <p className="text-text-secondary mt-1 text-sm">
            {programs.length} program{programs.length !== 1 ? 's' : ''}
            {source === 'api' && (
              <span className="inline-flex items-center gap-1 ml-2 text-green text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-green" />
                Live data
              </span>
            )}
            {isLoading && (
              <span className="inline-flex items-center gap-1 ml-2 text-text-secondary/60 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/40 animate-pulse" />
                Checking for updates...
              </span>
            )}
          </p>
        </div>
      </div>

      <FilterBar filters={filters} onChange={onFiltersChange} />

      {programs.length === 0 ? (
        <div className="text-center py-20">
          <Inbox size={40} className="mx-auto text-text-secondary/30 mb-4" />
          <p className="text-text-secondary font-medium">No programs match your filters</p>
          <p className="text-text-secondary/60 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-2">
          {programs.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </section>
  )
}
