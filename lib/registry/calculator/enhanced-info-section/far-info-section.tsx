export const FAR_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Floor Area Ratio (FAR) & Zoning Regulations
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Floor Area Ratio (FAR) is a critical zoning parameter that determines the maximum
          allowable built-up area on a plot of land. Understanding FAR calculations and regulations
          is essential for developers, architects, and property owners to maximize land utilization
          while complying with urban planning laws. This comprehensive guide covers FAR concepts,
          calculations, regulatory frameworks, and strategic planning approaches for optimal
          development.
        </p>
      </div>

      {/* Why FAR Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Floor Area Ratio (FAR) Matters in Urban Development
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Regulatory Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              FAR limits prevent overcrowding and ensure sustainable urban development. Compliance
              with FAR regulations is mandatory for obtaining building permits and avoiding legal
              penalties.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Project Feasibility
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              FAR determines the maximum constructible area, directly affecting project costs,
              returns on investment, and economic viability. Higher FAR values allow more intensive
              development.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Infrastructure Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              FAR controls population density and infrastructure requirements. Proper FAR planning
              ensures adequate provision for utilities, transportation, and public services.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Property Value
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Higher permissible FAR can significantly increase land value and development
              potential. Understanding FAR utilization is crucial for maximizing property investment
              returns.
            </p>
          </div>
        </div>
      </div>

      {/* FAR Types & Classifications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Types of Floor Area Ratio and Zoning Classifications
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  FAR Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Typical Range
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Residential FAR</td>
                <td className="px-4 py-3">Housing, apartments, residential complexes</td>
                <td className="px-4 py-3">1.0 - 4.0</td>
                <td className="px-4 py-3">Apartments, villas, housing societies</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Commercial FAR</td>
                <td className="px-4 py-3">Offices, retail, commercial buildings</td>
                <td className="px-4 py-3">1.5 - 6.0</td>
                <td className="px-4 py-3">Office complexes, malls, hotels</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Industrial FAR</td>
                <td className="px-4 py-3">Manufacturing, warehouses, industrial facilities</td>
                <td className="px-4 py-3">0.5 - 2.0</td>
                <td className="px-4 py-3">Factories, industrial estates</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Mixed-Use FAR</td>
                <td className="px-4 py-3">Combined residential, commercial, and institutional</td>
                <td className="px-4 py-3">2.0 - 5.0</td>
                <td className="px-4 py-3">Integrated townships, smart cities</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Special Zone FAR</td>
                <td className="px-4 py-3">Special economic zones, technology parks</td>
                <td className="px-4 py-3">1.0 - 8.0</td>
                <td className="px-4 py-3">SEZs, IT parks, greenfield projects</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAR Calculation Methods */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Floor Area Ratio Calculation Methods & Formulas
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Basic FAR Formula
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              FAR is calculated as the ratio of total covered area on all floors to the plot area.
              It determines how much built-up area can be constructed relative to the land area.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>FAR</strong> = Total Floor Area ÷ Plot Area
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Basic formula for FAR calculation
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Maximum Built-up Area</strong> = FAR × Plot Area
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Permissible construction area
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Multi-Storey Building Calculation
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              For multi-storey buildings, sum the floor areas of all floors. Basement areas may or
              may not be included depending on local regulations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Effective FAR Utilization
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Consider setbacks, parking areas, and other exclusions that reduce effective FAR.
              Strategic planning can maximize actual utilization.
            </p>
          </div>
        </div>
      </div>

      {/* FAR Regulations by Country/Region */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          FAR Regulations and Standards by Region
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">
              Indian Cities FAR Standards
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Mumbai:</strong> Residential 1.33, Commercial 2.0-4.0, Island City 1.0-2.5.
              <br />
              <strong>Delhi:</strong> Residential 1.2-3.0, Commercial 1.5-4.0, Industrial 1.0-1.5.
              <br />
              <strong>Bangalore:</strong> Residential 1.75-3.25, Commercial 2.0-6.0, Institutional
              1.5.
              <br />
              <strong>Pune:</strong> Residential 1.0-2.5, Commercial 1.5-3.0, IT Parks up to 2.0.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">
              International FAR Standards
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>USA:</strong> Floor Area Ratio (FAR) ranges from 0.5 in low-density zones to
              15+ in high-density urban centers.
              <br />
              <strong>UK:</strong> Plot Ratio typically 0.5-5.0, with higher ratios in central
              London (up to 10+).
              <br />
              <strong>Singapore:</strong> Strict controls with residential FAR 1.4-3.0, commercial
              up to 12.0 in CBD.
              <br />
              <strong>Japan:</strong> Floor Area Ratio 1.0-15.0, with additional Building Coverage
              Ratio controls.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">Special Economic Zones</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>SEZs:</strong> Higher FAR allowances (2.0-8.0) to attract investment and
              promote economic growth.
              <br />
              <strong>Technology Parks:</strong> Flexible FAR up to 4.0-6.0 for modern office
              spaces.
              <br />
              <strong>Greenfield Projects:</strong> Negotiable FAR based on infrastructure
              investment.
              <br />
              <strong>Transit-Oriented Development:</strong> Bonus FAR (0.5-1.0) near metro
              stations.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">FAR Incentives & Bonuses</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Amenity Spaces:</strong> Bonus FAR for providing public amenities and open
              spaces.
              <br />
              <strong>Green Building:</strong> Additional FAR for LEED/GRIHA certified sustainable
              buildings.
              <br />
              <strong>Affordable Housing:</strong> FAR bonus for including economically weaker
              section housing.
              <br />
              <strong>Heritage Conservation:</strong> Additional FAR for preserving historical
              buildings.
            </p>
          </div>
        </div>
      </div>

      {/* Strategic FAR Planning */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Strategic Planning for Maximum FAR Utilization
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Setback Optimization
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Minimize setbacks while complying with regulations. Use cantilevered structures
                  and innovative designs to maximize buildable area within FAR limits.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Basement Utilization
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Include basement areas in FAR calculations where permitted. Use for parking,
                  services, or habitable spaces to maximize development potential.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Mixed-Use Development
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Combine residential and commercial uses to achieve higher effective FAR. Different
                  use types may have different FAR allowances that can be combined strategically.
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
                  FAR Bonus Schemes
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Utilize government incentives for additional FAR through open spaces, affordable
                  housing, or infrastructure provision. Research local bonus schemes carefully.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Plot Consolidation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Combine multiple adjacent plots to achieve economies of scale and higher effective
                  utilization. Consider joint development agreements for optimal results.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Phased Development
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Develop projects in phases to maximize FAR utilization over time. Start with
                  permissible area and expand as regulations allow or bonuses are obtained.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAR Impact on Economics */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Economic Implications of FAR Regulations
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Land Value Impact
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Higher FAR increases land value proportionally. A plot with FAR 2.0 is
                  theoretically twice as valuable as one with FAR 1.0, assuming other factors remain
                  constant.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Construction Costs
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Higher FAR allows cost distribution over larger built-up area, potentially
                  reducing per-square-foot costs. However, taller buildings may increase structural
                  costs.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Return on Investment
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Optimal FAR utilization maximizes returns on land investment. Underutilization
                  represents lost opportunity cost, while over-utilization risks regulatory
                  penalties.
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
                  Market Pricing
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Property prices are often quoted considering effective FAR utilization. Buyers
                  factor in potential future development when valuing properties.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Rental Yields</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Higher FAR developments can offer better rental yields per square foot of land.
                  Efficient space utilization improves overall project economics.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Financing Impact
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Lenders consider FAR utilization when approving loans. Higher FAR projects may
                  qualify for better financing terms due to improved debt service coverage ratios.
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
          Common Mistakes to Avoid in FAR Planning & Compliance
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Misunderstanding FAR Limits
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              FAR limits are maximums, not requirements. Building exactly to FAR limits may not be
              optimal. Consider market conditions, construction costs, and future regulations.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Setback Requirements
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Setbacks reduce effective buildable area. Front, rear, and side setbacks must be
              factored into FAR calculations to avoid costly redesigns.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Including Basement Areas
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Basement areas may or may not count towards FAR depending on local regulations.
              Clarify inclusion criteria before planning to avoid surprises.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Overlooking Parking Requirements
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Parking areas are excluded from FAR calculations but are mandatory. Insufficient
              parking planning can reduce effective utilization.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Missing FAR Bonus Opportunities
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Many cities offer FAR bonuses for amenities, green building, or affordable housing.
              Research and incorporate bonus schemes to maximize development potential.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Local Variations
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              FAR regulations vary by locality, zone, and land use. Use local development control
              regulations rather than generic guidelines for accurate planning.
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
          Frequently Asked Questions About Floor Area Ratio
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between FAR and Floor Space Index (FSI)?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              FAR and FSI are essentially the same concept - both represent the ratio of total floor
              area to plot area. FAR is more commonly used in American planning, while FSI is used
              in Indian and some Asian contexts. The terms are interchangeable, with FSI sometimes
              specifically referring to the permissible ratio under local regulations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. How does FAR affect property prices?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Higher FAR increases development potential and thus land value. For example, a plot
              with FAR 3.0 can accommodate three times more built-up area than one with FAR 1.0.
              Property prices often reflect the effective FAR utilization potential. In prime
              locations, the value difference can be substantial.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. Can FAR be increased through special permissions?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Yes, many cities offer FAR bonuses or special permissions for additional construction.
              Common incentives include providing affordable housing, creating public amenities,
              preserving heritage structures, or investing in infrastructure. Some jurisdictions
              allow FAR transfers or purchases from other plots.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. How do setbacks affect effective FAR?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Setbacks reduce the actual buildable area within the plot boundaries. For example,
              with 3m setbacks on all sides of a 1000 sq m plot, the effective buildable area
              becomes 640 sq m. This directly reduces the effective FAR utilization, so setbacks
              must be carefully planned to maximize development potential.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. Is basement included in FAR calculation?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Basement inclusion in FAR calculations varies by jurisdiction. In some places like
              Mumbai, basement areas count towards FAR if used for habitable purposes. In others
              like Delhi, only basements above ground level are counted. Always check local building
              bye-laws for specific provisions regarding basement treatment in FAR calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. How does FAR impact infrastructure requirements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Higher FAR increases population density, requiring more infrastructure. This affects
              requirements for water supply, sewage, electricity, parking, and transportation
              facilities. Development authorities use FAR to ensure adequate infrastructure
              provision and prevent overburdening of existing services.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. Can FAR be transferred between plots?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Some cities allow FAR transfer or Transfer of Development Rights (TDR) between plots.
              Underutilized plots can transfer their unused FAR potential to other locations. This
              helps preserve green spaces and heritage areas while allowing optimal development
              elsewhere. TDR schemes vary significantly by location and have specific regulatory
              frameworks.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. How do changing FAR regulations affect existing projects?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Existing approved projects generally retain their sanctioned FAR. However, changes in
              regulations can affect future phases or extensions. Property owners should regularly
              monitor regulatory changes and consider getting their plans approved quickly. Some
              jurisdictions grandfather existing permissions while applying new rules to new
              applications.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your FAR Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to determine Floor Area Ratio compliance and maximize development
          potential. With accurate FAR calculations, you will optimize building density, ensure
          regulatory compliance, and maximize property value. Essential for developers, architects,
          urban planners, and property investors.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ FAR Compliance Check</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Development Potential</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ NBC Standards</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Instant Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
