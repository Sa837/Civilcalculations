"use client"

import { useCallback, useMemo, useRef, useState } from 'react'
import { Upload, Image as ImageIcon, Download, Trash2, SlidersHorizontal } from 'lucide-react'

export default function ImageCompressorView() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [outputUrl, setOutputUrl] = useState<string | null>(null)
  const [quality, setQuality] = useState<number>(0.7)
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg')
  const [processing, setProcessing] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f && f.type.startsWith('image/')) {
      setFile(f)
      const url = URL.createObjectURL(f)
      setPreviewUrl(url)
      setOutputUrl(null)
    }
  }, [])

  const onPick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f && f.type.startsWith('image/')) {
      setFile(f)
      const url = URL.createObjectURL(f)
      setPreviewUrl(url)
      setOutputUrl(null)
    }
  }, [])

  const compress = useCallback(async () => {
    if (!previewUrl) return
    setProcessing(true)
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const blobPromise: Promise<Blob | null> = new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b), format, format === 'image/png' ? undefined : quality),
        )
        blobPromise.then((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setOutputUrl(url)
          }
          setProcessing(false)
        })
      }
      img.src = previewUrl
      imgRef.current = img
    } catch (e) {
      console.error(e)
      setProcessing(false)
    }
  }, [previewUrl, quality, format])

  const reset = useCallback(() => {
    setFile(null)
    setPreviewUrl(null)
    setOutputUrl(null)
  }, [])

  const stats = useMemo(() => {
    const inputKB = file ? Math.round(file.size / 1024) : 0
    const approxKB = file && (format === 'image/jpeg' || format === 'image/webp')
      ? Math.max(1, Math.round((file.size / 1024) * (0.2 + 0.8 * quality)))
      : inputKB
    return { inputKB, approxKB }
  }, [file, quality, format])

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">Image Compressor</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Compress JPG/PNG/WebP locally in your browser with a quality slider and instant preview.</p>
      </div>

      <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="mb-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-surface p-10 text-center transition-colors hover:border-primary/50 dark:border-slate-700 dark:bg-surface-dark">
        <ImageIcon className="mb-3 h-10 w-10 text-body/50" />
        <p className="mb-2 font-display text-lg text-heading dark:text-heading-dark">Drag & drop an image here</p>
        <p className="mb-4 text-sm text-body/70 dark:text-body-dark/70">or click to choose a file</p>
        <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200/20 bg-white px-4 py-2 font-display text-sm dark:border-slate-700 dark:bg-slate-800">
          <Upload className="h-4 w-4" /> Choose File
          <input type="file" accept="image/*" className="hidden" onChange={onPick} />
        </label>
      </div>

      {file && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/20 bg-surface p-4 dark:border-slate-700 dark:bg-surface-dark">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Original</h2>
              <span className="text-sm text-body/70">{stats.inputKB} KB</span>
            </div>
            <div className="overflow-hidden rounded-xl">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="original" className="h-auto w-full" />
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/20 bg-surface p-4 dark:border-slate-700 dark:bg-surface-dark">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Compressed (preview)</h2>
              <span className="text-sm text-body/70">~{stats.approxKB} KB</span>
            </div>
            <div className="overflow-hidden rounded-xl min-h-40 flex items-center justify-center bg-white/30 dark:bg-black/20">
              {outputUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={outputUrl} alt="compressed" className="h-auto w-full" />
              ) : (
                <span className="text-sm text-body/60">Click Compress to preview</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200/20 bg-surface p-4 dark:border-slate-700 dark:bg-surface-dark">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-display text-sm">Quality</span>
            <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-48" disabled={!file} />
            <span className="text-sm text-body/70">{Math.round(quality * 100)}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-display text-sm">Format</span>
            <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="rounded-lg border border-slate-200/20 bg-surface px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark" disabled={!file}>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WebP</option>
              <option value="image/png">PNG</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button onClick={compress} disabled={!file || processing} className="rounded-xl bg-primary px-4 py-2 font-display text-white disabled:opacity-50">
              {processing ? 'Compressing…' : 'Compress'}
            </button>
            <a href={outputUrl ?? undefined} download={file ? `${file.name.replace(/\.[^.]+$/, '')}-compressed.${format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg'}` : undefined} className={`inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark ${!outputUrl ? 'pointer-events-none opacity-50' : ''}`}>
              <Download className="h-4 w-4" /> Download
            </a>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-body/70 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Trash2 className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
