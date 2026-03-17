import { Search, Zap } from 'lucide-react'
import type { FundingCategory, FundingStatus } from '../types'

interface QuickMatcherProps {
  stats: { total: number; open: number; upcoming: number; totalFunding: number }
  filters: { search: string; category: FundingCategory | 'all'; status: FundingStatus | 'all' }
  onFiltersChange: (f: QuickMatcherProps['filters']) => void
}

const stages = [
  { value: 'all' as const, label: 'Any stage', icon: '🔍' },
  { value: 'startup' as const, label: 'Startup / SME', icon: '🚀' },
  { value: 'research' as const, label: 'Research team', icon: '🔬' },
  { value: 'innovation' as const, label: 'Innovation project', icon: '💡' },
  { value: 'ai' as const, label: 'AI & Data', icon: '🤖' },
  { value: 'green-tech' as const, label: 'Green Tech', icon: '🌱' },
  { value: 'digital' as const, label: 'Digital / Infra', icon: '🔧' },
]

export function QuickMatcher({ stats, filters, onFiltersChange }: QuickMatcherProps) {
  return (
    <section className="bg-gradient-to-br from-eu-blue via-[#0044CC] to-[#1a5cd6] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,204,0,0.08),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {/* Headline */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
            <Zap size={14} className="text-eu-gold" />
            <span className="text-white/90 text-sm font-medium">{stats.open} programs open now</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Find your EU funding<br />
            <span className="text-eu-gold">in 30 seconds</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Pick your category, search, and apply. We keep this list fresh every time you visit.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-2xl mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by keyword, technology, or program name..."
            value={filters.search}
            onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
            className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-eu-gold/40 focus:border-eu-gold/40 transition-all text-base"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {stages.map(s => (
            <button
              key={s.value}
              onClick={() => onFiltersChange({ ...filters, category: s.value as FundingCategory | 'all' })}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${filters.category === s.value
                  ? 'bg-white text-eu-blue shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
                }
              `}
            >
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex gap-3 mt-4">
          {(['all', 'open', 'upcoming'] as const).map(status => (
            <button
              key={status}
              onClick={() => onFiltersChange({ ...filters, status })}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-all ${
                filters.status === status
                  ? 'bg-eu-gold text-eu-dark'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {status === 'all' ? 'All status' : status === 'open' ? 'Open now' : 'Upcoming'}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
