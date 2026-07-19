import { UnitConverter } from '../globalunits'
import { CalculationUtils } from '../utils'
import { MORTAR_MIX_TYPES } from './brickwork-calculator'

const DENSITIES = { cement: 1440, sand: 1450, cementBag: 50 }

export interface PlasterOpeningInput {
  width: number
  height: number
  unitSystem: 'metric' | 'imperial'
}

export interface PlasterTypeOption {
  value: string
  label: string
  defaultThicknessMm: number
}

export const PLASTER_TYPES: PlasterTypeOption[] = [
  { value: 'internal_wall', label: 'Internal Wall Plaster', defaultThicknessMm: 12 },
  { value: 'external_wall', label: 'External Wall Plaster', defaultThicknessMm: 20 },
  { value: 'ceiling', label: 'Ceiling Plaster', defaultThicknessMm: 6 },
  { value: 'rough_coat', label: 'Rough / Base Coat', defaultThicknessMm: 15 },
  { value: 'finishing_coat', label: 'Finishing / Punning Coat', defaultThicknessMm: 3 },
  { value: 'custom', label: 'Custom (enter thickness manually)', defaultThicknessMm: 12 },
]

export interface PlasterCalculationInput {
  plasterType?: string // value from PLASTER_TYPES
  length?: number
  height?: number
  area?: number
  thickness: number // mm (metric) or inches (imperial)
  unitSystem: 'metric' | 'imperial'
  useArea: boolean

  // Openings — only deducted in length/height mode
  openings?: PlasterOpeningInput[]

  mortarMixType?: string // e.g. '1:4', '1:6' from MORTAR_MIX_TYPES
  numberOfCoats?: number // default 1
  wastageFactor?: number // percent, 0-30

  // Cost rates (optional)
  cementRatePerBag?: number
  sandRatePerKg?: number
  laborRatePerM2?: number
}

export interface PlasterCalculationResult {
  grossArea: number
  openingArea: number
  netArea: number

  thicknessM: number
  numberOfCoats: number

  wetVolume: number
  plasterVolume: number // dry volume (m3)
  mortarMixRatio: string

  cementBags: number
  sandWeight: number // kg

  cementCost: number
  sandCost: number
  laborCost: number
  totalCost: number

  human_summary: string
  assumptions: string[]
}

export interface PlasterProjectItem {
  id: string
  name: string
  input: PlasterCalculationInput
  result: PlasterCalculationResult
}

export interface PlasterProjectSummary {
  items: Array<{
    id: string
    name: string
    netArea: number
    plasterVolume: number
    cementBags: number
    sandWeight: number
    cementCost: number
    sandCost: number
    laborCost: number
    totalCost: number
  }>
  totalNetArea: number
  totalPlasterVolume: number
  totalCementBags: number
  totalSandWeight: number
  totalCementCost: number
  totalSandCost: number
  totalLaborCost: number
  totalCost: number
  reportText: string
}

