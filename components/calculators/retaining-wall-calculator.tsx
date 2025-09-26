


"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, AlertCircle, CheckCircle, RotateCcw, Info } from 'lucide-react'
import { RetainingWallQuantityCalculator } from '@/lib/registry/calculator/retaining-wall-calculator'

const MIX_TYPES = [
  { value: 'M5', label: 'M5 (1:5:10)', ratios: { cement: 1, sand: 5, aggregate: 10 } },
  { value: 'M7.5', label: 'M7.5 (1:4:8)', ratios: { cement: 1, sand: 4, aggregate: 8 } },
  { value: 'M10', label: 'M10 (1:3:6)', ratios: { cement: 1, sand: 3, aggregate: 6 } },
  { value: 'M15', label: 'M15 (1:2:4)', ratios: { cement: 1, sand: 2, aggregate: 4 } },
  { value: 'M20', label: 'M20 (1:1.5:3)', ratios: { cement: 1, sand: 1.5, aggregate: 3 } },
  { value: 'M25', label: 'M25 (1:1:2)', ratios: { cement: 1, sand: 1, aggregate: 2 } },
  { value: 'M30', label: 'M30 (1:0.75:1.5)', ratios: { cement: 1, sand: 0.75, aggregate: 1.5 } },
  { value: 'M35', label: 'M35 (1:0.5:1)', ratios: { cement: 1, sand: 0.5, aggregate: 1 } },
]

interface FormData {
  length: string
  width: string
  height: string
  area?: string
  mixType: string
  wastage: string
  unit: 'metric' | 'imperial'
}

interface CalculationResult {
  wetVolume: number
  dryVolume: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  aggregateWeight: number
  mixRatio: string
  area?: number
  // Optional advanced fields (non-breaking)
  structural?: any
  human_summary?: string
}

interface RetainingWallCalculatorProps {
  globalUnit: 'm' | 'ft';
}

