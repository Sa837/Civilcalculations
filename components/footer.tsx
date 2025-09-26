"use client"

export default function Footer() {
  function openCookiePrefs(e: React.MouseEvent) {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openCookiePrefs'))
    }
  }

  return (
    <footer className="border-t border-slate-200/20 bg-surface py-12 text-center dark:border-slate-800/20 dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-sans text-body/70 dark:text-body-dark/70">
          © {new Date().getFullYear()} Civil Calculation. Built for civil engineers, by engineers.
        </p>
        <p className="mt-2 font-sans text-sm text-body/50 dark:text-body-dark/50">
          Professional-grade tools for accurate calculations and conversions.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="/privacy" className="font-sans text-sm text-body/70 hover:text-body dark:text-body-dark/70 dark:hover:text-body-dark">Privacy Policy</a>
          <a href="/terms" className="font-sans text-sm text-body/70 hover:text-body dark:text-body-dark/70 dark:hover:text-body-dark">Terms & Conditions</a>
          <a href="/disclaimer" className="font-sans text-sm text-body/70 hover:text-body dark:text-body-dark/70 dark:hover:text-body-dark">Disclaimer</a>
          <a href="/cookies" className="font-sans text-sm text-body/70 hover:text-body dark:text-body-dark/70 dark:hover:text-body-dark">Cookie Policy</a>
          <a href="/contact" className="font-sans text-sm text-body/70 hover:text-body dark:text-body-dark/70 dark:hover:text-body-dark">Contact</a>
          <a href="#" onClick={openCookiePrefs} className="font-sans text-sm text-body/70 hover:text-body dark:text-body-dark/70 dark:hover:text-body-dark">Manage Cookies</a>
        </div>
      </div>
    </footer>
  )
}