export class PlasterCalculator {
  static calculate(input: PlasterCalculationInput): PlasterCalculationResult {
    const {
      length,
      height,
      area,
      thickness,
      unitSystem,
      useArea,
      openings = [],
      mortarMixType = '1:4',
      numberOfCoats = 1,
      wastageFactor = 0,
      cementRatePerBag = 0,
      sandRatePerKg = 0,
      laborRatePerM2 = 0,
    } = input

    CalculationUtils.validatePositive(thickness, 'Thickness')
    CalculationUtils.validatePositive(numberOfCoats, 'Number of coats')

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
          throw new Error('Opening area exceeds the gross wall/ceiling area. Check dimensions.')
        }
      }
    }

    const netArea = Math.max(0, grossArea - openingArea)

    const thicknessM =
      unitSystem === 'metric'
        ? CalculationUtils.roundTo(thickness / 1000, 6)
        : UnitConverter.convertBrickDimension(thickness, 'in', 'mm') / 1000

    const wastageMultiplier = 1 + (wastageFactor || 0) / 100

    const wetVolume = netArea * thicknessM * numberOfCoats
    const dryVolume = wetVolume * 1.27 * wastageMultiplier

    const mix = MORTAR_MIX_TYPES.find((m) => m.value === mortarMixType) || MORTAR_MIX_TYPES[1]
    const totalParts = mix.cement + mix.sand

    const cementWeight = ((dryVolume * mix.cement) / totalParts) * DENSITIES.cement
    const sandWeight = ((dryVolume * mix.sand) / totalParts) * DENSITIES.sand
    const cementBags = cementWeight / DENSITIES.cementBag

    const cementCost = cementBags * cementRatePerBag
    const sandCost = sandWeight * sandRatePerKg
    const laborCost = netArea * laborRatePerM2
    const totalCost = cementCost + sandCost + laborCost

    const plasterLabel = PLASTER_TYPES.find((p) => p.value === input.plasterType)?.label ?? 'Plaster'

    const summaryParts = [
      `${plasterLabel}: ${CalculationUtils.roundTo(dryVolume, 3)} m³ over ${CalculationUtils.roundTo(netArea, 2)} m² (${numberOfCoats} coat${numberOfCoats > 1 ? 's' : ''})`,
      `${CalculationUtils.roundTo(cementBags, 2)} cement bags`,
      `${CalculationUtils.roundTo(sandWeight, 1)} kg sand`,
    ]
    if (totalCost > 0) summaryParts.push(`estimated cost ${CalculationUtils.roundTo(totalCost, 2)}`)

    const assumptions = [
      unitSystem === 'imperial' ? 'Converted inches to mm/m for thickness' : 'Metric input used as-is',
      `Mortar mix ${mix.value} (cement:sand), 27% dry-volume bulking factor applied`,
      openingArea > 0
        ? `${CalculationUtils.roundTo(openingArea, 2)} m² deducted for door/window openings`
        : 'No openings deducted',
      `Thickness ${thickness} ${unitSystem === 'metric' ? 'mm' : 'in'} × ${numberOfCoats} coat(s)`,
    ]
    if (wastageFactor) assumptions.push(`${wastageFactor}% wastage factor applied`)

    return {
      grossArea: CalculationUtils.roundTo(grossArea, 3),
      openingArea: CalculationUtils.roundTo(openingArea, 3),
      netArea: CalculationUtils.roundTo(netArea, 3),
      thicknessM: CalculationUtils.roundTo(thicknessM, 4),
      numberOfCoats,
      wetVolume: CalculationUtils.roundTo(wetVolume, 3),
      plasterVolume: CalculationUtils.roundTo(dryVolume, 3),
      mortarMixRatio: mix.value,
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
      cementCost: CalculationUtils.roundTo(cementCost, 2),
      sandCost: CalculationUtils.roundTo(sandCost, 2),
      laborCost: CalculationUtils.roundTo(laborCost, 2),
      totalCost: CalculationUtils.roundTo(totalCost, 2),
      human_summary: summaryParts.join('; ') + '.',
      assumptions,
    }
  }

  static summarizeProject(items: PlasterProjectItem[]): PlasterProjectSummary {
    const summaryItems = items.map((item) => ({
      id: item.id,
      name: item.name,
      netArea: item.result.netArea,
      plasterVolume: item.result.plasterVolume,
      cementBags: item.result.cementBags,
      sandWeight: item.result.sandWeight,
      cementCost: item.result.cementCost,
      sandCost: item.result.sandCost,
      laborCost: item.result.laborCost,
      totalCost: item.result.totalCost,
    }))

    const sum = (key: keyof (typeof summaryItems)[number]) =>
      summaryItems.reduce((total, item) => total + (item[key] as number), 0)

    const totalNetArea = sum('netArea')
    const totalPlasterVolume = sum('plasterVolume')
    const totalCementBags = sum('cementBags')
    const totalSandWeight = sum('sandWeight')
    const totalCementCost = sum('cementCost')
    const totalSandCost = sum('sandCost')
    const totalLaborCost = sum('laborCost')
    const totalCost = sum('totalCost')

    const reportText = [
      'Plaster Work Estimate Report',
      '==============================',
      `Total area: ${totalNetArea.toFixed(2)} m²`,
      `Total plaster volume: ${totalPlasterVolume.toFixed(3)} m³`,
      `Total cement: ${totalCementBags.toFixed(2)} bags`,
      `Total sand: ${totalSandWeight.toFixed(1)} kg`,
      `Total cement cost: ${totalCementCost.toFixed(2)}`,
      `Total sand cost: ${totalSandCost.toFixed(2)}`,
      `Total labor cost: ${totalLaborCost.toFixed(2)}`,
      `Grand total: ${totalCost.toFixed(2)}`,
      '',
      'Component breakdown:',
      ...summaryItems.map(
        (item) =>
          `- ${item.name}: ${item.netArea.toFixed(2)} m² | ${item.cementBags.toFixed(1)} cement bags | ${item.totalCost?.toFixed?.(2) ?? item.totalCost.toFixed(2)}`,
      ),
    ].join('\n')

    return {
      items: summaryItems,
      totalNetArea,
      totalPlasterVolume,
      totalCementBags,
      totalSandWeight,
      totalCementCost,
      totalSandCost,
      totalLaborCost,
      totalCost,
      reportText,
    }
  }
}