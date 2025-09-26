import { Converter, linearUnit } from '../../convert'

const angleGlobalUnits = [
  linearUnit(1, 'degree', 'degree'),
  linearUnit(0.0174533, 'radian', 'radian'),
  linearUnit(1, 'grad', 'gradian'),
  linearUnit(0.57296, '% slope', 'percent slope'),
  linearUnit(1, 'ratio', 'ratio (1 in n)'),
  linearUnit(1, 'tangent', 'tangent'),
]

export const angleConverter: Converter = {
  slug: 'angle',
  title: 'Angle',
  category: 'Properties',
  groups: [
    { name: 'Global', units: angleGlobalUnits },
  ],
}
