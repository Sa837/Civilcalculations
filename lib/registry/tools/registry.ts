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
  // PDF Suite (placeholders using generic view)
  { id: 'merge-pdf', title: 'Merge PDF', description: 'Combine PDFs in the order you want.', color: 'from-indigo-500 to-cyan-500' },
  { id: 'split-pdf', title: 'Split PDF', description: 'Separate one page or a set into independent PDFs.', color: 'from-indigo-500 to-cyan-500' },
  { id: 'compress-pdf', title: 'Compress PDF', description: 'Reduce file size while keeping quality.', color: 'from-indigo-500 to-cyan-500' },
  { id: 'pdf-to-ppt', title: 'PDF → PowerPoint', description: 'Convert PDF to PPT/PPTX slides.', color: 'from-amber-500 to-orange-500' },
  { id: 'word-to-pdf', title: 'Word → PDF', description: 'Convert DOC/DOCX to PDF.', color: 'from-purple-500 to-violet-500' },
  { id: 'ppt-to-pdf', title: 'PowerPoint → PDF', description: 'Convert PPT/PPTX to PDF.', color: 'from-amber-500 to-orange-500' },
  { id: 'excel-to-pdf', title: 'Excel → PDF', description: 'Convert XLS/XLSX to PDF.', color: 'from-emerald-500 to-teal-500' },
  { id: 'edit-pdf', title: 'Edit PDF', description: 'Add text, images, shapes, or annotations.', color: 'from-sky-500 to-blue-500' },
  { id: 'pdf-to-jpg', title: 'PDF → JPG', description: 'Convert each PDF page into JPG images.', color: 'from-rose-500 to-pink-500' },
  { id: 'jpg-to-pdf', title: 'JPG → PDF', description: 'Convert JPG images to PDF in seconds.', color: 'from-rose-500 to-pink-500' },
  { id: 'sign-pdf', title: 'Sign PDF', description: 'Sign yourself or request electronic signatures.', color: 'from-cyan-600 to-blue-500' },
  { id: 'watermark-pdf', title: 'Watermark PDF', description: 'Stamp image or text over your PDF.', color: 'from-slate-500 to-slate-700' },
  { id: 'rotate-pdf', title: 'Rotate PDF', description: 'Rotate your PDFs the way you need.', color: 'from-slate-500 to-slate-700' },
  { id: 'html-to-pdf', title: 'HTML → PDF', description: 'Convert webpages to PDF by URL.', color: 'from-blue-500 to-indigo-500' },
  { id: 'unlock-pdf', title: 'Unlock PDF', description: 'Remove password security from PDFs you own.', color: 'from-zinc-500 to-slate-600' },
  { id: 'protect-pdf', title: 'Protect PDF', description: 'Encrypt PDF files with a password.', color: 'from-zinc-500 to-slate-600' },
  { id: 'organize-pdf', title: 'Organize PDF', description: 'Sort, delete, or add pages to your PDF.', color: 'from-indigo-500 to-cyan-500' },
  { id: 'pdf-to-pdfa', title: 'PDF → PDF/A', description: 'Transform to ISO-standardized PDF/A.', color: 'from-teal-500 to-green-500' },
  { id: 'repair-pdf', title: 'Repair PDF', description: 'Recover data from corrupt PDF files.', color: 'from-red-500 to-rose-500' },
  { id: 'add-page-numbers', title: 'Page Numbers', description: 'Add page numbers into PDFs with ease.', color: 'from-slate-500 to-slate-700' },
  { id: 'scan-to-pdf', title: 'Scan to PDF', description: 'Capture document scans from mobile to browser.', color: 'from-blue-500 to-cyan-500' },
  { id: 'ocr-pdf', title: 'OCR PDF', description: 'Convert scanned PDF into searchable documents.', color: 'from-emerald-500 to-teal-500' },
  { id: 'compare-pdf', title: 'Compare PDF', description: 'Side-by-side comparison to spot changes.', color: 'from-fuchsia-500 to-pink-600' },
  { id: 'redact-pdf', title: 'Redact PDF', description: 'Permanently remove sensitive information.', color: 'from-neutral-600 to-gray-700' },
  { id: 'crop-pdf', title: 'Crop PDF', description: 'Crop margins or select specific areas.', color: 'from-neutral-600 to-gray-700' },
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
    case 'merge-pdf':
      return dynamic(() => import('../../../components/tools/views/merge-pdf').then(m => m.default), { ssr: false })
    case 'split-pdf':
      return dynamic(() => import('../../../components/tools/views/split-pdf').then(m => m.default), { ssr: false })
    case 'rotate-pdf':
      return dynamic(() => import('../../../components/tools/views/rotate-pdf').then(m => m.default), { ssr: false })
    case 'cv-maker':
    case 'plot-area-measure':
      return dynamic(() => import('../../../components/tools/views/plot-area-measure').then(m => m.default), { ssr: false })
    case 'dwg-to-pdf':
      return dynamic(() => import('../../../components/tools/views/dwg-to-pdf').then(m => m.default), { ssr: false })
    // Placeholder mappings to generic view
    case 'compress-pdf':
    case 'pdf-to-ppt':
    case 'word-to-pdf':
    case 'ppt-to-pdf':
    case 'excel-to-pdf':
    case 'edit-pdf':
    case 'pdf-to-jpg':
    case 'jpg-to-pdf':
    case 'sign-pdf':
    case 'watermark-pdf':
    case 'html-to-pdf':
    case 'unlock-pdf':
    case 'protect-pdf':
    case 'organize-pdf':
    case 'pdf-to-pdfa':
    case 'repair-pdf':
    case 'add-page-numbers':
    case 'scan-to-pdf':
    case 'ocr-pdf':
    case 'compare-pdf':
    case 'redact-pdf':
    case 'crop-pdf':
      return dynamic(() => import('../../../components/tools/views/generic-tool').then(m => m.default), { ssr: false })
    default:
      return null
  }
}
