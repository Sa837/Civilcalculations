import { Converter, linearUnit } from '../convert'

// =========================
// Currency (Global)
// =========================
const currencyGlobalUnits = [
  linearUnit(1, 'USD', 'US Dollar'),
  linearUnit(0.85, 'EUR', 'Euro'),
  linearUnit(0.75, 'GBP', 'British Pound'),
  linearUnit(110, 'JPY', 'Japanese Yen'),
  linearUnit(6.45, 'CNY', 'Chinese Yuan'),
  linearUnit(1.35, 'AUD', 'Australian Dollar'),
  linearUnit(1.25, 'CAD', 'Canadian Dollar'),
  linearUnit(75, 'INR', 'Indian Rupee'),
  linearUnit(120, 'NPR', 'Nepalese Rupee'),
]

// =========================
// Time & Date
// =========================
const timeGlobalUnits = [
  linearUnit(0.001, 'ms', 'millisecond'),
  linearUnit(1, 's', 'second'),
  linearUnit(60, 'min', 'minute'),
  linearUnit(3600, 'h', 'hour'),
  linearUnit(86400, 'day', 'day'),
  linearUnit(604800, 'week', 'week'),
  linearUnit(2629800, 'month', 'month'),
  linearUnit(31557600, 'year', 'year'),
]

const timeNepaliUnits = [
  linearUnit(1, 'BS', 'Bikram Sambat'),
  linearUnit(1, 'AD', 'Gregorian'),
]

// =========================
// Pressure / Stress
// =========================
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

// =========================
// Force
// =========================
const forceGlobalUnits = [
  linearUnit(1, 'N', 'newton'),
  linearUnit(1000, 'kN', 'kilonewton'),
  linearUnit(1_000_000, 'MN', 'meganewton'),
  linearUnit(9.80665, 'kgf', 'kilogram-force'),
  linearUnit(4.44822, 'lbf', 'pound-force'),
  linearUnit(0.00001, 'dyne', 'dyne'),
]

// =========================
// Energy / Work
// =========================
const energyGlobalUnits = [
  linearUnit(1, 'J', 'joule'),
  linearUnit(1000, 'kJ', 'kilojoule'),
  linearUnit(1_000_000, 'MJ', 'megajoule'),
  linearUnit(3600, 'Wh', 'watt-hour'),
  linearUnit(3_600_000, 'kWh', 'kilowatt-hour'),
  linearUnit(1055.06, 'BTU', 'British thermal unit'),
  linearUnit(0.239006, 'cal', 'calorie'),
  linearUnit(239.006, 'kcal', 'kilocalorie'),
]

// =========================
// Power
// =========================
const powerGlobalUnits = [
  linearUnit(1, 'W', 'watt'),
  linearUnit(1000, 'kW', 'kilowatt'),
  linearUnit(1_000_000, 'MW', 'megawatt'),
  linearUnit(1_000_000_000, 'GW', 'gigawatt'),
  linearUnit(745.7, 'hp', 'horsepower'),
  linearUnit(3517, 'TR', 'ton of refrigeration'),
]

// =========================
// Density / Unit Weight
// =========================
const densityGlobalUnits = [
  linearUnit(1, 'kg/m³', 'kilogram per cubic meter'),
  linearUnit(0.001, 'g/cm³', 'gram per cubic centimeter'),
  linearUnit(16.0185, 'lb/ft³', 'pound per cubic foot'),
  linearUnit(9.80665, 'kN/m³', 'kilonewton per cubic meter'),
]

// =========================
// Flow Rate
// =========================
const flowVolumetricUnits = [
  linearUnit(1, 'm³/s', 'cubic meter per second'),
  linearUnit(1000, 'L/s', 'liter per second'),
  linearUnit(60_000, 'L/min', 'liter per minute'),
  linearUnit(3_600_000, 'L/h', 'liter per hour'),
  linearUnit(0.0283168, 'ft³/s', 'cubic foot per second'),
  linearUnit(1.699, 'ft³/min', 'cubic foot per minute'),
  linearUnit(3.78541, 'US gpm', 'US gallon per minute'),
  linearUnit(4.54609, 'UK gpm', 'UK gallon per minute'),
]
const flowMassUnits = [
  linearUnit(1, 'kg/s', 'kilogram per second'),
  linearUnit(2.20462, 'lb/s', 'pound per second'),
]

