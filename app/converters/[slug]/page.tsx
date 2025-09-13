"use client"
import { converters } from '../../../lib/registry/converters'
import type { UnitDef } from '../../../lib/convert'
import { adToBs, bsToAd } from '../../../lib/bs-ad-date'
import { useEffect, useMemo, useState } from 'react'
import { Copy, Check, ArrowLeftRight } from 'lucide-react'
import Script from 'next/script'
import Link from 'next/link'

type Params = { params: { slug: string } }


export default function ConverterDetail({ params }: Params) {
  // Date converter exclusive state (only for 'date' slug)
  // Default to present date: 7 September 2025 (AD)
  const defaultAdYear = '2025';
  const defaultAdMonth = 'September';
  const defaultAdDate = '7';
  // Example default BS: 23 Ashadh 2064 (placeholder)
  const defaultBsYear = '2064';
  const defaultBsMonth = 'Ashadh';
  const defaultBsDate = '23';
  const [adYear, setAdYear] = useState(defaultAdYear);
  const [adMonth, setAdMonth] = useState(defaultAdMonth);
  const [adDate, setAdDate] = useState(defaultAdDate);
  const [bsYear, setBsYear] = useState(defaultBsYear);
  const [bsMonth, setBsMonth] = useState(defaultBsMonth);
  const [bsDate, setBsDate] = useState(defaultBsDate);
  const [dateResult, setDateResult] = useState('');
  const [convertClicked, setConvertClicked] = useState(false);
  const [dateTab, setDateTab] = useState(0); // 0: AD→BS, 1: BS→AD

  // Reset input fields when swapping direction
  function handleSwapDateTab() {
    setDateTab((prev) => {
      const next = prev === 0 ? 1 : 0;
      // Reset input fields and result for the new direction
      if (next === 0) {
        setAdYear(defaultAdYear);
        setAdMonth(defaultAdMonth);
        setAdDate(defaultAdDate);
      } else {
        setBsYear(defaultBsYear);
        setBsMonth(defaultBsMonth);
        setBsDate(defaultBsDate);
      }
      setDateResult('');
      setConvertClicked(false);
      return next;
    });
  }

  // Update dateResult when fields change (placeholder logic)
  // (Move this below isDateConverter declaration)

  const converter = useMemo(() => converters.find(c => c.slug === params.slug), [params.slug])
  const isDateConverter = converter?.slug === 'date';
  // Support both grouped and flat converters
  const isGrouped = !!(converter && 'groups' in converter && Array.isArray(converter.groups))
  const groups = isGrouped ? (converter as any).groups as { name: string; units: any[] }[] : null
  // Default to first group if grouped, else fallback to units
  const [activeTab, setActiveTab] = useState(0)
  const units = isGrouped ? groups?.[activeTab]?.units ?? [] : (converter as any)?.units ?? []
  const [from, setFrom] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [precision, setPrecision] = useState(6);
  const [copied, setCopied] = useState(false);


  // Update dateResult when fields change (placeholder logic)
  // Only update result when Convert is pressed
  function handleDateConvert(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setConvertClicked(true);
    if (dateTab === 0) {
      if (adDate && adMonth && adYear) {
        const bs = adToBs(adYear, adMonth, adDate);
        setDateResult(bs);
      } else {
        setDateResult('');
      }
    } else {
      if (bsDate && bsMonth && bsYear) {
        const ad = bsToAd(bsYear, bsMonth, bsDate);
        setDateResult(ad);
      } else {
        setDateResult('');
      }
    }
  }

  // Robustly initialize units and reset state on group/tab or converter change
  useEffect(() => {
    if (units && units.length > 0) {
      setFrom('');
      setFromUnit(units[0].symbol);
      setToUnit(units[1]?.symbol ?? units[0].symbol);
      setPrecision(6);
      setCopied(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, activeTab, units]);

  // (No-op: result is computed directly in render for non-date converters)

  if (!converter) return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p>Converter not found. <Link className="text-accent underline" href="/converters">Back</Link></p>
    </main>
  )

  const hasTemp = converter.slug === 'temperature'
  // Real-time result calculation for non-date converters
  let result: number | null = null;
  let unitError: string | null = null;
  let debugError = '';
  if (!isDateConverter) {
    try {
      const validFromUnit = units.find((u: any) => u.symbol === fromUnit);
      const validToUnit = units.find((u: any) => u.symbol === toUnit);
      if (!validFromUnit) unitError = `From unit not found: ${fromUnit}`;
      if (!validToUnit) unitError = `To unit not found: ${toUnit}`;
      const isValidInput = from !== '' && from !== null && from !== undefined && !/^\s+$/.test(from);
      if (validFromUnit && validToUnit && isValidInput) {
        const fromNumber = Number(from);
        if (!Number.isNaN(fromNumber)) {
          try {
            // Use plain JS math for all linear conversions
            // toBase and fromBase are always functions: v => v * factor, v => v / factor
            const base = validFromUnit.toBase(fromNumber);
            result = validToUnit.fromBase(base);
          } catch (err) {
            debugError = 'Conversion failed: ' + (typeof err === 'object' && err && 'message' in err ? (err as any).message : String(err));
            result = null;
          }
        }
      }
    } catch (e: any) {
      debugError = e && e.message ? e.message : String(e);
      result = null;
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link href="/converters" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">← Back to Converters</Link>
      <div className="mt-2 flex items-center gap-3">
        <h1 className="font-display text-3xl font-bold">{converter.title}</h1>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-wide text-primary dark:bg-primary/20">{converter.category}</span>
      </div>
      <p className="mt-1 font-sans text-slate-600 dark:text-slate-300">Convert between units with precision.</p>
      {/* Tabs for grouped converters */}
      {isGrouped && groups && (
        <div className="mt-6 mb-4 flex gap-2">
          {groups.map((g, i) => (
            <button
              key={g.name}
              onClick={() => setActiveTab(i)}
              className={`rounded-xl border px-4 py-2 font-display text-sm font-medium transition-all ${activeTab === i ? 'border-primary bg-primary/10 text-primary' : 'border-slate-300 text-body hover:border-primary hover:text-primary dark:border-slate-600 dark:text-body-dark dark:hover:border-primary'}`}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}
      {/* Date Converter UI */}
      {isDateConverter ? (
        <div className="mt-8">
          {/* Date Converter Tabs */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setDateTab(0)}
              className={`rounded-xl border px-4 py-2 font-display text-sm font-medium transition-all ${
                dateTab === 0 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-slate-300 text-body hover:border-primary hover:text-primary dark:border-slate-600 dark:text-body-dark dark:hover:border-primary'
              }`}
            >
              English to Nepali
            </button>
            <button
              onClick={() => setDateTab(1)}
              className={`rounded-xl border px-4 py-2 font-display text-sm font-medium transition-all ${
                dateTab === 1 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-slate-300 text-body hover:border-primary hover:text-primary dark:border-slate-600 dark:text-body-dark dark:hover:border-primary'
              }`}
            >
              Nepali to English
            </button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <form className="grid gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800" onSubmit={handleDateConvert}>
              {/* Show only the relevant input fields for the active tab */}
              {dateTab === 0 && (
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark">English Date (AD)</h3>
                  <div className="flex gap-2">
                    <div>
                      <label className="font-sans text-sm font-medium">Day</label>
                      <input type="number" min="1" max="32" value={adDate} onChange={e => setAdDate(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium">Month</label>
                      <select value={adMonth} onChange={e => setAdMonth(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                        {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium">Year</label>
                      <input type="number" min="1900" max="2100" value={adYear} onChange={e => setAdYear(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
                    </div>
                  </div>
                </div>
              )}
              {dateTab === 1 && (
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark">Nepali Date (BS)</h3>
                  <div className="flex gap-2">
                    <div>
                      <label className="font-sans text-sm font-medium">Day</label>
                      <input type="number" min="1" max="32" value={bsDate} onChange={e => setBsDate(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium">Month</label>
                      <select value={bsMonth} onChange={e => setBsMonth(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                        {["Baisakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"].map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium">Year</label>
                      <input type="number" min="1970" max="2100" value={bsYear} onChange={e => setBsYear(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90 transition"
                >
                  Convert
                </button>
              </div>
            </form>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <h2 className="font-display text-xl font-semibold">Result</h2>
              <div className="mt-3 min-h-[2.5em] flex items-center">
                {convertClicked && dateResult ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold text-slate-500">{dateTab === 0 ? 'Nepali (BS) Date:' : 'English (AD) Date:'}</span>
                    <span className="text-2xl font-bold text-primary">{dateResult}</span>
                  </div>
                ) : (
                  <span className="text-slate-500 font-sans">Enter a date and click Convert to see the result.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <form className="grid gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800" onSubmit={e => e.preventDefault()}>
            <div className="grid gap-1">
              <label className="font-sans text-sm font-medium">Value</label>
              <input
                type="number"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
            <div className="grid gap-1">
              <label className="font-sans text-sm font-medium">From</label>
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-sans font-medium dark:border-slate-700 dark:bg-slate-900">
                {units.map((u: any) => <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>)}
              </select>
            </div>
            <div className="grid gap-1">
              <label className="font-sans text-sm font-medium">To</label>
              <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-sans font-medium dark:border-slate-700 dark:bg-slate-900">
                {units.map((u: any) => <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button type="button" onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit) }} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"><ArrowLeftRight className="h-4 w-4"/>Swap</button>
              <label className="ml-auto text-sm">Precision</label>
              <input type="number" min={0} max={12} step={1} value={precision} onChange={(e)=>setPrecision(Number(e.target.value))} className="w-20 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"/>
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <h2 className="font-display text-xl font-semibold">Result</h2>
            <div className="mt-3">
              {from === '' ? (
                <p className="font-sans text-slate-500">Enter a value and select units.</p>
              ) : Number.isNaN(Number(from)) ? (
                <p className="font-sans text-red-500">Invalid input</p>
              ) : unitError ? (
                <p className="font-sans text-red-500">{unitError}</p>
              ) : (result !== null ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{result.toLocaleString(undefined, { maximumFractionDigits: precision })}</p>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(result!.toFixed(precision))
                        setCopied(true)
                        setTimeout(() => setCopied(false), 1500)
                      } catch {}
                    }}
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                    className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      copied
                        ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20'
                        : 'border border-slate-300 hover:bg-slate-100/80 dark:border-slate-700 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </button>
                  <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
                </div>
              ) : (
                <p className="font-sans text-red-500">Conversion not available</p>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900">
              {hasTemp ? (
                <p className="font-sans">Temperature uses offset conversions. Base unit is Kelvin. For example, °C → K: K = °C + 273.15; °F → °C: (°F − 32) × 5⁄9.</p>
              ) : (
                <p className="font-sans">Linear conversion via a base unit. We convert to base and then from base using precise factors.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Google AdSense integration */}
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2472384896413922"
        crossOrigin="anonymous"
      />
      <div className="w-full flex justify-center my-4">
        <div style={{ width: '100%', maxWidth: 468, minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: 60 }}
            data-ad-client="ca-pub-2472384896413922"
            data-ad-slot="YOUR_SLOT_ID"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
      <Script id="adsbygoogle-load" strategy="afterInteractive">
        {`(window.adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
      {/* Minimal static footer ad, desktop and mobile friendly */}
      <footer className="w-full flex justify-center mt-12">
        <div id="footer-ad" style={{ width: '100%', maxWidth: 468, minHeight: 60, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: 60 }}
            data-ad-client="ca-pub-2472384896413922"
            data-ad-slot="YOUR_SECOND_SLOT_ID"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </footer>
      <Script id="adsbygoogle-footer-load" strategy="afterInteractive">
        {`(window.adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </main>
  );
}

export function linearUnit(factorToBase: number, symbol: string, name?: string): UnitDef {
  return {
    name: name ?? symbol,
    symbol,
    toBase: (v: number) => v * factorToBase,
    fromBase: (v: number) => v / factorToBase,
  }
}


