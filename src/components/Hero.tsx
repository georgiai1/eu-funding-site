import { TrendingUp, Clock, Euro } from 'lucide-react'

interface HeroProps {
  stats: {
    total: number
    open: number
    upcoming: number
    totalFunding: number
  }
}

function formatBillions(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`
  return `${(n / 1_000).toFixed(0)}K`
}

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-eu-blue via-[#0044CC] to-[#1a5cd6]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.2),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-eu-gold animate-pulse" />
            <span className="text-white/90 text-sm font-medium">{stats.open} programs accepting applications</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            EU Funding for
            <br />
            <span className="text-eu-gold">Tech Companies</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
            Discover grants, equity investments, and innovation programs from the European Union.
            Updated automatically when you visit.
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
            <StatCard icon={<TrendingUp size={18} />} value={stats.total.toString()} label="Programs" />
            <StatCard icon={<Clock size={18} />} value={stats.open.toString()} label="Open Now" />
            <StatCard icon={<Euro size={18} />} value={`${formatBillions(stats.totalFunding)}+`} label="Available" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
      <div className="flex items-center gap-2 text-eu-gold mb-1">
        {icon}
        <span className="text-xl font-bold text-white">{value}</span>
      </div>
      <span className="text-xs text-white/60">{label}</span>
    </div>
  )
}
