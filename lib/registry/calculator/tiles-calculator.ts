// Logic module for tiles calculator
import { BaseCalculationInput, BaseCalculationResult } from './base'
import { CalculationUtils } from '../utils'

export interface TilesInput extends BaseCalculationInput {
  length?: number
  width?: number
  area?: number
  tileLengthCm: number
  tileWidthCm: number
  wastagePercent: number
  unit: 'm' | 'ft'
  useArea: boolean
}

export interface TilesResult extends BaseCalculationResult {
  tilesNeeded: number
  area: number // m2
}

export class TilesCalculatorLib {
  static calculate(input: TilesInput): TilesResult {
    const { length, width, area, tileLengthCm, tileWidthCm, wastagePercent, unit, useArea } = input

    CalculationUtils.validatePositive(tileLengthCm, 'Tile length (cm)')
    CalculationUtils.validatePositive(tileWidthCm, 'Tile width (cm)')
    if (wastagePercent < 0 || wastagePercent > 30) throw new Error('Wastage must be 0–30%')

    let dims = CalculationUtils.normalizeDimensions({ length, width, area }, unit === 'm' ? 'metric' : 'imperial')
    const areaM2 = useArea && dims.area !== undefined
      ? dims.area!
      : CalculationUtils.calculateRectangularArea(dims.length!, dims.width!)

    const tileAreaM2 = (tileLengthCm * tileWidthCm) / 10000
    let tilesNeeded = areaM2 / tileAreaM2
    tilesNeeded *= 1 + wastagePercent / 100

    const tilesRounded = Math.ceil(tilesNeeded)
    const area_r = CalculationUtils.roundTo(areaM2, 2)

    return {
      tilesNeeded: tilesRounded,
      area: area_r,
      human_summary: `Tiles: area ≈ ${area_r} m²; tile ${tileLengthCm}×${tileWidthCm} cm; qty ≈ ${tilesRounded} (incl. ${wastagePercent}% wastage)`,
      assumptions: [unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is'],
    }
  }
}
