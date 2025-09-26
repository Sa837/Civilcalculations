"use client"

import { useState } from 'react'
import { Download } from 'lucide-react'

export default function CvMakerView() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [summary, setSummary] = useState('')
  const [skills, setSkills] = useState('AutoCAD, Revit, Quantity Takeoff')

  const downloadTxt = () => {
    const content = `Name: ${name}\nEmail: ${email}\nSummary: ${summary}\nSkills: ${skills}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cv.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">CV / Resume Maker</h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">Step-by-step builder with downloadable templates. Minimal placeholder implemented.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" value={name} onChange={(e)=> setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Professional Summary</label>
            <textarea className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" rows={4} value={summary} onChange={(e)=> setSummary(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Skills (comma separated)</label>
            <input className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" value={skills} onChange={(e)=> setSkills(e.target.value)} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={downloadTxt} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white">
            <Download className="h-4 w-4"/> Download (TXT placeholder)
          </button>
        </div>
      </div>
    </div>
  )
}
