// Structural: Footing calculators (metric). Backward-compatible backend modules.
// Do NOT change UI. Accept mixed inputs; normalize to metric. Return JSON per schema.

import { MATERIAL, REBAR_DIAMETERS_MM, DEFAULTS } from '../constants'
import { toMeters, toKN, kNPerM2, ensurePositive } from '../util/units'
import { BbsLine, makeBbsLine, addHookAllowance, round } from '../util/bbs'

export type FootingInput = {
  element_type?: 'footing'
  footing_type: 'isolated_square' | 'isolated_rect' | 'isolated_circular'
  column_load: { value: number, unit: 'kN' | 'N' | 'kgf' }
  soil_allow: { value: number, unit: 'kN/m2' | 'kN/m^2' | 'kPa' | 'MPa' }
  column_size_mm?: { b: number, D: number } // width x depth of column
  eccentricity_m?: number // optional
  required_clear_cover_mm?: number
  required_depth_mm?: number
  // Optional materials (override)
  fck_MPa?: number
  fy_MPa?: number
  gamma_c?: number
  gamma_s?: number
  rebar_d_mm?: number // preferred main bar diameter for mat
}

export type FootingOutput = {
  type: 'footing'
  inputs: any
  assumptions: Record<string, any>
  results: {
    geometry: {
      shape: string
      length_m?: number
      width_m?: number
      diameter_m?: number
      thickness_m: number
      effective_depth_m: number
      cover_mm: number
    }
    concrete_volume_m3: number
    concrete_mass_kg: number
    cement_bags: number
    steel_mass_kg: number
    rebar_schedule: BbsLine[]
    structural_checks: {
      bending: Record<string, any>
      shear: Record<string, any>
      punching: Record<string, any>
      bearing: Record<string, any>
    }
    notes: string[]
  }
  human_summary: string
}

