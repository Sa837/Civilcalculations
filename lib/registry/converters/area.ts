import { Converter, linearUnit } from '../../convert'

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

export const areaConverter: Converter = {
  slug: 'area',
  title: 'Area',
  category: 'Measure',
  groups: [
    { name: 'Global', units: areaGlobalUnits },
    { name: 'Indian', units: areaIndianUnits },
    { name: 'Nepali', units: areaNepaliUnits },
  ],
}
