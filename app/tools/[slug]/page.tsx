"use client"

import { useMemo } from 'react'
import { notFound, useParams, useRouter } from 'next/navigation'
import { getToolComponent, getToolMeta } from '../../../lib/registry/tools/registry'

export default function ToolSlugPage() {
  const params = useParams<{ slug: string }>()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const meta = useMemo(() => getToolMeta(slug), [slug])
  const ToolComp: any = useMemo(() => getToolComponent(slug), [slug])
  const router = useRouter()

  if (!meta || !ToolComp) {
    // Unknown tool
    if (typeof window !== 'undefined') {
      router.replace('/tools')
      return null
    }
    notFound()
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push('/tools')}
          className="rounded-xl border border-slate-200/20 bg-surface px-4 py-2 font-display text-sm dark:border-slate-800/20 dark:bg-surface-dark"
        >
          ← Back to Tools
        </button>
        <div className="rounded-xl border border-slate-200/20 bg-surface px-4 py-2 text-sm dark:border-slate-800/20 dark:bg-surface-dark">
          {meta.title}
        </div>
      </div>
      <ToolComp />
    </main>
  )
}
