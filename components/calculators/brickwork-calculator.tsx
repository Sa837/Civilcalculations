'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Info,
  Plus,
  Trash2,
} from 'lucide-react'
import {
  BrickworkCalculator as BrickworkCalculatorLib,
  STANDARD_BRICK_SIZES,
  MORTAR_MIX_TYPES,
} from '@/lib/registry/calculator/brickwork-calculator'
import { UnitConverter, UNIT_PRESETS } from '@/lib/registry/globalunits'
import { BRICKWORK_INFO_SECTION } from '@/lib/registry/calculator/enhanced-info-section/brickwork-info-section'
// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface BrickworkResult {
  numberOfBricks: number
  cementWeight: number
  cementBags: number
  sandWeight: number
  mortarVolume: number
  wallVolume: number
  netWallVolume: number
  totalOpeningVolume: number
}

interface Opening {
  id: string
  name: string
  width: string
  height: string
  unit: 'm' | 'ft'
}

interface BrickworkFormData {
  wallLength: string
  wallHeight: string
  wallThickness: string
  wallThicknessType: 'custom' | '4inch' | '9inch'
  brickLength: string
  brickWidth: string
  brickHeight: string
  mortarThickness: string
  mortarMixType: string
  wastageFactor: string
  unit: 'm' | 'ft'
  showStepByStep: boolean
  area?: string
  openings: Opening[]
  brickSizeType: 'standard' | 'custom'
  standardBrickSize: string
  customBrickInput: string
}

interface BrickworkCalculatorProps {
  globalUnit?: 'm' | 'ft'
}

// =============================================================================
// DATA CONFIGURATION
// =============================================================================

const BENEFIT_CARDS = [
  {
    title: 'Cost Control',
    color: 'green',
    content:
      'Over-ordering wastes 10-15% of material costs, while under-ordering causes project delays and additional delivery charges. Accurate calculations save 8-12% on total masonry budgets.',
  },
  {
    title: 'Project Planning',
    color: 'blue',
    content:
      'Knowing exact quantities helps schedule deliveries, manage storage space, and coordinate labor efficiently. Proper planning reduces construction time by 15-20%.',
  },
  {
    title: 'Quality Assurance',
    color: 'amber',
    content:
      'Consistent mortar mix ratios and proper brick placement ensure structural strength. Standardized calculations maintain quality across all wall sections.',
  },
  {
    title: 'Environmental Impact',
    color: 'purple',
    content:
      'Precise calculations minimize construction waste. Brick manufacturing produces 0.8-1.0 kg CO₂ per brick—reducing waste directly lowers environmental impact.',
  },
]

const BRICK_TYPES = [
  {
    type: 'Standard Modular',
    dim: '190 × 90 × 90',
    use: 'General construction',
    props: 'Uniform size, easy to handle',
  },
  {
    type: 'Traditional/Non-Modular',
    dim: '230 × 110 × 75',
    use: 'Traditional buildings',
    props: 'Varied sizes, rustic appearance',
  },
  {
    type: 'Facing Bricks',
    dim: '215 × 102.5 × 65',
    use: 'Exterior walls',
    props: 'Aesthetic finish, weather-resistant',
  },
  {
    type: 'Engineering Bricks',
    dim: '215 × 102.5 × 65',
    use: 'Structural work',
    props: 'High strength, low water absorption',
  },
  {
    type: 'Concrete Bricks',
    dim: '200 × 100 × 100',
    use: 'Load-bearing walls',
    props: 'High compressive strength',
  },
  {
    type: 'Fly Ash Bricks',
    dim: '230 × 110 × 75',
    use: 'Eco-friendly projects',
    props: 'Lightweight, thermal insulation',
  },
  {
    type: 'Fire Bricks',
    dim: '230 × 115 × 75',
    use: 'Fireplaces, furnaces',
    props: 'High heat resistance',
  },
  {
    type: 'Hollow Bricks',
    dim: '400 × 200 × 200',
    use: 'Non-load bearing',
    props: 'Lightweight, sound insulation',
  },
]

const WALL_THICKNESS_CARDS = [
  {
    emoji: '🧱',
    title: '4-Inch Wall (Half Brick)',
    subtitle: '102-115mm thickness',
    features: [
      'Interior partitions',
      'Non-load bearing walls',
      'Cladding over RCC',
      'Cost-effective option',
    ],
    gradient: 'from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700',
    border: 'border-slate-200 dark:border-slate-600',
  },
  {
    emoji: '🏗️',
    title: '9-Inch Wall (One Brick)',
    subtitle: '215-230mm thickness',
    features: ['Load-bearing walls', 'Exterior walls', 'Structural columns', 'Two-story buildings'],
    gradient: 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30',
    border: 'border-amber-200 dark:border-amber-700',
  },
  {
    emoji: '🏢',
    title: '13.5-Inch Wall (1.5 Brick)',
    subtitle: '330-345mm thickness',
    features: [
      'Heavy load-bearing',
      'Multi-story buildings',
      'Retaining walls',
      'Foundation walls',
    ],
    gradient: 'from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30',
    border: 'border-rose-200 dark:border-rose-700',
  },
]

const MORTAR_RATIOS = [
  {
    ratio: '1:6',
    label: 'Low Strength',
    color: 'green',
    application:
      'Non-load bearing interior walls, garden walls, boundary walls, temporary structures.',
    strength: '3-4 MPa compressive strength.',
    cement: '~190 kg per m³ of mortar.',
    bestFor: 'Cost-effective projects where high strength is not required.',
  },
  {
    ratio: '1:5',
    label: 'Standard',
    color: 'blue',
    application:
      'General purpose masonry, standard exterior walls, single-story residential buildings.',
    strength: '5-6 MPa compressive strength.',
    cement: '~220 kg per m³ of mortar.',
    bestFor: 'Most residential construction projects.',
  },
  {
    ratio: '1:4',
    label: 'High Strength',
    color: 'amber',
    application: 'Load-bearing walls, structural columns, beams, multi-story buildings.',
    strength: '7-8 MPa compressive strength.',
    cement: '~270 kg per m³ of mortar.',
    bestFor: 'Commercial buildings and structural elements.',
  },
  {
    ratio: '1:3',
    label: 'Very High Strength',
    color: 'rose',
    application:
      'Heavy load-bearing structures, foundation walls, retaining walls, high-rise buildings.',
    strength: '10-12 MPa compressive strength.',
    cement: '~340 kg per m³ of mortar.',
    bestFor: 'Critical structural applications requiring maximum strength.',
  },
]

const BEST_PRACTICES = [
  {
    title: 'Soak Bricks Before Use',
    content:
      'Immerse bricks in water for 2-4 hours before laying. Dry bricks absorb water from mortar too quickly, weakening the bond strength by up to 40%.',
  },
  {
    title: 'Use Gauge Rods',
    content:
      'Set up gauge rods at corners showing course heights. Standard brick + mortar height is 75mm. This ensures level courses throughout the wall.',
  },
  {
    title: 'Maintain Consistent Joints',
    content:
      'Keep horizontal joints 10-12mm and vertical joints 10mm. Use joint spacers or a wooden batten cut to mortar thickness for consistency.',
  },
  {
    title: 'Proper Bond Patterns',
    content:
      'Use English bond for maximum strength in structural walls. Stretcher bond works for half-brick walls. Flemish bond provides good aesthetics and strength.',
  },
  {
    title: 'Curing is Critical',
    content:
      'Keep masonry damp for 7 days after construction. Proper curing increases strength by 50% and prevents cracks from shrinkage.',
  },
  {
    title: 'Check Alignment Frequently',
    content:
      'Use spirit levels every 3-4 courses. Check both faces of the wall. A 1mm error per course becomes 20mm in a 3-meter wall.',
  },
]

