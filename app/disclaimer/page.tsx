import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Civil Calculation',
  description:
    'Important disclaimer: Civil Calculation tools and results are for informational purposes only. Always verify with standards and professionals.',
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 font-display">
      <div className="mb-12 font-display text-center">
        <h1 className="mb-6 text-5xl font-bold text-heading dark:text-heading-dark">Disclaimer</h1>
        <p className="mx-auto max-w-2xl text-lg text-body/80 dark:text-body-dark/80">
          The information and tools provided by Civil Calculation are intended for general
          informational purposes only.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-bold dark:prose-invert">
        <p>
          While we strive to provide accurate and up-to-date calculations, formulas, and
          conversions, Civil Calculation makes no warranties or representations regarding the
          completeness, reliability, or accuracy of any results. Calculations may be approximations
          and may not account for specific project conditions, codes, or safety factors.
        </p>
        <p>
          Users are responsible for verifying all results and ensuring compliance with applicable
          codes, standards, and regulations. Always consult a qualified engineer or professional
          before making decisions or taking actions based on the outputs of this Service.
        </p>
        <p>
          Civil Calculation and its contributors are not liable for any losses or damages arising
          from the use of or reliance on the information provided.
        </p>
      </div>
    </main>
  )
}
