import React from 'react'

export const CONCRETE_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8 font-display">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Concrete Calculation & Construction
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Concrete is the world&apos;s most widely used construction material, forming the backbone
          of modern infrastructure. Understanding how to accurately calculate concrete quantities,
          mix ratios, and material requirements is essential for contractors, civil engineers,
          architects, and construction professionals. This comprehensive guide covers everything
          from basic volume calculations to advanced concrete technology, ensuring your projects are
          completed efficiently with optimal strength and minimal waste.
        </p>
      </div>

      {/* Why Accurate Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Concrete Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Cost Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Concrete accounts for 65-75% of total construction costs. Precise calculations prevent
              over-ordering (which wastes 8-12% of material costs) and under-ordering (causing
              project delays and additional delivery charges).
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Structural Integrity
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper mix ratios and accurate quantities ensure concrete achieves design strength.
              Incorrect calculations can compromise structural safety and lead to costly repairs or
              reconstruction.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Project Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate calculations enable just-in-time delivery, reduce storage requirements, and
              optimize labor allocation. Well-planned concrete pours reduce construction time by
              20-30%.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Environmental Impact
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Cement production generates 8-10% of global CO₂ emissions. Reducing concrete waste
              through accurate calculations directly lowers your project&apos;s carbon footprint and
              environmental impact.
            </p>
          </div>
        </div>
      </div>

      {/* Concrete Mix Types */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Concrete Mix Types and Their Applications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Grade
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Mix Ratio (C:S:A)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Strength (MPa)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Applications
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Setting Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">M5</td>
                <td className="px-4 py-3">1:5:10</td>
                <td className="px-4 py-3">5 MPa</td>
                <td className="px-4 py-3">Non-structural, foundation beds</td>
                <td className="px-4 py-3">45-60 min</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">M7.5</td>
                <td className="px-4 py-3">1:4:8</td>
                <td className="px-4 py-3">7.5 MPa</td>
                <td className="px-4 py-3">Foundation, floor base</td>
                <td className="px-4 py-3">40-55 min</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">M10</td>
                <td className="px-4 py-3">1:3:6</td>
                <td className="px-4 py-3">10 MPa</td>
                <td className="px-4 py-3">Non-structural walls, pathways</td>
                <td className="px-4 py-3">40-50 min</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">M15</td>
                <td className="px-4 py-3">1:2:4</td>
                <td className="px-4 py-3">15 MPa</td>
                <td className="px-4 py-3">Beams, slabs, columns</td>
                <td className="px-4 py-3">35-45 min</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">M20</td>
                <td className="px-4 py-3">1:1.5:3</td>
                <td className="px-4 py-3">20 MPa</td>
                <td className="px-4 py-3">RCC structures, foundations</td>
                <td className="px-4 py-3">30-40 min</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">M25</td>
                <td className="px-4 py-3">1:1:2</td>
                <td className="px-4 py-3">25 MPa</td>
                <td className="px-4 py-3">Heavy RCC, prestressed</td>
                <td className="px-4 py-3">25-35 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Structural Elements Guide */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
            3
          </span>
          Structural Elements and Volume Calculations
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🏛️ Columns</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Volume = π × r² × h</strong> (circular) or <strong>l × b × h</strong>{' '}
              (rectangular)
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Standard sizes: 230×300mm, 300×450mm, 450×600mm. Include 5% extra for lap length and
              concrete cover.
            </p>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🏗️ Footings</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Volume = L × B × D</strong> (isolated) or trapezoidal formula for stepped
              footings
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Minimum depth: 150mm below ground level. Include 10% extra for soil displacement and
              uneven base.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🪜 Stairs</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Volume = (Riser × Tread × Width × Steps) + Landing Volume</strong>
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Standard riser: 150mm, tread: 250mm. Include 5% extra for wastage during formwork
              removal.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">📐 Beams</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Volume = Length × Width × Depth</strong>
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Standard depth: L/12 to L/16. Include 3% extra for camber and formwork variations.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
            4
          </span>
          Concrete Construction Best Practices
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
              ✅ Proper Mix Design
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Follow IS 10262:2019 for mix design. Consider exposure conditions, aggregate size, and
              admixtures for optimal performance.
            </p>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h5 className="font-semibold text-green-800 dark:text-green-200 mb-1">
              ✅ Quality Materials
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Use cement within 90 days of manufacture. Store aggregates separately to avoid
              contamination. Test water quality regularly.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              ✅ Proper Curing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Cure for minimum 7 days (14 days for high-strength concrete). Maintain temperature
              above 5°C and keep surface moist continuously.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
              ✅ Formwork Preparation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Clean formwork thoroughly, apply release agents, check alignment and dimensions.
              Ensure tight joints to prevent cement leakage.
            </p>
          </div>
          <div className="rounded-lg bg-rose-50/50 p-4 dark:bg-rose-900/20 border border-rose-200/30 dark:border-rose-700/30">
            <h5 className="font-semibold text-rose-800 dark:text-rose-200 mb-1">
              ✅ Proper Compaction
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Use mechanical vibrators for dense concrete. Avoid over-vibration which causes
              segregation. Ensure proper compaction around reinforcement.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-50/50 p-4 dark:bg-cyan-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
            <h5 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-1">
              ✅ Temperature Control
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Pour concrete at 20-30°C. In hot weather, use ice water or retarders. In cold weather,
              use heated water or accelerating admixtures.
            </p>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm">
            5
          </span>
          Common Mistakes to Avoid in Concrete Work
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Incorrect Water-Cement Ratio
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Too much water reduces strength by 30-50%. Maintain w/c ratio between 0.45-0.55 for
              normal concrete. Use plasticizers if workability is needed.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Curing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Skipping curing reduces strength by 40-50%. Concrete gains only 60% strength in 7 days
              without proper curing.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Aggregate Quality
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Contaminated or weak aggregates compromise concrete strength. Use well-graded, clean
              aggregates with proper testing.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Insufficient Compaction
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Honeycombing and voids reduce structural capacity. Proper vibration is essential for
              dense, homogeneous concrete.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Adding Water on Site
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Adding water to improve workability severely reduces strength. Use admixtures instead
              of water for workability adjustments.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Reinforcement Cover
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Inadequate cover leads to corrosion and spalling. Maintain minimum cover: 20mm for
              slabs, 40mm for foundations.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            6
          </span>
          Frequently Asked Questions (FAQs) About Concrete Calculation
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1: How much cement is needed for 1 cubic meter of concrete?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For M20 grade concrete (1:1.5:3 mix), you need approximately 7-8 bags of 50kg cement
              (350-400 kg) per m³. This varies based on the mix ratio: M15 requires 6-7 bags, M25
              needs 8-9 bags per m³.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2: What is the difference between nominal and design mix?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Nominal mix (M5-M20) uses standard proportions like 1:2:4. Design mix (M25+) is
              engineered based on material properties and requirements. Design mix provides better
              quality control and optimization for specific applications.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3: How do I calculate concrete for stairs?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Calculate volume of each step (riser × tread × width), multiply by number of steps,
              then add landing volume. Include 5% extra for wastage and formwork variations. This
              calculator automates stair calculations with precise formulas.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4: What is the standard slump for concrete?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Standard slump ranges: 25-50mm for foundations, 75-100mm for beams and columns,
              100-150mm for pumped concrete. Slump indicates workability - higher slump means more
              fluid concrete.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5: How long should concrete be cured?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Minimum 7 days for ordinary concrete, 14 days for high-strength concrete. Proper
              curing is essential as concrete gains only 60% strength in 7 days, 75% in 14 days, and
              90% in 28 days.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6: What is the density of concrete?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Normal weight concrete: 2400-2500 kg/m³. Lightweight concrete: 1600-2000 kg/m³.
              Heavyweight concrete (for radiation shielding): 3000-4000 kg/m³. Use 2400 kg/m³ for
              standard calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7: How much does concrete cost per cubic meter?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              In India (2024): M20 concrete costs ₹4,500-6,000 per m³ including materials and labor.
              In the US: $100-150 per cubic yard. Prices vary by grade, location, and market
              conditions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8: Can I use the same mix for all structural elements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              No. Foundations typically use M15-M20, columns and beams use M20-M25, slabs use
              M20-M25. Higher grades are used for precast elements and heavy loads. Match concrete
              grade to structural requirements.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q9: What is the 1.54 factor in concrete calculations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              The 1.54 factor converts wet concrete volume to dry material volume. When mixed with
              water, sand and aggregate fill voids and compact. This ensures you order enough dry
              materials for the required wet volume.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q10: When can I remove formwork from concrete?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Vertical formwork: 24-48 hours. Slab formwork (with props): 7-14 days. Beam formwork:
              14-21 days. Remove based on concrete strength development - faster in warm weather,
              slower in cold conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-3">
          Start Your Concrete Calculation Now
        </h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to get precise material estimates for your concrete project. With
          accurate calculations, you will save money, reduce waste, and ensure your construction
          meets the highest quality standards. Perfect for contractors, engineers, architects, and
          construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Structural Elements</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ All Concrete Grades</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Step-by-Step Calculations</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Material Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
