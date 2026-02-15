export const CARPET_AREA_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Carpet Area Calculation & Building Planning
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Carpet area is the actual usable floor space within a building, excluding walls, columns,
          and other structural elements. Understanding carpet area calculation is essential for
          accurate property valuation, interior planning, and compliance with building regulations.
          This comprehensive guide covers everything from basic measurement techniques to advanced
          planning considerations for residential and commercial buildings.
        </p>
      </div>

      {/* Why Carpet Area Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Carpet Area Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Property Valuation
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Carpet area determines the actual usable space for property pricing. Real estate
              valuations are based on carpet area, affecting property taxes, rental yields, and
              market value calculations.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Interior Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate carpet area ensures proper furniture placement, lighting design, and space
              utilization. It helps architects and interior designers create functional and
              comfortable living spaces.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Regulatory Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Building regulations often specify minimum carpet areas for different room types.
              Proper calculation ensures compliance with housing standards and safety requirements.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Cost Estimation
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Interior work, flooring, and furnishing costs are calculated based on carpet area.
              Accurate measurements prevent cost overruns and ensure proper budgeting for finishing
              works.
            </p>
          </div>
        </div>
      </div>

      {/* Area Types Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Understanding Different Area Types in Buildings
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Area Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Includes
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Excludes
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Carpet Area</td>
                <td className="px-4 py-3">Usable floor space inside rooms</td>
                <td className="px-4 py-3">Walls, columns, balconies, corridors</td>
                <td className="px-4 py-3">Furnishing, property valuation</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Built-up Area</td>
                <td className="px-4 py-3">Carpet area + walls + columns</td>
                <td className="px-4 py-3">Balconies, terraces, voids</td>
                <td className="px-4 py-3">Construction cost estimation</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Super Built-up Area</td>
                <td className="px-4 py-3">Built-up area + common areas</td>
                <td className="px-4 py-3">Open spaces, parking</td>
                <td className="px-4 py-3">Sale pricing, maintenance charges</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Plot Area</td>
                <td className="px-4 py-3">Total land area owned</td>
                <td className="px-4 py-3">Roads, setbacks, amenities</td>
                <td className="px-4 py-3">Land registration, taxes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Carpet Area Calculation Methods */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Carpet Area Calculation Methods & Standards
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Direct Measurement Method
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Measure the actual floor area within the room boundaries. This is the most accurate
              method for existing buildings or completed construction.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Room Area</strong> = Length × Width
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Measure between finished wall surfaces
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Total Carpet Area</strong> = Σ Room Areas
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Sum of all usable room areas
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Architectural Drawing Method
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Calculate from architectural drawings using scaled measurements. Account for wall
              thicknesses and construction details.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Standard Room Dimensions
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Use standard room sizes for planning purposes. Adjust based on local building codes
              and user requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Room-wise Carpet Area Standards */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Recommended Carpet Area Standards by Room Type
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">Living Areas</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Living Room:</strong> 120-200 sq ft (11-19 sq m) for 2-3 BHK, 200-300 sq ft
              (19-28 sq m) for larger homes.
              <br />
              <strong>Dining Room:</strong> 80-120 sq ft (7-11 sq m), often combined with living
              area.
              <br />
              <strong>Family Room:</strong> 150-250 sq ft (14-23 sq m) for entertainment and
              relaxation.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">Bedrooms</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Master Bedroom:</strong> 120-180 sq ft (11-17 sq m) with attached bathroom
              preferred.
              <br />
              <strong>Guest Bedroom:</strong> 100-140 sq ft (9-13 sq m) with basic amenities.
              <br />
              <strong>Children&apos;s Room:</strong> 80-120 sq ft (7-11 sq m) with study/play area.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">
              Kitchen & Utility Areas
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Modern Kitchen:</strong> 80-120 sq ft (7-11 sq m) with island counters and
              appliances.
              <br />
              <strong>Utility Area:</strong> 20-40 sq ft (2-4 sq m) for washing machines and
              storage.
              <br />
              <strong>Store Room:</strong> 20-30 sq ft (2-3 sq m) for household storage.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">Bathrooms & Toilets</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Master Bathroom:</strong> 40-60 sq ft (4-6 sq m) with bathtub/shower
              enclosure.
              <br />
              <strong>Common Bathroom:</strong> 25-40 sq ft (2-4 sq m) for guest/family use.
              <br />
              <strong>Powder Room:</strong> 15-25 sq ft (1-2 sq m) for quick freshening.
            </p>
          </div>
        </div>
      </div>

      {/* Building Planning Considerations */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Building Planning & Space Utilization
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Space Efficiency
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Maximize usable carpet area by minimizing corridors and optimizing room layouts.
                  Consider furniture placement and movement patterns during design phase.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Natural Light & Ventilation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Ensure adequate window area for natural light and cross-ventilation. Room
                  orientation affects comfort and reduces energy costs for artificial lighting and
                  cooling.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Future Flexibility
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Design spaces that can adapt to changing needs. Consider convertible rooms,
                  flexible partitions, and multi-purpose areas for long-term usability.
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
                  Accessibility Standards
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Ensure compliance with accessibility guidelines for differently-abled persons.
                  Include adequate circulation space and barrier-free design elements.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Storage Solutions
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Incorporate adequate storage space within carpet area calculations. Built-in
                  wardrobes, cabinets, and utility areas optimize space utilization.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Service Areas</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Plan for mechanical rooms, electrical panels, and service ducts. Ensure these
                  areas are accessible but don&apos;t reduce usable carpet area unnecessarily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Implications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Cost Implications of Carpet Area Planning
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Flooring Costs
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Carpeting, tiles, and hardwood flooring costs are directly proportional to carpet
                  area. Premium materials can significantly increase total interior costs.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Furnishing Budget
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Furniture, curtains, and decor costs scale with carpet area. Proper space planning
                  ensures optimal utilization of furnishing budgets.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Maintenance Costs
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Larger carpet areas require more cleaning, maintenance, and energy for lighting
                  and cooling. Consider long-term operational costs.
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
                  Property Taxes
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  In many regions, property taxes are calculated based on carpet area. Accurate
                  measurements ensure fair tax assessment.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Resale Value</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Well-planned carpet areas with optimal space utilization command higher resale
                  values. Efficient layouts are preferred by buyers.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Rental Income</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  For investment properties, carpet area determines rental potential. Efficient
                  space planning maximizes rental yields.
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
          Common Mistakes to Avoid in Carpet Area Planning
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Including Wall Thickness
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Wall thickness should not be included in carpet area calculations. Measure only the
              clear floor space between wall surfaces for accurate results.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Confusing Area Types
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Don&apos;t mix carpet area with built-up or super built-up area. Each has different
              purposes and calculation methods. Use the appropriate area type for your needs.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Circulation Space
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Corridors and circulation areas are not part of carpet area. Only enclosed room spaces
              count. Plan circulation separately to ensure comfortable movement.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Considering Furniture Layout
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Carpet area must accommodate furniture placement and movement. Consider door swings,
              drawer openings, and comfortable circulation space around furnishings.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Underestimating Service Areas
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Mechanical rooms, electrical panels, and service ducts need space but are not carpet
              area. Plan these areas carefully to avoid reducing usable space unnecessarily.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Building Codes
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Local building codes specify minimum carpet areas for different room types. Ensure
              your design meets regulatory requirements for safety and habitability.
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
          Frequently Asked Questions About Carpet Area
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between carpet area and built-up area?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Carpet area is the actual usable floor space inside rooms, excluding walls and
              columns. Built-up area includes the carpet area plus the thickness of walls and
              columns. Built-up area is used for construction cost estimation while carpet area is
              used for interior planning and property valuation.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. How is carpet area calculated for irregular shaped rooms?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For irregular rooms, divide the space into regular geometric shapes (rectangles,
              triangles, etc.) and calculate the area of each shape separately, then sum them up.
              Use the actual floor boundaries, excluding wall thicknesses. Computer-aided design
              software can help with complex calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. Does balcony area count as carpet area?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              No, balcony area is not included in carpet area calculations. Balconies are external
              spaces and are typically included in built-up area but not in carpet area. However,
              covered balconies or utility balconies may sometimes be considered depending on local
              building codes and intended use.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. How does carpet area affect property value?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Carpet area is the primary factor in determining property value and pricing. Real
              estate prices are quoted per square foot or square meter of carpet area. Larger carpet
              areas command higher prices, but efficient space utilization and layout also affect
              market value significantly.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. What is the minimum carpet area required for different rooms?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Standards vary by region and building codes. Generally: bedrooms 80-120 sq ft, living
              rooms 120-200 sq ft, kitchens 60-100 sq ft, bathrooms 20-40 sq ft. Always check local
              building regulations and consider lifestyle requirements. Accessibility standards may
              require larger spaces.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. How do you measure carpet area in existing buildings?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use a measuring tape to measure room dimensions from wall to wall at floor level.
              Measure length and width of each room and multiply to get area. For irregular rooms,
              use graph paper or measuring software. Account for any built-in furniture or fixtures
              that permanently reduce usable space.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. Why is accurate carpet area calculation important for builders?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate carpet area calculation ensures proper pricing, helps in obtaining building
              permits, ensures compliance with zoning laws, and provides transparency to buyers. It
              affects construction costs, material quantities, and overall project profitability.
              Incorrect calculations can lead to disputes and legal issues.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. How does carpet area affect interior design?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Carpet area determines furniture placement, lighting requirements, and overall space
              utilization. Interior designers use carpet area to create functional layouts, ensure
              proper traffic flow, and optimize space for comfort and aesthetics. It affects choices
              of furniture size, room proportions, and design elements.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Carpet Area Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to get precise carpet area measurements for your construction
          project. With accurate calculations, you will ensure proper space planning, optimize room
          layouts, and meet building code requirements. Perfect for architects, contractors,
          interior designers, and property owners.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Room-by-Room Calculation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Wall Thickness Adjustments</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Deduction Support</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Units</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
