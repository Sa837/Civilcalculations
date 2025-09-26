import { Converter, linearUnit } from '../../convert'

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

export const lengthConverter: Converter = {
  slug: 'length',
  title: 'Length',
  category: 'Measure',
  groups: [
    { name: 'Global', units: lengthGlobalUnits },
    { name: 'Indian', units: lengthIndianUnits },
    { name: 'Nepali', units: lengthNepaliUnits },
  ],
}
