"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, AlertCircle, CheckCircle, RotateCcw, Eye, EyeOff, Code } from 'lucide-react'

interface BrickworkResult {
  numberOfBricks: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  mortarVolume: number
  wallVolume: number
}

interface BrickworkFormData {
  wallLength: string
  wallHeight: string
  wallThickness: string
  brickLength: string
  brickWidth: string
  brickHeight: string
  mortarThickness: string
  mortarMixType: string
  wastageFactor: string
  unit: 'm' | 'ft'
  showStepByStep: boolean
  showDeveloperFormulas: boolean
}

const MORTAR_MIX_TYPES = [
  { value: '1:6', label: 'Non-load bearing (1:6)', cement: 1, sand: 6 },
  { value: '1:4', label: 'Standard load bearing (1:4)', cement: 1, sand: 4 }
]

const DENSITIES = {
  cement: 1440, // kg/m³
  sand: 1450,   // kg/m³
  cementBag: 50 // kg per bag
}

const UNIT_CONVERSIONS = {
  m: { length: 1, volume: 1 },
  ft: { length: 0.3048, volume: 0.0283168 } // ft to m, ft³ to m³
}

interface BrickworkCalculatorProps {
  globalUnit?: 'm' | 'ft'
}

export default function BrickworkCalculator({ globalUnit = 'm' }: BrickworkCalculatorProps) {
  const [formData, setFormData] = useState<BrickworkFormData>({
    wallLength: '5.0',
    wallHeight: '2.4',
    wallThickness: '0.15',
    brickLength: '190',
    brickWidth: '90',
    brickHeight: '90',
    mortarThickness: '10',
    mortarMixType: '1:6',
    wastageFactor: '5',
    unit: globalUnit,
    showStepByStep: false,
    showDeveloperFormulas: false
  })

  const [result, setResult] = useState<BrickworkResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)

  // Update unit when globalUnit changes
  useEffect(() => {
    setFormData(prev => {
      const newFormData = { ...prev, unit: globalUnit }
      
      // Set appropriate default values for imperial units
      if (globalUnit === 'ft') {
        // Convert default metric values to imperial
        newFormData.wallLength = '16.4'  // 5.0 m = 16.4 ft
        newFormData.wallHeight = '7.9'   // 2.4 m = 7.9 ft
        newFormData.wallThickness = '0.49' // 0.15 m = 0.49 ft
        newFormData.brickLength = '7.5'  // 190 mm = 7.5 in
        newFormData.brickWidth = '3.5'   // 90 mm = 3.5 in
        newFormData.brickHeight = '3.5'  // 90 mm = 3.5 in
        newFormData.mortarThickness = '0.4' // 10 mm = 0.4 in
      } else {
        // Reset to metric defaults
        newFormData.wallLength = '5.0'
        newFormData.wallHeight = '2.4'
        newFormData.wallThickness = '0.15'
        newFormData.brickLength = '190'
        newFormData.brickWidth = '90'
        newFormData.brickHeight = '90'
        newFormData.mortarThickness = '10'
      }
      
      return newFormData
    })
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.wallLength || parseFloat(formData.wallLength) <= 0) {
      newErrors.wallLength = 'Wall length must be greater than 0'
    }

    if (!formData.wallHeight || parseFloat(formData.wallHeight) <= 0) {
      newErrors.wallHeight = 'Wall height must be greater than 0'
    }

    if (!formData.wallThickness || parseFloat(formData.wallThickness) <= 0) {
      newErrors.wallThickness = 'Wall thickness must be greater than 0'
    }

    if (!formData.brickLength || parseFloat(formData.brickLength) <= 0) {
      newErrors.brickLength = 'Brick length must be greater than 0'
    }

    if (!formData.brickWidth || parseFloat(formData.brickWidth) <= 0) {
      newErrors.brickWidth = 'Brick width must be greater than 0'
    }

    if (!formData.brickHeight || parseFloat(formData.brickHeight) <= 0) {
      newErrors.brickHeight = 'Brick height must be greater than 0'
    }

    if (!formData.mortarThickness || parseFloat(formData.mortarThickness) <= 0) {
      newErrors.mortarThickness = 'Mortar thickness must be greater than 0'
    }

    if (!formData.wastageFactor || parseFloat(formData.wastageFactor) < 0 || parseFloat(formData.wastageFactor) > 30) {
      newErrors.wastageFactor = 'Wastage factor must be between 0% and 30%'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateBrickwork = async () => {
    if (!validateForm()) return

    setIsCalculating(true)
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Convert all inputs to meters
      const conversion = UNIT_CONVERSIONS[formData.unit]
      
      const wallLengthM = parseFloat(formData.wallLength) * conversion.length
      const wallHeightM = parseFloat(formData.wallHeight) * conversion.length
      const wallThicknessM = parseFloat(formData.wallThickness) * conversion.length
      
      // Convert brick dimensions to meters
      // If imperial (ft), convert inches to mm first, then to meters
      // If metric (m), convert mm to meters directly
      const brickLengthM = formData.unit === 'ft' 
        ? (parseFloat(formData.brickLength) * 25.4) / 1000  // inches to mm to m
        : parseFloat(formData.brickLength) / 1000  // mm to m
      const brickWidthM = formData.unit === 'ft'
        ? (parseFloat(formData.brickWidth) * 25.4) / 1000
        : parseFloat(formData.brickWidth) / 1000
      const brickHeightM = formData.unit === 'ft'
        ? (parseFloat(formData.brickHeight) * 25.4) / 1000
        : parseFloat(formData.brickHeight) / 1000
      const mortarThicknessM = formData.unit === 'ft'
        ? (parseFloat(formData.mortarThickness) * 25.4) / 1000
        : parseFloat(formData.mortarThickness) / 1000
      
      const wastageFactor = parseFloat(formData.wastageFactor) / 100

      // Get mortar mix ratios
      const mixType = MORTAR_MIX_TYPES.find(m => m.value === formData.mortarMixType)!
      const { cement: cementRatio, sand: sandRatio } = mixType

      // Step 1 - Calculate wall volume
      const wallVolume = wallLengthM * wallHeightM * wallThicknessM

      // Step 2 - Calculate brick volume with mortar
      const brickVolumeWithMortar = (brickLengthM + mortarThicknessM) * 
                                   (brickWidthM + mortarThicknessM) * 
                                   (brickHeightM + mortarThicknessM)

      // Step 2b - Calculate brick volume without mortar
      const brickVolumeWithoutMortar = brickLengthM * brickWidthM * brickHeightM

      // Step 3 - Calculate number of bricks
      let numberOfBricks = wallVolume / brickVolumeWithMortar

      // Step 4 - Calculate mortar volume
      const mortarVolume = wallVolume - (numberOfBricks * brickVolumeWithoutMortar)

      // Check for negative mortar volume
      if (mortarVolume <= 0) {
        setErrors({ general: 'Check wall dimensions or brick/mortar sizes — mortar volume computed as zero or negative' })
        setIsCalculating(false)
        return
      }

      // Step 5 - Calculate mix total parts
      const totalParts = cementRatio + sandRatio

      // Step 6 - Calculate cement and sand volumes
      const cementVolume = (cementRatio / totalParts) * mortarVolume
      const sandVolume = (sandRatio / totalParts) * mortarVolume

      // Step 7 - Convert volumes to weights
      const cementWeight = cementVolume * DENSITIES.cement
      const sandWeight = sandVolume * DENSITIES.sand
      const cementBags = cementWeight / DENSITIES.cementBag

      // Step 8 - Apply wastage factor
      numberOfBricks = numberOfBricks * (1 + wastageFactor)
      const cementWeightFinal = cementWeight * (1 + wastageFactor)
      const sandWeightFinal = sandWeight * (1 + wastageFactor)
      const cementBagsFinal = cementWeightFinal / DENSITIES.cementBag

      setResult({
        numberOfBricks: Math.ceil(numberOfBricks),
        cementWeight: Math.round(cementWeightFinal * 10) / 10,
        cementBags: Math.ceil(cementBagsFinal),
        sandWeight: Math.round(sandWeightFinal * 10) / 10,
        mortarVolume: Math.round(mortarVolume * 1000) / 1000,
        wallVolume: Math.round(wallVolume * 1000) / 1000
      })
    } catch (error) {
      console.error('Calculation error:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const resetForm = () => {
    setFormData({
      wallLength: '5.0',
      wallHeight: '2.4',
      wallThickness: '0.15',
      brickLength: '190',
      brickWidth: '90',
      brickHeight: '90',
      mortarThickness: '10',
      mortarMixType: '1:6',
      wastageFactor: '5',
      unit: globalUnit,
      showStepByStep: false,
      showDeveloperFormulas: false
    })
    setResult(null)
    setErrors({})
  }

  const handleInputChange = (field: keyof BrickworkFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getBrickUnit = () => formData.unit === 'm' ? 'mm' : 'in'
  const getLengthUnit = () => formData.unit === 'm' ? 'm' : 'ft'
  
  // Convert values for display when using imperial
  const getDisplayValue = (value: string, isLength = false) => {
    if (formData.unit === 'ft' && isLength) {
      const metricValue = parseFloat(value) * 0.3048
      return `${value} ft (${metricValue.toFixed(3)} m)`
    }
    return value
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
                Brickwork Calculator
              </h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Calculate bricks, mortar volume, cement & sand quantity
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Wall Length */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Wall Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.wallLength}
                  onChange={(e) => handleInputChange('wallLength', e.target.value)}
                  step="0.001"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.wallLength
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter wall length"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {getLengthUnit()}
                </div>
              </div>
              {formData.unit === 'ft' && formData.wallLength && (
                <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
                  {getDisplayValue(formData.wallLength, true)}
                </p>
              )}
              {errors.wallLength && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.wallLength}
                </motion.p>
              )}
            </div>

            {/* Wall Height */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Wall Height
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.wallHeight}
                  onChange={(e) => handleInputChange('wallHeight', e.target.value)}
                  step="0.001"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.wallHeight
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter wall height"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {getLengthUnit()}
                </div>
              </div>
              {formData.unit === 'ft' && formData.wallHeight && (
                <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
                  {getDisplayValue(formData.wallHeight, true)}
                </p>
              )}
              {errors.wallHeight && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.wallHeight}
                </motion.p>
              )}
            </div>

            {/* Wall Thickness */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Wall Thickness
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.wallThickness}
                  onChange={(e) => handleInputChange('wallThickness', e.target.value)}
                  step="0.001"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.wallThickness
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter wall thickness"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {getLengthUnit()}
                </div>
              </div>
              {formData.unit === 'ft' && formData.wallThickness && (
                <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
                  {getDisplayValue(formData.wallThickness, true)}
                </p>
              )}
              {errors.wallThickness && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.wallThickness}
                </motion.p>
              )}
            </div>

            {/* Mortar Mix Type */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Mortar Mix Type
              </label>
              <select
                value={formData.mortarMixType}
                onChange={(e) => handleInputChange('mortarMixType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800"
              >
                {MORTAR_MIX_TYPES.map((mix) => (
                  <option key={mix.value} value={mix.value}>
                    {mix.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brick Length */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Brick Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.brickLength}
                  onChange={(e) => handleInputChange('brickLength', e.target.value)}
                  step="0.1"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.brickLength
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter brick length"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {getBrickUnit()}
                </div>
              </div>
              {errors.brickLength && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.brickLength}
                </motion.p>
              )}
            </div>

            {/* Brick Width */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Brick Width
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.brickWidth}
                  onChange={(e) => handleInputChange('brickWidth', e.target.value)}
                  step="0.1"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.brickWidth
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter brick width"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {getBrickUnit()}
                </div>
              </div>
              {errors.brickWidth && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.brickWidth}
                </motion.p>
              )}
            </div>

            {/* Brick Height */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Brick Height
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.brickHeight}
                  onChange={(e) => handleInputChange('brickHeight', e.target.value)}
                  step="0.1"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.brickHeight
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter brick height"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {getBrickUnit()}
                </div>
              </div>
              {errors.brickHeight && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.brickHeight}
                </motion.p>
              )}
            </div>

            {/* Mortar Thickness */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Mortar Thickness
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.mortarThickness}
                  onChange={(e) => handleInputChange('mortarThickness', e.target.value)}
                  step="0.1"
                  min="0"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.mortarThickness
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="Enter mortar thickness"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  {getBrickUnit()}
                </div>
              </div>
              {errors.mortarThickness && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.mortarThickness}
                </motion.p>
              )}
            </div>

            {/* Wastage Factor */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Wastage Factor
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.wastageFactor}
                  onChange={(e) => handleInputChange('wastageFactor', e.target.value)}
                  step="0.1"
                  min="0"
                  max="30"
                  className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.wastageFactor
                      ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                  placeholder="5"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                  %
                </div>
              </div>
              {errors.wastageFactor && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.wastageFactor}
                </motion.p>
              )}
            </div>

          </div>

          {/* General Error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            >
              <AlertCircle className="h-5 w-5" />
              {errors.general}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to defaults
              </button>
              
              <button
                type="button"
                onClick={() => handleInputChange('showStepByStep', !formData.showStepByStep)}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-display font-medium transition-colors ${
                  formData.showStepByStep
                    ? 'bg-primary text-white'
                    : 'border border-slate-300 bg-white text-heading dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark'
                }`}
              >
                {formData.showStepByStep ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {formData.showStepByStep ? 'Hide' : 'Show'} step-by-step
              </button>
            </div>
            
            <button
              type="button"
              onClick={calculateBrickwork}
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

              {/* Main Results Table */}
              <div className="mb-8 overflow-hidden rounded-xl border border-slate-200/20 bg-white/70 dark:border-slate-700/30 dark:bg-slate-900/60">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">Material</th>
                      <th className="px-6 py-4 text-right font-display font-semibold text-heading dark:text-heading-dark">Quantity</th>
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/30">
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Number of Bricks</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.numberOfBricks.toLocaleString()}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">pcs</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Cement</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.cementWeight.toFixed(1)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">kg (~{result.cementBags} bags)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Sand</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.sandWeight.toFixed(1)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">kg</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Mortar Volume</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.mortarVolume.toFixed(3)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">m³</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Wall Volume</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.wallVolume.toFixed(3)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">m³</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Developer Formulas Panel */}
              <div className="mb-6">
                <button
                  onClick={() => handleInputChange('showDeveloperFormulas', !formData.showDeveloperFormulas)}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
                >
                  <Code className="h-4 w-4" />
                  {formData.showDeveloperFormulas ? 'Hide' : 'Show'} Developer Formulas
                </button>
              </div>

              <AnimatePresence>
                {formData.showDeveloperFormulas && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden rounded-xl border border-slate-200/20 bg-slate-50 dark:border-slate-700/30 dark:bg-slate-900/60"
                  >
                    <div className="p-6">
                      <h3 className="mb-4 font-display text-lg font-semibold text-heading dark:text-heading-dark">
                        Copy-Paste Safe Formulas
                      </h3>
                      <pre className="overflow-x-auto text-sm text-body/80 dark:text-body-dark/80">
{`Step 0 – Mortar mix parts (based on dropdown)
if Mortar_Mix_Type == "Non-load bearing (1:6)"
    Mortar_Mix_Cement = 1
    Mortar_Mix_Sand = 6
else if Mortar_Mix_Type == "Standard load bearing (1:4)"
    Mortar_Mix_Cement = 1
    Mortar_Mix_Sand = 4

Step 1 – Convert all inputs to meters and cubic meters
Wall_Volume = Wall_Length * Wall_Height * Wall_Thickness

Step 2 – Brick single volume including mortar (m³)
Brick_Volume_with_mortar = (Brick_Length/1000 + Mortar_Thickness/1000) *
                           (Brick_Width/1000 + Mortar_Thickness/1000) *
                           (Brick_Height/1000 + Mortar_Thickness/1000)

Step 2b – Brick volume without mortar (m³)
Brick_Volume_without_mortar = (Brick_Length/1000) *
                              (Brick_Width/1000) *
                              (Brick_Height/1000)

Step 3 – Number of bricks (before wastage)
Number_of_Bricks = Wall_Volume / Brick_Volume_with_mortar

Step 4 – Mortar volume (m³)
Mortar_Volume = Wall_Volume - (Number_of_Bricks * Brick_Volume_without_mortar)

Step 5 – Mix total parts
Total_Parts = Mortar_Mix_Cement + Mortar_Mix_Sand

Step 6 – Cement & Sand volume (m³)
Cement_Volume = (Mortar_Mix_Cement / Total_Parts) * Mortar_Volume
Sand_Volume   = (Mortar_Mix_Sand / Total_Parts) * Mortar_Volume

Step 7 – Convert volumes to weights
Cement_Weight = Cement_Volume * 1440      // 1440 kg/m³
Sand_Weight   = Sand_Volume * 1450        // 1450 kg/m³
Cement_Bags   = Cement_Weight / 50        // 50 kg per bag

Step 8 – Include wastage (apply to bricks, cement, sand)
Number_of_Bricks = Number_of_Bricks * (1 + Wastage_Factor/100)
Cement_Weight    = Cement_Weight * (1 + Wastage_Factor/100)
Sand_Weight      = Sand_Weight * (1 + Wastage_Factor/100)
Cement_Bags      = Cement_Weight / 50      // recalc after wastage

Rounding/display:
- Number_of_Bricks: round up to integer (ceil).
- Cement_Weight, Sand_Weight: round to 1 decimal.
- Cement_Bags: round up to nearest whole bag.`}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
