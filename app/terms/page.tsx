import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Civil Calculation',
  description:
    'Read the comprehensive Terms & Conditions for using Civil Calculation engineering calculators and tools, covering acceptable use, limitations, intellectual property, liability, and legal disclaimers.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 font-display">
      <div className="mb-12 text-center">
        <h1 className="mb-6 text-5xl font-bold text-heading dark:text-heading-dark">
          Terms & Conditions
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-body/80 dark:text-body-dark/80">
          Please read these Terms & Conditions carefully before using Civil Calculation’s tools and
          resources. By accessing or using the Service, you agree to comply with these terms.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-bold dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using Civil Calculation (the &quot;Service&quot;), you agree to these Terms &
          Conditions and any updates posted on this page. If you do not agree, do not use the
          Service.
        </p>

        <h2>2. Service Description</h2>
        <p>
          Civil Calculation provides online calculators, tools, and educational resources for civil
          engineering students and professionals. These tools are intended for informational and
          educational purposes only.
        </p>

        <h2>3. Acceptable Use</h2>
        <ul>
          <li>Use the Service responsibly and legally.</li>
          <li>Do not attempt to disrupt, hack, or reverse-engineer the Service.</li>
          <li>Do not copy, distribute, or republish content without permission.</li>
          <li>Do not use the Service for unlawful or harmful purposes.</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, designs, software, code, and materials on the Service are the intellectual
          property of Civil Calculation or its licensors. Users may not copy, reproduce, or create
          derivative works without explicit permission.
        </p>

        <h2>5. No Professional Advice</h2>
        <p>
          The Service is for informational purposes only and does not replace professional
          engineering advice. Users must verify calculations and designs with qualified
          professionals and applicable standards before use.
        </p>

        <h2>6. Accuracy and Reliability</h2>
        <p>
          While we strive for accuracy, Civil Calculation does not guarantee that calculations,
          formulas, or content are error-free. Use of the Service is at your own risk. Always
          double-check results before applying them to real-world projects.
        </p>

        <h2>7. Cookies and Third-Party Services</h2>
        <p>
          We use cookies, Google Analytics, and Google AdSense to improve performance and deliver
          personalized content and advertising. Third-party services may collect information as
          described in our Privacy Policy.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Civil Calculation, its owners, and contributors
          are not liable for any direct, indirect, incidental, or consequential damages arising from
          the use or inability to use the Service. This includes errors in calculations, lost data,
          or project-related issues.
        </p>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Civil Calculation, its affiliates,
          employees, and partners from any claims, liabilities, damages, or expenses arising from
          your use of the Service or violation of these Terms.
        </p>

        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to the Service at any time for
          violations of these Terms or misuse of the Service.
        </p>

        <h2>11. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of Nepal. Any disputes arising from the Service or
          these Terms shall be resolved under Nepali law in the competent courts of Nepal.
        </p>

        <h2>12. Modifications to Terms</h2>
        <p>
          Civil Calculation may update these Terms periodically. Continued use of the Service
          constitutes acceptance of the updated Terms. Users are encouraged to review this page
          regularly.
        </p>

        <h2>13. Contact Information</h2>
        <p>
          For questions or concerns regarding these Terms, please contact: <br />
          Email: <a href="mailto:sa.9819158546@gmail.com">sa.9819158546@gmail.com</a>
        </p>

        <h2>14. Acknowledgement</h2>
        <p>
          By using the Service, you acknowledge that you have read, understood, and agreed to these
          Terms & Conditions.
        </p>
      </div>
    </main>
  )
}
