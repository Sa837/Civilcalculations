import { CalculationUtils } from '../utils'

export interface PaintOpeningInput {
  width: number
  height: number
  unitSystem: 'metric' | 'imperial'
}

export interface PaintTypeOption {
  value: string
  label: string
  coveragePerLiter: number // m² per litre, per coat (reference/default)
}

export const PAINT_TYPES: PaintTypeOption[] = [
  { value: 'emulsion_interior', label: 'Interior Emulsion (Plastic Paint)', coveragePerLiter: 10 },
  { value: 'emulsion_exterior', label: 'Exterior Emulsion (Weatherproof)', coveragePerLiter: 8 },
  { value: 'enamel', label: 'Enamel (Doors, Windows, Metal)', coveragePerLiter: 12 },
  { value: 'distemper', label: 'Distemper', coveragePerLiter: 11 },
  { value: 'texture', label: 'Texture / Textured Finish', coveragePerLiter: 5 },
  { value: 'custom', label: 'Custom (enter coverage manually)', coveragePerLiter: 10 },
]

const DEFAULT_PRIMER_COVERAGE_M2_PER_L = 10
const DEFAULT_PUTTY_COVERAGE_KG_PER_M2_PER_COAT = 0.75
const DEFAULT_PRIMER_COATS = 1
const DEFAULT_PUTTY_COATS = 2

export interface PaintCalculationInput {
  // Area source
  useArea: boolean
  length?: number
  height?: number
  area?: number
  unit: 'm' | 'ft'

  // Openings — only deducted in length/height mode
  openings?: PaintOpeningInput[]

  // Paint
  paintType?: string // value from PAINT_TYPES
  coats: number
  coverage: number // m² per litre, per coat

  // Wastage
  wastageFactor?: number // percent, 0-30

  // Advanced: primer
  includePrimer?: boolean
  primerCoats?: number
  primerCoverage?: number // m² per litre, per coat

  // Advanced: putty
  includePutty?: boolean
  puttyCoats?: number
  puttyCoverageKgPerM2?: number // kg per m², per coat

  // Cost rates (optional — if omitted, cost fields come back as 0)
  paintRatePerLiter?: number
  primerRatePerLiter?: number
  puttyRatePerKg?: number
  laborRatePerM2?: number
}

export interface PaintCalculationResult {
  grossArea: number
  openingArea: number
  netArea: number

  coats: number
  coverage: number
  paintRequired: number // litres

  primerCoats: number
  primerRequired: number // litres

  puttyCoats: number
  puttyRequired: number // kg

  paintCost: number
  primerCost: number
  puttyCost: number
  laborCost: number
  totalCost: number

  human_summary: string
  assumptions: string[]
}

export interface PaintProjectItem {
  id: string
  name: string
  input: PaintCalculationInput
  result: PaintCalculationResult
}

export interface PaintProjectSummary {
  items: Array<{
    id: string
    name: string
    netArea: number
    paintRequired: number
    primerRequired: number
    puttyRequired: number
    paintCost: number
    primerCost: number
    puttyCost: number
    laborCost: number
    totalCost: number
  }>
  totalNetArea: number
  totalPaintRequired: number
  totalPrimerRequired: number
  totalPuttyRequired: number
  totalPaintCost: number
  totalPrimerCost: number
  totalPuttyCost: number
  totalLaborCost: number
  totalCost: number
  reportText: string
}

