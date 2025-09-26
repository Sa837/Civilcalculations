import { Converter, linearUnit } from '../../convert'

const massGlobalUnits = [
  linearUnit(0.000001, 'mg', 'milligram'),
  linearUnit(0.001, 'g', 'gram'),
  linearUnit(1, 'kg', 'kilogram'),
  linearUnit(1000, 'metric ton', 'metric ton'),
  linearUnit(0.028349523125, 'oz', 'ounce'),
  linearUnit(0.45359237, 'lb', 'pound'),
  linearUnit(6.35029, 'stone', 'stone'),
  linearUnit(907.185, 'US short ton', 'US short ton'),
  linearUnit(1016.05, 'UK long ton', 'UK long ton'),
]

const massIndianUnits = [
  linearUnit(0.0116638, 'tola', 'tola'),
  linearUnit(0.000121, 'ratti', 'ratti'),
  linearUnit(0.014579, 'chatank', 'chatank'),
  linearUnit(0.9331, 'seer', 'seer'),
  linearUnit(37.3242, 'maund', 'maund'),
]

const massNepaliUnits = [
  linearUnit(0.0116638, 'tola', 'tola'),
  linearUnit(0.5, 'pau', 'pau'),
  linearUnit(0.0125, 'chatak', 'chatak'),
  linearUnit(2, 'dharni', 'dharni'),
]

export const massConverter: Converter = {
  slug: 'mass',
  title: 'Mass / Weight',
  category: 'Properties',
  groups: [
    { name: 'Global', units: massGlobalUnits },
    { name: 'Indian', units: massIndianUnits },
    { name: 'Nepali', units: massNepaliUnits },
  ],
}
