export const ROOF_AREA_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Enhanced Info & Educational Section */}
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Roof Area Calculation & Construction
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Roof area calculation is fundamental to construction planning, roofing material
          estimation, and cost control. This comprehensive guide covers all major roof types,
          calculation methodologies, material considerations, and construction best practices
          essential for accurate project planning and successful roof installation.
        </p>
      </div>

      {/* Why Accurate Roof Area Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Roof Area Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Material Cost Control
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Precise roof area calculations prevent over-ordering of roofing materials by 20-30%,
              saving significant costs on large construction projects.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Construction Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate roof areas ensure proper scheduling of roofing work and coordination with
              other construction trades.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Regulatory Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Building codes require accurate roof area calculations for permit applications and
              structural compliance verification.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Structural Integrity
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper roof area calculations ensure adequate structural support and load distribution
              for all roofing materials.
            </p>
          </div>
          <div className="rounded-lg bg-indigo-50/50 p-4 dark:bg-indigo-900/20 border border-indigo-200/30 dark:border-indigo-700/30">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
              Insurance & Warranty
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate roof areas are required for insurance coverage calculations and roofing
              material warranties.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-50/50 p-4 dark:bg-cyan-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
            <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">
              Project Timeline
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Precise material quantities enable better procurement planning and reduce project
              delays due to material shortages.
            </p>
          </div>
        </div>
      </div>

      {/* Roof Types & Characteristics */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Roof Types & Their Characteristics
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                🏠
              </span>
              Common Roof Types
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Gable Roof:</strong> Two sloping sides meeting at a ridge, triangular
                  gable ends. Simple, cost-effective, good water runoff.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Hip Roof:</strong> All sides slope downward to walls, no gable ends.
                  Excellent wind resistance, more complex construction.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Shed Roof:</strong> Single sloping plane. Simple construction, used for
                  additions, garages, modern designs.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Mansard Roof:</strong> Two slopes on all sides, lower slope nearly
                  vertical. French provincial style, maximizes living space.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Gambrel Roof:</strong> Two slopes on each side, upper steeper than lower.
                  Barn style, maximizes attic space.
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                🔧
              </span>
              Specialized Roof Types
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Pyramid Roof:</strong> Four triangular sides meeting at a point. Square
                  buildings, gazebos, cupolas.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Butterfly Roof:</strong> Two slopes sloping inward from ridge to walls.
                  Modern architectural style, creates unique interior spaces.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Mansard Roof:</strong> Double slope on all sides, lower nearly vertical.
                  Creates additional living space, complex construction.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Gambrel Roof:</strong> Curved sides with two slopes, upper steeper.
                  Traditional barn style, maximizes usable space.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Flat Roof:</strong> Minimal slope for drainage. Modern buildings, requires
                  proper waterproofing and drainage.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Roof Area Calculation Methodology */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Roof Area Calculation Methodology
        </h3>
        <div className="space-y-6">
          <div className="rounded-lg border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                📐
              </span>
              Basic Roof Area Calculations
            </h4>
            <div className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
              <p>
                <strong>Gable Roof:</strong> (Length × Width × 2) × cos(slope)
              </p>
              <p>
                <strong>Hip Roof:</strong> Gable area + ((Hip length × Width) × cos(slope))
              </p>
              <p>
                <strong>Shed Roof:</strong> Length × Width × cos(slope)
              </p>
              <p>
                <strong>Pyramid Roof:</strong> (Base area × 4) × cos(slope) × sin(slope)
              </p>
              <p>
                <strong>Butterfly Roof:</strong> (Length × Width × 2) × cos(slope)
              </p>
              <p>
                <strong>Mansard Roof:</strong> Complex calculation with upper and lower slopes
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200/40 bg-green-50 p-6 dark:border-green-700/30 dark:bg-green-900/40">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                📏
              </span>
              Slope and Pitch Considerations
            </h4>
            <div className="space-y-2 text-sm text-green-900 dark:text-green-100">
              <p>
                <strong>Pitch:</strong> Rise over run (e.g., 4:12 means 4 inches rise per 12 inches
                run)
              </p>
              <p>
                <strong>Slope Angle:</strong> arctan(pitch) - affects surface area and material
                calculations
              </p>
              <p>
                <strong>Minimum Slope:</strong> 1/4 inch per foot for proper water drainage
              </p>
              <p>
                <strong>Steep Slope:</strong> &gt;6:12 pitch requires special installation
                techniques
              </p>
              <p>
                <strong>Area Multiplier:</strong> Actual area = plan area ÷ cos(slope angle)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roofing Materials & Their Requirements */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Roofing Materials & Coverage Specifications
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200/20 dark:border-slate-700/20">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Material Type
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Coverage per Unit
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Minimum Slope
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Expected Life
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Wastage Factor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Asphalt Shingles
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  3 squares per bundle
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  4:12 pitch
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  15-30 years
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  10-15%
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Metal Roofing
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  32-36 sq ft per sheet
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  3:12 pitch
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  40-70 years
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  5-10%
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Tile Roofing
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  0.75-1.0 sq m per tile
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  4:12 pitch
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  50-100 years
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  5-8%
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  Slate Roofing
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  1 sq ft per slate
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  4:12 pitch
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  75-150 years
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  8-12%
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  EPDM Membrane
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  100 sq ft per roll
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  1/4:12 pitch
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  20-30 years
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  5-10%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Professional Roofing Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Professional Roofing Best Practices
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                1. Design Considerations
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Consider local climate and wind loads</li>
                <li>• Ensure proper drainage and ventilation</li>
                <li>• Account for snow loads in cold climates</li>
                <li>• Include adequate overhangs for protection</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                2. Material Selection
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Choose materials suitable for roof slope</li>
                <li>• Consider expected lifespan and maintenance</li>
                <li>• Evaluate cost vs performance trade-offs</li>
                <li>• Ensure compatibility with local building codes</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                3. Installation Quality
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Ensure proper underlayment installation</li>
                <li>• Maintain consistent overlap and fastening</li>
                <li>• Install proper flashing and sealing</li>
                <li>• Follow manufacturer specifications</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                4. Safety & Maintenance
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Use proper fall protection systems</li>
                <li>• Schedule regular inspections and maintenance</li>
                <li>• Address leaks and damage promptly</li>
                <li>• Follow safety protocols during installation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes in Roof Area Calculation */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Common Mistakes to Avoid in Roof Area Calculation
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Ignoring Slope Factor
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Calculating roof area using only plan dimensions without accounting for slope,
              resulting in underestimation of material needs.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Wrong Roof Type Selection
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Misidentifying roof type (e.g., treating hip roof as gable) leading to incorrect area
              calculations and material ordering.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Forgetting Overhangs
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Not including eaves, gutters, and roof overhangs in area calculations, affecting both
              coverage and aesthetics.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Incorrect Wastage Calculation
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Not accounting for cutting waste, overlapping requirements, and installation waste
              leading to material shortages.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Missing Complex Geometries
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Overlooking dormers, skylights, chimneys, and other roof penetrations that affect
              total roof area calculations.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Unit Conversion Errors
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Mixing units (feet vs meters) or incorrect conversions between different measurement
              systems.
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
              Q1. How do I determine the correct roof slope for my location?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Roof slope depends on local climate, building codes, and roofing material
              requirements. Minimum slopes are typically 2:12 for asphalt shingles, 3:12 for metal
              roofing, and 1/4:12 for flat roofs. Consult local building codes and roofing material
              manufacturers for specific requirements in your area.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. What's the difference between roof area and plan area?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Plan area is the horizontal projection of the building footprint. Roof area is the
              actual surface area of the roofing material, which is larger due to slope. The
              relationship is: Roof Area = Plan Area ÷ cos(slope angle). This difference becomes
              significant for steeper roof slopes.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. How do I calculate roofing material quantities?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Start with accurate roof area calculation, then divide by material coverage rate. Add
              wastage factors (typically 10-15% for shingles, 5-10% for metal). Consider overlaps,
              hips, ridges, and valleys as additional material requirements. Always round up to
              account for cutting waste and future repairs.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. What are the standard roof pitch measurements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Roof pitch is measured as rise over run (e.g., 4:12 means 4 inches rise per 12 inches
              run). Common pitches include: 2:12 (gentle), 4:12 (typical), 6:12 (steep), 8:12 (very
              steep), 12:12 (nearly vertical). Pitch affects both structural requirements and
              material selection.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. How do I handle complex roof shapes like mansard or gambrel?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Complex roofs require calculating each roof plane separately, then summing the areas.
              For mansard roofs, calculate upper and lower slopes independently. For gambrel roofs,
              treat as two different slopes on each side. Use the calculator's built-in formulas for
              accurate results, or break complex roofs into simpler geometric shapes for manual
              calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. What is the minimum roof slope for different roofing materials?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <ul className="space-y-2">
                <li>
                  <strong>Asphalt Shingles:</strong> 2:12 to 4:12 pitch
                </li>
                <li>
                  <strong>Metal Roofing:</strong> 3:12 pitch minimum
                </li>
                <li>
                  <strong>Tile Roofing:</strong> 4:12 pitch minimum
                </li>
                <li>
                  <strong>EPDM Membrane:</strong> 1/4:12 pitch (nearly flat)
                </li>
                <li>
                  <strong>Built-up Roofing:</strong> 1/4:12 pitch minimum
                </li>
              </ul>
              Lower slopes may require special installation techniques and additional waterproofing.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. How do I account for roof penetrations and accessories?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Roof penetrations (chimneys, vents, skylights) require additional flashing and
              sealing. Calculate their areas separately and add to total roof area for material
              estimation. Roof accessories like gutters, downspouts, and ventilation systems should
              be included in the overall roofing plan but not in the surface area calculations for
              roofing materials.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. What factors affect roof area calculations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Key factors include roof type and complexity, slope angle, building dimensions,
              overhangs and eaves, roof penetrations, local building codes, material-specific
              requirements, and appropriate wastage factors. Climate considerations like snow loads
              and wind resistance also influence the final roof design and area calculations.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Roof Area Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to determine precise roof areas for accurate material estimation.
          With accurate roof area calculations, you will optimize roofing material quantities,
          control costs, and ensure proper waterproofing coverage. Perfect for architects,
          contractors, and roofing professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Roof Area Calculation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Material Estimation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Waterproofing Design</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
