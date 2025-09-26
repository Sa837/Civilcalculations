"use client"

// Non-intrusive ad slot placeholder. Renders nothing by default to avoid UI changes.
// In future, hook your ad provider here based on `slotId` or `position`.

export type AdSlotProps = {
  slotId?: string
  position?: 'top' | 'bottom' | 'sidebar' | 'inline'
  className?: string
}

export default function AdSlot(_props: AdSlotProps) {
  // Intentionally return null to preserve exact UI experience
  return null
}
