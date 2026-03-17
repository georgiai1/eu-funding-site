import { Search } from 'lucide-react'
import type { FundingCategory, FundingStatus } from '../types'

interface FilterBarProps {
  filters: {
    search: string
    category: FundingCategory | 'all'
    status: FundingStatus | 'all'
  }
  onChange: (filters: FilterBarProps['filters']) => void
}

const categories: { value: FundingCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'ai', label: 'AI & Data' },
  { value: 'digital', label: 'Digital' },
  { value: 'green-tech', label: 'Green Tech' },
  { value: 'innovation', label: 'Innovation' },
  { value: 'startup', label: 'Startups' },
  { value: 'research', label: 'Research' },
  { value: 'infrastructure', label: 'Infrastructure' },
]

const statuses: { value: FundingStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'open', label: 'Open' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'closed', label: 'Closed' },
]

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          placeholder="Search programs, tags, funding bodies..."
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
        />
      </div>

      {/* Category */}
      <select
        value={filters.category}
        onChange={e => onChange({ ...filters, category: e.target.value as FundingCategory | 'all' })}
        className="px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
      >
        {categories.map(c => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      {/* Status */}
      <select
        value={filters.status}
        onChange={e => onChange({ ...filters, status: e.target.value as FundingStatus | 'all' })}
        className="px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
      >
        {statuses.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
  )
}
