export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-eu-blue flex items-center justify-center">
              <span className="text-eu-gold text-[8px] font-bold">EU</span>
            </div>
            <span className="text-sm text-text-secondary">
              EU Tech Funding Directory
            </span>
          </div>

          <div className="text-xs text-text-secondary/60 text-center sm:text-right">
            <p>Data sourced from official EU portals. Always verify details on the official program page.</p>
            <p className="mt-1">
              Built by{' '}
              <a
                href="https://costeffective.software"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                costeffective.software
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
