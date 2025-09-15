'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Calculator,
  Blocks,
  Paintbrush,
  Layers,
  Ruler,
  SquareStack,
  Hammer,
  Landmark,
  Mountain,
  LayoutGrid,
  Shield,
  Droplet,
  ArrowUp,
  Star,
  StarOff,
  ChevronDown
} from 'lucide-react'

import ConcreteCalculator from '../../components/calculators/concrete-calculator'
import BrickworkCalculator from '../../components/calculators/brickwork-calculator'
import PlasterCalculator from '../../components/calculators/plaster-calculator'
import PaintCalculator from '../../components/calculators/paint-calculator'
import TilesCalculator from '../../components/calculators/tiles-calculator'
import SteelReinforcementCalculator from '../../components/calculators/steel-reinforcement-calculator'
import RoofAreaCalculator from '../../components/calculators/roof-area-calculator'
import StoneMasonryCalculator from '../../components/calculators/stone-masonry-calculator'
import RoadPavementCalculator from '../../components/calculators/road-pavement-calculator'
import RetainingWallCalculator from '../../components/calculators/retaining-wall-calculator'
import EarthworkCalculator from '../../components/calculators/earthwork-calculator'
import FormworkCalculator from '../../components/calculators/formwork-calculator'

type CalculatorCategory = 'All' | 'Concrete & Masonry' | 'Finishing' | 'Structural' | 'Civil Works'
type SortOption = 'Newest' | 'Oldest' | 'A-Z' | 'Z-A' | 'Favorite'

