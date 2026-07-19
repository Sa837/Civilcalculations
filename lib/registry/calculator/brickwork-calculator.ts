// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\calculator\brickwork-calculator.ts
import { DENSITIES, UnitConverter, UNIT_PRESETS } from '../globalunits'
import { CalculationUtils } from '../utils'
import { CONCRETE_MIX_TYPES } from './concrete-calculator'

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

// A lintel/sill is an RCC beam-like member spanning an opening (or sitting
// below a window). It replaces brick masonry over/under the opening, so its
// volume is deducted from the brickwork and its own concrete + rebar are
// calculated separately (same mix-ratio math as the Concrete Calculator).
export interface LintelInput {
  name?: string
  kind?: 'lintel' | 'sill'
  spanWidth: number // usually the opening width this member covers
  bearingEachSide: number // extra length resting on the wall, each side
  depth: number // thickness/depth of the RCC member
  unitSystem: 'metric' | 'imperial'
  mainBarCount?: number
  mainBarDiaMm?: number
  stirrupDiaMm?: number
  stirrupSpacingMm?: number
  clearCoverMm?: number
}

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

  // Lintels / sills (RCC members that replace brick masonry locally)
  lintels?: LintelInput[]
  lintelMixType?: string
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
  // Lintel / sill results
  totalLintelVolume: number
  lintelConcreteVolume: number
  lintelCementWeight: number
  lintelCementBags: number
  lintelSandWeight: number
  lintelAggregateWeight: number
  lintelSteelWeight: number
  lintelMixRatio: string
}

// Mirrors ConcreteProjectItem/ConcreteProjectSummary so the Brickwork
// Calculator can offer the same "building estimate" workflow (multiple
// components, per-material rates, running totals, export) as the Concrete
// Calculator.
export interface BrickworkProjectItem {
  id: string
  name: string
  input: BrickworkCalculationInput
  result: BrickworkCalculationResult
  brickRate?: number // per piece
  cementRate?: number // per bag
  sandRate?: number // per kg (or per unit the user prices sand in)
  concreteRate?: number // per m³, applied to lintel/sill concrete
  steelRate?: number // per kg, applied to lintel/sill rebar
}

export interface BrickworkProjectSummary {
  items: Array<{
    id: string
    name: string
    numberOfBricks: number
    cementWeight: number
    cementBags: number
    sandWeight: number
    lintelConcreteVolume: number
    lintelSteelWeight: number
    brickAmount: number
    cementAmount: number
    sandAmount: number
    concreteAmount: number
    steelAmount: number
    totalAmount: number
  }>
  totalBricks: number
  totalCementWeight: number
  totalCementBags: number
  totalSandWeight: number
  totalLintelConcreteVolume: number
  totalLintelSteelWeight: number
  totalBrickAmount: number
  totalCementAmount: number
  totalSandAmount: number
  totalConcreteAmount: number
  totalSteelAmount: number
  totalAmount: number
  reportText: string
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
      lintels = [],
      lintelMixType,
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

    // ---- Lintel / Sill: concrete + rebar, deducted from brick masonry ----
    // dimensions.height already holds the normalized wall thickness (metres),
    // since wallThickness was passed into the "height" slot above.
    const wallThicknessM = dimensions.height!
    const steelDensity = DENSITIES.steel ?? 7850

    let totalLintelVolumeM3 = 0
    let lintelSteelWeightKg = 0

