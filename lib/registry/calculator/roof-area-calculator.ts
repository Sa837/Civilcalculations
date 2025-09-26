// Logic module for roof area calculator
import { BaseCalculationInput, BaseCalculationResult } from './base'
import { CalculationUtils } from '../utils'

export type RoofType = 'gable' | 'hip' | 'shed' | 'mansard' | 'gambrel' | 'pyramid' | 'butterfly'

export interface RoofAreaInput extends BaseCalculationInput {
  roofType: RoofType
  length: number
  width: number
  slope?: number
  hipLength?: number
  upperSlope?: number
  lowerSlope?: number
  height?: number
  unit: 'm' | 'ft'
}

export interface RoofAreaResult extends BaseCalculationResult {
  area: number // m2 in metric
}

export class RoofAreaCalculatorLib {
  static calculate(input: RoofAreaInput): RoofAreaResult {
    const { roofType, length, width, slope, hipLength, upperSlope, lowerSlope, height, unit } = input

    CalculationUtils.validatePositive(length, 'Length')
    CalculationUtils.validatePositive(width, 'Width')

    const dims = CalculationUtils.normalizeDimensions({ length, width }, unit === 'm' ? 'metric' : 'imperial')
    const L = dims.length!
    const W = dims.width!

    const deg = (x?: number) => (x ?? 0) * Math.PI / 180

    let area = 0
    switch (roofType) {
      case 'gable':
        CalculationUtils.validatePositive(slope ?? 0.0001, 'Slope')
        area = 2 * (L * W / 2) / Math.cos(deg(slope))
        break
      case 'hip':
        CalculationUtils.validatePositive(slope ?? 0.0001, 'Slope')
        CalculationUtils.validatePositive(hipLength ?? 0.0001, 'Hip length')
        area = 2 * (L * W / 2) / Math.cos(deg(slope)) + 2 * ((hipLength as number) * W / 2) / Math.cos(deg(slope))
        break
      case 'mansard': {
        CalculationUtils.validatePositive(upperSlope ?? 0.0001, 'Upper slope')
        CalculationUtils.validatePositive(lowerSlope ?? 0.0001, 'Lower slope')
        area = 2 * (L * W / 4) / Math.cos(deg(upperSlope)) + 2 * (L * W / 4) / Math.cos(deg(lowerSlope))
        break
      }
      case 'gambrel': {
        CalculationUtils.validatePositive(upperSlope ?? 0.0001, 'Upper slope')
        CalculationUtils.validatePositive(lowerSlope ?? 0.0001, 'Lower slope')
        area = (L * W / 2) / Math.cos(deg(upperSlope)) + (L * W / 2) / Math.cos(deg(lowerSlope))
        break
      }
      case 'pyramid': {
        CalculationUtils.validatePositive(height ?? 0.0001, 'Height')
        area = 2 * L * (height as number)
        break
      }
      case 'butterfly': {
        CalculationUtils.validatePositive(slope ?? 0.0001, 'Slope')
        CalculationUtils.validatePositive(height ?? 0.0001, 'Height')
        area = 2 * (L * (height as number)) / Math.cos(deg(slope))
        break
      }
      case 'shed':
      default:
        CalculationUtils.validatePositive(slope ?? 0.0001, 'Slope')
        area = (L * W) / Math.cos(deg(slope))
    }

    const area_r = CalculationUtils.roundTo(area, 2)
    return {
      area: area_r,
      human_summary: `Roof (${roofType}): area ≈ ${area_r} m² (inputs converted to meters).`,
      assumptions: [unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is'],
    }
  }
}
