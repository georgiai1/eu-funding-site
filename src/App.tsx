import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProgramList } from './components/ProgramList'
import { Footer } from './components/Footer'
import { usePrograms } from './hooks/usePrograms'

function App() {
  const { programs, isLoading, source, filters, setFilters, stats } = usePrograms()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero stats={stats} />
      <main className="flex-1 bg-surface">
        <ProgramList
          programs={programs}
          filters={filters}
          onFiltersChange={setFilters}
          source={source}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
