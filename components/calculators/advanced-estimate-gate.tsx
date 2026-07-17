'use client'

import { useCallback, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Sparkles, Lock, Unlock, Gauge, Eye, Download, FileText } from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

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

export function usePremiumUnlock(calculatorId: string) {
  const storageKey = getPremiumStorageKey(calculatorId)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)

  const isUnlocked = useSyncExternalStore(
    subscribe,
    () => readUnlocked(storageKey),
    () => false,
  )

  const unlock = useCallback(
    (onComplete?: () => void) => {
      if (readUnlocked(storageKey)) {
        onComplete?.()
        return
      }
      if (isUnlocking) return
      setIsUnlocking(true)
      setAdLoaded(false)
      
      // Wait for ad to load before unlocking
      const checkAdLoaded = () => {
        const adElement = document.querySelector('.adsbygoogle[data-ad-status="done"]')
        if (adElement) {
          setAdLoaded(true)
          window.sessionStorage.setItem(storageKey, 'true')
          notifySubscribers()
          setIsUnlocking(false)
          onComplete?.()
        } else {
          // Fallback: unlock after 3 seconds if ad doesn't load
          setTimeout(() => {
            if (!adLoaded) {
              setAdLoaded(true)
              window.sessionStorage.setItem(storageKey, 'true')
              notifySubscribers()
              setIsUnlocking(false)
              onComplete?.()
            }
          }, 3000)
        }
      }

      // Start checking for ad load
      setTimeout(checkAdLoaded, 500)
    },
    [storageKey, isUnlocking, adLoaded],
  )

  return { isUnlocked, isUnlocking, unlock, calculatorId, adLoaded, setAdLoaded }
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
  const { isUnlocked, isUnlocking, unlock, adLoaded } = usePremiumUnlock(calculatorId)

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
        <button
          type="button"
          onClick={() => unlock()}
          disabled={isUnlocking}
          className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-300"
        >
          {isUnlocking ? (
            <span className="flex items-center gap-2">
              <Gauge className="h-4 w-4 animate-spin" />
              {adLoaded ? 'Unlocking…' : 'Loading ad…'}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Unlock with ad
            </span>
          )}
        </button>
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

      <div className="mt-4 rounded-xl border border-dashed border-amber-300/70 bg-white/80 p-3 text-sm text-slate-700 dark:border-amber-700/40 dark:bg-slate-900/60 dark:text-slate-200">
        Your basic calculation is ready. Unlock premium features below to view the full estimate summary.
      </div>
      <AdSlot
        slotId={`${getPremiumStorageKey(calculatorId).replace(/[^a-z0-9-]+/g, '')}-inline`}
        position="inline"
        className="my-0"
      />
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
