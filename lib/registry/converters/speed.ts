import { Converter, linearUnit } from '../../convert'

const speedGlobalUnits = [
  linearUnit(1, 'm/s', 'meter per second'),
  linearUnit(3.6, 'km/h', 'kilometer per hour'),
  linearUnit(3.28084, 'ft/s', 'foot per second'),
  linearUnit(2.23694, 'mph', 'mile per hour'),
  linearUnit(1.852, 'knot', 'knot'),
]

export const speedConverter: Converter = {
  slug: 'speed',
  title: 'Speed',
  category: 'Properties',
  groups: [
    { name: 'Global', units: speedGlobalUnits },
  ],
}
