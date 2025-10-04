import Link from 'next/link'
import {
  Calculator,
  RotateCcw,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Mail,
  Globe,
  Star,
  Quote,
  Wrench,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/1 px-6 py-24 dark:from-background-dark dark:via-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20">
              <Shield className="h-4 w-4" />
              Trusted by 10,000+ Engineers
            </div>
          </div>

          <h1 className="mb-8 font-display text-5xl font-bold tracking-tight text-heading sm:text-6xl lg:text-7xl dark:text-heading-dark">
            Civil Engineering
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl font-sans text-xl text-body/80 dark:text-body-dark/80">
            Professional-grade calculators, smart converters, and essential tools built specifically
            for civil engineers. Save time and eliminate errors in your daily calculations.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/calculators"
              className="group inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-display font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover"
            >
              <Calculator className="h-5 w-5 transition-transform group-hover:scale-110" />
              Browse Calculators
            </Link>
            <Link
              href="/converters"
              className="group inline-flex items-center gap-3 rounded-xl border-2 border-slate-300 bg-surface px-8 py-4 font-display font-semibold text-heading transition-all hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-surface-dark dark:text-heading-dark dark:hover:border-primary"
            >
              <RotateCcw className="h-5 w-5 transition-transform group-hover:scale-110" />
              Unit Converters
            </Link>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-16 opacity-30"></div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200/20 bg-surface px-6 py-16 dark:border-slate-800/20 dark:bg-surface-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 text-3xl font-bold text-primary">10+</div>
              <div className="font-sans text-body/70 dark:text-body-dark/70">
                Engineering Calculators
              </div>
            </div>
            <div className="text-center">
              <div className="mb-3 text-3xl font-bold text-secondary">100+</div>
              <div className="font-sans text-body/70 dark:text-body-dark/70">Unit Conversions</div>
            </div>
            <div className="text-center">
              <div className="mb-3 text-3xl font-bold text-primary">10K+</div>
              <div className="font-sans text-body/70 dark:text-body-dark/70">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 font-display text-4xl font-bold text-heading dark:text-heading-dark">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-lg text-body/80 dark:text-body-dark/80">
              Professional-grade tools designed for civil engineering professionals. Built with
              accuracy, speed, and reliability in mind.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                <Calculator className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-heading dark:text-heading-dark">
                Smart Calculators
              </h3>
              <p className="font-sans text-body/80 dark:text-body-dark/80">
                Structural analysis, concrete design, steel calculations, and more with built-in
                safety factors and industry standards.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary/10 text-secondary dark:bg-secondary/20">
                <RotateCcw className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-heading dark:text-heading-dark">
                Unit Converters
              </h3>
              <p className="font-sans text-body/80 dark:text-body-dark/80">
                Convert between metric and imperial units instantly. Length, area, volume, pressure,
                and more with precision.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                <Wrench className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-heading dark:text-heading-dark">
                Resources & Tools
              </h3>
              <p className="font-sans text-body/80 dark:text-body-dark/80">
                Comprehensive engineering resources, material databases, and essential tools to
                streamline your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-heading dark:text-heading-dark">
              What Engineers Say
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-lg text-body/80 dark:text-body-dark/80">
              Don&apos;t just take our word for it. Here&apos;s what our users have to say.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 font-display">
            {/* Review 1 */}
            <div className="group rounded-2xl border border-slate-200/20 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-slate-800">
              <div className="mb-3 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <Quote className="mb-3 h-6 w-6 text-primary/40" />
              <p className="mb-4 font-sans text-sm text-body/80 dark:text-body-dark/80 italic">
                "This platform totally changed how I handle my daily calculations. The concrete mix
                calculator saved me so much time on my last project!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <span className="text-xs font-bold text-white">AS</span>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-heading dark:text-heading-dark">
                    Anjali Sharma
                  </h4>
                  <p className="text-xs text-body/70 dark:text-body-dark/70">Structural Engineer</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="group rounded-2xl border border-slate-200/20 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-slate-800">
              <div className="mb-3 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <Quote className="mb-3 h-6 w-6 text-primary/40" />
              <p className="mb-4 font-sans text-sm text-body/80 dark:text-body-dark/80 italic">
                "The unit converters are spot-on and super fast. I use them every day for switching
                between metric and imperial on my international projects."
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                  <span className="text-xs font-bold text-white">RK</span>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-heading dark:text-heading-dark">
                    Raj Kumar
                  </h4>
                  <p className="text-xs text-body/70 dark:text-body-dark/70">Project Manager</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="group rounded-2xl border border-slate-200/20 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-slate-800">
              <div className="mb-3 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <Quote className="mb-3 h-6 w-6 text-primary/40" />
              <p className="mb-4 font-sans text-sm text-body/80 dark:text-body-dark/80 italic">
                "Having these tools on my phone has been a total game-changer as a site engineer.
                Instant calculations right when I need them!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-xs font-bold text-white">SP</span>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-heading dark:text-heading-dark">
                    Suresh Patel
                  </h4>
                  <p className="text-xs text-body/70 dark:text-body-dark/70">Site Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-24 dark:from-primary/10 dark:to-secondary/10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-display text-4xl font-bold text-heading dark:text-heading-dark">
            Ready to Get Started?
          </h2>
          <p className="mb-10 font-sans text-lg text-body/80 dark:text-body-dark/80">
            Join thousands of civil engineers who trust Civil Calculation for their daily
            calculations. Start building with confidence today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/calculators"
              className="group inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-display font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover"
            >
              <Calculator className="h-6 w-6 transition-transform group-hover:scale-110" />
              Start Calculating Now
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-xl border-2 border-slate-300 bg-surface px-8 py-4 font-display font-semibold text-heading transition-all hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-surface-dark dark:text-heading-dark dark:hover:border-primary"
            >
              <Users className="h-6 w-6 transition-transform group-hover:scale-110" />
              Get Support
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section - Compact Version */}
      <section className="px-6 py-20 bg-surface dark:bg-surface-dark">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-heading dark:text-heading-dark">
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-lg text-body/80 dark:text-body-dark/80">
              The passionate professionals behind Civil Calculation
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Founder Card */}
            <div className="group rounded-2xl border border-slate-200/20 bg-gradient-to-br from-primary/20 to-secondary/5 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary to-blue-600 shadow-lg">
                  <img
                    src="/dp/sameerdp.png"
                    alt="Sameer Tripathi"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="text-left">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark">
                    Er. Sameer Tripathi
                  </h3>
                  <p className="font-sans text-sm text-body/70 dark:text-body-dark/70">
                    Founder & CEO
                  </p>
                </div>
              </div>
              <p className="mb-4 font-sans text-sm text-body/80 dark:text-body-dark/80">
                Civil engineering professional passionate about creating tools that simplify complex
                engineering calculations.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/sameer-tripathi-sa837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-pink-600 transition-all hover:bg-pink-100 dark:bg-pink-900/20 dark:text-pink-400 dark:hover:bg-pink-900/30"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="mailto:sa.9819158546@gmail.com"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Special Thanks Card */}
            <div className="group rounded-2xl border border-slate-200/20 bg-gradient-to-br from-primary/20 to-secondary/5 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10">
              <div className="mb-4 flex items-center gap-4">
                {/* DP Image */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-secondary to-green-600 shadow-lg">
                  <img
                    src="/dp/prajwaldp.png"
                    alt="Prajwal Khadgi"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="text-left">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark">
                    Mr. Prajwal Khadgi
                  </h3>
                  <p className="font-sans text-sm text-body/70 dark:text-body-dark/70">
                    Technical Assistant
                  </p>
                  <p className="font-sans text-xs text-secondary dark:text-secondary-light">
                    Special Thanks
                  </p>
                </div>
              </div>
              <p className="mb-4 font-sans text-sm text-body/80 dark:text-body-dark/80">
                For invaluable assistance in development and technical support.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/prajwal-khadgi-870394200/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-pink-600 transition-all hover:bg-pink-100 dark:bg-pink-900/20 dark:text-pink-400 dark:hover:bg-pink-900/30"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Company Info Card */}
            <div className="group rounded-2xl border border-slate-200/20 bg-gradient-to-br from-primary/20 to-secondary/5 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-pink-300 to-indigo-300 shadow-lg">
                  <img
                    src="/dp/pavedp.png"
                    alt="Pave Engineering"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark">
                    Pave Engineering Consultancy
                  </h3>
                  <p className="font-sans text-sm text-body/70 dark:text-body-dark/70">
                    Consultancy Firm
                  </p>
                </div>
              </div>
              <p className="mb-4 font-sans text-sm text-body/80 dark:text-body-dark/80">
                Leading civil engineering consultancy firm specializing in innovative solutions.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/company/pave-engineering/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="mailto:paveengineeringofficial@gmail.com"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Testing Team */}
          <div className="mt-16 font-display">
            <h3 className="mb-8  text-center font-display text-2xl font-bold text-heading dark:text-heading-dark">
              Special Thanks to Our Testing Team
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
              {[
                {
                  name: 'Sandesh Thapa',
                  role: 'Beta Testing',
                  initials: 'ST',
                  gradient: 'from-orange-400 to-red-500',
                },
                {
                  name: 'Nanjol Koirala',
                  role: 'UI Feedback',
                  initials: 'NK',
                  gradient: 'from-green-400 to-teal-500',
                },
                {
                  name: 'Sandesh Adkhari',
                  role: 'Bug Reports',
                  initials: 'SA',
                  gradient: 'from-blue-400 to-cyan-500',
                },
                {
                  name: 'Smirti Pant',
                  role: 'Beta Testing',
                  initials: 'SP',
                  gradient: 'from-purple-400 to-pink-500',
                },
              ].map((person, index) => (
                <div
                  key={index}
                  className="group rounded-xl  bg-gradient-to-br from-primary/20 to-secondary/5 p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${person.gradient} shadow-md`}
                    >
                      <span className="text-xs font-bold text-white">{person.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-heading dark:text-heading-dark">
                        {person.name}
                      </h4>
                      <p className="text-xs text-body/70 dark:text-body-dark/70">{person.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
