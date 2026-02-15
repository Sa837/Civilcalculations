export const TANK_CAPACITY_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Tank Capacity Calculation & Design
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Tank capacity calculation is crucial for water storage systems, chemical processing, fuel
          storage, and industrial applications. Understanding how to accurately calculate tank
          volumes, select appropriate materials, and ensure structural integrity is essential for
          engineers, architects, and facility managers. This comprehensive guide covers everything
          from basic volume calculations to advanced tank design principles, ensuring optimal
          performance and safety for your storage solutions.
        </p>
      </div>

      {/* Why Accurate Tank Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate Tank Capacity Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Safety & Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate capacity calculations prevent overflow hazards and ensure compliance with
              safety standards. Over-sizing wastes resources while under-sizing creates operational
              risks and potential environmental hazards.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Cost Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper sizing reduces material costs and installation expenses. Correct volume
              calculations ensure efficient use of space and resources while avoiding costly
              redesigns and modifications.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Operational Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Right-sized tanks ensure optimal flow rates, mixing ratios, and storage capacity. This
              improves system performance and reduces energy consumption in pumping and heating
              operations.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Regulatory Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Many industries require specific tank capacities for regulatory compliance. Accurate
              calculations ensure adherence to environmental, safety, and industry-specific
              standards and regulations.
            </p>
          </div>
        </div>
      </div>

      {/* Tank Types & Applications */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Tank Types and Their Applications
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Tank Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Shape
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Best For
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Material Options
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Rectangular Tank</td>
                <td className="px-4 py-3">Box-shaped</td>
                <td className="px-4 py-3">Above ground, easy construction</td>
                <td className="px-4 py-3">Concrete, steel, fiberglass</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Cylindrical Tank</td>
                <td className="px-4 py-3">Round vertical</td>
                <td className="px-4 py-3">Pressure vessels, uniform stress</td>
                <td className="px-4 py-3">Steel, concrete, plastic</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Spherical Tank</td>
                <td className="px-4 py-3">Ball-shaped</td>
                <td className="px-4 py-3">High pressure, gas storage</td>
                <td className="px-4 py-3">Steel, composite materials</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Conical Tank</td>
                <td className="px-4 py-3">Cone-shaped</td>
                <td className="px-4 py-3">Sedimentation, easy drainage</td>
                <td className="px-4 py-3">Steel, concrete, plastic</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Underground Tank</td>
                <td className="px-4 py-3">Various shapes</td>
                <td className="px-4 py-3">Space-saving, temperature stable</td>
                <td className="px-4 py-3">Fiberglass, steel, concrete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Capacity Calculation Methods */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Tank Capacity Calculation Methods
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Rectangular Tank Volume Formula
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              For rectangular tanks: Volume = Length × Width × Height. This simple formula applies
              to box-shaped tanks where all internal dimensions are straight and perpendicular.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Volume</strong> = L × W × H
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Length × Width × Height in consistent units
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Cylindrical Tank Volume Formula
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              For cylindrical tanks: Volume = π × r² × h, where r is the radius and h is the height.
              This formula calculates the volume of right circular cylinders.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Volume</strong> = πr²h
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  π × radius² × height
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>π ≈ 3.14159</strong>
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  Use 3.14 for practical calculations
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Working Volume Considerations
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Tank capacity calculations must account for unusable volume due to fittings, sediment
              space, overflow prevention, and thermal expansion. Working capacity is typically
              85-95% of total volume.
            </p>
          </div>
        </div>
      </div>

      {/* Material Selection Guide */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          Material Selection and Design Considerations
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">
              Steel Tanks (Carbon Steel, Stainless Steel)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Best for:</strong> High pressure, temperature extremes, corrosive liquids.
              <br />
              <strong>Advantages:</strong> High strength-to-weight ratio, durable, weldable.
              <br />
              <strong>Considerations:</strong> Corrosion protection required, higher cost, regular
              maintenance.
              <br />
              <strong>Design Standard:</strong> API 650 for atmospheric tanks, ASME codes for
              pressure vessels.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">Concrete Tanks</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Best for:</strong> Large capacity, water storage, wastewater treatment.
              <br />
              <strong>Advantages:</strong> Low maintenance, durable, cost-effective for large
              volumes.
              <br />
              <strong>Considerations:</strong> Heavy construction, longer build time, waterproofing
              required.
              <br />
              <strong>Design Standard:</strong> ACI 350 for environmental structures, AWWA D110 for
              water tanks.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">
              Fiberglass Reinforced Plastic (FRP)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Best for:</strong> Chemical storage, corrosive environments, lightweight
              applications.
              <br />
              <strong>Advantages:</strong> Corrosion resistant, lightweight, easy installation.
              <br />
              <strong>Considerations:</strong> UV protection needed, limited temperature range,
              higher cost.
              <br />
              <strong>Design Standard:</strong> ASTM D3299 for filament wound tanks.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">
              Plastic & Polyethylene Tanks
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Best for:</strong> Small to medium capacity, portable applications,
              non-critical storage.
              <br />
              <strong>Advantages:</strong> Lightweight, inexpensive, corrosion resistant, easy
              installation.
              <br />
              <strong>Considerations:</strong> Limited chemical resistance, UV degradation, lower
              strength.
              <br />
              <strong>Design Standard:</strong> ASTM D1998 for polyethylene tanks.
            </p>
          </div>
        </div>
      </div>

      {/* Design Standards & Regulations */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Design Standards and Regulatory Compliance
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">API Standards</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  API 650 for welded steel tanks, API 620 for low-pressure storage tanks. Essential
                  for petroleum and chemical storage applications.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  AWWA Standards
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  American Water Works Association standards for water storage tanks. D100 for
                  welded steel, D110 for wire-wound prestressed concrete.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">ASME Codes</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  ASME Section VIII for pressure vessels. Required for tanks operating above 15 psig
                  or handling hazardous materials.
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
                  EPA Regulations
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Environmental Protection Agency requirements for spill prevention, secondary
                  containment, and hazardous waste storage.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Local Building Codes
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  IBC, UBC, or local municipal codes for seismic design, wind loading, and
                  foundation requirements specific to your location.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  NFPA Standards
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  National Fire Protection Association standards for flammable liquid storage and
                  fire protection requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Maintenance */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Safety Considerations and Maintenance Requirements
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Structural Integrity Checks
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Regular inspection for corrosion, cracks, and structural damage. Non-destructive
                  testing methods should be used for critical applications.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Overflow Prevention
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Install high-level alarms, automatic shutoff valves, and overflow drains. Never
                  exceed 95% of tank capacity during normal operation.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Secondary Containment
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Provide containment systems to prevent environmental contamination. Capacity
                  should be 110% of primary tank volume for hazardous materials.
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
                  Access and Ventilation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Ensure safe access for inspection and maintenance. Provide adequate ventilation to
                  prevent vapor accumulation in enclosed tanks.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Corrosion Protection
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Apply appropriate coatings, cathodic protection, or use corrosion-resistant
                  materials based on the stored product&apos;s characteristics.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Emergency Response
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Develop spill response plans, maintain spill containment equipment, and train
                  personnel in emergency procedures.
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
          Common Mistakes to Avoid in Tank Capacity Calculations
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Freeboard Requirements
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Failing to account for expansion space, overflow prevention, and mixing requirements.
              Always include 5-10% freeboard in capacity calculations.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Incorrect Unit Conversions
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Mixing units (feet vs meters, gallons vs liters) leads to massive errors. Always
              convert all dimensions to consistent units before calculating.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Forgetting Internal Fittings
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Manways, nozzles, ladders, and internal structures displace volume. Account for these
              obstructions in capacity calculations.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Considering Operating Temperature
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Thermal expansion can increase liquid volume by 0.1-0.3% per 10°C. Design for maximum
              operating temperatures to prevent overflow.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Underestimating Dead Volume
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Conical bottoms, sloped floors, and complex geometries create unusable volume.
              Calculate both total and working capacities accurately.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Ignoring Seismic and Wind Loads
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Tanks must be designed for local seismic and wind conditions. Oversizing for safety
              can prevent catastrophic failure during extreme events.
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
          Frequently Asked Questions About Tank Capacity
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. How do I convert between different volume units?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              1 cubic meter = 1000 liters = 264.17 US gallons = 219.97 UK gallons. 1 US gallon =
              3.785 liters, 1 UK gallon = 4.546 liters. Always use consistent units in calculations
              and double-check conversions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. What is the difference between total capacity and working capacity?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Total capacity is the geometric volume of the tank. Working capacity accounts for
              unusable volume due to fittings, dead zones, freeboard requirements, and safety
              margins. Working capacity is typically 80-95% of total capacity.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. How do I calculate capacity for irregularly shaped tanks?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Divide irregular shapes into simpler geometric forms (rectangles, cylinders, cones).
              Calculate volume for each section separately, then sum them. For complex shapes, use
              numerical integration methods or consult engineering software.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. What safety factors should I include in tank capacity calculations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Include 5-10% freeboard for thermal expansion and overflow prevention. Add 10-15%
              extra capacity for future expansion. Consider 110% containment capacity for hazardous
              materials. Always follow local safety codes and standards.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. How do I account for tank slope and conical bottoms?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For conical sections: Volume = (πh/3) × (R² + Rr + r²), where R is top radius, r is
              bottom radius, h is height. Sloped bottoms create unusable volume that should be
              deducted from working capacity calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. What is the maximum capacity for different tank types?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Concrete tanks: up to 10 million gallons. Steel tanks: up to 5 million gallons.
              Plastic tanks: up to 15,000 gallons. Fiberglass tanks: up to 50,000 gallons. Larger
              capacities require special engineering and regulatory approval.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. How do I calculate tank capacity for horizontal cylindrical tanks?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For partially filled horizontal cylinders: Volume = L × [R² × cos⁻¹((R-h)/R) - (R-h) ×
              √(2Rh - h²)], where L is length, R is radius, h is liquid height. Full volume = πR²L.
              Use this calculator for accurate horizontal tank calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. What codes apply to underground tank capacity calculations?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Follow NFPA 30 for flammable liquids, EPA regulations for hazardous waste, and local
              fire codes. Underground tanks require additional considerations for soil loading,
              corrosion protection, and leak detection systems.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your Tank Capacity Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to determine precise tank capacities for various shapes and
          configurations. With accurate capacity calculations, you will ensure proper sizing,
          optimize material usage, and meet regulatory requirements. Perfect for mechanical
          engineers, facility managers, and construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Tank Capacity Calculation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Multiple Tank Shapes</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Volume Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Regulatory Compliance</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
