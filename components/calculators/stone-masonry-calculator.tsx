"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, RotateCcw, Eye, EyeOff, Info, CheckCircle } from 'lucide-react'
import { StoneMasonryCalculatorLib } from '@/lib/registry/calculator/stone-masonry-calculator'

interface StoneMasonryResult {
  volume: number
  cementBags: number
  sandWeight: number
  human_summary?: string
}

interface StoneMasonryFormData {
  length: string
  height: string
  thickness: string
  unit: 'm' | 'ft'
  showStepByStep: boolean
}

const DENSITIES = { cement: 1440, sand: 1450, cementBag: 50 }

export default function StoneMasonryCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [formData, setFormData] = useState<StoneMasonryFormData>({ length: '', height: '', thickness: '', unit: globalUnit, showStepByStep: false })
  const [result, setResult] = useState<StoneMasonryResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setFormData(prev => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.length || parseFloat(formData.length) <= 0) newErrors.length = 'Enter a valid length'
    if (!formData.height || parseFloat(formData.height) <= 0) newErrors.height = 'Enter a valid height'
    if (!formData.thickness || parseFloat(formData.thickness) <= 0) newErrors.thickness = 'Enter a valid thickness'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateMasonry = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    try {
      const res = StoneMasonryCalculatorLib.calculate({
       length: parseFloat(formData.length),
       height: parseFloat(formData.height),
       thickness: parseFloat(formData.thickness),
       unit: formData.unit,
      })
      setResult({ volume: res.volume, cementBags: res.cementBags, sandWeight: res.sandWeight, human_summary: res.human_summary })
    } finally {
      setIsCalculating(false)
    }
  }

  const resetForm = () => {
    setFormData({ length: '', height: '', thickness: '', unit: globalUnit, showStepByStep: false })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  const handleInputChange = (field: keyof StoneMasonryFormData, value: string) => {
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
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Stone Masonry Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Calculate stone masonry volume, cement, and sand requirements.</p>
            </div>
          </div>
        </div>
        {/* SVG Diagram for Stone Masonry */}
        <div className="flex justify-center mb-8">
          <svg width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Wall outline */}
            <rect x="40" y="30" width="240" height="60" rx="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            {/* Stones */}
            <rect x="50" y="40" width="40" height="20" fill="#b6a16b" stroke="#7c6f4c" strokeWidth="1.5" />
            <rect x="95" y="40" width="35" height="20" fill="#b6a16b" stroke="#7c6f4c" strokeWidth="1.5" />
            <rect x="135" y="40" width="50" height="20" fill="#b6a16b" stroke="#7c6f4c" strokeWidth="1.5" />
            <rect x="190" y="40" width="40" height="20" fill="#b6a16b" stroke="#7c6f4c" strokeWidth="1.5" />
            <rect x="235" y="40" width="35" height="20" fill="#b6a16b" stroke="#7c6f4c" strokeWidth="1.5" />
            {/* Second row */}
            <rect x="60" y="65" width="35" height="15" fill="#cfc09f" stroke="#7c6f4c" strokeWidth="1.2" />
            <rect x="100" y="65" width="45" height="15" fill="#cfc09f" stroke="#7c6f4c" strokeWidth="1.2" />
            <rect x="150" y="65" width="35" height="15" fill="#cfc09f" stroke="#7c6f4c" strokeWidth="1.2" />
            <rect x="190" y="65" width="50" height="15" fill="#cfc09f" stroke="#7c6f4c" strokeWidth="1.2" />
            <rect x="245" y="65" width="25" height="15" fill="#cfc09f" stroke="#7c6f4c" strokeWidth="1.2" />
            {/* Dimension lines */}
            <line x1="40" y1="100" x2="280" y2="100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="160" y="115" textAnchor="middle" fontSize="14" fill="#334155">Length</text>
            <line x1="30" y1="30" x2="30" y2="90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="15" y="65" textAnchor="middle" fontSize="14" fill="#334155" transform="rotate(-90 15,65)">Height</text>
            <line x1="40" y1="25" x2="80" y2="25" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="60" y="18" textAnchor="middle" fontSize="13" fill="#334155">Thickness</text>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        {/* Form */}
        <form className="px-8 py-8" onSubmit={e => { e.preventDefault(); calculateMasonry(); }}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Length ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.length}
                onChange={e => handleInputChange('length', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter length"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.length ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.length && <div className="text-red-600 text-xs mt-1 flex items-center gap-1"><Info className="h-4 w-4" />{errors.length}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Height ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.height}
                onChange={e => handleInputChange('height', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter height"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.height ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.height && <div className="text-red-600 text-xs mt-1 flex items-center gap-1"><Info className="h-4 w-4" />{errors.height}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Thickness ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.thickness}
                onChange={e => handleInputChange('thickness', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter thickness"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.thickness ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.thickness && <div className="text-red-600 text-xs mt-1 flex items-center gap-1"><Info className="h-4 w-4" />{errors.thickness}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Unit</label>
              <select
                value={formData.unit}
                onChange={e => handleInputChange('unit', e.target.value as 'm' | 'ft')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="m">Metric (m)</option>
                <option value="ft">Imperial (ft)</option>
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
                disabled={!result}
              >
                {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showSteps ? 'Hide Steps' : 'Show Steps'}
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
        </form>
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
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Stone Masonry Dry Volume</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Dry Volume:</span>
                      <span className="font-mono font-semibold">{result.volume.toFixed(3)} m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Cement Required:</span>
                      <span className="font-mono font-semibold">{result.cementBags.toFixed(2)} bags</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Sand Required:</span>
                      <span className="font-mono font-semibold">{result.sandWeight.toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Optional engineering summary (non-invasive) */}
              {result.human_summary && (
                <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <b>Engineering Summary:</b> {result.human_summary}
                </div>
              )}
              {/* Steps */}
              {showSteps && result && (
                <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4 font-display text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    Step-by-Step Calculation
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    <li>Convert all dimensions to meters if needed.</li>
                    <li>Calculate <b>Wet Volume</b>: <code>Length × Height × Thickness</code> = <b>{formData.length} × {formData.height} × {formData.thickness}</b></li>
                    <li>Convert to <b>Dry Volume</b> (add 27%): <code>Wet Volume × 1.27</code> = <b>{result.volume.toFixed(3)} m³</b></li>
                    <li>Calculate <b>Cement</b> (1.5 parts of 7): <code>Dry Volume / 7 × 1.5 × 1440</code> (kg), then divide by 50 for bags.</li>
                    <li>Calculate <b>Sand</b> (5.5 parts of 7): <code>Dry Volume / 7 × 5.5 × 1450</code> (kg).</li>
                  </ol>
                </div>
              )}
              {/* Info & FAQ */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">Stone Masonry Calculator – Accurate, Fast, and Professional</h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">This calculator helps you estimate the dry volume, cement, and sand required for stone masonry. Enter your wall dimensions and unit for a precise result.</p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Stone Masonry Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get the exact dry volume and material requirements for your stone masonry project.</li>
                    <li>Plan your construction efficiently and professionally.</li>
                    <li>Save money by ordering the right amount of cement and sand.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Enter the wall length, height, thickness, and select the unit.</li>
                    <li>The calculator computes the dry volume, cement, and sand using standard mix ratios and densities.</li>
                    <li>Results are shown instantly and can be used for ordering materials.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Stone Masonry Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is a stone masonry calculator?</span><br />
                      A tool to estimate the dry volume, cement, and sand required for stone masonry construction.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span><br />
                      Helps in accurate planning, cost-saving, and reducing material wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What units does it support?</span><br />
                      Metric (m) and Imperial (ft) for input; results in m³, bags, and kg.
                    </div>
                    <div>
                      <span className="font-semibold">Q4. How are quantities calculated?</span><br />
                      Using standard mix ratios and density values for cement and sand.
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
