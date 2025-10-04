import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Civil Calculation',
  description:
    'Learn about how Civil Calculation collects, stores, and uses information, including cookies, Google Analytics, and AdSense. Understand your rights under GDPR and CCPA.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 font-display">
      <div className="mb-12 text-center">
        <h1 className="mb-6 text-5xl font-bold text-heading dark:text-heading-dark">
          Privacy Policy
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-body/80 dark:text-body-dark/80">
          At Civil Calculation, we value your privacy. This Privacy Policy explains the information
          we collect, how we use it, and your rights regarding your data.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-bold dark:prose-invert">
        <h2>Overview</h2>
        <p>
          Civil Calculation provides civil engineering tools, calculators, and resources. Our
          Privacy Policy explains how we collect, store, and use information when you visit our
          website or use our services.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Usage Data</strong>: Information about how you interact with our website,
            including pages visited, time spent, and features used. This helps us improve user
            experience and website functionality.
          </li>
          <li>
            <strong>Cookies</strong>: Small files stored on your device to remember preferences,
            provide a better experience, and enable analytics and advertising services. Cookies are
            only used if you consent.
          </li>
          <li>
            <strong>Contact Data</strong>: Information you provide voluntarily when contacting us
            via forms or email.
          </li>
        </ul>

        <h2>Cookies and Similar Technologies</h2>
        <p>
          Cookies help our site function properly and provide a personalized experience. You can
          manage your preferences at any time using the cookie banner or the "Manage Cookies" link
          in the footer. Cookies may include:
        </p>
        <ul>
          <li>
            <strong>Strictly Necessary Cookies</strong>: Required for core functionality, like
            navigation and security.
          </li>
          <li>
            <strong>Analytics Cookies</strong>: Used by Google Analytics (GA4) to understand user
            behavior and improve our services.
          </li>
          <li>
            <strong>Advertising Cookies</strong>: Used by Google AdSense to serve personalized ads
            based on consent.
          </li>
          <li>
            <strong>Functional Cookies</strong>: Help remember preferences such as language, theme,
            and user settings.
          </li>
        </ul>

        <h2>Google Analytics (GA4)</h2>
        <p>
          We use Google Analytics to collect usage data for insights about site performance and user
          engagement. Data collection occurs only with your consent. You can read more about
          Google's policies here:
          <br />
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            Partner Sites Policy
          </a>
          <br />
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookies Policy
          </a>
        </p>

        <h2>Google AdSense</h2>
        <p>
          Our website uses Google AdSense to display ads. Personalized ads and tracking cookies are
          used only with your consent. Learn more about Google's use of information here:
          <br />
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Partner Policies
          </a>
        </p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To operate and maintain our website and services effectively.</li>
          <li>To analyze trends, usage, and performance for service improvement.</li>
          <li>To serve relevant advertising only when consented.</li>
          <li>To respond to inquiries, requests, and support questions.</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your information only as long as necessary to fulfill the purposes outlined in
          this Privacy Policy or as required by law. Cookies are stored according to their
          respective durations unless you change your preferences or clear them.
        </p>

        <h2>Data Sharing</h2>
        <p>
          We do not sell personal information. We may share data with service providers for
          analytics and advertising purposes, but only in compliance with your consent and
          applicable laws.
        </p>

        <h2>Your Rights (GDPR & CCPA)</h2>
        <ul>
          <li>Access, correct, or request deletion of your personal data.</li>
          <li>Opt-out of the sale or sharing of your personal data where applicable.</li>
          <li>Withdraw cookie consent at any time via the cookie settings.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          For privacy-related inquiries or concerns, you can contact us at: <br />
          <a href="/contact">Contact Page</a> or email:{' '}
          <a href="mailto:sa.9819158546@gmail.com">sa.9819158546@gmail.com</a>.
        </p>

        <h2>Policy Updates</h2>
        <p>
          We may update this Privacy Policy periodically. The latest version will always be
          available on this page. We encourage you to review it regularly.
        </p>
      </div>
    </main>
  )
}
