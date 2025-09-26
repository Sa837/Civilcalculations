'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Info,
  Plus,
  Trash2,
  Building,
  Square,
  Box,
} from 'lucide-react'
import {
  ConcreteCalculator as ConcreteCalculatorLib,
  CONCRETE_MIX_TYPES,
  CONCRETE_ELEMENTS,
} from '@/lib/registry/calculator/concrete-calculator'
import { UnitConverter, UNIT_PRESETS } from '@/lib/registry/globalunits'
import { DENSITIES } from '@/lib/registry/globalunits'

interface ConcreteResult {
  wetVolume: number
  dryVolume: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  sandVolume: number
  aggregateWeight: number
  aggregateVolume: number
  waterVolume: number
  mixRatio: string
  elementArea?: number
  totalParts: number
  // Optional advanced fields (non-breaking)
  structural?: any
  human_summary?: string
}

interface ConcreteFormData {
  length: string
  width: string
  height: string
  area: string
  mixType: string
  wastageFactor: string
  unit: 'm' | 'ft'
  showStepByStep: boolean
  elementType: string
  subType?: string
  useArea: boolean
  // Column
  col_b?: string
  col_D?: string
  col_diam?: string
  // Footing
  ft_B?: string
  ft_L?: string
  ft_a?: string
  // Frustum footing (trapezoidal/pyramidal)
  ft_B_bot?: string
  ft_L_bot?: string
  ft_B_top?: string
  ft_L_top?: string
  // Footing (strap)
  ft_a1?: string
  ft_a2?: string
  strap_len?: string
  strap_b?: string
  strap_D?: string
  // Footing (stepped)
  st1_B?: string
  st1_L?: string
  st1_t?: string
  st2_B?: string
  st2_L?: string
  st2_t?: string
  st3_B?: string
  st3_L?: string
  st3_t?: string
  // Stair
  stair_riser?: string
  stair_tread?: string
  stair_steps?: string
  stair_steps2?: string
  stair_width?: string
  stair_landing_len?: string
  // Beam
  beam_b?: string
  beam_D?: string
}

interface ConcreteCalculatorProps {
  globalUnit?: 'm' | 'ft'
}

// SVG Component for concrete element visualization
const ConcreteSVG = ({ formData }: { formData: ConcreteFormData }) => {
  const getElementIcon = (elementType: string) => {
    const icons = {
      slab: <Square className="h-6 w-6" />,
      beam: <Box className="h-6 w-6" />,
      column: <Building className="h-6 w-6" />,
      footing: <Square className="h-6 w-6" />,
      wall: <Square className="h-6 w-6" />,
      staircase: <Square className="h-6 w-6" />,
    }
    return icons[elementType as keyof typeof icons] || <Square className="h-6 w-6" />
  }

  return (
    <div className="mt-6 p-4 rounded-xl">
      <h3 className="font-display font-medium text-heading dark:text-heading-dark mb-3 text-center">
        {CONCRETE_ELEMENTS.find((e) => e.value === formData.elementType)?.label ||
          'Concrete Element'}{' '}
        Diagram
      </h3>
      <div className="flex justify-center mb-4">{getElementIcon(formData.elementType)}</div>
      <svg
        width="300"
        height="200"
        className="border dark:border-slate-600 rounded-lg bg-white mx-auto"
        viewBox="0 0 300 200"
      >
        {/* Concrete element based on type */}
        {formData.elementType === 'slab' && (
          <>
            <rect
              x="50"
              y="80"
              width="200"
              height="40"
              fill="#94a3b8"
              stroke="#64748b"
              strokeWidth="2"
            />
            <text
              x="150"
              y="105"
              textAnchor="middle"
              fontSize="14"
              fill="#1e293b"
              fontWeight="bold"
            >
              Concrete Slab
            </text>
          </>
        )}

        {formData.elementType === 'beam' && (
          <>
            <rect
              x="100"
              y="60"
              width="100"
              height="80"
              fill="#94a3b8"
              stroke="#64748b"
              strokeWidth="2"
            />
            <text
              x="150"
              y="105"
              textAnchor="middle"
              fontSize="14"
              fill="#1e293b"
              fontWeight="bold"
            >
              Beam
            </text>
          </>
        )}

        {formData.elementType === 'column' && (
          <>
            <rect
              x="125"
              y="40"
              width="50"
              height="120"
              fill="#94a3b8"
              stroke="#64748b"
              strokeWidth="2"
            />
            <text
              x="150"
              y="105"
              textAnchor="middle"
              fontSize="14"
              fill="#1e293b"
              fontWeight="bold"
            >
              Column
            </text>
          </>
        )}

        {/* Dimensions */}
        <g fontSize="10" fill="#666" textAnchor="middle">
          <line x1="50" y1="170" x2="250" y2="170" stroke="#666" strokeWidth="1" />
          <text x="150" y="185" fontWeight="bold" fontSize="12">
            {formData.length || '0'} {formData.unit}
          </text>

          <line x1="260" y1="80" x2="260" y2="120" stroke="#666" strokeWidth="1" />
          <text
            x="275"
            y="100"
            writingMode="vertical"
            fontWeight="bold"
            fontSize="12"
            transform="rotate(90, 275, 100)"
          >
            {formData.height || '0'} {formData.unit}
          </text>
        </g>

        <text x="150" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
          {CONCRETE_ELEMENTS.find((e) => e.value === formData.elementType)?.label ||
            'Concrete Element'}
        </text>
      </svg>

      <div className="mt-2 font-display text-xs text-center text-slate-600 dark:text-slate-300">
        {formData.useArea ? (
          <>
            Area: {formData.area || '0'} {formData.unit}² × Height: {formData.height || '0'}{' '}
            {formData.unit}
          </>
        ) : (
          <>
            Dimensions: {formData.length || '0'} × {formData.width || '0'} ×{' '}
            {formData.height || '0'} {formData.unit}
          </>
        )}
      </div>
    </div>
  )
}