export class PaintCalculator {
  static calculate(input: PaintCalculationInput): PaintCalculationResult {
    const {
      useArea,
      length,
      height,
      area,
      unit,
      openings = [],
      paintType = 'emulsion_interior',
      coats,
      coverage,
      wastageFactor = 0,
      includePrimer = false,
      primerCoats = DEFAULT_PRIMER_COATS,
      primerCoverage = DEFAULT_PRIMER_COVERAGE_M2_PER_L,
      includePutty = false,
      puttyCoats = DEFAULT_PUTTY_COATS,
      puttyCoverageKgPerM2 = DEFAULT_PUTTY_COVERAGE_KG_PER_M2_PER_COAT,
      paintRatePerLiter = 0,
      primerRatePerLiter = 0,
      puttyRatePerKg = 0,
      laborRatePerM2 = 0,
    } = input

    CalculationUtils.validatePositive(coats, 'Coats')
    CalculationUtils.validatePositive(coverage, 'Coverage')

    const unitSystem: 'metric' | 'imperial' = unit === 'm' ? 'metric' : 'imperial'

    let grossArea = 0
    let openingArea = 0

    if (useArea) {
      if (area === undefined) throw new Error('Area is required in area mode')
      CalculationUtils.validatePositive(area, 'Area')
      const dims = CalculationUtils.normalizeDimensions({ area }, unitSystem)
      grossArea = dims.area !== undefined ? dims.area : area
    } else {
      if (length === undefined || height === undefined) throw new Error('Length and height are required')
      CalculationUtils.validatePositive(length, 'Length')
      CalculationUtils.validatePositive(height, 'Height')
      const dims = CalculationUtils.normalizeDimensions({ length, width: height }, unitSystem)
      grossArea = CalculationUtils.calculateRectangularArea(dims.length!, dims.width!)

      if (openings.length > 0) {
        const normalizedOpenings = CalculationUtils.normalizeOpenings(openings, unitSystem)
        openingArea = normalizedOpenings.reduce((sum, op) => sum + op.width * op.height, 0)
        if (openingArea > grossArea) {
          throw new Error('Opening area exceeds the gross wall area. Check dimensions.')
        }
      }
    }

    const netArea = Math.max(0, grossArea - openingArea)
    const wastageMultiplier = 1 + (wastageFactor || 0) / 100

    const paintRequired = (netArea * coats * wastageMultiplier) / coverage

    const effectivePrimerCoverage = primerCoverage > 0 ? primerCoverage : DEFAULT_PRIMER_COVERAGE_M2_PER_L
    const primerRequired = includePrimer
      ? (netArea * primerCoats * wastageMultiplier) / effectivePrimerCoverage
      : 0

    const puttyRequired = includePutty ? netArea * puttyCoats * puttyCoverageKgPerM2 * wastageMultiplier : 0

    const paintCost = paintRequired * paintRatePerLiter
    const primerCost = primerRequired * primerRatePerLiter
    const puttyCost = puttyRequired * puttyRatePerKg
    const laborCost = netArea * laborRatePerM2
    const totalCost = paintCost + primerCost + puttyCost + laborCost

    const paintLabel = PAINT_TYPES.find((p) => p.value === paintType)?.label ?? 'Paint'

    const summaryParts = [
      `${paintLabel}: ${CalculationUtils.roundTo(paintRequired, 2)} L for ${CalculationUtils.roundTo(netArea, 2)} m² (${coats} coat${coats > 1 ? 's' : ''})`,
    ]
    if (includePrimer) summaryParts.push(`${CalculationUtils.roundTo(primerRequired, 2)} L primer`)
    if (includePutty) summaryParts.push(`${CalculationUtils.roundTo(puttyRequired, 1)} kg putty`)
    if (totalCost > 0) summaryParts.push(`estimated cost ${CalculationUtils.roundTo(totalCost, 2)}`)

    const assumptions = [
      unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
      `Coverage: ${coverage} m² per litre, per coat`,
      openingArea > 0
        ? `${CalculationUtils.roundTo(openingArea, 2)} m² deducted for door/window openings`
        : 'No openings deducted',
    ]
    if (includePrimer) assumptions.push(`Primer: ${primerCoats} coat(s) at ${effectivePrimerCoverage} m²/L`)
    if (includePutty) assumptions.push(`Putty: ${puttyCoats} coat(s) at ${puttyCoverageKgPerM2} kg/m² per coat`)
    if (wastageFactor) assumptions.push(`${wastageFactor}% wastage factor applied to paint, primer & putty`)

    return {
      grossArea: CalculationUtils.roundTo(grossArea, 3),
      openingArea: CalculationUtils.roundTo(openingArea, 3),
      netArea: CalculationUtils.roundTo(netArea, 3),
      coats,
      coverage,
      paintRequired: CalculationUtils.roundTo(paintRequired, 3),
      primerCoats: includePrimer ? primerCoats : 0,
      primerRequired: CalculationUtils.roundTo(primerRequired, 3),
      puttyCoats: includePutty ? puttyCoats : 0,
      puttyRequired: CalculationUtils.roundTo(puttyRequired, 2),
      paintCost: CalculationUtils.roundTo(paintCost, 2),
      primerCost: CalculationUtils.roundTo(primerCost, 2),
      puttyCost: CalculationUtils.roundTo(puttyCost, 2),
      laborCost: CalculationUtils.roundTo(laborCost, 2),
      totalCost: CalculationUtils.roundTo(totalCost, 2),
      human_summary: summaryParts.join('; ') + '.',
      assumptions,
    }
  }

  static summarizeProject(items: PaintProjectItem[]): PaintProjectSummary {
    const summaryItems = items.map((item) => ({
      id: item.id,
      name: item.name,
      netArea: item.result.netArea,
      paintRequired: item.result.paintRequired,
      primerRequired: item.result.primerRequired,
      puttyRequired: item.result.puttyRequired,
      paintCost: item.result.paintCost,
      primerCost: item.result.primerCost,
      puttyCost: item.result.puttyCost,
      laborCost: item.result.laborCost,
      totalCost: item.result.totalCost,
    }))

    const sum = (key: keyof (typeof summaryItems)[number]) =>
      summaryItems.reduce((total, item) => total + (item[key] as number), 0)

    const totalNetArea = sum('netArea')
    const totalPaintRequired = sum('paintRequired')
    const totalPrimerRequired = sum('primerRequired')
    const totalPuttyRequired = sum('puttyRequired')
    const totalPaintCost = sum('paintCost')
    const totalPrimerCost = sum('primerCost')
    const totalPuttyCost = sum('puttyCost')
    const totalLaborCost = sum('laborCost')
    const totalCost = sum('totalCost')

    const reportText = [
      'Paint Work Estimate Report',
      '==============================',
      `Total area painted: ${totalNetArea.toFixed(2)} m²`,
      `Total paint: ${totalPaintRequired.toFixed(2)} L`,
      `Total primer: ${totalPrimerRequired.toFixed(2)} L`,
      `Total putty: ${totalPuttyRequired.toFixed(1)} kg`,
      `Total paint cost: ${totalPaintCost.toFixed(2)}`,
      `Total primer cost: ${totalPrimerCost.toFixed(2)}`,
      `Total putty cost: ${totalPuttyCost.toFixed(2)}`,
      `Total labor cost: ${totalLaborCost.toFixed(2)}`,
      `Grand total: ${totalCost.toFixed(2)}`,
      '',
      'Component breakdown:',
      ...summaryItems.map(
        (item) =>
          `- ${item.name}: ${item.netArea.toFixed(2)} m² | ${item.paintRequired.toFixed(2)} L paint | ${item.totalCost.toFixed(2)}`,
      ),
    ].join('\n')

    return {
      items: summaryItems,
      totalNetArea,
      totalPaintRequired,
      totalPrimerRequired,
      totalPuttyRequired,
      totalPaintCost,
      totalPrimerCost,
      totalPuttyCost,
      totalLaborCost,
      totalCost,
      reportText,
    }
  }
}