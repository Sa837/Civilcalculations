import { Converter, linearUnit } from '../../convert'

const volumeGlobalUnits = [
  linearUnit(0.000000001, 'mm³', 'cubic millimeter'),
  linearUnit(0.000001, 'cm³', 'cubic centimeter'),
  linearUnit(1, 'm³', 'cubic meter'),
  linearUnit(0.001, 'L', 'liter'),
  linearUnit(0.000001, 'mL', 'milliliter'),
  linearUnit(0.000016387064, 'in³', 'cubic inch'),
  linearUnit(0.028316846592, 'ft³', 'cubic foot'),
  linearUnit(0.764554857984, 'yd³', 'cubic yard'),
  linearUnit(0.003785411784, 'US gal', 'US gallon'),
  linearUnit(0.00454609, 'UK gal', 'UK gallon'),
  linearUnit(0.000946353, 'US qt', 'US quart'),
  linearUnit(0.000473176, 'US pt', 'US pint'),
  linearUnit(0.158987, 'barrel', 'barrel'),
]

const volumeIndianUnits = [
  linearUnit(0.9331, 'seer', 'seer'),
  linearUnit(37.3242, 'maund', 'maund'),
  linearUnit(0.0116638, 'tola', 'tola'),
  linearUnit(0.005, 'pathi', 'pathi'),
  linearUnit(0.000625, 'mana', 'mana'),
]

const volumeNepaliUnits = [
  linearUnit(0.2, 'muri', 'muri'),
  linearUnit(0.01, 'pathi', 'pathi'),
  linearUnit(0.00125, 'mana', 'mana'),
]

export const volumeConverter: Converter = {
  slug: 'volume',
  title: 'Volume',
  category: 'Measure',
  groups: [
    { name: 'Global', units: volumeGlobalUnits },
    { name: 'Indian', units: volumeIndianUnits },
    { name: 'Nepali', units: volumeNepaliUnits },
  ],
}