    lintels.forEach((lintel) => {
      if (!lintel.spanWidth || !lintel.depth) return

      const lintelLengthUnit = lintel.unitSystem === 'metric' ? 'm' : 'ft'
      const spanM = UnitConverter.convertLength(
        lintel.spanWidth + 2 * (lintel.bearingEachSide || 0),
        lintelLengthUnit,
        'm',
      )
      const depthM = UnitConverter.convertLength(lintel.depth, lintelLengthUnit, 'm')
      const breadthM = wallThicknessM

      if (spanM <= 0 || depthM <= 0 || breadthM <= 0) return

      const volumeM3 = spanM * depthM * breadthM
      totalLintelVolumeM3 += volumeM3

      // Longitudinal (main) bars
      const coverM = (lintel.clearCoverMm ?? 25) / 1000
      if (lintel.mainBarCount && lintel.mainBarDiaMm) {
        const barLengthM = Math.max(0.1, spanM - 2 * coverM)
        const radiusM = lintel.mainBarDiaMm / 1000 / 2
        const barVolumeM3 = Math.PI * radiusM * radiusM * barLengthM
        lintelSteelWeightKg += barVolumeM3 * steelDensity * lintel.mainBarCount
      }

      // Stirrups
      if (lintel.stirrupDiaMm && lintel.stirrupSpacingMm) {
        const spacingM = lintel.stirrupSpacingMm / 1000
        const stirrupCount = Math.max(2, Math.ceil(spanM / spacingM) + 1)
        const perimeterM = Math.max(0.1, 2 * (breadthM + depthM) + 0.1)
        const radiusM = lintel.stirrupDiaMm / 1000 / 2
        const stirrupVolumeM3 = Math.PI * radiusM * radiusM * perimeterM
        lintelSteelWeightKg += stirrupVolumeM3 * steelDensity * stirrupCount
      }
    })

    if (totalLintelVolumeM3 > netWallVolumeM3) {
      throw new Error('Lintel/sill volume exceeds the net wall volume. Check dimensions.')
    }

    // This portion is concrete, not brick masonry, so remove it from the
    // volume that bricks & mortar get calculated against.
    const netWallVolumeAfterLintelM3 = Math.max(0, netWallVolumeM3 - totalLintelVolumeM3)

    const lintelMixValue = lintelMixType || 'M15'
    const selectedLintelMix =
      CONCRETE_MIX_TYPES.find((m) => m.value === lintelMixValue) ||
      CONCRETE_MIX_TYPES.find((m) => m.value === 'M15')!

    const lintelMaterials =
      totalLintelVolumeM3 > 0
        ? CalculationUtils.calculateConcreteMaterials(
            totalLintelVolumeM3,
            {
              cement: selectedLintelMix.ratios.cement,
              sand: selectedLintelMix.ratios.sand,
              aggregate: selectedLintelMix.ratios.aggregate,
            },
            wastageFactor,
          )
        : { cementWeight: 0, cementBags: 0, sandWeight: 0, aggregateWeight: 0, dryVolume: 0, waterVolume: 0 }

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

