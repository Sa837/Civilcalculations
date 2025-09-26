export type ElementType = 'beam' | 'column' | 'slab' | 'footing' | 'wall' | 'stair' | 'custom'
export type BarType = 'Main' | 'Secondary' | 'Stirrups/Ties' | 'Distribution' | 'Extra'
export type DesignCode = 'NBC' | 'IS' | 'ACI'

export interface BBSOptions {
  code?: DesignCode // default NBC
  project_name?: string
  location?: string
  designer?: string
  stock_length_m?: number // default 12 m
  default_cover_mm?: number // applied when input cover is missing
  wastage_percent_default?: number // default 3-5
}

export type ShapeCode = 'straight' | 'L' | 'U' | 'crank' | 'stirrup' | 'spiral' | 'custom'

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
  bend_angles?: number[]
  development_length_m?: number
  cover_mm?: number
  wastage_percent?: number
  lap_length_m?: number
  stock_length_m?: number
  steel_rate_per_kg?: number
  shape_preference?: ShapeCode
  // Optional geometry for advanced generators (placeholders for future expansion)
  length_m?: number
  width_m?: number
  depth_m?: number
  height_m?: number
  thickness_m?: number
}

export interface BBSResultItem {
  bar_mark: string
  shape_code: ShapeCode
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
  by_diameter?: Array<{
    bar_diameter_mm: number
    total_length_m: number
    total_weight_kg: number
    count: number
  }>
}

export interface BBSResult {
  project?: string
  code_used?: DesignCode
  project_meta?: {
    project_name?: string
    location?: string
    designer?: string
  }
  inputs: BBSInputItem[]
  results: BBSResultItem[]
  summary: BBSResultSummary
  human_summary?: string
  compliance_notes?: string[]
}
