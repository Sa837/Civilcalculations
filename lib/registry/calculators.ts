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

// 1. Concrete Volume Estimator
const concrete: Calculator = {
  slug: 'concrete-volume',
  title: 'Concrete Volume Estimator',
  shortDescription: 'Estimate m³ and material breakdown for a given slab volume.',
  tags: ['concrete','volume','estimator'],
  inputs: [
    { name: 'length', label: 'Length', type: 'number', unit: 'm', min: 0, step: 0.001, required: true },
    { name: 'width', label: 'Width', type: 'number', unit: 'm', min: 0, step: 0.001, required: true },
    { name: 'thickness', label: 'Thickness', type: 'number', unit: 'm', min: 0, step: 0.001, required: true },
    { name: 'mix1', label: 'Mix Cement', type: 'number', unit: 'part', min: 1, step: 1, required: true },
    { name: 'mix2', label: 'Mix Sand', type: 'number', unit: 'part', min: 1, step: 1, required: true },
    { name: 'mix3', label: 'Mix Aggregate', type: 'number', unit: 'part', min: 1, step: 1, required: true },
    { name: 'wastage', label: 'Wastage', type: 'number', unit: '%', min: 0, max: 30, step: 1, required: true },
  ],
  notes: 'Assumes nominal mix by volume (e.g., 1:2:4) and accounts for wastage percentage.',
  compute: (v) => {
    const L = Number(v.length)
    const W = Number(v.width)
    const T = Number(v.thickness)
    const mix1 = Number(v.mix1)
    const mix2 = Number(v.mix2)
    const mix3 = Number(v.mix3)
    const wastage = Number(v.wastage) / 100
    const volume = L * W * T
    const volumeWithWaste = volume * (1 + wastage)
    const totalParts = mix1 + mix2 + mix3
    const cement = (mix1 / totalParts) * volumeWithWaste
    const sand = (mix2 / totalParts) * volumeWithWaste
    const aggregate = (mix3 / totalParts) * volumeWithWaste
    return { volume_m3: volumeWithWaste, cement_m3: cement, sand_m3: sand, aggregate_m3: aggregate }
  }
}

// 2. Rebar Weight Calculator
const rebar: Calculator = {
  slug: 'rebar-weight',
  title: 'Rebar Weight Calculator',
  shortDescription: 'Compute total weight from diameter, length, and count.',
  tags: ['rebar','steel','weight'],
  inputs: [
    { name: 'diameter', label: 'Bar Diameter', type: 'number', unit: 'mm', min: 6, step: 1, required: true },
    { name: 'length', label: 'Length (per bar)', type: 'number', unit: 'm', min: 0, step: 0.01, required: true },
    { name: 'count', label: 'Count', type: 'number', unit: 'bars', min: 1, step: 1, required: true },
  ],
  notes: 'Density of steel 7850 kg/m³. Uses unit weight formula: (π/4)·d²·L·ρ.',
  compute: (v) => {
    const d_mm = Number(v.diameter)
    const L = Number(v.length)
    const n = Number(v.count)
    const d_m = d_mm / 1000
    const rho = 7850
    const weightPerBar = Math.PI * 0.25 * d_m * d_m * L * rho
    const total = weightPerBar * n
    return { total_kg: total, per_bar_kg: weightPerBar }
  }
}