    // Calculate number of bricks and mortar volume (net of openings AND lintels/sills)
    let numberOfBricks = netWallVolumeAfterLintelM3 / brickVolumeWithMortarM3
    const mortarVolumeM3 = netWallVolumeAfterLintelM3 - numberOfBricks * brickVolumeWithoutMortarM3

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
      netWallVolume: netWallVolumeAfterLintelM3,
      totalOpeningVolume: totalOpeningVolumeM3,
      totalLintelVolume: totalLintelVolumeM3,
      lintelConcreteVolume: totalLintelVolumeM3,
      lintelCementWeight: lintelMaterials.cementWeight,
      lintelCementBags: Math.ceil(lintelMaterials.cementBags || 0),
      lintelSandWeight: lintelMaterials.sandWeight,
      lintelAggregateWeight: lintelMaterials.aggregateWeight,
      lintelSteelWeight: lintelSteelWeightKg,
    }, {
      numberOfBricks: 0,
      cementWeight: 1,
      cementBags: 0,
      sandWeight: 1,
      mortarVolume: 3,
      wallVolume: 3,
      netWallVolume: 3,
      totalOpeningVolume: 3,
      totalLintelVolume: 3,
      lintelConcreteVolume: 3,
      lintelCementWeight: 1,
      lintelCementBags: 0,
      lintelSandWeight: 1,
      lintelAggregateWeight: 1,
      lintelSteelWeight: 2,
    })

    return {
      ...results,
      lintelMixRatio: `${selectedLintelMix.ratios.cement}:${selectedLintelMix.ratios.sand}:${selectedLintelMix.ratios.aggregate}`,
    }
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

  // Combines multiple saved calculations into one building estimate, applying
  // per-material rates. Same shape/behaviour as ConcreteCalculator.summarizeProject.
  static summarizeProject(items: BrickworkProjectItem[]): BrickworkProjectSummary {
    const summaryItems = items.map((item) => {
      const brickAmount = (item.brickRate ?? 0) * item.result.numberOfBricks
      const cementAmount = (item.cementRate ?? 0) * item.result.cementBags
      const sandAmount = (item.sandRate ?? 0) * item.result.sandWeight
      const concreteAmount = (item.concreteRate ?? 0) * (item.result.lintelConcreteVolume ?? 0)
      const steelAmount = (item.steelRate ?? 0) * (item.result.lintelSteelWeight ?? 0)
      const totalAmount = brickAmount + cementAmount + sandAmount + concreteAmount + steelAmount

      return {
        id: item.id,
        name: item.name,
        numberOfBricks: item.result.numberOfBricks,
        cementWeight: item.result.cementWeight,
        cementBags: item.result.cementBags,
        sandWeight: item.result.sandWeight,
        lintelConcreteVolume: item.result.lintelConcreteVolume ?? 0,
        lintelSteelWeight: item.result.lintelSteelWeight ?? 0,
        brickAmount,
        cementAmount,
        sandAmount,
        concreteAmount,
        steelAmount,
        totalAmount,
      }
    })

    const sum = (key: keyof (typeof summaryItems)[number]) =>
      summaryItems.reduce((total, item) => total + (item[key] as number), 0)

    const totalBricks = sum('numberOfBricks')
    const totalCementWeight = sum('cementWeight')
    const totalCementBags = sum('cementBags')
    const totalSandWeight = sum('sandWeight')
    const totalLintelConcreteVolume = sum('lintelConcreteVolume')
    const totalLintelSteelWeight = sum('lintelSteelWeight')
    const totalBrickAmount = sum('brickAmount')
    const totalCementAmount = sum('cementAmount')
    const totalSandAmount = sum('sandAmount')
    const totalConcreteAmount = sum('concreteAmount')
    const totalSteelAmount = sum('steelAmount')
    const totalAmount =
      totalBrickAmount + totalCementAmount + totalSandAmount + totalConcreteAmount + totalSteelAmount

    const reportText = [
      'Brickwork Building Estimate Report',
      '==============================',
      `Total bricks: ${totalBricks.toLocaleString()} pcs`,
      `Total cement: ${totalCementWeight.toFixed(1)} kg (${totalCementBags.toFixed(2)} bags)`,
      `Total sand: ${totalSandWeight.toFixed(1)} kg`,
      `Total lintel/sill concrete: ${totalLintelConcreteVolume.toFixed(3)} m³`,
      `Total lintel/sill steel: ${totalLintelSteelWeight.toFixed(2)} kg`,
      `Total brick amount: ${totalBrickAmount.toFixed(2)}`,
      `Total cement amount: ${totalCementAmount.toFixed(2)}`,
      `Total sand amount: ${totalSandAmount.toFixed(2)}`,
      `Total concrete amount: ${totalConcreteAmount.toFixed(2)}`,
      `Total steel amount: ${totalSteelAmount.toFixed(2)}`,
      `Grand total amount: ${totalAmount.toFixed(2)}`,
      '',
      'Component breakdown:',
      ...summaryItems.map(
        (item) =>
          `- ${item.name}: ${item.numberOfBricks.toLocaleString()} bricks | ${item.cementBags.toFixed(1)} cement bags | ${item.lintelConcreteVolume.toFixed(3)} m³ lintel concrete | ${item.totalAmount.toFixed(2)}`,
      ),
    ].join('\n')

    return {
      items: summaryItems,
      totalBricks,
      totalCementWeight,
      totalCementBags,
      totalSandWeight,
      totalLintelConcreteVolume,
      totalLintelSteelWeight,
      totalBrickAmount,
      totalCementAmount,
      totalSandAmount,
      totalConcreteAmount,
      totalSteelAmount,
      totalAmount,
      reportText,
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