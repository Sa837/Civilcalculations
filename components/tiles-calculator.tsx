"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, RotateCcw, Eye, EyeOff, Info, CheckCircle } from 'lucide-react'


interface TilesResult {
  tilesNeeded: number
  area: number
}


interface TilesFormData {
  length: string
  width: string
  area?: string
  tileLength: string
  tileWidth: string
  wastage: string
  unit: 'm' | 'ft'
}


const UNIT_CONVERSIONS = { m: { length: 1, area: 1 }, ft: { length: 0.3048, area: 0.092903 } }

export default function TilesCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [useArea, setUseArea] = useState(false)
  const [formData, setFormData] = useState<TilesFormData>({ length: '', width: '', area: '', tileLength: '', tileWidth: '', wastage: '5', unit: globalUnit })
  const [result, setResult] = useState<TilesResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setFormData(prev => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (useArea) {
      if (!formData.area || parseFloat(formData.area) <= 0) newErrors.area = 'Enter a valid area'
    } else {
      if (!formData.length || parseFloat(formData.length) <= 0) newErrors.length = 'Enter a valid length'
      if (!formData.width || parseFloat(formData.width) <= 0) newErrors.width = 'Enter a valid width'
    }
    if (!formData.tileLength || parseFloat(formData.tileLength) <= 0) newErrors.tileLength = 'Enter a valid tile length'
    if (!formData.tileWidth || parseFloat(formData.tileWidth) <= 0) newErrors.tileWidth = 'Enter a valid tile width'
    if (!formData.wastage || parseFloat(formData.wastage) < 0 || parseFloat(formData.wastage) > 30) newErrors.wastage = 'Wastage must be 0–30%'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateTiles = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    try {
      let area = useArea && formData.area ? parseFloat(formData.area) : (parseFloat(formData.length) * parseFloat(formData.width))
      if (formData.unit === 'ft') area *= 0.092903
      const tileArea = (parseFloat(formData.tileLength) * parseFloat(formData.tileWidth)) / 10000
      let tilesNeeded = area / tileArea
      tilesNeeded *= 1 + parseFloat(formData.wastage) / 100
      setResult({ tilesNeeded: Math.ceil(tilesNeeded), area })
    } finally {
      setIsCalculating(false)
    }
  }

  const resetForm = () => {
    setFormData({ length: '', width: '', area: '', tileLength: '', tileWidth: '', wastage: '5', unit: globalUnit })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  const handleInputChange = (field: keyof TilesFormData, value: string) => {
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
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Tiles Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Estimate number of tiles and wastage for flooring or wall tiling.</p>
            </div>
          </div>
        </div>
        {/* Area/Tile Diagram */}
        <div className="flex justify-center mb-8">
          <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="30" width="140" height="70" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
            <rect x="60" y="50" width="40" height="20" fill="#c7d2fe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="110" y="25" textAnchor="middle" fontSize="13" fill="#2563eb">Length</text>
            <text x="110" y="115" textAnchor="middle" fontSize="13" fill="#334155">Width</text>
            <text x="80" y="45" textAnchor="middle" fontSize="12" fill="#64748b">Tile</text>
            <text x="80" y="85" textAnchor="middle" fontSize="11" fill="#64748b">Tile Length</text>
            <text x="105" y="65" textAnchor="start" fontSize="11" fill="#64748b">Tile Width</text>
            <text x="190" y="70" fontSize="13" fill="#334155">Area</text>
          </svg>
        </div>
        {/* Form */}
        <div className="p-8">
          <div className="flex justify-end gap-4 mb-4">
            <button
              type="button"
              onClick={() => setUseArea(!useArea)}
              className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all 
    ${useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}
            >
              <Info className="h-4 w-4" />
              {useArea ? "Use Length & Width" : "Use Area"}
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {!useArea && (
              <>
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Length</label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={e => handleInputChange('length', e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter length (${formData.unit === 'm' ? 'm' : 'ft'})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.length ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                  />
                  {errors.length && <div className="text-red-600 text-xs mt-1">{errors.length}</div>}
                </div>
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Width</label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={e => handleInputChange('width', e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter width (${formData.unit === 'm' ? 'm' : 'ft'})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.width ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                  />
                  {errors.width && <div className="text-red-600 text-xs mt-1">{errors.width}</div>}
                </div>
              </>
            )}
            {useArea && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Area</label>
                <input
                  type="number"
                  value={formData.area || ''}
                  onChange={e => handleInputChange('area', e.target.value)}
                  step="0.001"
                  min="0"
                  placeholder="Enter total area"
                  className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.area ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                />
                {errors.area && <div className="text-red-600 text-xs mt-1">{errors.area}</div>}
              </div>
            )}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Tile Length (cm)</label>
              <input
                type="number"
                value={formData.tileLength}
                onChange={e => handleInputChange('tileLength', e.target.value)}
                step="0.1"
                min="0"
                placeholder="Tile length (cm)"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.tileLength ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.tileLength && <div className="text-red-600 text-xs mt-1">{errors.tileLength}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Tile Width (cm)</label>
              <input
                type="number"
                value={formData.tileWidth}
                onChange={e => handleInputChange('tileWidth', e.target.value)}
                step="0.1"
                min="0"
                placeholder="Tile width (cm)"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.tileWidth ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.tileWidth && <div className="text-red-600 text-xs mt-1">{errors.tileWidth}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Wastage (%)</label>
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
              {errors.wastage && <div className="text-red-600 text-xs mt-1">{errors.wastage}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Unit</label>
              <select
                value={formData.unit}
                onChange={e => handleInputChange('unit', e.target.value as 'm' | 'ft')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="m">Metric (m, m²)</option>
                <option value="ft">Imperial (ft, ft²)</option>
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
              onClick={calculateTiles}
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
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Tiles Needed</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Tiles Needed:</span>
                      <span className="font-mono font-semibold">{result.tilesNeeded}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Total Area</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Total Area:</span>
                      <span className="font-mono font-semibold">{result.area.toFixed(2)} m²</span>
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
                      <span className="font-semibold">Area:</span> {useArea ? `${formData.area} m² (direct input)` : `Length × Width = ${formData.length} × ${formData.width} = ${(parseFloat(formData.length) * parseFloat(formData.width)).toFixed(2)} m²`}
                    </li>
                    <li>
                      <span className="font-semibold">Tile Area:</span> {formData.tileLength} × {formData.tileWidth} / 10,000 = {(parseFloat(formData.tileLength) * parseFloat(formData.tileWidth) / 10000).toFixed(4)} m²
                    </li>
                    <li>
                      <span className="font-semibold">Tiles Needed (before wastage):</span> Area / Tile Area = {(result.area / (parseFloat(formData.tileLength) * parseFloat(formData.tileWidth) / 10000)).toFixed(2)}
                    </li>
                    <li>
                      <span className="font-semibold">Tiles Needed (after wastage):</span> Tiles Needed × (1 + {formData.wastage}% wastage) = {result.tilesNeeded}
                    </li>
                  </ol>
                </div>
              )}
              {/* Info & FAQ */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">Tiles Calculator & Estimator – Accurate, Fast, and Professional</h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">This Tiles Calculator helps you estimate the number of tiles required for your flooring or wall tiling project, including wastage for cutting and breakage. Enter your dimensions, tile size, and wastage factor for a precise result.</p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Tiles Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get the exact number of tiles needed for your project.</li>
                    <li>Account for wastage due to cutting, breakage, and future repairs.</li>
                    <li>Save money by avoiding over-ordering or under-ordering tiles.</li>
                    <li>Plan your tiling project efficiently and professionally.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Enter the floor/wall dimensions or total area, tile size, and wastage percentage.</li>
                    <li>Wastage accounts for cutting, breakage, and future repairs (default 5%).</li>
                    <li>Results are rounded up to the next whole tile.</li>
                    <li>Switch between Metric and Imperial units as needed.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Tiles Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is a tiles calculator?</span><br />
                      A tool to calculate the number of tiles needed for your project, including wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span><br />
                      Helps in accurate planning, cost-saving, and reducing material wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What units does it support?</span><br />
                      Metric (m, m²) and Imperial (ft, ft²).
                    </div>
                    <div>
                      <span className="font-semibold">Q4. How to account for wastage?</span><br />
                      Enter a wastage percentage (default 5%) to cover cutting and breakage.
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
