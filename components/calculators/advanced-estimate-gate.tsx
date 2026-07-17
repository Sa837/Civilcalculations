'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Sparkles, Lock, Unlock, Gauge, Eye, Download, FileText, AlertTriangle, PlayCircle } from 'lucide-react'

/**
 * PREMIUM UNLOCK VIA REWARDED ADS
 * --------------------------------
 * This uses Google's Ad Placement API (the same API AdSense uses for
 * rewarded ads in HTML5 games). It is NOT a normal <ins class="adsbygoogle">
 * banner — that ad type has no concept of "watched" and can't gate anything.
 *
 * Requirements for this to actually work in production:
 * 1. Your AdSense account must be eligible/approved for rewarded ads
 *    (Ad Placement API). Not every account has this enabled — it is a
 *    limited-availability product. If it isn't enabled, `adBreak` will
 *    report no ad available and users will see the "no ad available" state
 *    below instead of a silent unlock.
 * 2. Replace AD_CLIENT below with your real ca-pub id (already set).
 * 3. Remove `adBreakTest` / set it to false before going live — it forces
 *    a test ad so you can verify the flow without burning real inventory.
 */
const AD_CLIENT = 'ca-pub-2472384896413922'
const STORAGE_PREFIX = 'premium-unlock:'

let unlockVersion = 0
const subscribers = new Set<() => void>()
function subscribe(cb: () => void) {
  subscribers.add(cb)
  return () => subscribers.delete(cb)
}
function notifySubscribers() {
  unlockVersion += 1
  subscribers.forEach((cb) => cb())
}

export function getPremiumStorageKey(calculatorId: string) {
  return `${STORAGE_PREFIX}${calculatorId.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function readUnlocked(storageKey: string): boolean {
  unlockVersion
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(storageKey) === 'true'
}

// ---- Ad Placement API loader (loaded once, shared across all calculators) ----

type AdBreakConfig = {
  type: 'reward'
  name: string
  beforeAd?: () => void
  afterAd?: () => void
  beforeReward?: (showAdFn: () => void) => void
  adDismissed?: () => void
  adViewed?: () => void
  adBreakDone?: (placementInfo: { breakType?: string; breakStatus?: string; breakName?: string }) => void
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
    adBreak?: (config: AdBreakConfig) => void
    adConfig?: (config: Record<string, unknown>) => void
  }
}

let adPlacementLoadPromise: Promise<void> | null = null

function loadAdPlacementApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.adBreak) return Promise.resolve()
  if (adPlacementLoadPromise) return adPlacementLoadPromise

  adPlacementLoadPromise = new Promise((resolve, reject) => {
    window.adsbygoogle = window.adsbygoogle || []
    // Required shim per Google's Ad Placement API docs.
    window.adBreak = window.adConfig = function (o: AdBreakConfig | Record<string, unknown>) {
      ;(window.adsbygoogle as unknown[]).push(o)
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
    )
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`
    script.setAttribute('data-ad-client', AD_CLIENT)
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load AdSense script'))
    document.head.appendChild(script)
  })

  return adPlacementLoadPromise
}

// ---- Unlock hook ----

type UnlockStatus = 'idle' | 'loading' | 'watching' | 'unavailable' | 'dismissed' | 'unlocked'

interface UsePremiumUnlockOptions {
  /** Forces a guaranteed test ad instead of a real one. Set false before shipping. */
  testMode?: boolean
}