// =========================
// Angle
// =========================
const angleGlobalUnits = [
  linearUnit(1, 'degree', 'degree'),
  linearUnit(0.0174533, 'radian', 'radian'),
  linearUnit(1, 'grad', 'gradian'),
  linearUnit(0.57296, '% slope', 'percent slope'),
  linearUnit(1, 'ratio', 'ratio (1 in n)'),
  linearUnit(1, 'tangent', 'tangent'),
]

// =========================
// Slope / Gradient
// =========================
const slopeGlobalUnits = [
  linearUnit(1, 'rise/run', 'rise/run'),
  linearUnit(0.01, '%', 'percent'),
  linearUnit(1, 'degree', 'degree'),
  linearUnit(1, 'ratio', 'ratio (1:n)'),
  linearUnit(0.001, 'mm/m', 'millimeter per meter'),
]

// =========================
// Temperature
// =========================
const temperatureGlobalUnits = [
  linearUnit(1, '°C', 'Celsius'),
  linearUnit(33.8, '°F', 'Fahrenheit'),
  linearUnit(274.15, 'K', 'Kelvin'),
  linearUnit(493.47, '°R', 'Rankine'),
]

// =========================
// Speed
// =========================
const speedGlobalUnits = [
  linearUnit(1, 'm/s', 'meter per second'),
  linearUnit(3.6, 'km/h', 'kilometer per hour'),
  linearUnit(3.28084, 'ft/s', 'foot per second'),
  linearUnit(2.23694, 'mph', 'mile per hour'),
  linearUnit(1.852, 'knot', 'knot'),
]

// =========================
// Length Units
// =========================
const lengthGlobalUnits = [
  linearUnit(0.001, 'mm', 'millimeter'),
  linearUnit(0.01, 'cm', 'centimeter'),
  linearUnit(1, 'm', 'meter'),
  linearUnit(1000, 'km', 'kilometer'),
  linearUnit(0.0254, 'in', 'inch'),
  linearUnit(0.3048, 'ft', 'foot'),
  linearUnit(0.9144, 'yd', 'yard'),
  linearUnit(1609.344, 'mi', 'mile'),
  linearUnit(1e-9, 'nm', 'nanometer'),
  linearUnit(1e-6, 'µm', 'micrometer'),
  linearUnit(0.201168, 'link', 'link'),
  linearUnit(20.1168, 'chain', 'chain'),
  linearUnit(5.0292, 'rod', 'rod'),
  linearUnit(201.168, 'furlong', 'furlong'),
]

const lengthIndianUnits = [
  linearUnit(0.01905, 'angul', 'angul'),
  linearUnit(0.4572, 'hath', 'hath'),
  linearUnit(0.9144, 'gaj', 'gaj'),
  linearUnit(3.6576, 'danda', 'danda'),
  linearUnit(3200, 'kos', 'kos'),
]

const lengthNepaliUnits = [
  linearUnit(0.4572, 'haat', 'haat'),
  linearUnit(3.048, 'danda', 'danda'),
  linearUnit(3200, 'kos', 'kos'),
  linearUnit(1, 'm', 'meter'),
]

// =========================
// Area Units
// =========================
const areaGlobalUnits = [
  linearUnit(0.000001, 'mm²', 'square millimeter'),
  linearUnit(0.0001, 'cm²', 'square centimeter'),
  linearUnit(1, 'm²', 'square meter'),
  linearUnit(10000, 'ha', 'hectare'),
  linearUnit(1e6, 'km²', 'square kilometer'),
  linearUnit(0.00155, 'in²', 'square inch'),
  linearUnit(0.09290304, 'ft²', 'square foot'),
  linearUnit(0.83612736, 'yd²', 'square yard'),
  linearUnit(4046.8564224, 'acre', 'acre'),
]

const areaIndianUnits = [
  linearUnit(126.44, 'bigha', 'bigha'),
  linearUnit(16.93, 'katha', 'katha'),
  linearUnit(3.3445, 'dhur', 'dhur'),
  linearUnit(505.857, 'kanal', 'kanal'),
  linearUnit(25.2929, 'marla', 'marla'),
  linearUnit(203.0, 'ground', 'ground'),
  linearUnit(101.17, 'guntha', 'guntha'),
  linearUnit(0.836127, 'gaj', 'gaj'),
]

