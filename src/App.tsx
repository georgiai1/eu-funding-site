import { useState, useMemo } from 'react'
import { Header } from './components/Header'
import { QuickMatcher } from './components/QuickMatcher'
import { UrgentBanner } from './components/UrgentBanner'
import { ProgramSection } from './components/ProgramSection'
import { ProgramModal } from './components/ProgramModal'
import { Footer } from './components/Footer'
import { usePrograms } from './hooks/usePrograms'
import type { FundingProgram } from './types'

function App() {
  const { programs, allPrograms, source, filters, setFilters, stats } = usePrograms()
  const [selectedProgram, setSelectedProgram] = useState<FundingProgram | null>(null)

  const hasActiveFilters = filters.search !== '' || filters.category !== 'all' || filters.status !== 'all'

  const closingSoon = useMemo(() =>
    allPrograms
      .filter(p => {
        if (p.status !== 'open' || !p.deadline) return false
        const days = Math.ceil((new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        return days > 0 && days <= 90
      })
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()),
    [allPrograms]
  )

  const forStartups = useMemo(() =>
    allPrograms.filter(p => p.status !== 'closed' && (p.category === 'startup' || p.eligibility.some(e => e.toLowerCase().includes('sme') || e.toLowerCase().includes('startup')))),
    [allPrograms]
  )

  const largeGrants = useMemo(() =>
    allPrograms
      .filter(p => p.status !== 'closed' && p.maxFunding >= 10_000_000)
      .sort((a, b) => b.maxFunding - a.maxFunding),
    [allPrograms]
  )

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <QuickMatcher
        stats={stats}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {!hasActiveFilters && (
        <>
          <UrgentBanner programs={closingSoon} onSelect={setSelectedProgram} />

          <ProgramSection
            title="Best for Startups & SMEs"
            subtitle="Programs specifically designed for early-stage and growing tech companies"
            programs={forStartups}
            onSelect={setSelectedProgram}
            accentColor="blue"
          />

          <ProgramSection
            title="Large-Scale Funding"
            subtitle="Programs offering over \u20AC10M for ambitious projects"
            programs={largeGrants}
            onSelect={setSelectedProgram}
            accentColor="purple"
          />
        </>
      )}

      {hasActiveFilters && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                {programs.length} matching program{programs.length !== 1 ? 's' : ''}
              </h2>
              {source === 'api' && (
                <span className="inline-flex items-center gap-1 text-green text-xs mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                  Live data
                </span>
              )}
            </div>
            <button
              onClick={() => setFilters({ search: '', category: 'all', status: 'all' })}
              className="text-sm text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {programs.map(p => (
              <ProgramActionCard key={p.id} program={p} onSelect={setSelectedProgram} />
            ))}
          </div>
          {programs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No programs match your criteria</p>
              <button
                onClick={() => setFilters({ search: '', category: 'all', status: 'all' })}
                className="mt-3 text-accent hover:underline text-sm"
              >
                Show all programs
              </button>
            </div>
          )}
        </section>
      )}

      {selectedProgram && (
        <ProgramModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}

      <Footer />
    </div>
  )
}

// Re-export for use in filtered view
import { ProgramActionCard } from './components/ProgramActionCard'

export default App
