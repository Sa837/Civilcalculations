// Bar Bending Schedule (BBS) utilities
export type BbsLine = {
  name: string
  bar_d_mm: number
  count: number
  unit_length_m: number
  total_length_m: number
}

export function makeBbsLine(name: string, d_mm: number, count: number, unitLen_m: number): BbsLine {
  return {
    name,
    bar_d_mm: d_mm,
    count,
    unit_length_m: round(unitLen_m, 3),
    total_length_m: round(count * unitLen_m, 3)
  }
}

export function addHookAllowance(unitLen_m: number, hook_mm: number = 9 * 16): number {
  // default hook 9d for 16 mm if not provided
  return unitLen_m + hook_mm / 1000
}

export function round(v: number, d = 3): number {
  const f = Math.pow(10, d)
  return Math.round(v * f) / f
}
