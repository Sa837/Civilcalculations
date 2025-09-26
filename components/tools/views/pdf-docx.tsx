"use client"

import { useState } from 'react'
import { Upload, FileType, FileText } from 'lucide-react'

export default function PdfDocxView() {
  const [pdfName, setPdfName] = useState<string | null>(null)
  const [docxName, setDocxName] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">PDF ↔ DOCX</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Convert between PDF and Word (DOCX). Client-first parsing is planned; this page is a unified placeholder for both directions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center gap-2">
            <FileType className="h-5 w-5" />
            <h2 className="font-display text-lg font-semibold">PDF → DOCX</h2>
          </div>
          <div className="text-sm text-body/70 dark:text-body-dark/70 mb-4">Extract text and export to a DOCX document.</div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/20 bg-white px-4 py-2 font-display text-sm dark:border-slate-700 dark:bg-surface-dark">
            <Upload className="h-4 w-4" /> Choose PDF
            <input type="file" accept="application/pdf" className="hidden" onChange={(e)=> setPdfName(e.target.files?.[0]?.name ?? null)} />
          </label>
          {pdfName && <div className="mt-3 text-sm text-body/70">Selected: {pdfName}</div>}
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white opacity-50">Convert (coming soon)</div>
        </div>

        <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h2 className="font-display text-lg font-semibold">DOCX → PDF</h2>
          </div>
          <div className="text-sm text-body/70 dark:text-body-dark/70 mb-4">Export Word documents to PDF.</div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/20 bg-white px-4 py-2 font-display text-sm dark:border-slate-700 dark:bg-surface-dark">
            <Upload className="h-4 w-4" /> Choose DOCX
            <input type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={(e)=> setDocxName(e.target.files?.[0]?.name ?? null)} />
          </label>
          {docxName && <div className="mt-3 text-sm text-body/70">Selected: {docxName}</div>}
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white opacity-50">Convert (coming soon)</div>
        </div>
      </div>
    </div>
  )
}
