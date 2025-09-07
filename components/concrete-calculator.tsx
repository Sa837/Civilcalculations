"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react'

interface CalculationResult {
  wetVolume: number
  dryVolume: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  aggregateWeight: number
  mixRatio: string
}

interface FormData {
  length: string
  width: string
  height: string
  mixType: string
  wastage: string
  unit: 'metric' | 'imperial'
}

const MIX_TYPES = [
  { value: 'M10', label: 'M10 (1:3:6)', ratios: { cement: 1, sand: 3, aggregate: 6 } },
  { value: 'M15', label: 'M15 (1:2:4)', ratios: { cement: 1, sand: 2, aggregate: 4 } },
  { value: 'M20', label: 'M20 (1:1.5:3)', ratios: { cement: 1, sand: 1.5, aggregate: 3 } }
]

const DENSITIES = {
  cement: 1440, // kg/m³
  sand: 1450,   // kg/m³
  aggregate: 1500 // kg/m³
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
    mixType: 'M15',
    wastage: '5',
    unit: globalUnit === 'm' ? 'metric' : 'imperial'
  })

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)

  // Update unit when globalUnit changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      unit: globalUnit === 'm' ? 'metric' : 'imperial'
    }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.length || parseFloat(formData.length) <= 0) {
      newErrors.length = 'Length must be greater than 0'
    }

    if (!formData.width || parseFloat(formData.width) <= 0) {
      newErrors.width = 'Width must be greater than 0'
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
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const length = parseFloat(formData.length)
      const width = parseFloat(formData.width)
      const height = parseFloat(formData.height)
      const wastage = parseFloat(formData.wastage) / 100

      // Convert to metric if needed
      const conversion = UNIT_CONVERSIONS[formData.unit]
      const lengthM = length * conversion.length
      const widthM = width * conversion.length
      const heightM = height * conversion.length

      // Get mix ratios
      const mixType = MIX_TYPES.find(m => m.value === formData.mixType)!
      const { cement: cementRatio, sand: sandRatio, aggregate: aggregateRatio } = mixType.ratios

      // Calculate wet concrete volume
      const wetVolume = lengthM * widthM * heightM

      // Convert to dry volume (1.54 factor)
      const dryVolume = wetVolume * 1.54

      // Calculate material volumes
      const totalParts = cementRatio + sandRatio + aggregateRatio
      const cementVolume = (cementRatio / totalParts) * dryVolume
      const sandVolume = (sandRatio / totalParts) * dryVolume
      const aggregateVolume = (aggregateRatio / totalParts) * dryVolume

      // Convert to weights
      const cementWeight = cementVolume * DENSITIES.cement
      const sandWeight = sandVolume * DENSITIES.sand
      const aggregateWeight = aggregateVolume * DENSITIES.aggregate

      // Add wastage factor
      const wastageFactor = 1 + wastage
      const cementWeightFinal = cementWeight * wastageFactor
      const sandWeightFinal = sandWeight * wastageFactor
      const aggregateWeightFinal = aggregateWeight * wastageFactor

      // Calculate cement bags (50kg per bag)
      const cementBags = cementWeightFinal / 50

      setResult({
        wetVolume: wetVolume * conversion.volume,
        dryVolume: dryVolume * conversion.volume,
        cementWeight: cementWeightFinal,
        cementBags: cementBags,
        sandWeight: sandWeightFinal,
        aggregateWeight: aggregateWeightFinal,
        mixRatio: `${cementRatio}:${sandRatio}:${aggregateRatio}`
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
      mixType: 'M15',
      wastage: '5',
      unit: globalUnit === 'm' ? 'metric' : 'imperial'
    })
    setResult(null)
    setErrors({})
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
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
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">
                Concrete Calculator — Developer Friendly
              </h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Calculate concrete volume and material requirements with precise mix ratios
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Length */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  step="0.001"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.length
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter length"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {formData.unit === 'metric' ? 'm' : 'ft'}
                </div>
              </div>
              {errors.length && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.length}
                </motion.p>
              )}
            </div>

            {/* Width */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Width
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => handleInputChange('width', e.target.value)}
                  step="0.001"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.width
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter width"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {formData.unit === 'metric' ? 'm' : 'ft'}
                </div>
              </div>
              {errors.width && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.width}
                </motion.p>
              )}
            </div>

            {/* Height/Thickness */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Height/Thickness
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  step="0.001"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.height
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter height/thickness"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {formData.unit === 'metric' ? 'm' : 'ft'}
                </div>
              </div>
              {errors.height && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.height}
                </motion.p>
              )}
            </div>

            {/* Mix Type */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Concrete Mix Type
              </label>
              <select
                value={formData.mixType}
                onChange={(e) => handleInputChange('mixType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800"
              >
                {MIX_TYPES.map((mix) => (
                  <option key={mix.value} value={mix.value}>
                    {mix.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wastage Factor */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Wastage Factor
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.wastage}
                  onChange={(e) => handleInputChange('wastage', e.target.value)}
                  step="0.1"
                  min="0"
                  max="30"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.wastage
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="5"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  %
                </div>
              </div>
              {errors.wastage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.wastage}
                </motion.p>
              )}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={calculateConcrete}
              disabled={isCalculating}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-display font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4" />
                  Calculate
                </>
              )}
            </button>
          </div>
        </div>

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

                {/* Mix Ratio */}
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Mix Ratio
                  </h3>
                  <div className="text-center">
                    <span className="text-2xl font-mono font-bold text-primary">
                      {result.mixRatio}
                    </span>
                    <p className="mt-2 text-sm text-body/70 dark:text-body-dark/70">
                      Cement : Sand : Aggregate
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-slate-200/20 bg-gradient-to-br from-primary/10 to-secondary/10 p-6 dark:border-slate-700/30 dark:from-primary/20 dark:to-secondary/20">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-body/80 dark:text-body-dark/80">
                      Total concrete volume: <span className="font-semibold">{result.wetVolume.toFixed(3)} {formData.unit === 'metric' ? 'm³' : 'ft³'}</span>
                    </p>
                    <p className="text-body/80 dark:text-body-dark/80">
                      Cement required: <span className="font-semibold">{Math.ceil(result.cementBags)} bags</span>
                    </p>
                    <p className="text-body/80 dark:text-body-dark/80">
                      Sand required: <span className="font-semibold">{result.sandWeight.toFixed(1)} kg</span>
                    </p>
                    <p className="text-body/80 dark:text-body-dark/80">
                      Aggregate required: <span className="font-semibold">{result.aggregateWeight.toFixed(1)} kg</span>
                    </p>
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
