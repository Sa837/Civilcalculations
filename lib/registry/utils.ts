// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\utils.ts
// Universal utility functions for civil engineering calculations

import { DENSITIES, UnitConverter, LENGTH_CONVERSIONS, AREA_CONVERSIONS, VOLUME_CONVERSIONS, MASS_CONVERSIONS } from './globalunits'

// =========================
// Volume Calculations
// =========================

/**
 * Calculate volume from dimensions
 */
export function calculateVolume(length: number, width: number, height: number): number {
  return length * width * height
}

/**
 * Calculate volume from area and height
 */
export function calculateVolumeFromArea(area: number, height: number): number {
  return area * height
}

/**
 * Calculate cylindrical volume
 */
export function calculateCylindricalVolume(diameter: number, height: number): number {
  const radius = diameter / 2
  return Math.PI * radius * radius * height
}

/**
 * Calculate spherical volume
 */
export function calculateSphericalVolume(diameter: number): number {
  const radius = diameter / 2
  return (4 / 3) * Math.PI * radius * radius * radius
}

// =========================
// Area Calculations
// =========================

/**
 * Calculate rectangular area
 */
export function calculateRectangularArea(length: number, width: number): number {
  return length * width
}

/**
 * Calculate circular area
 */
export function calculateCircularArea(diameter: number): number {
  const radius = diameter / 2
  return Math.PI * radius * radius
}

/**
 * Calculate triangular area
 */
export function calculateTriangularArea(base: number, height: number): number {
  return 0.5 * base * height
}

/**
 * Calculate trapezoidal area
 */
export function calculateTrapezoidalArea(topWidth: number, bottomWidth: number, height: number): number {
  return 0.5 * (topWidth + bottomWidth) * height
}

// =========================
// Opening Deductions
// =========================

export interface Opening {
  width: number
  height: number
  unitSystem?: 'metric' | 'imperial'
}

/**
 * Calculate total area of openings
 */
export function calculateOpeningsArea(openings: Opening[], wallThickness: number = 0): number {
  return openings.reduce((total, opening) => {
    const openingArea = calculateRectangularArea(opening.width, opening.height)
    return total + openingArea
  }, 0)
}

/**
 * Calculate total volume of openings
 */
export function calculateOpeningsVolume(openings: Opening[], wallThickness: number): number {
  return openings.reduce((total, opening) => {
    const openingVolume = calculateVolume(opening.width, opening.height, wallThickness)
    return total + openingVolume
  }, 0)
}

/**
 * Calculate net area after deducting openings
 */
export function calculateNetArea(totalArea: number, openings: Opening[]): number {
  const openingsArea = calculateOpeningsArea(openings)
  return Math.max(totalArea - openingsArea, 0)
}

/**
 * Calculate net volume after deducting openings
 */
export function calculateNetVolume(totalVolume: number, openings: Opening[], wallThickness: number): number {
  const openingsVolume = calculateOpeningsVolume(openings, wallThickness)
  return Math.max(totalVolume - openingsVolume, 0)
}

// =========================
// Material Calculations
// =========================

/**
 * Calculate cement weight from volume
 */
export function calculateCementWeight(volume: number): number {
  return volume * DENSITIES.cement
}

/**
 * Calculate sand weight from volume
 */
export function calculateSandWeight(volume: number): number {
  return volume * DENSITIES.sand
}

/**
 * Calculate aggregate weight from volume
 */
export function calculateAggregateWeight(volume: number): number {
  return volume * DENSITIES.aggregate
}

/**
 * Calculate steel weight from volume
 */
export function calculateSteelWeight(volume: number): number {
  return volume * DENSITIES.steel
}

/**
 * Calculate number of cement bags from weight
 */
export function calculateCementBags(weightKg: number): number {
  return weightKg / DENSITIES.cementBag
}

/**
 * Calculate water volume for concrete (typically 0.4-0.6 water-cement ratio)
 */
export function calculateWaterVolume(cementWeight: number, waterCementRatio: number = 0.5): number {
  return (cementWeight * waterCementRatio) / DENSITIES.water
}

// =========================
// Mix Ratio Calculations
// =========================

export interface MixRatio {
  cement: number
  sand: number
  aggregate?: number
  water?: number
}

// Result interfaces for common calculation patterns
export interface MasonryMaterialsResult {
  numberOfUnits: number
  cementWeight: number
  sandWeight: number
  mortarVolume: number
  cementBags: number
}

