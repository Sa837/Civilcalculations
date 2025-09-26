import { Converter } from '../convert'
import { lengthConverter } from './converters/length'
import { areaConverter } from './converters/area'
import { volumeConverter } from './converters/volume'
import { massConverter } from './converters/mass'
import { speedConverter } from './converters/speed'
import { temperatureConverter } from './converters/temperature'
import { pressureConverter } from './converters/pressure'
import { forceConverter } from './converters/force'
import { energyConverter } from './converters/energy'
import { powerConverter } from './converters/power'
import { densityConverter } from './converters/density'
import { flowRateConverter } from './converters/flow-rate'
import { angleConverter } from './converters/angle'
import { slopeConverter } from './converters/slope'
import { timeConverter } from './converters/time'
import { currencyConverter } from './converters/currency'

// =========================
// Export Converters
// =========================
export const converters: Converter[] = [
  // Modularized converters (imported)
  lengthConverter,
  areaConverter,
  volumeConverter,
  massConverter,
  {
    slug: "date",
    title: "Date Converter (AD ↔ BS)",
    category: "Properties",
    groups: [], // handled in ConverterDetail (AD ↔ BS logic)
  },
  currencyConverter,
  pressureConverter,
  forceConverter,
  energyConverter,
  powerConverter,
  densityConverter,
  flowRateConverter,
  temperatureConverter,
  speedConverter,
  angleConverter,
  slopeConverter,
  timeConverter,
  
]
