import Big from 'big.js'

export type UnitDef = {
  name: string
  symbol: string
  toBase: (v: Big) => Big
  fromBase: (v: Big) => Big
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
  const f = new Big(factorToBase)
  return {
    name: name ?? symbol,
    symbol,
    toBase: (v) => v.times(f),
    fromBase: (v) => v.div(f),
  }
}

// Temperature handled separately due to offsets
export const temperatureUnits: UnitDef[] = [
  {
    name: 'Celsius',
    symbol: '°C',
    toBase: (v) => v.plus(273.15), // base = Kelvin
    fromBase: (v) => v.minus(273.15),
  },
  {
    name: 'Fahrenheit',
    symbol: '°F',
    toBase: (v) => v.minus(32).times(5).div(9).plus(273.15),
    fromBase: (v) => v.minus(273.15).times(9).div(5).plus(32),
  },
  {
    name: 'Kelvin',
    symbol: 'K',
    toBase: (v) => v, // base already Kelvin
    fromBase: (v) => v,
  },
]

export function makeConverter(slug: string, title: string, category: string, units: UnitDef[]): Converter {
  return {
    slug,
    title,
    category,
    units,
    convert: (value: number, from: string, to: string): number => {
      const v = new Big(value)
      const fromU = units.find((u) => u.symbol === from || u.name === from)
      const toU = units.find((u) => u.symbol === to || u.name === to)
      if (!fromU || !toU) throw new Error('Unknown unit')
      const base = fromU.toBase(v)
      const out = toU.fromBase(base)
      return Number(out)
    },
  }
}





