export const ROAD_PAVEMENT_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Road Pavement Design & Construction
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Road pavement design is a critical aspect of civil engineering that determines the
          durability, safety, and cost-effectiveness of transportation infrastructure. Understanding
          how to design pavements that can withstand traffic loads, environmental conditions, and
          time is essential for engineers and project managers. This comprehensive guide covers
          everything from basic pavement types to advanced design methodologies, ensuring optimal
          performance and longevity for road infrastructure.
        </p>
      </div>

      {/* Why Accurate Pavement Design Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Road Pavement Design Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Traffic Safety
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper pavement design ensures smooth, skid-resistant surfaces that reduce accidents.
              Inadequate design leads to rutting, cracking, and poor drainage that compromise
              vehicle control and safety.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Long-term Cost Savings
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Well-designed pavements last 20-30 years, reducing maintenance and rehabilitation
              costs by 40-60%. Poor design requires frequent repairs and early reconstruction,
              increasing lifecycle costs significantly.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Environmental Impact
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Sustainable pavement design reduces material usage and construction impacts. Proper
              design minimizes noise, runoff, and greenhouse gas emissions from construction and
              maintenance activities.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Economic Development
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Quality road infrastructure supports commerce and economic growth. Well-designed
              pavements ensure reliable transportation networks that facilitate business development
              and community access.
            </p>
          </div>
        </div>
      </div>

      {/* Pavement Types & Applications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Pavement Types and Their Applications
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Pavement Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Structure
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Best For
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Typical Life (Years)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Flexible Pavement</td>
                <td className="px-4 py-3">Bituminous layers over granular base</td>
                <td className="px-4 py-3">High traffic, flexible foundation</td>
                <td className="px-4 py-3">15-25 years</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Rigid Pavement</td>
                <td className="px-4 py-3">Portland cement concrete</td>
                <td className="px-4 py-3">Heavy loads, high traffic</td>
                <td className="px-4 py-3">20-40 years</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Composite Pavement</td>
                <td className="px-4 py-3">Concrete base with asphalt surface</td>
                <td className="px-4 py-3">Heavy traffic, reflective cracking control</td>
                <td className="px-4 py-3">25-35 years</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Full-Depth Asphalt</td>
                <td className="px-4 py-3">All asphalt layers to subgrade</td>
                <td className="px-4 py-3">Low to medium traffic, cold climates</td>
                <td className="px-4 py-3">15-20 years</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Unbound Pavement</td>
                <td className="px-4 py-3">Aggregate layers only</td>
                <td className="px-4 py-3">Low traffic, temporary roads</td>
                <td className="px-4 py-3">5-10 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Traffic Load Analysis */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Traffic Load Analysis and Design Methods
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Equivalent Single Axle Load (ESAL)
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              ESAL converts mixed traffic to equivalent 18,000 lb (80 kN) single axle loads. This
              standardized approach allows comparison of different vehicle types and prediction of
              pavement performance over time.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>ESAL Factor</strong> = Load Equivalency × Axle Type
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Converts all loads to standard 80 kN equivalent
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              AASHTO Pavement Design Guide
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              The 1993 AASHTO Guide uses empirical relationships between traffic, pavement
              structure, and performance. It considers serviceability loss over time and provides
              reliable design thicknesses for various conditions.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Log W₁₈</strong> = Z_R × S₀ + 9.36 × log₁₀(N+1) - 0.20
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  AASHTO structural design equation
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>ΔPSI</strong> = Initial PSI - Terminal PSI
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Allowable serviceability loss (typically 1.5-2.0)
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Mechanistic-Empirical Design
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Modern design methods combine mechanical analysis of stresses and strains with
              empirical performance models. This approach provides more accurate predictions for new
              materials and complex loading conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Material Specifications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Pavement Materials and Specifications
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">Hot Mix Asphalt (HMA)</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Composition:</strong> Aggregate, asphalt binder, air voids (3-5%).
              <br />
              <strong>Grades:</strong> PG 64-22 to PG 82-28 based on climate.
              <br />
              <strong>Testing:</strong> Marshall stability, flow, air voids, density.
              <br />
              <strong>Advantages:</strong> Smooth surface, waterproof, recyclable.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">
              Portland Cement Concrete (PCC)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Strength:</strong> 4,000-6,000 psi (28-day compressive).
              <br />
              <strong>Slump:</strong> 3-6 inches for pavement applications.
              <br />
              <strong>Reinforcement:</strong> Jointed plain or reinforced depending on design.
              <br />
              <strong>Advantages:</strong> High strength, long life, low maintenance.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">Aggregate Base Course</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Gradation:</strong> Well-graded crushed stone or gravel.
              <br />
              <strong>Compaction:</strong> 95% of maximum dry density (AASHTO T-180).
              <br />
              <strong>Thickness:</strong> 6-12 inches depending on traffic and subgrade.
              <br />
              <strong>Purpose:</strong> Load distribution, drainage, frost protection.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">Subbase and Subgrade</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>CBR:</strong> Minimum 3-5% for subgrade, higher for subbase.
              <br />
              <strong>Moisture:</strong> Optimum moisture content for compaction.
              <br />
              <strong>Stabilization:</strong> Lime, cement, or geogrids for weak soils.
              <br />
              <strong>Importance:</strong> Provides stable foundation, prevents settlement.
            </p>
          </div>
        </div>
      </div>

      {/* Construction Quality Control */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Construction Quality Control and Testing
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Density Testing
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Nuclear density gauges or sand cone method to verify compaction. Target 95-100% of
                  maximum dry density. Critical for pavement strength and longevity.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Asphalt Content Testing
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Ignition oven or solvent extraction to verify asphalt binder content. Must meet
                  mix design specifications (±0.3% tolerance allowed).
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Surface Smoothness
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Profilograph testing for International Roughness Index (IRI). Target IRI less than
                  1.5 m/km for high-speed roads, 2.0 m/km for local roads.
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
                  Thickness Verification
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Ground penetrating radar or core samples to verify layer thicknesses. Must meet
                  design specifications within ±10mm tolerance.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Concrete Strength Testing
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Cylinder breaks at 7, 14, and 28 days. Target compressive strength must be
                  achieved. Flexural strength critical for rigid pavements.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Air Void Content
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Asphalt pavements require 3-5% air voids for durability. Too low causes rutting,
                  too high causes raveling. Core samples tested per ASTM standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental & Sustainability */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Environmental Considerations and Sustainable Practices
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Stormwater Management
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Permeable pavements and proper cross-slope design reduce runoff. Incorporate
                  bioswales and detention basins to prevent erosion and flooding.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Recycled Materials
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Reclaimed Asphalt Pavement (RAP) up to 30% in new mixes. Recycled concrete
                  aggregate for base courses. Reduces landfill waste and energy consumption.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Warm Mix Asphalt
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Produced at lower temperatures (100-140°C vs 160-180°C). Reduces energy
                  consumption by 20-30% and greenhouse gas emissions significantly.
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
                  Noise Reduction
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Open-graded friction courses and porous asphalt reduce traffic noise by 4-7 dB.
                  Important for urban areas and residential neighborhoods.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Life Cycle Assessment
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Consider total environmental impact from cradle to grave. Choose materials and
                  designs that minimize carbon footprint and resource consumption over the pavement
                  life.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Green Construction
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Dust control, erosion prevention, and wildlife protection during construction.
                  Minimize disturbance to natural habitats and water bodies.
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
          Common Mistakes to Avoid in Pavement Design
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Underestimating Traffic Growth
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using current traffic counts without considering 20-30 year growth leads to premature
              failure. Always use traffic projections and design for future conditions.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Subgrade Conditions
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Weak subgrade leads to settlement and cracking. Always perform soil tests and design
              appropriate foundation improvements. CBR values below 3 require stabilization.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Drainage Design
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Poor drainage causes moisture damage and reduces pavement life by 50%. Provide proper
              cross-slope, shoulders, and subsurface drainage systems.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Wrong Material Selection
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using rigid pavement for flexible foundations or vice versa leads to reflective
              cracking and poor performance. Match pavement type to soil conditions and traffic.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Insufficient Compaction
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Poor compaction reduces strength by 30-50%. Use proper equipment and verify density
              with testing. Compaction is critical for all pavement layers.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Missing Expansion Joints
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Rigid pavements need expansion joints every 20-30 meters to prevent thermal cracking.
              Without proper joints, pavements crack and spall due to temperature changes.
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
          Frequently Asked Questions About Pavement Design
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between flexible and rigid pavements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Flexible pavements are made of bituminous materials that distribute loads through
              grain-to-grain contact in the aggregate base. Rigid pavements are concrete slabs that
              distribute loads through slab action and beam theory. Flexible pavements perform
              better on poor subgrades while rigid pavements are better for heavy loads and long
              design lives.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. How do I determine the required pavement thickness?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use design methods like AASHTO 1993 or Mechanistic-Empirical Pavement Design Guide
              (MEPDG). Input factors include traffic volume (ESALs), subgrade strength (CBR or
              resilient modulus), reliability, and design life. Software tools like KENPAVE or
              AASHTOWare provide automated thickness calculations for different pavement types.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. What is the typical design life for different pavement types?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Asphalt pavements: 15-25 years, Jointed Plain Concrete Pavement (JPCP): 20-30 years,
              Jointed Reinforced Concrete Pavement (JRCP): 25-40 years, Continuously Reinforced
              Concrete Pavement (CRCP): 30-50 years. Design life depends on traffic, climate, and
              maintenance practices.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. How do I choose between asphalt and concrete pavements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Choose asphalt for: flexible foundations, lower initial cost, faster construction,
              easier maintenance. Choose concrete for: heavy traffic, high strength requirements,
              long design life, minimal maintenance. Consider local climate, available materials,
              and construction schedule. Life cycle cost analysis often favors concrete for
              high-volume roads.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. What is the minimum CBR value required for subgrade?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Minimum CBR of 3% is required for most pavement designs. Values below 3% require
              stabilization with lime, cement, or geogrids. For critical applications like airports
              or heavy industrial areas, minimum CBR of 5-10% may be required. Always perform field
              CBR tests to verify design assumptions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. How do climate conditions affect pavement design?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Cold climates require thicker pavements for frost action, while hot climates need
              heat-resistant materials. Freeze-thaw cycles cause significant damage, requiring
              proper drainage and frost protection. High rainfall areas need better drainage design.
              Climate affects material selection, joint spacing, and maintenance requirements.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. What quality control tests are essential during construction?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Density testing (nuclear or sand cone), thickness verification, asphalt content and
              gradation, air void content, surface smoothness (IRI), joint spacing and alignment,
              and concrete strength testing. All tests should follow ASTM or AASHTO standards with
              proper documentation and corrective actions for non-conforming results.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. How do I extend the life of existing pavements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Preventive maintenance: crack sealing, surface treatments, thin overlays. Major
              rehabilitation: mill and overlay, full-depth reclamation, reconstruction. Regular
              condition surveys and timely maintenance can extend pavement life by 10-15 years.
              Asset management systems help prioritize treatments based on condition and traffic.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Road Pavement Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to design durable and cost-effective road pavement structures.
          With accurate pavement calculations, you will ensure traffic capacity, optimize
          construction costs, and extend service life. Perfect for highway engineers, transportation
          planners, and construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Pavement Design</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Structural Analysis</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Material Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Traffic Loading</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
