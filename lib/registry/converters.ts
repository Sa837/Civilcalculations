// Currency (Global)
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
];

// Time & Date (Global, Nepali)
const timeGlobalUnits = [
  linearUnit(0.001, 'ms', 'millisecond'),
  linearUnit(1, 's', 'second'),
  linearUnit(60, 'min', 'minute'),
  linearUnit(3600, 'h', 'hour'),
  linearUnit(86400, 'day', 'day'),
  linearUnit(604800, 'week', 'week'),
  linearUnit(2629800, 'month', 'month'),
  linearUnit(31557600, 'year', 'year'),
];
const timeNepaliUnits = [
  linearUnit(1, 'BS', 'Bikram Sambat'),
  linearUnit(1, 'AD', 'Gregorian'),
];

// Pressure / Stress (Global)
const pressureGlobalUnits = [
  linearUnit(1, 'Pa', 'pascal'),
  linearUnit(1000, 'kPa', 'kilopascal'),
  linearUnit(1_000_000, 'MPa', 'megapascal'),
  linearUnit(100000, 'bar', 'bar'),
  linearUnit(101325, 'atm', 'atmosphere'),
  linearUnit(6894.757, 'psi', 'pound per square inch'),
  linearUnit(47.8803, 'psf', 'pound per square foot'),
  linearUnit(133.322, 'Torr', 'Torr'),
  linearUnit(133.322, 'mmHg', 'millimeter of mercury'),
];

// Force (Global)
const forceGlobalUnits = [
  linearUnit(1, 'N', 'newton'),
  linearUnit(1000, 'kN', 'kilonewton'),
  linearUnit(1_000_000, 'MN', 'meganewton'),
  linearUnit(9.80665, 'kgf', 'kilogram-force'),
  linearUnit(4.44822, 'lbf', 'pound-force'),
  linearUnit(0.00001, 'dyne', 'dyne'),
];

// Energy / Work (Global)
const energyGlobalUnits = [
  linearUnit(1, 'J', 'joule'),
  linearUnit(1000, 'kJ', 'kilojoule'),
  linearUnit(1_000_000, 'MJ', 'megajoule'),
  linearUnit(3600, 'Wh', 'watt-hour'),
  linearUnit(3_600_000, 'kWh', 'kilowatt-hour'),
  linearUnit(1055.06, 'BTU', 'British thermal unit'),
  linearUnit(0.239006, 'cal', 'calorie'),
  linearUnit(239.006, 'kcal', 'kilocalorie'),
];

// Power (Global)
const powerGlobalUnits = [
  linearUnit(1, 'W', 'watt'),
  linearUnit(1000, 'kW', 'kilowatt'),
  linearUnit(1_000_000, 'MW', 'megawatt'),
  linearUnit(1_000_000_000, 'GW', 'gigawatt'),
  linearUnit(745.7, 'hp', 'horsepower'),
  linearUnit(3517, 'TR', 'ton of refrigeration'),
];

// Density / Unit Weight (Global)
const densityGlobalUnits = [
  linearUnit(1, 'kg/m³', 'kilogram per cubic meter'),
  linearUnit(0.001, 'g/cm³', 'gram per cubic centimeter'),
  linearUnit(16.0185, 'lb/ft³', 'pound per cubic foot'),
  linearUnit(9.80665, 'kN/m³', 'kilonewton per cubic meter'),
];

// Flow Rate (Global Volumetric, Global Mass)
const flowVolumetricUnits = [
  linearUnit(1, 'm³/s', 'cubic meter per second'),
  linearUnit(1000, 'L/s', 'liter per second'),
  linearUnit(60000, 'L/min', 'liter per minute'),
  linearUnit(3600000, 'L/h', 'liter per hour'),
  linearUnit(0.0283168, 'ft³/s', 'cubic foot per second'),
  linearUnit(1.699, 'ft³/min', 'cubic foot per minute'),
  linearUnit(3.78541, 'US gpm', 'US gallon per minute'),
  linearUnit(4.54609, 'UK gpm', 'UK gallon per minute'),
];
const flowMassUnits = [
  linearUnit(1, 'kg/s', 'kilogram per second'),
  linearUnit(2.20462, 'lb/s', 'pound per second'),
];