const COMMON_MISTAKES = [
  {
    title: 'Incorrect Mortar Consistency',
    content:
      "Too wet mortar causes bricks to float and weakens bond. Too dry mortar doesn't adhere properly. Aim for butter-like consistency that holds its shape.",
  },
  {
    title: 'Skipping DPC (Damp Proof Course)',
    content:
      'A DPC at 150mm above ground level prevents rising damp. Without it, moisture damages walls and interior finishes. Use 20mm cement mortar or bitumen felt.',
  },
  {
    title: 'Poor Bonding at Intersections',
    content:
      'Intersecting walls need proper bonding with quoin bricks. Metal ties every 4-6 courses strengthen junctions and prevent cracking.',
  },
  {
    title: 'Inadequate Curing',
    content:
      'Skipping the 7-day curing period reduces mortar strength by 40-50%. Keep walls covered with wet sacks and sprinkle water twice daily.',
  },
  {
    title: 'Wrong Mortar for the Job',
    content:
      'Using 1:6 mix for load-bearing walls compromises structural safety. Match mortar strength to wall function and building height.',
  },
  {
    title: 'Ignoring Thermal Expansion',
    content:
      'Walls over 12 meters need expansion joints every 8-10 meters. Without them, temperature changes cause cracking and structural damage.',
  },
]

const FAQS = [
  {
    q: 'How many bricks are needed per square meter of wall?',
    a: 'For a standard half-brick wall (102mm thick) using 215×102.5×65mm bricks with 10mm joints, you need approximately 60 bricks per m². For a one-brick wall (215mm thick), you need approximately 120 bricks per m². Always add 5-10% for wastage.',
  },
  {
    q: 'How much cement and sand do I need for 1000 bricks?',
    a: 'For 1000 bricks using 1:5 mortar mix: you need approximately 210-230 kg of cement (4-5 bags of 50kg) and 1.05-1.15 cubic meters of sand. For 1:4 mix, increase cement to 260-280 kg and reduce sand to 0.9-1.0 cubic meters.',
  },
  {
    q: 'What is the standard mortar thickness for brickwork?',
    a: 'Standard mortar joint thickness is 10mm (3/8 inch) for both horizontal (bed) joints and vertical (perpend) joints. This provides adequate strength while allowing for minor brick size variations. For lightweight blocks, 8-12mm is common.',
  },
  {
    q: 'How do I calculate bricks for a wall with doors and windows?',
    a: 'Calculate the gross wall area (length × height), then subtract the area of all openings (door width × height, window width × height). Multiply net area by bricks per m² for your wall thickness. This calculator automates this process with precise volume calculations.',
  },
  {
    q: 'Why is 33% added to mortar volume calculations?',
    a: 'The 1.33 factor (33% increase) converts wet mortar volume to dry material volume. When mixed with water, sand and cement compact and fill voids. This bulking factor ensures you order enough dry materials to produce the required wet mortar volume.',
  },
  {
    q: 'What is the difference between nominal and actual brick size?',
    a: 'Actual brick size is the physical dimension of the brick itself. Nominal size includes the mortar joint (typically +10mm on each dimension). For example, a 190×90×90mm actual brick has a 200×100×100mm nominal size with 10mm joints.',
  },
  {
    q: 'How many bricks are in 1 cubic meter?',
    a: 'For standard Indian modular bricks (190×90×90mm) with 10mm mortar: approximately 500 bricks per m³ of brickwork. For traditional bricks (230×110×75mm): approximately 350-400 bricks per m³. This varies based on mortar thickness and brick dimensions.',
  },
  {
    q: 'What is the cost estimate for brick wall construction per m²?',
    a: 'In India (2024): Half-brick wall costs ₹800-1200 per m², one-brick wall costs ₹1600-2200 per m² including materials and labor. In the US: $15-25 per sq ft for materials only. Prices vary by location, brick type, and mortar mix ratio used.',
  },
  {
    q: 'Can I use the same mortar mix for all types of brickwork?',
    a: 'No. Load-bearing walls need stronger mortar (1:4 or 1:3) than non-load bearing walls (1:6). Below-grade work needs 1:3 or 1:4 for moisture resistance. Always match mortar strength to structural requirements and exposure conditions.',
  },
  {
    q: 'How long should I wait before loading a new brick wall?',
    a: 'Allow 14-28 days for mortar to reach sufficient strength before applying heavy loads. Concrete block walls need 28 days minimum. Keep walls supported during this curing period and protect from vibration and impact.',
  },
]

const STEP_COLORS = [
  {
    border: 'border-blue-500',
    bg: 'bg-blue-500',
    text: 'text-blue-900 dark:text-blue-100',
    desc: 'text-blue-800/80 dark:text-blue-200/80',
  },
  {
    border: 'border-amber-500',
    bg: 'bg-amber-500',
    text: 'text-amber-900 dark:text-amber-100',
    desc: 'text-amber-800/80 dark:text-amber-200/80',
  },
  {
    border: 'border-green-500',
    bg: 'bg-green-500',
    text: 'text-green-900 dark:text-green-100',
    desc: 'text-green-800/80 dark:text-green-200/80',
  },
  {
    border: 'border-purple-500',
    bg: 'bg-purple-500',
    text: 'text-purple-900 dark:text-purple-100',
    desc: 'text-purple-800/80 dark:text-purple-200/80',
  },
  {
    border: 'border-indigo-500',
    bg: 'bg-indigo-500',
    text: 'text-indigo-900 dark:text-indigo-100',
    desc: 'text-indigo-800/80 dark:text-indigo-200/80',
  },
  {
    border: 'border-cyan-500',
    bg: 'bg-cyan-500',
    text: 'text-cyan-900 dark:text-cyan-100',
    desc: 'text-cyan-800/80 dark:text-cyan-200/80',
  },
  {
    border: 'border-rose-500',
    bg: 'bg-rose-500',
    text: 'text-rose-900 dark:text-rose-100',
    desc: 'text-rose-800/80 dark:text-rose-200/80',
  },
  {
    border: 'border-yellow-500',
    bg: 'bg-yellow-500',
    text: 'text-yellow-900 dark:text-yellow-100',
    desc: 'text-yellow-800/80 dark:text-yellow-200/80',
  },
]

// =============================================================================
// REUSABLE UI COMPONENTS
// =============================================================================

const SectionHeader = ({ number, title }: { number: number; title: string }) => (
  <h3 className="text-lg sm:text-xl font-bold text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs sm:text-sm font-bold">
      {number}
    </span>
    <span className="leading-tight">{title}</span>
  </h3>
)

