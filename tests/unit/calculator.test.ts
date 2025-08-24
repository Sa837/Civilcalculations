import { describe, it, expect } from 'vitest'
import { calculators } from '../../lib/registry/calculators'

describe('Concrete Volume Estimator', () => {
  it('computes volume and breakdown', () => {
    const c = calculators.find(c => c.slug === 'concrete-volume')!
    const res = c.compute({ length: 5, width: 4, thickness: 0.2, mix1: 1, mix2: 2, mix3: 4, wastage: 5 })
    const total = res.volume_m3 as number
    expect(total).toBeCloseTo(5 * 4 * 0.2 * 1.05, 10)
    expect((res.cement_m3 as number) + (res.sand_m3 as number) + (res.aggregate_m3 as number)).toBeCloseTo(total, 10)
  })
})






