import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react'
import type { FundingProgram } from '../types'

interface ProgramActionCardProps {
  program: FundingProgram
  onSelect: (p: FundingProgram) => void
}

const statusConfig = {
  open: { bg: 'bg-green-light', text: 'text-green', dot: 'bg-green', label: 'Open' },
  upcoming: { bg: 'bg-orange-light', text: 'text-orange', dot: 'bg-orange', label: 'Upcoming' },
  closed: { bg: 'bg-red-light', text: 'text-red', dot: 'bg-red', label: 'Closed' },
} as const

function formatFunding(n: number): string {
  if (n === 0) return 'Varies'
  if (n >= 1_000_000_000) return `\u20AC${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `\u20AC${(n / 1_000_000).toFixed(0)}M`
  if (n >= 1_000) return `\u20AC${(n / 1_000).toFixed(0)}K`
  return `\u20AC${n}`
}

function daysUntil(deadline: string | null): number | null {
  if (!deadline) return null
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'Rolling basis'
  return new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function ProgramActionCard({ program, onSelect }: ProgramActionCardProps) {
  const status = statusConfig[program.status]
  const days = daysUntil(program.deadline)
  const isUrgent = days !== null && days > 0 && days <= 30

  return (
    <div
      onClick={() => onSelect(program)}
      className="group cursor-pointer bg-white border border-border rounded-xl overflow-hidden hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] transition-all duration-200"
    >
      {/* Top: Funding amount highlight */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              {isUrgent && (
                <span className="text-[11px] font-semibold text-red bg-red-light px-2 py-0.5 rounded-full">
                  {days}d left!
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
              {program.title}
            </h3>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p className="text-xs text-text-secondary">Up to</p>
            <p className="text-xl font-bold text-eu-blue">{formatFunding(program.maxFunding)}</p>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-3">
          {program.description}
        </p>

        {/* Quick eligibility */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
          {program.eligibility.slice(0, 3).map(e => (
            <span key={e} className="inline-flex items-center gap-1 text-xs text-text-secondary">
              <CheckCircle2 size={12} className="text-green shrink-0" />
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom: Action bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-surface/60 border-t border-border/50">
        <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
          <Calendar size={12} />
          {formatDeadline(program.deadline)}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
          View & Apply
          <ArrowRight size={14} />
        </span>
      </div>
    </div>
  )
}
