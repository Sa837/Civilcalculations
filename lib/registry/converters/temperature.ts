import { Converter, linearUnit } from '../../convert'

const temperatureGlobalUnits = [
  linearUnit(1, '°C', 'Celsius'),
  linearUnit(33.8, '°F', 'Fahrenheit'),
  linearUnit(274.15, 'K', 'Kelvin'),
  linearUnit(493.47, '°R', 'Rankine'),
]

export const temperatureConverter: Converter = {
  slug: 'temperature',
  title: 'Temperature',
  category: 'Properties',
  groups: [
    { name: 'Global', units: temperatureGlobalUnits },
  ],
}
