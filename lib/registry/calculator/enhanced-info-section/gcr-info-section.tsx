export const GCR_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Ground Coverage Ratio (GCR) & Land Utilization
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Ground Coverage Ratio (GCR) is a crucial zoning parameter that determines the maximum area
          of a plot that can be covered by buildings at ground level. Understanding GCR calculations
          and regulations is essential for optimal land utilization while ensuring adequate open
          spaces for light, ventilation, and emergency access. This comprehensive guide covers GCR
          concepts, calculation methods, regulatory frameworks, and strategic planning approaches
          for efficient site development.
        </p>
      </div>

      {/* Why GCR Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Ground Coverage Ratio (GCR) Matters in Urban Planning
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Open Space Preservation
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              GCR limits ensure adequate open spaces for natural light, ventilation, and
              recreational areas. Proper GCR planning prevents overcrowding and maintains livable
              urban environments.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Emergency Access
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              GCR regulations ensure sufficient space for fire engines, ambulances, and emergency
              vehicles. Proper setbacks and open areas are critical for public safety and disaster
              management.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Environmental Benefits
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Lower GCR allows more green spaces, reduces urban heat island effect, and improves
              stormwater management. Sustainable development requires balancing built-up area with
              natural landscapes.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Infrastructure Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              GCR controls directly affect requirements for parking, utilities, and services. Proper
              GCR planning ensures infrastructure capacity matches development intensity.
            </p>
          </div>
        </div>
      </div>

      {/* GCR vs Other Ratios */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Understanding GCR vs FAR and Other Development Controls
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Control Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  What It Measures
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Typical Range
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Ground Coverage Ratio (GCR)</td>
                <td className="px-4 py-3">Built-up area at ground level ÷ Plot area</td>
                <td className="px-4 py-3">Open space preservation, light & ventilation</td>
                <td className="px-4 py-3">30-70%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Floor Area Ratio (FAR)</td>
                <td className="px-4 py-3">Total built-up area ÷ Plot area</td>
                <td className="px-4 py-3">Building density control, infrastructure load</td>
                <td className="px-4 py-3">1.0-5.0</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Floor Space Index (FSI)</td>
                <td className="px-4 py-3">Same as FAR (regional terminology)</td>
                <td className="px-4 py-3">Development intensity control</td>
                <td className="px-4 py-3">1.0-5.0</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Plot Coverage</td>
                <td className="px-4 py-3">Same as GCR (alternative term)</td>
                <td className="px-4 py-3">Ground level coverage limitation</td>
                <td className="px-4 py-3">30-70%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* GCR Calculation Methods */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          GCR Calculation Methods & Practical Examples
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Basic GCR Formula
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              GCR is calculated as the ratio of ground floor built-up area to total plot area,
              expressed as a percentage or decimal.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>GCR</strong> = (Ground Floor Built-up Area ÷ Plot Area) × 100%
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Percentage method for GCR calculation
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Maximum Allowable Area</strong> = GCR × Plot Area
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Maximum ground coverage in square meters
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              What Counts in GCR Calculation
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Only ground floor structures count towards GCR. Upper floors, basements, and service
              areas may be excluded depending on local regulations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Practical Calculation Example
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              For a 1000 sq m plot with 40% GCR limit: Maximum ground coverage = 0.40 × 1000 = 400
              sq m. This leaves 600 sq m for open spaces, setbacks, and parking.
            </p>
          </div>
        </div>
      </div>

      {/* GCR Regulations by Zone Type */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          GCR Regulations and Standards by Land Use Type
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">Residential Zones</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Low Density:</strong> 35-45% GCR for single-family homes with large setbacks.
              <br />
              <strong>Medium Density:</strong> 45-55% GCR for apartments and townhouses.
              <br />
              <strong>High Density:</strong> 55-65% GCR for multi-storey residential buildings.
              <br />
              <strong>Slum Rehabilitation:</strong> Up to 70% GCR for redevelopment projects.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">Commercial Zones</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Local Commercial:</strong> 50-60% GCR for neighborhood shopping areas.
              <br />
              <strong>Business District:</strong> 60-70% GCR for office complexes and retail.
              <br />
              <strong>Central Business District:</strong> 65-75% GCR for high-rise commercial
              towers.
              <br />
              <strong>Mixed-Use:</strong> 55-70% GCR combining commercial and residential uses.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">Industrial Zones</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Light Industrial:</strong> 50-60% GCR for manufacturing and assembly
              facilities.
              <br />
              <strong>Heavy Industrial:</strong> 40-55% GCR for large-scale industrial operations.
              <br />
              <strong>Special Economic Zones:</strong> 60-75% GCR for technology and export
              processing zones.
              <br />
              <strong>Flatted Factories:</strong> 65-75% GCR for multi-tenanted industrial
              buildings.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">
              Institutional & Public Zones
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Educational:</strong> 40-50% GCR for schools, colleges, and universities.
              <br />
              <strong>Medical:</strong> 45-55% GCR for hospitals and healthcare facilities.
              <br />
              <strong>Government:</strong> 50-65% GCR for administrative and public buildings.
              <br />
              <strong>Recreational:</strong> 30-40% GCR for parks, stadiums, and community centers.
            </p>
          </div>
        </div>
      </div>

      {/* Strategic GCR Planning */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Strategic Planning for Optimal GCR Utilization
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Building Orientation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Orient buildings to maximize natural light and ventilation while minimizing shadow
                  on neighboring properties. Consider solar access and wind patterns in layout
                  design.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Setback Optimization
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use minimum required setbacks strategically. Place service areas and utilities in
                  setback spaces to maximize usable building footprint within GCR limits.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Multi-Level Parking
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Design basement or multi-level parking to accommodate required parking spaces
                  without counting towards GCR, freeing up ground level area for buildings.
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
                  Landscape Integration
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Incorporate green spaces, water features, and recreational areas within open
                  spaces. Well-designed landscapes can enhance property value and meet GCR
                  requirements.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Phased Development
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Develop in phases to maximize GCR utilization over time. Start with ground
                  coverage and expand vertically as regulations allow or through special
                  permissions.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Mixed-Use Efficiency
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Combine different uses (residential, commercial, retail) to achieve higher
                  effective utilization while maintaining required open spaces for each use type.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GCR Impact on Design */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          How GCR Regulations Impact Building Design & Functionality
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Building Footprint
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  GCR directly determines maximum building footprint at ground level. Compact,
                  efficient building shapes maximize usable area within coverage limits.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Parking Layout
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Surface parking areas don't count towards GCR but reduce effective open space.
                  Underground or multi-level parking preserves ground coverage for buildings.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Service Areas</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Mechanical rooms, electrical substations, and service areas can be placed in open
                  spaces without affecting GCR, optimizing building efficiency.
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
                  Landscape Design
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Open spaces required by GCR can be converted into attractive landscapes, gardens,
                  and recreational areas that enhance property appeal and functionality.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Natural Light Access
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Proper spacing between buildings ensures adequate natural light and ventilation.
                  GCR regulations prevent urban canyons and improve living conditions.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Emergency Access
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Open spaces facilitate emergency vehicle access and firefighting operations. GCR
                  ensures public safety through proper building spacing and access roads.
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
          Common Mistakes to Avoid in GCR Planning & Compliance
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Confusing GCR with FAR
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              GCR applies only to ground level coverage, while FAR considers total built-up area
              across all floors. A building can have low GCR but high FAR through upper floors.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Parking Areas
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Surface parking areas don't count towards GCR but reduce available open space. Plan
              parking vertically to preserve ground coverage for buildings.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Underestimating Setbacks
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Front, rear, and side setbacks are mandatory and reduce effective GCR. Factor in all
              setback requirements before finalizing building layout.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Missing Open Space Requirements
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Some regulations require minimum open spaces beyond GCR limits. Ensure compliance with
              all open space and green area requirements.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Considering Building Shape
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Irregular building shapes can reduce effective GCR utilization. Rectangular or square
              buildings typically maximize coverage within the same GCR limit.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Local Variations
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              GCR regulations vary by zone, locality, and land use type. Always verify local
              development control rules rather than using generic guidelines.
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
          Frequently Asked Questions About Ground Coverage Ratio
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between GCR and plot coverage?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              GCR and plot coverage are essentially the same concept - both refer to the percentage
              of plot area covered by buildings at ground level. The terms are used interchangeably
              in different regions and planning contexts.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. Does basement area count towards GCR?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Generally, basement areas below ground level do not count towards GCR since they don't
              cover the ground surface. However, some jurisdictions may count basement areas that
              extend above ground level. Always check local regulations for specific provisions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. How do setbacks affect GCR calculations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Setbacks reduce the effective buildable area within the plot. For example, with 3m
              setbacks on all sides of a 1000 sq m plot, the effective area for GCR calculation
              becomes the area within the setback lines, typically 640-700 sq m depending on plot
              shape.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. Can GCR be increased through special permissions?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Yes, many urban local bodies allow GCR increases through special permissions, amenity
              contributions, or transferable development rights. Higher GCR can be permitted for
              green buildings, affordable housing components, or infrastructure development
              contributions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. How does GCR affect parking requirements?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Parking areas are typically excluded from GCR calculations but must be provided as per
              local bye-laws. Surface parking reduces available open space, so multi-level or
              basement parking is often preferred to maximize building coverage within GCR limits.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. What is the typical GCR range for different building types?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Residential buildings typically have 35-65% GCR, commercial buildings 50-75% GCR,
              industrial buildings 40-70% GCR, and institutional buildings 30-50% GCR. The actual
              range depends on local zoning regulations, building height, and infrastructure
              capacity.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. How do I maximize building area within GCR limits?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Maximize GCR utilization by minimizing setbacks (while complying with regulations),
              using efficient building shapes, placing parking underground, and incorporating
              service areas in open spaces. Consider building orientation for optimal natural light
              and ventilation.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. What are the consequences of violating GCR regulations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Violating GCR regulations can result in demolition orders, hefty fines, legal
              disputes, and inability to obtain occupancy certificates. In extreme cases, it may
              lead to project stoppage and significant financial losses. Always ensure compliance
              through proper planning and approvals.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your GCR Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to check Ground Coverage Ratio compliance and optimize land
          utilization. With accurate GCR calculations, you will ensure proper open spaces, comply
          with zoning regulations, and maximize development potential. Perfect for developers,
          architects, urban planners, and property owners.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ GCR Compliance Check</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ NBC Standards</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Open Space Planning</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Instant Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
