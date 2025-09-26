import { Converter, linearUnit } from '../../convert'

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

export const currencyConverter: Converter = {
  slug: 'currency',
  title: 'Currency',
  category: 'Currency',
  groups: [
    { name: 'Global', units: currencyGlobalUnits },
  ],
}
