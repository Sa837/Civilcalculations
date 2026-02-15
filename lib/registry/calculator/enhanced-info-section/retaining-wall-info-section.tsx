export const RETAINING_WALL_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Retaining Wall Design & Construction
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Retaining walls are essential structural elements that hold back soil and prevent erosion,
          creating usable space and protecting property from landslides. Understanding how to
          design, calculate loads, and construct retaining walls safely is crucial for civil
          engineers, architects, and landscape designers. This comprehensive guide covers everything
          from basic wall types to advanced stability calculations, ensuring proper design and
          construction of retaining structures.
        </p>
      </div>

      {/* Why Accurate Retaining Wall Design Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Retaining Wall Design Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Structural Safety
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper design prevents wall failure, landslides, and property damage. Incorrect
              calculations can lead to catastrophic collapse affecting lives and property worth
              millions.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Cost Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate load calculations determine optimal wall thickness and reinforcement,
              avoiding over-design while ensuring safety. Proper design can reduce construction
              costs by 20-30%.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Regulatory Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Building codes require specific design standards for retaining walls. Proper
              calculations ensure compliance with local codes and prevent legal liabilities.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Long-term Performance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Well-designed walls resist settlement, cracking, and failure over decades. Proper
              drainage and foundation design extend service life and reduce maintenance costs.
            </p>
          </div>
        </div>
      </div>

      {/* Retaining Wall Types & Applications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Retaining Wall Types and Their Applications
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Wall Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Height Range
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Best For
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Advantages
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Gravity Walls</td>
                <td className="px-4 py-3">1-3m</td>
                <td className="px-4 py-3">Low to medium heights</td>
                <td className="px-4 py-3">Simple construction, no reinforcement needed</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Cantilever Walls</td>
                <td className="px-4 py-3">3-8m</td>
                <td className="px-4 py-3">Medium to high walls</td>
                <td className="px-4 py-3">Economical, uses less material</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Counterfort Walls</td>
                <td className="px-4 py-3">8-20m</td>
                <td className="px-4 py-3">Very high walls</td>
                <td className="px-4 py-3">Excellent stability, reduced concrete volume</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Gabion Walls</td>
                <td className="px-4 py-3">2-10m</td>
                <td className="px-4 py-3">Flexible sites, drainage needed</td>
                <td className="px-4 py-3">Permeable, aesthetically pleasing</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Segmental Walls</td>
                <td className="px-4 py-3">1-6m</td>
                <td className="px-4 py-3">Residential, landscaping</td>
                <td className="px-4 py-3">Fast installation, flexible design</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Load Calculations & Stability Analysis */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Load Calculations and Stability Analysis
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Earth Pressure Calculations
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Lateral earth pressure is the key load on retaining walls. The Rankine and Coulomb
              theories provide methods to calculate active and passive earth pressures based on soil
              properties and wall friction.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Active Pressure</strong> = Kₐ × γ × H² ÷ 2
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Kₐ = coefficient of active earth pressure
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Passive Pressure</strong> = Kₚ × γ × H² ÷ 2
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Kₚ = coefficient of passive earth pressure
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Factor of Safety Requirements
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Walls must be designed with adequate factors of safety against overturning, sliding,
              and bearing capacity failure. Typical minimum factors of safety are 1.5 for
              overturning, 1.5 for sliding, and 2.0 for bearing.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">Surcharge Loads</h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Additional loads from vehicles, buildings, or sloping backfill must be considered.
              Uniform surcharge increases lateral pressure by Kₐ × q, where q is the surcharge load
              per unit area.
            </p>
          </div>
        </div>
      </div>

      {/* Materials & Construction Methods */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Materials and Construction Considerations
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">
              Concrete Retaining Walls
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Applications:</strong> High-load applications, permanent structures,
              commercial projects.
              <br />
              <strong>Strength:</strong> Very high compressive strength, excellent durability.
              <br />
              <strong>Design:</strong> Requires reinforcement for walls over 2m, proper curing
              essential.
              <br />
              <strong>Cost:</strong> Higher initial cost but very low maintenance.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">Masonry Retaining Walls</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Applications:</strong> Residential landscaping, garden walls, low-height
              barriers.
              <br />
              <strong>Strength:</strong> Good compressive strength, attractive appearance.
              <br />
              <strong>Design:</strong> Limited to 2-3m height, requires skilled masons.
              <br />
              <strong>Cost:</strong> Moderate cost, labor-intensive construction.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">Segmental Block Walls</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Applications:</strong> Residential, landscaping, medium-height walls.
              <br />
              <strong>Strength:</strong> Engineered blocks with interlocking design.
              <br />
              <strong>Design:</strong> Fast installation, flexible layouts, good drainage.
              <br />
              <strong>Cost:</strong> Cost-effective, reduced labor requirements.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">Timber & Steel Walls</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Applications:</strong> Temporary structures, emergency retaining, low-height
              barriers.
              <br />
              <strong>Strength:</strong> Suitable for temporary applications, limited height.
              <br />
              <strong>Design:</strong> Quick installation, reusable, but limited lifespan.
              <br />
              <strong>Cost:</strong> Low initial cost, but may require frequent replacement.
            </p>
          </div>
        </div>
      </div>

      {/* Drainage & Foundation Design */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Drainage Systems and Foundation Design
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Weep Holes & Drainage
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Install weep holes every 1-2 meters to relieve hydrostatic pressure. Use
                  perforated drain pipes behind the wall with gravel backfill for proper drainage.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Foundation Design
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Foundations must extend below frost line and be designed for eccentric loading.
                  Use spread footings or continuous foundations based on soil conditions.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Backfill Specifications
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use free-draining backfill materials. Avoid using excavated material that contains
                  clay or organic matter. Compact in layers to prevent settlement.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                4
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Surface Drainage
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Provide proper grading away from the wall. Install surface drains and swales to
                  prevent water accumulation behind the wall structure.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Frost Protection
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  In cold climates, foundations must extend below frost depth. Use frost-protected
                  shallow foundations or deep foundations to prevent frost heave.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Settlement Monitoring
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Install settlement monitoring points. Regular monitoring ensures early detection
                  of foundation movement and allows for corrective action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Standards & Codes */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Design Standards and Building Codes
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  AASHTO Standards
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  American Association of State Highway and Transportation Officials standards for
                  highway retaining walls and bridge abutments.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  IBC & IRC Requirements
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  International Building Code and International Residential Code requirements for
                  residential and commercial retaining walls.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">ACI Standards</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  American Concrete Institute standards for concrete retaining wall design and
                  construction.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                4
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Geotechnical Standards
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  ASTM standards for soil testing and geotechnical investigation requirements for
                  retaining wall design.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Seismic Design
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Special provisions for earthquake-resistant design in seismic zones, including
                  increased factors of safety and ductile detailing.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Local Codes</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Municipal building codes and permit requirements that may exceed national
                  standards based on local conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm">
            7
          </span>
          Common Mistakes to Avoid in Retaining Wall Design
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Drainage
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Failing to provide proper drainage leads to hydrostatic pressure buildup, causing wall
              failure. Always include weep holes, drain pipes, and proper grading.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Insufficient Foundation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Shallow foundations on poor soil lead to settlement and wall cracking. Always conduct
              soil tests and design foundations for actual soil conditions.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Surcharge Loads
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Additional loads from vehicles, buildings, or landscaping can overload walls. Always
              consider all potential surcharge loads in design calculations.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Backfill Quality
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using unsuitable backfill materials causes settlement and wall movement. Specify
              free-draining, non-organic backfill and proper compaction.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Reinforcement
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Insufficient or improperly placed reinforcement leads to structural failure. Follow
              engineering specifications for rebar size, spacing, and concrete cover.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Seismic Considerations Missing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              In seismic zones, walls need special detailing for earthquake loads. Ignoring seismic
              design can lead to catastrophic failure during earthquakes.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
            8
          </span>
          Frequently Asked Questions About Retaining Walls
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the maximum height for a gravity retaining wall?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Gravity walls can typically be built up to 3-4 meters depending on soil conditions and
              wall batter. For heights over 2 meters, cantilever or reinforced concrete walls are
              usually more economical and provide better stability.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. How do I calculate the active earth pressure on a retaining wall?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use Rankine&apos;s theory: Pₐ = (1/2)γH²Kₐ, where γ is soil unit weight, H is wall
              height, and Kₐ = (1-sinφ)/(1+sinφ) for level backfill. For sloping backfill or wall
              friction, use Coulomb&apos;s wedge theory or consult engineering tables.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. What is the required factor of safety against overturning?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Most building codes require a minimum factor of safety of 1.5 against overturning and
              1.5 against sliding for retaining walls. For critical applications or seismic zones,
              higher factors of safety (2.0) may be required.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. How far should foundations extend beyond the wall face?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Foundation width should be sufficient to provide adequate bearing capacity and prevent
              overturning. Typically, foundations extend 1/3 to 1/2 of the wall height beyond the
              heel. For cantilever walls, the foundation is usually 0.6-0.7 times the wall height.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. What spacing should be used for weep holes?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Weep holes should be spaced at 1-2 meter intervals horizontally and vertically. Use
              75-100mm diameter holes with gravel backfill. Install continuous drain pipes behind
              the wall for better drainage effectiveness.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. Can retaining walls be built on sloping sites?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Yes, but sloping sites require special design considerations. The wall must be stepped
              or battered to follow the slope. Earth pressure calculations become more complex due
              to the inclined backfill. Always consult a geotechnical engineer for sloping sites.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. What permits are needed for retaining walls?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Most jurisdictions require building permits for walls over 1-2 meters high. Additional
              permits may be needed for walls near property lines, in environmentally sensitive
              areas, or in flood zones. Check local building codes and obtain necessary approvals.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. How do I maintain a retaining wall?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Regular inspection for cracks, drainage issues, and settlement. Clean weep holes and
              drains annually. Monitor for vegetation growth and remove as needed. Repair any damage
              promptly to prevent progressive failure. Professional inspection every 3-5 years is
              recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Retaining Wall Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to design stable and cost-effective retaining wall structures.
          With accurate retaining wall calculations, you will ensure structural safety, optimize
          materials, and prevent soil failure. Perfect for civil engineers, geotechnical engineers,
          and construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Stability Analysis</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Structural Design</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Material Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Safety Compliance</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
