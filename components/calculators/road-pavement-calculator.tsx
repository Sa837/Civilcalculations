
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, AlertCircle, CheckCircle, RotateCcw, Info, Hammer } from "lucide-react";

interface CalculationResult {
  area: number;
  volume: number;
}

interface FormData {
  length: string;
  width: string;
  thickness: string;
  area?: string;
  unit: "m" | "ft";
}

interface RoadPavementCalculatorProps {
  globalUnit?: "m" | "ft";
}

const UNIT_LABELS = {
  m: "Metric (m)",
  ft: "Imperial (ft)",
};

export default function RoadPavementCalculator({ globalUnit = "m" }: RoadPavementCalculatorProps) {
  const [formData, setFormData] = useState<FormData>({
    length: "",
    width: "",
    thickness: "",
    area: "",
    unit: globalUnit,
  });
  const [useArea, setUseArea] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, unit: globalUnit }));
  }, [globalUnit]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (useArea) {
      if (!formData.area || parseFloat(formData.area) <= 0) newErrors.area = "Enter a valid area";
    } else {
      if (!formData.length || parseFloat(formData.length) <= 0) newErrors.length = "Enter a valid length";
      if (!formData.width || parseFloat(formData.width) <= 0) newErrors.width = "Enter a valid width";
    }
    if (!formData.thickness || parseFloat(formData.thickness) <= 0) newErrors.thickness = "Enter a valid thickness";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = async () => {
    if (!validateForm()) return;
    setIsCalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      let area = 0;
      if (useArea && formData.area) {
        area = parseFloat(formData.area);
        if (formData.unit === "ft") area *= 0.092903;
      } else {
        area = parseFloat(formData.length) * parseFloat(formData.width);
        if (formData.unit === "ft") area *= 0.092903;
      }
      let thickness = parseFloat(formData.thickness);
      if (formData.unit === "ft") thickness *= 0.3048;
      let volume = area * thickness;
      setResult({ area, volume });
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => {
    setFormData({ length: "", width: "", thickness: "", area: "", unit: globalUnit });
    setResult(null);
    setErrors({});
    setShowSteps(false);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

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
              <Hammer className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">
                Road Pavement Calculator
              </h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Estimate area and volume for road pavement projects
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="flex justify-end gap-4 mb-4">
            {/* Use Area Button */}
            <button
              type="button"
              onClick={() => setUseArea(!useArea)}
              className={`flex items-center gap-2 rounded-xl px-6 py-2 font-display font-medium shadow-soft transition-all 
    ${useArea ? "bg-green-600 text-white hover:bg-green-700" : "bg-secondary text-white hover:bg-secondary/90"}`}
            >
              <Info className="h-4 w-4" />
              {useArea ? "Use Length & Width" : "Use Area"}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {!useArea && (
              <>
                {/* Length */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                    Length
                  </label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter length (${formData.unit === "m" ? "m" : "ft"})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${
                      errors.length
                        ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                        : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                    }`}
                  />
                  {errors.length && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.length}
                    </div>
                  )}
                </div>

                {/* Width */}
                <div>
                  <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                    Width
                  </label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => handleInputChange("width", e.target.value)}
                    step="0.001"
                    min="0"
                    placeholder={`Enter width (${formData.unit === "m" ? "m" : "ft"})`}
                    className={`w-full rounded-xl border px-4 py-3 font-sans ${
                      errors.width
                        ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                        : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                    }`}
                  />
                  {errors.width && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.width}
                    </div>
                  )}
                </div>
              </>
            )}

            {useArea && (
              <div>
                <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                  Area
                </label>
                <input
                  type="number"
                  value={formData.area || ""}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  step="0.001"
                  min="0"
                  placeholder={`Enter total area (${formData.unit === "m" ? "m²" : "ft²"})`}
                  className={`w-full rounded-xl border px-4 py-3 font-sans ${
                    errors.area
                      ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                      : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  }`}
                />
                {errors.area && (
                  <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.area}
                  </div>
                )}
              </div>
            )}

            {/* Thickness */}
            <div>
              <label className="mb-2 block font-display font-medium text-heading dark:text-heading-dark">
                Thickness
              </label>
              <input
                type="number"
                value={formData.thickness}
                onChange={(e) => handleInputChange("thickness", e.target.value)}
                step="0.001"
                min="0"
                placeholder={`Enter thickness (${formData.unit === "m" ? "m" : "ft"})`}
                className={`w-full rounded-xl border px-4 py-3 font-sans ${
                  errors.thickness
                    ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                    : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                }`}
              />
              {errors.thickness && (
                <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.thickness}
                </div>
              )}
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
                disabled={!result}
              >
                <Info className="h-4 w-4" />
                Steps
              </button>
            </div>

            <button
              type="button"
              onClick={calculate}
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
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
            >
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="font-display text-xl font-semibold text-heading dark:text-heading-dark">
                  Calculation Results
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Area
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-body/70 dark:text-body-dark/70">Area:</span>
                    <span className="font-mono font-semibold">
                      {result.area.toFixed(3)} m²
                    </span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/20 bg-white/70 p-6 dark:border-slate-700/30 dark:bg-slate-900/60">
                  <h3 className="mb-4 font-display font-semibold text-heading dark:text-heading-dark">
                    Volume
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-body/70 dark:text-body-dark/70">Volume:</span>
                    <span className="font-mono font-semibold">
                      {result.volume.toFixed(3)} m³
                    </span>
                  </div>
                </div>
              </div>

              {showSteps && result && (
                <div className="mt-6 rounded-xl border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
                  <h3 className="mb-4 font-display text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    Step-by-Step Calculation
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-base text-blue-900 dark:text-blue-100">
                    {!useArea && (
                      <li>
                        <span className="font-semibold">Area:</span> Length × Width = {formData.length} × {formData.width} = {(parseFloat(formData.length) * parseFloat(formData.width)).toFixed(3)} m²
                      </li>
                    )}
                    {useArea && (
                      <li>
                        <span className="font-semibold">Area:</span> {formData.area} m² (direct input)
                      </li>
                    )}
                    <li>
                      <span className="font-semibold">Thickness:</span> {formData.thickness} {formData.unit === "m" ? "m" : "ft"}
                    </li>
                    <li>
                      <span className="font-semibold">Volume:</span> Area × Thickness = {result.area.toFixed(3)} × {formData.thickness} = {result.volume.toFixed(3)} m³
                    </li>
                  </ol>
                </div>
              )}

              {/* FAQ Section */}
              <div className="mt-12 rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
                <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark mb-2">
                  Road Pavement Calculator & Estimator – Fast, Accurate, and Mobile Friendly
                </h2>
                <p className="text-body/80 dark:text-body-dark/80 mb-4">
                  This tool helps civil engineers, contractors, and planners estimate the area and volume of road pavement projects, supporting both metric and imperial units.
                </p>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">Why Use a Road Pavement Calculator?</h3>
                  <ul className="list-disc list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Get precise area and volume for road pavement construction.</li>
                    <li>Plan material requirements and reduce waste.</li>
                    <li>Improve project planning and cost estimation.</li>
                  </ul>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-1 text-body/80 dark:text-body-dark/80">
                    <li>Enter the project dimensions: length, width (or direct area), and thickness.</li>
                    <li>Choose the unit: metric (m) or imperial (ft).</li>
                    <li>Get instant results for area and volume in metric units.</li>
                  </ol>
                </div>
                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading dark:text-heading-dark mb-2">FAQs – Road Pavement Calculator</h3>
                  <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                    <div>
                      <span className="font-semibold">Q1. What does this calculator do?</span><br />
                      It estimates the area and volume for road pavement projects based on your input dimensions.
                    </div>
                    <div>
                      <span className="font-semibold">Q2. What units does it support?</span><br />
                      You can enter values in meters or feet; results are shown in metric units for consistency.
                    </div>
                    <div>
                      <span className="font-semibold">Q3. Can I use area directly?</span><br />
                      Yes, switch to area mode if you already know the total area to be paved.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
