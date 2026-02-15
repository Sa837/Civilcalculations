import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function SteelStructureBlog() {
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
              <span>Structural Steel Engineer</span>
            </div>
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-200 rounded-full text-xs">
              Steel Structures
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Steel Structure Design: Modern Analysis and Construction Methods
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Steel structure design combines engineering precision with construction efficiency to
            create durable, cost-effective structural systems. This comprehensive guide explores
            modern analysis methodologies, connection design principles, fabrication techniques, and
            advanced steel technologies that enable innovative and sustainable structural solutions
            for contemporary construction challenges.
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
            Steel Material Properties and Selection
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Understanding steel properties and grades is fundamental to effective structural steel
            design and ensures optimal performance across diverse applications.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-zinc-100 to-gray-100 dark:from-zinc-900/20 dark:to-gray-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
                  Advanced Steel Engineering
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Modern steel structure design integrates material science with engineering
                  analysis to create efficient, sustainable, and cost-effective structural systems
                  that meet the demands of contemporary construction.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-zinc-200 to-gray-300 dark:from-zinc-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Steel Design</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-zinc-50 to-gray-50 dark:from-zinc-900/20 dark:to-gray-900/20 p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 mb-8">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
              ASTM Steel Grades and Applications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Structural Shapes (A36, A572)
                </h4>
                <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 text-sm">
                  <li>• General structural applications</li>
                  <li>• Buildings and bridges</li>
                  <li>• Yield strength: 36-60 ksi</li>
                  <li>• Excellent weldability</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  High-Strength (A514, A709)
                </h4>
                <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 text-sm">
                  <li>• Heavy construction equipment</li>
                  <li>• Seismic-resistant structures</li>
                  <li>• Yield strength: 90-100+ ksi</li>
                  <li>• Enhanced durability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Middle Ad Banner */}
          <div className="my-12 py-8 border-t border-b border-slate-200/20 dark:border-slate-800/20">
            <div className="min-h-[250px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
              <AdSenseAd
                slot="0987654321"
                format="rectangle"
                style={{ minHeight: '250px', width: '100%' }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Structural Analysis Methods
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Modern steel structure analysis employs advanced computational methods to predict
            structural behavior under various loading conditions.
          </p>

          {/* Analysis Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Computational Structural Analysis
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Advanced analysis techniques combine traditional engineering principles with
                  computational methods to ensure structural safety, serviceability, and economic
                  efficiency in steel design.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Structural Analysis
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Load Analysis and Design Criteria
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Load Combinations (ASCE 7)
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• 1.4D (dead load only)</li>
                <li>• 1.2D + 1.6L (typical)</li>
                <li>• 1.2D + 1.0W + L + 0.5(Lr or S)</li>
                <li>• 0.9D + 1.0W (uplift)</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Stability Considerations
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• P-Δ effects in tall structures</li>
                <li>• Second-order analysis</li>
                <li>• Buckling resistance</li>
                <li>• Drift limitations</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Connection Design and Detailing
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Steel connections are critical to structural integrity and must be designed to transfer
            loads safely while accommodating fabrication and erection requirements.
          </p>

          {/* Connections Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
                  Advanced Connection Engineering
                </h4>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  Modern connection design integrates structural analysis with fabrication
                  efficiency, using advanced welding techniques and bolted connections to create
                  reliable and economical structural systems.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-red-200 to-pink-300 dark:from-red-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-300 font-semibold">
                  Connection Design
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Bolted Connections (AISC 360)
          </h3>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-red-200/50 dark:border-red-800/50 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  Bearing Connections
                </h4>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  Shear transfer through bolt bearing on holes
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Slip-Critical</h4>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  Friction between clamped surfaces
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  Tension Connections
                </h4>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  Direct tension through bolt shank
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Welding Design and Specifications
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Fillet Welds:</strong> Triangular cross-section welds used for connecting
                perpendicular members, with capacity based on weld size and length (φRn = 0.707 ×
                weld size × length × Fu).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Groove Welds:</strong> Full-penetration welds that develop the full strength
                of the base metal, used in butt joints and critical connections requiring maximum
                strength.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Plug and Slot Welds:</strong> Circular or rectangular welds used to transmit
                shear forces in lap joints, with capacity limited by the weld metal strength and
                geometry.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Fabrication and Construction Techniques
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Modern steel fabrication employs advanced technologies and quality control processes to
            ensure structural integrity and construction efficiency.
          </p>

          {/* Fabrication Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Steel Fabrication
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Advanced Manufacturing Techniques
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Computer-controlled fabrication processes, automated welding systems, and
                  precision cutting technologies enable efficient production of complex steel
                  structures with consistent quality and dimensional accuracy.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Modern Fabrication Technologies
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                CNC Cutting and Drilling
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Plasma and laser cutting</li>
                <li>• Computer numerical control (CNC)</li>
                <li>• Automated hole punching</li>
                <li>• Precision dimensional control</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Automated Welding
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Robotic welding systems</li>
                <li>• Submerged arc welding (SAW)</li>
                <li>• Flux-cored arc welding (FCAW)</li>
                <li>• Quality assurance monitoring</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Corrosion Protection and Maintenance
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Effective corrosion protection is essential for maintaining steel structure integrity
            and extending service life in various environmental conditions.
          </p>

          {/* Corrosion Protection Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200 mb-3">
                  Durable Steel Protection Systems
                </h4>
                <p className="text-cyan-700 dark:text-cyan-300 leading-relaxed">
                  Comprehensive corrosion protection strategies combine protective coatings,
                  cathodic protection, and environmental controls to ensure long-term structural
                  performance and minimize maintenance costs.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">
                  Corrosion Protection
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Protective Coating Systems
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Organic Coatings:</strong> Epoxy, polyurethane, and zinc-rich primers
                provide barrier protection and cathodic protection in aggressive environments like
                marine and industrial settings.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Metallic Coatings:</strong> Hot-dip galvanizing and thermal spray
                metallizing provide sacrificial protection, with zinc coatings offering 75-100 year
                service life in moderate environments.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Cathodic Protection:</strong> Sacrificial anode and impressed current
                systems prevent corrosion by maintaining steel surfaces as cathodes in the
                electrochemical reaction.
              </div>
            </li>
          </ul>

          {/* Bottom Ad Banner */}
          <div className="my-12 py-8 border-t border-b border-slate-200/20 dark:border-slate-800/20">
            <div className="min-h-[280px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
              <AdSenseAd
                slot="1122334455"
                format="vertical"
                style={{ minHeight: '280px', width: '100%' }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 mb-12">
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
              Future of Steel Structure Design
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              The steel construction industry is evolving with innovations in high-performance
              materials, digital fabrication technologies, and sustainable design practices.
              Advanced steels with enhanced strength-to-weight ratios, modular construction systems,
              and Building Information Modeling (BIM) integration are transforming how we design and
              construct steel structures.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              As steel technologists embrace performance-based design, automated fabrication
              processes, and life-cycle assessment methodologies, the industry moves toward more
              efficient, sustainable, and cost-effective structural solutions that meet the
              challenges of modern infrastructure development.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              The future of steel structure design lies in the integration of traditional
              engineering excellence with cutting-edge technology, creating structures that are
              lighter, stronger, and more sustainable than ever before while supporting the
              infrastructure needs of future generations.
            </p>
          </div>
        </div>

        {/* Share and Bookmark */}
        <div className="flex items-center justify-between py-8 border-t border-slate-200/20 dark:border-slate-800/20">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Bookmark className="h-4 w-4" />
              Save
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
