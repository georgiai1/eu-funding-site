import { Clock, ChevronRight } from 'lucide-react'
import type { FundingProgram } from '../types'

interface UrgentBannerProps {
  programs: FundingProgram[]
  onSelect: (p: FundingProgram) => void
}

function daysUntil(deadline: string): number {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export function UrgentBanner({ programs, onSelect }: UrgentBannerProps) {
  if (programs.length === 0) return null

  const urgent = programs.slice(0, 4)

  return (
    <section className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-orange" />
          <h2 className="text-sm font-bold text-orange uppercase tracking-wide">Closing Soon</h2>
          <span className="text-xs text-orange/60 ml-1">&mdash; Don't miss these deadlines</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {urgent.map(p => {
            const days = daysUntil(p.deadline!)
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className="text-left bg-white rounded-lg border border-orange/15 p-4 hover:border-orange/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    days <= 30 ? 'bg-red-light text-red' : 'bg-orange-light text-orange'
                  }`}>
                    {days}d left
                  </span>
                  <ChevronRight size={14} className="text-text-secondary/30 group-hover:text-orange transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary leading-snug mb-1 line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-xs text-text-secondary">
                  Up to <span className="font-semibold text-text-primary">{formatFunding(p.maxFunding)}</span>
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function formatFunding(n: number): string {
  if (n >= 1_000_000_000) return `\u20AC${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `\u20AC${(n / 1_000_000).toFixed(0)}M`
  if (n >= 1_000) return `\u20AC${(n / 1_000).toFixed(0)}K`
  return `\u20AC${n}`
}
