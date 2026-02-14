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
    type = 'text',
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
      if (
        (formData.subType === 'dogleg' ||
          formData.subType === 'quarter_turn' ||
          formData.subType === 'u_shaped') &&
        !formData.stair_steps2
      )
        newErrors.stair_steps2 = 'Enter steps for flight 2'
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
        stair_landing_len: formData.stair_landing_len
          ? parseFloat(formData.stair_landing_len)
          : undefined,
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
      col_b: '',
      col_D: '',
      col_diam: '',
      ft_a: '',
      ft_B: '',
      ft_L: '',
      ft_B_bot: '',
      ft_L_bot: '',
      ft_B_top: '',
      ft_L_top: '',
      ft_a1: '',
      ft_a2: '',
      strap_len: '',
      strap_b: '',
      strap_D: '',
      st1_B: '',
      st1_L: '',
      st1_t: '',
      st2_B: '',
      st2_L: '',
      st2_t: '',
      st3_B: '',
      st3_L: '',
      st3_t: '',
      stair_riser: '',
      stair_tread: '',
      stair_steps: '',
      stair_steps2: '',
      stair_width: '',
      stair_landing_len: '',
      beam_b: '',
      beam_D: '',
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
        col_b: '',
        col_D: '',
        col_diam: '',
        ft_a: '',
        ft_B: '',
        ft_L: '',
        ft_B_bot: '',
        ft_L_bot: '',
        ft_B_top: '',
        ft_L_top: '',
        ft_a1: '',
        ft_a2: '',
        strap_len: '',
        strap_b: '',
        strap_D: '',
        st1_B: '',
        st1_L: '',
        st1_t: '',
        st2_B: '',
        st2_L: '',
        st2_t: '',
        st3_B: '',
        st3_L: '',
        st3_t: '',
        stair_riser: '',
        stair_tread: '',
        stair_steps: '',
        stair_steps2: '',
        stair_width: '',
        stair_landing_len: '',
        beam_b: '',
        beam_D: '',
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
        <div className="p-4 sm:p-6 md:p-8">
          {/* Use Area Toggle Button */}
          <div className="flex flex-wrap justify-end gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              type="button"
              onClick={() => handleInputChange('useArea', !formData.useArea)}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-6 py-2 font-display font-medium shadow-soft transition-all text-sm sm:text-base whitespace-nowrap ${
                formData.useArea
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-secondary text-white hover:bg-secondary/90'
              }`}
            >
              <Info className="h-4 w-4" />
              {formData.useArea ? 'Use Length & Width' : 'Use Area'}
            </button>
          </div>

          {/* Concrete Element Selection */}
          <div className="mb-6">
            <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
              Concrete Element Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {CONCRETE_ELEMENTS.map((element) => (
                <button
                  key={element.value}
                  type="button"
                  onClick={() => handleElementTypeChange(element.value)}
                  className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg font-display font-medium transition-colors text-xs sm:text-sm ${
                    formData.elementType === element.value
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {element.value === 'slab' && <Square className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />}
                  {element.value === 'beam' && <Box className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />}
                  {element.value === 'column' && (
                    <Building className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
                  )}
                  {element.value === 'footing' && <Square className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />}
                  {element.value === 'wall' && <Square className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />}
                  {element.value === 'staircase' && (
                    <Square className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
                  )}
                  <span className="text-[10px] sm:text-xs">{element.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Element Sub-Type Selection (Phase 2 additions) */}
          {formData.elementType === 'slab' && (
            <div className="mb-6">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Slab Type
              </label>
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
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Footing Type
              </label>
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
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Stair Type
              </label>
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
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Column Shape
              </label>
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
                    <InputField
                      label="Column Breadth (b)"
                      value={formData.col_b || ''}
                      onChange={(v) => handleInputChange('col_b', v)}
                      error={errors.col_b}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 0.30"
                    />
                    <InputField
                      label="Column Depth (D)"
                      value={formData.col_D || ''}
                      onChange={(v) => handleInputChange('col_D', v)}
                      error={errors.col_D}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 0.45"
                    />
                  </>
                )}
                {formData.subType === 'square' && (
                  <InputField
                    label="Column Side (b)"
                    value={formData.col_b || ''}
                    onChange={(v) => handleInputChange('col_b', v)}
                    error={errors.col_b}
                    unit={getLengthUnit()}
                    isLength
                    currentUnit={formData.unit}
                    placeholder="e.g., 0.30"
                  />
                )}
                {formData.subType === 'circular' && (
                  <InputField
                    label="Column Diameter (d)"
                    value={formData.col_diam || ''}
                    onChange={(v) => handleInputChange('col_diam', v)}
                    error={errors.col_diam}
                    unit={getLengthUnit()}
                    isLength
                    currentUnit={formData.unit}
                    placeholder="e.g., 0.40"
                  />
                )}
              </>
            )}

            {formData.elementType === 'footing' && (
              <>
                {(formData.subType === 'iso_square' || !formData.subType) && (
                  <InputField
                    label="Footing Side (a)"
                    value={formData.ft_a || ''}
                    onChange={(v) => handleInputChange('ft_a', v)}
                    error={errors.ft_a}
                    unit={getLengthUnit()}
                    isLength
                    currentUnit={formData.unit}
                    placeholder="e.g., 1.80"
                  />
                )}
                {formData.subType === 'iso_rect' && (
                  <>
                    <InputField
                      label="Footing Width (B)"
                      value={formData.ft_B || ''}
                      onChange={(v) => handleInputChange('ft_B', v)}
                      error={errors.ft_B}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 1.50"
                    />
                    <InputField
                      label="Footing Length (L)"
                      value={formData.ft_L || ''}
                      onChange={(v) => handleInputChange('ft_L', v)}
                      error={errors.ft_L}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 2.20"
                    />
                  </>
                )}
                {formData.subType === 'iso_frustum' && (
                  <>
                    <InputField
                      label="Bottom Width (B1)"
                      value={formData.ft_B_bot || ''}
                      onChange={(v) => handleInputChange('ft_B_bot', v)}
                      error={errors.ft_B_bot}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 2.00"
                    />
                    <InputField
                      label="Bottom Length (L1)"
                      value={formData.ft_L_bot || ''}
                      onChange={(v) => handleInputChange('ft_L_bot', v)}
                      error={errors.ft_L_bot}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 2.00"
                    />
                    <InputField
                      label="Top Width (B2)"
                      value={formData.ft_B_top || ''}
                      onChange={(v) => handleInputChange('ft_B_top', v)}
                      error={errors.ft_B_top}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 1.00"
                    />
                    <InputField
                      label="Top Length (L2)"
                      value={formData.ft_L_top || ''}
                      onChange={(v) => handleInputChange('ft_L_top', v)}
                      error={errors.ft_L_top}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 1.00"
                    />
                  </>
                )}
                {formData.subType === 'combined' && (
                  <>
                    <InputField
                      label="Footing Width (B)"
                      value={formData.ft_B || ''}
                      onChange={(v) => handleInputChange('ft_B', v)}
                      error={errors.ft_B}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 2.20"
                    />
                    <InputField
                      label="Footing Length (L)"
                      value={formData.ft_L || ''}
                      onChange={(v) => handleInputChange('ft_L', v)}
                      error={errors.ft_L}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 4.50"
                    />
                  </>
                )}
                {formData.subType === 'strap' && (
                  <>
                    <InputField
                      label="Pad-1 Side (a1)"
                      value={formData.ft_a1 || ''}
                      onChange={(v) => handleInputChange('ft_a1', v)}
                      error={errors.ft_a1}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 1.50"
                    />
                    <InputField
                      label="Pad-2 Side (a2)"
                      value={formData.ft_a2 || ''}
                      onChange={(v) => handleInputChange('ft_a2', v)}
                      error={errors.ft_a2}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 1.20"
                    />
                    <InputField
                      label="Strap Length (L)"
                      value={formData.strap_len || ''}
                      onChange={(v) => handleInputChange('strap_len', v)}
                      error={errors.strap_len}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 3.00"
                    />
                    <InputField
                      label="Strap Breadth (b)"
                      value={formData.strap_b || ''}
                      onChange={(v) => handleInputChange('strap_b', v)}
                      error={errors.strap_b}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 0.30"
                    />
                    <InputField
                      label="Strap Depth (D)"
                      value={formData.strap_D || ''}
                      onChange={(v) => handleInputChange('strap_D', v)}
                      error={errors.strap_D}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 0.45"
                    />
                  </>
                )}
                {formData.subType === 'stepped' && (
                  <>
                    <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
                      Provide Step 1 (required) and optionally Steps 2–3.
                    </p>
                    <InputField
                      label="Step 1 Width (B1)"
                      value={formData.st1_B || ''}
                      onChange={(v) => handleInputChange('st1_B', v)}
                      error={errors.st1_B}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 2.00"
                    />
                    <InputField
                      label="Step 1 Length (L1)"
                      value={formData.st1_L || ''}
                      onChange={(v) => handleInputChange('st1_L', v)}
                      error={errors.st1_L}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 2.50"
                    />
                    <InputField
                      label="Step 1 Thickness (t1)"
                      value={formData.st1_t || ''}
                      onChange={(v) => handleInputChange('st1_t', v)}
                      error={errors.st1_t}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 0.30"
                    />
                    <div className="mt-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <InputField
                        label="Step 2 Width (B2)"
                        value={formData.st2_B || ''}
                        onChange={(v) => handleInputChange('st2_B', v)}
                        error={errors.st2_B}
                        unit={getLengthUnit()}
                        isLength
                        currentUnit={formData.unit}
                        placeholder="optional"
                      />
                      <InputField
                        label="Step 2 Length (L2)"
                        value={formData.st2_L || ''}
                        onChange={(v) => handleInputChange('st2_L', v)}
                        error={errors.st2_L}
                        unit={getLengthUnit()}
                        isLength
                        currentUnit={formData.unit}
                        placeholder="optional"
                      />
                      <InputField
                        label="Step 2 Thickness (t2)"
                        value={formData.st2_t || ''}
                        onChange={(v) => handleInputChange('st2_t', v)}
                        error={errors.st2_t}
                        unit={getLengthUnit()}
                        isLength
                        currentUnit={formData.unit}
                        placeholder="optional"
                      />
                    </div>
                    <div className="mt-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <InputField
                        label="Step 3 Width (B3)"
                        value={formData.st3_B || ''}
                        onChange={(v) => handleInputChange('st3_B', v)}
                        error={errors.st3_B}
                        unit={getLengthUnit()}
                        isLength
                        currentUnit={formData.unit}
                        placeholder="optional"
                      />
                      <InputField
                        label="Step 3 Length (L3)"
                        value={formData.st3_L || ''}
                        onChange={(v) => handleInputChange('st3_L', v)}
                        error={errors.st3_L}
                        unit={getLengthUnit()}
                        isLength
                        currentUnit={formData.unit}
                        placeholder="optional"
                      />
                      <InputField
                        label="Step 3 Thickness (t3)"
                        value={formData.st3_t || ''}
                        onChange={(v) => handleInputChange('st3_t', v)}
                        error={errors.st3_t}
                        unit={getLengthUnit()}
                        isLength
                        currentUnit={formData.unit}
                        placeholder="optional"
                      />
                    </div>
                  </>
                )}
                {formData.subType === 'mat' && (
                  <>
                    <InputField
                      label="Mat Width (B)"
                      value={formData.ft_B || ''}
                      onChange={(v) => handleInputChange('ft_B', v)}
                      error={errors.ft_B}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 6.00"
                    />
                    <InputField
                      label="Mat Length (L)"
                      value={formData.ft_L || ''}
                      onChange={(v) => handleInputChange('ft_L', v)}
                      error={errors.ft_L}
                      unit={getLengthUnit()}
                      isLength
                      currentUnit={formData.unit}
                      placeholder="e.g., 8.00"
                    />
                  </>
                )}
              </>
            )}

            {formData.elementType === 'staircase' && (
              <>
                <InputField
                  label="Riser (m)"
                  value={formData.stair_riser || ''}
                  onChange={(v) => handleInputChange('stair_riser', v)}
                  error={errors.stair_riser}
                  unit={getLengthUnit()}
                  isLength
                  currentUnit={formData.unit}
                  placeholder="e.g., 0.150"
                />
                <InputField
                  label="Tread (m)"
                  value={formData.stair_tread || ''}
                  onChange={(v) => handleInputChange('stair_tread', v)}
                  error={errors.stair_tread}
                  unit={getLengthUnit()}
                  isLength
                  currentUnit={formData.unit}
                  placeholder="e.g., 0.300"
                />
                <InputField
                  label="Steps (count)"
                  value={formData.stair_steps || ''}
                  onChange={(v) => handleInputChange('stair_steps', v)}
                  error={errors.stair_steps}
                  placeholder="e.g., 10"
                />
                <InputField
                  label="Stair Width (m)"
                  value={formData.stair_width || ''}
                  onChange={(v) => handleInputChange('stair_width', v)}
                  error={errors.stair_width}
                  unit={getLengthUnit()}
                  isLength
                  currentUnit={formData.unit}
                  placeholder="e.g., 1.0"
                />
                <InputField
                  label="Landing Length (m) (optional)"
                  value={formData.stair_landing_len || ''}
                  onChange={(v) => handleInputChange('stair_landing_len', v)}
                  placeholder="e.g., 1.2"
                />
                {(formData.subType === 'dogleg' || formData.subType === 'quarter_turn') && (
                  <InputField
                    label="Steps (flight 2)"
                    value={formData.stair_steps2 || ''}
                    onChange={(v) => handleInputChange('stair_steps2', v)}
                    error={errors.stair_steps2}
                    placeholder="e.g., 10"
                  />
                )}
              </>
            )}

            {formData.elementType === 'beam' && (
              <>
                <InputField
                  label="Beam Breadth (b)"
                  value={formData.beam_b || ''}
                  onChange={(v) => handleInputChange('beam_b', v)}
                  error={errors.beam_b}
                  unit={getLengthUnit()}
                  isLength
                  currentUnit={formData.unit}
                  placeholder="e.g., 0.300"
                />
                <InputField
                  label="Beam Depth (D)"
                  value={formData.beam_D || ''}
                  onChange={(v) => handleInputChange('beam_D', v)}
                  error={errors.beam_D}
                  unit={getLengthUnit()}
                  isLength
                  currentUnit={formData.unit}
                  placeholder="e.g., 0.450"
                />
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
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-300 bg-white px-3 sm:px-6 py-2 sm:py-3 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700 text-xs sm:text-sm whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Reset
              </button>

              <button
                type="button"
                onClick={() => handleInputChange('showStepByStep', !formData.showStepByStep)}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 font-display font-medium transition-colors text-xs sm:text-sm whitespace-nowrap ${
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
                {formData.showStepByStep ? 'Hide' : 'Show'} Steps
              </button>
            </div>

            <button
              type="button"
              onClick={calculateConcrete}
              disabled={isCalculating}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-4 sm:px-8 py-2 sm:py-3 font-display font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
            >
              {isCalculating ? (
                <>
                  <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-display">
                {/* Volume Results */}
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4   font-semibold text-heading dark:text-heading-dark">
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
                  <h3 className="mb-4   font-semibold text-heading dark:text-heading-dark">
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
                  <h3 className="mb-4   font-semibold text-heading dark:text-heading-dark">Sand</h3>
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
                  <h3 className="mb-4   font-semibold text-heading dark:text-heading-dark">
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
                <div className="mt-6 font-display rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <b>Engineering Summary:</b> {result.human_summary}
                </div>
              )}
              {/* Steps */}
              {formData.showStepByStep && (
                <div className="mt-6 font-display rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4   text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Enhanced Info & Educational Section */}
      <div className="mt-12 space-y-8 font-display">
        {/* Main Introduction */}
        <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
          <h2 className=" text-2xl font-bold text-heading dark:text-heading-dark mb-4">
            Complete Guide to Concrete Calculation & Construction
          </h2>
          <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
            Concrete is the world&apos;s most widely used construction material, forming the
            backbone of modern infrastructure. Understanding how to accurately calculate concrete
            quantities, mix ratios, and material requirements is essential for contractors, civil
            engineers, architects, and construction professionals. This comprehensive guide covers
            everything from basic volume calculations to advanced concrete technology, ensuring your
            projects are completed efficiently with optimal strength and minimal waste.
          </p>
        </div>

        {/* Why Accurate Calculation Matters */}
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
          <h3 className="  text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
              1
            </span>
            Why Accurate Concrete Calculation Matters
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
              <h4 className="  font-semibold text-green-800 dark:text-green-200 mb-2">
                Cost Optimization
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Concrete accounts for 65-75% of total construction costs. Precise calculations
                prevent over-ordering (which wastes 8-12% of material costs) and under-ordering
                (causing project delays and additional delivery charges).
              </p>
            </div>
            <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
              <h4 className="  font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Structural Integrity
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Proper mix ratios and accurate quantities ensure concrete achieves design strength.
                Incorrect calculations can compromise structural safety and lead to costly repairs
                or reconstruction.
              </p>
            </div>
            <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
              <h4 className="  font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Project Efficiency
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Accurate calculations enable just-in-time delivery, reduce storage requirements, and
                optimize labor allocation. Well-planned concrete pours reduce construction time by
                20-30%.
              </p>
            </div>
            <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
              <h4 className="  font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Environmental Impact
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Cement production generates 8-10% of global CO₂ emissions. Reducing concrete waste
                through accurate calculations directly lowers your project&apos;s carbon footprint
                and environmental impact.
              </p>
            </div>
          </div>
        </div>

        {/* Concrete Mix Types */}
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
          <h3 className="  text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
              2
            </span>
            Concrete Mix Types and Their Applications
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left   font-semibold text-heading dark:text-heading-dark">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-left   font-semibold text-heading dark:text-heading-dark">
                    Mix Ratio (C:S:A)
                  </th>
                  <th className="px-4 py-3 text-left   font-semibold text-heading dark:text-heading-dark">
                    Strength (MPa)
                  </th>
                  <th className="px-4 py-3 text-left   font-semibold text-heading dark:text-heading-dark">
                    Applications
                  </th>
                  <th className="px-4 py-3 text-left   font-semibold text-heading dark:text-heading-dark">
                    Setting Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
                <tr className="bg-white/50 dark:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium">M5</td>
                  <td className="px-4 py-3">1:5:10</td>
                  <td className="px-4 py-3">5 MPa</td>
                  <td className="px-4 py-3">Non-structural, foundation beds</td>
                  <td className="px-4 py-3">45-60 min</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">M7.5</td>
                  <td className="px-4 py-3">1:4:8</td>
                  <td className="px-4 py-3">7.5 MPa</td>
                  <td className="px-4 py-3">Foundation, floor base</td>
                  <td className="px-4 py-3">40-55 min</td>
                </tr>
                <tr className="bg-white/50 dark:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium">M10</td>
                  <td className="px-4 py-3">1:3:6</td>
                  <td className="px-4 py-3">10 MPa</td>
                  <td className="px-4 py-3">Non-structural walls, pathways</td>
                  <td className="px-4 py-3">40-50 min</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">M15</td>
                  <td className="px-4 py-3">1:2:4</td>
                  <td className="px-4 py-3">15 MPa</td>
                  <td className="px-4 py-3">Beams, slabs, columns</td>
                  <td className="px-4 py-3">35-45 min</td>
                </tr>
                <tr className="bg-white/50 dark:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium">M20</td>
                  <td className="px-4 py-3">1:1.5:3</td>
                  <td className="px-4 py-3">20 MPa</td>
                  <td className="px-4 py-3">RCC structures, foundations</td>
                  <td className="px-4 py-3">30-40 min</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">M25</td>
                  <td className="px-4 py-3">1:1:2</td>
                  <td className="px-4 py-3">25 MPa</td>
                  <td className="px-4 py-3">Heavy RCC, prestressed</td>
                  <td className="px-4 py-3">25-35 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Structural Elements Guide */}
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
          <h3 className="  text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
              3
            </span>
            Structural Elements and Volume Calculations
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
              <h4 className="  font-semibold text-blue-800 dark:text-blue-200 mb-2">🏛️ Columns</h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
                <strong>Volume = π × r² × h</strong> (circular) or <strong>l × b × h</strong>{' '}
                (rectangular)
              </p>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Standard sizes: 230×300mm, 300×450mm, 450×600mm. Include 5% extra for lap length and
                concrete cover.
              </p>
            </div>
            <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
              <h4 className="  font-semibold text-green-800 dark:text-green-200 mb-2">
                🏗️ Footings
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
                <strong>Volume = L × B × D</strong> (isolated) or trapezoidal formula for stepped
                footings
              </p>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Minimum depth: 150mm below ground level. Include 10% extra for soil displacement and
                uneven base.
              </p>
            </div>
            <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
              <h4 className="  font-semibold text-amber-800 dark:text-amber-200 mb-2">🪜 Stairs</h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
                <strong>Volume = (Riser × Tread × Width × Steps) + Landing Volume</strong>
              </p>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Standard riser: 150mm, tread: 250mm. Include 5% extra for wastage during formwork
                removal.
              </p>
            </div>
            <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
              <h4 className="  font-semibold text-purple-800 dark:text-purple-200 mb-2">
                📐 Beams
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
                <strong>Volume = Length × Width × Depth</strong>
              </p>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Standard depth: L/12 to L/16. Include 3% extra for camber and formwork variations.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
          <h3 className="  text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
              4
            </span>
            Concrete Construction Best Practices
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
              <h5 className="  font-semibold text-purple-800 dark:text-purple-200 mb-1">
                ✅ Proper Mix Design
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Follow IS 10262:2019 for mix design. Consider exposure conditions, aggregate size,
                and admixtures for optimal performance.
              </p>
            </div>
            <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
              <h5 className="  font-semibold text-green-800 dark:text-green-200 mb-1">
                ✅ Quality Materials
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Use cement within 90 days of manufacture. Store aggregates separately to avoid
                contamination. Test water quality regularly.
              </p>
            </div>
            <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
              <h5 className="  font-semibold text-blue-800 dark:text-blue-200 mb-1">
                ✅ Proper Curing
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Cure for minimum 7 days (14 days for high-strength concrete). Maintain temperature
                above 5°C and keep surface moist continuously.
              </p>
            </div>
            <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
              <h5 className="  font-semibold text-amber-800 dark:text-amber-200 mb-1">
                ✅ Formwork Preparation
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Clean formwork thoroughly, apply release agents, check alignment and dimensions.
                Ensure tight joints to prevent cement leakage.
              </p>
            </div>
            <div className="rounded-lg bg-rose-50/50 p-4 dark:bg-rose-900/20 border border-rose-200/30 dark:border-rose-700/30">
              <h5 className="  font-semibold text-rose-800 dark:text-rose-200 mb-1">
                ✅ Proper Compaction
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Use mechanical vibrators for dense concrete. Avoid over-vibration which causes
                segregation. Ensure proper compaction around reinforcement.
              </p>
            </div>
            <div className="rounded-lg bg-cyan-50/50 p-4 dark:bg-cyan-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
              <h5 className="  font-semibold text-cyan-800 dark:text-cyan-200 mb-1">
                ✅ Temperature Control
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Pour concrete at 20-30°C. In hot weather, use ice water or retarders. In cold
                weather, use heated water or accelerating admixtures.
              </p>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
          <h3 className="  text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm">
              5
            </span>
            Common Mistakes to Avoid in Concrete Work
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
              <h5 className="  font-semibold text-red-800 dark:text-red-200 mb-1">
                ❌ Incorrect Water-Cement Ratio
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Too much water reduces strength by 30-50%. Maintain w/c ratio between 0.45-0.55 for
                normal concrete. Use plasticizers if workability is needed.
              </p>
            </div>
            <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
              <h5 className="  font-semibold text-red-800 dark:text-red-200 mb-1">
                ❌ Inadequate Curing
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Skipping curing reduces strength by 40-50%. Concrete gains only 60% strength in 7
                days without proper curing.
              </p>
            </div>
            <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
              <h5 className="  font-semibold text-red-800 dark:text-red-200 mb-1">
                ❌ Poor Aggregate Quality
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Contaminated or weak aggregates compromise concrete strength. Use well-graded, clean
                aggregates with proper testing.
              </p>
            </div>
            <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
              <h5 className="  font-semibold text-red-800 dark:text-red-200 mb-1">
                ❌ Insufficient Compaction
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Honeycombing and voids reduce structural capacity. Proper vibration is essential for
                dense, homogeneous concrete.
              </p>
            </div>
            <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
              <h5 className="  font-semibold text-red-800 dark:text-red-200 mb-1">
                ❌ Adding Water on Site
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Adding water to improve workability severely reduces strength. Use admixtures
                instead of water for workability adjustments.
              </p>
            </div>
            <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
              <h5 className="  font-semibold text-red-800 dark:text-red-200 mb-1">
                ❌ Ignoring Reinforcement Cover
              </h5>
              <p className="text-sm text-body/70 dark:text-body-dark/70">
                Inadequate cover leads to corrosion and spalling. Maintain minimum cover: 20mm for
                slabs, 40mm for foundations.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
          <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
              6
            </span>
            Frequently Asked Questions (FAQs) About Concrete Calculation
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q1: How much cement is needed for 1 cubic meter of concrete?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                For M20 grade concrete (1:1.5:3 mix), you need approximately 7-8 bags of 50kg cement
                (350-400 kg) per m³. This varies based on the mix ratio: M15 requires 6-7 bags, M25
                needs 8-9 bags per m³.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q2: What is the difference between nominal and design mix?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Nominal mix (M5-M20) uses standard proportions like 1:2:4. Design mix (M25+) is
                engineered based on material properties and requirements. Design mix provides better
                quality control and optimization for specific applications.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q3: How do I calculate concrete for stairs?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Calculate volume of each step (riser × tread × width), multiply by number of steps,
                then add landing volume. Include 5% extra for wastage and formwork variations. This
                calculator automates stair calculations with precise formulas.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q4: What is the standard slump for concrete?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Standard slump ranges: 25-50mm for foundations, 75-100mm for beams and columns,
                100-150mm for pumped concrete. Slump indicates workability - higher slump means more
                fluid concrete.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q5: How long should concrete be cured?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Minimum 7 days for ordinary concrete, 14 days for high-strength concrete. Proper
                curing is essential as concrete gains only 60% strength in 7 days, 75% in 14 days,
                and 90% in 28 days.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q6: What is the density of concrete?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Normal weight concrete: 2400-2500 kg/m³. Lightweight concrete: 1600-2000 kg/m³.
                Heavyweight concrete (for radiation shielding): 3000-4000 kg/m³. Use 2400 kg/m³ for
                standard calculations.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q7: How much does concrete cost per cubic meter?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                In India (2024): M20 concrete costs ₹4,500-6,000 per m³ including materials and
                labor. In the US: $100-150 per cubic yard. Prices vary by grade, location, and
                market conditions.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q8: Can I use the same mix for all structural elements?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                No. Foundations typically use M15-M20, columns and beams use M20-M25, slabs use
                M20-M25. Higher grades are used for precast elements and heavy loads. Match concrete
                grade to structural requirements.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q9: What is the 1.54 factor in concrete calculations?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                The 1.54 factor converts wet concrete volume to dry material volume. When mixed with
                water, sand and aggregate fill voids and compact. This ensures you order enough dry
                materials for the required wet volume.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
              <h4 className="  font-semibold text-heading dark:text-heading-dark mb-2">
                Q10: When can I remove formwork from concrete?
              </h4>
              <p className="text-sm text-body/80 dark:text-body-dark/80">
                Vertical formwork: 24-48 hours. Slab formwork (with props): 7-14 days. Beam
                formwork: 14-21 days. Remove based on concrete strength development - faster in warm
                weather, slower in cold conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Summary CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
          <h3 className="  text-xl font-bold text-heading dark:text-heading-dark mb-3">
            Start Your Concrete Calculation Now
          </h3>
          <p className="mb-4 text-white/90">
            Use the calculator above to get precise material estimates for your concrete project.
            With accurate calculations, you will save money, reduce waste, and ensure your
            construction meets the highest quality standards. Perfect for contractors, engineers,
            architects, and construction professionals.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/20 px-3 py-1">
              ✓ Multiple Structural Elements
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1">✓ All Concrete Grades</span>
            <span className="rounded-full bg-white/20 px-3 py-1">✓ Step-by-Step Calculations</span>
            <span className="rounded-full bg-white/20 px-3 py-1">✓ Material Optimization</span>
            <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
          </div>
        </div>
      </div>
    </div>
  )
}
