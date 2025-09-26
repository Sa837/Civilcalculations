'use client'

import { useState, useRef, useMemo, type FC } from 'react'
import { Calculator, Download, Plus, Trash2, Upload, FileDown, Printer } from 'lucide-react'
import { calculateBBS } from '@/lib/registry/calculator/bbs-calculator'
import type {
  BBSInputItem,
  ElementType,
  BarType,
  BBSResult,
  BBSOptions,
  DesignCode,
} from '@/lib/registry/calculator/bbs/schema'

const ELEMENT_TYPES: ElementType[] = [
  'beam',
  'column',
  'slab',
  'footing',
  'wall',
  'stair',
  'custom',
]
const BAR_TYPES: BarType[] = ['Main', 'Secondary', 'Stirrups/Ties', 'Distribution', 'Extra']
const DIA_OPTIONS = [6, 8, 10, 12, 16, 20, 25, 32]
const CURRENCIES = [
  { code: 'NPR', symbol: 'रु' },
  { code: 'INR', symbol: '₹' },
  { code: 'USD', symbol: '$' },
]

function toNumber(v: string | undefined): number | undefined {
  return v !== undefined && v !== '' ? parseFloat(v) : undefined
}

type BBSCalculatorCardProps = { globalUnit: 'm' | 'ft' }
const BBSCalculatorCard: FC<BBSCalculatorCardProps> = ({ globalUnit }) => {
  const [rows, setRows] = useState<Array<Partial<BBSInputItem>>>([{}])
  const [result, setResult] = useState<BBSResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [currency, setCurrency] = useState<'NPR' | 'INR' | 'USD'>('NPR')
  const currencySymbol = useMemo(
    () => CURRENCIES.find((c) => c.code === currency)?.symbol ?? '',
    [currency],
  )
  const units = globalUnit === 'ft' ? ('imperial' as const) : ('metric' as const)
  // Number formatting helpers
  const fmt = (n: number | undefined, d = 2) =>
    typeof n === 'number'
      ? n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d })
      : ''
  const fmtInt = (n: number | undefined) => (typeof n === 'number' ? n.toLocaleString() : '')

  // Project & Code Settings
  const [projectName, setProjectName] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [designer, setDesigner] = useState<string>('')
  const [designCode, setDesignCode] = useState<DesignCode>('NBC')
  const [stockLength, setStockLength] = useState<number | ''>(12)
  const [defaultCover, setDefaultCover] = useState<number | ''>(25)
  const [defaultWastage, setDefaultWastage] = useState<number | ''>(3)

  // Display Settings
  const [showShape, setShowShape] = useState<boolean>(true)
  const [showRemarks, setShowRemarks] = useState<boolean>(true)
  const [showCost, setShowCost] = useState<boolean>(true)
  const [showByDiameter, setShowByDiameter] = useState<boolean>(true)
  const [lenDec, setLenDec] = useState<number>(3) // cutting & total length decimals
  const [unitWtDec, setUnitWtDec] = useState<number>(3)
  const [wtDec, setWtDec] = useState<number>(2)

  const addRow = () => setRows((prev) => [...prev, {}])
  const removeRow = (idx: number) => setRows((prev) => prev.filter((_, i) => i !== idx))
  const updateRow = (idx: number, patch: Partial<BBSInputItem>) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)))

  // Quick Presets
  const addPresetBeam = () => {
    // 2 Top, 2 Bottom main bars + stirrups baseline
    setRows((prev) => [
      ...prev,
      {
        element_type: 'beam',
        member_id: 'Beam B1',
        bar_type: 'Main',
        bar_diameter_mm: 16,
        num_bars: 2,
        clear_length_m: 4.5,
        hook_type: '135',
      },
      {
        element_type: 'beam',
        member_id: 'Beam B1',
        bar_type: 'Main',
        bar_diameter_mm: 16,
        num_bars: 2,
        clear_length_m: 4.5,
        hook_type: '135',
      },
      {
        element_type: 'beam',
        member_id: 'Beam B1',
        bar_type: 'Stirrups/Ties',
        bar_diameter_mm: 8,
        num_bars: 40,
        spacing_mm: 150,
        clear_length_m: 0.6,
        hook_type: '135',
      },
    ])
  }
  const addPresetColumn = () => {
    // 8 longitudinal + ties
    setRows((prev) => [
      ...prev,
      {
        element_type: 'column',
        member_id: 'C1',
        bar_type: 'Main',
        bar_diameter_mm: 16,
        num_bars: 8,
        clear_length_m: 3.0,
        hook_type: '135',
      },
      {
        element_type: 'column',
        member_id: 'C1',
        bar_type: 'Stirrups/Ties',
        bar_diameter_mm: 8,
        num_bars: 50,
        spacing_mm: 150,
        clear_length_m: 0.75,
        hook_type: '135',
      },
    ])
  }
  const addPresetSlab = () => {
    // slab mesh main + distribution
    setRows((prev) => [
      ...prev,
      {
        element_type: 'slab',
        member_id: 'S1 Main',
        bar_type: 'Main',
        bar_diameter_mm: 12,
        num_bars: 40,
        spacing_mm: 150,
        clear_length_m: 4.2,
      },
      {
        element_type: 'slab',
        member_id: 'S1 Dist',
        bar_type: 'Distribution',
        bar_diameter_mm: 10,
        num_bars: 40,
        spacing_mm: 150,
        clear_length_m: 3.6,
      },
    ])
  }
  const addPresetFooting = () => {
    // footing mesh X/Y
    setRows((prev) => [
      ...prev,
      {
        element_type: 'footing',
        member_id: 'F1 X',
        bar_type: 'Main',
        bar_diameter_mm: 12,
        num_bars: 12,
        spacing_mm: 150,
        clear_length_m: 2.0,
      },
      {
        element_type: 'footing',
        member_id: 'F1 Y',
        bar_type: 'Distribution',
        bar_diameter_mm: 12,
        num_bars: 12,
        spacing_mm: 150,
        clear_length_m: 2.0,
      },
    ])
  }

  // Unit conversions (imperial -> metric for calculation)
  const ftToM = (ft?: number) => (ft ?? 0) * 0.3048
  const inToMm = (inch?: number) => (inch ?? 0) * 25.4

  const handleCalculate = async () => {
    setIsCalculating(true)
    try {
      const inputs: BBSInputItem[] = rows.map((r, i) => ({
        element_type: (r.element_type ?? 'beam') as ElementType,
        member_id: r.member_id ?? `Member ${i + 1}`,
        bar_type: (r.bar_type ?? 'Main') as BarType,
        bar_diameter_mm: Number(r.bar_diameter_mm ?? 16),
        num_bars: Number(r.num_bars ?? 1),
        spacing_mm:
          units === 'imperial'
            ? inToMm(toNumber(r.spacing_mm as any))
            : toNumber(r.spacing_mm as any),
        clear_length_m:
          units === 'imperial'
            ? ftToM(Number(r.clear_length_m ?? 1))
            : Number(r.clear_length_m ?? 1),
        hook_type: (r.hook_type as any) ?? undefined,
        hook_length_mm:
          units === 'imperial'
            ? inToMm(toNumber(r.hook_length_mm as any))
            : toNumber(r.hook_length_mm as any),
        bend_angles:
          typeof r.bend_angles === 'string'
            ? (r.bend_angles as any as string)
                .split(',')
                .map((s) => parseFloat(s.trim()))
                .filter((n) => !isNaN(n))
            : (r.bend_angles as number[] | undefined),
        development_length_m:
          units === 'imperial'
            ? ftToM(toNumber(r.development_length_m as any))
            : toNumber(r.development_length_m as any),
        cover_mm:
          units === 'imperial' ? inToMm(toNumber(r.cover_mm as any)) : toNumber(r.cover_mm as any),
        wastage_percent: toNumber(r.wastage_percent as any),
        lap_length_m:
          units === 'imperial'
            ? ftToM(toNumber(r.lap_length_m as any))
            : toNumber(r.lap_length_m as any),
        stock_length_m:
          units === 'imperial'
            ? ftToM(toNumber(r.stock_length_m as any))
            : toNumber(r.stock_length_m as any),
        steel_rate_per_kg: toNumber(r.steel_rate_per_kg as any),
        shape_preference: (r.shape_preference as any) || undefined,
      }))
      const options: BBSOptions = {
        code: designCode,
        project_name: projectName || undefined,
        location: location || undefined,
        designer: designer || undefined,
        stock_length_m: typeof stockLength === 'number' ? stockLength : undefined,
        default_cover_mm: typeof defaultCover === 'number' ? defaultCover : undefined,
        wastage_percent_default: typeof defaultWastage === 'number' ? defaultWastage : undefined,
      }
      const res = calculateBBS(inputs, options)
      setResult(res)
    } catch (e: any) {
      alert((e as any).message || 'Error calculating BBS')
    } finally {
      setIsCalculating(false)
    }
  }

  // CSV Import / Template
  const importCSV = async (file: File) => {
    const text = await file.text()
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
    if (lines.length < 2) return
    const header = lines[0].split(',').map((h) => h.trim().toLowerCase())
    const parsed: Partial<BBSInputItem>[] = []
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim())
      const get = (key: string) => {
        const idx = header.indexOf(key)
        return idx >= 0 ? cols[idx] : ''
      }
      parsed.push({
        element_type: (get('element_type') as ElementType) || 'beam',
        member_id: get('member_id') || `Member ${i}`,
        bar_type: (get('bar_type') as BarType) || 'Main',
        bar_diameter_mm: parseFloat(get('bar_diameter_mm') || '16'),
        num_bars: parseInt(get('num_bars') || '1'),
        spacing_mm: get('spacing_mm') ? parseFloat(get('spacing_mm')) : undefined,
        clear_length_m: parseFloat(get('clear_length_m') || '1'),
        hook_type: (get('hook_type') as any) || undefined,
        hook_length_mm: get('hook_length_mm') ? parseFloat(get('hook_length_mm')) : undefined,
        bend_angles: get('bend_angles')
          ? get('bend_angles')
              .split(';')
              .map((s) => parseFloat(s.trim()))
              .filter((n) => !isNaN(n))
          : undefined,
        development_length_m: get('development_length_m')
          ? parseFloat(get('development_length_m'))
          : undefined,
        cover_mm: get('cover_mm') ? parseFloat(get('cover_mm')) : undefined,
        wastage_percent: get('wastage_percent') ? parseFloat(get('wastage_percent')) : undefined,
        lap_length_m: get('lap_length_m') ? parseFloat(get('lap_length_m')) : undefined,
        stock_length_m: get('stock_length_m') ? parseFloat(get('stock_length_m')) : undefined,
        steel_rate_per_kg: get('steel_rate_per_kg')
          ? parseFloat(get('steel_rate_per_kg'))
          : undefined,
      })
    }
    setRows(parsed)
  }

  const downloadTemplate = () => {
    const header = [
      'element_type',
      'member_id',
      'bar_type',
      'bar_diameter_mm',
      'num_bars',
      'spacing_mm',
      'clear_length_m',
      'hook_type',
      'hook_length_mm',
      'bend_angles',
      'development_length_m',
      'cover_mm',
      'wastage_percent',
      'lap_length_m',
      'stock_length_m',
      'steel_rate_per_kg',
    ]
    const sample = [
      [
        'beam',
        'Beam B1',
        'Main',
        '16',
        '4',
        '',
        '5.0',
        '135',
        '',
        '90;45',
        '',
        '25',
        '3',
        '',
        '12',
        '',
      ],
      [
        'column',
        'C1',
        'Stirrups/Ties',
        '8',
        '20',
        '',
        '0.8',
        '135',
        '',
        '',
        '',
        '25',
        '3',
        '',
        '12',
        '',
      ],
      [
        'slab',
        'S1 Main',
        'Main',
        '12',
        '50',
        '150',
        '4.2',
        '',
        '',
        '45;45',
        '',
        '20',
        '3',
        '',
        '12',
        '',
      ],
    ]
    const csv = [header.join(','), ...sample.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bbs_template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Export helpers
  const downloadCSV = () => {
    if (!result) return
    const header: string[] = ['Bar Mark', 'Member ID', 'Bar Type']
    if (showShape) header.push('Shape')
    header.push(
      'Dia (mm)',
      'Qty',
      'Cut Length (m)',
      'Total Length (m)',
      'Unit Wt (kg/m)',
      'Total Wt (kg)',
      'Hook Details',
      'Lap (m)',
    )
    if (showRemarks) header.push('Remarks')
    if (showCost) header.push(`Total Cost (${currency})`)

    const rowsCsv = result.results.map((r) => {
      const row: (string | number)[] = [r.bar_mark, r.member_id, r.bar_type]
      if (showShape) row.push(r.shape_code)
      row.push(
        r.bar_diameter_mm,
        r.num_bars,
        r.cutting_length_m,
        r.total_length_m,
        r.unit_weight_kg_per_m,
        r.total_weight_kg,
        r.hook_details ?? '',
        r.lap_length_m ?? '',
      )
      if (showRemarks) row.push(r.remarks ?? '')
      if (showCost)
        row.push(
          typeof r.total_cost === 'number' ? `${currencySymbol}${r.total_cost.toFixed(2)}` : '',
        )
      return row
    })
    const csv = [header, ...rowsCsv].map((arr) => arr.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bbs_result.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadExcel = () => {
    if (!result) return
    const title = result.project_meta?.project_name || 'BBS Result'
    const code = result.code_used ? `Designed as per ${result.code_used}` : ''
    const headerParts: string[] = ['Bar Mark', 'Member ID', 'Bar Type']
    if (showShape) headerParts.push('Shape')
    headerParts.push(
      'Dia (mm)',
      'Qty',
      'Cut Length (m)',
      'Total Length (m)',
      'Unit Wt (kg/m)',
      'Total Wt (kg)',
      'Hook Details',
      'Lap (m)',
    )
    if (showRemarks) headerParts.push('Remarks')
    if (showCost) headerParts.push(`Total Cost (${currency})`)
    const header = headerParts
    const rowsHtml = result.results
      .map(
        (r) => `
      <tr>
        <td>${r.bar_mark}</td>
        <td>${r.member_id}</td>
        <td>${r.bar_type}</td>
        ${showShape ? `<td>${r.shape_code}</td>` : ''}
        <td>${r.bar_diameter_mm}</td>
        <td>${r.num_bars}</td>
        <td>${r.cutting_length_m}</td>
        <td>${r.total_length_m}</td>
        <td>${r.unit_weight_kg_per_m}</td>
        <td>${r.total_weight_kg}</td>
        <td>${r.hook_details ?? ''}</td>
        <td>${r.lap_length_m ?? ''}</td>
        ${showRemarks ? `<td>${r.remarks ?? ''}</td>` : ''}
        ${showCost ? `<td>${typeof r.total_cost === 'number' ? `${currencySymbol}${r.total_cost.toFixed(2)}` : ''}</td>` : ''}
      </tr>`,
      )
      .join('')
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
    a.download = 'bbs_result.xls'
    a.click()
    URL.revokeObjectURL(url)
  }

  const printPDF = () => {
    if (!result) return
    const title = result.project_meta?.project_name || 'BBS Calculator'
    const code = result.code_used ? `Designed as per ${result.code_used}` : ''
    const currencyHdr = currency
    const headerParts: string[] = ['Bar Mark', 'Member', 'Type']
    if (showShape) headerParts.push('Shape')
    headerParts.push(
      'Dia (mm)',
      'Qty',
      'Cutting L (m)',
      'Total L (m)',
      'Unit Wt (kg/m)',
      'Total Wt (kg)',
      'Hooks/Bends',
      'Lap (m)',
    )
    if (showRemarks) headerParts.push('Remarks')
    if (showCost) headerParts.push(`Cost (${currencyHdr})`)
    const header = headerParts
    const rowsHtml = result.results
      .map(
        (r) => `
      <tr>
        <td>${r.bar_mark}</td>
        <td>${r.member_id}</td>
        <td>${r.bar_type}</td>
        ${showShape ? `<td>${r.shape_code}</td>` : ''}
        <td>${r.bar_diameter_mm}</td>
        <td>${r.num_bars}</td>
        <td>${fmt(r.cutting_length_m, lenDec)}</td>
        <td>${fmt(r.total_length_m, lenDec)}</td>
        <td>${fmt(r.unit_weight_kg_per_m, unitWtDec)}</td>
        <td>${fmt(r.total_weight_kg, wtDec)}</td>
        <td>${r.hook_details ?? ''}</td>
        <td>${typeof r.lap_length_m === 'number' ? fmt(r.lap_length_m, lenDec) : ''}</td>
        ${showRemarks ? `<td>${r.remarks ?? ''}</td>` : ''}
        ${showCost ? `<td>${typeof r.total_cost === 'number' ? `${currencySymbol}${fmt(r.total_cost, 2)}` : ''}</td>` : ''}
      </tr>`,
      )
      .join('')
    const summaryHtml = `
      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:8px; margin: 10px 0;">
        <div style="border:1px solid #e2e8f0; padding:8px;">
          <div style="color:#64748b; font-size:12px;">Total Bars</div>
          <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight:600;">${result.summary.total_bars}</div>
        </div>
        <div style="border:1px solid #e2e8f0; padding:8px;">
          <div style="color:#64748b; font-size:12px;">Grand Total Length</div>
          <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight:600;">${result.summary.grand_total_length_m.toFixed(2)} m</div>
        </div>
        <div style="border:1px solid #e2e8f0; padding:8px;">
          <div style="color:#64748b; font-size:12px;">Total Steel Weight</div>
          <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight:600;">${result.summary.total_steel_weight_kg.toFixed(1)} kg</div>
        </div>
        <div style="border:1px solid #e2e8f0; padding:8px;">
          <div style="color:#64748b; font-size:12px;">Approx. Cost</div>
          <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight:600;">${typeof result.summary.total_cost === 'number' ? `${currencySymbol}${result.summary.total_cost.toFixed(2)}` : '-'}</div>
        </div>
      </div>`
    const byDia =
      result.summary.by_diameter && result.summary.by_diameter.length > 0
        ? `<h2 style="font-size:14px; margin: 12px 0 6px 0;">Summary by Diameter</h2>
         <table style="border-collapse:collapse; width:100%; font-size:12px;">
           <thead><tr><th style="border:1px solid #cbd5e1; padding:6px 8px; text-align:left; background:#f8fafc;">Dia (mm)</th><th style="border:1px solid #cbd5e1; padding:6px 8px; text-align:left; background:#f8fafc;">Count</th><th style="border:1px solid #cbd5e1; padding:6px 8px; text-align:left; background:#f8fafc;">Total Length (m)</th><th style="border:1px solid #cbd5e1; padding:6px 8px; text-align:left; background:#f8fafc;">Total Weight (kg)</th></tr></thead>
           <tbody>
             ${result.summary.by_diameter!.map((d) => `<tr><td style=\"border:1px solid #cbd5e1; padding:6px 8px;\">${d.bar_diameter_mm}</td><td style=\"border:1px solid #cbd5e1; padding:6px 8px;\">${d.count}</td><td style=\"border:1px solid #cbd5e1; padding:6px 8px;\">${d.total_length_m}</td><td style=\"border:1px solid #cbd5e1; padding:6px 8px;\">${d.total_weight_kg}</td></tr>`).join('')}
           </tbody>
         </table>`
        : ''
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
          </div>

          {/* Compliance Notes */}
          {result.compliance_notes && result.compliance_notes.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-300/40 bg-amber-50/70 p-4 text-amber-800 dark:border-amber-400/30 dark:bg-amber-900/30 dark:text-amber-200">
              <div className="font-display text-sm mb-1">Compliance Notes</div>
              <ul className="list-disc pl-5 text-sm">
                {result.compliance_notes.map((n, idx)=> (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div style="text-align:right;">
          <div class="muted">${new Date().toLocaleDateString()}</div>
          <div class="muted">Units: ${units === 'imperial' ? 'Imperial (converted to metric)' : 'Metric'} | Currency: ${currencyHdr}</div>
        </div>
      </div>
      ${summaryHtml}
      <table><thead><tr>${header.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rowsHtml}</tbody></table>
      ${showByDiameter ? byDia : ''}
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
    <div className="p-8 font-display border-t border-slate-200/20 dark:border-slate-800/20">
      <div className="mb-6 flex items-center justify-between gap-2 flex-wrap">
        <h2 className="font-display text-xl font-semibold text-heading dark:text-heading-dark">
          Bar Bending Schedule (BBS) Calculator
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) importCSV(f)
            }}
          />
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            CSV Template
          </button>
          <button
            onClick={addRow}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add Row
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-display">Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="rounded-xl border border-slate-300 bg-white px-2 py-1 font-display dark:border-slate-600 dark:bg-slate-800"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Project & Code Settings */}
      <details className="mb-4 rounded-xl border border-slate-200/40 font-display bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">
          Project & Code Settings
        </summary>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">
              Project Name
            </label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
              placeholder="My Project"
            />
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
              placeholder="Kathmandu"
            />
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">Designer</label>
            <input
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
              placeholder="Engineer Name"
            />
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">Design Code</label>
            <select
              value={designCode}
              onChange={(e) => setDesignCode(e.target.value as DesignCode)}
              className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
            >
              <option value="NBC">NBC</option>
              <option value="IS">IS</option>
              <option value="ACI">ACI</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">
              Stock Bar Length (m)
            </label>
            <input
              type="number"
              step="0.1"
              value={stockLength as any}
              onChange={(e) =>
                setStockLength(e.target.value === '' ? '' : parseFloat(e.target.value))
              }
              className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
              placeholder="12"
            />
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">
              Default Cover (mm)
            </label>
            <input
              type="number"
              value={defaultCover as any}
              onChange={(e) =>
                setDefaultCover(e.target.value === '' ? '' : parseFloat(e.target.value))
              }
              className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
              placeholder="25"
            />
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">
              Default Wastage (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={defaultWastage as any}
              onChange={(e) =>
                setDefaultWastage(e.target.value === '' ? '' : parseFloat(e.target.value))
              }
              className="w-full rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
              placeholder="3"
            />
          </div>
        </div>
      </details>

      {/* Display Settings */}
      <details className="mb-4 rounded-xl border border-slate-200/40 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">
          Display Settings
        </summary>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showShape}
              onChange={(e) => setShowShape(e.target.checked)}
            />{' '}
            Shape column
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showRemarks}
              onChange={(e) => setShowRemarks(e.target.checked)}
            />{' '}
            Remarks column
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showCost}
              onChange={(e) => setShowCost(e.target.checked)}
            />{' '}
            Cost column
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showByDiameter}
              onChange={(e) => setShowByDiameter(e.target.checked)}
            />{' '}
            Show By-Diameter summary
          </label>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">
              Length Decimals
            </label>
            <input
              type="number"
              min={0}
              max={4}
              value={lenDec}
              onChange={(e) => setLenDec(parseInt(e.target.value || '0'))}
              className="w-24 rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">
              Unit Wt Decimals
            </label>
            <input
              type="number"
              min={0}
              max={4}
              value={unitWtDec}
              onChange={(e) => setUnitWtDec(parseInt(e.target.value || '0'))}
              className="w-24 rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs text-body/70 dark:text-body-dark/70">
              Total Wt Decimals
            </label>
            <input
              type="number"
              min={0}
              max={4}
              value={wtDec}
              onChange={(e) => setWtDec(parseInt(e.target.value || '0'))}
              className="w-24 rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
            />
          </div>
        </div>
      </details>

      {/* Quick Presets */}
      <details className="mb-4 rounded-xl border border-slate-200/40 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">
          Quick Presets
        </summary>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={addPresetBeam}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
          >
            Beam (2T+2B + Stirrups)
          </button>
          <button
            onClick={addPresetColumn}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
          >
            Column (8 Long + Ties)
          </button>
          <button
            onClick={addPresetSlab}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
          >
            Slab (Mesh)
          </button>
          <button
            onClick={addPresetFooting}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
          >
            Footing (Mesh)
          </button>
        </div>
      </details>

      {/* Collapsible Step Indicator (non-intrusive) */}
      <details className="mb-4 rounded-xl border border-slate-200/40 bg-white/70 p-3 dark:border-slate-700/30 dark:bg-slate-900/60">
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">
          Show Steps
        </summary>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {['1. Member', '2. Bars', '3. Hooks/Bends', '4. Review', '5. Result'].map((s) => (
            <div key={s} className="rounded-lg bg-primary/10 px-2 py-1 font-display text-primary">
              {s}
            </div>
          ))}
        </div>
      </details>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600 dark:text-slate-300">
              <th className="p-2">Element</th>
              <th className="p-2">Member ID</th>
              <th className="p-2">Bar Type</th>
              <th className="p-2">Shape</th>
              <th className="p-2">Dia (mm)</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Clear L ({units === 'imperial' ? 'ft' : 'm'})</th>
              <th className="p-2">Hook</th>
              <th className="p-2">Hook L ({units === 'imperial' ? 'in' : 'mm'})</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-t border-slate-200/40 dark:border-slate-700/40">
                <td className="p-2">
                  <select
                    value={r.element_type ?? 'beam'}
                    onChange={(e) =>
                      updateRow(idx, { element_type: e.target.value as ElementType })
                    }
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
                  >
                    {ELEMENT_TYPES.map((et) => (
                      <option key={et} value={et}>
                        {et}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    value={r.member_id ?? ''}
                    onChange={(e) => updateRow(idx, { member_id: e.target.value })}
                    className="w-36 rounded-md border px-2 py-1 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                    placeholder="Beam B1"
                  />
                </td>
                <td className="p-2">
                  <select
                    value={r.bar_type ?? 'Main'}
                    onChange={(e) => updateRow(idx, { bar_type: e.target.value as BarType })}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
                  >
                    {BAR_TYPES.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <select
                    value={(r.shape_preference as any) ?? ''}
                    onChange={(e) => updateRow(idx, { shape_preference: e.target.value as any })}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
                  >
                    <option value="">Auto</option>
                    <option value="straight">straight</option>
                    <option value="L">L</option>
                    <option value="U">U</option>
                    <option value="crank">crank</option>
                    <option value="stirrup">stirrup</option>
                    <option value="spiral">spiral</option>
                    <option value="custom">custom</option>
                  </select>
                </td>
                <td className="p-2">
                  <select
                    value={(r.bar_diameter_mm as any) ?? 16}
                    onChange={(e) =>
                      updateRow(idx, { bar_diameter_mm: parseFloat(e.target.value) })
                    }
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
                  >
                    {DIA_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={(r.num_bars as any) ?? ''}
                    onChange={(e) => updateRow(idx, { num_bars: parseInt(e.target.value) })}
                    className="w-20 rounded-md border px-2 py-1 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                    placeholder="10"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    step="0.001"
                    value={(r.clear_length_m as any) ?? ''}
                    onChange={(e) => updateRow(idx, { clear_length_m: parseFloat(e.target.value) })}
                    className="w-28 rounded-md border px-2 py-1 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                    placeholder={units === 'imperial' ? 'e.g. 16.4' : '5.0'}
                  />
                </td>
                <td className="p-2">
                  <select
                    value={(r.hook_type as any) ?? ''}
                    onChange={(e) => updateRow(idx, { hook_type: e.target.value as any })}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
                  >
                    <option value="">None</option>
                    <option value="90">90</option>
                    <option value="135">135</option>
                    <option value="180">180</option>
                    <option value="custom">Custom</option>
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={(r.hook_length_mm as any) ?? ''}
                    onChange={(e) => updateRow(idx, { hook_length_mm: parseFloat(e.target.value) })}
                    className="w-24 rounded-md border px-2 py-1 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                    placeholder={units === 'imperial' ? 'in' : 'mm'}
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => removeRow(idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 flex-wrap">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={isCalculating}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-display font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isCalculating ? (
            'Calculating'
          ) : (
            <>
              <Calculator className="h-4 w-4" /> Calculate BBS
            </>
          )}
        </button>
        {result && (
          <div className="flex items-center gap-2">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
            <button
              onClick={downloadExcel}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
            >
              <FileDown className="h-4 w-4" />
              Download Excel
            </button>
            <button
              onClick={printPDF}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
            >
              <Printer className="h-4 w-4" />
              Print PDF
            </button>
          </div>
        )}
      </div>

      {result && (
        <>
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            <div className="rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <div className="text-body/70 dark:text-body-dark/70">Total Bars</div>
              <div className="font-mono font-semibold">{result.summary.total_bars}</div>
            </div>
            <div className="rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <div className="text-body/70 dark:text-body-dark/70">Grand Total Length</div>
              <div className="font-mono font-semibold">
                {result.summary.grand_total_length_m.toFixed(2)} m
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <div className="text-body/70 dark:text-body-dark/70">Total Steel Weight</div>
              <div className="font-mono font-semibold">
                {result.summary.total_steel_weight_kg.toFixed(1)} kg
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/20 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
              <div className="text-body/70 dark:text-body-dark/70">Approx. Cost</div>
              <div className="font-mono font-semibold">
                {typeof result.summary.total_cost === 'number'
                  ? `${currencySymbol}${result.summary.total_cost.toFixed(2)}`
                  : '-'}
              </div>
            </div>
          </div>

          {/* Detailed BBS Table */}
          <div className="mt-6 overflow-x-auto">
            <div className="max-h-[60vh] overflow-auto rounded-lg border border-slate-200/40 dark:border-slate-700/40">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="sticky top-0 bg-white text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                    <th className="p-2">Bar Mark</th>
                    <th className="p-2">Member</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Shape</th>
                    <th className="p-2">Dia (mm)</th>
                    <th className="p-2 text-right">Qty</th>
                    <th className="p-2 text-right">Cutting L (m)</th>
                    <th className="p-2 text-right">Total L (m)</th>
                    <th className="p-2 text-right">Unit Wt (kg/m)</th>
                    <th className="p-2 text-right">Total Wt (kg)</th>
                    <th className="p-2">Hooks/Bends</th>
                    <th className="p-2 text-right">Lap (m)</th>
                    <th className="p-2">Remarks</th>
                    <th className="p-2 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r, i) => (
                    <tr
                      key={`${r.bar_mark}-${i}`}
                      className="border-t border-slate-200/40 dark:border-slate-700/40"
                    >
                      <td className="p-2 font-mono">{r.bar_mark}</td>
                      <td className="p-2">{r.member_id}</td>
                      <td className="p-2">{r.bar_type}</td>
                      <td className="p-2 uppercase">{r.shape_code}</td>
                      <td className="p-2">{fmtInt(r.bar_diameter_mm)}</td>
                      <td
                        className="p-2 text-right font-mono"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {fmtInt(r.num_bars)}
                      </td>
                      <td
                        className="p-2 text-right font-mono"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {fmt(r.cutting_length_m, 3)}
                      </td>
                      <td
                        className="p-2 text-right font-mono"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {fmt(r.total_length_m, 3)}
                      </td>
                      <td
                        className="p-2 text-right font-mono"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {fmt(r.unit_weight_kg_per_m, 3)}
                      </td>
                      <td
                        className="p-2 text-right font-mono"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {fmt(r.total_weight_kg, 2)}
                      </td>
                      <td className="p-2">{r.hook_details ?? ''}</td>
                      <td
                        className="p-2 text-right font-mono"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {typeof r.lap_length_m === 'number' ? fmt(r.lap_length_m, 3) : ''}
                      </td>
                      <td className="p-2">{r.remarks ?? ''}</td>
                      <td
                        className="p-2 text-right font-mono"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {typeof r.total_cost === 'number'
                          ? `${currencySymbol}${fmt(r.total_cost, 2)}`
                          : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* By-Diameter Summary */}
          {result.summary.by_diameter && result.summary.by_diameter.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-600 dark:text-slate-300">
                    <th className="p-2">Dia (mm)</th>
                    <th className="p-2">Count</th>
                    <th className="p-2">Total Length (m)</th>
                    <th className="p-2">Total Weight (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.summary.by_diameter.map((d) => (
                    <tr
                      key={d.bar_diameter_mm}
                      className="border-t border-slate-200/40 dark:border-slate-700/40"
                    >
                      <td className="p-2">{d.bar_diameter_mm}</td>
                      <td className="p-2">{d.count}</td>
                      <td className="p-2">{d.total_length_m}</td>
                      <td className="p-2">{d.total_weight_kg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* About / Info */}
      <details className="mt-6 rounded-xl border border-slate-200/40 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">
          About this BBS Calculator
        </summary>
        <div className="mt-2 text-sm text-body dark:text-body-dark">
          <p className="mb-2">
            This calculator follows Nepal National Building Code (NBC) as primary reference (NBC
            205, NBC 109, NBC 114). Optional checks for IS 456:2000 and ACI 318 can be selected in
            Project & Code Settings.
          </p>
          <p className="mb-2">
            All calculations are performed in metric internally. If the global unit is imperial,
            inputs are converted to metric for computation and reporting remains metric.
          </p>
          <p className="mb-2">
            Use Display Settings to control which columns appear and decimal precision. Exports
            (CSV/XLS/Print) reflect these settings.
          </p>
        </div>
      </details>

      {/* FAQ */}
      <details className="mt-3 rounded-xl border border-slate-200/40 bg-white/70 p-4 dark:border-slate-700/30 dark:bg-slate-900/60">
        <summary className="cursor-pointer font-display text-sm text-heading dark:text-heading-dark">
          FAQ
        </summary>
        <div className="mt-2 text-sm text-body dark:text-body-dark">
          <p className="font-semibold">Q1. What is a Bar Bending Schedule (BBS)?</p>
          <p className="mb-3">
            A BBS is a tabular list of reinforcement bars with lengths, bends, hooks, laps, total
            lengths, and weights used for fabrication and quantity estimation.
          </p>
          <p className="font-semibold">Q2. How are hook lengths calculated (NBC)?</p>
          <p className="mb-3">
            Default hook lengths are assumed as 90°=9d, 135°=12d, 180°=16d. You can override by
            entering a custom hook length or editing the hook type.
          </p>
          <p className="font-semibold">Q3. How is development length computed?</p>
          <p className="mb-3">
            If not provided, a default of 40d (tension) is used. You can specify development length
            directly per entry.
          </p>
          <p className="font-semibold">Q4. What if a bar exceeds 12 m?</p>
          <p className="mb-3">
            The calculator automatically adds lap lengths using a default of 40d per splice when the
            base cutting length exceeds the stock length. You can also specify lap length
            explicitly.
          </p>
          <p className="font-semibold">Q5. Which codes are supported?</p>
          <p className="mb-0">
            NBC (primary), with optional IS 456 and ACI 318 selections. Choose the design code under
            Project & Code Settings.
          </p>
        </div>
      </details>
    </div>
  )
}
export default BBSCalculatorCard
