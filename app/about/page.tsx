import type { Metadata } from 'next'
import { Calculator, Users, Award, Target, Heart, Shield, BookOpen, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Civil Calculation | Engineering Tools & Resources for Professionals',
  description:
    'Learn about Civil Calculation - your trusted partner for civil engineering calculations, tools, and resources. Founded by Er. Sameer Tripathi and backed by Pave Engineering Consultancy Pvt. Ltd.',
  keywords:
    'civil engineering, construction calculator, engineering tools, civil calculation, building estimation, construction planning',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Civil Calculation | Engineering Tools & Resources',
    description:
      'Professional civil engineering calculation tools and comprehensive guides for architects, contractors, and engineers.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 font-display">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-bold text-heading dark:text-heading-dark md:text-5xl">
          About Civil Calculation
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-body/80 dark:text-body-dark/80 leading-relaxed">
          Empowering civil engineers, architects, contractors, and construction professionals with
          accurate calculation tools, comprehensive guides, and industry insights since 2023.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-8 dark:border-slate-700/30 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="mb-4 flex items-center gap-3">
            <Target className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">Our Mission</h2>
          </div>
          <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
            To democratize access to professional-grade civil engineering tools and knowledge,
            enabling accurate calculations, informed decision-making, and successful project
            outcomes for professionals worldwide. We believe that reliable engineering tools should
            be accessible, accurate, and user-friendly for everyone in the construction industry.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-8 dark:border-slate-700/30 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="mb-4 flex items-center gap-3">
            <Heart className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold text-heading dark:text-heading-dark">Our Vision</h2>
          </div>
          <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
            To become the most trusted online platform for civil engineering calculations and
            resources, fostering innovation in construction practices, promoting sustainable
            building methods, and supporting the next generation of civil engineering professionals
            through comprehensive education and practical tools.
          </p>
        </div>
      </div>

      {/* What We Offer */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark">
          What We Offer
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <Calculator className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Advanced Calculators
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Professional-grade calculation tools for concrete, steel reinforcement, earthwork,
              roofing, and specialized construction calculations with industry-standard formulas and
              methodologies.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <BookOpen className="mb-4 h-12 w-12 text-orange-600" />
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Educational Resources
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Comprehensive guides, tutorials, and documentation covering civil engineering
              principles, construction techniques, material specifications, and best practices for
              professional development.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <Building2 className="mb-4 h-12 w-12 text-purple-600" />
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Industry Standards
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Tools and resources aligned with international standards including IS codes, ACI
              guidelines, BS standards, and local building regulations to ensure compliance and
              quality.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <Shield className="mb-4 h-12 w-12 text-green-600" />
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Accuracy & Reliability
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              All calculations are based on proven engineering formulas with built-in validation
              checks, comprehensive documentation, and regular updates to maintain accuracy and
              relevance.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <Users className="mb-4 h-12 w-12 text-blue-600" />
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Community Support
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Join a growing community of civil engineering professionals sharing knowledge, best
              practices, and innovative solutions for complex construction challenges.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-surface p-6 dark:border-slate-700/30 dark:bg-surface-dark">
            <Award className="mb-4 h-12 w-12 text-amber-600" />
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Free Access
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              All tools and resources are completely free to use, with no hidden costs or premium
              features. We believe in making professional engineering tools accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark">
          Our Story
        </h2>
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed">
              Civil Calculation was born from the vision of Er. Sameer Tripathi, a seasoned civil
              engineer with over a decade of experience in construction project management and
              structural design. Having witnessed the challenges faced by engineering professionals
              in accessing reliable calculation tools, Sameer recognized the need for a
              comprehensive online platform that combines accuracy, education, and practicality.
            </p>

            <p className="leading-relaxed">
              Founded in 2023, Civil Calculation emerged as a response to the growing demand for
              digital tools in the construction industry. What started as a simple collection of
              calculation utilities has evolved into a comprehensive platform serving thousands of
              civil engineering professionals, students, and contractors worldwide.
            </p>

            <p className="leading-relaxed">
              Our platform is backed by Pave Engineering Consultancy Pvt. Ltd., a reputed firm
              specializing in civil engineering consulting, structural design, and construction
              management. This partnership ensures that all our tools and content are grounded in
              real-world engineering practice and industry standards.
            </p>

            <p className="leading-relaxed">
              Today, Civil Calculation stands as a testament to the power of technology in
              transforming traditional engineering practices. We continue to innovate and expand our
              offerings, always prioritizing accuracy, user experience, and educational value.
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark">
          Meet Our Team
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
              <h3 className="text-xl font-bold text-heading dark:text-heading-dark">
                Er. Sameer Tripathi
              </h3>
              <p className="text-primary font-medium">Founder & Lead Developer</p>
            </div>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              A licensed civil engineer with extensive experience in structural design, project
              management, and construction supervision. Sameer holds a Master&apos;s degree in Civil
              Engineering and has worked on diverse projects ranging from residential buildings to
              industrial complexes. His expertise in both theoretical engineering and practical
              construction makes him uniquely qualified to develop tools that serve real-world
              engineering needs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500"></div>
              <h3 className="text-xl font-bold text-heading dark:text-heading-dark">
                Pave Engineering Team
              </h3>
              <p className="text-orange-600 font-medium">Technical Advisors & Contributors</p>
            </div>
            <p className="text-body/80 dark:text-body-dark/80 leading-relaxed">
              Our platform benefits from the expertise of Pave Engineering Consultancy Pvt.
              Ltd.&apos;s team of experienced engineers, architects, and construction professionals.
              This collaborative approach ensures that our tools reflect current industry practices,
              incorporate the latest engineering standards, and address real-world construction
              challenges faced by professionals in the field.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-heading dark:text-heading-dark">
          Why Choose Civil Calculation?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200/40 bg-gradient-to-br from-primary/5 to-primary/10 p-6 dark:border-slate-700/30">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Industry Expertise
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Developed by practicing engineers with real-world construction experience, ensuring
              practical relevance and professional accuracy.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-gradient-to-br from-green-500/5 to-green-500/10 p-6 dark:border-slate-700/30">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Free & Accessible
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              All tools and resources are completely free, with no subscription fees or premium
              features, making professional engineering tools accessible to everyone.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-6 dark:border-slate-700/30">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Comprehensive Coverage
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              From basic area calculations to complex structural analysis, we provide tools for
              every aspect of civil engineering and construction planning.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-6 dark:border-slate-700/30">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Educational Focus
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Beyond calculations, we provide educational content, best practices, and industry
              insights to help users understand the &quot;why&quot; behind the numbers.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-gradient-to-br from-orange-500/5 to-orange-500/10 p-6 dark:border-slate-700/30">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              Regular Updates
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              We continuously update our tools and content to reflect the latest engineering
              standards, construction techniques, and industry best practices.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/40 bg-gradient-to-br from-red-500/5 to-red-500/10 p-6 dark:border-slate-700/30">
            <h3 className="mb-3 text-lg font-bold text-heading dark:text-heading-dark">
              User-Centric Design
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Our intuitive interface and comprehensive documentation make complex engineering
              calculations accessible to both beginners and experienced professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Commitment to Quality */}
      <div className="mb-16 rounded-2xl border border-slate-200/40 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-8 dark:border-slate-700/30">
        <h2 className="mb-6 text-center text-3xl font-bold text-heading dark:text-heading-dark">
          Our Commitment to Quality
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Accuracy Guaranteed
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Every calculation tool undergoes rigorous validation against industry standards and
              engineering principles to ensure reliability and precision.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              Industry Standards
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              Our tools and methodologies align with international engineering standards, ensuring
              compliance and professional credibility.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
              User Trust
            </h3>
            <p className="text-body/80 dark:text-body-dark/80">
              We prioritize user satisfaction and trust, providing transparent methodologies,
              comprehensive documentation, and responsive support.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-heading dark:text-heading-dark">
          Get in Touch
        </h2>
        <p className="mb-8 text-lg text-body/80 dark:text-body-dark/80">
          Have questions, suggestions, or need support? We&apos;d love to hear from you.
        </p>
        <div className="rounded-2xl border border-slate-200/40 bg-surface p-8 dark:border-slate-700/30 dark:bg-surface-dark">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                Contact Information
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p>
                  <strong>Company:</strong> Pave Engineering Consultancy Pvt. Ltd.
                </p>
                <p>
                  <strong>Email:</strong> info@paveengineering.com
                </p>
                <p>
                  <strong>Website:</strong> www.paveengineering.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-heading dark:text-heading-dark">
                Business Hours
              </h3>
              <div className="space-y-2 text-body/80 dark:text-body-dark/80">
                <p>
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM NPT
                </p>
                <p>
                  <strong>Saturday:</strong> 9:00 AM - 1:00 PM NPT
                </p>
                <p>
                  <strong>Sunday:</strong> Closed
                </p>
                <p>
                  <strong>Response Time:</strong> Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
