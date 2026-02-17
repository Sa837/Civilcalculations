import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export const metadata: Metadata = {
  title: 'Geotechnical Engineering: Soil-Structure Interaction Analysis | Civil Engineering',
  description:
    'Understanding soil behavior under structural loads. Master foundation design, settlement analysis, bearing capacity calculations, soil improvement techniques, and geotechnical investigation methods.',
  keywords:
    'geotechnical engineering, soil-structure interaction, foundation design, settlement analysis, bearing capacity, soil mechanics, geotechnical investigation',
  openGraph: {
    title: 'Geotechnical Engineering: Soil-Structure Interaction Analysis',
    description:
      'Master geotechnical engineering principles and soil-structure interaction analysis for foundation design.',
    type: 'article',
  },
}

export default function GeotechnicalEngineeringBlog() {
  return (
    <article className="min-h-screen bg-background dark:bg-background-dark">
      {/* Header */}
      <div className="border-b border-slate-200/20 dark:border-slate-800/20 bg-surface dark:bg-surface-dark">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="flex items-center gap-4 text-sm text-body/60 dark:text-body-dark/60 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>25 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Geotechnical Engineer</span>
            </div>
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs">
              Geotechnical Engineering
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Geotechnical Engineering: Soil-Structure Interaction Analysis
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Soil-structure interaction represents one of the most complex challenges in civil
            engineering. This comprehensive guide explores the fundamental principles of soil
            mechanics, foundation design methodologies, advanced analysis techniques, and practical
            applications for ensuring structural stability and safety in diverse geological
            conditions.
          </p>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="w-full py-6 bg-surface dark:bg-surface-dark border-b border-slate-200/20 dark:border-slate-800/20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="min-h-[90px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
            <AdSenseAd
              slot="1234567890"
              format="horizontal"
              style={{ minHeight: '90px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Soil Classification and Properties
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Understanding soil behavior requires comprehensive knowledge of soil classification
            systems and engineering properties that influence foundation design and performance.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-amber-800 dark:text-amber-200 mb-4">
                  Soil Mechanics Fundamentals
                </h3>
                <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                  Geotechnical engineering forms the critical foundation for all civil engineering
                  structures, requiring deep understanding of soil behavior, groundwater conditions,
                  and geological processes.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900 rounded-lg flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-300 font-semibold">
                  Soil Analysis
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200/50 dark:border-amber-800/50 mb-8">
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
              Unified Soil Classification System (USCS)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                  Coarse-Grained Soils
                </h4>
                <ul className="space-y-1 text-amber-600 dark:text-amber-400 text-sm">
                  <li>• GW - Well-graded gravels</li>
                  <li>• GP - Poorly graded gravels</li>
                  <li>• GM - Silty gravels</li>
                  <li>• GC - Clayey gravels</li>
                  <li>• SW - Well-graded sands</li>
                  <li>• SP - Poorly graded sands</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                  Fine-Grained Soils
                </h4>
                <ul className="space-y-1 text-amber-600 dark:text-amber-400 text-sm">
                  <li>• ML - Inorganic silts</li>
                  <li>• CL - Inorganic clays</li>
                  <li>• OL - Organic silts/clays</li>
                  <li>• MH - Inorganic silts</li>
                  <li>• CH - Inorganic clays</li>
                  <li>• OH - Organic clays</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Middle Ad Banner */}
          <div className="my-12 py-8 border-t border-b border-slate-200/20 dark:border-slate-800/20">
            <div className="min-h-[250px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
              <AdSenseAd
                slot="9285440299"
                format="auto"
                style={{ minHeight: '250px', width: '100%' }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Foundation Design Principles
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Foundation design requires careful consideration of soil bearing capacity, settlement
            potential, and interaction with structural loads.
          </p>

          {/* Foundation Design Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
                  Foundation Engineering
                </h4>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  Groundwater management involves careful monitoring, sustainable extraction, and
                  contamination prevention to ensure long-term availability of this critical
                  freshwater resource.ivil engineering applications that require nonlinear material
                  models to capture realistic behavior.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-red-200 to-pink-300 dark:from-red-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-300 font-semibold">
                  Foundation Design
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Bearing Capacity Analysis
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Terzaghi&apos;s Bearing Capacity Equation
              </h4>
              <div className="text-center mb-4">
                <p className="font-mono text-lg text-heading dark:text-heading-dark">
                  q<sub>ult</sub> = cNc + qNq + 0.5γBNγ
                </p>
              </div>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• c = cohesion</li>
                <li>• q = surcharge pressure</li>
                <li>• γ = unit weight of soil</li>
                <li>• B = foundation width</li>
                <li>• Nc, Nq, Nγ = bearing capacity factors</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Allowable Bearing Capacity
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Factor of safety (FS) = 2.5-3.0</li>
                <li>• qa = qult / FS</li>
                <li>• Service load considerations</li>
                <li>• Settlement limitations</li>
                <li>• Local code requirements</li>
              </ul>
            </div>
          </div>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Settlement prediction is critical for foundation design, requiring analysis of immediate
            and long-term soil deformations.
          </p>

          {/* Settlement Analysis Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Settlement Prediction Methods
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Accurate settlement analysis ensures structures remain functional and safe
                  throughout their service life, requiring sophisticated understanding of soil
                  consolidation and deformation characteristics.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Settlement Analysis
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Types of Settlement
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Immediate Settlement
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Elastic deformation under load
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Primary Consolidation
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Volume change due to pore pressure
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Secondary Compression
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Creep deformation over time
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Settlement Calculation Methods
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Elastic Theory:</strong> Immediate settlement analysis using
                Boussinesq&apos;s equations and elastic half-space theory for homogeneous soils.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Consolidation Theory:</strong> One-dimensional consolidation analysis using
                Terzaghi&apos;s theory for saturated clay deposits.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Soil Mechanics:</strong> Mohr-Coulomb criterion for frictional materials.
                and finite difference methods for complex soil-structure interaction problems.
              </div>
            </li>
          </ul>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            When natural soil conditions are inadequate, various soil improvement techniques can
            enhance foundation performance and reduce settlement.
          </p>

          {/* Soil Improvement Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Soil Improvement
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Ground Improvement Methods
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Advanced soil improvement techniques enable construction on challenging sites by
                  enhancing soil properties and foundation performance through mechanical, chemical,
                  and biological methods.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Mechanical Methods
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Dynamic compaction</li>
                <li>• Vibroflotation</li>
                <li>• Stone columns</li>
                <li>• Soil mixing</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Chemical Methods
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Grouting</li>
                <li>• Chemical stabilization</li>
                <li>• Electro-osmosis</li>
                <li>• Bioremediation</li>
              </ul>
            </div>
          </div>

          {/* Bottom Ad Banner */}
          <div className="my-12 py-8 border-t border-b border-slate-200/20 dark:border-slate-800/20">
            <div className="min-h-[280px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
              <AdSenseAd
                slot="9285440299"
                format="auto"
                style={{ minHeight: '280px', width: '100%' }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 mb-12">
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
              Advanced Soil-Structure Interaction
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              Modern geotechnical engineering increasingly employs sophisticated numerical modeling
              techniques to understand complex soil-structure interaction behavior. Finite element
              analysis, coupled with advanced constitutive soil models, enables engineers to predict
              foundation performance under various loading conditions with unprecedented accuracy.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              The integration of field instrumentation, laboratory testing, and computational
              analysis forms the foundation of reliable geotechnical design, ensuring that
              structures perform safely and economically throughout their design life.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-8 border-t border-slate-200/20 dark:border-slate-800/20">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Bookmark className="h-4 w-4" /> Save
            </button>
          </div>
          <Link
            href="/resources"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            ← Back to Resources
          </Link>
        </div>
      </div>
    </article>
  )
}
