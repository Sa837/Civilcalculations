// Structural defaults and design constants (metric)

export const MATERIAL = {
  concrete_density_kg_m3: 2400,
  steel_density_kg_m3: 7850,
  cement_bag_kg: 50,
  fck_MPa_default: 25,
  fy_MPa_default: 415,
  gamma_c: 1.5,
  gamma_s: 1.15,
}

export const REBAR_DIAMETERS_MM = [6, 8, 10, 12, 16, 20, 25, 32] as const

export type UnitSystem = 'metric' | 'imperial'

export const DEFAULTS = {
  footing: {
    min_thickness_m: 0.45,
    cover_mm: 50,
  },
  wall: {
    min_thickness_m: 0.2,
    cover_mm: 40,
    soil_unit_weight_kN_m3: 18,
    live_surcharge_kN_m2: 10,
  },
  staircase: {
    slab_thickness_m: 0.15,
    cover_mm: 25,
    live_load_kN_m2: 3.0,
  }
}
