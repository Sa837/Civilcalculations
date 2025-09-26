import { Converter, linearUnit } from '../../convert'

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

export const timeConverter: Converter = {
  slug: 'time',
  title: 'Time / Date',
  category: 'Properties',
  groups: [
    { name: 'Global', units: timeGlobalUnits },
    { name: 'Nepali', units: timeNepaliUnits },
  ],
}
