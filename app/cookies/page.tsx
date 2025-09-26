import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Civil Calculation',
  description: 'Understand how Civil Calculation uses cookies for necessary functions, analytics (GA4), and advertising (AdSense), and how you can manage your preferences.',
  alternates: { canonical: '/cookies' },
}

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Cookie Policy</h1>
        <p className="mx-auto max-w-2xl font-sans text-lg text-body/80 dark:text-body-dark/80">
          This Cookie Policy explains how we use cookies and how you can manage your preferences.
        </p>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help the site function properly, remember preferences, and understand how the site is used.
        </p>

        <h2>Types of Cookies We Use</h2>
        <ul>
          <li><strong>Strictly Necessary</strong>: Required for core site functionality.</li>
          <li><strong>Analytics (GA4)</strong>: Help us understand how the Service is used.</li>
          <li><strong>Advertising (AdSense)</strong>: Personalize and measure ads when you consent.</li>
          <li><strong>Functional</strong>: Enhance features such as remembering preferences.</li>
        </ul>

        <h2>Managing Your Preferences</h2>
        <p>
          You can manage cookie preferences at any time using the cookie banner or the “Manage Cookies” link in the footer. Your choices will be remembered until you change them or clear cookies.
        </p>

        <h2>Third-Party Cookies</h2>
        <p>
          We may use third-party services like Google Analytics and Google AdSense. For more information, see:
          <br />
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites that use their services</a>
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Contact us at <a href="mailto:support@civilcalculation.com">support@civilcalculation.com</a>.
        </p>
      </div>
    </main>
  )
}
