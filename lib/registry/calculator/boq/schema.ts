export type DesignCode = 'NBC' | 'IS'

export type WorkCategory =
  | 'Site Preparation'
  | 'Earthwork'
  | 'Foundation'
  | 'Substructure'
  | 'Superstructure'
  | 'Roofing'
  | 'Staircase'
  | 'Doors & Windows'
  | 'Flooring & Finishes'
  | 'Plumbing & Sanitary'
  | 'Electrical Works'
  | 'External Works'
  | 'Miscellaneous'

export type Unit = 'm' | 'm2' | 'm3' | 'kg' | 'ton' | 'no' | 'set'
export type MeasurementMode = 'LBH' | 'AREA' | 'VOLUME'

export interface BOQInput {
  item_code: string
  description: string
  category: WorkCategory
  unit: Unit
  group?: string // e.g., Earthwork, RCC, Finishes sub-group headings
  measurement_mode?: MeasurementMode
  // Geometry inputs (as applicable)
  length_m?: number
  breadth_m?: number
  height_m?: number
  thickness_m?: number
  area_m2?: number
  volume_m3?: number
  count_no?: number
  quantity?: number // fallback when direct qty is known

  // Materials flags (to compute material summary)
  cement_bags?: number
  sand_m3?: number
  aggregate_m3?: number
  steel_kg?: number
  bricks_no?: number

  // Labor/productivity
  labor_qty?: number // e.g., m3 of concrete placing by labor

  // Wastage and notes
  wastage_percent?: number // 3-5 default

  // Optional: custom per-unit rate and overheads application
  per_unit_rate?: number
  per_unit_label?: string // e.g., 'Cum', 'Sqm', 'Rm', or custom
  apply_overheads?: boolean // default true
}

export interface RateInput {
  material: 'cement_bag' | 'sand_m3' | 'aggregate_m3' | 'steel_kg' | 'bricks_no' | 'formwork_m2' | 'labor_unit' | 'generic'
  unit: Unit | 'bag' | 'm3' | 'kg' | 'no' | 'm2'
  rate: number // NPR per unit
}

export interface BOQOptions {
  code?: DesignCode // default NBC
  project_name?: string
  location?: string
  client?: string
  designer?: string
  building_type?: 'Residential' | 'Commercial' | 'Mixed use'
  overheads_percent?: number // default 10
  profit_percent?: number // default 15
}

export interface BOQResultItem {
  item_code: string
  description: string
  category: WorkCategory
  group?: string
  unit: Unit
  quantity: number
  rate_material: number
  rate_labor: number
  rate_overheads: number
  rate_total: number
  amount: number
}

export interface BOQMaterialSummary {
  cement_bags: number
  sand_m3: number
  aggregate_m3: number
  steel_kg: number
  bricks_no: number
}

export interface BOQCategorySubtotal {
  category: WorkCategory
  subtotal: number
}

export interface BOQSummary {
  categories: BOQCategorySubtotal[]
  grand_total: number
  materials: BOQMaterialSummary
}

export interface BOQResult {
  project?: string
  code_used?: DesignCode
  project_meta?: {
    project_name?: string
    location?: string
    client?: string
    designer?: string
    building_type?: string
  }
  inputs: BOQInput[]
  rates: RateInput[]
  results: BOQResultItem[]
  summary: BOQSummary
  human_summary?: string
}
