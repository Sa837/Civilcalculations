"use client"

import { useParams } from 'next/navigation'
import { getToolMeta } from '../../../lib/registry/tools/registry'

export default function GenericToolView() {
  const params = useParams<{ slug: string }>()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const meta = getToolMeta(slug)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">
          {meta?.title || 'Tool'}
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">
          {meta?.description || 'This tool is coming soon.'}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 dark:border-slate-700 dark:bg-surface-dark">
        <div className="prose prose-sm dark:prose-invert">
          <p>
            This feature is being prepared. We are working to provide a secure, private, and fast in-browser experience. In the meantime, you can check back soon.
          </p>
          <ul>
            <li>No file is uploaded to a server during preview.</li>
            <li>Final implementation will support drag-and-drop, reordering, and high-quality exports.</li>
            <li>Consistent UI with the rest of the Tools section.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
