"use client"

import { useState } from 'react'
import { Download, Files, Plus } from 'lucide-react'

export default function MergePdfView() {
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>("")

  const onAddFiles = (list: FileList | null) => {
    if (!list) return
    const arr = Array.from(list).filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
    setFiles((prev) => [...prev, ...arr])
  }

  const move = (idx: number, dir: number) => {
    setFiles((prev) => {
      const next = prev.slice()
      const ni = idx + dir
      if (ni < 0 || ni >= next.length) return prev
      const [it] = next.splice(idx, 1)
      next.splice(ni, 0, it)
      return next
    })
  }

  const remove = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx))

  const merge = async () => {
    setError("")
    if (files.length < 2) {
      setError('Add at least two PDF files to merge.')
      return
    }
    setBusy(true)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const merged = await PDFDocument.create()
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer())
        const src = await PDFDocument.load(bytes)
        const pages = await merged.copyPages(src, src.getPageIndices())
        pages.forEach((p: any) => merged.addPage(p))
      }
      const out = await merged.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'merged.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      if (e && /Cannot find module 'pdf-lib'/.test(String(e))) {
        setError("Missing dependency: pdf-lib. Please install it to enable merging.")
      } else {
        setError(e?.message || 'Failed to merge PDF files.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">Merge PDF</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Combine PDFs in the order you want. All processing happens in your browser.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="text-sm font-medium">Add PDF files</span>
            <input type="file" multiple accept="application/pdf" onChange={(e) => onAddFiles(e.target.files)} className="mt-2 block w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
          </label>

          {files.length > 0 ? (
            <ul className="space-y-2">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2">
                    <Files className="h-4 w-4" />
                    <span className="truncate max-w-[16rem]" title={f.name}>{i + 1}. {f.name}</span>
                    <span className="text-xs text-body/60 dark:text-body-dark/60">({Math.round(f.size/1024)} KB)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button disabled={i===0} onClick={() => move(i, -1)} className="rounded-lg border px-2 py-1 text-xs disabled:opacity-50">↑</button>
                    <button disabled={i===files.length-1} onClick={() => move(i, +1)} className="rounded-lg border px-2 py-1 text-xs disabled:opacity-50">↓</button>
                    <button onClick={() => remove(i)} className="rounded-lg border px-2 py-1 text-xs">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed p-6 text-center text-sm opacity-80">
              <Plus className="mx-auto mb-2 h-5 w-5" />
              Drag and drop PDFs or use the input above to add files.
            </div>
          )}

          {error && <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">{error}</div>}

          <div className="flex justify-end">
            <button onClick={merge} disabled={busy || files.length < 2} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white disabled:opacity-50">
              <Download className="h-4 w-4" /> {busy ? 'Merging…' : 'Merge & Download'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
