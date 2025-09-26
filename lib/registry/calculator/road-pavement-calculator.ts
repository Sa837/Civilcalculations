// Logic module for road pavement calculator
import { BaseCalculationInput, BaseCalculationResult } from './base'
import { CalculationUtils } from '../utils'

export interface RoadPavementInput extends BaseCalculationInput {
  length?: number
  width?: number
  area?: number
  thickness: number
  unit: 'm' | 'ft'
  useArea: boolean
}

export interface RoadPavementResult extends BaseCalculationResult {
  area: number // m2
  volume: number // m3
}

export class RoadPavementCalculatorLib {
  static calculate(input: RoadPavementInput): RoadPavementResult {
    const { length, width, area, thickness, unit, useArea } = input

    CalculationUtils.validatePositive(thickness, 'Thickness')

    if (useArea) {
      if (area === undefined) throw new Error('Area is required in area mode')
      CalculationUtils.validatePositive(area, 'Area')
    } else {
      if (length === undefined || width === undefined) throw new Error('Length and width are required')
      CalculationUtils.validatePositive(length, 'Length')
      CalculationUtils.validatePositive(width, 'Width')
    }

    const dims = CalculationUtils.normalizeDimensions({ length, width, area }, unit === 'm' ? 'metric' : 'imperial')
    const areaM2 = useArea && dims.area !== undefined ? dims.area! : CalculationUtils.calculateRectangularArea(dims.length!, dims.width!)
    const thickness_m = unit === 'm' ? thickness : thickness * 0.3048
    const volume = areaM2 * thickness_m

    const area_r = CalculationUtils.roundTo(areaM2, 3)
    const volume_r = CalculationUtils.roundTo(volume, 3)

    return {
      area: area_r,
      volume: volume_r,
      human_summary: `Road pavement: area ≈ ${area_r} m²; thickness ${thickness_m.toFixed(3)} m; volume ≈ ${volume_r} m³`,
      assumptions: [unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is'],
    }
  }
}
