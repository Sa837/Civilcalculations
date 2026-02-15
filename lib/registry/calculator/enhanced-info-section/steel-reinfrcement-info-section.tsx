export const STEEL_REINFORCEMENT_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Enhanced Info & Educational Section */}
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Steel Reinforcement Calculation & Construction
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Steel reinforcement is the backbone of reinforced concrete construction, providing tensile
          strength and ductility to concrete structures. This comprehensive guide covers steel
          reinforcement properties, calculation methodologies, material specifications, and
          construction best practices essential for structural integrity and cost-effective
          construction.
        </p>
      </div>

      {/* Why Accurate Steel Reinforcement Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Steel Reinforcement Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Material Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate steel calculations prevent over-ordering by 15-25%, reducing material costs
              and minimizing waste in construction projects.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Structural Safety
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper reinforcement ensures structural integrity and prevents catastrophic failures
              that could endanger lives and property.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Code Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Building codes require minimum reinforcement ratios and proper placement, ensuring
              legal compliance and insurance coverage.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Construction Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate steel quantities ensure right materials are available when needed, reducing
              construction delays and labor costs.
            </p>
          </div>
          <div className="rounded-lg bg-indigo-50/50 p-4 dark:bg-indigo-900/20 border border-indigo-200/30 dark:border-indigo-700/30">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
              Quality Assurance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper reinforcement calculations ensure adequate strength and serviceability, meeting
              design requirements and performance expectations.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-50/50 p-4 dark:bg-cyan-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
            <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">
              Project Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Early steel calculations enable better procurement planning and coordination with
              steel suppliers and fabricators.
            </p>
          </div>
        </div>
      </div>

      {/* Steel Reinforcement Types & Properties */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Steel Reinforcement Types & Properties
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                🔧
              </span>
              Steel Grades & Standards
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Fe415:</strong> Most common grade, yield strength 415 MPa, used for
                  general construction, good ductility and weldability.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Fe500:</strong> Higher strength grade (500 MPa), used for high-rise
                  buildings and bridges, requires careful handling.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Fe550:</strong> Premium grade (550 MPa), used in seismic zones and special
                  structures, excellent strength-to-weight ratio.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Fe600:</strong> Ultra-high strength (600 MPa), used in specialized
                  applications, requires expert design and handling.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>TMT Bars:</strong> Thermo-Mechanically Treated, corrosion resistant,
                  widely used in construction.
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                📏
              </span>
              Standard Bar Diameters & Properties
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-slate-200/20 dark:border-slate-700/20 text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="border border-slate-200/20 px-3 py-2 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                      Diameter (mm)
                    </th>
                    <th className="border border-slate-200/20 px-3 py-2 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                      Cross Section (mm²)
                    </th>
                    <th className="border border-slate-200/20 px-3 py-2 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                      Weight (kg/m)
                    </th>
                    <th className="border border-slate-200/20 px-3 py-2 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                      Typical Use
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      8
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      50.3
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      0.395
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      Distribution bars
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      10
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      78.5
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      0.617
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      Light reinforcement
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      12
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      113.1
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      0.888
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      General purpose
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      16
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      201.1
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      1.580
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      Main reinforcement
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      20
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      314.2
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      2.470
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      Heavy loading
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      25
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      490.9
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      3.850
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      Special structures
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      32
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      804.2
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      6.310
                    </td>
                    <td className="border border-slate-200/20 px-3 py-2 dark:border-slate-700/20">
                      Heavy construction
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Steel Reinforcement Calculation Methodology */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Steel Reinforcement Calculation Methodology
        </h3>
        <div className="space-y-6">
          <div className="rounded-lg border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                📐
              </span>
              Basic Weight & Length Calculations
            </h4>
            <div className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
              <p>
                <strong>Individual Bar Weight:</strong> (π × d²/4 × L × ρ) where d=diameter,
                L=length, ρ=density (7850 kg/m³)
              </p>
              <p>
                <strong>Total Weight:</strong> Individual bar weight × Number of bars
              </p>
              <p>
                <strong>Total Length:</strong> Bar length × Number of bars
              </p>
              <p>
                <strong>Unit Weight Formula:</strong> Weight per meter = 0.000006165 × d² (for d in
                mm, weight in kg/m)
              </p>
              <p>
                <strong>Volume Method:</strong> Weight = Volume × Density = (Area × Length) × 7850
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200/40 bg-green-50 p-6 dark:border-green-700/30 dark:bg-green-900/40">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                🔧
              </span>
              Reinforcement Ratio Calculations
            </h4>
            <div className="space-y-2 text-sm text-green-900 dark:text-green-100">
              <p>
                <strong>Steel Ratio (ρ):</strong> Total steel area ÷ Concrete area
              </p>
              <p>
                <strong>Minimum Ratio:</strong> 0.005 for beams, 0.0025 for slabs (ACI), 0.15% for
                general construction
              </p>
              <p>
                <strong>Maximum Ratio:</strong> 0.04 for beams, 0.06 for columns (to prevent
                congestion)
              </p>
              <p>
                <strong>Balanced Ratio:</strong> Ensures ductile failure rather than brittle failure
              </p>
              <p>
                <strong>Development Length:</strong> Ld = (φ × fy) / (4 × τbd) where τbd = design
                bond stress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Design Codes & Standards Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Design Codes & Steel Reinforcement Standards
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200/20 dark:border-slate-700/20">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Code/Standard
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Steel Grades
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Yield Strength (MPa)
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Minimum Reinforcement
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Development Length
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  IS 456:2000
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Fe250, Fe415, Fe500
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  250, 415, 500
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  0.15% of gross area
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Variable (47d-69d)
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  ACI 318-19
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Grade 40, 60, 75
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  276, 414, 517
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  0.0025 Ag for slabs
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Based on concrete strength
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  BS 8110
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  250, 460, 500
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  250, 460, 500
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  0.13% of gross area
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  (φ × 0.87fy)/(4 × τbd)
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  NBC 205:2020
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Fe415, Fe500, Fe550
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  415, 500, 550
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  0.15% of gross area
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  40d (tension), 30d (compression)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Professional Steel Reinforcement Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Professional Steel Reinforcement Best Practices
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                1. Material Selection
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Choose appropriate steel grade based on design requirements</li>
                <li>• Ensure steel meets relevant standards and certifications</li>
                <li>• Consider corrosion resistance for exposed or coastal environments</li>
                <li>• Verify material test certificates and quality assurance</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                2. Storage & Handling
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Store steel bars off ground to prevent corrosion</li>
                <li>• Protect from moisture and contamination</li>
                <li>• Use proper lifting equipment for heavy bundles</li>
                <li>• Maintain stock rotation (FIFO - First In, First Out)</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                3. Quality Control
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Perform regular testing of steel properties</li>
                <li>• Check for surface defects and dimensional accuracy</li>
                <li>• Verify bar markings and grade identification</li>
                <li>• Maintain proper documentation and traceability</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                4. Construction Practices
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Ensure proper concrete cover as per specifications</li>
                <li>• Maintain adequate spacing between bars</li>
                <li>• Provide proper lap splices and mechanical connections</li>
                <li>• Follow approved bar bending and placement schedules</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes in Steel Reinforcement */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Common Mistakes to Avoid in Steel Reinforcement
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Incorrect Steel Grade Selection
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Using wrong steel grade for design requirements, leading to either over-design (higher
              costs) or structural failure risks.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Insufficient Concrete Cover
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Placing reinforcement too close to concrete surface, reducing durability and fire
              resistance, violating building codes.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Poor Lap Splice Details
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Inadequate lap lengths or improper splice locations, creating weak points in the
              reinforcement continuity.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Congested Reinforcement
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Placing too many bars in limited space, making concrete placement difficult and
              reducing structural integrity.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Improper Bar Spacing
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Incorrect spacing between bars, affecting load distribution and concrete consolidation
              around reinforcement.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Corrosion-Prone Conditions
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Using regular steel in aggressive environments without proper corrosion protection or
              using corrosion-resistant alternatives.
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive FAQ */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm">
            7
          </span>
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between steel reinforcement and rebar?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Steel reinforcement and rebar (reinforcing bar) are essentially the same thing. Rebar
              refers to the steel bars used to reinforce concrete, providing tensile strength that
              concrete lacks. The term &quot;reinforcement&quot; encompasses all steel elements
              including bars, wires, and mesh used to strengthen concrete structures.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. How do I calculate the weight of steel reinforcement?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Steel weight can be calculated using the formula: Weight = (π × d²/4 × L × ρ) where d
              is diameter in meters, L is length in meters, and ρ is steel density (7850 kg/m³). For
              quick calculations, use the unit weight formula: Weight per meter = 0.000006165 × d²
              (where d is in mm, weight in kg/m).
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. What are the minimum reinforcement requirements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Minimum reinforcement varies by code and element type: IS 456 requires 0.15% of gross
              cross-sectional area for RCC beams and columns, ACI 318 requires 0.0025Ag for slabs,
              and most codes specify minimum ratios to prevent sudden brittle failure and ensure
              adequate crack control.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. How do steel grades affect construction?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Steel grade determines the yield strength and affects design calculations. Higher
              grades (Fe500, Fe550) allow for smaller bar diameters or fewer bars for the same
              strength, but require careful handling to avoid damage. Lower grades (Fe250, Fe415)
              are more ductile and easier to work with but require larger quantities.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. What is development length and why is it important?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Development length (Ld) is the minimum length of bar required to develop the full
              tensile strength of the bar through bond with concrete. It ensures that steel bars are
              properly anchored to prevent slipping. Typical values are 40d for tension and 30d for
              compression (where d is bar diameter).
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. How do I prevent steel corrosion in concrete?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Corrosion prevention requires adequate concrete cover (typically 25-40mm depending on
              exposure conditions), proper concrete quality (low permeability), and in aggressive
              environments, additional protection like epoxy coating, galvanized bars, or stainless
              steel reinforcement.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. What are the different types of steel-to-steel connections?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Common connections include lap splices (overlapping bars), mechanical splices
              (couplers), and welded connections. Lap splices are most common but require longer
              development lengths. Mechanical splices provide immediate full strength but are more
              expensive. Welding requires skilled labor and quality control.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. How do I handle steel reinforcement in seismic zones?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Seismic design requires special detailing including closer stirrup spacing, higher
              steel ratios, confinement reinforcement in columns, and special splice requirements.
              Use higher grade steel (Fe500 or above), provide adequate anchorage lengths, and
              follow seismic design codes like NBC 205 or ACI 318 for earthquake-resistant
              construction.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Steel Reinforcement Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to determine precise steel reinforcement quantities for your
          concrete structures. With accurate reinforcement calculations, you will optimize steel
          usage, ensure structural safety, and control construction costs. Perfect for structural
          engineers, detailers, and construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Reinforcement Design</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Steel Quantity Calculation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Structural Compliance</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
