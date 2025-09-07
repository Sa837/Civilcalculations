"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, RotateCcw, Eye, EyeOff, Info, CheckCircle } from 'lucide-react'


interface RoofResult {
  area: number
}


type RoofType = 'gable' | 'hip' | 'shed' | 'mansard' | 'gambrel' | 'pyramid' | 'butterfly';

interface RoofFormData {
  roofType: RoofType;
  length: string;
  width: string;
  slope: string;
  hipLength?: string;
  upperSlope?: string; // for mansard/gambrel
  lowerSlope?: string; // for mansard/gambrel
  height?: string;     // for pyramid/butterfly
  unit: 'm' | 'ft';
}

const UNIT_CONVERSIONS = { m: { length: 1 }, ft: { length: 0.3048 } }

export default function RoofAreaCalculator({ globalUnit = 'm' }: { globalUnit?: 'm' | 'ft' }) {
  const [formData, setFormData] = useState<RoofFormData>({ roofType: 'gable', length: '', width: '', slope: '', hipLength: '', unit: globalUnit })
  const [result, setResult] = useState<RoofResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    setFormData(prev => ({ ...prev, unit: globalUnit }))
  }, [globalUnit])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.length || parseFloat(formData.length) <= 0) newErrors.length = 'Enter a valid length'
    if (!formData.width || parseFloat(formData.width) <= 0) newErrors.width = 'Enter a valid width'
    if (!formData.slope || isNaN(parseFloat(formData.slope))) newErrors.slope = 'Enter a valid slope (degrees)'
  if (formData.roofType === 'hip' && (!formData.hipLength || parseFloat(formData.hipLength) <= 0)) newErrors.hipLength = 'Enter a valid hip length'
  if ((formData.roofType === 'mansard' || formData.roofType === 'gambrel') && (!formData.upperSlope || isNaN(parseFloat(formData.upperSlope)))) newErrors.upperSlope = 'Enter upper slope (degrees)'
  if ((formData.roofType === 'mansard' || formData.roofType === 'gambrel') && (!formData.lowerSlope || isNaN(parseFloat(formData.lowerSlope)))) newErrors.lowerSlope = 'Enter lower slope (degrees)'
  if ((formData.roofType === 'pyramid' || formData.roofType === 'butterfly') && (!formData.height || parseFloat(formData.height) <= 0)) newErrors.height = 'Enter a valid height'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateRoof = async () => {
    if (!validateForm()) return
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    try {
      const length = parseFloat(formData.length)
      const width = parseFloat(formData.width)
      const slope = parseFloat(formData.slope)
      let area = 0
      if (formData.roofType === 'gable') {
        // Gable roof: 2 slopes
        area = 2 * (length * width / 2) / Math.cos((slope * Math.PI) / 180)
      } else if (formData.roofType === 'hip') {
        // Hip roof: 4 slopes, needs hipLength
        const hipLength = parseFloat(formData.hipLength || '0')
        area = 2 * (length * width / 2) / Math.cos((slope * Math.PI) / 180) + 2 * (hipLength * width / 2) / Math.cos((slope * Math.PI) / 180)
      } else if (formData.roofType === 'mansard') {
        // Mansard: 4 sides, each with two slopes (upper/lower)
        const upperSlope = parseFloat(formData.upperSlope || '0')
        const lowerSlope = parseFloat(formData.lowerSlope || '0')
        // Approximate: area = 2*(length/2*width/2)/cos(upperSlope) + 2*(length/2*width/2)/cos(lowerSlope)
        area = 2 * (length * width / 4) / Math.cos((upperSlope * Math.PI) / 180) + 2 * (length * width / 4) / Math.cos((lowerSlope * Math.PI) / 180)
      } else if (formData.roofType === 'gambrel') {
        // Gambrel: 2 sides, each with two slopes (upper/lower)
        const upperSlope = parseFloat(formData.upperSlope || '0')
        const lowerSlope = parseFloat(formData.lowerSlope || '0')
        area = (length * width / 2) / Math.cos((upperSlope * Math.PI) / 180) + (length * width / 2) / Math.cos((lowerSlope * Math.PI) / 180)
      } else if (formData.roofType === 'pyramid') {
        // Pyramid: 4 equal triangles, area = 2*base*height
        const height = parseFloat(formData.height || '0')
        area = 2 * length * height
      } else if (formData.roofType === 'butterfly') {
        // Butterfly: 2 slopes inward, area = 2 * (length * height) / cos(slope)
        const height = parseFloat(formData.height || '0')
        area = 2 * (length * height) / Math.cos((slope * Math.PI) / 180)
      } else {
        // Shed/simple roof
        area = (length * width) / Math.cos((slope * Math.PI) / 180)
      }
      setResult({ area })
    } finally {
      setIsCalculating(false)
    }
  }

  const resetForm = () => {
    setFormData({ roofType: 'gable', length: '', width: '', slope: '', hipLength: '', unit: globalUnit })
    setResult(null)
    setErrors({})
    setShowSteps(false)
  }

  const handleInputChange = (field: keyof RoofFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

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
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">Roof Area Calculator</h1>
              <p className="text-body/70 dark:text-body-dark/70">Estimate roof surface area for various roof types.</p>
            </div>
          </div>
        </div>
        {/* Roof Type Diagram */}
        <div className="p-8">
          <div className="mb-8 flex justify-center">
            {formData.roofType === 'gable' && (
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,90 90,20 170,90" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
                <rect x="30" y="90" width="120" height="8" fill="#cbd5e1" />
                <text x="90" y="15" textAnchor="middle" fontSize="12" fill="#2563eb">Slope</text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#334155">Length</text>
                <text x="175" y="80" fontSize="12" fill="#334155">Width</text>
              </svg>
            )}
            {formData.roofType === 'hip' && (
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,90 90,30 170,90 90,90" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
                <polygon points="10,90 90,90 90,30" fill="#c7d2fe" stroke="#2563eb" strokeWidth="1" />
                <polygon points="170,90 90,90 90,30" fill="#c7d2fe" stroke="#2563eb" strokeWidth="1" />
                <rect x="30" y="90" width="120" height="8" fill="#cbd5e1" />
                <text x="90" y="25" textAnchor="middle" fontSize="12" fill="#2563eb">Slope</text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#334155">Length</text>
                <text x="175" y="80" fontSize="12" fill="#334155">Width</text>
                <text x="140" y="60" fontSize="12" fill="#334155">Hip</text>
              </svg>
            )}
            {formData.roofType === 'mansard' && (
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="10,90 50,50 90,70 130,50 170,90" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
                <rect x="30" y="90" width="120" height="8" fill="#cbd5e1" />
                <text x="90" y="45" textAnchor="middle" fontSize="12" fill="#2563eb">Upper Slope</text>
                <text x="90" y="80" textAnchor="middle" fontSize="12" fill="#2563eb">Lower Slope</text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#334155">Length</text>
                <text x="175" y="80" fontSize="12" fill="#334155">Width</text>
              </svg>
            )}
            {formData.roofType === 'gambrel' && (
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="10,90 50,50 90,70 130,50 170,90" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
                <rect x="30" y="90" width="120" height="8" fill="#cbd5e1" />
                <text x="90" y="45" textAnchor="middle" fontSize="12" fill="#2563eb">Upper Slope</text>
                <text x="90" y="80" textAnchor="middle" fontSize="12" fill="#2563eb">Lower Slope</text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#334155">Length</text>
                <text x="175" y="80" fontSize="12" fill="#334155">Width</text>
              </svg>
            )}
            {formData.roofType === 'pyramid' && (
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="90,20 10,90 170,90" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
                <rect x="30" y="90" width="120" height="8" fill="#cbd5e1" />
                <text x="90" y="15" textAnchor="middle" fontSize="12" fill="#2563eb">Height</text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#334155">Length</text>
                <text x="175" y="80" fontSize="12" fill="#334155">Width</text>
              </svg>
            )}
            {formData.roofType === 'butterfly' && (
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="10,90 90,50 170,90" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
                <rect x="30" y="90" width="120" height="8" fill="#cbd5e1" />
                <text x="90" y="45" textAnchor="middle" fontSize="12" fill="#2563eb">Height</text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#334155">Length</text>
                <text x="175" y="80" fontSize="12" fill="#334155">Width</text>
              </svg>
            )}
            {formData.roofType === 'shed' && (
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,90 170,90 170,50 10,70" fill="#e0e7ef" stroke="#2563eb" strokeWidth="2" />
                <rect x="30" y="90" width="120" height="8" fill="#cbd5e1" />
                <text x="90" y="45" textAnchor="middle" fontSize="12" fill="#2563eb">Slope</text>
                <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#334155">Length</text>
                <text x="175" y="80" fontSize="12" fill="#334155">Width</text>
              </svg>
            )}
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Roof Type</label>
            <select
              value={formData.roofType}
              onChange={e => handleInputChange('roofType', e.target.value as RoofType)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
            >
              <option value="gable">Gable (2 slopes)</option>
              <option value="hip">Hip (4 slopes)</option>
              <option value="mansard">Mansard (4 slopes, 2 pitches per side)</option>
              <option value="gambrel">Gambrel (barn-style, 2 slopes per side)</option>
              <option value="pyramid">Pyramid (4 equal slopes)</option>
              <option value="butterfly">Butterfly (2 slopes inward)</option>
              <option value="shed">Shed (single slope)</option>
            </select>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Length ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.length}
                onChange={e => handleInputChange('length', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter length"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.length ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.length && <div className="text-red-600 text-xs mt-1">{errors.length}</div>}
            </div>
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Width ({formData.unit === 'm' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={formData.width}
                onChange={e => handleInputChange('width', e.target.value)}
                step="0.01"
                min="0"
                placeholder="Enter width"
                className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.width ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
              />
              {errors.width && <div className="text-red-600 text-xs mt-1">{errors.width}</div>}
            </div>
            {(formData.roofType === 'gable' || formData.roofType === 'hip' || formData.roofType === 'shed' || formData.roofType === 'butterfly') && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Slope (degrees)</label>
                <input
                  type="number"
                  value={formData.slope}
                  onChange={e => handleInputChange('slope', e.target.value)}
                  step="0.1"
                  min="0"
                  max="90"
                  placeholder="Enter slope in degrees"
                  className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.slope ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                />
                {errors.slope && <div className="text-red-600 text-xs mt-1">{errors.slope}</div>}
              </div>
            )}
            {(formData.roofType === 'mansard' || formData.roofType === 'gambrel') && (
              <>
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Upper Slope (degrees)</label>
                  <input
                    type="number"
                    value={formData.upperSlope || ''}
                    onChange={e => handleInputChange('upperSlope', e.target.value)}
                    step="0.1"
                    min="0"
                    max="90"
                    placeholder="Enter upper slope in degrees"
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.upperSlope ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                  />
                  {errors.upperSlope && <div className="text-red-600 text-xs mt-1">{errors.upperSlope}</div>}
                </div>
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Lower Slope (degrees)</label>
                  <input
                    type="number"
                    value={formData.lowerSlope || ''}
                    onChange={e => handleInputChange('lowerSlope', e.target.value)}
                    step="0.1"
                    min="0"
                    max="90"
                    placeholder="Enter lower slope in degrees"
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.lowerSlope ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                  />
                  {errors.lowerSlope && <div className="text-red-600 text-xs mt-1">{errors.lowerSlope}</div>}
                </div>
              </>
            )}
            {(formData.roofType === 'pyramid' || formData.roofType === 'butterfly') && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Height ({formData.unit === 'm' ? 'm' : 'ft'})</label>
                <input
                  type="number"
                  value={formData.height || ''}
                  onChange={e => handleInputChange('height', e.target.value)}
                  step="0.01"
                  min="0"
                  placeholder="Enter height"
                  className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.height ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                />
                {errors.height && <div className="text-red-600 text-xs mt-1">{errors.height}</div>}
              </div>
            )}
            {formData.roofType === 'hip' && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Hip Length ({formData.unit === 'm' ? 'm' : 'ft'})</label>
                <input
                  type="number"
                  value={formData.hipLength}
                  onChange={e => handleInputChange('hipLength', e.target.value)}
                  step="0.01"
                  min="0"
                  placeholder="Enter hip length"
                  className={`w-full rounded-xl border px-4 py-3 font-sans ${errors.hipLength ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}
                />
                {errors.hipLength && <div className="text-red-600 text-xs mt-1">{errors.hipLength}</div>}
              </div>
            )}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">Unit</label>
              <select
                value={formData.unit}
                onChange={e => handleInputChange('unit', e.target.value as 'm' | 'ft')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="m">Metric (m)</option>
                <option value="ft">Imperial (ft)</option>
              </select>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-heading hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
              >
                {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </button>
            </div>
            <button
              type="button"
              onClick={calculateRoof}
              disabled={isCalculating}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-display font-semibold text-white shadow-soft hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Calculator className="h-4 w-4" />
                  Calculate
                </>
              )}
            </button>
          </div>
        </div>
        {/* Results & FAQ */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
            >
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="font-display text-xl font-semibold text-heading dark:text-heading-dark">Calculation Results</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">Roof Area</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body/70 dark:text-body-dark/70">Area:</span>
                      <span className="font-mono font-semibold">{result.area.toFixed(2)} {formData.unit === 'm' ? 'm²' : 'ft²'}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Steps */}
              {showSteps && result && (
                <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4 font-display text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    Step-by-Step Calculation
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    {formData.roofType === 'gable' && (
                      <li>
                        <span className="font-semibold">Area (Gable):</span> 2 × (Length × Width / 2) / cos(Slope) = 2 × ({formData.length} × {formData.width} / 2) / cos({formData.slope}°) = {result.area.toFixed(2)} {formData.unit === 'm' ? 'm²' : 'ft²'}
                      </li>
                    )}
                    {formData.roofType === 'hip' && (
                      <>
                        <li>
                          <span className="font-semibold">Main Area (Hip):</span> 2 × (Length × Width / 2) / cos(Slope) = 2 × ({formData.length} × {formData.width} / 2) / cos({formData.slope}°)
                        </li>
                        <li>
                          <span className="font-semibold">Hip Area:</span> 2 × (Hip Length × Width / 2) / cos(Slope) = 2 × ({formData.hipLength} × {formData.width} / 2) / cos({formData.slope}°)
                        </li>
                        <li>
                          <span className="font-semibold">Total Area:</span> Main Area + Hip Area = {result.area.toFixed(2)} {formData.unit === 'm' ? 'm²' : 'ft²'}
                        </li>
                      </>
                    )}
                    {formData.roofType === 'shed' && (
                      <li>
                        <span className="font-semibold">Area (Shed):</span> Length × Width / cos(Slope) = {formData.length} × {formData.width} / cos({formData.slope}°) = {result.area.toFixed(2)} {formData.unit === 'm' ? 'm²' : 'ft²'}
                      </li>
                    )}
                  </ol>
                </div>
              )}
              {/* Info & FAQ */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">Roof Area Calculator & Estimator – Accurate, Fast, and Professional</h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">This calculator helps you estimate the surface area of a sloped roof for material estimation and planning. Enter your roof dimensions, slope, and type for a precise result.</p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Roof Area Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get the exact surface area of your roof for material estimation.</li>
                    <li>Plan your roofing project efficiently and professionally.</li>
                    <li>Save money by ordering the right amount of roofing material.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Select the roof type (Gable, Hip, Shed).</li>
                    <li>Enter the roof length, width, slope, and hip length (if applicable).</li>
                    <li>The calculator computes the surface area using trigonometric formulas for each roof type.</li>
                    <li>Results are shown instantly and can be used for ordering materials.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Roof Area Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What is a roof area calculator?</span><br />
                      A tool to calculate the surface area of a sloped roof for material estimation.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. Why is it important?</span><br />
                      Helps in accurate planning, cost-saving, and reducing material wastage.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. What roof types does it support?</span><br />
                      Gable (2 slopes), Hip (4 slopes), and Shed (single slope).
                    </div>
                    <div>
                      <span className="font-semibold">Q4. How is roof area calculated?</span><br />
                      Using the appropriate formula for each roof type, including trigonometric adjustments for slope.
                    </div>
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
