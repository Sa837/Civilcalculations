import type { Metadata } from 'next'
import { Shield, Eye, Lock, UserCheck, FileText, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Civil Calculation - Data Protection & User Rights',
  description: 'Our comprehensive privacy policy explains how Civil Calculation collects, uses, and protects your personal information. Learn about your data rights and our commitment to privacy.',
  keywords: 'privacy policy, data protection, GDPR, user rights, personal information, civil calculation privacy',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | Civil Calculation',
    description: 'Comprehensive privacy policy for Civil Calculation - your rights and our data protection commitments.',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 font-display">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Shield className="mx-auto mb-6 h-16 w-16 text-blue-600" />
        <h1 className="mb-6 text-4xl font-bold text-heading dark:text-heading-dark md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
          Your privacy is important to us. This policy explains how we collect, use, and protect
          your personal information when you use Civil Calculation.
        </p>
        <p className="mt-4 text-sm text-body/60 dark:text-body-dark/60">
          Last updated: February 15, 2025
        </p>
      </div>

      {/* Overview */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-8 dark:border-slate-700/30 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="mb-6 flex items-center gap-3">
          <Eye className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">Policy Overview</h2>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed">
            Civil Calculation (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy
            and ensuring the security of your personal information. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website and use
            our services.
          </p>
          <p className="leading-relaxed">
            By using Civil Calculation, you agree to the collection and use of information in accordance
            with this policy. We will not use or share your information except as described in this Privacy Policy.
          </p>
        </div>
      </div>

      {/* Information We Collect */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <UserCheck className="h-8 w-8 text-green-600" />
          Information We Collect
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-xl font-bold text-heading dark:text-heading-dark">
              1. Information You Provide Directly
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Contact Information:</strong> When you contact us through forms, email, or support channels, we may collect your name, email address, phone number, and message content.</p>
              <p><strong>Account Information:</strong> If we offer user accounts in the future, we may collect username, password, and profile information.</p>
              <p><strong>Feedback and Support:</strong> Information you provide when submitting feedback, reporting issues, or requesting support.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-xl font-bold text-heading dark:text-heading-dark">
              2. Information Collected Automatically
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, features used, and calculation inputs.</p>
              <p><strong>Device Information:</strong> Technical information about your device, browser type, operating system, screen resolution, and IP address.</p>
              <p><strong>Cookies and Tracking:</strong> Information collected through cookies, web beacons, and similar technologies (see our Cookie Policy for details).</p>
              <p><strong>Log Data:</strong> Server logs that record your visits, including timestamps, referring pages, and exit pages.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-xl font-bold text-heading dark:text-heading-dark">
              3. Third-Party Analytics
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Google Analytics:</strong> We use Google Analytics to understand website usage patterns and improve our services. This service collects anonymized data about your visits.</p>
              <p><strong>Performance Monitoring:</strong> Tools to monitor website performance and identify potential issues.</p>
              <p><strong>Ad Networks:</strong> If we display advertisements, ad networks may collect information about your interests and browsing behavior.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How We Use Your Information */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <FileText className="h-8 w-8 text-purple-600" />
          How We Use Your Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Service Provision
            </h3>
            <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
              <li>• Provide and maintain our calculation tools</li>
              <li>• Process your requests and support inquiries</li>
              <li>• Send service-related communications</li>
              <li>• Improve website functionality and user experience</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Analytics & Improvement
            </h3>
            <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
              <li>• Analyze usage patterns and user behavior</li>
              <li>• Improve our services and develop new features</li>
              <li>• Monitor website performance and security</li>
              <li>• Conduct research and statistical analysis</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Legal Compliance
            </h3>
            <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
              <li>• Comply with legal obligations and regulations</li>
              <li>• Protect our rights and prevent fraud</li>
              <li>• Respond to legal requests and investigations</li>
              <li>• Enforce our Terms of Service</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Communication
            </h3>
            <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
              <li>• Send important updates and announcements</li>
              <li>• Respond to your inquiries and feedback</li>
              <li>• Provide customer support services</li>
              <li>• Notify about service changes or issues</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Information Sharing */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-r from-amber-50/50 via-yellow-50/50 to-amber-50/50 p-8 dark:border-slate-700/30">
        <div className="mb-6 flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-amber-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">Information Sharing & Disclosure</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              We Do Not Sell Your Personal Information
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties for marketing
              purposes. Your data remains secure and is only used as described in this policy.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              When We May Share Information
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p><strong>Service Providers:</strong> We may share information with trusted third-party service providers who help us operate our website and provide services (hosting, analytics, customer support).</p>
              <p><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government request, or to protect our rights and safety.</p>
              <p><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</p>
              <p><strong>Consent:</strong> We may share information with your explicit consent for specific purposes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Security */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <Lock className="h-8 w-8 text-green-600" />
          Data Security & Protection
        </h2>

        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-heading dark:text-heading-dark">
                Security Measures
              </h3>
              <ul className="space-y-2 text-body/80 dark:text-body-dark/80">
                <li>• SSL/TLS encryption for data transmission</li>
                <li>• Secure hosting infrastructure</li>
                <li>• Regular security audits and updates</li>
                <li>• Access controls and authentication</li>
                <li>• Data backup and disaster recovery</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-heading dark:text-heading-dark">
                Data Retention
              </h3>
              <div className="space-y-3 text-body/80 dark:text-body-dark/80">
                <p><strong>Personal Information:</strong> Retained only as long as necessary for the purposes outlined in this policy or as required by law.</p>
                <p><strong>Analytics Data:</strong> Anonymized and aggregated data may be retained indefinitely for analytical purposes.</p>
                <p><strong>Deletion Requests:</strong> You can request deletion of your personal information at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <UserCheck className="h-8 w-8 text-blue-600" />
          Your Rights & Choices
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Access Rights
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              You have the right to access the personal information we hold about you and receive
              a copy in a structured, machine-readable format.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Rectification
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              You can request correction of inaccurate or incomplete personal information we hold
              about you.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Deletion Rights
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              You can request deletion of your personal information, subject to legal and legitimate
              business requirements.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Opt-out Rights
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              You can opt out of marketing communications and request restrictions on how we process
              your personal information.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Data Portability
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              You can request a copy of your personal information in a portable format for transfer
              to another service provider.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Withdraw Consent
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              You can withdraw consent for processing activities that require your consent at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Cookies & Tracking */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-8 dark:border-slate-700/30 dark:from-purple-900/20 dark:to-pink-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <Shield className="h-8 w-8 text-purple-600" />
          Cookies & Tracking Technologies
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            We use cookies and similar tracking technologies to enhance your experience, analyze site
            usage, and provide personalized content. For detailed information about our cookie usage,
            please see our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
          </p>
          <p>
            You can control cookie preferences through your browser settings or our cookie consent
            banner. However, disabling certain cookies may affect website functionality.
          </p>
        </div>
      </div>

      {/* International Data Transfers */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          International Data Transfers
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            Your information may be transferred to and processed in countries other than your own.
            We ensure that such transfers comply with applicable data protection laws and implement
            appropriate safeguards to protect your personal information.
          </p>
          <p>
            When we transfer data internationally, we use standard contractual clauses, adequacy
            decisions, or other legally recognized mechanisms to ensure your data remains protected.
          </p>
        </div>
      </div>

      {/* Children's Privacy */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-red-50/50 to-pink-50/50 p-8 dark:border-slate-700/30 dark:from-red-900/20 dark:to-pink-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          Children&apos;s Privacy
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            Civil Calculation is not intended for children under 13 years of age. We do not knowingly
            collect personal information from children under 13. If we become aware that we have
            collected personal information from a child under 13, we will take steps to delete such
            information promptly.
          </p>
          <p>
            If you are a parent or guardian and believe your child has provided us with personal
            information, please contact us immediately so we can remove the information.
          </p>
        </div>
      </div>

      {/* Changes to This Policy */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Changes to This Privacy Policy
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices,
            technology, legal requirements, or other factors. When we make material changes, we will
            notify you by posting the updated policy on our website and updating the &ldquo;Last updated&rdquo; date.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay informed about how
            we protect your information. Your continued use of Civil Calculation after any changes
            indicates your acceptance of the updated policy.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-heading dark:text-heading-dark">
          Contact Us About Privacy
        </h2>
        <p className="mb-8 text-lg text-body/80 dark:text-body-dark/80">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our
          data practices, please contact us:
        </p>
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                Privacy Inquiries
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p><strong>Email:</strong> privacy@civilcalculation.com</p>
                <p><strong>Response Time:</strong> Within 30 days</p>
                <p><strong>Data Protection Officer:</strong> Available for GDPR inquiries</p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                General Contact
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p><strong>Company:</strong> Pave Engineering Consultancy Pvt. Ltd.</p>
                <p><strong>Email:</strong> info@paveengineering.com</p>
                <p><strong>Website:</strong> www.paveengineering.com</p>
                <p><strong>Business Hours:</strong> Mon-Fri, 9 AM - 6 PM NPT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
