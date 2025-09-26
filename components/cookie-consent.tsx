"use client"

import { useEffect, useState } from "react"

// Types
type ConsentCategory = "necessary" | "analytics" | "advertising" | "functional"

type ConsentState = {
  necessary: true
  analytics: boolean
  advertising: boolean
  functional: boolean
  timestamp?: number
}

const STORAGE_KEY = "cc_consent_v1"

function getInitialConsent(): ConsentState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    return parsed
  } catch {
    return null
  }
}

function saveConsent(consent: ConsentState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, timestamp: Date.now() }))
  } catch {}
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({ necessary: true, analytics: false, advertising: false, functional: false })

  // Load saved consent
  useEffect(() => {
    setMounted(true)
    const saved = getInitialConsent()
    if (saved) {
      setConsent(saved)
      setShowBanner(false)
      applyConsent(saved)
    } else {
      setShowBanner(true)
    }

    // Listen for global open event from footer
    function onOpenPrefs() {
      setPrefsOpen(true)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('openCookiePrefs', onOpenPrefs)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('openCookiePrefs', onOpenPrefs)
      }
    }
  }, [])

  // Apply consent to window flags (e.g., GA disable) and AdSense
  function applyConsent(c: ConsentState) {
    if (typeof window === "undefined") return

    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (gaId) {
      ;(window as any)[`ga-disable-${gaId}`] = !c.analytics
    }

    // AdSense loads only if advertising is true via layout scripts; nothing else to do here
  }

  function acceptAll() {
    const next: ConsentState = { necessary: true, analytics: true, advertising: true, functional: true }
    setConsent(next)
    saveConsent(next)
    applyConsent(next)
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('consentChanged'))
    setShowBanner(false)
    setPrefsOpen(false)
  }

  function rejectNonEssential() {
    const next: ConsentState = { necessary: true, analytics: false, advertising: false, functional: false }
    setConsent(next)
    saveConsent(next)
    applyConsent(next)
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('consentChanged'))
    setShowBanner(false)
    setPrefsOpen(false)
  }

  function savePreferences() {
    saveConsent(consent)
    applyConsent(consent)
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('consentChanged'))
    setShowBanner(false)
    setPrefsOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/20 bg-surface/95 backdrop-blur dark:border-slate-800/20 dark:bg-surface-dark/95">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="font-sans text-sm text-body/80 dark:text-body-dark/80">
                  We use cookies to enhance your experience, analyze traffic, and serve personalized ads. You can manage your preferences.
                  See our <a href="/privacy" className="underline hover:no-underline">Privacy Policy</a> and <a href="/cookies" className="underline hover:no-underline">Cookie Policy</a>.
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setPrefsOpen(true)} className="rounded-lg border border-slate-200/30 bg-transparent px-4 py-2 font-sans text-sm text-body hover:bg-slate-50 dark:border-slate-800/40 dark:text-body-dark dark:hover:bg-white/5">
                  Manage Preferences
                </button>
                <button onClick={rejectNonEssential} className="rounded-lg border border-slate-200/30 bg-transparent px-4 py-2 font-sans text-sm text-body hover:bg-slate-50 dark:border-slate-800/40 dark:text-body-dark dark:hover:bg-white/5">
                  Reject Non-essential
                </button>
                <button onClick={acceptAll} className="rounded-lg bg-primary px-4 py-2 font-sans text-sm font-medium text-white hover:opacity-90">
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {prefsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPrefsOpen(false)} />
          <div className="relative z-10 m-4 w-full max-w-xl rounded-2xl border border-slate-200/20 bg-surface p-6 shadow-xl dark:border-slate-800/20 dark:bg-surface-dark">
            <h2 className="mb-2 font-display text-2xl font-semibold text-heading dark:text-heading-dark">Cookie Preferences</h2>
            <p className="mb-6 font-sans text-sm text-body/70 dark:text-body-dark/70">Control how we use cookies on this site.</p>

            <div className="space-y-4">
              <PreferenceRow
                title="Strictly Necessary"
                description="Required for core site functionality. Always on."
                checked={true}
                disabled
                onChange={() => {}}
              />
              <PreferenceRow
                title="Analytics"
                description="Helps us understand usage to improve the site (e.g., Google Analytics)."
                checked={consent.analytics}
                onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
              />
              <PreferenceRow
                title="Advertising"
                description="Used to personalize and measure ads (e.g., Google AdSense)."
                checked={consent.advertising}
                onChange={(v) => setConsent((c) => ({ ...c, advertising: v }))}
              />
              <PreferenceRow
                title="Functional"
                description="Enhances functionality like remembering preferences."
                checked={consent.functional}
                onChange={(v) => setConsent((c) => ({ ...c, functional: v }))}
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setPrefsOpen(false)} className="rounded-lg border border-slate-200/30 bg-transparent px-4 py-2 font-sans text-sm text-body hover:bg-slate-50 dark:border-slate-800/40 dark:text-body-dark dark:hover:bg-white/5">
                Cancel
              </button>
              <button onClick={savePreferences} className="rounded-lg bg-primary px-4 py-2 font-sans text-sm font-medium text-white hover:opacity-90">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function PreferenceRow({ title, description, checked, onChange, disabled }: { title: string; description: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200/20 bg-surface/50 p-4 dark:border-slate-800/20 dark:bg-surface-dark/50">
      <div>
        <p className="font-sans text-sm font-medium text-heading dark:text-heading-dark">{title}</p>
        <p className="font-sans text-xs text-body/70 dark:text-body-dark/70">{description}</p>
      </div>
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled} />
        <div className="peer h-6 w-11 rounded-full bg-slate-300/60 after:absolute after:mt-[2px] after:ml-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full dark:bg-slate-700/60" />
      </label>
    </div>
  )
}