// 3. Development Length (Ld)
const developmentLength: Calculator = {
  slug: 'development-length',
  title: 'Development Length (Ld) — IS 456:2000 style',
  shortDescription: 'Compute Ld = (φ × σ_s) / (4 × τ_bd) with defaults for Fe415/500.',
  tags: ['rebar','bond','IS456'],
  inputs: [
    { name: 'diameter', label: 'Bar Diameter', type: 'number', unit: 'mm', min: 6, step: 1, required: true },
    { name: 'steel', label: 'Grade of Steel', type: 'select', options: [
      { label: 'Fe415', value: 'Fe415' }, { label: 'Fe500', value: 'Fe500' }
    ], required: true },
    { name: 'bond', label: 'Bond Condition', type: 'select', options: [
      { label: 'Good', value: 'good' }, { label: 'Poor', value: 'poor' }
    ], required: true },
  ],
  notes: 'Assumes design stress σ_s ~ 0.87 f_y (N/mm²). τ_bd baseline for M20 concrete ~ 1.2 N/mm² for plain bars; increased 60% for deformed bars. Adjust as per code. This is an educational approximation.',
  compute: (v) => {
    const d = Number(v.diameter) // mm
    const steel = String(v.steel)
    const bond = String(v.bond)
    const fy = steel === 'Fe500' ? 500 : 415
    const sigma_s = 0.87 * fy
    // baseline τ_bd for M20, deformed bars with 60% increase
    let tau_bd = 1.2 * 1.6
    if (bond === 'poor') tau_bd *= 0.7
    const Ld = (d * sigma_s) / (4 * tau_bd) // in mm
    return { Ld_mm: Ld }
  }
}

// 4. Brick/Block Quantity Estimator
const bricks: Calculator = {
  slug: 'brick-quantity',
  title: 'Brick/Block Quantity Estimator',
  shortDescription: 'Estimate number of bricks/blocks and mortar volume.',
  tags: ['brick','mortar','quantity'],
  inputs: [
    { name: 'length', label: 'Wall Length', type: 'number', unit: 'm', min: 0, step: 0.01, required: true },
    { name: 'height', label: 'Wall Height', type: 'number', unit: 'm', min: 0, step: 0.01, required: true },
    { name: 'thickness', label: 'Wall Thickness', type: 'number', unit: 'm', min: 0.05, step: 0.005, required: true },
    { name: 'brickL', label: 'Brick Length', type: 'number', unit: 'm', min: 0.15, step: 0.001, required: true },
    { name: 'brickW', label: 'Brick Width', type: 'number', unit: 'm', min: 0.07, step: 0.001, required: true },
    { name: 'brickH', label: 'Brick Height', type: 'number', unit: 'm', min: 0.05, step: 0.001, required: true },
    { name: 'joint', label: 'Mortar Joint', type: 'number', unit: 'm', min: 0, step: 0.001, required: true },
  ],
  notes: 'Assumes uniform brick size and joint thickness. Ignores openings; add allowances as needed.',
  compute: (v) => {
    const wallVol = Number(v.length) * Number(v.height) * Number(v.thickness)
    const bl = Number(v.brickL) + Number(v.joint)
    const bw = Number(v.brickW) + Number(v.joint)
    const bh = Number(v.brickH) + Number(v.joint)
    const unitVol = bl * bw * bh
    const bricks = wallVol / unitVol
    // approximate mortar volume as 20% of wall volume minus brick solid volume (simplified)
    const mortar = wallVol - bricks * (Number(v.brickL) * Number(v.brickW) * Number(v.brickH))
    return { bricks: Math.ceil(bricks), mortar_m3: mortar }
  }
}

// 5. Paint/Plaster Coverage
const coverage: Calculator = {
  slug: 'coverage',
  title: 'Paint/Plaster Coverage',
  shortDescription: 'Estimate liters/bags needed based on coverage rate and coats.',
  tags: ['paint','plaster','coverage'],
  inputs: [
    { name: 'area', label: 'Area', type: 'number', unit: 'm²', min: 0, step: 0.1, required: true },
    { name: 'rate', label: 'Coverage Rate', type: 'number', unit: 'm²/unit', min: 0.1, step: 0.1, required: true },
    { name: 'coats', label: 'Coats', type: 'number', unit: 'x', min: 1, step: 1, required: true },
  ],
  notes: 'Coverage varies by product and substrate. Always consult product data sheet and add safety margin.',
  compute: (v) => {
    const area = Number(v.area)
    const rate = Number(v.rate)
    const coats = Number(v.coats)
    const units = (area * coats) / rate
    return { units_required: units }
  }
}

export const calculators = [concrete, rebar, developmentLength, bricks, coverage]






