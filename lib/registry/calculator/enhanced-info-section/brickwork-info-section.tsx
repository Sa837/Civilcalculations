export const BRICKWORK_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Brickwork Calculation & Masonry Construction
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Brickwork is the fundamental building technique used in construction for thousands of
          years. Understanding how to accurately calculate brick quantities, mortar requirements,
          and material costs is essential for contractors, civil engineers, architects, and DIY
          builders. This comprehensive guide covers everything from basic calculations to advanced
          masonry techniques, ensuring your construction projects are completed efficiently with
          minimal waste and maximum structural integrity.
        </p>
      </div>

      {/* Why Accurate Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Brickwork Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Cost Control</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Over-ordering wastes 10-15% of material costs, while under-ordering causes project
              delays and additional delivery charges. Accurate calculations save 8-12% on total
              masonry budgets.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Project Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Knowing exact quantities helps schedule deliveries, manage storage space, and
              coordinate labor efficiently. Proper planning reduces construction time by 15-20%.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Quality Assurance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Consistent mortar mix ratios and proper brick placement ensure structural strength.
              Standardized calculations maintain quality across all wall sections.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Environmental Impact
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Precise calculations minimize construction waste. Brick manufacturing produces 0.8-1.0
              kg CO₂ per brick—reducing waste directly lowers environmental impact.
            </p>
          </div>
        </div>
      </div>

      {/* Brick Types Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Types of Bricks and Their Applications
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Brick Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Dimensions (mm)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Best For
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Properties
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Standard Modular</td>
                <td className="px-4 py-3">190 × 90 × 90</td>
                <td className="px-4 py-3">General construction</td>
                <td className="px-4 py-3">Uniform size, easy to handle</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Traditional/Non-Modular</td>
                <td className="px-4 py-3">230 × 110 × 75</td>
                <td className="px-4 py-3">Traditional buildings</td>
                <td className="px-4 py-3">Varied sizes, rustic appearance</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Facing Bricks</td>
                <td className="px-4 py-3">215 × 102.5 × 65</td>
                <td className="px-4 py-3">Exterior walls</td>
                <td className="px-4 py-3">Aesthetic finish, weather-resistant</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Engineering Bricks</td>
                <td className="px-4 py-3">215 × 102.5 × 65</td>
                <td className="px-4 py-3">Structural work</td>
                <td className="px-4 py-3">High strength, low water absorption</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Concrete Bricks</td>
                <td className="px-4 py-3">200 × 100 × 100</td>
                <td className="px-4 py-3">Load-bearing walls</td>
                <td className="px-4 py-3">High compressive strength</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Fly Ash Bricks</td>
                <td className="px-4 py-3">230 × 110 × 75</td>
                <td className="px-4 py-3">Eco-friendly projects</td>
                <td className="px-4 py-3">Lightweight, thermal insulation</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Fire Bricks</td>
                <td className="px-4 py-3">230 × 115 × 75</td>
                <td className="px-4 py-3">Fireplaces, furnaces</td>
                <td className="px-4 py-3">High heat resistance</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Hollow Bricks</td>
                <td className="px-4 py-3">400 × 200 × 200</td>
                <td className="px-4 py-3">Non-load bearing</td>
                <td className="px-4 py-3">Lightweight, sound insulation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Wall Thickness Guide */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Wall Thickness Guide for Different Applications
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <span className="text-2xl">🧱</span>
            </div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              4-Inch Wall (Half Brick)
            </h4>
            <p className="text-xs text-body/70 dark:text-body-dark/70 mb-3">102-115mm thickness</p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Interior partitions</li>
              <li>• Non-load bearing walls</li>
              <li>• Cladding over RCC</li>
              <li>• Cost-effective option</li>
            </ul>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-5 dark:from-amber-900/30 dark:to-amber-800/30 border border-amber-200 dark:border-amber-700">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
              <span className="text-2xl">🏗️</span>
            </div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              9-Inch Wall (One Brick)
            </h4>
            <p className="text-xs text-body/70 dark:text-body-dark/70 mb-3">215-230mm thickness</p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Load-bearing walls</li>
              <li>• Exterior walls</li>
              <li>• Structural columns</li>
              <li>• Two-story buildings</li>
            </ul>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 p-5 dark:from-rose-900/30 dark:to-rose-800/30 border border-rose-200 dark:border-rose-700">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/10">
              <span className="text-2xl">🏢</span>
            </div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              13.5-Inch Wall (1.5 Brick)
            </h4>
            <p className="text-xs text-body/70 dark:text-body-dark/70 mb-3">330-345mm thickness</p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Heavy load-bearing</li>
              <li>• Multi-story buildings</li>
              <li>• Retaining walls</li>
              <li>• Foundation walls</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mortar Mix Ratios Detailed */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Complete Mortar Mix Ratio Guide
        </h3>
        <p className="text-body/80 dark:text-body-dark/80 mb-6">
          The mortar mix ratio determines the strength, durability, and workability of your
          brickwork. Understanding when to use each ratio is crucial for structural integrity and
          longevity.
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">
              1:6 Mix Ratio (Low Strength)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> Non-load bearing interior walls, garden walls, boundary
              walls, temporary structures.
              <br />
              <strong>Strength:</strong> 3-4 MPa compressive strength.
              <br />
              <strong>Cement needed:</strong> ~190 kg per m³ of mortar.
              <br />
              <strong>Best for:</strong> Cost-effective projects where high strength is not
              required.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">1:5 Mix Ratio (Standard)</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> General purpose masonry, standard exterior walls,
              single-story residential buildings.
              <br />
              <strong>Strength:</strong> 5-6 MPa compressive strength.
              <br />
              <strong>Cement needed:</strong> ~220 kg per m³ of mortar.
              <br />
              <strong>Best for:</strong> Most residential construction projects.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">
              1:4 Mix Ratio (High Strength)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> Load-bearing walls, structural columns, beams,
              multi-story buildings.
              <br />
              <strong>Strength:</strong> 7-8 MPa compressive strength.
              <br />
              <strong>Cement needed:</strong> ~270 kg per m³ of mortar.
              <br />
              <strong>Best for:</strong> Commercial buildings and structural elements.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">
              1:3 Mix Ratio (Very High Strength)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> Heavy load-bearing structures, foundation walls,
              retaining walls, high-rise buildings.
              <br />
              <strong>Strength:</strong> 10-12 MPa compressive strength.
              <br />
              <strong>Cement needed:</strong> ~340 kg per m³ of mortar.
              <br />
              <strong>Best for:</strong> Critical structural applications requiring maximum
              strength.
            </p>
          </div>
        </div>
      </div>

      {/* Calculation Methodology */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Understanding the Calculation Methodology
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              The Science Behind Brick Calculation
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Calculating brickwork requires understanding three fundamental principles: (1){' '}
              <strong>Gross Volume</strong> — the total space the wall occupies, (2){' '}
              <strong>Net Volume</strong> — the space actually filled by bricks and mortar after
              deducting openings, and (3) <strong>Unit Volume</strong> — the space each brick plus
              its surrounding mortar occupies.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h5 className="font-semibold text-heading dark:text-heading-dark mb-3">
              Key Formulas Explained
            </h5>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="font-mono text-xs bg-white dark:bg-slate-700 p-2 rounded">
                <strong>Wall Volume</strong> = L × H × T
              </div>
              <div className="text-xs text-body/70 dark:text-body-dark/70">
                Length × Height × Thickness in consistent units
              </div>
              <div className="font-mono text-xs bg-white dark:bg-slate-700 p-2 rounded">
                <strong>Brick + Mortar</strong> = (l+m) × (w+m) × (h+m)
              </div>
              <div className="text-xs text-body/70 dark:text-body-dark/70">
                Actual dimensions plus mortar thickness on all sides
              </div>
              <div className="font-mono text-xs bg-white dark:bg-slate-700 p-2 rounded">
                <strong>Brick Count</strong> = Net Volume ÷ Unit Volume
              </div>
              <div className="text-xs text-body/70 dark:text-body-dark/70">
                How many bricks fit in the net wall volume
              </div>
              <div className="font-mono text-xs bg-white dark:bg-slate-700 p-2 rounded">
                <strong>Mortar Volume</strong> = Net Wall - Brick Volume
              </div>
              <div className="text-xs text-body/70 dark:text-body-dark/70">
                Space between bricks filled with cement-sand mix
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Why We Include Wastage Factor
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Real-world construction always involves some material waste. Bricks break during
              transport (2-3%), cutting for openings creates waste (1-2%), and some bricks are
              rejected for quality issues (1-2%). A 5-10% wastage factor ensures you have enough
              materials without excessive over-ordering. For complex patterns or irregular shapes,
              consider 10-15% wastage.
            </p>
          </div>
        </div>
      </div>

      {/* Construction Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Professional Bricklaying Best Practices
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Soak Bricks Before Use
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Immerse bricks in water for 2-4 hours before laying. Dry bricks absorb water from
                  mortar too quickly, weakening the bond strength by up to 40%.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Use Gauge Rods
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Set up gauge rods at corners showing course heights. Standard brick + mortar
                  height is 75mm. This ensures level courses throughout the wall.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Maintain Consistent Joints
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Keep horizontal joints 10-12mm and vertical joints 10mm. Use joint spacers or a
                  wooden batten cut to mortar thickness for consistency.
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
                  Proper Bond Patterns
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use English bond for maximum strength in structural walls. Stretcher bond works
                  for half-brick walls. Flemish bond provides good aesthetics and strength.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Curing is Critical
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Keep masonry damp for 7 days after construction. Proper curing increases strength
                  by 50% and prevents cracks from shrinkage.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Check Alignment Frequently
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use spirit levels every 3-4 courses. Check both faces of the wall. A 1mm error per
                  course becomes 20mm in a 3-meter wall.
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
          Common Mistakes to Avoid in Brickwork
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Incorrect Mortar Consistency
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Too wet mortar causes bricks to float and weakens bond. Too dry mortar doesn&apos;t
              adhere properly. Aim for butter-like consistency that holds its shape.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Skipping DPC (Damp Proof Course)
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              A DPC at 150mm above ground level prevents rising damp. Without it, moisture damages
              walls and interior finishes. Use 20mm cement mortar or bitumen felt.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Bonding at Intersections
            </h5>
            <p className="text-sm text-body-70 dark:text-body-dark/70">
              Intersecting walls need proper bonding with quoin bricks. Metal ties every 4-6 courses
              strengthen junctions and prevent cracking.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Curing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Skipping the 7-day curing period reduces mortar strength by 40-50%. Keep walls covered
              with wet sacks and sprinkle water twice daily.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Wrong Mortar for the Job
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using 1:6 mix for load-bearing walls compromises structural safety. Match mortar
              strength to wall function and building height.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Thermal Expansion
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Walls over 12 meters need expansion joints every 8-10 meters. Without them,
              temperature changes cause cracking and structural damage.
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
          Frequently Asked Questions (FAQs) About Brickwork Calculation
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1: How many bricks are needed per square meter of wall?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For a standard half-brick wall (102mm thick) using 215×102.5×65mm bricks with 10mm
              joints, you need approximately 60 bricks per m². For a one-brick wall (215mm thick),
              you need approximately 120 bricks per m². Always add 5-10% for wastage.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2: How much cement and sand do I need for 1000 bricks?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For 1000 bricks using 1:5 mortar mix: you need approximately 210-230 kg of cement (4-5
              bags of 50kg) and 1.05-1.15 cubic meters of sand. For 1:4 mix, increase cement to
              260-280 kg and reduce sand to 0.9-1.0 cubic meters.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3: What is the standard mortar thickness for brickwork?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Standard mortar joint thickness is 10mm (3/8 inch) for both horizontal (bed) joints
              and vertical (perpend) joints. This provides adequate strength while allowing for
              minor brick size variations. For lightweight blocks, 8-12mm is common.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4: How do I calculate bricks for a wall with doors and windows?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Calculate the gross wall area (length × height), then subtract the area of all
              openings (door width × height, window width × height). Multiply net area by bricks per
              m² for your wall thickness. This calculator automates this process with precise volume
              calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5: Why is 33% added to mortar volume calculations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              The 1.33 factor (33% increase) converts wet mortar volume to dry material volume. When
              mixed with water, sand and cement compact and fill voids. This bulking factor ensures
              you order enough dry materials to produce the required wet mortar volume.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6: What is the difference between nominal and actual brick size?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Actual brick size is the physical dimension of the brick itself. Nominal size includes
              the mortar joint (typically +10mm on each dimension). For example, a 190×90×90mm
              actual brick has a 200×100×100mm nominal size with 10mm joints.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7: How many bricks are in 1 cubic meter?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For standard Indian modular bricks (190×90×90mm) with 10mm mortar: approximately 500
              bricks per m³ of brickwork. For traditional bricks (230×110×75mm): approximately
              350-400 bricks per m³. This varies based on mortar thickness and brick dimensions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8: What is the cost estimate for brick wall construction per m²?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              In India (2024): Half-brick wall costs ₹800-1200 per m², one-brick wall costs
              ₹1600-2200 per m² including materials and labor. In the US: $15-25 per sq ft for
              materials only. Prices vary by location, brick type, and mortar mix ratio used.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q9: Can I use the same mortar mix for all types of brickwork?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              No. Load-bearing walls need stronger mortar (1:4 or 1:3) than non-load bearing walls
              (1:6). Below-grade work needs 1:3 or 1:4 for moisture resistance. Always match mortar
              strength to structural requirements and exposure conditions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q10: How long should I wait before loading a new brick wall?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Allow 14-28 days for mortar to reach sufficient strength before applying heavy loads.
              Concrete block walls need 28 days minimum. Keep walls supported during this curing
              period and protect from vibration and impact.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Brickwork Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to get precise material estimates for your masonry project. With
          accurate calculations, you will save money, reduce waste, and ensure your construction
          meets the highest quality standards. Perfect for contractors, engineers, architects, and
          DIY enthusiasts.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Instant Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Step-by-Step Formulas</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Units</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Opening Deductions</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
