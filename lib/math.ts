export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function toFixedNumber(value: number, digits = 6): number {
  const p = Math.pow(10, digits)
  return Math.round(value * p) / p
}






