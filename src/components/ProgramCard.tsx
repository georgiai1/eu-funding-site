import { Calendar, ArrowUpRight, Building2, Euro } from 'lucide-react'
import type { FundingProgram } from '../types'

interface ProgramCardProps {
  program: FundingProgram
}

const statusStyles = {
  open: 'bg-green-light text-green',
  upcoming: 'bg-orange-light text-orange',
  closed: 'bg-red-light text-red',
} as const

const categoryLabels: Record<string, string> = {
  ai: 'AI & Data',
  digital: 'Digital',
  'green-tech': 'Green Tech',
  innovation: 'Innovation',
  startup: 'Startups',
  research: 'Research',
  infrastructure: 'Infrastructure',
}

function formatCurrency(amount: number): string {
  if (amount === 0) return 'Varies'
  if (amount >= 1_000_000_000) return `\u20AC${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `\u20AC${(amount / 1_000_000).toFixed(0)}M`
  return `\u20AC${(amount / 1_000).toFixed(0)}K`
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'Rolling basis'
  const d = new Date(deadline)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function daysUntil(deadline: string | null): number | null {
  if (!deadline) return null
  const diff = new Date(deadline).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function ProgramCard({ program }: ProgramCardProps) {
  const days = daysUntil(program.deadline)
  const isUrgent = days !== null && days > 0 && days <= 30

  return (
    <a
      href={program.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-border rounded-xl p-5 sm:p-6 hover:border-accent/30 hover:shadow-[0_4px_24px_rgba(37,99,235,0.08)] transition-all duration-200 no-underline"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[program.status]}`}>
            {program.status === 'open' && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />}
            {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
          </span>
          <span className="text-xs text-text-secondary bg-surface px-2 py-0.5 rounded-full">
            {categoryLabels[program.category] || program.category}
          </span>
        </div>
        <ArrowUpRight
          size={16}
          className="text-text-secondary/40 group-hover:text-accent transition-colors shrink-0 mt-0.5"
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 leading-snug">
        {program.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
        {program.description}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <Building2 size={13} className="text-text-secondary/60" />
          {program.fundingBody}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Euro size={13} className="text-text-secondary/60" />
          {formatCurrency(program.minFunding)} &ndash; {formatCurrency(program.maxFunding)}
        </span>
        <span className={`inline-flex items-center gap-1.5 ${isUrgent ? 'text-orange font-medium' : ''}`}>
          <Calendar size={13} className={isUrgent ? 'text-orange' : 'text-text-secondary/60'} />
          {formatDeadline(program.deadline)}
          {isUrgent && ` (${days}d left)`}
        </span>
      </div>

      {/* Tags */}
      {program.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/60">
          {program.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-[11px] text-text-secondary/70 bg-surface px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
          {program.tags.length > 4 && (
            <span className="text-[11px] text-text-secondary/50">+{program.tags.length - 4}</span>
          )}
        </div>
      )}
    </a>
  )
}