export function usePremiumUnlock(calculatorId: string, options: UsePremiumUnlockOptions = {}) {
  const { testMode = false } = options
  const storageKey = getPremiumStorageKey(calculatorId)
  const [status, setStatus] = useState<UnlockStatus>('idle')
  const pendingComplete = useRef<(() => void) | undefined>(undefined)

  const isUnlocked = useSyncExternalStore(
    subscribe,
    () => readUnlocked(storageKey),
    () => false,
  )

  const grantUnlock = useCallback(() => {
    window.sessionStorage.setItem(storageKey, 'true')
    notifySubscribers()
    setStatus('unlocked')
    pendingComplete.current?.()
    pendingComplete.current = undefined
  }, [storageKey])

  const requestRewardedAd = useCallback(
    async (onComplete?: () => void) => {
      if (readUnlocked(storageKey)) {
        onComplete?.()
        return
      }
      if (status === 'loading' || status === 'watching') return

      pendingComplete.current = onComplete
      setStatus('loading')

      try {
        await loadAdPlacementApi()
      } catch {
        setStatus('unavailable')
        return
      }

      if (!window.adBreak) {
        setStatus('unavailable')
        return
      }

      window.adBreak({
        type: 'reward',
        name: `premium-unlock-${calculatorId}`,
        beforeAd: () => {
          // Ad is about to show — pause anything noisy/animated here if needed.
        },
        afterAd: () => {
          // Ad finished (viewed or dismissed) — cleanup point.
        },
        beforeReward: (showAdFn) => {
          // An ad is ready. Show it immediately since the user already
          // clicked "Unlock with ad" (this must fire from a user gesture).
          setStatus('watching')
          showAdFn()
        },
        adViewed: () => {
          // User watched the full ad — grant the reward.
          grantUnlock()
        },
        adDismissed: () => {
          // User closed the ad before it finished — no reward.
          setStatus('dismissed')
          pendingComplete.current = undefined
        },
        adBreakDone: (placementInfo) => {
          // Fires even when no ad was available at all.
          if (placementInfo?.breakStatus && placementInfo.breakStatus !== 'viewed') {
            setStatus((current) => (current === 'watching' ? 'dismissed' : 'unavailable'))
          }
        },
        ...(testMode ? ({ adBreakTest: 'on' } as Record<string, unknown>) : {}),
      })
    },
    [storageKey, status, calculatorId, testMode, grantUnlock],
  )

  const retry = useCallback(
    (onComplete?: () => void) => {
      setStatus('idle')
      requestRewardedAd(onComplete)
    },
    [requestRewardedAd],
  )

  return {
    isUnlocked,
    status,
    isUnlocking: status === 'loading' || status === 'watching',
    unlock: requestRewardedAd,
    retry,
    calculatorId,
  }
}

// ---- UI components (same amber theme as before) ----

const DEFAULT_FEATURES = [
  { icon: FileText, label: 'Detailed quantity summary' },
  { icon: Eye, label: 'Step-by-step calculation' },
  { icon: Download, label: 'PDF / Excel export' },
]

interface PremiumUnlockPanelProps {
  calculatorId: string
  title?: string
  description?: string
  className?: string
  testMode?: boolean
}

