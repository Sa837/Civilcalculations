import dynamic from 'next/dynamic'

export type ToolMeta = {
  id: string
  title: string
  description: string
  color: string
  // icon is referenced by the landing page, no need here for dynamic
}

export const toolsRegistry: ToolMeta[] = [
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress JPG/PNG/WebP with quality preview and size slider',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'pdf-excel',
    title: 'PDF ↔ Excel (.xlsx)',
    description: 'Convert between PDF and Excel (XLSX) formats',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'pdf-image',
    title: 'PDF ↔ Image (JPG/PNG)',
    description: 'Convert between PDF and images (JPG/PNG)',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'pdf-docx',
    title: 'PDF ↔ DOCX',
    description: 'Convert between PDF and Word (DOCX) formats',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'dwg-to-pdf',
    title: 'DWG → PDF (Soon)',
    description: 'Placeholder for CAD drawings to PDF',
    color: 'from-gray-500 to-slate-500',
  },
  {
    id: 'cv-maker',
    title: 'CV / Resume Maker',
    description: 'Generate professional CV in PDF/Word with templates',
    color: 'from-cyan-600 to-blue-500',
  },
  {
    id: 'plot-area-measure',
    title: 'Plot Area Measurement (Map)',
    description: 'Draw polygon on map and get area, perimeter with exports',
    color: 'from-green-600 to-emerald-500',
  },
]

export function getToolMeta(slug: string) {
  return toolsRegistry.find((t) => t.id === slug) || null
}

export function getToolComponent(slug: string) {
  switch (slug) {
    case 'image-compressor':
      return dynamic(() => import('../../../components/tools/views/image-compressor').then(m => m.default), { ssr: false })
    case 'pdf-excel':
      return dynamic(() => import('../../../components/tools/views/pdf-excel').then(m => m.default), { ssr: false })
    case 'pdf-image':
      return dynamic(() => import('../../../components/tools/views/pdf-image').then(m => m.default), { ssr: false })
    case 'pdf-docx':
      return dynamic(() => import('../../../components/tools/views/pdf-docx').then(m => m.default), { ssr: false })
    case 'cv-maker':
      return dynamic(() => import('../../../components/tools/views/cv-maker').then(m => m.default), { ssr: false })
    case 'plot-area-measure':
      return dynamic(() => import('../../../components/tools/views/plot-area-measure').then(m => m.default), { ssr: false })
    case 'dwg-to-pdf':
      return dynamic(() => import('../../../components/tools/views/dwg-to-pdf').then(m => m.default), { ssr: false })
    default:
      return null
  }
}
