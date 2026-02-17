import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function EnvironmentalEngineeringBlog() {
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
              <span>Environmental Engineering Specialist</span>
            </div>
            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full text-xs">
              Environmental Engineering
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Environmental Engineering: Remediation and Restoration Techniques
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Environmental engineering addresses the complex challenges of pollution control,
            resource protection, and ecosystem restoration. This comprehensive guide explores
            advanced remediation technologies, sustainable waste management strategies, and
            innovative approaches to environmental protection that balance human development with
            ecological preservation.
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
            Soil Contamination Remediation
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Soil remediation addresses contamination from industrial activities, agricultural
            chemicals, and urban pollution through targeted treatment and restoration strategies.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
                  Soil Remediation Technologies
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  Advanced soil remediation techniques combine physical, chemical, and biological
                  processes to restore contaminated sites to safe, productive conditions while
                  minimizing environmental impact.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-emerald-200 to-green-300 dark:from-emerald-800 dark:to-green-900 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 dark:text-emerald-300 font-semibold">
                  Soil Remediation
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-3">
              Primary Soil Contaminants
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                  Organic Compounds
                </h4>
                <ul className="space-y-1 text-emerald-600 dark:text-emerald-400 text-sm">
                  <li>• Petroleum hydrocarbons</li>
                  <li>• Polycyclic aromatic hydrocarbons (PAHs)</li>
                  <li>• Pesticides and herbicides</li>
                  <li>• Volatile organic compounds (VOCs)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                  Inorganic Contaminants
                </h4>
                <ul className="space-y-1 text-emerald-600 dark:text-emerald-400 text-sm">
                  <li>• Heavy metals (lead, mercury, cadmium)</li>
                  <li>• Radioactive materials</li>
                  <li>• Salts and chlorides</li>
                  <li>• Acid mine drainage</li>
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
            Groundwater Remediation Techniques
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Groundwater remediation requires sophisticated approaches to address contamination
            plumes and protect drinking water supplies.
          </p>

          {/* Groundwater Remediation Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Advanced Groundwater Treatment
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Groundwater remediation combines hydraulic control, contaminant removal, and
                  monitoring technologies to restore aquifer quality and prevent further
                  contamination spread.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Groundwater Remediation
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Pump and Treat Systems
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Extraction Methods
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Vertical extraction wells</li>
                <li>• Horizontal collection systems</li>
                <li>• Skimmer wells for floating contaminants</li>
                <li>• Recovery trenches and drains</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Treatment Technologies
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Activated carbon adsorption</li>
                <li>• Air stripping and vapor extraction</li>
                <li>• Chemical oxidation processes</li>
                <li>• Biological treatment systems</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Air Pollution Control Technologies
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Air pollution control engineering addresses industrial emissions, vehicle exhaust, and
            other sources of airborne contaminants.
          </p>

          {/* Air Pollution Control Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200 mb-3">
                  Emission Control Systems
                </h4>
                <p className="text-cyan-700 dark:text-cyan-300 leading-relaxed">
                  Advanced air pollution control technologies combine physical separation, chemical
                  reactions, and biological processes to capture and neutralize harmful emissions
                  from industrial and transportation sources.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-cyan-200 to-teal-300 dark:from-cyan-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">
                  Air Pollution Control
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Particulate Control Devices
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Cyclone Separators
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Centrifugal force separation for coarse particles
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Electrostatic Precipitators
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Electric charge collection for fine particles
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Fabric Filters
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Mechanical filtration through woven fabrics
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Gaseous Pollutant Control
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Scrubber Systems:</strong> Chemical absorption of acidic gases through
                alkaline solutions, effectively removing sulfur dioxide and hydrochloric acid from
                industrial flue gases.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Catalytic Converters:</strong> Oxidation and reduction reactions that
                convert harmful nitrogen oxides and hydrocarbons into harmless nitrogen, water, and
                carbon dioxide.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Activated Carbon Adsorption:</strong> Physical adsorption of volatile
                organic compounds and odors onto activated carbon surfaces for removal from air
                streams.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Waste Management and Treatment
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Comprehensive waste management encompasses collection, treatment, disposal, and resource
            recovery strategies for solid, liquid, and hazardous wastes.
          </p>

          {/* Waste Management Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-orange-200 to-red-300 dark:from-orange-800 dark:to-red-900 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-300 font-semibold">
                  Waste Management
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-3">
                  Integrated Waste Systems
                </h4>
                <p className="text-orange-700 dark:text-orange-300 leading-relaxed">
                  Modern waste management integrates prevention, recycling, treatment, and disposal
                  strategies to minimize environmental impact while maximizing resource recovery and
                  energy generation.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Hazardous Waste Treatment Technologies
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Physical Treatment
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Sedimentation and filtration</li>
                <li>• Adsorption and absorption</li>
                <li>• Distillation and evaporation</li>
                <li>• Solidification and stabilization</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Chemical Treatment
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Neutralization reactions</li>
                <li>• Oxidation and reduction</li>
                <li>• Precipitation processes</li>
                <li>• Ion exchange systems</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Ecosystem Restoration and Protection
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Ecosystem restoration combines ecological engineering with environmental monitoring to
            rehabilitate degraded landscapes and protect biodiversity.
          </p>

          {/* Ecosystem Restoration Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Ecological Engineering Solutions
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Ecosystem restoration integrates biological, chemical, and physical processes to
                  rehabilitate degraded environments and create sustainable habitats that support
                  native biodiversity and ecosystem services.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-800 dark:to-emerald-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Ecosystem Restoration
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Wetland Restoration Techniques
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Hydrologic Restoration:</strong> Reestablishment of natural water flow
                patterns through channel reconstruction, water control structures, and floodplain
                reconnection to support wetland vegetation and wildlife.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Soil Amendment:</strong> Strategic placement of organic matter and nutrients
                to restore soil structure and fertility, enabling native wetland plants to establish
                and thrive in degraded areas.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Native Plant Reintroduction:</strong> Careful selection and planting of
                indigenous wetland species to restore biodiversity, stabilize soils, and improve
                water quality through natural filtration processes.
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
              Sustainable Environmental Engineering Solutions
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              Environmental engineering represents the critical interface between human development
              and ecological preservation. As environmental challenges intensify due to climate
              change, population growth, and industrial expansion, environmental engineers must
              develop increasingly sophisticated solutions that protect ecosystems while supporting
              sustainable development.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              The integration of advanced technologies with traditional environmental engineering
              principles creates opportunities for innovative remediation strategies, efficient
              resource recovery systems, and proactive environmental protection measures that
              benefit both human communities and natural ecosystems.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Environmental engineers who embrace interdisciplinary approaches and cutting-edge
              technologies will lead the development of sustainable solutions that protect
              environmental quality while supporting economic growth and improving quality of life
              for current and future generations.
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