export function PremiumUnlockPanel({
  calculatorId,
  title = 'Premium Estimate Features',
  description = 'Watch a short rewarded ad to unlock detailed summary, step-by-step breakdown, and export options.',
  className = '',
  testMode = false,
}: PremiumUnlockPanelProps) {
  const { isUnlocked, status, unlock, retry } = usePremiumUnlock(calculatorId, { testMode })

  if (isUnlocked) return null

  return (
    <div
      className={`rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm dark:border-amber-700/30 dark:from-amber-900/20 dark:to-slate-900/60 ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>

        {status === 'unavailable' || status === 'dismissed' ? (
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-700 dark:bg-slate-900 dark:text-red-300"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {status === 'dismissed' ? 'Ad closed early — try again' : 'No ad available — retry'}
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => unlock()}
            disabled={status === 'loading' || status === 'watching'}
            className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-300"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Gauge className="h-4 w-4 animate-spin" />
                Loading ad…
              </span>
            ) : status === 'watching' ? (
              <span className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4 animate-pulse" />
                Watching ad…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Unlock with ad
              </span>
            )}
          </button>
        )}
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {DEFAULT_FEATURES.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 rounded-lg border border-amber-200/50 bg-white/80 px-3 py-2 text-sm text-slate-700 dark:border-amber-700/30 dark:bg-slate-900/50 dark:text-slate-200"
          >
            <Icon className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            {label}
          </li>
        ))}
      </ul>

      {status === 'unavailable' && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700 dark:border-red-700/30 dark:bg-red-900/20 dark:text-red-300">
          No rewarded ad is available right now. This can happen if your AdSense account
          isn&apos;t yet approved for rewarded ads, or if no ad filled for this request. Please
          try again shortly.
        </div>
      )}
      {status === 'dismissed' && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700 dark:border-red-700/30 dark:bg-red-900/20 dark:text-red-300">
          You closed the ad before it finished, so premium features weren&apos;t unlocked. Watch
          the full ad to unlock.
        </div>
      )}

      <div className="mt-4 rounded-xl border border-dashed border-amber-300/70 bg-white/80 p-3 text-sm text-slate-700 dark:border-amber-700/40 dark:bg-slate-900/60 dark:text-slate-200">
        Your basic calculation is ready. Unlock premium features below to view the full estimate summary.
      </div>

      {process.env.NODE_ENV !== 'production' && (
        <button
          type="button"
          onClick={() => {
            window.sessionStorage.removeItem(getPremiumStorageKey(calculatorId))
            notifySubscribers()
          }}
          className="mt-3 text-xs text-slate-400 underline decoration-dotted hover:text-slate-600"
        >
          Dev only: reset unlock for this calculator
        </button>
      )}
    </div>
  )
}

interface PremiumFeatureGateProps {
  calculatorId: string
  children: ReactNode
  title?: string
  description?: string
  className?: string
  testMode?: boolean
}

export function PremiumFeatureGate({
  calculatorId,
  children,
  title,
  description,
  className,
  testMode = false,
}: PremiumFeatureGateProps) {
  const { isUnlocked } = usePremiumUnlock(calculatorId, { testMode })

  if (!isUnlocked) {
    return (
      <PremiumUnlockPanel
        calculatorId={calculatorId}
        title={title}
        description={description}
        className={className}
        testMode={testMode}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm text-emerald-700 dark:border-emerald-700/30 dark:bg-emerald-900/20 dark:text-emerald-300">
        <Unlock className="h-4 w-4" />
        Premium features unlocked for this session
      </div>
      {children}
    </div>
  )
}

interface PremiumLockedButtonProps {
  calculatorId: string
  onAuthorizedClick: () => void
  children: ReactNode
  className?: string
  activeClassName?: string
  inactiveClassName?: string
  isActive?: boolean
  disabled?: boolean
  testMode?: boolean
}

export function PremiumLockedButton({
  calculatorId,
  onAuthorizedClick,
  children,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
  isActive = false,
  disabled = false,
  testMode = false,
}: PremiumLockedButtonProps) {
  const { isUnlocked, isUnlocking, unlock } = usePremiumUnlock(calculatorId, { testMode })

  const handleClick = () => {
    if (disabled || isUnlocking) return
    if (isUnlocked) {
      onAuthorizedClick()
    } else {
      unlock(onAuthorizedClick)
    }
  }

  const stateClass = isActive ? activeClassName : inactiveClassName

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isUnlocking}
      className={`${stateClass} ${className}`}
    >
      {!isUnlocked && !isUnlocking && <Lock className="mr-1 inline h-3.5 w-3.5" />}
      {isUnlocking ? 'Watching ad…' : children}
    </button>
  )
}

interface PremiumLockedActionProps {
  calculatorId: string
  onAuthorizedClick: () => void
  children: ReactNode
  className?: string
  testMode?: boolean
}

/** Inline export/action control that requires watching a rewarded ad */
export function PremiumLockedAction({
  calculatorId,
  onAuthorizedClick,
  children,
  className = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium dark:border-slate-600 dark:bg-slate-800',
  testMode = false,
}: PremiumLockedActionProps) {
  const { isUnlocked, isUnlocking, unlock } = usePremiumUnlock(calculatorId, { testMode })

  const handleClick = () => {
    if (isUnlocking) return
    if (isUnlocked) {
      onAuthorizedClick()
    } else {
      unlock(onAuthorizedClick)
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={isUnlocking} className={className}>
      {!isUnlocked && !isUnlocking && <Lock className="mr-1 inline h-3.5 w-3.5" />}
      {isUnlocking ? 'Watching ad…' : children}
    </button>
  )
}

/** @deprecated Use PremiumFeatureGate instead */
export default function AdvancedEstimateGate({
  title,
  description,
  insights,
  className,
}: {
  title: string
  description: string
  insights: { label: string; value: string; unit?: string }[]
  className?: string
}) {
  const calculatorId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <PremiumFeatureGate calculatorId={calculatorId} title={title} description={description} className={className}>
      <ul className="space-y-2 text-sm">
        {insights.map((item) => (
          <li key={item.label} className="flex justify-between rounded-lg bg-white/70 px-3 py-2 dark:bg-slate-900/50">
            <span>{item.label}</span>
            <span className="font-semibold">
              {item.value}
              {item.unit ? ` ${item.unit}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </PremiumFeatureGate>
  )
}'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Sparkles, Lock, Unlock, Gauge, Eye, Download, FileText, AlertTriangle } from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

const STORAGE_PREFIX = 'premium-unlock:'
// Minimum time (ms) the ad must be "showing" before we allow unlock,
// even if AdSense reports the slot as done rendering almost instantly.
const MIN_WATCH_MS = 6000
// How long to wait for the ad to render at all before treating it as blocked/failed.
const AD_LOAD_TIMEOUT_MS = 8000

let unlockVersion = 0
const subscribers = new Set<() => void>()

function subscribe(cb: () => void) {
  subscribers.add(cb)
  return () => subscribers.delete(cb)
}

function notifySubscribers() {
  unlockVersion += 1
  subscribers.forEach((cb) => cb())
}

export function getPremiumStorageKey(calculatorId: string) {
  return `${STORAGE_PREFIX}${calculatorId.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function readUnlocked(storageKey: string): boolean {
  unlockVersion
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(storageKey) === 'true'
}

type UnlockStatus = 'idle' | 'waiting' | 'blocked' | 'unlocked'

export function usePremiumUnlock(calculatorId: string) {
  const storageKey = getPremiumStorageKey(calculatorId)
  const [status, setStatus] = useState<UnlockStatus>('idle')
  const timers = useRef<{ poll?: number; loadTimeout?: number; minWait?: number }>({})
  const adReadyRef = useRef(false)
  const minWaitDoneRef = useRef(false)

  const isUnlocked = useSyncExternalStore(
    subscribe,
    () => readUnlocked(storageKey),
    () => false,
  )

  const clearTimers = () => {
    if (timers.current.poll) window.clearInterval(timers.current.poll)
    if (timers.current.loadTimeout) window.clearTimeout(timers.current.loadTimeout)
    if (timers.current.minWait) window.clearTimeout(timers.current.minWait)
    timers.current = {}
  }

  useEffect(() => clearTimers, [])

  const finishUnlock = useCallback(
    (onComplete?: () => void) => {
      window.sessionStorage.setItem(storageKey, 'true')
      notifySubscribers()
      setStatus('unlocked')
      clearTimers()
      onComplete?.()
    },
    [storageKey],
  )

  const maybeFinish = useCallback(
    (onComplete?: () => void) => {
      // Require BOTH: the ad slot actually rendered, AND the minimum watch time elapsed.
      if (adReadyRef.current && minWaitDoneRef.current) {
        finishUnlock(onComplete)
      }
    },
    [finishUnlock],
  )

  const unlock = useCallback(
    (onComplete?: () => void) => {
      if (readUnlocked(storageKey)) {
        onComplete?.()
        return
      }
      if (status === 'waiting') return

      adReadyRef.current = false
      minWaitDoneRef.current = false
      setStatus('waiting')

      // Poll for the real AdSense "done rendering" attribute.
      timers.current.poll = window.setInterval(() => {
        const adElement = document.querySelector(
          '.adsbygoogle[data-adsbygoogle-status="done"]',
        )
        if (adElement) {
          adReadyRef.current = true
          window.clearInterval(timers.current.poll)
          maybeFinish(onComplete)
        }
      }, 300)

      // If the ad never renders (adblocker, no fill, offline), mark as blocked
      // instead of silently unlocking.
      timers.current.loadTimeout = window.setTimeout(() => {
        if (!adReadyRef.current) {
          clearTimers()
          setStatus('blocked')
        }
      }, AD_LOAD_TIMEOUT_MS)

      // Minimum watch time regardless of how fast the ad "finishes".
      timers.current.minWait = window.setTimeout(() => {
        minWaitDoneRef.current = true
        maybeFinish(onComplete)
      }, MIN_WATCH_MS)
    },
    [storageKey, status, maybeFinish],
  )

  const retry = useCallback(
    (onComplete?: () => void) => {
      setStatus('idle')
      unlock(onComplete)
    },
    [unlock],
  )

  return { isUnlocked, status, isUnlocking: status === 'waiting', unlock, retry, calculatorId }
}

const DEFAULT_FEATURES = [
  { icon: FileText, label: 'Detailed quantity summary' },
  { icon: Eye, label: 'Step-by-step calculation' },
  { icon: Download, label: 'PDF / Excel export' },
]

interface PremiumUnlockPanelProps {
  calculatorId: string
  title?: string
  description?: string
  className?: string
}

export function PremiumUnlockPanel({
  calculatorId,
  title = 'Premium Estimate Features',
  description = 'Watch the ad below to unlock detailed summary, step-by-step breakdown, and export options.',
  className = '',
}: PremiumUnlockPanelProps) {
  const { isUnlocked, status, unlock, retry } = usePremiumUnlock(calculatorId)

  if (isUnlocked) return null

  return (
    <div
      className={`rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm dark:border-amber-700/30 dark:from-amber-900/20 dark:to-slate-900/60 ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>

        {status === 'blocked' ? (
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-700 dark:bg-slate-900 dark:text-red-300"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Ad blocked — retry
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => unlock()}
            disabled={status === 'waiting'}
            className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-300"
          >
            {status === 'waiting' ? (
              <span className="flex items-center gap-2">
                <Gauge className="h-4 w-4 animate-spin" />
                Watching ad…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Unlock with ad
              </span>
            )}
          </button>
        )}
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {DEFAULT_FEATURES.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 rounded-lg border border-amber-200/50 bg-white/80 px-3 py-2 text-sm text-slate-700 dark:border-amber-700/30 dark:bg-slate-900/50 dark:text-slate-200"
          >
            <Icon className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            {label}
          </li>
        ))}
      </ul>

      {status === 'blocked' && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700 dark:border-red-700/30 dark:bg-red-900/20 dark:text-red-300">
          We couldn&apos;t load an ad — this is usually caused by an adblocker. Please disable it
          for this site and try again.
        </div>
      )}

      <div className="mt-4 rounded-xl border border-dashed border-amber-300/70 bg-white/80 p-3 text-sm text-slate-700 dark:border-amber-700/40 dark:bg-slate-900/60 dark:text-slate-200">
        Your basic calculation is ready. Unlock premium features below to view the full estimate summary.
      </div>
      <AdSlot
        slotId="8833542673"
        position="inline"
        format="auto"
        responsive="true"
        className="my-0"
      />

      {process.env.NODE_ENV !== 'production' && (
        <button
          type="button"
          onClick={() => {
            window.sessionStorage.removeItem(getPremiumStorageKey(calculatorId))
            notifySubscribers()
          }}
          className="mt-3 text-xs text-slate-400 underline decoration-dotted hover:text-slate-600"
        >
          Dev only: reset unlock for this calculator
        </button>
      )}
    </div>
  )
}

