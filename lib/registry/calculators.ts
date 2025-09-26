// Registry of simple calculators used by /app/calculators/[slug]/page.tsx
// Note: Complex calculators (e.g., Concrete) render dedicated components and bypass generic compute.

export type CalculatorInput = {
  name: string
  label: string
  type: 'number' | 'select'
  unit?: string
  step?: number
  min?: number
  max?: number
  required?: boolean
  options?: { value: string; label: string }[]
}

export type CalculatorEntry = {
  slug: string
  title: string
  shortDescription: string
  notes?: string
  inputs: CalculatorInput[]
  compute: (values: Record<string, string | number>) => Record<string, number | string>
}

export const calculators: CalculatorEntry[] = [
  {
    slug: 'concrete-volume-estimator',
    title: 'Concrete Volume Estimator',
    shortDescription: 'Calculate concrete volume and material requirements',
    notes: 'Use the dedicated concrete calculator UI for element-aware, shape-aware inputs.',
    inputs: [],
    compute: () => ({})
  },
  // Example generic calculator (placeholder)
  {
    slug: 'brickwork-estimator',
    title: 'Brickwork Calculator',
    shortDescription: 'Bricks, mortar, cement, sand quantities',
    inputs: [
      { name: 'length', label: 'Wall Length', type: 'number', unit: 'm', step: 0.01, min: 0, required: true },
      { name: 'height', label: 'Wall Height', type: 'number', unit: 'm', step: 0.01, min: 0, required: true },
      { name: 'thickness', label: 'Wall Thickness', type: 'number', unit: 'm', step: 0.01, min: 0, required: true }
    ],
    compute: (v) => {
      const L = Number(v.length || 0)
      const H = Number(v.height || 0)
      const T = Number(v.thickness || 0)
      const volume = L * H * T
      return { volume }
    }
  }
]
