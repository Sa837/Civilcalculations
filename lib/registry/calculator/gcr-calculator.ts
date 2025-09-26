// lib/registry/calculator/gcr-calculator.ts
import CalculationUtils from '@/lib/registry/utils'

export interface GCRInput {
  plotArea: number // m²
  groundFloorBuiltUpArea: number // m²
  permissibleGCR?: number // % as 0-100, optional; default 60
}

export interface GCRResult {
  gcrPercent: number // %
  isCompliant: boolean
  permissibleGCR: number
  human_summary?: string
}

export class GCRCalculator {
  static getDefaults() {
    return { permissibleGCR: 60 }
  }

  static calculate(input: GCRInput): GCRResult {
    const permissibleGCR = input.permissibleGCR ?? this.getDefaults().permissibleGCR
    CalculationUtils.validatePositive(input.plotArea, 'Plot Area')
    CalculationUtils.validatePositive(input.groundFloorBuiltUpArea, 'Ground Floor Built-Up Area')
    CalculationUtils.validatePositive(permissibleGCR, 'Permissible GCR')

    const gcrPercent = (input.groundFloorBuiltUpArea / input.plotArea) * 100
    const isCompliant = gcrPercent <= permissibleGCR

    return {
      gcrPercent,
      isCompliant,
      permissibleGCR,
      human_summary: `GCR is ${gcrPercent.toFixed(2)}%. ${isCompliant ? 'Complies' : 'Exceeds'} the permissible ${permissibleGCR}% as per NBC context.`,
    }
  }
}

export default GCRCalculator