interface PremiumFeatureGateProps {
  calculatorId: string
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

export function PremiumFeatureGate({
  calculatorId,
  children,
  title,
  description,
  className,
}: PremiumFeatureGateProps) {
  const { isUnlocked } = usePremiumUnlock(calculatorId)

  if (!isUnlocked) {
    return (
      <PremiumUnlockPanel
        calculatorId={calculatorId}
        title={title}
        description={description}
        className={className}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm text-emerald-700 dark:border-emerald-700/30 dark:bg-emerald-900/20 dark:text-emerald-300">
        <Unlock className="h-4 w-4" />
        Premium features unlocked for this session
      </div>
      {children}
    </div>
  )
}

interface PremiumLockedButtonProps {
  calculatorId: string
  onAuthorizedClick: () => void
  children: ReactNode
  className?: string
  activeClassName?: string
  inactiveClassName?: string
  isActive?: boolean
  disabled?: boolean
}

export function PremiumLockedButton({
  calculatorId,
  onAuthorizedClick,
  children,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
  isActive = false,
  disabled = false,
}: PremiumLockedButtonProps) {
  const { isUnlocked, isUnlocking, unlock } = usePremiumUnlock(calculatorId)

  const handleClick = () => {
    if (disabled || isUnlocking) return
    if (isUnlocked) {
      onAuthorizedClick()
    } else {
      unlock(onAuthorizedClick)
    }
  }

  const stateClass = isActive ? activeClassName : inactiveClassName

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isUnlocking}
      className={`${stateClass} ${className}`}
    >
      {!isUnlocked && !isUnlocking && <Lock className="mr-1 inline h-3.5 w-3.5" />}
      {isUnlocking ? 'Unlocking…' : children}
    </button>
  )
}

