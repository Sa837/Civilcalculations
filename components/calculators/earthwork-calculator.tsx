'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, RotateCcw, Eye, EyeOff, Info, CheckCircle, FileText } from 'lucide-react'
import { EarthworkCalculatorLib } from '@/lib/registry/calculator/earthwork-calculator'
import { EARTHWORK_INFO_SECTION } from '@/lib/registry/calculator/enhanced-info-section/earthwork-info-section'
import { exportEstimatePdf, exportEstimateText, exportEstimateXlsx } from './professional-estimate-utils'
import {
  PremiumFeatureGate,
  PremiumLockedButton,
  PremiumLockedAction,
} from './advanced-estimate-gate'

const CALC_ID = 'earthwork'
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
  const [formData, setFormData] = useState<EarthworkFormData>({
    length: '',
    width: '',
    depth: '',
    unit: globalUnit,
    showStepByStep: false,
  })
  const [result, setResult] = useState<EarthworkResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setFormData((prev) => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.length || parseFloat(formData.length) <= 0)
      newErrors.length = 'Enter a valid length'
    if (!formData.width || parseFloat(formData.width) <= 0) newErrors.width = 'Enter a valid width'
    if (!formData.depth || parseFloat(formData.depth) <= 0) newErrors.depth = 'Enter a valid depth'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const exportSummary = useCallback(() => {
    if (!result) return
    const rows = [{ label: 'Earthwork Volume', value: result.volume.toFixed(3), unit: 'm³' }]
    exportEstimateText('Earthwork Estimate', rows)
    exportEstimatePdf('Earthwork Estimate', rows)
    exportEstimateXlsx('Earthwork Estimate', rows)
  }, [result])

  const calculateEarthwork = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    try {
      const res = EarthworkCalculatorLib.calculate({
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        depth: parseFloat(formData.depth),
        unit: formData.unit,
      })
      setResult({ volume: res.volume })
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
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <div className="mx-auto max-w-4xl p-6 font-display">
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
              <h1 className="  text-2xl font-bold text-heading dark:text-heading-dark">
                Earthwork Calculator
              </h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Calculate earthwork volume for excavation or filling.
              </p>
            </div>
          </div>
        </div>
        {/* Earthwork Diagram */}
        <div className="flex justify-center mb-8">
          <svg
            width="220"
            height="120"
            viewBox="0 0 220 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="40"
              y="30"
              width="140"
              height="70"
              fill="#e0e7ef"
              stroke="#2563eb"
              strokeWidth="2"
            />
            <text x="110" y="25" textAnchor="middle" fontSize="13" fill="#2563eb">
              Depth
            </text>
            <text x="110" y="115" textAnchor="middle" fontSize="13" fill="#334155">
              Length
            </text>
            <text x="190" y="70" fontSize="13" fill="#334155">
              Width
            </text>
          </svg>
        </div>
        {/* Form */}
        <form
          className="px-4 sm:px-6 md:px-8 py-6 sm:py-8"
          onSubmit={(e) => {
            e.preventDefault()
            calculateEarthwork()
          }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
                Length ({formData.unit === 'm' ? 'm' : 'ft'})
              </label>
              <input
                type="number"
                value={formData.length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter length"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.length ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.length && (
                <div className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  {errors.length}
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
                Width ({formData.unit === 'm' ? 'm' : 'ft'})
              </label>
              <input
                type="number"
                value={formData.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter width"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.width ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.width && (
                <div className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  {errors.width}
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
                Depth ({formData.unit === 'm' ? 'm' : 'ft'})
              </label>
              <input
                type="number"
                value={formData.depth}
                onChange={(e) => handleInputChange('depth', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter depth"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.depth ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.depth && (
                <div className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  {errors.depth}
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value as 'm' | 'ft')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="m">Metric (m)</option>
                <option value="ft">Imperial (ft)</option>
              </select>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-300 bg-white px-3 sm:px-6 py-2 sm:py-3   font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700 text-xs sm:text-sm whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-300 bg-white px-3 sm:px-6 py-2 sm:py-3   font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700 text-xs sm:text-sm whitespace-nowrap"
                disabled={!result}
              >
                {showSteps ? (
                  <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </button>
            </div>
            <button
              type="submit"
              disabled={isCalculating}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-4 sm:px-8 py-2 sm:py-3   font-semibold text-white shadow-soft hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
            >
              {isCalculating ? (
                <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
                <h2 className="  text-xl font-semibold text-heading dark:text-heading-dark">
                  Calculation Results
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4   font-semibold text-heading dark:text-heading-dark">
                    Earthwork Volume
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Volume:</span>
                      <span className="font-mono font-semibold">{result.volume.toFixed(3)} m³</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Premium Features */}
              <PremiumFeatureGate
                calculatorId={CALC_ID}
                title="Earthwork Estimate Summary"
                description="Watch the ad to unlock step-by-step calculation breakdown and export options."
              >
                {/* Steps */}
                {showSteps && result && (
                  <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                    <h3 className="mb-4   text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                      Step-by-Step Calculation
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                      <li>Convert all dimensions to meters if needed.</li>
                      <li>
                        Calculate <b>Volume</b>: <code>Length × Width × Depth</code> ={' '}
                        <b>
                          {formData.length} × {formData.width} × {formData.depth}
                        </b>
                      </li>
                      <li>
                        Result: <b>{result.volume.toFixed(3)} m³</b>
                      </li>
                    </ol>
                  </div>
                )}

                {/* Export Buttons */}
                <div className="flex flex-wrap gap-3">
                  <PremiumLockedAction
                    calculatorId={CALC_ID}
                    onAuthorizedClick={exportSummary}
                    className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium dark:border-slate-600 dark:bg-slate-800"
                  >
                    <FileText className="h-4 w-4" />
                    Export Estimate
                  </PremiumLockedAction>
                </div>
              </PremiumFeatureGate>
            </motion.div>
          )}
        </AnimatePresence>
        <EARTHWORK_INFO_SECTION />
      </motion.div>
    </div>
  )
}
