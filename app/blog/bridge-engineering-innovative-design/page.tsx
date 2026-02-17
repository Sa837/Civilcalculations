import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function BridgeEngineeringBlog() {
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
              <span>26 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Bridge Engineering Specialist</span>
            </div>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 rounded-full text-xs">
              Structural Engineering
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Bridge Engineering: Innovative Design and Construction Techniques
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Bridges represent the pinnacle of civil engineering achievement, combining structural
            elegance with functional necessity. This comprehensive guide explores modern bridge
            design philosophies, advanced construction techniques, load analysis methodologies, and
            emerging technologies that are reshaping infrastructure development worldwide.
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
            Bridge Typology and Structural Systems
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Modern bridge engineering encompasses a diverse array of structural systems, each
            optimized for specific span lengths, loading conditions, and site constraints.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/20 dark:to-gray-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Bridge Engineering Excellence
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Bridges combine artistic beauty with engineering precision, serving as vital
                  transportation links while showcasing the pinnacle of structural design and
                  construction innovation.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-slate-200 to-gray-300 dark:from-slate-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-slate-600 dark:text-slate-300 font-semibold">
                  Bridge Design
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 p-6 rounded-xl border border-slate-200/50 dark:border-slate-800/50 mb-8">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Bridge Classification by Structural System
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Beam Bridges
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                  <li>• Simply supported beams</li>
                  <li>• Continuous beam systems</li>
                  <li>• Box girder bridges</li>
                  <li>• Precast segmental construction</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Arch Bridges
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                  <li>• Stone masonry arches</li>
                  <li>• Concrete filled steel tubes</li>
                  <li>• Network arches</li>
                  <li>• Tied arches</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Cable Systems
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                  <li>• Suspension bridges</li>
                  <li>• Cable-stayed bridges</li>
                  <li>• Extradosed bridges</li>
                  <li>• Stress-ribbon bridges</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Moving Bridges
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                  <li>• Bascule bridges</li>
                  <li>• Swing bridges</li>
                  <li>• Vertical lift bridges</li>
                  <li>• Retractable bridges</li>
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
            Advanced Load Analysis and Design Criteria
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Modern bridge design requires comprehensive analysis of multiple loading scenarios and
            environmental factors.
          </p>

          {/* Load Analysis Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Structural Load Analysis
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Advanced load analysis considers dead loads, live loads, wind loads, seismic
                  forces, and environmental factors to ensure bridge safety and serviceability
                  throughout its design life.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Load Analysis
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Load Combinations and Safety Factors
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">Dead Loads</h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Structural self-weight</li>
                <li>• Non-structural components</li>
                <li>• Utilities and equipment</li>
                <li>• Future wearing surfaces</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">Live Loads</h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Highway loading (HS-20, HL-93)</li>
                <li>• Railway loading standards</li>
                <li>• Pedestrian and bicycle loads</li>
                <li>• Construction and maintenance loads</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Environmental Load Considerations
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Wind Loads:</strong> Dynamic wind analysis using computational fluid
                dynamics (CFD) for long-span bridges, considering vortex shedding and flutter
                instability.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Seismic Loads:</strong> Performance-based seismic design with nonlinear
                time-history analysis for bridges in high seismic zones.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Temperature Effects:</strong> Thermal expansion analysis and creep
                considerations for concrete and composite bridge structures.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Innovative Construction Techniques
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Modern bridge construction leverages advanced technologies to improve efficiency,
            safety, and quality while reducing environmental impact.
          </p>

          {/* Construction Techniques Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Modern Construction Methods
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Innovative construction techniques including accelerated bridge construction
                  (ABC), prefabrication, and advanced materials enable faster project completion
                  with improved quality and safety.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Construction Tech
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Accelerated Bridge Construction (ABC)
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
              ABC Methodologies
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Prefabrication
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Factory-built components
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Modular Construction
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Assembled off-site</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Rapid Installation
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Minimal traffic disruption
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Material Innovations in Bridge Engineering
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Advanced materials are enabling longer spans, improved durability, and enhanced
            performance characteristics.
          </p>

          {/* Materials Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 font-semibold">
                  Advanced Materials
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  Next-Generation Bridge Materials
                </h4>
                <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                  High-performance concrete, fiber-reinforced polymers, and advanced composites are
                  revolutionizing bridge construction, offering superior strength-to-weight ratios
                  and enhanced durability.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                High-Performance Concrete
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Ultra-high-performance concrete (UHPC)</li>
                <li>• Self-consolidating concrete (SCC)</li>
                <li>• Fiber-reinforced concrete</li>
                <li>• Lightweight aggregates</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Advanced Composites
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Carbon fiber reinforced polymers (CFRP)</li>
                <li>• Glass fiber reinforced polymers (GFRP)</li>
                <li>• Prestressed concrete composites</li>
                <li>• Hybrid material systems</li>
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
              Future Directions in Bridge Engineering
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              The future of bridge engineering lies in the integration of advanced materials,
              digital technologies, and sustainable design principles. Smart bridges with embedded
              sensors, self-healing materials, and adaptive structural systems will define the next
              generation of infrastructure.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Civil engineers must embrace these innovations while maintaining the fundamental
              principles of structural integrity, safety, and serviceability that have guided bridge
              design for centuries.
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
