import { describe, it, expect } from 'vitest'
import { converters } from '../../lib/registry/converters'

describe('converters', () => {
  it('converts meters to feet', () => {
    const c = converters.find(c => c.slug === 'length')!
    const v = c.convert(1, 'm', 'ft')
    expect(Math.abs(v - 3.280839895)).toBeLessThan(1e-9)
  })

  it('temperature C to F roundtrip', () => {
    const c = converters.find(c => c.slug === 'temperature')!
    const f = c.convert(100, '°C', '°F')
    const back = c.convert(f, '°F', '°C')
    expect(Math.abs(back - 100)).toBeLessThan(1e-9)
  })
})