interface PremiumLockedActionProps {
  calculatorId: string
  onAuthorizedClick: () => void
  children: ReactNode
  className?: string
}

/** Inline export/action control that requires ad unlock */
export function PremiumLockedAction({
  calculatorId,
  onAuthorizedClick,
  children,
  className = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium dark:border-slate-600 dark:bg-slate-800',
}: PremiumLockedActionProps) {
  const { isUnlocked, isUnlocking, unlock } = usePremiumUnlock(calculatorId)

  const handleClick = () => {
    if (isUnlocking) return
    if (isUnlocked) {
      onAuthorizedClick()
    } else {
      unlock(onAuthorizedClick)
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={isUnlocking} className={className}>
      {!isUnlocked && !isUnlocking && <Lock className="mr-1 inline h-3.5 w-3.5" />}
      {isUnlocking ? 'Unlocking…' : children}
    </button>
  )
}

/** @deprecated Use PremiumFeatureGate instead */
export default function AdvancedEstimateGate({
  title,
  description,
  insights,
  className,
}: {
  title: string
  description: string
  insights: { label: string; value: string; unit?: string }[]
  className?: string
}) {
  const calculatorId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <PremiumFeatureGate calculatorId={calculatorId} title={title} description={description} className={className}>
      <ul className="space-y-2 text-sm">
        {insights.map((item) => (
          <li key={item.label} className="flex justify-between rounded-lg bg-white/70 px-3 py-2 dark:bg-slate-900/50">
            <span>{item.label}</span>
            <span className="font-semibold">
              {item.value}
              {item.unit ? ` ${item.unit}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </PremiumFeatureGate>
  )
}
