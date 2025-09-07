"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, AlertCircle, CheckCircle, RotateCcw, Info } from 'lucide-react'

interface CalculationResult {
  wetVolume: number
  dryVolume: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  aggregateWeight: number
  mixRatio: string
  area?: number
}

interface FormData {
  length: string
  width: string
  height: string
  area?: string
  mixType: string
  wastage: string
  unit: 'metric' | 'imperial'
}


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

const DENSITIES = {
  cement: 1440, // kg/m³
  sand: 1450,
  aggregate: 1500
}

const UNIT_CONVERSIONS = {
  metric: { length: 1, volume: 1 },
  imperial: { length: 0.3048, volume: 0.0283168 } // ft to m, ft³ to m³
}

interface ConcreteCalculatorProps {
  globalUnit?: 'm' | 'ft'
}

export default function ConcreteCalculator({ globalUnit = 'm' }: ConcreteCalculatorProps) {
  const [formData, setFormData] = useState<FormData>({
    length: '',
    width: '',
    height: '',
    area: '',
    mixType: 'M15',
    wastage: '5',
    unit: globalUnit === 'm' ? 'metric' : 'imperial'
  })

  const [useArea, setUseArea] = useState(false) // <-- Move here

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      unit: globalUnit === 'm' ? 'metric' : 'imperial'
    }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if ((!formData.area || parseFloat(formData.area) <= 0) && (!formData.length || parseFloat(formData.length) <= 0)) {
      newErrors.length = 'Enter either area or length & width'
    }

    if (!formData.height || parseFloat(formData.height) <= 0) {
      newErrors.height = 'Height/Thickness must be greater than 0'
    }

    if (!formData.wastage || parseFloat(formData.wastage) < 0 || parseFloat(formData.wastage) > 30) {
      newErrors.wastage = 'Wastage must be between 0% and 30%'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateConcrete = async () => {
    if (!validateForm()) return

    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const wastage = parseFloat(formData.wastage) / 100
      const conversion = UNIT_CONVERSIONS[formData.unit]
      const heightM = parseFloat(formData.height) * conversion.length

      let lengthM = 0, widthM = 0, areaM = 0

      if (useArea && formData.area && parseFloat(formData.area) > 0) {
        areaM = parseFloat(formData.area) * conversion.length * conversion.length
      } else if (
        !useArea &&
        formData.length &&
        formData.width &&
        parseFloat(formData.length) > 0 &&
        parseFloat(formData.width) > 0
      ) {
        lengthM = parseFloat(formData.length) * conversion.length
        widthM = parseFloat(formData.width) * conversion.length
        areaM = lengthM * widthM
      } else {
        setErrors(prev => ({
          ...prev,
          length: 'Please enter valid length and width'
        }))
        setIsCalculating(false)
        return
      }

      const mixType = MIX_TYPES.find(m => m.value === formData.mixType)!
      const { cement: cementRatio, sand: sandRatio, aggregate: aggregateRatio } = mixType.ratios

      const wetVolume = areaM * heightM
      const dryVolume = wetVolume * 1.54

      const totalParts = cementRatio + sandRatio + aggregateRatio
      const cementVolume = (cementRatio / totalParts) * dryVolume
      const sandVolume = (sandRatio / totalParts) * dryVolume
      const aggregateVolume = (aggregateRatio / totalParts) * dryVolume

      const cementWeight = cementVolume * DENSITIES.cement * (1 + wastage)
      const sandWeight = sandVolume * DENSITIES.sand * (1 + wastage)
      const aggregateWeight = aggregateVolume * DENSITIES.aggregate * (1 + wastage)

      const cementBags = cementWeight / 50

      setResult({
        wetVolume: wetVolume * conversion.volume,
        dryVolume: dryVolume * conversion.volume,
        cementWeight,
        cementBags,
        sandWeight,
        aggregateWeight,
        mixRatio: `${cementRatio}:${sandRatio}:${aggregateRatio}`,
        area: areaM / conversion.volume // show converted area
      })
    } catch (error) {
      console.error('Calculation error:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const resetForm = () => {
    setFormData({
      length: '',
      width: '',
      height: '',
      area: '',
      mixType: 'M15',
      wastage: '5',
      unit: globalUnit === 'm' ? 'metric' : 'imperial'
    })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
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
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Concrete Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Calculate concrete volume, cement, sand, and aggregate for slabs, beams, and columns.</p>
            </div>
          </div>
        </div>
        {/* SVG Diagram for Concrete */}
        <div className="flex justify-center mb-8">
          <svg width="320" height="110" viewBox="0 0 320 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Slab */}
            <rect x="40" y="40" width="240" height="30" rx="8" fill="#e0e7ef" stroke="#64748b" strokeWidth="2" />
            {/* Length indicator */}
            <line x1="40" y1="85" x2="280" y2="85" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="160" y="105" textAnchor="middle" fontSize="14" fill="#334155">Length</text>
            {/* Width indicator */}
            <line x1="30" y1="40" x2="30" y2="70" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="10" y="62" fontSize="13" fill="#334155">Width</text>
            {/* Thickness indicator */}
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
        <div className="p-8">
          <div className="flex justify-end gap-4 mb-4">
            {/* Use Area Button */}
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
                {/* Length */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                    Length
                  </label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter length (${formData.unit === 'metric' ? 'm' : 'ft'})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${
                      errors.length
                        ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                        : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                    }`}
                  />
                </div>

                {/* Width */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                    Width
                  </label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => handleInputChange('width', e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter width (${formData.unit === 'metric' ? 'm' : 'ft'})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${
                      errors.width
                        ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                        : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                    }`}
                  />
                </div>
              </>
            )}

            {useArea && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                  Area
                </label>
                <input
                  type="number"
                  value={formData.area || ''}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  step="0.001"
                  min="0"
                  placeholder="Enter total area"
                  className="w-full rounded-xl border px-4 py-3 font-sans border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                />
              </div>
            )}

            {/* Height/Thickness */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Height/Thickness
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                step="0.001"
                min="0"
                placeholder="Enter height/thickness"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${
                  errors.height
                    ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                    : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                }`}
              />
            </div>

            {/* Mix Type */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Concrete Mix Type
              </label>
              <select
                value={formData.mixType}
                onChange={(e) => handleInputChange('mixType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                {MIX_TYPES.map((mix) => (
                  <option key={mix.value} value={mix.value}>
                    {mix.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wastage */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Wastage Factor
              </label>
              <input
                type="number"
                value={formData.wastage}
                onChange={(e) => handleInputChange('wastage', e.target.value)}
                step="0.1"
                min="0"
                max="30"
                placeholder="5"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${
                  errors.wastage
                    ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                    : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                }`}
              />
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
                <Info className="h-4 w-4" />
                Steps
              </button>
            </div>

            <button
              type="button"
              onClick={calculateConcrete}
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
        {/* Results */}
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
                <h2 className="font-display text-xl font-semibold text-heading dark:text-heading-dark">
                  Calculation Results
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Volume Results */}
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Volume
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Wet Volume:</span>
                      <span className="font-mono font-semibold">
                        {result.wetVolume.toFixed(3)} {formData.unit === 'metric' ? 'm³' : 'ft³'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Dry Volume:</span>
                      <span className="font-mono font-semibold">
                        {result.dryVolume.toFixed(3)} {formData.unit === 'metric' ? 'm³' : 'ft³'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cement Results */}
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Cement
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Weight:</span>
                      <span className="font-mono font-semibold">
                        {result.cementWeight.toFixed(1)} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Bags (50kg):</span>
                      <span className="font-mono font-semibold text-primary">
                        {Math.ceil(result.cementBags)} bags
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sand Results */}
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Sand
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Weight:</span>
                      <span className="font-mono font-semibold">
                        {result.sandWeight.toFixed(1)} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Volume:</span>
                      <span className="font-mono font-semibold">
                        {(result.sandWeight / DENSITIES.sand).toFixed(3)} m³
                      </span>
                    </div>
                  </div>
                </div>

                {/* Aggregate Results */}
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Aggregate
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Weight:</span>
                      <span className="font-mono font-semibold">
                        {result.aggregateWeight.toFixed(1)} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Volume:</span>
                      <span className="font-mono font-semibold">
                        {(result.aggregateWeight / DENSITIES.aggregate).toFixed(3)} m³
                      </span>
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
                      <span className="font-semibold">Area:</span>{' '}
                      {formData.area
                        ? `${formData.area} ${formData.unit === 'metric' ? 'm²' : 'ft²'} (direct input)`
                        : `Length × Width = ${formData.length} × ${formData.width} = ${(parseFloat(formData.length) * parseFloat(formData.width)).toFixed(3)} ${formData.unit === 'metric' ? 'm²' : 'ft²'}`}
                    </li>
                    <li>
                      <span className="font-semibold">Height/Thickness:</span> {formData.height} {formData.unit === 'metric' ? 'm' : 'ft'}
                    </li>
                    <li>
                      <span className="font-semibold">Wet Volume:</span> Area × Height = {result.wetVolume.toFixed(3)} {formData.unit === 'metric' ? 'm³' : 'ft³'}
                    </li>
                    <li>
                      <span className="font-semibold">Dry Volume:</span> Wet Volume × 1.54 = {result.dryVolume.toFixed(3)} {formData.unit === 'metric' ? 'm³' : 'ft³'}
                    </li>
                    <li>
                      <span className="font-semibold">Mix Ratio:</span> {result.mixRatio} (Cement : Sand : Aggregate)
                    </li>
                    <li>
                      <span className="font-semibold">Cement Needed:</span> {result.cementWeight.toFixed(1)} kg ({Math.ceil(result.cementBags)} bags)
                    </li>
                    <li>
                      <span className="font-semibold">Sand Needed:</span> {result.sandWeight.toFixed(1)} kg ({(result.sandWeight / DENSITIES.sand).toFixed(3)} m³)
                    </li>
                    <li>
                      <span className="font-semibold">Aggregate Needed:</span> {result.aggregateWeight.toFixed(1)} kg ({(result.aggregateWeight / DENSITIES.aggregate).toFixed(3)} m³)
                    </li>
                  </ol>
                </div>
              )}

              {/* Enhanced Info & FAQ Section */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">
                  Concrete Calculator & Estimator – Simple, Fast, Mobile Friendly & Accurate Material Estimation Tool
                </h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">
                  A Concrete Calculator is an easy-to-use online tool that helps civil engineers, builders, contractors, and DIY enthusiasts quickly estimate the exact quantity of concrete, cement, sand, aggregate, and water required for construction projects. From slabs and beams to columns, footings, and foundations, this tool ensures accurate planning, cost-saving, and minimal material wastage.
                </p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Concrete Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get precise concrete volume in cubic meters or cubic feet.</li>
                    <li>Estimate cement, sand, and aggregate needed for your project.</li>
                    <li>Reduce material waste and save money.</li>
                    <li>Plan construction projects efficiently and avoid delays.</li>
                    <li>Improve construction quality and structural strength.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Select the type of construction: slab, beam, column, footing, or foundation.</li>
                    <li>Enter the project dimensions: length, width (if irregular then direct area), and thickness/height.</li>
                    <li>Choose the concrete mix ratio: M5, M7.5, M10, M15, M20, or M25.</li>
                    <li>
                      Get instant results:
                      <ul className="list-disc list-inside ml-6">
                        <li>Concrete volume (m³ or ft³)</li>
                        <li>Cement quantity (bags)</li>
                        <li>Sand and aggregate volume</li>
                        <li>Water required for the mix</li>
                      </ul>
                    </li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Standard Concrete Mix Ratios</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>M5: 1:5:10 (cement:sand:aggregate)</li>
                    <li>M7.5: 1:4:8</li>
                    <li>M10: 1:3:6</li>
                    <li>M15: 1:2:4</li>
                    <li>M20: 1:1.5:3</li>
                    <li>M25: 1:1:2</li>
                  </ul>
                  <div className="mt-2 text-sm text-body/60 dark:text-body-dark/60">
                    <span className="font-semibold">Tip:</span> The first number represents cement, the second sand, and the third aggregate. Choose the mix ratio according to project strength requirements.
                  </div>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Concrete Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is a concrete calculator?</span><br />
                      A tool to calculate the amount of concrete and its materials needed for construction projects.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span><br />
                      Helps in accurate planning, cost-saving, and reducing material wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What units does it support?</span><br />
                      Volume can be entered in cubic meters or cubic feet, and cement is calculated in bags.
                    </div>
                    <div>
                      <span className="font-semibold">Q4. How to choose the right mix ratio?</span><br />
                      <ul className="list-disc list-inside ml-6">
                        <li>M5–M10: Low-strength works like leveling or small foundations.</li>
                        <li>M15–M25: Structural works like slabs, beams, and columns.</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold">Q5. Can it handle irregular shapes?</span><br />
                      Yes, calculate the total volume of the shape and enter it in the calculator for accurate results.
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
