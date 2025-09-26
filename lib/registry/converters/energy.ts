import { Converter, linearUnit } from '../../convert'

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

export const energyConverter: Converter = {
  slug: 'energy',
  title: 'Energy / Work',
  category: 'Properties',
  groups: [
    { name: 'Global', units: energyGlobalUnits },
  ],
}
