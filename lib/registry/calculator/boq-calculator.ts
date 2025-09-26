import { BOQEngine } from './boq/engine'
import type { BOQInput, RateInput, BOQOptions, BOQResult } from './boq/schema'

export type { BOQInput, RateInput, BOQOptions, BOQResult } from './boq/schema'

export function calculateBOQ(inputs: BOQInput[], rates: RateInput[], options?: BOQOptions): BOQResult {
  return BOQEngine.calculate(inputs, rates, options)
}
