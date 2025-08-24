"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import ThemeToggle from './theme-toggle'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/20 bg-surface/95 backdrop-blur-xl dark:border-slate-800/20 dark:bg-surface-dark/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt="CivilPro" width={140} height={32} />
        </Link>
        
        <nav className="hidden items-center gap-10 md:flex">
          <Link 
            href="/" 
            className={`relative font-display font-medium transition-colors hover:text-primary ${
              isActive('/') 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-heading dark:text-heading-dark'
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/calculators" 
            className={`relative font-display font-medium transition-colors hover:text-primary ${
              isActive('/calculators') 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-heading dark:text-heading-dark'
            }`}
          >
            Calculators
          </Link>
          
          <div className="group relative">
            <Link 
              href="/converters" 
              className={`relative font-display font-medium transition-colors hover:text-primary ${
                isActive('/converters') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-heading dark:text-heading-dark'
              }`}
            >
              Converters
            </Link>
            <div className="invisible absolute left-1/2 z-40 mt-5 w-[400px] -translate-x-1/2 rounded-2xl border border-slate-200/20 bg-surface/95 p-6 opacity-0 shadow-hover backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100 dark:border-slate-800/20 dark:bg-surface-dark/95">
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-body/60 dark:text-body-dark/60">Popular Converters</p>
              <div className="grid grid-cols-3 gap-3">
                <Link href="/converters/length" className="group/item rounded-xl border border-slate-200/40 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft dark:border-slate-700/30 dark:bg-slate-900/60">
                  <div className="font-display text-sm font-semibold text-heading dark:text-heading-dark group-hover/item:text-primary">Length</div>
                  <div className="font-sans text-xs text-body/70 dark:text-body-dark/70">m ⇄ ft</div>
                </Link>
                <Link href="/converters/area" className="group/item rounded-xl border border-slate-200/40 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft dark:border-slate-700/30 dark:bg-slate-900/60">
                  <div className="font-display text-sm font-semibold text-heading dark:text-heading-dark group-hover/item:text-primary">Area</div>
                  <div className="font-sans text-xs text-body/70 dark:text-body-dark/70">m² ⇄ ft²</div>
                </Link>
                <Link href="/converters/volume" className="group/item rounded-xl border border-slate-200/40 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft dark:border-slate-700/30 dark:bg-slate-900/60">
                  <div className="font-display text-sm font-semibold text-heading dark:text-heading-dark group-hover/item:text-primary">Volume</div>
                  <div className="font-sans text-xs text-body/70 dark:text-body-dark/70">m³ ⇄ ft³</div>
                </Link>
                {/* Second row: Nepali variants */}
                <Link href="/converters/length-nepali" className="group/item rounded-xl border border-slate-200/40 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft dark:border-slate-700/30 dark:bg-slate-900/60">
                  <div className="font-display text-sm font-semibold text-heading dark:text-heading-dark group-hover/item:text-primary">Length (Nepali)</div>
                  <div className="font-sans text-xs text-body/70 dark:text-body-dark/70">haat ⇄ m</div>
                </Link>
                <Link href="/converters/area-nepali" className="group/item rounded-xl border border-slate-200/40 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft dark:border-slate-700/30 dark:bg-slate-900/60">
                  <div className="font-display text-sm font-semibold text-heading dark:text-heading-dark group-hover/item:text-primary">Area (Nepali)</div>
                  <div className="font-sans text-xs text-body/70 dark:text-body-dark/70">ropani ⇄ m²</div>
                </Link>
                <Link href="/converters/volume-nepali" className="group/item rounded-xl border border-slate-200/40 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft dark:border-slate-700/30 dark:bg-slate-900/60">
                  <div className="font-display text-sm font-semibold text-heading dark:text-heading-dark group-hover/item:text-primary">Volume (Nepali)</div>
                  <div className="font-sans text-xs text-body/70 dark:text-body-dark/70">pathi ⇄ liter</div>
                </Link>
              </div>
            </div>
          </div>
          
          <Link 
            href="/contact" 
            className={`relative font-display font-medium transition-colors hover:text-primary ${
              isActive('/contact') 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-heading dark:text-heading-dark'
            }`}
          >
            Contact
          </Link>
          
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>
        
        <button 
          aria-label="Open menu" 
          onClick={() => setOpen(true)} 
          className="rounded-xl p-2.5 transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/80 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden">
          <div className="mx-auto max-w-7xl px-6 pb-8">
            <div className="flex justify-end py-4">
              <button 
                aria-label="Close menu" 
                onClick={() => setOpen(false)}
                className="rounded-xl p-2.5 transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="grid gap-2">
              <Link 
                href="/" 
                onClick={() => setOpen(false)} 
                className={`rounded-xl px-5 py-4 font-display font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/calculators" 
                onClick={() => setOpen(false)} 
                className={`rounded-xl px-5 py-4 font-display font-medium transition-colors ${
                  isActive('/calculators')
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
              >
                Calculators
              </Link>
              <Link 
                href="/converters" 
                onClick={() => setOpen(false)} 
                className={`rounded-xl px-5 py-4 font-display font-medium transition-colors ${
                  isActive('/converters')
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
              >
                Converters
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setOpen(false)} 
                className={`rounded-xl px-5 py-4 font-display font-medium transition-colors ${
                  isActive('/contact')
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


