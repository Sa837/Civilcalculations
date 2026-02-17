import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function TransportationEngineeringBlog() {
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
              <span>Transportation Engineer</span>
            </div>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 rounded-full text-xs">
              Transportation Engineering
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Transportation Engineering: Modern Highway Design Standards
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Transportation engineering encompasses the design, construction, and operation of
            facilities for safe and efficient movement of people and goods. This comprehensive guide
            explores modern highway design standards, geometric principles, traffic engineering
            concepts, and emerging sustainable transportation solutions for creating infrastructure
            that meets current demands while anticipating future needs.
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
            Highway Classification and Design Standards
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Modern highway design follows comprehensive standards that balance safety, efficiency,
            environmental considerations, and economic factors.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Highway Design Excellence
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Transportation engineering integrates geometric design, traffic operations, and
                  safety principles to create highway systems that efficiently serve diverse
                  mobility needs while minimizing environmental impact.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-gray-200 to-slate-300 dark:from-gray-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-300 font-semibold">
                  Highway Design
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 p-6 rounded-xl border border-gray-200/50 dark:border-gray-800/50 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              AASHTO Highway Design Standards
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Functional Classification
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• Principal arterials</li>
                  <li>• Minor arterials</li>
                  <li>• Collectors</li>
                  <li>• Local roads</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Design Speed Categories
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• Rural: 50-80 km/h</li>
                  <li>• Urban: 30-60 km/h</li>
                  <li>• Freeway: 80-120 km/h</li>
                  <li>• Arterial: 50-80 km/h</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Lane Configurations
                </h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• Undivided: 2 lanes</li>
                  <li>• Divided: 4+ lanes</li>
                  <li>• Express lanes</li>
                  <li>• Managed lanes</li>
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
            Geometric Design Principles
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Highway geometric design ensures safe and efficient vehicle operation while
            accommodating driver expectations and vehicle characteristics.
          </p>

          {/* Geometric Design Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Geometric Design Fundamentals
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Geometric design integrates horizontal and vertical alignment with cross-section
                  elements to create safe, efficient, and cost-effective highway facilities that
                  meet user expectations.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Geometric Design
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Horizontal Alignment Design
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Curve Design Parameters
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>
                  <strong>Minimum Radius:</strong> V²/(127(e+f)) where V is design speed
                </li>
                <li>
                  <strong>Superelevation (e):</strong> 0.04-0.12 depending on climate
                </li>
                <li>
                  <strong>Side Friction (f):</strong> 0.10-0.15 for dry conditions
                </li>
                <li>
                  <strong>Transition Length:</strong> L = V²/(4.4a) for comfort
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Sight Distance Requirements
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>
                  <strong>Stopping Sight Distance:</strong> SSD = 0.278Vt + V²/(254(f±g))
                </li>
                <li>
                  <strong>Decision Sight Distance:</strong> DSD = SSD + maneuver distance
                </li>
                <li>
                  <strong>Passing Sight Distance:</strong> PSD = 2 × SSD for 2-lane highways
                </li>
                <li>
                  <strong>Intersection Sight Distance:</strong> ISD based on approach speed
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Vertical Alignment Considerations
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Grade Selection:</strong> Maximum grades of 3-5% for highways, 6-8% for
                urban arterials, considering vehicle performance and operating costs.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Vertical Curves:</strong> Crest and sag curves designed for driver comfort
                with minimum lengths L = A×V²/(395) for crest curves.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Profile Optimization:</strong> Balancing cut and fill volumes while
                maintaining drainage and minimizing environmental impact.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Traffic Flow Analysis and Capacity
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Understanding traffic flow characteristics is essential for designing highways that can
            accommodate current and future traffic demands.
          </p>

          {/* Traffic Flow Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Traffic Flow Analysis
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Capacity and Level of Service
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Traffic flow analysis predicts operational performance and identifies capacity
                  improvements needed to maintain acceptable level of service under varying demand
                  conditions.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Highway Capacity Analysis
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
              HCM Capacity Equations
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Basic Freeway Segments
                </h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  C = 2400 × PHF × N × fHV × fP
                </p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Weaving Segments
                </h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  C = VW / (V + W) × mainline capacity
                </p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Signalized Intersections
                </h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  C = 3600 × g/C × PHF × fLU × fLT × fRT
                </p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Roundabouts</h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  C = 1130 × e^(-0.002×v) × (1 + 0.5×L)
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Safety Engineering and Crash Analysis
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Transportation safety engineering focuses on identifying and mitigating crash risks
            through systematic analysis and design improvements.
          </p>

          {/* Safety Engineering Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
                  Transportation Safety Systems
                </h4>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  Safety engineering integrates crash data analysis, human factors research, and
                  geometric design principles to create transportation facilities that minimize
                  accident potential and severity.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-red-200 to-pink-300 dark:from-red-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-300 font-semibold">
                  Safety Engineering
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Road Safety Audit Process
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">Audit Stages</h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Preliminary design audit</li>
                <li>• Detailed design audit</li>
                <li>• Pre-opening safety audit</li>
                <li>• Post-implementation audit</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Safety Countermeasures
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Median barriers and guardrails</li>
                <li>• Shoulder rumble strips</li>
                <li>• Improved signage and markings</li>
                <li>• Intersection improvements</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Sustainable Transportation Solutions
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Modern transportation engineering embraces sustainability through multimodal solutions
            and environmental considerations.
          </p>

          {/* Sustainable Transport Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-emerald-200 to-teal-300 dark:from-emerald-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 dark:text-emerald-300 font-semibold">
                  Sustainable Transport
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-3">
                  Green Transportation Systems
                </h4>
                <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  Sustainable transportation integrates environmental stewardship with mobility
                  needs, creating systems that reduce carbon emissions while enhancing accessibility
                  and economic vitality.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Green Transportation Initiatives
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Complete Streets Design:</strong> Accommodating pedestrians, cyclists, and
                public transit alongside vehicular traffic for multimodal transportation.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Context Sensitive Solutions:</strong> Design that responds to community
                needs, environmental constraints, and aesthetic considerations.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Intelligent Transportation Systems:</strong> Adaptive traffic signals,
                congestion pricing, and real-time traveler information systems.
              </div>
            </li>
          </ul>

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
              Future of Transportation Engineering
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              The transportation engineering profession is evolving rapidly with emerging
              technologies like connected and autonomous vehicles, advanced traffic management
              systems, and integrated mobility solutions. Civil engineers must adapt to these
              changes while maintaining the fundamental principles of safety, efficiency, and
              sustainability that define our transportation infrastructure.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              The future of transportation systems lies in the seamless integration of traditional
              engineering principles with modern technologies, creating more resilient, efficient,
              and user-friendly mobility solutions for communities worldwide.
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
