'use client'

import { useMemo, useRef, useState } from 'react'
import { Download, Eye, Image as ImageIcon, Plus, Trash2, Printer } from 'lucide-react'
import jsPDF from 'jspdf'

type CvData = {
  name: string
  title: string
  phone: string
  email: string
  address: string
  summary: string
  skills: string
  education: string
  experience: string
  projects: string
  awards: string
  references: string
}

function ElegantPreview({ data, showSections, photo }: { data: Parsed; showSections: any; photo?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900" style={{ fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }}>
      <div className="mb-3 flex items-start gap-4">
        {photo && <img src={photo} alt="Profile" className="h-16 w-16 rounded object-cover" />}
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">{data.name || 'Your Name'}</h2>
          <div className="text-sm text-slate-600 dark:text-slate-300">{data.title}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{[data.email, data.phone, data.address].filter(Boolean).join(' • ')}</div>
        </div>
      </div>
      {showSections.summary && data.summary && (<p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{data.summary}</p>)}
      {showSections.skills && (<>{sectionTitle('Skills')}<div className="mt-1 text-sm">{data.skillsList.join(', ')}</div></>)}
      {showSections.education && data.eduItems?.length > 0 && (<>{sectionTitle('Education')}<div className="mt-1 space-y-2 text-sm">{data.eduItems.map((e: EducationItem, i: number) => (<div key={i}><div className="font-medium">{e.institution} — {e.degree}</div><div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>{e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}</div>))}</div></>)}
      {showSections.experience && data.expItems?.length > 0 && (<>{sectionTitle('Experience')}<div className="mt-1 space-y-2 text-sm">{data.expItems.map((e: ExperienceItem, i: number) => (<div key={i}><div className="font-medium">{e.role} — {e.company}</div><div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>{e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}</div>))}</div></>)}
      {showSections.projects && data.projItems?.length > 0 && (<>{sectionTitle('Projects')}<div className="mt-1 space-y-2 text-sm">{data.projItems.map((p: ProjectItem, i: number) => (<div key={i}><div className="font-medium">{p.title}{p.role ? ` — ${p.role}` : ''}</div><div className="text-xs text-slate-500">{p.date}</div>{p.description && <div className="mt-1 whitespace-pre-wrap">{p.description}</div>}</div>))}</div></>)}
      {showSections.awards && !!data.awardList.length && (<>{sectionTitle('Awards')}<ul className="mt-1 list-disc pl-5 text-sm">{data.awardList.map((e, i) => (<li key={i}>{e}</li>))}</ul></>)}
      {showSections.references && !!data.refList.length && (<>{sectionTitle('References')}<ul className="mt-1 list-disc pl-5 text-sm">{data.refList.map((e, i) => (<li key={i}>{e}</li>))}</ul></>)}
    </div>
  )
}

function BoldPreview({ data, showSections, photo }: { data: Parsed; showSections: any; photo?: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-white p-6 shadow dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-3 border-b-4 border-slate-800 pb-2">
        {photo && <img src={photo} alt="Profile" className="h-14 w-14 rounded-full object-cover" />}
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-wide">{data.name || 'Your Name'}</h2>
          <div className="text-sm text-slate-600 dark:text-slate-300">{data.title}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{[data.email, data.phone].filter(Boolean).join(' • ')}</div>
        </div>
      </div>
      {showSections.summary && data.summary && (<p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{data.summary}</p>)}
      {showSections.skills && (<>{sectionTitle('Skills')}<ul className="mt-1 flex flex-wrap gap-2 text-xs">{data.skillsList.map((s, i) => (<li key={i} className="rounded bg-slate-200 px-2 py-1 dark:bg-slate-700">{s}</li>))}</ul></>)}
      {showSections.education && data.eduItems?.length > 0 && (<>{sectionTitle('Education')}<div className="mt-1 space-y-2 text-sm">{data.eduItems.map((e: EducationItem, i: number) => (<div key={i}><div className="font-semibold">{e.institution} — {e.degree}</div><div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>{e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}</div>))}</div></>)}
      {showSections.experience && data.expItems?.length > 0 && (<>{sectionTitle('Experience')}<div className="mt-1 space-y-2 text-sm">{data.expItems.map((e: ExperienceItem, i: number) => (<div key={i}><div className="font-semibold">{e.role} — {e.company}</div><div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>{e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}</div>))}</div></>)}
      {showSections.projects && data.projItems?.length > 0 && (<>{sectionTitle('Projects')}<div className="mt-1 space-y-2 text-sm">{data.projItems.map((p: ProjectItem, i: number) => (<div key={i}><div className="font-semibold">{p.title}{p.role ? ` — ${p.role}` : ''}</div><div className="text-xs text-slate-500">{p.date}</div>{p.description && <div className="mt-1 whitespace-pre-wrap">{p.description}</div>}</div>))}</div></>)}
      {showSections.awards && !!data.awardList.length && (<>{sectionTitle('Awards')}<ul className="mt-1 list-disc pl-5 text-sm">{data.awardList.map((e, i) => (<li key={i}>{e}</li>))}</ul></>)}
      {showSections.references && !!data.refList.length && (<>{sectionTitle('References')}<ul className="mt-1 list-disc pl-5 text-sm">{data.refList.map((e, i) => (<li key={i}>{e}</li>))}</ul></>)}
    </div>
  )
}

