import type { Metadata } from 'next'
import { AlertTriangle, Shield, Users, BookOpen, Scale, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer | Civil Calculation - Important Legal Notices & Limitations',
  description:
    'Important disclaimer for Civil Calculation services. Understand the limitations, liabilities, and proper use of our engineering tools.',
  keywords:
    'disclaimer, legal notice, liability limitation, civil calculation disclaimer, engineering disclaimer',
  alternates: { canonical: '/disclaimer' },
  openGraph: {
    title: 'Disclaimer | Civil Calculation',
    description:
      'Legal disclaimer and liability limitations for using Civil Calculation engineering tools.',
    type: 'website',
  },
}

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 font-display">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-amber-600" />
        <h1 className="mb-6 text-4xl font-bold text-heading dark:text-heading-dark md:text-5xl">
          Disclaimer
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
          Important legal notices and liability limitations for using Civil Calculation. Please read
          carefully before using our engineering tools and services.
        </p>
        <p className="mt-4 text-sm text-body/60 dark:text-body-dark/60">
          Last updated: February 15, 2025
        </p>
      </div>

      {/* Primary Disclaimer */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-red-50/50 to-orange-50/50 p-8 dark:border-slate-700/30 dark:from-red-900/20 dark:to-orange-900/20">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-8 w-8 text-red-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">
            Primary Disclaimer
          </h2>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed font-semibold text-red-800 dark:text-red-200">
            ⚠️ CRITICAL NOTICE: Civil Calculation tools are provided for educational and preliminary
            calculation purposes only. They are NOT substitutes for professional engineering
            judgment, expertise, or services. All results must be verified by qualified
            professionals before use in any construction project, structural design, or critical
            application.
          </p>
        </div>
      </div>

      {/* Professional Use Warning */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <Users className="h-8 w-8 text-orange-600" />
          Professional Use & Liability Limitations
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              🚫 Not Professional Engineering Services
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p>
                <strong>Civil Calculation is not a licensed engineering firm</strong> and does not
                provide professional engineering services, architectural services, or consulting.
                Our tools and content are for educational and informational purposes only.
              </p>
              <p>
                <strong>No Professional-Client Relationship:</strong> Using our services does not
                create any professional relationship between you and Civil Calculation, Pave
                Engineering Consultancy Pvt. Ltd., or any associated professionals.
              </p>
              <p>
                <strong>Independent Verification Required:</strong> All calculations, designs, and
                recommendations generated using our tools must be independently verified and
                approved by qualified, licensed professionals before implementation.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              ⚠️ Critical Safety & Compliance Warning
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p>
                <strong>Safety Critical Applications:</strong> Our tools should NEVER be used for
                applications where failure could result in personal injury, death, property damage,
                or environmental harm without independent professional verification.
              </p>
              <p>
                <strong>Regulatory Compliance:</strong> Results from our tools do not guarantee
                compliance with local building codes, zoning laws, safety standards, or other
                regulatory requirements. Always consult local authorities and licensed
                professionals.
              </p>
              <p>
                <strong>Risk Acknowledgment:</strong> By using Civil Calculation, you acknowledge
                and accept that you assume all risks associated with the use of our tools and
                content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy & Completeness */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-8 dark:border-slate-700/30 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="mb-6 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">
            Accuracy & Completeness Disclaimers
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              No Guarantee of Accuracy
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>
                While we strive for accuracy in our calculations and content,{' '}
                <strong>we cannot guarantee</strong> that all information, formulas, results, or
                data provided through Civil Calculation are completely accurate, current, complete,
                or error-free.
              </p>
              <p>
                <strong>Calculation Limitations:</strong> Our tools use standardized formulas and
                assumptions. Real-world conditions may vary significantly, requiring professional
                judgment and site-specific considerations.
              </p>
              <p>
                <strong>Content Updates:</strong> Engineering standards, codes, and best practices
                evolve over time. Our content may not reflect the most recent developments or local
                variations.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              User Responsibility for Verification
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>
                <strong>Independent Verification:</strong> Users are solely responsible for
                verifying all calculations, results, and recommendations against their specific
                project requirements, local codes, and professional standards.
              </p>
              <p>
                <strong>Professional Consultation:</strong> Always consult with qualified engineers,
                architects, or other professionals before making decisions based on our tool
                results.
              </p>
              <p>
                <strong>Due Diligence:</strong> Users must exercise their own judgment and perform
                appropriate due diligence before relying on any information from Civil Calculation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Limitation of Liability */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <Scale className="h-8 w-8 text-purple-600" />
          Limitation of Liability
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              &ldquo;As Is&rdquo; Service Provision
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Civil Calculation services are provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without any warranties, express or implied, including but not limited
              to warranties of merchantability, fitness for a particular purpose, accuracy,
              completeness, or non-infringement. We make no warranties regarding the operation of
              our services or the information, content, materials, or products included therein.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Damage Exclusions
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>
                <strong>No Liability for Damages:</strong> To the maximum extent permitted by law,
                Civil Calculation, its affiliates, officers, directors, employees, agents,
                suppliers, and licensors shall not be liable for any direct, indirect, incidental,
                special, consequential, or punitive damages arising from your use of our services.
              </p>
              <p>
                <strong>Damage Types Excluded:</strong> This includes but is not limited to damages
                for loss of profits, data, use, goodwill, business interruption, or other intangible
                losses, even if we have been advised of the possibility of such damages.
              </p>
              <p>
                <strong>Liability Cap:</strong> Our total liability shall not exceed the amount paid
                by you for accessing our services (currently $0.00) in the twelve months preceding
                any claim.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third-Party Content */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-8 dark:border-slate-700/30 dark:from-green-900/20 dark:to-emerald-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <Zap className="h-8 w-8 text-green-600" />
          Third-Party Content & Links
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            Civil Calculation may contain links to third-party websites, resources, or content.
            These links are provided for convenience only. We have no control over and assume no
            responsibility for the content, privacy policies, or practices of any third-party
            websites or services.
          </p>
          <p>
            <strong>No Endorsement:</strong> Inclusion of any link does not imply endorsement,
            sponsorship, or affiliation with the linked site. You access third-party sites at your
            own risk and should review their terms and privacy policies.
          </p>
          <p>
            <strong>External References:</strong> References to external standards, codes, or
            resources are for informational purposes only. We are not responsible for changes to
            external standards or the accuracy of third-party information.
          </p>
        </div>
      </div>

      {/* User Conduct & Responsibilities */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          User Conduct & Responsibilities
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            <strong>Appropriate Use:</strong> You agree to use Civil Calculation only for lawful
            purposes and in accordance with these disclaimers and our Terms & Conditions. You are
            responsible for ensuring your use complies with applicable laws and regulations.
          </p>
          <p>
            <strong>Professional Judgment:</strong> You acknowledge that engineering calculations
            require professional expertise and judgment. Our tools are not substitutes for qualified
            professional services and should not be used to circumvent professional requirements.
          </p>
          <p>
            <strong>Risk Assumption:</strong> By using our services, you assume all risks associated
            with their use, including but not limited to errors, omissions, or misapplications of
            the provided tools and information.
          </p>
        </div>
      </div>

      {/* Indemnification */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 p-8 dark:border-slate-700/30 dark:from-yellow-900/20 dark:to-amber-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Indemnification
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            You agree to indemnify, defend, and hold harmless Civil Calculation, Pave Engineering
            Consultancy Pvt. Ltd., and their respective officers, directors, employees, agents,
            suppliers, and licensors from and against all claims, demands, liabilities, damages,
            losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of
            or related to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your use or misuse of our services</li>
            <li>Your violation of these disclaimers or applicable laws</li>
            <li>Any content you submit or make available through our services</li>
            <li>Your reliance on our tools without professional verification</li>
            <li>Any claims related to project outcomes or decisions made using our tools</li>
          </ul>
        </div>
      </div>

      {/* Governing Law */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <Scale className="h-8 w-8 text-indigo-600" />
          Governing Law & Jurisdiction
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            These disclaimers shall be governed by and construed in accordance with the laws of
            Nepal, without regard to conflict of law principles. Any disputes arising from these
            disclaimers or your use of Civil Calculation shall be subject to the exclusive
            jurisdiction of the courts of Nepal.
          </p>
          <p>
            <strong>International Users:</strong> If you are accessing Civil Calculation from
            outside Nepal, you agree that these disclaimers and our Terms & Conditions are governed
            by Nepalese law and you submit to the jurisdiction of Nepalese courts.
          </p>
        </div>
      </div>

      {/* Updates to Disclaimer */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-8 dark:border-slate-700/30 dark:from-purple-900/20 dark:to-pink-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Updates to This Disclaimer
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            We reserve the right to modify or update this Disclaimer at any time. Material changes
            will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Your
            continued use of Civil Calculation after any changes indicates your acceptance of the
            updated Disclaimer.
          </p>
          <p>
            We encourage you to review this Disclaimer periodically to stay informed about any
            updates that may affect your use of our services.
          </p>
        </div>
      </div>

      {/* Acknowledgment */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-8 dark:border-slate-700/30">
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
            Acknowledgment of Understanding
          </h2>
          <div className="space-y-4 text-body/80 dark:text-body-dark/80">
            <p className="font-semibold text-lg">
              By using Civil Calculation, you acknowledge that you have read, understood, and agree
              to be bound by this comprehensive Disclaimer.
            </p>
            <p>
              You understand that our tools are for educational purposes only and that professional
              engineering judgment is always required for actual construction projects. You assume
              all responsibility for verifying results and ensuring compliance with applicable laws,
              codes, and standards.
            </p>
            <p className="font-medium text-amber-700 dark:text-amber-300">
              ⚠️ If you do not agree with these terms, please discontinue use of Civil Calculation
              immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-heading dark:text-heading-dark">
          Questions About This Disclaimer?
        </h2>
        <p className="mb-8 text-lg text-body/80 dark:text-body-dark/80">
          If you have any questions or concerns about this Disclaimer, please contact us:
        </p>
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                Legal Contact
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p>
                  <strong>Email:</strong> legal@civilcalculation.com
                </p>
                <p>
                  <strong>Subject:</strong> Disclaimer Inquiry
                </p>
                <p>
                  <strong>Response Time:</strong> Within 7 business days
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                General Support
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p>
                  <strong>Company:</strong> Pave Engineering Consultancy Pvt. Ltd.
                </p>
                <p>
                  <strong>Email:</strong> info@paveengineering.com
                </p>
                <p>
                  <strong>Website:</strong> www.paveengineering.com
                </p>
                <p>
                  <strong>Business Hours:</strong> Mon-Fri, 9 AM - 6 PM NPT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