export default function RetainingWallCalculator({ globalUnit }: RetainingWallCalculatorProps) {
  const [formData, setFormData] = useState<FormData>({
    length: '',
    width: '',
    height: '',
    area: '',
    mixType: 'M15',
    wastage: '5',
    unit: globalUnit === 'm' ? 'metric' : 'imperial',
  })

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      unit: globalUnit === 'm' ? 'metric' : 'imperial',
    }))
  }, [globalUnit])
  const [useArea, setUseArea] = useState(false)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setResult(null)
    setShowSteps(false)
  }, [useArea])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!useArea) {
      if (!formData.length || Number(formData.length) <= 0) newErrors.length = 'Enter a valid length'
      if (!formData.width || Number(formData.width) <= 0) newErrors.width = 'Enter a valid width'
    } else {
      if (!formData.area || Number(formData.area) <= 0) newErrors.area = 'Enter a valid area'
    }
    if (!formData.height || Number(formData.height) <= 0) newErrors.height = 'Enter a valid height'
    if (!formData.mixType) newErrors.mixType = 'Select a mix type'
    if (!formData.wastage || Number(formData.wastage) < 0) newErrors.wastage = 'Enter wastage %'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateConcrete = () => {
    if (!validateForm()) return
    setIsCalculating(true)
    setTimeout(() => {
      const res = RetainingWallQuantityCalculator.calculate({
        length: formData.length ? Number(formData.length) : undefined,
        width: formData.width ? Number(formData.width) : undefined,
        height: Number(formData.height),
        area: formData.area ? Number(formData.area) : undefined,
        mixType: formData.mixType,
        wastagePercent: Number(formData.wastage),
        unitSystem: formData.unit,
        useArea: useArea,
      })

      // Map to existing UI result shape (no UI change)
      setResult({
        wetVolume: res.wetVolume,
        dryVolume: res.dryVolume,
        cementWeight: res.cementWeight,
        cementBags: res.cementBags,
        sandWeight: res.sandWeight,
        aggregateWeight: res.aggregateWeight,
        mixRatio: res.mixRatio,
        area: res.area,
        structural: (res as any).structural,
        human_summary: (res as any).human_summary,
      })
      setIsCalculating(false)
    }, 300)
  }

  const resetForm = () => {
    setFormData({
      length: '',
      width: '',
      height: '',
      area: '',
      mixType: 'M15',
      wastage: '5',
      unit: 'metric',
    })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark"
      >
        {/* Header */}
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Retaining Wall Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Calculate volume and material requirements for retaining walls.</p>
            </div>
          </div>
        </div>
        {/* SVG Diagram for Retaining Wall Calculator */}
        <div className="flex justify-center mb-8">
          <svg width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Retaining wall shape */}
            <rect x="60" y="40" width="180" height="50" rx="8" fill="#e0e7ef" stroke="#64748b" strokeWidth="2" />
            {/* Base footing */}
            <rect x="50" y="90" width="200" height="15" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            {/* Soil fill */}
            <rect x="240" y="40" width="40" height="50" fill="#a3e635" stroke="#65a30d" strokeWidth="1.2" opacity="0.5" />
            {/* Dimension lines */}
            <line x1="60" y1="110" x2="240" y2="110" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="150" y="118" textAnchor="middle" fontSize="14" fill="#334155">Wall Length</text>
            <line x1="50" y1="40" x2="50" y2="90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="38" y="70" textAnchor="middle" fontSize="14" fill="#334155" transform="rotate(-90 38,70)">Height</text>
            <line x1="60" y1="35" x2="100" y2="35" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="80" y="28" textAnchor="middle" fontSize="13" fill="#334155">Thickness</text>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Form */}
        <form
          className="px-8 py-8"
          onSubmit={e => {
            e.preventDefault()
            calculateConcrete()
          }}
        >
          <div className="flex justify-end gap-4 mb-4">
            <button
              type="button"
              onClick={() => setUseArea(!useArea)}
              className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all 
                ${useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}
            >
              <Info className="h-4 w-4" />
              {useArea ? 'Use Length & Width' : 'Use Area'}
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {!useArea && (
              <>
                {/* Length */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Length</label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={e => handleInputChange('length', e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter length (${formData.unit === 'metric' ? 'm' : 'ft'})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.length ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                  />
                  {errors.length && <div className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.length}</div>}
                </div>
                {/* Width */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Width (Thickness)</label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={e => handleInputChange('width', e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter thickness (${formData.unit === 'metric' ? 'm' : 'ft'})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.width ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                  />
                  {errors.width && <div className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.width}</div>}
                </div>
              </>
            )}
            {useArea && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Wall Area</label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={e => handleInputChange('area', e.target.value)}
                  step="0.001"
                  min="0"
                  placeholder={`Enter area (${formData.unit === 'metric' ? 'm²' : 'ft²'})`}
                  className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.area ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                />
                {errors.area && <div className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.area}</div>}
              </div>
            )}
            {/* Height */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Height</label>
              <input
                type="number"
                value={formData.height}
                onChange={e => handleInputChange('height', e.target.value)}
                step="0.001"
                min="0"
                placeholder={`Enter height (${formData.unit === 'metric' ? 'm' : 'ft'})`}
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.height ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.height && <div className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.height}</div>}
            </div>
            {/* Mix Type */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Concrete Mix Type</label>
              <select
                value={formData.mixType}
                onChange={e => handleInputChange('mixType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                {MIX_TYPES.map(mix => (
                  <option key={mix.value} value={mix.value}>{mix.label}</option>
                ))}
              </select>
              {errors.mixType && <div className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.mixType}</div>}
            </div>
            {/* Wastage */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Wastage Factor (%)</label>
              <input
                type="number"
                value={formData.wastage}
                onChange={e => handleInputChange('wastage', e.target.value)}
                step="0.1"
                min="0"
                max="30"
                placeholder="5"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.wastage ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.wastage && <div className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.wastage}</div>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
                disabled={!result}
              >
                <Info className="h-4 w-4" />
                Steps
              </button>
            </div>
            <button
              type="submit"
              disabled={isCalculating}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-display font-semibold text-white shadow-soft hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Calculator className="h-4 w-4" />
                  Calculate
                </>
              )}
            </button>
          </div>
          <div className="mt-4 text-sm text-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
            <b>Note:</b> For irregular or non-rectangular retaining walls (e.g., trapezoidal, stepped, L-shaped, T-shaped), calculate the total area or volume by breaking the wall into simple shapes, sum their volumes, and enter the total area or volume above. This calculator assumes a straight wall for direct input, but you can use the area mode for custom shapes.
          </div>
        </form>

        {/* Results & Steps */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20"
            >
              <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Retaining Wall Calculation Results
              </h2>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Wet Volume</span><span className="font-semibold">{result.wetVolume.toFixed(3)} m³</span></div>
                  <div className="flex justify-between"><span>Dry Volume</span><span className="font-semibold">{result.dryVolume.toFixed(3)} m³</span></div>
                  <div className="flex justify-between"><span>Cement</span><span className="font-semibold">{result.cementWeight.toFixed(1)} kg ({result.cementBags.toFixed(1)} bags)</span></div>
                  <div className="flex justify-between"><span>Sand</span><span className="font-semibold">{result.sandWeight.toFixed(1)} kg</span></div>
                  <div className="flex justify-between"><span>Aggregate</span><span className="font-semibold">{result.aggregateWeight.toFixed(1)} kg</span></div>
                  <div className="flex justify-between"><span>Mix Ratio</span><span className="font-semibold">{result.mixRatio}</span></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-4 text-green-800 dark:text-green-200 text-sm">
                    <b>Tip:</b> Always add 5–10% extra for wastage and variations in site conditions.
                  </div>
                </div>
              </div>
              {/* Optional engineering summary (non-invasive) */}
              {result.human_summary && (
                <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <b>Engineering Summary:</b> {result.human_summary}
                </div>
              )}
              {showSteps && (
                <div className="mt-12">
                  <h3 className="font-display text-xl font-semibold text-heading dark:text-heading-dark mb-2">Step-by-Step Calculation</h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    <li>Calculate the <b>area</b> of the wall: <code>{useArea ? 'Area' : 'Length × Width'}</code> = <b>{result.area?.toFixed(3)} m²</b></li>
                    <li>Calculate the <b>wet volume</b>: <code>Area × Height</code> = <b>{result.wetVolume.toFixed(3)} m³</b></li>
                    <li>Calculate the <b>dry volume</b>: <code>Wet Volume × 1.54 × (1 + Wastage/100)</code> = <b>{result.dryVolume.toFixed(3)} m³</b></li>
                    <li>Apply the <b>mix ratio</b> ({result.mixRatio}) to split dry volume into cement, sand, and aggregate.</li>
                    <li>Convert cement weight to bags (1 bag = 50kg).</li>
                  </ol>
                </div>
              )}
              <hr className="my-8 border-slate-200 dark:border-slate-700" />
              <div>
                <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Retaining Wall Calculator – FAQs & Info</h3>
                <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                  <div>
                    <span className="font-semibold">Irregular Wall Shapes?</span><br />
                    For trapezoidal, stepped, L/T-shaped, or non-rectangular walls, break the wall into simple shapes, calculate each volume, and sum them. Enter the total area or volume above.
                  </div>
                  <div>
                    <span className="font-semibold">What is a retaining wall calculator?</span><br />
                    A tool to estimate concrete and material requirements for retaining walls.
                  </div>
                  <div>
                    <span className="font-semibold">Why is it important?</span><br />
                    Helps in accurate planning, cost-saving, and reducing material wastage.
                  </div>
                  <div>
                    <span className="font-semibold">What units does it support?</span><br />
                    Volume is in cubic meters, cement in kg and bags.
                  </div>
                  <div>
                    <span className="font-semibold">How to choose the right mix ratio?</span><br />
                    <ul className="list-disc list-inside ml-6">
                      <li>M5–M10: Low-strength works like leveling or small foundations.</li>
                      <li>M15–M25: Structural works like retaining walls, slabs, beams, and columns.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  </motion.div>
    </div>
  )
}