type TemplateKey = 'modern' | 'classic' | 'minimal' | 'elegant' | 'bold'

type EducationItem = {
  institution: string
  degree: string
  startDate: string
  endDate: string
  location: string
  description: string
}

type ExperienceItem = {
  role: string
  company: string
  startDate: string
  endDate: string
  location: string
  description: string
}

type ProjectItem = {
  title: string
  role: string
  date: string
  description: string
}

export default function CvMakerView() {
  const [data, setData] = useState<CvData>({
    name: '',
    title: 'Civil Engineer',
    phone: '+977',
    email: '',
    address: '',
    summary: '',
    skills: 'AutoCAD, Revit, Quantity Takeoff, Project Management',
    education: '',
    experience: '',
    projects: '',
    awards: '',
    references: '',
  })
  const [template, setTemplate] = useState<TemplateKey>('modern')
  const [autoFormat, setAutoFormat] = useState<boolean>(true)
  const [showSections, setShowSections] = useState({
    summary: true,
    skills: true,
    education: true,
    experience: true,
    projects: true,
    awards: true,
    references: true,
    photo: false,
  })
  const [photoDataUrl, setPhotoDataUrl] = useState<string>('')
  const [eduItems, setEduItems] = useState<EducationItem[]>([])
  const [expItems, setExpItems] = useState<ExperienceItem[]>([])
  const [projItems, setProjItems] = useState<ProjectItem[]>([])
  const parsed = useMemo(
    () => parseData(data, autoFormat, { eduItems, expItems, projItems }),
    [data, autoFormat, eduItems, expItems, projItems]
  )
  const previewRef = useRef<HTMLDivElement | null>(null)

  const handleChange = (key: keyof CvData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((prev) => ({ ...prev, [key]: e.target.value }))
  const downloadPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const photo = showSections.photo ? photoDataUrl : undefined
    if (template === 'modern') renderModern(doc, parsed, showSections, photo)
    else if (template === 'classic') renderClassic(doc, parsed, showSections, photo)
    else if (template === 'minimal') renderMinimal(doc, parsed, showSections, photo)
    else if (template === 'elegant') renderElegant(doc, parsed, showSections, photo)
    else renderBold(doc, parsed, showSections, photo)
    const file = data.name ? `${data.name.replace(/\s+/g, '_')}_CV.pdf` : 'cv.pdf'
    doc.save(file)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">
          CV / Resume Maker
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">
          Build a professional CV with multiple templates and export to PDF.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Template</label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                value={template}
                onChange={(e) => setTemplate(e.target.value as TemplateKey)}
              >
                <option value="modern">Modern Professional</option>
                <option value="classic">Classic Compact</option>
                <option value="minimal">Minimal Clean</option>
                <option value="elegant">Elegant Serif</option>
                <option value="bold">Bold Header</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-center justify-between rounded-xl bg-white/70 p-3 text-sm dark:bg-slate-800">
              <div>
                <div className="font-medium">Auto-clean and format inputs</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Fix spacing, capitalize sentences, normalize phone/email, and deduplicate skills.</div>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <span className="text-xs">Off</span>
                <input
                  type="checkbox"
                  className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-slate-300 outline-none transition-all checked:bg-primary"
                  checked={autoFormat}
                  onChange={(e) => setAutoFormat(e.target.checked)}
                />
                <span className="text-xs">On</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                value={data.name}
                onChange={handleChange('name')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Professional Title</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                value={data.title}
                onChange={handleChange('title')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                value={data.phone}
                onChange={handleChange('phone')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                value={data.email}
                onChange={handleChange('email')}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Address</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                value={data.address}
                onChange={handleChange('address')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Professional Summary</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                rows={4}
                value={data.summary}
                onChange={handleChange('summary')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Skills (comma separated)</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                value={data.skills}
                onChange={handleChange('skills')}
              />
            </div>

            <DynamicSectionToggle showSections={showSections} setShowSections={setShowSections} />

            <EducationEditor items={eduItems} setItems={setEduItems} />

            <ExperienceEditor items={expItems} setItems={setExpItems} />

            <ProjectsEditor items={projItems} setItems={setProjItems} />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Awards (one bullet per line)</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                rows={3}
                value={data.awards}
                onChange={handleChange('awards')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">References (one bullet per line)</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                rows={3}
                value={data.references}
                onChange={handleChange('references')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Profile Photo (optional)</label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => setPhotoDataUrl(reader.result as string)
                    reader.readAsDataURL(file)
                  }}
                />
                {photoDataUrl && (
                  <button
                    type="button"
                    onClick={() => setPhotoDataUrl('')}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1 text-sm"
                  >
                    <Trash2 className="h-4 w-4" /> Remove photo
                  </button>
                )}
              </div>
              <div className="mt-2 text-xs text-slate-500">Toggle photo visibility in the section toggles above.</div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={downloadPdf}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display text-white"
              aria-label="Download PDF"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
            <button
              onClick={() => printPreview(previewRef.current)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 font-display text-white dark:bg-slate-700"
              aria-label="Print"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700 dark:bg-slate-800" ref={previewRef}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Live Preview</h2>
            <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              <Eye className="h-3.5 w-3.5" /> Template: {template === 'modern' ? 'Modern Professional' : template === 'classic' ? 'Classic Compact' : template === 'minimal' ? 'Minimal Clean' : template === 'elegant' ? 'Elegant Serif' : 'Bold Header'}
            </div>
          </div>
          <PreviewCard template={template} data={parsed} showSections={showSections} photo={showSections.photo ? photoDataUrl : ''} />
        </div>
      </div>
    </div>
  )
}

// ------- Helpers -------
function parseList(input: string): string[] {
  return input
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

function sentenceCaseParagraph(text: string) {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) return ''
  // Split by sentence terminators while keeping them
  const parts = cleaned.match(/[^.!?]+[.!?]?/g) || [cleaned]
  const fixed = parts
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const cap = p.charAt(0).toUpperCase() + p.slice(1)
      return /[.!?]$/.test(cap) ? cap : cap + '.'
    })
  return fixed.join(' ')
}

function normalizePhone(phone: string) {
  const trimmed = phone.trim()
  const plus = trimmed.startsWith('+') ? '+' : ''
  const digits = trimmed.replace(/[^0-9]/g, '')
  return (plus + digits).replace(/\+{2,}/g, '+')
}

function normalizeEmail(email: string) {
  return email.trim().replace(/\s+/g, '').toLowerCase()
}

function uniqueList(arr: string[]) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const item of arr) {
    const key = item.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      out.push(item)
    }
  }
  return out
}

function formatBulletLines(lines: string[]) {
  return lines.map((l) => sentenceCaseParagraph(l))
}

function parseData(
  d: CvData,
  auto: boolean,
  extra?: { eduItems?: EducationItem[]; expItems?: ExperienceItem[]; projItems?: ProjectItem[] }
) {
  const base = {
    ...d,
    name: auto ? toTitleCase(d.name) : d.name,
    title: auto ? toTitleCase(d.title) : d.title,
    phone: auto ? normalizePhone(d.phone) : d.phone,
    email: auto ? normalizeEmail(d.email) : d.email,
    address: auto ? toTitleCase(d.address) : d.address,
    summary: auto ? sentenceCaseParagraph(d.summary) : d.summary,
  }
  let skillsList = parseList(d.skills).map((s) => (auto ? toTitleCase(s) : s))
  if (auto) skillsList = uniqueList(skillsList)

  let eduList = d.education.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  let expList = d.experience.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  let projList = d.projects.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  let awardList = d.awards.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  let refList = d.references.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)

  if (auto) {
    eduList = formatBulletLines(eduList)
    expList = formatBulletLines(expList)
    projList = formatBulletLines(projList)
    awardList = formatBulletLines(awardList)
    refList = formatBulletLines(refList)
  }

  // Structured items
  const fmtEdu = (extra?.eduItems || []).map((e) => ({
    institution: auto ? toTitleCase(e.institution) : e.institution,
    degree: auto ? toTitleCase(e.degree) : e.degree,
    startDate: e.startDate.trim(),
    endDate: e.endDate.trim(),
    location: auto ? toTitleCase(e.location) : e.location,
    description: auto ? sentenceCaseParagraph(e.description) : e.description,
  }))
  const fmtExp = (extra?.expItems || []).map((e) => ({
    role: auto ? toTitleCase(e.role) : e.role,
    company: auto ? toTitleCase(e.company) : e.company,
    startDate: e.startDate.trim(),
    endDate: e.endDate.trim(),
    location: auto ? toTitleCase(e.location) : e.location,
    description: auto ? sentenceCaseParagraph(e.description) : e.description,
  }))
  const fmtProj = (extra?.projItems || []).map((p) => ({
    title: auto ? toTitleCase(p.title) : p.title,
    role: auto ? toTitleCase(p.role) : p.role,
    date: p.date.trim(),
    description: auto ? sentenceCaseParagraph(p.description) : p.description,
  }))

  return {
    ...base,
    skillsList,
    eduList,
    expList,
    projList,
    awardList,
    refList,
    eduItems: fmtEdu,
    expItems: fmtExp,
    projItems: fmtProj,
  }
}
type Parsed = ReturnType<typeof parseData>

