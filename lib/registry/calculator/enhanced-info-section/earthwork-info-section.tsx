export const EARTHWORK_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Earthwork Calculation & Excavation
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Earthwork calculations are fundamental to construction projects, involving the
          measurement, movement, and management of soil and earth materials. Understanding how to
          accurately calculate cut-and-fill volumes, soil quantities, and excavation requirements is
          essential for civil engineers, contractors, and project managers. This comprehensive guide
          covers everything from basic volume calculations to advanced earthwork techniques,
          ensuring efficient site preparation and optimal material management.
        </p>
      </div>

      {/* Why Accurate Earthwork Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Earthwork Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Cost Control</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate earthwork calculations prevent over-excavation and unnecessary fill material
              purchases. Proper quantity estimation can save 15-25% on earthwork costs by optimizing
              haul distances and material reuse.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Project Scheduling
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Precise volume calculations enable accurate equipment sizing and crew allocation. This
              ensures earthwork operations stay on schedule and don't become project bottlenecks.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Environmental Impact
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper earthwork planning minimizes soil erosion, sedimentation, and habitat
              disruption. Accurate calculations help balance cut and fill to reduce off-site
              disposal and import needs.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Safety & Stability
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Correct earthwork calculations ensure proper slope stability and foundation
              preparation. This prevents slope failures, foundation settlement, and safety hazards
              during construction.
            </p>
          </div>
        </div>
      </div>

      {/* Earthwork Types & Applications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Types of Earthwork and Their Applications
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Earthwork Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Methods
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Equipment Used
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Excavation</td>
                <td className="px-4 py-3">Foundation preparation, utility trenches</td>
                <td className="px-4 py-3">Open cut, trench excavation</td>
                <td className="px-4 py-3">Excavators, backhoes, trenchers</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Embankment</td>
                <td className="px-4 py-3">Road construction, levees</td>
                <td className="px-4 py-3">Layered fill placement</td>
                <td className="px-4 py-3">Dump trucks, compactors, graders</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Cut & Fill</td>
                <td className="px-4 py-3">Site grading, road construction</td>
                <td className="px-4 py-3">Balance excavation with fill</td>
                <td className="px-4 py-3">Scrapers, bulldozers, loaders</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Grading</td>
                <td className="px-4 py-3">Surface preparation, drainage</td>
                <td className="px-4 py-3">Slope creation, leveling</td>
                <td className="px-4 py-3">Motor graders, laser levels</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Borrow Pits</td>
                <td className="px-4 py-3">Fill material source</td>
                <td className="px-4 py-3">Controlled excavation</td>
                <td className="px-4 py-3">Excavators, haul trucks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Volume Calculation Methods */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Earthwork Volume Calculation Methods
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Average End Area Method
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              For linear projects like roads and canals: Volume = L × (A1 + A2)/2, where L is length
              and A1, A2 are end areas. This method provides accurate results for projects with
              gradual cross-section changes.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Volume</strong> = L × (A₁ + A₂) ÷ 2
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Length × average of end areas
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Prismoidal Formula
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              For higher accuracy: Volume = L × (A1 + 4Am + A2)/6, where Am is the mid-section area.
              This formula accounts for volume curvature and provides more precise calculations.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Volume</strong> = L × (A₁ + 4Aₘ + A₂) ÷ 6
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Includes mid-section for accuracy
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Shrinkage and Bulking Factors
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Excavated soil volume changes due to moisture content. Bulking factor (1.2-1.3)
              increases loose volume. Shrinkage factor (0.8-0.9) reduces compacted volume. Always
              apply appropriate factors for accurate material quantity estimation.
            </p>
          </div>
        </div>
      </div>

      {/* Soil Classification & Properties */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Soil Classification and Earthwork Properties
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">
              Granular Soils (Sand, Gravel)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Characteristics:</strong> Free-draining, stable slopes, easy to excavate and
              compact.
              <br />
              <strong>Bulking Factor:</strong> 1.1-1.3 (increases volume when excavated).
              <br />
              <strong>Equipment:</strong> Excavators, loaders, scrapers work efficiently.
              <br />
              <strong>Challenges:</strong> Dust control, slope stability in wet conditions.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">
              Cohesive Soils (Clay, Silt)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Characteristics:</strong> Plastic when wet, hard when dry, poor drainage.
              <br />
              <strong>Bulking Factor:</strong> 1.2-1.4 (significant volume increase).
              <br />
              <strong>Equipment:</strong> Requires heavier equipment, special handling when wet.
              <br />
              <strong>Challenges:</strong> Slope stability, equipment getting stuck, slow drying.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">
              Rock and Hard Materials
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Characteristics:</strong> High strength, requires blasting or special
              equipment.
              <br />
              <strong>Bulking Factor:</strong> 1.4-1.7 (maximum volume increase).
              <br />
              <strong>Equipment:</strong> Rock breakers, blasting, heavy excavators.
              <br />
              <strong>Challenges:</strong> Safety protocols, vibration control, disposal of
              oversized material.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">
              Organic Soils (Peat, Topsoil)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Characteristics:</strong> Compressible, high moisture content, low bearing
              capacity.
              <br />
              <strong>Bulking Factor:</strong> 1.3-1.6 (significant expansion).
              <br />
              <strong>Equipment:</strong> Careful handling to avoid contamination.
              <br />
              <strong>Challenges:</strong> Volume changes with moisture, environmental restrictions.
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Selection & Productivity */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Equipment Selection and Productivity Rates
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Excavators (0.5-5 m³ bucket)
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Productivity: 50-200 m³/hour depending on bucket size and material. Best for
                  digging trenches, foundations, and general excavation. Cycle time: 15-30 seconds.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Bulldozers (100-500 hp)
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Productivity: 500-2000 m³/hour for pushing. Excellent for grading, spreading fill,
                  and site preparation. Most efficient on slopes less than 30%.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Motor Graders</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Productivity: 1000-3000 m²/hour for fine grading. Essential for creating smooth,
                  accurate surfaces and maintaining proper drainage slopes.
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
                  Scrapers (15-45 m³ capacity)
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Productivity: 500-1500 m³/hour including haul. Most efficient for cut-and-fill
                  operations over distances of 300-1000 meters.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Dump Trucks (20-50 tonne)
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Capacity: 15-35 m³ payload. Critical for material transport. Cycle time depends on
                  haul distance and loading method.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Compactors</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Various types: smooth drum, padfoot, pneumatic. Essential for achieving proper
                  soil density and preventing settlement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Environmental Considerations */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Safety and Environmental Considerations
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Excavation Safety
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Follow OSHA guidelines for trench safety. Install protective systems for
                  excavations deeper than 5 feet. Regular inspection of shoring and sloping systems.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Slope Stability
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Design slopes based on soil type and groundwater conditions. Use geotechnical
                  analysis for slopes over 20 feet high. Monitor for signs of instability.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Erosion Control
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Implement silt fences, sediment basins, and temporary seeding. Control stormwater
                  runoff to prevent sedimentation of nearby water bodies.
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
                  Dust and Noise Control
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use water spraying for dust control. Implement noise barriers and operate
                  equipment during permitted hours. Monitor air quality regularly.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Hazardous Materials
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Test for contaminated soil before excavation. Follow proper disposal procedures
                  for hazardous materials. Obtain necessary permits for contaminated sites.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Equipment Safety
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Regular equipment maintenance and inspection. Proper training for operators.
                  Implement spotter systems for blind areas and traffic control.
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
          Common Mistakes to Avoid in Earthwork Calculations
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Shrinkage and Bulking
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Failing to account for volume changes during excavation and compaction leads to
              material shortages or excess. Always apply appropriate soil factors based on moisture
              content and compaction requirements.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inaccurate Surveying
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Poor quality surveying data leads to incorrect volume calculations. Use professional
              surveyors and verify measurements. Cross-check calculations with multiple methods.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Considering Equipment Limitations
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Selecting equipment without considering site access, soil conditions, and working
              space leads to inefficiencies. Match equipment to job requirements and site
              constraints.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Underestimating Weather Impact
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Rain can turn workable soil into unmanageable mud. Plan for weather delays and have
              contingency measures. Schedule critical earthwork during dry seasons when possible.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Sequencing of Operations
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Excavating without proper sequencing leads to unstable conditions and additional work.
              Plan the order of operations to maintain slope stability and efficient material
              movement.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Underground Utilities
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Damaging utilities during excavation causes costly repairs and safety hazards. Always
              locate and mark underground utilities before starting earthwork operations.
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
          Frequently Asked Questions About Earthwork
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. How do I calculate cut and fill volumes for a construction site?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use the grid method or contour method. Divide the site into a grid, calculate volumes
              for each cell using the average end area method, then sum all cells. For accuracy, use
              software like AutoCAD Civil 3D or manual calculation with cross-sections every 10-20
              meters.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. What is the difference between bank cubic meters and loose cubic meters?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Bank cubic meters (BCM) measure soil in its natural compacted state. Loose cubic
              meters (LCM) measure excavated soil after bulking. The relationship is LCM = BCM ×
              Bulking Factor (typically 1.2-1.4). Use LCM for haul calculations and BCM for payment
              based on excavated volume.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. How do I determine the right equipment for my earthwork project?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Consider soil type, volume, haul distance, and site constraints. For large volumes
              over short distances, use excavators and dump trucks. For long hauls, consider
              scrapers. Always calculate equipment productivity rates and compare costs. Rent vs.
              buy analysis is crucial for cost control.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. What are the typical soil bulking factors I should use?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Sand and gravel: 1.1-1.3, Clay: 1.2-1.4, Silt: 1.2-1.3, Rock: 1.4-1.7, Topsoil:
              1.2-1.5. Factors vary with moisture content. Test actual bulking on site for critical
              projects. Bulking increases hauling costs and disposal fees.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. How do I handle earthwork in rainy seasons?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Schedule critical earthwork during dry seasons. Use dewatering systems for
              excavations. Stockpile materials under cover. Apply erosion control measures
              immediately. Have contingency plans for weather delays. Consider weather as a major
              risk factor in scheduling.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. What permits do I need for earthwork operations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Check local building permits, grading permits, and environmental permits. Utility
              locates are mandatory. Stormwater permits may be required. Archaeological permits for
              historic sites. Always consult local authorities and obtain all necessary approvals
              before starting earthwork.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. How do I minimize earthwork costs?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Optimize cut-and-fill balance to minimize haul distances. Select appropriate equipment
              for the job. Schedule work during dry seasons. Use on-site materials when possible.
              Proper surveying prevents rework. Consider reuse of excavated materials for backfill
              and landscaping.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. What safety precautions are critical for earthwork?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Daily equipment inspections, proper training for operators, trench safety systems for
              deep excavations, traffic control for site access, dust control measures, and
              emergency response plans. Never work under unsupported slopes or in unstable
              conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Earthwork Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to determine precise earthwork quantities for your construction
          projects. With accurate earthwork calculations, you will optimize material handling,
          control costs, and ensure efficient site development. Perfect for civil engineers,
          contractors, and project planners.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cut & Fill Analysis</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Volume Calculations</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Estimation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Equipment Planning</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
