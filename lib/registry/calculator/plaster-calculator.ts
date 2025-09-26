// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\calculator\plaster-calculator.ts
import { UnitConverter } from '../globalunits'
import { CalculationUtils } from '../utils'

export interface PlasterCalculationInput {
  length?: number
  height?: number
  area?: number
  thickness: number // in mm or inches depending on unitSystem (we normalize)
  unitSystem: 'metric' | 'imperial'
  useArea: boolean
}

export interface PlasterCalculationResult {
  plasterVolume: number // dry volume (m3)
  cementBags: number
  sandWeight: number // kg
}

export class PlasterCalculator {
  static calculate(input: PlasterCalculationInput): PlasterCalculationResult {
    const { length, height, area, thickness, unitSystem, useArea } = input

    // Validate
    CalculationUtils.validatePositive(thickness, 'Thickness')
    if (useArea) {
      if (area === undefined) throw new Error('Area is required in area mode')
      CalculationUtils.validatePositive(area, 'Area')
    } else {
      if (length === undefined || height === undefined) throw new Error('Length and height are required')
      CalculationUtils.validatePositive(length, 'Length')
      CalculationUtils.validatePositive(height, 'Height')
    }

    // Normalize dimensions to meters and area to m2
    const dims = CalculationUtils.normalizeDimensions(
      { length, width: height, area },
      unitSystem
    )

    // Thickness to meters (input uses mm in metric UI by design). If imperial, assume inches.
    const thicknessM = (unitSystem === 'metric'
      ? CalculationUtils.roundTo(thickness / 1000, 6)
      : UnitConverter.convertBrickDimension(thickness, 'in', 'mm') / 1000)

    // Area m2
    const areaM2 = useArea && dims.area !== undefined
      ? dims.area!
      : CalculationUtils.calculateRectangularArea(dims.length!, dims.width!)

    // Wet to dry factor ~1.27 (kept as in UI)
    const wetVolume = areaM2 * thicknessM
    const dryVolume = wetVolume * 1.27

    // Mix implied from UI constants: total parts = 7, cement 1.5, sand 5.5
    const cementWeight = (dryVolume / 7) * 1.5 * 1440 // kg/m3
    const sandWeight = (dryVolume / 7) * 5.5 * 1450 // kg/m3
    const cementBags = cementWeight / 50

    return {
      plasterVolume: CalculationUtils.roundTo(dryVolume, 3),
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
    }
  }
}
