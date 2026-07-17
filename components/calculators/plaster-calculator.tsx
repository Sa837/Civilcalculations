'use client'

import { useState, useEffect, useCallback } from 'react'
import { Info, CheckCircle, RotateCcw, Eye, EyeOff, Calculator, FileText, FileDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { PlasterCalculator as PlasterCalculatorLib } from '@/lib/registry/calculator/plaster-calculator'
import { PLASTER_INFO_SECTION } from '@/lib/registry/calculator/enhanced-info-section/plaster-info-section'
import { exportEstimatePdf, exportEstimateText, exportEstimateXlsx } from './professional-estimate-utils'
import {
  PremiumFeatureGate,
  PremiumLockedButton,
  PremiumLockedAction,
} from './advanced-estimate-gate'

const CALC_ID = 'plaster'

interface PlasterResult {
  plasterVolume: number
  cementBags: number
  sandWeight: number
}

interface PlasterFormData {
  length: string
  height: string
  thickness: string
  area?: string
  unit: 'metric' | 'imperial'
  showStepByStep: boolean
}

export default function PlasterCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [useArea, setUseArea] = useState(false)
  const [formData, setFormData] = useState<PlasterFormData>({
    length: '',
    height: '',
    thickness: '',
    area: '',
    unit: globalUnit === 'm' ? 'metric' : 'imperial',
    showStepByStep: false,
  })
  const [result, setResult] = useState<PlasterResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasCalculated, setHasCalculated] = useState(false)

  const exportSummary = useCallback(() => {
    if (!result) return
    const rows = [
      { label: 'Plaster Volume', value: result.plasterVolume.toFixed(3), unit: 'm³' },
      { label: 'Cement Bags', value: result.cementBags.toFixed(2), unit: 'bags' },
      { label: 'Sand Weight', value: result.sandWeight.toFixed(2), unit: 'kg' },
    ]
    exportEstimateText('Plaster Estimate', rows)
    exportEstimatePdf('Plaster Estimate', rows)
    exportEstimateXlsx('Plaster Estimate', rows)
  }, [result])

  const calculate = useCallback(() => {
    const unitSystem = formData.unit
    const useAreaLocal = useArea
    const length = formData.length ? parseFloat(formData.length) : undefined
    const height = formData.height ? parseFloat(formData.height) : undefined
    const area = formData.area ? parseFloat(formData.area) : undefined
    const thickness = formData.thickness ? parseFloat(formData.thickness) : 0

    const res = PlasterCalculatorLib.calculate({
      length,
      height,
      area,
      thickness,
      unitSystem: unitSystem,
      useArea: useAreaLocal,
    })

    setResult(res)
  }, [formData, useArea])

  useEffect(() => {
    if (!hasCalculated) return
    const hasRequired = useArea
      ? formData.area && formData.thickness
      : formData.length && formData.height && formData.thickness
    if (hasRequired) {
      calculate()
    } else {
      setResult(null)
    }
  }, [formData, useArea, hasCalculated, calculate])

  return (
    <div className="font-display mx-auto max-w-4xl p-6">
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
              <h1 className="text-2xl font-bold text-heading dark:text-heading-dark">
                Plaster Calculator
              </h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Estimate plaster volume, cement, and sand for wall finishing
              </p>
            </div>
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="flex justify-center mb-8">
          <svg
            width="320"
            height="100"
            viewBox="0 0 320 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            <rect
              x="60"
              y="30"
              width="200"
              height="40"
              rx="8"
              fill="#f1f5f9"
              stroke="#64748b"
              strokeWidth="2"
            />
            <rect
              x="60"
              y="30"
              width="18"
              height="40"
              rx="6"
              fill="#eab308"
              stroke="#b45309"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <circle cx="70" cy="50" r="2.2" fill="#b45309" opacity="0.18" />
            <circle cx="80" cy="60" r="1.8" fill="#b45309" opacity="0.18" />
            <line
              x1="60"
              y1="80"
              x2="260"
              y2="80"
              stroke="#64748b"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
              markerStart="url(#arrow)"
            />
            <text x="160" y="95" textAnchor="middle" fontSize="14" fill="#334155">
              Length
            </text>
            <line
              x1="50"
              y1="30"
              x2="50"
              y2="70"
              stroke="#64748b"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
              markerStart="url(#arrow)"
            />
            <text
              x="38"
              y="50"
              textAnchor="middle"
              fontSize="14"
              fill="#334155"
              transform="rotate(-90 38,50)"
            >
              Height
            </text>
            <line
              x1="60"
              y1="25"
              x2="78"
              y2="25"
              stroke="#b45309"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
              markerStart="url(#arrow)"
            />
            <text x="69" y="18" textAnchor="middle" fontSize="13" fill="#b45309">
              Thickness
            </text>
            <defs>
              <marker
                id="arrow"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Area/Length Toggle */}
        <div className="flex flex-wrap justify-end gap-2 mb-4 px-4 sm:px-8 pt-4 sm:pt-8">
          <button
            type="button"
            onClick={() => setUseArea(!useArea)}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-6 py-2   font-medium shadow-soft transition-all text-sm sm:text-base whitespace-nowrap
              ${useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}
          >
            <Info className="h-4 w-4" />
            {useArea ? 'Use Length & Height' : 'Use Area'}
          </button>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {!useArea && (
              <>
                <div>
                  <label className="mb-2 block   font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                    Length ({formData.unit === 'metric' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={(e) => setFormData((f) => ({ ...f, length: e.target.value }))}
                    step="0.001"
                    min="0"
                    placeholder="Enter length"
                    className="w-full rounded-xl border px-3 sm:px-4 py-2 sm:py-3 font-sans text-sm border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="mb-2 block   font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                    Height ({formData.unit === 'metric' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData((f) => ({ ...f, height: e.target.value }))}
                    step="0.001"
                    min="0"
                    placeholder="Enter height"
                    className="w-full rounded-xl border px-3 sm:px-4 py-2 sm:py-3 font-sans text-sm border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  />
                </div>
              </>
            )}
            {useArea && (
              <div>
                <label className="mb-2 block   font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                  Area ({formData.unit === 'metric' ? 'm²' : 'ft²'})
                </label>
                <input
                  type="number"
                  value={formData.area || ''}
                  onChange={(e) => setFormData((f) => ({ ...f, area: e.target.value }))}
                  step="0.001"
                  min="0"
                  placeholder="Enter area"
                  className="w-full rounded-xl border px-3 sm:px-4 py-2 sm:py-3 font-sans text-sm border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                />
              </div>
            )}
            <div>
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                Thickness (mm)
              </label>
              <input
                type="number"
                value={formData.thickness}
                onChange={(e) => setFormData((f) => ({ ...f, thickness: e.target.value }))}
                step="0.1"
                min="0"
                placeholder="Enter thickness"
                className="w-full rounded-xl border px-3 sm:px-4 py-2 sm:py-3 font-sans text-sm border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Action Buttons - Responsive */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    length: '',
                    height: '',
                    area: '',
                    thickness: '12',
                    unit: formData.unit,
                    showStepByStep: false,
                  })
                  setHasCalculated(false)
                  setResult(null)
                  setErrors({})
                }}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-300 bg-white px-3 sm:px-6 py-2 sm:py-3   font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700 text-xs sm:text-sm whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Reset
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, showStepByStep: !prev.showStepByStep }))
                }
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3   font-medium transition-colors text-xs sm:text-sm whitespace-nowrap ${
                  formData.showStepByStep
                    ? 'bg-primary text-white'
                    : 'border border-slate-300 bg-white text-heading dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark'
                }`}
              >
                {formData.showStepByStep ? (
                  <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {formData.showStepByStep ? 'Hide' : 'Show'} step-by-step
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setHasCalculated(true)
                calculate()
              }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-4 sm:px-8 py-2 sm:py-3   font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover text-xs sm:text-sm whitespace-nowrap"
            >
              <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Calculate
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {hasCalculated && result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-4 sm:p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
            >
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="  text-lg sm:text-xl font-semibold text-heading dark:text-heading-dark">
                  Calculation Results
                </h2>
              </div>
              <div className="mb-8 overflow-hidden rounded-xl border border-slate-200/20 bg-white/70 dark:border-slate-700/30 dark:bg-slate-900/60">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[300px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left   font-semibold text-heading dark:text-heading-dark text-sm">
                          Material
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-right   font-semibold text-heading dark:text-heading-dark text-sm">
                          Quantity
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left   font-semibold text-heading dark:text-heading-dark text-sm">
                          Unit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/30">
                      <tr>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-heading dark:text-heading-dark text-sm">
                          Plaster Volume
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right font-mono font-semibold text-sm">
                          {result.plasterVolume.toFixed(3)}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-body/70 dark:text-body-dark/70 text-sm">
                          m³
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-heading dark:text-heading-dark text-sm">
                          Cement
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right font-mono font-semibold text-sm">
                          {result.cementBags.toFixed(2)}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-body/70 dark:text-body-dark/70 text-sm">
                          bags
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-heading dark:text-heading-dark text-sm">
                          Sand
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right font-mono font-semibold text-sm">
                          {result.sandWeight.toFixed(1)}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-body/70 dark:text-body-dark/70 text-sm">
                          kg
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Premium Features */}
              <PremiumFeatureGate
                calculatorId={CALC_ID}
                title="Plaster Estimate Summary"
                description="Watch the ad to unlock step-by-step calculation breakdown and export options."
              >
                {/* Step-by-step Calculation */}
                {formData.showStepByStep && (
                  <div className="mb-8 rounded-xl border border-blue-200/40 bg-blue-50 p-4 sm:p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                    <h3 className="mb-4   text-base sm:text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      Step-by-Step Calculation
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-blue-900 dark:text-blue-100">
                      <li>
                        Area = {useArea ? formData.area : `${formData.length} × ${formData.height}`}{' '}
                        {formData.unit === 'metric' ? 'm²' : 'ft²'}
                      </li>
                      <li>
                        Thickness = {formData.thickness} mm ={' '}
                        {(Number(formData.thickness) / 1000).toFixed(3)} m
                      </li>
                      <li>
                        Wet Volume = Area × Thickness ={' '}
                        {useArea
                          ? formData.area
                          : (Number(formData.length) * Number(formData.height)).toFixed(2)}{' '}
                        × {(Number(formData.thickness) / 1000).toFixed(3)} ={' '}
                        {(
                          ((useArea
                            ? Number(formData.area)
                            : Number(formData.length) * Number(formData.height)) *
                            Number(formData.thickness)) /
                          1000
                        ).toFixed(3)}{' '}
                        m³
                      </li>
                      <li>
                        Dry Volume = Wet Volume × 1.27 ={' '}
                        {(
                          (((useArea
                            ? Number(formData.area)
                            : Number(formData.length) * Number(formData.height)) *
                            Number(formData.thickness)) /
                            1000) *
                          1.27
                        ).toFixed(3)}{' '}
                        m³
                      </li>
                      <li>
                        Cement = (Dry Volume / 7) × 1.5 × Density / 50 ={' '}
                        {result.cementBags.toFixed(2)} bags
                      </li>
                      <li>
                        Sand = (Dry Volume / 7) × 5.5 × Density = {result.sandWeight.toFixed(1)} kg
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
      </motion.div>

      <PLASTER_INFO_SECTION />
    </div>
  )
}
