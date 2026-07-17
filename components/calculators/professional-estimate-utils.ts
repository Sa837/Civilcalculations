export interface EstimateRow {
  label: string
  value: string
  unit?: string
}

export const buildEstimateText = (title: string, rows: EstimateRow[]) => {
  const header = `${title}\n${'='.repeat(title.length)}\n`
  const body = rows.map((row) => `${row.label}: ${row.value}${row.unit ? ` ${row.unit}` : ''}`).join('\n')
  return `${header}${body || 'No estimate data available.'}`
}

export const exportEstimateText = (title: string, rows: EstimateRow[]) => {
  if (typeof window === 'undefined') return
  const blob = new Blob([buildEstimateText(title, rows)], { type: 'text/plain;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'estimate'}.txt`
  link.click()
  window.URL.revokeObjectURL(url)
}

export const exportEstimatePdf = (title: string, rows: EstimateRow[]) => {
  if (typeof window === 'undefined') return
  const { jsPDF } = require('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'estimate'
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text(title, 40, 50)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  let y = 86
  rows.forEach((row) => {
    if (y > 760) {
      doc.addPage()
      y = 50
    }
    doc.text(`${row.label}: ${row.value}${row.unit ? ` ${row.unit}` : ''}`, 40, y)
    y += 18
  })
  doc.save(`${safeName}.pdf`)
}

export const exportEstimateXlsx = (title: string, rows: EstimateRow[]) => {
  if (typeof window === 'undefined') return
  const XLSX = require('xlsx')
  const worksheet = XLSX.utils.aoa_to_sheet([
    ['Item', 'Value', 'Unit'],
    ...rows.map((row) => [row.label, row.value, row.unit || '']),
  ])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimate')
  const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'estimate'
  XLSX.writeFile(workbook, `${safeName}.xlsx`)
}
