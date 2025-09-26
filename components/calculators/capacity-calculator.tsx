"use client"

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Droplet, Waves, Factory, Flame, CloudRain, Box, RotateCcw, FileDown, Download, CheckCircle } from 'lucide-react'
import { WaterTankCalculator, SwimmingPoolCalculator, SoakPitCalculator, SepticTankCalculator, RainwaterHarvestingCalculator, SumpCapacityCalculator } from '@/lib/registry/calculator/capacity-calculator'
import * as XLSX from 'xlsx'
import AdSlot from '@/components/ads/AdSlot'

// Types for local form states
 type Unit = 'm' | 'ft'
 type Tab = 'water' | 'pool' | 'soak' | 'septic' | 'rainwater' | 'sump'

 interface BaseForm { unit: Unit; showSteps: boolean }

 interface WaterForm extends BaseForm {
  shape: 'rectangular' | 'cylindrical' | 'circular'
  length?: string
  width?: string
  height?: string
  diameter?: string
  freeboard?: string
  material?: 'RCC' | 'Plastic' | 'Steel'
  tankType?: 'underground' | 'overhead' | 'ground'
 }

 interface PoolForm extends BaseForm {
  shape: 'rectangular' | 'circular' | 'kidney'
  length?: string
  width?: string
  diameter?: string
  shallow?: string
  deep?: string
  average?: string
  turnover?: string
 }

 interface SoakForm extends BaseForm {
  diameter: string
  depth: string
  soilK?: string
  inflow?: string
 }

 interface SepticForm extends BaseForm {
  users: string
  lpcd?: string
  retention?: string
  sludge?: string
  ratio?: string
 }

 interface RainForm extends BaseForm {
  area: string
  rainfall: string
  runoff?: string
  firstFlush?: string
  demand?: string
 }

 interface SumpForm extends BaseForm {
  shape: 'rectangular' | 'cylindrical'
  length?: string
  width?: string
  depth: string
  diameter?: string
  freeboard?: string
 }

 function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">{title}</h1>
          <p className="text-body/70 dark:text-body-dark/70">{subtitle}</p>
        </div>
      </div>
    </div>
  )
 }

 function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>
 }

 function Field({ label, unit, value, onChange, placeholder }: { label: string; unit?: string; value: string | undefined; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          min="0"
          step="0.001"
          placeholder={placeholder}
          className="w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
        />
        {unit && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">{unit}</div>
        )}
      </div>
    </div>
  )
 }

 export default function CapacityCalculator({ globalUnit = 'm' as Unit }) {
  const [activeTab, setActiveTab] = useState<Tab>('water')

  const [water, setWater] = useState<WaterForm>({ unit: globalUnit, showSteps: false, shape: 'rectangular' })
  const [pool, setPool] = useState<PoolForm>({ unit: globalUnit, showSteps: false, shape: 'rectangular' })
  const [soak, setSoak] = useState<SoakForm>({ unit: globalUnit, showSteps: false, diameter: '', depth: '' })
  const [septic, setSeptic] = useState<SepticForm>({ unit: globalUnit, showSteps: false, users: '5' })
  const [rain, setRain] = useState<RainForm>({ unit: globalUnit, showSteps: false, area: '', rainfall: '' })
  const [sump, setSump] = useState<SumpForm>({ unit: globalUnit, showSteps: false, shape: 'rectangular', depth: '' })

  const [result, setResult] = useState<any | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    setWater((p) => ({ ...p, unit: globalUnit }))
    setPool((p) => ({ ...p, unit: globalUnit }))
    setSoak((p) => ({ ...p, unit: globalUnit }))
    setSeptic((p) => ({ ...p, unit: globalUnit }))
    setRain((p) => ({ ...p, unit: globalUnit }))
    setSump((p) => ({ ...p, unit: globalUnit }))
  }, [globalUnit])

  const unitSystem: 'metric' | 'imperial' = useMemo(() => (globalUnit === 'm' ? 'metric' : 'imperial'), [globalUnit])

  const lengthUnit = globalUnit
  const areaUnit = globalUnit === 'm' ? 'm²' : 'ft²'

  const calculate = async () => {
    setIsCalculating(true)
    await new Promise((r) => setTimeout(r, 300))
    try {
      if (activeTab === 'water') {
        const input = {
          unitSystem,
          shape: water.shape,
          length: water.length ? parseFloat(water.length) : undefined,
          width: water.width ? parseFloat(water.width) : undefined,
          height: water.height ? parseFloat(water.height) : undefined,
          diameter: water.diameter ? parseFloat(water.diameter) : undefined,
          freeboard: water.freeboard ? parseFloat(water.freeboard) : undefined,
          material: water.material,
          tankType: water.tankType,
        }
        const res = WaterTankCalculator.calculate(input as any)
        setResult(res)
      } else if (activeTab === 'pool') {
        const input = {
          unitSystem,
          shape: pool.shape,
          length: pool.length ? parseFloat(pool.length) : undefined,
          width: pool.width ? parseFloat(pool.width) : undefined,
          diameter: pool.diameter ? parseFloat(pool.diameter) : undefined,
          shallowDepth: pool.shallow ? parseFloat(pool.shallow) : undefined,
          deepDepth: pool.deep ? parseFloat(pool.deep) : undefined,
          averageDepth: pool.average ? parseFloat(pool.average) : undefined,
          turnoverHours: pool.turnover ? parseFloat(pool.turnover) : undefined,
        }
        const res = SwimmingPoolCalculator.calculate(input as any)
        setResult(res)
      } else if (activeTab === 'soak') {
        const input = {
          unitSystem,
          diameter: parseFloat(soak.diameter),
          depth: parseFloat(soak.depth),
          soilPermeability_m_per_day: soak.soilK ? parseFloat(soak.soilK) : undefined,
          inflow_m3_per_day: soak.inflow ? parseFloat(soak.inflow) : undefined,
        }
        const res = SoakPitCalculator.calculate(input)
        setResult(res)
      } else if (activeTab === 'septic') {
        const ratio: [number, number, number] | undefined = septic.ratio ? ((): [number, number, number] => {
          const parts = septic.ratio.split(':').map((p) => parseFloat(p.trim()))
          if (parts.length === 3 && parts.every((n) => !isNaN(n) && n > 0)) return [parts[0], parts[1], parts[2]]
          return undefined as any
        })() : undefined
        const input = {
          unitSystem,
          users: parseInt(septic.users || '0', 10),
          perCapitaFlow_l_per_day: septic.lpcd ? parseFloat(septic.lpcd) : undefined,
          retention_days: septic.retention ? parseFloat(septic.retention) : undefined,
          sludge_storage_m3: septic.sludge ? parseFloat(septic.sludge) : undefined,
          ratio_L_W_H: ratio,
        }
        const res = SepticTankCalculator.calculate(input as any)
        setResult(res)
      } else if (activeTab === 'rainwater') {
        const input = {
          unitSystem,
          catchmentArea: rain.area ? parseFloat(rain.area) : 0,
          rainfall_mm: rain.rainfall ? parseFloat(rain.rainfall) : 0,
          runoffCoefficient: rain.runoff ? parseFloat(rain.runoff) : undefined,
          firstFlushLoss_mm: rain.firstFlush ? parseFloat(rain.firstFlush) : undefined,
          dailyDemand_liters: rain.demand ? parseFloat(rain.demand) : undefined,
        }
        const res = RainwaterHarvestingCalculator.calculate(input as any)
        setResult(res)
      } else if (activeTab === 'sump') {
        const input = {
          unitSystem,
          shape: sump.shape,
          length: sump.length ? parseFloat(sump.length) : undefined,
          width: sump.width ? parseFloat(sump.width) : undefined,
          depth: sump.depth ? parseFloat(sump.depth) : 0,
          diameter: sump.diameter ? parseFloat(sump.diameter) : undefined,
          freeboard: sump.freeboard ? parseFloat(sump.freeboard) : undefined,
        }
        const res = SumpCapacityCalculator.calculate(input as any)
        setResult(res)
      }
    } catch (e: any) {
      alert(e.message || 'Invalid inputs')
    } finally {
      setIsCalculating(false)
    }
  }

  const reset = () => {
    setResult(null)
    setWater({ unit: globalUnit, showSteps: false, shape: 'rectangular' })
    setPool({ unit: globalUnit, showSteps: false, shape: 'rectangular' })
    setSoak({ unit: globalUnit, showSteps: false, diameter: '', depth: '' })
    setSeptic({ unit: globalUnit, showSteps: false, users: '5' })
    setRain({ unit: globalUnit, showSteps: false, area: '', rainfall: '' })
    setSump({ unit: globalUnit, showSteps: false, shape: 'rectangular', depth: '' })
  }

  const downloadPDF = () => {
    if (!result) return
    const html = `<!DOCTYPE html><html><head><meta charset='utf-8'/><title>Capacity Result</title>
    <style>body{font-family:ui-sans-serif,system-ui,Segoe UI,Roboto;padding:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left}thead th{background:#f8fafc}</style></head>
    <body>
      <h1>Tank & Capacity Calculator Result</h1>
      <p><strong>Type:</strong> ${activeTab}</p>
      <p><strong>Volume:</strong> ${result.volume_m3?.toFixed(3)} m³ (${(result.volume_liters)?.toFixed(0)} L)</p>
      ${result.effective_depth ? `<p><strong>Effective Depth:</strong> ${result.effective_depth.toFixed(3)} m</p>` : ''}
      ${result.recommended_dimensions_m ? `<p><strong>Recommended Dimensions (m):</strong> L=${result.recommended_dimensions_m.length.toFixed(2)}, W=${result.recommended_dimensions_m.width.toFixed(2)}, D=${result.recommended_dimensions_m.depth.toFixed(2)}</p>` : ''}
      ${result.turnover_flow_m3_per_h ? `<p><strong>Turnover Flow:</strong> ${result.turnover_flow_m3_per_h.toFixed(2)} m³/h</p>` : ''}
      <p style='color:#64748b;font-size:12px;margin-top:8px'>Indicative results; verify with NBC/IS standards where applicable.</p>
    </body></html>`
    const win = window.open('', '_blank')
    if (!win) return
    win.document.open(); win.document.write(html); win.document.close(); win.print()
  }

  const downloadXLSX = () => {
    if (!result) return
    const rows = [
      { Key: 'Type', Value: activeTab },
      { Key: 'Volume (m3)', Value: Number(result.volume_m3?.toFixed(3) || 0) },
      { Key: 'Volume (L)', Value: Number(result.volume_liters?.toFixed(0) || 0) },
      { Key: 'Volume (US gal)', Value: Number(result.volume_gallons_us?.toFixed(0) || 0) },
    ]
    if (result.effective_depth != null) rows.push({ Key: 'Effective Depth (m)', Value: Number(result.effective_depth.toFixed(3)) })
    if (result.turnover_flow_m3_per_h != null) rows.push({ Key: 'Turnover Flow (m3/h)', Value: Number(result.turnover_flow_m3_per_h.toFixed(2)) })
    if (result.recommended_dimensions_m) {
      rows.push({ Key: 'Length (m)', Value: Number(result.recommended_dimensions_m.length.toFixed(2)) })
      rows.push({ Key: 'Width (m)', Value: Number(result.recommended_dimensions_m.width.toFixed(2)) })
      rows.push({ Key: 'Depth (m)', Value: Number(result.recommended_dimensions_m.depth.toFixed(2)) })
    }

    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Result')
    XLSX.writeFile(wb, 'capacity_result.xlsx')
  }

  const copyResults = async () => {
    if (!result) return
    const payload = {
      type: activeTab,
      volume_m3: result.volume_m3,
      volume_liters: result.volume_liters,
      volume_gallons_us: result.volume_gallons_us,
      effective_depth: result.effective_depth,
      turnover_flow_m3_per_h: result.turnover_flow_m3_per_h,
      recommended_dimensions_m: result.recommended_dimensions_m,
      days_of_supply: result.days_of_supply,
      cost_estimate: result.cost_estimate,
    }
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
  }

  const TabButton = ({ id, title, icon: Icon }: { id: Tab; title: string; icon: any }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center gap-2 rounded-lg p-2 px-3 text-sm font-display transition-colors ${activeTab===id?'bg-primary text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'}`}>
      <Icon className="h-4 w-4"/> {title}
    </button>
  )

  return (
    <div className="mx-auto max-w-4xl p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
        {/* Non-intrusive ad (top) */}
        <div className="px-8 pt-4">
          <AdSlot position="top" slotId="capacity-top" />
        </div>
        <SectionHeader title="Tank & Capacity Calculator" subtitle="Water tanks, pools, soak pits, and septic tanks" />

        {/* Illustrations */}
        <div className="flex justify-center mb-6">
          <svg width="260" height="140" viewBox="0 0 260 140" className="rounded-lg border dark:border-slate-700 bg-white">
            <rect x="20" y="20" width="220" height="100" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="130" y="75" textAnchor="middle" fontSize="14" fill="#0c4a6e">Capacity</text>
          </svg>
        </div>

        {/* Form */}
        <div className="p-8">
          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            <TabButton id="water" title="Water Tank" icon={Droplet} />
            <TabButton id="pool" title="Swimming Pool" icon={Waves} />
            <TabButton id="soak" title="Soak Pit" icon={Factory} />
            <TabButton id="septic" title="Septic Tank" icon={Flame} />
            <TabButton id="rainwater" title="Rainwater" icon={CloudRain} />
            <TabButton id="sump" title="Sump/Custom" icon={Box} />
          </div>

          {/* Panels */}
          <AnimatePresence mode="wait">
            {activeTab === 'water' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Row>
                  <div>
                    <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Shape</label>
                    <select value={water.shape} onChange={(e)=>setWater((p)=>({ ...p, shape: e.target.value as any }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800">
                      <option value="rectangular">Rectangular</option>
                      <option value="cylindrical">Cylindrical</option>
                      <option value="circular">Circular</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Material</label>
                    <select value={water.material||'RCC'} onChange={(e)=>setWater((p)=>({ ...p, material: e.target.value as any }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800">
                      <option value="RCC">RCC</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Steel">Steel</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Tank Type</label>
                    <select value={water.tankType||'ground'} onChange={(e)=>setWater((p)=>({ ...p, tankType: e.target.value as any }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800">
                      <option value="underground">Underground</option>
                      <option value="ground">Ground</option>
                      <option value="overhead">Overhead</option>
                    </select>
                  </div>
                  {water.shape === 'rectangular' && (
                    <>
                      <Field label="Length" unit={lengthUnit} value={water.length} onChange={(v)=>setWater(p=>({ ...p, length: v }))} />
                      <Field label="Width" unit={lengthUnit} value={water.width} onChange={(v)=>setWater(p=>({ ...p, width: v }))} />
                      <Field label="Height/Depth" unit={lengthUnit} value={water.height} onChange={(v)=>setWater(p=>({ ...p, height: v }))} />
                    </>
                  )}
                  {(water.shape === 'cylindrical' || water.shape === 'circular') && (
                    <>
                      <Field label="Diameter" unit={lengthUnit} value={water.diameter} onChange={(v)=>setWater(p=>({ ...p, diameter: v }))} />
                      <Field label="Height/Depth" unit={lengthUnit} value={water.height} onChange={(v)=>setWater(p=>({ ...p, height: v }))} />
                    </>
                  )}
                  <Field label="Freeboard" unit={lengthUnit} value={water.freeboard} onChange={(v)=>setWater(p=>({ ...p, freeboard: v }))} />
                </Row>
              </motion.div>
            )}
            {activeTab === 'pool' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Row>
                  <div>
                    <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Shape</label>
                    <select value={pool.shape} onChange={(e)=>setPool((p)=>({ ...p, shape: e.target.value as any }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800">
                      <option value="rectangular">Rectangular</option>
                      <option value="circular">Circular</option>
                      <option value="kidney">Kidney</option>
                    </select>
                  </div>
                  {pool.shape === 'rectangular' && (
                    <>
                      <Field label="Length" unit={lengthUnit} value={pool.length} onChange={(v)=>setPool(p=>({ ...p, length: v }))} />
                      <Field label="Width" unit={lengthUnit} value={pool.width} onChange={(v)=>setPool(p=>({ ...p, width: v }))} />
                    </>
                  )}
                  {pool.shape === 'circular' && (
                    <Field label="Diameter" unit={lengthUnit} value={pool.diameter} onChange={(v)=>setPool(p=>({ ...p, diameter: v }))} />
                  )}
                  <Field label="Shallow Depth" unit={lengthUnit} value={pool.shallow} onChange={(v)=>setPool(p=>({ ...p, shallow: v }))} />
                  <Field label="Deep Depth" unit={lengthUnit} value={pool.deep} onChange={(v)=>setPool(p=>({ ...p, deep: v }))} />
                  <Field label="Average Depth (optional)" unit={lengthUnit} value={pool.average} onChange={(v)=>setPool(p=>({ ...p, average: v }))} />
                  <Field label="Turnover (hours)" value={pool.turnover} onChange={(v)=>setPool(p=>({ ...p, turnover: v }))} />
                </Row>
              </motion.div>
            )}
            {activeTab === 'soak' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Row>
                  <Field label="Diameter" unit={lengthUnit} value={soak.diameter} onChange={(v)=>setSoak(p=>({ ...p, diameter: v }))} />
                  <Field label="Depth" unit={lengthUnit} value={soak.depth} onChange={(v)=>setSoak(p=>({ ...p, depth: v }))} />
                  <Field label="Soil Permeability (m/day)" value={soak.soilK} onChange={(v)=>setSoak(p=>({ ...p, soilK: v }))} />
                  <Field label="Inflow (m³/day)" value={soak.inflow} onChange={(v)=>setSoak(p=>({ ...p, inflow: v }))} />
                </Row>
              </motion.div>
            )}
            {activeTab === 'septic' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Row>
                  <Field label="Number of Users" value={septic.users} onChange={(v)=>setSeptic(p=>({ ...p, users: v }))} />
                  <Field label="Per Capita Flow (L/day)" value={septic.lpcd} onChange={(v)=>setSeptic(p=>({ ...p, lpcd: v }))} />
                  <Field label="Retention Period (days)" value={septic.retention} onChange={(v)=>setSeptic(p=>({ ...p, retention: v }))} />
                  <Field label="Sludge Storage (m³)" value={septic.sludge} onChange={(v)=>setSeptic(p=>({ ...p, sludge: v }))} />
                  <Field label="Recommended Ratio L:W:H (e.g., 2:1:1)" value={septic.ratio} onChange={(v)=>setSeptic(p=>({ ...p, ratio: v }))} />
                </Row>
              </motion.div>
            )}
            {activeTab === 'rainwater' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Row>
                  <Field label={`Catchment Area (${areaUnit})`} unit={areaUnit} value={rain.area} onChange={(v)=>setRain(p=>({ ...p, area: v }))} />
                  <Field label="Rainfall (mm)" value={rain.rainfall} onChange={(v)=>setRain(p=>({ ...p, rainfall: v }))} />
                  <Field label="Runoff Coefficient (0-1)" value={rain.runoff} onChange={(v)=>setRain(p=>({ ...p, runoff: v }))} />
                  <Field label="First Flush Loss (mm)" value={rain.firstFlush} onChange={(v)=>setRain(p=>({ ...p, firstFlush: v }))} />
                  <Field label="Daily Demand (L/day)" value={rain.demand} onChange={(v)=>setRain(p=>({ ...p, demand: v }))} />
                </Row>
              </motion.div>
            )}
            {activeTab === 'sump' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Row>
                  <div>
                    <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Shape</label>
                    <select value={sump.shape} onChange={(e)=>setSump((p)=>({ ...p, shape: e.target.value as any }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800">
                      <option value="rectangular">Rectangular</option>
                      <option value="cylindrical">Cylindrical</option>
                    </select>
                  </div>
                  {sump.shape === 'rectangular' && (
                    <>
                      <Field label="Length" unit={lengthUnit} value={sump.length} onChange={(v)=>setSump(p=>({ ...p, length: v }))} />
                      <Field label="Width" unit={lengthUnit} value={sump.width} onChange={(v)=>setSump(p=>({ ...p, width: v }))} />
                    </>
                  )}
                  {sump.shape === 'cylindrical' && (
                    <Field label="Diameter" unit={lengthUnit} value={sump.diameter} onChange={(v)=>setSump(p=>({ ...p, diameter: v }))} />
                  )}
                  <Field label="Depth" unit={lengthUnit} value={sump.depth} onChange={(v)=>setSump(p=>({ ...p, depth: v }))} />
                  <Field label="Freeboard" unit={lengthUnit} value={sump.freeboard} onChange={(v)=>setSump(p=>({ ...p, freeboard: v }))} />
                </Row>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={reset} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700">
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
              {/* Steps toggle reserved for later detailed steps */}
            </div>
            <button type="button" onClick={calculate} disabled={isCalculating} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-display font-semibold text-white shadow-soft hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
              {isCalculating ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : (<><Calculator className="h-4 w-4"/> Calculate</>)}
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10">
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="font-display text-xl font-semibold text-heading dark:text-heading-dark">Calculation Results</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Capacity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Volume (m³):</span><span className="font-mono font-semibold">{result.volume_m3.toFixed(3)}</span></div>
                    <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Volume (Liters):</span><span className="font-mono font-semibold">{result.volume_liters.toFixed(0)}</span></div>
                    <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Volume (US gal):</span><span className="font-mono font-semibold">{result.volume_gallons_us.toFixed(0)}</span></div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Details</h3>
                  <div className="space-y-3 text-sm">
                    {result.effective_depth != null && <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Effective Depth (m):</span><span className="font-mono font-semibold">{result.effective_depth.toFixed(3)}</span></div>}
                    {result.turnover_flow_m3_per_h != null && <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Turnover Flow (m³/h):</span><span className="font-mono font-semibold">{result.turnover_flow_m3_per_h.toFixed(2)}</span></div>}
                    {result.cost_estimate != null && <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Cost Estimate:</span><span className="font-mono font-semibold">{result.cost_estimate.toFixed(2)}</span></div>}
                    {result.days_of_supply != null && <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Days of Supply:</span><span className="font-mono font-semibold">{result.days_of_supply.toFixed(1)}</span></div>}
                    {result.recommended_dimensions_m && (
                      <>
                        <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Length (m):</span><span className="font-mono font-semibold">{result.recommended_dimensions_m.length.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Width (m):</span><span className="font-mono font-semibold">{result.recommended_dimensions_m.width.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-body/70 dark:text-body-dark/70">Depth (m):</span><span className="font-mono font-semibold">{result.recommended_dimensions_m.depth.toFixed(2)}</span></div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button onClick={downloadPDF} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><FileDown className="h-4 w-4"/> PDF</button>
                <button onClick={downloadXLSX} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800"><Download className="h-4 w-4"/> Excel</button>
                <button onClick={copyResults} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800">Copy Results</button>
              </div>

              {/* FAQ */}
              <div className="mt-10 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h3 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">FAQs & Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-body/80 dark:text-body-dark/80">
                  <li><strong>Water Tanks:</strong> Capacity = plan area × effective water depth (subtract freeboard). Materials RCC/Plastic/Steel are cost placeholders.</li>
                  <li><strong>Swimming Pools:</strong> Turnover commonly 6–8 hours; confirm with local guidelines.</li>
                  <li><strong>Soak Pit:</strong> Quick check uses Q ≤ K×A (NBC/IS concept). Provide K (m/day) and daily inflow.</li>
                  <li><strong>Septic Tank:</strong> Indicative sizing using lpcd and retention days; verify with NBC/IS provisions (baffles, freeboard, vent pipe, setback).</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
 }
