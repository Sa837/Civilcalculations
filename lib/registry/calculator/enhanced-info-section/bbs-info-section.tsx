export const BBS_INFO_SECTION = () => {
  return (
    <div className="mt-12 space-y-8">
      {/* Enhanced Info & Educational Section */}
      {/* Main Introduction */}
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 dark:border-slate-800/30 dark:from-primary/10 dark:to-secondary/20">
        <h2 className="text-2xl font-bold text-heading dark:text-heading-dark mb-4">
          Complete Guide to Bar Bending Schedule (BBS) Calculation
        </h2>
        <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
          Bar Bending Schedule (BBS) is the backbone of reinforced concrete construction, providing
          detailed documentation of all reinforcement bars required for structural elements. This
          comprehensive guide covers everything from basic BBS principles to advanced calculation
          methodologies, ensuring accurate quantity estimation and efficient construction project
          management.
        </p>
      </div>

      {/* Why Accurate BBS Calculation Matters */}
      <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-800/30 dark:bg-surface-dark">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
            1
          </span>
          Why Accurate BBS Calculation Matters
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50/50 p-4 dark:bg-green-900/20 border border-green-200/30 dark:border-green-700/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Cost Control</h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Accurate BBS prevents over-ordering of steel by 15-25%, saving significant costs on
              construction projects.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Construction Efficiency
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Proper BBS ensures right quantities are available when needed, reducing construction
              delays by up to 20%.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Regulatory Compliance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              BBS is mandatory documentation for construction permits and quality assurance across
              all major building codes.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Quality Assurance
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Detailed BBS ensures structural integrity and helps prevent reinforcement errors that
              could compromise safety.
            </p>
          </div>
          <div className="rounded-lg bg-indigo-50/50 p-4 dark:bg-indigo-900/20 border border-indigo-200/30 dark:border-indigo-700/30">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
              Material Optimization
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Minimizes steel waste through precise calculations, reducing environmental impact and
              material costs.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-50/50 p-4 dark:bg-cyan-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
            <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">
              Project Timeline
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Early BBS preparation reduces fabrication time and ensures timely delivery of
              reinforcement materials.
            </p>
          </div>
        </div>
      </div>

      {/* BBS Design Codes Comparison */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
            2
          </span>
          Design Codes & Standards Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200/20 dark:border-slate-700/20">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Design Code
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Primary Use
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Hook Length Multipliers
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Development Length
                </th>
                <th className="border border-slate-200/20 px-6 py-4 text-left font-semibold text-heading dark:text-heading-dark dark:border-slate-700/20">
                  Lap Splice Rules
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  NBC 205:2020
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Nepal (Primary)
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  90°=9d, 135°=12d, 180°=16d
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  40d (tension), 30d (compression)
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  ≥40d, ≥300mm minimum
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  IS 456:2000
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  India
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  90°=4d, 135°=6d, 180°=8d
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Variable (47d-69d based on grade)
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  ≥24d, ≥200mm minimum
                </td>
              </tr>
              <tr className="border-b border-slate-200/20 dark:border-slate-700/20">
                <td className="border border-slate-200/20 px-6 py-4 font-medium dark:border-slate-700/20">
                  ACI 318-19
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  USA/Canada
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  90°=12d, 135°=12d, 180°=12d
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  Based on concrete strength
                </td>
                <td className="border border-slate-200/20 px-6 py-4 dark:border-slate-700/20">
                  ≥30d, ≥300mm minimum
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Structural Elements & Reinforcement Types */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white text-sm">
            3
          </span>
          Structural Elements & Reinforcement Types
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                🏗️
              </span>
              Structural Elements
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Beams:</strong> Longitudinal bars (main), stirrups/ties, hanger bars
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Columns:</strong> Longitudinal bars, lateral ties, starter bars
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Slabs:</strong> Main bars, distribution bars, temperature bars
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Footing:</strong> Main bars, distribution bars, dowels
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <strong>Walls:</strong> Vertical bars, horizontal bars, boundary elements
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                🔧
              </span>
              Bar Types & Applications
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Main Bars:</strong> Primary load-carrying reinforcement
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Secondary Bars:</strong> Additional reinforcement for specific conditions
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Stirrups/Ties:</strong> Confine concrete, resist shear forces
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Distribution Bars:</strong> Control cracking, temperature stresses
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                <div>
                  <strong>Extra Bars:</strong> Special reinforcement requirements
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BBS Calculation Methodology */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm">
            4
          </span>
          BBS Calculation Methodology
        </h3>
        <div className="space-y-6">
          <div className="rounded-lg border border-blue-200/40 bg-blue-50 p-6 dark:border-blue-700/30 dark:bg-blue-900/40">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm">
                📐
              </span>
              Basic Bar Length Calculation
            </h4>
            <div className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
              <p>
                <strong>Cutting Length:</strong> Clear span length + development lengths - lap
                deductions
              </p>
              <p>
                <strong>Hook Length:</strong> Hook multiplier × bar diameter (90°=9d, 135°=12d,
                180°=16d)
              </p>
              <p>
                <strong>Total Length:</strong> Cutting length + hook lengths + bend allowances
              </p>
              <p>
                <strong>Weight:</strong> Length × unit weight per meter × number of bars
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200/40 bg-green-50 p-6 dark:border-green-700/30 dark:bg-green-900/40">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm">
                🔄
              </span>
              Lap Splice & Development Length
            </h4>
            <div className="space-y-2 text-sm text-green-900 dark:text-green-100">
              <p>
                <strong>Development Length:</strong> Minimum length for stress transfer (typically
                40d for tension)
              </p>
              <p>
                <strong>Lap Length:</strong> ≥40d, ≥300mm (NBC) for bar splicing
              </p>
              <p>
                <strong>Automatic Splicing:</strong> When bar length exceeds stock length (default
                12m)
              </p>
              <p>
                <strong>Splice Efficiency:</strong> 100% for tension, 125% for compression splices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional BBS Best Practices */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">
            5
          </span>
          Professional BBS Best Practices
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                1. Pre-Construction Planning
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Complete BBS before concrete pouring</li>
                <li>• Verify all structural drawings</li>
                <li>• Cross-check with design calculations</li>
                <li>• Include appropriate cover requirements</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                2. Standardization
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Use standard bar diameters (8, 10, 12, 16, 20, 25, 32mm)</li>
                <li>• Standardize hook types and lengths</li>
                <li>• Maintain consistent cover specifications</li>
                <li>• Follow local building code requirements</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                3. Quality Control
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Double-check all calculations</li>
                <li>• Include wastage factors (3-5%)</li>
                <li>• Verify bar placement and spacing</li>
                <li>• Document all assumptions and standards used</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200/20 p-4 dark:border-slate-700/20">
              <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
                4. Documentation
              </h4>
              <ul className="text-sm text-body dark:text-body-dark space-y-1">
                <li>• Include detailed bar bending diagrams</li>
                <li>• Specify concrete cover clearly</li>
                <li>• Note special fabrication requirements</li>
                <li>• Keep records for future reference</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes in BBS */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            6
          </span>
          Common Mistakes to Avoid in BBS Preparation
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Incorrect Hook Lengths
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Using wrong hook multipliers (90°≠135°) or forgetting to include hooks in total length
              calculations.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Missing Development Length
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Forgetting to add development lengths at beam-column junctions and support locations.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Wrong Lap Calculations
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Not accounting for lap splices when bars exceed stock length or incorrect lap length
              calculations.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Ignoring Wastage Factors
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Not including cutting waste, bending waste, and transportation damage in quantity
              calculations.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Incorrect Cover Specifications
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Using wrong concrete cover values, leading to incorrect cutting lengths and
              positioning errors.
            </p>
          </div>
          <div className="rounded-lg border border-red-200/40 bg-red-50 p-4 dark:border-red-700/30 dark:bg-red-900/40">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Bar Shape Misinterpretation
            </h4>
            <p className="text-sm text-red-900 dark:text-red-100">
              Incorrect interpretation of bar bending shapes from structural drawings or wrong bend
              angles.
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive FAQ */}
      <div className="rounded-2xl border border-slate-200/40 bg-white/70 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
        <h3 className="text-xl font-bold text-heading dark:text-heading-dark mb-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm">
            7
          </span>
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q1. What is the difference between BBS and cutting length?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              BBS (Bar Bending Schedule) is a comprehensive document that includes cutting lengths,
              bending details, bar marks, quantities, and weights for all reinforcement bars.
              Cutting length is just the straight length of bar required before bending. BBS
              encompasses much more information including hook lengths, bend allowances, and
              fabrication details.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q2. How do I choose between different design codes (NBC, IS, ACI)?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Choose the design code based on your project location and local regulatory
              requirements. NBC 205 is mandatory for Nepal, IS 456 for India, and ACI 318 for
              USA/Canada. The codes have different requirements for development lengths, lap
              splices, and hook details. Always consult with local authorities and structural
              engineers for final code selection.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q3. What is the typical wastage factor for reinforcement steel?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Typical wastage factors range from 3-5% depending on project complexity. This includes
              cutting waste (1-2%), bending waste (1%), transportation damage (0.5-1%), and
              miscellaneous losses. Complex projects with many bends may require higher wastage
              factors (5-7%). Always include wastage in your BBS calculations to avoid material
              shortages.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q4. How are lap splices calculated in BBS?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Lap splices are calculated when bar length exceeds stock length (typically 12m). Lap
              length = max(40d, 300mm) for NBC, where d is bar diameter. The calculator
              automatically adds lap lengths when required. For manual calculations, add lap length
              to the cutting length and divide the total required length by stock length to
              determine number of splices needed.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q5. What are the standard hook lengths for different angles?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              <ul className="space-y-2">
                <li>
                  <strong>NBC 205:</strong> 90°=9d, 135°=12d, 180°=16d
                </li>
                <li>
                  <strong>IS 456:</strong> 90°=4d, 135°=6d, 180°=8d
                </li>
                <li>
                  <strong>ACI 318:</strong> All angles=12d
                </li>
              </ul>
              Where d = bar diameter. Hook lengths are added to the total bar length for accurate
              quantity calculations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q6. How do I handle bars that require special bending?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              For special bending requirements, use the &quot;remarks&quot; field to specify exact
              bending details. Common special bends include J-hooks, U-bends, helical reinforcement,
              and custom crank shapes. Always provide detailed sketches or refer to standard bend
              shapes. Include bend allowances in your length calculations - typically 2d for 90°
              bends and 3d for 135° bends.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q7. What is the difference between main bars and distribution bars?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Main bars carry the primary structural loads (bending moments, shear forces) and are
              usually placed in the direction of the span. Distribution bars (also called
              temperature bars) control cracking due to temperature changes and shrinkage. They are
              typically smaller diameter (8-10mm) and spaced at regular intervals (typically
              200-300mm) perpendicular to main bars.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/50 p-4 dark:border-slate-700/50">
            <h4 className="font-semibold text-heading dark:text-heading-dark mb-2">
              Q8. How do I calculate concrete cover in BBS?
            </h4>
            <p className="text-sm text-body/80 dark:text-body-dark/80">
              Concrete cover is the distance from the outer surface of concrete to the nearest
              reinforcement bar. Standard covers are: 25mm for beams/slabs (NBC), 40mm for columns,
              50mm for footings. Cover affects cutting length calculations - you must account for
              cover when calculating clear spans. For example, if clear span is 4.5m and cover is
              25mm on both ends, you add 50mm to the cutting length.
            </p>
          </div>
        </div>
      </div>

      {/* Summary CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
        <h3 className="text-xl font-bold mb-3">Start Your BBS Calculation Now</h3>
        <p className="mb-4 text-white/90">
          Use the calculator above to generate accurate Bar Bending Schedules for your reinforced
          concrete structures. With precise BBS calculations, you will optimize steel usage, reduce
          construction costs, and ensure structural safety. Perfect for structural engineers,
          contractors, and construction professionals.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Automated BBS Generation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Steel Quantity Optimization</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Cost Estimation</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Structural Compliance</span>
          <span className="rounded-full bg-white/20 px-3 py-1">✓ Free to Use</span>
        </div>
      </div>
    </div>
  )
}
