'use client';

import { useEffect } from 'react';

type AdUnitProps = {
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  className?: string;
};

export default function AdUnit({
  slot,
  format = 'auto',
  layout = '',
  layoutKey = '',
  className = '',
}: AdUnitProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('Failed to load ad:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2472384896413922"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
}