const InfoCard = ({
  title,
  color,
  children,
}: {
  title: string
  color: string
  children: React.ReactNode
}) => {
  const styles: Record<string, string> = {
    green: 'bg-green-50/50 dark:bg-green-900/20 border-green-200/30 dark:border-green-700/30',
    blue: 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-200/30 dark:border-blue-700/30',
    amber: 'bg-amber-50/50 dark:bg-amber-900/20 border-amber-200/30 dark:border-amber-700/30',
    purple: 'bg-purple-50/50 dark:bg-purple-900/20 border-purple-200/30 dark:border-purple-700/30',
    red: 'bg-red-50/50 dark:bg-red-900/20 border-red-200/30 dark:border-red-700/30',
    rose: 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-200/30 dark:border-rose-700/30',
    cyan: 'bg-cyan-50/50 dark:bg-cyan-900/20 border-cyan-200/30 dark:border-cyan-700/30',
    indigo: 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200/30 dark:border-indigo-700/30',
  }
  const textColors: Record<string, string> = {
    green: 'text-green-800 dark:text-green-200',
    blue: 'text-blue-800 dark:text-blue-200',
    amber: 'text-amber-800 dark:text-amber-200',
    purple: 'text-purple-800 dark:text-purple-200',
    red: 'text-red-800 dark:text-red-200',
    rose: 'text-rose-800 dark:text-rose-200',
    cyan: 'text-cyan-800 dark:text-cyan-200',
    indigo: 'text-indigo-800 dark:text-indigo-200',
  }
  return (
    <div className={`rounded-lg p-3 sm:p-4 border ${styles[color] || styles.blue}`}>
      <h4
        className={`font-semibold ${textColors[color] || textColors.blue} mb-1 sm:mb-2 text-sm sm:text-base`}
      >
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-body/80 dark:text-body-dark/80">{children}</p>
    </div>
  )
}

const WallThicknessCard = ({
  emoji,
  title,
  subtitle,
  features,
  gradient,
  border,
}: {
  emoji: string
  title: string
  subtitle: string
  features: string[]
  gradient: string
  border: string
}) => (
  <div className={`rounded-xl bg-gradient-to-br ${gradient} p-4 sm:p-5 border ${border}`}>
    <div className="mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-white/50 dark:bg-black/20">
      <span className="text-xl sm:text-2xl">{emoji}</span>
    </div>
    <h4 className="font-bold text-heading dark:text-heading-dark mb-1 text-sm sm:text-base">
      {title}
    </h4>
    <p className="text-xs text-body/70 dark:text-body-dark/70 mb-2 sm:mb-3">{subtitle}</p>
    <ul className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-body/80 dark:text-body-dark/80">
      {features.map((f, i) => (
        <li key={i}>• {f}</li>
      ))}
    </ul>
  </div>
)

const MortarRatioCard = ({
  ratio,
  label,
  color,
  application,
  strength,
  cement,
  bestFor,
}: {
  ratio: string
  label: string
  color: string
  application: string
  strength: string
  cement: string
  bestFor: string
}) => {
  const borderColors: Record<string, string> = {
    green: 'border-green-500',
    blue: 'border-blue-500',
    amber: 'border-amber-500',
    rose: 'border-rose-500',
  }
  const textColors: Record<string, string> = {
    green: 'text-green-800 dark:text-green-200',
    blue: 'text-blue-800 dark:text-blue-200',
    amber: 'text-amber-800 dark:text-amber-200',
    rose: 'text-rose-800 dark:text-rose-200',
  }
  return (
    <div
      className={`rounded-lg border-l-4 ${borderColors[color]} bg-white/50 dark:bg-slate-800/50 p-3 sm:p-4`}
    >
      <h4 className={`font-bold ${textColors[color]} text-sm sm:text-base`}>
        {ratio} Mix Ratio ({label})
      </h4>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-body/80 dark:text-body-dark/80">
        <strong>Application:</strong> {application}
        <br />
        <strong>Strength:</strong> {strength}
        <br />
        <strong>Cement needed:</strong> {cement}
        <br />
        <strong>Best for:</strong> {bestFor}
      </p>
    </div>
  )
}

const BestPracticeItem = ({
  number,
  title,
  content,
}: {
  number: number
  title: string
  content: string
}) => (
  <div className="flex gap-2 sm:gap-3">
    <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
      {number}
    </div>
    <div>
      <h5 className="font-semibold text-heading dark:text-heading-dark text-sm sm:text-base">
        {title}
      </h5>
      <p className="text-xs sm:text-sm text-body/70 dark:text-body-dark/70">{content}</p>
    </div>
  </div>
)

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="rounded-lg border border-slate-200/50 dark:border-slate-700/50 p-3 sm:p-4">
    <h4 className="font-semibold text-heading dark:text-heading-dark mb-1 sm:mb-2 text-sm sm:text-base">
      {question}
    </h4>
    <p className="text-xs sm:text-sm text-body/80 dark:text-body-dark/80">{answer}</p>
  </div>
)

