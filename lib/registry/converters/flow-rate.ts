import { Converter, linearUnit } from '../../convert'

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

export const flowRateConverter: Converter = {
  slug: 'flow-rate',
  title: 'Flow Rate',
  category: 'Properties',
  groups: [
    { name: 'Volumetric', units: flowVolumetricUnits },
    { name: 'Mass', units: flowMassUnits },
  ],
}
