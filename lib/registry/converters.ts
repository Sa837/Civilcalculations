import { Converter, linearUnit, makeConverter, temperatureUnits } from '../convert'

// Length (base: meter)
const lengthUnits = [
  linearUnit(1, 'm', 'meter'),
  linearUnit(0.01, 'cm', 'centimeter'),
  linearUnit(0.001, 'mm', 'millimeter'),
  linearUnit(1000, 'km', 'kilometer'),
  linearUnit(0.3048, 'ft', 'foot'),
  linearUnit(0.0254, 'in', 'inch'),
  linearUnit(0.9144, 'yd', 'yard'),
  linearUnit(1609.344, 'mile', 'mile'),
]

// Area (base: square meter)
const areaUnits = [
  linearUnit(1, 'm²', 'square meter'),
  linearUnit(0.0001, 'cm²', 'square centimeter'),
  linearUnit(0.000001, 'mm²', 'square millimeter'),
  linearUnit(0.09290304, 'ft²', 'square foot'),
  linearUnit(0.83612736, 'yd²', 'square yard'),
  linearUnit(4046.8564224, 'acre', 'acre'),
  linearUnit(10000, 'hectare', 'hectare'),
]

// Volume (base: cubic meter)
const volumeUnits = [
  linearUnit(1, 'm³', 'cubic meter'),
  linearUnit(0.001, 'liter', 'liter'),
  linearUnit(0.000001, 'ml', 'milliliter'),
  linearUnit(0.028316846592, 'ft³', 'cubic foot'),
  linearUnit(0.764554857984, 'yd³', 'cubic yard'),
  linearUnit(0.003785411784, 'gal (US)', 'gallon (US)'),
  linearUnit(0.00454609, 'gal (UK)', 'gallon (UK)'),
]

// Mass (base: kilogram)
const massUnits = [
  linearUnit(1, 'kg', 'kilogram'),
  linearUnit(0.001, 'g', 'gram'),
  linearUnit(0.000001, 'mg', 'milligram'),
  linearUnit(1000, 'ton', 'metric ton'),
  linearUnit(0.45359237, 'lb', 'pound'),
  linearUnit(0.028349523125, 'oz', 'ounce'),
]

// Pressure (base: Pascal)
const pressureUnits = [
  linearUnit(1, 'Pa', 'pascal'),
  linearUnit(1000, 'kPa', 'kilopascal'),
  linearUnit(1_000_000, 'MPa', 'megapascal'),
  linearUnit(100000, 'bar', 'bar'),
  linearUnit(6894.757293168, 'psi', 'pound per square inch'),
  linearUnit(101325, 'atm', 'atmosphere'),
  linearUnit(133.3223684211, 'mmHg', 'millimeter of mercury'),
]

// Speed (base: m/s)
const speedUnits = [
  linearUnit(1, 'm/s', 'meter per second'),
  linearUnit(1/3.6, 'km/h', 'kilometer per hour'),
  linearUnit(0.44704, 'mph', 'mile per hour'),
  linearUnit(0.3048, 'ft/s', 'foot per second'),
  linearUnit(0.514444, 'knot', 'knot'),
]

// Density (base: kg/m³)
const densityUnits = [
  linearUnit(1, 'kg/m³', 'kilogram per cubic meter'),
  linearUnit(1000, 'g/cm³', 'gram per cubic centimeter'),
  linearUnit(16.01846337396, 'lb/ft³', 'pound per cubic foot'),
]

// Force (base: newton)
const forceUnits = [
  linearUnit(1, 'N', 'newton'),
  linearUnit(1000, 'kN', 'kilonewton'),
  linearUnit(4.4482216152605, 'lbf', 'pound-force'),
]

// Energy (base: joule)
const energyUnits = [
  linearUnit(1, 'J', 'joule'),
  linearUnit(1000, 'kJ', 'kilojoule'),
  linearUnit(3600, 'Wh', 'watt-hour'),
  linearUnit(3_600_000, 'kWh', 'kilowatt-hour'),
]

// Length (Nepali) — local first
const nepaliLengthUnits = [
  linearUnit(0.4572, 'haat', 'haat'),
  linearUnit(0.2286, 'bitta', 'bitta'),
  linearUnit(1, 'm', 'meter'),
  linearUnit(0.01, 'cm', 'centimeter'),
  linearUnit(0.001, 'mm', 'millimeter'),
  linearUnit(1000, 'km', 'kilometer'),
  linearUnit(0.3048, 'ft', 'foot'),
  linearUnit(0.0254, 'in', 'inch'),
  linearUnit(0.9144, 'yd', 'yard'),
  linearUnit(1609.344, 'mile', 'mile'),
]

// Area (Nepali) — local first
const nepaliAreaUnits = [
  linearUnit(508.72, 'ropani', 'ropani'),
  linearUnit(31.80, 'aana', 'aana'),
  linearUnit(7.95, 'paisa', 'paisa'),
  linearUnit(16.931, 'dhur', 'dhur'),
  linearUnit(1, 'm²', 'square meter'),
]

// Volume (Nepali) — local first
const nepaliVolumeUnits = [
  linearUnit(0.2, 'muri', 'muri'),
  linearUnit(0.01, 'pathi', 'pathi'),
  linearUnit(0.00125, 'mana', 'mana'),
  linearUnit(0.0003125, 'pau', 'pau'),
  linearUnit(0.001, 'liter', 'liter'),
  linearUnit(1, 'm³', 'cubic meter'),
]

// Currency (base: USD). Static example rates; update as needed.
const currencyUnits = [
  linearUnit(1, 'USD', '$'),
  linearUnit(1.09, 'EUR', '€'),
  linearUnit(1.28, 'GBP', '£'),
  linearUnit(0.67, 'AUD', 'A$'),
  linearUnit(0.012, 'INR', '₹'),
  linearUnit(0.0075, 'NPR', 'रू'),
]

export const converters: Converter[] = [
  // Measure group
  makeConverter('length', 'Length', 'Measure', lengthUnits),
  makeConverter('area', 'Area', 'Measure', areaUnits),
  makeConverter('volume', 'Volume', 'Measure', volumeUnits),
    // Nepali group
  makeConverter('length-nepali', 'Length (Nepali)', 'Nepali', nepaliLengthUnits),
  makeConverter('area-nepali', 'Area (Nepali)', 'Nepali', nepaliAreaUnits),
  makeConverter('volume-nepali', 'Volume (Nepali)', 'Nepali', nepaliVolumeUnits),
      // Currency
  makeConverter('currency', 'Currency', 'Currency', currencyUnits),
  // Properties group
  makeConverter('mass', 'Mass', 'Properties', massUnits),
  makeConverter('pressure', 'Pressure', 'Properties', pressureUnits),
  makeConverter('temperature', 'Temperature', 'Properties', temperatureUnits),
  makeConverter('speed', 'Speed', 'Properties', speedUnits),
  makeConverter('density', 'Density', 'Properties', densityUnits),
  makeConverter('force', 'Force', 'Properties', forceUnits),
  makeConverter('energy', 'Energy', 'Properties', energyUnits),


]

export const categories = [
  'Measure','Nepali','Properties','Currency'
]





