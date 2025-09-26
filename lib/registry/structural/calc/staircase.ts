// Structural: Staircase calculators (straight and dog-leg)
// Returns JSON per common schema without requiring UI changes.

import { MATERIAL, DEFAULTS } from '../constants'
import { ensurePositive } from '../util/units'
import { makeBbsLine, round } from '../util/bbs'

export type StairInput = {
  element_type?: 'staircase'
  stair_type: 'straight' | 'dogleg'
  total_rise_m: number
  total_run_m: number
  slab_thickness_m?: number
  nosing_mm?: number
  finish_thickness_mm?: number
  live_load_kN_m2?: number
  fck_MPa?: number
  fy_MPa?: number
  cover_mm?: number
}

export type StairOutput = {
  type: 'staircase'
  inputs: any
  assumptions: Record<string, any>
  results: {
    geometry: Record<string, number | string>
    concrete_volume_m3: number
    concrete_mass_kg: number
    cement_bags: number
    steel_mass_kg: number
    rebar_schedule: ReturnType<typeof makeBbsLine>[]
    structural_checks: Record<string, any>
    notes: string[]
  }
  human_summary: string
}

export function calcStairStraight(inputs: StairInput): StairOutput {
  const notes: string[] = []
  const rise = inputs.total_rise_m; ensurePositive('total_rise_m', rise)
  const run = inputs.total_run_m; ensurePositive('total_run_m', run)
  const t_slab = inputs.slab_thickness_m ?? DEFAULTS.staircase.slab_thickness_m
  const cover = inputs.cover_mm ?? DEFAULTS.staircase.cover_mm
  const fck = inputs.fck_MPa ?? MATERIAL.fck_MPa_default
  const fy = inputs.fy_MPa ?? MATERIAL.fy_MPa_default
  const LL = inputs.live_load_kN_m2 ?? DEFAULTS.staircase.live_load_kN_m2

  // Geometry: choose 17 risers typical, adjust treads accordingly (simple rule; report notes if outside bounds)
  let n_risers = Math.round(rise / 0.175)
  n_risers = Math.max(10, Math.min(22, n_risers))
  const riser_h = rise / n_risers
  const n_treads = n_risers - 1
  const tread_w = run / n_treads
  if (riser_h < 0.14 || riser_h > 0.19) notes.push(`Riser height ${round(riser_h,3)} m out of typical 0.14–0.19 m.`)
  if (tread_w < 0.25 || tread_w > 0.35) notes.push(`Tread width ${round(tread_w,3)} m out of typical 0.25–0.35 m.`)

  // Effective span ~ run along slope
  const slope_len = Math.sqrt(rise*rise + run*run)
  const self_weight_kN_m2 = MATERIAL.concrete_density_kg_m3/1000 * t_slab * 9.81 / 9.81 // ≈ 24 * t
  const w_kN_m = (self_weight_kN_m2 + LL) * 1.0 // per meter width

  // Max moment for simply supported slab (approx): wL^2/8
  const Mu = w_kN_m * slope_len * slope_len / 8
  const Mu_Nmm = Mu * 1e6
  const b_mm = 1000
  let d_mm = Math.sqrt(Mu_Nmm / (0.138 * fck * b_mm))
  const thickness_m = Math.max(t_slab, (d_mm + cover + 12)/1000)

  // Material quantities (per meter width)
  const conc_vol = thickness_m * slope_len * 1.0
  const conc_mass = conc_vol * MATERIAL.concrete_density_kg_m3
  const cement_bags = conc_mass / MATERIAL.cement_bag_kg * 0.15

  // Rebar (minimum per meter)
  const As_min = 0.0012 * 1000 * 1000
  const phi = 12
  const area_bar = Math.PI * phi * phi / 4
  const bars_per_m = Math.max(2, Math.ceil(As_min / area_bar))
  const spacing_mm = Math.floor(1000 / bars_per_m)
  const bar_len_m = slope_len + 2*(cover/1000)
  const main = makeBbsLine('Main along flight', phi, bars_per_m, bar_len_m)
  const steel_mass = main.total_length_m * steelMassPerM(phi)

  return {
    type: 'staircase',
    inputs,
    assumptions: {
      defaults: { t_slab, cover, fck, fy, LL },
      rules: 'Quick slab design of stair flight per meter width; landing design not included.'
    },
    results: {
      geometry: {
        type: 'straight',
        total_rise_m: round(rise,3),
        total_run_m: round(run,3),
        risers: n_risers,
        treads: n_treads,
        riser_h_m: round(riser_h,3),
        tread_w_m: round(tread_w,3),
        thickness_m: round(thickness_m,3)
      },
      concrete_volume_m3: round(conc_vol,3),
      concrete_mass_kg: round(conc_mass,1),
      cement_bags: round(cement_bags,1),
      steel_mass_kg: round(steel_mass,1),
      rebar_schedule: [main],
      structural_checks: { bending: { Mu_kN_m: round(Mu,2), d_mm: round(d_mm,0) }, deflection: { note: 'Span/depth quick check advised.' } },
      notes
    },
    human_summary: `Straight stair: ${n_risers} risers @ ${round(riser_h,3)} m, ${n_treads} treads @ ${round(tread_w,3)} m; thickness ~${round(thickness_m,2)} m.`
  }
}

function steelMassPerM(d_mm: number): number {
  const area_mm2 = Math.PI * (d_mm ** 2) / 4
  return area_mm2 * 7850 / 1e6
}
