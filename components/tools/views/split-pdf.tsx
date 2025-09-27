"use client"

import { useState } from 'react'
import { Download } from 'lucide-react'

export default function SplitPdfView() {
  const [file, setFile] = useState<File | null>(null)
  const [ranges, setRanges] = useState<string>("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>("")

  const split = async () => {
    setError("")
    if (!file) {
      setError('Please choose a PDF file to split.')
      return
    }
    setBusy(true)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const bytes = new Uint8Array(await file.arrayBuffer())
      const src = await PDFDocument.load(bytes)
      const indices = src.getPageIndices()

      // parse ranges string: e.g., "1-3,5,7-8"
      const parts = ranges
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      if (parts.length === 0) {
        setError('Enter page ranges like 1-3,5,7-8')
        setBusy(false)
        return
      }

      const jobs: number[][] = []
      for (const p of parts) {
        if (/^\d+$/.test(p)) {
          const n = parseInt(p, 10) - 1
          if (indices.includes(n)) jobs.push([n])
        } else if (/^(\d+)-(\d+)$/.test(p)) {
          const [a, b] = p.split('-').map((x) => parseInt(x, 10) - 1)
          if (Number.isFinite(a) && Number.isFinite(b)) {
            const start = Math.min(a, b)
            const end = Math.max(a, b)
            jobs.push(indices.filter((i: number) => i >= start && i <= end))
          }
        }
      }

      if (jobs.length === 0) {
        setError('No valid page ranges parsed.')
        setBusy(false)
        return
      }

      let counter = 1
      for (const pagesList of jobs) {
        const outDoc = await PDFDocument.create()
        const copied = await outDoc.copyPages(src, pagesList)
        copied.forEach((p: any) => outDoc.addPage(p))
        const out = await outDoc.save()
        const blob = new Blob([out], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `split_part_${counter++}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (e: any) {
      if (e && /Cannot find module 'pdf-lib'/.test(String(e))) {
        setError("Missing dependency: pdf-lib. Please install it to enable splitting.")
      } else {
        setError(e?.message || 'Failed to split the PDF.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">Split PDF</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Separate a PDF into parts by specifying page ranges, e.g., 1-3,5,7-8.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
        <div className="grid gap-4">
          <label className="block">
            <span className="text-sm font-medium">Choose PDF</span>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Page ranges</span>
            <input value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="1-3,5,7-8" className="mt-2 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
          </label>

          {error && <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">{error}</div>}

          <div className="flex justify-end">
            <button onClick={split} disabled={busy || !file} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white disabled:opacity-50">
              <Download className="h-4 w-4" /> {busy ? 'Splitting…' : 'Split & Download'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
