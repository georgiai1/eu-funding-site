import { X, ExternalLink, Calendar, Euro, Building2, CheckCircle2, Tag } from 'lucide-react'
import { useEffect } from 'react'
import type { FundingProgram } from '../types'

interface ProgramModalProps {
  program: FundingProgram
  onClose: () => void
}

function formatFunding(n: number): string {
  if (n === 0) return 'Varies'
  if (n >= 1_000_000_000) return `\u20AC${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `\u20AC${(n / 1_000_000).toFixed(0)}M`
  if (n >= 1_000) return `\u20AC${(n / 1_000).toFixed(0)}K`
  return `\u20AC${n}`
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'Rolling basis — Apply anytime'
  return new Date(deadline).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function daysUntil(deadline: string | null): number | null {
  if (!deadline) return null
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

const statusConfig = {
  open: { bg: 'bg-green-light', text: 'text-green', label: 'Accepting Applications' },
  upcoming: { bg: 'bg-orange-light', text: 'text-orange', label: 'Opening Soon' },
  closed: { bg: 'bg-red-light', text: 'text-red', label: 'Currently Closed' },
}

export function ProgramModal({ program, onClose }: ProgramModalProps) {
  const status = statusConfig[program.status]
  const days = daysUntil(program.deadline)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] sm:pt-[10vh]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
          <div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.bg} ${status.text} mb-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {status.label}
            </span>
            <h2 className="text-xl font-bold text-text-primary leading-snug">{program.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface transition-colors shrink-0 ml-4">
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Key numbers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-eu-light rounded-xl p-4">
              <div className="flex items-center gap-2 text-text-secondary text-xs mb-1">
                <Euro size={14} />
                Funding Range
              </div>
              <p className="text-2xl font-bold text-eu-blue">
                {formatFunding(program.minFunding)} &ndash; {formatFunding(program.maxFunding)}
              </p>
            </div>
            <div className={`rounded-xl p-4 ${days !== null && days <= 30 ? 'bg-red-light' : 'bg-surface'}`}>
              <div className="flex items-center gap-2 text-text-secondary text-xs mb-1">
                <Calendar size={14} />
                Deadline
              </div>
              <p className={`text-lg font-bold ${days !== null && days <= 30 ? 'text-red' : 'text-text-primary'}`}>
                {formatDeadline(program.deadline)}
              </p>
              {days !== null && days > 0 && (
                <p className="text-xs text-text-secondary mt-0.5">{days} days remaining</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">About this program</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{program.description}</p>
          </div>

          {/* Funding body */}
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Building2 size={14} />
            <span>Managed by <strong className="text-text-primary">{program.fundingBody}</strong></span>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Who can apply?</h3>
            <div className="space-y-2">
              {program.eligibility.map(e => (
                <div key={e} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag size={14} className="text-text-secondary" />
              <h3 className="text-sm font-semibold text-text-primary">Focus areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {program.tags.map(tag => (
                <span key={tag} className="text-xs bg-surface text-text-secondary px-2.5 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4 rounded-b-2xl">
          <a
            href={program.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-eu-blue text-white font-semibold py-3.5 rounded-xl hover:bg-eu-dark transition-colors text-base no-underline"
          >
            Apply on Official Portal
            <ExternalLink size={16} />
          </a>
          <p className="text-[11px] text-text-secondary/60 text-center mt-2">
            You'll be redirected to the official EU funding portal
          </p>
        </div>
      </div>
    </div>
  )
}