function sectionTitle(title: string) {
  return (
    <h3 className="mt-4 border-b border-slate-200 pb-1 font-display text-base font-semibold text-slate-800 dark:border-slate-600 dark:text-slate-100">
      {title}
    </h3>
  )
}

function formatDateRange(start: string, end: string) {
  const s = (start || '').trim()
  const e = (end || '').trim()
  if (s && e) return `${s} – ${e}`
  return s || e || ''
}

function PreviewCard({ template, data, showSections, photo }: { template: TemplateKey; data: Parsed; showSections: any; photo: string }) {
  if (template === 'classic') return <ClassicPreview data={data} showSections={showSections} photo={photo} />
  if (template === 'minimal') return <MinimalPreview data={data} showSections={showSections} photo={photo} />
  if (template === 'elegant') return <ElegantPreview data={data} showSections={showSections} photo={photo} />
  if (template === 'bold') return <BoldPreview data={data} showSections={showSections} photo={photo} />
  return <ModernPreview data={data} showSections={showSections} photo={photo} />
}

function HeaderBlock({ data, photo }: { data: Parsed; photo?: string }) {
  return (
    <div className="mb-2 flex items-start gap-4">
      {photo ? (
        <img src={photo} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700">
          <ImageIcon className="h-6 w-6" />
        </div>
      )}
      <div>
        <h2 className="font-display text-2xl font-bold">{data.name || 'Your Name'}</h2>
        <div className="text-sm text-slate-600 dark:text-slate-300">{data.title}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{[data.email, data.phone, data.address].filter(Boolean).join(' • ')}</div>
      </div>
    </div>
  )
}

