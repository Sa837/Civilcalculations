import { Converter, linearUnit } from '../../convert'

const slopeGlobalUnits = [
  linearUnit(1, 'rise/run', 'rise/run'),
  linearUnit(0.01, '%', 'percent'),
  linearUnit(1, 'degree', 'degree'),
  linearUnit(1, 'ratio', 'ratio (1:n)'),
  linearUnit(0.001, 'mm/m', 'millimeter per meter'),
]

export const slopeConverter: Converter = {
  slug: 'slope',
  title: 'Slope / Gradient',
  category: 'Properties',
  groups: [
    { name: 'Global', units: slopeGlobalUnits },
  ],
}
