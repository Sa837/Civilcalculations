import Big from 'big.js'

export type UnitDef = {
  name: string
  symbol: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

export type Converter =
  | {
      slug: string
      title: string
      category: string
      groups: { name: string; units: UnitDef[] }[]
      examples?: string[]
      convert?: (value: number, from: string, to: string) => number
    }
  | {
      slug: string
      title: string
      category: string
      units: UnitDef[]
      convert: (value: number, from: string, to: string) => number
    }

export function linearUnit(factorToBase: number, symbol: string, name?: string): UnitDef {
  return {
    name: name ?? symbol,
    symbol,
    toBase: (v: number) => v * factorToBase,
    fromBase: (v: number) => v / factorToBase,
  }
}

// Temperature handled separately due to offsets
export const temperatureUnits: UnitDef[] = [
  {
    name: 'Celsius',
    symbol: '°C',
    toBase: (v: number) => v + 273.15, // base = Kelvin
    fromBase: (v: number) => v - 273.15,
  },
  {
    name: 'Fahrenheit',
    symbol: '°F',
    toBase: (v: number) => ((v - 32) * 5) / 9 + 273.15,
    fromBase: (v: number) => ((v - 273.15) * 9) / 5 + 32,
  },
  {
    name: 'Kelvin',
    symbol: 'K',
    toBase: (v: number) => v, // base already Kelvin
    fromBase: (v: number) => v,
  },
]

export function makeConverter(slug: string, title: string, category: string, units: UnitDef[]): Converter {
  return {
    slug,
    title,
    category,
    units,
    convert: (value: number, from: string, to: string): number => {
      const fromU = units.find((u) => u.symbol === from || u.name === from)
      const toU = units.find((u) => u.symbol === to || u.name === to)
      if (!fromU || !toU) throw new Error('Unknown unit')
      const base = fromU.toBase(value)
      const out = toU.fromBase(base)
      return out
    },
  }
}





