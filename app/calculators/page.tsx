import Link from 'next/link'
import { calculators } from '../../lib/registry/calculators'

export default function CalculatorsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Engineering Calculators</h1>
        <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">
          Professional-grade calculators designed for civil engineering professionals. 
          Built with accuracy and industry standards in mind.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((c) => (
          <Link 
            key={c.slug} 
            href={`/calculators/${c.slug}`} 
            className="group rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
          >
            <h3 className="mb-4 font-display text-xl font-semibold text-heading dark:text-heading-dark group-hover:text-primary transition-colors">
              {c.title}
            </h3>
            <p className="font-sans text-body/80 dark:text-body-dark/80">
              {c.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}


