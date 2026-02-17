import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function ConstructionTechnologyBlog() {
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
              <span>Construction Technology Expert</span>
            </div>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-xs">
              Construction Tech
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Construction Technology: Drones, Robotics, and Automation
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            The construction industry is undergoing a technological revolution. This comprehensive
            guide explores how drones, robotics, automation, and emerging technologies are
            transforming construction processes, improving safety, efficiency, and quality while
            reducing costs and environmental impact through innovative digital solutions and
            intelligent machinery.
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
            Drone Technology in Construction
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Drones have revolutionized surveying, monitoring, and inspection processes in
            construction, offering unprecedented efficiency and safety improvements.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                  Aerial Construction Intelligence
                </h3>
                <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                  Unmanned aerial vehicles equipped with advanced sensors and cameras provide
                  real-time construction site monitoring, precise surveying, and safety inspections
                  that were previously impossible or extremely costly to achieve.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-purple-200 to-indigo-300 dark:from-purple-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 font-semibold">
                  Drone Technology
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-purple-200/50 dark:border-purple-800/50 mb-8">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">
              Drone Applications in Construction
            </h3>
            <ul className="space-y-2 text-purple-700 dark:text-purple-300">
              <li>
                • <strong>Topographic Surveying:</strong> High-precision terrain mapping and volume
                calculations
              </li>
              <li>
                • <strong>Progress Monitoring:</strong> Real-time construction site documentation
                and reporting
              </li>
              <li>
                • <strong>Safety Inspections:</strong> Hard-to-reach areas assessment without worker
                exposure
              </li>
              <li>
                • <strong>Quality Control:</strong> Automated defect detection and dimensional
                verification
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
            Robotic Construction Equipment
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Robotic systems are automating repetitive and hazardous construction tasks, improving
            precision and worker safety.
          </p>

          {/* Robotic Equipment Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Automated Construction Machinery
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Computer-controlled machinery and robotic systems perform complex construction
                  tasks with millimeter precision, reducing human error and improving overall
                  project quality and safety standards.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-cyan-300 dark:from-blue-800 dark:to-cyan-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Robotic Equipment
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Automated Construction Machinery
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Excavation Robotics
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Autonomous excavators with GPS guidance</li>
                <li>• Laser-controlled grading systems</li>
                <li>• Precision trenching equipment</li>
                <li>• Hazardous material handling robots</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Concrete and Masonry
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Robotic bricklaying systems</li>
                <li>• Automated concrete pouring machines</li>
                <li>• 3D-printed concrete deposition</li>
                <li>• Intelligent formwork positioning</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            3D Printing and Additive Manufacturing
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            3D printing technology is revolutionizing construction by enabling complex geometries
            and reducing material waste.
          </p>

          {/* 3D Printing Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Additive Manufacturing Revolution
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Large-scale 3D printing systems can construct entire building components layer by
                  layer, creating complex architectural forms that would be impossible or
                  prohibitively expensive with traditional construction methods.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  3D Printing
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Construction 3D Printing Technologies
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Contour Crafting
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Layer-by-layer concrete deposition
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  D-Shape Printing
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Sand-based binder jetting
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Robotic Arm Systems
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Articulated deposition systems
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Material Innovations for 3D Printing
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Smart Concrete:</strong> Self-healing concrete mixtures with embedded
                sensors for structural health monitoring during and after construction.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Recycled Materials:</strong> Incorporating construction waste and industrial
                byproducts into printable mixtures, reducing environmental impact.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>High-Performance Composites:</strong> Fiber-reinforced materials with
                enhanced strength-to-weight ratios for specialized applications.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Building Information Modeling (BIM) Integration
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            BIM serves as the digital foundation for construction automation, enabling seamless
            integration of robotic systems and automated processes.
          </p>

          {/* BIM Integration Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-red-200 to-pink-300 dark:from-red-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-300 font-semibold">
                  BIM Integration
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
                  Digital Construction Workflow
                </h4>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  BIM platforms integrate design, fabrication, and construction data into unified
                  workflows, enabling automated quality control, progress monitoring, and predictive
                  maintenance throughout the building lifecycle.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Digital Construction Workflow
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Design to Fabrication
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Parametric modeling systems</li>
                <li>• Automated quantity takeoffs</li>
                <li>• Clash detection algorithms</li>
                <li>• Fabrication optimization</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">
                Construction Automation
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Robotic fabrication processes</li>
                <li>• Automated assembly systems</li>
                <li>• Real-time quality assurance</li>
                <li>• Progress monitoring dashboards</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Automated Quality Control Systems
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            AI-powered inspection systems provide real-time quality assessment, reducing defects and
            improving construction reliability.
          </p>

          {/* Quality Control Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                  Intelligent Quality Assurance
                </h4>
                <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  Machine learning algorithms and computer vision systems automatically detect
                  construction defects, dimensional inaccuracies, and safety violations, ensuring
                  consistent quality throughout the construction process.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-indigo-200 to-purple-300 dark:from-indigo-800 dark:to-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">
                  Quality Control
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Smart Inspection Technologies
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Computer Vision Systems:</strong> Machine learning algorithms automatically
                detect cracks, defects, and dimensional inaccuracies in real-time during
                construction.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Laser Scanning:</strong> High-precision dimensional verification and
                as-built documentation with automated comparison to design specifications.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>IoT Sensor Networks:</strong> Continuous monitoring of concrete curing,
                foundation settlement, and structural performance with automated alerts.
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
              The Digital Construction Revolution
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              Construction technology is not just about adopting new tools—it&apos;s about
              fundamentally transforming how we design, build, and maintain infrastructure. The
              integration of drones, robotics, automation, and AI will create safer, more efficient,
              and sustainable construction processes that meet the demands of the 21st century.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              As construction becomes increasingly automated and data-driven, civil engineers must
              develop new skills in digital technologies, programming, and system integration. The
              future workforce will consist of technology-savvy professionals who can leverage
              artificial intelligence, machine learning, and advanced robotics to deliver projects
              that exceed traditional performance benchmarks.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              The convergence of construction technology with traditional engineering expertise will
              create unprecedented opportunities for innovation, efficiency, and sustainability in
              the built environment. Civil engineers who embrace these technological advancements
              will lead the industry into a new era of smart, sustainable, and efficient
              construction practices.
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