function ModernPreview({ data, showSections, photo }: { data: Parsed; showSections: any; photo?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-900">
      <HeaderBlock data={data} photo={photo} />
      {showSections.summary && data.summary && (
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{data.summary}</p>
      )}
      {showSections.skills && (
        <>
          {sectionTitle('Skills')}
          <ul className="mt-1 flex flex-wrap gap-2 text-xs">
            {data.skillsList.map((s, i) => (
              <li key={i} className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-700">{s}</li>
            ))}
          </ul>
        </>
      )}
      {showSections.education && data.eduItems && data.eduItems.length > 0 && (
        <>
          {sectionTitle('Education')}
          <div className="mt-1 space-y-2 text-sm">
            {data.eduItems.map((e: EducationItem, i: number) => (
              <div key={i}>
                <div className="font-semibold">{e.institution} — {e.degree}</div>
                <div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>
                {e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}
              </div>
            ))}
          </div>
        </>
      )}
      {showSections.experience && data.expItems && data.expItems.length > 0 && (
        <>
          {sectionTitle('Experience')}
          <div className="mt-1 space-y-2 text-sm">
            {data.expItems.map((e: ExperienceItem, i: number) => (
              <div key={i}>
                <div className="font-semibold">{e.role} — {e.company}</div>
                <div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>
                {e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}
              </div>
            ))}
          </div>
        </>
      )}
      {showSections.projects && data.projItems && data.projItems.length > 0 && (
        <>
          {sectionTitle('Projects')}
          <div className="mt-1 space-y-2 text-sm">
            {data.projItems.map((p: ProjectItem, i: number) => (
              <div key={i}>
                <div className="font-semibold">{p.title}{p.role ? ` — ${p.role}` : ''}</div>
                <div className="text-xs text-slate-500">{p.date}</div>
                {p.description && <div className="mt-1 whitespace-pre-wrap">{p.description}</div>}
              </div>
            ))}
          </div>
        </>
      )}
      {showSections.awards && !!data.awardList.length && (
        <>
          {sectionTitle('Awards')}
          <ul className="mt-1 list-disc pl-5 text-sm">
            {data.awardList.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </>
      )}
      {showSections.references && !!data.refList.length && (
        <>
          {sectionTitle('References')}
          <ul className="mt-1 list-disc pl-5 text-sm">
            {data.refList.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function ClassicPreview({ data, showSections, photo }: { data: Parsed; showSections: any; photo?: string }) {
  return (
    <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-2 text-center">
        {photo && <img src={photo} alt="Profile" className="mx-auto mb-2 h-16 w-16 rounded-full object-cover" />}
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">{data.name || 'Your Name'}</h2>
        <div className="text-xs text-slate-600 dark:text-slate-300">{[data.title, data.email, data.phone].filter(Boolean).join(' • ')}</div>
      </div>
      {showSections.summary && data.summary && (
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{data.summary}</p>
      )}
      {showSections.education && data.eduItems && data.eduItems.length > 0 && (
        <>
          {sectionTitle('Education')}
          <div className="mt-1 space-y-2 text-sm">
            {data.eduItems.map((e, i) => (
              <div key={i}>
                <div className="font-semibold">{e.institution} — {e.degree}</div>
                <div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>
                {e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}
              </div>
            ))}
          </div>
        </>
      )}
      {showSections.experience && data.expItems && data.expItems.length > 0 && (
        <>
          {sectionTitle('Experience')}
          <div className="mt-1 space-y-2 text-sm">
            {data.expItems.map((e, i) => (
              <div key={i}>
                <div className="font-semibold">{e.role} — {e.company}</div>
                <div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>
                {e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}
              </div>
            ))}
          </div>
        </>
      )}
      {showSections.skills && !!data.skillsList.length && (
        <>
          {sectionTitle('Skills')}
          <div className="mt-1 text-sm">{data.skillsList.join(', ')}</div>
        </>
      )}
      {showSections.projects && data.projItems && data.projItems.length > 0 && (
        <>
          {sectionTitle('Projects')}
          <div className="mt-1 space-y-2 text-sm">
            {data.projItems.map((p, i) => (
              <div key={i}>
                <div className="font-semibold">{p.title}{p.role ? ` — ${p.role}` : ''}</div>
                <div className="text-xs text-slate-500">{p.date}</div>
                {p.description && <div className="mt-1 whitespace-pre-wrap">{p.description}</div>}
              </div>
            ))}
          </div>
        </>
      )}
      {showSections.awards && !!data.awardList.length && (
        <>
          {sectionTitle('Awards')}
          <ul className="mt-1 list-disc pl-5 text-sm">
            {data.awardList.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </>
      )}
      {showSections.references && !!data.refList.length && (
        <>
          {sectionTitle('References')}
          <ul className="mt-1 list-disc pl-5 text-sm">
            {data.refList.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function MinimalPreview({ data, showSections, photo }: { data: Parsed; showSections: any; photo?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-2">
        <div className="flex items-center gap-3">
          {photo && <img src={photo} alt="Profile" className="h-14 w-14 rounded object-cover" />}
          <div>
            <h2 className="font-display text-2xl font-semibold">{data.name || 'Your Name'}</h2>
            <div className="text-xs text-slate-500">{[data.title, data.email, data.phone].filter(Boolean).join(' • ')}</div>
          </div>
        </div>
      </div>
      {showSections.summary && data.summary && (
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{data.summary}</p>
      )}
      {showSections.skills && !!data.skillsList.length && (
        <div className="mt-3 text-sm">{data.skillsList.join(', ')}</div>
      )}
      {showSections.education && data.eduItems && data.eduItems.length > 0 && (
        <div className="mt-3 space-y-2 text-sm">
          {sectionTitle('Education')}
          {data.eduItems.map((e: EducationItem, i: number) => (
            <div key={i}>
              <div className="font-medium">{e.institution} — {e.degree}</div>
              <div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>
              {e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}
            </div>
          ))}
        </div>
      )}
      {showSections.experience && data.expItems && data.expItems.length > 0 && (
        <div className="mt-3 space-y-2 text-sm">
          {sectionTitle('Experience')}
          {data.expItems.map((e: ExperienceItem, i: number) => (
            <div key={i}>
              <div className="font-medium">{e.role} — {e.company}</div>
              <div className="text-xs text-slate-500">{[e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')}</div>
              {e.description && <div className="mt-1 whitespace-pre-wrap">{e.description}</div>}
            </div>
          ))}
        </div>
      )}
      {showSections.projects && data.projItems && data.projItems.length > 0 && (
        <div className="mt-3 space-y-2 text-sm">
          {sectionTitle('Projects')}
          {data.projItems.map((p: ProjectItem, i: number) => (
            <div key={i}>
              <div className="font-medium">{p.title}{p.role ? ` — ${p.role}` : ''}</div>
              <div className="text-xs text-slate-500">{p.date}</div>
              {p.description && <div className="mt-1 whitespace-pre-wrap">{p.description}</div>}
            </div>
          ))}
        </div>
      )}
      {showSections.awards && !!data.awardList.length && (
        <div className="mt-3">
          {sectionTitle('Awards')}
          <ul className="mt-1 list-disc pl-5 text-sm">
            {data.awardList.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      {showSections.references && !!data.refList.length && (
        <div className="mt-3">
          {sectionTitle('References')}
          <ul className="mt-1 list-disc pl-5 text-sm">
            {data.refList.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ------- PDF RENDERERS (jsPDF) -------
function addHeader(doc: jsPDF, name: string, title: string, contactLine: string, photo?: string) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text(name || 'Your Name', 40, 60)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(title || '', 40, 80)
  if (contactLine) doc.text(contactLine, 40, 98, { maxWidth: 515 })
  if (photo) {
    try {
      doc.addImage(photo, 'JPEG', 500, 40, 64, 64)
    } catch {}
  }
  doc.setDrawColor(40)
  doc.setLineWidth(0.5)
  doc.line(40, 110, 555, 110)
}

function addSectionTitle(doc: jsPDF, title: string, y: number) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(title.toUpperCase(), 40, y)
  doc.setFont('helvetica', 'normal')
  return y + 10
}

function addBullets(doc: jsPDF, items: string[], y: number) {
  let cur = y
  doc.setFontSize(11)
  items.forEach((it) => {
    if (!it) return
    const lines = doc.splitTextToSize(it, 500)
    doc.circle(46, cur - 3, 1.5, 'F')
    doc.text(lines, 55, cur)
    cur += 14 + (lines.length - 1) * 12
  })
  return cur
}

function renderModern(doc: jsPDF, d: Parsed, show: any, photo?: string) {
  const contact = [d.email, d.phone, d.address].filter(Boolean).join(' • ')
  addHeader(doc, d.name, d.title, contact, photo)
  let y = 130
  if (show.summary && d.summary) {
    y = addSectionTitle(doc, 'Professional Summary', y)
    const lines = doc.splitTextToSize(d.summary, 515)
    doc.text(lines, 40, (y += 14))
    y += (lines.length - 1) * 12 + 10
  }
  if (show.skills && d.skillsList.length) {
    y = addSectionTitle(doc, 'Skills', y)
    const lines = doc.splitTextToSize(d.skillsList.join(', '), 515)
    doc.text(lines, 40, (y += 14))
    y += (lines.length - 1) * 12 + 10
  }
  if (show.education && d.eduItems && d.eduItems.length) {
    y = addSectionTitle(doc, 'Education', y)
    d.eduItems.forEach((e) => {
      const header = `${e.institution} — ${e.degree}`.trim()
      doc.setFont('helvetica', 'bold')
      doc.text(header, 40, (y += 14))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 12))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
    y += 6
  }
  if (show.experience && d.expItems && d.expItems.length) {
    y = addSectionTitle(doc, 'Experience', y)
    d.expItems.forEach((e) => {
      const header = `${e.role} — ${e.company}`.trim()
      doc.setFont('helvetica', 'bold')
      doc.text(header, 40, (y += 14))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 12))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
    y += 6
  }
  if (show.projects && d.projItems && d.projItems.length) {
    y = addSectionTitle(doc, 'Projects', y)
    d.projItems.forEach((p) => {
      const header = p.role ? `${p.title} — ${p.role}` : p.title
      doc.setFont('helvetica', 'bold')
      doc.text(header, 40, (y += 14))
      doc.setFont('helvetica', 'normal')
      if (p.date) doc.text(p.date, 40, (y += 12))
      if (p.description) {
        const lines = doc.splitTextToSize(p.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
    y += 6
  }
  if (show.awards && d.awardList.length) {
    y = addSectionTitle(doc, 'Awards', y)
    y = addBullets(doc, d.awardList, (y += 14))
  }
  if (show.references && d.refList.length) {
    y = addSectionTitle(doc, 'References', y)
    y = addBullets(doc, d.refList, (y += 14))
  }
}

function renderMinimal(doc: jsPDF, d: Parsed, show: any, photo?: string) {
  // Render similar to classic but slightly smaller leading
  const contact = [d.title, d.email, d.phone].filter(Boolean).join(' • ')
  addHeader(doc, d.name, '', contact, photo)
  doc.setFontSize(11)
  let y = 130
  if (show.summary && d.summary) {
    y = addSectionTitle(doc, 'Summary', y)
    const lines = doc.splitTextToSize(d.summary, 515)
    doc.text(lines, 40, (y += 12))
    y += (lines.length - 1) * 10 + 8
  }
  if (show.education && d.eduItems?.length) {
    y = addSectionTitle(doc, 'Education', y)
    d.eduItems.forEach((e) => {
      doc.setFont('helvetica', 'bold')
      doc.text(`${e.institution} — ${e.degree}`.trim(), 40, (y += 12))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 10))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 10))
        y += (lines.length - 1) * 10
      }
    })
  }
  if (show.experience && d.expItems?.length) {
    y = addSectionTitle(doc, 'Experience', y)
    d.expItems.forEach((e) => {
      doc.setFont('helvetica', 'bold')
      doc.text(`${e.role} — ${e.company}`.trim(), 40, (y += 12))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 10))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 10))
        y += (lines.length - 1) * 10
      }
    })
  }
  if (show.skills && d.skillsList.length) {
    y = addSectionTitle(doc, 'Skills', y)
    const lines = doc.splitTextToSize(d.skillsList.join(', '), 515)
    doc.text(lines, 40, (y += 12))
    y += (lines.length - 1) * 10 + 8
  }
  if (show.projects && d.projItems?.length) {
    y = addSectionTitle(doc, 'Projects', y)
    d.projItems.forEach((p) => {
      doc.setFont('helvetica', 'bold')
      doc.text((p.role ? `${p.title} — ${p.role}` : p.title).trim(), 40, (y += 12))
      doc.setFont('helvetica', 'normal')
      if (p.date) doc.text(p.date, 40, (y += 10))
      if (p.description) {
        const lines = doc.splitTextToSize(p.description, 515)
        doc.text(lines, 40, (y += 10))
        y += (lines.length - 1) * 10
      }
    })
  }
  if (show.awards && d.awardList.length) {
    y = addSectionTitle(doc, 'Awards', y)
    y = addBullets(doc, d.awardList, (y += 12))
  }
  if (show.references && d.refList.length) {
    y = addSectionTitle(doc, 'References', y)
    y = addBullets(doc, d.refList, (y += 12))
  }
}

function renderElegant(doc: jsPDF, d: Parsed, show: any, photo?: string) {
  // Use Times for a serif look
  doc.setFont('times', 'normal')
  renderModern(doc, d, show, photo)
}

function renderBold(doc: jsPDF, d: Parsed, show: any, photo?: string) {
  // Bold headers and separators
  const contact = [d.title, d.email, d.phone].filter(Boolean).join(' • ')
  addHeader(doc, d.name.toUpperCase(), '', contact, photo)
  const strongTitle = (title: string, y: number) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text(title.toUpperCase(), 40, y)
    doc.setDrawColor(20)
    doc.setLineWidth(1.2)
    doc.line(40, y + 4, 555, y + 4)
    doc.setFont('helvetica', 'normal')
    return y + 14
  }
  let y = 130
  if (show.summary && d.summary) {
    y = strongTitle('Summary', y)
    const lines = doc.splitTextToSize(d.summary, 515)
    doc.text(lines, 40, (y += 16))
    y += (lines.length - 1) * 12 + 10
  }
  if (show.skills && d.skillsList.length) {
    y = strongTitle('Skills', y)
    const lines = doc.splitTextToSize(d.skillsList.join(', '), 515)
    doc.text(lines, 40, (y += 16))
    y += (lines.length - 1) * 12 + 10
  }
  if (show.education && d.eduItems?.length) {
    y = strongTitle('Education', y)
    d.eduItems.forEach((e) => {
      doc.setFont('helvetica', 'bold')
      doc.text(`${e.institution} — ${e.degree}`.trim(), 40, (y += 18))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 12))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
  }
  if (show.experience && d.expItems?.length) {
    y = strongTitle('Experience', y)
    d.expItems.forEach((e) => {
      doc.setFont('helvetica', 'bold')
      doc.text(`${e.role} — ${e.company}`.trim(), 40, (y += 18))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 12))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
  }
  if (show.projects && d.projItems?.length) {
    y = strongTitle('Projects', y)
    d.projItems.forEach((p) => {
      doc.setFont('helvetica', 'bold')
      doc.text((p.role ? `${p.title} — ${p.role}` : p.title).trim(), 40, (y += 18))
      doc.setFont('helvetica', 'normal')
      if (p.date) doc.text(p.date, 40, (y += 12))
      if (p.description) {
        const lines = doc.splitTextToSize(p.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
  }
  if (show.awards && d.awardList.length) {
    y = strongTitle('Awards', y)
    y = addBullets(doc, d.awardList, (y += 16))
  }
  if (show.references && d.refList.length) {
    y = strongTitle('References', y)
    y = addBullets(doc, d.refList, (y += 16))
  }
}

function renderClassic(doc: jsPDF, d: Parsed, show: any, photo?: string) {
  const contact = [d.title, d.email, d.phone].filter(Boolean).join(' • ')
  addHeader(doc, d.name, '', contact, photo)
  let y = 130
  if (show.summary && d.summary) {
    y = addSectionTitle(doc, 'Summary', y)
    const lines = doc.splitTextToSize(d.summary, 515)
    doc.text(lines, 40, (y += 14))
    y += (lines.length - 1) * 12 + 10
  }
  if (show.education && d.eduItems && d.eduItems.length) {
    y = addSectionTitle(doc, 'Education', y)
    d.eduItems.forEach((e) => {
      const header = `${e.institution} — ${e.degree}`.trim()
      doc.setFont('helvetica', 'bold')
      doc.text(header, 40, (y += 14))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 12))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
    y += 6
  }
  if (d.expItems && d.expItems.length) {
    y = addSectionTitle(doc, 'Experience', y)
    d.expItems.forEach((e) => {
      const header = `${e.role} — ${e.company}`.trim()
      doc.setFont('helvetica', 'bold')
      doc.text(header, 40, (y += 14))
      doc.setFont('helvetica', 'normal')
      const meta = [e.location, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(' • ')
      if (meta) doc.text(meta, 40, (y += 12))
      if (e.description) {
        const lines = doc.splitTextToSize(e.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
    y += 6
  }
  if (show.skills && d.skillsList.length) {
    y = addSectionTitle(doc, 'Skills', y)
    const lines = doc.splitTextToSize(d.skillsList.join(', '), 515)
    doc.text(lines, 40, (y += 14))
    y += (lines.length - 1) * 12 + 10
  }
  if (show.projects && d.projItems && d.projItems.length) {
    y = addSectionTitle(doc, 'Projects', y)
    d.projItems.forEach((p) => {
      const header = p.role ? `${p.title} — ${p.role}` : p.title
      doc.setFont('helvetica', 'bold')
      doc.text(header, 40, (y += 14))
      doc.setFont('helvetica', 'normal')
      if (p.date) doc.text(p.date, 40, (y += 12))
      if (p.description) {
        const lines = doc.splitTextToSize(p.description, 515)
        doc.text(lines, 40, (y += 12))
        y += (lines.length - 1) * 12
      }
    })
    y += 6
  }
  if (d.awardList.length) {
    y = addSectionTitle(doc, 'Awards', y)
    y = addBullets(doc, d.awardList, (y += 14))
  }
  if (d.refList.length) {
    y = addSectionTitle(doc, 'References', y)
    y = addBullets(doc, d.refList, (y += 14))
  }
}

// ------- Editors & Toggles -------
function DynamicSectionToggle({ showSections, setShowSections }: { showSections: any; setShowSections: React.Dispatch<React.SetStateAction<any>> }) {
  const row = 'flex items-center justify-between rounded-xl bg-white/70 p-3 text-sm dark:bg-slate-800'
  const Toggle = ({ keyName, label }: { keyName: keyof typeof showSections; label: string }) => (
    <label className={row}>
      <span>{label}</span>
      <input
        type="checkbox"
        className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-slate-300 outline-none transition-all checked:bg-primary"
        checked={!!showSections[keyName]}
        onChange={(e) => setShowSections((s: any) => ({ ...s, [keyName]: e.target.checked }))}
      />
    </label>
  )
  return (
    <div className="md:col-span-2 grid gap-3">
      <div className="text-sm font-medium">Sections</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Toggle keyName={'summary'} label="Summary" />
        <Toggle keyName={'skills'} label="Skills" />
        <Toggle keyName={'education'} label="Education" />
        <Toggle keyName={'experience'} label="Experience" />
        <Toggle keyName={'projects'} label="Projects" />
        <Toggle keyName={'awards'} label="Awards" />
        <Toggle keyName={'references'} label="References" />
        <Toggle keyName={'photo'} label="Profile Photo" />
      </div>
    </div>
  )
}

function EducationEditor({ items, setItems }: { items: EducationItem[]; setItems: React.Dispatch<React.SetStateAction<EducationItem[]>> }) {
  const add = () => setItems((arr) => [...arr, { institution: '', degree: '', startDate: '', endDate: '', location: '', description: '' }])
  const del = (i: number) => setItems((arr) => arr.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<EducationItem>) => setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  return (
    <div className="md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium">Education</label>
        <button type="button" onClick={add} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs">
          <Plus className="h-4 w-4" /> Add education
        </button>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-slate-200/60 p-3 dark:border-slate-700">
            <div className="grid gap-2 sm:grid-cols-2">
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Institution" value={it.institution} onChange={(e) => update(i, { institution: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Degree" value={it.degree} onChange={(e) => update(i, { degree: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Start (e.g., 2018)" value={it.startDate} onChange={(e) => update(i, { startDate: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="End (e.g., 2023 or Present)" value={it.endDate} onChange={(e) => update(i, { endDate: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Location" value={it.location} onChange={(e) => update(i, { location: e.target.value })} />
              <textarea className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Description" rows={2} value={it.description} onChange={(e) => update(i, { description: e.target.value })} />
            </div>
            <div className="mt-2 text-right">
              <button type="button" onClick={() => del(i)} className="inline-flex items-center gap-1 rounded-lg border border-rose-300 px-2 py-1 text-xs text-rose-700">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExperienceEditor({ items, setItems }: { items: ExperienceItem[]; setItems: React.Dispatch<React.SetStateAction<ExperienceItem[]>> }) {
  const add = () => setItems((arr) => [...arr, { role: '', company: '', startDate: '', endDate: '', location: '', description: '' }])
  const del = (i: number) => setItems((arr) => arr.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<ExperienceItem>) => setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  return (
    <div className="md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium">Experience</label>
        <button type="button" onClick={add} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs">
          <Plus className="h-4 w-4" /> Add experience
        </button>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-slate-200/60 p-3 dark:border-slate-700">
            <div className="grid gap-2 sm:grid-cols-2">
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Role" value={it.role} onChange={(e) => update(i, { role: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Company" value={it.company} onChange={(e) => update(i, { company: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Start (e.g., Aug 2023)" value={it.startDate} onChange={(e) => update(i, { startDate: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="End (e.g., Present)" value={it.endDate} onChange={(e) => update(i, { endDate: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Location" value={it.location} onChange={(e) => update(i, { location: e.target.value })} />
              <textarea className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Description" rows={2} value={it.description} onChange={(e) => update(i, { description: e.target.value })} />
            </div>
            <div className="mt-2 text-right">
              <button type="button" onClick={() => del(i)} className="inline-flex items-center gap-1 rounded-lg border border-rose-300 px-2 py-1 text-xs text-rose-700">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsEditor({ items, setItems }: { items: ProjectItem[]; setItems: React.Dispatch<React.SetStateAction<ProjectItem[]>> }) {
  const add = () => setItems((arr) => [...arr, { title: '', role: '', date: '', description: '' }])
  const del = (i: number) => setItems((arr) => arr.filter((_, idx) => idx !== i))
  const update = (i: number, patch: Partial<ProjectItem>) => setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  return (
    <div className="md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium">Projects</label>
        <button type="button" onClick={add} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs">
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-slate-200/60 p-3 dark:border-slate-700">
            <div className="grid gap-2 sm:grid-cols-2">
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Project title" value={it.title} onChange={(e) => update(i, { title: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Role" value={it.role} onChange={(e) => update(i, { role: e.target.value })} />
              <input className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Date" value={it.date} onChange={(e) => update(i, { date: e.target.value })} />
              <textarea className="rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" placeholder="Description" rows={2} value={it.description} onChange={(e) => update(i, { description: e.target.value })} />
            </div>
            <div className="mt-2 text-right">
              <button type="button" onClick={() => del(i)} className="inline-flex items-center gap-1 rounded-lg border border-rose-300 px-2 py-1 text-xs text-rose-700">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function printPreview(node: HTMLDivElement | null) {
  if (!node) return
  const win = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150')
  if (!win) return
  win.document.write('<html><head><title>Print CV</title>')
  win.document.write('<style>@page{size:A4;margin:20mm} html,body{height:100%} body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:0;padding:0;background:white;color:#0f172a} .page{padding:20mm} h1,h2,h3{margin:0 0 8px 0} ul{margin:0;padding-left:20px} img{max-width:100%;}</style>')
  win.document.write('</head><body>')
  win.document.write('<div class="page">' + node.innerHTML + '</div>')
  win.document.write('</body></html>')
  win.document.close()
  win.focus()
  win.print()
  win.close()
}

