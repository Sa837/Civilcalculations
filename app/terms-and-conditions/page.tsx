import type { Metadata } from 'next'
import { FileText, Scale, AlertCircle, Users, Shield, Gavel } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Civil Calculation - Service Agreement & User Guidelines',
  description:
    'Comprehensive terms and conditions for using Civil Calculation. Learn about your rights, responsibilities, and our service agreements.',
  keywords:
    'terms and conditions, service agreement, user guidelines, civil calculation terms, legal agreement',
  alternates: { canonical: '/terms-and-conditions' },
  openGraph: {
    title: 'Terms & Conditions | Civil Calculation',
    description:
      'Legal terms and conditions governing the use of Civil Calculation services and tools.',
    type: 'website',
  },
}

export default function TermsConditionsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 font-display">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Gavel className="mx-auto mb-6 h-16 w-16 text-blue-600" />
        <h1 className="mb-6 text-4xl font-bold text-heading dark:text-heading-dark md:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
          These terms and conditions govern your use of Civil Calculation and outline the rules for
          accessing and using our engineering calculation tools and services.
        </p>
        <p className="mt-4 text-sm text-body/60 dark:text-body-dark/60">
          Last updated: February 15, 2025
        </p>
      </div>

      {/* Agreement Overview */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-8 dark:border-slate-700/30 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="mb-6 flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">
            Agreement Overview
          </h2>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed">
            Welcome to Civil Calculation (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            These Terms & Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement
            between you and Pave Engineering Consultancy Pvt. Ltd. (&ldquo;Company&rdquo;) governing
            your access to and use of our website, mobile applications, and engineering calculation
            services.
          </p>
          <p className="leading-relaxed">
            By accessing or using Civil Calculation, you acknowledge that you have read, understood,
            and agree to be bound by these Terms. If you do not agree to these Terms, please do not
            use our services.
          </p>
        </div>
      </div>

      {/* Service Description */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <Scale className="h-8 w-8 text-green-600" />
          Service Description
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              What We Provide
            </h3>
            <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
              <li>• Professional engineering calculation tools</li>
              <li>• Educational content and guides</li>
              <li>• Technical documentation and resources</li>
              <li>• Free access to all tools and services</li>
              <li>• Community support and assistance</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Service Limitations
            </h3>
            <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
              <li>• Tools are for educational and informational purposes</li>
              <li>• Not a substitute for professional engineering judgment</li>
              <li>• Results should be verified by qualified professionals</li>
              <li>• Services provided &ldquo;as is&rdquo; without warranties</li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Eligibility */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-8 dark:border-slate-700/30 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="mb-6 flex items-center gap-3">
          <Users className="h-8 w-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">
            User Eligibility & Registration
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Who Can Use Our Services
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>
                • <strong>Age Requirement:</strong> You must be at least 13 years old to use our
                services.
              </p>
              <p>
                • <strong>Legal Capacity:</strong> You must have the legal capacity to enter into
                binding agreements.
              </p>
              <p>
                • <strong>Professional Users:</strong> Architects, engineers, contractors, students,
                and construction professionals.
              </p>
              <p>
                • <strong>Educational Users:</strong> Students, educators, and researchers in civil
                engineering fields.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Account Registration (Future Feature)
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              While we currently offer services without mandatory registration, we may introduce
              user accounts in the future. If you choose to register, you agree to provide accurate
              and complete information and maintain the confidentiality of your account credentials.
            </p>
          </div>
        </div>
      </div>

      {/* Acceptable Use */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-green-600" />
          Acceptable Use Policy
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              ✅ Permitted Uses
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
                <li>• Educational and learning purposes</li>
                <li>• Professional engineering calculations</li>
                <li>• Construction planning and estimation</li>
                <li>• Academic research and studies</li>
                <li>• Personal project planning</li>
              </ul>
              <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
                <li>• Sharing results with colleagues</li>
                <li>• Using tools for business purposes</li>
                <li>• Referencing in technical reports</li>
                <li>• Teaching and training activities</li>
                <li>• Professional development</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              ❌ Prohibited Uses
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
                <li>• Using results for critical safety decisions without verification</li>
                <li>• Misrepresenting calculation results as certified</li>
                <li>• Automated scraping or data extraction</li>
                <li>• Reverse engineering our tools</li>
                <li>• Circumventing access restrictions</li>
              </ul>
              <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
                <li>• Using services for illegal activities</li>
                <li>• Distributing harmful or malicious content</li>
                <li>• Interfering with service availability</li>
                <li>• Impersonating others or misrepresenting identity</li>
                <li>• Commercial redistribution without permission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 p-8 dark:border-slate-700/30 dark:from-indigo-900/20 dark:to-blue-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <FileText className="h-8 w-8 text-indigo-600" />
          Intellectual Property Rights
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Our Intellectual Property
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>
                <strong>Content Ownership:</strong> All content, features, functionality, and
                materials on Civil Calculation, including text, graphics, logos, icons, images,
                audio clips, digital downloads, and software, are owned by us or our licensors and
                are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                <strong>Calculation Algorithms:</strong> Our proprietary calculation methods,
                formulas, and algorithms are protected intellectual property.
              </p>
              <p>
                <strong>Educational Materials:</strong> Guides, tutorials, and documentation are our
                original works protected by copyright.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              User Content & License Grants
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>
                <strong>User-Generated Content:</strong> By submitting content to us, you grant us a
                non-exclusive, royalty-free, perpetual license to use, modify, and distribute your
                content in connection with our services.
              </p>
              <p>
                <strong>Feedback & Suggestions:</strong> Any feedback, suggestions, or ideas you
                provide become our property and may be used without compensation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <AlertCircle className="h-8 w-8 text-amber-600" />
          Disclaimers & Limitations
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Professional Use Disclaimer
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Civil Calculation tools are designed for educational and preliminary calculation
              purposes. All results should be verified by qualified engineering professionals before
              use in construction projects, structural designs, or any critical applications. We
              strongly recommend independent verification by licensed engineers or architects.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Accuracy & Completeness
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              While we strive for accuracy, we cannot guarantee that all calculations, formulas, or
              information provided are completely accurate, current, or error-free. Engineering
              standards and codes may vary by jurisdiction and change over time. Users are
              responsible for verifying the applicability of our tools to their specific situations.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              No Professional Advice
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              The information and tools provided on Civil Calculation do not constitute professional
              engineering advice, architectural services, or legal counsel. They should not be used
              as a substitute for professional judgment, expertise, or services. Always consult with
              qualified professionals for your specific projects and requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Limitation of Liability */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-r from-red-50/50 via-orange-50/50 to-red-50/50 p-8 dark:border-slate-700/30">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <AlertCircle className="h-8 w-8 text-red-600" />
          Limitation of Liability
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            To the maximum extent permitted by applicable law, Civil Calculation and its affiliates,
            officers, directors, employees, agents, suppliers, and licensors shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages, including but not
            limited to loss of profits, data, use, goodwill, or other intangible losses, resulting
            from your use of our services.
          </p>
          <p>
            Our total liability for any claim arising out of or relating to these Terms or our
            services shall not exceed the amount paid by you, if any, for accessing our services
            during the twelve (12) months preceding the claim.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion or limitation of certain damages, so some
            of the above limitations may not apply to you.
          </p>
        </div>
      </div>

      {/* Indemnification */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Indemnification
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            You agree to defend, indemnify, and hold harmless Civil Calculation, its affiliates,
            officers, directors, employees, agents, suppliers, and licensors from and against all
            claims, demands, liabilities, damages, losses, costs, and expenses (including reasonable
            attorneys&apos; fees) arising out of or related to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your use of our services</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Any content you submit or make available through our services</li>
            <li>Your violation of applicable laws or regulations</li>
          </ul>
        </div>
      </div>

      {/* Termination */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-gray-50/50 to-slate-50/50 p-8 dark:border-slate-700/30 dark:from-gray-900/20 dark:to-slate-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Termination & Account Suspension
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            We reserve the right to terminate or suspend your access to our services immediately,
            without prior notice or liability, for any reason, including but not limited to breach
            of these Terms. Upon termination, your right to use our services will cease immediately.
          </p>
          <p>
            If you wish to terminate your account (if applicable), you may simply discontinue using
            our services. All provisions of these Terms which by their nature should survive
            termination shall survive, including ownership provisions, warranty disclaimers, and
            limitations of liability.
          </p>
        </div>
      </div>

      {/* Governing Law */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <Scale className="h-8 w-8 text-blue-600" />
          Governing Law & Dispute Resolution
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Nepal,
            without regard to its conflict of law provisions. Any disputes arising from these Terms
            or your use of our services shall be subject to the exclusive jurisdiction of the courts
            of Nepal.
          </p>
          <p>
            Before initiating formal legal proceedings, we encourage you to contact us first to seek
            an amicable resolution. We are committed to resolving disputes fairly and efficiently.
          </p>
        </div>
      </div>

      {/* Changes to Terms */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 p-8 dark:border-slate-700/30 dark:from-yellow-900/20 dark:to-amber-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Changes to Terms & Conditions
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            We reserve the right to modify or replace these Terms at any time. When we make material
            changes, we will notify you by posting the updated Terms on our website and updating the
            &ldquo;Last updated&rdquo; date at the top of this page.
          </p>
          <p>
            Your continued use of Civil Calculation after any such changes constitutes your
            acceptance of the new Terms. If you do not agree to the modified Terms, you must stop
            using our services.
          </p>
          <p>
            We encourage you to review these Terms periodically to stay informed about any updates.
            Material changes will be communicated through prominent notices on our website.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-heading dark:text-heading-dark">Contact Us</h2>
        <p className="mb-8 text-lg text-body/80 dark:text-body-dark/80">
          If you have any questions about these Terms & Conditions, please contact us:
        </p>
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                Legal Inquiries
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p>
                  <strong>Email:</strong> legal@civilcalculation.com
                </p>
                <p>
                  <strong>Subject:</strong> Terms & Conditions Inquiry
                </p>
                <p>
                  <strong>Response Time:</strong> Within 7 business days
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                General Contact
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
