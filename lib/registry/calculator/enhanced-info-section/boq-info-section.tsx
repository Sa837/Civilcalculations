export const BOQ_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Bill of Quantities (BOQ) Preparation & Management
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          A Bill of Quantities (BOQ) is a comprehensive document that provides detailed measurement
          and quantification of all materials, labor, and services required for construction
          projects. Understanding how to prepare accurate BOQs is essential for cost estimation,
          tendering, and project management. This comprehensive guide covers everything from basic
          measurement techniques to advanced BOQ management, ensuring accurate project costing and
          successful contract administration.
        </p>
      </div>

      {/* Why Accurate BOQ Preparation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate BOQ Preparation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Cost Control</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate BOQs prevent cost overruns and ensure competitive bidding. Proper
              quantification eliminates disputes and provides clear cost breakdown for project
              financing and budget allocation.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Contract Clarity
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Well-prepared BOQs define scope clearly, reducing ambiguities and change orders. They
              serve as the basis for contract agreements and payment schedules.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Project Planning
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              BOQs enable accurate resource planning, procurement scheduling, and construction
              sequencing. They help identify critical path items and procurement lead times.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Risk Management
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Comprehensive BOQs identify potential risks and allow for appropriate contingencies.
              They provide benchmarks for progress measurement and performance evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* BOQ Components & Structure */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          BOQ Components and Standard Structure
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200/30 dark:border-slate-700/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  BOQ Section
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Content Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left font-semibold text-heading dark:text-heading-dark">
                  Measurement Unit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-700/30">
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Earthwork</td>
                <td className="px-4 py-3">Excavation, filling, grading</td>
                <td className="px-4 py-3">Site preparation and leveling</td>
                <td className="px-4 py-3">m³, m²</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Concrete Work</td>
                <td className="px-4 py-3">Formwork, reinforcement, concrete</td>
                <td className="px-4 py-3">Structural elements</td>
                <td className="px-4 py-3">m³, kg, m²</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Masonry Work</td>
                <td className="px-4 py-3">Brickwork, blockwork, stone</td>
                <td className="px-4 py-3">Walls and partitions</td>
                <td className="px-4 py-3">m³, m²</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Finishing Work</td>
                <td className="px-4 py-3">Plastering, painting, flooring</td>
                <td className="px-4 py-3">Interior and exterior finishes</td>
                <td className="px-4 py-3">m², m</td>
              </tr>
              <tr className="bg-white/50 dark:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">Carpentry & Joinery</td>
                <td className="px-4 py-3">Doors, windows, timber work</td>
                <td className="px-4 py-3">Wooden elements and fixtures</td>
                <td className="px-4 py-3">m², No., m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Measurement Techniques */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Measurement Techniques and Standards
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Taking-Off Measurements
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Accurate measurement is the foundation of BOQ preparation. Use scaled rules for
              drawings and direct measurement for existing structures. Always work from the same
              reference points and maintain consistent accuracy standards.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-3">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Accuracy Standards</strong>
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  ±5mm for dimensions, ±10mm for areas
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded">
                  <strong>Measurement Units</strong>
                </div>
                <div className="text-sm text-body/70 dark:text-body-dark/70">
                  SI units (meters, m², m³) standard
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Quantity Calculation Methods
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Use appropriate calculation methods for different shapes and complexities. Cross-check
              calculations using alternative methods to ensure accuracy. Document all assumptions
              and rounding rules.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-heading dark:text-heading-dark mb-2">
              Wastage and Contingency Factors
            </h4>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Include appropriate allowances for cutting waste, breakage, and unforeseen conditions.
              Typical wastage factors: 5-10% for materials, 10-15% for labor, 5-10% for
              contingencies. Document all allowances clearly.
            </p>
          </div>
        </div>
      </div>

      {/* BOQ Formats & Standards */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          BOQ Formats and Industry Standards
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50/30 p-4 dark:bg-green-900/10">
            <h4 className="font-bold text-green-800 dark:text-green-200">
              Standard Method of Measurement (SMM)
            </h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> Traditional building projects, government contracts.
              <br />
              <strong>Format:</strong> Item description, quantity, unit, rate, amount.
              <br />
              <strong>Standards:</strong> CESMM (Civil Engineering), NRM (New Rules of Measurement).
              <br />
              <strong>Advantages:</strong> Standardized format, widely accepted, detailed breakdown.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-4 dark:bg-blue-900/10">
            <h4 className="font-bold text-blue-800 dark:text-blue-200">Elemental BOQ</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> Complex projects, design-build contracts.
              <br />
              <strong>Format:</strong> Grouped by building elements (substructure, superstructure).
              <br />
              <strong>Standards:</strong> Uniclass, MasterFormat, Omniclass classification.
              <br />
              <strong>Advantages:</strong> Logical grouping, easier cost analysis, better for value
              engineering.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 p-4 dark:bg-amber-900/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-200">Trade-Based BOQ</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> Specialist subcontract work, renovation projects.
              <br />
              <strong>Format:</strong> Organized by trade or specialty (electrical, mechanical,
              finishes).
              <br />
              <strong>Standards:</strong> Trade-specific measurement rules.
              <br />
              <strong>Advantages:</strong> Specialization focus, easier for subcontractors,
              trade-specific pricing.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/30 p-4 dark:bg-rose-900/10">
            <h4 className="font-bold text-rose-800 dark:text-rose-200">Digital BOQ Systems</h4>
            <p className="mt-2 text-sm text-body/80 dark:text-body-dark/80">
              <strong>Application:</strong> BIM-integrated projects, large-scale developments.
              <br />
              <strong>Format:</strong> Computer-generated from 3D models, automated quantities.
              <br />
              <strong>Standards:</strong> IFC, COBie, automated measurement protocols.
              <br />
              <strong>Advantages:</strong> Accuracy, speed, real-time updates, integration with
              estimating software.
            </p>
          </div>
        </div>
      </div>

      {/* Cost Estimation & Pricing */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Cost Estimation and Rate Analysis
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Material Cost Calculation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Include purchase price, transportation, handling, and storage costs. Account for
                  bulk discounts, taxes, and market fluctuations. Use current market rates for
                  accurate estimation.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Labor Cost Analysis
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Calculate productivity rates based on skill level and working conditions. Include
                  wages, benefits, insurance, and supervision costs. Factor in learning curves for
                  complex work.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Equipment Costs
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Include ownership costs (depreciation, maintenance) and operating costs (fuel,
                  lubricants, repairs). Consider equipment utilization rates and
                  mobilization/demobilization costs.
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
                  Overhead & Profit
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Include general overheads (administration, insurance, bonding) and profit margins.
                  Typical ranges: 10-15% overhead, 5-10% profit, depending on project type and
                  market conditions.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Risk Contingencies
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Allow for uncertainties in material prices, productivity rates, and unforeseen
                  conditions. Typical contingencies: 5-10% for well-defined projects, 10-20% for
                  complex or uncertain projects.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Rate Build-up Structure
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Document how rates are calculated: material costs + labor costs + equipment costs
                  + overhead + profit. Maintain detailed rate analysis for transparency and audit
                  purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tendering & Contract Management */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Tendering Process and Contract Administration
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                1
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Tender Documentation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Prepare complete tender packages including BOQ, specifications, drawings, and
                  conditions of contract. Ensure all documents are coordinated and free of
                  contradictions.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                2
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Bid Evaluation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Evaluate bids based on price, compliance with requirements, and contractor
                  capability. Check for arithmetic errors and ensure all items are priced. Use clear
                  evaluation criteria.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                3
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Contract Formation
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Execute formal contracts incorporating the BOQ by reference. Include provisions
                  for variations, payments, and dispute resolution. Ensure all parties understand
                  their obligations.
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
                  Progress Measurement
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Use BOQ as the basis for measuring work completed. Establish clear measurement
                  rules and maintain detailed records. Regular progress payments based on actual
                  work done.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                5
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">
                  Variation Management
                </h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Handle changes through formal variation orders. Use BOQ rates for similar work, or
                  establish new rates for significantly different items. Maintain detailed records
                  of all changes.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                6
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark">Final Account</h5>
                <p className="text-sm text-body/70 dark:text-body-dark/70">
                  Prepare final measurement of all work completed including variations. Reconcile
                  with original BOQ and prepare final contract sum. Include all agreed adjustments
                  and deductions.
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
          Common Mistakes to Avoid in BOQ Preparation
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inaccurate Measurements
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Measurement errors cascade through the entire project. Always verify measurements and
              use consistent accuracy standards. Cross-check calculations using different methods.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">❌ Missing Items</h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Omitting items from BOQ leads to claims and disputes. Conduct thorough reviews and
              walkthroughs. Include provisional sums for uncertain items.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Inadequate Descriptions
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Vague item descriptions lead to interpretation disputes. Use clear, comprehensive
              descriptions with references to specifications and drawings.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Incorrect Units
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Using wrong measurement units causes pricing errors. Standardize units throughout the
              BOQ and clearly indicate unit conversions where necessary.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Not Including Wastage
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Failing to account for material wastage leads to insufficient quantities. Include
              appropriate wastage factors based on material type and complexity.
            </p>
          </div>
          <div className="rounded-lg bg-red-50/50 p-4 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
            <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              ❌ Poor Organization
            </h5>
            <p className="text-sm text-body/70 dark:text-body-dark/70">
              Disorganized BOQ makes pricing difficult and error-prone. Use logical grouping, clear
              numbering system, and consistent formatting throughout.
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
          Frequently Asked Questions About BOQ Preparation
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between BOQ and schedule of rates?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              BOQ provides specific quantities for a particular project with item descriptions and
              measured quantities. Schedule of rates provides standard rates for various items
              without specific quantities. BOQ is project-specific while schedule of rates is
              general and can be used for multiple projects.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. Who prepares the BOQ for construction projects?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Quantity surveyors or estimators typically prepare BOQ for large projects. For smaller
              projects, architects, engineers, or contractors may prepare simplified BOQs.
              Government projects often require certified quantity surveyors. The preparer should
              have detailed knowledge of measurement standards and construction methods.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. How do I handle provisional sums in BOQ?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Provisional sums are included for work that cannot be accurately quantified at tender
              stage. They should be clearly marked as provisional with estimated quantities. Final
              measurement occurs when actual work is known. Provisional sums help ensure competitive
              bidding when some details are uncertain.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. What is the purpose of prime cost items in BOQ?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Prime cost (PC) items are for materials or services to be supplied by others but
              installed by the contractor. They include a PC sum plus a percentage for
              contractor&apos;s profit, overheads, and attendance costs. PC items are used when
              specific products are not yet selected but need to be included in the contract.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. How do I handle variations during construction?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Variations must be documented through formal variation orders. Use BOQ rates for
              similar work, or establish fair rates for new items. Maintain detailed records
              including drawings, instructions, and cost breakdowns. Variations should be agreed
              upon before work commences to avoid disputes.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. What software is commonly used for BOQ preparation?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Popular software includes Excel (with templates), specialized QS software like Candy,
              Buildsoft, or CostX, and BIM-integrated tools. For large projects, integrated project
              management software combining estimating, scheduling, and cost control is preferred.
              The choice depends on project size, complexity, and user requirements.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. How do I ensure BOQ accuracy?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Use experienced personnel, follow standard measurement rules, cross-check
              calculations, conduct peer reviews, and validate against similar completed projects.
              Include appropriate contingencies and clearly document all assumptions. Regular audits
              and quality control checks are essential for accuracy.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. What is the role of BOQ in dispute resolution?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              BOQ serves as the baseline for contract administration and dispute resolution. It
              provides clear scope definition, quantities, and pricing basis. Well-prepared BOQ
              minimizes disputes by clearly defining what is included and excluded. In case of
              disputes, BOQ provides objective criteria for determining fair compensation.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your BOQ Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to create comprehensive Bills of Quantities for your construction
          projects. With accurate BOQ calculations, you will ensure fair pricing, competitive
          bidding, and effective project management. Perfect for quantity surveyors, contractors,
          and project managers.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Comprehensive BOQ Generation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Estimation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Tender Preparation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Contract Management</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
