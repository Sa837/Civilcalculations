// Logic module for stone masonry calculator
import { BaseCalculationInput, BaseCalculationResult } from './base'
import { CalculationUtils } from '../utils'
import { MORTAR_MIX_TYPES } from './brickwork-calculator'

const DENSITIES = { cement: 1440, sand: 1450, cementBag: 50 }

const DEFAULT_VOID_RATIO_PERCENT = 40
const DEFAULT_TIE_STONE_SPACING_M = 0.6
const DEFAULT_TIE_STONE_COURSE_SPACING_M = 0.6
const DEFAULT_COURSE_HEIGHT_M = 0.3

export type StoneWorkType =
  | 'wall_masonry'
  | 'boundary_wall'
  | 'wall_cladding'
  | 'slate_flooring'
  | 'stone_pitching'
  | 'dpc_course'
  | 'retaining_wall'

export interface StoneWorkTypeOption {
  value: StoneWorkType
  label: string
}

export const STONE_WORK_TYPES: StoneWorkTypeOption[] = [
  { value: 'wall_masonry', label: 'Wall Masonry' },
  { value: 'wall_cladding', label: 'Wall Cladding' },
  { value: 'slate_flooring', label: 'Slate Flooring' },
  { value: 'boundary_wall', label: 'Boundary Wall' },
  { value: 'stone_pitching', label: 'Stone Pitching' },
  { value: 'dpc_course', label: 'DPC Course' },
  { value: 'retaining_wall', label: 'Retaining Wall' },
]

export interface StoneMasonryOpeningInput {
  width: number
  height: number
  unitSystem: 'metric' | 'imperial'
}

export interface StoneMasonryInput extends BaseCalculationInput {
  workType: StoneWorkType
  unit: 'm' | 'ft'
  mortarMixType?: string
  wastageFactor?: number

  // Wall masonry / boundary wall
  length?: number
  height?: number
  thickness?: number
  openings?: StoneMasonryOpeningInput[]
  includeTieStones?: boolean
  tieStoneSpacingM?: number
  tieStoneCourseSpacingM?: number
  includeTopCapping?: boolean
  cappingWidth?: number
  cappingThickness?: number
  includeCornerStones?: boolean
  numberOfCorners?: number
  courseHeightM?: number

  // Wall cladding
  claddingLength?: number
  claddingHeight?: number
  claddingOpenings?: StoneMasonryOpeningInput[]
  claddingPieceLengthMm?: number
  claddingPieceWidthMm?: number
  claddingBeddingMm?: number

  // Slate / stone flooring
  floorLength?: number
  floorWidth?: number
  slatePieceLengthMm?: number
  slatePieceWidthMm?: number
  slateBeddingMm?: number

  // Stone pitching
  pitchingLength?: number
  pitchingSlopeHeight?: number
  pitchingThicknessMm?: number
  pitchingGrouted?: boolean

  // DPC / plinth course
  dpcLength?: number
  dpcThickness?: number
  dpcHeightMm?: number

  // Retaining wall
  retTopWidth?: number
  retBottomWidth?: number
  retHeight?: number
  retLength?: number
}

export interface StoneMasonryResult extends BaseCalculationResult {
  workType: StoneWorkType

  volume?: number
  wetVolume?: number
  netWetVolume?: number
  totalOpeningVolume?: number
  mortarMixRatio?: string

  stoneVolume?: number
  cementBags?: number
  sandWeight?: number
  mortarVolume?: number

  netArea?: number
  pieceCount?: number
  crossSectionArea?: number

  tieStoneCount?: number
  cappingVolume?: number
  cornerStoneCount?: number
}

export interface StoneMasonryProjectItem {
  id: string
  name: string
  workType: StoneWorkType
  input: StoneMasonryInput
  result: StoneMasonryResult
  stoneRate?: number // per m³
  cementRate?: number // per bag
  sandRate?: number // per kg
  pieceRate?: number // per piece
}

export interface StoneMasonryProjectSummary {
  items: Array<{
    id: string
    name: string
    workType: StoneWorkType
    stoneVolume: number
    cementBags: number
    sandWeight: number
    pieceCount: number
    stoneAmount: number
    cementAmount: number
    sandAmount: number
    pieceAmount: number
    totalAmount: number
  }>
  totalStoneVolume: number
  totalCementBags: number
  totalSandWeight: number
  totalPieceCount: number
  totalStoneAmount: number
  totalCementAmount: number
  totalSandAmount: number
  totalPieceAmount: number
  totalAmount: number
  reportText: string
}

