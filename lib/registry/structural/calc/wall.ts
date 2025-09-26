// Structural: Wall calculators (cantilever retaining wall basic) per spec
// Backward-compatible modules returning JSON for UI consumption without UI changes.

import { MATERIAL, DEFAULTS } from '../constants'
import { ensurePositive } from '../util/units'
import { BbsLine, makeBbsLine, round } from '../util/bbs'

export type RetainingWallInput = {
  element_type?: 'wall'
  wall_type: 'retaining_cantilever'
  wall_height_m: number
  wall_thickness_m?: number
  wall_length_m?: number
  Ka?: number
  soil_unit_weight_kN_m3?: number
  surcharge_kN_m2?: number
  fck_MPa?: number
  fy_MPa?: number
  cover_mm?: number
}

export type WallOutput = {
  type: 'wall'
  inputs: any
  assumptions: Record<string, any>
  results: {
    geometry: Record<string, number | string>
    concrete_volume_m3: number
    concrete_mass_kg: number
    cement_bags: number
    steel_mass_kg: number
    rebar_schedule: BbsLine[]
    structural_checks: Record<string, any>
    notes: string[]
  }
  human_summary: string
}

export function calcRetainingWallCantilever(inputs: RetainingWallInput): WallOutput {
  const notes: string[] = []
  const H = inputs.wall_height_m
  ensurePositive('wall_height_m', H)

  const t = inputs.wall_thickness_m ?? DEFAULTS.wall.min_thickness_m
  const L = inputs.wall_length_m ?? 1.0 // per meter length default
  const Ka = inputs.Ka ?? 0.33
  const gamma_soil = inputs.soil_unit_weight_kN_m3 ?? DEFAULTS.wall.soil_unit_weight_kN_m3
  const surcharge = inputs.surcharge_kN_m2 ?? DEFAULTS.wall.live_surcharge_kN_m2
  const fck = inputs.fck_MPa ?? MATERIAL.fck_MPa_default
  const fy = inputs.fy_MPa ?? MATERIAL.fy_MPa_default
  const cover = inputs.cover_mm ?? DEFAULTS.wall.cover_mm

  // Lateral pressure: triangular from 0 to Ka*gamma*H at base + uniform Ka*surcharge
  const p_base = Ka * gamma_soil * H
  const P_tri = 0.5 * Ka * gamma_soil * H * H // resultant of triangular
  const P_uni = Ka * surcharge * H
  const P_total = P_tri + P_uni // kN/m length

  // Resultant location from base: ybar for triangular = H/3 from base; for uniform = H/2
  const M_base = P_tri * (H / 3) + P_uni * (H / 2) // kN*m per m length

  // Design as cantilever slab per meter width
  // Mu = M_base, choose thickness such that MRd ~ 0.138 fck b d^2 >= Mu
  const b_mm = 1000
  const Mu_Nmm = M_base * 1e6
  let d_mm = Math.sqrt(Mu_Nmm / (0.138 * fck * b_mm))
  const req_t_m = Math.max(t, (d_mm + cover + 12) / 1000)

  // Concrete volume for stem (per meter length)
  const conc_vol_m3 = req_t_m * H * L
  const conc_mass_kg = conc_vol_m3 * MATERIAL.concrete_density_kg_m3
  const cement_bags = conc_mass_kg / MATERIAL.cement_bag_kg * 0.15

  // Reinforcement per meter (minimum)
  const As_min_mm2_per_m = 0.0012 * 1000 * 1000
  const phi = 12
  const area_bar = Math.PI * phi * phi / 4
  const bars_per_m = Math.max(2, Math.ceil(As_min_mm2_per_m / area_bar))
  const spacing_mm = Math.floor(1000 / bars_per_m)
  const bar_len_m = H + 2 * (cover / 1000)
  const rebar = [makeBbsLine('Vertical main', phi, bars_per_m, bar_len_m)]
  const steel_mass_kg = rebar.reduce((s, r) => s + r.total_length_m * (steelMassPerM(phi)), 0)

  const output: WallOutput = {
    type: 'wall',
    inputs,
    assumptions: {
      defaults: { Ka, gamma_soil, surcharge, fck, fy, cover_mm: cover },
      method: 'Rankine active pressure; cantilever wall stem design per meter width (quick check)'
    },
    results: {
      geometry: {
        type: 'cantilever',
        height_m: round(H, 3),
        thickness_m: round(req_t_m, 3),
        length_m: L
      },
      concrete_volume_m3: round(conc_vol_m3, 3),
      concrete_mass_kg: round(conc_mass_kg, 1),
      cement_bags: round(cement_bags, 1),
      steel_mass_kg: round(steel_mass_kg, 1),
      rebar_schedule: rebar,
      structural_checks: {
        bending: { Mu_kN_m: round(M_base, 2), d_mm: round(d_mm, 0) },
        sliding: { note: 'Provide base; sliding check out of scope in stem-only calc' },
        overturning: { note: 'Check base geometry; not included in stem-only calc' }
      },
      notes
    },
    human_summary: `Retaining wall stem designed per meter width; thickness ~${round(req_t_m,2)} m; base/heel/toe to be designed.`
  }

  return output
}

function steelMassPerM(d_mm: number): number {
  const area_mm2 = Math.PI * (d_mm ** 2) / 4
  return area_mm2 * 7850 / 1e6
}
