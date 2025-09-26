"use client"

import { useState, useEffect } from "react"
import { Info, CheckCircle, RotateCcw, Eye, EyeOff, Calculator } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { PlasterCalculator as PlasterCalculatorLib } from '@/lib/registry/calculator/plaster-calculator'

interface PlasterResult {
  plasterVolume: number
  cementBags: number
  sandWeight: number
}

interface PlasterFormData {
  length: string
  height: string
  thickness: string
  area?: string
  unit: 'metric' | 'imperial'
  showStepByStep: boolean
}

// Logic moved to lib/registry/calculator/plaster-calculator

export default function PlasterCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [useArea, setUseArea] = useState(false)
  const [formData, setFormData] = useState<PlasterFormData>({
    length: '',
    height: '',
    thickness: '',
    area: '',
    unit: globalUnit === 'm' ? 'metric' : 'imperial',
    showStepByStep: false
  })
  const [result, setResult] = useState<PlasterResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasCalculated, setHasCalculated] = useState(false)

  // Calculate result
  const calculate = () => {
    const unitSystem = formData.unit
    const useAreaLocal = useArea
    const length = formData.length ? parseFloat(formData.length) : undefined
    const height = formData.height ? parseFloat(formData.height) : undefined
    const area = formData.area ? parseFloat(formData.area) : undefined
    const thickness = formData.thickness ? parseFloat(formData.thickness) : 0

    const res = PlasterCalculatorLib.calculate({
      length,
      height,
      area,
      thickness,
      unitSystem: unitSystem,
      useArea: useAreaLocal
    })

    setResult(res)
  }

  // Only update result after Calculate is pressed at least once
  useEffect(() => {
    if (!hasCalculated) return;
    const hasRequired = useArea
      ? formData.area && formData.thickness
      : formData.length && formData.height && formData.thickness;
    if (hasRequired) {
      calculate();
    } else {
      setResult(null);
    }
  }, [formData, useArea]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark"
      >
        {/* Header */}
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Plaster Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Estimate plaster volume, cement, and sand for wall finishing</p>
            </div>
          </div>
        </div>
        {/* SVG Diagram for Plaster Calculator */}
        <div className="flex justify-center mb-8">
          <svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Wall outline */}
            <rect x="60" y="30" width="200" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            {/* Plaster layer */}
            <rect x="60" y="30" width="18" height="40" rx="6" fill="#eab308" stroke="#b45309" strokeWidth="1.5" opacity="0.7" />
            {/* Dots for texture */}
            <circle cx="70" cy="50" r="2.2" fill="#b45309" opacity="0.18" />
            <circle cx="80" cy="60" r="1.8" fill="#b45309" opacity="0.18" />
            {/* Dimension lines */}
            <line x1="60" y1="80" x2="260" y2="80" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="160" y="95" textAnchor="middle" fontSize="14" fill="#334155">Length</text>
            <line x1="50" y1="30" x2="50" y2="70" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="38" y="50" textAnchor="middle" fontSize="14" fill="#334155" transform="rotate(-90 38,50)">Height</text>
            <line x1="60" y1="25" x2="78" y2="25" stroke="#b45309" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="69" y="18" textAnchor="middle" fontSize="13" fill="#b45309">Thickness</text>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        {/* Area/Length Toggle */}
        <div className="flex justify-end mb-4 px-8 pt-8">
          <button
            type="button"
            onClick={() => setUseArea(!useArea)}
            className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all 
              ${useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}
          >
            <Info className="h-4 w-4" />
            {useArea ? "Use Length & Height" : "Use Area"}
          </button>
        </div>
        {/* Form */}
        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {!useArea && (
              <>
                {/* Length */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Length</label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={e => setFormData(f => ({ ...f, length: e.target.value }))}
                    step="0.001"
                    min="0"
                    placeholder="Enter length"
                    className="w-full rounded-xl border px-4 py-3 font-sans border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  />
                </div>
                {/* Height */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Height</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={e => setFormData(f => ({ ...f, height: e.target.value }))}
                    step="0.001"
                    min="0"
                    placeholder="Enter height"
                    className="w-full rounded-xl border px-4 py-3 font-sans border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  />
                </div>
              </>
            )}
            {useArea && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Area</label>
                <input
                  type="number"
                  value={formData.area || ''}
                  onChange={e => setFormData(f => ({ ...f, area: e.target.value }))}
                  step="0.001"
                  min="0"
                  placeholder="Enter area"
                  className="w-full rounded-xl border px-4 py-3 font-sans border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                />
              </div>
            )}
            {/* Thickness */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Thickness (mm)</label>
              <input
                type="number"
                value={formData.thickness}
                onChange={e => setFormData(f => ({ ...f, thickness: e.target.value }))}
                step="0.1"
                min="0"
                placeholder="Enter thickness"
                className="w-full rounded-xl border px-4 py-3 font-sans border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => { setFormData({ length: '', height: '', thickness: '', area: '', unit: formData.unit, showStepByStep: false }); setResult(null); setErrors({}) }}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to defaults
              </button>
              <button
                type="button"
                onClick={() => setFormData(f => ({ ...f, showStepByStep: !f.showStepByStep }))}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-display font-medium transition-colors ${formData.showStepByStep ? 'bg-primary text-white' : 'border border-slate-300 bg-white text-heading dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark'}`}
              >
                {formData.showStepByStep ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {formData.showStepByStep ? 'Hide' : 'Show'} step-by-step
              </button>
            </div>
            <button
              type="button"
              onClick={() => { setHasCalculated(true); calculate(); }}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-display font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover"
            >
              <Calculator className="h-4 w-4" />
              Calculate
            </button>
          </div>
        </div>
        {/* Results */}
        {/* Results */}
        <AnimatePresence>
          {hasCalculated && result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
            >
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="font-display text-xl font-semibold text-heading dark:text-heading-dark">
                  Calculation Results
                </h2>
              </div>
              <div className="mb-8 overflow-hidden rounded-xl border border-slate-200/20 bg-white/70 dark:border-slate-700/30 dark:bg-slate-900/60">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">Material</th>
                      <th className="px-6 py-4 text-right font-display font-semibold text-heading dark:text-heading-dark">Quantity</th>
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/30">
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Plaster Volume</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.plasterVolume.toFixed(3)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">m³</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Cement</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.cementBags.toFixed(2)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">bags</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Sand</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.sandWeight.toFixed(1)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Step-by-step Calculation */}
              {formData.showStepByStep && (
                <div className="mb-8 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4 font-display text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    Step-by-Step Calculation
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    <li>Area = {useArea ? formData.area : `${formData.length} × ${formData.height}`} {formData.unit === 'metric' ? 'm²' : 'ft²'}</li>
                    <li>Thickness = {formData.thickness} mm = {(Number(formData.thickness) / 1000).toFixed(3)} m</li>
                    <li>Wet Volume = Area × Thickness = {useArea ? formData.area : (Number(formData.length) * Number(formData.height)).toFixed(2)} × {(Number(formData.thickness) / 1000).toFixed(3)} = {((useArea ? Number(formData.area) : Number(formData.length) * Number(formData.height)) * Number(formData.thickness) / 1000).toFixed(3)} m³</li>
                    <li>Dry Volume = Wet Volume × 1.27 = {(((useArea ? Number(formData.area) : Number(formData.length) * Number(formData.height)) * Number(formData.thickness) / 1000) * 1.27).toFixed(3)} m³</li>
                    <li>Cement = (Dry Volume / 7) × 1.5 × Density / 50 = {result.cementBags.toFixed(2)} bags</li>
                    <li>Sand = (Dry Volume / 7) × 5.5 × Density = {result.sandWeight.toFixed(1)} kg</li>
                  </ol>
                </div>
              )}
              {/* Info & FAQ Section */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">Plaster Calculator & Estimator – Accurate Material Estimation Tool</h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">A Plaster Calculator helps you estimate the quantity of plaster, cement, and sand required for wall finishing, ensuring cost-effective and high-quality results.</p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Plaster Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get precise plaster volume for your project.</li>
                    <li>Estimate cement and sand needed for the mix.</li>
                    <li>Reduce material waste and save money.</li>
                    <li>Plan wall finishing efficiently and avoid delays.</li>
                    <li>Improve construction quality and finish.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Enter the wall dimensions: length, height (or area), and thickness.</li>
                    <li>Get instant results: plaster volume, cement, and sand required.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Plaster Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div><span className="font-semibold">Q1. What is a plaster calculator?</span><br />A tool to estimate the amount of plaster, cement, and sand needed for wall finishing.</div>
                    <div><span className="font-semibold">Q2. Why is it important?</span><br />Helps in accurate planning, cost-saving, and reducing material wastage.</div>
                    <div><span className="font-semibold">Q3. What units does it support?</span><br />Dimensions can be entered in meters or feet, and cement is calculated in bags.</div>
                    <div><span className="font-semibold">Q4. Can it handle irregular shapes?</span><br />Yes, calculate the total area and enter it directly for accurate results.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  </motion.div>
    </div>
  )
}
