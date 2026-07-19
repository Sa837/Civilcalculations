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
  PaintBucket,
} from 'lucide-react'
import {
  PaintCalculator as PaintCalculatorLib,
  PAINT_TYPES,
  type PaintCalculationResult,
  type PaintProjectItem,
} from '@/lib/registry/calculator/paint-calculator'
import { PAINT_INFO_SECTION } from '@/lib/registry/calculator/enhanced-info-section/paint-info-secto'
import { exportEstimatePdf, exportEstimateText, exportEstimateXlsx } from './professional-estimate-utils'
import {
  PremiumFeatureGate,
  PremiumLockedButton,
  PremiumLockedAction,
} from './advanced-estimate-gate'

const CALC_ID = 'paint'
const PROJECT_STORAGE_KEY = 'civil-paint-project-v1'

interface Opening {
  id: string
  name: string
  width: string
  height: string
  unit: 'm' | 'ft'
}

interface PaintFormData {
  useArea: boolean
  length: string
  height: string
  area: string
  unit: 'm' | 'ft'
  openings: Opening[]

  paintType: string
  coats: string
  coverage: string

  wastageFactor: string

  showAdvanced: boolean
  includePrimer: boolean
  primerCoats: string
  primerCoverage: string
  includePutty: boolean
  puttyCoats: string
  puttyCoverageKgPerM2: string

  showCostInputs: boolean
  paintRatePerLiter: string
  primerRatePerLiter: string
  puttyRatePerKg: string
  laborRatePerM2: string

  showStepByStep: boolean
}

const DEFAULT_FORM: PaintFormData = {
  useArea: false,
  length: '',
  height: '',
  area: '',
  unit: 'm',
  openings: [],

  paintType: 'emulsion_interior',
  coats: '2',
  coverage: String(PAINT_TYPES.find((p) => p.value === 'emulsion_interior')?.coveragePerLiter ?? 10),

  wastageFactor: '5',

  showAdvanced: false,
  includePrimer: false,
  primerCoats: '1',
  primerCoverage: '10',
  includePutty: false,
  puttyCoats: '2',
  puttyCoverageKgPerM2: '0.75',

  showCostInputs: false,
  paintRatePerLiter: '',
  primerRatePerLiter: '',
  puttyRatePerKg: '',
  laborRatePerM2: '',

  showStepByStep: false,
}