function getMix(mortarMixType?: string) {
  return MORTAR_MIX_TYPES.find((m) => m.value === mortarMixType) || MORTAR_MIX_TYPES[1]
}

// Dry-volume method: given a net (wet) volume of mortar-bearing space, return
// cement bags + sand weight (kg) for the given mix, with wastage applied.
function computeMortarFromVolume(netVolumeM3: number, mortarMixType: string | undefined, wastageMultiplier: number) {
  const mix = getMix(mortarMixType)
  const totalParts = mix.cement + mix.sand
  const dryVolume = netVolumeM3 * 1.27
  const cementRaw = ((dryVolume * mix.cement) / totalParts) * DENSITIES.cement
  const sandRaw = ((dryVolume * mix.sand) / totalParts) * DENSITIES.sand
  return {
    mix,
    dryVolume,
    cementBags: (cementRaw * wastageMultiplier) / DENSITIES.cementBag,
    sandWeight: sandRaw * wastageMultiplier,
  }
}

export class StoneMasonryCalculatorLib {
  static calculate(input: StoneMasonryInput): StoneMasonryResult {
    switch (input.workType) {
      case 'wall_masonry':
      case 'boundary_wall':
        return this.calculateWallMasonry(input)
      case 'wall_cladding':
        return this.calculateWallCladding(input)
      case 'slate_flooring':
        return this.calculateSlateFlooring(input)
      case 'stone_pitching':
        return this.calculateStonePitching(input)
      case 'dpc_course':
        return this.calculateDpcCourse(input)
      case 'retaining_wall':
        return this.calculateRetainingWall(input)
      default:
        throw new Error(`Unsupported stone work type: ${input.workType}`)
    }
  }

