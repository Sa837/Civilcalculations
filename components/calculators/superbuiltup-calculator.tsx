'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, FileDown, Download } from 'lucide-react'
import { SuperBuiltUpCalculator } from '@/lib/registry/calculator/superbuiltup-calculator'
import * as XLSX from 'xlsx'

interface SBUFormData {
  carpetArea: string
  commonAreaPercent: string
  showStepByStep: boolean
}

export default function SuperBuiltUpCalculatorCard({ globalUnit = 'm' as 'm' | 'ft' }) {
  const [form, setForm] = useState<SBUFormData>({
    carpetArea: '',
    commonAreaPercent: SuperBuiltUpCalculator.getDefaults().commonAreaPercent.toString(),
    showStepByStep: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ReturnType<typeof SuperBuiltUpCalculator.calculate> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handle = (k: keyof SBUFormData, v: string | boolean) => {
    setForm((p) => ({ ...p, [k]: v as any }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = useCallback(() => {
    const e: Record<string, string> = {}
    if (!form.carpetArea || parseFloat(form.carpetArea) <= 0) e.carpetArea = 'Enter carpet area (>0)'
    if (!form.commonAreaPercent || parseFloat(form.commonAreaPercent) <= 0)
      e.commonAreaPercent = 'Enter common area % (>0)'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const calculate = async () => {
    if (!validate()) return
    setIsCalculating(true)
    await new Promise((r) => setTimeout(r, 300))
    const res = SuperBuiltUpCalculator.calculate({
      carpetArea: parseFloat(form.carpetArea),
      commonAreaPercent: parseFloat(form.commonAreaPercent),
    })
    setResult(res)
    setIsCalculating(false)
  }

  const downloadPDF = () => {
    if (!result) return
    const html = `<!DOCTYPE html><html><head><meta charset='utf-8' />
      <title>Super Built-Up Result</title>
      <style>body{font-family:ui-sans-serif,system-ui,Segoe UI,Roboto;}table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left}thead th{background:#f8fafc}</style></head><body>
      <h1>Super Built-Up Area Result</h1>
      <table><tbody>
        <tr><th>Carpet Area (m²)</th><td>${parseFloat(form.carpetArea).toFixed(2)}</td></tr>
        <tr><th>Common Area (%)</th><td>${parseFloat(form.commonAreaPercent).toFixed(2)}%</td></tr>
        <tr><th>Super Built-Up Area (m²)</th><td>${result.superBuiltUpArea.toFixed(2)}</td></tr>
        <tr><th>Loading (%)</th><td>${result.loadingPercent.toFixed(2)}%</td></tr>
      </tbody></table>
      <p style='color:#64748b;font-size:12px;margin-top:8px'>Carpet + proportionate share of common areas. NBC/local guidelines define inclusions. Internationally referred as Saleable Area in some contexts.</p>
      </body></html>`
    const win = window.open('', '_blank')
    if (!win) return
    win.document.open(); win.document.write(html); win.document.close(); win.print()
  }

  const downloadXLSX = () => {
    if (!result) return
    const rows = [
      { Key: 'Carpet Area (m²)', Value: Number(parseFloat(form.carpetArea).toFixed(2)) },
      { Key: 'Common Area (%)', Value: Number(parseFloat(form.commonAreaPercent).toFixed(2)) },
      { Key: 'Super Built-Up Area (m²)', Value: Number(result.superBuiltUpArea.toFixed(2)) },
      { Key: 'Loading (%)', Value: Number(result.loadingPercent.toFixed(2)) },
    ]
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'SuperBuiltUp')
    XLSX.writeFile(wb, 'super_built_up.xlsx')
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20"><Calculator className="h-6 w-6" /></div>
            <div>
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Super Built-Up Area</h1>
              <p className="text-body/70 dark:text-body-dark/70">Compute super built-up area and loading percentage</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-end gap-4 mb-6">
            <button type="button" onClick={() => handle('showStepByStep', !form.showStepByStep)} className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all ${form.showStepByStep ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}>
              <Info className="h-4 w-4" /> {form.showStepByStep ? 'Hide Steps' : 'Show Steps'}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Carpet Area</label>
              <div className="relative">
                <input type="number" value={form.carpetArea} onChange={(e)=>handle('carpetArea', e.target.value)} placeholder="e.g., 85" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">m²</div>
              </div>
              {errors.carpetArea && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.carpetArea}</p>)}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Common Area (%)</label>
              <input type="number" step="0.1" value={form.commonAreaPercent} onChange={(e)=>handle('commonAreaPercent', e.target.value)} placeholder="e.g., 25" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" />
              {errors.commonAreaPercent && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.commonAreaPercent}</p>)}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={calculate} className="rounded-xl bg-primary px-6 py-3 font-display font-medium text-white hover:bg-primary/90 disabled:opacity-60" disabled={isCalculating}>{isCalculating ? 'Calculating…' : 'Calculate'}</button>
            {result && (
              <>
                <button onClick={downloadPDF} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><FileDown className="h-4 w-4"/> PDF</button>
                <button onClick={downloadXLSX} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><Download className="h-4 w-4"/> Excel</button>
              </>
            )}
          </div>

          {result && (
            <div className="mt-8 rounded-xl border border-slate-200/40 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-3">Results</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-slate-800/60">
                  <div className="text-sm text-body/60 dark:text-body-dark/60">Super Built-Up Area</div>
                  <div className="text-xl font-display font-semibold">{result.superBuiltUpArea.toFixed(2)} m²</div>
                </div>
                <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-slate-800/60">
                  <div className="text-sm text-body/60 dark:text-body-dark/60">Loading</div>
                  <div className="text-xl font-display font-semibold">{result.loadingPercent.toFixed(2)}%</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-body/70 dark:text-body-dark/70">{result.human_summary}</p>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-10">
            <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-3">FAQ</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm text-body/80 dark:text-body-dark/80">
              <li><strong>What is Super Built-Up?</strong> Carpet area plus proportionate common areas (lobbies, corridors, stairs, clubhouse share etc. as per local definition).</li>
              <li><strong>NBC/local:</strong> Check local rules for inclusions and allowable loading. Internationally varies by jurisdiction.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
