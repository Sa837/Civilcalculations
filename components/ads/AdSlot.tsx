'use client'

import { useEffect, useRef } from 'react'

export type AdSlotProps = {
  slotId?: string
  position?: 'top' | 'bottom' | 'sidebar' | 'inline'
  className?: string
  format?: string
  layout?: string
  layoutKey?: string
  responsive?: string
  fullWidth?: boolean
  style?: React.CSSProperties
}

export default function AdSlot({
  slotId = 'ad-slot',
  position = 'inline',
  className = '',
  format = 'auto',
  layout = '',
  layoutKey = '',
  responsive = 'false',
  fullWidth = false,
  style = {},
  ...props
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adInitialized = useRef(false)

  // Type for adsbygoogle array elements
  type AdSensePushable = {
    push: (params?: Record<string, unknown>) => void
  }

  useEffect(() => {
    // Client-only
    if (typeof window === 'undefined') return
    if (!adRef.current) return
    if (adInitialized.current) return

    const ins = adRef.current.querySelector('ins.adsbygoogle') as HTMLElement | null
    const alreadyDone = ins?.getAttribute('data-adsbygoogle-status') === 'done'
    const alreadyFlagged = !!ins?.dataset?.adInit
    if (alreadyDone || alreadyFlagged) return

    const pushAd = () => {
      try {
        if (!window.adsbygoogle) {
          window.adsbygoogle = [] as unknown as AdSensePushable[]
        }
        if (Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({} as any)
          if (ins) (ins as any).dataset.adInit = 'true'
          adInitialized.current = true
        }
      } catch (e) {
        console.error('AdSense Error:', e)
      }
    }

    // If library is present, push now
    if (window.adsbygoogle) {
      pushAd()
      return
    }

    // Ensure single script load across app
    const existing = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2472384896413922'
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }

    // Poll until ready, then push once
    let tries = 0
    const id = window.setInterval(() => {
      if (window.adsbygoogle) {
        window.clearInterval(id)
        pushAd()
      } else if (++tries > 50) {
        window.clearInterval(id)
      }
    }, 200)

    return () => {
      // no-op
    }
  }, [slotId])

  // Don't render anything during SSR or if no slotId is provided
  if (typeof window === 'undefined' || !slotId) {
    return null
  }

  return (
    <div
      ref={adRef}
      className={`ad-container ${className} ${fullWidth ? 'w-full' : ''}`}
      style={{
        overflow: 'hidden',
        textAlign: 'center',
        minHeight: position === 'inline' ? '90px' : '250px',
        margin: position === 'inline' ? '1rem 0' : 0,
        ...style,
      }}
      data-position={position}
      {...props}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2472384896413922"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  )
}

// Add TypeScript declaration for the adsbygoogle global
declare global {
  interface Window {
    adsbygoogle?: { push: (params?: any) => void }[]
  }
}