// Angle (Global)
const angleGlobalUnits = [
  linearUnit(1, 'degree', 'degree'),
  linearUnit(0.0174533, 'radian', 'radian'),
  linearUnit(1, 'grad', 'gradian'),
  linearUnit(0.57296, '% slope', 'percent slope'),
  linearUnit(1, 'ratio', 'ratio (1 in n)'),
  linearUnit(1, 'tangent', 'tangent'),
];

// Slope/Gradient (Global)
const slopeGlobalUnits = [
  linearUnit(1, 'rise/run', 'rise/run'),
  linearUnit(1, '%', 'percent'),
  linearUnit(1, 'degree', 'degree'),
  linearUnit(1, 'ratio', 'ratio (1:n)'),
  linearUnit(1, 'mm/m', 'millimeter per meter'),
];

// Temperature (Global)
const temperatureGlobalUnits = [
  linearUnit(1, '°C', 'Celsius'),
  linearUnit(33.8, '°F', 'Fahrenheit'),
  linearUnit(274.15, 'K', 'Kelvin'),
  linearUnit(493.47, '°R', 'Rankine'),
];

// Speed (Global)
const speedGlobalUnits = [
  linearUnit(1, 'm/s', 'meter per second'),
  linearUnit(3.6, 'km/h', 'kilometer per hour'),
  linearUnit(3.28084, 'ft/s', 'foot per second'),
  linearUnit(2.23694, 'mph', 'mile per hour'),
  linearUnit(1.852, 'knot', 'knot'),
];
import { Converter, linearUnit, makeConverter, temperatureUnits } from '../convert'

// Length (grouped for tabs: Global, Indian, Nepali)
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
];

const lengthIndianUnits = [
  linearUnit(0.01905, 'angul', 'angul'),
  linearUnit(0.4572, 'hath', 'hath'),
  linearUnit(0.9144, 'gaj', 'gaj'),
  linearUnit(3.6576, 'danda', 'danda'),
  linearUnit(3200, 'kos', 'kos'),
];

const lengthNepaliUnits = [
  linearUnit(0.4572, 'haat', 'haat'),
  linearUnit(3.048, 'danda', 'danda'),
  linearUnit(3200, 'kos', 'kos'),
];

// Area (grouped for tabs: Global, Indian, Nepali)
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
];
const areaIndianUnits = [
  linearUnit(126.44, 'bigha', 'bigha'),
  linearUnit(16.93, 'katha', 'katha'),
  linearUnit(3.3445, 'dhur', 'dhur'),
  linearUnit(505.857, 'kanal', 'kanal'),
  linearUnit(25.2929, 'marla', 'marla'),
  linearUnit(203.0, 'ground', 'ground'),
  linearUnit(101.17, 'guntha', 'guntha'),
  linearUnit(0.836127, 'gaj', 'gaj'),
];
const areaNepaliUnits = [
  linearUnit(508.72, 'ropani', 'ropani'),
  linearUnit(31.80, 'aana', 'aana'),
  linearUnit(7.95, 'paisa', 'paisa'),
  linearUnit(1.99, 'dam', 'dam'),
  linearUnit(6772.63, 'bigha', 'bigha'),
  linearUnit(338.63, 'kattha', 'kattha'),
  linearUnit(16.93, 'dhur', 'dhur'),
];

