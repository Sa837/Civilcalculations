import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export const metadata: Metadata = {
  title: 'Smart Cities: IoT Integration in Urban Infrastructure | Civil Engineering',
  description:
    'The intersection of IoT and urban planning. Explore smart sensors, data analytics, traffic management systems, energy-efficient infrastructure, and modern smart city development technologies.',
  keywords:
    'smart cities IoT, urban infrastructure, smart sensors, data analytics, traffic management, energy efficiency, intelligent transportation systems, urban planning',
  openGraph: {
    title: 'Smart Cities: IoT Integration in Urban Infrastructure',
    description:
      'Explore how IoT technology is transforming urban infrastructure and smart city development.',
    type: 'article',
  },
}

export default function SmartCitiesBlog() {
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
              <span>Urban Infrastructure Expert</span>
            </div>
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full text-xs">
              Smart Infrastructure
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Smart Cities: IoT Integration in Urban Infrastructure
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            The convergence of Internet of Things (IoT) technology and urban planning is creating
            intelligent cities that can adapt to citizens&apos; needs. This comprehensive guide
            examines how smart infrastructure transforms urban environments through data-driven
            decision making and automated systems, exploring the technologies, challenges, and
            benefits of IoT integration in modern urban development.
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
            IoT Sensor Networks in Urban Environments
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            IoT sensors form the nervous system of smart cities, collecting real-time data from
            infrastructure, transportation systems, and public spaces to enable intelligent
            decision-making.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">
                  IoT City Infrastructure
                </h3>
                <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  Smart cities leverage interconnected sensor networks to monitor environmental
                  conditions, traffic patterns, and infrastructure performance, creating responsive
                  urban ecosystems that adapt to changing needs and conditions.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-indigo-200 to-purple-300 dark:from-indigo-800 dark:to-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">
                  IoT Sensors
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50 mb-8">
            <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
              Smart City Sensor Categories
            </h3>
            <ul className="space-y-2 text-indigo-700 dark:text-indigo-300">
              <li>
                • <strong>Environmental Sensors:</strong> Air quality, noise levels, weather
                conditions, water quality
              </li>
              <li>
                • <strong>Traffic Sensors:</strong> Vehicle counts, speed monitoring, parking
                availability, pedestrian flow
              </li>
              <li>
                • <strong>Infrastructure Sensors:</strong> Structural health, energy consumption,
                waste levels, lighting conditions
              </li>
              <li>
                • <strong>Public Safety Sensors:</strong> Emergency detection, crowd monitoring,
                security surveillance
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
            Intelligent Transportation Systems
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Smart transportation networks reduce congestion, improve safety, and optimize energy
            usage through real-time data and adaptive controls.
          </p>

          {/* ITS Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Intelligent Transportation
                </h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  Advanced transportation systems use real-time data analytics and adaptive controls
                  to optimize traffic flow, reduce congestion, and improve safety through predictive
                  traffic management and automated incident response.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-cyan-300 dark:from-blue-800 dark:to-cyan-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  Smart Transportation
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Adaptive Traffic Management
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Traffic Flow Optimization
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Dynamic signal timing</li>
                <li>• Route optimization</li>
                <li>• Congestion prediction</li>
                <li>• Incident detection</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-3">
                Smart Parking Systems
              </h4>
              <ul className="space-y-2 text-body dark:text-body-dark text-sm">
                <li>• Real-time availability</li>
                <li>• Reservation systems</li>
                <li>• Guided parking</li>
                <li>• Demand-based pricing</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Energy-Efficient Infrastructure
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Smart energy systems optimize consumption and integrate renewable sources through
            intelligent monitoring and control.
          </p>

          {/* Energy Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Smart Energy Systems
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Intelligent energy infrastructure integrates renewable sources with smart grids,
                  enabling real-time optimization of energy consumption and distribution for maximum
                  efficiency and sustainability.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Smart Energy
                </span>
              </div>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Smart Lighting Networks:</strong> LED systems with motion sensors and
                daylight harvesting reduce energy consumption by 60-80% while improving public
                safety through adaptive illumination.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Building Energy Management:</strong> Integrated systems monitor HVAC,
                lighting, and equipment to optimize energy usage and reduce operational costs by
                20-30%.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Renewable Integration:</strong> Smart grids balance solar, wind, and
                traditional power sources to maximize renewable energy utilization and grid
                stability.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Data Analytics and Decision Support
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Big data analytics transform sensor data into actionable insights for urban planning and
            resource allocation.
          </p>

          {/* Analytics Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 font-semibold">
                  Data Analytics
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  Smart City Intelligence
                </h4>
                <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                  Advanced analytics platforms process millions of data points from IoT sensors to
                  provide actionable insights for city managers, enabling predictive maintenance and
                  optimized resource allocation.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Predictive Analytics Applications
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Maintenance Prediction
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Preventive maintenance scheduling
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Demand Forecasting
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Resource allocation optimization
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Emergency Response
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Rapid incident detection and response
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Cybersecurity and Data Privacy
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Protecting smart city infrastructure requires robust cybersecurity measures and
            privacy-preserving data management.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200/50 dark:border-amber-800/50 mb-8">
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
              Critical Security Considerations
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Network Security
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Encrypted communications, secure protocols, and intrusion detection systems
                  protect IoT networks from cyber threats.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">Data Privacy</h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  GDPR compliance, anonymization techniques, and citizen consent mechanisms ensure
                  personal data protection.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300">
                  Physical Security
                </h4>
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  Tamper-resistant sensor housings and secure installation practices prevent
                  physical attacks on infrastructure.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Implementation Challenges and Solutions
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Deploying smart city infrastructure requires careful planning and stakeholder
            coordination to overcome technical and organizational challenges.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Integration Strategies
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Legacy System Integration:</strong> Developing APIs and middleware to
                connect existing infrastructure with new IoT systems without requiring complete
                replacement.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Scalable Architecture:</strong> Designing systems that can grow from pilot
                deployments to city-wide implementations through modular, standards-based
                approaches.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Stakeholder Collaboration:</strong> Multi-agency coordination frameworks
                that align municipal, private sector, and community interests in smart city
                development.
              </div>
            </li>
          </ul>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 mb-12">
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
              The Future of Urban Infrastructure
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              Smart cities represent the convergence of civil engineering, information technology,
              and urban planning. As IoT technology matures and artificial intelligence capabilities
              expand, cities will become increasingly responsive to citizen needs and environmental
              challenges.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Civil engineers play a pivotal role in this transformation, designing infrastructure
              that not only serves immediate needs but also adapts to future demands through
              embedded intelligence and data-driven optimization.
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
