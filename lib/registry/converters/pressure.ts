import { Converter, linearUnit } from '../../convert'

const pressureGlobalUnits = [
  linearUnit(1, 'Pa', 'pascal'),
  linearUnit(1000, 'kPa', 'kilopascal'),
  linearUnit(1_000_000, 'MPa', 'megapascal'),
  linearUnit(100_000, 'bar', 'bar'),
  linearUnit(101_325, 'atm', 'atmosphere'),
  linearUnit(6_894.757, 'psi', 'pound per square inch'),
  linearUnit(47.8803, 'psf', 'pound per square foot'),
  linearUnit(133.322, 'Torr', 'Torr'),
  linearUnit(133.322, 'mmHg', 'millimeter of mercury'),
]

export const pressureConverter: Converter = {
  slug: 'pressure',
  title: 'Pressure / Stress',
  category: 'Properties',
  groups: [
    { name: 'Global', units: pressureGlobalUnits },
  ],
}