// Volume (grouped for tabs: Global, Indian, Nepali)
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
];
const volumeIndianUnits = [
  linearUnit(0.9331, 'seer', 'seer'),
  linearUnit(37.3242, 'maund', 'maund'),
  linearUnit(0.0116638, 'tola', 'tola'),
  linearUnit(0.005, 'pathi', 'pathi'),
  linearUnit(0.000625, 'mana', 'mana'),
];
const volumeNepaliUnits = [
  linearUnit(0.00125, 'mana', 'mana'),
  linearUnit(0.01, 'pathi', 'pathi'),
  linearUnit(0.2, 'muri', 'muri'),
];

// Mass (base: kilogram)
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
];
const massIndianUnits = [
  linearUnit(0.0116638, 'tola', 'tola'),
  linearUnit(0.000121, 'ratti', 'ratti'),
  linearUnit(0.014579, 'chatank', 'chatank'),
  linearUnit(0.9331, 'seer', 'seer'),
  linearUnit(37.3242, 'maund', 'maund'),
];
const massNepaliUnits = [
  linearUnit(0.0116638, 'tola', 'tola'),
  linearUnit(0.5, 'pau', 'pau'),
  linearUnit(0.0125, 'chatak', 'chatak'),
  linearUnit(2, 'dharni', 'dharni'),
];

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
  {
    slug: 'length',
    title: 'Length',
    category: 'Measure',
    groups: [
      { name: 'Global', units: lengthGlobalUnits },
      { name: 'Indian', units: lengthIndianUnits },
      { name: 'Nepali', units: lengthNepaliUnits },
    ],
    examples: [
      '1 meter = 1000 millimeters = 100 centimeters = 0.001 kilometers',
      '1 meter = 39.3701 inches = 3.28084 feet = 1.09361 yards',
      '1 hath ≈ 18 inches ≈ 1.5 feet ≈ 0.4572 meters',
      '1 gaj ≈ 3 feet ≈ 0.9144 meters',
      '1 haat ≈ 1.5 feet ≈ 0.4572 meters',
      '1 danda ≈ 16.5 feet ≈ 5.0292 meters',
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
    examples: [
      '1 square meter = 10000 square millimeters = 10000 square centimeters',
      '1 square meter = 10.7639 square feet = 1.19599 square yards',
      '1 bigha (varies by state) ≈ 20,000 to 40,000 square feet',
      '1 katha ≈ 720 square feet ≈ 66.89 square meters',
      '1 ropani = 16 aana = 0.5086 acres ≈ 2,500 square feet',
      '1 aana = 0.03125 ropani = 156.25 square feet',
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
    examples: [
      '1 cubic meter = 1000 liters = 1,000,000 milliliters',
      '1 cubic meter = 35.3147 cubic feet = 1,307.95 cubic yards',
      '1 seer ≈ 0.9331 kilograms',
      '1 maund ≈ 37.3242 kilograms',
      '1 mana ≈ 1.3 kilograms',
      '1 pathi ≈ 22.5 kilograms',
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
    examples: [
      '1 kilogram = 1000 grams = 1,000,000 milligrams',
      '1 kilogram = 2.20462 pounds = 0.157473 stone',
      '1 tola ≈ 11.6638 grams',
      '1 chatank ≈ 9.31 grams',
      '1 pau ≈ 0.5 kilograms',
    ],
  },
  {
    slug: 'currency',
    title: 'Currency',
    category: 'Currency',
    groups: [
      { name: 'Global', units: currencyGlobalUnits },
    ],
    examples: [
      '1 USD ≈ 0.85 EUR ≈ 0.75 GBP ≈ 110 JPY ≈ 6.45 CNY ≈ 1.35 AUD ≈ 1.25 CAD ≈ 75 INR ≈ 120 NPR',
    ],
  },
  {
    slug: 'date',
    title: 'Date Converter (BS ↔ AD)',
    category: 'Properties',
    groups: [
      { name: 'English To Nepali', units: [
        { name: 'Year', symbol: 'ad-year', toBase: v => v, fromBase: v => v },
        { name: 'Month', symbol: 'ad-month', toBase: v => v, fromBase: v => v },
        { name: 'Date', symbol: 'ad-date', toBase: v => v, fromBase: v => v },
      ] },
      { name: 'Nepali To English', units: [
        { name: 'Year', symbol: 'bs-year', toBase: v => v, fromBase: v => v },
        { name: 'Month', symbol: 'bs-month', toBase: v => v, fromBase: v => v },
        { name: 'Date', symbol: 'bs-date', toBase: v => v, fromBase: v => v },
      ] },
    ],
    examples: [
      'English To Nepali: 7 September 2025 → 23 Ashadh 2064',
      'Nepali To English: 2064 Ashadh 23 → 7 September 2025',
    ],
  },
  {
    slug: 'pressure',
    title: 'Pressure / Stress',
    category: 'Properties',
    groups: [
      { name: 'Global', units: pressureGlobalUnits },
    ],
    examples: [
      '1 pascal = 1 newton per square meter',
      '1 bar = 100,000 pascals = 0.986923 atm',
    ],
  },
  {
    slug: 'force',
    title: 'Force',
    category: 'Properties',
    groups: [
      { name: 'Global', units: forceGlobalUnits },
    ],
    examples: [
      '1 newton = 0.1019716 kilogram-force = 0.224809 pound-force',
      '1 kilogram-force = 9.80665 newtons',
    ],
  },
  {
    slug: 'energy',
    title: 'Energy / Work',
    category: 'Properties',
    groups: [
      { name: 'Global', units: energyGlobalUnits },
    ],
    examples: [
      '1 joule = 0.000278 kilowatt-hours = 0.0009478 BTU',
      '1 kilocalorie = 4184 joules',
    ],
  },
  {
    slug: 'power',
    title: 'Power',
    category: 'Properties',
    groups: [
      { name: 'Global', units: powerGlobalUnits },
    ],
    examples: [
      '1 watt = 1 joule per second',
      '1 horsepower = 745.7 watts',
      '1 ton of refrigeration = 3.517 kW',
    ],
  },
  {
    slug: 'density',
    title: 'Density / Unit Weight',
    category: 'Properties',
    groups: [
      { name: 'Global', units: densityGlobalUnits },
    ],
    examples: [
      '1 kilogram per cubic meter = 0.001 gram per cubic centimeter',
      '1 kilogram per cubic meter = 0.06243 pound per cubic foot',
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
    examples: [
      '1 cubic meter per second = 1000 liters per second = 60,000 liters per minute',
      '1 cubic foot per second = 28.3168 liters per second',
      '1 kilogram per second = 2.20462 pounds per second',
    ],
  },
  {
    slug: 'angle',
    title: 'Angle',
    category: 'Properties',
    groups: [
      { name: 'Global', units: angleGlobalUnits },
    ],
    examples: [
      '1 degree = 0.0174533 radians = 100 gradians',
      '1% slope = 0.57296 degrees',
    ],
  },
  {
    slug: 'slope',
    title: 'Slope / Gradient',
    category: 'Properties',
    groups: [
      { name: 'Global', units: slopeGlobalUnits },
    ],
    examples: [
      '1% slope = 1 meter rise per 100 meters run',
      '1 degree = 1.74533% slope',
    ],
  },
  {
    slug: 'temperature',
    title: 'Temperature',
    category: 'Properties',
    groups: [
      { name: 'Global', units: temperatureGlobalUnits },
    ],
    examples: [
      '°F = (°C × 9/5) + 32',
      'K = °C + 273.15',
    ],
  },
  {
    slug: 'speed',
    title: 'Speed',
    category: 'Properties',
    groups: [
      { name: 'Global', units: speedGlobalUnits },
    ],
    examples: [
      '1 meter per second = 3.6 kilometers per hour = 3.28084 feet per second',
      '1 knot = 1.852 kilometers per hour',
    ],
  },


]

export const categories = [
  'Measure','Nepali','Properties','Currency'
]





