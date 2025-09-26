// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\calculator\earthwork-calculator.ts
// Logic module for earthwork calculator (UI unchanged)

import { CalculationUtils } from '../utils'
import { BaseCalculationInput, BaseCalculationResult } from './base'

export interface EarthworkInput extends BaseCalculationInput {
  length: number
  width: number
  depth: number
  unit: 'm' | 'ft'
}

export interface EarthworkResult extends BaseCalculationResult {
  volume: number // m3
}

export class EarthworkCalculatorLib {
  static calculate(input: EarthworkInput): EarthworkResult {
    const { length, width, depth, unit } = input

    CalculationUtils.validatePositive(length, 'Length')
    CalculationUtils.validatePositive(width, 'Width')
    CalculationUtils.validatePositive(depth, 'Depth')

    // Normalize to meters
    const factor = unit === 'm' ? 1 : 0.3048
    const L = length * factor
    const W = width * factor
    const D = depth * factor

    const volume = L * W * D
    const volume_r = CalculationUtils.roundTo(volume, 3)
    const human_summary = `Earthwork: ${length}×${width}×${depth} ${unit} → Volume ≈ ${volume_r} m³ (converted to meters).`
    const assumptions = [unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is']
    return { volume: volume_r, human_summary, assumptions }
  }
}
