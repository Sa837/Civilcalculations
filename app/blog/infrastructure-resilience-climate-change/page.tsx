import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export const metadata: Metadata = {
  title: 'Infrastructure Resilience: Designing for Climate Change Impacts | Civil Engineering',
  description:
    'Essential strategies for resilient infrastructure design. Covers flood-resistant foundations, earthquake-proof structures, sea-level rise adaptation, extreme weather event mitigation, and sustainable urban planning approaches.',
  keywords:
    'infrastructure resilience, climate change adaptation, flood-resistant design, earthquake engineering, sea-level rise, extreme weather, sustainable infrastructure, resilient design',
  openGraph: {
    title: 'Infrastructure Resilience: Designing for Climate Change Impacts',
    description:
      'Essential strategies for designing resilient infrastructure in the face of climate change challenges.',
    type: 'article',
  },
}

export default function InfrastructureResilienceBlog() {
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
              <span>28 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Infrastructure Engineering Expert</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Infrastructure Resilience: Designing for Climate Change Impacts
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            As climate change intensifies, civil engineers face unprecedented challenges in
            designing infrastructure that can withstand extreme weather events, rising sea levels,
            and shifting environmental conditions. This comprehensive guide explores resilience
            engineering principles and practical implementation strategies for creating sustainable,
            adaptable infrastructure systems that protect communities and economies from
            climate-related risks.
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
            Understanding Climate Change Impacts on Infrastructure
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Climate change manifests in infrastructure systems through multiple pathways, each
            requiring specific engineering responses. Understanding these impacts is fundamental to
            developing effective resilience strategies.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-orange-800 dark:text-orange-200 mb-4">
                  Climate Change Infrastructure Crisis
                </h3>
                <p className="text-orange-700 dark:text-orange-300 leading-relaxed">
                  Rising temperatures, extreme weather events, and shifting precipitation patterns
                  are creating unprecedented challenges for infrastructure systems worldwide,
                  requiring a fundamental rethinking of design and construction approaches.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-orange-200 to-red-300 dark:from-orange-800 dark:to-red-900 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-300 font-semibold">
                  Climate Impact
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-red-200/50 dark:border-red-800/50 mb-8">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
              Primary Climate Threats to Infrastructure
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  Physical Impacts
                </h4>
                <ul className="space-y-1 text-red-600 dark:text-red-400 text-sm">
                  <li>• Increased flooding frequency</li>
                  <li>• Higher storm surge levels</li>
                  <li>• More intense precipitation</li>
                  <li>• Rising sea levels</li>
                  <li>• Higher wind speeds</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  Secondary Impacts
                </h4>
                <ul className="space-y-1 text-red-600 dark:text-red-400 text-sm">
                  <li>• Accelerated corrosion</li>
                  <li>• Material degradation</li>
                  <li>• Ground instability</li>
                  <li>• Thermal expansion</li>
                  <li>• Drought-induced cracking</li>
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
            Flood-Resistant Foundation Design
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Flood-resistant foundations require innovative approaches to prevent water infiltration
            and maintain structural stability during flood events.
          </p>

          {/* Flood Resistant Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200 mb-3">
                  Advanced Flood Protection
                </h4>
                <p className="text-cyan-700 dark:text-cyan-300 leading-relaxed">
                  Modern flood-resistant design combines traditional engineering principles with
                  innovative materials and construction techniques to create infrastructure that can
                  withstand and adapt to changing flood patterns.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">
                  Flood Protection
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Elevated Foundation Systems
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Pile Foundations
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Deep pile systems extending below flood levels</li>
                <li>• Corrosion-resistant alloy materials</li>
                <li>• Advanced load distribution techniques</li>
                <li>• Enhanced scour protection with riprap and gabions</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Pier and Beam Systems
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Minimum 3-5 ft clearance above flood levels</li>
                <li>• Reinforced cross-bracing for lateral stability</li>
                <li>• Advanced ventilation systems to prevent moisture buildup</li>
                <li>• Regular inspection access points for maintenance</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Waterproofing and Drainage Strategies
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Effective waterproofing systems prevent water infiltration and minimize flood damage:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Advanced Membrane Systems:</strong> Multi-layer waterproof membranes with
                integrated drainage composites to manage hydrostatic pressure and prevent water
                infiltration through foundation walls.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Perimeter Drainage Networks:</strong> Engineered French drain systems that
                collect and redirect groundwater away from foundation structures using perforated
                pipes and gravel filtration.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Site Grading Optimization:</strong> Strategic landscaping with swales,
                retention basins, and proper drainage patterns to direct stormwater away from
                critical infrastructure components.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Earthquake-Resistant Structural Design
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Seismic resilience requires understanding dynamic loading characteristics and
            implementing appropriate structural systems.
          </p>

          {/* Earthquake Resistant Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
                  Seismic Engineering Excellence
                </h4>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  Modern seismic design incorporates advanced materials, innovative structural
                  systems, and performance-based engineering to create infrastructure that can
                  withstand major earthquakes with minimal damage.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-red-200 to-pink-300 dark:from-red-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-300 font-semibold">Seismic Design</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Ductile Design Principles
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
              Key Ductility Concepts
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Capacity Design
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Stronger elements protect weaker ones
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Energy Dissipation
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Plastic hinges absorb seismic energy
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Redundancy
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Multiple load paths prevent collapse
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Base Isolation Systems
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Base isolation technology decouples structures from ground motion, significantly
            reducing seismic forces:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Elastomeric Bearings:</strong> Rubber isolators that elongate the
                structure&apos;s natural period, reducing seismic forces by up to 80% while
                maintaining vertical load-carrying capacity.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Friction Pendulum Systems:</strong> Spherical sliding bearings that convert
                seismic energy into friction heat with minimal displacement and controlled damping
                characteristics.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Lead-Rubber Bearings:</strong> Combination of rubber elasticity and lead
                energy dissipation for enhanced performance in high seismic zones with superior
                hysteretic damping.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Sea-Level Rise Adaptation Strategies
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Coastal infrastructure must adapt to rising sea levels through a combination of
            structural and non-structural measures.
          </p>

          {/* Sea Level Rise Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-teal-200 to-green-300 dark:from-teal-800 dark:to-green-900 rounded-lg flex items-center justify-center">
                <span className="text-teal-600 dark:text-teal-300 font-semibold">
                  Sea Level Adaptation
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-3">
                  Coastal Infrastructure Resilience
                </h4>
                <p className="text-teal-700 dark:text-teal-300 leading-relaxed">
                  Sea-level rise adaptation requires integrated approaches combining structural
                  engineering, ecological restoration, and community planning to protect coastal
                  infrastructure from inundation and storm surge.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Adaptive Design Approaches
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Structural Solutions
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Elevated building platforms with adjustable systems</li>
                <li>• Floodable first floors with quick drainage</li>
                <li>• Amphibious foundations with flotation capability</li>
                <li>• Reinforced seawalls with wave attenuation</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Nature-Based Solutions
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Living shorelines with native vegetation</li>
                <li>• Mangrove restoration for natural barriers</li>
                <li>• Wetland preservation and creation</li>
                <li>• Dune stabilization with ecological methods</li>
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

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Sustainable Urban Planning for Resilience
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Infrastructure resilience extends beyond individual structures to comprehensive urban
            planning strategies.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Integrated Resilience Planning
          </h3>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-green-200/50 dark:border-green-800/50 mb-8">
            <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              Multi-Hazard Design Approach
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Layered Defense Systems:</strong> Multiple barriers against hazards rather
                  than single-point solutions.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Adaptive Capacity:</strong> Infrastructure designed to accommodate future
                  climate scenarios.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Recovery Planning:</strong> Rapid restoration strategies for post-event
                  functionality.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 mb-12">
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
              Implementation Framework
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              Building resilient infrastructure requires a systematic approach that integrates
              engineering expertise with environmental science, community needs, and economic
              considerations. The most successful projects combine technical innovation with
              stakeholder engagement and adaptive management strategies.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              As climate change continues to evolve, infrastructure resilience will become the
              defining characteristic of sustainable civil engineering practice, ensuring that our
              built environment can adapt and thrive in an uncertain future.
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
