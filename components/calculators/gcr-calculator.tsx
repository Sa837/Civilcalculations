'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, FileDown, Download, CheckCircle } from 'lucide-react'
import { GCRCalculator } from '@/lib/registry/calculator/gcr-calculator'
import * as XLSX from 'xlsx'

interface GCRFormData {
  plotArea: string
  groundFloorBuiltUpArea: string
  permissibleGCR: string // %
  showStepByStep: boolean
}

export default function GCRCalculatorCard({ globalUnit = 'm' as 'm' | 'ft' }) {
  const [form, setForm] = useState<GCRFormData>({
    plotArea: '',
    groundFloorBuiltUpArea: '',
    permissibleGCR: GCRCalculator.getDefaults().permissibleGCR.toString(),
    showStepByStep: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ReturnType<typeof GCRCalculator.calculate> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleChange = (k: keyof GCRFormData, v: string | boolean) => {
    setForm((prev) => ({ ...prev, [k]: v as any }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = useCallback(() => {
    const e: Record<string, string> = {}
    if (!form.plotArea || parseFloat(form.plotArea) <= 0) e.plotArea = 'Enter plot area (>0)'
    if (!form.groundFloorBuiltUpArea || parseFloat(form.groundFloorBuiltUpArea) <= 0)
      e.groundFloorBuiltUpArea = 'Enter GF built-up area (>0)'
    if (!form.permissibleGCR || parseFloat(form.permissibleGCR) <= 0)
      e.permissibleGCR = 'Enter permissible GCR (>0)'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const calculate = async () => {
    if (!validate()) return
    setIsCalculating(true)
    await new Promise((r) => setTimeout(r, 300))
    const res = GCRCalculator.calculate({
      plotArea: parseFloat(form.plotArea),
      groundFloorBuiltUpArea: parseFloat(form.groundFloorBuiltUpArea),
      permissibleGCR: parseFloat(form.permissibleGCR),
    })
    setResult(res)
    setIsCalculating(false)
  }

  const downloadPDF = () => {
    if (!result) return
    const html = `<!DOCTYPE html><html><head><meta charset='utf-8' />
      <title>GCR Result</title>
      <style>body{font-family:ui-sans-serif,system-ui,Segoe UI,Roboto;}
      table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left}
      thead th{background:#f8fafc}</style></head><body>
      <h1>Ground Coverage Ratio (GCR) Result</h1>
      <table><tbody>
        <tr><th>Plot Area (m²)</th><td>${parseFloat(form.plotArea).toFixed(2)}</td></tr>
        <tr><th>GF Built-Up Area (m²)</th><td>${parseFloat(form.groundFloorBuiltUpArea).toFixed(2)}</td></tr>
        <tr><th>Permissible GCR (%)</th><td>${parseFloat(form.permissibleGCR).toFixed(2)}%</td></tr>
        <tr><th>GCR (%)</th><td>${result.gcrPercent.toFixed(2)}%</td></tr>
        <tr><th>Compliance</th><td>${result.isCompliant ? 'Compliant' : 'Non-compliant'}</td></tr>
      </tbody></table>
      <p style='color:#64748b;font-size:12px;margin-top:8px'>References: NBC provisions for site coverage. Internationally, similar coverage controls exist via zoning/land development codes.</p>
      </body></html>`
    const win = window.open('', '_blank')
    if (!win) return
    win.document.open()
    win.document.write(html)
    win.document.close()
    win.print()
  }

  const downloadXLSX = () => {
    if (!result) return
    const rows = [
      { Key: 'Plot Area (m²)', Value: parseFloat(form.plotArea) },
      { Key: 'GF Built-Up Area (m²)', Value: parseFloat(form.groundFloorBuiltUpArea) },
      { Key: 'Permissible GCR (%)', Value: parseFloat(form.permissibleGCR) },
      { Key: 'GCR (%)', Value: Number(result.gcrPercent.toFixed(2)) },
      { Key: 'Compliant', Value: result.isCompliant ? 'Yes' : 'No' },
    ]
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'GCR')
    XLSX.writeFile(wb, 'gcr_result.xlsx')
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20"><Calculator className="h-6 w-6" /></div>
            <div>
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">GCR Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Compute Ground Coverage Ratio and NBC compliance</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-end gap-4 mb-6">
            <button type="button" onClick={() => handleChange('showStepByStep', !form.showStepByStep)} className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all ${form.showStepByStep ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}>
              <Info className="h-4 w-4" /> {form.showStepByStep ? 'Hide Steps' : 'Show Steps'}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Plot Area</label>
              <div className="relative">
                <input type="number" value={form.plotArea} onChange={(e)=>handleChange('plotArea', e.target.value)} placeholder="e.g., 250" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">m²</div>
              </div>
              {errors.plotArea && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.plotArea}</p>)}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">GF Built-Up Area</label>
              <div className="relative">
                <input type="number" value={form.groundFloorBuiltUpArea} onChange={(e)=>handleChange('groundFloorBuiltUpArea', e.target.value)} placeholder="e.g., 120" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">m²</div>
              </div>
              {errors.groundFloorBuiltUpArea && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.groundFloorBuiltUpArea}</p>)}
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Permissible GCR (%)</label>
              <input type="number" step="0.1" value={form.permissibleGCR} onChange={(e)=>handleChange('permissibleGCR', e.target.value)} placeholder="e.g., 60" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" />
              {errors.permissibleGCR && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.permissibleGCR}</p>)}
              <p className="mt-2 text-sm text-body/60 dark:text-body-dark/60">GCR = (Ground Floor Built-Up / Plot Area) × 100%. NBC typically prescribes coverage limits by zone.</p>
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
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-slate-800/60">
                  <div className="text-sm text-body/60 dark:text-body-dark/60">GCR</div>
                  <div className="text-xl font-display font-semibold">{result.gcrPercent.toFixed(2)}%</div>
                </div>
                <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-slate-800/60">
                  <div className="text-sm text-body/60 dark:text-body-dark/60">Permissible</div>
                  <div className="text-xl font-display font-semibold">{result.permissibleGCR.toFixed(2)}%</div>
                </div>
                <div className={`rounded-lg p-3 ${result.isCompliant ? 'bg-green-100/70 dark:bg-green-900/40' : 'bg-red-100/70 dark:bg-red-900/40'}`}>
                  <div className="text-sm text-body/60 dark:text-body-dark/60">Compliance</div>
                  <div className="flex items-center gap-2 text-xl font-display font-semibold">{result.isCompliant ? <CheckCircle className="h-5 w-5 text-green-600"/> : null}{result.isCompliant ? 'Compliant' : 'Non-compliant'}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-body/70 dark:text-body-dark/70">{result.human_summary}</p>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-10">
            <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-3">FAQ</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm text-body/80 dark:text-body-dark/80">
              <li><strong>What is GCR?</strong> Ground Coverage Ratio is the ground floor coverage as a percentage of the plot area.</li>
              <li><strong>NBC:</strong> Coverage limits depend on zoning and setbacks; confirm with local authority tables.</li>
              <li><strong>International note:</strong> Referred to as site coverage/lot coverage in many codes.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
