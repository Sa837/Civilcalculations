import { BaseCalculationInput, BaseCalculationResult } from '@/lib/registry/calculator/base'
import { UnitConverter, VOLUME_CONVERSIONS } from '@/lib/registry/globalunits'

// Shared types
export type UnitSystem = 'metric' | 'imperial'
export interface CapacityCommonInput extends BaseCalculationInput {
  unitSystem: UnitSystem
}

export interface CapacityCommonResult extends BaseCalculationResult {
  volume_m3: number
  volume_liters: number
  volume_gallons_us: number
}

// -------------------- Water Tank --------------------
export type TankShape = 'rectangular' | 'cylindrical' | 'circular' // circular treated as cylindrical by diameter
export type TankType = 'underground' | 'overhead' | 'ground'
export type TankMaterial = 'RCC' | 'Plastic' | 'Steel'

export interface WaterTankInput extends CapacityCommonInput {
  shape: TankShape
  tankType?: TankType
  // dimensions in selected system base length unit: m or ft
  length?: number
  width?: number
  height?: number // or depth
  diameter?: number
  freeboard?: number // height to subtract from water depth
  material?: TankMaterial
  materialUnitCostPerM3?: number // optional override cost/m3 of storage
}

export interface WaterTankResult extends CapacityCommonResult {
  effective_depth: number
  cost_estimate?: number
}

export class WaterTankCalculator {
  static defaultCostsPerM3: Record<TankMaterial, number> = {
    RCC: 70, // USD/m3 (placeholder)
    Plastic: 120,
    Steel: 200,
  }

