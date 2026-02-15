export const PLASTER_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Plaster Calculation & Wall Finishing
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Plaster is the foundation of beautiful, durable wall finishes used in construction for
          centuries. Understanding how to accurately calculate plaster volumes, mix ratios, and
          material requirements is crucial for contractors, masons, architects, and builders. This
          comprehensive guide covers everything from basic volume calculations to advanced
          plastering techniques, ensuring smooth, crack-free finishes with optimal strength and
          minimal waste.
        </p>
      </div>

      {/* Why Accurate Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Plaster Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Cost Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Plaster costs account for 40-50% of interior finishing budgets. Precise calculations
              prevent over-ordering (wasting 12-18% of material costs) and under-ordering (causing
              project delays and additional procurement costs).
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Surface Quality</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper plaster thickness and mix ratios ensure smooth, crack-free surfaces. Inadequate
              plastering leads to painting problems and reduces overall finish quality by 30-40%.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Structural Integrity
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Correct plaster thickness provides proper bonding and prevents moisture ingress. Poor
              calculations compromise wall strength and lead to costly repairs within 2-3 years.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Time Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate material planning ensures just-in-time delivery and reduces construction time
              by 15-20%. Proper sequencing prevents delays in subsequent finishing work.
            </p>
          </div>
        </div>
      </div>

      {/* Plaster Types Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Types of Plaster and Their Applications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Plaster Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Mix Ratio
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Thickness (mm)
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
                <td className="px-4 py-3 font-medium">Cement Plaster</td>
                <td className="px-4 py-3">1:4 to 1:6</td>
                <td className="px-4 py-3">12-20mm</td>
                <td className="px-4 py-3">Exterior walls, damp areas</td>
                <td className="px-4 py-3">Weather-resistant, durable</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Gypsum Plaster</td>
                <td className="px-4 py-3">1:2 to 1:3</td>
                <td className="px-4 py-3">10-15mm</td>
                <td className="px-4 py-3">Interior walls, ceilings</td>
                <td className="px-4 py-3">Smooth finish, fast setting</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Lime Plaster</td>
                <td className="px-4 py-3">1:3 to 1:4</td>
                <td className="px-4 py-3">15-25mm</td>
                <td className="px-4 py-3">Heritage buildings</td>
                <td className="px-4 py-3">Breathable, flexible</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Stucco</td>
                <td className="px-4 py-3">1:2:9</td>
                <td className="px-4 py-3">20-30mm</td>
                <td className="px-4 py-3">Decorative exteriors</td>
                <td className="px-4 py-3">Textured finish, artistic</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">POP (Plaster of Paris)</td>
                <td className="px-4 py-3">Pure powder</td>
                <td className="px-4 py-3">6-10mm</td>
                <td className="px-4 py-3">Ceiling work, ornaments</td>
                <td className="px-4 py-3">Ultra-smooth, fast setting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Thickness Guide and Calculation */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
            3
          </span>
          Plaster Thickness Guide and Volume Calculations
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              📐 Standard Thickness
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Formula: Volume = Area × Thickness</strong>
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Internal walls: 12-15mm</li>
              <li>• External walls: 18-20mm</li>
              <li>• Ceilings: 8-10mm</li>
              <li>• Rough surfaces: +5mm extra</li>
            </ul>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">⚡ Mix Ratios</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Different applications require specific mix ratios for optimal performance.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Undercoat: 1:4 (weaker mix)</li>
              <li>• Finish coat: 1:3 (stronger mix)</li>
              <li>• Damp areas: 1:3 (waterproof)</li>
              <li>• Quick setting: Add retarders</li>
            </ul>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              🔧 Material Quantities
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              For 1 m³ of plaster volume at 1:4 mix ratio.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Cement: 3.5-4 bags (50kg each)</li>
              <li>• Sand: 0.35-0.4 m³</li>
              <li>• Water: 150-200 liters</li>
              <li>• Additives: As per requirements</li>
            </ul>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              📏 Wastage Factors
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Account for material losses during mixing and application.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Cement: 2-3% wastage</li>
              <li>• Sand: 5-8% wastage</li>
              <li>• Water: 10-15% evaporation</li>
              <li>• Total volume: 5-10% extra</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Plastering Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
            4
          </span>
          Professional Plastering Best Practices
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Surface Preparation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Clean brickwork thoroughly, remove loose particles, and dampen surfaces before
                  plastering. Proper preparation improves bonding strength by 40-50%.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Use Correct Water Ratio
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Maintain water-cement ratio of 0.45-0.55. Too much water causes shrinkage cracks.
                  Too little makes plaster unworkable. Test consistency with ball test method.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Apply in Layers
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Apply undercoat first, then finish coat. Allow 4-7 days curing between layers.
                  Multi-layer application ensures better bonding and reduces cracking by 60-70%.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                4
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Control Joints Properly
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use expansion joints every 6-8 meters and at structural changes. Control joints
                  prevent random cracking and ensure long-term durability of plaster finish.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Cure Properly</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Keep plaster damp for 7-10 days after application. Proper curing increases
                  strength by 50% and prevents shrinkage cracks. Use wet gunny bags or curing
                  compounds.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Monitor Environmental Conditions
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Plaster in 20-25°C with moderate humidity. Avoid direct sunlight and strong winds
                  during application and curing. Extreme conditions reduce quality by 30-40%.
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
            5
          </span>
          Common Plastering Mistakes to Avoid
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Incorrect Water Addition
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Adding water on site after mixing weakens plaster by 30-40%. Always mix with correct
              water ratio initially. Poor consistency causes cracking and reduced bonding strength.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Skipping Dampening
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Applying plaster on dry brickwork causes rapid water absorption, weakening the bond by
              50%. Always pre-wet surfaces 2-4 hours before plastering for proper adhesion.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Wrong Thickness Application
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Applying plaster thicker than required wastes 20-30% material and increases cracking
              risk. Follow standard thickness guidelines and apply in controlled layers.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Surface Preparation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Loose mortar, dust, and oil stains prevent proper bonding. Clean surfaces thoroughly
              and remove all contaminants. Preparation costs 5-10% but prevents 60% of plaster
              failures.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Curing
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Skipping the 7-day curing period reduces plaster strength by 40-50%. Keep surfaces
              moist continuously during curing. Premature drying causes shrinkage cracks.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Wrong Mix Ratio
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using wrong cement-sand ratio compromises strength and durability. Rich mixes (1:3)
              for exposed areas, lean mixes (1:6) for internal walls. Match ratio to application.
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
          Frequently Asked Questions (FAQs) About Plaster Calculation
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1: How much plaster do I need for 100 m² wall area?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For 12mm thick plaster: Volume = 100 × 0.012 = 1.2 m³. For 1:4 mix: Cement = 1.2/5 ×
              1.5 = 0.36 m³ (8-9 bags). Sand = 1.2/5 × 4.5 = 1.08 m³. Add 10% for wastage.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2: What is the standard plaster thickness?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Internal walls: 12-15mm (single coat). External walls: 18-20mm (double coat).
              Ceilings: 8-10mm. Rough brickwork requires additional 3-5mm thickness for proper
              coverage.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3: How many cement bags for 1 cubic meter plaster?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For 1:4 mix ratio: Cement required = (1.2 × 1)/5 = 0.24 m³ = 4.8 bags (50kg each). For
              1:5 mix: (1.2 × 1)/6 = 0.2 m³ = 4 bags. For 1:3 mix: (1.2 × 1)/4 = 0.3 m³ = 6 bags.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4: How long should plaster cure before painting?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Minimum 7 days for cement plaster, 3-4 days for gypsum plaster. Proper curing achieves
              80% of final strength. Painting before curing causes adhesion problems and finish
              defects.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5: What causes plaster cracks?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Shrinkage due to rapid drying, excessive water in mix, poor curing, structural
              movement, or thermal expansion. Prevent by proper mixing, curing, and using expansion
              joints.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6: Can I plaster over painted surfaces?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Not recommended. Paint prevents proper bonding and causes plaster to crack or fall
              off. Always remove old paint or use bonding agents. Surface preparation is critical
              for adhesion.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7: What is the cost of plastering per m²?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              In India (2024): Internal plastering costs ₹15-25 per m². External: ₹20-35 per m². In
              the US: $3-6 per sq ft. Costs vary by location, plaster type, and surface condition.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8: How do I calculate plaster for irregular surfaces?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Divide irregular surfaces into regular shapes, calculate area of each, then sum total.
              Add 15-20% extra for complex shapes and corners. For curved surfaces, use average
              radius.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-3">
          Start Your Plaster Calculation Now
        </h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to get precise plaster estimates for your wall finishing project.
          With accurate calculations, you will save money, reduce waste, and achieve smooth,
          crack-free plaster finishes. Perfect for contractors, masons, and construction
          professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Plaster Types</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Accurate Volume</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Mix Ratio Guide</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Professional Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
