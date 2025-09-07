"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, RotateCcw, Eye, EyeOff, Info, CheckCircle } from 'lucide-react'

interface EarthworkResult {
  volume: number
}

interface EarthworkFormData {
  length: string
  width: string
  depth: string
  unit: 'm' | 'ft'
  showStepByStep: boolean
}
export default function EarthworkCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [formData, setFormData] = useState<EarthworkFormData>({ length: '', width: '', depth: '', unit: globalUnit, showStepByStep: false })
  const [result, setResult] = useState<EarthworkResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setFormData(prev => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.length || parseFloat(formData.length) <= 0) newErrors.length = 'Enter a valid length'
    if (!formData.width || parseFloat(formData.width) <= 0) newErrors.width = 'Enter a valid width'
    if (!formData.depth || parseFloat(formData.depth) <= 0) newErrors.depth = 'Enter a valid depth'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateEarthwork = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    try {
      const unitFactor = formData.unit === 'm' ? 1 : 0.3048
      const length = parseFloat(formData.length) * unitFactor
      const width = parseFloat(formData.width) * unitFactor
      const depth = parseFloat(formData.depth) * unitFactor
      const volume = length * width * depth
      setResult({ volume })
    } finally {
      setIsCalculating(false)
    }
  }

  const resetForm = () => {
    setFormData({ length: '', width: '', depth: '', unit: globalUnit, showStepByStep: false })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  const handleInputChange = (field: keyof EarthworkFormData, value: string) => {
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
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Earthwork Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Calculate earthwork volume for excavation or filling.</p>
            </div>
          </div>
        </div>
        {/* Earthwork Diagram */}
        <div className="flex justify-center mb-8">
          <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="30" width="140" height="70" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
            <text x="110" y="25" textAnchor="middle" fontSize="13" fill="#2563eb">Depth</text>
            <text x="110" y="115" textAnchor="middle" fontSize="13" fill="#334155">Length</text>
            <text x="190" y="70" fontSize="13" fill="#334155">Width</text>
          </svg>
        </div>
        {/* Form */}
        <form className="px-8 py-8" onSubmit={e => { e.preventDefault(); calculateEarthwork(); }}>
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
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Width ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.width}
                onChange={e => handleInputChange('width', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter width"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.width ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.width && <div className="text-red-600 text-xs mt-1 flex items-center gap-1"><Info className="h-4 w-4" />{errors.width}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Depth ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.depth}
                onChange={e => handleInputChange('depth', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter depth"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.depth ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.depth && <div className="text-red-600 text-xs mt-1 flex items-center gap-1"><Info className="h-4 w-4" />{errors.depth}</div>}
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
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Earthwork Volume</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Volume:</span>
                      <span className="font-mono font-semibold">{result.volume.toFixed(3)} m³</span>
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
                    <li>Convert all dimensions to meters if needed.</li>
                    <li>Calculate <b>Volume</b>: <code>Length × Width × Depth</code> = <b>{formData.length} × {formData.width} × {formData.depth}</b></li>
                    <li>Result: <b>{result.volume.toFixed(3)} m³</b></li>
                  </ol>
                </div>
              )}
              {/* Info & FAQ */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">Earthwork Calculator – Accurate, Fast, and Professional</h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">This calculator helps you estimate the earthwork volume for excavation or filling. Enter your site dimensions and unit for a precise result.</p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use an Earthwork Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get the exact earthwork volume for your project.</li>
                    <li>Plan your excavation or filling efficiently and professionally.</li>
                    <li>Save money by ordering the right amount of material.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Enter the length, width, depth, and select the unit.</li>
                    <li>The calculator computes the volume using standard formulas.</li>
                    <li>Results are shown instantly and can be used for ordering materials.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Earthwork Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is an earthwork calculator?</span><br />
                      A tool to estimate the volume of earth to be excavated or filled.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span><br />
                      Helps in accurate planning, cost-saving, and reducing material wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What units does it support?</span><br />
                      Metric (m) and Imperial (ft) for input; results in m³.
                    </div>
                    <div>
                      <span className="font-semibold">Q4. How is volume calculated?</span><br />
                      Using the standard formula: Length × Width × Depth.
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
