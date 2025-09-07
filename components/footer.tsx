export default function Footer() {
  return (
    <footer className="border-t border-slate-200/20 bg-surface py-12 text-center dark:border-slate-800/20 dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-sans text-body/70 dark:text-body-dark/70">
          © {new Date().getFullYear()} Civil Calculation. Built for civil engineers, by engineers.
        </p>
        <p className="mt-2 font-sans text-sm text-body/50 dark:text-body-dark/50">
          Professional-grade tools for accurate calculations and conversions.
        </p>
      </div>
    </footer>
  )
}




