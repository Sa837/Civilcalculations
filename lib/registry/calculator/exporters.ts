import type { BBSResult } from '@/lib/registry/calculator/bbs-schema'
import * as XLSX from 'xlsx'

function buildRows(result: BBSResult) {
  return result.results.map((r) => ({
    MemberID: r.member_id,
    BarType: r.bar_type,
    Diameter_mm: r.bar_diameter_mm,
    Quantity: r.num_bars,
    CutLength_m: r.cutting_length_m,
    TotalLength_m: r.total_length_m,
    UnitWeight_kgpm: r.unit_weight_kg_per_m,
    TotalWeight_kg: r.total_weight_kg,
    HookDetails: r.hook_details ?? '',
    Lap_m: r.lap_length_m ?? '',
    TotalCost: r.total_cost ?? '',
  }))
}

export function exportResultToXLSX(result: BBSResult, filename = 'bbs_result.xlsx') {
  const rows = buildRows(result)
  const ws = XLSX.utils.json_to_sheet(rows)

  const summary = [
    { Key: 'Total Steel Weight (kg)', Value: result.summary.total_steel_weight_kg },
    { Key: 'Total Bars', Value: result.summary.total_bars },
    { Key: 'Grand Total Length (m)', Value: result.summary.grand_total_length_m },
    { Key: 'Total Cost', Value: result.summary.total_cost ?? '' },
    { Key: 'Project', Value: result.project },
  ]
  const wsSummary = XLSX.utils.json_to_sheet(summary)

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'BBS')
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')
  XLSX.writeFile(wb, filename)
}

export function exportResultToCSV(result: BBSResult, filename = 'bbs_result.csv') {
  const header = [
    'Member ID',
    'Bar Type',
    'Dia (mm)',
    'Qty',
    'Cut Length (m)',
    'Total Length (m)',
    'Unit Wt (kg/m)',
    'Total Wt (kg)',
    'Hook Details',
    'Lap (m)',
    'Total Cost',
  ]
  const rows = result.results.map((r) => [
    r.member_id,
    r.bar_type,
    r.bar_diameter_mm,
    r.num_bars,
    r.cutting_length_m,
    r.total_length_m,
    r.unit_weight_kg_per_m,
    r.total_weight_kg,
    r.hook_details ?? '',
    r.lap_length_m ?? '',
    r.total_cost ?? '',
  ])
  const csv = [header, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportResultToGoogleSheets(result: BBSResult) {
  exportResultToCSV(result)
  window.open('https://sheets.new', '_blank')
}