  private static calculateWallMasonry(input: StoneMasonryInput): StoneMasonryResult {
    const {
      length = 0,
      height = 0,
      thickness = 0,
      unit,
      mortarMixType = '1:5',
      wastageFactor = 0,
      openings = [],
      includeTieStones = false,
      tieStoneSpacingM = DEFAULT_TIE_STONE_SPACING_M,
      tieStoneCourseSpacingM = DEFAULT_TIE_STONE_COURSE_SPACING_M,
      includeTopCapping = false,
      cappingWidth,
      cappingThickness,
      includeCornerStones = false,
      numberOfCorners = 2,
      courseHeightM = DEFAULT_COURSE_HEIGHT_M,
    } = input

    CalculationUtils.validatePositive(length, 'Length')
    CalculationUtils.validatePositive(height, 'Height')
    CalculationUtils.validatePositive(thickness, 'Thickness')

    const unitSystem: 'metric' | 'imperial' = unit === 'm' ? 'metric' : 'imperial'
    const dims = CalculationUtils.normalizeDimensions({ length, width: height }, unitSystem)
    const L = dims.length!
    const H = dims.width!
    const T = unit === 'm' ? thickness : thickness * 0.3048

    const wetVolume = L * H * T
    const normalizedOpenings = CalculationUtils.normalizeOpenings(openings, unitSystem)
    const totalOpeningVolume = CalculationUtils.calculateOpeningsVolume(normalizedOpenings, T)

    if (totalOpeningVolume > wetVolume) {
      throw new Error('Opening volume exceeds the gross wall volume. Check dimensions.')
    }

    const netWetVolume = Math.max(0, wetVolume - totalOpeningVolume)
    const wastageMultiplier = 1 + (wastageFactor || 0) / 100

    const { mix, cementBags, sandWeight } = computeMortarFromVolume(netWetVolume, mortarMixType, wastageMultiplier)

    const voidRatio = DEFAULT_VOID_RATIO_PERCENT / 100
    const stoneVolume = netWetVolume * (1 - voidRatio) * wastageMultiplier

    let tieStoneCount = 0
    if (includeTieStones) {
      const openingArea = normalizedOpenings.reduce((sum, op) => sum + op.width * op.height, 0)
      const wallFaceArea = Math.max(0, L * H - openingArea)
      const spacingH = tieStoneSpacingM > 0 ? tieStoneSpacingM : DEFAULT_TIE_STONE_SPACING_M
      const spacingV = tieStoneCourseSpacingM > 0 ? tieStoneCourseSpacingM : DEFAULT_TIE_STONE_COURSE_SPACING_M
      tieStoneCount = Math.ceil(wallFaceArea / (spacingH * spacingV))
    }

    let cappingVolumeRaw = 0
    if (includeTopCapping && cappingWidth && cappingThickness) {
      const cappingWidthM = unit === 'm' ? cappingWidth : cappingWidth * 0.3048
      const cappingThicknessM = unit === 'm' ? cappingThickness : cappingThickness * 0.3048
      cappingVolumeRaw = L * cappingWidthM * cappingThicknessM
    }
    const cappingVolume = cappingVolumeRaw * wastageMultiplier

    let cornerStoneCount = 0
    if (includeCornerStones && numberOfCorners > 0) {
      const courseHeight = courseHeightM > 0 ? courseHeightM : DEFAULT_COURSE_HEIGHT_M
      const numberOfCourses = Math.max(1, Math.ceil(H / courseHeight))
      cornerStoneCount = numberOfCorners * numberOfCourses
    }

    const summaryParts = [
      `Stone masonry: ${CalculationUtils.roundTo(stoneVolume, 3)} m³ stone`,
      `${CalculationUtils.roundTo(cementBags, 2)} cement bags`,
      `${CalculationUtils.roundTo(sandWeight, 1)} kg sand`,
    ]
    if (includeTieStones) summaryParts.push(`${tieStoneCount} tie stones`)
    if (includeTopCapping) summaryParts.push(`${CalculationUtils.roundTo(cappingVolume, 3)} m³ capping`)
    if (includeCornerStones) summaryParts.push(`${cornerStoneCount} corner stones`)

    const assumptions = [
      unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
      `Mortar mix ${mix.value} (cement:sand), 27% dry-volume bulking factor applied`,
      `Stone assumed to occupy ${100 - DEFAULT_VOID_RATIO_PERCENT}% of net wall volume (rest is mortar/voids)`,
    ]
    if (includeTieStones) {
      assumptions.push(`Tie stones spaced ${tieStoneSpacingM} m horizontally × ${tieStoneCourseSpacingM} m vertically`)
    }
    if (includeCornerStones) {
      assumptions.push(`Corner stones: 1 per corner per course, course height ${courseHeightM} m`)
    }

    return {
      workType: input.workType,
      volume: CalculationUtils.roundTo(netWetVolume * 1.27, 3),
      wetVolume: CalculationUtils.roundTo(wetVolume, 3),
      netWetVolume: CalculationUtils.roundTo(netWetVolume, 3),
      totalOpeningVolume: CalculationUtils.roundTo(totalOpeningVolume, 3),
      mortarMixRatio: mix.value,
      stoneVolume: CalculationUtils.roundTo(stoneVolume, 3),
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
      crossSectionArea: CalculationUtils.roundTo(T * H, 3),
      tieStoneCount,
      cappingVolume: CalculationUtils.roundTo(cappingVolume, 3),
      cornerStoneCount,
      human_summary: summaryParts.join('; ') + '.',
      assumptions,
    }
  }

  private static calculateWallCladding(input: StoneMasonryInput): StoneMasonryResult {
    const {
      claddingLength = 0,
      claddingHeight = 0,
      unit,
      mortarMixType = '1:5',
      wastageFactor = 0,
      claddingOpenings = [],
      claddingPieceLengthMm = 300,
      claddingPieceWidthMm = 600,
      claddingBeddingMm = 12,
    } = input

    CalculationUtils.validatePositive(claddingLength, 'Length')
    CalculationUtils.validatePositive(claddingHeight, 'Height')

    const unitSystem: 'metric' | 'imperial' = unit === 'm' ? 'metric' : 'imperial'
    const dims = CalculationUtils.normalizeDimensions({ length: claddingLength, width: claddingHeight }, unitSystem)
    const L = dims.length!
    const H = dims.width!

    const grossArea = L * H
    const normalizedOpenings = CalculationUtils.normalizeOpenings(claddingOpenings, unitSystem)
    const openingArea = normalizedOpenings.reduce((sum, op) => sum + op.width * op.height, 0)
    const netArea = Math.max(0, grossArea - openingArea)

    const wastageMultiplier = 1 + (wastageFactor || 0) / 100
    const pieceLengthM = claddingPieceLengthMm / 1000
    const pieceWidthM = claddingPieceWidthMm / 1000
    const pieceArea = pieceLengthM * pieceWidthM
    const pieceCount = pieceArea > 0 ? Math.ceil((netArea * wastageMultiplier) / pieceArea) : 0

    const beddingM = claddingBeddingMm / 1000
    const mortarVolume = netArea * beddingM
    const { mix, cementBags, sandWeight } = computeMortarFromVolume(mortarVolume, mortarMixType, wastageMultiplier)

    return {
      workType: input.workType,
      netArea: CalculationUtils.roundTo(netArea, 3),
      pieceCount,
      mortarVolume: CalculationUtils.roundTo(mortarVolume, 3),
      mortarMixRatio: mix.value,
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
      human_summary: `Wall cladding: ${CalculationUtils.roundTo(netArea, 2)} m² • ${pieceCount} pieces • ${CalculationUtils.roundTo(cementBags, 2)} cement bags • ${CalculationUtils.roundTo(sandWeight, 1)} kg sand.`,
      assumptions: [
        unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
        `Cladding piece size ${claddingPieceLengthMm}mm × ${claddingPieceWidthMm}mm, bedding thickness ${claddingBeddingMm}mm`,
        `Mortar mix ${mix.value} used for bedding volume`,
      ],
    }
  }