  static calculate(input: WaterTankInput): WaterTankResult {
    const length_m = input.length ? UnitConverter.convertLength(input.length, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : undefined
    const width_m = input.width ? UnitConverter.convertLength(input.width, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : undefined
    const height_m = input.height ? UnitConverter.convertLength(input.height, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : undefined
    const diameter_m = input.diameter ? UnitConverter.convertLength(input.diameter, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : undefined
    const freeboard_m = input.freeboard ? UnitConverter.convertLength(input.freeboard, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : 0

    let volume_m3 = 0
    let effective_depth_m = 0

    if (input.shape === 'rectangular') {
      if (!length_m || !width_m || !height_m) throw new Error('Length, width and height are required for rectangular tank')
      effective_depth_m = Math.max(0, height_m - freeboard_m)
      volume_m3 = length_m * width_m * effective_depth_m
    } else if (input.shape === 'cylindrical' || input.shape === 'circular') {
      if (!diameter_m || !height_m) throw new Error('Diameter and height/depth are required for cylindrical tank')
      const radius = diameter_m / 2
      effective_depth_m = Math.max(0, height_m - freeboard_m)
      volume_m3 = Math.PI * radius * radius * effective_depth_m
    } else {
      throw new Error('Unsupported shape')
    }

    const volume_liters = volume_m3 * 1000
    const volume_gallons_us = volume_m3 / VOLUME_CONVERSIONS['ft³'] * 7.48052 // 1 ft3 = 7.48052 US gal

    // Cost
    let cost_estimate: number | undefined
    if (input.material) {
      const unitCost = input.materialUnitCostPerM3 ?? this.defaultCostsPerM3[input.material]
      cost_estimate = unitCost * volume_m3
    }

    return {
      volume_m3,
      volume_liters,
      volume_gallons_us,
      effective_depth: effective_depth_m,
      cost_estimate,
      human_summary: `Tank capacity is ${(volume_m3).toFixed(3)} m³ (${volume_liters.toFixed(0)} L).`,
    }
  }
}

// -------------------- Swimming Pool --------------------
export type PoolShape = 'rectangular' | 'circular' | 'kidney'
export interface SwimmingPoolInput extends CapacityCommonInput {
  shape: PoolShape
  length?: number
  width?: number
  diameter?: number
  shallowDepth?: number
  deepDepth?: number
  averageDepth?: number // if provided directly
  turnoverHours?: number // optional; typical 6–8 h
}
export interface SwimmingPoolResult extends CapacityCommonResult {
  average_depth_m: number
  turnover_flow_m3_per_h?: number
}
export class SwimmingPoolCalculator {
  static calculate(input: SwimmingPoolInput): SwimmingPoolResult {
    const toM = (v?: number) => v == null ? undefined : UnitConverter.convertLength(v, input.unitSystem === 'metric' ? 'm' : 'ft', 'm')
    const L = toM(input.length)
    const W = toM(input.width)
    const D = toM(input.diameter)

    let avgDepth = toM(input.averageDepth)
    const shallow = toM(input.shallowDepth)
    const deep = toM(input.deepDepth)
    if (!avgDepth) {
      if (shallow && deep) avgDepth = (shallow + deep) / 2
    }
    if (!avgDepth) throw new Error('Average depth (or shallow and deep) is required')

    let volume_m3 = 0
    if (input.shape === 'rectangular') {
      if (!L || !W) throw new Error('Length and width are required for rectangular pool')
      volume_m3 = L * W * avgDepth
    } else if (input.shape === 'circular') {
      if (!D) throw new Error('Diameter is required for circular pool')
      const r = D / 2
      volume_m3 = Math.PI * r * r * avgDepth
    } else if (input.shape === 'kidney') {
      if (!L || !W) throw new Error('Length and width (avg) are required for kidney shape')
      // Approximate kidney pool area as 0.75 of equivalent rectangle
      volume_m3 = 0.75 * L * W * avgDepth
    } else {
      throw new Error('Unsupported pool shape')
    }

    const volume_liters = volume_m3 * 1000
    const volume_gallons_us = volume_m3 / VOLUME_CONVERSIONS['ft³'] * 7.48052
    let turnover_flow_m3_per_h: number | undefined
    if (input.turnoverHours && input.turnoverHours > 0) {
      turnover_flow_m3_per_h = volume_m3 / input.turnoverHours
    }

    return {
      volume_m3,
      volume_liters,
      volume_gallons_us,
      average_depth_m: avgDepth,
      turnover_flow_m3_per_h,
      human_summary: `Pool capacity ${(volume_m3).toFixed(2)} m³. ${turnover_flow_m3_per_h ? `Required flow ≈ ${turnover_flow_m3_per_h.toFixed(2)} m³/h for ${input.turnoverHours} h turnover.` : ''}`.trim(),
    }
  }
}

// -------------------- Soak Pit --------------------
export interface SoakPitInput extends CapacityCommonInput {
  diameter: number
  depth: number
  soilPermeability_m_per_day?: number // K
  inflow_m3_per_day?: number
}
export interface SoakPitResult extends CapacityCommonResult {
  side_area_m2: number
  required_side_area_m2?: number
  check_ok?: boolean
}
export class SoakPitCalculator {
  static calculate(input: SoakPitInput): SoakPitResult {
    const D = UnitConverter.convertLength(input.diameter, input.unitSystem === 'metric' ? 'm' : 'ft', 'm')
    const H = UnitConverter.convertLength(input.depth, input.unitSystem === 'metric' ? 'm' : 'ft', 'm')
    const r = D / 2
    const volume_m3 = Math.PI * r * r * H

    // Side area for infiltration (excluding base)
    const side_area_m2 = Math.PI * D * H

    let required_side_area_m2: number | undefined
    let check_ok: boolean | undefined
    if (input.soilPermeability_m_per_day && input.inflow_m3_per_day) {
      // NBC/IS general check: Q <= K * A (very simplified)
      required_side_area_m2 = input.inflow_m3_per_day / input.soilPermeability_m_per_day
      check_ok = side_area_m2 >= required_side_area_m2
    }

    return {
      volume_m3,
      volume_liters: volume_m3 * 1000,
      volume_gallons_us: volume_m3 / VOLUME_CONVERSIONS['ft³'] * 7.48052,
      side_area_m2,
      required_side_area_m2,
      check_ok,
      human_summary: `Soak pit volume ${(volume_m3).toFixed(2)} m³; side area ${(side_area_m2).toFixed(2)} m².`,
    }
  }
}

// -------------------- Septic Tank --------------------
export interface SepticTankInput extends CapacityCommonInput {
  users: number
  perCapitaFlow_l_per_day?: number // default 120 lpcd typical
  retention_days?: number // default 1.0–2.0 days
  sludge_storage_m3?: number // additional storage
  ratio_L_W_H?: [number, number, number] // default 2:1:1
  min_depth_m?: number // suggest >=1.2m
}
export interface SepticTankResult extends CapacityCommonResult {
  recommended_dimensions_m: { length: number; width: number; depth: number }
}
export class SepticTankCalculator {
  static calculate(input: SepticTankInput): SepticTankResult {
    const q_lpcd = input.perCapitaFlow_l_per_day ?? 120
    const t_days = input.retention_days ?? 1.5
    const sludge = input.sludge_storage_m3 ?? 0.6 // small default reserve

    const volume_m3 = (input.users * q_lpcd * t_days) / 1000 + sludge

    const ratio = input.ratio_L_W_H ?? [2, 1, 1]
    const sumRatio = ratio[0] * ratio[1] * ratio[2]
    // Select dimensions such that L:W:H maintained and product equals V
    // Let k be scale, then (k*2)*(k*1)*(k*1) = 2k^3 = V => k = (V/2)^(1/3)
    const k = Math.cbrt(volume_m3 / (ratio[0] * ratio[1] * ratio[2]))
    let L = ratio[0] * k
    let W = ratio[1] * k
    let H = Math.max(ratio[2] * k, input.min_depth_m ?? 1.2)

    // If raising H to min, adjust L proportionally to keep volume ~constant
    const currentVol = L * W * (ratio[2] * k)
    const newVol = L * W * H
    if (newVol < volume_m3) {
      const scale = Math.cbrt(volume_m3 / newVol)
      L *= scale
      W *= scale
    }

    return {
      volume_m3,
      volume_liters: volume_m3 * 1000,
      volume_gallons_us: volume_m3 / VOLUME_CONVERSIONS['ft³'] * 7.48052,
      recommended_dimensions_m: { length: L, width: W, depth: H },
      human_summary: `Estimated septic tank ${(volume_m3).toFixed(2)} m³. Recommended dimensions ~ ${L.toFixed(2)} × ${W.toFixed(2)} × ${H.toFixed(2)} m (L×W×D), ratio ${ratio.join(':')}.`,
      notes: [
        'Indicative sizing only. Verify with NBC/IS standards including baffle walls, freeboard, ventilation, and setbacks.',
      ],
    }
  }
}

// -------------------- Rainwater Harvesting --------------------
export interface RainwaterHarvestingInput extends CapacityCommonInput {
  catchmentArea: number // roof/ground area
  rainfall_mm: number // design rainfall (mm)
  runoffCoefficient?: number // 0..1 (default 0.8 roof)
  firstFlushLoss_mm?: number // optional deduction
  dailyDemand_liters?: number // optional: compare storage vs demand per day
}
export interface RainwaterHarvestingResult extends CapacityCommonResult {
  harvestable_volume_m3: number
  runoffCoefficient: number
  days_of_supply?: number
}
export class RainwaterHarvestingCalculator {
  static calculate(input: RainwaterHarvestingInput): RainwaterHarvestingResult {
    // Convert area to m2
    const A_m2 = UnitConverter.convertArea(
      input.catchmentArea,
      input.unitSystem === 'metric' ? 'm²' : 'ft²',
      'm²',
    )
    const C = input.runoffCoefficient ?? 0.8
    const effectiveRain_mm = Math.max(0, input.rainfall_mm - (input.firstFlushLoss_mm ?? 0))
    // Volume (m3) = A(m2) * Rain(m)/1.0 * C
    const volume_m3 = A_m2 * (effectiveRain_mm / 1000) * C
    const volume_liters = volume_m3 * 1000
    const volume_gallons_us = volume_m3 / VOLUME_CONVERSIONS['ft³'] * 7.48052
    let days_of_supply: number | undefined
    if (input.dailyDemand_liters && input.dailyDemand_liters > 0) {
      days_of_supply = volume_liters / input.dailyDemand_liters
    }
    return {
      harvestable_volume_m3: volume_m3,
      volume_m3,
      volume_liters,
      volume_gallons_us,
      runoffCoefficient: C,
      days_of_supply,
      human_summary: `Harvestable rainwater ≈ ${volume_m3.toFixed(2)} m³ (C=${C}).`,
      notes: [
        'Ensure filtration, first-flush, and storage hygiene per NBC/IS guidelines.',
      ],
    }
  }
}

// -------------------- Sump / Custom Tank --------------------
export type SumpShape = 'rectangular' | 'cylindrical'
export interface SumpCapacityInput extends CapacityCommonInput {
  shape: SumpShape
  length?: number
  width?: number
  depth: number
  diameter?: number
  freeboard?: number
}
export interface SumpCapacityResult extends CapacityCommonResult {}
export class SumpCapacityCalculator {
  static calculate(input: SumpCapacityInput): SumpCapacityResult {
    const L = input.length != null ? UnitConverter.convertLength(input.length, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : undefined
    const W = input.width != null ? UnitConverter.convertLength(input.width, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : undefined
    const D = UnitConverter.convertLength(input.depth, input.unitSystem === 'metric' ? 'm' : 'ft', 'm')
    const Dia = input.diameter != null ? UnitConverter.convertLength(input.diameter, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : undefined
    const freeboard_m = input.freeboard ? UnitConverter.convertLength(input.freeboard, input.unitSystem === 'metric' ? 'm' : 'ft', 'm') : 0
    const eff = Math.max(0, D - freeboard_m)
    let volume_m3 = 0
    if (input.shape === 'rectangular') {
      if (L == null || W == null) throw new Error('Length and width are required for rectangular sump')
      volume_m3 = L * W * eff
    } else {
      if (Dia == null) throw new Error('Diameter is required for cylindrical sump')
      const r = Dia / 2
      volume_m3 = Math.PI * r * r * eff
    }
    return {
      volume_m3,
      volume_liters: volume_m3 * 1000,
      volume_gallons_us: volume_m3 / VOLUME_CONVERSIONS['ft³'] * 7.48052,
      human_summary: `Sump capacity ${(volume_m3).toFixed(2)} m³`,
    }
  }
}

// Aggregator for UI consumption
export type CapacityKind = 'water-tank' | 'swimming-pool' | 'soak-pit' | 'septic-tank' | 'rainwater' | 'sump'

export const CapacityLibrary = {
  waterTank: WaterTankCalculator,
  swimmingPool: SwimmingPoolCalculator,
  soakPit: SoakPitCalculator,
  septicTank: SepticTankCalculator,
  rainwater: RainwaterHarvestingCalculator,
  sump: SumpCapacityCalculator,
}