export default function CalculatorsIndex() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null)
  const [globalUnit, setGlobalUnit] = useState<'m' | 'ft'>('m')
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>('All')
  const [sortBy, setSortBy] = useState<SortOption>('A-Z')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  // Client-only rendering
  useEffect(() => setMounted(true), [])

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem('calculator-favorites')
    if (saved) setFavorites(new Set(JSON.parse(saved)))
  }, [])

  // Save favorites
  useEffect(() => {
    localStorage.setItem('calculator-favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  // Scroll top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  const calculators = [
    { id: 'concrete', title: 'Concrete Calculator', description: 'Calculate concrete volume and material requirements with precise mix ratios', icon: Calculator, color: 'from-blue-500 to-cyan-500', category: 'Concrete & Masonry' as const, createdAt: '2024-01-01' },
    { id: 'brickwork', title: 'Brickwork Calculator', description: 'Calculate bricks, mortar volume, cement & sand quantity', icon: Blocks, color: 'from-orange-500 to-red-500', category: 'Concrete & Masonry' as const, createdAt: '2024-01-02' },
    { id: 'stone-masonry', title: 'Stone Masonry Calculator', description: 'Calculate stone masonry volume, cement, and sand', icon: Mountain, color: 'from-stone-500 to-zinc-500', category: 'Concrete & Masonry' as const, createdAt: '2024-01-03' },
    { id: 'plaster', title: 'Plaster Calculator', description: 'Estimate plaster volume, cement, and sand for wall finishing', icon: Layers, color: 'from-emerald-500 to-lime-500', category: 'Finishing' as const, createdAt: '2024-01-04' },
    { id: 'paint', title: 'Paint Calculator', description: 'Calculate paint quantity required for walls and surfaces', icon: Paintbrush, color: 'from-pink-500 to-fuchsia-500', category: 'Finishing' as const, createdAt: '2024-01-05' },
    { id: 'tiles', title: 'Tiles Calculator', description: 'Estimate number of tiles and wastage for flooring or wall tiling', icon: LayoutGrid, color: 'from-yellow-500 to-orange-400', category: 'Finishing' as const, createdAt: '2024-01-06' },
    { id: 'steel-reinforcement', title: 'Steel Reinforcement Calculator', description: 'Calculate steel bar weight and length for reinforcement', icon: Ruler, color: 'from-gray-700 to-gray-400', category: 'Structural' as const, createdAt: '2024-01-07' },
    { id: 'roof-area', title: 'Roof Area Calculator', description: 'Estimate roof surface area for various roof types', icon: SquareStack, color: 'from-sky-500 to-indigo-500', category: 'Structural' as const, createdAt: '2024-01-08' },
    { id: 'formwork', title: 'Formwork Calculator', description: 'Calculate formwork area for concrete structures', icon: Droplet, color: 'from-cyan-700 to-cyan-400', category: 'Structural' as const, createdAt: '2024-01-09' },
    { id: 'retaining-wall', title: 'Retaining Wall Calculator', description: 'Calculate volume and material for retaining walls', icon: Landmark, color: 'from-green-700 to-green-400', category: 'Civil Works' as const, createdAt: '2024-01-10' },
    { id: 'road-pavement', title: 'Road Pavement Calculator', description: 'Estimate material for road pavement construction', icon: Hammer, color: 'from-amber-600 to-yellow-400', category: 'Civil Works' as const, createdAt: '2024-01-11' },
    { id: 'earthwork', title: 'Earthwork Calculator', description: 'Estimate earthwork excavation or filling volume', icon: Shield, color: 'from-orange-700 to-yellow-500', category: 'Civil Works' as const, createdAt: '2024-01-12' }
  ]

  const categoryCounts = calculators.reduce((acc, calc) => {
    acc[calc.category] = (acc[calc.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const filteredCalculators = calculators
    .filter(c => (selectedCategory === 'All' || c.category === selectedCategory) &&
                 c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'Newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'Oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'A-Z': return a.title.localeCompare(b.title)
        case 'Z-A': return b.title.localeCompare(a.title)
        case 'Favorite': {
          const aFav = favorites.has(a.id)
          const bFav = favorites.has(b.id)
          if (aFav && !bFav) return -1
          if (!aFav && bFav) return 1
          return a.title.localeCompare(b.title)
        }
        default: return 0
      }
    })

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const categories: CalculatorCategory[] = ['All', 'Concrete & Masonry', 'Finishing', 'Structural', 'Civil Works']

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'concrete': return <ConcreteCalculator globalUnit={globalUnit} />
      case 'brickwork': return <BrickworkCalculator globalUnit={globalUnit} />
      case 'plaster': return <PlasterCalculator globalUnit={globalUnit} />
      case 'paint': return <PaintCalculator globalUnit={globalUnit} />
      case 'tiles': return <TilesCalculator globalUnit={globalUnit} />
      case 'steel-reinforcement': return <SteelReinforcementCalculator globalUnit={globalUnit} />
      case 'roof-area': return <RoofAreaCalculator globalUnit={globalUnit} />
      case 'stone-masonry': return <StoneMasonryCalculator globalUnit={globalUnit} />
      case 'road-pavement': return <RoadPavementCalculator globalUnit={globalUnit} />
      case 'earthwork': return <EarthworkCalculator globalUnit={globalUnit} />
      case 'retaining-wall': return <RetainingWallCalculator globalUnit={globalUnit} />
      case 'formwork': return <FormworkCalculator globalUnit={globalUnit} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {selectedCalculator ? (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <button onClick={() => setSelectedCalculator(null)} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700">
                    ← Back to Calculators
                  </button>
                  <div className="rounded-xl border border-slate-200/20 bg-surface p-2 shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
                    <div className="flex gap-2">
                      <button onClick={() => setGlobalUnit('m')} className={`rounded-lg px-6 py-3 font-display font-medium transition-colors ${globalUnit === 'm' ? 'bg-primary text-white' : 'text-heading hover:bg-slate-100 dark:text-heading-dark dark:hover:bg-slate-800'}`}>Metric (m)</button>
                      <button onClick={() => setGlobalUnit('ft')} className={`rounded-lg px-6 py-3 font-display font-medium transition-colors ${globalUnit === 'ft' ? 'bg-primary text-white' : 'text-heading hover:bg-slate-100 dark:text-heading-dark dark:hover:bg-slate-800'}`}>Imperial (ft)</button>
                    </div>
                  </div>
                </div>
                <motion.div key={selectedCalculator} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  {renderCalculator()}
                </motion.div>
              </>
            ) : (
              <>
                {/* Header */}
                <div className="mb-16 text-center">
                  <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Engineering Calculators</h1>
                  <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">Professional-grade calculators designed for civil engineering professionals. Built with accuracy and industry standards in mind.</p>
                </div>

                {/* Search */}
                <div className="mb-8 space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body/40 dark:text-body-dark/40" />
                    <input
                      type="text"
                      placeholder="Search everything: Brickwork, Concrete, Paint, Steel, Roof Area..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200/20 bg-surface px-12 py-4 font-sans text-body placeholder:text-body/40 shadow-card transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800/20 dark:bg-surface-dark dark:text-body-dark dark:placeholder:text-body-dark/40"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => {
                    const count = category === 'All' ? calculators.length : categoryCounts[category] || 0
                    const isActive = selectedCategory === category
                    return (
                      <button key={category} onClick={() => setSelectedCategory(category)} className={`group flex items-center gap-2 rounded-xl border px-3 py-2 font-display font-medium transition-all whitespace-nowrap ${isActive ? 'border-primary bg-primary/10 text-primary shadow-soft' : 'border-slate-200/20 bg-surface text-heading hover:border-primary/50 hover:bg-primary/5 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-800/50'}`}>
                        <span className="text-sm">{category}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs flex-shrink-0 ${isActive ? 'bg-primary/20 text-primary' : 'bg-slate-200/60 text-body/60 dark:bg-slate-700/60 dark:text-body-dark/60'}`}>{count}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Sort */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-medium text-body/60 dark:text-body-dark/60">Sort by:</span>
                    <div className="relative">
                      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="appearance-none rounded-xl border border-slate-200/20 bg-surface px-4 py-2 pr-8 font-display font-medium text-heading transition-colors focus:border-primary/50 focus:outline-none dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Favorite">Favorite</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40 dark:text-body-dark/40" />
                    </div>
                  </div>
                  <div className="text-sm text-body/60 dark:text-body-dark/60">{filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''} found</div>
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                  <motion.div key="calculators-by-category" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                    {['Concrete & Masonry', 'Finishing', 'Structural', 'Civil Works'].map((category) => {
                      const categoryCalcs = filteredCalculators.filter(c => c.category === category)
                      if (!categoryCalcs.length) return null
                      return (
                        <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className={`h-8 w-8 rounded-full bg-gradient-to-r flex items-center justify-center`}><Calculator className="h-4 w-4 text-white" /></div>
                            <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">{category}</h2>
                            <span className="rounded-full bg-slate-200/60 px-3 py-1 text-sm font-medium text-body/60 dark:bg-slate-700/60 dark:text-body-dark/60">{categoryCalcs.length} calculator{categoryCalcs.length !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                            {categoryCalcs.map(calc => {
                              const IconComponent = calc.icon
                              const isFavorite = favorites.has(calc.id)
                              return (
                                <motion.div key={calc.id} onClick={() => setSelectedCalculator(calc.id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="group relative rounded-2xl border border-slate-200/20 bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark text-left cursor-pointer">
                                  {/* Favorite Button */}
                                  <div onClick={(e) => { e.stopPropagation(); toggleFavorite(calc.id) }} className={`absolute right-4 top-4 rounded-full p-2 transition-all hover:scale-110 ${isFavorite ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' : 'text-body/40 hover:bg-slate-100/80 dark:text-body-dark/40 dark:hover:bg-slate-800/80'}`} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                                    {isFavorite ? <Star className="h-5 w-5 fill-current" /> : <StarOff className="h-5 w-5" />}
                                  </div>
                                  {/* Icon & Content */}
                                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${calc.color} text-white`}><IconComponent className="h-6 w-6" /></div>
                                  <div className="mb-4 pr-10">
                                    <h3 className="mb-2 font-display text-xl font-semibold text-heading group-hover:text-primary transition-colors dark:text-heading-dark">{calc.title}</h3>
                                    <p className="font-sans text-body/80 dark:text-body-dark/80 line-clamp-3">{calc.description}</p>
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:scale-110">
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