  private static calculateSlateFlooring(input: StoneMasonryInput): StoneMasonryResult {
    const {
      floorLength = 0,
      floorWidth = 0,
      unit,
      mortarMixType = '1:5',
      wastageFactor = 0,
      slatePieceLengthMm = 300,
      slatePieceWidthMm = 300,
      slateBeddingMm = 20,
    } = input

    CalculationUtils.validatePositive(floorLength, 'Length')
    CalculationUtils.validatePositive(floorWidth, 'Width')

    const unitSystem: 'metric' | 'imperial' = unit === 'm' ? 'metric' : 'imperial'
    const dims = CalculationUtils.normalizeDimensions({ length: floorLength, width: floorWidth }, unitSystem)
    const L = dims.length!
    const W = dims.width!
    const netArea = L * W

    const wastageMultiplier = 1 + (wastageFactor || 0) / 100
    const pieceLengthM = slatePieceLengthMm / 1000
    const pieceWidthM = slatePieceWidthMm / 1000
    const pieceArea = pieceLengthM * pieceWidthM
    const pieceCount = pieceArea > 0 ? Math.ceil((netArea * wastageMultiplier) / pieceArea) : 0

    const beddingM = slateBeddingMm / 1000
    const mortarVolume = netArea * beddingM
    const { mix, cementBags, sandWeight } = computeMortarFromVolume(mortarVolume, mortarMixType, wastageMultiplier)

    return {
      workType: input.workType,
      netArea: CalculationUtils.roundTo(netArea, 3),
      pieceCount,
      mortarVolume: CalculationUtils.roundTo(mortarVolume, 3),
      mortarMixRatio: mix.value,
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
      human_summary: `Slate flooring: ${CalculationUtils.roundTo(netArea, 2)} m² • ${pieceCount} pieces • ${CalculationUtils.roundTo(cementBags, 2)} cement bags • ${CalculationUtils.roundTo(sandWeight, 1)} kg sand.`,
      assumptions: [
        unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
        `Slate piece size ${slatePieceLengthMm}mm × ${slatePieceWidthMm}mm, bedding thickness ${slateBeddingMm}mm`,
        `Mortar mix ${mix.value} used for bedding volume`,
      ],
    }
  }