const areaNepaliUnits = [
  linearUnit(508.72, 'ropani', 'ropani'),
  linearUnit(31.80, 'aana', 'aana'),
  linearUnit(7.95, 'paisa', 'paisa'),
  linearUnit(16.93, 'dhur', 'dhur'),
  linearUnit(1, 'm²', 'square meter'),
]

// =========================
// Volume Units
// =========================
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

// =========================
// Mass Units
// =========================
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

// =========================
// Export Converters
// =========================
export const converters: Converter[] = [
  // Add all groups as per your previous structure
  {
    slug: 'length',
    title: 'Length',
    category: 'Measure',
    groups: [
      { name: 'Global', units: lengthGlobalUnits },
      { name: 'Indian', units: lengthIndianUnits },
      { name: 'Nepali', units: lengthNepaliUnits },
    ],
  },
  {
    slug: 'area',
    title: 'Area',
    category: 'Measure',
    groups: [
      { name: 'Global', units: areaGlobalUnits },
      { name: 'Indian', units: areaIndianUnits },
      { name: 'Nepali', units: areaNepaliUnits },
    ],
  },
  {
    slug: 'volume',
    title: 'Volume',
    category: 'Measure',
    groups: [
      { name: 'Global', units: volumeGlobalUnits },
      { name: 'Indian', units: volumeIndianUnits },
      { name: 'Nepali', units: volumeNepaliUnits },
    ],
  },
  {
    slug: 'mass',
    title: 'Mass / Weight',
    category: 'Properties',
    groups: [
      { name: 'Global', units: massGlobalUnits },
      { name: 'Indian', units: massIndianUnits },
      { name: 'Nepali', units: massNepaliUnits },
    ],
  },
  {
    slug: "date",
    title: "Date Converter (AD ↔ BS)",
    category: "Properties",
    groups: [], // handled in ConverterDetail (AD ↔ BS logic)
  },
  {
    slug: 'currency',
    title: 'Currency',
    category: 'Currency',
    groups: [
      { name: 'Global', units: currencyGlobalUnits },
    ],
  },
  {
    slug: 'pressure',
    title: 'Pressure / Stress',
    category: 'Properties',
    groups: [
      { name: 'Global', units: pressureGlobalUnits },
    ],
  },
  {
    slug: 'force',
    title: 'Force',
    category: 'Properties',
    groups: [
      { name: 'Global', units: forceGlobalUnits },
    ],
  },
  {
    slug: 'energy',
    title: 'Energy / Work',
    category: 'Properties',
    groups: [
      { name: 'Global', units: energyGlobalUnits },
    ],
  },
  {
    slug: 'power',
    title: 'Power',
    category: 'Properties',
    groups: [
      { name: 'Global', units: powerGlobalUnits },
    ],
  },
  {
    slug: 'density',
    title: 'Density / Unit Weight',
    category: 'Properties',
    groups: [
      { name: 'Global', units: densityGlobalUnits },
    ],
  },
  {
    slug: 'flow-rate',
    title: 'Flow Rate',
    category: 'Properties',
    groups: [
      { name: 'Volumetric', units: flowVolumetricUnits },
      { name: 'Mass', units: flowMassUnits },
    ],
  },
  {
    slug: 'temperature',
    title: 'Temperature',
    category: 'Properties',
    groups: [
      { name: 'Global', units: temperatureGlobalUnits },
    ],
  },
  {
    slug: 'speed',
    title: 'Speed',
    category: 'Properties',
    groups: [
      { name: 'Global', units: speedGlobalUnits },
    ],
  },
  {
    slug: 'angle',
    title: 'Angle',
    category: 'Properties',
    groups: [
      { name: 'Global', units: angleGlobalUnits },
    ],
  },
  {
    slug: 'slope',
    title: 'Slope / Gradient',
    category: 'Properties',
    groups: [
      { name: 'Global', units: slopeGlobalUnits },
    ],
  },
  {
    slug: 'time',
    title: 'Time / Date',
    category: 'Properties',
    groups: [
      { name: 'Global', units: timeGlobalUnits },
      { name: 'Nepali', units: timeNepaliUnits },
    ],
  },
  
]
