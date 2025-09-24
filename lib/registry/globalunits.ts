// C:\Users\hello\OneDrive\Desktop\CivilPro\lib\registry\globalunits.ts

// Universal density constants
export const DENSITIES = {
  cement: 1440,      // kg/m³
  sand: 1600,        // kg/m³
  cementBag: 50,     // kg per bag
  water: 1000,       // kg/m³
  aggregate: 1500,   // kg/m³
  steel: 7850,       // kg/m³
};

// Universal unit conversion factors (to meters)
export const LENGTH_CONVERSIONS = {
  m: 1,
  ft: 0.3048,
  cm: 0.01,
  mm: 0.001,
  in: 0.0254,
  yd: 0.9144,
};

// Area conversion factors (to square meters)
export const AREA_CONVERSIONS = {
  'm²': 1,
  'ft²': 0.092903,
  'cm²': 0.0001,
  'mm²': 0.000001,
  'in²': 0.00064516,
  'yd²': 0.836127,
};

// Volume conversion factors (to cubic meters)
export const VOLUME_CONVERSIONS = {
  'm³': 1,
  'ft³': 0.0283168,
  'cm³': 0.000001,
  'mm³': 0.000000001,
  'in³': 0.0000163871,
  'yd³': 0.764555,
  'L': 0.001,
  'mL': 0.000001,
};

// Mass conversion factors (to kilograms)
export const MASS_CONVERSIONS = {
  kg: 1,
  g: 0.001,
  lb: 0.453592,
  ton: 1000,
};

// Universal conversion functions
export class UnitConverter {
  // Length conversions
  static convertLength(value: number, fromUnit: keyof typeof LENGTH_CONVERSIONS, toUnit: keyof typeof LENGTH_CONVERSIONS = 'm'): number {
    const valueInMeters = value * LENGTH_CONVERSIONS[fromUnit];
    return valueInMeters / LENGTH_CONVERSIONS[toUnit];
  }

  // Area conversions
  static convertArea(value: number, fromUnit: keyof typeof AREA_CONVERSIONS, toUnit: keyof typeof AREA_CONVERSIONS = 'm²'): number {
    const valueInSquareMeters = value * AREA_CONVERSIONS[fromUnit];
    return valueInSquareMeters / AREA_CONVERSIONS[toUnit];
  }

  // Volume conversions
  static convertVolume(value: number, fromUnit: keyof typeof VOLUME_CONVERSIONS, toUnit: keyof typeof VOLUME_CONVERSIONS = 'm³'): number {
    const valueInCubicMeters = value * VOLUME_CONVERSIONS[fromUnit];
    return valueInCubicMeters / VOLUME_CONVERSIONS[toUnit];
  }

  // Mass conversions
  static convertMass(value: number, fromUnit: keyof typeof MASS_CONVERSIONS, toUnit: keyof typeof MASS_CONVERSIONS = 'kg'): number {
    const valueInKg = value * MASS_CONVERSIONS[fromUnit];
    return valueInKg / MASS_CONVERSIONS[toUnit];
  }

  // Brick dimension conversion (specialized for brickwork)
  static convertBrickDimension(value: number, fromUnit: 'mm' | 'in', toUnit: 'mm' | 'in'): number {
    if (fromUnit === toUnit) return value;
    
    if (fromUnit === 'mm' && toUnit === 'in') {
      return value / 25.4;
    } else if (fromUnit === 'in' && toUnit === 'mm') {
      return value * 25.4;
    }
    
    return value;
  }

  // Get appropriate unit for display based on system
  static getDisplayUnit(system: 'metric' | 'imperial', dimensionType: 'length' | 'area' | 'volume' | 'mass' | 'brick'): string {
    if (dimensionType === 'brick') {
      return system === 'metric' ? 'mm' : 'in';
    }

    const units = {
      metric: { length: 'm', area: 'm²', volume: 'm³', mass: 'kg' },
      imperial: { length: 'ft', area: 'ft²', volume: 'ft³', mass: 'lb' }
    };

    return units[system][dimensionType];
  }
}

// Common unit presets for calculators
export const UNIT_PRESETS = {
  brickwork: {
    metric: {
      length: 'm' as const,
      area: 'm²' as const,
      volume: 'm³' as const,
      mass: 'kg' as const,
      brick: 'mm' as const,
      defaultWallThickness: '0.102', // 4 inch in meters
      defaultMortarThickness: '10', // mm
    },
    imperial: {
      length: 'ft' as const,
      area: 'ft²' as const,
      volume: 'ft³' as const,
      mass: 'lb' as const,
      brick: 'in' as const,
      defaultWallThickness: '0.33', // 4 inch in feet
      defaultMortarThickness: '0.394', // ~10mm in inches
    }
  }
};

// Backward compatibility
export const UNIT_CONVERSIONS = LENGTH_CONVERSIONS;