export interface ConcreteMaterialsResult {
  cementWeight: number
  sandWeight: number
  aggregateWeight: number
  waterVolume: number
  cementBags: number
  dryVolume: number
  wetVolume: number
}

/**
 * Calculate material quantities from mix ratio and total volume
 */
export function calculateMaterialsFromMixRatio(
  totalVolume: number,
  mixRatio: MixRatio,
  isDryVolume: boolean = false
): {
  cementVolume: number
  sandVolume: number
  aggregateVolume: number
  cementWeight: number
  sandWeight: number
  aggregateWeight: number
  waterVolume: number
} {
  const totalParts = mixRatio.cement + mixRatio.sand + (mixRatio.aggregate || 0)
  
  // Convert wet volume to dry volume if needed (typically 1.54 factor for concrete)
  const workingVolume = isDryVolume ? totalVolume : totalVolume * 1.54
  
  const cementVolume = (mixRatio.cement / totalParts) * workingVolume
  const sandVolume = (mixRatio.sand / totalParts) * workingVolume
  const aggregateVolume = mixRatio.aggregate ? (mixRatio.aggregate / totalParts) * workingVolume : 0
  
  const cementWeight = calculateCementWeight(cementVolume)
  const sandWeight = calculateSandWeight(sandVolume)
  const aggregateWeight = calculateAggregateWeight(aggregateVolume)
  const waterVolume = calculateWaterVolume(cementWeight, mixRatio.water || 0.5)
  
  return {
    cementVolume,
    sandVolume,
    aggregateVolume,
    cementWeight,
    sandWeight,
    aggregateWeight,
    waterVolume
  }
}

// =========================
// Wastage Factor Application
// =========================

/**
 * Apply wastage factor to a value
 */
export function applyWastageFactor(value: number, wastagePercent: number): number {
  return value * (1 + wastagePercent / 100)
}

/**
 * Apply wastage factor to multiple values
 */
export function applyWastageToMaterials(
  materials: Record<string, number>,
  wastagePercent: number
): Record<string, number> {
  const result: Record<string, number> = {}
  
  for (const [key, value] of Object.entries(materials)) {
    result[key] = applyWastageFactor(value, wastagePercent)
  }
  
  return result
}

// =========================
// Unit Conversion Helpers
// =========================

/**
 * Convert dimensions to consistent units for calculation
 */
export function normalizeDimensions(
  dimensions: { length?: number; width?: number; height?: number; area?: number },
  fromUnit: 'metric' | 'imperial'
): { length?: number; width?: number; height?: number; area?: number } {
  const lengthUnit = fromUnit === 'metric' ? 'm' : 'ft'
  const areaUnit = fromUnit === 'metric' ? 'm²' : 'ft²'
  
  const result: typeof dimensions = {}
  
  if (dimensions.length !== undefined) {
    result.length = UnitConverter.convertLength(dimensions.length, lengthUnit, 'm')
  }
  if (dimensions.width !== undefined) {
    result.width = UnitConverter.convertLength(dimensions.width, lengthUnit, 'm')
  }
  if (dimensions.height !== undefined) {
    result.height = UnitConverter.convertLength(dimensions.height, lengthUnit, 'm')
  }
  if (dimensions.area !== undefined) {
    result.area = UnitConverter.convertArea(dimensions.area, areaUnit, 'm²')
  }
  
  return result
}

/**
 * Convert openings to consistent units
 */
export function normalizeOpenings(
  openings: Opening[],
  defaultUnit: 'metric' | 'imperial' = 'metric'
): Opening[] {
  return openings.map(opening => {
    const unitSystem = opening.unitSystem || defaultUnit
    const lengthUnit = unitSystem === 'metric' ? 'm' : 'ft'
    
    return {
      ...opening,
      width: UnitConverter.convertLength(opening.width, lengthUnit, 'm'),
      height: UnitConverter.convertLength(opening.height, lengthUnit, 'm'),
      unitSystem: 'metric'
    }
  })
}

// =========================
// Rounding and Formatting
// =========================

/**
 * Round to specified decimal places
 */
