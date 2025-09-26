// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\calculator\steel-reinforcement-calculator.ts
// Logic module for steel reinforcement calculator (UI unchanged)

import { CalculationUtils } from '../utils'
import { BaseCalculationInput, BaseCalculationResult } from './base'

export interface SteelRebarInput extends BaseCalculationInput {
  barLength: number // length per bar (m or ft depending on unit)
  barDiameterMm: number // mm
  barCount: number
  unit: 'm' | 'ft'
}

export interface SteelRebarResult extends BaseCalculationResult {
  totalLength: number // meters
  totalWeight: number // kg
  // Optional helpful fields (non-breaking)
  unitNote?: string
}

const STEEL_DENSITY_KG_M3 = 7850

export class SteelRebarCalculator {
  static calculate(input: SteelRebarInput): SteelRebarResult {
    const { barLength, barDiameterMm, barCount, unit } = input

    CalculationUtils.validatePositive(barLength, 'Bar length')
    CalculationUtils.validatePositive(barDiameterMm, 'Bar diameter')
    CalculationUtils.validatePositive(barCount, 'Bar count')

    // Normalize length to meters
    const lengthPerBar_m = unit === 'm' ? barLength : barLength * 0.3048
    const d_m = barDiameterMm / 1000

    const totalLength_m = lengthPerBar_m * barCount
    const volume_m3 = Math.PI * Math.pow(d_m / 2, 2) * totalLength_m
    const totalWeight_kg = volume_m3 * STEEL_DENSITY_KG_M3

    const totalLength_r = CalculationUtils.roundTo(totalLength_m, 2)
    const totalWeight_r = CalculationUtils.roundTo(totalWeight_kg, 2)

    const human_summary = `Steel: Ø${barDiameterMm} mm × ${barCount} bars; total length ≈ ${totalLength_r} m; weight ≈ ${totalWeight_r} kg.`
    const assumptions = [
      `Density = ${STEEL_DENSITY_KG_M3} kg/m³`,
      unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
    ]

    return {
      totalLength: totalLength_r,
      totalWeight: totalWeight_r,
      unitNote: unit === 'ft' ? 'Input converted from ft to m internally.' : undefined,
      human_summary,
      assumptions,
    }
  }
}
