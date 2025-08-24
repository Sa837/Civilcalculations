"use client"
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300/20 bg-surface p-2.5 text-heading transition-colors dark:border-slate-700/20 dark:bg-surface-dark dark:text-heading-dark"
        aria-hidden
      >
        <Moon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handleToggle}
      className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300/20 bg-surface p-2.5 text-heading transition-colors hover:bg-slate-100/80 focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-slate-700/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-800/80 dark:focus:ring-primary/20"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}




