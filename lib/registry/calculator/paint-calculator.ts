// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\calculator\paint-calculator.ts
import { CalculationUtils } from '../utils'

export interface PaintCalculationInput {
  length?: number
  height?: number
  area?: number
  coats: number
  coverage: number // m² per liter (or chosen unit normalized to metric)
  unit: 'm' | 'ft'
  useArea: boolean
}

export interface PaintCalculationResult {
  paintRequired: number
  coats: number
}

export class PaintCalculator {
  static calculate(input: PaintCalculationInput): PaintCalculationResult {
    const { length, height, area, coats, coverage, unit, useArea } = input

    // Validate
    CalculationUtils.validatePositive(coats, 'Coats')
    CalculationUtils.validatePositive(coverage, 'Coverage')

    if (useArea) {
      if (area === undefined) throw new Error('Area is required in area mode')
      CalculationUtils.validatePositive(area, 'Area')
    } else {
      if (length === undefined || height === undefined) throw new Error('Length and height are required')
      CalculationUtils.validatePositive(length, 'Length')
      CalculationUtils.validatePositive(height, 'Height')
    }

    // Normalize to metric
    const dims = CalculationUtils.normalizeDimensions({ length, width: height, area }, unit === 'm' ? 'metric' : 'imperial')

    const areaM2 = useArea && dims.area !== undefined
      ? dims.area!
      : CalculationUtils.calculateRectangularArea(dims.length!, dims.width!)

    const paintRequired = (areaM2 * coats) / coverage

    return {
      paintRequired: CalculationUtils.roundTo(paintRequired, 3),
      coats
    }
  }
}
