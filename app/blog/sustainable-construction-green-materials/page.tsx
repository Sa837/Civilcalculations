import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function SustainableConstructionBlog() {
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
              <span>22 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Civil Engineering Expert</span>
            </div>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs">
              Sustainable Engineering
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Sustainable Construction: Revolutionizing Green Building Materials
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            The construction industry is undergoing a profound transformation as architects,
            engineers, and builders embrace eco-friendly alternatives to traditional materials. This
            comprehensive guide explores revolutionary green building materials that are reshaping
            modern construction practices, offering detailed technical specifications, environmental
            impact assessments, and practical implementation strategies for sustainable development.
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
            The Environmental Imperative
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Traditional construction materials like concrete, steel, and timber contribute
            significantly to global carbon emissions. The cement industry alone accounts for
            approximately 8% of global CO₂ emissions. Sustainable building materials offer a pathway
            to reduce this environmental impact while maintaining structural integrity and aesthetic
            appeal.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4">
                  Green Building Revolution
                </h3>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  The shift to sustainable materials represents a fundamental change in how we
                  approach construction, balancing environmental responsibility with technological
                  innovation and economic viability.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-800 dark:to-emerald-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Eco Materials
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200/50 dark:border-green-800/50 mb-8">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
              Key Environmental Benefits
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-300">
              <li>
                • <strong>Reduced Carbon Footprint:</strong> Up to 70% lower embodied carbon
                compared to traditional materials
              </li>
              <li>
                • <strong>Renewable Resources:</strong> Fast-growing, replenishable materials that
                sequester CO₂
              </li>
              <li>
                • <strong>Energy Efficiency:</strong> Better thermal performance reduces operational
                energy consumption
              </li>
              <li>
                • <strong>Circular Economy:</strong> Recyclable and reusable materials extend
                product lifecycle
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
            Bamboo: Nature&apos;s High-Performance Material
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Bamboo has emerged as a remarkable sustainable alternative to traditional timber. This
            fast-growing grass offers exceptional strength-to-weight ratios and remarkable
            sustainability credentials.
          </p>

          {/* Bamboo Image Section */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
                  Bamboo Structural Applications
                </h4>
                <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                  Modern engineering techniques have transformed bamboo from traditional building
                  material to high-performance structural component, capable of withstanding
                  significant loads while maintaining environmental benefits.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-amber-200 to-yellow-300 dark:from-amber-800 dark:to-yellow-900 rounded-lg flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-300 font-semibold">
                  Bamboo Construction
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Structural Properties
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Mechanical Properties
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>
                  <strong>Tensile Strength:</strong> 150-400 MPa
                </li>
                <li>
                  <strong>Compressive Strength:</strong> 40-80 MPa
                </li>
                <li>
                  <strong>Modulus of Elasticity:</strong> 10-30 GPa
                </li>
                <li>
                  <strong>Density:</strong> 600-800 kg/m³
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Growth Characteristics
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>
                  <strong>Growth Rate:</strong> Up to 1 meter per day
                </li>
                <li>
                  <strong>Harvest Cycle:</strong> 3-5 years
                </li>
                <li>
                  <strong>CO₂ Sequestration:</strong> 1 ton per hectare annually
                </li>
                <li>
                  <strong>Yield:</strong> 20-40 tons per hectare
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Applications in Modern Construction
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Bamboo&apos;s versatility extends beyond traditional uses. Modern engineering techniques
            have unlocked its potential for structural applications:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Structural Framing:</strong> Engineered bamboo composites provide strength
                comparable to steel at a fraction of the environmental cost.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Bridge Construction:</strong> Bamboo bridges in developing countries
                demonstrate its potential for infrastructure applications.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Seismic-Resistant Structures:</strong> Bamboo&apos;s flexibility provides
                excellent earthquake resistance in seismic zones.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Hempcrete: Living Buildings Technology
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Hempcrete represents one of the most innovative developments in sustainable building
            materials. This bio-composite combines industrial hemp hurds with lime-based binders to
            create a living, breathing wall system.
          </p>

          {/* Hempcrete Image Section */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Hempcrete Innovation
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Bio-Based Building Material
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Hempcrete&apos;s unique properties make it ideal for sustainable construction,
                  offering thermal mass, moisture regulation, and carbon sequestration in a single
                  material solution.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
              Hempcrete Advantages
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Carbon Negative
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  Sequesters CO₂ during growth and curing
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Thermal Mass
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  Excellent heat storage and natural regulation
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Breathable
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  Regulates humidity and prevents mold growth
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Cross-Laminated Timber (CLT): The Future of High-Rise Construction
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            CLT represents a paradigm shift in construction methodology, enabling high-rise
            buildings constructed entirely from engineered wood products. This innovation challenges
            traditional notions of what materials can achieve in tall building construction.
          </p>

          {/* CLT Image Section */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
                  Mass Timber Revolution
                </h4>
                <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                  CLT technology enables the construction of sustainable high-rise buildings,
                  combining the strength of traditional timber with modern engineering precision and
                  fire safety standards.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900 rounded-lg flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-300 font-semibold">
                  CLT Construction
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Structural Performance
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            CLT panels offer remarkable structural properties that rival traditional materials:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Fire Resistance:</strong> CLT maintains structural integrity for up to 2
                hours in fire conditions, exceeding many concrete requirements.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Seismic Performance:</strong> Ductility and energy absorption properties
                provide excellent earthquake resistance.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Construction Speed:</strong> Prefabricated panels reduce construction time
                by up to 40% compared to traditional methods.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Implementation Challenges and Solutions
          </h2>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200/50 dark:border-amber-800/50 mb-8">
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
              Addressing Common Concerns
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Moisture Management
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Advanced sealing techniques and proper installation protocols ensure long-term
                  performance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Durability Standards
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Engineered wood products undergo rigorous testing and meet or exceed traditional
                  building standards.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Regulatory Framework
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Building codes are rapidly evolving to accommodate these innovative materials.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Economic Considerations and Market Trends
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            While initial costs may be higher for sustainable materials, long-term benefits often
            outweigh upfront expenses. Governments worldwide are implementing incentives to
            accelerate adoption:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Tax Incentives:</strong> Green building certifications offer tax credits and
                reduced financing rates.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Energy Savings:</strong> Superior insulation properties reduce lifetime
                operational costs by 30-50%.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Market Demand:</strong> Growing consumer preference for sustainable
                construction drives market growth.
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
              The Path Forward
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              The transition to sustainable building materials represents more than environmental
              stewardship—it&apos;s an opportunity to redefine construction excellence. As these
              materials mature and building codes evolve, we can expect to see unprecedented
              innovation in architectural design and construction methodology.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              Civil engineers and architects are uniquely positioned to lead this transformation,
              leveraging their expertise to create buildings that are not only functional and
              beautiful, but also beneficial to our planet and its inhabitants. The future of
              construction lies in the harmonious integration of human ingenuity with natural
              systems, creating sustainable built environments that enhance rather than diminish our
              ecological heritage.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              By embracing sustainable materials and innovative construction techniques, we can
              build a future where environmental responsibility and architectural excellence go hand
              in hand, ensuring that our built environment contributes positively to the health and
              well-being of current and future generations.
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
