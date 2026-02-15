export const TILES_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Tile Calculation & Installation
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Tiles are durable, versatile surface coverings used for floors, walls, and countertops in
          both residential and commercial spaces. Understanding how to accurately calculate tile
          quantities, account for wastage, and plan installations is crucial for contractors,
          builders, and homeowners. This comprehensive guide covers everything from basic tile
          counting to advanced installation techniques, ensuring professional results with minimal
          waste and optimal aesthetics.
        </p>
      </div>

      {/* Why Accurate Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Tile Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Cost Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Tiles represent 60-70% of flooring/walling costs. Precise calculations prevent
              over-ordering (wasting 15-25% of material costs) and under-ordering (causing project
              delays and additional delivery charges). Include 5-15% wastage for cuts.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Pattern Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate counts ensure proper pattern layout and minimize cutting. Complex patterns
              require 20-30% extra tiles. Knowing exact quantities helps coordinate with suppliers
              and prevents installation delays.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Installation Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper material planning ensures continuous workflow and reduces labor costs by
              15-20%. Having all tiles ready prevents work stoppages and maintains installation
              quality throughout the project.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Waste Reduction
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Ceramic tiles have high embodied energy. Accurate calculations reduce waste by 20-40%,
              lowering environmental impact and disposal costs. Proper planning extends tile
              lifespan and reduces future replacement needs.
            </p>
          </div>
        </div>
      </div>

      {/* Tile Types Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Types of Tiles and Their Applications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Tile Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Best For
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Durability
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Maintenance
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Cost Range
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Ceramic Floor Tiles</td>
                <td className="px-4 py-3">Bathrooms, kitchens, entryways</td>
                <td className="px-4 py-3">High traffic, water-resistant</td>
                <td className="px-4 py-3">Easy to clean, grout sealing</td>
                <td className="px-4 py-3">₹50-200/sq ft</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Porcelain Tiles</td>
                <td className="px-4 py-3">High-traffic areas, exteriors</td>
                <td className="px-4 py-3">Very durable, frost-resistant</td>
                <td className="px-4 py-3">Low maintenance, stain-resistant</td>
                <td className="px-4 py-3">₹80-400/sq ft</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Vitrified Tiles</td>
                <td className="px-4 py-3">Commercial spaces, shopping malls</td>
                <td className="px-4 py-3">Extremely hard, abrasion-resistant</td>
                <td className="px-4 py-3">Very low maintenance</td>
                <td className="px-4 py-3">₹100-500/sq ft</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Natural Stone</td>
                <td className="px-4 py-3">Premium interiors, exteriors</td>
                <td className="px-4 py-3">Natural durability, unique</td>
                <td className="px-4 py-3">Requires sealing, higher maintenance</td>
                <td className="px-4 py-3">₹200-1000/sq ft</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Subway Tiles</td>
                <td className="px-4 py-3">Walls, backsplashes, accents</td>
                <td className="px-4 py-3">Good for walls, decorative</td>
                <td className="px-4 py-3">Easy to clean, grout maintenance</td>
                <td className="px-4 py-3">₹30-150/sq ft</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Installation and Calculation Guide */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
            3
          </span>
          Tile Installation and Calculation Guide
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              📐 Calculation Methods
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Formula: Tiles Needed = Area / Tile Area × (1 + Wastage)</strong>
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Square meters: Direct calculation</li>
              <li>• Linear feet: Convert to area first</li>
              <li>• Diagonal layouts: +15% extra tiles</li>
              <li>• Complex patterns: +20-30% extra</li>
            </ul>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              🔧 Wastage Factors
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Different installations require different wastage allowances.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Straight layout: 5-8% wastage</li>
              <li>• Diagonal pattern: 10-15% wastage</li>
              <li>• Complex shapes: 15-25% wastage</li>
              <li>• First-time installers: +10% extra</li>
            </ul>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              ⚖️ Material Requirements
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Essential materials for professional tile installation.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Adhesive: 3-5 kg/m² coverage</li>
              <li>• Grout: 0.5-1 kg/m² coverage</li>
              <li>• Tile spacers: 1-2mm thickness</li>
              <li>• Sealant: For joints and edges</li>
            </ul>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              🛠️ Installation Tools
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Professional tools ensure quality and efficiency.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Tile cutter: Manual or electric</li>
              <li>• Notched trowel: For adhesive</li>
              <li>• Rubber mallet: For setting tiles</li>
              <li>• Grout float: For finishing joints</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Tiling Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
            4
          </span>
          Professional Tiling Best Practices
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
                  Ensure substrate is clean, level, and structurally sound. Remove old flooring and
                  repair cracks. Proper preparation prevents 70% of tile installation problems.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Dry Layout First
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Arrange tiles without adhesive to check pattern and minimize cutting. Mark center
                  lines and work outward. This prevents layout errors that waste 15-20% of tiles.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Use Proper Adhesive
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Match adhesive to tile type and substrate. Use flexible adhesive for wood or
                  concrete movement. Apply with notched trowel for consistent 3-4mm thickness.
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
                  Maintain Even Joints
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use tile spacers for consistent 2-3mm grout joints. Check level every few tiles.
                  Uneven joints cause grout cracking and compromise waterproofing.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Grout Properly
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Apply grout 24-48 hours after tile setting. Use grout float at 45-degree angle.
                  Clean excess within 15-30 minutes. Seal grout after 72 hours for stain resistance.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Allow Curing Time
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Wait 24-72 hours before walking on tiles. Full cure takes 7-14 days. Premature use
                  causes tiles to shift and grout to crack, reducing lifespan by 30-50%.
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
          Common Tiling Mistakes to Avoid
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Insufficient Wastage Calculation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Running short of tiles mid-project costs 3-5 times more than buying extra initially.
              Always add 10-15% for cuts, breakages, and future repairs. Complex layouts need 20-30%
              extra.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Surface Preparation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Installing over uneven or dirty surfaces causes tiles to crack within months. Level
              substrate properly and remove all contaminants. Preparation prevents 80% of tile
              failures.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Wrong Adhesive for Application
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using standard adhesive on wet areas causes tiles to loosen. Use waterproof adhesive
              for bathrooms and flexible adhesive for wood substrates. Wrong adhesive fails within
              1-2 years.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Rushing the Installation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Walking on tiles before 24-hour cure causes lippage and adhesive failure. Full cure
              takes 7 days. Premature use reduces tile life by 40-60% and voids manufacturer
              warranties.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Grouting Technique
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Over-grouting or insufficient cleaning causes staining and cracking. Apply evenly and
              clean within 15 minutes. Poor grouting allows water penetration and mold growth.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Expansion Joints
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Large areas without movement joints crack from thermal expansion. Install joints every
              3-6 meters. Missing joints cause tiles to buckle and grout to crumble within 2-3
              years.
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
          Frequently Asked Questions (FAQs) About Tile Calculation
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For 12&quot;×12&quot; tiles: 100 sq ft ÷ 1 sq ft per tile = 100 tiles. Add 10% wastage
              = 110 tiles. For 24&quot;×24&quot; tiles: 100 ÷ 4 = 25 tiles + 10% = 28 tiles. Always
              round up to full boxes.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2: What is the standard wastage for tile installation?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Straight layouts: 5-8%. Diagonal patterns: 10-15%. Complex shapes: 15-25%. Bathroom
              installations: +10% for cuts around fixtures. Always add extra for future repairs.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3: How do I calculate tiles for diagonal layout?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Calculate straight layout first, then add 15-20% extra for diagonal cuts. For
              45-degree patterns, measure both diagonal and calculate triangular cuts. Use tile
              layout software for complex patterns.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4: How much adhesive and grout do I need?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Adhesive: 3-5 kg per m² for standard applications. Grout: 0.5-1 kg per m² depending on
              joint width. For large tiles (24"+), use 4-6 kg adhesive. Wet areas require waterproof
              versions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5: Can I walk on tiles after installation?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Wait 24 hours minimum before light foot traffic. Full cure takes 7 days for adhesive
              and 28 days for grout. Heavy furniture movement should wait 7-14 days. Premature
              loading causes tiles to shift.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6: How do I prevent tile cracking?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Ensure substrate is level and stable. Use flexible adhesive. Install movement joints
              every 3-6 meters. Allow proper curing time. Cracks usually indicate substrate movement
              or installation errors.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7: What is the cost of tiling per sq ft?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              In India (2024): Ceramic tiles cost ₹50-150/sq ft. Porcelain: ₹80-300/sq ft. Labor:
              ₹30-70/sq ft. Total installed cost: ₹150-500/sq ft depending on tile quality and
              complexity.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8: How do I calculate tiles for irregular shaped rooms?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Divide irregular room into rectangles and triangles. Calculate area of each section
              separately, then sum totals. Add 20-30% extra for irregular shapes. Use graph paper
              for complex layouts before ordering.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-3">
          Start Your Tile Calculation Now
        </h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to get precise tile estimates for your flooring or wall project.
          With accurate calculations, you will save money, reduce waste, and achieve professional
          tile installations. Perfect for contractors, tilers, and homeowners.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Tile Types</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Wastage Calculator</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Pattern Planning</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Professional Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