  private static calculateStonePitching(input: StoneMasonryInput): StoneMasonryResult {
    const {
      pitchingLength = 0,
      pitchingSlopeHeight = 0,
      unit,
      mortarMixType = '1:5',
      wastageFactor = 0,
      pitchingThicknessMm = 300,
      pitchingGrouted = false,
    } = input

    CalculationUtils.validatePositive(pitchingLength, 'Length')
    CalculationUtils.validatePositive(pitchingSlopeHeight, 'Slope length/height')

    const unitSystem: 'metric' | 'imperial' = unit === 'm' ? 'metric' : 'imperial'
    const dims = CalculationUtils.normalizeDimensions({ length: pitchingLength, width: pitchingSlopeHeight }, unitSystem)
    const L = dims.length!
    const S = dims.width!
    const netArea = L * S
    const thicknessM = pitchingThicknessMm / 1000
    const wastageMultiplier = 1 + (wastageFactor || 0) / 100

    const grossVolume = netArea * thicknessM
    const voidRatio = pitchingGrouted ? DEFAULT_VOID_RATIO_PERCENT / 100 : 0
    const stoneVolume = grossVolume * (1 - voidRatio) * wastageMultiplier

    let cementBags = 0
    let sandWeight = 0
    let mix = getMix(mortarMixType)
    if (pitchingGrouted) {
      const grouted = computeMortarFromVolume(grossVolume * voidRatio, mortarMixType, wastageMultiplier)
      cementBags = grouted.cementBags
      sandWeight = grouted.sandWeight
      mix = grouted.mix
    }

    return {
      workType: input.workType,
      netArea: CalculationUtils.roundTo(netArea, 3),
      stoneVolume: CalculationUtils.roundTo(stoneVolume, 3),
      volume: CalculationUtils.roundTo(grossVolume, 3),
      mortarMixRatio: pitchingGrouted ? mix.value : undefined,
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
      human_summary: `Stone pitching: ${CalculationUtils.roundTo(stoneVolume, 2)} m³ stone over ${CalculationUtils.roundTo(netArea, 2)} m²${pitchingGrouted ? ` • ${CalculationUtils.roundTo(cementBags, 2)} cement bags • ${CalculationUtils.roundTo(sandWeight, 1)} kg sand` : ' (dry-stone, no mortar)'}.`,
      assumptions: [
        unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
        `Pitching thickness ${pitchingThicknessMm} mm`,
        pitchingGrouted
          ? `Grouted: ${DEFAULT_VOID_RATIO_PERCENT}% of volume assumed to be mortar/grout`
          : 'Dry-stone pitching: no mortar included',
      ],
    }
  }

  private static calculateDpcCourse(input: StoneMasonryInput): StoneMasonryResult {
    const {
      dpcLength = 0,
      dpcThickness = 0,
      unit,
      mortarMixType = '1:5',
      wastageFactor = 0,
      dpcHeightMm = 50,
    } = input

    CalculationUtils.validatePositive(dpcLength, 'Length')
    CalculationUtils.validatePositive(dpcThickness, 'Wall thickness')

    const L = unit === 'm' ? dpcLength : dpcLength * 0.3048
    const T = unit === 'm' ? dpcThickness : dpcThickness * 0.3048
    const heightM = dpcHeightMm / 1000

    const netWetVolume = L * T * heightM
    const wastageMultiplier = 1 + (wastageFactor || 0) / 100
    const { mix, cementBags, sandWeight } = computeMortarFromVolume(netWetVolume, mortarMixType, wastageMultiplier)

    return {
      workType: input.workType,
      netWetVolume: CalculationUtils.roundTo(netWetVolume, 3),
      crossSectionArea: CalculationUtils.roundTo(T * heightM, 4),
      mortarMixRatio: mix.value,
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
      human_summary: `DPC course: ${CalculationUtils.roundTo(netWetVolume, 3)} m³ • ${CalculationUtils.roundTo(cementBags, 2)} cement bags • ${CalculationUtils.roundTo(sandWeight, 1)} kg sand.`,
      assumptions: [
        unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
        `DPC course height ${dpcHeightMm} mm, over full wall thickness`,
        `Mortar mix ${mix.value}`,
      ],
    }
  }

  private static calculateRetainingWall(input: StoneMasonryInput): StoneMasonryResult {
    const {
      retTopWidth = 0,
      retBottomWidth = 0,
      retHeight = 0,
      retLength = 0,
      unit,
      mortarMixType = '1:5',
      wastageFactor = 0,
    } = input

    CalculationUtils.validatePositive(retTopWidth, 'Top width')
    CalculationUtils.validatePositive(retBottomWidth, 'Bottom width')
    CalculationUtils.validatePositive(retHeight, 'Height')
    CalculationUtils.validatePositive(retLength, 'Length')

    const toM = (v: number) => (unit === 'm' ? v : v * 0.3048)
    const topW = toM(retTopWidth)
    const bottomW = toM(retBottomWidth)
    const H = toM(retHeight)
    const L = toM(retLength)

    const crossSectionArea = ((topW + bottomW) / 2) * H
    const wetVolume = crossSectionArea * L
    const netWetVolume = wetVolume

    const wastageMultiplier = 1 + (wastageFactor || 0) / 100
    const { mix, cementBags, sandWeight } = computeMortarFromVolume(netWetVolume, mortarMixType, wastageMultiplier)

    const voidRatio = DEFAULT_VOID_RATIO_PERCENT / 100
    const stoneVolume = netWetVolume * (1 - voidRatio) * wastageMultiplier

    return {
      workType: input.workType,
      wetVolume: CalculationUtils.roundTo(wetVolume, 3),
      netWetVolume: CalculationUtils.roundTo(netWetVolume, 3),
      crossSectionArea: CalculationUtils.roundTo(crossSectionArea, 3),
      stoneVolume: CalculationUtils.roundTo(stoneVolume, 3),
      mortarMixRatio: mix.value,
      cementBags: CalculationUtils.roundTo(cementBags, 2),
      sandWeight: CalculationUtils.roundTo(sandWeight, 1),
      human_summary: `Retaining wall: ${CalculationUtils.roundTo(stoneVolume, 2)} m³ stone • ${CalculationUtils.roundTo(cementBags, 2)} cement bags • ${CalculationUtils.roundTo(sandWeight, 1)} kg sand.`,
      assumptions: [
        unit === 'ft' ? 'Converted ft to m (1 ft = 0.3048 m)' : 'Metric input used as-is',
        `Trapezoidal cross-section: top width ${topW.toFixed(2)} m, bottom width ${bottomW.toFixed(2)} m, height ${H.toFixed(2)} m`,
        `Stone assumed to occupy ${100 - DEFAULT_VOID_RATIO_PERCENT}% of net volume (rest is mortar/voids)`,
      ],
    }
  }

