export const CalculationUtils = {
  roundTo(n: number, p: number = 3): number {
    const f = Math.pow(10, p)
    return Math.round(n * f) / f
  }
}

export function unitWeightKgPerM(diaMm: number): number {
  return (diaMm * diaMm) / 162
}

export function defaultHookLengthM(hookType?: '90'|'135'|'180'|'custom', dMm?: number, customLengthMm?: number): number {
  if (!hookType || !dMm) return 0
  const d = dMm
  if (hookType === 'custom') return (customLengthMm ?? 0) / 1000
  const map: Record<string, number> = { '90': 9, '135': 12, '180': 16 }
  const mult = map[hookType] ?? 0
  return (mult * d) / 1000
}

export function totalBendAllowanceM(angles: number[] | undefined, dMm: number): number {
  if (!angles || angles.length === 0) return 0
  // Simple allowance: 1d per 45°, 2d per 90°, 3d per 135°, 4d per 180° (scaled)
  // BA(d,θ) ≈ (θ / 45) * 1d
  const dM = dMm / 1000
  return angles.reduce((acc, a) => acc + (a / 45) * dM, 0)
}

export function suggestLapLengthM(dMm: number): number {
  // Typical lap 50d
  return (50 * dMm) / 1000
}
