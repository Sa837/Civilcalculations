// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\calculator\retaining-wall-calculator.ts
// Quantity-focused calculator for retaining walls (UI unchanged), with optional structural attachment.

import { CalculationUtils } from '../utils'
import { calcRetainingWallCantilever } from '@/lib/registry/structural/calc/wall'

export interface RWFormInput {
  length?: number
  width?: number
  height: number
  area?: number
  mixType: string // 'M5', 'M7.5', ... 'M35'
  wastagePercent: number
  unitSystem: 'metric' | 'imperial'
  useArea: boolean
}

export interface RWQuantityResult {
  wetVolume: number
  dryVolume: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  aggregateWeight: number
  mixRatio: string
  area?: number
  // Non-breaking advanced fields
  structural?: any
  human_summary?: string
}

const MIX_MAP: Record<string, { cement: number; sand: number; aggregate: number; label: string }> = {
  'M5':   { cement: 1, sand: 5, aggregate: 10, label: 'M5 (1:5:10)' },
  'M7.5': { cement: 1, sand: 4, aggregate: 8,  label: 'M7.5 (1:4:8)' },
  'M10':  { cement: 1, sand: 3, aggregate: 6,  label: 'M10 (1:3:6)' },
  'M15':  { cement: 1, sand: 2, aggregate: 4,  label: 'M15 (1:2:4)' },
  'M20':  { cement: 1, sand: 1.5, aggregate: 3, label: 'M20 (1:1.5:3)' },
  'M25':  { cement: 1, sand: 1, aggregate: 2,  label: 'M25 (1:1:2)' },
  'M30':  { cement: 1, sand: 0.75, aggregate: 1.5, label: 'M30 (1:0.75:1.5)' },
  'M35':  { cement: 1, sand: 0.5, aggregate: 1, label: 'M35 (1:0.5:1)' },
}

export class RetainingWallQuantityCalculator {
  static calculate(input: RWFormInput): RWQuantityResult {
    const { length, width, height, area, mixType, wastagePercent, unitSystem, useArea } = input

    CalculationUtils.validatePositive(height, 'Height')
    if (useArea) {
      CalculationUtils.validatePositive(area ?? 0, 'Area')
    } else {
      CalculationUtils.validatePositive(length ?? 0, 'Length')
      CalculationUtils.validatePositive(width ?? 0, 'Width')
    }

    const dims = CalculationUtils.normalizeDimensions({ length, width, height, area }, unitSystem)

    const areaM2 = useArea && dims.area !== undefined
      ? dims.area!
      : CalculationUtils.calculateRectangularArea(dims.length!, dims.width!)

    const wetVolumeM3 = CalculationUtils.calculateVolumeFromArea(areaM2, dims.height!)

    // Use standard dry factor (1.54) and wastage
    const dryVolumeM3 = wetVolumeM3 * 1.54 * (1 + (wastagePercent / 100))

    const mix = MIX_MAP[mixType] ?? MIX_MAP['M15']
    const totalParts = mix.cement + mix.sand + mix.aggregate

    const cementVolume = (mix.cement / totalParts) * dryVolumeM3
    const sandVolume = (mix.sand / totalParts) * dryVolumeM3
    const aggregateVolume = (mix.aggregate / totalParts) * dryVolumeM3

    // Convert to weights (kg/m3): cement 1440, sand 1450, aggregate 1500
    const cementWeightKg = cementVolume * 1440
    const sandWeightKg = sandVolume * 1450
    const aggregateWeightKg = aggregateVolume * 1500
    const cementBags = cementWeightKg / 50

    // Optional structural attachment (safe try, non-breaking)
    let structural: any | undefined
    let human_summary: string | undefined
    try {
      structural = calcRetainingWallCantilever({
        wall_type: 'retaining_cantilever',
        wall_height_m: dims.height!,
        wall_thickness_m: dims.width ?? 0.2,
        wall_length_m: 1.0,
        Ka: 0.33,
        surcharge_kN_m2: 10,
      })
      human_summary = structural?.human_summary
    } catch (e) {
      structural = { error: (e as Error).message }
    }

    return {
      wetVolume: CalculationUtils.roundTo(wetVolumeM3, 3),
      dryVolume: CalculationUtils.roundTo(dryVolumeM3, 3),
      cementWeight: CalculationUtils.roundTo(cementWeightKg, 1),
      cementBags: CalculationUtils.roundTo(cementBags, 1),
      sandWeight: CalculationUtils.roundTo(sandWeightKg, 1),
      aggregateWeight: CalculationUtils.roundTo(aggregateWeightKg, 1),
      mixRatio: mix.label,
      area: CalculationUtils.roundTo(areaM2, 3),
      structural,
      human_summary
    }
  }
}
