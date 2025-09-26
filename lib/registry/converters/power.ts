import { Converter, linearUnit } from '../../convert'

const powerGlobalUnits = [
  linearUnit(1, 'W', 'watt'),
  linearUnit(1000, 'kW', 'kilowatt'),
  linearUnit(1_000_000, 'MW', 'megawatt'),
  linearUnit(1_000_000_000, 'GW', 'gigawatt'),
  linearUnit(745.7, 'hp', 'horsepower'),
  linearUnit(3517, 'TR', 'ton of refrigeration'),
]

export const powerConverter: Converter = {
  slug: 'power',
  title: 'Power',
  category: 'Properties',
  groups: [
    { name: 'Global', units: powerGlobalUnits },
  ],
}
