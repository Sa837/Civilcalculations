'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import type { ConcreteProjectItem } from '@/lib/registry/calculator/concrete-calculator'
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
import { CONCRETE_INFO_SECTION } from '@/lib/registry/calculator/enhanced-info-section/concrete-info-section'
import {
  PremiumFeatureGate,
  PremiumLockedButton,
  PremiumLockedAction,
} from './advanced-estimate-gate'

const CALC_ID = 'concrete'
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
  reinforcement?: any
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
  // Slab reinforcement
  slabTopMainDiaMm?: string
  slabTopMainSpacingMm?: string
  slabTopDistDiaMm?: string
  slabTopDistSpacingMm?: string
  slabBottomMainDiaMm?: string
  slabBottomMainSpacingMm?: string
  slabBottomDistDiaMm?: string
  slabBottomDistSpacingMm?: string
  slabClearCoverMm?: string
  slabExtraRebarPercent?: string
  // Beam reinforcement
  beamTopBarCount?: string
  beamTopBarDiaMm?: string
  beamBottomBarCount?: string
  beamBottomBarDiaMm?: string
  beamStirrupDiaMm?: string
  beamStirrupSpacingMm?: string
  beamClearCoverMm?: string
  beamExtraRebarPercent?: string
  // Column reinforcement
  columnMainBarCount?: string
  columnMainBarDiaMm?: string
  columnTieDiaMm?: string
  columnTieSpacingMm?: string
  columnClearCoverMm?: string
  columnExtraRebarPercent?: string
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
  // Footing reinforcement
  footingRebarDiaMm?: string
  footingRebarSpacingMm?: string
  footingClearCoverMm?: string
  footingExtraRebarPercent?: string
  // Stair reinforcement
  stairMainBarDiaMm?: string
  stairMainBarSpacingMm?: string
  stairDistBarDiaMm?: string
  stairDistBarSpacingMm?: string
  stairClearCoverMm?: string
  stairExtraRebarPercent?: string
  // Wall reinforcement
  wallVerticalBarDiaMm?: string
  wallVerticalBarSpacingMm?: string
  wallHorizontalBarDiaMm?: string
  wallHorizontalBarSpacingMm?: string
  wallClearCoverMm?: string
  wallExtraRebarPercent?: string
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
    <div className="mt-6 p-4 rounded-xl  ">
      <h3 className="font-medium text-heading dark:text-heading-dark mb-3 text-center">
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

        {formData.elementType === 'footing' && (
          <>
            <rect x="70" y="80" width="160" height="60" rx="8" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
            <line x1="70" y1="80" x2="230" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="230" y1="80" x2="70" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" />
            <text x="150" y="110" textAnchor="middle" fontSize="14" fill="#1e293b" fontWeight="bold">
              Footing
            </text>
          </>
        )}

        {formData.elementType === 'wall' && (
          <>
            <rect x="80" y="60" width="140" height="90" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
            <line x1="95" y1="60" x2="95" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="195" y1="60" x2="195" y2="150" stroke="#475569" strokeWidth="2" />
            <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#1e293b" fontWeight="bold">
              Wall
            </text>
          </>
        )}

        {formData.elementType === 'staircase' && (
          <>
            <rect x="80" y="60" width="140" height="100" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
            <path d="M90 150 L90 120 L120 120 L120 90 L150 90 L150 60 L180 60" stroke="#64748b" strokeWidth="3" fill="none" />
            <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#1e293b" fontWeight="bold">
              Staircase
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

      <div className="mt-2 text-xs text-center text-slate-600 dark:text-slate-300">
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
        <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
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

const PROJECT_STORAGE_KEY = 'civil-concrete-project-v1'

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
  const [projectItems, setProjectItems] = useState<ConcreteProjectItem[]>([])
  const [projectName, setProjectName] = useState('Building Estimate')
  const [projectRateInputs, setProjectRateInputs] = useState<Record<string, { concreteRate: string; steelRate: string }>>({})
  const [projectSummary, setProjectSummary] = useState<ReturnType<typeof ConcreteCalculatorLib.summarizeProject> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const saved = window.localStorage.getItem(PROJECT_STORAGE_KEY)
      if (!saved) return

      const parsed = JSON.parse(saved) as {
        projectName?: string
        projectItems?: ConcreteProjectItem[]
        projectRateInputs?: Record<string, { concreteRate: string; steelRate: string }>
      }

      if (parsed.projectName) setProjectName(parsed.projectName)
      if (parsed.projectItems && parsed.projectItems.length > 0) {
        setProjectItems(parsed.projectItems)
        setProjectSummary(ConcreteCalculatorLib.summarizeProject(parsed.projectItems))
      }
      if (parsed.projectRateInputs) {
        setProjectRateInputs(parsed.projectRateInputs)
      }
    } catch {
      window.localStorage.removeItem(PROJECT_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      PROJECT_STORAGE_KEY,
      JSON.stringify({ projectName, projectItems, projectRateInputs }),
    )
  }, [projectName, projectItems, projectRateInputs])

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
        footingRebarDiaMm: formData.footingRebarDiaMm ? parseFloat(formData.footingRebarDiaMm) : undefined,
        footingRebarSpacingMm: formData.footingRebarSpacingMm ? parseFloat(formData.footingRebarSpacingMm) : undefined,
        footingClearCoverMm: formData.footingClearCoverMm ? parseFloat(formData.footingClearCoverMm) : undefined,
        footingExtraRebarPercent: formData.footingExtraRebarPercent ? parseFloat(formData.footingExtraRebarPercent) : undefined,
        stair_tread: formData.stair_tread ? parseFloat(formData.stair_tread) : undefined,
        stair_steps: formData.stair_steps ? parseFloat(formData.stair_steps) : undefined,
        stair_steps2: formData.stair_steps2 ? parseFloat(formData.stair_steps2) : undefined,
        stair_width: formData.stair_width ? parseFloat(formData.stair_width) : undefined,
        stair_landing_len: formData.stair_landing_len
          ? parseFloat(formData.stair_landing_len)
          : undefined,
        stairMainBarDiaMm: formData.stairMainBarDiaMm ? parseFloat(formData.stairMainBarDiaMm) : undefined,
        stairMainBarSpacingMm: formData.stairMainBarSpacingMm ? parseFloat(formData.stairMainBarSpacingMm) : undefined,
        stairDistBarDiaMm: formData.stairDistBarDiaMm ? parseFloat(formData.stairDistBarDiaMm) : undefined,
        stairDistBarSpacingMm: formData.stairDistBarSpacingMm ? parseFloat(formData.stairDistBarSpacingMm) : undefined,
        stairClearCoverMm: formData.stairClearCoverMm ? parseFloat(formData.stairClearCoverMm) : undefined,
        stairExtraRebarPercent: formData.stairExtraRebarPercent ? parseFloat(formData.stairExtraRebarPercent) : undefined,
        wallVerticalBarDiaMm: formData.wallVerticalBarDiaMm ? parseFloat(formData.wallVerticalBarDiaMm) : undefined,
        wallVerticalBarSpacingMm: formData.wallVerticalBarSpacingMm ? parseFloat(formData.wallVerticalBarSpacingMm) : undefined,
        wallHorizontalBarDiaMm: formData.wallHorizontalBarDiaMm ? parseFloat(formData.wallHorizontalBarDiaMm) : undefined,
        wallHorizontalBarSpacingMm: formData.wallHorizontalBarSpacingMm ? parseFloat(formData.wallHorizontalBarSpacingMm) : undefined,
        wallClearCoverMm: formData.wallClearCoverMm ? parseFloat(formData.wallClearCoverMm) : undefined,
        wallExtraRebarPercent: formData.wallExtraRebarPercent ? parseFloat(formData.wallExtraRebarPercent) : undefined,
        // Beam
        beam_b: formData.beam_b ? parseFloat(formData.beam_b) : undefined,
        beam_D: formData.beam_D ? parseFloat(formData.beam_D) : undefined,
        // Slab reinforcement
        slabTopMainDiaMm: formData.slabTopMainDiaMm ? parseFloat(formData.slabTopMainDiaMm) : undefined,
        slabTopMainSpacingMm: formData.slabTopMainSpacingMm ? parseFloat(formData.slabTopMainSpacingMm) : undefined,
        slabTopDistDiaMm: formData.slabTopDistDiaMm ? parseFloat(formData.slabTopDistDiaMm) : undefined,
        slabTopDistSpacingMm: formData.slabTopDistSpacingMm ? parseFloat(formData.slabTopDistSpacingMm) : undefined,
        slabBottomMainDiaMm: formData.slabBottomMainDiaMm ? parseFloat(formData.slabBottomMainDiaMm) : undefined,
        slabBottomMainSpacingMm: formData.slabBottomMainSpacingMm ? parseFloat(formData.slabBottomMainSpacingMm) : undefined,
        slabBottomDistDiaMm: formData.slabBottomDistDiaMm ? parseFloat(formData.slabBottomDistDiaMm) : undefined,
        slabBottomDistSpacingMm: formData.slabBottomDistSpacingMm ? parseFloat(formData.slabBottomDistSpacingMm) : undefined,
        slabClearCoverMm: formData.slabClearCoverMm ? parseFloat(formData.slabClearCoverMm) : undefined,
        slabExtraRebarPercent: formData.slabExtraRebarPercent ? parseFloat(formData.slabExtraRebarPercent) : undefined,
        // Beam reinforcement
        beamTopBarCount: formData.beamTopBarCount ? parseInt(formData.beamTopBarCount, 10) : undefined,
        beamTopBarDiaMm: formData.beamTopBarDiaMm ? parseFloat(formData.beamTopBarDiaMm) : undefined,
        beamBottomBarCount: formData.beamBottomBarCount ? parseInt(formData.beamBottomBarCount, 10) : undefined,
        beamBottomBarDiaMm: formData.beamBottomBarDiaMm ? parseFloat(formData.beamBottomBarDiaMm) : undefined,
        beamStirrupDiaMm: formData.beamStirrupDiaMm ? parseFloat(formData.beamStirrupDiaMm) : undefined,
        beamStirrupSpacingMm: formData.beamStirrupSpacingMm ? parseFloat(formData.beamStirrupSpacingMm) : undefined,
        beamClearCoverMm: formData.beamClearCoverMm ? parseFloat(formData.beamClearCoverMm) : undefined,
        beamExtraRebarPercent: formData.beamExtraRebarPercent ? parseFloat(formData.beamExtraRebarPercent) : undefined,
        // Column reinforcement
        columnMainBarCount: formData.columnMainBarCount ? parseInt(formData.columnMainBarCount, 10) : undefined,
        columnMainBarDiaMm: formData.columnMainBarDiaMm ? parseFloat(formData.columnMainBarDiaMm) : undefined,
        columnTieDiaMm: formData.columnTieDiaMm ? parseFloat(formData.columnTieDiaMm) : undefined,
        columnTieSpacingMm: formData.columnTieSpacingMm ? parseFloat(formData.columnTieSpacingMm) : undefined,
        columnClearCoverMm: formData.columnClearCoverMm ? parseFloat(formData.columnClearCoverMm) : undefined,
        columnExtraRebarPercent: formData.columnExtraRebarPercent ? parseFloat(formData.columnExtraRebarPercent) : undefined,
      }

      const result = ConcreteCalculatorLib.calculate(input)
      setResult(result)

      const itemId = `item-${Date.now()}`
      const componentLabel = CONCRETE_ELEMENTS.find((e) => e.value === formData.elementType)?.label || 'Component'
      const newItem: ConcreteProjectItem = {
        id: itemId,
        name: `${projectName.trim() || 'Building Estimate'} • ${componentLabel} ${projectItems.length + 1}`,
        elementType: formData.elementType,
        input,
        result,
        concreteRate: projectRateInputs[itemId]?.concreteRate ? parseFloat(projectRateInputs[itemId].concreteRate) : undefined,
        steelRate: projectRateInputs[itemId]?.steelRate ? parseFloat(projectRateInputs[itemId].steelRate) : undefined,
      }
      setProjectItems((prev) => {
        const nextItems = [...prev, newItem]
        setProjectSummary(ConcreteCalculatorLib.summarizeProject(nextItems))
        return nextItems
      })
      setProjectRateInputs((prev) => ({ ...prev, [itemId]: { concreteRate: prev[itemId]?.concreteRate ?? '', steelRate: prev[itemId]?.steelRate ?? '' } }))
    } catch (error) {
      console.error('Calculation error:', error)
      setErrors({
        general: error instanceof Error ? error.message : 'An error occurred during calculation.',
      })
    } finally {
      setIsCalculating(false)
    }
  }, [formData, projectItems, projectName, projectRateInputs, validateForm])

  const updateProjectRate = useCallback((itemId: string, field: 'concreteRate' | 'steelRate', value: string) => {
    const parsedValue = value ? parseFloat(value) : undefined
    setProjectRateInputs((prev) => ({ ...prev, [itemId]: { ...prev[itemId], [field]: value } }))
    setProjectItems((prev) => {
      const nextItems = prev.map((item) => item.id === itemId ? { ...item, [field]: parsedValue } : item)
      setProjectSummary(ConcreteCalculatorLib.summarizeProject(nextItems))
      return nextItems
    })
  }, [])

  const removeProjectItem = useCallback((itemId: string) => {
    setProjectItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== itemId)
      setProjectSummary(ConcreteCalculatorLib.summarizeProject(nextItems))
      return nextItems
    })
    setProjectRateInputs((prev) => {
      const next = { ...prev }
      delete next[itemId]
      return next
    })
  }, [])

  const clearProject = useCallback(() => {
    setProjectItems([])
    setProjectRateInputs({})
    setProjectSummary(null)
    setProjectName('Building Estimate')
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(PROJECT_STORAGE_KEY)
    }
  }, [])

  const downloadProjectReport = useCallback(() => {
    if (!projectSummary) return

    const fileName = `${(projectName || 'building-estimate').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'building-estimate'}.txt`
    const blob = new Blob([projectSummary.reportText], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(url)
  }, [projectName, projectSummary])

  const exportProjectAsPdf = useCallback(() => {
    if (!projectSummary) return

    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const title = (projectName || 'Building Estimate').trim() || 'Building Estimate'
    const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'building-estimate'

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text(title, 40, 50)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Concrete building estimate summary', 40, 76)
    doc.text(`Total wet volume: ${projectSummary.totalWetVolume.toFixed(3)} m³`, 40, 104)
    doc.text(`Total rebar: ${projectSummary.totalReinforcementKg.toFixed(2)} kg`, 40, 124)
    doc.text(`Concrete amount: ${projectSummary.totalConcreteAmount.toFixed(2)}`, 40, 144)
    doc.text(`Grand total: ${projectSummary.totalAmount.toFixed(2)}`, 40, 164)

    let y = 194
    projectSummary.items.forEach((item) => {
      if (y > 760) {
        doc.addPage()
        y = 50
      }
      doc.setFont('helvetica', 'bold')
      doc.text(`${item.name}`, 40, y)
      doc.setFont('helvetica', 'normal')
      doc.text(`${item.elementType} • ${item.wetVolume.toFixed(3)} m³ • ${item.reinforcementKg.toFixed(2)} kg rebar`, 40, y + 16)
      y += 40
    })

    doc.save(`${safeName}.pdf`)
  }, [projectName, projectSummary])

  const exportProjectAsXlsx = useCallback(() => {
    if (!projectSummary) return

    const rows = [
      ['Component', 'Element Type', 'Wet Volume (m3)', 'Rebar (kg)', 'Concrete Amount', 'Steel Amount', 'Total Amount'],
      ...projectSummary.items.map((item) => [
        item.name,
        item.elementType,
        item.wetVolume.toFixed(3),
        item.reinforcementKg.toFixed(2),
        item.concreteAmount.toFixed(2),
        item.steelAmount.toFixed(2),
        item.totalAmount.toFixed(2),
      ]),
      ['TOTAL', '', projectSummary.totalWetVolume.toFixed(3), projectSummary.totalReinforcementKg.toFixed(2), projectSummary.totalConcreteAmount.toFixed(2), projectSummary.totalSteelAmount.toFixed(2), projectSummary.totalAmount.toFixed(2)],
    ]
    const worksheet = XLSX.utils.aoa_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimate')
    const safeName = (projectName || 'Building Estimate').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'building-estimate'
    XLSX.writeFile(workbook, `${safeName}.xlsx`)
  }, [projectName, projectSummary])

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
      footingRebarDiaMm: '',
      footingRebarSpacingMm: '',
      footingClearCoverMm: '',
      footingExtraRebarPercent: '',
      stairMainBarDiaMm: '',
      stairMainBarSpacingMm: '',
      stairDistBarDiaMm: '',
      stairDistBarSpacingMm: '',
      stairClearCoverMm: '',
      stairExtraRebarPercent: '',
      wallVerticalBarDiaMm: '',
      wallVerticalBarSpacingMm: '',
      wallHorizontalBarDiaMm: '',
      wallHorizontalBarSpacingMm: '',
      wallClearCoverMm: '',
      wallExtraRebarPercent: '',
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
        footingRebarDiaMm: '',
        footingRebarSpacingMm: '',
        footingClearCoverMm: '',
        footingExtraRebarPercent: '',
        stairMainBarDiaMm: '',
        stairMainBarSpacingMm: '',
        stairDistBarDiaMm: '',
        stairDistBarSpacingMm: '',
        stairClearCoverMm: '',
        stairExtraRebarPercent: '',
        wallVerticalBarDiaMm: '',
        wallVerticalBarSpacingMm: '',
        wallHorizontalBarDiaMm: '',
        wallHorizontalBarSpacingMm: '',
        wallClearCoverMm: '',
        wallExtraRebarPercent: '',
        beam_b: '',
        beam_D: '',
        slabTopMainDiaMm: '',
        slabTopMainSpacingMm: '',
        slabTopDistDiaMm: '',
        slabTopDistSpacingMm: '',
        slabBottomMainDiaMm: '',
        slabBottomMainSpacingMm: '',
        slabBottomDistDiaMm: '',
        slabBottomDistSpacingMm: '',
        slabClearCoverMm: '25',
        slabExtraRebarPercent: '10',
        beamTopBarCount: '',
        beamTopBarDiaMm: '',
        beamBottomBarCount: '',
        beamBottomBarDiaMm: '',
        beamStirrupDiaMm: '',
        beamStirrupSpacingMm: '',
        beamClearCoverMm: '25',
        beamExtraRebarPercent: '10',
        columnMainBarCount: '',
        columnMainBarDiaMm: '',
        columnTieDiaMm: '',
        columnTieSpacingMm: '',
        columnClearCoverMm: '40',
        columnExtraRebarPercent: '10',
      }))
    },
    [formData.unit],
  )

  const getLengthUnit = useCallback(() => formData.unit, [formData.unit])
  const getAreaUnit = useCallback(() => (formData.unit === 'm' ? 'm²' : 'ft²'), [formData.unit])
  const getVolumeUnit = useCallback(() => (formData.unit === 'm' ? 'm³' : 'ft³'), [formData.unit])

  return (
    <div className="mx-auto max-w-4xl p-6 font-display">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark"
      >
        {/* Header */}
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3  ">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className=" text-2xl font-bold text-heading dark:text-heading-dark">
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
        <div className="p-4 sm:p-6 md:p-8  ">
          {/* Use Area Toggle Button */}
          <div className="flex flex-wrap justify-end gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              type="button"
              onClick={() => handleInputChange('useArea', !formData.useArea)}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-6 py-2   font-medium shadow-soft transition-all text-sm sm:text-base whitespace-nowrap ${
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
          <div className="mb-6  ">
            <label className="mb-2 block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
              Concrete Element Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {CONCRETE_ELEMENTS.map((element) => (
                <button
                  key={element.value}
                  type="button"
                  onClick={() => handleElementTypeChange(element.value)}
                  className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg   font-medium transition-colors text-xs sm:text-sm ${
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
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
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
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
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
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
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
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
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

          <div className="grid gap-6 md:grid-cols-2  ">
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
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
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

          {formData.elementType === 'slab' && (
            <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Slab Reinforcement Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Top Mesh Ø (main) mm" value={formData.slabTopMainDiaMm || ''} onChange={(v) => handleInputChange('slabTopMainDiaMm', v)} placeholder="12" />
                <InputField label="Top Mesh Spacing (main) mm" value={formData.slabTopMainSpacingMm || ''} onChange={(v) => handleInputChange('slabTopMainSpacingMm', v)} placeholder="150" />
                <InputField label="Top Mesh Ø (dist) mm" value={formData.slabTopDistDiaMm || ''} onChange={(v) => handleInputChange('slabTopDistDiaMm', v)} placeholder="10" />
                <InputField label="Top Mesh Spacing (dist) mm" value={formData.slabTopDistSpacingMm || ''} onChange={(v) => handleInputChange('slabTopDistSpacingMm', v)} placeholder="200" />
                <InputField label="Bottom Mesh Ø (main) mm" value={formData.slabBottomMainDiaMm || ''} onChange={(v) => handleInputChange('slabBottomMainDiaMm', v)} placeholder="12" />
                <InputField label="Bottom Mesh Spacing (main) mm" value={formData.slabBottomMainSpacingMm || ''} onChange={(v) => handleInputChange('slabBottomMainSpacingMm', v)} placeholder="150" />
                <InputField label="Bottom Mesh Ø (dist) mm" value={formData.slabBottomDistDiaMm || ''} onChange={(v) => handleInputChange('slabBottomDistDiaMm', v)} placeholder="10" />
                <InputField label="Bottom Mesh Spacing (dist) mm" value={formData.slabBottomDistSpacingMm || ''} onChange={(v) => handleInputChange('slabBottomDistSpacingMm', v)} placeholder="200" />
                <InputField label="Clear Cover mm" value={formData.slabClearCoverMm || ''} onChange={(v) => handleInputChange('slabClearCoverMm', v)} placeholder="25" />
                <InputField label="Extra Rebar %" value={formData.slabExtraRebarPercent || ''} onChange={(v) => handleInputChange('slabExtraRebarPercent', v)} placeholder="10" />
              </div>
            </div>
          )}

          {formData.elementType === 'beam' && (
            <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Beam Reinforcement Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Top Bars Count" value={formData.beamTopBarCount || ''} onChange={(v) => handleInputChange('beamTopBarCount', v)} placeholder="2" />
                <InputField label="Top Bar Ø mm" value={formData.beamTopBarDiaMm || ''} onChange={(v) => handleInputChange('beamTopBarDiaMm', v)} placeholder="12" />
                <InputField label="Bottom Bars Count" value={formData.beamBottomBarCount || ''} onChange={(v) => handleInputChange('beamBottomBarCount', v)} placeholder="2" />
                <InputField label="Bottom Bar Ø mm" value={formData.beamBottomBarDiaMm || ''} onChange={(v) => handleInputChange('beamBottomBarDiaMm', v)} placeholder="12" />
                <InputField label="Stirrup Ø mm" value={formData.beamStirrupDiaMm || ''} onChange={(v) => handleInputChange('beamStirrupDiaMm', v)} placeholder="8" />
                <InputField label="Stirrup Spacing mm" value={formData.beamStirrupSpacingMm || ''} onChange={(v) => handleInputChange('beamStirrupSpacingMm', v)} placeholder="150" />
                <InputField label="Clear Cover mm" value={formData.beamClearCoverMm || ''} onChange={(v) => handleInputChange('beamClearCoverMm', v)} placeholder="25" />
                <InputField label="Extra Rebar %" value={formData.beamExtraRebarPercent || ''} onChange={(v) => handleInputChange('beamExtraRebarPercent', v)} placeholder="10" />
              </div>
            </div>
          )}

          {formData.elementType === 'column' && (
            <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Column Reinforcement Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Main Bars Count" value={formData.columnMainBarCount || ''} onChange={(v) => handleInputChange('columnMainBarCount', v)} placeholder="8" />
                <InputField label="Main Bar Ø mm" value={formData.columnMainBarDiaMm || ''} onChange={(v) => handleInputChange('columnMainBarDiaMm', v)} placeholder="12" />
                <InputField label="Tie Ø mm" value={formData.columnTieDiaMm || ''} onChange={(v) => handleInputChange('columnTieDiaMm', v)} placeholder="8" />
                <InputField label="Tie Spacing mm" value={formData.columnTieSpacingMm || ''} onChange={(v) => handleInputChange('columnTieSpacingMm', v)} placeholder="150" />
                <InputField label="Clear Cover mm" value={formData.columnClearCoverMm || ''} onChange={(v) => handleInputChange('columnClearCoverMm', v)} placeholder="40" />
                <InputField label="Extra Rebar %" value={formData.columnExtraRebarPercent || ''} onChange={(v) => handleInputChange('columnExtraRebarPercent', v)} placeholder="10" />
              </div>
            </div>
          )}

          {formData.elementType === 'footing' && (
            <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Footing Reinforcement Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Main Bar Ø mm" value={formData.footingRebarDiaMm || ''} onChange={(v) => handleInputChange('footingRebarDiaMm', v)} placeholder="12" />
                <InputField label="Bar Spacing mm" value={formData.footingRebarSpacingMm || ''} onChange={(v) => handleInputChange('footingRebarSpacingMm', v)} placeholder="150" />
                <InputField label="Clear Cover mm" value={formData.footingClearCoverMm || ''} onChange={(v) => handleInputChange('footingClearCoverMm', v)} placeholder="50" />
                <InputField label="Extra Rebar %" value={formData.footingExtraRebarPercent || ''} onChange={(v) => handleInputChange('footingExtraRebarPercent', v)} placeholder="10" />
              </div>
            </div>
          )}

          {formData.elementType === 'wall' && (
            <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Wall / Shear Wall Reinforcement Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Vertical Bar Ø mm" value={formData.wallVerticalBarDiaMm || ''} onChange={(v) => handleInputChange('wallVerticalBarDiaMm', v)} placeholder="12" />
                <InputField label="Vertical Bar Spacing mm" value={formData.wallVerticalBarSpacingMm || ''} onChange={(v) => handleInputChange('wallVerticalBarSpacingMm', v)} placeholder="200" />
                <InputField label="Horizontal Bar Ø mm" value={formData.wallHorizontalBarDiaMm || ''} onChange={(v) => handleInputChange('wallHorizontalBarDiaMm', v)} placeholder="10" />
                <InputField label="Horizontal Bar Spacing mm" value={formData.wallHorizontalBarSpacingMm || ''} onChange={(v) => handleInputChange('wallHorizontalBarSpacingMm', v)} placeholder="250" />
                <InputField label="Clear Cover mm" value={formData.wallClearCoverMm || ''} onChange={(v) => handleInputChange('wallClearCoverMm', v)} placeholder="25" />
                <InputField label="Extra Rebar %" value={formData.wallExtraRebarPercent || ''} onChange={(v) => handleInputChange('wallExtraRebarPercent', v)} placeholder="10" />
              </div>
            </div>
          )}

          {formData.elementType === 'staircase' && (
            <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Staircase Reinforcement Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Main Bar Ø mm" value={formData.stairMainBarDiaMm || ''} onChange={(v) => handleInputChange('stairMainBarDiaMm', v)} placeholder="12" />
                <InputField label="Main Bar Spacing mm" value={formData.stairMainBarSpacingMm || ''} onChange={(v) => handleInputChange('stairMainBarSpacingMm', v)} placeholder="200" />
                <InputField label="Distribution Bar Ø mm" value={formData.stairDistBarDiaMm || ''} onChange={(v) => handleInputChange('stairDistBarDiaMm', v)} placeholder="8" />
                <InputField label="Distribution Bar Spacing mm" value={formData.stairDistBarSpacingMm || ''} onChange={(v) => handleInputChange('stairDistBarSpacingMm', v)} placeholder="250" />
                <InputField label="Clear Cover mm" value={formData.stairClearCoverMm || ''} onChange={(v) => handleInputChange('stairClearCoverMm', v)} placeholder="25" />
                <InputField label="Extra Rebar %" value={formData.stairExtraRebarPercent || ''} onChange={(v) => handleInputChange('stairExtraRebarPercent', v)} placeholder="10" />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between  ">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-300 bg-white px-3 sm:px-6 py-2 sm:py-3   font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700 text-xs sm:text-sm whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Reset
              </button>

              <PremiumLockedButton
                calculatorId={CALC_ID}
                onAuthorizedClick={() =>
                  handleInputChange('showStepByStep', !formData.showStepByStep)
                }
                isActive={formData.showStepByStep}
                activeClassName="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 font-medium transition-colors text-xs sm:text-sm whitespace-nowrap bg-primary text-white"
                inactiveClassName="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 font-medium transition-colors text-xs sm:text-sm whitespace-nowrap border border-slate-300 bg-white text-heading dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark"
              >
                {formData.showStepByStep ? (
                  <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {formData.showStepByStep ? 'Hide' : 'Show'} Steps
              </PremiumLockedButton>
            </div>

            <button
              type="button"
              onClick={calculateConcrete}
              disabled={isCalculating}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-4 sm:px-8 py-2 sm:py-3   font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
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

        {/* Project Estimate Summary */}
        {projectSummary && (
          <div className="border-t border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-heading dark:text-heading-dark">Building Estimate Summary</h2>
                <p className="mt-1 text-sm text-body/70 dark:text-body-dark/70">
                  {projectItems.length} component(s) saved locally. Unlock to view full summary and export.
                </p>
              </div>
            </div>
            <PremiumFeatureGate
              calculatorId={CALC_ID}
              title="Building Project Estimate"
              description="Watch the ad to unlock project summary, rate breakdown, and PDF/Excel export."
              className="mt-4"
            >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              />
              <div className="flex flex-wrap gap-2">
                <PremiumLockedAction calculatorId={CALC_ID} onAuthorizedClick={exportProjectAsPdf} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white">
                  Export PDF
                </PremiumLockedAction>
                <PremiumLockedAction calculatorId={CALC_ID} onAuthorizedClick={exportProjectAsXlsx}>
                  Export XLSX
                </PremiumLockedAction>
                <PremiumLockedAction calculatorId={CALC_ID} onAuthorizedClick={downloadProjectReport}>
                  Download Text
                </PremiumLockedAction>
                <button type="button" onClick={clearProject} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 dark:border-red-800 dark:text-red-400">Clear Project</button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{projectItems.length} components</div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Auto-saved locally</div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                <p className="text-sm text-body/70 dark:text-body-dark/70">Total Wet Volume</p>
                <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalWetVolume.toFixed(3)} m³</p>
              </div>
              <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                <p className="text-sm text-body/70 dark:text-body-dark/70">Total Rebar</p>
                <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalReinforcementKg.toFixed(2)} kg</p>
              </div>
              <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                <p className="text-sm text-body/70 dark:text-body-dark/70">Concrete Amount</p>
                <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalConcreteAmount.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                <p className="text-sm text-body/70 dark:text-body-dark/70">Grand Total</p>
                <p className="mt-1 font-mono text-lg font-semibold text-primary">{projectSummary.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-heading dark:text-heading-dark">Component Breakdown</h3>
                <span className="text-sm text-body/70 dark:text-body-dark/70">Rates can be edited per component</span>
              </div>
              <div className="mt-4 space-y-3">
                {projectSummary.items.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200/20 bg-slate-50 p-3 dark:border-slate-700/30 dark:bg-slate-800/40">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-heading dark:text-heading-dark">{item.name}</p>
                        <p className="text-sm text-body/70 dark:text-body-dark/70">{item.elementType} • {item.wetVolume.toFixed(3)} m³ • {item.reinforcementKg.toFixed(2)} kg rebar</p>
                      </div>
                      <button type="button" onClick={() => removeProjectItem(item.id)} className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400">Remove</button>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <label className="text-sm text-body/70 dark:text-body-dark/70">
                        Concrete Rate
                        <input type="number" min="0" value={projectRateInputs[item.id]?.concreteRate ?? ''} onChange={(e) => updateProjectRate(item.id, 'concreteRate', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900" />
                      </label>
                      <label className="text-sm text-body/70 dark:text-body-dark/70">
                        Steel Rate
                        <input type="number" min="0" value={projectRateInputs[item.id]?.steelRate ?? ''} onChange={(e) => updateProjectRate(item.id, 'steelRate', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
              <h3 className="font-semibold">Project Report Preview</h3>
              <pre className="mt-3 whitespace-pre-wrap text-sm">{projectSummary.reportText}</pre>
            </div>
            </PremiumFeatureGate>
          </div>
        )}

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
                <h2 className="  text-xl font-semibold text-heading dark:text-heading-dark">
                  Calculation Results
                </h2>
              </div>
              <PremiumFeatureGate
                calculatorId={CALC_ID}
                title="Concrete Estimate Summary"
                description="Watch the ad to unlock quantity summary, rebar estimate, step-by-step breakdown, and export."
              >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  ">
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
              {result.reinforcement && (
                <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <div className="flex items-center justify-between gap-2">
                    <b>Rebar Estimate:</b>
                    <span className="font-mono font-semibold">{result.reinforcement.totalSteelWeightKg.toFixed(2)} kg</span>
                  </div>
                  <p className="mt-2 text-sm">{result.reinforcement.summary}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {result.reinforcement.items.map((item: { label: string; barCount: number; cuttingLengthM: number; weightKg: number }) => (
                      <li key={item.label} className="flex items-center justify-between gap-2 rounded-lg bg-white/70 px-3 py-2 dark:bg-slate-900/50">
                        <span>{item.label}</span>
                        <span className="font-mono">{item.barCount} bars × {item.cuttingLengthM.toFixed(2)} m = {item.weightKg.toFixed(2)} kg</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Optional engineering summary (non-invasive) */}
              {result.human_summary && (
                <div className="mt-6   rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <b>Engineering Summary:</b> {result.human_summary}
                </div>
              )}
              {/* Steps */}
              {formData.showStepByStep && (
                <div className="mt-6   rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
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
              </PremiumFeatureGate>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <CONCRETE_INFO_SECTION />
    </div>
  )
}
