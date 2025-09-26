// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\calculator\brickwork-calculator.ts
import { DENSITIES, UnitConverter, UNIT_PRESETS } from '../globalunits'
import { CalculationUtils } from '../utils'

export const STANDARD_BRICK_SIZES = [
  {
    value: '240x115x57',
    label: 'Nepal Brick (240×115×57mm)',
    length: 240,
    width: 115,
    height: 57,
    region: 'Nepal',
  },
  {
    value: '190x90x90',
    label: 'Indian Brick (190×90×90mm)',
    length: 190,
    width: 90,
    height: 90,
    region: 'India',
  },
  {
    value: '194x92x57',
    label: 'US Modular Brick (194×92×57mm)',
    length: 194,
    width: 92,
    height: 57,
    region: 'USA',
  },
  {
    value: '203x92x57',
    label: 'US Standard Brick (203×92×57mm)',
    length: 203,
    width: 92,
    height: 57,
    region: 'USA',
  },
  {
    value: '215x102.5x65',
    label: 'UK Standard Brick (215×102.5×65mm)',
    length: 215,
    width: 102.5,
    height: 65,
    region: 'UK',
  },
  {
    value: '215x102.5x65',
    label: 'UK Engineering Brick (215×102.5×65mm)',
    length: 215,
    width: 102.5,
    height: 65,
    region: 'UK',
  },
  {
    value: '240x115x71',
    label: 'European Modular Brick (240×115×71mm)',
    length: 240,
    width: 115,
    height: 71,
    region: 'Europe',
  },
  {
    value: '390x190x190',
    label: 'European Concrete Brick (390×190×190mm)',
    length: 390,
    width: 190,
    height: 190,
    region: 'Europe',
  },
]

export const MORTAR_MIX_TYPES = [
  { value: '1:6', label: 'Non-load bearing (1:6)', cement: 1, sand: 6 },
  { value: '1:5', label: 'General purpose (1:5)', cement: 1, sand: 5 },
  { value: '1:4', label: 'Load bearing (1:4)', cement: 1, sand: 4 },
  { value: '1:3', label: 'High strength (1:3)', cement: 1, sand: 3 },
]

export interface BrickworkCalculationInput {
  // Wall dimensions
  wallLength?: number
  wallHeight?: number
  wallArea?: number
  wallThickness: number
  wallThicknessType: 'custom' | '4inch' | '9inch'

  // Brick dimensions
  brickLength: number
  brickWidth: number
  brickHeight: number
  brickSizeType: 'standard' | 'custom'
  standardBrickSize: string

  // Mortar settings
  mortarThickness: number
  mortarMixType: string
  wastageFactor: number

  // Units
  unitSystem: 'metric' | 'imperial'

  // Openings
  openings: Array<{
    width: number
    height: number
    unitSystem: 'metric' | 'imperial'
  }>
}

export interface BrickworkCalculationResult {
  numberOfBricks: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  mortarVolume: number
  wallVolume: number
  netWallVolume: number
  totalOpeningVolume: number
}

