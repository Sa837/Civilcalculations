"use client"

import { useCallback, useState } from 'react'
import { Upload, FileImage, Download, FileUp } from 'lucide-react'

type RenderedPage = { url: string; index: number }

export default function PdfImageView() {
  const [rendered, setRendered] = useState<RenderedPage[]>([])
  const [rendering, setRendering] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const onPickPdf = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setRendering(true)
    setRendered([])
    const pdfjs = await import('pdfjs-dist')
    // Use a module worker that Next will bundle, avoiding CDN fetch errors
    const worker = new Worker(new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url), { type: 'module' })
    // @ts-ignore - set workerPort is supported in pdfjs-dist
    pdfjs.GlobalWorkerOptions.workerPort = worker
    const data = await f.arrayBuffer()
    // @ts-ignore
    const doc = await pdfjs.getDocument({ data }).promise
    const pages: RenderedPage[] = []
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const viewport = page.getViewport({ scale: 1.5 })
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height
      await page.render({ canvasContext: ctx as any, viewport }).promise
      const url = canvas.toDataURL('image/jpeg', 0.92)
      pages.push({ url, index: i })
    }
    setRendered(pages)
    setRendering(false)
  }, [])

  const onPickImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sel = Array.from(e.target.files || [])
    const imgs = sel.filter((f) => f.type.startsWith('image/'))
    setFiles(imgs)
    setPdfUrl(null)
  }, [])

  const buildPdf = useCallback(async () => {
    if (files.length === 0) return
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ unit: 'pt', compress: true })
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.readAsDataURL(f)
      })
      const img = new Image()
      await new Promise<void>((resolve) => {
        img.onload = () => resolve()
        img.src = dataUrl
      })
      const pageW = 595,
        pageH = 842
      const ratio = Math.min(pageW / img.width, pageH / img.height)
      const w = img.width * ratio
      const h = img.height * ratio
      const x = (pageW - w) / 2
      const y = (pageH - h) / 2
      if (i > 0) pdf.addPage()
      pdf.addImage(dataUrl, 'JPEG', x, y, w, h)
    }
    const blob = pdf.output('blob')
    const url = URL.createObjectURL(blob)
    setPdfUrl(url)
  }, [files])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">PDF ↔ Image (JPG/PNG)</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Convert between PDF and images. Both directions run locally in your browser.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            <h2 className="font-display text-lg font-semibold">PDF → Images</h2>
          </div>
          <div className="text-sm text-body/70 dark:text-body-dark/70 mb-4">Render PDF pages as images and download them.</div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/20 bg-white px-4 py-2 font-display text-sm dark:border-slate-700 dark:bg-slate-800">
            <Upload className="h-4 w-4" /> Choose PDF
            <input type="file" accept="application/pdf" className="hidden" onChange={onPickPdf} />
          </label>
          {rendering && <div className="mt-3 text-sm text-body/70">Rendering...</div>}
          {rendered.length > 0 && (
            <div className="mt-4 grid max-h-80 grid-cols-2 gap-3 overflow-auto pr-1">
              {rendered.map((p) => (
                <div key={p.index} className="rounded-lg border p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={`page-${p.index}`} className="w-full" />
                  <a href={p.url} download={`page-${p.index}.jpg`} className="mt-2 inline-block rounded-md border px-2 py-1 text-xs">
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center gap-2">
            <FileUp className="h-5 w-5" />
            <h2 className="font-display text-lg font-semibold">Images → PDF</h2>
          </div>
          <div className="text-sm text-body/70 dark:text-body-dark/70 mb-4">Combine images into a single PDF (A4 pages).</div>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/20 bg-white px-4 py-2 font-display text-sm dark:border-slate-700 dark:bg-slate-800">
            <Upload className="h-4 w-4" /> Choose Images
            <input type="file" accept="image/*" multiple className="hidden" onChange={onPickImages} />
          </label>
          {files.length > 0 && <div className="mt-3 text-sm text-body/70">Selected: {files.length} image(s)</div>}

          <div className="mt-4 flex items-center gap-3">
            <button onClick={buildPdf} disabled={files.length === 0} className="rounded-xl bg-primary px-4 py-2 font-display text-white disabled:opacity-50">
              Build PDF
            </button>
            {pdfUrl && (
              <a href={pdfUrl} download="images.pdf" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark">
                <Download className="h-4 w-4" /> Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
