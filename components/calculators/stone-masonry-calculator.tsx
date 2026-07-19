'use client'

import { useState, useEffect, useCallback } from 'react'
import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  RotateCcw,
  Eye,
  EyeOff,
  Info,
  CheckCircle,
  FileText,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Square,
  LayoutGrid,
  Grid3x3,
  Layers,
  Waves,
  Minus,
  Triangle,
} from 'lucide-react'
import {
  StoneMasonryCalculatorLib,
  STONE_WORK_TYPES,
  type StoneWorkType,
  type StoneMasonryProjectItem,
} from '@/lib/registry/calculator/stone-masonry-calculator'
import { MORTAR_MIX_TYPES } from '@/lib/registry/calculator/brickwork-calculator'
import { STONEMASONRY_INFO_SECTION } from '@/lib/registry/calculator/enhanced-info-section/stonemasonary-info-section'
import { exportEstimatePdf, exportEstimateText, exportEstimateXlsx } from './professional-estimate-utils'
import {
  PremiumFeatureGate,
  PremiumLockedButton,
  PremiumLockedAction,
} from './advanced-estimate-gate'

const CALC_ID = 'stone-masonry'
const PROJECT_STORAGE_KEY = 'civil-stone-masonry-project-v1'

const WORK_TYPE_ICONS: Record<StoneWorkType, typeof Square> = {
  wall_masonry: Square,
  wall_cladding: LayoutGrid,
  slate_flooring: Grid3x3,
  boundary_wall: Layers,
  stone_pitching: Waves,
  dpc_course: Minus,
  retaining_wall: Triangle,
}

interface StoneMasonryResult {
  workType: StoneWorkType
  volume?: number
  wetVolume?: number
  netWetVolume?: number
  totalOpeningVolume?: number
  stoneVolume?: number
  mortarMixRatio?: string
  cementBags?: number
  sandWeight?: number
  tieStoneCount?: number
  cappingVolume?: number
  cornerStoneCount?: number
  netArea?: number
  pieceCount?: number
  mortarVolume?: number
  crossSectionArea?: number
  human_summary?: string
  assumptions?: string[]
}

interface Opening {
  id: string
  name: string
  width: string
  height: string
  unit: 'm' | 'ft'
}

interface StoneMasonryFormData {
  workType: StoneWorkType
  unit: 'm' | 'ft'
  mortarMixType: string
  wastageFactor: string
  showStepByStep: boolean

  // Wall Masonry / Boundary Wall
  length: string
  height: string
  thickness: string
  wallThicknessType: 'custom' | '12inch' | '18inch' | '24inch'
  openings: Opening[]
  showAdvanced: boolean
  includeTieStones: boolean
  tieStoneSpacingM: string
  tieStoneCourseSpacingM: string
  includeTopCapping: boolean
  cappingWidth: string
  cappingThickness: string
  includeCornerStones: boolean
  numberOfCorners: string
  courseHeightM: string

  // Wall Cladding
  claddingLength: string
  claddingHeight: string
  claddingOpenings: Opening[]
  claddingPieceLengthMm: string
  claddingPieceWidthMm: string
  claddingBeddingMm: string

  // Slate/Stone Flooring
  floorLength: string
  floorWidth: string
  slatePieceLengthMm: string
  slatePieceWidthMm: string
  slateBeddingMm: string

  // Stone Pitching
  pitchingLength: string
  pitchingSlopeHeight: string
  pitchingThicknessMm: string
  pitchingGrouted: boolean

  // DPC / Plinth Course
  dpcLength: string
  dpcThickness: string
  dpcHeightMm: string

  // Retaining Wall
  retTopWidth: string
  retBottomWidth: string
  retHeight: string
  retLength: string
}

const WALL_THICKNESS_PRESETS: Record<'12inch' | '18inch' | '24inch', { m: string; ft: string }> = {
  '12inch': { m: '0.30', ft: '1.0' },
  '18inch': { m: '0.45', ft: '1.5' },
  '24inch': { m: '0.60', ft: '2.0' },
}

const DEFAULT_FORM: StoneMasonryFormData = {
  workType: 'wall_masonry',
  unit: 'm',
  mortarMixType: '1:5',
  wastageFactor: '5',
  showStepByStep: false,

  length: '',
  height: '',
  thickness: '',
  wallThicknessType: 'custom',
  openings: [],
  showAdvanced: false,
  includeTieStones: false,
  tieStoneSpacingM: '0.6',
  tieStoneCourseSpacingM: '0.6',
  includeTopCapping: false,
  cappingWidth: '0.45',
  cappingThickness: '0.15',
  includeCornerStones: false,
  numberOfCorners: '2',
  courseHeightM: '0.3',

  claddingLength: '',
  claddingHeight: '',
  claddingOpenings: [],
  claddingPieceLengthMm: '300',
  claddingPieceWidthMm: '600',
  claddingBeddingMm: '12',

  floorLength: '',
  floorWidth: '',
  slatePieceLengthMm: '300',
  slatePieceWidthMm: '300',
  slateBeddingMm: '20',

  pitchingLength: '',
  pitchingSlopeHeight: '',
  pitchingThicknessMm: '300',
  pitchingGrouted: false,

  dpcLength: '',
  dpcThickness: '',
  dpcHeightMm: '50',

  retTopWidth: '',
  retBottomWidth: '',
  retHeight: '',
  retLength: '',
}

