// Logic module for stone masonry calculator
import { BaseCalculationInput, BaseCalculationResult } from './base'
import { CalculationUtils } from '../utils'

export interface StoneMasonryInput extends BaseCalculationInput {
  length: number
  height: number
  thickness: number
  unit: 'm' | 'ft'
}

export interface StoneMasonryResult extends BaseCalculationResult {
  volume: number // dry volume (m3)
  cementBags: number
  sandWeight: number // kg
}

const DENSITIES = { cement: 1440, sand: 1450, cementBag: 50 }

export class StoneMasonryCalculatorLib {
  static calculate(input: StoneMasonryInput): StoneMasonryResult {
    const { length, height, thickness, unit } = input
    CalculationUtils.validatePositive(length, 'Length')
    CalculationUtils.validatePositive(height, 'Height')
    CalculationUtils.validatePositive(thickness, 'Thickness')

    const dims = CalculationUtils.normalizeDimensions({ length, width: height }, unit === 'm' ? 'metric' : 'imperial')
    const L = dims.length!
    const H = dims.width!
    const T = unit === 'm' ? thickness : thickness * 0.3048

    const wetVolume = L * H * T
    const dryVolume = wetVolume * 1.27

    const cement = (dryVolume / 7) * 1.5 * DENSITIES.cement
    const sand = (dryVolume / 7) * 5.5 * DENSITIES.sand

    const result = {
      volume: CalculationUtils.roundTo(dryVolume, 3),
      cementBags: CalculationUtils.roundTo(cement / DENSITIES.cementBag, 2),
      sandWeight: CalculationUtils.roundTo(sand, 1),
      human_summary: `Stone masonry dry volume ≈ ${CalculationUtils.roundTo(dryVolume, 3)} m³; cement ≈ ${CalculationUtils.roundTo(cement / DENSITIES.cementBag, 2)} bags; sand ≈ ${CalculationUtils.roundTo(sand, 1)} kg`,
      assumptions: [unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is'],
    }

    return result
  }
}
