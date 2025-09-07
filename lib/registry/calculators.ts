export type CalculatorInput = {
  name: string
  label: string
  type: 'number' | 'select'
  unit?: string
  options?: { label: string; value: string }[]
  min?: number
  max?: number
  step?: number
  required?: boolean
}

export type Calculator = {
  slug: string
  title: string
  shortDescription: string
  tags: string[]
  inputs: CalculatorInput[]
  notes?: string
  compute: (values: Record<string, number | string>) => Record<string, number | string>
}

// Concrete Volume Estimator - New refined calculator
const concreteVolume: Calculator = {
  slug: 'concrete-volume-estimator',
  title: 'Concrete Volume Estimator',
  shortDescription: 'Calculate concrete volume and material requirements with precise mix ratios.',
  tags: ['concrete', 'volume', 'estimator', 'materials'],
  inputs: [
    { name: 'length', label: 'Length', type: 'number', unit: 'm', min: 0, step: 0.001, required: true },
    { name: 'width', label: 'Width', type: 'number', unit: 'm', min: 0, step: 0.001, required: true },
    { name: 'height', label: 'Height/Thickness', type: 'number', unit: 'm', min: 0, step: 0.001, required: true },
    { name: 'mixType', label: 'Concrete Mix Type', type: 'select', options: [
      { label: 'M10 (1:3:6)', value: 'M10' },
      { label: 'M15 (1:2:4)', value: 'M15' },
      { label: 'M20 (1:1.5:3)', value: 'M20' }
    ], required: true },
    { name: 'wastage', label: 'Wastage Factor', type: 'number', unit: '%', min: 0, max: 30, step: 0.1, required: true },
  ],
  notes: 'Calculates dry volume using 1.54 factor and converts to weights using standard densities.',
  compute: (v) => {
    const length = Number(v.length)
    const width = Number(v.width)
    const height = Number(v.height)
    const mixType = String(v.mixType)
    const wastage = Number(v.wastage) / 100

    // Mix ratios based on type
    let cementRatio = 1, sandRatio = 3, aggregateRatio = 6
    if (mixType === 'M15') {
      sandRatio = 2
      aggregateRatio = 4
    } else if (mixType === 'M20') {
      sandRatio = 1.5
      aggregateRatio = 3
    }

    // Calculate wet concrete volume
    const wetVolume = length * width * height
    
    // Convert to dry volume (1.54 factor)
    const dryVolume = wetVolume * 1.54
    
    // Calculate material volumes
    const totalParts = cementRatio + sandRatio + aggregateRatio
    const cementVolume = (cementRatio / totalParts) * dryVolume
    const sandVolume = (sandRatio / totalParts) * dryVolume
    const aggregateVolume = (aggregateRatio / totalParts) * dryVolume
    
    // Convert to weights (kg/m³)
    const cementDensity = 1440 // kg/m³
    const sandDensity = 1450 // kg/m³
    const aggregateDensity = 1500 // kg/m³
    
    const cementWeight = cementVolume * cementDensity
    const sandWeight = sandVolume * sandDensity
    const aggregateWeight = aggregateVolume * aggregateDensity
    
    // Add wastage factor
    const wastageFactor = 1 + wastage
    const cementWeightFinal = cementWeight * wastageFactor
    const sandWeightFinal = sandWeight * wastageFactor
    const aggregateWeightFinal = aggregateWeight * wastageFactor
    
    // Calculate cement bags (50kg per bag)
    const cementBags = cementWeightFinal / 50
    
    return {
      wet_volume_m3: wetVolume,
      dry_volume_m3: dryVolume,
      cement_kg: cementWeightFinal,
      cement_bags: cementBags,
      sand_kg: sandWeightFinal,
      aggregate_kg: aggregateWeightFinal,
      mix_ratio: `${cementRatio}:${sandRatio}:${aggregateRatio}`
    }
  }
}

export const calculators = [concreteVolume]






