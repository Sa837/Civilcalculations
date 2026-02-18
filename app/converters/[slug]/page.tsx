'use client'
import { converters } from '../../../lib/registry/converters'
import type { UnitDef } from '../../../lib/convert'
import { adToBs, bsToAd } from '../../../lib/bs-ad-date'
import { useEffect, useMemo, useState } from 'react'
import {
  Copy,
  Check,
  ArrowLeftRight,
  Calculator,
  BookOpen,
  Target,
  Zap,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Script from 'next/script'
import Link from 'next/link'
import { ConversionExplanation } from '@/components/converters/ConversionExplanation'
import AdSlot from '@/components/ads/AdSlot'
import type { Converter } from '@/lib/registry/converters/types'

type Params = { params: { slug: string } }

export default function ConverterDetail({ params }: Params) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Date converter exclusive state (only for 'date' slug)
  // Default to present date: 7 September 2025 (AD)
  const defaultAdYear = '2025'
  const defaultAdMonth = 'September'
  const defaultAdDate = '7'
  // Example default BS: 23 Ashadh 2064 (placeholder)
  const defaultBsYear = '2064'
  const defaultBsMonth = 'Ashadh'
  const defaultBsDate = '23'
  const [adYear, setAdYear] = useState(defaultAdYear)
  const [adMonth, setAdMonth] = useState(defaultAdMonth)
  const [adDate, setAdDate] = useState(defaultAdDate)
  const [bsYear, setBsYear] = useState(defaultBsYear)
  const [bsMonth, setBsMonth] = useState(defaultBsMonth)
  const [bsDate, setBsDate] = useState(defaultBsDate)
  const [dateResult, setDateResult] = useState('')
  const [convertClicked, setConvertClicked] = useState(false)
  const [dateTab, setDateTab] = useState(0) // 0: AD→BS, 1: BS→AD

  // Reset input fields when swapping direction
  function handleSwapDateTab() {
    setDateTab((prev) => {
      const next = prev === 0 ? 1 : 0
      // Reset input fields and result for the new direction
      if (next === 0) {
        setAdYear(defaultAdYear)
        setAdMonth(defaultAdMonth)
        setAdDate(defaultAdDate)
      } else {
        setBsYear(defaultBsYear)
        setBsMonth(defaultBsMonth)
        setBsDate(defaultBsDate)
      }
      setDateResult('')
      setConvertClicked(false)
      return next
    })
  }

  const converter = useMemo(() => converters.find((c) => c.slug === params.slug), [params.slug])
  const isDateConverter = converter?.slug === 'date'
  // Support both grouped and flat converters
  const isGrouped = !!(
    converter &&
    'groups' in converter &&
    Array.isArray((converter as any).groups)
  )
  const groups = isGrouped ? ((converter as any).groups as { name: string; units: any[] }[]) : null
  // Default to first group if grouped, else fallback to units
  const [activeTab, setActiveTab] = useState(0)
  const units = useMemo(
    () => (isGrouped ? (groups?.[activeTab]?.units ?? []) : ((converter as any)?.units ?? [])),
    [isGrouped, groups, activeTab, converter],
  )
  const [from, setFrom] = useState<string>('')
  const [fromUnit, setFromUnit] = useState<string>('')
  const [toUnit, setToUnit] = useState<string>('')
  const [precision, setPrecision] = useState(6)
  const [copied, setCopied] = useState(false)

  // Update dateResult when fields change (placeholder logic)
  // Only update result when Convert is pressed
  function handleDateConvert(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setConvertClicked(true)
    if (dateTab === 0) {
      if (adDate && adMonth && adYear) {
        const bs = adToBs(adYear, adMonth, adDate)
        setDateResult(bs)
      } else {
        setDateResult('')
      }
    } else {
      if (bsDate && bsMonth && bsYear) {
        const ad = bsToAd(bsYear, bsMonth, bsDate)
        setDateResult(ad)
      } else {
        setDateResult('')
      }
    }
  }

  // Robustly initialize units and reset state on group/tab or converter change
  useEffect(() => {
    if (units && units.length > 0) {
      setFrom('')
      setFromUnit(units[0].symbol)
      setToUnit(units[1]?.symbol ?? units[0].symbol)
      setPrecision(6)
      setCopied(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, activeTab, units])

  // Get converter-specific information
  const getConverterInfo = () => {
    if (!converter) return null

    const info = {
      importance: '',
      applications: [] as string[],
      tips: [] as string[],
      accuracy: '',
      commonMistakes: [] as string[],
    }

    switch (converter.slug) {
      case 'length':
        info.importance =
          'Length measurements form the foundation of all construction work. Precise conversions prevent costly errors in dimensions and specifications.'
        info.applications = [
          'Building layouts and architectural drawings',
          'Road and highway design specifications',
          'Material procurement and cutting lists',
          'Surveying and land measurement',
          'Structural steel fabrication',
        ]
        info.tips = [
          'Always measure from the same reference points',
          'Account for thermal expansion in long spans',
          'Use calibrated measuring tools',
          'Document measurement conditions (temperature, humidity)',
        ]
        info.accuracy = '±0.1% for critical structural measurements, ±1% for general construction'
        info.commonMistakes = [
          'Mixing nominal and actual dimensions',
          'Ignoring thermal expansion coefficients',
          'Using outdated conversion factors',
          'Not accounting for manufacturing tolerances',
        ]
        break

      case 'area':
        info.importance =
          'Area calculations directly impact material quantities, costs, and property values. Accurate conversions are crucial for budgeting and compliance.'
        info.applications = [
          'Floor area calculations for construction cost estimation',
          'Land area measurement for property valuation',
          'Paint and flooring material quantity calculations',
          'Roof area determination for waterproofing',
          'Agricultural land measurement',
        ]
        info.tips = [
          'Measure in a grid pattern for irregular areas',
          'Account for unusable spaces (columns, openings)',
          'Use appropriate measurement tools for scale',
          'Verify calculations with independent methods',
        ]
        info.accuracy = '±1% for general construction, ±0.5% for high-precision work'
        info.commonMistakes = [
          'Including unusable spaces in total area',
          'Using wrong conversion factors for area units',
          'Not accounting for surface irregularities',
          'Mixing carpet area with gross floor area',
        ]
        break

      case 'volume':
        info.importance =
          'Volume conversions affect material procurement, transportation costs, and project timelines. Precision ensures optimal resource utilization.'
        info.applications = [
          'Concrete volume calculation for foundations',
          'Water storage tank capacity planning',
          'Earthwork volume estimation for excavations',
          'Material storage and transportation planning',
          'HVAC system capacity calculations',
        ]
        info.tips = [
          'Account for compaction factors in soil volumes',
          'Include air voids in concrete volume calculations',
          'Measure at multiple points for irregular shapes',
          'Consider temperature effects on liquid volumes',
        ]
        info.accuracy = '±2% for bulk materials, ±0.5% for precision applications'
        info.commonMistakes = [
          'Not accounting for compaction in soil volumes',
          'Ignoring air entrainment in concrete',
          'Using wrong specific gravity values',
          'Mixing volume with capacity measurements',
        ]
        break

      case 'temperature':
        info.importance =
          'Temperature conversions are critical in construction for material behavior, equipment operation, and safety considerations.'
        info.applications = [
          'Concrete curing temperature monitoring',
          'HVAC system design and testing',
          'Material thermal expansion calculations',
          'Weather-dependent construction scheduling',
          'Equipment operating temperature specifications',
        ]
        info.tips = [
          'Use appropriate scales for different applications',
          'Account for thermal gradients in large structures',
          'Monitor temperature during concrete curing',
          'Consider seasonal temperature variations',
        ]
        info.accuracy = '±0.5°C for most engineering applications'
        info.commonMistakes = [
          'Using wrong conversion formulas',
          'Not accounting for absolute zero differences',
          'Ignoring significant figure requirements',
          'Mixing temperature with heat energy',
        ]
        break

      default:
        info.importance =
          'Accurate unit conversions are fundamental to successful engineering and construction projects.'
        info.applications = [
          'Engineering calculations',
          'Construction planning',
          'Cost estimation',
          'Regulatory compliance',
        ]
        info.tips = [
          'Verify conversions independently',
          'Use appropriate precision',
          'Document your work',
          'Follow industry standards',
        ]
        info.accuracy = 'Varies by application and engineering requirements'
        info.commonMistakes = [
          'Using outdated conversion factors',
          'Incorrect significant figures',
          'Not verifying results',
        ]
    }

    return info
  }

  const converterInfo = getConverterInfo()

  if (!converter)
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/30">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-heading dark:text-heading-dark">
            Converter Not Found
          </h1>
          <p className="mb-6 text-body/80 dark:text-body-dark/80">
            The converter you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/converters"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Browse All Converters
          </Link>
        </div>
      </main>
    )

  const hasTemp = converter.slug === 'temperature'
  // Real-time result calculation for non-date converters
  let result: number | null = null
  let unitError: string | null = null
  let debugError = ''
  if (!isDateConverter) {
    try {
      const validFromUnit = units.find((u: any) => u.symbol === fromUnit)
      const validToUnit = units.find((u: any) => u.symbol === toUnit)
      if (!validFromUnit) unitError = `From unit not found: ${fromUnit}`
      if (!validToUnit) unitError = `To unit not found: ${toUnit}`
      const isValidInput = from !== '' && from !== null && from !== undefined && !/^\s+$/.test(from)
      if (validFromUnit && validToUnit && isValidInput) {
        const fromNumber = Number(from)
        if (!Number.isNaN(fromNumber)) {
          try {
            // Use plain JS math for all linear conversions
            // toBase and fromBase are always functions: v => v * factor, v => v / factor
            const base = validFromUnit.toBase(fromNumber)
            result = validToUnit.fromBase(base)
          } catch (err) {
            debugError =
              'Conversion failed: ' +
              (typeof err === 'object' && err && 'message' in err
                ? (err as any).message
                : String(err))
            result = null
          }
        }
      }
    } catch (e: any) {
      debugError = e && e.message ? e.message : String(e)
      result = null
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 font-display">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <Link
          href="/converters"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Back to Converters
        </Link>
      </nav>

      {/* Hero Section - Simplified */}
      <div className="mb-8 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-6 dark:border-slate-700/30 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center gap-4">
          <Calculator className="h-10 w-10 text-blue-600" />
          <div>
            <h1 className="font-display text-3xl font-bold text-heading dark:text-heading-dark">
              {converter.title}
            </h1>
            <p className="text-body/80 dark:text-body-dark/80 mt-1">
              Professional unit conversion tool for civil engineering applications
            </p>
          </div>
        </div>
      </div>

      {/* Main Converter Interface */}
      <div className="mb-8 grid gap-8 lg:grid-cols-3">
        {/* Calculator Section */}
        <div className="lg:col-span-2">
          {/* Date Converter UI */}
          {isDateConverter ? (
            <div className="rounded-2xl border border-slate-200 p-8 dark:border-slate-800">
              {/* Date converter tabs */}
              <div className="mb-6 flex rounded-xl border border-slate-300 dark:border-slate-700">
                <button
                  onClick={() => setDateTab(0)}
                  className={`flex-1 rounded-l-xl px-6 py-3 text-sm font-medium transition-all ${
                    dateTab === 0
                      ? 'bg-primary text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  English to Nepali
                </button>
                <button
                  onClick={handleSwapDateTab}
                  className="px-3 py-3 border-x border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDateTab(1)}
                  className={`flex-1 rounded-r-xl px-6 py-3 text-sm font-medium transition-all ${
                    dateTab === 1
                      ? 'bg-primary text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  Nepali to English
                </button>
              </div>

              <form onSubmit={handleDateConvert} className="space-y-6">
                {dateTab === 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark">
                      English Date (AD)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Day
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="32"
                          value={adDate}
                          onChange={(e) => setAdDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Month
                        </label>
                        <select
                          value={adMonth}
                          onChange={(e) => setAdMonth(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          {[
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                          ].map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Year
                        </label>
                        <input
                          type="number"
                          min="1900"
                          max="2100"
                          value={adYear}
                          onChange={(e) => setAdYear(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark">
                      Nepali Date (BS)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Day
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="32"
                          value={bsDate}
                          onChange={(e) => setBsDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Month
                        </label>
                        <select
                          value={bsMonth}
                          onChange={(e) => setBsMonth(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          {[
                            'Baisakh',
                            'Jestha',
                            'Ashadh',
                            'Shrawan',
                            'Bhadra',
                            'Ashwin',
                            'Kartik',
                            'Mangsir',
                            'Poush',
                            'Magh',
                            'Falgun',
                            'Chaitra',
                          ].map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Year
                        </label>
                        <input
                          type="number"
                          min="2000"
                          max="2100"
                          value={bsYear}
                          onChange={(e) => setBsYear(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors"
                >
                  Convert Date
                </button>

                {convertClicked && dateResult && (
                  <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">
                        Conversion Result
                      </span>
                    </div>
                    <p className="text-green-700 dark:text-green-300 font-mono">{dateResult}</p>
                  </div>
                )}
              </form>
            </div>
          ) : (
            /* Standard Unit Converter UI */
            <div className="rounded-2xl border border-slate-200 p-8 dark:border-slate-800">
              <div className="grid gap-6 md:grid-cols-2">
                {/* From Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    From
                  </label>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Enter value..."
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {units.map((unit: any) => (
                      <option key={unit.symbol} value={unit.symbol}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                {/* To Output */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    To
                  </label>
                  <div className="relative">
                    <input
                      value={result !== null ? result.toFixed(precision) : ''}
                      readOnly
                      placeholder="Result..."
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-lg dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    {result !== null && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result!.toFixed(precision))
                          setCopied(true)
                          setTimeout(() => setCopied(false), 2000)
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        )}
                      </button>
                    )}
                  </div>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {units.map((unit: any) => (
                      <option key={unit.symbol} value={unit.symbol}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    const tempUnit = fromUnit
                    setFromUnit(toUnit)
                    setToUnit(tempUnit)
                  }}
                  className="rounded-full border border-slate-300 p-3 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <ArrowLeftRight className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Advanced Options */}
              <div className="mt-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
                >
                  Advanced Options
                  {showAdvanced ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {showAdvanced && (
                  <div className="mt-4 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Precision (decimal places)
                        </label>
                        <select
                          value={precision}
                          onChange={(e) => setPrecision(Number(e.target.value))}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((p) => (
                            <option key={p} value={p}>
                              {p} decimal places
                            </option>
                          ))}
                        </select>
                      </div>
                      {converterInfo && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Recommended Accuracy
                          </label>
                          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              {converterInfo.accuracy}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {(unitError || debugError) && (
                <div className="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800 dark:text-red-200">
                      Conversion Error
                    </span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {unitError || debugError}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Information Sidebar */}
        <div className="space-y-6">
          {/* Top Ad Slot - After Hero */}
          <AdSlot slotId="9285440299" className="w-full" position="sidebar" />

          {/* Why It Matters */}
          {converterInfo && (
            <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
              <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Why It Matters
              </h3>
              <p className="text-sm text-body/80 dark:text-body-dark/80 leading-relaxed">
                {converterInfo.importance}
              </p>
            </div>
          )}

          {/* Common Applications */}
          {converterInfo && (
            <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
              <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Common Applications in Civil Engineering
              </h3>
              <div className="space-y-3">
                {converterInfo.applications.map((app, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-body/80 dark:text-body-dark/80">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Middle Ad Slot - Between Content */}
          <AdSlot slotId="converter-sidebar-middle" className=" w-full" position="sidebar" />

          {/* Conversion Details */}
          {!isDateConverter && (
            <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
              <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Conversion Details
              </h3>
              <div className="space-y-3 text-sm text-body/80 dark:text-body-dark/80">
                <p>
                  <strong>Base Unit:</strong> {converter.baseUnit}
                </p>
                <p>
                  <strong>Available Units:</strong> {units.length}
                </p>
                <p>
                  <strong>Conversion Method:</strong> Base unit calculation
                </p>
                <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs">
                    All values are first converted to {converter.baseUnit} and then to the target
                    unit for maximum accuracy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Professional Tips */}
          {converterInfo && (
            <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
              <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                Professional Tips
              </h3>
              <div className="space-y-3">
                {converterInfo.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-body/80 dark:text-body-dark/80">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Ad Slot - Before Common Mistakes */}
          <AdSlot slotId="converter-sidebar-bottom" className="w-full" position="sidebar" />

          {/* Common Mistakes */}
          {converterInfo && (
            <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
              <h3 className="mb-4 text-lg font-bold text-heading dark:text-heading-dark flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Common Mistakes to Avoid
              </h3>
              <div className="space-y-3">
                {converterInfo.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-body/80 dark:text-body-dark/80">{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Engineering Tools - Compact Design */}
      <div className="mb-6 rounded-lg border border-slate-200/40 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 p-4 dark:border-slate-700/30 dark:from-blue-900/10 dark:to-indigo-900/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            <h3 className="text-lg font-semibold text-heading dark:text-heading-dark">
              Quick Engineering Tools
            </h3>
          </div>
          <Link
            href="/converters"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Popular Converters */}
          <div className="rounded-md bg-white/60 dark:bg-slate-800/60 p-3 border border-slate-200/30 dark:border-slate-700/30">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-1 text-sm">
              <ArrowLeftRight className="h-3 w-3" />
              Popular Converters
            </h4>
            <div className="space-y-1">
              {['length', 'area', 'volume', 'weight', 'temperature']
                .filter((c) => c !== converter.slug)
                .slice(0, 3)
                .map((convSlug) => (
                  <Link
                    key={convSlug}
                    href={`/converters/${convSlug}`}
                    className="block text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition-colors py-0.5"
                  >
                    {convSlug.charAt(0).toUpperCase() + convSlug.slice(1)} →
                  </Link>
                ))}
            </div>
          </div>

          {/* Engineering Calculators */}
          <div className="rounded-md bg-white/60 dark:bg-slate-800/60 p-3 border border-slate-200/30 dark:border-slate-700/30">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-1 text-sm">
              <Zap className="h-3 w-3" />
              Engineering Tools
            </h4>
            <div className="space-y-1">
              <Link
                href="/calculators/concrete-mix-design"
                className="block text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition-colors py-0.5"
              >
                Concrete Mix →
              </Link>
              <Link
                href="/calculators/steel-reinforcement"
                className="block text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition-colors py-0.5"
              >
                Steel Rebar →
              </Link>
              <Link
                href="/calculators/brickwork"
                className="block text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition-colors py-0.5"
              >
                Brickwork →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-md bg-white/60 dark:bg-slate-800/60 p-3 border border-slate-200/30 dark:border-slate-700/30 sm:col-span-2 lg:col-span-1">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-1 text-sm">
              <Target className="h-3 w-3" />
              Quick Actions
            </h4>
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${converter.title} - Civil Engineering Converter`,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="rounded bg-blue-100 dark:bg-blue-900/30 p-2 text-xs text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                title="Share this tool"
              >
                Share
              </button>
              <button
                onClick={() => window.print()}
                className="rounded bg-blue-100 dark:bg-blue-900/30 p-2 text-xs text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                title="Print results"
              >
                Print
              </button>
              <button
                onClick={() => setFrom('')}
                className="rounded bg-slate-100 dark:bg-slate-800 p-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Clear all inputs"
              >
                Clear
              </button>
              <Link
                href="/converters"
                className="rounded bg-slate-100 dark:bg-slate-800 p-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center"
                title="Browse all converters"
              >
                All
              </Link>
            </div>
          </div>
        </div>
      </div>

     {/* Bottom Horizontal Ad */}
      <div className="mt-12 py-8 border-t border-b border-slate-200/20 dark:border-slate-800/20">
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
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
      </div>
      {/* High-Value Content Section */}
      <div className="mb-8 rounded-xl border border-slate-200/40 bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-6 dark:border-slate-700/30 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold text-heading dark:text-heading-dark">
            Engineering Excellence in Unit Conversion
          </h2>
        </div>
        <p className="text-body/80 dark:text-body-dark/80 mb-4">
          Our professional conversion tools are designed specifically for civil engineering
          applications, ensuring accuracy, reliability, and compliance with industry standards. Each
          converter undergoes rigorous validation to meet engineering precision requirements.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white/70 dark:bg-slate-800/70 p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Precision Engineering
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              All conversions use base unit calculations for maximum accuracy, with configurable
              precision settings for different engineering applications.
            </p>
          </div>
          <div className="rounded-lg bg-white/70 dark:bg-slate-800/70 p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Industry Standards
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Built to meet civil engineering standards with comprehensive validation, error
              checking, and professional-grade accuracy requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Ad Slot - Before Conversion Explanation */}
      <div className="mb-8">
        <AdSlot slotId="converter-before-explanation" className="w-full" position="inline" />
      </div>

      {/* Conversion Explanation */}
      {!isDateConverter && (
        <div className="mt-12">
          <ConversionExplanation
            converter={converter}
            fromUnit={fromUnit}
            toUnit={toUnit}
            fromValue={from}
            toValue={result?.toFixed(precision) || ''}
          />
        </div>
      )}
    </main>
  )
}
