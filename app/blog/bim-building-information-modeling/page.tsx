import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export const metadata: Metadata = {
  title: 'BIM Implementation: Building Information Modeling Excellence | Civil Engineering',
  description:
    'Complete BIM implementation guide for construction projects. Learn 3D modeling, clash detection, quantity takeoffs, collaborative workflows, and project lifecycle management using Building Information Modeling.',
  keywords:
    'BIM implementation, building information modeling, 3D modeling, clash detection, collaborative workflows, quantity takeoffs, construction technology, project lifecycle management',
  openGraph: {
    title: 'BIM Implementation: Building Information Modeling Excellence',
    description:
      'Complete guide to implementing Building Information Modeling for enhanced construction project outcomes.',
    type: 'article',
  },
}

export default function BIMImplementationBlog() {
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
              <span>24 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Digital Construction Expert</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            BIM Implementation: Building Information Modeling Excellence
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Building Information Modeling (BIM) represents the digital transformation of
            construction. This comprehensive guide explores BIM implementation strategies, best
            practices, and the technologies that are revolutionizing how we design, build, and
            manage infrastructure projects, providing detailed methodologies for successful adoption
            and optimization across the entire project lifecycle.
          </p>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="w-full py-6 bg-surface dark:bg-surface-dark border-b border-slate-200/20 dark:border-slate-800/20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="min-h-[90px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
            <AdSenseAd
              slot="9285440299"
              format="auto"
              style={{ minHeight: '90px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Understanding BIM Fundamentals
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            BIM transcends traditional 2D drafting by creating intelligent, data-rich 3D models that
            contain comprehensive information about every aspect of a building or infrastructure
            project throughout its lifecycle.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                  BIM Digital Revolution
                </h3>
                <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                  Building Information Modeling represents a fundamental shift from traditional
                  construction documentation to intelligent, data-driven project delivery systems
                  that enhance collaboration and decision-making throughout the entire building
                  lifecycle.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-purple-200 to-indigo-300 dark:from-purple-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 font-semibold">
                  BIM Technology
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-purple-200/50 dark:border-purple-800/50 mb-8">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">
              BIM Core Capabilities
            </h3>
            <ul className="space-y-2 text-purple-700 dark:text-purple-300">
              <li>
                • <strong>Intelligent Modeling:</strong> AI-assisted parametric modeling for
                complextric relationships
              </li>
              <li>
                • <strong>Data Integration:</strong> Centralized information management across
                disciplines
              </li>
              <li>
                • <strong>Visualization:</strong> Multi-dimensional representation (3D, 4D, 5D, 6D)
              </li>
              <li>
                • <strong>Collaboration:</strong> Real-time multi-stakeholder coordination
              </li>
              <li>
                • <strong>Analysis:</strong> Performance simulation and optimization
              </li>
              <li>
                • <strong>Lifecycle Management:</strong> From design through decommissioning
              </li>
            </ul>
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
            BIM Maturity Levels
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            BIM implementation follows a progressive maturity model that defines organizational
            capability and process sophistication.
          </p>

          {/* BIM Maturity Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  BIM Evolution Path
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Organizations progress through BIM maturity levels, starting from basic 3D
                  visualization to integrated project delivery systems that transform how
                  construction projects are planned, executed, and maintained.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-cyan-300 dark:from-blue-800 dark:to-cyan-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">BIM Maturity</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-2">
                Level 0
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300 mb-2">Unmanaged CAD</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                2D drawings, paper-based
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-2">
                Level 1
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300 mb-2">Managed CAD</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Electronic file management
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                Level 2
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">Collaborative</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                3D models, data sharing
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                Level 3
              </div>
              <div className="text-sm text-green-700 dark:text-green-300 mb-2">Integrated</div>
              <div className="text-xs text-green-600 dark:text-green-400">Single shared model</div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            3D Modeling Fundamentals
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Effective 3D modeling forms the foundation of successful BIM implementation.
            Understanding geometric and parametric modeling principles is essential.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Parametric Modeling Techniques
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Geometric Parameters
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Dimensions and coordinates</li>
                <li>• Shape and form definitions</li>
                <li>• Material assignments</li>
                <li>• Geometric relationships</li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Behavioral Parameters
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Load-bearing capacity</li>
                <li>• Thermal properties</li>
                <li>• Cost information</li>
                <li>• Maintenance schedules</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Clash Detection and Coordination
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Clash detection represents one of BIM&apos;s most powerful capabilities, enabling
            proactive conflict resolution before construction begins.
          </p>

          {/* Clash Detection Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
                  Proactive Conflict Resolution
                </h4>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  Automated clash detection identifies potential conflicts between building systems
                  before they become costly construction problems, enabling coordinated design and
                  reducing change orders by up to 40%.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-red-200 to-orange-300 dark:from-red-800 dark:to-orange-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-300 font-semibold">
                  Clash Detection
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Types of Clashes
          </h3>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-red-200/50 dark:border-red-800/50 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Hard Clashes</h4>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  Physical interference between elements
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  Soft Clashes
                </h4>
                <p className="text-orange-600 dark:text-orange-400 text-sm">
                  Clearance violations or proximity issues
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                  Workflow Clashes
                </h4>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Process conflicts or sequencing issues
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Automated Coordination Workflows
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Modern BIM platforms offer sophisticated coordination tools that streamline
            multidisciplinary collaboration:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Real-time Synchronization:</strong> Cloud-based model sharing with automatic
                conflict detection and notification systems eliminate communication delays and
                reduce errors.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Rule-Based Validation:</strong> Automated checking against design standards,
                building codes, and project requirements ensures compliance and quality.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Change Tracking:</strong> Comprehensive audit trails documenting design
                iterations and decision rationale maintain project transparency.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Quantity Takeoffs and Cost Estimation
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            BIM enables accurate quantity extraction and cost estimation through intelligent model
            interrogation, replacing manual measurement processes.
          </p>

          {/* Quantity Takeoff Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Quantity Takeoff
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Automated Quantification
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  BIM&apos;s parametric modeling enables automatic quantity extraction and cost
                  estimation, providing accurate material takeoffs and cost projections that update
                  in real-time as the design evolves.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Automated Quantification Methods
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Material Quantities
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Volume calculations</li>
                <li>• Surface area measurements</li>
                <li>• Linear measurements</li>
                <li>• Count-based quantities</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Cost Integration
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Unit cost databases</li>
                <li>• Assembly costing</li>
                <li>• Value engineering</li>
                <li>• Budget tracking</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Collaborative Workflows
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            BIM fundamentally transforms project delivery through enhanced collaboration and
            information sharing across all stakeholders.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Common Data Environment (CDE)
          </h3>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-green-200/50 dark:border-green-800/50 mb-8">
            <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              CDE Implementation Benefits
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">
                  Version Control
                </h5>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Single source of truth for all project information
                </p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">
                  Access Control
                </h5>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Role-based permissions and security protocols
                </p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Audit Trail</h5>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Complete documentation of changes and approvals
                </p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">
                  Workflow Automation
                </h5>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Automated notifications and task assignments
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            BIM Standards and Protocols
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Successful BIM implementation requires adherence to established standards and protocols
            that ensure interoperability and quality.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Industry Standards
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>ISO 19650:</strong> International standard for information management using
                building information modeling, providing framework for digital project delivery.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>PAS 1192:</strong> Publicly available specification for BIM standards in the
                UK, influencing global BIM practices and certification requirements.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>COBie:</strong> Construction Operations Building Information Exchange
                standard for facility management handover and operations data.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Implementation Challenges and Solutions
          </h2>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200/50 dark:border-amber-800/50 mb-8">
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
              Overcoming Common Barriers
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Technology Integration
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Invest in interoperable platforms and provide comprehensive training programs for
                  all stakeholders.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Process Transformation
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Develop clear BIM execution plans with defined roles, responsibilities, and
                  communication protocols.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Cultural Change
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Foster collaborative culture through leadership commitment and incentive
                  structures aligned with BIM goals.
                </p>
              </div>
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
              The Future of BIM
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              BIM continues to evolve with emerging technologies like artificial intelligence,
              machine learning, and digital twins. The integration of BIM with Internet of Things
              (IoT) sensors and advanced analytics promises unprecedented insights into building
              performance and lifecycle management.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              As BIM becomes the standard for construction project delivery, organizations that
              invest in comprehensive BIM implementation will gain significant competitive
              advantages through improved efficiency, reduced costs, and enhanced project outcomes.
              The digital transformation of construction is not just about adopting new
              tools—it&apos;s about fundamentally changing how we think about building design,
              construction, and facility management.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Civil engineers who master BIM implementation will be positioned at the forefront of
              the construction industry&apos;s digital transformation, driving innovation and
              delivering projects that exceed traditional performance benchmarks while meeting the
              evolving demands of clients and regulatory requirements.
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
