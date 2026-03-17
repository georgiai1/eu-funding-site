import { ExternalLink } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 text-eu-dark font-semibold text-lg no-underline">
          <div className="w-8 h-8 rounded-lg bg-eu-blue flex items-center justify-center">
            <span className="text-eu-gold text-xs font-bold">EU</span>
          </div>
          <span className="hidden sm:inline">EU Tech Funding</span>
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="#programs"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline"
          >
            Programs
          </a>
          <a
            href="https://ec.europa.eu/info/funding-tenders/opportunities/portal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm bg-eu-blue text-white px-4 py-2 rounded-lg hover:bg-eu-dark transition-colors no-underline"
          >
            EU Portal
            <ExternalLink size={14} />
          </a>
        </nav>
      </div>
    </header>
  )
}
