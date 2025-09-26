// Logic module for formwork calculator
import { BaseCalculationInput, BaseCalculationResult } from './base'
import { CalculationUtils } from '../utils'

export type FormworkType = 'batten' | 'plywood' | 'steel' | 'aluminum' | 'plastic' | 'timber'

export interface FormworkInput extends BaseCalculationInput {
  length: number
  height: number
  unit: 'm' | 'ft'
  formworkType: FormworkType
}

export interface FormworkResult extends BaseCalculationResult {
  area: number // m2
}

export class FormworkCalculatorLib {
  static calculate(input: FormworkInput): FormworkResult {
    const { length, height, unit, formworkType } = input
    CalculationUtils.validatePositive(length, 'Length')
    CalculationUtils.validatePositive(height, 'Height')

    const dims = CalculationUtils.normalizeDimensions({ length, width: height }, unit === 'm' ? 'metric' : 'imperial')
    const area = CalculationUtils.calculateRectangularArea(dims.length!, dims.width!)
    const area_r = CalculationUtils.roundTo(area, 3)

    return {
      area: area_r,
      human_summary: `${formworkType} formwork area ≈ ${area_r} m² for panel ${dims.length!.toFixed(3)} × ${dims.width!.toFixed(3)} m`,
      assumptions: [unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is'],
    }
  }
}
