"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Blocks, Paintbrush, Layers, Ruler, SquareStack, Hammer, Landmark, Mountain, LayoutGrid, Shield, Droplet } from 'lucide-react'
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

export default function CalculatorsIndex() {
  const [selectedCalculator, setSelectedCalculator] = useState<
    | 'concrete'
    | 'brickwork'
    | 'plaster'
    | 'paint'
    | 'tiles'
    | 'steel-reinforcement'
    | 'roof-area'
    | 'stone-masonry'
    | 'road-pavement'
    | 'retaining-wall'
    | 'earthwork'
    | 'formwork'
    | null
  >(null)
  const [globalUnit, setGlobalUnit] = useState<'m' | 'ft'>('m')

  const calculators = [
    {
      id: 'concrete' as const,
      title: 'Concrete Calculator',
      description: 'Calculate concrete volume and material requirements with precise mix ratios',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'brickwork' as const,
      title: 'Brickwork Calculator',
      description: 'Calculate bricks, mortar volume, cement & sand quantity',
      icon: Blocks,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'plaster' as const,
      title: 'Plaster Calculator',
      description: 'Estimate plaster volume, cement, and sand for wall finishing',
      icon: Layers,
      color: 'from-emerald-500 to-lime-500'
    },
    {
      id: 'paint' as const,
      title: 'Paint Calculator',
      description: 'Calculate paint quantity required for walls and surfaces',
      icon: Paintbrush,
      color: 'from-pink-500 to-fuchsia-500'
    },
    {
      id: 'tiles' as const,
      title: 'Tiles Calculator',
      description: 'Estimate number of tiles and wastage for flooring or wall tiling',
      icon: LayoutGrid,
      color: 'from-yellow-500 to-orange-400'
    },
    {
      id: 'steel-reinforcement' as const,
      title: 'Steel Reinforcement Calculator',
      description: 'Calculate steel bar weight and length for reinforcement',
      icon: Ruler,
      color: 'from-gray-700 to-gray-400'
    },
    {
      id: 'roof-area' as const,
      title: 'Roof Area Calculator',
      description: 'Estimate roof surface area for various roof types',
      icon: SquareStack,
      color: 'from-sky-500 to-indigo-500'
    },
    {
      id: 'stone-masonry' as const,
      title: 'Stone Masonry Calculator',
      description: 'Calculate stone masonry volume, cement, and sand',
      icon: Mountain,
      color: 'from-stone-500 to-zinc-500'
    },
    {
      id: 'road-pavement' as const,
      title: 'Road Pavement Calculator',
      description: 'Estimate material for road pavement construction',
      icon: Hammer,
      color: 'from-amber-600 to-yellow-400'
    },
    {
      id: 'retaining-wall' as const,
      title: 'Retaining Wall Calculator',
      description: 'Calculate volume and material for retaining walls',
      icon: Landmark,
      color: 'from-green-700 to-green-400'
    },
    {
      id: 'earthwork' as const,
      title: 'Earthwork Calculator',
      description: 'Estimate earthwork excavation or filling volume',
      icon: Shield,
      color: 'from-orange-700 to-yellow-500'
    },
    {
      id: 'formwork' as const,
      title: 'Formwork Calculator',
      description: 'Calculate formwork area for concrete structures',
      icon: Droplet,
      color: 'from-cyan-700 to-cyan-400'
    }
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      {selectedCalculator ? (
        <>
          {/* Header with back button and unit toggle */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => setSelectedCalculator(null)}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
            >
              ← Back to Calculators
            </button>
            {/* Unit Toggle */}
            <div className="rounded-xl border border-slate-200/20 bg-surface p-2 shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
              <div className="flex gap-2">
                <button
                  onClick={() => setGlobalUnit('m')}
                  className={`rounded-lg px-6 py-3 font-display font-medium transition-colors ${
                    globalUnit === 'm'
                      ? 'bg-primary text-white'
                      : 'text-heading hover:bg-slate-100 dark:text-heading-dark dark:hover:bg-slate-800'
                  }`}
                >
                  Metric (m)
                </button>
                <button
                  onClick={() => setGlobalUnit('ft')}
                  className={`rounded-lg px-6 py-3 font-display font-medium transition-colors ${
                    globalUnit === 'ft'
                      ? 'bg-primary text-white'
                      : 'text-heading hover:bg-slate-100 dark:text-heading-dark dark:hover:bg-slate-800'
                  }`}
                >
                  Imperial (ft)
                </button>
              </div>
            </div>
          </div>
          {/* Calculator Content */}
          <motion.div
            key={selectedCalculator}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedCalculator === 'concrete' && <ConcreteCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'brickwork' && <BrickworkCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'plaster' && <PlasterCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'paint' && <PaintCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'tiles' && <TilesCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'steel-reinforcement' && <SteelReinforcementCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'roof-area' && <RoofAreaCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'stone-masonry' && <StoneMasonryCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'road-pavement' && <RoadPavementCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'earthwork' && <EarthworkCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'retaining-wall' && <RetainingWallCalculator globalUnit={globalUnit} />}
            {selectedCalculator === 'formwork' && <FormworkCalculator globalUnit={globalUnit} />}
          </motion.div>
        </>
      ) : (
        <>
          <div className="mb-16 text-center">
            <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Engineering Calculators</h1>
            <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">
              Professional-grade calculators designed for civil engineering professionals. 
              Built with accuracy and industry standards in mind.
            </p>
          </div>
          {/* Calculator Options */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {calculators.map((calc) => {
              const IconComponent = calc.icon
              return (
                <motion.button
                  key={calc.id}
                  onClick={() => setSelectedCalculator(calc.id)}
                  className="group rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${calc.color} text-white`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-display text-xl font-semibold text-heading dark:text-heading-dark group-hover:text-primary transition-colors">
                        {calc.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-left font-sans text-body/80 dark:text-body-dark/80">
                    {calc.description}
                  </p>
                  <div className="mt-4 text-left">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Open Calculator →
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </>
      )}
    </main>
  )
}
// ...existing code...



