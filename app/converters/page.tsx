"use client"
import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { converters } from '../../lib/registry/converters'

export default function ConvertersIndex() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string>('All')
  const index = useMemo(() => new Fuse(converters.map(c => {
    // Support both grouped and flat converters for search
    const units = 'groups' in c && Array.isArray((c as any).groups)
      ? (c as any).groups.flatMap((g: any) => g.units)
      : (c as any).units ?? [];
    return {
      ...c,
      unitNames: units.map((u: any) => `${u.name} ${u.symbol}`)
    }
  }), { keys: ['title','category','unitNames'], threshold: 0.35 }), [])
  const categories = ['All', ...Array.from(new Set(converters.map(c => c.category)))]

  let list = converters
  if (filter !== 'All') list = list.filter(c => c.category === filter)
  if (query.trim()) {
    list = index.search(query).map(r => r.item)
    if (filter !== 'All') list = list.filter(c => c.category === filter)
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Unit Converters</h1>
        <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">
          Professional unit conversion tools for civil engineering. 
          Convert between metric and imperial units with precision.
        </p>
      </div>
      
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={`rounded-xl border-2 px-5 py-2.5 font-display text-sm font-medium transition-all ${
              filter===cat 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-slate-300 text-body hover:border-primary hover:text-primary dark:border-slate-600 dark:text-body-dark dark:hover:border-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="mb-8">
        <input 
          value={query} 
          onChange={(e)=>setQuery(e.target.value)} 
          placeholder="Search units, categories, titles…" 
          className="w-full rounded-2xl border-2 border-slate-300/20 bg-surface px-6 py-4 font-sans text-lg placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-slate-700/20 dark:bg-surface-dark dark:placeholder:text-body-dark/50 dark:focus:border-primary dark:focus:ring-primary/20" 
        />
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(item => (
          <Link 
            key={item.slug} 
            href={`/converters/${item.slug}`} 
            className="group rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-heading dark:text-heading-dark group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20">
                {item.category}
              </span>
            </div>
            <p className="font-sans text-body/80 dark:text-body-dark/80">
              {/* Show up to 3 units from first group or from flat units */}
              {('groups' in item && Array.isArray((item as any).groups)
                ? (item as any).groups[0]?.units.slice(0,3)
                : (item as any).units?.slice(0,3) || []
              ).map((u: any) => u.symbol).join(' · ')}
            </p>
          </Link>
        ))}
        {list.length === 0 && (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-300/20 p-12 text-center dark:border-slate-700/20">
            <p className="font-sans text-lg text-body/60 dark:text-body-dark/60">No results found.</p>
            <p className="mt-2 font-sans text-body/40 dark:text-body-dark/40">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </main>
  )
}


