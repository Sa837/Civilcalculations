"use client"
import { calculators } from '../../../lib/registry/calculators'
import { useMemo, useState } from 'react'
import Link from 'next/link'

type Params = { params: { slug: string } }

export default function CalculatorDetail({ params }: Params) {
  const calc = useMemo(() => calculators.find(c => c.slug === params.slug), [params.slug])
  const [values, setValues] = useState<Record<string, string | number>>({})
  if (!calc) return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p>Calculator not found. <Link className="text-accent underline" href="/calculators">Back</Link></p>
    </main>
  )

  const result = (() => {
    try { return calc.compute(values) } catch { return {} }
  })()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link href="/calculators" className="text-sm text-slate-500">← Back</Link>
      <h1 className="mt-2 font-display text-3xl font-bold">{calc.title}</h1>
      <p className="mt-1 font-sans text-slate-600 dark:text-slate-300">{calc.shortDescription}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <form className="grid gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          {calc.inputs.map((inp) => (
            <div key={inp.name} className="grid gap-1">
              <label className="font-sans text-sm font-medium">{inp.label} {inp.unit && <span className="text-slate-500">({inp.unit})</span>}</label>
              {inp.type === 'number' ? (
                <input
                  type="number"
                  step={inp.step}
                  min={inp.min}
                  max={inp.max}
                  required={inp.required}
                  onChange={(e) => setValues((v) => ({ ...v, [inp.name]: e.target.value === '' ? '' : Number(e.target.value) }))}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                />
              ) : (
                <select onChange={(e) => setValues((v) => ({ ...v, [inp.name]: e.target.value }))} className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <option value="">Select</option>
                  {inp.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              )}
            </div>
          ))}
        </form>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <h2 className="font-display text-xl font-semibold">Results</h2>
          <div className="mt-3 grid gap-2 text-sm">
            {Object.keys(result).length === 0 && <p className="font-sans text-slate-500">Enter inputs to see results.</p>}
            {Object.entries(result).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900">
                <span className="font-medium">{k}</span>
                <span>{typeof v === 'number' ? v.toLocaleString(undefined, { maximumFractionDigits: 6 }) : String(v)}</span>
              </div>
            ))}
          </div>
          {calc.notes && (
            <details className="mt-4">
              <summary className="cursor-pointer font-display font-medium">Notes & Assumptions</summary>
              <p className="mt-2 font-sans text-sm text-slate-600 dark:text-slate-300">{calc.notes}</p>
            </details>
          )}
        </div>
      </div>
    </main>
  )
}




