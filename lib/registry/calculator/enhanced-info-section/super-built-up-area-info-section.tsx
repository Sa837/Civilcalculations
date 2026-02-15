export const SUPER_BUILT_UP_AREA_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Super Built-up Area Calculation & Real Estate Pricing
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Super built-up area is a comprehensive measurement that includes the actual usable space
          plus common areas, amenities, and shared facilities. Understanding super built-up area
          calculations is crucial for property valuation, pricing, and understanding what you're
          paying for in real estate transactions. This comprehensive guide covers super built-up
          area concepts, calculation methods, pricing implications, and buyer considerations for
          informed property decisions.
        </p>
      </div>

      {/* Why Super Built-up Area Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Super Built-up Area Matters in Real Estate
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Property Pricing Basis
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Super built-up area is the standard measurement used for property pricing and
              valuation. Real estate prices are quoted per square foot or square meter of super
              built-up area, affecting the total cost calculation.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Maintenance Charges
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Maintenance fees, property taxes, and society charges are calculated based on super
              built-up area. Understanding this helps in budgeting for ongoing property ownership
              costs.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Amenities Inclusion
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Super built-up area includes access to common amenities and facilities. Buyers pay
              proportionally for shared spaces like lobbies, corridors, gyms, and parking areas
              through this measurement.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Investment Analysis
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For property investors, super built-up area provides the basis for rental yield
              calculations and return on investment analysis. It helps compare properties on a
              standardized basis.
            </p>
          </div>
        </div>
      </div>

      {/* Area Type Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Understanding Different Area Measurements in Real Estate
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
                  Purpose
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Pricing Factor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Carpet Area</td>
                <td className="px-4 py-3">Actual usable floor space inside rooms</td>
                <td className="px-4 py-3">Furnishing, actual living space</td>
                <td className="px-4 py-3">Lowest price per sq ft</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Built-up Area</td>
                <td className="px-4 py-3">Carpet area + walls + balconies</td>
                <td className="px-4 py-3">Construction cost, basic amenities</td>
                <td className="px-4 py-3">Medium price per sq ft</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Super Built-up Area</td>
                <td className="px-4 py-3">Built-up area + common areas + amenities</td>
                <td className="px-4 py-3">Sale pricing, society maintenance</td>
                <td className="px-4 py-3">Highest price per sq ft</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Loading Factor</td>
                <td className="px-4 py-3">Super area ÷ Carpet area ratio</td>
                <td className="px-4 py-3">Efficiency and amenities indicator</td>
                <td className="px-4 py-3">1.2-1.5 typical range</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Super Built-up Area Calculation */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Super Built-up Area Calculation Methods & Components
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">Basic Formula</h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Super built-up area includes the built-up area of your apartment plus a proportionate
              share of common areas and amenities.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Super Built-up Area</strong> = Built-up Area + Common Area Share
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Includes proportionate common areas
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Loading Factor</strong> = Super Area ÷ Carpet Area
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Typically 1.2-1.5 times carpet area
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Components Included
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Super built-up area includes various common areas and amenities that benefit all
              residents.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Calculation Example
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              For a 1000 sq ft carpet area apartment in a building with 20,000 sq ft total built-up
              area and 5000 sq ft common areas: Super area = 1000 + (5000 × 1000 ÷ 20000) = 1250 sq
              ft.
            </p>
          </div>
        </div>
      </div>

      {/* Common Areas & Amenities */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Common Areas and Amenities Included in Super Built-up Area
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">Circulation Areas</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Lobbies & Corridors:</strong> Main entrance lobbies, lift lobbies, and
              internal corridors.
              <br />
              <strong>Staircases:</strong> Common stairwells and fire escape staircases.
              <br />
              <strong>Elevators:</strong> Lift shafts, machine rooms, and elevator maintenance
              areas.
              <br />
              <strong>Passageways:</strong> Common walkways and access paths within the building.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">Amenity Spaces</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Gym & Health Club:</strong> Fitness centers, yoga rooms, and wellness
              facilities.
              <br />
              <strong>Swimming Pool:</strong> Pool area, deck, changing rooms, and pool equipment
              space.
              <br />
              <strong>Clubhouse:</strong> Multipurpose halls, party rooms, and community activity
              spaces.
              <br />
              <strong>Children's Play Area:</strong> Playgrounds, crèches, and indoor play zones.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">
              Utility & Service Areas
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Parking Areas:</strong> Basement parking, surface parking, and parking ramps.
              <br />
              <strong>Security Room:</strong> Security office, CCTV monitoring, and guard stations.
              <br />
              <strong>Maintenance Areas:</strong> Equipment rooms, storage, and service personnel
              spaces.
              <br />
              <strong>Generator Room:</strong> Backup power systems and electrical infrastructure.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">
              Landscape & External Areas
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Landscaped Gardens:</strong> Parks, gardens, and recreational open spaces.
              <br />
              <strong>Driveways & Roads:</strong> Internal roads, driveways, and pedestrian paths.
              <br />
              <strong>Water Features:</strong> Ponds, fountains, and water bodies in common areas.
              <br />
              <strong>External Lighting:</strong> Common area lighting and decorative elements.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Implications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Pricing Implications and Cost Analysis of Super Built-up Area
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Price Per Square Foot
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Property prices are quoted per square foot of super built-up area. Higher loading
                  factors result in higher total costs but may indicate better amenities and common
                  areas.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Maintenance Charges
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Monthly maintenance fees are calculated based on super built-up area. Larger super
                  areas result in higher maintenance costs, covering common amenities and services.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Property Taxes
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Property taxes are often based on super built-up area in some jurisdictions.
                  Higher super areas may result in higher tax liabilities.
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
                  Stamp Duty & Registration
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Stamp duty and registration charges are calculated based on agreement value, which
                  uses super built-up area pricing. Higher super areas increase these costs.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Rental Yields</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Rental income is calculated based on super built-up area. Higher super areas may
                  provide better rental potential if amenities justify the premium pricing.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Value Appreciation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Property appreciation is measured based on super built-up area pricing.
                  Well-maintained common areas can enhance long-term value appreciation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Considerations */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Buyer Considerations and Due Diligence for Super Built-up Area
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Verify Area Measurements
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Cross-verify super built-up area calculations with builder documentation. Ensure
                  all common areas are properly apportioned and documented in the agreement.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Assess Amenity Quality
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Evaluate the quality and maintenance of common amenities. Well-maintained
                  facilities justify higher loading factors, while poorly maintained areas may not.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Compare Loading Factors
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Compare loading factors across similar properties. Loading factors above 1.5 may
                  indicate excessive common areas or inefficient space utilization.
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
                  Review Maintenance Structure
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Understand how maintenance charges are calculated and what they cover. Ensure
                  transparency in billing based on super built-up area apportionment.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Check Future Development
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Verify if additional phases or amenities are planned that might affect future
                  loading factors and maintenance costs.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Legal Documentation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Ensure super built-up area measurements are clearly documented in the agreement.
                  Include provisions for measurement verification and dispute resolution.
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
          Common Mistakes to Avoid When Dealing with Super Built-up Area
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Confusing Area Types
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Don&apos;t compare properties using different area measurements. Always clarify
              whether pricing is based on carpet, built-up, or super built-up area before making
              comparisons.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Loading Factors
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              High loading factors (above 1.5) can significantly increase costs. Evaluate whether
              the amenities justify the premium pricing through the super built-up area.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Verifying Measurements
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Always verify super built-up area calculations independently. Builders may inflate
              common areas to justify higher loading factors and prices.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Overlooking Maintenance Costs
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Higher super built-up areas result in higher maintenance charges. Factor in these
              ongoing costs when evaluating property affordability.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Assuming All Amenities Are Included
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Not all advertised amenities may be completed or operational. Verify the status and
              quality of amenities before finalizing the purchase.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Missing Legal Documentation
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Ensure super built-up area measurements and loading calculations are clearly
              documented in the agreement. Lack of documentation can lead to disputes.
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
          Frequently Asked Questions About Super Built-up Area
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between carpet area and super built-up area?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Carpet area is the actual usable floor space inside your apartment, excluding walls.
              Super built-up area includes your carpet area plus a proportionate share of common
              areas like lobbies, corridors, parking, and amenities. Super built-up area is
              typically 20-50% larger than carpet area.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. Why do builders use super built-up area for pricing?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Builders use super built-up area because it allows them to recover costs for common
              areas and amenities through apartment pricing. This includes expenses for lobbies,
              elevators, parking, gyms, and landscaping that benefit all residents. It provides a
              fair way to distribute these shared costs.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. How is the loading factor calculated?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Loading factor is calculated as Super Built-up Area ÷ Carpet Area. For example, if
              your carpet area is 1000 sq ft and super built-up area is 1250 sq ft, the loading
              factor is 1.25. This means you're paying for 250 sq ft of common areas and amenities
              through your apartment price.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. Is super built-up area the same in all cities?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              No, super built-up area practices vary by city and developer. Some cities like Mumbai
              have standardized practices, while others may have different conventions. Always check
              local real estate regulations and verify calculations independently. International
              standards may differ significantly from Indian practices.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. How do I verify super built-up area calculations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Request detailed calculations from the builder showing how common areas are
              apportioned. Cross-verify with the total built-up area of the building and number of
              units. Consider getting an independent architect or valuer to verify measurements.
              Check the agreement for clear documentation of area calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. Does super built-up area affect property taxes?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              In some jurisdictions, property taxes are based on super built-up area, while in
              others they use carpet area or built-up area. Check local municipal regulations. Stamp
              duty and registration charges are typically based on the agreement value, which uses
              super built-up area pricing.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. What should be the ideal loading factor?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Ideal loading factors typically range from 1.2 to 1.5, depending on the quality and
              extent of amenities. Factors below 1.2 may indicate inadequate common areas, while
              factors above 1.5 might suggest excessive common areas or inefficient space
              utilization. Consider the developer's reputation and amenity quality.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. Can I negotiate based on super built-up area?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Yes, you can negotiate based on super built-up area calculations, especially if
              loading factors seem high or amenities are not as promised. Request detailed
              breakdowns of common areas and compare with similar properties. Some buyers
              successfully negotiate reductions in super built-up area pricing for incomplete or
              substandard amenities.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Super Built-up Area Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to determine super built-up area and loading factors for property
          valuation. With accurate calculations, you will understand true property costs, compare
          developments effectively, and make informed real estate decisions. Essential for property
          buyers, investors, and real estate professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Loading Factor Calculation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Price Analysis</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Maintenance Costs</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Instant Results</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
