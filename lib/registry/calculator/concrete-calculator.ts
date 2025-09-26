import { DENSITIES, UnitConverter, UNIT_PRESETS } from '../globalunits'
import { CalculationUtils } from '../utils'
import { calcIsolatedFooting } from '@/lib/registry/structural/calc/footing'
import { calcRetainingWallCantilever } from '@/lib/registry/structural/calc/wall'
import { calcStairStraight } from '@/lib/registry/structural/calc/staircase'

export const CONCRETE_MIX_TYPES = [
  { value: 'M5', label: 'M5 (1:5:10)', ratios: { cement: 1, sand: 5, aggregate: 10 }, strength: '5 MPa' },
  { value: 'M7.5', label: 'M7.5 (1:4:8)', ratios: { cement: 1, sand: 4, aggregate: 8 }, strength: '7.5 MPa' },
  { value: 'M10', label: 'M10 (1:3:6)', ratios: { cement: 1, sand: 3, aggregate: 6 }, strength: '10 MPa' },
  { value: 'M15', label: 'M15 (1:2:4)', ratios: { cement: 1, sand: 2, aggregate: 4 }, strength: '15 MPa' },
  { value: 'M20', label: 'M20 (1:1.5:3)', ratios: { cement: 1, sand: 1.5, aggregate: 3 }, strength: '20 MPa' },
  { value: 'M25', label: 'M25 (1:1:2)', ratios: { cement: 1, sand: 1, aggregate: 2 }, strength: '25 MPa' },
  { value: 'M30', label: 'M30 (1:0.75:1.5)', ratios: { cement: 1, sand: 0.75, aggregate: 1.5 }, strength: '30 MPa' },
  { value: 'M35', label: 'M35 (1:0.5:1)', ratios: { cement: 1, sand: 0.5, aggregate: 1 }, strength: '35 MPa' },
] as const

export const CONCRETE_ELEMENTS = [
  { value: 'slab', label: 'Slab', description: 'Flat horizontal surface' },
  { value: 'beam', label: 'Beam', description: 'Horizontal structural element' },
  { value: 'column', label: 'Column', description: 'Vertical structural element' },
  { value: 'footing', label: 'Footing', description: 'Foundation base' },
  { value: 'wall', label: 'Wall', description: 'Vertical partition' },
  { value: 'staircase', label: 'Staircase', description: 'Steps and landing' },
] as const

export interface ConcreteCalculationInput {
  // Dimensions
  length?: number
  width?: number
  height: number
  area?: number
  elementType: string
  subType?: string // element-specific shape/type
  // Column-specific (rect/sq/circ)
  col_b?: number
  col_D?: number
  col_diam?: number
  // Footing-specific (isolated shapes)
  ft_B?: number
  ft_L?: number
  ft_a?: number
  // Removed circular footing per requirements
  // Frustum (trapezoidal/pyramidal) footing
  ft_B_bot?: number
  ft_L_bot?: number
  ft_B_top?: number
  ft_L_top?: number
  // Footing strap/combined
  ft_a1?: number
  ft_a2?: number
  strap_len?: number
  strap_b?: number
  strap_D?: number
  // Footing stepped (up to 3 steps)
  st1_B?: number
  st1_L?: number
  st1_t?: number
  st2_B?: number
  st2_L?: number
  st2_t?: number
  st3_B?: number
  st3_L?: number
  st3_t?: number
  // Staircase (straight flight basic)
  stair_riser?: number
  stair_tread?: number
  stair_steps?: number
  stair_steps2?: number
  stair_width?: number
  stair_landing_len?: number
  // Beam (prismatic)
  beam_b?: number
  beam_D?: number
  
  // Mix settings
  mixType: string
  wastageFactor: number
  
  // Units
  unitSystem: 'metric' | 'imperial'
  useArea: boolean
}

export interface ConcreteCalculationResult {
  wetVolume: number
  dryVolume: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  sandVolume: number
  aggregateWeight: number
  aggregateVolume: number
  waterVolume: number
  mixRatio: string
  elementArea?: number
  totalParts: number
  // Advanced structural output (non-breaking, UI can ignore safely)
  structural?: any
  human_summary?: string
  step_details?: string[]
}