// Memoized InputField component
const InputField = memo(
  ({
    label,
    value,
    onChange,
    error,
    type = 'number',
    min = '0',
    max,
    unit,
    isLength = false,
    currentUnit,
    placeholder,
  }: {
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    type?: 'number' | 'text'
    min?: string
    max?: string
    unit?: string
    isLength?: boolean
    currentUnit?: 'm' | 'ft'
    placeholder?: string
  }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '' || /^-?\d*\.?\d*$/.test(e.target.value)) {
        onChange(e.target.value)
      }
    }

    return (
      <div>
        <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
          {label}
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            placeholder={placeholder}
            className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              error
                ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
            }`}
          />
          {unit && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
              {unit}
            </div>
          )}
        </div>
        {currentUnit === 'ft' && isLength && value && (
          <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
            {parseFloat(value)} ft ({(parseFloat(value) * 0.3048).toFixed(3)} m)
          </p>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.p>
        )}
      </div>
    )
  },
)

InputField.displayName = 'InputField'

export default function ConcreteCalculator({ globalUnit = 'm' }: ConcreteCalculatorProps) {
  const [formData, setFormData] = useState<ConcreteFormData>({
    length: '',
    width: '',
    height: '',
    area: '',
    mixType: 'M15',
    wastageFactor: '5',
    unit: globalUnit,
    showStepByStep: false,
    elementType: 'slab',
    useArea: false,
  })

  const [result, setResult] = useState<ConcreteResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)

  // Helper function to get unit system
  const getUnitSystem = (unit: 'm' | 'ft'): 'metric' | 'imperial' => {
    return unit === 'm' ? 'metric' : 'imperial'
  }

  // Enhanced unit conversion using the new universal system
  useEffect(() => {
    setFormData((prev) => {
      if (prev.unit === globalUnit) return prev

      const newUnitSystem = getUnitSystem(globalUnit)
      const oldUnitSystem = getUnitSystem(prev.unit)

      const newFormData = { ...prev, unit: globalUnit }
      const newPresets = UNIT_PRESETS.concrete[newUnitSystem]
      const oldPresets = UNIT_PRESETS.concrete[oldUnitSystem]

      // Convert dimensions
      if (prev.length) {
        newFormData.length = UnitConverter.convertLength(
          parseFloat(prev.length),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      if (prev.width) {
        newFormData.width = UnitConverter.convertLength(
          parseFloat(prev.width),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      if (prev.height) {
        newFormData.height = UnitConverter.convertLength(
          parseFloat(prev.height),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      // Convert area
      if (prev.area) {
        newFormData.area = UnitConverter.convertArea(
          parseFloat(prev.area),
          oldPresets.area,
          newPresets.area,
        ).toFixed(3)
      }

      return newFormData
    })
  }, [globalUnit])

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (formData.useArea) {
      if (!formData.area || parseFloat(formData.area) <= 0) {
        newErrors.area = 'Area must be greater than 0'
      }
    } else {
      if (!formData.length || parseFloat(formData.length) <= 0) {
        newErrors.length = 'Length must be greater than 0'
      }
      if (!formData.width || parseFloat(formData.width) <= 0) {
        newErrors.width = 'Width must be greater than 0'
      }
    }

    if (!formData.height || parseFloat(formData.height) <= 0) {
      newErrors.height = 'Height/Thickness must be greater than 0'
    }

    if (formData.wastageFactor) {
      const wastageValue = parseFloat(formData.wastageFactor)
      if (wastageValue < 0 || wastageValue > 30) {
        newErrors.wastageFactor = 'Wastage factor must be between 0% and 30%'
      }
    }

    // Element-specific quick checks
    if (formData.elementType === 'column') {
      const st = formData.subType || 'rect'
      if (st === 'rect') {
        if (!formData.col_b) newErrors.col_b = 'Enter breadth'
        if (!formData.col_D) newErrors.col_D = 'Enter depth'
      } else if (st === 'square') {
        if (!formData.col_b) newErrors.col_b = 'Enter side'
      } else if (st === 'circular') {
        if (!formData.col_diam) newErrors.col_diam = 'Enter diameter'
      }
    } else if (formData.elementType === 'footing') {
      const st = formData.subType || 'iso_square'
      if (st === 'iso_square') {
        if (!formData.ft_a) newErrors.ft_a = 'Enter footing side'
      } else if (st === 'iso_rect') {
        if (!formData.ft_B) newErrors.ft_B = 'Enter footing width'
        if (!formData.ft_L) newErrors.ft_L = 'Enter footing length'
      } else if (st === 'iso_frustum') {
        if (!formData.ft_B_bot) newErrors.ft_B_bot = 'Enter bottom width (B1)'
        if (!formData.ft_L_bot) newErrors.ft_L_bot = 'Enter bottom length (L1)'
        if (!formData.ft_B_top) newErrors.ft_B_top = 'Enter top width (B2)'
        if (!formData.ft_L_top) newErrors.ft_L_top = 'Enter top length (L2)'
      }
    } else if (formData.elementType === 'staircase') {
      if (!formData.stair_riser) newErrors.stair_riser = 'Enter riser'
      if (!formData.stair_tread) newErrors.stair_tread = 'Enter tread'
      if (!formData.stair_steps) newErrors.stair_steps = 'Enter steps'
      if (!formData.stair_width) newErrors.stair_width = 'Enter stair width'
      if ((formData.subType === 'dogleg' || formData.subType === 'quarter_turn' || formData.subType === 'u_shaped') && !formData.stair_steps2) newErrors.stair_steps2 = 'Enter steps for flight 2'
    } else if (formData.elementType === 'beam') {
      if (!formData.beam_b) newErrors.beam_b = 'Enter beam breadth'
      if (!formData.beam_D) newErrors.beam_D = 'Enter beam depth'
    } else if (formData.elementType === 'footing') {
      if (formData.subType === 'combined') {
        if (!formData.ft_B) newErrors.ft_B = 'Enter footing width'
        if (!formData.ft_L) newErrors.ft_L = 'Enter footing length'
      }
      if (formData.subType === 'strap') {
        if (!formData.ft_a1) newErrors.ft_a1 = 'Enter pad-1 side'
        if (!formData.ft_a2) newErrors.ft_a2 = 'Enter pad-2 side'
        if (!formData.strap_len) newErrors.strap_len = 'Enter strap length'
        if (!formData.strap_b) newErrors.strap_b = 'Enter strap breadth'
        if (!formData.strap_D) newErrors.strap_D = 'Enter strap depth'
      }
      if (formData.subType === 'stepped') {
        if (!formData.st1_B) newErrors.st1_B = 'Enter B1'
        if (!formData.st1_L) newErrors.st1_L = 'Enter L1'
        if (!formData.st1_t) newErrors.st1_t = 'Enter t1'
        const anyStep2 = !!(formData.st2_B || formData.st2_L || formData.st2_t)
        if (anyStep2 && (!formData.st2_B || !formData.st2_L || !formData.st2_t)) {
          newErrors.st2_B = newErrors.st2_B || 'Complete Step 2 or leave all empty'
          newErrors.st2_L = newErrors.st2_L || 'Complete Step 2 or leave all empty'
          newErrors.st2_t = newErrors.st2_t || 'Complete Step 2 or leave all empty'
        }
        const anyStep3 = !!(formData.st3_B || formData.st3_L || formData.st3_t)
        if (anyStep3 && (!formData.st3_B || !formData.st3_L || !formData.st3_t)) {
          newErrors.st3_B = newErrors.st3_B || 'Complete Step 3 or leave all empty'
          newErrors.st3_L = newErrors.st3_L || 'Complete Step 3 or leave all empty'
          newErrors.st3_t = newErrors.st3_t || 'Complete Step 3 or leave all empty'
        }
      }
      if (formData.subType === 'mat') {
        if (!formData.ft_B) newErrors.ft_B = 'Enter mat width (B)'
        if (!formData.ft_L) newErrors.ft_L = 'Enter mat length (L)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const calculateConcrete = useCallback(async () => {
    if (!validateForm()) return

    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const input = {
        length: formData.length ? parseFloat(formData.length) : undefined,
        width: formData.width ? parseFloat(formData.width) : undefined,
        height: parseFloat(formData.height),
        area: formData.area ? parseFloat(formData.area) : undefined,
        mixType: formData.mixType,
        wastageFactor: parseFloat(formData.wastageFactor),
        unitSystem: getUnitSystem(formData.unit),
        useArea: formData.useArea,
        elementType: formData.elementType,
        subType: formData.subType,
        // Column
        col_b: formData.col_b ? parseFloat(formData.col_b) : undefined,
        col_D: formData.col_D ? parseFloat(formData.col_D) : undefined,
        col_diam: formData.col_diam ? parseFloat(formData.col_diam) : undefined,
        // Footing
        ft_B: formData.ft_B ? parseFloat(formData.ft_B) : undefined,
        ft_L: formData.ft_L ? parseFloat(formData.ft_L) : undefined,
        ft_a: formData.ft_a ? parseFloat(formData.ft_a) : undefined,
        ft_B_bot: formData.ft_B_bot ? parseFloat(formData.ft_B_bot) : undefined,
        ft_L_bot: formData.ft_L_bot ? parseFloat(formData.ft_L_bot) : undefined,
        ft_B_top: formData.ft_B_top ? parseFloat(formData.ft_B_top) : undefined,
        ft_L_top: formData.ft_L_top ? parseFloat(formData.ft_L_top) : undefined,
        // Footing (strap)
        ft_a1: formData.ft_a1 ? parseFloat(formData.ft_a1) : undefined,
        ft_a2: formData.ft_a2 ? parseFloat(formData.ft_a2) : undefined,
        strap_len: formData.strap_len ? parseFloat(formData.strap_len) : undefined,
        strap_b: formData.strap_b ? parseFloat(formData.strap_b) : undefined,
        strap_D: formData.strap_D ? parseFloat(formData.strap_D) : undefined,
        // Footing (stepped)
        st1_B: formData.st1_B ? parseFloat(formData.st1_B) : undefined,
        st1_L: formData.st1_L ? parseFloat(formData.st1_L) : undefined,
        st1_t: formData.st1_t ? parseFloat(formData.st1_t) : undefined,
        st2_B: formData.st2_B ? parseFloat(formData.st2_B) : undefined,
        st2_L: formData.st2_L ? parseFloat(formData.st2_L) : undefined,
        st2_t: formData.st2_t ? parseFloat(formData.st2_t) : undefined,
        st3_B: formData.st3_B ? parseFloat(formData.st3_B) : undefined,
        st3_L: formData.st3_L ? parseFloat(formData.st3_L) : undefined,
        st3_t: formData.st3_t ? parseFloat(formData.st3_t) : undefined,
        // Stair
        stair_riser: formData.stair_riser ? parseFloat(formData.stair_riser) : undefined,
        stair_tread: formData.stair_tread ? parseFloat(formData.stair_tread) : undefined,
        stair_steps: formData.stair_steps ? parseFloat(formData.stair_steps) : undefined,
        stair_steps2: formData.stair_steps2 ? parseFloat(formData.stair_steps2) : undefined,
        stair_width: formData.stair_width ? parseFloat(formData.stair_width) : undefined,
        stair_landing_len: formData.stair_landing_len ? parseFloat(formData.stair_landing_len) : undefined,
        // Beam
        beam_b: formData.beam_b ? parseFloat(formData.beam_b) : undefined,
        beam_D: formData.beam_D ? parseFloat(formData.beam_D) : undefined,
      }

      const result = ConcreteCalculatorLib.calculate(input)
      setResult(result)
    } catch (error) {
      console.error('Calculation error:', error)
      setErrors({
        general: error instanceof Error ? error.message : 'An error occurred during calculation.',
      })
    } finally {
      setIsCalculating(false)
    }
  }, [formData, validateForm])

  const resetForm = useCallback(() => {
    const unitSystem = getUnitSystem(globalUnit)
    const defaults = ConcreteCalculatorLib.getDefaultsForUnitSystem(unitSystem)
    const elementDefaults = ConcreteCalculatorLib.getElementDefaults('slab', unitSystem)

    setFormData({
      length: defaults.defaultLength,
      width: defaults.defaultWidth,
      height: elementDefaults.height,
      area: '',
      mixType: 'M15',
      wastageFactor: '5',
      unit: globalUnit,
      showStepByStep: false,
      elementType: 'slab',
      useArea: false,
      // reset element-specific
      subType: undefined,
      col_b: '', col_D: '', col_diam: '',
      ft_a: '', ft_B: '', ft_L: '', ft_B_bot: '', ft_L_bot: '', ft_B_top: '', ft_L_top: '', ft_a1: '', ft_a2: '', strap_len: '', strap_b: '', strap_D: '', st1_B: '', st1_L: '', st1_t: '', st2_B: '', st2_L: '', st2_t: '', st3_B: '', st3_L: '', st3_t: '',
      stair_riser: '', stair_tread: '', stair_steps: '', stair_steps2: '', stair_width: '', stair_landing_len: '',
      beam_b: '', beam_D: '',
    })
    setResult(null)
    setErrors({})
  }, [globalUnit])

  const handleInputChange = useCallback(
    (field: keyof ConcreteFormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field as string]) {
        setErrors((prev) => ({ ...prev, [field as string]: '' }))
      }
      if (errors.general) {
        setErrors((prev) => ({ ...prev, general: '' }))
      }
    },
    [errors],
  )

  const handleElementTypeChange = useCallback(
    (elementType: string) => {
      const unitSystem = getUnitSystem(formData.unit)
      const elementDefaults = ConcreteCalculatorLib.getElementDefaults(elementType, unitSystem)

      setFormData((prev) => ({
        ...prev,
        elementType,
        height: elementDefaults.height,
        // reset element-specific
        subType: undefined,
        col_b: '', col_D: '', col_diam: '',
        ft_a: '', ft_B: '', ft_L: '', ft_B_bot: '', ft_L_bot: '', ft_B_top: '', ft_L_top: '', ft_a1: '', ft_a2: '', strap_len: '', strap_b: '', strap_D: '', st1_B: '', st1_L: '', st1_t: '', st2_B: '', st2_L: '', st2_t: '', st3_B: '', st3_L: '', st3_t: '',
        stair_riser: '', stair_tread: '', stair_steps: '', stair_steps2: '', stair_width: '', stair_landing_len: '',
        beam_b: '', beam_D: '',
      }))
    },
    [formData.unit],
  )

  const getLengthUnit = useCallback(() => formData.unit, [formData.unit])
  const getAreaUnit = useCallback(() => (formData.unit === 'm' ? 'm²' : 'ft²'), [formData.unit])
  const getVolumeUnit = useCallback(() => (formData.unit === 'm' ? 'm³' : 'ft³'), [formData.unit])

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
                Concrete Calculator
              </h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Calculate concrete volume, cement, sand, and aggregate quantity
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <ConcreteSVG formData={formData} />
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="flex justify-end gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleInputChange('useArea', !formData.useArea)}
              className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all 
                ${formData.useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}
            >
              <Info className="h-4 w-4" />
              {formData.useArea ? 'Use Length & Width' : 'Use Area'}
            </button>
          </div>

          {/* Concrete Element Selection */}
          <div className="mb-6">
            <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
              Concrete Element Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {CONCRETE_ELEMENTS.map((element) => (
                <button
                  key={element.value}
                  type="button"
                  onClick={() => handleElementTypeChange(element.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg font-display font-medium transition-colors ${
                    formData.elementType === element.value
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {element.value === 'slab' && <Square className="h-5 w-5 mb-1" />}
                  {element.value === 'beam' && <Box className="h-5 w-5 mb-1" />}
                  {element.value === 'column' && <Building className="h-5 w-5 mb-1" />}
                  {element.value === 'footing' && <Square className="h-5 w-5 mb-1" />}
                  {element.value === 'wall' && <Square className="h-5 w-5 mb-1" />}
                  {element.value === 'staircase' && <Square className="h-5 w-5 mb-1" />}
                  <span className="text-xs">{element.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Element Sub-Type Selection (Phase 2 additions) */}
          {formData.elementType === 'slab' && (
            <div className="mb-6">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Slab Type</label>
              <select
                value={formData.subType || 'one_way'}
                onChange={(e) => handleInputChange('subType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="one_way">One-way</option>
                <option value="two_way">Two-way</option>
              </select>
            </div>
          )}
          {formData.elementType === 'footing' && (
            <div className="mb-6">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Footing Type</label>
              <select
                value={formData.subType || 'iso_square'}
                onChange={(e) => handleInputChange('subType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="iso_square">Isolated Square</option>
                <option value="iso_rect">Isolated Rectangular</option>
                <option value="iso_frustum">Isolated Frustum (Trapezoidal/Pyramidal)</option>
                <option value="combined">Combined Footing</option>
                <option value="strap">Strap Footing</option>
                <option value="stepped">Stepped Footing</option>
                <option value="mat">Mat / Raft Footing</option>
              </select>
            </div>
          )}
          {formData.elementType === 'staircase' && (
            <div className="mb-6">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Stair Type</label>
              <select
                value={formData.subType || 'straight'}
                onChange={(e) => handleInputChange('subType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="straight">Straight Flight</option>
                <option value="dogleg">Dog-leg (Two Flights)</option>
                <option value="quarter_turn">Quarter-turn (Two Flights)</option>
                <option value="u_shaped">U-shaped (Two Flights)</option>
              </select>
            </div>
          )}
          {formData.elementType === 'column' && (
            <div className="mb-6">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Column Shape</label>
              <select
                value={formData.subType || 'rect'}
                onChange={(e) => handleInputChange('subType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="rect">Rectangular</option>
                <option value="square">Square</option>
                <option value="circular">Circular</option>
              </select>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Dimensions */}
            {!formData.useArea ? (
              <>
                <InputField
                  label="Length"
                  value={formData.length}
                  onChange={(value) => handleInputChange('length', value)}
                  error={errors.length}
                  unit={getLengthUnit()}
                  isLength={true}
                  currentUnit={formData.unit}
                  placeholder="Enter length"
                />
                <InputField
                  label="Width"
                  value={formData.width}
                  onChange={(value) => handleInputChange('width', value)}
                  error={errors.width}
                  unit={getLengthUnit()}
                  isLength={true}
                  currentUnit={formData.unit}
                  placeholder="Enter width"
                />
              </>
            ) : (
              <div className="md:col-span-2">
                <InputField
                  label="Area"
                  value={formData.area}
                  onChange={(value) => handleInputChange('area', value)}
                  error={errors.area}
                  unit={getAreaUnit()}
                  placeholder="Enter total area"
                />
              </div>
            )}

            {/* Element-specific inputs */}
            {formData.elementType === 'column' && (
              <>
                {(formData.subType === 'rect' || !formData.subType) && (
                  <>
                    <InputField label="Column Breadth (b)" value={formData.col_b || ''} onChange={(v)=>handleInputChange('col_b', v)} error={errors.col_b} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.30" />
                    <InputField label="Column Depth (D)" value={formData.col_D || ''} onChange={(v)=>handleInputChange('col_D', v)} error={errors.col_D} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.45" />
                  </>
                )}
                {formData.subType === 'square' && (
                  <InputField label="Column Side (b)" value={formData.col_b || ''} onChange={(v)=>handleInputChange('col_b', v)} error={errors.col_b} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.30" />
                )}
                {formData.subType === 'circular' && (
                  <InputField label="Column Diameter (d)" value={formData.col_diam || ''} onChange={(v)=>handleInputChange('col_diam', v)} error={errors.col_diam} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.40" />
                )}
              </>
            )}

            {formData.elementType === 'footing' && (
              <>
                {(formData.subType === 'iso_square' || !formData.subType) && (
                  <InputField label="Footing Side (a)" value={formData.ft_a || ''} onChange={(v)=>handleInputChange('ft_a', v)} error={errors.ft_a} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 1.80" />
                )}
                {formData.subType === 'iso_rect' && (
                  <>
                    <InputField label="Footing Width (B)" value={formData.ft_B || ''} onChange={(v)=>handleInputChange('ft_B', v)} error={errors.ft_B} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 1.50" />
                    <InputField label="Footing Length (L)" value={formData.ft_L || ''} onChange={(v)=>handleInputChange('ft_L', v)} error={errors.ft_L} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 2.20" />
                  </>
                )}
                {formData.subType === 'iso_frustum' && (
                  <>
                    <InputField label="Bottom Width (B1)" value={formData.ft_B_bot || ''} onChange={(v)=>handleInputChange('ft_B_bot', v)} error={errors.ft_B_bot} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 2.00" />
                    <InputField label="Bottom Length (L1)" value={formData.ft_L_bot || ''} onChange={(v)=>handleInputChange('ft_L_bot', v)} error={errors.ft_L_bot} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 2.00" />
                    <InputField label="Top Width (B2)" value={formData.ft_B_top || ''} onChange={(v)=>handleInputChange('ft_B_top', v)} error={errors.ft_B_top} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 1.00" />
                    <InputField label="Top Length (L2)" value={formData.ft_L_top || ''} onChange={(v)=>handleInputChange('ft_L_top', v)} error={errors.ft_L_top} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 1.00" />
                  </>
                )}
                {formData.subType === 'combined' && (
                  <>
                    <InputField label="Footing Width (B)" value={formData.ft_B || ''} onChange={(v)=>handleInputChange('ft_B', v)} error={errors.ft_B} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 2.20" />
                    <InputField label="Footing Length (L)" value={formData.ft_L || ''} onChange={(v)=>handleInputChange('ft_L', v)} error={errors.ft_L} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 4.50" />
                  </>
                )}
                {formData.subType === 'strap' && (
                  <>
                    <InputField label="Pad-1 Side (a1)" value={formData.ft_a1 || ''} onChange={(v)=>handleInputChange('ft_a1', v)} error={errors.ft_a1} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 1.50" />
                    <InputField label="Pad-2 Side (a2)" value={formData.ft_a2 || ''} onChange={(v)=>handleInputChange('ft_a2', v)} error={errors.ft_a2} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 1.20" />
                    <InputField label="Strap Length (L)" value={formData.strap_len || ''} onChange={(v)=>handleInputChange('strap_len', v)} error={errors.strap_len} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 3.00" />
                    <InputField label="Strap Breadth (b)" value={formData.strap_b || ''} onChange={(v)=>handleInputChange('strap_b', v)} error={errors.strap_b} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.30" />
                    <InputField label="Strap Depth (D)" value={formData.strap_D || ''} onChange={(v)=>handleInputChange('strap_D', v)} error={errors.strap_D} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.45" />
                  </>
                )}
                {formData.subType === 'stepped' && (
                  <>
                    <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">Provide Step 1 (required) and optionally Steps 2–3.</p>
                    <InputField label="Step 1 Width (B1)" value={formData.st1_B || ''} onChange={(v)=>handleInputChange('st1_B', v)} error={errors.st1_B} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 2.00" />
                    <InputField label="Step 1 Length (L1)" value={formData.st1_L || ''} onChange={(v)=>handleInputChange('st1_L', v)} error={errors.st1_L} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 2.50" />
                    <InputField label="Step 1 Thickness (t1)" value={formData.st1_t || ''} onChange={(v)=>handleInputChange('st1_t', v)} error={errors.st1_t} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.30" />
                    <div className="mt-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <InputField label="Step 2 Width (B2)" value={formData.st2_B || ''} onChange={(v)=>handleInputChange('st2_B', v)} error={errors.st2_B} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="optional" />
                      <InputField label="Step 2 Length (L2)" value={formData.st2_L || ''} onChange={(v)=>handleInputChange('st2_L', v)} error={errors.st2_L} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="optional" />
                      <InputField label="Step 2 Thickness (t2)" value={formData.st2_t || ''} onChange={(v)=>handleInputChange('st2_t', v)} error={errors.st2_t} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="optional" />
                    </div>
                    <div className="mt-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <InputField label="Step 3 Width (B3)" value={formData.st3_B || ''} onChange={(v)=>handleInputChange('st3_B', v)} error={errors.st3_B} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="optional" />
                      <InputField label="Step 3 Length (L3)" value={formData.st3_L || ''} onChange={(v)=>handleInputChange('st3_L', v)} error={errors.st3_L} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="optional" />
                      <InputField label="Step 3 Thickness (t3)" value={formData.st3_t || ''} onChange={(v)=>handleInputChange('st3_t', v)} error={errors.st3_t} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="optional" />
                    </div>
                  </>
                )}
                {formData.subType === 'mat' && (
                  <>
                    <InputField label="Mat Width (B)" value={formData.ft_B || ''} onChange={(v)=>handleInputChange('ft_B', v)} error={errors.ft_B} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 6.00" />
                    <InputField label="Mat Length (L)" value={formData.ft_L || ''} onChange={(v)=>handleInputChange('ft_L', v)} error={errors.ft_L} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 8.00" />
                  </>
                )}
              </>
            )}

            {formData.elementType === 'staircase' && (
              <>
                <InputField label="Riser (m)" value={formData.stair_riser || ''} onChange={(v)=>handleInputChange('stair_riser', v)} error={errors.stair_riser} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.150" />
                <InputField label="Tread (m)" value={formData.stair_tread || ''} onChange={(v)=>handleInputChange('stair_tread', v)} error={errors.stair_tread} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.300" />
                <InputField label="Steps (count)" value={formData.stair_steps || ''} onChange={(v)=>handleInputChange('stair_steps', v)} error={errors.stair_steps} placeholder="e.g., 10" />
                <InputField label="Stair Width (m)" value={formData.stair_width || ''} onChange={(v)=>handleInputChange('stair_width', v)} error={errors.stair_width} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 1.0" />
                <InputField label="Landing Length (m) (optional)" value={formData.stair_landing_len || ''} onChange={(v)=>handleInputChange('stair_landing_len', v)} placeholder="e.g., 1.2" />
                {(formData.subType === 'dogleg' || formData.subType === 'quarter_turn') && (
                  <InputField label="Steps (flight 2)" value={formData.stair_steps2 || ''} onChange={(v)=>handleInputChange('stair_steps2', v)} error={errors.stair_steps2} placeholder="e.g., 10" />
                )}
              </>
            )}

            {formData.elementType === 'beam' && (
              <>
                <InputField label="Beam Breadth (b)" value={formData.beam_b || ''} onChange={(v)=>handleInputChange('beam_b', v)} error={errors.beam_b} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.300" />
                <InputField label="Beam Depth (D)" value={formData.beam_D || ''} onChange={(v)=>handleInputChange('beam_D', v)} error={errors.beam_D} unit={getLengthUnit()} isLength currentUnit={formData.unit} placeholder="e.g., 0.450" />
              </>
            )}

            <InputField
              label="Height/Thickness"
              value={formData.height}
              onChange={(value) => handleInputChange('height', value)}
              error={errors.height}
              unit={getLengthUnit()}
              isLength={true}
              currentUnit={formData.unit}
              placeholder="Enter height/thickness"
            />

            {/* Concrete Mix Type */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Concrete Mix Type
              </label>
              <select
                value={formData.mixType}
                onChange={(e) => handleInputChange('mixType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800"
              >
                {CONCRETE_MIX_TYPES.map((mix) => (
                  <option key={mix.value} value={mix.value}>
                    {mix.label} - {mix.strength}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Wastage Factor"
              value={formData.wastageFactor}
              onChange={(value) => handleInputChange('wastageFactor', value)}
              error={errors.wastageFactor}
              unit="%"
              min="0"
              max="30"
              placeholder="Enter wastage factor"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-4">
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
                onClick={() => handleInputChange('showStepByStep', !formData.showStepByStep)}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-display font-medium transition-colors ${
                  formData.showStepByStep
                    ? 'bg-primary text-white'
                    : 'border border-slate-300 bg-white text-heading dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark'
                }`}
              >
                {formData.showStepByStep ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {formData.showStepByStep ? 'Hide' : 'Show'} Steps
              </button>
            </div>

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

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
            >
              {/* Results content */}
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
                        {result.wetVolume.toFixed(3)} {formData.unit === 'm' ? 'm³' : 'ft³'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Dry Volume:</span>
                      <span className="font-mono font-semibold">
                        {result.dryVolume.toFixed(3)} {formData.unit === 'm' ? 'm³' : 'ft³'}
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
              {/* Optional engineering summary (non-invasive) */}
              {result.human_summary && (
                <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <b>Engineering Summary:</b> {result.human_summary}
                </div>
              )}
              {/* Steps */}
              {formData.showStepByStep && (
                <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4 font-display text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    Step-by-Step Calculation
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    <li>
                      <span className="font-semibold">Area:</span>{' '}
                      {formData.area
                        ? `${formData.area} ${formData.unit === 'm' ? 'm²' : 'ft²'} (direct input)`
                        : `Length × Width = ${formData.length} × ${formData.width} = ${(parseFloat(formData.length) * parseFloat(formData.width)).toFixed(3)} ${formData.unit === 'm' ? 'm²' : 'ft²'}`}
                    </li>
                    <li>
                      <span className="font-semibold">Height/Thickness:</span> {formData.height}{' '}
                      {formData.unit === 'm' ? 'm' : 'ft'}
                    </li>
                    <li>
                      <span className="font-semibold">Wet Volume:</span> Area × Height ={' '}
                      {result.wetVolume.toFixed(3)} {formData.unit === 'm' ? 'm³' : 'ft³'}
                    </li>
                    <li>
                      <span className="font-semibold">Dry Volume:</span> Wet Volume × 1.54 ={' '}
                      {result.dryVolume.toFixed(3)} {formData.unit === 'm' ? 'm³' : 'ft³'}
                    </li>
                    <li>
                      <span className="font-semibold">Mix Ratio:</span> {result.mixRatio} (Cement :
                      Sand : Aggregate)
                    </li>
                    <li>
                      <span className="font-semibold">Cement Needed:</span>{' '}
                      {result.cementWeight.toFixed(1)} kg ({Math.ceil(result.cementBags)} bags)
                    </li>
                    <li>
                      <span className="font-semibold">Sand Needed:</span>{' '}
                      {result.sandWeight.toFixed(1)} kg (
                      {(result.sandWeight / DENSITIES.sand).toFixed(3)} m³)
                    </li>
                    <li>
                      <span className="font-semibold">Aggregate Needed:</span>{' '}
                      {result.aggregateWeight.toFixed(1)} kg (
                      {(result.aggregateWeight / DENSITIES.aggregate).toFixed(3)} m³)
                    </li>
                  </ol>
                </div>
              )}

              {/* Enhanced Info & FAQ Section */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">
                  Concrete Calculator & Estimator – Simple, Fast, Mobile Friendly & Accurate
                  Material Estimation Tool
                </h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">
                  A Concrete Calculator is an easy-to-use online tool that helps civil engineers,
                  builders, contractors, and DIY enthusiasts quickly estimate the exact quantity of
                  concrete, cement, sand, aggregate, and water required for construction projects.
                  From slabs and beams to columns, footings, and foundations, this tool ensures
                  accurate planning, cost-saving, and minimal material wastage.
                </p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    Why Use a Concrete Calculator?
                  </h3>
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
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    How It Works
                  </h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>
                      Select the type of construction: slab, beam, column, footing, or foundation.
                    </li>
                    <li>
                      Enter the project dimensions: length, width (if irregular then direct area),
                      and thickness/height.
                    </li>
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
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    Standard Concrete Mix Ratios
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>M5: 1:5:10 (cement:sand:aggregate)</li>
                    <li>M7.5: 1:4:8</li>
                    <li>M10: 1:3:6</li>
                    <li>M15: 1:2:4</li>
                    <li>M20: 1:1.5:3</li>
                    <li>M25: 1:1:2</li>
                  </ul>
                  <div className="mt-2 text-sm text-body/60 dark:text-body-dark/60">
                    <span className="font-semibold">Tip:</span> The first number represents cement,
                    the second sand, and the third aggregate. Choose the mix ratio according to
                    project strength requirements.
                  </div>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    FAQs – Concrete Calculator
                  </h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is a concrete calculator?</span>
                      <br />A tool to calculate the amount of concrete and its materials needed for
                      construction projects.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span>
                      <br />
                      Helps in accurate planning, cost-saving, and reducing material wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What units does it support?</span>
                      <br />
                      Volume can be entered in cubic meters or cubic feet, and cement is calculated
                      in bags.
                    </div>
                    <div>
                      <span className="font-semibold">Q4. How to choose the right mix ratio?</span>
                      <br />
                      <ul className="list-disc list-inside ml-6">
                        <li>M5–M10: Low-strength works like leveling or small foundations.</li>
                        <li>M15–M25: Structural works like slabs, beams, and columns.</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold">Q5. Can it handle irregular shapes?</span>
                      <br />
                      Yes, calculate the total volume of the shape and enter it in the calculator
                      for accurate results.
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
