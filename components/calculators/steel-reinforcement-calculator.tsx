"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, RotateCcw, Eye, EyeOff, Info, CheckCircle } from 'lucide-react'


interface SteelResult {
  totalWeight: number
  totalLength: number
}


interface SteelFormData {
  barLength: string
  barDiameter: string
  barCount: string
  unit: 'm' | 'ft'
}

const DENSITY = 7850 // kg/m³

export default function SteelReinforcementCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [formData, setFormData] = useState<SteelFormData>({ barLength: '', barDiameter: '', barCount: '', unit: globalUnit })
  const [result, setResult] = useState<SteelResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setFormData(prev => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.barLength || parseFloat(formData.barLength) <= 0) newErrors.barLength = 'Enter a valid bar length'
    if (!formData.barDiameter || parseFloat(formData.barDiameter) <= 0) newErrors.barDiameter = 'Enter a valid bar diameter'
    if (!formData.barCount || parseInt(formData.barCount) <= 0) newErrors.barCount = 'Enter a valid bar count'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateSteel = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    try {
      const length = parseFloat(formData.barLength) * parseInt(formData.barCount)
      const diameter = parseFloat(formData.barDiameter) / 1000
      const volume = Math.PI * Math.pow(diameter / 2, 2) * length
      const totalWeight = volume * DENSITY
      setResult({ totalWeight, totalLength: length })
    } finally {
      setIsCalculating(false)
    }
  }

  const resetForm = () => {
    setFormData({ barLength: '', barDiameter: '', barCount: '', unit: globalUnit })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  const handleInputChange = (field: keyof SteelFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
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
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Steel Reinforcement Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Calculate steel bar weight and length for reinforcement.</p>
            </div>
          </div>
        </div>
        {/* SVG Diagram for Steel Reinforcement */}
        <div className="flex justify-center mb-8">
          <svg width="320" height="90" viewBox="0 0 320 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Main bar */}
            <rect x="40" y="40" width="240" height="10" rx="5" fill="#64748b" stroke="#334155" strokeWidth="2" />
            {/* Bar ends */}
            <circle cx="45" cy="45" r="8" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
            <circle cx="275" cy="45" r="8" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
            {/* Diameter indicator */}
            <line x1="60" y1="60" x2="60" y2="30" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="65" y="25" fontSize="13" fill="#334155">Diameter</text>
            {/* Length indicator */}
            <line x1="40" y1="75" x2="280" y2="75" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="160" y="88" textAnchor="middle" fontSize="14" fill="#334155">Bar Length</text>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        {/* Form */}
        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Bar Length ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.barLength}
                onChange={e => handleInputChange('barLength', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter bar length"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.barLength ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.barLength && <div className="text-red-600 text-xs mt-1">{errors.barLength}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Bar Diameter (mm)</label>
              <input
                type="number"
                value={formData.barDiameter}
                onChange={e => handleInputChange('barDiameter', e.target.value)}
                step="0.1"
                min="0"
                placeholder="Enter bar diameter"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.barDiameter ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.barDiameter && <div className="text-red-600 text-xs mt-1">{errors.barDiameter}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Bar Count</label>
              <input
                type="number"
                value={formData.barCount}
                onChange={e => handleInputChange('barCount', e.target.value)}
                step="1"
                min="0"
                placeholder="Enter bar count"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.barCount ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.barCount && <div className="text-red-600 text-xs mt-1">{errors.barCount}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Unit</label>
              <select
                value={formData.unit}
                onChange={e => handleInputChange('unit', e.target.value as 'm' | 'ft')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="m">Metric (m, mm)</option>
                <option value="ft">Imperial (ft, mm)</option>
              </select>
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
              >
                {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </button>
            </div>
            <button
              type="button"
              onClick={calculateSteel}
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
        </div>
        {/* Results & FAQ */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
            >
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="font-display text-xl font-semibold text-heading dark:text-heading-dark">Calculation Results</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Total Weight</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Total Weight:</span>
                      <span className="font-mono font-semibold">{result.totalWeight.toFixed(2)} kg</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Total Length</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Total Length:</span>
                      <span className="font-mono font-semibold">{result.totalLength.toFixed(2)} {formData.unit === 'm' ? 'm' : 'ft'}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Steps */}
              {showSteps && result && (
                <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4 font-display text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    Step-by-Step Calculation
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    <li>
                      <span className="font-semibold">Total Length:</span> Bar Length × Bar Count = {formData.barLength} × {formData.barCount} = {result.totalLength.toFixed(2)} {formData.unit === 'm' ? 'm' : 'ft'}
                    </li>
                    <li>
                      <span className="font-semibold">Bar Volume:</span> π × (Diameter/2)<sup>2</sup> × Total Length = {Math.PI.toFixed(2)} × ({formData.barDiameter}/2)<sup>2</sup> × {result.totalLength.toFixed(2)}
                    </li>
                    <li>
                      <span className="font-semibold">Total Weight:</span> Volume × Density = ... = {result.totalWeight.toFixed(2)} kg
                    </li>
                  </ol>
                </div>
              )}
              {/* Info & FAQ */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">Steel Reinforcement Calculator & Estimator – Accurate, Fast, and Professional</h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">This calculator helps you estimate the total weight and length of steel bars required for reinforcement in construction projects. Enter your bar dimensions and quantity for a precise result.</p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Steel Reinforcement Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get the exact weight and length of steel bars needed for your project.</li>
                    <li>Plan your reinforcement work efficiently and professionally.</li>
                    <li>Save money by avoiding over-ordering or under-ordering steel.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Enter the bar length, diameter, and quantity.</li>
                    <li>The calculator computes the total length and weight using standard steel density.</li>
                    <li>Results are shown instantly and can be used for ordering materials.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Steel Reinforcement Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is a steel reinforcement calculator?</span><br />
                      A tool to calculate the total weight and length of steel bars needed for construction projects.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span><br />
                      Helps in accurate planning, cost-saving, and reducing material wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What units does it support?</span><br />
                      Metric (m, mm) and Imperial (ft, mm).
                    </div>
                    <div>
                      <span className="font-semibold">Q4. How is steel weight calculated?</span><br />
                      Using the formula: π × (Diameter/2)<sup>2</sup> × Length × Density.
                    </div>
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
