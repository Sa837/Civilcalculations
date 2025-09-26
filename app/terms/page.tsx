import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Civil Calculation',
  description: 'Read the Terms & Conditions for using Civil Calculation engineering calculators and tools, including acceptable use, limitations, and disclaimers.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Terms & Conditions</h1>
        <p className="mx-auto max-w-2xl font-sans text-lg text-body/80 dark:text-body-dark/80">
          Please review these terms carefully before using our calculators and tools.
        </p>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <h2>Use of the Service</h2>
        <p>
          By accessing or using Civil Calculation (the "Service"), you agree to comply with these Terms. If you do not agree, do not use the Service.
        </p>

        <h2>Acceptable Use</h2>
        <ul>
          <li>Do not misuse the Service or attempt to disrupt its operation.</li>
          <li>Do not scrape or redistribute content without permission.</li>
        </ul>

        <h2>No Professional Advice</h2>
        <p>
          The Service provides tools and calculators for informational purposes only. It does not constitute professional advice. Always verify results with a qualified professional and governing standards for your project.
        </p>

        <h2>Accuracy and Availability</h2>
        <p>
          While we strive for accuracy and uptime, the Service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted operation or error-free content.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Civil Calculation and its contributors are not liable for any damages arising from use of the Service.
        </p>

        <h2>Changes</h2>
        <p>
          We may modify these Terms from time to time. The updated Terms will be posted on this page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these Terms? Contact us at <a href="mailto:support@civilcalculation.com">support@civilcalculation.com</a>.
        </p>
      </div>
    </main>
  )
}
