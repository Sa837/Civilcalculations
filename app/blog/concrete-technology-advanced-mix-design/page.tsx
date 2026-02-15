import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export const metadata: Metadata = {
  title: 'Concrete Technology: Advanced Mix Design and Quality Control | Civil Engineering',
  description:
    'Master concrete mix design, material proportions, testing methods, and quality assurance. Learn advanced concrete technologies, admixtures, curing techniques, and durability enhancement strategies.',
  keywords:
    'concrete technology, mix design, concrete testing, quality control, admixtures, curing techniques, concrete durability, advanced concrete',
  openGraph: {
    title: 'Concrete Technology: Advanced Mix Design and Quality Control',
    description:
      'Master advanced concrete mix design and quality control techniques for superior construction performance.',
    type: 'article',
  },
}

export default function ConcreteTechnologyBlog() {
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
              <span>27 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Concrete Technology Specialist</span>
            </div>
            <span className="px-2 py-1 bg-stone-100 dark:bg-stone-900/30 text-stone-800 dark:text-stone-200 rounded-full text-xs">
              Concrete Technology
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Concrete Technology: Advanced Mix Design and Quality Control
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Concrete technology encompasses the science and engineering of creating durable,
            high-performance concrete mixtures. This comprehensive guide explores advanced mix
            design methodologies, material optimization, testing protocols, and quality assurance
            techniques that ensure concrete structures meet performance requirements throughout
            their service life.
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
            Concrete Mix Design Fundamentals
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Successful concrete mix design requires understanding the relationships between
            constituent materials and their impact on fresh and hardened concrete properties.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-stone-100 to-gray-100 dark:from-stone-900/20 dark:to-gray-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Advanced Concrete Mix Design
                </h3>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Scientific mix design combines material science with engineering principles to
                  create concrete mixtures that optimize performance, durability, and
                  cost-effectiveness for specific applications.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-stone-200 to-gray-300 dark:from-stone-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-stone-600 dark:text-stone-300 font-semibold">Mix Design</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-stone-50 to-gray-50 dark:from-stone-900/20 dark:to-gray-900/20 p-6 rounded-xl border border-stone-200/50 dark:border-stone-800/50 mb-8">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">
              Concrete Constituents and Their Functions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-stone-700 dark:text-stone-300 mb-2">Cement</h4>
                <ul className="space-y-1 text-stone-600 dark:text-stone-400 text-sm">
                  <li>• Portland cement (OPC, PPC, SRC)</li>
                  <li>• Blended cements (fly ash, slag)</li>
                  <li>• Specialty cements (white, sulfate-resistant)</li>
                  <li>• Hydraulic binding agent</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Aggregates
                </h4>
                <ul className="space-y-1 text-stone-600 dark:text-stone-400 text-sm">
                  <li>• Coarse aggregates (20mm, 40mm)</li>
                  <li>• Fine aggregates (sand, manufactured sand)</li>
                  <li>• Lightweight aggregates (expanded clay)</li>
                  <li>• Recycled aggregates (crushed concrete)</li>
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
            Advanced Mix Design Methodologies
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Modern mix design employs systematic approaches that optimize material proportions for
            specific performance requirements.
          </p>

          {/* Mix Design Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Scientific Mix Optimization
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Advanced mix design methodologies use statistical analysis, material science, and
                  performance-based criteria to create concrete mixtures that meet exacting
                  specifications for strength, durability, and workability.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Advanced Design
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            ACI Mix Design Method
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
              Step-by-Step Process
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Step 1-3: Requirements
                </h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Slump, maximum aggregate size, exposure conditions
                </p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Step 4-6: Materials
                </h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Specific gravity, absorption, moisture content
                </p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Step 7-9: Proportions
                </h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Aggregate ratios, water-cement ratio, trial batches
                </p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Step 10-11: Testing
                </h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Strength verification, adjustments, final mix
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Chemical Admixtures and Performance Enhancers
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Chemical admixtures modify concrete properties to achieve specific performance
            characteristics and construction requirements.
          </p>

          {/* Admixtures Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 font-semibold">
                  Chemical Admixtures
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  Performance Enhancement
                </h4>
                <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                  Chemical admixtures provide precise control over concrete properties, enabling the
                  production of high-performance concrete mixtures that meet demanding
                  specifications for strength, durability, and workability.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Major Admixture Categories
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Water Reducers
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Plasticizers (mid-range)</li>
                <li>• Superplasticizers (high-range)</li>
                <li>• Reduce water content by 12-30%</li>
                <li>• Improve workability and strength</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">Retarders</h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Extend setting time</li>
                <li>• Reduce hydration heat</li>
                <li>• Improve workability retention</li>
                <li>• Prevent cold joints in large pours</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Quality Control and Testing Procedures
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Comprehensive quality control ensures that concrete meets specification requirements and
            performs as designed throughout its service life.
          </p>

          {/* Quality Control Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Comprehensive Testing Protocols
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Systematic quality control combines laboratory testing, field monitoring, and
                  statistical analysis to ensure concrete performance meets design specifications
                  and regulatory requirements.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Quality Control
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Fresh Concrete Tests
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Slump Test (ASTM C143):</strong> Measures workability and consistency, with
                slump values ranging from 25-150mm depending on placement method and structural
                requirements.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Air Content Test (ASTM C231):</strong> Determines entrained air content,
                which affects durability and resistance to freeze-thaw cycles in cold climates.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Unit Weight Test (ASTM C138):</strong> Measures density to verify proper
                consolidation and absence of significant voids or honeycombing.
              </div>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Hardened Concrete Tests
          </h3>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-green-200/50 dark:border-green-800/50 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Compressive Strength
                </h4>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  ASTM C39, 28-day cylinders, quality assurance
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Flexural Strength
                </h4>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  ASTM C78, beam tests, pavement design
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Durability Tests
                </h4>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Freeze-thaw, sulfate resistance, permeability
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Curing Techniques and Durability Enhancement
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Proper curing and durability enhancement techniques ensure long-term concrete
            performance and resistance to environmental degradation.
          </p>

          {/* Curing Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200 mb-3">
                  Advanced Curing Methods
                </h4>
                <p className="text-cyan-700 dark:text-cyan-300 leading-relaxed">
                  Scientific curing techniques optimize hydration, maximize strength development,
                  and enhance durability by controlling moisture loss and temperature during the
                  critical early-age period.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">
                  Curing Techniques
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Curing Methods and Applications
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Moisture Retention
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Water curing (ponding, sprinkling)</li>
                <li>• Membrane curing (plastic sheets)</li>
                <li>• Steam curing (accelerated strength)</li>
                <li>• Internal curing (lightweight aggregates)</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Temperature Control
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Insulation blankets</li>
                <li>• Heated enclosures</li>
                <li>• Maturity monitoring</li>
                <li>• Cold weather protection</li>
              </ul>
            </div>
          </div>

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
              Future of Concrete Technology
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              The concrete industry is evolving rapidly with innovations in materials science,
              digital technologies, and sustainable practices. High-performance concrete mixtures,
              self-healing materials, and smart monitoring systems are transforming how we design,
              construct, and maintain concrete structures.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              As concrete technologists embrace advanced testing methods, performance-based
              specifications, and digital quality control, the industry moves toward more
              sustainable, durable, and cost-effective concrete solutions that meet the challenges
              of modern infrastructure development.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              The convergence of traditional concrete knowledge with cutting-edge technology will
              create concrete mixtures that are stronger, more durable, and more sustainable than
              ever before, supporting the infrastructure needs of future generations.
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
