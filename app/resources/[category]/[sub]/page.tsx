'use client'

import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { resources } from '../../../../lib/data/resources'

const AdSlot = dynamic(() => import('../../../../components/ads/AdSlot'), {
  ssr: false,
  loading: () => <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
})

interface SubPageProps {
  params: {
    category: string
    sub: string
  }
}

interface MCQOption {
  text: string
  correct: boolean
}

interface MCQItem {
  question: string
  options: MCQOption[]
  answer?: string
}

export default function SubPage({ params }: SubPageProps) {
  const { category, sub } = params

  const { resource, subItem } = useMemo(() => {
    const res = resources.find((r) => r.slug === category)
    const item = res?.subItems?.find((si) => si.url?.endsWith('/' + sub))
    return { resource: res, subItem: item }
  }, [category, sub])

  // State
  const [q, setQ] = useState('')
  const [jsonData, setJsonData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeChapter, setActiveChapter] = useState<number>(0)
  const [mounted, setMounted] = useState(false)
  const [userNotes, setUserNotes] = useState<Record<number, string>>({})
  const [mcqSelections, setMcqSelections] = useState<Record<string, number>>({})
  const [tableNotes, setTableNotes] = useState<Record<string, string>>({})
  const [collapsedMCQs, setCollapsedMCQs] = useState<Record<string, boolean>>({})

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  // Load notes and table notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`notes:${category}/${sub}`)
      if (stored) setUserNotes(JSON.parse(stored))
      const tableStored = localStorage.getItem(`tableNotes:${category}/${sub}`)
      if (tableStored) setTableNotes(JSON.parse(tableStored))
    } catch {}
  }, [category, sub])

  const saveNote = (chapterIdx: number, text: string) => {
    const updated = { ...userNotes, [chapterIdx]: text }
    setUserNotes(updated)
    try {
      localStorage.setItem(`notes:${category}/${sub}`, JSON.stringify(updated))
    } catch {}
  }

  const saveTableNote = (key: string, text: string) => {
    const updated = { ...tableNotes, [key]: text }
    setTableNotes(updated)
    try {
      localStorage.setItem(`tableNotes:${category}/${sub}`, JSON.stringify(updated))
    } catch {}
  }

  const toggleMCQSection = (key: string) => {
    setCollapsedMCQs({ ...collapsedMCQs, [key]: !collapsedMCQs[key] })
  }

  // Search filter
  const matchesSearch = (text: string) => {
    if (!q.trim()) return true
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
    const lower = text.toLowerCase()
    return tokens.every((t) => lower.includes(t))
  }

  // Minimal rich-text formatter: supports **bold**, *italic*, __underline__, and newlines
  const formatRichText = (raw: string) => {
    if (!raw) return ''
    // Escape HTML first
    const escaped = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')

    // Apply simple markup
    const withUnderline = escaped.replace(/__([^_]+)__/g, '<u>$1</u>')
    const withBold = withUnderline.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    const withItalic = withBold.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    // Optional inline code
    const withCode = withItalic.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Newlines to <br/>
    return withCode.replace(/\n/g, '<br/>')
  }

  // Filter chapters by search
  const filteredChapters = useMemo(() => {
    if (!jsonData || !q.trim())
      return jsonData?.sections?.filter((s: any) => s.type === 'chapter') || []
    const chapters = jsonData.sections?.filter((s: any) => s.type === 'chapter') || []
    return chapters.filter((ch: any) => {
      const chTitle = ch.title || ''
      const content = JSON.stringify(ch).toLowerCase()
      return matchesSearch(chTitle + ' ' + content)
    })
  }, [jsonData, q, matchesSearch])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load JSON
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!resource || !subItem) return
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/content/resources/${category}/${sub}.json`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        if (cancelled) return

        let normalizedData = data
        if ((!data.sections || data.sections.length === 0) && Array.isArray(data.modules)) {
          const overviewSections = []
          if (typeof data.courseDescription === 'string' && data.courseDescription.trim()) {
            overviewSections.push({
              type: 'notes',
              level: 3,
              title: 'Course Overview',
              content: data.courseDescription,
            })
          }

          normalizedData = {
            ...data,
            sections: [
              ...(overviewSections.length
                ? [
                    {
                      type: 'chapter',
                      level: 2,
                      title: data.courseTitle || 'Overview',
                      sections: overviewSections,
                    },
                  ]
                : []),
              ...data.modules.map((module: any) => ({
                type: 'chapter',
                level: 2,
                title: module.moduleTitle || `Module ${module.moduleNumber}`,
                sections: Array.isArray(module.topics)
                  ? module.topics.map((topic: any) => ({
                      type: 'notes',
                      level: 3,
                      title: topic.title,
                      content: topic.content,
                    }))
                  : [],
              })),
            ],
          }
        } else if ((!data.sections || data.sections.length === 0) && Array.isArray(data.phases)) {
          const overviewSections = []
          if (typeof data.courseDescription === 'string' && data.courseDescription.trim()) {
            overviewSections.push({
              type: 'notes',
              level: 3,
              title: 'Course Overview',
              content: data.courseDescription,
            })
          }

          normalizedData = {
            ...data,
            sections: [
              ...(overviewSections.length
                ? [
                    {
                      type: 'chapter',
                      level: 2,
                      title: data.courseTitle || 'Overview',
                      sections: overviewSections,
                    },
                  ]
                : []),
              ...data.phases.map((phase: any) => ({
                type: 'chapter',
                level: 2,
                title: phase.phaseTitle || `Phase ${phase.phaseNumber}`,
                sections: Array.isArray(phase.steps)
                  ? phase.steps.map((step: any) => ({
                      type: 'notes',
                      level: 3,
                      title: step.title || step.subtitle || `Step ${step.stepNumber}`,
                      content: [
                        step.subtitle ? `**${step.subtitle}**\n\n` : '',
                        step.why ? `**Why:** ${step.why}\n\n` : '',
                        Array.isArray(step.instructions)
                          ? step.instructions.map((ins: string) => `- ${ins}`).join('\n') + '\n\n'
                          : '',
                        Array.isArray(step.commands) && step.commands.length
                          ? `**Commands:** ${step.commands.join(', ')}\n\n`
                          : '',
                        step.note ? `**${step.note.label}:** ${step.note.text}` : '',
                      ]
                        .filter(Boolean)
                        .join(''),
                    }))
                  : [],
              })),
            ],
          }
        } else if ((!data.sections || data.sections.length === 0) && Array.isArray(data.categories)) {
          const overviewSections = []
          if (typeof data.description === 'string' && data.description.trim()) {
            overviewSections.push({
              type: 'notes',
              level: 3,
              title: 'Overview',
              content: data.description,
            })
          }

          normalizedData = {
            ...data,
            sections: [
              ...(overviewSections.length
                ? [
                    {
                      type: 'chapter',
                      level: 2,
                      title: data.title || 'Overview',
                      sections: overviewSections,
                    },
                  ]
                : []),
              ...data.categories.map((cat: any) => ({
                type: 'chapter',
                level: 2,
                title: cat.category || cat.id,
                sections: [
                  ...(cat.description ? [{
                    type: 'notes',
                    level: 3,
                    title: 'Description',
                    content: cat.description,
                  }] : []),
                  ...(Array.isArray(cat.shortcuts)
                    ? cat.shortcuts.map((shortcut: any) => ({
                        type: 'notes',
                        level: 3,
                        title: `${shortcut.key}: ${shortcut.name}`,
                        content: [
                          shortcut.description ? `${shortcut.description}\n\n` : '',
                          shortcut.howToUse ? `**How to use:** ${shortcut.howToUse}\n\n` : '',
                          shortcut.tip ? `**Tip:** ${shortcut.tip}` : '',
                        ].filter(Boolean).join(''),
                      }))
                    : []),
                ],
              })),
            ],
          }
        }

        setJsonData(normalizedData)
      } catch (e) {
        if (!cancelled) setError('No JSON content found for this topic.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [category, sub, resource, subItem])

  const handleDownloadPdf = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const content = filteredChapters
      .map((ch: any, chIdx: number) => {
        let html = `<div class="chapter-print"><h2>${ch.title}</h2>`
        ch.sections?.forEach((sec: any) => {
          if (sec.title) html += `<h3>${sec.title}</h3>`
          if (sec.type === 'table' && sec.table?.rows) {
            const header =
              sec.table.header?.map((h: string) => (h.toUpperCase() === 'EXTRA' ? 'NOTES' : h)) ||
              []
            html +=
              '<table><thead><tr>' +
              header.map((h: string) => `<th>${h}</th>`).join('') +
              '</tr></thead><tbody>'
            sec.table.rows.forEach((row: string[]) => {
              html += '<tr>' + row.map((c: string) => `<td>${c}</td>`).join('') + '</tr>'
            })
            html += '</tbody></table>'
          }
          if (sec.type === 'formulas' && sec.items) {
            html += '<ul class="formulas">'
            sec.items.forEach((f: any) => {
              html += `<li><strong>${f.name}:</strong> <code>${f.expr}</code></li>`
            })
            html += '</ul>'
          }
          if (sec.type === 'mcqs' && sec.items) {
            html += '<div class="mcqs"><ol>'
            sec.items.forEach((mcq: any, i: number) => {
              html += `<li><p>${mcq.question}</p><ul>`
              mcq.options?.slice(0, 4).forEach((opt: any, oi: number) => {
                const mark = opt.correct ? ' ✓' : ''
                html += `<li>${String.fromCharCode(65 + oi)}. ${opt.text}${mark}</li>`
              })
              html += '</ul></li>'
            })
            html += '</ol></div>'
          }
        })
        html += '</div>'
        return html
      })
      .join('')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${subItem?.title} - ${resource?.title}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: sans-serif; font-size: 10pt; line-height: 1.4; }
            @page { size: A4; margin: 25mm; }
            header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            header h1 { font-size: 18pt; color: #000; margin-bottom: 5px; }
            header p { font-size: 10pt; color: #000; }
            footer { position: fixed; bottom: 2px; width: 100%; text-align: center; font-size: 9pt; color: #666; border-top: 1px solid #ccc; padding-top: 5px; }
            .chapter-print { page-break-after: always; }
            h2 { font-size: 16pt; color: #1e40af; margin: 20px 0 10px; border-bottom: 2px solid #dbeafe; padding-bottom: 5px; }
            h3 { font-size: 13pt; color: #333; margin: 15px 0 8px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10pt; }
            th { background: #dbeafe; color: #1e40af; font-weight: bold; border: 1px solid #93c5fd; padding: 8px; text-align: left; }
            td { border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; }
            tbody tr:nth-child(even) { background: #f8fafc; }
            .formulas { list-style: none; margin: 10px 0; }
            .formulas li { padding: 5px 0; border-bottom: 1px solid #e2e8f0; }
            .formulas code { background: #f1f5f9; padding: 2px 5px; border-radius: 3px; font-family: 'Courier New', monospace; }
            .mcqs ol { margin-left: 20px; }
            .mcqs li { margin: 10px 0; }
            .mcqs ul { list-style: none; margin-left: 10px; }
            .mcqs ul li { padding: 3px 0; }
          </style>
        </head>
        <body>
          <header>
            <h1>${subItem?.title}</h1>
            <p>${resource?.title} | civilcalculation.com</p>
          </header>
          ${content}
          <footer>
            <p>© ${new Date().getFullYear()} PaveEngineeringConsultancy(civilcalculation.com) | Page <span class="pageNumber"></span></p>
          </footer>
          <script>
            window.onload = () => {
              window.print()
              setTimeout(() => window.close(), 500)
            }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const scrollToChapter = (idx: number) => {
    const element = document.getElementById(`chapter-${idx}`)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openChapter = (idx: number) => {
    setActiveChapter(idx)
    scrollToChapter(idx)
  }

  const toggleChapter = (idx: number) => {
    const nextIndex = activeChapter === idx ? -1 : idx
    setActiveChapter(nextIndex)
    if (nextIndex === idx) {
      scrollToChapter(idx)
    }
  }

  const handleMCQSelect = (chIdx: number, qIdx: number, optIdx: number) => {
    const key = `${chIdx}-${qIdx}`
    setMcqSelections({ ...mcqSelections, [key]: optIdx })
  }

  // Render components
  const renderTable = (table: any, chIdx: number, secIdx: number) => {
    if (!table?.rows) return null
    const header = table.header || []
    // Replace "EXTRA" with "NOTES" in header
    const displayHeader = header.map((h: string) => (h.toUpperCase() === 'EXTRA' ? 'NOTES' : h))
    const notesColIdx = header.findIndex((h: string) => h.toUpperCase() === 'EXTRA')

    return (
      <div className="card table-card">
        <table className="plain-table">
          {displayHeader.length > 0 && (
            <thead>
              <tr>
                {displayHeader.map((h: string, i: number) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((row: string[], ri: number) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  // If this is the notes column, make it editable
                  if (ci === notesColIdx && notesColIdx !== -1) {
                    const noteKey = `${chIdx}-${secIdx}-${ri}`
                    return (
                      <td key={ci} className="notes-cell">
                        <textarea
                          value={tableNotes[noteKey] || ''}
                          onChange={(e) => saveTableNote(noteKey, e.target.value)}
                          placeholder="Add notes..."
                          className="table-notes-input"
                        />
                      </td>
                    )
                  }
                  return <td key={ci} dangerouslySetInnerHTML={{ __html: formatRichText(cell) }} />
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderFormulas = (items: any[]) => {
    if (!items || items.length === 0) return null
    return (
      <div className="card formulas-card">
        <ul className="formula-list">
          {items.map((f, i) => (
            <li key={i}>
              {f.name && <strong>{f.name}:</strong>} <code>{f.expr}</code>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderMCQs = (items: any[], chIdx: number, secIdx: number, title: string) => {
    if (!items || items.length === 0) return null
    const collapseKey = `${chIdx}-${secIdx}-mcq`
    const isCollapsed = collapsedMCQs[collapseKey]

    return (
      <div className="card mcq-card">
        <button onClick={() => toggleMCQSection(collapseKey)} className="mcq-collapse-btn">
          <span className="mcq-collapse-title">{title || 'MCQs'}</span>
          <span className="mcq-collapse-icon">{isCollapsed ? '▶' : '▼'}</span>
        </button>

        {!isCollapsed && (
          <div className="mcq-content">
            {items.map((mcq, qIdx) => {
              const key = `${chIdx}-${qIdx}`
              const selected = mcqSelections[key]
              const options = mcq.options || []
              const hasAnswered = selected !== undefined

              return (
                <div key={qIdx} className="mcq-item">
                  <div
                    className="mcq-question"
                    dangerouslySetInnerHTML={{
                      __html: `${qIdx + 1}. ${formatRichText(mcq.question || '')}`,
                    }}
                  />
                  <div className="mcq-options">
                    {options.slice(0, 4).map((opt: any, optIdx: number) => {
                      const isSelected = selected === optIdx
                      const isCorrect = opt.correct
                      let className = 'mcq-option'

                      // Show correct answer in green after any selection
                      if (hasAnswered && isCorrect) {
                        className += ' show-correct'
                      }
                      // Show selected wrong answer in red
                      if (isSelected && !isCorrect) {
                        className += ' wrong'
                      }
                      // Highlight the selected correct answer
                      if (isSelected && isCorrect) {
                        className += ' correct'
                      }

                      return (
                        <button
                          key={optIdx}
                          className={className}
                          onClick={() => handleMCQSelect(chIdx, qIdx, optIdx)}
                          disabled={hasAnswered}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `${String.fromCharCode(65 + optIdx)}. ${formatRichText(opt.text || '')}`,
                            }}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 font-sans">
      {!resource || !subItem ? (
        <div className="text-center py-10">
          <h1 className="mb-4 text-3xl font-bold text-heading dark:text-heading-dark">
            Content Not Found
          </h1>
          <p className="mb-6 text-body/70 dark:text-body-dark/70">
            The requested section could not be found.
          </p>
          <Link
            href={`/resources/${category}` as any}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Back to {category}
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <Link
              href={`/resources/${category}` as any}
              className="mb-4 inline-block rounded-xl border border-slate-200/20 bg-surface px-4 py-2 font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-700"
            >
              ← Back
            </Link>

            <h1 className="text-3xl font-bold text-heading dark:text-heading-dark mb-2">
              {subItem.title}
            </h1>
            <p className="text-body/80 dark:text-body-dark/80 mb-4">{resource.title}</p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search chapters, formulas, MCQs..."
                className="flex-1 min-w-[250px] rounded-xl border-2 border-slate-300 bg-surface px-4 py-3 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-surface-dark dark:focus:border-primary"
              />
              <button
                onClick={handleDownloadPdf}
                className="no-print inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                📄 Download PDF
              </button>
            </div>
          </div>

          {mounted && <AdSlot position="inline" slotId="9285440299" className="my-4" />}

          <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
            <aside className="hidden lg:block">
              <div className="card toc-card sticky top-24">
                <div className="text-sm font-semibold text-heading dark:text-heading-dark mb-3">
                  Chapters
                </div>
                <nav>
                  <ul className="space-y-1">
                    {filteredChapters.map((ch: any, i: number) => (
                      <li key={i}>
                        <button
                          onClick={() => openChapter(i)}
                          className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                            activeChapter === i
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-body hover:bg-slate-100 dark:text-body-dark dark:hover:bg-slate-800'
                          }`}
                        >
                          {ch.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <article className="space-y-6">
              {loading ? (
                <p className="text-sm text-body/70">Loading content…</p>
              ) : error ? (
                <p className="text-sm text-red-600">{error}</p>
              ) : filteredChapters.length === 0 ? (
                <div className="card text-center py-8">
                  <p className="text-body/70">No chapters match your search.</p>
                </div>
              ) : (
                filteredChapters.map((chapter: any, chIdx: number) => (
                  <div id={`chapter-${chIdx}`} key={chIdx} className="chapter-section">
                    <button
                      onClick={() => chIdx > 0 && toggleChapter(chIdx)}
                      className={`w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all ${chIdx === 0 ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">
                        {chapter.title}
                      </h2>
                      {chIdx > 0 && (
                        <span className="text-2xl text-primary">
                          {activeChapter === chIdx ? '▼' : '▶'}
                        </span>
                      )}
                    </button>

                    {(chIdx === 0 || activeChapter === chIdx) && (
                      <div className="mt-4 space-y-4">
                        {chapter.sections?.map((sec: any, secIdx: number) => (
                          <div key={secIdx}>
                            {sec.title && sec.type !== 'mcqs' && (
                              <h3 className="text-lg font-semibold text-heading dark:text-heading-dark mb-3">
                                {sec.title}
                              </h3>
                            )}
                            {sec.type === 'table' && renderTable(sec.table, chIdx, secIdx)}
                            {sec.type === 'formulas' && renderFormulas(sec.items)}
                            {sec.type === 'mcqs' && renderMCQs(sec.items, chIdx, secIdx, sec.title)}
                            {sec.type === 'notes' && sec.content && (
                              <div
                                className="card"
                                dangerouslySetInnerHTML={{ __html: formatRichText(sec.content) }}
                              />
                            )}
                          </div>
                        ))}

                        <div className="card notes-card">
                          <label className="block text-sm font-semibold text-heading dark:text-heading-dark mb-2">
                            📝 Your Notes
                          </label>
                          <textarea
                            value={userNotes[chIdx] || ''}
                            onChange={(e) => saveNote(chIdx, e.target.value)}
                            placeholder="Write your personal notes here..."
                            className="w-full min-h-[100px] p-3 rounded-lg border border-slate-300 bg-surface text-body dark:border-slate-700 dark:bg-surface-dark dark:text-body-dark resize-y focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </article>
          </div>

          {mounted && <AdSlot position="inline" slotId="pu-sub-bottom" className="my-6" />}

          <style jsx>{`
            :global(.card) {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            :global(.dark .card) {
              background: #1e293b;
              border-color: #334155;
            }

            /* Rich text formatting styles */
            :global(.card strong) {
              font-weight: 700;
              color: #1e40af;
            }
            :global(.dark .card strong) {
              color: #60a5fa;
            }
            :global(.card em) {
              font-style: italic;
              color: #7c3aed;
            }
            :global(.dark .card em) {
              color: #a78bfa;
            }
            :global(.card u) {
              text-decoration: underline;
              text-decoration-color: #f59e0b;
              text-decoration-thickness: 2px;
            }
            :global(.card code) {
              background: #f1f5f9;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'Courier New', monospace;
              font-size: 0.9em;
              color: #dc2626;
            }
            :global(.dark .card code) {
              background: #0f172a;
              color: #fca5a5;
            }
            :global(.plain-table td strong) {
              font-weight: 700;
              color: #1e40af;
            }
            :global(.dark .plain-table td strong) {
              color: #60a5fa;
            }
            :global(.plain-table td em) {
              font-style: italic;
              color: #7c3aed;
            }
            :global(.dark .plain-table td em) {
              color: #a78bfa;
            }
            :global(.plain-table td u) {
              text-decoration: underline;
              text-decoration-color: #f59e0b;
              text-decoration-thickness: 2px;
            }
            :global(.plain-table td code) {
              background: #f1f5f9;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'Courier New', monospace;
              font-size: 0.9em;
              color: #dc2626;
            }
            :global(.dark .plain-table td code) {
              background: #0f172a;
              color: #fca5a5;
            }

            :global(.plain-table) {
              width: 100%;
              border-collapse: collapse;
              font-size: 0.95rem;
            }
            :global(.plain-table thead th) {
              background: #dbeafe;
              color: #1e40af;
              font-weight: 700;
              border: 1px solid #93c5fd;
              padding: 12px;
              text-align: left;
            }
            :global(.plain-table td) {
              border: 1px solid #cbd5e1;
              padding: 10px 12px;
              vertical-align: top;
            }
            :global(.plain-table tbody tr:nth-child(even)) {
              background: #f8fafc;
            }
            :global(.dark .plain-table thead th) {
              background: #1e3a8a;
              color: #dbeafe;
              border-color: #3b82f6;
            }
            :global(.dark .plain-table td) {
              border-color: #475569;
            }
            :global(.dark .plain-table tbody tr:nth-child(even)) {
              background: #0f172a;
            }

            :global(.formula-list) {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            :global(.formula-list li) {
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            :global(.formula-list li:last-child) {
              border-bottom: none;
            }
            :global(.formula-list code) {
              background: #f1f5f9;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'sans;
              font-size: 0.9em;
            }
            :global(.dark .formula-list code) {
              background: #0f172a;
            }

            :global(.mcq-item) {
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid #e2e8f0;
            }
            :global(.mcq-item:last-child) {
              border-bottom: none;
            }
            :global(.mcq-question) {
              font-weight: 600;
              margin-bottom: 12px;
              color: #0f172a;
            }
            :global(.dark .mcq-question) {
              color: #e2e8f0;
            }
            :global(.mcq-options) {
              display: grid;
              gap: 8px;
            }
            :global(.mcq-option) {
              padding: 12px 16px;
              border: 2px solid #e2e8f0;
              border-radius: 8px;
              background: #ffffff;
              text-align: left;
              cursor: pointer;
              transition: all 0.2s;
              font-size: 0.95rem;
            }
            :global(.mcq-option:hover:not(:disabled)) {
              border-color: #3b82f6;
              background: #eff6ff;
            }
            :global(.mcq-option:disabled) {
              cursor: not-allowed;
              opacity: 0.7;
            }
            :global(.mcq-option.correct) {
              border-color: #10b981;
              background: #d1fae5;
              color: #065f46;
              font-weight: 600;
            }
            :global(.mcq-option.show-correct) {
              border-color: #10b981;
              background: #d1fae5;
              color: #065f46;
              font-weight: 600;
            }
            :global(.mcq-option.wrong) {
              border-color: #ef4444;
              background: #fee2e2;
              color: #991b1b;
              font-weight: 600;
            }
            :global(.dark .mcq-option) {
              background: #0f172a;
              border-color: #334155;
              color: #e2e8f0;
            }
            :global(.dark .mcq-option:hover:not(:disabled)) {
              border-color: #3b82f6;
              background: #1e3a8a;
            }

            :global(.table-notes-input) {
              width: 100%;
              min-height: 60px;
              padding: 6px;
              border: 1px solid #cbd5e1;
              border-radius: 4px;
              font-size: 0.9rem;
              font-family: inherit;
              resize: vertical;
              background: #f8fafc;
            }
            :global(.table-notes-input:focus) {
              outline: none;
              border-color: #3b82f6;
              background: #ffffff;
            }
            :global(.dark .table-notes-input) {
              background: #0f172a;
              border-color: #475569;
              color: #e2e8f0;
            }
            :global(.notes-cell) {
              padding: 4px !important;
            }

            :global(.mcq-collapse-btn) {
              width: 100%;
              display: flex;
              align-items: center;
              justify-between;
              padding: 12px;
              background: #eff6ff;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              margin-bottom: 12px;
              transition: all 0.2s;
            }
            :global(.mcq-collapse-btn:hover) {
              background: #dbeafe;
            }
            :global(.mcq-collapse-title) {
              font-weight: 600;
              font-size: 1.05rem;
              color: #1e40af;
            }
            :global(.mcq-collapse-icon) {
              font-size: 1.2rem;
              color: #3b82f6;
            }
            :global(.dark .mcq-collapse-btn) {
              background: #1e3a8a;
            }
            :global(.dark .mcq-collapse-btn:hover) {
              background: #1e40af;
            }
            :global(.dark .mcq-collapse-title) {
              color: #dbeafe;
            }
            :global(.mcq-content) {
              padding-top: 8px;
            }

            @media print {
              :global(.no-print) { display: none !important; }
              :global(.plain-table thead) { display: table-header-group; }
              :global(.plain-table tr) { page-break-inside: avoid; }
              :global(.table-notes-input) { border: none; background: transparent; }
            }
          `}</style>
        </>
      )}
    </main>
  )
}
