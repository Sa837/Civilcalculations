"use client"
import { converters } from '../../../lib/registry/converters'
import { useEffect, useMemo, useState } from 'react'
import { Copy, Check, ArrowLeftRight } from 'lucide-react'
import Link from 'next/link'

type Params = { params: { slug: string } }

export default function ConverterDetail({ params }: Params) {
  const converter = useMemo(() => converters.find(c => c.slug === params.slug), [params.slug])
  const [from, setFrom] = useState<string>('')
  const [fromUnit, setFromUnit] = useState<string>(() => converter?.units?.[0]?.symbol ?? '')
  const [toUnit, setToUnit] = useState<string>(() => converter?.units?.[1]?.symbol ?? converter?.units?.[0]?.symbol ?? '')
  const [precision, setPrecision] = useState(6)
  const [copied, setCopied] = useState(false)

  // Reset state on mount and when switching between converter slugs
  useEffect(() => {
    const defaultFrom = converter?.units?.[0]?.symbol ?? ''
    const defaultTo = converter?.units?.[1]?.symbol ?? converter?.units?.[0]?.symbol ?? ''
    setFrom('')
    setFromUnit(defaultFrom)
    setToUnit(defaultTo)
    setPrecision(6)
    setCopied(false)
    return () => {
      // Clear on unmount as well to avoid stale UI when navigating back
      setFrom('')
      setCopied(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug])

  if (!converter) return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p>Converter not found. <Link className="text-accent underline" href="/converters">Back</Link></p>
    </main>
  )

  const units = converter.units
  const hasTemp = converter.slug === 'temperature'
  let result: number | null = null
  try {
    if (fromUnit && toUnit && from !== '') {
      const fromNumber = Number(from)
      if (!Number.isNaN(fromNumber)) {
        result = converter.convert(fromNumber, fromUnit, toUnit)
      }
    }
  } catch {
    result = null
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link href="/converters" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">← Back</Link>
      <div className="mt-2 flex items-center gap-3">
        <h1 className="font-display text-3xl font-bold">{converter.title}</h1>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-wide text-primary dark:bg-primary/20">{converter.category}</span>
      </div>
      <p className="mt-1 font-sans text-slate-600 dark:text-slate-300">Convert between units with precision.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <form className="grid gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="grid gap-1">
            <label className="font-sans text-sm font-medium">Value</label>
            <input
              type="number"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
          <div className="grid gap-1">
            <label className="font-sans text-sm font-medium">From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-sans font-medium dark:border-slate-700 dark:bg-slate-900">
              {units.map(u => <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>)}
            </select>
          </div>
          <div className="grid gap-1">
            <label className="font-sans text-sm font-medium">To</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-sans font-medium dark:border-slate-700 dark:bg-slate-900">
              {units.map(u => <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button type="button" onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit) }} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"><ArrowLeftRight className="h-4 w-4"/>Swap</button>
            <label className="ml-auto text-sm">Precision</label>
            <input type="number" min={0} max={12} step={1} value={precision} onChange={(e)=>setPrecision(Number(e.target.value))} className="w-20 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"/>
          </div>
        </form>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <h2 className="font-display text-xl font-semibold">Result</h2>
          <div className="mt-3">
            {result === null ? (
              <p className="font-sans text-slate-500">Enter a value and select units.</p>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{result.toLocaleString(undefined, { maximumFractionDigits: precision })}</p>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(result!.toFixed(precision))
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1500)
                    } catch {}
                  }}
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    copied
                      ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20'
                      : 'border border-slate-300 hover:bg-slate-100/80 dark:border-slate-700 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
                <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
              </div>
            )}
          </div>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900">
            {hasTemp ? (
              <p className="font-sans">Temperature uses offset conversions. Base unit is Kelvin. For example, °C → K: K = °C + 273.15; °F → °C: (°F − 32) × 5⁄9.</p>
            ) : (
              <p className="font-sans">Linear conversion via a base unit. We convert to base and then from base using precise factors.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}


