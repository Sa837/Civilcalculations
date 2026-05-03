'use client'

export default function AdSenseAd() {
  return (
    <div className="min-h-[280px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
      <script
        async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2472384896413922"
          crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2472384896413922"
        data-ad-slot="4121346160"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script dangerouslySetInnerHTML={{
        __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
      }} />
    </div>
  )
}
