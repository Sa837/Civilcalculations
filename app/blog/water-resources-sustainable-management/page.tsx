import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function WaterResourcesBlog() {
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
              <span>Water Resources Engineer</span>
            </div>
            <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 rounded-full text-xs">
              Water Resources
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Water Resources Engineering: Sustainable Water Management
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Water resources engineering addresses the sustainable management, development, and
            protection of water resources. This comprehensive guide explores watershed planning,
            flood control strategies, groundwater management techniques, and innovative urban
            drainage solutions for sustainable water systems that balance human needs with
            environmental protection.
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
            Hydrologic Cycle and Water Balance
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Understanding the hydrologic cycle is fundamental to sustainable water resource
            management and engineering design.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200 mb-4">
                  Hydrologic Cycle Fundamentals
                </h3>
                <p className="text-cyan-700 dark:text-cyan-300 leading-relaxed">
                  The hydrologic cycle represents the continuous movement of water through
                  evaporation, condensation, precipitation, and runoff, forming the foundation for
                  water resource engineering and management.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">
                  Hydrologic Cycle
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-cyan-200/50 dark:border-cyan-800/50 mb-8">
            <h3 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200 mb-3">
              Water Balance Components
            </h3>
            <ul className="space-y-2 text-cyan-700 dark:text-cyan-300">
              <li>
                • <strong>Inputs:</strong> Precipitation (rainfall, snow), surface water inflow,
                groundwater recharge, imported water supplies
              </li>
              <li>
                • <strong>Outputs:</strong> Evaporation and transpiration, surface runoff,
                groundwater discharge, water consumption and export
              </li>
              <li>
                • <strong>Storage:</strong> Surface reservoirs, groundwater aquifers, soil moisture,
                atmospheric water vapor
              </li>
            </ul>
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
            Watershed Planning and Management
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Effective watershed management integrates land use planning, water quality protection,
            and flood risk reduction strategies.
          </p>

          {/* Watershed Planning Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Integrated Watershed Management
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Watershed planning considers the entire drainage basin as an interconnected
                  system, implementing coordinated strategies for water quality, flood control, and
                  ecosystem protection.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Watershed Planning
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Integrated Water Resources Management (IWRM)
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Key Principles
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Holistic approach to water management</li>
                <li>• Stakeholder participation</li>
                <li>• Gender equity and social inclusion</li>
                <li>• Economic efficiency</li>
                <li>• Environmental sustainability</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Implementation Tools
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Hydrologic modeling</li>
                <li>• Geographic information systems</li>
                <li>• Remote sensing technology</li>
                <li>• Participatory planning methods</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Flood Control and Risk Management
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Flood control engineering combines structural and non-structural measures to reduce
            flood risk and damage.
          </p>

          {/* Flood Control Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Comprehensive Flood Risk Management
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Flood control integrates engineering structures with land use planning, emergency
                  preparedness, and ecosystem restoration to create resilient communities capable of
                  withstanding flood events.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Flood Control
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Flood Frequency Analysis
          </h3>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-red-200/50 dark:border-red-800/50 mb-8">
            <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
              Return Period Calculations
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                  25-year Flood
                </div>
                <div className="text-xs text-red-700 dark:text-red-300">4% annual probability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                  100-year Flood
                </div>
                <div className="text-xs text-red-700 dark:text-red-300">1% annual probability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                  500-year Flood
                </div>
                <div className="text-xs text-red-700 dark:text-red-300">
                  0.2% annual probability
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Structural Flood Control Measures
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Levees and Floodwalls:</strong> Earthen or concrete barriers designed to
                contain floodwaters within specified heights and freeboard requirements.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Retention Basins:</strong> Engineered depressions that temporarily store
                floodwater and release it gradually to prevent downstream flooding.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Channel Improvements:</strong> River training works, bank stabilization, and
                floodplain management to increase conveyance capacity.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Groundwater Management
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Sustainable groundwater management requires understanding aquifer characteristics and
            implementing protective measures.
          </p>

          {/* Groundwater Management Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-indigo-200 to-purple-300 dark:from-indigo-800 dark:to-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">
                  Groundwater Management
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                  Aquifer Protection Strategies
                </h4>
                <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  Groundwater management involves careful monitoring, sustainable extraction, and
                  contamination prevention to ensure long-term availability of this critical
                  freshwater resource.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Aquifer Protection Strategies
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Recharge Enhancement
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Artificial recharge basins</li>
                <li>• Injection wells</li>
                <li>• Rainwater harvesting</li>
                <li>• Managed aquifer recharge</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Contamination Prevention
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Wellhead protection zones</li>
                <li>• Land use regulations</li>
                <li>• Underground storage tank monitoring</li>
                <li>• Agricultural runoff controls</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Sustainable Urban Drainage Systems (SUDS)
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            SUDS provide an integrated approach to managing urban stormwater while mimicking natural
            drainage processes.
          </p>

          {/* SUDS Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-3">
                  Natural Drainage Solutions
                </h4>
                <p className="text-teal-700 dark:text-teal-300 leading-relaxed">
                  Sustainable urban drainage systems integrate stormwater management with urban
                  design, creating multifunctional landscapes that reduce flood risk while enhancing
                  urban green spaces.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-teal-200 to-green-300 dark:from-teal-800 dark:to-green-900 rounded-lg flex items-center justify-center">
                <span className="text-teal-600 dark:text-teal-300 font-semibold">
                  SUDS Technology
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            SUDS Components and Functions
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Permeable Pavements:</strong> Allow rainwater to infiltrate through the
                surface, reducing runoff and replenishing groundwater.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Green Roofs:</strong> Vegetation-covered roofs that retain stormwater,
                provide insulation, and reduce urban heat island effects.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Bioretention Areas:</strong> Landscaped depressions with vegetation and
                engineered soil that filter and treat stormwater runoff.
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
              Water Resources Engineering for Sustainable Development
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              The future of water resources engineering lies in the integration of traditional
              hydrologic principles with emerging technologies and sustainable management practices.
              Climate change adaptation, water quality protection, and equitable distribution of
              water resources will define the profession in the coming decades.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Civil engineers specializing in water resources must balance technical expertise with
              environmental stewardship, social equity, and economic considerations to create
              resilient water systems that serve current and future generations.
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