  static summarizeProject(items: StoneMasonryProjectItem[]): StoneMasonryProjectSummary {
    const summaryItems = items.map((item) => {
      const stoneVolume = (item.result.stoneVolume ?? 0) + (item.result.cappingVolume ?? 0)
      const cementBags = item.result.cementBags ?? 0
      const sandWeight = item.result.sandWeight ?? 0
      const pieceCount = item.result.pieceCount ?? 0

      const stoneAmount = (item.stoneRate ?? 0) * stoneVolume
      const cementAmount = (item.cementRate ?? 0) * cementBags
      const sandAmount = (item.sandRate ?? 0) * sandWeight
      const pieceAmount = (item.pieceRate ?? 0) * pieceCount
      const totalAmount = stoneAmount + cementAmount + sandAmount + pieceAmount

      return {
        id: item.id,
        name: item.name,
        workType: item.workType,
        stoneVolume,
        cementBags,
        sandWeight,
        pieceCount,
        stoneAmount,
        cementAmount,
        sandAmount,
        pieceAmount,
        totalAmount,
      }
    })

    const sumNum = (key: 'stoneVolume' | 'cementBags' | 'sandWeight' | 'pieceCount' | 'stoneAmount' | 'cementAmount' | 'sandAmount' | 'pieceAmount' | 'totalAmount') =>
      summaryItems.reduce((total, item) => total + item[key], 0)

    const totalStoneVolume = sumNum('stoneVolume')
    const totalCementBags = sumNum('cementBags')
    const totalSandWeight = sumNum('sandWeight')
    const totalPieceCount = sumNum('pieceCount')
    const totalStoneAmount = sumNum('stoneAmount')
    const totalCementAmount = sumNum('cementAmount')
    const totalSandAmount = sumNum('sandAmount')
    const totalPieceAmount = sumNum('pieceAmount')
    const totalAmount = sumNum('totalAmount')

    const reportText = [
      'Stone Work Building Estimate Report',
      '==============================',
      `Total stone: ${totalStoneVolume.toFixed(3)} m³`,
      `Total cement: ${totalCementBags.toFixed(2)} bags`,
      `Total sand: ${totalSandWeight.toFixed(1)} kg`,
      `Total pieces: ${totalPieceCount.toLocaleString()} pcs`,
      `Total stone amount: ${totalStoneAmount.toFixed(2)}`,
      `Total cement amount: ${totalCementAmount.toFixed(2)}`,
      `Total sand amount: ${totalSandAmount.toFixed(2)}`,
      `Total piece amount: ${totalPieceAmount.toFixed(2)}`,
      `Grand total amount: ${totalAmount.toFixed(2)}`,
      '',
      'Component breakdown:',
      ...summaryItems.map(
        (item) =>
          `- ${item.name} (${item.workType}): ${item.stoneVolume.toFixed(3)} m³ stone | ${item.cementBags.toFixed(1)} cement bags | ${item.totalAmount.toFixed(2)}`,
      ),
    ].join('\n')

    return {
      items: summaryItems,
      totalStoneVolume,
      totalCementBags,
      totalSandWeight,
      totalPieceCount,
      totalStoneAmount,
      totalCementAmount,
      totalSandAmount,
      totalPieceAmount,
      totalAmount,
      reportText,
    }
  }
}