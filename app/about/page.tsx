import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Civil Calculation',
  description:
    'Learn about Civil Calculation, its developer Er. Sameer Tripathi, and Pave Engineering Consultancy Pvt. Ltd.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 font-display">
      <div className="mb-12 font-display text-center">
        <h1 className="mb-6 text-5xl font-bold text-heading dark:text-heading-dark">About Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-body/80 dark:text-body-dark/80">
          Civil Calculation is dedicated to providing reliable civil engineering tools and resources
          for students and professionals.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-bold dark:prose-invert">
        <h2>
          <strong>Who We Are</strong>
        </h2>
        <p>
          Civil Calculation is created by Er. Sameer Tripathi from Nepal. Our mission is to simplify
          engineering calculations and provide practical resources for civil engineers.
        </p>

        <h2>
          <strong>Developer & Company</strong>
        </h2>
        <p>
          This platform is developed and maintained by <strong>Er. Sameer Tripathi</strong> under
          the company <strong>Pave Engineering Consultancy Private Limited</strong>. We combine
          engineering expertise with modern web technologies to deliver accurate and user-friendly
          solutions.
        </p>

        <h2>
          <strong>Special Thanks</strong>
        </h2>
        <p>
          Special thanks to <strong>Mr. Prajwal Khadgi</strong> for assisting with error resolution
          and coding support during the development of this platform.
        </p>

        <h2>
          <strong>Our Goal</strong>
        </h2>
        <p>
          Our goal is to empower civil engineering students and professionals with tools that save
          time, reduce errors, and enhance learning.
        </p>

        <h2>
          <strong>Contact</strong>
        </h2>
        <p>
          For inquiries or feedback, reach us at:{' '}
          <a href="mailto:sa.9819158546@gmail.com">sa.9819158546@gmail.com</a>
        </p>
      </div>
    </main>
  )
}
