import type { Metadata } from 'next'
import { Cookie, Eye, Settings, Shield, Database, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy | Civil Calculation - Cookie Usage & Privacy Settings',
  description: 'Comprehensive cookie policy for Civil Calculation. Learn about our cookie usage, analytics tracking, and how to manage your privacy preferences.',
  keywords: 'cookie policy, privacy settings, analytics cookies, tracking cookies, gdpr cookies, cookie consent',
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy | Civil Calculation',
    description: 'Cookie usage policy and privacy settings for Civil Calculation engineering tools.',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 font-display">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Cookie className="mx-auto mb-6 h-16 w-16 text-blue-600" />
        <h1 className="mb-6 text-4xl font-bold text-heading dark:text-heading-dark md:text-5xl">
          Cookie Policy
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
          This Cookie Policy explains how Civil Calculation uses cookies and similar technologies
          to enhance your browsing experience, analyze site usage, and provide personalized content.
        </p>
        <p className="mt-4 text-sm text-body/60 dark:text-body-dark/60">
          Last updated: February 15, 2025
        </p>
      </div>

      {/* What Are Cookies */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-8 dark:border-slate-700/30 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="mb-6 flex items-center gap-3">
          <Cookie className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">What Are Cookies?</h2>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile)
            when you visit a website. They contain information about your visit and are used to remember
            your preferences, improve your browsing experience, and provide relevant content.
          </p>
          <p className="leading-relaxed">
            Cookies help us understand how you use our website, remember your settings, and provide
            you with a more personalized experience. Some cookies are essential for the website to
            function properly, while others help us analyze usage patterns and improve our services.
          </p>
        </div>
      </div>

      {/* Types of Cookies We Use */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <Database className="h-8 w-8 text-green-600" />
          Types of Cookies We Use
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              Essential Cookies
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Purpose:</strong> These cookies are necessary for the website to function properly and cannot be disabled.</p>
              <p><strong>Examples:</strong> Session management, security features, user authentication, and basic functionality.</p>
              <p><strong>Duration:</strong> Usually session-based or short-term (less than 24 hours).</p>
              <p><strong>Legal Basis:</strong> Legitimate interest in providing a functional website.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              Analytics Cookies
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Purpose:</strong> Help us understand how visitors interact with our website by collecting anonymous statistical information.</p>
              <p><strong>Examples:</strong> Google Analytics cookies that track page views, time spent on pages, and user journeys.</p>
              <p><strong>Duration:</strong> Typically 26 months for Google Analytics.</p>
              <p><strong>Legal Basis:</strong> Consent (you can opt out) or legitimate interest (anonymized data).</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              Functional Cookies
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Purpose:</strong> Remember your preferences and settings to enhance your experience.</p>
              <p><strong>Examples:</strong> Theme preferences (light/dark mode), language settings, calculator preferences.</p>
              <p><strong>Duration:</strong> Usually 1 year or until you clear your cookies.</p>
              <p><strong>Legal Basis:</strong> Consent or legitimate interest in improving user experience.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              Marketing Cookies (Future Use)
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Purpose:</strong> Currently not used, but may be implemented in the future for targeted advertising.</p>
              <p><strong>Examples:</strong> Advertising platform cookies for showing relevant ads.</p>
              <p><strong>Duration:</strong> Varies by advertising platform (typically 30-90 days).</p>
              <p><strong>Legal Basis:</strong> Consent required for marketing cookies.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specific Cookies We Use */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-8 dark:border-slate-700/30 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="mb-6 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">Specific Cookies We Use</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Google Analytics Cookies
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200/30 dark:border-slate-700/30">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Cookie Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/20">
                  <tr>
                    <td className="px-4 py-2">_ga</td>
                    <td className="px-4 py-2">Distinguishes users</td>
                    <td className="px-4 py-2">2 years</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                    <td className="px-4 py-2">_gid</td>
                    <td className="px-4 py-2">Identifies user sessions</td>
                    <td className="px-4 py-2">24 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">_gat</td>
                    <td className="px-4 py-2">Limits request rate</td>
                    <td className="px-4 py-2">1 minute</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                    <td className="px-4 py-2">_ga_&lt;ID&gt;</td>
                    <td className="px-4 py-2">Stores user-specific data</td>
                    <td className="px-4 py-2">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Functional Cookies
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200/30 dark:border-slate-700/30">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Cookie Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/20">
                  <tr>
                    <td className="px-4 py-2">theme</td>
                    <td className="px-4 py-2">Remembers dark/light mode preference</td>
                    <td className="px-4 py-2">1 year</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                    <td className="px-4 py-2">cookie_consent</td>
                    <td className="px-4 py-2">Remembers cookie preferences</td>
                    <td className="px-4 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">calculator_settings</td>
                    <td className="px-4 py-2">Saves calculator preferences</td>
                    <td className="px-4 py-2">30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Consent & Management */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark flex items-center justify-center gap-3">
          <Settings className="h-8 w-8 text-orange-600" />
          Cookie Consent & Management
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Cookie Consent Banner
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              When you first visit Civil Calculation, you will see a cookie consent banner that allows
              you to accept or customize your cookie preferences. You can choose to accept all cookies,
              reject non-essential cookies, or customize your preferences for different cookie categories.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Managing Cookie Preferences
            </h3>
            <div className="space-y-3 text-body/80 dark:text-body-dark/80">
              <p><strong>Cookie Settings:</strong> You can update your cookie preferences at any time by clicking the &ldquo;Cookie Settings&rdquo; link in our website footer or by visiting this Cookie Policy page.</p>
              <p><strong>Browser Settings:</strong> You can also control cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect website functionality.</p>
              <p><strong>Opt-out Links:</strong> For Google Analytics, you can opt out using Google&apos;s opt-out browser add-on.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark">
              Withdrawing Consent
            </h3>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              You can withdraw your consent for non-essential cookies at any time. Withdrawing consent
              will not affect the lawfulness of processing based on consent before its withdrawal.
              Some features of our website may not function properly without certain cookies.
            </p>
          </div>
        </div>
      </div>

      {/* How to Control Cookies */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-green-50/50 to-teal-50/50 p-8 dark:border-slate-700/30 dark:from-green-900/20 dark:to-teal-900/20">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-8 w-8 text-green-600" />
          <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">How to Control Cookies</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Browser Settings
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
              <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
              <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
              <p><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Mobile Devices
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p><strong>iOS:</strong> Settings → Safari → Block Cookies</p>
              <p><strong>Android:</strong> Chrome app → Settings → Site settings → Cookies</p>
              <p><strong>Third-party browsers</strong> have similar settings in their menu</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
          <p className="text-amber-800 dark:text-amber-200 font-medium">
            ⚠️ <strong>Important:</strong> Blocking or deleting cookies may affect the functionality of our website.
            Some features may not work properly without certain cookies enabled.
          </p>
        </div>
      </div>

      {/* Third-Party Cookies */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark flex items-center gap-3">
          <Eye className="h-8 w-8 text-purple-600" />
          Third-Party Cookies & Services
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Google Analytics
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>We use Google Analytics to understand how our website is used and to improve our services. Google Analytics collects information about your use of our website, including pages visited and time spent on each page.</p>
              <p><strong>Privacy:</strong> The data collected is anonymized and aggregated. Google Analytics uses cookies to distinguish users but does not collect personally identifiable information.</p>
              <p><strong>Opt-out:</strong> You can opt out of Google Analytics by installing Google&apos;s opt-out browser add-on: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Hosting & CDN Services
            </h3>
            <div className="space-y-2 text-body/80 dark:text-body-dark/80">
              <p>Our website is hosted on secure servers and may use Content Delivery Networks (CDNs) to improve loading speeds. These services may set cookies for performance optimization.</p>
              <p><strong>Data Processing:</strong> These services process data on our behalf and are contractually obligated to maintain data security and privacy.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 p-8 dark:border-slate-700/30 dark:from-blue-900/20 dark:to-cyan-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Cookie Data Retention
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            Different types of cookies have different retention periods. We have designed our cookie
            usage to minimize data retention while still providing necessary functionality:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Analytics Cookies:</strong> Typically retained for 26 months (Google Analytics standard)</li>
            <li><strong>Functional Cookies:</strong> Retained for up to 1 year or until you change preferences</li>
            <li><strong>Consent Cookies:</strong> Retained for 1 year to remember your preferences</li>
          </ul>
          <p>
            You can clear cookies at any time through your browser settings, which will reset your
            preferences and require you to provide consent again if applicable.
          </p>
        </div>
      </div>

      {/* Updates to Policy */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-gray-50/50 to-slate-50/50 p-8 dark:border-slate-700/30 dark:from-gray-900/20 dark:to-slate-900/20">
        <h2 className="mb-6 text-2xl font-bold text-heading dark:text-heading-dark">
          Updates to This Cookie Policy
        </h2>

        <div className="space-y-4 text-body/80 dark:text-body-dark/80">
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices,
            technology, or legal requirements. When we make material changes, we will:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Update the &ldquo;Last updated&rdquo; date at the top of this page</li>
            <li>Post the updated policy on our website</li>
            <li>May show a notice about significant changes</li>
            <li>Require re-consent for new cookie categories if applicable</li>
          </ul>
          <p>
            We encourage you to review this Cookie Policy periodically to stay informed about
            our cookie practices and your options.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-heading dark:text-heading-dark">
          Questions About Cookies?
        </h2>
        <p className="mb-8 text-lg text-body/80 dark:text-body-dark/80">
          If you have any questions about our cookie usage or privacy practices, please contact us:
        </p>
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                Privacy Contact
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p><strong>Email:</strong> privacy@civilcalculation.com</p>
                <p><strong>Subject:</strong> Cookie Policy Inquiry</p>
                <p><strong>Response Time:</strong> Within 7 business days</p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                General Support
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
