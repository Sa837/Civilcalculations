export type ElementType = 'beam' | 'column' | 'slab' | 'footing' | 'wall' | 'stair' | 'custom'
export type BarType = 'Main' | 'Secondary' | 'Stirrups/Ties' | 'Distribution' | 'Extra'

export interface BBSInputItem {
  element_type: ElementType
  member_id: string
  bar_type: BarType
  bar_diameter_mm: number
  num_bars: number
  spacing_mm?: number
  clear_length_m: number
  hook_type?: '90' | '135' | '180' | 'custom'
  hook_length_mm?: number
  bend_angles?: number[] // degrees per bend
  development_length_m?: number
  cover_mm?: number
  wastage_percent?: number // default 3
  lap_length_m?: number
  stock_length_m?: number // default 12
  steel_rate_per_kg?: number // optional cost rate
}

export interface BBSResultItem {
  member_id: string
  bar_type: BarType
  bar_diameter_mm: number
  num_bars: number
  cutting_length_m: number
  total_length_m: number
  unit_weight_kg_per_m: number
  total_weight_kg: number
  hook_details?: string
  lap_length_m?: number
  total_cost?: number
  remarks?: string
  notes?: string[]
}

export interface BBSResultSummary {
  total_steel_weight_kg: number
  total_bars: number
  grand_total_length_m: number
  total_cost?: number
}

export interface BBSResult {
  project: string
  inputs: BBSInputItem[]
  results: BBSResultItem[]
  summary: BBSResultSummary
  human_summary: string
}
