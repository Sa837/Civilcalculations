// Shared base interfaces for all calculators
// Ensure consistent, reusable, backend-ready results across the app

export interface BaseCalculationInput {
  // marker only for now; individual calculators extend this
}

export interface BaseCalculationResult {
  // Required minimal outputs can be defined by each calculator
  // Standard optional advanced fields below keep UI non-breaking but allow surfacing
  human_summary?: string
  assumptions?: string[]
  notes?: string[]
  structural?: any
}

export interface CalculatorClass<I extends BaseCalculationInput, R extends BaseCalculationResult> {
  calculate(input: I): R
}
