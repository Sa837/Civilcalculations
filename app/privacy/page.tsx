import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Civil Calculation',
  description: 'Learn how Civil Calculation uses cookies, Google AdSense, and Google Analytics. Understand what data we collect, how we store it, and your rights (GDPR/CCPA).',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Privacy Policy</h1>
        <p className="mx-auto max-w-2xl font-sans text-lg text-body/80 dark:text-body-dark/80">
          Your privacy matters to us. This policy explains what data we collect, how we use it, and your rights.
        </p>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <h2>Overview</h2>
        <p>
          Civil Calculation (the &quot;Service&quot;) provides engineering calculators and tools. This Privacy Policy describes how we
          collect, use, and disclose information when you use the Service.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li><strong>Usage data</strong>: pages visited, interactions, performance metrics (via analytics).</li>
          <li><strong>Cookies</strong>: to remember preferences, measure analytics, and serve ads if you consent.</li>
        </ul>

        <h2>Cookies and Similar Technologies</h2>
        <p>
          We use cookies to operate the Service, measure usage, and personalize/measure advertising. You can manage your
          preferences at any time using the cookie settings in the banner or the &quot;Manage Cookies&quot; link in the footer.
        </p>

        <h2>Google Analytics (GA4)</h2>
        <p>
          We use Google Analytics to understand how the Service is used. Data is collected only when you consent to analytics
          cookies. Learn more at Google's policies: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/partner-sites</a> and <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/cookies</a>.
        </p>

        <h2>Google AdSense</h2>
        <p>
          We use Google AdSense to display ads. Personalized ads and measurement cookies are used only when you consent to
          advertising cookies. You can learn how Google uses information from sites that use its services here: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google partner policies</a>.
        </p>

        <h2>Data Use</h2>
        <ul>
          <li>To operate and improve the Service.</li>
          <li>To understand usage patterns and performance.</li>
          <li>To provide relevant advertising if you consent.</li>
          <li>To respond to inquiries you send via the contact form.</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain data only as long as necessary for the purposes stated in this policy, unless a longer retention period is
          required by law.
        </p>

        <h2>Data Sharing</h2>
        <p>
          We do not sell personal information. We may share information with service providers for analytics and advertising as
          described, subject to your consent and applicable law.
        </p>

        <h2>Your Rights (GDPR/CCPA)</h2>
        <ul>
          <li>Access, correction, or deletion of your personal data.</li>
          <li>Opt-out of sale or sharing where applicable.</li>
          <li>Withdraw consent for cookies at any time via the cookie preferences.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          For privacy inquiries, contact us at <a href="/contact">Contact</a> or email: <a href="mailto:support@civilcalculation.com">support@civilcalculation.com</a>.
        </p>

        <h2>Updates</h2>
        <p>
          We may update this policy from time to time. The latest version will always be available on this page.
        </p>
      </div>
    </main>
  )
}
