import { describe, it, expect } from 'vitest'
import { calculators } from '../../lib/registry/calculators'
import { ConcreteCalculator } from '../../lib/registry/calculator/concrete-calculator'

describe('Concrete Volume Estimator', () => {
  it('returns a placeholder entry for the generic calculator registry', () => {
    const c = calculators.find(c => c.slug === 'concrete-volume-estimator')!
    const res = c.compute({})
    expect(res).toEqual({})
  })

  it('estimates slab reinforcement alongside concrete quantities', () => {
    const res = ConcreteCalculator.calculate({
      length: 6,
      width: 4,
      height: 0.15,
      mixType: 'M20',
      wastageFactor: 5,
      unitSystem: 'metric',
      useArea: false,
      elementType: 'slab',
      subType: 'two_way',
      slabTopMainDiaMm: 12,
      slabTopMainSpacingMm: 150,
      slabTopDistDiaMm: 10,
      slabTopDistSpacingMm: 200,
      slabBottomMainDiaMm: 12,
      slabBottomMainSpacingMm: 150,
      slabBottomDistDiaMm: 10,
      slabBottomDistSpacingMm: 200,
      slabClearCoverMm: 25,
      slabExtraRebarPercent: 10,
    })

    expect(res.reinforcement?.totalSteelWeightKg).toBeGreaterThan(0)
    expect(res.reinforcement?.summary).toContain('Slab')
  })

  it('estimates wall and staircase reinforcement for advanced structural workflows', () => {
    const wallRes = ConcreteCalculator.calculate({
      length: 4,
      width: 0.25,
      height: 3,
      mixType: 'M20',
      wastageFactor: 5,
      unitSystem: 'metric',
      useArea: false,
      elementType: 'wall',
      subType: 'shear_wall',
      wallVerticalBarDiaMm: 12,
      wallVerticalBarSpacingMm: 200,
      wallHorizontalBarDiaMm: 10,
      wallHorizontalBarSpacingMm: 250,
      wallClearCoverMm: 25,
      wallExtraRebarPercent: 10,
    })

    const stairRes = ConcreteCalculator.calculate({
      length: 4,
      width: 1.2,
      height: 3,
      mixType: 'M20',
      wastageFactor: 5,
      unitSystem: 'metric',
      useArea: false,
      elementType: 'staircase',
      subType: 'straight',
      stairMainBarDiaMm: 12,
      stairMainBarSpacingMm: 200,
      stairDistBarDiaMm: 8,
      stairDistBarSpacingMm: 250,
      stairClearCoverMm: 25,
      stairExtraRebarPercent: 10,
    })

    expect(wallRes.reinforcement?.totalSteelWeightKg).toBeGreaterThan(0)
    expect(stairRes.reinforcement?.totalSteelWeightKg).toBeGreaterThan(0)
  })

  it('estimates footing reinforcement for foundation work', () => {
    const res = ConcreteCalculator.calculate({
      length: 2.5,
      width: 2.5,
      height: 0.4,
      mixType: 'M20',
      wastageFactor: 5,
      unitSystem: 'metric',
      useArea: false,
      elementType: 'footing',
      subType: 'iso_rect',
      ft_B: 2.5,
      ft_L: 2.5,
      ft_B_bot: 2.5,
      ft_L_bot: 2.5,
      ft_B_top: 2.0,
      ft_L_top: 2.0,
      ft_a: 1.8,
      ft_a1: 1.5,
      ft_a2: 1.2,
      strap_len: 3,
      strap_b: 0.3,
      strap_D: 0.45,
      footingRebarDiaMm: 12,
      footingRebarSpacingMm: 150,
      footingClearCoverMm: 50,
      footingExtraRebarPercent: 10,
    })

    expect(res.reinforcement?.totalSteelWeightKg).toBeGreaterThan(0)
    expect(res.reinforcement?.summary).toContain('Footing')
  })

  it('summarizes a multi-component building estimate with rates and totals', () => {
    const summary = ConcreteCalculator.summarizeProject([
      {
        id: 'slab-1',
        name: 'Ground Floor Slab',
        elementType: 'slab',
        input: {
          length: 6,
          width: 4,
          height: 0.15,
          mixType: 'M20',
          wastageFactor: 5,
          unitSystem: 'metric',
          useArea: false,
          elementType: 'slab',
          slabTopMainDiaMm: 12,
          slabTopMainSpacingMm: 150,
          slabBottomMainDiaMm: 10,
          slabBottomMainSpacingMm: 200,
          slabClearCoverMm: 25,
        },
        result: ConcreteCalculator.calculate({
          length: 6,
          width: 4,
          height: 0.15,
          mixType: 'M20',
          wastageFactor: 5,
          unitSystem: 'metric',
          useArea: false,
          elementType: 'slab',
        }),
        concreteRate: 8000,
        steelRate: 90,
      },
      {
        id: 'beam-1',
        name: 'Transfer Beam',
        elementType: 'beam',
        input: {
          length: 4,
          width: 0.3,
          height: 0.45,
          mixType: 'M25',
          wastageFactor: 5,
          unitSystem: 'metric',
          useArea: false,
          elementType: 'beam',
          beam_b: 0.3,
          beam_D: 0.45,
          beamTopBarCount: 2,
          beamTopBarDiaMm: 12,
          beamBottomBarCount: 2,
          beamBottomBarDiaMm: 12,
          beamStirrupDiaMm: 8,
          beamStirrupSpacingMm: 150,
        },
        result: ConcreteCalculator.calculate({
          length: 4,
          width: 0.3,
          height: 0.45,
          mixType: 'M25',
          wastageFactor: 5,
          unitSystem: 'metric',
          useArea: false,
          elementType: 'beam',
          beam_b: 0.3,
          beam_D: 0.45,
          beamTopBarCount: 2,
          beamTopBarDiaMm: 12,
          beamBottomBarCount: 2,
          beamBottomBarDiaMm: 12,
          beamStirrupDiaMm: 8,
          beamStirrupSpacingMm: 150,
        }),
        concreteRate: 8500,
        steelRate: 95,
      },
    ])

    expect(summary.totalWetVolume).toBeGreaterThan(0)
    expect(summary.totalReinforcementKg).toBeGreaterThan(0)
    expect(summary.totalAmount).toBeGreaterThan(0)
    expect(summary.reportText).toContain('Concrete Building Estimate Report')
    expect(summary.items).toHaveLength(2)
  })
})