// Small reusable text input
function Field({
  label,
  value,
  onChange,
  unit,
  error,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  unit?: string
  error?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-heading dark:text-heading-dark">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-3 py-2 dark:bg-slate-800 ${error ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600'}`}
        />
        {unit && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
            {unit}
          </div>
        )}
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default function StoneMasonryCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [formData, setFormData] = useState<StoneMasonryFormData>({ ...DEFAULT_FORM, unit: globalUnit })
  const [result, setResult] = useState<StoneMasonryResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  const [projectItems, setProjectItems] = useState<StoneMasonryProjectItem[]>([])
  const [projectName, setProjectName] = useState('Building Estimate')
  const [projectRateInputs, setProjectRateInputs] = useState<
    Record<string, { stoneRate: string; cementRate: string; sandRate: string; pieceRate: string }>
  >({})
  const [projectSummary, setProjectSummary] = useState<ReturnType<typeof StoneMasonryCalculatorLib.summarizeProject> | null>(
    null,
  )

  useEffect(() => {
    setFormData((prev) => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = window.localStorage.getItem(PROJECT_STORAGE_KEY)
      if (!saved) return
      const parsed = JSON.parse(saved) as {
        projectName?: string
        projectItems?: StoneMasonryProjectItem[]
        projectRateInputs?: Record<string, { stoneRate: string; cementRate: string; sandRate: string; pieceRate: string }>
      }
      if (parsed.projectName) setProjectName(parsed.projectName)
      if (parsed.projectItems && parsed.projectItems.length > 0) {
        setProjectItems(parsed.projectItems)
        setProjectSummary(StoneMasonryCalculatorLib.summarizeProject(parsed.projectItems))
      }
      if (parsed.projectRateInputs) setProjectRateInputs(parsed.projectRateInputs)
    } catch {
      window.localStorage.removeItem(PROJECT_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify({ projectName, projectItems, projectRateInputs }))
  }, [projectName, projectItems, projectRateInputs])

  const handleInputChange = (field: keyof StoneMasonryFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleWorkTypeChange = (workType: StoneWorkType) => {
    setFormData((prev) => ({ ...prev, workType }))
    setResult(null)
    setErrors({})
  }

  const handleWallThicknessTypeChange = useCallback((type: 'custom' | '12inch' | '18inch' | '24inch') => {
    setFormData((prev) => {
      let thickness = prev.thickness
      if (type !== 'custom') {
        thickness = prev.unit === 'm' ? WALL_THICKNESS_PRESETS[type].m : WALL_THICKNESS_PRESETS[type].ft
      }
      return { ...prev, wallThicknessType: type, thickness }
    })
  }, [])

  // Openings (wall masonry / boundary wall)
  const addOpening = useCallback(() => {
    const newOpening: Opening = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Opening ${formData.openings.length + 1}`,
      width: '',
      height: '',
      unit: formData.unit,
    }
    setFormData((prev) => ({ ...prev, openings: [...prev.openings, newOpening] }))
  }, [formData.openings.length, formData.unit])
  const removeOpening = useCallback((id: string) => {
    setFormData((prev) => ({ ...prev, openings: prev.openings.filter((o) => o.id !== id) }))
  }, [])
  const updateOpening = useCallback((id: string, field: keyof Opening, value: string) => {
    setFormData((prev) => ({
      ...prev,
      openings: prev.openings.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    }))
  }, [])

  // Openings (wall cladding)
  const addCladdingOpening = useCallback(() => {
    const newOpening: Opening = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Opening ${formData.claddingOpenings.length + 1}`,
      width: '',
      height: '',
      unit: formData.unit,
    }
    setFormData((prev) => ({ ...prev, claddingOpenings: [...prev.claddingOpenings, newOpening] }))
  }, [formData.claddingOpenings.length, formData.unit])
  const removeCladdingOpening = useCallback((id: string) => {
    setFormData((prev) => ({ ...prev, claddingOpenings: prev.claddingOpenings.filter((o) => o.id !== id) }))
  }, [])
  const updateCladdingOpening = useCallback((id: string, field: keyof Opening, value: string) => {
    setFormData((prev) => ({
      ...prev,
      claddingOpenings: prev.claddingOpenings.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    }))
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    const need = (val: string, key: string, label: string) => {
      if (!val || parseFloat(val) <= 0) newErrors[key] = `Enter a valid ${label}`
    }

    switch (formData.workType) {
      case 'wall_masonry':
      case 'boundary_wall':
        need(formData.length, 'length', 'length')
        need(formData.height, 'height', 'height')
        need(formData.thickness, 'thickness', 'thickness')
        formData.openings.forEach((o, i) => {
          if (o.width && parseFloat(o.width) <= 0) newErrors[`openingWidth_${o.id}`] = `Opening ${i + 1} width must be > 0`
          if (o.height && parseFloat(o.height) <= 0) newErrors[`openingHeight_${o.id}`] = `Opening ${i + 1} height must be > 0`
        })
        if (formData.includeTopCapping) {
          need(formData.cappingWidth, 'cappingWidth', 'coping width')
          need(formData.cappingThickness, 'cappingThickness', 'coping thickness')
        }
        if (formData.includeCornerStones) need(formData.numberOfCorners, 'numberOfCorners', 'number of corners')
        break
      case 'wall_cladding':
        need(formData.claddingLength, 'claddingLength', 'length')
        need(formData.claddingHeight, 'claddingHeight', 'height')
        break
      case 'slate_flooring':
        need(formData.floorLength, 'floorLength', 'length')
        need(formData.floorWidth, 'floorWidth', 'width')
        break
      case 'stone_pitching':
        need(formData.pitchingLength, 'pitchingLength', 'length')
        need(formData.pitchingSlopeHeight, 'pitchingSlopeHeight', 'slope length/height')
        break
      case 'dpc_course':
        need(formData.dpcLength, 'dpcLength', 'length')
        need(formData.dpcThickness, 'dpcThickness', 'wall thickness')
        break
      case 'retaining_wall':
        need(formData.retTopWidth, 'retTopWidth', 'top width')
        need(formData.retBottomWidth, 'retBottomWidth', 'bottom width')
        need(formData.retHeight, 'retHeight', 'height')
        need(formData.retLength, 'retLength', 'length')
        break
    }

    if (formData.wastageFactor) {
      const w = parseFloat(formData.wastageFactor)
      if (w < 0 || w > 30) newErrors.wastageFactor = 'Wastage factor must be between 0% and 30%'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const buildInput = () => {
    const unitSystem = formData.unit === 'm' ? ('metric' as const) : ('imperial' as const)
    const base = {
      workType: formData.workType,
      unit: formData.unit,
      mortarMixType: formData.mortarMixType,
      wastageFactor: formData.wastageFactor ? parseFloat(formData.wastageFactor) : 0,
    }

    switch (formData.workType) {
      case 'wall_masonry':
      case 'boundary_wall':
        return {
          ...base,
          length: parseFloat(formData.length),
          height: parseFloat(formData.height),
          thickness: parseFloat(formData.thickness),
          openings: formData.openings.map((op) => ({
            width: op.width ? parseFloat(op.width) : 0,
            height: op.height ? parseFloat(op.height) : 0,
            unitSystem: op.unit === 'm' ? ('metric' as const) : ('imperial' as const),
          })),
          includeTieStones: formData.includeTieStones,
          tieStoneSpacingM: formData.tieStoneSpacingM ? parseFloat(formData.tieStoneSpacingM) : undefined,
          tieStoneCourseSpacingM: formData.tieStoneCourseSpacingM
            ? parseFloat(formData.tieStoneCourseSpacingM)
            : undefined,
          includeTopCapping: formData.includeTopCapping,
          cappingWidth: formData.cappingWidth ? parseFloat(formData.cappingWidth) : undefined,
          cappingThickness: formData.cappingThickness ? parseFloat(formData.cappingThickness) : undefined,
          includeCornerStones: formData.includeCornerStones,
          numberOfCorners: formData.numberOfCorners ? parseInt(formData.numberOfCorners, 10) : undefined,
          courseHeightM: formData.courseHeightM ? parseFloat(formData.courseHeightM) : undefined,
        }
      case 'wall_cladding':
        return {
          ...base,
          claddingLength: parseFloat(formData.claddingLength),
          claddingHeight: parseFloat(formData.claddingHeight),
          claddingOpenings: formData.claddingOpenings.map((op) => ({
            width: op.width ? parseFloat(op.width) : 0,
            height: op.height ? parseFloat(op.height) : 0,
            unitSystem: op.unit === 'm' ? ('metric' as const) : ('imperial' as const),
          })),
          claddingPieceLengthMm: parseFloat(formData.claddingPieceLengthMm),
          claddingPieceWidthMm: parseFloat(formData.claddingPieceWidthMm),
          claddingBeddingMm: parseFloat(formData.claddingBeddingMm),
        }
      case 'slate_flooring':
        return {
          ...base,
          floorLength: parseFloat(formData.floorLength),
          floorWidth: parseFloat(formData.floorWidth),
          slatePieceLengthMm: parseFloat(formData.slatePieceLengthMm),
          slatePieceWidthMm: parseFloat(formData.slatePieceWidthMm),
          slateBeddingMm: parseFloat(formData.slateBeddingMm),
        }
      case 'stone_pitching':
        return {
          ...base,
          pitchingLength: parseFloat(formData.pitchingLength),
          pitchingSlopeHeight: parseFloat(formData.pitchingSlopeHeight),
          pitchingThicknessMm: parseFloat(formData.pitchingThicknessMm),
          pitchingGrouted: formData.pitchingGrouted,
        }
      case 'dpc_course':
        return {
          ...base,
          dpcLength: parseFloat(formData.dpcLength),
          dpcThickness: parseFloat(formData.dpcThickness),
          dpcHeightMm: parseFloat(formData.dpcHeightMm),
        }
      case 'retaining_wall':
        return {
          ...base,
          retTopWidth: parseFloat(formData.retTopWidth),
          retBottomWidth: parseFloat(formData.retBottomWidth),
          retHeight: parseFloat(formData.retHeight),
          retLength: parseFloat(formData.retLength),
        }
      default:
        return base
    }
  }

  const calculateMasonry = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    try {
      const input = buildInput()
      const res = StoneMasonryCalculatorLib.calculate(input as any)
      setResult(res)

      const itemId = `item-${Date.now()}`
      const typeLabel = STONE_WORK_TYPES.find((t) => t.value === formData.workType)?.label ?? formData.workType
      const newItem: StoneMasonryProjectItem = {
        id: itemId,
        name: `${projectName.trim() || 'Building Estimate'} • ${typeLabel} ${projectItems.length + 1}`,
        workType: formData.workType,
        input: input as any,
        result: res,
        stoneRate: projectRateInputs[itemId]?.stoneRate ? parseFloat(projectRateInputs[itemId].stoneRate) : undefined,
        cementRate: projectRateInputs[itemId]?.cementRate
          ? parseFloat(projectRateInputs[itemId].cementRate)
          : undefined,
        sandRate: projectRateInputs[itemId]?.sandRate ? parseFloat(projectRateInputs[itemId].sandRate) : undefined,
        pieceRate: projectRateInputs[itemId]?.pieceRate ? parseFloat(projectRateInputs[itemId].pieceRate) : undefined,
      }
      setProjectItems((prev) => {
        const nextItems = [...prev, newItem]
        setProjectSummary(StoneMasonryCalculatorLib.summarizeProject(nextItems))
        return nextItems
      })
      setProjectRateInputs((prev) => ({
        ...prev,
        [itemId]: {
          stoneRate: prev[itemId]?.stoneRate ?? '',
          cementRate: prev[itemId]?.cementRate ?? '',
          sandRate: prev[itemId]?.sandRate ?? '',
          pieceRate: prev[itemId]?.pieceRate ?? '',
        },
      }))
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'An error occurred during calculation.' })
    } finally {
      setIsCalculating(false)
    }
  }

  const updateProjectRate = useCallback(
    (itemId: string, field: 'stoneRate' | 'cementRate' | 'sandRate' | 'pieceRate', value: string) => {
      const parsedValue = value ? parseFloat(value) : undefined
      setProjectRateInputs((prev) => ({ ...prev, [itemId]: { ...prev[itemId], [field]: value } }))
      setProjectItems((prev) => {
        const nextItems = prev.map((item) => (item.id === itemId ? { ...item, [field]: parsedValue } : item))
        setProjectSummary(StoneMasonryCalculatorLib.summarizeProject(nextItems))
        return nextItems
      })
    },
    [],
  )

  const removeProjectItem = useCallback((itemId: string) => {
    setProjectItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== itemId)
      setProjectSummary(StoneMasonryCalculatorLib.summarizeProject(nextItems))
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
    if (typeof window !== 'undefined') window.localStorage.removeItem(PROJECT_STORAGE_KEY)
  }, [])

  const downloadProjectReport = useCallback(() => {
    if (!projectSummary) return
    const fileName = `${(projectName || 'stone-work-estimate').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'stone-work-estimate'}.txt`
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
    const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'stone-work-estimate'

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text(title, 40, 50)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Stone work building estimate summary', 40, 76)
    doc.text(`Total stone: ${projectSummary.totalStoneVolume.toFixed(3)} m³`, 40, 104)
    doc.text(`Total cement: ${projectSummary.totalCementBags.toFixed(2)} bags`, 40, 124)
    doc.text(`Total sand: ${projectSummary.totalSandWeight.toFixed(1)} kg`, 40, 144)
    doc.text(`Total pieces: ${projectSummary.totalPieceCount.toLocaleString()} pcs`, 40, 164)
    doc.text(`Grand total: ${projectSummary.totalAmount.toFixed(2)}`, 40, 184)

    let y = 214
    projectSummary.items.forEach((item) => {
      if (y > 760) {
        doc.addPage()
        y = 50
      }
      doc.setFont('helvetica', 'bold')
      doc.text(`${item.name}`, 40, y)
      doc.setFont('helvetica', 'normal')
      doc.text(
        `${item.stoneVolume.toFixed(3)} m³ stone • ${item.cementBags.toFixed(1)} cement bags • ${item.pieceCount} pieces`,
        40,
        y + 16,
      )
      y += 40
    })

    doc.save(`${safeName}.pdf`)
  }, [projectName, projectSummary])

  const exportProjectAsXlsx = useCallback(() => {
    if (!projectSummary) return
    const rows = [
      ['Component', 'Work Type', 'Stone (m3)', 'Cement Bags', 'Sand (kg)', 'Pieces', 'Stone Amt', 'Cement Amt', 'Sand Amt', 'Piece Amt', 'Total'],
      ...projectSummary.items.map((item) => [
        item.name,
        item.workType,
        item.stoneVolume.toFixed(3),
        item.cementBags.toFixed(2),
        item.sandWeight.toFixed(1),
        item.pieceCount,
        item.stoneAmount.toFixed(2),
        item.cementAmount.toFixed(2),
        item.sandAmount.toFixed(2),
        item.pieceAmount.toFixed(2),
        item.totalAmount.toFixed(2),
      ]),
      [
        'TOTAL',
        '',
        projectSummary.totalStoneVolume.toFixed(3),
        projectSummary.totalCementBags.toFixed(2),
        projectSummary.totalSandWeight.toFixed(1),
        projectSummary.totalPieceCount,
        projectSummary.totalStoneAmount.toFixed(2),
        projectSummary.totalCementAmount.toFixed(2),
        projectSummary.totalSandAmount.toFixed(2),
        projectSummary.totalPieceAmount.toFixed(2),
        projectSummary.totalAmount.toFixed(2),
      ],
    ]
    const worksheet = XLSX.utils.aoa_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimate')
    const safeName =
      (projectName || 'Building Estimate').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'stone-work-estimate'
    XLSX.writeFile(workbook, `${safeName}.xlsx`)
  }, [projectName, projectSummary])

  const exportSummary = useCallback(() => {
    if (!result) return
    const rows: Array<{ label: string; value: string; unit?: string }> = []
    if (result.stoneVolume !== undefined) rows.push({ label: 'Stone Volume', value: result.stoneVolume.toFixed(3), unit: 'm³' })
    if (result.netArea !== undefined) rows.push({ label: 'Net Area', value: result.netArea.toFixed(3), unit: 'm²' })
    if (result.pieceCount !== undefined) rows.push({ label: 'Pieces', value: result.pieceCount.toLocaleString(), unit: 'pcs' })
    if (result.cementBags !== undefined) rows.push({ label: 'Cement', value: result.cementBags.toFixed(2), unit: 'bags' })
    if (result.sandWeight !== undefined) rows.push({ label: 'Sand', value: result.sandWeight.toFixed(1), unit: 'kg' })
    if (result.tieStoneCount) rows.push({ label: 'Tie Stones', value: result.tieStoneCount.toLocaleString(), unit: 'pcs' })
    if (result.cappingVolume) rows.push({ label: 'Top Capping', value: result.cappingVolume.toFixed(3), unit: 'm³' })
    if (result.cornerStoneCount) rows.push({ label: 'Corner Stones', value: result.cornerStoneCount.toLocaleString(), unit: 'pcs' })
    const title = STONE_WORK_TYPES.find((t) => t.value === formData.workType)?.label ?? 'Stone Work Estimate'
    exportEstimateText(title, rows)
    exportEstimatePdf(title, rows)
    exportEstimateXlsx(title, rows)
  }, [result, formData.workType])

  const resetForm = () => {
    setFormData({ ...DEFAULT_FORM, unit: globalUnit, workType: formData.workType })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  const ActiveIcon = WORK_TYPE_ICONS[formData.workType]

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
              <h1 className="  text-2xl font-bold text-heading dark:text-heading-dark">Stone Work Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Wall masonry, cladding, flooring, boundary walls, pitching, DPC & retaining walls.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-8 pt-8">
          {/* Stone Work Type selector — same visual language as Concrete Calculator's Element Type grid */}
          <div className="mb-6">
            <label className="mb-2 block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
              Stone Work Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {STONE_WORK_TYPES.map((type) => {
                const Icon = WORK_TYPE_ICONS[type.value]
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleWorkTypeChange(type.value)}
                    className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                      formData.workType === type.value
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
                    <span className="text-[10px] sm:text-xs text-center">{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Illustrative header for the selected type */}
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-slate-200/40 bg-slate-50 px-4 py-3 dark:border-slate-700/40 dark:bg-slate-800/40">
            <ActiveIcon className="h-6 w-6 text-primary shrink-0" />
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              {formData.workType === 'wall_masonry' &&
                'Structural rubble/random-rubble stone wall — volume, mortar & stone quantities.'}
              {formData.workType === 'boundary_wall' &&
                'Compound/boundary wall — same as wall masonry, usually with a top capping course.'}
              {formData.workType === 'wall_cladding' &&
                'Cut stone tiles fixed onto a finished wall face — area & piece count.'}
              {formData.workType === 'slate_flooring' &&
                'Slate/stone floor tiles bedded in mortar — area & piece count.'}
              {formData.workType === 'stone_pitching' &&
                'Slope/riverbank stone protection layer — area × thickness.'}
              {formData.workType === 'dpc_course' &&
                'Thin stone/mortar strip at plinth level to block rising damp.'}
              {formData.workType === 'retaining_wall' &&
                'Trapezoidal-section gravity retaining wall — top width, bottom width & height.'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          className="px-4 sm:px-6 md:px-8 pb-8"
          onSubmit={(e) => {
            e.preventDefault()
            calculateMasonry()
          }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* ---- Wall Masonry / Boundary Wall ---- */}
            {(formData.workType === 'wall_masonry' || formData.workType === 'boundary_wall') && (
              <>
                <Field label={`Length (${formData.unit})`} value={formData.length} onChange={(v) => handleInputChange('length', v)} error={errors.length} />
                <Field label={`Height (${formData.unit})`} value={formData.height} onChange={(v) => handleInputChange('height', v)} error={errors.height} />

                <div className="md:col-span-2">
                  <label className="mb-2 block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                    Wall Thickness
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {(['12inch', '18inch', '24inch'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleWallThicknessTypeChange(t)}
                        className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm flex-1 min-w-[100px] max-w-[140px] ${
                          formData.wallThicknessType === t
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="block">{t.replace('inch', ' inch')} Wall</span>
                        <span className="block text-[10px] sm:text-xs opacity-80">
                          {formData.unit === 'm' ? WALL_THICKNESS_PRESETS[t].m + ' m' : WALL_THICKNESS_PRESETS[t].ft + ' ft'}
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleWallThicknessTypeChange('custom')}
                      className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm flex-1 min-w-[100px] max-w-[140px] ${
                        formData.wallThicknessType === 'custom'
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Custom
                    </button>
                    {formData.wallThicknessType === 'custom' && (
                      <div className="relative flex-1 min-w-[120px] max-w-[200px]">
                        <input
                          type="number"
                          value={formData.thickness}
                          onChange={(e) => handleInputChange('thickness', e.target.value)}
                          placeholder="Thickness"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 sm:px-4 py-2 font-sans text-sm dark:border-slate-600 dark:bg-slate-800"
                        />
                        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-body/60 dark:text-body-dark/60">
                          {formData.unit}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.thickness && <p className="text-red-600 text-xs mt-2">{errors.thickness}</p>}
                </div>

                {/* Openings */}
                <div className="md:col-span-2">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-3 sm:mb-4">
                    <label className="block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                      Door/Window Openings (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={addOpening}
                      className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm whitespace-nowrap"
                    >
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Add Opening
                    </button>
                  </div>
                  {formData.openings.map((opening, index) => (
                    <div key={opening.id} className="mb-4 p-4 border border-slate-200 rounded-lg dark:border-slate-600">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">{opening.name}</span>
                        <button type="button" onClick={() => removeOpening(opening.id)} className="text-red-600 hover:text-red-800 dark:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field label="Width" value={opening.width} onChange={(v) => updateOpening(opening.id, 'width', v)} unit={opening.unit} error={errors[`openingWidth_${opening.id}`]} />
                        <Field label="Height" value={opening.height} onChange={(v) => updateOpening(opening.id, 'height', v)} unit={opening.unit} error={errors[`openingHeight_${opening.id}`]} />
                        <div>
                          <label className="block text-sm font-medium mb-1">Unit</label>
                          <select
                            value={opening.unit}
                            onChange={(e) => updateOpening(opening.id, 'unit', e.target.value as 'm' | 'ft')}
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

                {/* Easy Extras — collapsible, plain language */}
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('showAdvanced', !formData.showAdvanced)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-heading transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-heading-dark dark:hover:bg-slate-800"
                  >
                    <span>Extra Stonework (Tie Stones, Top Capping, Corner Stones) — Optional</span>
                    {formData.showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {formData.showAdvanced && (
                    <div className="mt-4 space-y-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                      <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-600">
                        <label className="flex items-center gap-2 text-sm font-medium text-heading dark:text-heading-dark">
                          <input type="checkbox" checked={formData.includeTieStones} onChange={(e) => handleInputChange('includeTieStones', e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                          Include Tie Stones
                        </label>
                        <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
                          Long stones placed through the wall thickness every so often, to tie the two wall
                          faces together for strength.
                        </p>
                        {formData.includeTieStones && (
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Horizontal Spacing (m)" value={formData.tieStoneSpacingM} onChange={(v) => handleInputChange('tieStoneSpacingM', v)} />
                            <Field label="Vertical Spacing (m)" value={formData.tieStoneCourseSpacingM} onChange={(v) => handleInputChange('tieStoneCourseSpacingM', v)} />
                          </div>
                        )}
                      </div>

                      <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-600">
                        <label className="flex items-center gap-2 text-sm font-medium text-heading dark:text-heading-dark">
                          <input type="checkbox" checked={formData.includeTopCapping} onChange={(e) => handleInputChange('includeTopCapping', e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                          Include Top Capping
                        </label>
                        <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
                          A finishing course of flat stones along the very top of the wall (common on boundary walls).
                        </p>
                        {formData.includeTopCapping && (
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label={`Capping Width (${formData.unit})`} value={formData.cappingWidth} onChange={(v) => handleInputChange('cappingWidth', v)} error={errors.cappingWidth} />
                            <Field label={`Capping Thickness (${formData.unit})`} value={formData.cappingThickness} onChange={(v) => handleInputChange('cappingThickness', v)} error={errors.cappingThickness} />
                          </div>
                        )}
                      </div>

                      <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-600">
                        <label className="flex items-center gap-2 text-sm font-medium text-heading dark:text-heading-dark">
                          <input type="checkbox" checked={formData.includeCornerStones} onChange={(e) => handleInputChange('includeCornerStones', e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                          Include Corner Stones
                        </label>
                        <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
                          Bigger, neatly-cut stones used at each corner of the wall for a strong, straight edge.
                        </p>
                        {formData.includeCornerStones && (
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Number of Corners" value={formData.numberOfCorners} onChange={(v) => handleInputChange('numberOfCorners', v)} error={errors.numberOfCorners} />
                            <Field label="Course Height (m)" value={formData.courseHeightM} onChange={(v) => handleInputChange('courseHeightM', v)} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ---- Wall Cladding ---- */}
            {formData.workType === 'wall_cladding' && (
              <>
                <Field label={`Wall Length (${formData.unit})`} value={formData.claddingLength} onChange={(v) => handleInputChange('claddingLength', v)} error={errors.claddingLength} />
                <Field label={`Wall Height (${formData.unit})`} value={formData.claddingHeight} onChange={(v) => handleInputChange('claddingHeight', v)} error={errors.claddingHeight} />
                <Field label="Stone Piece Length (mm)" value={formData.claddingPieceLengthMm} onChange={(v) => handleInputChange('claddingPieceLengthMm', v)} />
                <Field label="Stone Piece Width (mm)" value={formData.claddingPieceWidthMm} onChange={(v) => handleInputChange('claddingPieceWidthMm', v)} />
                <Field label="Bedding Mortar Thickness (mm)" value={formData.claddingBeddingMm} onChange={(v) => handleInputChange('claddingBeddingMm', v)} />

                <div className="md:col-span-2">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-3 sm:mb-4">
                    <label className="block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                      Openings to Exclude (Optional)
                    </label>
                    <button type="button" onClick={addCladdingOpening} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm whitespace-nowrap">
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Add Opening
                    </button>
                  </div>
                  {formData.claddingOpenings.map((opening) => (
                    <div key={opening.id} className="mb-4 p-4 border border-slate-200 rounded-lg dark:border-slate-600">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">{opening.name}</span>
                        <button type="button" onClick={() => removeCladdingOpening(opening.id)} className="text-red-600 hover:text-red-800 dark:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field label="Width" value={opening.width} onChange={(v) => updateCladdingOpening(opening.id, 'width', v)} unit={opening.unit} />
                        <Field label="Height" value={opening.height} onChange={(v) => updateCladdingOpening(opening.id, 'height', v)} unit={opening.unit} />
                        <div>
                          <label className="block text-sm font-medium mb-1">Unit</label>
                          <select value={opening.unit} onChange={(e) => updateCladdingOpening(opening.id, 'unit', e.target.value as 'm' | 'ft')} className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800">
                            <option value="m">Meters (m)</option>
                            <option value="ft">Feet (ft)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ---- Slate/Stone Flooring ---- */}
            {formData.workType === 'slate_flooring' && (
              <>
                <Field label={`Floor Length (${formData.unit})`} value={formData.floorLength} onChange={(v) => handleInputChange('floorLength', v)} error={errors.floorLength} />
                <Field label={`Floor Width (${formData.unit})`} value={formData.floorWidth} onChange={(v) => handleInputChange('floorWidth', v)} error={errors.floorWidth} />
                <Field label="Slate Piece Length (mm)" value={formData.slatePieceLengthMm} onChange={(v) => handleInputChange('slatePieceLengthMm', v)} />
                <Field label="Slate Piece Width (mm)" value={formData.slatePieceWidthMm} onChange={(v) => handleInputChange('slatePieceWidthMm', v)} />
                <Field label="Bedding Mortar Thickness (mm)" value={formData.slateBeddingMm} onChange={(v) => handleInputChange('slateBeddingMm', v)} />
              </>
            )}

            {/* ---- Stone Pitching ---- */}
            {formData.workType === 'stone_pitching' && (
              <>
                <Field label={`Length (${formData.unit})`} value={formData.pitchingLength} onChange={(v) => handleInputChange('pitchingLength', v)} error={errors.pitchingLength} />
                <Field label={`Slope Length/Height (${formData.unit})`} value={formData.pitchingSlopeHeight} onChange={(v) => handleInputChange('pitchingSlopeHeight', v)} error={errors.pitchingSlopeHeight} />
                <Field label="Pitching Thickness (mm)" value={formData.pitchingThicknessMm} onChange={(v) => handleInputChange('pitchingThicknessMm', v)} />
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-heading dark:text-heading-dark mt-7">
                    <input type="checkbox" checked={formData.pitchingGrouted} onChange={(e) => handleInputChange('pitchingGrouted', e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                    Grouted with mortar (otherwise dry-stone)
                  </label>
                </div>
              </>
            )}

            {/* ---- DPC / Plinth Course ---- */}
            {formData.workType === 'dpc_course' && (
              <>
                <Field label={`Length (${formData.unit})`} value={formData.dpcLength} onChange={(v) => handleInputChange('dpcLength', v)} error={errors.dpcLength} />
                <Field label={`Wall Thickness (${formData.unit})`} value={formData.dpcThickness} onChange={(v) => handleInputChange('dpcThickness', v)} error={errors.dpcThickness} />
                <Field label="DPC Course Height (mm)" value={formData.dpcHeightMm} onChange={(v) => handleInputChange('dpcHeightMm', v)} />
              </>
            )}

            {/* ---- Retaining Wall ---- */}
            {formData.workType === 'retaining_wall' && (
              <>
                <Field label={`Top Width (${formData.unit})`} value={formData.retTopWidth} onChange={(v) => handleInputChange('retTopWidth', v)} error={errors.retTopWidth} />
                <Field label={`Bottom Width (${formData.unit})`} value={formData.retBottomWidth} onChange={(v) => handleInputChange('retBottomWidth', v)} error={errors.retBottomWidth} />
                <Field label={`Height (${formData.unit})`} value={formData.retHeight} onChange={(v) => handleInputChange('retHeight', v)} error={errors.retHeight} />
                <Field label={`Length (${formData.unit})`} value={formData.retLength} onChange={(v) => handleInputChange('retLength', v)} error={errors.retLength} />
              </>
            )}

            {/* Shared: Unit, Mortar Mix, Wastage */}
            <div>
              <label className="mb-2 block font-medium text-heading dark:text-heading-dark">Unit</label>
              <select value={formData.unit} onChange={(e) => handleInputChange('unit', e.target.value as 'm' | 'ft')} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800">
                <option value="m">Metric (m)</option>
                <option value="ft">Imperial (ft)</option>
              </select>
            </div>
            {formData.workType !== 'stone_pitching' || formData.pitchingGrouted ? (
              <div>
                <label className="mb-2 block font-medium text-heading dark:text-heading-dark">Mortar Mix Type</label>
                <select value={formData.mortarMixType} onChange={(e) => handleInputChange('mortarMixType', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800">
                  {MORTAR_MIX_TYPES.map((mix) => (
                    <option key={mix.value} value={mix.value}>
                      {mix.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div>
              <label className="mb-2 block font-medium text-heading dark:text-heading-dark">Wastage Factor (%)</label>
              <input type="number" value={formData.wastageFactor} onChange={(e) => handleInputChange('wastageFactor', e.target.value)} min="0" max="30" className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.wastageFactor ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`} />
              {errors.wastageFactor && <p className="text-red-600 text-xs mt-1">{errors.wastageFactor}</p>}
            </div>
          </div>

          {errors.general && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
              <Info className="h-4 w-4" />
              {errors.general}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={resetForm} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700">
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <PremiumLockedButton
                calculatorId={CALC_ID}
                onAuthorizedClick={() => setShowSteps(!showSteps)}
                isActive={showSteps}
                disabled={!result}
                activeClassName="flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium bg-primary text-white"
                inactiveClassName="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
              >
                {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </PremiumLockedButton>
            </div>
            <button type="submit" disabled={isCalculating} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-soft hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
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
        </form>

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
                <h2 className="  text-xl font-semibold text-heading dark:text-heading-dark">Calculation Results</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(result.stoneVolume !== undefined || result.wetVolume !== undefined) && (
                  <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                    <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Stone / Volume</h3>
                    <div className="space-y-3">
                      {result.stoneVolume !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Stone Volume</span>
                          <span className="font-mono font-semibold">{result.stoneVolume.toFixed(3)} m³</span>
                        </div>
                      )}
                      {result.netWetVolume !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Net Volume</span>
                          <span className="font-mono font-semibold">{result.netWetVolume.toFixed(3)} m³</span>
                        </div>
                      )}
                      {result.totalOpeningVolume !== undefined && result.totalOpeningVolume > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Openings Deducted</span>
                          <span className="font-mono font-semibold">{result.totalOpeningVolume.toFixed(3)} m³</span>
                        </div>
                      )}
                      {result.crossSectionArea !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Cross-section Area</span>
                          <span className="font-mono font-semibold">{result.crossSectionArea.toFixed(3)} m²</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(result.netArea !== undefined || result.pieceCount !== undefined) && (
                  <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                    <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Area &amp; Pieces</h3>
                    <div className="space-y-3">
                      {result.netArea !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Net Area</span>
                          <span className="font-mono font-semibold">{result.netArea.toFixed(3)} m²</span>
                        </div>
                      )}
                      {result.pieceCount !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Pieces Required</span>
                          <span className="font-mono font-semibold">{result.pieceCount.toLocaleString()} pcs</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(result.cementBags !== undefined || result.sandWeight !== undefined) && (
                  <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                    <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Mortar (Cement &amp; Sand)</h3>
                    <div className="space-y-3">
                      {result.cementBags !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Cement</span>
                          <span className="font-mono font-semibold">{result.cementBags.toFixed(2)} bags</span>
                        </div>
                      )}
                      {result.sandWeight !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Sand</span>
                          <span className="font-mono font-semibold">{result.sandWeight.toFixed(1)} kg</span>
                        </div>
                      )}
                      {result.mortarMixRatio && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Mix Ratio</span>
                          <span className="font-mono font-semibold">{result.mortarMixRatio}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(!!result.tieStoneCount || !!result.cappingVolume || !!result.cornerStoneCount) && (
                  <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                    <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Extra Stonework</h3>
                    <div className="space-y-3">
                      {!!result.tieStoneCount && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Tie Stones</span>
                          <span className="font-mono font-semibold">{result.tieStoneCount.toLocaleString()} pcs</span>
                        </div>
                      )}
                      {!!result.cappingVolume && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Top Capping</span>
                          <span className="font-mono font-semibold">{result.cappingVolume.toFixed(3)} m³</span>
                        </div>
                      )}
                      {!!result.cornerStoneCount && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Corner Stones</span>
                          <span className="font-mono font-semibold">{result.cornerStoneCount.toLocaleString()} pcs</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {result.human_summary && (
                <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <b>Engineering Summary:</b> {result.human_summary}
                </div>
              )}

              <PremiumFeatureGate
                calculatorId={CALC_ID}
                title="Stone Work Estimate Summary"
                description="Watch the ad to unlock step-by-step calculation breakdown, project estimate, and export options."
              >
                {showSteps && result && (
                  <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                    <h3 className="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                      How this was calculated
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                      {(result.assumptions ?? []).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-6">
                  <PremiumLockedAction calculatorId={CALC_ID} onAuthorizedClick={exportSummary} className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium dark:border-slate-600 dark:bg-slate-800">
                    <FileText className="h-4 w-4" />
                    Export Estimate
                  </PremiumLockedAction>
                </div>

                <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                  <b>
                    Unlock Premium to Calculate for Multiple Stone Works at Once{' '}
                    <i className="text-amber-600 dark:text-amber-400">by viewing ads</i>
                  </b>
                </div>

                {/* Project Estimate Summary — same pattern as Concrete/Brickwork Calculator */}
                {projectSummary && (
                  <div className="mt-6 border-t border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold text-heading dark:text-heading-dark">Building Estimate Summary</h2>
                        <p className="mt-1 text-sm text-body/70 dark:text-body-dark/70">
                          {projectItems.length} component(s) saved locally — any mix of stone work types. Rates apply
                          per component below.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project name" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
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
                        <button type="button" onClick={clearProject} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 dark:border-red-800 dark:text-red-400">
                          Clear Project
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{projectItems.length} components</div>
                      <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Auto-saved locally</div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                        <p className="text-sm text-body/70 dark:text-body-dark/70">Total Stone</p>
                        <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalStoneVolume.toFixed(3)} m³</p>
                      </div>
                      <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                        <p className="text-sm text-body/70 dark:text-body-dark/70">Total Cement</p>
                        <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalCementBags.toFixed(1)} bags</p>
                      </div>
                      <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                        <p className="text-sm text-body/70 dark:text-body-dark/70">Total Pieces</p>
                        <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalPieceCount.toLocaleString()} pcs</p>
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
                                <p className="text-sm text-body/70 dark:text-body-dark/70">
                                  {STONE_WORK_TYPES.find((t) => t.value === item.workType)?.label} • {item.stoneVolume.toFixed(3)} m³ stone •{' '}
                                  {item.cementBags.toFixed(1)} cement bags{item.pieceCount > 0 && ` • ${item.pieceCount} pieces`}
                                </p>
                              </div>
                              <button type="button" onClick={() => removeProjectItem(item.id)} className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400">
                                Remove
                              </button>
                            </div>
                            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                              <label className="text-sm text-body/70 dark:text-body-dark/70">
                                Stone Rate (per m³)
                                <input type="number" min="0" value={projectRateInputs[item.id]?.stoneRate ?? ''} onChange={(e) => updateProjectRate(item.id, 'stoneRate', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900" />
                              </label>
                              <label className="text-sm text-body/70 dark:text-body-dark/70">
                                Cement Rate (per bag)
                                <input type="number" min="0" value={projectRateInputs[item.id]?.cementRate ?? ''} onChange={(e) => updateProjectRate(item.id, 'cementRate', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900" />
                              </label>
                              <label className="text-sm text-body/70 dark:text-body-dark/70">
                                Sand Rate (per kg)
                                <input type="number" min="0" value={projectRateInputs[item.id]?.sandRate ?? ''} onChange={(e) => updateProjectRate(item.id, 'sandRate', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900" />
                              </label>
                              <label className="text-sm text-body/70 dark:text-body-dark/70">
                                Piece Rate (per pc)
                                <input type="number" min="0" value={projectRateInputs[item.id]?.pieceRate ?? ''} onChange={(e) => updateProjectRate(item.id, 'pieceRate', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900" />
                              </label>
                            </div>
                            <div className="mt-3 text-right text-sm font-mono text-body/80 dark:text-body-dark/80">
                              Component total: <strong>{item.totalAmount.toFixed(2)}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-amber-200/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100">
                      <h3 className="font-semibold">Project Report Preview</h3>
                      <pre className="mt-3 whitespace-pre-wrap text-sm">{projectSummary.reportText}</pre>
                    </div>
                  </div>
                )}
              </PremiumFeatureGate>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <STONEMASONRY_INFO_SECTION />
    </div>
  )
}