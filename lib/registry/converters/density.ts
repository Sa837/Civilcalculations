import { Converter, linearUnit } from '../../convert'

const densityGlobalUnits = [
  linearUnit(1, 'kg/m³', 'kilogram per cubic meter'),
  linearUnit(0.001, 'g/cm³', 'gram per cubic centimeter'),
  linearUnit(16.0185, 'lb/ft³', 'pound per cubic foot'),
  linearUnit(9.80665, 'kN/m³', 'kilonewton per cubic meter'),
]

export const densityConverter: Converter = {
  slug: 'density',
  title: 'Density / Unit Weight',
  category: 'Properties',
  groups: [
    { name: 'Global', units: densityGlobalUnits },
  ],
}
