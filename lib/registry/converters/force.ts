import { Converter, linearUnit } from '../../convert'

const forceGlobalUnits = [
  linearUnit(1, 'N', 'newton'),
  linearUnit(1000, 'kN', 'kilonewton'),
  linearUnit(1_000_000, 'MN', 'meganewton'),
  linearUnit(9.80665, 'kgf', 'kilogram-force'),
  linearUnit(4.44822, 'lbf', 'pound-force'),
  linearUnit(0.00001, 'dyne', 'dyne'),
]

export const forceConverter: Converter = {
  slug: 'force',
  title: 'Force',
  category: 'Properties',
  groups: [
    { name: 'Global', units: forceGlobalUnits },
  ],
}
