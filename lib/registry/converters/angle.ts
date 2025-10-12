import { Converter, linearUnit } from '../../convert'

// Angle conversion units
const angleGlobalUnits = [
  linearUnit(1, 'degree'),
  linearUnit(0.0174533, 'radian'),
  linearUnit(1, 'grad'),
  linearUnit(0.57296, '% slope'),
  linearUnit(1, 'ratio'),
  linearUnit(1, 'tangent'),
  linearUnit(0.9, 'centesimal minute'),
]

/**
 * Angle Converter
 *
 * Converts between different angle measurement units using degrees as the base unit.
 * All conversions follow a two-step process:
 * 1. Convert from source unit to degrees (base unit)
 * 2. Convert from degrees to target unit
 *
 * Example conversion from radians to grads:
 * 1. radians → degrees: radians × (180/π)
 * 2. degrees → grads: degrees × (200/180)
 * Combined: radians × (180/π) × (200/180) = radians × (200/π)
 *
 * This approach ensures maximum precision for all angle conversions.
 */
export const angleConverter: Converter = {
  slug: 'angle',
  title: 'Angle Converter',
  description: 'Convert between angle units with precision. ',
  category: 'Geometry',
  baseUnit: 'degrees',
  groups: [
    {
      name: 'Angular Units',
      units: angleGlobalUnits,
    },
  ],
}
