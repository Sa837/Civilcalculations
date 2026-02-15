export const PAINT_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Paint Calculation & Application
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Paint is a critical finishing material that protects surfaces, enhances aesthetics, and
          extends building lifespan. Understanding how to accurately calculate paint quantities,
          coverage rates, and application requirements is essential for contractors, painters,
          architects, and DIY enthusiasts. This comprehensive guide covers everything from basic
          coverage calculations to advanced painting techniques, ensuring professional results with
          minimal waste and optimal finish quality.
        </p>
      </div>

      {/* Why Accurate Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Paint Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Cost Control</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Over-ordering wastes 15-20% of paint costs while under-ordering causes delays and
              additional delivery charges. Precise calculations save 12-18% on total painting
              budgets by eliminating excess inventory and rush orders.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Project Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Knowing exact quantities helps schedule work phases, manage crew allocation, and
              coordinate material deliveries. Proper planning reduces painting time by 20-25% and
              ensures consistent quality across all surfaces.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Quality Assurance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Correct coverage ensures proper film thickness and protection. Inadequate coverage
              reduces durability by 40-50% and compromises weather resistance. Consistent coating
              thickness maintains color uniformity and finish quality.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Environmental Impact
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              VOC emissions from paints contribute to air pollution. Reducing waste through accurate
              calculations directly lowers environmental impact. Proper coverage minimizes future
              repainting needs and extends building lifespan by 2-3 times.
            </p>
          </div>
        </div>
      </div>

      {/* Paint Types Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Types of Paint and Their Applications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Paint Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Coverage (m²/L)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Best For
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Properties
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Drying Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Emulsion (Interior)</td>
                <td className="px-4 py-3">12-16 m²/L</td>
                <td className="px-4 py-3">Indoor walls, ceilings</td>
                <td className="px-4 py-3">Washable, low odor</td>
                <td className="px-4 py-3">2-4 hours</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Emulsion (Exterior)</td>
                <td className="px-4 py-3">8-12 m²/L</td>
                <td className="px-4 py-3">Outdoor walls, facades</td>
                <td className="px-4 py-3">Weather-resistant, flexible</td>
                <td className="px-4 py-3">4-6 hours</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Enamel (Gloss)</td>
                <td className="px-4 py-3">10-14 m²/L</td>
                <td className="px-4 py-3">Doors, trim, metal</td>
                <td className="px-4 py-3">Shiny finish, durable</td>
                <td className="px-4 py-3">6-8 hours</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Oil-Based</td>
                <td className="px-4 py-3">12-16 m²/L</td>
                <td className="px-4 py-3">Wood, metal surfaces</td>
                <td className="px-4 py-3">Deep penetration, waterproof</td>
                <td className="px-4 py-3">8-12 hours</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Primer</td>
                <td className="px-4 py-3">8-12 m²/L</td>
                <td className="px-4 py-3">New surfaces, stain blocking</td>
                <td className="px-4 py-3">Adhesion promoter, sealing</td>
                <td className="px-4 py-3">1-3 hours</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Texture Paint</td>
                <td className="px-4 py-3">4-8 m²/L</td>
                <td className="px-4 py-3">Accent walls, exteriors</td>
                <td className="px-4 py-3">Hides imperfections, 3D effect</td>
                <td className="px-4 py-3">2-6 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Coverage Calculation Guide */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
            3
          </span>
          Paint Coverage and Application Guide
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              🎨 Surface Types
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              <strong>Formula: Paint Needed = Area × Coats ÷ Coverage</strong>
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Smooth walls: 10-12 m²/L per coat</li>
              <li>• Rough/textured: 8-10 m²/L per coat</li>
              <li>• Previously painted: 12-14 m²/L per coat</li>
              <li>• New/porous: 8-10 m²/L per coat</li>
            </ul>
          </div>
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              🖌️ Application Methods
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Different tools affect coverage rates and finish quality.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Brush: 8-10 m²/hour, 10-12 m²/L</li>
              <li>• Roller: 15-20 m²/hour, 12-14 m²/L</li>
              <li>• Spray: 25-30 m²/hour, 8-10 m²/L</li>
              <li>• Airless spray: 35-40 m²/hour, 10-12 m²/L</li>
            </ul>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              🌡️ Environmental Factors
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Temperature and humidity affect drying and coverage.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Optimal temp: 20-25°C</li>
              <li>• Humidity: 40-60%</li>
              <li>• Cold weather: +10-15% more paint</li>
              <li>• High humidity: +5-8% more paint</li>
            </ul>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              🔄 Coats and Wastage
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80 mb-2">
              Multiple coats ensure durability and proper coverage.
            </p>
            <ul className="space-y-1 text-sm text-body/80 dark:text-body-dark/80">
              <li>• Primer: 1 coat, 8-12 m²/L</li>
              <li>• Base coat: 1-2 coats, 10-14 m²/L</li>
              <li>• Top coat: 1 coat, 12-16 m²/L</li>
              <li>• Wastage factor: 10-15% for edges</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Painting Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
            4
          </span>
          Professional Painting Best Practices
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
                  Clean surfaces thoroughly, remove loose paint, fill cracks, and sand smooth.
                  Proper preparation improves adhesion by 50% and reduces paint consumption by
                  15-20%.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Use Quality Materials
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use fresh paint within shelf life, quality brushes/rollers, and appropriate
                  thinners. Premium materials last 2-3 times longer and provide better coverage
                  efficiency.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Apply Primer First
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Always apply primer on new or porous surfaces. Primer seals pores, improves
                  topcoat adhesion, and reduces final paint consumption by 20-25%.
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
                  Maintain Wet Edge
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Work quickly to maintain a wet edge when painting large areas. Lap marks occur
                  when paint dries before blending, ruining the finish quality.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Apply Thin Coats
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Apply thin, even coats rather than thick ones. Thick coats take longer to dry, can
                  crack, and waste 15-20% more paint due to sagging and uneven coverage.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Allow Proper Drying
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Wait recommended drying time between coats (usually 4-6 hours). Rushing leads to
                  adhesion failure and reduces paint performance by 30-40%.
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
          Common Painting Mistakes to Avoid
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Skipping Surface Preparation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Poor preparation causes peeling within 6-12 months. Always clean, sand, and prime
              surfaces. Preparation costs 10-15% of total painting budget but prevents 50% of paint
              failures.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Painting in Wrong Conditions
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Temperature below 10°C or humidity above 80% causes poor adhesion and finish defects.
              Paint in 20-25°C with 40-60% humidity for optimal results and 30-40% longer life.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Wrong Paint for the Surface
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using interior paint outdoors reduces lifespan by 60-70%. Exterior paints crack in
              bathrooms due to high moisture. Match paint type to environmental conditions.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Applying Thick Coats
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Thick coats crack, sag, and waste paint. Apply 2-3 thin coats instead of one thick
              one. Thin coats provide better adhesion and reduce material waste by 15-20%.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Using Primer
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Skipping primer on new surfaces reduces paint life by 40-50%. Primer costs 20-30% of
              paint cost but extends finish life by 2-3 times.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Over-diluting Paint
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Excessive thinning reduces coverage by 30-40% and compromises durability. Follow
              manufacturer dilution ratios. Too much thinner causes cracking and poor adhesion.
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
          Frequently Asked Questions (FAQs) About Paint Calculation
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1: How many liters of paint do I need for 100 m²?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For standard emulsion paint at 12 m²/L coverage: 100 m² ÷ 12 m²/L = 8.33 L for one
              coat. For two coats: 16.67 L. Add 10-15% for wastage. Final calculation: ~19 L total.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2: What affects paint coverage?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Surface porosity, texture, color change, application method, and environmental
              conditions affect coverage. Smooth surfaces: 14-16 m²/L. Rough surfaces: 8-10 m²/L.
              Dark colors require 15-20% more paint than light colors.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3: How do I calculate paint for multiple coats?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Multiply area by number of coats, then divide by coverage rate. For 50 m² with 3 coats
              at 12 m²/L: (50 × 3) ÷ 12 = 12.5 L. Each subsequent coat typically requires 15-20%
              less paint due to better surface sealing.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4: What is the standard drying time for paint?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Touch dry: 1-2 hours. Recoat: 4-6 hours. Full cure: 7-14 days. Drying time doubles in
              cold (10°C) or humid (80%+) conditions. Rushing recoating causes adhesion failure.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5: How much paint wastage should I account for?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Standard wastage: 10-15% for brushes/rollers, 15-20% for spraying. Complex shapes add
              20-30% more. Always round up to whole cans to avoid running short mid-project.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6: Can I paint over any surface without primer?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              No. New plaster/Gypsum boards, stained surfaces, and glossy paints require primer.
              Primer improves adhesion by 60-80% and reduces topcoat consumption by 20-30%.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7: What is the cost of painting per m²?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              In India (2024): Interior painting costs ₹25-40 per m². Exterior: ₹35-60 per m². In
              the US: $2-4 per sq ft for materials only. Labor costs vary by location and paint
              type.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8: How do I calculate paint for textured walls?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Textured walls reduce coverage by 30-50% due to increased surface area. Use 6-8 m²/L
              instead of standard 12-14 m²/L. Test a small area first to determine actual coverage
              rate for accurate calculations.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-3">
          Start Your Paint Calculation Now
        </h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to get precise paint estimates for your project. With accurate
          calculations, you will save money, reduce waste, and achieve professional painting
          results. Perfect for contractors, painters, homeowners, and DIY enthusiasts.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Paint Types</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Accurate Coverage</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Professional Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
