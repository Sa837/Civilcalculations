'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Wrench,
  FileDown,
  Image as ImageIcon,
  FileSpreadsheet,
  FileImage,
  FileType,
  FileText,
  Map,
  FileUp,
  FileBox,
  Files,
  Search,
  Star,
  StarOff,
  ChevronDown,
} from 'lucide-react'
import { ToolCard } from '../../components/tools/tool-card'

export default function ToolsPage() {
  const [mounted, setMounted] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'File Converters' | 'Civil Tools'>('All')
  const [sortBy, setSortBy] = useState<'A-Z' | 'Z-A' | 'Favorite'>('A-Z')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const saved = localStorage.getItem('tool-favorites')
    if (saved) setFavorites(new Set(JSON.parse(saved)))
  }, [])
  useEffect(() => {
    localStorage.setItem('tool-favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  const groups = [
    {
      title: 'File Converters',
      icon: FileDown,
      color: 'from-indigo-500 to-cyan-500',
      items: [
        {
          id: 'image-compressor',
          title: 'Image Compressor',
          description: 'Compress JPG/PNG/WebP with quality preview and size slider',
          icon: ImageIcon,
          href: '/tools/image-compressor',
          color: 'from-blue-500 to-cyan-500',
          createdAt: '2025-01-01',
        },
        {
          id: 'pdf-excel',
          title: 'PDF ↔ Excel (.xlsx)',
          description: 'Convert between PDF and Excel (XLSX) formats',
          icon: FileSpreadsheet,
          href: '/tools/pdf-excel',
          color: 'from-emerald-500 to-teal-500',
          createdAt: '2025-01-02',
        },
        {
          id: 'pdf-image',
          title: 'PDF ↔ Image (JPG/PNG)',
          description: 'Convert between PDF and images (JPG/PNG)',
          icon: FileImage,
          href: '/tools/pdf-image',
          color: 'from-rose-500 to-pink-500',
          createdAt: '2025-01-03',
        },
        {
          id: 'pdf-docx',
          title: 'PDF ↔ DOCX',
          description: 'Convert between PDF and Word (DOCX) formats',
          icon: FileType,
          href: '/tools/pdf-docx',
          color: 'from-purple-500 to-violet-500',
          createdAt: '2025-01-04',
        },

        {
          id: 'dwg-to-pdf',
          title: 'DWG → PDF (Soon)',
          description: 'Placeholder for CAD drawings to PDF',
          icon: Files,
          href: '/tools/dwg-to-pdf',
          color: 'from-gray-500 to-slate-500',
          createdAt: '2025-01-05',
        },
      ],
    },
    {
      title: 'Civil Tools',
      icon: Wrench,
      color: 'from-blue-600 to-indigo-500',
      items: [
        {
          id: 'cv-maker',
          title: 'CV / Resume Maker',
          description: 'Generate professional CV in PDF/Word with templates',
          icon: FileText,
          href: '/tools/cv-maker',
          color: 'from-cyan-600 to-blue-500',
          createdAt: '2025-01-06',
        },
        {
          id: 'plot-area-measure',
          title: 'Plot Area Measurement (Map)',
          description: 'Draw polygon on map and get area, perimeter with exports',
          icon: Map,
          href: '/tools/plot-area-measure',
          color: 'from-green-600 to-emerald-500',
          createdAt: '2025-01-07',
        },
      ],
    },
  ]

  // Flatten tools for search/sort, with back-reference to group
  const flatTools = useMemo(() => {
    return groups.flatMap((g) => g.items.map((it) => ({ ...it, group: g.title })))
  }, [groups])

  const filteredTools = useMemo(() => {
    let items = flatTools
    // Category filter
    if (selectedCategory !== 'All') {
      items = items.filter((t) => t.group === selectedCategory)
    }
    // Search
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      items = items.filter((t) => `${t.id} ${t.title} ${t.description} ${t.group}`.toLowerCase().includes(q))
    }
    // Sort
    items = items.slice().sort((a: any, b: any) => {
      switch (sortBy) {
        case 'A-Z':
          return a.title.localeCompare(b.title)
        case 'Z-A':
          return b.title.localeCompare(a.title)
        case 'Favorite': {
          const aFav = favorites.has(a.id)
          const bFav = favorites.has(b.id)
          if (aFav && !bFav) return -1
          if (!aFav && bFav) return 1
          return a.title.localeCompare(b.title)
        }
      }
    }) as any
    return items
  }, [flatTools, selectedCategory, searchQuery, sortBy, favorites])

  const categoryCounts = useMemo(() => {
    return groups.reduce((acc, g) => {
      acc[g.title] = g.items.length
      return acc
    }, {} as Record<string, number>)
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  const faqs = [
    {
      q: 'Are my files uploaded to a server?',
      a: 'Most tools run entirely in your browser. For heavy conversions, we focus on client-first processing to preserve privacy.',
    },
    {
      q: 'Which formats are supported?',
      a: 'Images: JPG/PNG/WebP. Documents: PDF, DOCX, XLSX. Some conversions are in preview and may have limitations.',
    },
    {
      q: 'Can I download results?',
      a: 'Yes. All tools offer offline downloads (PDF/Excel/Image) and follow the same download button style across the app.',
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">
          Engineering Tools
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">
          Practical tools for civil engineers: file utilities, map-based area measurement, and more.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body/40 dark:text-body-dark/40" />
          <input
            type="text"
            placeholder="Search tools: PDF, Image, Excel, Map, CV..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/20 bg-surface px-12 py-4 font-sans text-body placeholder:text-body/40 shadow-card transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800/20 dark:bg-surface-dark dark:text-body-dark dark:placeholder:text-body-dark/40"
          />
        </div>

        {/* Category Tabs (All / File Converters / Civil Tools) */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['All', 'File Converters', 'Civil Tools'] as const).map((cat) => {
            const count = cat === 'All' ? flatTools.length : (categoryCounts[cat] || 0)
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`group flex items-center gap-2 rounded-xl border px-3 py-2 font-display font-medium transition-all whitespace-nowrap ${isActive ? 'border-primary bg-primary/10 text-primary shadow-soft' : 'border-slate-200/20 bg-surface text-heading hover:border-primary/50 hover:bg-primary/5 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-800/50'}`}
              >
                <span className="text-sm">{cat}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs flex-shrink-0 ${isActive ? 'bg-primary/20 text-primary' : 'bg-slate-200/60 text-body/60 dark:bg-slate-700/60 dark:text-body-dark/60'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-medium text-body/60 dark:text-body-dark/60">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none rounded-xl border border-slate-200/20 bg-surface px-4 py-2 pr-8 font-display font-medium text-heading transition-colors focus:border-primary/50 focus:outline-none dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark"
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Favorite">Favorite</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40 dark:text-body-dark/40" />
            </div>
          </div>
          <div className="text-sm text-body/60 dark:text-body-dark/60">
            {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.title} className="space-y-6">
            <div className="flex items-center gap-4">
              <div
                className={`h-8 w-8 rounded-full bg-gradient-to-r ${group.color} flex items-center justify-center`}
              >
                <group.icon className="h-4 w-4 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">
                {group.title}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items
                .filter((item) => selectedCategory === 'All' || selectedCategory === group.title)
                .filter((item) =>
                  searchQuery.trim()
                    ? `${item.id} ${item.title} ${item.description}`
                        .toLowerCase()
                        .includes(searchQuery.trim().toLowerCase())
                    : true,
                )
                .sort((a, b) => {
                  if (sortBy === 'A-Z') return a.title.localeCompare(b.title)
                  if (sortBy === 'Z-A') return b.title.localeCompare(a.title)
                  if (sortBy === 'Favorite') {
                    const aFav = favorites.has(a.id)
                    const bFav = favorites.has(b.id)
                    if (aFav && !bFav) return -1
                    if (!aFav && bFav) return 1
                    return a.title.localeCompare(b.title)
                  }
                  return 0
                })
                .map((item) => (
                <ToolCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  color={item.color}
                  Icon={item.icon}
                  isFavorite={favorites.has(item.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <h2 className="mb-6 text-center font-display text-3xl font-bold text-heading dark:text-heading-dark">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-3xl divide-y divide-slate-200/20 rounded-2xl border border-slate-200/20 bg-surface dark:divide-slate-800/20 dark:border-slate-800/20 dark:bg-surface-dark">
          {faqs.map((faq, idx) => (
            <details key={idx} className="p-6 group">
              <summary className="cursor-pointer list-none font-display text-lg font-semibold text-heading dark:text-heading-dark">
                {faq.q}
              </summary>
              <p className="mt-2 font-sans text-body/80 dark:text-body-dark/80">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  )
}
