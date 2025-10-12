"use client"

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
    // Only run on client-side
    if (typeof window === 'undefined' || adInitialized.current) return

    try {
      const pushAd = () => {
        if (adRef.current) {
          // Initialize adsbygoogle array if it doesn't exist
          if (!window.adsbygoogle) {
            window.adsbygoogle = [] as unknown as AdSensePushable[]
          }
          
          // Push ad configuration
          if (Array.isArray(window.adsbygoogle)) {
            window.adsbygoogle.push({} as any)
            adInitialized.current = true
          }
        }
      }

      // Check if adsbygoogle is already loaded
      if (window.adsbygoogle) {
        pushAd()
      } else {
        // If not, wait for it to load
        const script = document.createElement('script')
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        script.async = true
        script.crossOrigin = 'anonymous'
        script.onload = pushAd
        document.head.appendChild(script)
      }
    } catch (e) {
      console.error('AdSense Error:', e)
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

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
        data-ad-client="ca-pub-1234567890123456" // Replace with your actual publisher ID
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
