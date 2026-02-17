'use client'

import { useEffect, useRef } from 'react'

interface AdSenseAdProps {
  slot: string
  format?: string
  style?: React.CSSProperties
  className?: string
}

export const AdSenseAd = ({
  slot,
  format = 'auto',
  style = {},
  className = '',
}: AdSenseAdProps) => {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    // Ensure AdSense script is loaded
    if (
      typeof window !== 'undefined' &&
      !document.querySelector('script[src*="pagead2.googlesyndication.com"]')
    ) {
      const script = document.createElement('script')
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2472384896413922'
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }

    const el = adRef.current
    if (!el) return
    const alreadyDone = el.getAttribute('data-adsbygoogle-status') === 'done'
    const alreadyInitialized = el.dataset.adInit === 'true'
    if (alreadyDone || alreadyInitialized) return

    try {
      if (typeof window !== 'undefined') {
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        el.dataset.adInit = 'true'
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-2472384896413922"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
