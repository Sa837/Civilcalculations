"use client"

import { useState } from 'react'
import { Download, RotateCcw } from 'lucide-react'

export default function RotatePdfView() {
  const [file, setFile] = useState<File | null>(null)
  const [angle, setAngle] = useState<number>(90)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>("")

  const rotate = async () => {
    setError("")
    if (!file) {
      setError('Please choose a PDF to rotate.')
      return
    }
    setBusy(true)
    try {
      const { PDFDocument, degrees } = await import('pdf-lib')
      const bytes = new Uint8Array(await file.arrayBuffer())
      const doc = await PDFDocument.load(bytes)
      const deg = degrees(angle as any)
      doc.getPages().forEach((p) => {
        const current = p.getRotation().angle || 0
        p.setRotation(degrees((current + angle) % 360))
      })
      const out = await doc.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rotated_${angle}deg.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      if (e && /Cannot find module 'pdf-lib'/.test(String(e))) {
        setError("Missing dependency: pdf-lib. Please install it to enable rotation.")
      } else {
        setError(e?.message || 'Failed to rotate the PDF.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">Rotate PDF</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Rotate all pages by 90°, 180°, or 270°. Processing is private and in-browser.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
        <div className="grid gap-4">
          <label className="block">
            <span className="text-sm font-medium">Choose PDF</span>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Rotation</span>
            <select value={angle} onChange={(e) => setAngle(parseInt(e.target.value, 10))} className="mt-2 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <option value={90}>90° clockwise</option>
              <option value={180}>180°</option>
              <option value={270}>270° clockwise</option>
            </select>
          </label>

          {error && <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">{error}</div>}

          <div className="flex justify-end">
            <button onClick={rotate} disabled={busy || !file} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white disabled:opacity-50">
              <Download className="h-4 w-4" /> {busy ? 'Rotating…' : 'Rotate & Download'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
