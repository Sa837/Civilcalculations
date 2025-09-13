export type ResourceCategory = 
  | "Codes" 
  | "District Rates" 
  | "Rules and Regulations" 
  | "Notes" 
  | "Notices"

export type ResourceRegion = 
  | "Nepal" 
  | "India" 
  | "US" 
  | "Europe" 
  | "Other Regions"

export type SortOption = 
  | "Newest" 
  | "Oldest" 
  | "A-Z" 
  | "Z-A" 
  | "Favorite"

export interface ResourceSubItem {
  title: string
  url: string
}

export interface Resource {
  slug: string
  title: string
  description: string
  category: ResourceCategory
  region: ResourceRegion
  subItems?: ResourceSubItem[]
  createdAt: Date
  updatedAt: Date
  isFavorite?: boolean
  parentResource?: Resource
}

export interface ResourceFilters {
  category?: ResourceCategory
  region?: ResourceRegion
  search?: string
  sort?: SortOption
}