export class BrickworkCalculator {
  static calculate(input: BrickworkCalculationInput): BrickworkCalculationResult {
    const {
      wallLength,
      wallHeight,
      wallArea,
      wallThickness,
      brickLength,
      brickWidth,
      brickHeight,
      mortarThickness,
      mortarMixType,
      wastageFactor,
      unitSystem,
      openings,
    } = input

    // Validate inputs
    CalculationUtils.validatePositive(wallThickness, 'Wall thickness')
    CalculationUtils.validatePositive(brickLength, 'Brick length')
    CalculationUtils.validatePositive(brickWidth, 'Brick width')
    CalculationUtils.validatePositive(brickHeight, 'Brick height')
    CalculationUtils.validatePositive(mortarThickness, 'Mortar thickness')

    // Convert all inputs to metric system for calculation
    const lengthUnit = unitSystem === 'metric' ? 'm' : 'ft'
    const brickUnit = unitSystem === 'metric' ? 'mm' : 'in'

    // Normalize dimensions
    const dimensions = CalculationUtils.normalizeDimensions({
      length: wallLength,
      width: wallHeight, // Using height as width for wall calculation
      height: wallThickness,
      area: wallArea
    }, unitSystem)

    // Calculate wall volume
    let wallVolumeM3: number
    if (wallArea) {
      wallVolumeM3 = CalculationUtils.calculateVolumeFromArea(dimensions.area!, dimensions.height!)
    } else {
      wallVolumeM3 = CalculationUtils.calculateVolume(dimensions.length!, dimensions.width!, dimensions.height!)
    }

    // Convert brick dimensions to meters
    const brickLengthM = UnitConverter.convertBrickDimension(brickLength, brickUnit as 'mm' | 'in', 'mm') / 1000
    const brickWidthM = UnitConverter.convertBrickDimension(brickWidth, brickUnit as 'mm' | 'in', 'mm') / 1000
    const brickHeightM = UnitConverter.convertBrickDimension(brickHeight, brickUnit as 'mm' | 'in', 'mm') / 1000

    // Convert mortar thickness to meters
    const mortarThicknessM = UnitConverter.convertBrickDimension(mortarThickness, brickUnit as 'mm' | 'in', 'mm') / 1000

    // Normalize openings and calculate net volume
    const normalizedOpenings = CalculationUtils.normalizeOpenings(openings, unitSystem)
    const totalOpeningVolumeM3 = CalculationUtils.calculateOpeningsVolume(normalizedOpenings, dimensions.height!)
    const netWallVolumeM3 = CalculationUtils.calculateNetVolume(wallVolumeM3, normalizedOpenings, dimensions.height!)

    // Get mortar mix ratio
    const mixType = MORTAR_MIX_TYPES.find((m) => m.value === mortarMixType)
    if (!mixType) {
      throw new Error(`Invalid mortar mix type: ${mortarMixType}`)
    }

    CalculationUtils.validateMixRatio({ cement: mixType.cement, sand: mixType.sand })

    // Calculate brick volumes
    const brickVolumeWithMortarM3 = CalculationUtils.calculateVolume(
      brickLengthM + mortarThicknessM,
      brickWidthM + mortarThicknessM,
      brickHeightM + mortarThicknessM
    )
    const brickVolumeWithoutMortarM3 = CalculationUtils.calculateVolume(brickLengthM, brickWidthM, brickHeightM)

    // Calculate number of bricks and mortar volume
    let numberOfBricks = netWallVolumeM3 / brickVolumeWithMortarM3
    const mortarVolumeM3 = netWallVolumeM3 - numberOfBricks * brickVolumeWithoutMortarM3

    if (mortarVolumeM3 <= 0) {
      throw new Error('Mortar volume calculated as zero or negative. Check dimensions.')
    }

    // Calculate materials using mix ratio
    const materials = CalculationUtils.calculateMaterialsFromMixRatio(
      mortarVolumeM3,
      { cement: mixType.cement, sand: mixType.sand },
      true // isDryVolume for mortar
    )

    // Apply wastage factor
    const finalMaterials = CalculationUtils.applyWastageToMaterials({
      numberOfBricks,
      cementWeight: materials.cementWeight,
      sandWeight: materials.sandWeight,
      mortarVolume: mortarVolumeM3
    }, wastageFactor)

    // Format results with appropriate rounding
    const results = CalculationUtils.formatCalculationResults({
      numberOfBricks: Math.ceil(finalMaterials.numberOfBricks),
      cementWeight: finalMaterials.cementWeight,
      cementBags: Math.ceil(CalculationUtils.calculateCementBags(finalMaterials.cementWeight)),
      sandWeight: finalMaterials.sandWeight,
      mortarVolume: finalMaterials.mortarVolume,
      wallVolume: wallVolumeM3,
      netWallVolume: netWallVolumeM3,
      totalOpeningVolume: totalOpeningVolumeM3,
    }, {
      numberOfBricks: 0,
      cementWeight: 1,
      cementBags: 0,
      sandWeight: 1,
      mortarVolume: 3,
      wallVolume: 3,
      netWallVolume: 3,
      totalOpeningVolume: 3,
    })

    return results
  }

  // Helper method to get default values for a unit system
  static getDefaultsForUnitSystem(unitSystem: 'metric' | 'imperial') {
    const presets = UNIT_PRESETS.brickwork[unitSystem]

    return {
      wallThickness: presets.defaultWallThickness,
      mortarThickness: presets.defaultMortarThickness,
      brickLength: unitSystem === 'metric' ? '240' : '9.45',
      brickWidth: unitSystem === 'metric' ? '115' : '4.53',
      brickHeight: unitSystem === 'metric' ? '71' : '2.80',
    }
  }

  // Helper method to convert brick dimensions between systems
  static convertBrickDimensions(
    dimensions: { length: string; width: string; height: string },
    fromSystem: 'metric' | 'imperial',
    toSystem: 'metric' | 'imperial',
  ) {
    if (fromSystem === toSystem) return dimensions

    const fromUnit = fromSystem === 'metric' ? 'mm' : 'in'
    const toUnit = toSystem === 'metric' ? 'mm' : 'in'

    return {
      length: UnitConverter.convertBrickDimension(
        parseFloat(dimensions.length),
        fromUnit,
        toUnit,
      ).toFixed(2),
      width: UnitConverter.convertBrickDimension(
        parseFloat(dimensions.width),
        fromUnit,
        toUnit,
      ).toFixed(2),
      height: UnitConverter.convertBrickDimension(
        parseFloat(dimensions.height),
        fromUnit,
        toUnit,
      ).toFixed(2),
    }
  }
}

// Legacy function for backward compatibility
export const computeBrickwork = (values: Record<string, number | string>) => {
  const input: BrickworkCalculationInput = {
    wallLength: Number(values.wallLength),
    wallHeight: Number(values.wallHeight),
    wallThickness: Number(values.wallThickness),
    wallThicknessType: values.wallThicknessType as 'custom' | '4inch' | '9inch',
    brickLength: Number(values.brickLength),
    brickWidth: Number(values.brickWidth),
    brickHeight: Number(values.brickHeight),
    brickSizeType: values.brickSizeType as 'standard' | 'custom',
    standardBrickSize: values.standardBrickSize as string,
    mortarThickness: Number(values.mortarThickness),
    mortarMixType: values.mortarMixType as string,
    wastageFactor: Number(values.wastageFactor),
    unitSystem: values.unit as 'metric' | 'imperial',
    openings: Array.isArray(values.openings)
      ? (values.openings as any[]).map((op) => ({
          width: Number(op.width),
          height: Number(op.height),
          unitSystem: op.unit as 'metric' | 'imperial',
        }))
      : [],
  }

  const result = BrickworkCalculator.calculate(input)

  // Include region for backward compatibility
  return {
    ...result,
    region: values.region,
  }
}
