import Link from 'next/link'
import { Calculator, RotateCcw, Zap, Shield, TrendingUp, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-slate-50 to-blue-50 px-6 py-24 dark:from-background-dark dark:via-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20">
              <Shield className="h-4 w-4" />
              Trusted by 10,000+ Engineers
            </div>
          </div>
          
          <h1 className="mb-8 font-display text-5xl font-bold tracking-tight text-heading sm:text-6xl lg:text-7xl dark:text-heading-dark">
            Civil Engineering
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Made Simple</span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-3xl font-sans text-xl text-body/80 dark:text-body-dark/80">
            Professional-grade calculators, smart converters, and essential tools built specifically for civil engineers. 
            Save time and eliminate errors in your daily calculations.
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
              <div className="mb-3 text-3xl font-bold text-primary">50+</div>
              <div className="font-sans text-body/70 dark:text-body-dark/70">Engineering Calculators</div>
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
              Professional-grade tools designed for civil engineering professionals. 
              Built with accuracy, speed, and reliability in mind.
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
                Structural analysis, concrete design, steel calculations, and more with built-in safety factors and industry standards.
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
                Convert between metric and imperial units instantly. Length, area, volume, pressure, and more with precision.
              </p>
            </div>
            
            <div className="group rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-heading dark:text-heading-dark">
                Lightning Fast
              </h3>
              <p className="font-sans text-body/80 dark:text-body-dark/80">
                Optimized for speed and accuracy. Get results instantly without waiting for complex calculations.
              </p>
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
            Join thousands of civil engineers who trust Civil Calculation for their daily calculations. 
            Start building with confidence today.
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
    </div>
  )
}
