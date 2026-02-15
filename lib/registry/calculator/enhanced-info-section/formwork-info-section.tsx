export const FORMWORK_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Enhanced Info & Educational Section */}
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Formwork Calculation & Construction
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Formwork is the temporary or permanent molds into which concrete is poured and shaped.
          This comprehensive guide covers formwork design principles, material selection,
          calculation methodologies, and construction best practices essential for quality concrete
          construction and cost-effective project management.
        </p>
      </div>

      {/* Why Accurate Formwork Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Formwork Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Material Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Precise formwork calculations minimize material waste by 20-30%, significantly
              reducing project costs and environmental impact.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Construction Quality
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Properly designed formwork ensures dimensional accuracy and surface finish quality,
              reducing rework by up to 40%.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Safety Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Adequate formwork design prevents formwork failure during concrete pouring, ensuring
              worker safety and regulatory compliance.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Schedule Management
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate formwork planning prevents delays in concrete pouring schedules and ensures
              project timeline adherence.
            </p>
          </div>
          <div className="rounded-lg bg-indigo-50/50 p-4 dark:bg-indigo-900/20 border border-indigo-200/30 dark:border-indigo-700/30">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
              Cost Estimation
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Enables accurate cost estimation for formwork materials, rental costs, and labor
              requirements throughout the project lifecycle.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-50/50 p-4 dark:bg-cyan-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
            <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">
              Reuse Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper formwork design maximizes reuse cycles (typically 5-10 uses), reducing
              long-term project costs.
            </p>
          </div>
        </div>
      </div>

      {/* Formwork Types & Applications */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Formwork Types & Material Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200/20 dark:border-slate-700/20">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Material Type
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Applications
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Reuse Cycles
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Surface Finish
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Cost Range
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Advantages
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Timber/Batten
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Walls, columns, small slabs
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  5-8 cycles
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Fair
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Low
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Easy to modify, local availability
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Plywood
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Slabs, beams, high-quality surfaces
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  8-12 cycles
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Good
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Medium
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Smooth finish, waterproof
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Steel
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  High-rise, complex shapes
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  50-100 cycles
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Excellent
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  High
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Durable, precision, rental available
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Aluminum
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Modern construction, fast-paced projects
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  100-200 cycles
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Excellent
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  High
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Lightweight, fast erection, corrosion resistant
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Plastic
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Temporary structures, small projects
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  20-50 cycles
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Good
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Medium
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Lightweight, chemical resistant, easy to clean
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Formwork Design Principles */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Formwork Design Principles & Standards
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                🏗️
              </span>
              Structural Requirements
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Load Capacity:</strong> Must support fresh concrete weight + construction
                  loads (typically 2.5-4 kN/m²)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Deflection Limits:</strong> Maximum deflection ≤ L/360 (L = span length)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Stability:</strong> Adequate bracing against lateral forces during pouring
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Connections:</strong> Secure joints to prevent leakage and misalignment
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Access Openings:</strong> Adequate provision for concrete placement and
                  vibration
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                📐
              </span>
              Dimensional Standards
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Tolerance:</strong> ±3mm for general construction, ±1mm for precision work
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Release Agents:</strong> Proper application to prevent concrete adhesion
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Cleaning:</strong> Thorough cleaning between uses to maintain surface
                  quality
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Storage:</strong> Protected from weather and damage when not in use
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Inspection:</strong> Regular checks for wear, damage, and structural
                  integrity
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Formwork Calculation Methodology */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Formwork Calculation Methodology
        </h3>
        <div className="space-y-6">
          <div className="rounded-lg border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                📐
              </span>
              Basic Area Calculations
            </h4>
            <div className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
              <p>
                <strong>Wall Formwork:</strong> Length × Height × 2 (for both sides)
              </p>
              <p>
                <strong>Column Formwork:</strong> Perimeter × Height × Number of lifts
              </p>
              <p>
                <strong>Slab Formwork:</strong> Length × Width (bottom surface area)
              </p>
              <p>
                <strong>Beam Formwork:</strong> (2 × Height × Length) + (Width × Length) - (2 ×
                Width × Height)
              </p>
              <p>
                <strong>Total Area:</strong> Sum of all individual formwork areas
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200/40 bg-green-50 p-6 dark:border-green-700/30 dark:bg-green-900/40">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                🔧
              </span>
              Material Quantity Calculations
            </h4>
            <div className="space-y-2 text-sm text-green-900 dark:text-green-100">
              <p>
                <strong>Plywood:</strong> Total area ÷ Sheet size (typically 2.44m × 1.22m)
              </p>
              <p>
                <strong>Battens:</strong> Perimeter ÷ Spacing × Length + wastage (10-15%)
              </p>
              <p>
                <strong>Shuttering Oil:</strong> 0.25-0.3 liters per m² of formwork surface
              </p>
              <p>
                <strong>Nails/Screws:</strong> 20-25 pieces per m² for timber formwork
              </p>
              <p>
                <strong>Clamps:</strong> 4-6 clamps per m² for large panel systems
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Formwork Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Professional Formwork Best Practices
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                1. Design & Planning
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Complete detailed drawings before construction</li>
                <li>• Consider concrete placement sequence</li>
                <li>• Plan for reuse and minimize waste</li>
                <li>• Include adequate access for workers</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                2. Material Selection
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Choose materials based on project requirements</li>
                <li>• Consider surface finish requirements</li>
                <li>• Evaluate rental vs purchase economics</li>
                <li>• Ensure compatibility with concrete mix</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                3. Construction Quality
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Ensure proper alignment and leveling</li>
                <li>• Apply release agents uniformly</li>
                <li>• Check stability before concrete pouring</li>
                <li>• Monitor for leaks and damage</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                4. Safety & Maintenance
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Regular inspection for structural integrity</li>
                <li>• Proper bracing and scaffolding</li>
                <li>• Safe stripping procedures</li>
                <li>• Clean and store materials properly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes in Formwork */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Common Mistakes to Avoid in Formwork Construction
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Inadequate Design
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Underestimating loads or not accounting for construction live loads, leading to
              formwork failure during concrete pouring.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Poor Alignment
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Improper leveling and alignment causing dimensional inaccuracies and difficult
              stripping.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Insufficient Bracing
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Inadequate diagonal bracing and supports allowing formwork movement during concrete
              placement.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Wrong Release Agents
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Using incorrect or insufficient release agents causing concrete to stick to formwork
              surfaces.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Premature Stripping
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Removing formwork before concrete achieves adequate strength, causing cracking or
              collapse.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Poor Surface Preparation
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Dirty or damaged formwork surfaces leading to poor concrete finish and increased
              finishing costs.
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
              Q1. When should formwork be stripped after concrete pouring?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Formwork stripping times depend on concrete strength and ambient conditions.
              Generally: walls and columns after 24-48 hours, beams and slabs after 7-14 days, heavy
              loads after 28 days. Always follow local codes and consult structural engineers for
              specific requirements.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. How do I calculate formwork loads?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Formwork must support: (1) Fresh concrete weight (typically 24-25 kN/m³), (2)
              Construction live loads (1.5-2 kN/m²), (3) Formwork self-weight (0.5-1 kN/m²), (4)
              Impact loads during pouring (2 kN/m²). Total design load is usually 4-6 kN/m²
              depending on pour height and methods.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. What are the different types of formwork systems?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <ul className="space-y-2">
                <li>
                  <strong>Traditional Timber:</strong> Conventional wood formwork for small projects
                </li>
                <li>
                  <strong>Engineered Formwork:</strong> Steel or aluminum panel systems
                </li>
                <li>
                  <strong>Slip Formwork:</strong> Continuous pouring for high-rise construction
                </li>
                <li>
                  <strong>Jump Formwork:</strong> Self-climbing systems for repetitive structures
                </li>
                <li>
                  <strong>Tunnel Formwork:</strong> Large room-sized forms for apartment blocks
                </li>
              </ul>
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. How do I choose between rental and purchase of formwork?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Rent formwork for one-time projects or when construction schedule is uncertain.
              Purchase when you have multiple projects, need specialized shapes, or when rental
              costs exceed purchase price (typically after 3-5 uses). Consider transportation,
              storage, and maintenance costs in your decision.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. What safety precautions are required for formwork construction?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Essential safety measures include: proper scaffolding and access platforms, fall
              protection systems, regular inspection of formwork integrity, safe stripping
              procedures, adequate lighting, and trained personnel. Never work under unsupported
              formwork or remove braces prematurely.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. How do I calculate formwork material quantities?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <ul className="space-y-2">
                <li>
                  <strong>Plywood:</strong> Total formwork area ÷ individual sheet area (2.44m ×
                  1.22m = 2.97m²)
                </li>
                <li>
                  <strong>Battens:</strong> Perimeter length ÷ spacing × formwork height + 10%
                  wastage
                </li>
                <li>
                  <strong>Shuttering oil:</strong> 0.25-0.35 liters per m² of contact surface
                </li>
                <li>
                  <strong>Nails:</strong> 15-25 pieces per m² depending on batten size
                </li>
              </ul>
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. What is the maximum pour height for formwork?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Maximum pour height depends on concrete mix, formwork strength, and vibration methods.
              Typical limits are 1.5-2m for normal concrete, 1-1.5m for high-strength concrete, and
              0.5-1m for self-compacting concrete. Always use concrete pumps or cranes for heights
              above 2m to reduce formwork loads.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. How do I ensure formwork dimensional accuracy?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use precise leveling tools, check diagonals for squareness, install control lines, use
              templates for repetitive elements, and perform regular checks during assembly.
              Tolerance limits are typically ±3mm for general construction and ±1mm for
              architectural concrete. Document all measurements and inspections.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Formwork Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to determine precise formwork quantities and material
          requirements. With accurate formwork calculations, you will optimize material usage,
          reduce construction costs, and ensure structural safety. Perfect for contractors, formwork
          designers, and construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">
            ✓ Formwork Quantity Calculation
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Material Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Estimation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Structural Safety</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
