'use client'

import Link from 'next/link'
import { useMemo, useRef, useCallback } from 'react'
import { resources } from '../../../../lib/data/resources'

interface SubPageProps {
  params: {
    category: string
    sub: string
  }
}

export default function SubPage({ params }: SubPageProps) {
  const { category, sub } = params

  const { resource, subItem } = useMemo(() => {
    const res = resources.find(r => r.slug === category)
    const item = res?.subItems?.find(si => si.url?.endsWith('/' + sub))
    return { resource: res, subItem: item }
  }, [category, sub])

  if (!resource || !subItem) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-heading dark:text-heading-dark">
            Content Not Found
          </h1>
          <p className="mb-6 font-sans text-body/70 dark:text-body-dark/70">
            The requested section could not be found.
          </p>
          <Link
            href={`/resources/${category}` as any}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-medium text-white transition-colors hover:bg-primary/90"
          >
            Back to {category}
          </Link>
        </div>
      </main>
    )
  }

  const printRef = useRef<HTMLDivElement>(null)

  const handleDownloadPdf = useCallback(() => {
    const content = printRef.current
    if (!content) return

    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1200')
    if (!printWindow) return

    const doc = printWindow.document
    doc.open()
    doc.write(`
      <html>
        <head>
          <title>${subItem.title} - ${resource.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            * { box-sizing: border-box; }
            body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, Noto Sans, 'Helvetica Neue', 'Liberation Sans', sans-serif; margin: 24px; color: #0f172a; }
            h1,h2,h3 { color: #0f172a; margin: 16px 0 8px; }
            p,li { line-height: 1.6; }
            code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
            .prose :where(h1,h2,h3,h4){ margin-top: 1.2em; }
            .prose :where(table){ width: 100%; border-collapse: collapse; margin: 12px 0; }
            .prose :where(th, td){ border: 1px solid #e2e8f0; padding: 8px; text-align: left; vertical-align: top; }
            @page { size: A4; margin: 16mm; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <h1>${subItem.title}</h1>
          <h3>${resource.title}</h3>
          <div class="prose">${content.innerHTML}</div>
          <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 300); }<\/script>
        </body>
      </html>
    `)
    doc.close()
  }, [resource.title, subItem.title])

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6">
        <Link
          href={`/resources/${category}` as any}
          className="mb-4 inline-block rounded-xl border border-slate-200/20 bg-surface px-4 py-2 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-700"
        >
          ← Back
        </Link>
        <h1 className="font-display text-3xl font-bold text-heading dark:text-heading-dark">
          {subItem.title}
        </h1>
        <p className="mt-2 font-sans text-body/80 dark:text-body-dark/80">
          {resource.title}
        </p>

        {/* Download PDF Button */}
        <div className="mt-4">
          <button
            onClick={handleDownloadPdf}
            className="no-print inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-display font-medium text-white transition-colors hover:bg-primary/90"
          >
            Download PDF
          </button>
        </div>
      </div>

      <article ref={printRef} className="prose prose-slate max-w-none dark:prose-invert">
        {/* Transportation Engineering Content */}
        {category === 'pokhara-university-msc-structure-2025' && sub === 'transportation-engineering' ? (
          <div>
            <h2>Section B: Transportation Engineering</h2>

            <h3>1) Traffic Engineering</h3>
            <table className="w-full text-sm table-fixed border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">SUB-TOPIC</th>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">SHORT DESCRIPTION / NOTES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Definition</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Planning, design, operation and control of traffic for safe and efficient movement.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Traffic characteristics</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Road users, vehicle traits; stream variables <strong>q, v, k</strong> with relation <strong>q = k × v</strong>.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Traffic volume study</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Counts (veh/hr, veh/day); ADT/AADT; uses in design, capacity, signals, planning.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Speed studies</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Spot, time-mean (Vt), space-mean (Vs), 85th percentile; running vs journey speed.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Parking studies</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">On-street (parallel/angle/perpendicular), off-street; demand, design and management.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Accident studies</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Data collection and analysis; causes: human, geometry, vehicle, weather; black spots.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Traffic control devices</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Signs, signals, markings; Nepal practice: DoR manuals; use IRC if DoR silent.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Highway capacity</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Basic: <strong>C = V/PHF</strong>; ideal ≈ 2000 veh/hr/lane (conditions dependent).</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Street lighting</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">30–50 lux (main roads); consider uniformity, glare, pole height/spacing.</td>
                </tr>
                <tr>
                  <td className="align-top p-2 border border-slate-200 dark:border-slate-700">Intersection design</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">At-grade/grade-separated; channelization; roundabouts and weaving length.</td>
                </tr>
              </tbody>
            </table>

            <h4 className="mt-6">Important Formulas</h4>
            <table className="w-full text-sm table-fixed border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">CONCEPT</th>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">FORMULA / NOTES</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Flow–Speed–Density</td><td className="p-2 border border-slate-200 dark:border-slate-700">q = k × v</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">AADT</td><td className="p-2 border border-slate-200 dark:border-slate-700">Total yearly traffic ÷ 365</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Time-mean speed</td><td className="p-2 border border-slate-200 dark:border-slate-700">Vt = ΣVi / n</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Space-mean speed</td><td className="p-2 border border-slate-200 dark:border-slate-700">Vs = n / Σ(1/Vi); Vt ≥ Vs</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Stopping Sight Distance</td><td className="p-2 border border-slate-200 dark:border-slate-700">SSD = 0.278 V t + V²/(254 f)</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Peak Hour Factor</td><td className="p-2 border border-slate-200 dark:border-slate-700">PHF = V60/(4 × V15)</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Parking Index</td><td className="p-2 border border-slate-200 dark:border-slate-700">Vehicles parked / Total spaces × 100%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Accident rate</td><td className="p-2 border border-slate-200 dark:border-slate-700">(Accidents × 10⁶)/(AADT × Length × 365)</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Weaving length (guide)</td><td className="p-2 border border-slate-200 dark:border-slate-700">L ≈ 2.7(W + 3.5) + V²</td></tr>
              </tbody>
            </table>

            <h4 className="mt-6">High-Value MCQs</h4>
            <ul>
              <li>q = k × v relates flow, density and speed.</li>
              <li>Unit of traffic flow: veh/hr; AADT = yearly traffic ÷ 365.</li>
              <li>85th percentile speed for setting speed limits.</li>
              <li>Typical ideal capacity ≈ 2000 veh/hr/lane.</li>
              <li>PHF uses busiest 15-minute flow.</li>
            </ul>

            <h3 className="mt-10">2) Highway Geometric Design</h3>
            <table className="w-full text-sm table-fixed border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">SUB-TOPIC</th>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">SHORT DESCRIPTION / NOTES</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Design speed</td><td className="p-2 border border-slate-200 dark:border-slate-700">Basis of all features (NRS/IRC): Plain 100, Rolling 80, Mountainous 50, Steep 40 km/h.</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Cross-section</td><td className="p-2 border border-slate-200 dark:border-slate-700">Carriageway: 3.75 / 7.0 / 14.0 m; shoulders ≈ 2.5 m; camber 2–3% (bituminous).</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Sight distance</td><td className="p-2 border border-slate-200 dark:border-slate-700">SSD = 0.278 V t + V²/[254(f ± G)]; OSD ≈ d1 + d2 + d3; ISD = 2 × SSD.</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Horizontal alignment</td><td className="p-2 border border-slate-200 dark:border-slate-700">R = V²/[127(e + f)]; e = V²/(127R) − f; Ls = 0.0215 V³/CR; We = n l²/(2R) + V/(9.5 √R).</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Vertical alignment</td><td className="p-2 border border-slate-200 dark:border-slate-700">Ruling gradients: plain 3%, hill 5%; compensation C = (30 + R)/R % (max 75/R).</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Hill roads</td><td className="p-2 border border-slate-200 dark:border-slate-700">Hairpin bends with widening; retaining/breast walls; catch water drains; safety structures.</td></tr>
              </tbody>
            </table>

            <h4 className="mt-6">Key Formulas (Geometrics)</h4>
            <table className="w-full text-sm table-fixed border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <tbody>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">q = k × v</td><td className="p-2 border border-slate-200 dark:border-slate-700">Flow relation</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">R = V²/[127(e + f)]</td><td className="p-2 border border-slate-200 dark:border-slate-700">Curve radius</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">e = V²/(127R) − f</td><td className="p-2 border border-slate-200 dark:border-slate-700">Superelevation</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Ls = 0.0215 V³/CR</td><td className="p-2 border border-slate-200 dark:border-slate-700">Transition length</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">h = w × n / 100</td><td className="p-2 border border-slate-200 dark:border-slate-700">Camber height</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">L = 0.6 V + V²/6.5</td><td className="p-2 border border-slate-200 dark:border-slate-700">Valley curve</td></tr>
              </tbody>
            </table>

            <h3 className="mt-10">3) Pavement Design and Construction</h3>
            <table className="w-full text-sm table-fixed border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">SUB-TOPIC</th>
                  <th className="bg-slate-100 dark:bg-slate-800 text-left p-2 border border-slate-200 dark:border-slate-700">SHORT DESCRIPTION / NOTES</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Traffic consideration</td><td className="p-2 border border-slate-200 dark:border-slate-700">ESAL, growth factor; design life 15–20 yrs (typ.).</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Subgrade preparation</td><td className="p-2 border border-slate-200 dark:border-slate-700">95–98% MDD at OMC; improve if CBR &lt; 5%; cut &amp; fill; slope ≈ 1:1.5.</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Flexible pavement</td><td className="p-2 border border-slate-200 dark:border-slate-700">Layers: Subgrade → Sub-base → Base → Bituminous surfacing; D = k1 log10(W18) − k2 (empirical).</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Rigid pavement</td><td className="p-2 border border-slate-200 dark:border-slate-700">IRC:58; thickness from stress/deflection; dowels &amp; tie bars; M25–M30; curing 7–14 days.</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Construction</td><td className="p-2 border border-slate-200 dark:border-slate-700">Flexible: WBM/WMM, coats, BM, BC with compaction. Rigid: lean sub-base, PCC slab, joints, dowels/ties.</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Drainage &amp; shoulders</td><td className="p-2 border border-slate-200 dark:border-slate-700">Side/longitudinal/cross drains; shoulders 1.5–2.5 m.</td></tr>
              </tbody>
            </table>

            <h4 className="mt-6">Important Formulas – Pavement</h4>
            <table className="w-full text-sm table-fixed border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <tbody>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">D = k1 log10(W18) − k2</td><td className="p-2 border border-slate-200 dark:border-slate-700">Flexible thickness (empirical)</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">SSD = 0.278 V t + V²/[254 (f ± G)]</td><td className="p-2 border border-slate-200 dark:border-slate-700">Stopping sight distance</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">e = V²/(127R) − f</td><td className="p-2 border border-slate-200 dark:border-slate-700">Superelevation</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">Degree of compaction</td><td className="p-2 border border-slate-200 dark:border-slate-700">Field dry density / MDD × 100%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">h = w × n / 100</td><td className="p-2 border border-slate-200 dark:border-slate-700">Camber height</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">LTE = Δ/Δneigh × 100%</td><td className="p-2 border border-slate-200 dark:border-slate-700">Load transfer efficiency</td></tr>
              </tbody>
            </table>

            <h4 className="mt-6">Important MCQs – Pavement</h4>
            <ul>
              <li>ESAL = Equivalent Standard Axle Load; Subgrade compaction target 95–98% MDD.</li>
              <li>Binder course = Bituminous Macadam; Surface = Bituminous Concrete.</li>
              <li>Rigid pavement load transfer by dowel bars; design life 15–20 yrs.</li>
            </ul>
          </div>
        ) : (
          <p>Start writing your blog-style content for this section here.</p>
        )}
      </article>
    </main>
  )
}
