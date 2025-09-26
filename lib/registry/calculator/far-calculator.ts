// lib/registry/calculator/far-calculator.ts
import CalculationUtils from '@/lib/registry/utils'

export interface FARInput {
  plotArea: number // in m²
  totalBuiltUpArea: number // in m² (sum of all floors)
  permissibleFAR: number // NBC or custom
}

export interface FARResult {
  achievedFAR: number
  maxPermissibleBuiltUpArea: number
  human_summary?: string
}

export class FARCalculator {
  static getDefaults() {
    return { permissibleFAR: 2.5 }
  }

  static calculate(input: FARInput): FARResult {
    CalculationUtils.validatePositive(input.plotArea, 'Plot Area')
    CalculationUtils.validatePositive(input.totalBuiltUpArea, 'Total Built-Up Area')
    CalculationUtils.validatePositive(input.permissibleFAR, 'Permissible FAR')

    const achievedFAR = input.totalBuiltUpArea / input.plotArea
    const maxPermissibleBuiltUpArea = input.plotArea * input.permissibleFAR

    return {
      achievedFAR,
      maxPermissibleBuiltUpArea,
      human_summary: `Achieved FAR is ${achievedFAR.toFixed(2)}. Max permissible built-up area is ${maxPermissibleBuiltUpArea.toFixed(2)} m².`,
    }
  }
}

export default FARCalculator
