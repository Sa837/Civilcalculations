"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "cc_consent_v1"

type ConsentState = {
  necessary: true
  analytics: boolean
  advertising: boolean
  functional: boolean
}

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ConsentState) : null
  } catch {
    return null
  }
}

export default function ConsentScripts() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    const apply = () => {
      const c = readConsent()
      if (!c) return
      if (c.analytics) loadGA()
      if (c.advertising) loadAdSense()
    }
    apply()
    const onChange = () => apply()
    window.addEventListener('consentChanged', onChange)
    return () => window.removeEventListener('consentChanged', onChange)
  }, [])

  function loadGA() {
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (!gaId) return
    if (document.getElementById('ga4-base')) return

    // gtag base
    const s1 = document.createElement('script')
    s1.id = 'ga4-base'
    s1.async = true
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(s1)

    const s2 = document.createElement('script')
    s2.id = 'ga4-config'
    s2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);} 
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    `
    document.head.appendChild(s2)
  }

  function loadAdSense() {
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
    if (!client) return
    if (document.getElementById('adsbygoogle-js')) return

    const meta = document.createElement('meta')
    meta.name = 'google-adsense-account'
    meta.content = client
    document.head.appendChild(meta)

    const s = document.createElement('script')
    s.id = 'adsbygoogle-js'
    s.async = true
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
    s.crossOrigin = 'anonymous'
    document.head.appendChild(s)
  }

  if (!ready) return null
  return null
}
