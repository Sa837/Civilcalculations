"use client"

import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('./plot-map-client').then(m => m.PlotMapClient), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-slate-200/20 bg-surface p-6 text-center dark:border-slate-700 dark:bg-surface-dark">
      Loading map…
    </div>
  ),
})

export default function PlotAreaMeasureView() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-heading dark:text-heading-dark">
          Plot Area Measurement (Map)
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-body/80 dark:text-body-dark/80">
          Draw polygons on the map to measure area and perimeter in multiple units.
        </p>
      </div>
      <MapClient />
    </div>
  )
}