export function roundTo(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Format calculation results with appropriate rounding
 */
export function formatCalculationResults<T extends Record<string, number>>(
  results: T,
  roundingRules: Partial<Record<keyof T, number>> = {}
): T {
  const formatted = {} as T
  
  for (const [key, value] of Object.entries(results)) {
    const decimals = roundingRules[key as keyof T] ?? 2
    formatted[key as keyof T] = roundTo(value, decimals) as T[keyof T]
  }
  
  return formatted
}

// =========================
// Validation Helpers
// =========================

/**
 * Validate that a value is positive
 */
export function validatePositive(value: number, fieldName: string): void {
  if (value <= 0) {
    throw new Error(`${fieldName} must be greater than zero`)
  }
}

/**
 * Validate dimensions
 */
export function validateDimensions(dimensions: {
  length?: number
  width?: number
  height?: number
  area?: number
}): void {
  if (dimensions.length !== undefined) validatePositive(dimensions.length, 'Length')
  if (dimensions.width !== undefined) validatePositive(dimensions.width, 'Width')
  if (dimensions.height !== undefined) validatePositive(dimensions.height, 'Height')
  if (dimensions.area !== undefined) validatePositive(dimensions.area, 'Area')
}

/**
 * Validate mix ratio
 */
export function validateMixRatio(mixRatio: MixRatio): void {
  validatePositive(mixRatio.cement, 'Cement ratio')
  validatePositive(mixRatio.sand, 'Sand ratio')
  if (mixRatio.aggregate !== undefined) {
    validatePositive(mixRatio.aggregate, 'Aggregate ratio')
  }
}

// =========================
// Common Calculation Patterns
// =========================

/**
 * Standard masonry calculation pattern
 */
export function calculateMasonryMaterials(
  netVolume: number,
  unitVolume: number,
  mortarRatio: MixRatio,
  wastagePercent: number = 5
): MasonryMaterialsResult {
  // Calculate number of units
  const numberOfUnits = netVolume / unitVolume
  
  // Calculate mortar volume (remaining space)
  const mortarVolume = netVolume - (numberOfUnits * unitVolume)
  
  // Calculate materials from mortar
  const materials = calculateMaterialsFromMixRatio(mortarVolume, mortarRatio, true)
  
  // Apply wastage
  const withWastage = applyWastageToMaterials({
    numberOfUnits,
    cementWeight: materials.cementWeight,
    sandWeight: materials.sandWeight,
    mortarVolume
  }, wastagePercent)
  
  return {
    numberOfUnits: withWastage.numberOfUnits,
    cementWeight: withWastage.cementWeight,
    sandWeight: withWastage.sandWeight,
    mortarVolume: withWastage.mortarVolume,
    cementBags: Math.ceil(calculateCementBags(withWastage.cementWeight))
  }
}

/**
 * Standard concrete calculation pattern
 */
export function calculateConcreteMaterials(
  volume: number,
  mixRatio: MixRatio,
  wastagePercent: number = 5
): ConcreteMaterialsResult {
  const materials = calculateMaterialsFromMixRatio(volume, mixRatio, false)
  
  const withWastage = applyWastageToMaterials({
    cementWeight: materials.cementWeight,
    sandWeight: materials.sandWeight,
    aggregateWeight: materials.aggregateWeight,
    waterVolume: materials.waterVolume
  }, wastagePercent)
  
  return {
    cementWeight: withWastage.cementWeight,
    sandWeight: withWastage.sandWeight,
    aggregateWeight: withWastage.aggregateWeight,
    waterVolume: withWastage.waterVolume,
    cementBags: Math.ceil(calculateCementBags(withWastage.cementWeight)),
    dryVolume: volume * 1.54,
    wetVolume: volume
  }
}

// =========================
// Export all utilities
// =========================

export const CalculationUtils = {
  // Volume calculations
  calculateVolume,
  calculateVolumeFromArea,
  calculateCylindricalVolume,
  calculateSphericalVolume,
  
  // Area calculations
  calculateRectangularArea,
  calculateCircularArea,
  calculateTriangularArea,
  calculateTrapezoidalArea,
  
  // Opening deductions
  calculateOpeningsArea,
  calculateOpeningsVolume,
  calculateNetArea,
  calculateNetVolume,
  
  // Material calculations
  calculateCementWeight,
  calculateSandWeight,
  calculateAggregateWeight,
  calculateSteelWeight,
  calculateCementBags,
  calculateWaterVolume,
  
  // Mix ratios
  calculateMaterialsFromMixRatio,
  
  // Wastage
  applyWastageFactor,
  applyWastageToMaterials,
  
  // Unit conversions
  normalizeDimensions,
  normalizeOpenings,
  
  // Formatting
  roundTo,
  formatCalculationResults,
  
  // Validation
  validatePositive,
  validateDimensions,
  validateMixRatio,
  
  // Common patterns
  calculateMasonryMaterials,
  calculateConcreteMaterials
}

export default CalculationUtils
