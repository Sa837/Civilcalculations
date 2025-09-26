"use client"

import { useState, useEffect } from "react"
import { Info, RotateCcw, Eye, EyeOff, Calculator, CheckCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { PaintCalculator as PaintCalculatorLib } from '@/lib/registry/calculator/paint-calculator'

interface PaintResult {
  paintRequired: number
  coats: number
}

interface PaintFormData {
  length: string
  height: string
  area?: string
  coats: string
  coverage: string
  unit: 'm' | 'ft'
  showStepByStep: boolean
}

// Logic moved to lib/registry/calculator/paint-calculator

export default function PaintCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [useArea, setUseArea] = useState(false)
  const [formData, setFormData] = useState<PaintFormData>({ length: '', height: '', area: '', coats: '2', coverage: '10', unit: globalUnit, showStepByStep: false })
  const [result, setResult] = useState<PaintResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasCalculated, setHasCalculated] = useState(false)

  const calculate = () => {
    const length = formData.length ? parseFloat(formData.length) : undefined
    const height = formData.height ? parseFloat(formData.height) : undefined
    const area = formData.area ? parseFloat(formData.area) : undefined
    const coats = parseInt(formData.coats)
    const coverage = parseFloat(formData.coverage)
    const unit = formData.unit

    const res = PaintCalculatorLib.calculate({
      length,
      height,
      area,
      coats,
      coverage,
      unit,
      useArea
    })

    setResult(res)
  }

  // Always update result when any input changes and all required fields are filled
  useEffect(() => {
    if (!hasCalculated) return;
    const hasRequired = useArea
      ? formData.area && formData.coats && formData.coverage
      : formData.length && formData.height && formData.coats && formData.coverage;
    if (hasRequired) {
      calculate();
    } else {
      setResult(null);
    }
  }, [formData, useArea]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Paint Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Estimate paint required for your project</p>
            </div>
          </div>
        </div>
        {/* Area/Length Toggle */}
        <div className="flex justify-end mb-4 px-8 pt-8">
          <button
            type="button"
            onClick={() => setUseArea(!useArea)}
            className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all \
              ${useArea ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'}`}
          >
            <Info className="h-4 w-4" />
            {useArea ? "Use Length & Height" : "Use Area"}
          </button>
        </div>
        {/* Wall/Area Diagram */}
        <div className="flex justify-center mb-8">
          <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="30" width="140" height="70" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
            <text x="110" y="25" textAnchor="middle" fontSize="13" fill="#2563eb">Height</text>
            <text x="110" y="115" textAnchor="middle" fontSize="13" fill="#334155">Length</text>
            <text x="190" y="70" fontSize="13" fill="#334155">Area</text>
            <text x="110" y="60" textAnchor="middle" fontSize="12" fill="#64748b">No. of Coats</text>
          </svg>
        </div>
        {/* Form */}
        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {!useArea && (
              <>
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
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Coats</label>
              <input
                type="number"
                value={formData.coats}
                onChange={e => setFormData(f => ({ ...f, coats: e.target.value }))}
                step="1"
                min="1"
                placeholder="Number of coats"
                className="w-full rounded-xl border px-4 py-3 font-sans border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Coverage (m²/L)</label>
              <input
                type="number"
                value={formData.coverage}
                onChange={e => setFormData(f => ({ ...f, coverage: e.target.value }))}
                step="0.1"
                min="0"
                placeholder="Coverage per litre"
                className="w-full rounded-xl border px-4 py-3 font-sans border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
              />
            </div>
          </div>
          {/* Button Row */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => { setFormData({ length: '', height: '', area: '', coats: '2', coverage: '10', unit: formData.unit, showStepByStep: false }); setResult(null); setErrors({}) }}
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
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">Result</th>
                      <th className="px-6 py-4 text-right font-display font-semibold text-heading dark:text-heading-dark">Value</th>
                      <th className="px-6 py-4 text-left font-display font-semibold text-heading dark:text-heading-dark">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/30">
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Paint Required</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.paintRequired.toFixed(2)}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">L</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">Coats</td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">{result.coats}</td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">-</td>
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
                    <li>Area = {useArea ? formData.area : `${formData.length} × ${formData.height}`} {formData.unit === 'm' ? 'm²' : 'ft²'}</li>
                    <li>Coats = {formData.coats}</li>
                    <li>Coverage = {formData.coverage} m²/L</li>
                    <li>Paint Required = (Area × Coats) / Coverage = (({useArea ? formData.area : `${formData.length} × ${formData.height}`}) × {formData.coats}) / {formData.coverage} = {result.paintRequired.toFixed(2)} L</li>
                  </ol>
                </div>
              )}
              {/* Info & FAQ Section */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">Paint Calculator & Estimator – Accurate Material Estimation Tool</h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">A Paint Calculator helps you estimate the quantity of paint required for your project, ensuring cost-effective and high-quality results.</p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Paint Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get precise paint quantity for your project.</li>
                    <li>Estimate coats and coverage needed.</li>
                    <li>Reduce material waste and save money.</li>
                    <li>Plan painting efficiently and avoid delays.</li>
                    <li>Improve finish and quality.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Enter the wall dimensions: length, height (or area), coats, and coverage.</li>
                    <li>Get instant results: paint required and number of coats.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Paint Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div><span className="font-semibold">Q1. What is a paint calculator?</span><br />A tool to estimate the amount of paint needed for your project.</div>
                    <div><span className="font-semibold">Q2. Why is it important?</span><br />Helps in accurate planning, cost-saving, and reducing material wastage.</div>
                    <div><span className="font-semibold">Q3. What units does it support?</span><br />Dimensions can be entered in meters or feet, and paint is calculated in litres.</div>
                    <div><span className="font-semibold">Q4. Can it handle multiple coats?</span><br />Yes, simply enter the number of coats for accurate results.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
