'use client'

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
