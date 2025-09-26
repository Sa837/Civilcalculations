'use client'

import { useMemo, useState } from 'react'
import { Calculator, FileDown, Printer, Plus, Trash2 } from 'lucide-react'
import { calculateBOQ } from '@/lib/registry/calculator/boq-calculator'
import type { BOQInput, RateInput, BOQOptions, BOQResult, WorkCategory, Unit } from '@/lib/registry/calculator/boq/schema'

const CATEGORIES: WorkCategory[] = [
  'Site Preparation','Earthwork','Foundation','Substructure','Superstructure','Roofing','Staircase','Doors & Windows','Flooring & Finishes','Plumbing & Sanitary','Electrical Works','External Works','Miscellaneous'
]
const UNITS: Unit[] = ['m','m2','m3','kg','ton','no','set']

type UIBOQRow = Partial<BOQInput> & { is_subitem?: boolean, parent_code?: string, sectionId?: string, name?: string }

export default function BOQCalculator({ globalUnit }: { globalUnit: 'm' | 'ft' }) {
  // Step 1: Project & Code Settings
  const [projectName, setProjectName] = useState('')
  const [location, setLocation] = useState('')
  const [client, setClient] = useState('')
  const [designer, setDesigner] = useState('')
  const [buildingType, setBuildingType] = useState<'Residential' | 'Commercial' | 'Mixed use'>('Residential')
  const [designCode, setDesignCode] = useState<'NBC' | 'IS'>('NBC')
  const [overheads, setOverheads] = useState<number | ''>(10)
  const [profit, setProfit] = useState<number | ''>(15)
  const [currency, setCurrency] = useState<'NPR'|'INR'|'USD'>('NPR')

  // Step 2: Rates
  const [rates, setRates] = useState<RateInput[]>([
    { material: 'cement_bag', unit: 'bag' as any, rate: 750 },
    { material: 'sand_m3', unit: 'm3' as any, rate: 2500 },
    { material: 'aggregate_m3', unit: 'm3' as any, rate: 2800 },
    { material: 'steel_kg', unit: 'kg' as any, rate: 150 },
    { material: 'bricks_no', unit: 'no' as any, rate: 20 },
    { material: 'formwork_m2', unit: 'm2' as any, rate: 900 },
    { material: 'labor_unit', unit: 'm3' as any, rate: 1200 },
  ])

  // Step 3: BOQ Inputs
  const [items, setItems] = useState<UIBOQRow[]>([{}])
  const [outputMode, setOutputMode] = useState<'measurement'|'boq'|'both'>('boq')
  const [sections, setSections] = useState<{ id: string; title: string }[]>([
    // Start with a single empty section; user can rename and add more
    { id: 'sec-1', title: 'Excavation' },
  ])
  const [activeSectionId, setActiveSectionId] = useState('sec-1')
  const [useNumberingAsCode, setUseNumberingAsCode] = useState<boolean>(true)

  const addItem = () => setItems(p => [...p, { sectionId: activeSectionId } as any])
  const removeItem = (idx: number) => setItems(p => p.filter((_, i) => i !== idx))
  const updateItem = (idx: number, patch: UIBOQRow) => setItems(p => p.map((r, i) => i === idx ? { ...r, ...patch } : r))
  const duplicateItem = (idx: number) => setItems(p => {
    const copy = [...p]
    copy.splice(idx+1, 0, { ...copy[idx], item_code: '', description: copy[idx]?.description ? `${copy[idx]?.description} (copy)` : '' })
    return copy
  })
  const moveItem = (idx: number, dir: -1 | 1) => setItems(p => {
    const copy = [...p]
    const j = idx + dir
    if (j < 0 || j >= copy.length) return p
    const tmp = copy[idx]
    copy[idx] = copy[j]
    copy[j] = tmp
    return copy
  })

  const addSubItem = () => setItems(p => {
    // Find last non-subitem in active section as parent
    const parentIndex = [...p].map((row, i) => ({ row, i }))
      .reverse()
      .find(({ row }) => (row as any).sectionId === activeSectionId && !row.is_subitem)?.i
    const parent = parentIndex != null ? p[parentIndex] : undefined
    const parentCode = parent?.item_code || (parentIndex != null ? `ITM-${parentIndex + 1}` : '')
    const base: UIBOQRow = {
      sectionId: activeSectionId as any,
      category: parent?.category,
      unit: parent?.unit,
      measurement_mode: parent?.measurement_mode ?? 'LBH',
      is_subitem: true,
      parent_code: parentCode,
      item_code: parentCode, // keep same code as parent
    }
    return [...p, base]
  })

  // Export Measurement Sheet only as Excel
  const downloadExcelMeasurement = () => {
    const title = result?.project_meta?.project_name || 'Measurement Sheet'
    const header = ['Sr.','Item of Work','No.','Length','Width','Height/Thk','Area','Volume','Subtotal']
    const rowsHtml = items.map((it, idx) => {
      const L = it.length_m ?? 0
      const B = it.breadth_m ?? 0
      const H = (it.height_m ?? 0)
      const area = (it.area_m2 ?? (L * (B || H))) || 0
      const vol = (it.volume_m3 ?? (L * B * H)) || 0
      const subtotal = deriveQty(it as any)
      const name = it.name || `Item ${idx+1}`
      return `
        <tr>
          <td>${idx+1}</td>
          <td>${name}${it.description? ' - '+it.description:''}</td>
          <td>${it.count_no ?? ''}</td>
          <td style='text-align:right;'>${L || ''}</td>
          <td style='text-align:right;'>${B || ''}</td>
          <td style='text-align:right;'>${H || ''}</td>
          <td style='text-align:right;'>${area ? area.toFixed(3) : ''}</td>
          <td style='text-align:right;'>${vol ? vol.toFixed(3) : ''}</td>
          <td style='text-align:right;'>${subtotal ? subtotal.toFixed(3) : ''}</td>
        </tr>`
    }).join('')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8" />
      <style>
        body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
        table { border-collapse: collapse; width: 100%; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
        thead th { background: #f8fafc; }
      </style>
    </head><body>
      <h1 style="font-size:16px;">${title}</h1>
      <table><thead><tr>${header.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rowsHtml}</tbody></table>
    </body></html>`
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'measurement_sheet.xls'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Export BOQ only as Excel
  const downloadExcelBOQ = () => {
    if (!result) return
    const title = result.project_meta?.project_name || 'BOQ'
    const header = ['Sr.','Item Code','Description','Group','Category','Unit','Quantity','Rate','Amount']
    let sr = 0
    const groups = groupRows(result.results)
    const rowsHtml = Array.from(groups.entries()).map(([grp, rows])=>{
      let subSr = 0
      const subtotal = rows.reduce((s, r) => s + r.amount, 0)
      const groupHead = `<tr style='background:#f8fafc;font-weight:600;'><td colspan='9'>${++sr}. ${grp}</td></tr>`
      const body = rows.map(r => `
        <tr>
          <td>${sr}.${++subSr}</td>
          <td>${r.item_code}</td>
          <td>${r.description}</td>
          <td>${grp}</td>
          <td>${r.category}</td>
          <td>${displayUnit(r.unit)}</td>
          <td style='text-align:right;'>${r.quantity}</td>
          <td style='text-align:right;'>${r.rate_total}</td>
          <td style='text-align:right;'>${r.amount}</td>
        </tr>`).join('')
      const groupFoot = `<tr style='background:#f1f5f9;font-weight:600;'><td colspan='8'>TOTAL OF ${grp}</td><td style='text-align:right;'>${subtotal.toFixed(2)}</td></tr>`
      return groupHead + body + groupFoot
    }).join('')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8" />
      <style>
        body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
        table { border-collapse: collapse; width: 100%; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
        thead th { background: #f8fafc; }
      </style>
    </head><body>
      <h1 style="font-size:16px;">${title}</h1>
      <table><thead><tr>${header.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rowsHtml}</tbody></table>
    </body></html>`
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'boq.xls'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Step 4: Result
  const [result, setResult] = useState<BOQResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const fmt = (n: number | undefined, d = 2) => typeof n === 'number' ? n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) : ''
  const displayUnit = (u: Unit) => {
    switch (u) {
      case 'm3': return 'Cum'
      case 'm2': return 'Sqm'
      case 'm': return 'Rm'
      case 'no': return 'No.'
      case 'ton': return 'Ton'
      default: return u
    }
  }
  const currencySymbol = (c: 'NPR'|'INR'|'USD') => c==='USD'?'$':(c==='INR'?'₹':'NPR ')
  const requiredClass = (cond: boolean) => cond ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 dark:border-slate-600'
  const numAttrs = { inputMode: 'decimal' as const, step: '0.001', min: 0 }
  const groupRows = (rows: BOQResult['results']) => {
    const groups = new Map<string, BOQResult['results']>()
    for (const r of rows) {
      const k = r.group || 'General'
      if (!groups.has(k)) groups.set(k, [])
      groups.get(k)!.push(r)
    }
    return groups
  }

  const deriveQty = (r: Partial<BOQInput>) => {
    if (typeof r.quantity === 'number') return r.quantity
    if (typeof r.volume_m3 === 'number') return r.volume_m3 * (r.count_no ?? 1)
    if (typeof r.area_m2 === 'number') return r.area_m2 * (r.count_no ?? 1)
    const L = r.length_m ?? 0
    const B = r.breadth_m ?? 0
    const H = r.height_m ?? 0
    const base = (L * B * H) || (L * B) || L || 0
    return base * (r.count_no ?? 1)
  }

  const handleCalc = async () => {
    setIsCalculating(true)
    try {
      const inputs: BOQInput[] = items.map((r, i) => {
        const sec = sections.find(s=> s.id === (r as any).sectionId)
        return ({
        item_code: r.item_code || `ITM-${i+1}`,
        description: (r.name ? String(r.name) : `Item ${i+1}`) + (r.description? ` - ${r.description}` : ''),
        category: (r.category as WorkCategory) || 'Earthwork',
        unit: (r.unit as Unit) || 'm3',
        group: sec?.title || 'General',
        measurement_mode: (r.measurement_mode as any) || undefined,
        length_m: r.length_m ? Number(r.length_m) : undefined,
        breadth_m: r.breadth_m ? Number(r.breadth_m) : undefined,
        height_m: r.height_m ? Number(r.height_m) : undefined,
        // UI no longer collects thickness separately; use height_m for thickness where needed
        area_m2: r.area_m2 ? Number(r.area_m2) : undefined,
        volume_m3: r.volume_m3 ? Number(r.volume_m3) : undefined,
        count_no: r.count_no ? Number(r.count_no) : undefined,
        quantity: typeof r.quantity === 'number' ? Number(r.quantity) : ((r as any).deduct ? -1 : 1) * deriveQty(r as any),
        // Use per-activity rate; disable overheads in engine pricing path
        per_unit_rate: typeof r.per_unit_rate === 'number' ? r.per_unit_rate : (r.per_unit_rate ? Number(r.per_unit_rate) : undefined),
        apply_overheads: false,
        // Remove materials and wastage for simplified BOQ flow
        wastage_percent: undefined,
      })})
      const options: BOQOptions = {
        code: designCode,
        project_name: projectName || undefined,
        location: location || undefined,
        client: client || undefined,
        designer: designer || undefined,
        building_type: buildingType,
        overheads_percent: typeof overheads === 'number' ? overheads : 10,
        profit_percent: typeof profit === 'number' ? profit : 15,
      }
      const res = calculateBOQ(inputs, rates, options)
      setResult(res)
    } finally {
      setIsCalculating(false)
    }
  }

  const downloadCSV = () => {
    if (!result) return
    const header = ['Sr.','Item Code','Description','Group','Category','Unit','Quantity','Rate','Amount']
    const groups = groupRows(result.results)
    let sr = 0
    const rows: any[] = []
    for (const [grp, items] of groups) {
      rows.push([`${++sr}`, '', `TOTAL OF ${grp}`, grp, '', '', '', '', items.reduce((s, x) => s + x.amount, 0)])
      let subSr = 0
      for (const r of items) {
        rows.push([`${sr}.${++subSr}`, r.item_code, r.description, grp, r.category, displayUnit(r.unit), r.quantity, r.rate_total, r.amount])
      }
    }
    const csv = [header, ...rows].map(a => a.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'boq_result.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadExcel = () => {
    if (!result) return
    const title = result.project_meta?.project_name || 'BOQ Result'
    const code = result.code_used ? `Designed as per ${result.code_used}` : ''
    const header = ['Sr.','Item Code','Description','Group','Category','Unit','Quantity','Rate','Amount']
    let sr = 0
    const groups = groupRows(result.results)
    const rowsHtml = Array.from(groups.entries()).map(([grp, rows])=>{
      let subSr = 0
      const subtotal = rows.reduce((s, r) => s + r.amount, 0)
      const groupHead = `<tr style='background:#f8fafc;font-weight:600;'><td colspan='9'>${++sr}. ${grp}</td></tr>`
      const body = rows.map(r => `
        <tr>
          <td>${sr}.${++subSr}</td>
          <td>${r.item_code}</td>
          <td>${r.description}</td>
          <td>${grp}</td>
          <td>${r.category}</td>
          <td>${displayUnit(r.unit)}</td>
          <td style='text-align:right;'>${r.quantity}</td>
          <td style='text-align:right;'>${r.rate_total}</td>
          <td style='text-align:right;'>${r.amount}</td>
        </tr>`).join('')
      const groupFoot = `<tr style='background:#f1f5f9;font-weight:600;'><td colspan='8'>TOTAL OF ${grp}</td><td style='text-align:right;'>${subtotal.toFixed(2)}</td></tr>`
      return groupHead + body + groupFoot
    }).join('')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8" />
      <style>
        body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
        h1 { font-size: 18px; margin: 0 0 6px 0; }
        .muted { color: #64748b; font-size: 12px; }
        table { border-collapse: collapse; width: 100%; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
        thead th { background: #f8fafc; }
        tbody tr:nth-child(odd) { background: #fafafa; }
      </style>
    </head><body>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div>
          <h1>${title}</h1>
          <div class="muted">${code}</div>
          <div class="muted">CivilCalculation • Pave Engineering Pvt. Ltd.</div>
        </div>
        <div class="muted">${new Date().toLocaleDateString()}</div>
      </div>
      <table><thead><tr>${header.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rowsHtml}</tbody></table>
    </body></html>`
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'boq_result.xls'
    a.click()
    URL.revokeObjectURL(url)
  }

  const printPDF = () => {
    if (!result) return
    const title = result.project_meta?.project_name || 'Bill of Quantities (BOQ)'
    const code = result.code_used ? `Designed as per ${result.code_used}` : ''
    const header = ['Sr.','Item Code','Description','Group','Category','Unit','Quantity','Rate','Amount']
    let sr = 0
    const groups = groupRows(result.results)
    const rowsHtml = Array.from(groups.entries()).map(([grp, rows])=>{
      let subSr = 0
      const subtotal = rows.reduce((s, r) => s + r.amount, 0)
      const groupHead = `<tr style='background:#f8fafc;font-weight:600;'><td colspan='9'>${++sr}. ${grp}</td></tr>`
      const body = rows.map(r => `
        <tr>
          <td>${sr}.${++subSr}</td>
          <td>${r.item_code}</td>
          <td>${r.description}</td>
          <td>${grp}</td>
          <td>${r.category}</td>
          <td>${displayUnit(r.unit)}</td>
          <td style='text-align:right;'>${r.quantity}</td>
          <td style='text-align:right;'>${r.rate_total}</td>
          <td style='text-align:right;'>${r.amount}</td>
        </tr>`).join('')
      const groupFoot = `<tr style='background:#f1f5f9;font-weight:600;'><td colspan='8'>TOTAL OF ${grp}</td><td style='text-align:right;'>${subtotal.toFixed(2)}</td></tr>`
      return groupHead + body + groupFoot
    }).join('')

    // Build Measurement Sheet HTML first
    const msHeader = ['Sr.','Item of Work','No.','Length (m)','Width (m)','Height/Thk (m)','Area (m²)','Volume (m³)','Subtotal']
    const msRows = items.map((it, idx)=>{
      const L = it.length_m ?? 0
      const B = it.breadth_m ?? 0
      const H = it.height_m ?? 0
      const area = (it.area_m2 ?? (L * (B || H))) || 0
      const vol = (it.volume_m3 ?? (L * B * H)) || 0
      const subtotal = deriveQty(it as any)
      const name = it.name || `Item ${idx+1}`
      return `<tr>
        <td>${idx+1}</td>
        <td>${name}${it.description? ' - '+it.description:''}</td>
        <td>${it.count_no ?? ''}</td>
        <td style='text-align:right;'>${L || ''}</td>
        <td style='text-align:right;'>${B || ''}</td>
        <td style='text-align:right;'>${H || ''}</td>
        <td style='text-align:right;'>${area?area.toFixed(3):''}</td>
        <td style='text-align:right;'>${vol?vol.toFixed(3):''}</td>
        <td style='text-align:right;'>${subtotal?subtotal.toFixed(3):''}</td>
      </tr>`
    }).join('')

    const cats = result.summary.categories.map(c => `<tr><td>${c.category}</td><td style='text-align:right;'>${fmt(c.subtotal,2)}</td></tr>`).join('')

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8" />
      <title>${title}</title>
      <style>
        @media print { @page { size: A4 landscape; margin: 10mm; } }
        body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; font-size: 12px; }
        h1 { font-size: 18px; margin: 0; }
        .muted { color: #64748b; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
        thead th { background: #f8fafc; }
        tbody tr:nth-child(odd) { background: #fafafa; }
      </style>
    </head><body>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="#0ea5e9" opacity="0.15"/>
            <path d="M8 22 L18 10 L28 22" stroke="#0ea5e9" stroke-width="2" fill="none"/>
          </svg>
          <div>
            <h1>${title}</h1>
            <div class="muted">${code}</div>
            <div class="muted">CivilCalculation • Pave Engineering Pvt. Ltd.</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="muted">${new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <div style="border:1px solid #e2e8f0; padding:8px; margin: 10px 0;">
        <div class="muted">Grand Total</div>
        <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight:600;">NPR ${fmt(result.summary.grand_total,2)}</div>
      </div>

      <h2 style="margin:8px 0;">Measurement Sheet</h2>
      <table style="margin-top:8px;"><thead><tr>${msHeader.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${msRows}</tbody></table>

      <div style="page-break-before: always;"></div>

      <h2 style="margin:8px 0;">Bill of Quantities</h2>
      <table style="margin-top:8px;"><thead><tr>${header.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rowsHtml}</tbody></table>
      <div style="margin-top:12px;">
        <h3 style="margin:6px 0;">Category Subtotals</h3>
        <table><thead><tr><th>Category</th><th>Subtotal (NPR)</th></tr></thead><tbody>${cats}</tbody></table>
      </div>
    </body></html>`
    const win = window.open('', '_blank')
    if (!win) return
    win.document.open()
    win.document.write(html)
    win.document.close()
    win.focus()
    win.print()
  }

  return (
    <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white"><Calculator className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-heading dark:text-heading-dark">Bill of Quantities (BOQ) Maker</h2>
          <p className="text-sm text-body/70 dark:text-body-dark/70">Universal measurement sheet + BOQ workflow. Metric/Imperial, currency-aware.</p>
        </div>
      </div>

      {/* Step 1: Project & Code Settings */}
      <details className="mb-4 rounded-xl border border-slate-200/40 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-surface-dark/60" open>
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">Project & Code Settings</summary>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div><label className="block text-xs text-body/70 dark:text-body-dark/70">Project Name</label><input value={projectName} onChange={e=>setProjectName(e.target.value)} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></div>
          <div><label className="block text-xs text-body/70 dark:text-body-dark/70">Location</label><input value={location} onChange={e=>setLocation(e.target.value)} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></div>
          <div><label className="block text-xs text-body/70 dark:text-body-dark/70">Client</label><input value={client} onChange={e=>setClient(e.target.value)} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></div>
          <div><label className="block text-xs text-body/70 dark:text-body-dark/70">Designer/Contractor</label><input value={designer} onChange={e=>setDesigner(e.target.value)} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">Building Type</label>
            <select value={buildingType} onChange={e=>setBuildingType(e.target.value as any)} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"><option>Residential</option><option>Commercial</option><option>Mixed use</option></select>
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">Design Code</label>
            <select value={designCode} onChange={e=>setDesignCode(e.target.value as any)} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"><option value="NBC">NBC</option><option value="IS">IS</option></select>
          </div>
          <div><label className="block text-xs text-body/70 dark:text-body-dark/70">Overheads %</label><input type="number" value={overheads as any} onChange={e=>setOverheads(e.target.value===''?'':Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></div>
          <div><label className="block text-xs text-body/70 dark:text-body-dark/70">Profit %</label><input type="number" value={profit as any} onChange={e=>setProfit(e.target.value===''?'':Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></div>
        </div>
      </details>

      {/* Step 2 removed: Material Rate Inputs panel not needed in BOQ-only flow */}

      {/* Output Mode */}
      <div className="mb-4 rounded-xl border border-slate-200/40 bg-white/70 p-3 dark:border-slate-700/30 dark:bg-surface-dark/60">
        <div className="font-display text-sm text-heading dark:text-heading-dark mb-2">Output View</div>
        <div className="flex gap-2">
          <button onClick={()=>setOutputMode('measurement')} className={`rounded-lg px-3 py-1 text-sm border ${outputMode==='measurement'?'border-primary text-primary bg-primary/10':'border-slate-300 dark:border-slate-600'}`}>Measurement Sheet</button>
          <button onClick={()=>setOutputMode('boq')} className={`rounded-lg px-3 py-1 text-sm border ${outputMode==='boq'?'border-primary text-primary bg-primary/10':'border-slate-300 dark:border-slate-600'}`}>BOQ</button>
          <button onClick={()=>setOutputMode('both')} className={`rounded-lg px-3 py-1 text-sm border ${outputMode==='both'?'border-primary text-primary bg-primary/10':'border-slate-300 dark:border-slate-600'}`}>Both</button>
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs text-body/70 dark:text-body-dark/70">Currency</label>
            <select value={currency} onChange={e=>setCurrency(e.target.value as any)} className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800">
              <option value="NPR">NPR</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 3: Structural & Finishing Quantities */}
      <details className="mb-4 rounded-xl border border-slate-200/40 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-surface-dark/60" open>
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">Items & Quantities</summary>
        <div className="mt-3 overflow-x-auto">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {sections.map(s => (
                <button key={s.id} onClick={()=>setActiveSectionId(s.id)} className={`rounded-lg px-3 py-1 text-xs border ${activeSectionId===s.id?'border-primary text-primary bg-primary/10':'border-slate-300 dark:border-slate-600'}`}>{s.title}</button>
              ))}
              <button
                onClick={()=>{
                  const nextIdx = sections.length+1
                  const id = `sec-${nextIdx}`
                  const title = `Section ${nextIdx}`
                  setSections(prev=> [...prev, { id, title }])
                  setActiveSectionId(id)
                }}
                className="rounded-lg border border-dashed border-slate-300 px-3 py-1 text-xs hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
              >+ Add Section</button>
              <details className="ml-2 inline-block">
                <summary className="cursor-pointer text-xs text-body/70 dark:text-body-dark/70">Manage Sections</summary>
                <div className="mt-2 rounded-md border border-slate-200/40 p-2 dark:border-slate-700/40 bg-white/70 dark:bg-slate-900/60">
                  {sections.map((s, i)=> (
                    <div key={s.id} className="mb-2 flex items-center gap-2">
                      <input value={s.title} onChange={e=>{
                        const title = e.target.value
                        setSections(prev=> prev.map(x=> x.id===s.id? {...x, title}: x))
                      }} className="w-56 rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800"/>
                      <button onClick={()=>{
                        if (sections.length===1) return
                        setSections(prev=> prev.filter(x=> x.id!==s.id));
                        if (activeSectionId===s.id) setActiveSectionId(sections[0].id)
                      }} className="rounded-md border px-2 py-1 text-xs">Delete</button>
                    </div>
                  ))}
                </div>
              </details>
            </div>
            <span className="text-xs text-body/70 dark:text-body-dark/70">Apply measurement to all:</span>
            <select
              className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800"
              onChange={(e)=>{
                const mode = e.target.value as any
                setItems(prev=> prev.map(row=> ({...row, measurement_mode: mode})))
              }}
            >
              <option value="LBH">LBH</option>
              <option value="AREA">AREA</option>
              <option value="VOLUME">VOLUME</option>
            </select>
            <label className="ml-3 inline-flex items-center gap-2 text-xs text-body/70 dark:text-body-dark/70">
              <input type="checkbox" checked={useNumberingAsCode} onChange={e=>setUseNumberingAsCode(e.target.checked)} /> Use numbering as Item Code
            </label>
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600 dark:text-slate-300">
                <th className="p-2">Code</th>
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Category</th>
                <th className="p-2">Unit</th>
                <th className="p-2">Measure</th>
                <th className="p-2">No.</th>
                <th className="p-2">Measurements</th>
                <th className="p-2">Qty (auto/override)</th>
                <th className="p-2">Deduct?</th>
                <th className="p-2">Rate (per unit)</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((r, idx)=> (
                <tr key={idx} className="border-t border-slate-200/40 dark:border-slate-700/40">
                  <td className="p-2"><input value={r.item_code || ''} onChange={e=>updateItem(idx,{item_code:e.target.value})} className="w-28 rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></td>
                  <td className="p-2"><input value={r.name || ''} placeholder="Short name (e.g., Excavation)" onChange={e=>updateItem(idx,{name:e.target.value})} className="w-40 rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></td>
                  <td className="p-2"><input value={r.description || ''} placeholder="Detailed description" onChange={e=>updateItem(idx,{description:e.target.value})} className="w-64 rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"/></td>
                  <td className="p-2">
                    <select value={(r.category as any) || 'Earthwork'} onChange={e=>updateItem(idx,{category:e.target.value as any})} className="rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800">
                      {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <select value={(r.unit as any) || 'm3'} onChange={e=>updateItem(idx,{unit:e.target.value as any})} className="rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800">
                      {UNITS.map(u=> <option key={u} value={u}>{u}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <select value={(r.measurement_mode as any) || 'LBH'} onChange={e=>updateItem(idx,{measurement_mode: e.target.value as any})} className="rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800">
                      <option value="LBH">LBH</option>
                      <option value="AREA">AREA</option>
                      <option value="VOLUME">VOLUME</option>
                    </select>
                  </td>
                  <td className="p-2"><input type="number" {...numAttrs} placeholder="No." value={r.count_no as any || ''} onChange={e=>updateItem(idx,{count_no: e.target.value===''?undefined:Number(e.target.value)})} className="w-20 rounded-md border px-2 py-1 dark:bg-slate-800 "/></td>
                  <td className="p-2">
                    {((r.measurement_mode ?? 'LBH') === 'LBH') && (
                      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
                        <input type="number" {...numAttrs} placeholder="L (m)" value={r.length_m as any || ''} onChange={e=>updateItem(idx,{length_m: e.target.value===''?undefined:Number(e.target.value)})} className={`w-20 rounded-md border px-2 py-1 dark:bg-slate-800 ${requiredClass(!(Number(r.length_m)>0 && (Number(r.breadth_m)>0 || Number(r.height_m)>0)))}`}/>
                        <input type="number" {...numAttrs} placeholder="B (m)" value={r.breadth_m as any || ''} onChange={e=>updateItem(idx,{breadth_m: e.target.value===''?undefined:Number(e.target.value)})} className={`w-20 rounded-md border px-2 py-1 dark:bg-slate-800 ${requiredClass(!(Number(r.length_m)>0 && (Number(r.breadth_m)>0 || Number(r.height_m)>0)) )}`}/>
                        <input type="number" {...numAttrs} placeholder="H/Thk (m)" value={r.height_m as any || ''} onChange={e=>updateItem(idx,{height_m: e.target.value===''?undefined:Number(e.target.value)})} className="w-24 rounded-md border px-2 py-1 dark:bg-slate-800"/>
                      </div>
                    )}
                    {r.measurement_mode === 'AREA' && (
                      <div className="flex items-center gap-2">
                        <input type="number" {...numAttrs} placeholder="Area (m²)" value={r.area_m2 as any || ''} onChange={e=>updateItem(idx,{area_m2: e.target.value===''?undefined:Number(e.target.value)})} className="w-32 rounded-md border px-2 py-1 dark:bg-slate-800"/>
                      </div>
                    )}
                    {r.measurement_mode === 'VOLUME' && (
                      <div className="flex items-center gap-2">
                        <input type="number" {...numAttrs} placeholder="Volume (m³)" value={r.volume_m3 as any || ''} onChange={e=>updateItem(idx,{volume_m3: e.target.value===''?undefined:Number(e.target.value)})} className="w-32 rounded-md border px-2 py-1 dark:bg-slate-800"/>
                      </div>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input id={`qty-${idx}`} type="number" {...numAttrs} placeholder={`auto: ${fmt(((deriveQty(r as any)) * (r as any).deduct? -1:1),3)}`} value={(r.quantity as any) ?? ''} onChange={e=>updateItem(idx,{quantity: e.target.value===''?undefined:Number(e.target.value)})} className="w-28 rounded-md border px-2 py-1 dark:bg-slate-800"/>
                      <div className="text-xs text-body/60 dark:text-body-dark/60">Press Edit to clear and type; placeholder shows auto</div>
                      <button onClick={()=>{
                        updateItem(idx,{quantity: undefined})
                        const el = document.getElementById(`qty-${idx}`) as HTMLInputElement | null
                        el?.focus()
                      }} className="rounded-md border px-2 py-1 text-xs">Edit Quantity</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-8 appearance-none rounded-full bg-slate-300 transition-colors checked:bg-red-500" checked={(r as any).deduct || false} onChange={e=>updateItem(idx,{ ...(r as any), deduct: e.target.checked })} />
                      <span className="text-xs text-body/70 dark:text-body-dark/70">Deduct</span>
                    </label>
                  </td>
                  <td className="p-2"><input type="number" {...numAttrs} placeholder="NPR/unit" value={r.per_unit_rate as any || ''} onChange={e=>updateItem(idx,{per_unit_rate: e.target.value===''?undefined:Number(e.target.value)})} className="w-28 rounded-md border px-2 py-1 dark:bg-slate-800"/></td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <button onClick={()=>moveItem(idx,-1)} title="Move up" className="rounded-md border px-2 py-1 text-xs">↑</button>
                      <button onClick={()=>moveItem(idx,1)} title="Move down" className="rounded-md border px-2 py-1 text-xs">↓</button>
                      <button onClick={()=>duplicateItem(idx)} title="Duplicate" className="rounded-md border px-2 py-1 text-xs">⎘</button>
                      <button onClick={()=>removeItem(idx)} title="Delete" className="rounded-md border px-2 py-1 text-xs"><Trash2 className="h-3 w-3"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={addItem} className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><Plus className="h-4 w-4"/> New Item</button>
            <button onClick={addSubItem} className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><Plus className="h-4 w-4"/> New Sub-Item</button>
          </div>
        </div>
      </details>

      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={handleCalc} disabled={isCalculating} className="rounded-xl bg-primary px-4 py-2 font-display text-white hover:bg-primary/90 disabled:opacity-60">{isCalculating? 'Calculating…':'Calculate BOQ'}</button>
        {result && (
          <>
            <button onClick={downloadCSV} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><FileDown className="h-4 w-4"/> Download CSV</button>
            <button onClick={downloadExcelMeasurement} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><FileDown className="h-4 w-4"/> Download Measurement (XLS)</button>
            <button onClick={downloadExcelBOQ} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><FileDown className="h-4 w-4"/> Download BOQ (XLS)</button>
            <button onClick={printPDF} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><Printer className="h-4 w-4"/> Print PDF</button>
          </>
        )}
      </div>

      {result && (
        <div className="mt-6">
          {/* Summary cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <div className="text-body/70 dark:text-body-dark/70">Grand Total</div>
              <div className="font-mono font-semibold">NPR {fmt(result.summary.grand_total,2)}</div>
            </div>
          </div>

          {/* Measurement Sheet and/or BOQ Table */}
          {(outputMode==='measurement' || outputMode==='both') && (
            <div className="mt-6">
              <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Measurement Sheet</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-600 dark:text-slate-300">
                      <th className="p-2">Sr.</th>
                      <th className="p-2">Item of Work</th>
                      <th className="p-2">No.</th>
                      <th className="p-2">Length (m)</th>
                      <th className="p-2">Width (m)</th>
                      <th className="p-2">Height/Thk (m)</th>
                      <th className="p-2 text-right">Area (m²)</th>
                      <th className="p-2 text-right">Volume (m³)</th>
                      <th className="p-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx)=>{
                      const L = it.length_m ?? 0; const B = it.breadth_m ?? 0; const H = it.height_m ?? 0; const T = it.thickness_m ?? 0;
                      const area = (it.area_m2 ?? (L * (B || H || T))) || 0
                      const vol = (it.volume_m3 ?? (L * B * (H || T))) || 0
                      const subtotal = deriveQty(it as any)
                      return (
                        <tr key={idx} className="border-t border-slate-200/40 dark:border-slate-700/40">
                          <td className="p-2">{idx+1}</td>
                          <td className="p-2">{it.description || `Item ${idx+1}`}</td>
                          <td className="p-2">{it.count_no ?? ''}</td>
                          <td className="p-2">{it.length_m ?? ''}</td>
                          <td className="p-2">{it.breadth_m ?? ''}</td>
                          <td className="p-2">{it.height_m ?? it.thickness_m ?? ''}</td>
                          <td className="p-2 text-right font-mono" style={{fontVariantNumeric:'tabular-nums'}}>{area?fmt(area,3):''}</td>
                          <td className="p-2 text-right font-mono" style={{fontVariantNumeric:'tabular-nums'}}>{vol?fmt(vol,3):''}</td>
                          <td className="p-2 text-right font-mono" style={{fontVariantNumeric:'tabular-nums'}}>{fmt(subtotal,3)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(outputMode==='boq' || outputMode==='both') && (
            <div className="mt-6 overflow-x-auto">
              <div className="max-h-[60vh] overflow-auto rounded-lg border border-slate-200/40 dark:border-slate-700/40">
                <table className="min-w-full text-xs md:text-sm">
                  <thead>
                    <tr className="sticky top-0 bg-white text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      <th className="p-2">Item Code</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Group</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Unit</th>
                      <th className="p-2 text-right">Qty</th>
                      <th className="p-2 text-right">Rate</th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const groups = new Map<string | undefined, typeof result.results>()
                      for (const row of result.results) {
                        const k = row.group || 'General'
                        if (!groups.has(k)) groups.set(k, [])
                        groups.get(k)!.push(row)
                      }
                      const out: JSX.Element[] = []
                      // Build metadata map from inputs for sub-item indenting
                      const meta = new Map<string, { is_subitem?: boolean }>()
                      items.forEach((it, index) => {
                        const code = it.item_code || `ITM-${index+1}`
                        meta.set(code, { is_subitem: it.is_subitem })
                      })
                      let sectionIdx = 0
                      for (const [grp, rows] of groups) {
                        let subtotal = 0
                        const secNo = `${++sectionIdx}.`
                        out.push(
                          <tr key={`ghead-${grp}`} className="bg-slate-50 dark:bg-slate-800/40">
                            <td className="p-2 font-semibold" colSpan={11}>{secNo} {grp}</td>
                          </tr>
                        )
                        let mainIdx = 0
                        let romanIdxMap: Record<string, number> = {}
                        rows.forEach((r, i) => {
                          subtotal += r.amount
                          const isSub = meta.get(r.item_code)?.is_subitem
                          let numLabel = ''
                          if (!isSub) {
                            numLabel = `${sectionIdx}.${++mainIdx}`
                          } else {
                            const key = `${sectionIdx}.${mainIdx}`
                            romanIdxMap[key] = (romanIdxMap[key] || 0) + 1
                            const romans = ['i','ii','iii','iv','v','vi','vii','viii','ix','x']
                            numLabel = romans[(romanIdxMap[key]-1) % romans.length]
                          }
                          out.push(
                            <tr key={`${grp}-${i}`} className="border-t border-slate-200/40 dark:border-slate-700/40">
                              <td className="p-2">{useNumberingAsCode ? (isSub ? '' : `${numLabel}`) : r.item_code}</td>
                              <td className="p-2">{isSub ? <span className="pl-4">{numLabel}) {r.description}</span> : <span>{numLabel}. {r.description}</span>}</td>
                              <td className="p-2">{r.group}</td>
                              <td className="p-2">{r.category}</td>
                              <td className="p-2">{r.unit}</td>
                              <td className="p-2 text-right font-mono" style={{fontVariantNumeric:'tabular-nums'}}>{fmt(r.quantity,3)}</td>
                              <td className="p-2 text-right font-mono" style={{fontVariantNumeric:'tabular-nums'}}>{currencySymbol(currency)}{fmt(r.rate_total,2)}</td>
                              <td className="p-2 text-right font-mono" style={{fontVariantNumeric:'tabular-nums'}}>{currencySymbol(currency)}{fmt(r.amount,2)}</td>
                            </tr>
                          )
                        })
                        out.push(
                          <tr key={`gfoot-${grp}`} className="bg-slate-50/70 dark:bg-slate-800/30">
                            <td className="p-2 font-semibold" colSpan={10}>Subtotal of {grp}</td>
                            <td className="p-2 text-right font-mono font-semibold">{fmt(subtotal,2)}</td>
                          </tr>
                        )
                      }
                      return out
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Category subtotal table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600 dark:text-slate-300">
                  <th className="p-2">Category</th>
                  <th className="p-2 text-right">Subtotal (NPR)</th>
                </tr>
              </thead>
              <tbody>
                {result.summary.categories.map((c, idx)=> (
                  <tr key={idx} className="border-t border-slate-200/40 dark:border-slate-700/40">
                    <td className="p-2">{c.category}</td>
                    <td className="p-2 text-right font-mono" style={{fontVariantNumeric:'tabular-nums'}}>{fmt(c.subtotal,2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