function Field({
  label,
  value,
  onChange,
  unit,
  error,
  placeholder,
  step = '0.01',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  unit?: string
  error?: string
  placeholder?: string
  step?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-heading dark:text-heading-dark">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-3 py-2 dark:bg-slate-800 ${
            error ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600'
          }`}
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

export default function PaintCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [formData, setFormData] = useState<PaintFormData>({ ...DEFAULT_FORM, unit: globalUnit })
  const [result, setResult] = useState<PaintCalculationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  const [projectItems, setProjectItems] = useState<PaintProjectItem[]>([])
  const [projectName, setProjectName] = useState('Painting Estimate')
  const [projectSummary, setProjectSummary] = useState<ReturnType<typeof PaintCalculatorLib.summarizeProject> | null>(null)

  useEffect(() => {
    setFormData((prev) => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = window.localStorage.getItem(PROJECT_STORAGE_KEY)
      if (!saved) return
      const parsed = JSON.parse(saved) as { projectName?: string; projectItems?: PaintProjectItem[] }
      if (parsed.projectName) setProjectName(parsed.projectName)
      if (parsed.projectItems && parsed.projectItems.length > 0) {
        setProjectItems(parsed.projectItems)
        setProjectSummary(PaintCalculatorLib.summarizeProject(parsed.projectItems))
      }
    } catch {
      window.localStorage.removeItem(PROJECT_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify({ projectName, projectItems }))
  }, [projectName, projectItems])

  const handleInputChange = (field: keyof PaintFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (typeof field === 'string' && errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handlePaintTypeChange = (paintType: string) => {
    const preset = PAINT_TYPES.find((p) => p.value === paintType)
    setFormData((prev) => ({
      ...prev,
      paintType,
      coverage: preset ? String(preset.coveragePerLiter) : prev.coverage,
    }))
  }

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    const need = (val: string, key: string, label: string) => {
      if (!val || parseFloat(val) <= 0) newErrors[key] = `Enter a valid ${label}`
    }

    if (formData.useArea) {
      need(formData.area, 'area', 'area')
    } else {
      need(formData.length, 'length', 'length')
      need(formData.height, 'height', 'height')
      formData.openings.forEach((o, i) => {
        if (o.width && parseFloat(o.width) <= 0) newErrors[`openingWidth_${o.id}`] = `Opening ${i + 1} width must be > 0`
        if (o.height && parseFloat(o.height) <= 0) newErrors[`openingHeight_${o.id}`] = `Opening ${i + 1} height must be > 0`
      })
    }

    need(formData.coats, 'coats', 'number of coats')
    need(formData.coverage, 'coverage', 'coverage')

    if (formData.wastageFactor) {
      const w = parseFloat(formData.wastageFactor)
      if (w < 0 || w > 30) newErrors.wastageFactor = 'Wastage factor must be between 0% and 30%'
    }

    if (formData.includePrimer) {
      need(formData.primerCoats, 'primerCoats', 'primer coats')
      need(formData.primerCoverage, 'primerCoverage', 'primer coverage')
    }

    if (formData.includePutty) {
      need(formData.puttyCoats, 'puttyCoats', 'putty coats')
      need(formData.puttyCoverageKgPerM2, 'puttyCoverageKgPerM2', 'putty coverage')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const buildInput = () => {
    const openings = formData.openings.map((op) => ({
      width: op.width ? parseFloat(op.width) : 0,
      height: op.height ? parseFloat(op.height) : 0,
      unitSystem: op.unit === 'm' ? ('metric' as const) : ('imperial' as const),
    }))

    return {
      useArea: formData.useArea,
      length: formData.length ? parseFloat(formData.length) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined,
      area: formData.area ? parseFloat(formData.area) : undefined,
      unit: formData.unit,
      openings: formData.useArea ? [] : openings,

      paintType: formData.paintType,
      coats: parseInt(formData.coats, 10),
      coverage: parseFloat(formData.coverage),

      wastageFactor: formData.wastageFactor ? parseFloat(formData.wastageFactor) : 0,

      includePrimer: formData.includePrimer,
      primerCoats: formData.primerCoats ? parseInt(formData.primerCoats, 10) : undefined,
      primerCoverage: formData.primerCoverage ? parseFloat(formData.primerCoverage) : undefined,

      includePutty: formData.includePutty,
      puttyCoats: formData.puttyCoats ? parseInt(formData.puttyCoats, 10) : undefined,
      puttyCoverageKgPerM2: formData.puttyCoverageKgPerM2 ? parseFloat(formData.puttyCoverageKgPerM2) : undefined,

      paintRatePerLiter: formData.paintRatePerLiter ? parseFloat(formData.paintRatePerLiter) : 0,
      primerRatePerLiter: formData.primerRatePerLiter ? parseFloat(formData.primerRatePerLiter) : 0,
      puttyRatePerKg: formData.puttyRatePerKg ? parseFloat(formData.puttyRatePerKg) : 0,
      laborRatePerM2: formData.laborRatePerM2 ? parseFloat(formData.laborRatePerM2) : 0,
    }
  }

  const calculatePaint = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    try {
      const input = buildInput()
      const res = PaintCalculatorLib.calculate(input)
      setResult(res)

      const itemId = `item-${Date.now()}`
      const paintLabel = PAINT_TYPES.find((p) => p.value === formData.paintType)?.label ?? 'Paint'
      const newItem: PaintProjectItem = {
        id: itemId,
        name: `${projectName.trim() || 'Painting Estimate'} • ${paintLabel} ${projectItems.length + 1}`,
        input,
        result: res,
      }
      setProjectItems((prev) => {
        const nextItems = [...prev, newItem]
        setProjectSummary(PaintCalculatorLib.summarizeProject(nextItems))
        return nextItems
      })
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'An error occurred during calculation.' })
    } finally {
      setIsCalculating(false)
    }
  }

  const removeProjectItem = useCallback((itemId: string) => {
    setProjectItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== itemId)
      setProjectSummary(PaintCalculatorLib.summarizeProject(nextItems))
      return nextItems
    })
  }, [])

  const clearProject = useCallback(() => {
    setProjectItems([])
    setProjectSummary(null)
    setProjectName('Painting Estimate')
    if (typeof window !== 'undefined') window.localStorage.removeItem(PROJECT_STORAGE_KEY)
  }, [])

  const downloadProjectReport = useCallback(() => {
    if (!projectSummary) return
    const fileName = `${(projectName || 'paint-estimate').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'paint-estimate'}.txt`
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
    const title = (projectName || 'Painting Estimate').trim() || 'Painting Estimate'
    const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'paint-estimate'

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text(title, 40, 50)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Paint work estimate summary', 40, 76)
    doc.text(`Total area: ${projectSummary.totalNetArea.toFixed(2)} m²`, 40, 104)
    doc.text(`Total paint: ${projectSummary.totalPaintRequired.toFixed(2)} L`, 40, 124)
    doc.text(`Total primer: ${projectSummary.totalPrimerRequired.toFixed(2)} L`, 40, 144)
    doc.text(`Total putty: ${projectSummary.totalPuttyRequired.toFixed(1)} kg`, 40, 164)
    doc.text(`Grand total: ${projectSummary.totalCost.toFixed(2)}`, 40, 184)

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
        `${item.netArea.toFixed(2)} m² • ${item.paintRequired.toFixed(2)} L paint • total ${item.totalCost.toFixed(2)}`,
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
      ['Component', 'Area (m2)', 'Paint (L)', 'Primer (L)', 'Putty (kg)', 'Paint Cost', 'Primer Cost', 'Putty Cost', 'Labor Cost', 'Total'],
      ...projectSummary.items.map((item) => [
        item.name,
        item.netArea.toFixed(3),
        item.paintRequired.toFixed(2),
        item.primerRequired.toFixed(2),
        item.puttyRequired.toFixed(1),
        item.paintCost.toFixed(2),
        item.primerCost.toFixed(2),
        item.puttyCost.toFixed(2),
        item.laborCost.toFixed(2),
        item.totalCost.toFixed(2),
      ]),
      [
        'TOTAL',
        projectSummary.totalNetArea.toFixed(3),
        projectSummary.totalPaintRequired.toFixed(2),
        projectSummary.totalPrimerRequired.toFixed(2),
        projectSummary.totalPuttyRequired.toFixed(1),
        projectSummary.totalPaintCost.toFixed(2),
        projectSummary.totalPrimerCost.toFixed(2),
        projectSummary.totalPuttyCost.toFixed(2),
        projectSummary.totalLaborCost.toFixed(2),
        projectSummary.totalCost.toFixed(2),
      ],
    ]
    const worksheet = XLSX.utils.aoa_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimate')
    const safeName = (projectName || 'Painting Estimate').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'paint-estimate'
    XLSX.writeFile(workbook, `${safeName}.xlsx`)
  }, [projectName, projectSummary])

  const exportSummary = useCallback(() => {
    if (!result) return
    const rows: Array<{ label: string; value: string; unit?: string }> = [
      { label: 'Net Area', value: result.netArea.toFixed(2), unit: 'm²' },
      { label: 'Paint Required', value: result.paintRequired.toFixed(2), unit: 'L' },
      { label: 'Coats', value: String(result.coats), unit: '' },
    ]
    if (result.primerRequired > 0) rows.push({ label: 'Primer Required', value: result.primerRequired.toFixed(2), unit: 'L' })
    if (result.puttyRequired > 0) rows.push({ label: 'Putty Required', value: result.puttyRequired.toFixed(1), unit: 'kg' })
    if (result.totalCost > 0) rows.push({ label: 'Total Cost', value: result.totalCost.toFixed(2), unit: '' })
    exportEstimateText('Paint Estimate', rows)
    exportEstimatePdf('Paint Estimate', rows)
    exportEstimateXlsx('Paint Estimate', rows)
  }, [result])

  const resetForm = () => {
    setFormData({ ...DEFAULT_FORM, unit: globalUnit })
    setResult(null)
    setErrors({})
    setShowSteps(false)
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
              <PaintBucket className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-heading dark:text-heading-dark">Paint Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Paint, primer & putty quantities with openings deduction and cost estimate.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-8 pt-8">
          {/* Area/Length toggle */}
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => handleInputChange('useArea', !formData.useArea)}
              className={`flex items-center gap-2 rounded-xl px-6 py-2 font-medium shadow-soft transition-all ${
                formData.useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'
              }`}
            >
              <Info className="h-4 w-4" />
              {formData.useArea ? 'Use Length & Height' : 'Use Area'}
            </button>
          </div>

          {/* Paint type selector */}
          <div className="mb-6">
            <label className="mb-2 block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
              Paint Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {PAINT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handlePaintTypeChange(type.value)}
                  className={`p-2 sm:p-3 rounded-lg font-medium transition-colors text-xs sm:text-sm text-center ${
                    formData.paintType === type.value
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          className="px-4 sm:px-6 md:px-8 pb-8"
          onSubmit={(e) => {
            e.preventDefault()
            calculatePaint()
          }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {!formData.useArea && (
              <>
                <Field label={`Length (${formData.unit})`} value={formData.length} onChange={(v) => handleInputChange('length', v)} error={errors.length} />
                <Field label={`Height (${formData.unit})`} value={formData.height} onChange={(v) => handleInputChange('height', v)} error={errors.height} />

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
                  {formData.openings.map((opening) => (
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
              </>
            )}

            {formData.useArea && (
              <Field label={`Area (${formData.unit === 'm' ? 'm²' : 'ft²'})`} value={formData.area} onChange={(v) => handleInputChange('area', v)} error={errors.area} />
            )}

            <Field label="Coats" value={formData.coats} onChange={(v) => handleInputChange('coats', v)} step="1" error={errors.coats} />
            <Field label="Coverage (m²/L per coat)" value={formData.coverage} onChange={(v) => handleInputChange('coverage', v)} error={errors.coverage} />

            <div>
              <label className="mb-2 block font-medium text-heading dark:text-heading-dark">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value as 'm' | 'ft')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="m">Metric (m)</option>
                <option value="ft">Imperial (ft)</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block font-medium text-heading dark:text-heading-dark">Wastage Factor (%)</label>
              <input
                type="number"
                value={formData.wastageFactor}
                onChange={(e) => handleInputChange('wastageFactor', e.target.value)}
                min="0"
                max="30"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${
                  errors.wastageFactor ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                }`}
              />
              {errors.wastageFactor && <p className="text-red-600 text-xs mt-1">{errors.wastageFactor}</p>}
            </div>
          </div>

          {/* Primer / Putty — collapsible */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleInputChange('showAdvanced', !formData.showAdvanced)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-heading transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-heading-dark dark:hover:bg-slate-800"
            >
              <span>Primer & Putty — Optional</span>
              {formData.showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {formData.showAdvanced && (
              <div className="mt-4 space-y-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-600">
                  <label className="flex items-center gap-2 text-sm font-medium text-heading dark:text-heading-dark">
                    <input type="checkbox" checked={formData.includePrimer} onChange={(e) => handleInputChange('includePrimer', e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                    Include Primer
                  </label>
                  {formData.includePrimer && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Primer Coats" value={formData.primerCoats} onChange={(v) => handleInputChange('primerCoats', v)} step="1" error={errors.primerCoats} />
                      <Field label="Primer Coverage (m²/L)" value={formData.primerCoverage} onChange={(v) => handleInputChange('primerCoverage', v)} error={errors.primerCoverage} />
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-600">
                  <label className="flex items-center gap-2 text-sm font-medium text-heading dark:text-heading-dark">
                    <input type="checkbox" checked={formData.includePutty} onChange={(e) => handleInputChange('includePutty', e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                    Include Wall Putty
                  </label>
                  {formData.includePutty && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Putty Coats" value={formData.puttyCoats} onChange={(v) => handleInputChange('puttyCoats', v)} step="1" error={errors.puttyCoats} />
                      <Field label="Putty Coverage (kg/m² per coat)" value={formData.puttyCoverageKgPerM2} onChange={(v) => handleInputChange('puttyCoverageKgPerM2', v)} error={errors.puttyCoverageKgPerM2} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cost rates — collapsible */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => handleInputChange('showCostInputs', !formData.showCostInputs)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-heading transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-heading-dark dark:hover:bg-slate-800"
            >
              <span>Cost Rates — Optional</span>
              {formData.showCostInputs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {formData.showCostInputs && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <Field label="Paint Rate (per litre)" value={formData.paintRatePerLiter} onChange={(v) => handleInputChange('paintRatePerLiter', v)} />
                <Field label="Primer Rate (per litre)" value={formData.primerRatePerLiter} onChange={(v) => handleInputChange('primerRatePerLiter', v)} />
                <Field label="Putty Rate (per kg)" value={formData.puttyRatePerKg} onChange={(v) => handleInputChange('puttyRatePerKg', v)} />
                <Field label="Labor Rate (per m²)" value={formData.laborRatePerM2} onChange={(v) => handleInputChange('laborRatePerM2', v)} />
              </div>
            )}
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
                <h2 className="text-xl font-semibold text-heading dark:text-heading-dark">Calculation Results</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Area</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Gross Area</span>
                      <span className="font-mono font-semibold">{result.grossArea.toFixed(2)} m²</span>
                    </div>
                    {result.openingArea > 0 && (
                      <div className="flex justify-between">
                        <span className="text-body/70 dark:text-body-dark/70">Openings Deducted</span>
                        <span className="font-mono font-semibold">{result.openingArea.toFixed(2)} m²</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Net Paintable Area</span>
                      <span className="font-mono font-semibold">{result.netArea.toFixed(2)} m²</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Paint / Primer / Putty</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Paint ({result.coats} coats)</span>
                      <span className="font-mono font-semibold">{result.paintRequired.toFixed(2)} L</span>
                    </div>
                    {result.primerRequired > 0 && (
                      <div className="flex justify-between">
                        <span className="text-body/70 dark:text-body-dark/70">Primer ({result.primerCoats} coats)</span>
                        <span className="font-mono font-semibold">{result.primerRequired.toFixed(2)} L</span>
                      </div>
                    )}
                    {result.puttyRequired > 0 && (
                      <div className="flex justify-between">
                        <span className="text-body/70 dark:text-body-dark/70">Putty ({result.puttyCoats} coats)</span>
                        <span className="font-mono font-semibold">{result.puttyRequired.toFixed(1)} kg</span>
                      </div>
                    )}
                  </div>
                </div>

                {result.totalCost > 0 && (
                  <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                    <h3 className="mb-4 font-semibold text-heading dark:text-heading-dark">Estimated Cost</h3>
                    <div className="space-y-3">
                      {result.paintCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Paint</span>
                          <span className="font-mono font-semibold">{result.paintCost.toFixed(2)}</span>
                        </div>
                      )}
                      {result.primerCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Primer</span>
                          <span className="font-mono font-semibold">{result.primerCost.toFixed(2)}</span>
                        </div>
                      )}
                      {result.puttyCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Putty</span>
                          <span className="font-mono font-semibold">{result.puttyCost.toFixed(2)}</span>
                        </div>
                      )}
                      {result.laborCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body/70 dark:text-body-dark/70">Labor</span>
                          <span className="font-mono font-semibold">{result.laborCost.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-slate-200/40 pt-2 dark:border-slate-700/40">
                        <span className="font-semibold text-heading dark:text-heading-dark">Total</span>
                        <span className="font-mono font-bold text-primary">{result.totalCost.toFixed(2)}</span>
                      </div>
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
                title="Paint Estimate Summary"
                description="Watch the ad to unlock step-by-step calculation breakdown, project estimate, and export options."
              >
                {showSteps && result && (
                  <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                    <h3 className="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                      How this was calculated
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                      {result.assumptions.map((a, i) => (
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

                {projectSummary && (
                  <div className="mt-6 border-t border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold text-heading dark:text-heading-dark">Painting Estimate Summary</h2>
                        <p className="mt-1 text-sm text-body/70 dark:text-body-dark/70">
                          {projectItems.length} room/component(s) saved locally.
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

                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                        <p className="text-sm text-body/70 dark:text-body-dark/70">Total Area</p>
                        <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalNetArea.toFixed(2)} m²</p>
                      </div>
                      <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                        <p className="text-sm text-body/70 dark:text-body-dark/70">Total Paint</p>
                        <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalPaintRequired.toFixed(2)} L</p>
                      </div>
                      <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                        <p className="text-sm text-body/70 dark:text-body-dark/70">Total Putty</p>
                        <p className="mt-1 font-mono text-lg font-semibold">{projectSummary.totalPuttyRequired.toFixed(1)} kg</p>
                      </div>
                      <div className="rounded-xl border border-slate-200/20 bg-slate-50 p-4 dark:border-slate-700/30 dark:bg-slate-800/50">
                        <p className="text-sm text-body/70 dark:text-body-dark/70">Grand Total</p>
                        <p className="mt-1 font-mono text-lg font-semibold text-primary">{projectSummary.totalCost.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
                      <h3 className="font-semibold text-heading dark:text-heading-dark mb-3">Component Breakdown</h3>
                      <div className="space-y-3">
                        {projectSummary.items.map((item) => (
                          <div key={item.id} className="rounded-lg border border-slate-200/20 bg-slate-50 p-3 dark:border-slate-700/30 dark:bg-slate-800/40">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <p className="font-medium text-heading dark:text-heading-dark">{item.name}</p>
                                <p className="text-sm text-body/70 dark:text-body-dark/70">
                                  {item.netArea.toFixed(2)} m² • {item.paintRequired.toFixed(2)} L paint
                                  {item.primerRequired > 0 && ` • ${item.primerRequired.toFixed(2)} L primer`}
                                  {item.puttyRequired > 0 && ` • ${item.puttyRequired.toFixed(1)} kg putty`}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-sm font-semibold">{item.totalCost.toFixed(2)}</span>
                                <button type="button" onClick={() => removeProjectItem(item.id)} className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400">
                                  Remove
                                </button>
                              </div>
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
      <PAINT_INFO_SECTION />
    </div>
  )
}