export class ConcreteCalculator {
  static calculate(input: ConcreteCalculationInput): ConcreteCalculationResult {
    const {
      length,
      width,
      height,
      area,
      mixType,
      wastageFactor,
      unitSystem,
      useArea,
      elementType
    } = input

    // Validate inputs
    CalculationUtils.validatePositive(height, 'Height')
    if (useArea && area) {
      CalculationUtils.validatePositive(area, 'Area')
    } else if (length && width) {
      CalculationUtils.validatePositive(length, 'Length')
      CalculationUtils.validatePositive(width, 'Width')
    } else {
      throw new Error('Please provide either area or both length and width')
    }

    // Get mix type details
    const selectedMix = CONCRETE_MIX_TYPES.find((m) => m.value === mixType)
    if (!selectedMix) {
      throw new Error(`Invalid concrete mix type: ${mixType}`)
    }

    const { cement: cementRatio, sand: sandRatio, aggregate: aggregateRatio } = selectedMix.ratios
    CalculationUtils.validateMixRatio({ cement: cementRatio, sand: sandRatio, aggregate: aggregateRatio })

    // Normalize primary dimensions
    const dimensions = CalculationUtils.normalizeDimensions({ length, width, height, area }, unitSystem)

    // Element-aware volume calculation
    let wetVolumeM3 = 0
    let elementAreaM2: number | undefined = undefined
    const steps: string[] = []
    const H = dimensions.height!
    const conv = (x?: number) => x !== undefined ? (unitSystem === 'imperial' ? x * 0.3048 : x) : undefined
    if (elementType === 'column') {
      const st = input.subType || 'rect'
      if (st === 'rect') {
        const b = conv(input.col_b ?? dimensions.width) ?? 0
        const D = conv(input.col_D ?? dimensions.length) ?? 0
        CalculationUtils.validatePositive(b, 'Column breadth')
        CalculationUtils.validatePositive(D, 'Column depth')
        wetVolumeM3 = b * D * H
        elementAreaM2 = b * D
        steps.push(`Column (Rectangular): V = b × D × h = ${b.toFixed(3)} × ${D.toFixed(3)} × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
      } else if (st === 'square') {
        const b = conv(input.col_b ?? dimensions.width) ?? 0
        CalculationUtils.validatePositive(b, 'Column side')
        wetVolumeM3 = b * b * H
        elementAreaM2 = b * b
        steps.push(`Column (Square): V = b² × h = ${b.toFixed(3)}² × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
      } else if (st === 'circular') {
        const d = conv(input.col_diam) ?? 0
        CalculationUtils.validatePositive(d, 'Column diameter')
        wetVolumeM3 = Math.PI * Math.pow(d / 2, 2) * H
        elementAreaM2 = Math.PI * Math.pow(d / 2, 2)
        steps.push(`Column (Circular): V = π(d/2)² × h = π(${(d/2).toFixed(3)})² × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
      }
    } else if (elementType === 'footing') {
      const st = input.subType || 'iso_square'
      if (st === 'iso_square') {
        const a = conv(input.ft_a) ?? 0
        CalculationUtils.validatePositive(a, 'Footing side (a)')
        wetVolumeM3 = a * a * H
        elementAreaM2 = a * a
        steps.push(`Footing (Isolated Square): V = a² × t = ${a.toFixed(3)}² × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
      } else if (st === 'iso_rect') {
        const B = conv(input.ft_B) ?? 0
        const L = conv(input.ft_L) ?? 0
        CalculationUtils.validatePositive(B, 'Footing width (B)')
        CalculationUtils.validatePositive(L, 'Footing length (L)')
        wetVolumeM3 = B * L * H
        elementAreaM2 = B * L
        steps.push(`Footing (Isolated Rect): V = B × L × t = ${B.toFixed(3)} × ${L.toFixed(3)} × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
      } else if (st === 'iso_frustum') {
        // Trapezoidal/Pyramidal footing (frustum): V = h/3 * (A1 + A2 + sqrt(A1*A2))
        const B1 = conv(input.ft_B_bot) ?? 0
        const L1 = conv(input.ft_L_bot) ?? 0
        const B2 = conv(input.ft_B_top) ?? 0
        const L2 = conv(input.ft_L_top) ?? 0
        CalculationUtils.validatePositive(B1, 'Bottom width (B1)')
        CalculationUtils.validatePositive(L1, 'Bottom length (L1)')
        CalculationUtils.validatePositive(B2, 'Top width (B2)')
        CalculationUtils.validatePositive(L2, 'Top length (L2)')
        const A1 = B1 * L1
        const A2 = B2 * L2
        wetVolumeM3 = (H / 3) * (A1 + A2 + Math.sqrt(A1 * A2))
        elementAreaM2 = A1 // reference bottom area
        steps.push(
          `Footing (Frustum): A1 = B1×L1 = ${B1.toFixed(3)}×${L1.toFixed(3)} = ${A1.toFixed(3)} m²`,
          `A2 = B2×L2 = ${B2.toFixed(3)}×${L2.toFixed(3)} = ${A2.toFixed(3)} m²`,
          `V = h/3 × (A1 + A2 + √(A1×A2)) = ${H.toFixed(3)}/3 × (${A1.toFixed(3)} + ${A2.toFixed(3)} + ${Math.sqrt(A1*A2).toFixed(3)}) = ${wetVolumeM3.toFixed(3)} m³`
        )
      } else if (st === 'combined') {
        // Treat as rectangular combined footing with B × L × t
        const B = conv(input.ft_B) ?? 0
        const L = conv(input.ft_L) ?? 0
        CalculationUtils.validatePositive(B, 'Footing width (B)')
        CalculationUtils.validatePositive(L, 'Footing length (L)')
        wetVolumeM3 = B * L * H
        elementAreaM2 = B * L
        steps.push(`Footing (Combined): V = B × L × t = ${B.toFixed(3)} × ${L.toFixed(3)} × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
      } else if (st === 'strap') {
        // Two isolated pads (a1, a2, thickness H) + strap beam (len × b × D)
        const a1 = conv(input.ft_a1) ?? 0
        const a2 = conv(input.ft_a2) ?? 0
        const strapLen = conv(input.strap_len) ?? 0
        const strapB = conv(input.strap_b) ?? 0
        const strapD = conv(input.strap_D) ?? 0
        CalculationUtils.validatePositive(a1, 'Pad-1 side (a1)')
        CalculationUtils.validatePositive(a2, 'Pad-2 side (a2)')
        CalculationUtils.validatePositive(strapLen, 'Strap length')
        CalculationUtils.validatePositive(strapB, 'Strap breadth')
        CalculationUtils.validatePositive(strapD, 'Strap depth')
        const padVol = a1 * a1 * H + a2 * a2 * H
        const strapVol = strapLen * strapB * strapD
        wetVolumeM3 = padVol + strapVol
        steps.push(
          `Footing (Strap): Pads volume = a1²×t + a2²×t = ${a1.toFixed(3)}²×${H.toFixed(3)} + ${a2.toFixed(3)}²×${H.toFixed(3)} = ${padVol.toFixed(3)} m³`,
          `Strap volume = L × b × D = ${strapLen.toFixed(3)} × ${strapB.toFixed(3)} × ${strapD.toFixed(3)} = ${strapVol.toFixed(3)} m³`,
          `Total footing volume = ${wetVolumeM3.toFixed(3)} m³`
        )
      } else if (st === 'mat' || st === 'raft') {
        // Mat (raft) footing: V = B × L × t
        const B = conv(input.ft_B) ?? 0
        const L = conv(input.ft_L) ?? 0
        CalculationUtils.validatePositive(B, 'Mat width (B)')
        CalculationUtils.validatePositive(L, 'Mat length (L)')
        wetVolumeM3 = B * L * H
        elementAreaM2 = B * L
        steps.push(`Footing (Mat/Raft): V = B × L × t = ${B.toFixed(3)} × ${L.toFixed(3)} × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
      } else if (st === 'stepped') {
        // Sum of rectangular step volumes: Σ(Bi × Li × ti)
        const s1B = conv(input.st1_B) ?? 0
        const s1L = conv(input.st1_L) ?? 0
        const s1t = conv(input.st1_t) ?? 0
        CalculationUtils.validatePositive(s1B, 'Step 1 width (B1)')
        CalculationUtils.validatePositive(s1L, 'Step 1 length (L1)')
        CalculationUtils.validatePositive(s1t, 'Step 1 thickness (t1)')
        const s2B = conv(input.st2_B)
        const s2L = conv(input.st2_L)
        const s2t = conv(input.st2_t)
        const s3B = conv(input.st3_B)
        const s3L = conv(input.st3_L)
        const s3t = conv(input.st3_t)
        let V = s1B * s1L * s1t
        steps.push(`Step 1: V1 = B1×L1×t1 = ${s1B.toFixed(3)}×${s1L.toFixed(3)}×${s1t.toFixed(3)} = ${V.toFixed(3)} m³`)
        if (s2B && s2L && s2t) {
          const V2 = s2B * s2L * s2t
          V += V2
          steps.push(`Step 2: V2 = B2×L2×t2 = ${s2B.toFixed(3)}×${s2L.toFixed(3)}×${s2t.toFixed(3)} = ${V2.toFixed(3)} m³`)
        }
        if (s3B && s3L && s3t) {
          const V3 = s3B * s3L * s3t
          V += V3
          steps.push(`Step 3: V3 = B3×L3×t3 = ${s3B.toFixed(3)}×${s3L.toFixed(3)}×${s3t.toFixed(3)} = ${V3.toFixed(3)} m³`)
        }
        wetVolumeM3 = V
        elementAreaM2 = s1B * s1L
        steps.push(`Footing (Stepped): Total V = ${wetVolumeM3.toFixed(3)} m³`)
      }
    } else if (elementType === 'staircase') {
      const riser = conv(input.stair_riser) ?? 0
      const tread = conv(input.stair_tread) ?? 0
      const stepsCount = input.stair_steps ?? 0
      const width_m = conv(input.stair_width ?? dimensions.width ?? 1.0) ?? 1.0
      CalculationUtils.validatePositive(riser, 'Riser')
      CalculationUtils.validatePositive(tread, 'Tread')
      CalculationUtils.validatePositive(stepsCount, 'Number of steps')
      CalculationUtils.validatePositive(width_m, 'Stair width')
      const waist = H
      const landingLen = conv(input.stair_landing_len) ?? 0
      const subtype = input.subType || 'straight'
      if (subtype === 'dogleg' || subtype === 'quarter_turn' || subtype === 'u_shaped') {
        const steps2 = input.stair_steps2 ?? 0
        CalculationUtils.validatePositive(steps2, 'Steps (flight 2)')
        const run1 = tread * stepsCount
        const rise1 = riser * stepsCount
        const run2 = tread * steps2
        const rise2 = riser * steps2
        const slope1 = Math.sqrt(run1 * run1 + rise1 * rise1)
        const slope2 = Math.sqrt(run2 * run2 + rise2 * rise2)
        const vol1 = slope1 * width_m * waist
        const vol2 = slope2 * width_m * waist
        const landVol = landingLen > 0 ? landingLen * width_m * waist : 0
        wetVolumeM3 = vol1 + vol2 + landVol
        steps.push(
          `Stair (${subtype.replace('_','-')}): flight-1 slope = √(${run1.toFixed(3)}²+${rise1.toFixed(3)}²) = ${slope1.toFixed(3)} m`,
          `Flight-1 volume = ${slope1.toFixed(3)} × ${width_m.toFixed(3)} × ${waist.toFixed(3)} = ${vol1.toFixed(3)} m³`,
          `Flight-2 slope = √(${run2.toFixed(3)}²+${rise2.toFixed(3)}²) = ${slope2.toFixed(3)} m`,
          `Flight-2 volume = ${slope2.toFixed(3)} × ${width_m.toFixed(3)} × ${waist.toFixed(3)} = ${vol2.toFixed(3)} m³`,
          landingLen > 0 ? `Landing volume = ${landingLen.toFixed(3)} × ${width_m.toFixed(3)} × ${waist.toFixed(3)} = ${landVol.toFixed(3)} m³` : `No landing`,
          `Total stair volume = ${wetVolumeM3.toFixed(3)} m³`
        )
      } else {
        const flightRun = tread * stepsCount
        const flightRise = riser * stepsCount
        const slopeLen = Math.sqrt(flightRun * flightRun + flightRise * flightRise)
        const flightVol = slopeLen * width_m * waist
        const landingVol = landingLen > 0 ? landingLen * width_m * waist : 0
        wetVolumeM3 = flightVol + landingVol
        steps.push(
          `Stair (Straight): slope length = √(run²+rise²) = √(${flightRun.toFixed(3)}²+${flightRise.toFixed(3)}²) = ${slopeLen.toFixed(3)} m`,
          `Flight volume = ${slopeLen.toFixed(3)} × ${width_m.toFixed(3)} × ${waist.toFixed(3)} = ${flightVol.toFixed(3)} m³`,
          landingLen > 0 ? `Landing volume = ${landingLen.toFixed(3)} × ${width_m.toFixed(3)} × ${waist.toFixed(3)} = ${landingVol.toFixed(3)} m³` : `No landing`
        )
      }
    } else if (elementType === 'beam') {
      // Prismatic beam volume: V = L × b × D
      const b = conv(input.beam_b) ?? 0
      const D = conv(input.beam_D) ?? 0
      const L = conv(dimensions.length) ?? 0
      CalculationUtils.validatePositive(L, 'Beam length')
      CalculationUtils.validatePositive(b, 'Beam breadth')
      CalculationUtils.validatePositive(D, 'Beam depth')
      wetVolumeM3 = L * b * D
      elementAreaM2 = b * D
      steps.push(`Beam (Prismatic): V = L × b × D = ${L.toFixed(3)} × ${b.toFixed(3)} × ${D.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
    } else if (elementType === 'slab') {
      // Slab advisory: one-way/two-way
      const st = input.subType || 'one_way'
      let areaM2: number
      if (useArea && dimensions.area) {
        areaM2 = dimensions.area
        steps.push(`Area (direct): A = ${areaM2.toFixed(3)} m²`)
      } else if (dimensions.length && dimensions.width) {
        areaM2 = CalculationUtils.calculateRectangularArea(dimensions.length, dimensions.width)
        steps.push(`Area: A = L × W = ${dimensions.length.toFixed(3)} × ${dimensions.width.toFixed(3)} = ${areaM2.toFixed(3)} m²`)
      } else {
        throw new Error('Please provide either area or both length and width')
      }
      wetVolumeM3 = CalculationUtils.calculateVolumeFromArea(areaM2, H)
      elementAreaM2 = areaM2
      const advisory = st === 'one_way' ? 'One-way slab: primary span direction governs thickness and reinforcement.' : 'Two-way slab: panel aspect ratio < 2, two-way action expected.'
      steps.push(`Slab (${st.replace('_','-')}): V = A × t = ${areaM2.toFixed(3)} × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`, advisory)
    } else {
      // Generic slab/beam/wall fallback: area × height
      let areaM2: number
      if (useArea && dimensions.area) {
        areaM2 = dimensions.area
        steps.push(`Area (direct): A = ${areaM2.toFixed(3)} m²`)
      } else if (dimensions.length && dimensions.width) {
        areaM2 = CalculationUtils.calculateRectangularArea(dimensions.length, dimensions.width)
        steps.push(`Area: A = L × W = ${dimensions.length.toFixed(3)} × ${dimensions.width.toFixed(3)} = ${areaM2.toFixed(3)} m²`)
      } else {
        throw new Error('Please provide either area or both length and width')
      }
      wetVolumeM3 = CalculationUtils.calculateVolumeFromArea(areaM2, H)
      elementAreaM2 = areaM2
      steps.push(`Volume: V = A × t = ${areaM2.toFixed(3)} × ${H.toFixed(3)} = ${wetVolumeM3.toFixed(3)} m³`)
    }

    // Calculate materials using the standard concrete calculation pattern
    const materials = CalculationUtils.calculateConcreteMaterials(
      wetVolumeM3,
      { cement: cementRatio, sand: sandRatio, aggregate: aggregateRatio },
      wastageFactor
    )

    // Convert results back to display units if needed
    const volumeUnit = unitSystem === 'metric' ? 'm³' : 'ft³'
    const wetVolume = UnitConverter.convertVolume(wetVolumeM3, 'm³', volumeUnit as any)
    const dryVolume = UnitConverter.convertVolume(materials.dryVolume, 'm³', volumeUnit as any)

    // Format results with appropriate rounding
    const results = CalculationUtils.formatCalculationResults({
      wetVolume,
      dryVolume,
      cementWeight: materials.cementWeight,
      cementBags: materials.cementBags,
      sandWeight: materials.sandWeight,
      sandVolume: materials.sandWeight / DENSITIES.sand, // Convert weight back to volume
      aggregateWeight: materials.aggregateWeight,
      aggregateVolume: materials.aggregateWeight / DENSITIES.aggregate, // Convert weight back to volume
      waterVolume: materials.waterVolume,
      elementArea: elementAreaM2 ?? 0,
      totalParts: cementRatio + sandRatio + aggregateRatio
    }, {
      wetVolume: 3,
      dryVolume: 3,
      cementWeight: 1,
      cementBags: 0,
      sandWeight: 1,
      sandVolume: 3,
      aggregateWeight: 1,
      aggregateVolume: 3,
      waterVolume: 3,
      elementArea: 2,
      totalParts: 1
    })

    // Attach advanced structural calculations for specific element types WITHOUT changing UI behavior
    let structural: any | undefined
    let human_summary: string | undefined
    try {
      if (elementType === 'footing') {
        structural = calcIsolatedFooting({
          footing_type: 'isolated_square',
          column_load: { value: 400, unit: 'kN' }, // default if UI hasn't provided
          soil_allow: { value: 150, unit: 'kN/m2' },
          column_size_mm: { b: 300, D: 300 },
          required_clear_cover_mm: 50,
        })
        human_summary = structural?.human_summary
      } else if (elementType === 'wall') {
        structural = calcRetainingWallCantilever({
          wall_type: 'retaining_cantilever',
          wall_height_m: dimensions.height ?? 3.0,
          wall_thickness_m: 0.2,
          wall_length_m: 1.0,
          Ka: 0.33,
          surcharge_kN_m2: 10,
        })
        human_summary = structural?.human_summary
      } else if (elementType === 'staircase') {
        structural = calcStairStraight({
          stair_type: 'straight',
          total_rise_m: dimensions.height ?? 3.0,
          total_run_m: dimensions.length ?? 3.6,
        })
        human_summary = structural?.human_summary
      }
    } catch (e) {
      // Never break the UI if structural calc fails; silently skip advanced details
      structural = { error: (e as Error).message }
    }

    return {
      ...results,
      mixRatio: `${cementRatio}:${sandRatio}:${aggregateRatio}`,
      structural,
      human_summary: human_summary || steps[0],
      step_details: steps
    }
  }

  // Helper method to get default values for a unit system
  static getDefaultsForUnitSystem(unitSystem: 'metric' | 'imperial') {
    return {
      defaultHeight: unitSystem === 'metric' ? '0.15' : '0.5', // 15cm or 6 inches
      defaultLength: unitSystem === 'metric' ? '5' : '16.4',
      defaultWidth: unitSystem === 'metric' ? '3' : '9.8',
    }
  }

  // Helper method to get element-specific defaults
  static getElementDefaults(elementType: string, unitSystem: 'metric' | 'imperial') {
    const defaults: Record<string, { height: string; description: string }> = {
      slab: { 
        height: unitSystem === 'metric' ? '0.15' : '0.5', 
        description: 'Standard slab thickness' 
      },
      beam: { 
        height: unitSystem === 'metric' ? '0.45' : '1.5', 
        description: 'Typical beam depth' 
      },
      column: { 
        height: unitSystem === 'metric' ? '3.0' : '9.8', 
        description: 'Standard column height' 
      },
      footing: { 
        height: unitSystem === 'metric' ? '0.6' : '2.0', 
        description: 'Foundation footing depth' 
      },
      wall: { 
        height: unitSystem === 'metric' ? '3.0' : '9.8', 
        description: 'Standard wall height' 
      },
      staircase: { 
        height: unitSystem === 'metric' ? '3.0' : '9.8', 
        description: 'Staircase total height' 
      }
    }
    
    return defaults[elementType] || defaults.slab
  }
}

