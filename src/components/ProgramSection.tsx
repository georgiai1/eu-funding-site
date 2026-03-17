import { ProgramActionCard } from './ProgramActionCard'
import type { FundingProgram } from '../types'

interface ProgramSectionProps {
  title: string
  subtitle: string
  programs: FundingProgram[]
  onSelect: (p: FundingProgram) => void
  accentColor: 'blue' | 'purple'
}

export function ProgramSection({ title, subtitle, programs, onSelect, accentColor }: ProgramSectionProps) {
  if (programs.length === 0) return null

  const accentStyles = {
    blue: 'from-accent/5 to-transparent',
    purple: 'from-purple-50 to-transparent',
  }

  return (
    <section className={`bg-gradient-to-b ${accentStyles[accentColor]}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h2>
          <p className="text-text-secondary text-sm mt-1">{subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {programs.map(p => (
            <ProgramActionCard key={p.id} program={p} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  )
}