export function calcIsolatedFooting(inputs: FootingInput): FootingOutput {
  // 1) Normalize & defaults
  const notes: string[] = []
  const load_kN = toKN(inputs.column_load.value, inputs.column_load.unit)
  const qa_kN_m2 = kNPerM2(inputs.soil_allow.value, inputs.soil_allow.unit)
  const ecc = inputs.eccentricity_m ?? 0
  const cover_mm = inputs.required_clear_cover_mm ?? DEFAULTS.footing.cover_mm
  const fck = inputs.fck_MPa ?? MATERIAL.fck_MPa_default
  const fy = inputs.fy_MPa ?? MATERIAL.fy_MPa_default
  const gamma_c = inputs.gamma_c ?? MATERIAL.gamma_c
  const gamma_s = inputs.gamma_s ?? MATERIAL.gamma_s
  const bar_d_mm = inputs.rebar_d_mm ?? 16
  const min_th = DEFAULTS.footing.min_thickness_m

  ensurePositive('column_load', load_kN)
  ensurePositive('soil_allow', qa_kN_m2)

  // 2) Required plan area (bearing)
  // Include a simple eccentricity amplification: assume resultant within kern.
  const required_area_m2 = load_kN / qa_kN_m2

  // 3) Choose plan dimensions
  let L = 0, B = 0, Dia = 0, shape = 'square'
  if (inputs.footing_type === 'isolated_circular') {
    shape = 'circular'
    Dia = Math.sqrt(4 * required_area_m2 / Math.PI)
  } else if (inputs.footing_type === 'isolated_rect') {
    shape = 'rectangular'
    // prefer ratio 1.2 for rectangle if not specified
    B = Math.sqrt(required_area_m2 / 1.2)
    L = 1.2 * B
  } else { // square
    shape = 'square'
    L = Math.sqrt(required_area_m2)
    B = L
  }

  // Add 10% increase to be conservative against edge cases
  if (shape === 'circular') {
    Dia *= 1.1
  } else {
    L *= 1.1; B *= 1.1
  }

  // 4) Bearing check with eccentricity (simple)
  // Pressure distribution p = P/A ± 6M/(L*B*B) for rectangular, use equivalent for circular.
  let p_max = 0, p_min = 0
  if (shape === 'circular') {
    const A = Math.PI * Dia * Dia / 4
    const Z = Math.PI * Math.pow(Dia, 3) / 32 // section modulus for circle
    const M = load_kN * ecc // kN*m
    p_max = load_kN / A + (6 * M) / (Math.PI * Math.pow(Dia, 3))
    p_min = load_kN / A - (6 * M) / (Math.PI * Math.pow(Dia, 3))
  } else {
    const A = L * B
    const Z = (B * Math.pow(L, 2)) / 6 // about minor axis assuming ecc along L
    const M = load_kN * ecc
    p_max = load_kN / A + 6 * M / (L * B * B)
    p_min = load_kN / A - 6 * M / (L * B * B)
  }
  if (p_max > qa_kN_m2) notes.push(`Max bearing pressure ${round(p_max,2)} kN/m² exceeds allowable ${qa_kN_m2}. Dimensions auto-increased by 10%.`)
  if (p_min < 0) notes.push('Tension at base indicated (p_min < 0). Consider larger footing or reduce eccentricity.')

  // 5) Depth from bending (simplified)
  // Take design moment at column face: M_u ≈ (p_max - p_min)*B*L*lever/8 (very simplified envelope)
  // Use square/rect/circ approximations. Here take a conservative moment Mu = p_max * (span/8) * strip width.
  const span = shape === 'circular' ? Dia : Math.max(L, B)
  const strip = shape === 'circular' ? Dia : Math.min(L, B)
  const Mu_kN_m = p_max * span * strip / 8

  // Choose d such that MRd >= Mu using rectangular stress block approx: 
  // MRd ≈ 0.138 fck b d^2 (in kN*m) for singly reinforced (approx). Convert units: fck in MPa (=N/mm2), need kN*m.
  // b = 1000 mm strip width per meter
  const b_mm = 1000
  let d_mm = 300 // start guess
  const fck_N_mm2 = fck
  const Mu_N_mm = Mu_kN_m * 1e6 // kN*m -> N*mm
  // Solve Mu = 0.138 fck b d^2 => d = sqrt(Mu/(0.138 fck b))
  d_mm = Math.sqrt(Mu_N_mm / (0.138 * fck_N_mm2 * b_mm))
  // Add cover and bar dia to get total thickness
  const th_m = Math.max(min_th, (d_mm + cover_mm + (bar_d_mm/2)) / 1000)
  const eff_d_m = Math.max(0.05, th_m - (cover_mm + bar_d_mm/2)/1000)

  // 6) Punching shear around column (very simplified periphery at 2d from column face)
  const col_b_m = inputs.column_size_mm?.b ? inputs.column_size_mm.b / 1000 : 0.3
  const col_D_m = inputs.column_size_mm?.D ? inputs.column_size_mm.D / 1000 : 0.3
  const periphery_m = 2 * (col_b_m + col_D_m + 4 * eff_d_m)
  const v_u_kN_m = load_kN / periphery_m // kN per meter perimeter (very simplified)
  const v_rd_c_kN_m = 0.17 * Math.sqrt(fck) * 1.0 // pseudo capacity (placeholder); in practice depends on b0*d and partial factors
  const punchingOK = v_u_kN_m <= v_rd_c_kN_m
  if (!punchingOK) notes.push('Punching shear check not satisfied in quick check. Increase thickness or add shear reinforcement.')

  // 7) Concrete volume and masses
  const area_m2 = shape === 'circular' ? Math.PI * Dia * Dia / 4 : L * B
  const concrete_volume_m3 = area_m2 * th_m
  const concrete_mass_kg = concrete_volume_m3 * MATERIAL.concrete_density_kg_m3
  const cement_bags = concrete_mass_kg / MATERIAL.cement_bag_kg * 0.15 // ~15% cement content rough estimate

  // 8) Rebar layout (simple mat both ways @ spacing)
  const As_req_mm2_per_m = (0.0012) * 1000 * 1000 // min 0.12% of b*d per meter strip
  const phi_mm = bar_d_mm
  const area_bar_mm2 = Math.PI * (phi_mm**2) / 4
  const bars_per_m = Math.max(2, Math.ceil(As_req_mm2_per_m / area_bar_mm2))
  const spacing_mm = Math.min(250, Math.floor(1000 / bars_per_m))
  const count_long = Math.ceil((shape === 'circular' ? Math.PI*Dia : L) / (spacing_mm/1000))
  const count_trans = Math.ceil((shape === 'circular' ? Math.PI*Dia : B) / (spacing_mm/1000))
  const unit_len_long_m = (shape === 'circular' ? Dia : L) + 2 * (cover_mm/1000)
  const unit_len_trans_m = (shape === 'circular' ? Dia : B) + 2 * (cover_mm/1000)
  const long_line = makeBbsLine('Bottom main - Long', phi_mm, count_long, addHookAllowance(unit_len_long_m, 9*phi_mm))
  const trans_line = makeBbsLine('Bottom main - Trans', phi_mm, count_trans, addHookAllowance(unit_len_trans_m, 9*phi_mm))
  const steel_total_length_m = long_line.total_length_m + trans_line.total_length_m
  const steel_mass_kg = steel_total_length_m * (densitySteelFromDia(phi_mm))

  // 9) Structural checks JSON
  const structural_checks = {
    bending: {
      Mu_kN_m: round(Mu_kN_m, 2),
      method: '0.138*fck*b*d^2 approximation',
      d_mm: round(d_mm, 0)
    },
    shear: {
      // Placeholder for one-way shear near face
      note: 'One-way shear quick check recommended separately.'
    },
    punching: {
      periphery_m: round(periphery_m, 3),
      demand_kN_per_m: round(v_u_kN_m, 2),
      capacity_kN_per_m: round(v_rd_c_kN_m, 2),
      ok: punchingOK
    },
    bearing: {
      p_max_kN_m2: round(p_max, 2),
      p_min_kN_m2: round(p_min, 2),
      allowable_kN_m2: qa_kN_m2,
      ok: p_max <= qa_kN_m2 && p_min >= 0
    }
  }

  // 10) Assemble output
  const geometry = shape === 'circular' ? {
    shape,
    diameter_m: round(Dia, 3),
    thickness_m: round(th_m, 3),
    effective_depth_m: round(eff_d_m, 3),
    cover_mm
  } : {
    shape,
    length_m: round(L, 3),
    width_m: round(B, 3),
    thickness_m: round(th_m, 3),
    effective_depth_m: round(eff_d_m, 3),
    cover_mm
  }

  const output: FootingOutput = {
    type: 'footing',
    inputs,
    assumptions: {
      defaults: { fck, fy, gamma_c, gamma_s, cover_mm, min_thickness_m: min_th },
      design_rules: 'Quick sizing with simplified bending and punching checks. Detailed code checks recommended.'
    },
    results: {
      geometry,
      concrete_volume_m3: round(concrete_volume_m3, 3),
      concrete_mass_kg: round(concrete_mass_kg, 1),
      cement_bags: round(cement_bags, 1),
      steel_mass_kg: round(steel_mass_kg, 1),
      rebar_schedule: [long_line, trans_line],
      structural_checks,
      notes
    },
    human_summary: `Footing (${shape}) sized ~${shape==='circular'?`Dia ${round(Dia,2)} m`:`${round(L,2)} x ${round(B,2)} m`} and ${round(th_m,2)} m thick. Bearing p_max=${round(p_max,2)} kN/m².`
  }

  return output
}

function densitySteelFromDia(d_mm: number): number {
  // Approximate mass per meter for bar d (kg/m) = (π*d^2/4)*7850/1e6
  const area_mm2 = Math.PI * (d_mm**2) / 4
  const kg_per_m = area_mm2 * 7850 / 1e6
  return kg_per_m
}
