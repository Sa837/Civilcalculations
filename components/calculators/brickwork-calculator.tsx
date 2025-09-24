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
} from 'lucide-react'
import {
  BrickworkCalculator as BrickworkCalculatorLib,
  STANDARD_BRICK_SIZES,
  MORTAR_MIX_TYPES,
} from '@/lib/registry/calculator/brickwork-calculator'
import { UnitConverter, UNIT_PRESETS } from '@/lib/registry/globalunits'

interface BrickworkResult {
  numberOfBricks: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  mortarVolume: number
  wallVolume: number
  netWallVolume: number
  totalOpeningVolume: number
}

interface Opening {
  id: string
  name: string
  width: string
  height: string
  unit: 'm' | 'ft'
}

interface BrickworkFormData {
  wallLength: string
  wallHeight: string
  wallThickness: string
  wallThicknessType: 'custom' | '4inch' | '9inch'
  brickLength: string
  brickWidth: string
  brickHeight: string
  mortarThickness: string
  mortarMixType: string
  wastageFactor: string
  unit: 'm' | 'ft'
  showStepByStep: boolean
  area?: string
  openings: Opening[]
  brickSizeType: 'standard' | 'custom'
  standardBrickSize: string
  customBrickInput: string
}

interface BrickworkCalculatorProps {
  globalUnit?: 'm' | 'ft'
}

