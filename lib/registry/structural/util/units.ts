// Unit helpers: accept mixed units but normalize to metric for calculations

export type LengthUnit = 'm' | 'mm' | 'cm' | 'ft' | 'in'
export type ForceUnit = 'kN' | 'N' | 'kgf'
export type PressureUnit = 'kPa' | 'MPa' | 'kN/m2' | 'kN/m^2'

export function toMeters(value: number, unit: LengthUnit): number {
  switch (unit) {
    case 'm': return value
    case 'mm': return value / 1000
    case 'cm': return value / 100
    case 'ft': return value * 0.3048
    case 'in': return value * 0.0254
  }
}

export function toMillimeters(valueM: number): number {
  return valueM * 1000
}

export function toKN(value: number, unit: ForceUnit): number {
  switch (unit) {
    case 'kN': return value
    case 'N': return value / 1000
    case 'kgf': return value * 9.80665 / 1000
  }
}

export function kNPerM2(value: number, unit: PressureUnit): number {
  switch (unit) {
    case 'kN/m2':
    case 'kN/m^2':
      return value
    case 'kPa':
      return value // 1 kPa = 1 kN/m2
    case 'MPa':
      return value * 1000
  }
}

export function clamp(val: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, val))
}

export function ensurePositive(name: string, v: number) {
  if (!(v > 0)) throw new Error(`${name} must be > 0`)
}
