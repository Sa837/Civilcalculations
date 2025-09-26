'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, FileDown, Download, Plus, Trash2 } from 'lucide-react'
import { CarpetAreaCalculator } from '@/lib/registry/calculator/carpet-area-calculator'
import * as XLSX from 'xlsx'

interface RoomForm { id: string; name: string; length: string; width: string }
interface CarpetFormData {
  rooms: RoomForm[]
  deductions: string
  wallThickness: string
  showStepByStep: boolean
}

export default function CarpetAreaCalculatorCard({ globalUnit = 'm' as 'm' | 'ft' }) {
  const [form, setForm] = useState<CarpetFormData>({
    rooms: [{ id: cryptoRandom(), name: 'Room 1', length: '', width: '' }],
    deductions: '0',
    wallThickness: '0.115',
    showStepByStep: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ReturnType<typeof CarpetAreaCalculator.calculate> | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  function cryptoRandom() { return Math.random().toString(36).slice(2, 10) }

  const handleRoomChange = (id: string, patch: Partial<RoomForm>) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }))
  }
  const addRoom = () => setForm((prev) => ({ ...prev, rooms: [...prev.rooms, { id: cryptoRandom(), name: `Room ${prev.rooms.length + 1}`, length: '', width: '' }] }))
  const removeRoom = (id: string) => setForm((prev) => ({ ...prev, rooms: prev.rooms.filter((r) => r.id !== id) }))

  const handleField = (k: keyof CarpetFormData, v: string | boolean) => {
    setForm((prev) => ({ ...prev, [k]: v as any }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = useCallback(() => {
    const e: Record<string, string> = {}
    if (!form.rooms.length) e.rooms = 'Add at least one room'
    form.rooms.forEach((r, idx) => {
      if (!r.length || parseFloat(r.length) <= 0) e[`room_len_${r.id}`] = `Room ${idx + 1} length > 0`
      if (!r.width || parseFloat(r.width) <= 0) e[`room_wid_${r.id}`] = `Room ${idx + 1} width > 0`
    })
    if (form.deductions && parseFloat(form.deductions) < 0) e.deductions = 'Deductions cannot be negative'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const calculate = async () => {
    if (!validate()) return
    setIsCalculating(true)
    await new Promise((r) => setTimeout(r, 300))
    const res = CarpetAreaCalculator.calculate({
      rooms: form.rooms.map((r) => ({ name: r.name, length: parseFloat(r.length), width: parseFloat(r.width) })),
      deductions: form.deductions ? parseFloat(form.deductions) : 0,
      wallThickness: form.wallThickness ? parseFloat(form.wallThickness) : undefined,
    })
    setResult(res)
    setIsCalculating(false)
  }

  const downloadPDF = () => {
    if (!result) return
    const rows = form.rooms.map((r, i) => `<tr><td>${r.name || `Room ${i + 1}`}</td><td>${parseFloat(r.length || '0').toFixed(2)}</td><td>${parseFloat(r.width || '0').toFixed(2)}</td><td>${(parseFloat(r.length||'0')*parseFloat(r.width||'0')).toFixed(2)}</td></tr>`).join('')
    const html = `<!DOCTYPE html><html><head><meta charset='utf-8' />
      <title>Carpet Area Result</title>
      <style>body{font-family:ui-sans-serif,system-ui,Segoe UI,Roboto;}table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left}thead th{background:#f8fafc}</style>
      </head><body>
      <h1>Carpet Area Result</h1>
      <table><thead><tr><th>Room</th><th>Length (m)</th><th>Width (m)</th><th>Area (m²)</th></tr></thead><tbody>${rows}</tbody></table>
      <p><strong>Total Rooms Area:</strong> ${result.totalRoomArea.toFixed(2)} m²</p>
      <p><strong>Deductions:</strong> ${result.totalDeductions.toFixed(2)} m²</p>
      <p><strong>Carpet Area:</strong> ${result.carpetArea.toFixed(2)} m²</p>
      <p style='color:#64748b;font-size:12px;margin-top:8px'>NBC and international practice: Carpet area excludes shafts, ducts, balconies and common areas.</p>
      </body></html>`
    const win = window.open('', '_blank')
    if (!win) return
    win.document.open(); win.document.write(html); win.document.close(); win.print()
  }

  const downloadXLSX = () => {
    if (!result) return
    const roomRows = form.rooms.map((r) => ({ Room: r.name, Length_m: Number(r.length || '0'), Width_m: Number(r.width || '0'), Area_m2: Number(((parseFloat(r.length||'0')*parseFloat(r.width||'0')).toFixed(2))) }))
    const summary = [
      { Key: 'Total Room Area (m²)', Value: Number(result.totalRoomArea.toFixed(2)) },
      { Key: 'Deductions (m²)', Value: Number(result.totalDeductions.toFixed(2)) },
      { Key: 'Carpet Area (m²)', Value: Number(result.carpetArea.toFixed(2)) },
    ]
    const ws1 = XLSX.utils.json_to_sheet(roomRows)
    const ws2 = XLSX.utils.json_to_sheet(summary)
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws1, 'Rooms'); XLSX.utils.book_append_sheet(wb, ws2, 'Summary')
    XLSX.writeFile(wb, 'carpet_area.xlsx')
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20"><Calculator className="h-6 w-6" /></div>
            <div>
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Carpet Area Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Add rooms, apply deductions, and compute carpet area</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-end gap-4 mb-6">
            <button type="button" onClick={() => handleField('showStepByStep', !form.showStepByStep)} className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all ${form.showStepByStep ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}>
              <Info className="h-4 w-4" /> {form.showStepByStep ? 'Hide Steps' : 'Show Steps'}
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="block font-display font-medium text-heading dark:text-heading-dark">Rooms</label>
            <button onClick={addRoom} className="flex items-center gap-2 px-4 py-2 bg-green-600 font-display text-white rounded-lg hover:bg-green-700 transition-colors"><Plus className="h-4 w-4"/> Add Room</button>
          </div>
          {form.rooms.map((r, idx) => (
            <div key={r.id} className="mb-4 p-4 border border-slate-200 font-display rounded-lg dark:border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <input value={r.name} onChange={(e)=>handleRoomChange(r.id, { name: e.target.value })} className="rounded-md border border-slate-300 px-3 py-1 dark:border-slate-600 dark:bg-slate-800" />
                {form.rooms.length > 1 && (
                  <button onClick={()=>removeRoom(r.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="h-4 w-4"/></button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Length</label>
                  <div className="relative">
                    <input type="number" value={r.length} onChange={(e)=>handleRoomChange(r.id, { length: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">m</div>
                  </div>
                  {errors[`room_len_${r.id}`] && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`room_len_${r.id}`]}</p>)}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Width</label>
                  <div className="relative">
                    <input type="number" value={r.width} onChange={(e)=>handleRoomChange(r.id, { width: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">m</div>
                  </div>
                  {errors[`room_wid_${r.id}`] && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`room_wid_${r.id}`]}</p>)}
                </div>
              </div>
            </div>
          ))}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Deductions (shafts, balconies, etc.)</label>
              <div className="relative">
                <input type="number" value={form.deductions} onChange={(e)=>handleField('deductions', e.target.value)} placeholder="e.g., 5" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">m²</div>
              </div>
              {errors.deductions && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deductions}</p>)}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Wall Thickness (info)</label>
              <div className="relative">
                <input type="number" step="0.001" value={form.wallThickness} onChange={(e)=>handleField('wallThickness', e.target.value)} placeholder="e.g., 0.115" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">m</div>
              </div>
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
                  <div className="text-sm text-body/60 dark:text-body-dark/60">Rooms Area</div>
                  <div className="text-xl font-display font-semibold">{result.totalRoomArea.toFixed(2)} m²</div>
                </div>
                <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-slate-800/60">
                  <div className="text-sm text-body/60 dark:text-body-dark/60">Deductions</div>
                  <div className="text-xl font-display font-semibold">{result.totalDeductions.toFixed(2)} m²</div>
                </div>
                <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-slate-800/60">
                  <div className="text-sm text-body/60 dark:text-body-dark/60">Carpet Area</div>
                  <div className="text-xl font-display font-semibold">{result.carpetArea.toFixed(2)} m²</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-body/70 dark:text-body-dark/70">{result.human_summary}</p>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-10">
            <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-3">FAQ</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm text-body/80 dark:text-body-dark/80">
              <li><strong>What is Carpet Area?</strong> Usable area of rooms measured wall to wall, excluding balconies, shafts, ducts, and common areas.</li>
              <li><strong>NBC:</strong> Follow local authority definitions; similar to RERA definitions in India and general international practice.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
