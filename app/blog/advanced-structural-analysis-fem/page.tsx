import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react'
import { AdSenseAd } from '../../../components/ads/AdSenseAd'

export const metadata: Metadata = {
  title: 'Advanced Structural Analysis: Finite Element Method in Civil Engineering | FEM Analysis',
  description:
    'Master Finite Element Method (FEM) for structural analysis. Comprehensive guide covering mesh generation, boundary conditions, material modeling, load analysis, and result interpretation with practical examples.',
  keywords:
    'finite element method, FEM analysis, structural analysis, civil engineering, mesh generation, boundary conditions, material modeling, structural simulation',
  openGraph: {
    title: 'Advanced Structural Analysis: Finite Element Method in Civil Engineering',
    description:
      'Master FEM analysis techniques for modern structural engineering with practical examples and comprehensive methodology.',
    type: 'article',
  },
}

export default function StructuralAnalysisBlog() {
  return (
    <article className="min-h-screen bg-background dark:bg-background-dark">
      {/* Header */}
      <div className="border-b border-slate-200/20 dark:border-slate-800/20 bg-surface dark:bg-surface-dark">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="flex items-center gap-4 text-sm text-body/60 dark:text-body-dark/60 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>25 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Structural Engineering Expert</span>
            </div>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs">
              Structural Analysis
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-heading dark:text-heading-dark mb-6">
            Advanced Structural Analysis: Finite Element Method in Civil Engineering
          </h1>

          <p className="text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
            The Finite Element Method (FEM) has revolutionized structural engineering, enabling
            engineers to analyze complex structures with unprecedented accuracy. This comprehensive
            guide explores FEM fundamentals, implementation strategies, and practical applications
            in modern civil engineering, providing detailed methodologies for mesh generation,
            boundary condition application, material modeling, and result interpretation.
          </p>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="w-full py-6 bg-surface dark:bg-surface-dark border-b border-slate-200/20 dark:border-slate-800/20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="min-h-[90px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
            <AdSenseAd
              slot="9285440299"
              format="auto"
              style={{ minHeight: '90px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Understanding the Finite Element Method
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-8">
            FEM is a numerical technique for finding approximate solutions to boundary value
            problems in engineering. The method divides complex structures into smaller, manageable
            finite elements, allowing engineers to predict structural behavior under various loading
            conditions with high precision.
          </p>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  FEM Analysis Revolution
                </h3>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  The finite element method represents a paradigm shift in structural engineering,
                  enabling complex analyses that were previously impossible or impractical with
                  traditional analytical methods.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">FEM Analysis</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
              FEM Core Principles
            </h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li>
                • <strong>Discretization:</strong> Complex geometry divided into finite elements
              </li>
              <li>
                • <strong>Interpolation:</strong> Field variables approximated within each element
              </li>
              <li>
                • <strong>Assembly:</strong> Element equations combined into global system
              </li>
              <li>
                • <strong>Solution:</strong> System solved for unknown nodal displacements
              </li>
              <li>
                • <strong>Post-processing:</strong> Results interpreted for engineering decisions
              </li>
            </ul>
          </div>

          {/* Middle Ad Banner */}
          <div className="my-12 py-8 border-t border-b border-slate-200/20 dark:border-slate-800/20">
            <div className="min-h-[250px] flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50">
              <AdSenseAd
                slot="0987654321"
                format="rectangle"
                style={{ minHeight: '250px', width: '100%' }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Mesh Generation: The Foundation of Analysis
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Mesh generation is arguably the most critical step in FEM analysis. The quality and
            density of the mesh directly influence solution accuracy and computational efficiency.
          </p>

          {/* Mesh Generation Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 font-semibold">
                  Mesh Generation
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  Critical Analysis Foundation
                </h4>
                <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                  Proper mesh generation ensures accurate results while maintaining computational
                  efficiency. Understanding element types and mesh refinement strategies is
                  essential for reliable FEM analysis.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Element Types and Selection Criteria
          </h3>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">
                1D Elements
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300">
                Truss, beam, spring elements
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">
                2D Elements
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300">
                Triangular, quadrilateral elements
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">
                3D Elements
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300">
                Tetrahedral, hexahedral elements
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">
                Special Elements
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300">
                Shell, plate, membrane elements
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Mesh Refinement Strategies
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Effective mesh refinement ensures accurate results while maintaining computational
            efficiency:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Stress Concentration Areas:</strong> Finer mesh in regions of high stress
                gradients, such as around holes, notches, or geometric discontinuities.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Boundary Conditions:</strong> Refined mesh near supports, loads, and
                constraint locations where displacement gradients are high.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Material Interfaces:</strong> Enhanced mesh density at junctions between
                different materials or property changes.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Boundary Conditions and Constraints
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Proper application of boundary conditions is essential for realistic structural behavior
            simulation. Incorrect boundary conditions can lead to physically meaningless results.
          </p>

          {/* Boundary Conditions Image */}
          <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  Boundary Condition Fundamentals
                </h4>
                <p className="text-green-700 dark:text-green-300 leading-relaxed">
                  Boundary conditions define how the structure interacts with its environment.
                  Understanding different constraint types and their proper application is crucial
                  for accurate FEM results.
                </p>
              </div>
              <div className="w-48 h-32 bg-gradient-to-br from-green-200 to-teal-300 dark:from-green-800 dark:to-teal-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-semibold">
                  Boundary Conditions
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Essential Boundary Conditions
          </h3>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200/50 dark:border-purple-800/50 mb-8">
            <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
              Displacement Constraints
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                  Fixed Support
                </h5>
                <p className="text-purple-600 dark:text-purple-400 text-sm">
                  u = 0, v = 0, w = 0 (all DOF constrained)
                </p>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                  Pinned Support
                </h5>
                <p className="text-purple-600 dark:text-purple-400 text-sm">
                  u = 0, v = 0 (translational DOF only)
                </p>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                  Roller Support
                </h5>
                <p className="text-purple-600 dark:text-purple-400 text-sm">
                  v = 0 (vertical displacement only)
                </p>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                  Symmetry Plane
                </h5>
                <p className="text-purple-600 dark:text-purple-400 text-sm">
                  u = 0 (normal displacement)
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Material Modeling and Constitutive Relations
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Accurate material modeling is crucial for reliable FEM results. The constitutive
            relationship defines how materials respond to applied loads and deformations.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Linear Elastic Materials
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            For linear elastic materials, stress-strain relationship is defined by Hooke&apos;s law:
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg mb-8">
            <div className="text-center mb-4">
              <p className="font-mono text-lg text-heading dark:text-heading-dark">σ = Eε</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark mb-2">
                  Steel Properties
                </h5>
                <ul className="space-y-1 text-body dark:text-body-dark text-sm">
                  <li>E = 200 GPa</li>
                  <li>ν = 0.3</li>
                  <li>ρ = 7850 kg/m³</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-heading dark:text-heading-dark mb-2">
                  Concrete Properties
                </h5>
                <ul className="space-y-1 text-body dark:text-body-dark text-sm">
                  <li>E = 25-35 GPa</li>
                  <li>ν = 0.2</li>
                  <li>ρ = 2400 kg/m³</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Nonlinear Material Behavior
          </h3>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Many civil engineering applications require nonlinear material models to capture
            realistic behavior:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Plastic Behavior:</strong> Von Mises yield criterion with isotropic
                hardening for ductile materials.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Concrete Damage:</strong> Plasticity-based models with tension-compression
                asymmetry.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Soil Mechanics:</strong> Mohr-Coulomb criterion for frictional materials.
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Load Analysis and Application
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            FEM enables detailed load distribution analysis, crucial for understanding structural
            behavior under complex loading scenarios.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Load Types in Structural Analysis
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">Static Loads</h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Dead loads (self-weight)</li>
                <li>• Live loads (occupancy)</li>
                <li>• Wind loads</li>
                <li>• Snow loads</li>
                <li>• Seismic loads</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-heading dark:text-heading-dark">Dynamic Loads</h4>
              <ul className="space-y-2 text-body dark:text-body-dark">
                <li>• Harmonic excitation</li>
                <li>• Random vibration</li>
                <li>• Impact loading</li>
                <li>• Blast loading</li>
                <li>• Seismic analysis</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-heading dark:text-heading-dark mt-12 mb-6">
            Result Interpretation and Validation
          </h2>

          <p className="text-body dark:text-body-dark leading-relaxed mb-6">
            Proper interpretation of FEM results requires understanding the underlying assumptions
            and limitations of the analysis.
          </p>

          <h3 className="text-2xl font-semibold text-heading dark:text-heading-dark mb-4">
            Critical Result Parameters
          </h3>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Stress Concentrations:</strong> Identify locations where stress exceeds
                material allowable limits.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Deflection Patterns:</strong> Assess serviceability requirements and
                structural stability.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Failure Modes:</strong> Predict potential failure mechanisms through stress
                analysis.
              </div>
            </li>
          </ul>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 mb-12">
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
              Best Practices for FEM Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                  Model Validation
                </h4>
                <ul className="space-y-1 text-emerald-600 dark:text-emerald-400 text-sm">
                  <li>• Verify boundary conditions</li>
                  <li>• Check load application</li>
                  <li>• Validate material properties</li>
                  <li>• Compare with analytical solutions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                  Quality Assurance
                </h4>
                <ul className="space-y-1 text-emerald-600 dark:text-emerald-400 text-sm">
                  <li>• Convergence studies</li>
                  <li>• Mesh sensitivity analysis</li>
                  <li>• Result verification</li>
                  <li>• Documentation standards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Share and Bookmark */}
        <div className="flex items-center justify-between py-8 border-t border-slate-200/20 dark:border-slate-800/20">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Bookmark className="h-4 w-4" />
              Save
            </button>
          </div>
          <Link
            href="/resources"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            ← Back to Resources
          </Link>
        </div>
      </div>
    </article>
  )
}
