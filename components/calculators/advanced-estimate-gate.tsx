'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Sparkles, Lock, Unlock, Eye, Download, FileText, X, Clock } from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

/**
 * PREMIUM UNLOCK VIA TIMED AD MODAL
 * ----------------------------------
 * Simple, reliable, no dependency on Google account eligibility:
 * 1. User clicks "Unlock with ad".
 * 2. A modal opens showing your normal AdSlot (the same ad unit already
 *    working elsewhere on the site).
 * 3. A countdown runs (default 15s). The close button is disabled/hidden
 *    until it reaches 0 — this is what actually enforces "watch the ad".
 * 4. Once the timer finishes, a close (X) button appears. Clicking it
 *    unlocks premium features for the rest of the session and closes
 *    the modal.
 *
 * FIX (this version): the ad container previously used `overflow-hidden`
 * with a fixed `min-h-[250px]`. Network inspection showed AdSense was
 * serving a *backfill* ad (a second internal request after the first
 * came back empty) whose creative size didn't match that fixed box, so
 * the ad was being clipped/hidden by the overflow rule. The container
 * below now lets the ad size itself naturally and never clips it.
 */
const WATCH_SECONDS = 15
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

// ---- Unlock hook ----

export function usePremiumUnlock(calculatorId: string) {
  const storageKey = getPremiumStorageKey(calculatorId)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pendingComplete = useRef<(() => void) | undefined>(undefined)

  const isUnlocked = useSyncExternalStore(
    subscribe,
    () => readUnlocked(storageKey),
    () => false,
  )

  const openUnlockModal = useCallback(
    (onComplete?: () => void) => {
      if (readUnlocked(storageKey)) {
        onComplete?.()
        return
      }
      pendingComplete.current = onComplete
      setIsModalOpen(true)
    },
    [storageKey],
  )

  const finishUnlock = useCallback(() => {
    window.sessionStorage.setItem(storageKey, 'true')
    notifySubscribers()
    setIsModalOpen(false)
    pendingComplete.current?.()
    pendingComplete.current = undefined
  }, [storageKey])

  return {
    isUnlocked,
    isModalOpen,
    openUnlockModal,
    finishUnlock,
    calculatorId,
  }
}

// ---- Ad watch modal ----

interface AdWatchModalProps {
  open: boolean
  onFinish: () => void
  watchSeconds?: number
}

function AdWatchModal({ open, onFinish, watchSeconds = WATCH_SECONDS }: AdWatchModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(watchSeconds)

  useEffect(() => {
    if (!open) return
    setSecondsLeft(watchSeconds)
    const interval = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [open, watchSeconds])

  if (!open) return null

  const canClose = secondsLeft <= 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Watch ad to unlock premium features"
    >
      {/* Wider than before (max-w-md -> max-w-lg) so the backfill ad has
          more horizontal room to render at its natural size. */}
      <div className="relative w-full max-w-lg rounded-2xl border border-amber-200/60 bg-white p-5 shadow-xl dark:border-amber-700/30 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
            <h3 className="text-base font-semibold">Watching ad…</h3>
          </div>

          {canClose ? (
            <button
              type="button"
              onClick={onFinish}
              aria-label="Close and unlock"
              className="rounded-full border border-slate-300 p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              <Clock className="h-3.5 w-3.5" />
              {secondsLeft}s
            </div>
          )}
        </div>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {canClose
            ? 'Thanks for watching! Close this to unlock premium features for your session.'
            : `Please wait ${secondsLeft}s — premium features unlock automatically once the ad finishes.`}
        </p>

        {/*
          FIXED AD CONTAINER
          - removed `overflow-hidden` (was clipping backfill creatives
            that don't match a fixed 250px box)
          - removed the fixed `min-h-[250px]` on the OUTER wrapper; the
            AdSlot component already sets its own min-height, doubling
            it up here caused mismatched box sizes
          - added `w-full` + `flex justify-center` so the ad has full
            modal width available to size itself against, and is
            centered if the served creative is narrower than the modal
          - key={open} forces a clean remount every time the modal opens,
            so a stale/duplicate adsbygoogle push from a previous open
            can never block a fresh one
        */}
        <div
          key={open ? 'ad-open' : 'ad-closed'}
          className="mt-4 flex w-full justify-center overflow-visible rounded-xl border border-dashed border-amber-300/70 bg-amber-50/40 p-2 dark:border-amber-700/40 dark:bg-slate-800/40"
        >
          <AdSlot
            slotId="8833542673"
            position="sidebar"
            format="auto"
            responsive="true"
            fullWidth
          />
        </div>

        {canClose && (
          <button
            type="button"
            onClick={onFinish}
            className="mt-4 w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Continue to premium features
          </button>
        )}
      </div>
    </div>
  )
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
}

export function PremiumUnlockPanel({
  calculatorId,
  title = 'Premium Estimate Features',
  description = `Watch a ${WATCH_SECONDS}-second ad to unlock detailed summary, step-by-step breakdown, and export options.`,
  className = '',
}: PremiumUnlockPanelProps) {
  const { isUnlocked, isModalOpen, openUnlockModal, finishUnlock } = usePremiumUnlock(calculatorId)

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
          onClick={() => openUnlockModal()}
          className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-50 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-300"
        >
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Unlock with ad
          </span>
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

      <AdWatchModal open={isModalOpen} onFinish={finishUnlock} />
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
  const { isUnlocked, isModalOpen, openUnlockModal, finishUnlock } = usePremiumUnlock(calculatorId)

  const handleClick = () => {
    if (disabled) return
    if (isUnlocked) {
      onAuthorizedClick()
    } else {
      openUnlockModal(onAuthorizedClick)
    }
  }

  const stateClass = isActive ? activeClassName : inactiveClassName

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`${stateClass} ${className}`}
      >
        {!isUnlocked && <Lock className="mr-1 inline h-3.5 w-3.5" />}
        {children}
      </button>
      <AdWatchModal open={isModalOpen} onFinish={finishUnlock} />
    </>
  )
}

interface PremiumLockedActionProps {
  calculatorId: string
  onAuthorizedClick: () => void
  children: ReactNode
  className?: string
}

/** Inline export/action control that requires watching a timed ad */
export function PremiumLockedAction({
  calculatorId,
  onAuthorizedClick,
  children,
  className = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium dark:border-slate-600 dark:bg-slate-800',
}: PremiumLockedActionProps) {
  const { isUnlocked, isModalOpen, openUnlockModal, finishUnlock } = usePremiumUnlock(calculatorId)

  const handleClick = () => {
    if (isUnlocked) {
      onAuthorizedClick()
    } else {
      openUnlockModal(onAuthorizedClick)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {!isUnlocked && <Lock className="mr-1 inline h-3.5 w-3.5" />}
        {children}
      </button>
      <AdWatchModal open={isModalOpen} onFinish={finishUnlock} />
    </>
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