// SVG Component for wall visualization
const BrickworkSVG = ({ formData }: { formData: BrickworkFormData }) => {
  return (
    <div className="mt-6 p-4 rounded-xl">
      <h3 className="font-display font-medium text-heading dark:text-heading-dark mb-3 text-center">
        Wall Diagram
      </h3>
      <svg
        width="300"
        height="200"
        className="border dark:border-slate-600 rounded-lg bg-white mx-auto"
        viewBox="0 0 300 200"
      >
        {/* Wall background */}
        <rect
          x="50"
          y="50"
          width="200"
          height="100"
          fill="#AA4A44"
          stroke="#b94238ff"
          strokeWidth="2"
        />

        {/* Brick pattern */}
        <g fill="none" stroke="#544a49ff" strokeWidth="1">
          {/* Horizontal lines */}
          <line x1="50" y1="60" x2="250" y2="60" />
          <line x1="50" y1="70" x2="250" y2="70" />
          <line x1="50" y1="80" x2="250" y2="80" />
          <line x1="50" y1="90" x2="250" y2="90" />
          <line x1="50" y1="100" x2="250" y2="100" />
          <line x1="50" y1="110" x2="250" y2="110" />
          <line x1="50" y1="120" x2="250" y2="120" />
          <line x1="50" y1="130" x2="250" y2="130" />
          <line x1="50" y1="140" x2="250" y2="140" />

          {/* Vertical lines - staggered for brick pattern */}
          <line x1="60" y1="50" x2="60" y2="150" />
          <line x1="80" y1="50" x2="80" y2="150" />
          <line x1="100" y1="50" x2="100" y2="150" />
          <line x1="120" y1="50" x2="120" y2="150" />
          <line x1="140" y1="50" x2="140" y2="150" />
          <line x1="160" y1="50" x2="160" y2="150" />
          <line x1="180" y1="50" x2="180" y2="150" />
          <line x1="200" y1="50" x2="200" y2="150" />
          <line x1="220" y1="50" x2="220" y2="150" />
          <line x1="240" y1="50" x2="240" y2="150" />
        </g>

        {/* Openings */}
        {formData.openings.map((opening, index) => {
          const x = 70 + index * 40
          const y = 75
          const width = 30
          const height = 50

          return (
            <g key={opening.id}>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#87CEEB"
                stroke="#4682B4"
                strokeWidth="1.5"
                opacity="0.8"
              />
              <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fill="#2F4F4F"
                fontWeight="bold"
              >
                {opening.name}
              </text>
            </g>
          )
        })}

        {/* Dimensions */}
        <g fontSize="10" fill="#666" textAnchor="middle">
          {/* Wall length */}
          <line x1="50" y1="160" x2="250" y2="160" stroke="#666" strokeWidth="1" />
          <text x="150" y="175" fontWeight="bold" fontSize="12">
            {formData.wallLength || '0'} {formData.unit}
          </text>

          {/* Wall height */}
          <line x1="260" y1="50" x2="260" y2="150" stroke="#666" strokeWidth="1" />
          <text
            x="275"
            y="100"
            writingMode="vertical"
            fontWeight="bold"
            fontSize="12"
            transform="rotate(90, 275, 100)"
          >
            {formData.wallHeight || '0'} {formData.unit}
          </text>
        </g>

        {/* Wall thickness indicator */}
        <g>
          <line x1="40" y1="50" x2="40" y2="150" stroke="#8b1313ff" strokeWidth="3" />
          <text
            x="35"
            y="100"
            textAnchor="middle"
            fontSize="12"
            fontWeight={'bold'}
            fill="#8b1313ff"
            transform="rotate(-90, 35, 100)"
          >
            {formData.wallThickness || '0'} {formData.unit}
          </text>
        </g>

        {/* Title */}
        <text
          x="150"
          y="30"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="16"
          fontWeight="bold"
          fill="#333"
        >
          Brick Wall
        </text>
      </svg>

      <div className="mt-2 font-display text-xs text-center text-slate-600 dark:text-slate-300">
        Dimensions: {formData.wallLength || '0'} × {formData.wallHeight || '0'} {formData.unit}
        {formData.openings.length > 0 &&
          ` • ${formData.openings.length} opening${formData.openings.length !== 1 ? 's' : ''}`}
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

export default function BrickworkCalculator({ globalUnit = 'm' }: BrickworkCalculatorProps) {
  const [useArea, setUseArea] = useState(false)
  const [formData, setFormData] = useState<BrickworkFormData>({
    wallLength: '',
    wallHeight: '',
    wallThickness: '',
    wallThicknessType: 'custom',
    brickLength: '',
    brickWidth: '',
    brickHeight: '',
    mortarThickness: '',
    mortarMixType: '1:6',
    wastageFactor: '5',
    unit: globalUnit,
    showStepByStep: false,
    area: '',
    openings: [],
    brickSizeType: 'standard',
    standardBrickSize: '240x115x71',
    customBrickInput: '',
  })

  const [result, setResult] = useState<BrickworkResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)

  const parseCustomBrickInput = useCallback((input: string) => {
    const normalized = input.replace(/\*/g, 'x')
    const parts = normalized.split('x').map((p) => p.trim())

    if (parts.length === 3) {
      const [length, width, height] = parts
      if (
        length &&
        width &&
        height &&
        !isNaN(Number(length)) &&
        !isNaN(Number(width)) &&
        !isNaN(Number(height))
      ) {
        return { length, width, height, isValid: true }
      }
    }
    return { length: '', width: '', height: '', isValid: false }
  }, [])

  const handleWallThicknessTypeChange = useCallback((type: 'custom' | '4inch' | '9inch') => {
    setFormData((prev) => {
      const presets = UNIT_PRESETS.brickwork[prev.unit === 'm' ? 'metric' : 'imperial']
      let thickness = prev.wallThickness

      if (type === '4inch') {
        thickness = presets.defaultWallThickness
      } else if (type === '9inch') {
        thickness = prev.unit === 'm' ? '0.229' : '0.75'
      }

      return {
        ...prev,
        wallThicknessType: type,
        wallThickness: thickness,
      }
    })
  }, [])

  // Enhanced unit conversion using the new universal system
  useEffect(() => {
    setFormData((prev) => {
      if (prev.unit === globalUnit) return prev

      const newUnitSystem = globalUnit === 'm' ? 'metric' : 'imperial'
      const oldUnitSystem = prev.unit === 'm' ? 'metric' : 'imperial'

      const newFormData = { ...prev, unit: globalUnit }

      // Get presets for the new unit system
      const newPresets = UNIT_PRESETS.brickwork[newUnitSystem]
      const oldPresets = UNIT_PRESETS.brickwork[oldUnitSystem]

      // Convert wall dimensions
      if (prev.wallLength) {
        newFormData.wallLength = UnitConverter.convertLength(
          parseFloat(prev.wallLength),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      if (prev.wallHeight) {
        newFormData.wallHeight = UnitConverter.convertLength(
          parseFloat(prev.wallHeight),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      // Convert wall thickness with type preservation
      if (prev.wallThicknessType === '4inch') {
        newFormData.wallThickness = newPresets.defaultWallThickness
      } else if (prev.wallThicknessType === '9inch') {
        newFormData.wallThickness = newUnitSystem === 'metric' ? '0.229' : '0.75'
      } else if (prev.wallThickness) {
        newFormData.wallThickness = UnitConverter.convertLength(
          parseFloat(prev.wallThickness),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      // Convert brick dimensions
      if (prev.brickLength) {
        newFormData.brickLength = UnitConverter.convertBrickDimension(
          parseFloat(prev.brickLength),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(2)
      }

      if (prev.brickWidth) {
        newFormData.brickWidth = UnitConverter.convertBrickDimension(
          parseFloat(prev.brickWidth),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(2)
      }

      if (prev.brickHeight) {
        newFormData.brickHeight = UnitConverter.convertBrickDimension(
          parseFloat(prev.brickHeight),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(2)
      }

      // Convert mortar thickness
      if (prev.mortarThickness) {
        newFormData.mortarThickness = UnitConverter.convertBrickDimension(
          parseFloat(prev.mortarThickness),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(3)
      } else {
        newFormData.mortarThickness = newPresets.defaultMortarThickness
      }

      // Convert area if present
      if (prev.area) {
        newFormData.area = UnitConverter.convertArea(
          parseFloat(prev.area),
          oldPresets.area,
          newPresets.area,
        ).toFixed(3)
      }

      // Convert openings
      newFormData.openings = prev.openings.map((opening) => ({
        ...opening,
        width: opening.width
          ? UnitConverter.convertLength(
              parseFloat(opening.width),
              opening.unit === 'm' ? 'm' : 'ft',
              newPresets.length,
            ).toFixed(3)
          : opening.width,
        height: opening.height
          ? UnitConverter.convertLength(
              parseFloat(opening.height),
              opening.unit === 'm' ? 'm' : 'ft',
              newPresets.length,
            ).toFixed(3)
          : opening.height,
        unit: globalUnit,
      }))

      return newFormData
    })
  }, [globalUnit])

  // Enhanced brick size change handler using the new system
  const handleBrickSizeChange = useCallback(
    (type: 'standard' | 'custom', value: string) => {
      if (type === 'standard') {
        const selectedBrick = STANDARD_BRICK_SIZES.find((brick) => brick.value === value)
        if (selectedBrick) {
          setFormData((prev) => {
            const unitSystem = prev.unit === 'm' ? 'metric' : 'imperial'
            const targetUnit = unitSystem === 'metric' ? 'mm' : 'in'

            // Convert standard brick dimensions to target unit system
            const brickLength = UnitConverter.convertBrickDimension(
              selectedBrick.length,
              'mm',
              targetUnit as 'mm' | 'in',
            ).toFixed(2)

            const brickWidth = UnitConverter.convertBrickDimension(
              selectedBrick.width,
              'mm',
              targetUnit as 'mm' | 'in',
            ).toFixed(2)

            const brickHeight = UnitConverter.convertBrickDimension(
              selectedBrick.height,
              'mm',
              targetUnit as 'mm' | 'in',
            ).toFixed(2)

            return {
              ...prev,
              brickSizeType: 'standard',
              standardBrickSize: value,
              brickLength,
              brickWidth,
              brickHeight,
              customBrickInput: '',
            }
          })
        }
      } else {
        const parsed = parseCustomBrickInput(value)
        setFormData((prev) => ({
          ...prev,
          brickSizeType: 'custom',
          customBrickInput: value,
          brickLength: parsed.length || '',
          brickWidth: parsed.width || '',
          brickHeight: parsed.height || '',
          standardBrickSize: '',
        }))
      }
    },
    [parseCustomBrickInput],
  )

  const addOpening = useCallback(() => {
    const newOpening: Opening = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Opening ${formData.openings.length + 1}`,
      width: '',
      height: '',
      unit: formData.unit,
    }
    setFormData((prev) => ({
      ...prev,
      openings: [...prev.openings, newOpening],
    }))
  }, [formData.openings.length, formData.unit])

  const removeOpening = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      openings: prev.openings.filter((opening) => opening.id !== id),
    }))
  }, [])

  const updateOpening = useCallback((id: string, field: keyof Opening, value: string) => {
    setFormData((prev) => ({
      ...prev,
      openings: prev.openings.map((opening) =>
        opening.id === id ? { ...opening, [field]: value } : opening,
      ),
    }))
  }, [])

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    // Define validation fields based on input mode
    const requiredFields = useArea
      ? [
          { key: 'area', name: 'Wall area' },
          { key: 'wallThickness', name: 'Wall thickness' },
        ]
      : [
          { key: 'wallLength', name: 'Wall length' },
          { key: 'wallHeight', name: 'Wall height' },
          { key: 'wallThickness', name: 'Wall thickness' },
        ]

    const brickFields = [
      { key: 'brickLength', name: 'Brick length' },
      { key: 'brickWidth', name: 'Brick width' },
      { key: 'brickHeight', name: 'Brick height' },
      { key: 'mortarThickness', name: 'Mortar thickness' },
      { key: 'wastageFactor', name: 'Wastage factor' },
    ] as const

    // Validate required and brick fields
    ;[...requiredFields, ...brickFields].forEach(({ key, name }) => {
      const value = formData[key as keyof BrickworkFormData] as string
      if (!value || value.trim() === '' || parseFloat(value) <= 0) {
        newErrors[key] = `${name} must be greater than 0`
      }
    })

    // Validate openings
    formData.openings.forEach((opening, index) => {
      if (opening.width && parseFloat(opening.width) <= 0) {
        newErrors[`openingWidth_${opening.id}`] =
          `Opening ${index + 1} width must be greater than 0`
      }
      if (opening.height && parseFloat(opening.height) <= 0) {
        newErrors[`openingHeight_${opening.id}`] =
          `Opening ${index + 1} height must be greater than 0`
      }
    })

    // Specific validation for wastage factor
    if (formData.wastageFactor) {
      const wastageValue = parseFloat(formData.wastageFactor)
      if (wastageValue < 0 || wastageValue > 30) {
        newErrors.wastageFactor = 'Wastage factor must be between 0% and 30%'
      }
    }

    // Validate custom brick input
    if (formData.brickSizeType === 'custom' && formData.customBrickInput) {
      const parsed = parseCustomBrickInput(formData.customBrickInput)
      if (!parsed.isValid) {
        newErrors.customBrickInput = `Enter format like: 240x110x76 or 240*110*76 (in ${formData.unit === 'm' ? 'mm' : 'inches'})`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, parseCustomBrickInput, useArea])

  // Enhanced calculation using the new BrickworkCalculator class
  const calculateBrickwork = useCallback(async () => {
    if (!validateForm()) return

    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const input = {
        wallLength: formData.wallLength ? parseFloat(formData.wallLength) : undefined,
        wallHeight: formData.wallHeight ? parseFloat(formData.wallHeight) : undefined,
        wallArea: formData.area ? parseFloat(formData.area) : undefined,
        wallThickness: parseFloat(formData.wallThickness),
        wallThicknessType: formData.wallThicknessType,
        brickLength: parseFloat(formData.brickLength),
        brickWidth: parseFloat(formData.brickWidth),
        brickHeight: parseFloat(formData.brickHeight),
        brickSizeType: formData.brickSizeType,
        standardBrickSize: formData.standardBrickSize,
        mortarThickness: parseFloat(formData.mortarThickness),
        mortarMixType: formData.mortarMixType,
        wastageFactor: parseFloat(formData.wastageFactor),
        unitSystem: formData.unit === 'm' ? ('metric' as const) : ('imperial' as const), // Fix: Add 'as const'
        openings: formData.openings.map((op) => ({
          width: op.width ? parseFloat(op.width) : 0,
          height: op.height ? parseFloat(op.height) : 0,
          unitSystem: op.unit === 'm' ? ('metric' as const) : ('imperial' as const), // Fix: Add 'as const'
        })),
      }

      const result = BrickworkCalculatorLib.calculate(input)
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
    const presets = UNIT_PRESETS.brickwork[globalUnit === 'm' ? 'metric' : 'imperial']
    const defaults = BrickworkCalculatorLib.getDefaultsForUnitSystem(
      globalUnit === 'm' ? 'metric' : 'imperial',
    )

    setFormData({
      wallLength: '',
      wallHeight: '',
      wallThickness: defaults.wallThickness,
      wallThicknessType: 'custom',
      brickLength: defaults.brickLength,
      brickWidth: defaults.brickWidth,
      brickHeight: defaults.brickHeight,
      mortarThickness: defaults.mortarThickness,
      mortarMixType: '1:6',
      wastageFactor: '5',
      unit: globalUnit,
      showStepByStep: false,
      area: '',
      openings: [],
      brickSizeType: 'standard',
      standardBrickSize: '240x115x71',
      customBrickInput: '',
    })
    setResult(null)
    setErrors({})
    setUseArea(false)
  }, [globalUnit])

  const handleInputChange = useCallback(
    (field: keyof BrickworkFormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }))
      }
      if (errors.general) {
        setErrors((prev) => ({ ...prev, general: '' }))
      }
    },
    [errors],
  )

  const getBrickUnit = useCallback(() => (formData.unit === 'm' ? 'mm' : 'in'), [formData.unit])
  const getLengthUnit = useCallback(() => (formData.unit === 'm' ? 'm' : 'ft'), [formData.unit])
  const getAreaUnit = useCallback(() => (formData.unit === 'm' ? 'm²' : 'ft²'), [formData.unit])

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
        <div className="md:col-span-2">
          <BrickworkSVG formData={formData} />
        </div>
        {/* Form */}
        <div className="p-8">
          <div className="flex justify-end gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUseArea(!useArea)}
              className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all 
                ${useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}
            >
              <Info className="h-4 w-4" />
              {useArea ? 'Use Length & Height' : 'Use Area'}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Wall Dimensions */}
            {!useArea ? (
              <>
                <InputField
                  label="Wall Length"
                  value={formData.wallLength}
                  onChange={(value) => handleInputChange('wallLength', value)}
                  error={errors.wallLength}
                  unit={getLengthUnit()}
                  isLength={true}
                  currentUnit={formData.unit}
                  placeholder="Enter wall length"
                />
                <InputField
                  label="Wall Height"
                  value={formData.wallHeight}
                  onChange={(value) => handleInputChange('wallHeight', value)}
                  error={errors.wallHeight}
                  unit={getLengthUnit()}
                  isLength={true}
                  currentUnit={formData.unit}
                  placeholder="Enter wall height"
                />
              </>
            ) : (
              <div className="md:col-span-2">
                <InputField
                  label="Wall Area"
                  value={formData.area || ''}
                  onChange={(value) => handleInputChange('area', value)}
                  error={errors.area}
                  unit={getAreaUnit()}
                  placeholder="Enter wall area"
                />
              </div>
            )}

            {/* Wall Thickness with Dropdown */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Wall Thickness
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  type="button"
                  onClick={() => handleWallThicknessTypeChange('4inch')}
                  className={`px-1 py-1 rounded-lg font-medium font-display transition-colors ${
                    formData.wallThicknessType === '4inch'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  4 inch Wall
                  <div className="text-xs opacity-80">
                    {formData.unit === 'm' ? '0.102 m' : '0.33 ft'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleWallThicknessTypeChange('9inch')}
                  className={`px-1 py-1 rounded-lg font-medium font-display transition-colors ${
                    formData.wallThicknessType === '9inch'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  9 inch Wall
                  <div className="text-xs opacity-80">
                    {formData.unit === 'm' ? '0.229 m' : '0.75 ft'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleWallThicknessTypeChange('custom')}
                  className={`px-4 py-1 rounded-lg font-medium font-display transition-colors ${
                    formData.wallThicknessType === 'custom'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Custom Thickness
                </button>

                {formData.wallThicknessType === 'custom' && (
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.wallThickness}
                      onChange={(e) => handleInputChange('wallThickness', e.target.value)}
                      placeholder="Enter thickness"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                      {getLengthUnit()}
                    </div>
                  </div>
                )}
              </div>
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

            {/* Openings Section */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <label className="block font-display font-medium text-heading dark:text-heading-dark">
                  Door/Window Openings (Optional)
                </label>
                <button
                  type="button"
                  onClick={addOpening}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 font-display text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Opening
                </button>
              </div>

              {formData.openings.map((opening, index) => (
                <div
                  key={opening.id}
                  className="mb-4 p-4 border border-slate-200 font-display rounded-lg dark:border-slate-600"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{opening.name}</span>
                    <button
                      type="button"
                      onClick={() => removeOpening(opening.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Width</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={opening.width}
                          onChange={(e) => updateOpening(opening.id, 'width', e.target.value)}
                          placeholder="Width"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                          {opening.unit}
                        </div>
                      </div>
                      {errors[`openingWidth_${opening.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`openingWidth_${opening.id}`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Height</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={opening.height}
                          onChange={(e) => updateOpening(opening.id, 'height', e.target.value)}
                          placeholder="Height"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                          {opening.unit}
                        </div>
                      </div>
                      {errors[`openingHeight_${opening.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`openingHeight_${opening.id}`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Unit</label>
                      <select
                        value={opening.unit}
                        onChange={(e) =>
                          updateOpening(opening.id, 'unit', e.target.value as 'm' | 'ft')
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
                      >
                        <option value="m">Meters (m)</option>
                        <option value="ft">Feet (ft)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Brick Size Selection */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Brick Size (Length × Width × Height)
              </label>

              <div className="mb-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => handleBrickSizeChange('standard', '240x115x71')}
                  className={`px-4 py-2 rounded-lg font-medium font-display transition-colors ${
                    formData.brickSizeType === 'standard'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Standard Sizes
                </button>
                <button
                  type="button"
                  onClick={() => handleBrickSizeChange('custom', '')}
                  className={`px-4 py-2 rounded-lg font-medium font-display transition-colors ${
                    formData.brickSizeType === 'custom'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Custom Size
                </button>
              </div>

              {formData.brickSizeType === 'standard' && (
                <div className="mb-4">
                  <select
                    value={formData.standardBrickSize}
                    onChange={(e) => handleBrickSizeChange('standard', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800"
                  >
                    <option value="">Select a standard brick size...</option>
                    {STANDARD_BRICK_SIZES.map((brick) => (
                      <option key={brick.value} value={brick.value}>
                        {brick.label} - {brick.region}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.brickSizeType === 'custom' && (
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.customBrickInput}
                      onChange={(e) => handleBrickSizeChange('custom', e.target.value)}
                      placeholder="Enter size: 240x110x76 or 240*110*76"
                      className={`w-full rounded-xl border px-4 py-3 font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.customBrickInput
                          ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                          : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                      {getBrickUnit()}
                    </div>
                  </div>
                  {errors.customBrickInput && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.customBrickInput}
                    </motion.p>
                  )}
                </div>
              )}

              {/* Current Brick Dimensions Display */}
              {formData.brickLength && formData.brickWidth && formData.brickHeight && (
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-800 dark:text-green-200">
                      Current Brick Size
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-green-700 dark:text-green-300">Length: </span>
                      {formData.brickLength} {getBrickUnit()}
                    </div>
                    <div>
                      <span className="text-green-700 dark:text-green-300">Width: </span>
                      {formData.brickWidth} {getBrickUnit()}
                    </div>
                    <div>
                      <span className="text-green-700 dark:text-green-300">Height: </span>
                      {formData.brickHeight} {getBrickUnit()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mortar Settings */}
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

            <InputField
              label="Mortar Thickness"
              value={formData.mortarThickness}
              onChange={(value) => handleInputChange('mortarThickness', value)}
              error={errors.mortarThickness}
              unit={getBrickUnit()}
              placeholder="Enter mortar thickness"
            />

            <InputField
              label="Wastage Factor"
              value={formData.wastageFactor}
              onChange={(value) => handleInputChange('wastageFactor', value)}
              error={errors.wastageFactor}
              unit="%"
              min="0"
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

              {/* Main Results Table */}
              <div className="mb-8 overflow-hidden rounded-xl border border-slate-200/20 bg-white/70 dark:border-slate-700/30 dark:bg-slate-900/60">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">
                        Material
                      </th>
                      <th className="px-6 py-4 text-right font-display font-semibold text-heading dark:text-heading-dark">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/30">
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Number of Bricks
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.numberOfBricks.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">pcs</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Cement
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.cementWeight.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">
                        kg (~{result.cementBags} bags)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Sand
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.sandWeight.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">kg</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Mortar Volume
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.mortarVolume.toFixed(3)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">m³</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Wall Volume
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.wallVolume.toFixed(3)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">m³</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Step-by-step Calculation */}
              {formData.showStepByStep && (
                <div className="mb-8 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4 font-display text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    Step-by-Step Calculation
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    <li>
                      <span className="font-semibold">Wall Volume:</span>{' '}
                      {result.wallVolume.toFixed(3)} m³
                    </li>
                    {result.totalOpeningVolume > 0 && (
                      <li>
                        <span className="font-semibold">Opening Deduction:</span> Deducted{' '}
                        {result.totalOpeningVolume.toFixed(3)} m³ from {formData.openings.length}{' '}
                        opening(s)
                      </li>
                    )}
                    <li>
                      <span className="font-semibold">Net Wall Volume:</span>{' '}
                      {result.netWallVolume.toFixed(3)} m³
                    </li>
                    <li>
                      <span className="font-semibold">Brick Volume Calculation:</span> Including
                      mortar joints
                    </li>
                    <li>
                      <span className="font-semibold">Number of Bricks:</span>{' '}
                      {result.numberOfBricks} pieces
                    </li>
                    <li>
                      <span className="font-semibold">Mortar Volume:</span>{' '}
                      {result.mortarVolume.toFixed(3)} m³
                    </li>
                    <li>
                      <span className="font-semibold">Cement Needed:</span>{' '}
                      {result.cementWeight.toFixed(1)} kg ({result.cementBags} bags)
                    </li>
                    <li>
                      <span className="font-semibold">Sand Needed:</span>{' '}
                      {result.sandWeight.toFixed(1)} kg
                    </li>
                  </ol>
                </div>
              )}

              {/* Enhanced Info & FAQ Section */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">
                  Brickwork Calculator & Estimator – Accurate Material Estimation Tool
                </h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">
                  A Brickwork Calculator is an essential online tool for civil engineers, builders,
                  contractors, and DIY enthusiasts to quickly and accurately estimate the number of
                  bricks, cement, sand, and mortar required for walls, columns, partitions, and
                  other masonry work. This tool ensures efficient project planning, cost-saving, and
                  minimal material wastage.
                </p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    Why Use a Brickwork Calculator?
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Calculate the exact number of bricks needed.</li>
                    <li>Estimate cement and sand for mortar accurately.</li>
                    <li>Save money by reducing waste.</li>
                    <li>Plan masonry projects efficiently.</li>
                    <li>Ensure walls and structures have the right strength and stability.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    How It Works
                  </h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Select the type of brickwork: wall, column, or partition.</li>
                    <li>Enter project dimensions: length, height, and thickness of the wall.</li>
                    <li>Choose the mortar mix ratio: 1:6, 1:5, 1:4, or 1:3 (cement:sand).</li>
                    <li>
                      Get instant results:
                      <ul className="list-disc list-inside ml-6">
                        <li>Number of bricks required</li>
                        <li>Cement quantity (bags)</li>
                        <li>Sand volume for mortar</li>
                      </ul>
                    </li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    Standard Brickwork Mix Ratios
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>1:6 – Low-strength mortar for non-load bearing walls.</li>
                    <li>1:5 – General-purpose mortar for standard walls.</li>
                    <li>1:4 – Stronger mortar for structural walls.</li>
                    <li>1:3 – High-strength mortar for heavy load-bearing walls.</li>
                  </ul>
                  <div className="mt-2 text-sm text-body/60 dark:text-body-dark/60">
                    <span className="font-semibold">Tip:</span> The first number represents cement,
                    and the second represents sand. Choose the mix ratio according to the structural
                    requirements of your project.
                  </div>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">
                    FAQs – Brickwork Calculator
                  </h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is a brickwork calculator?</span>
                      <br />A tool to calculate the number of bricks, cement, and sand required for
                      masonry projects.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span>
                      <br />
                      Ensures accurate estimation, cost-saving, and minimal material waste for
                      construction projects.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What units does it support?</span>
                      <br />
                      Dimensions can be entered in meters or feet, and cement is calculated in bags.
                    </div>
                    <div>
                      <span className="font-semibold">
                        Q4. How to choose the right mortar mix ratio?
                      </span>
                      <br />
                      <ul className="list-disc list-inside ml-6">
                        <li>1:6: Low-strength, non-load bearing walls</li>
                        <li>1:5: General-purpose masonry</li>
                        <li>1:4: Structural walls</li>
                        <li>1:3: High-strength walls for heavy loads</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold">
                        Q5. Can I calculate for irregular or partial walls?
                      </span>
                      <br />
                      Yes, calculate the total area of the wall and enter it in the calculator for
                      precise results.
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
