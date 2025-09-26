"use client"

import { useState } from 'react'
import { Upload, FileSpreadsheet } from 'lucide-react'

export default function PdfExcelView() {
  const [pdfName, setPdfName] = useState<string | null>(null)
  const [xlsxName, setXlsxName] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">PDF ↔ Excel (.xlsx)</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Convert between PDF and Excel spreadsheets. Client-first parsing is planned; this page is a unified placeholder for both directions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            <h2 className="font-display text-lg font-semibold">PDF → Excel (.xlsx)</h2>
          </div>
          <div className="text-sm text-body/70 dark:text-body-dark/70 mb-4">Detect tables in PDF and export to XLSX.</div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/20 bg-white px-4 py-2 font-display text-sm dark:border-slate-700 dark:bg-slate-800">
            <Upload className="h-4 w-4" /> Choose PDF
            <input type="file" accept="application/pdf" className="hidden" onChange={(e)=> setPdfName(e.target.files?.[0]?.name ?? null)} />
          </label>
          {pdfName && <div className="mt-3 text-sm text-body/70">Selected: {pdfName}</div>}
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white opacity-50">Convert (coming soon)</div>
        </div>

        <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            <h2 className="font-display text-lg font-semibold">Excel (.xlsx) → PDF</h2>
          </div>
          <div className="text-sm text-body/70 dark:text-body-dark/70 mb-4">Export spreadsheets to PDF.</div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/20 bg-white px-4 py-2 font-display text-sm dark:border-slate-700 dark:bg-surface-dark">
            <Upload className="h-4 w-4" /> Choose .xlsx
            <input type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" className="hidden" onChange={(e)=> setXlsxName(e.target.files?.[0]?.name ?? null)} />
          </label>
          {xlsxName && <div className="mt-3 text-sm text-body/70">Selected: {xlsxName}</div>}
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white opacity-50">Convert (coming soon)</div>
        </div>
      </div>
    </div>
  )
}
