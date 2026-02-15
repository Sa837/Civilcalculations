export const STONEMASONRY_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8 font-display">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Stone Masonry Construction & Calculation
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Stone masonry is one of the oldest and most durable construction techniques, used for
          thousands of years in building foundations, walls, and architectural elements.
          Understanding how to accurately calculate stone quantities, mortar requirements, and
          material costs is essential for masons, contractors, and construction professionals. This
          comprehensive guide covers everything from basic calculations to advanced stone masonry
          techniques, ensuring your projects are completed efficiently with optimal strength and
          minimal waste.
        </p>
      </div>

      {/* Why Accurate Stone Masonry Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="font-display text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white text-sm">
            1
          </span>
          Why Accurate Stone Masonry Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Material Cost Control
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Stone and mortar materials account for 60-70% of masonry costs. Precise calculations
              prevent over-ordering (wasting 8-12% of material budget) and under-ordering (causing
              project delays and additional delivery charges).
            </p>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Structural Stability
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper mortar mix ratios and accurate stone placement ensure structural integrity.
              Incorrect calculations can compromise wall strength and lead to costly repairs or
              reconstruction.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Project Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate calculations enable just-in-time material delivery, reduce storage
              requirements, and optimize labor allocation. Well-planned masonry work reduces
              construction time by 20-25%.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Environmental Sustainability
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Cement production generates significant CO₂ emissions. Reducing mortar waste through
              accurate calculations directly lowers your project's carbon footprint and
              environmental impact.
            </p>
          </div>
        </div>
      </div>

      {/* Stone Masonry Types and Applications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="font-display text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Stone Masonry Types and Their Applications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Masonry Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Stone Characteristics
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Mortar Ratio
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Applications
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Strength
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Rubble Masonry</td>
                <td className="px-4 py-3">Irregular shaped stones</td>
                <td className="px-4 py-3">1:6</td>
                <td className="px-4 py-3">Foundation walls, compound walls</td>
                <td className="px-4 py-3">3-5 MPa</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Ashlar Masonry</td>
                <td className="px-4 py-3">Dressed cut stones</td>
                <td className="px-4 py-3">1:4</td>
                <td className="px-4 py-3">Face work, arches, columns</td>
                <td className="px-4 py-3">7-10 MPa</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Coursed Rubble</td>
                <td className="px-4 py-3">Semi-dressed stones</td>
                <td className="px-4 py-3">1:5</td>
                <td className="px-4 py-3">Load-bearing walls</td>
                <td className="px-4 py-3">5-7 MPa</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Random Rubble</td>
                <td className="px-4 py-3">Undressed stones</td>
                <td className="px-4 py-3">1:6</td>
                <td className="px-4 py-3">Non-structural walls</td>
                <td className="px-4 py-3">3-4 MPa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mortar Mix Ratios and Properties */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="font-display text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
            3
          </span>
          Mortar Mix Ratios and Their Properties
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              🥄 CM 1:3 (Rich Mix)
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Applications:</strong> Critical structures, arches, load-bearing walls
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <strong>Properties:</strong> High strength, excellent bonding, water-resistant
            </p>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              🥄 CM 1:4 (Standard)
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Applications:</strong> General construction, face work, columns
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <strong>Properties:</strong> Good strength, workable, cost-effective
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              🥄 CM 1:5 (Economy)
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Applications:</strong> Non-structural walls, partitions, infill
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <strong>Properties:</strong> Moderate strength, economical, good workability
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              🥄 CM 1:6 (Lean Mix)
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Applications:</strong> Foundation backing, core walls, temporary structures
            </p>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <strong>Properties:</strong> Low strength, highly economical, minimal shrinkage
            </p>
          </div>
        </div>
      </div>

      {/* Stone Masonry Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="font-display text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
            4
          </span>
          Stone Masonry Construction Best Practices
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
              ✅ Stone Selection and Preparation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Select hard, durable stones free from cracks. Clean stones thoroughly to remove dust
              and loose particles. Soak stones in water before use to prevent rapid moisture
              absorption from fresh mortar.
            </p>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h5 className="font-semibold text-green-800 dark:text-green-200 mb-1">
              ✅ Mortar Mixing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Use clean water and quality materials. Mix mortar thoroughly to achieve uniform
              consistency. Use mortar within 30-45 minutes of mixing. Maintain water-cement ratio
              between 0.45-0.55 for optimal strength.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              ✅ Bonding and Curing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Ensure proper bond between stones and mortar. Fill all joints completely. Cure masonry
              for minimum 7-10 days. Keep walls moist during curing to prevent mortar cracking.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
              ✅ Joint Thickness and Pattern
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Maintain uniform joint thickness of 12-20mm. Use proper bonding patterns (stretcher,
              header, English). Provide through-stones for longitudinal bonding every 4-6 courses.
            </p>
          </div>
          <div className="rounded-lg bg-rose-50/50 p-4 dark:bg-rose-900/20 border border-rose-200/30 dark:border-rose-700/30">
            <h5 className="font-semibold text-rose-800 dark:text-rose-200 mb-1">
              ✅ Weather Protection
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Protect fresh masonry from direct sunlight, rain, and wind. Use curing compounds in
              hot weather. Provide temporary covers during construction to prevent mortar washout.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-50/50 p-4 dark:bg-cyan-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
            <h5 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-1">
              ✅ Quality Control
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Test stone strength and mortar mix proportions. Verify plumb and level regularly.
              Maintain proper wall thickness and verticality. Document all construction stages for
              quality assurance.
            </p>
          </div>
        </div>
      </div>

      {/* Common Mistakes to Avoid */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="font-display text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm">
            5
          </span>
          Common Mistakes to Avoid in Stone Masonry
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Incorrect Mortar Mix Ratio
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using wrong cement-sand ratio reduces strength by 30-50%. Always follow specified mix
              proportions. Use measuring boxes for accurate proportioning. Adjust for weather
              conditions appropriately.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Stone Preparation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Not cleaning stones reduces bonding strength by 40%. Dust and loose particles prevent
              proper mortar adhesion. Always wash and dry stones before placement.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Curing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Insufficient curing reduces mortar strength by 35-45%. Maintain moisture for minimum 7
              days. Use wet gunny bags or curing compounds. Protect from rapid drying.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Improper Joint Filling
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Hollow joints reduce structural capacity by 25%. Fill all joints completely. Use
              proper tools for joint finishing. Ensure no voids or gaps remain.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Weather Conditions
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Working in extreme weather affects quality by 30%. Avoid construction in heavy rain or
              extreme heat. Use protective measures when necessary. Adjust mortar mix for weather
              conditions.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Bonding Pattern
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Incorrect bonding reduces wall stability by 40%. Follow proper bonding patterns.
              Provide through-stones regularly. Maintain proper overlap between courses.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="font-display text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            6
          </span>
          Frequently Asked Questions (FAQs) About Stone Masonry
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1: How much mortar is needed for stone masonry?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For stone masonry, mortar requirement is typically 30-40% of stone volume. This
              calculator uses standard factors: wet volume × 1.27 for dry volume, then applies 1:6
              cement-sand ratio. Actual needs vary based on stone size and joint thickness.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2: What is the difference between rubble and ashlar masonry?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Rubble masonry uses irregular, undressed stones with thick joints (20-30mm), suitable
              for foundations and non-structural walls. Ashlar masonry uses dressed, cut stones with
              thin joints (10-15mm), ideal for face work and architectural elements requiring
              precision.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3: How do I calculate stone masonry for curved walls?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For curved walls, calculate along the centerline length. Use average radius formula:
              Length = 2πr × (angle/360). Add 5-10% extra for wastage and cutting losses. Consider
              joint thickness increases in curved sections.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4: What cement grade is best for stone masonry?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              OPC 43 grade cement is standard for most stone masonry work. For critical structures
              or marine environments, use OPC 53 or PPC. Ensure cement is fresh (within 90 days of
              manufacture) and properly stored.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5: How long should stone masonry cure?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Minimum 7 days for normal mortar, 10 days for rich mixes (1:3, 1:4). Proper curing
              achieves 90% of design strength. Keep walls moist and protected from direct sunlight
              during curing period.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6: What is the standard thickness of stone walls?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Non-structural walls: 200-300mm. Load-bearing walls: 300-450mm. Foundation walls:
              450-600mm. Thickness depends on height, load requirements, and stone type. Use local
              building codes as reference.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7: How do I prevent mortar cracks in stone masonry?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use proper water-cement ratio (0.45-0.55). Provide expansion joints every 6-8 meters.
              Cure properly and gradually. Use lime-based mortar for better flexibility in large
              structures.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8: What sand is best for stone masonry mortar?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use clean, coarse river sand with fineness modulus 2.6-3.0. Avoid sea sand due to salt
              content. Remove organic matter and clay particles. Sand should pass through 4.75mm
              sieve.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q9: How much wastage should I consider for stone masonry?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Consider 10-15% wastage for stone and 5-8% for mortar. Higher wastage (15-20%) for
              dressed stones or complex patterns. Include breakage during transportation and
              handling losses.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q10: When can I apply plaster on stone masonry?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Wait minimum 7-10 days after wall completion. Ensure masonry is fully cured and
              surface is prepared. Apply plaster in 2-3 coats with proper curing between coats for
              best results.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="font-display text-xl font-bold mb-3">
          Start Your Stone Masonry Calculation Now
        </h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to get precise material estimates for your stone masonry project.
          With accurate calculations, you will save money, reduce waste, and ensure your
          construction meets the highest quality standards. Perfect for masons, contractors,
          engineers, and construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Masonry Types</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Accurate Mortar Calculations</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Professional Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Industry Standards</span>
        </div>
      </div>
    </div>
  )
}