const StepCard = ({
  stepNumber,
  title,
  children,
  description,
  colorIndex,
}: {
  stepNumber: number | string
  title: string
  children: React.ReactNode
  description?: string
  colorIndex: number
}) => {
  const color = STEP_COLORS[colorIndex % STEP_COLORS.length]
  return (
    <div
      className={`rounded-lg bg-white/60 dark:bg-slate-800/60 border-l-4 ${color.border} p-3 sm:p-4`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div
          className={`flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full ${color.bg} text-white font-bold text-xs sm:text-sm`}
        >
          {stepNumber}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${color.text} mb-1 sm:mb-2 text-sm sm:text-base`}>
            {title}
          </h4>
          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-1 sm:mb-2 font-mono text-xs sm:text-sm break-all overflow-x-auto">
            {children}
          </div>
          {description && <p className={`text-xs sm:text-sm ${color.desc}`}>{description}</p>}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// SVG COMPONENT
// =============================================================================

const BrickworkSVG = ({ formData }: { formData: BrickworkFormData }) => {
  return (
    <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl">
      <h3 className="font-medium text-heading dark:text-heading-dark mb-2 sm:mb-3 text-center text-sm sm:text-base">
        Wall Diagram
      </h3>
      <svg
        width="300"
        height="200"
        className="border dark:border-slate-600 rounded-lg bg-white mx-auto max-w-full h-auto"
        viewBox="0 0 300 200"
      >
        <rect
          x="50"
          y="50"
          width="200"
          height="100"
          fill="#AA4A44"
          stroke="#b94238ff"
          strokeWidth="2"
        />
        <g fill="none" stroke="#544a49ff" strokeWidth="1">
          {[60, 70, 80, 90, 100, 110, 120, 130, 140].map((y) => (
            <line key={`h-${y}`} x1="50" y1={y} x2="250" y2={y} />
          ))}
          {[60, 80, 100, 120, 140, 160, 180, 200, 220, 240].map((x) => (
            <line key={`v-${x}`} x1={x} y1="50" x2={x} y2="150" />
          ))}
        </g>
        {formData.openings.map((opening, index) => {
          const x = 70 + index * 40,
            y = 75,
            width = 30,
            height = 50
          return (
            <g key={opening.id}>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#87CEEB"
                stroke="#4682B4"
                strokeWidth="1.5"
                opacity="0.8"
              />
              <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fill="#2F4F4F"
                fontWeight="bold"
              >
                {opening.name}
              </text>
            </g>
          )
        })}
        <g fontSize="10" fill="#666" textAnchor="middle">
          <line x1="50" y1="160" x2="250" y2="160" stroke="#666" strokeWidth="1" />
          <text x="150" y="175" fontWeight="bold" fontSize="12">
            {formData.wallLength || '0'} {formData.unit}
          </text>
          <line x1="260" y1="50" x2="260" y2="150" stroke="#666" strokeWidth="1" />
          <text
            x="275"
            y="100"
            writingMode="vertical"
            fontWeight="bold"
            fontSize="12"
            transform="rotate(90, 275, 100)"
          >
            {formData.wallHeight || '0'} {formData.unit}
          </text>
        </g>
        <g>
          <line x1="40" y1="50" x2="40" y2="150" stroke="#8b1313ff" strokeWidth="3" />
          <text
            x="35"
            y="100"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#8b1313ff"
            transform="rotate(-90, 35, 100)"
          >
            {formData.wallThickness || '0'} {formData.unit}
          </text>
        </g>
        <text
          x="150"
          y="30"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="16"
          fontWeight="bold"
          fill="#333"
        >
          Brick Wall
        </text>
      </svg>
      <div className="mt-2 text-xs text-center text-slate-600 dark:text-slate-300">
        Dimensions: {formData.wallLength || '0'} × {formData.wallHeight || '0'} {formData.unit}
        {formData.openings.length > 0 &&
          ` • ${formData.openings.length} opening${formData.openings.length !== 1 ? 's' : ''}`}
      </div>
    </div>
  )
}

// Memoized InputField component
const InputField = memo(
  ({
    label,
    value,
    onChange,
    error,
    type = 'text',
    min = '0',
    unit,
    isLength = false,
    currentUnit,
    placeholder,
  }: {
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    type?: 'number' | 'text'
    min?: string
    unit?: string
    isLength?: boolean
    currentUnit?: 'm' | 'ft'
    placeholder?: string
  }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '' || /^-?\d*\.?\d*$/.test(e.target.value)) {
        onChange(e.target.value)
      }
    }

    return (
      <div>
        <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
          {label}
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={handleChange}
            min={min}
            placeholder={placeholder}
            className={`w-full rounded-xl border px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              error
                ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
            }`}
          />
          {unit && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
              {unit}
            </div>
          )}
        </div>
        {currentUnit === 'ft' && isLength && value && (
          <p className="mt-1 text-xs text-body/60 dark:text-body-dark/60">
            {parseFloat(value)} ft ({(parseFloat(value) * 0.3048).toFixed(3)} m)
          </p>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.p>
        )}
      </div>
    )
  },
)

InputField.displayName = 'InputField'

export default function BrickworkCalculator({ globalUnit = 'm' }: BrickworkCalculatorProps) {
  const [useArea, setUseArea] = useState(false)
  const [formData, setFormData] = useState<BrickworkFormData>({
    wallLength: '',
    wallHeight: '',
    wallThickness: '',
    wallThicknessType: 'custom',
    brickLength: '240',
    brickWidth: '115',
    brickHeight: '57',
    mortarThickness: '10',
    mortarMixType: '1:5',
    wastageFactor: '5',
    unit: globalUnit,
    showStepByStep: false,
    area: '',
    openings: [],
    brickSizeType: 'standard',
    standardBrickSize: '240x115x57',
    customBrickInput: '',
  })

  const [result, setResult] = useState<BrickworkResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)

  const parseCustomBrickInput = useCallback((input: string) => {
    const normalized = input.replace(/\*/g, 'x')
    const parts = normalized.split('x').map((p) => p.trim())

    if (parts.length === 3) {
      const [length, width, height] = parts
      if (
        length &&
        width &&
        height &&
        !isNaN(Number(length)) &&
        !isNaN(Number(width)) &&
        !isNaN(Number(height))
      ) {
        return { length, width, height, isValid: true }
      }
    }
    return { length: '', width: '', height: '', isValid: false }
  }, [])

  const handleWallThicknessTypeChange = useCallback((type: 'custom' | '4inch' | '9inch') => {
    setFormData((prev) => {
      const presets = UNIT_PRESETS.brickwork[prev.unit === 'm' ? 'metric' : 'imperial']
      let thickness = prev.wallThickness

      if (type === '4inch') {
        thickness = presets.defaultWallThickness
      } else if (type === '9inch') {
        thickness = prev.unit === 'm' ? '0.229' : '0.75'
      }

      return {
        ...prev,
        wallThicknessType: type,
        wallThickness: thickness,
      }
    })
  }, [])

  // Enhanced unit conversion using the new universal system
  useEffect(() => {
    setFormData((prev) => {
      if (prev.unit === globalUnit) return prev

      const newUnitSystem = globalUnit === 'm' ? 'metric' : 'imperial'
      const oldUnitSystem = prev.unit === 'm' ? 'metric' : 'imperial'

      const newFormData = { ...prev, unit: globalUnit }

      // Get presets for the new unit system
      const newPresets = UNIT_PRESETS.brickwork[newUnitSystem]
      const oldPresets = UNIT_PRESETS.brickwork[oldUnitSystem]

      // Convert wall dimensions
      if (prev.wallLength) {
        newFormData.wallLength = UnitConverter.convertLength(
          parseFloat(prev.wallLength),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      if (prev.wallHeight) {
        newFormData.wallHeight = UnitConverter.convertLength(
          parseFloat(prev.wallHeight),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      // Convert wall thickness with type preservation
      if (prev.wallThicknessType === '4inch') {
        newFormData.wallThickness = newPresets.defaultWallThickness
      } else if (prev.wallThicknessType === '9inch') {
        newFormData.wallThickness = newUnitSystem === 'metric' ? '0.229' : '0.75'
      } else if (prev.wallThickness) {
        newFormData.wallThickness = UnitConverter.convertLength(
          parseFloat(prev.wallThickness),
          oldPresets.length,
          newPresets.length,
        ).toFixed(3)
      }

      // Convert brick dimensions
      if (prev.brickLength) {
        newFormData.brickLength = UnitConverter.convertBrickDimension(
          parseFloat(prev.brickLength),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(2)
      }

      if (prev.brickWidth) {
        newFormData.brickWidth = UnitConverter.convertBrickDimension(
          parseFloat(prev.brickWidth),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(2)
      }

      if (prev.brickHeight) {
        newFormData.brickHeight = UnitConverter.convertBrickDimension(
          parseFloat(prev.brickHeight),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(2)
      }

      // Convert mortar thickness
      if (prev.mortarThickness) {
        newFormData.mortarThickness = UnitConverter.convertBrickDimension(
          parseFloat(prev.mortarThickness),
          oldPresets.brick as 'mm' | 'in',
          newPresets.brick as 'mm' | 'in',
        ).toFixed(3)
      } else {
        newFormData.mortarThickness = newPresets.defaultMortarThickness
      }

      // Convert area if present
      if (prev.area) {
        newFormData.area = UnitConverter.convertArea(
          parseFloat(prev.area),
          oldPresets.area,
          newPresets.area,
        ).toFixed(3)
      }

      // Convert openings
      newFormData.openings = prev.openings.map((opening) => ({
        ...opening,
        width: opening.width
          ? UnitConverter.convertLength(
              parseFloat(opening.width),
              opening.unit === 'm' ? 'm' : 'ft',
              newPresets.length,
            ).toFixed(3)
          : opening.width,
        height: opening.height
          ? UnitConverter.convertLength(
              parseFloat(opening.height),
              opening.unit === 'm' ? 'm' : 'ft',
              newPresets.length,
            ).toFixed(3)
          : opening.height,
        unit: globalUnit,
      }))

      return newFormData
    })
  }, [globalUnit])

  // Enhanced brick size change handler using the new system
  const handleBrickSizeChange = useCallback(
    (type: 'standard' | 'custom', value: string) => {
      if (type === 'standard') {
        const selectedBrick = STANDARD_BRICK_SIZES.find((brick) => brick.value === value)
        if (selectedBrick) {
          setFormData((prev) => {
            const unitSystem = prev.unit === 'm' ? 'metric' : 'imperial'
            const targetUnit = unitSystem === 'metric' ? 'mm' : 'in'

            // Convert standard brick dimensions to target unit system
            const brickLength = UnitConverter.convertBrickDimension(
              selectedBrick.length,
              'mm',
              targetUnit as 'mm' | 'in',
            ).toFixed(2)

            const brickWidth = UnitConverter.convertBrickDimension(
              selectedBrick.width,
              'mm',
              targetUnit as 'mm' | 'in',
            ).toFixed(2)

            const brickHeight = UnitConverter.convertBrickDimension(
              selectedBrick.height,
              'mm',
              targetUnit as 'mm' | 'in',
            ).toFixed(2)

            return {
              ...prev,
              brickSizeType: 'standard',
              standardBrickSize: value,
              brickLength,
              brickWidth,
              brickHeight,
              customBrickInput: '',
            }
          })
        }
      } else {
        const parsed = parseCustomBrickInput(value)
        setFormData((prev) => ({
          ...prev,
          brickSizeType: 'custom',
          customBrickInput: value,
          brickLength: parsed.length || '',
          brickWidth: parsed.width || '',
          brickHeight: parsed.height || '',
          standardBrickSize: '',
        }))
      }
    },
    [parseCustomBrickInput],
  )

  const addOpening = useCallback(() => {
    const newOpening: Opening = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Opening ${formData.openings.length + 1}`,
      width: '',
      height: '',
      unit: formData.unit,
    }
    setFormData((prev) => ({
      ...prev,
      openings: [...prev.openings, newOpening],
    }))
  }, [formData.openings.length, formData.unit])

  const removeOpening = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      openings: prev.openings.filter((opening) => opening.id !== id),
    }))
  }, [])

  const updateOpening = useCallback((id: string, field: keyof Opening, value: string) => {
    setFormData((prev) => ({
      ...prev,
      openings: prev.openings.map((opening) =>
        opening.id === id ? { ...opening, [field]: value } : opening,
      ),
    }))
  }, [])

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    // Define validation fields based on input mode
    const requiredFields = useArea
      ? [
          { key: 'area', name: 'Wall area' },
          { key: 'wallThickness', name: 'Wall thickness' },
        ]
      : [
          { key: 'wallLength', name: 'Wall length' },
          { key: 'wallHeight', name: 'Wall height' },
          { key: 'wallThickness', name: 'Wall thickness' },
        ]

    const brickFields = [
      { key: 'brickLength', name: 'Brick length' },
      { key: 'brickWidth', name: 'Brick width' },
      { key: 'brickHeight', name: 'Brick height' },
      { key: 'mortarThickness', name: 'Mortar thickness' },
      { key: 'wastageFactor', name: 'Wastage factor' },
    ] as const

    // Validate required and brick fields
    ;[...requiredFields, ...brickFields].forEach(({ key, name }) => {
      const value = formData[key as keyof BrickworkFormData] as string
      if (!value || value.trim() === '' || parseFloat(value) <= 0) {
        newErrors[key] = `${name} must be greater than 0`
      }
    })

    // Validate openings
    formData.openings.forEach((opening, index) => {
      if (opening.width && parseFloat(opening.width) <= 0) {
        newErrors[`openingWidth_${opening.id}`] =
          `Opening ${index + 1} width must be greater than 0`
      }
      if (opening.height && parseFloat(opening.height) <= 0) {
        newErrors[`openingHeight_${opening.id}`] =
          `Opening ${index + 1} height must be greater than 0`
      }
    })

    // Specific validation for wastage factor
    if (formData.wastageFactor) {
      const wastageValue = parseFloat(formData.wastageFactor)
      if (wastageValue < 0 || wastageValue > 30) {
        newErrors.wastageFactor = 'Wastage factor must be between 0% and 30%'
      }
    }

    // Validate custom brick input
    if (formData.brickSizeType === 'custom' && formData.customBrickInput) {
      const parsed = parseCustomBrickInput(formData.customBrickInput)
      if (!parsed.isValid) {
        newErrors.customBrickInput = `Enter format like: 240x110x76 or 240*110*76 (in ${formData.unit === 'm' ? 'mm' : 'inches'})`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, parseCustomBrickInput, useArea])

  // Enhanced calculation using the new BrickworkCalculator class
  const calculateBrickwork = useCallback(async () => {
    if (!validateForm()) return

    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const input = {
        wallLength: formData.wallLength ? parseFloat(formData.wallLength) : undefined,
        wallHeight: formData.wallHeight ? parseFloat(formData.wallHeight) : undefined,
        wallArea: formData.area ? parseFloat(formData.area) : undefined,
        wallThickness: parseFloat(formData.wallThickness),
        wallThicknessType: formData.wallThicknessType,
        brickLength: parseFloat(formData.brickLength),
        brickWidth: parseFloat(formData.brickWidth),
        brickHeight: parseFloat(formData.brickHeight),
        brickSizeType: formData.brickSizeType,
        standardBrickSize: formData.standardBrickSize,
        mortarThickness: parseFloat(formData.mortarThickness),
        mortarMixType: formData.mortarMixType,
        wastageFactor: parseFloat(formData.wastageFactor),
        unitSystem: formData.unit === 'm' ? ('metric' as const) : ('imperial' as const), // Fix: Add 'as const'
        openings: formData.openings.map((op) => ({
          width: op.width ? parseFloat(op.width) : 0,
          height: op.height ? parseFloat(op.height) : 0,
          unitSystem: op.unit === 'm' ? ('metric' as const) : ('imperial' as const), // Fix: Add 'as const'
        })),
      }

      const result = BrickworkCalculatorLib.calculate(input)
      setResult(result)
    } catch (error) {
      console.error('Calculation error:', error)
      setErrors({
        general: error instanceof Error ? error.message : 'An error occurred during calculation.',
      })
    } finally {
      setIsCalculating(false)
    }
  }, [formData, validateForm])
  const resetForm = useCallback(() => {
    const presets = UNIT_PRESETS.brickwork[globalUnit === 'm' ? 'metric' : 'imperial']
    const defaults = BrickworkCalculatorLib.getDefaultsForUnitSystem(
      globalUnit === 'm' ? 'metric' : 'imperial',
    )

    setFormData({
      wallLength: '',
      wallHeight: '',
      wallThickness: defaults.wallThickness,
      wallThicknessType: 'custom',
      brickLength: defaults.brickLength,
      brickWidth: defaults.brickWidth,
      brickHeight: defaults.brickHeight,
      mortarThickness: defaults.mortarThickness,
      mortarMixType: '1:5',
      wastageFactor: '5',
      unit: globalUnit,
      showStepByStep: false,
      area: '',
      openings: [],
      brickSizeType: 'standard',
      standardBrickSize: '240x115x57',
      customBrickInput: '',
    })
    setResult(null)
    setErrors({})
    setUseArea(false)
  }, [globalUnit])

  const handleInputChange = useCallback(
    (field: keyof BrickworkFormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }))
      }
      if (errors.general) {
        setErrors((prev) => ({ ...prev, general: '' }))
      }
    },
    [errors],
  )

  const getBrickUnit = useCallback(() => (formData.unit === 'm' ? 'mm' : 'in'), [formData.unit])
  const getLengthUnit = useCallback(() => (formData.unit === 'm' ? 'm' : 'ft'), [formData.unit])
  const getAreaUnit = useCallback(() => (formData.unit === 'm' ? 'm²' : 'ft²'), [formData.unit])

  return (
    <div className="mx-auto max-w-4xl p-6 font-display">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200/20 bg-surface shadow-card dark:border-slate-800/20 dark:bg-surface-dark"
      >
        {/* Header */}
        <div className="border-b border-slate-200/20 px-8 py-6 dark:border-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="  text-2xl font-bold text-heading dark:text-heading-dark">
                Brickwork Calculator
              </h1>
              <p className="text-body/70 dark:text-body-dark/70">
                Calculate bricks, mortar volume, cement & sand quantity
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <BrickworkSVG formData={formData} />
        </div>
        {/* Form */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Use Area Toggle Button */}
          <div className="flex flex-wrap justify-end gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              type="button"
              onClick={() => setUseArea(!useArea)}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-6 py-2 font-medium shadow-soft transition-all text-sm sm:text-base whitespace-nowrap ${
                useArea
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-secondary text-white hover:bg-secondary/90'
              }`}
            >
              <Info className="h-4 w-4" />
              {useArea ? 'Use Length & Height' : 'Use Area'}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Wall Dimensions */}
            {!useArea ? (
              <>
                <InputField
                  label="Wall Length"
                  value={formData.wallLength}
                  onChange={(value) => handleInputChange('wallLength', value)}
                  error={errors.wallLength}
                  unit={getLengthUnit()}
                  isLength={true}
                  currentUnit={formData.unit}
                  placeholder="Enter wall length"
                />
                <InputField
                  label="Wall Height"
                  value={formData.wallHeight}
                  onChange={(value) => handleInputChange('wallHeight', value)}
                  error={errors.wallHeight}
                  unit={getLengthUnit()}
                  isLength={true}
                  currentUnit={formData.unit}
                  placeholder="Enter wall height"
                />
              </>
            ) : (
              <div className="md:col-span-2">
                <InputField
                  label="Wall Area"
                  value={formData.area || ''}
                  onChange={(value) => handleInputChange('area', value)}
                  error={errors.area}
                  unit={getAreaUnit()}
                  placeholder="Enter wall area"
                />
              </div>
            )}

            {/* Wall Thickness with Dropdown */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                Wall Thickness
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleWallThicknessTypeChange('4inch')}
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm flex-1 min-w-[100px] max-w-[140px] ${
                    formData.wallThicknessType === '4inch'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="block">4 inch Wall</span>
                  <span className="block text-[10px] sm:text-xs opacity-80">
                    {formData.unit === 'm' ? '0.102 m' : '0.33 ft'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWallThicknessTypeChange('9inch')}
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm flex-1 min-w-[100px] max-w-[140px] ${
                    formData.wallThicknessType === '9inch'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="block">9 inch Wall</span>
                  <span className="block text-[10px] sm:text-xs opacity-80">
                    {formData.unit === 'm' ? '0.229 m' : '0.75 ft'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWallThicknessTypeChange('custom')}
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm flex-1 min-w-[100px] max-w-[140px] ${
                    formData.wallThicknessType === 'custom'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Custom
                </button>

                {formData.wallThicknessType === 'custom' && (
                  <div className="relative flex-1 min-w-[120px] max-w-[200px]">
                    <input
                      type="number"
                      value={formData.wallThickness}
                      onChange={(e) => handleInputChange('wallThickness', e.target.value)}
                      placeholder="Thickness"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 sm:px-4 py-2 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 text-sm"
                    />
                    <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-body/60 dark:text-body-dark/60">
                      {getLengthUnit()}
                    </div>
                  </div>
                )}
              </div>
              {errors.wallThickness && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.wallThickness}
                </motion.p>
              )}
            </div>

            {/* Openings Section */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-3 sm:mb-4">
                <label className="block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                  Door/Window Openings (Optional)
                </label>
                <button
                  type="button"
                  onClick={addOpening}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm whitespace-nowrap"
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Add Opening
                </button>
              </div>

              {formData.openings.map((opening, index) => (
                <div
                  key={opening.id}
                  className="mb-4 p-4 border border-slate-200   rounded-lg dark:border-slate-600"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{opening.name}</span>
                    <button
                      type="button"
                      onClick={() => removeOpening(opening.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Width</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={opening.width}
                          onChange={(e) => updateOpening(opening.id, 'width', e.target.value)}
                          placeholder="Width"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                          {opening.unit}
                        </div>
                      </div>
                      {errors[`openingWidth_${opening.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`openingWidth_${opening.id}`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Height</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={opening.height}
                          onChange={(e) => updateOpening(opening.id, 'height', e.target.value)}
                          placeholder="Height"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                          {opening.unit}
                        </div>
                      </div>
                      {errors[`openingHeight_${opening.id}`] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors[`openingHeight_${opening.id}`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Unit</label>
                      <select
                        value={opening.unit}
                        onChange={(e) =>
                          updateOpening(opening.id, 'unit', e.target.value as 'm' | 'ft')
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
                      >
                        <option value="m">Meters (m)</option>
                        <option value="ft">Feet (ft)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Brick Size Selection */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-heading dark:text-heading-dark text-sm sm:text-base">
                Brick Size (Length × Width × Height)
              </label>

              <div className="mb-4 flex flex-wrap gap-2 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleBrickSizeChange('standard', '240x115x71')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    formData.brickSizeType === 'standard'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Standard Sizes
                </button>
                <button
                  type="button"
                  onClick={() => handleBrickSizeChange('custom', '')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    formData.brickSizeType === 'custom'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Custom Size
                </button>
              </div>

              {formData.brickSizeType === 'standard' && (
                <div className="mb-4">
                  <select
                    value={formData.standardBrickSize}
                    onChange={(e) => handleBrickSizeChange('standard', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800"
                  >
                    <option value="">Select a standard brick size...</option>
                    {STANDARD_BRICK_SIZES.map((brick) => (
                      <option key={brick.value} value={brick.value}>
                        {brick.label} - {brick.region}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.brickSizeType === 'custom' && (
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.customBrickInput}
                      onChange={(e) => handleBrickSizeChange('custom', e.target.value)}
                      placeholder="Enter size: 240x110x76 or 240*110*76"
                      className={`w-full rounded-xl border px-4 py-3 font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.customBrickInput
                          ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                          : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-body-dark/60">
                      {getBrickUnit()}
                    </div>
                  </div>
                  {errors.customBrickInput && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.customBrickInput}
                    </motion.p>
                  )}
                </div>
              )}

              {/* Current Brick Dimensions Display */}
              {formData.brickLength && formData.brickWidth && formData.brickHeight && (
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-800 dark:text-green-200">
                      Current Brick Size
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-green-700 dark:text-green-300">Length: </span>
                      {formData.brickLength} {getBrickUnit()}
                    </div>
                    <div>
                      <span className="text-green-700 dark:text-green-300">Width: </span>
                      {formData.brickWidth} {getBrickUnit()}
                    </div>
                    <div>
                      <span className="text-green-700 dark:text-green-300">Height: </span>
                      {formData.brickHeight} {getBrickUnit()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mortar Settings */}
            <div>
              <label className="mb-2 block   font-medium text-heading dark:text-heading-dark">
                Mortar Mix Type
              </label>
              <select
                value={formData.mortarMixType}
                onChange={(e) => handleInputChange('mortarMixType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800"
              >
                {MORTAR_MIX_TYPES.map((mix) => (
                  <option key={mix.value} value={mix.value}>
                    {mix.label}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Mortar Thickness"
              value={formData.mortarThickness}
              onChange={(value) => handleInputChange('mortarThickness', value)}
              error={errors.mortarThickness}
              unit={getBrickUnit()}
              placeholder="Enter mortar thickness"
            />

            <InputField
              label="Wastage Factor"
              value={formData.wastageFactor}
              onChange={(value) => handleInputChange('wastageFactor', value)}
              error={errors.wastageFactor}
              unit="%"
              min="0"
              placeholder="Enter wastage factor"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-300 bg-white px-3 sm:px-6 py-2 sm:py-3 font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700 text-xs sm:text-sm whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Reset
              </button>

              <button
                type="button"
                onClick={() => handleInputChange('showStepByStep', !formData.showStepByStep)}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 font-medium transition-colors text-xs sm:text-sm whitespace-nowrap ${
                  formData.showStepByStep
                    ? 'bg-primary text-white'
                    : 'border border-slate-300 bg-white text-heading dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark'
                }`}
              >
                {formData.showStepByStep ? (
                  <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {formData.showStepByStep ? 'Hide' : 'Show'} Steps
              </button>
            </div>

            <button
              type="button"
              onClick={calculateBrickwork}
              disabled={isCalculating}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-4 sm:px-8 py-2 sm:py-3 font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
            >
              {isCalculating ? (
                <>
                  <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Calculate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 dark:border-slate-800/20 dark:from-primary/10 dark:to-secondary/10"
            >
              {/* Results content */}
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="  text-xl font-semibold text-heading dark:text-heading-dark">
                  Calculation Results
                </h2>
              </div>

              {/* Main Results Table */}
              <div className="mb-8 overflow-hidden rounded-xl border border-slate-200/20 bg-white/70 dark:border-slate-700/30 dark:bg-slate-900/60">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left   font-semibold text-heading dark:text-heading-dark">
                        Material
                      </th>
                      <th className="px-6 py-4 text-right   font-semibold text-heading dark:text-heading-dark">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left   font-semibold text-heading dark:text-heading-dark">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/20 dark:divide-slate-700/30">
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Number of Bricks
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.numberOfBricks.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">pcs</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Cement
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.cementWeight.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">
                        kg (~{result.cementBags} bags)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Sand
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.sandWeight.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">kg</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Mortar Volume
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.mortarVolume.toFixed(3)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">m³</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-heading dark:text-heading-dark">
                        Wall Volume
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        {result.wallVolume.toFixed(3)}
                      </td>
                      <td className="px-6 py-4 text-body/70 dark:text-body-dark/70">m³</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Step-by-step Calculation */}
              {formData.showStepByStep && (
                <div className="mb-8 rounded-xl border border-blue-200/40 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-blue-700/30 dark:from-blue-900/40 dark:to-indigo-900/40">
                  <h3 className="mb-6 text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    Step-by-Step Calculation with Formulas
                  </h3>

                  {/* Formula Reference Card */}
                  <div className="mb-6 rounded-lg bg-white/70 p-4 dark:bg-slate-800/70 border border-blue-200/30 dark:border-blue-700/30">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3 text-sm uppercase tracking-wide">
                      Key Formulas Used
                    </h4>
                    <div className="grid gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-blue-800 dark:text-blue-200">
                          Wall Volume = L × H × T
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-blue-800 dark:text-blue-200">
                          Brick Volume = (l + m) × (w + m) × (h + m)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-blue-800 dark:text-blue-200">
                          No. of Bricks = Net Wall Volume / Brick Volume
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-blue-800 dark:text-blue-200">
                          Mortar Volume = Net Wall Volume - (Brick Volume × No. of Bricks)
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-blue-600 dark:text-blue-400">
                      Where: L=Length, H=Height, T=Thickness, l=brick length, w=brick width, h=brick
                      height, m=mortar thickness
                    </p>
                  </div>

                  {/* Visual Step Cards */}
                  <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-blue-500">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
                          1
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            Calculate Gross Wall Volume
                          </h4>
                          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm text-center">
                            {useArea ? (
                              <span>
                                Wall Volume = {formData.area} {getAreaUnit()} ×{' '}
                                {formData.wallThickness} {getLengthUnit()} ={' '}
                                <strong>{result.wallVolume.toFixed(4)} m³</strong>
                              </span>
                            ) : (
                              <span>
                                Wall Volume = {formData.wallLength} × {formData.wallHeight} ×{' '}
                                {formData.wallThickness} ={' '}
                                <strong>{result.wallVolume.toFixed(4)} m³</strong>
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-blue-800/80 dark:text-blue-200/80">
                            Total volume of the wall before deducting openings.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 - Openings */}
                    {result.totalOpeningVolume > 0 && (
                      <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-amber-500">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-sm">
                            2
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                              Deduct Opening Volumes
                            </h4>
                            <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm">
                              {formData.openings.map((op, i) => (
                                <div key={op.id} className="text-center">
                                  Opening {i + 1}: {op.width} × {op.height} ×{' '}
                                  {formData.wallThickness} ={' '}
                                  {(
                                    parseFloat(op.width || '0') *
                                    parseFloat(op.height || '0') *
                                    parseFloat(formData.wallThickness)
                                  ).toFixed(4)}{' '}
                                  m³
                                </div>
                              ))}
                              <div className="border-t border-slate-300 dark:border-slate-600 mt-1 pt-1 text-center font-semibold">
                                Total Openings = {result.totalOpeningVolume.toFixed(4)} m³
                              </div>
                            </div>
                            <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                              Volume deducted for {formData.openings.length} opening(s) (doors,
                              windows, etc.)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
                    <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-green-500">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white font-bold text-sm">
                          {result.totalOpeningVolume > 0 ? '3' : '2'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                            Calculate Net Wall Volume
                          </h4>
                          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm text-center">
                            Net Volume = {result.wallVolume.toFixed(4)} -{' '}
                            {result.totalOpeningVolume.toFixed(4)} ={' '}
                            <strong className="text-green-700 dark:text-green-400">
                              {result.netWallVolume.toFixed(4)} m³
                            </strong>
                          </div>
                          <p className="text-sm text-green-800/80 dark:text-green-200/80">
                            Actual masonry volume after openings deduction.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-purple-500">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white font-bold text-sm">
                          {result.totalOpeningVolume > 0 ? '4' : '3'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                            Calculate Brick Volume (with mortar)
                          </h4>
                          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm">
                            <div className="text-center mb-1">Brick + Mortar Dimensions:</div>
                            <div className="text-center">
                              ({formData.brickLength} + {formData.mortarThickness}) × (
                              {formData.brickWidth} + {formData.mortarThickness}) × (
                              {formData.brickHeight} + {formData.mortarThickness})
                            </div>
                            <div className="text-center font-semibold text-purple-700 dark:text-purple-400 mt-1">
                              ={' '}
                              {(
                                (((((parseFloat(formData.brickLength) +
                                  parseFloat(formData.mortarThickness)) /
                                  1000) *
                                  (parseFloat(formData.brickWidth) +
                                    parseFloat(formData.mortarThickness))) /
                                  1000) *
                                  (parseFloat(formData.brickHeight) +
                                    parseFloat(formData.mortarThickness))) /
                                1000
                              ).toFixed(6)}{' '}
                              m³ per brick
                            </div>
                          </div>
                          <p className="text-sm text-purple-800/80 dark:text-purple-200/80">
                            Each brick occupies this volume including mortar joints on all sides.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-indigo-500">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-sm">
                          {result.totalOpeningVolume > 0 ? '5' : '4'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                            Calculate Number of Bricks
                          </h4>
                          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm">
                            <div className="text-center">
                              No. of Bricks = {result.netWallVolume.toFixed(4)} ÷{' '}
                              {(
                                (((((parseFloat(formData.brickLength) +
                                  parseFloat(formData.mortarThickness)) /
                                  1000) *
                                  (parseFloat(formData.brickWidth) +
                                    parseFloat(formData.mortarThickness))) /
                                  1000) *
                                  (parseFloat(formData.brickHeight) +
                                    parseFloat(formData.mortarThickness))) /
                                1000
                              ).toFixed(6)}
                            </div>
                            <div className="text-center mt-1">
                              ={' '}
                              {Math.ceil(
                                result.netWallVolume /
                                  ((((((parseFloat(formData.brickLength) +
                                    parseFloat(formData.mortarThickness)) /
                                    1000) *
                                    (parseFloat(formData.brickWidth) +
                                      parseFloat(formData.mortarThickness))) /
                                    1000) *
                                    (parseFloat(formData.brickHeight) +
                                      parseFloat(formData.mortarThickness))) /
                                    1000),
                              )}{' '}
                              bricks (raw)
                            </div>
                            <div className="text-center mt-1 text-amber-600 dark:text-amber-400">
                              + {formData.wastageFactor}% wastage
                            </div>
                            <div className="text-center mt-1 font-bold text-indigo-700 dark:text-indigo-400 text-lg">
                              = {result.numberOfBricks.toLocaleString()} bricks
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-cyan-500">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white font-bold text-sm">
                          {result.totalOpeningVolume > 0 ? '6' : '5'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-2">
                            Calculate Mortar Volume
                          </h4>
                          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm">
                            <div className="text-center">
                              Wet Mortar = {result.netWallVolume.toFixed(4)} - (Brick Volume ×{' '}
                              {result.numberOfBricks})
                            </div>
                            <div className="text-center mt-1">
                              ={' '}
                              <strong className="text-cyan-700 dark:text-cyan-400">
                                {result.mortarVolume.toFixed(4)} m³
                              </strong>{' '}
                              (wet volume)
                            </div>
                          </div>
                          <p className="text-sm text-cyan-800/80 dark:text-cyan-200/80">
                            Volume of cement-sand mixture needed to fill gaps between bricks.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 7 - Cement */}
                    <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-rose-500">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white font-bold text-sm">
                          {result.totalOpeningVolume > 0 ? '7' : '6'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-rose-900 dark:text-rose-100 mb-2">
                            Calculate Cement Required
                          </h4>
                          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm">
                            <div className="text-center">
                              Mix Ratio: {formData.mortarMixType} (Cement:Sand)
                            </div>
                            <div className="text-center mt-1">
                              Sum of ratio ={' '}
                              {parseInt(formData.mortarMixType.split(':')[0]) +
                                parseInt(formData.mortarMixType.split(':')[1])}
                            </div>
                            <div className="text-center mt-1">
                              Cement = {result.mortarVolume.toFixed(4)} × (1/
                              {parseInt(formData.mortarMixType.split(':')[0]) +
                                parseInt(formData.mortarMixType.split(':')[1])}
                              ) × 1440 kg/m³ × 1.33 (dry)
                            </div>
                            <div className="text-center mt-1 font-bold text-rose-700 dark:text-rose-400 text-lg">
                              = {result.cementWeight.toFixed(1)} kg ({result.cementBags} bags of
                              50kg)
                            </div>
                          </div>
                          <p className="text-sm text-rose-800/80 dark:text-rose-200/80">
                            1440 kg/m³ is cement density. 1.33 factor converts wet to dry volume.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 8 - Sand */}
                    <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-800/60 border-l-4 border-yellow-500">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-sm">
                          {result.totalOpeningVolume > 0 ? '8' : '7'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                            Calculate Sand Required
                          </h4>
                          <div className="bg-slate-100 dark:bg-slate-700/50 rounded p-2 mb-2 font-mono text-sm">
                            <div className="text-center">
                              Sand = {result.mortarVolume.toFixed(4)} × (
                              {parseInt(formData.mortarMixType.split(':')[1])}/
                              {parseInt(formData.mortarMixType.split(':')[0]) +
                                parseInt(formData.mortarMixType.split(':')[1])}
                              ) × 1600 kg/m³ × 1.33
                            </div>
                            <div className="text-center mt-1 font-bold text-yellow-700 dark:text-yellow-400 text-lg">
                              = {result.sandWeight.toFixed(1)} kg
                            </div>
                            <div className="text-center mt-1 text-sm">
                              ≈ {(result.sandWeight / 1600).toFixed(3)} m³ or{' '}
                              {(result.sandWeight / 25).toFixed(1)} bags (25kg each)
                            </div>
                          </div>
                          <p className="text-sm text-yellow-800/80 dark:text-yellow-200/80">
                            1600 kg/m³ is dry sand density. Sand fills the remaining mix proportion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <BRICKWORK_INFO_SECTION />
      </motion.div>
    </div>
  )
}
