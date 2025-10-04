import type { Metadata } from 'next'
import ContactForm from '../../components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us | Civil Calculation',
  description:
    'Get in touch with Civil Calculation for support, feedback, or collaboration. Reach us via the contact form or email support@civilcalculation.com.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">
          Contact Us
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">
          We&#39;d love to hear from you. Get in touch for support, feedback, or collaboration
          opportunities.
        </p>
        <p className="mt-4 font-sans text-sm text-body/70 dark:text-body-dark/70">
          Or email us directly at{' '}
          <a href="mailto:sa.9819158546@gmail.com" className="underline hover:no-underline">
            sa.9819158546@gmail.com
          </a>
          .
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
        <ContactForm />
      </div>
    </main>
  )
}
