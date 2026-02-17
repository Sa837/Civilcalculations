import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export default function ProjectManagementBlog() {
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
              <span>Construction Project Manager</span>
            </div>
            <span className="px-2 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 rounded-full text-xs">
              Project Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Project Management: Lean Construction and Agile Methodologies
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            Modern construction project management requires innovative approaches to deliver
            projects efficiently, on time, and within budget. This comprehensive guide explores lean
            construction principles, agile methodologies, collaborative planning techniques, and
            continuous improvement strategies that transform traditional construction management
            into a dynamic, value-driven process that maximizes stakeholder satisfaction and project
            success.
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
            Lean Construction Principles
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            Lean construction focuses on maximizing value while minimizing waste through systematic
            process improvement and collaborative work practices.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-rose-800 dark:text-rose-200 mb-4">
                  Lean Construction Excellence
                </h3>
                <p className="text-rose-700 dark:text-rose-300 leading-relaxed">
                  Lean construction integrates manufacturing efficiency principles with construction
                  management to eliminate waste, optimize workflows, and deliver maximum value to
                  project stakeholders through systematic process improvement.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-rose-200 to-pink-300 dark:from-rose-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-rose-600 dark:text-rose-300 font-semibold">
                  Lean Construction
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-rose-200/50 dark:border-rose-800/50 mb-8">
            <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-3">
              Core Lean Principles in Construction
            </h3>
            <ul className="space-y-2 text-rose-700 dark:text-rose-300">
              <li>
                • <strong>Value Definition:</strong> Identify what the customer truly values and
                focus resources on delivering it
              </li>
              <li>
                • <strong>Waste Elimination:</strong> Remove non-value-adding activities from the
                construction process
              </li>
              <li>
                • <strong>Value Stream Mapping:</strong> Analyze and optimize the flow of materials
                and information
              </li>
              <li>
                • <strong>Flow Optimization:</strong> Ensure smooth, uninterrupted work progression
              </li>
              <li>
                • <strong>Pull Planning:</strong> Let customer demand drive the work schedule
              </li>
              <li>
                • <strong>Continuous Improvement:</strong> Implement systematic process enhancement
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
            Agile Methodologies in Construction
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Agile approaches bring flexibility and adaptability to construction project management,
            enabling teams to respond effectively to changing conditions and requirements.
          </p>

          {/* Agile Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-semibold text-violet-800 dark:text-violet-200 mb-3">
                  Agile Construction Management
                </h4>
                <p className="text-violet-700 dark:text-violet-300 leading-relaxed">
                  Agile methodologies adapt software development principles to construction,
                  enabling iterative planning, collaborative decision-making, and rapid response to
                  project changes and stakeholder feedback.
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-violet-200 to-purple-300 dark:from-violet-800 dark:to-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-violet-600 dark:text-violet-300 font-semibold">
                  Agile Methods
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Scrum Framework for Construction
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Cloud-Based Collaboration:</strong> Real-time document sharing, version
                control, and multi-party editing capabilities eliminate communication delays and
                reduce errors.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>IoT-Enabled Monitoring:</strong> Sensor networks track equipment
                utilization, material delivery, and construction progress for predictive scheduling
                and quality assurance.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Artificial Intelligence:</strong> Machine learning algorithms analyze
                historical data to predict project outcomes, optimize resource allocation, and
                identify potential risks.
              </div>
            </li>
          </ul>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 mb-12">
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
              Future of Construction Project Management
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed mb-4">
              Construction project management is evolving from traditional command-and-control
              approaches to collaborative, data-driven methodologies that emphasize value creation
              and continuous improvement. The integration of lean principles, agile practices, and
              digital technologies will define the next generation of project delivery excellence.
            </p>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Successful project managers will need to master both technical skills and
              interpersonal abilities, creating high-performing teams that deliver exceptional
              results while adapting to changing project conditions and stakeholder expectations.
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
