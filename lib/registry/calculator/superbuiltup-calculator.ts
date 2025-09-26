// lib/registry/calculator/superbuiltup-calculator.ts
import CalculationUtils from '@/lib/registry/utils'

export interface SuperBuiltUpInput {
  carpetArea: number // m²
  commonAreaPercent: number // % (0-100)
}

export interface SuperBuiltUpResult {
  superBuiltUpArea: number // m²
  loadingPercent: number // %
  human_summary?: string
}

export class SuperBuiltUpCalculator {
  static getDefaults() {
    return { commonAreaPercent: 25 }
  }

  static calculate(input: SuperBuiltUpInput): SuperBuiltUpResult {
    CalculationUtils.validatePositive(input.carpetArea, 'Carpet Area')
    CalculationUtils.validatePositive(input.commonAreaPercent, 'Common Area %')

    const superBuiltUpArea = input.carpetArea * (1 + input.commonAreaPercent / 100)
    const loadingPercent = ((superBuiltUpArea - input.carpetArea) / input.carpetArea) * 100

    return {
      superBuiltUpArea,
      loadingPercent,
      human_summary: `Super Built-Up Area is ${superBuiltUpArea.toFixed(2)} m² with loading ${loadingPercent.toFixed(2)}%.`,
    }
  }
}

export default SuperBuiltUpCalculator
