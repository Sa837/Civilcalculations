import ContactForm from '../../components/contact-form'

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">Contact Us</h1>
        <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">
          We'd love to hear from you. Get in touch for support, feedback, or collaboration opportunities.
        </p>
      </div>
      
      <div className="rounded-2xl border border-slate-200/20 bg-surface p-8 shadow-card dark:border-slate-800/20 dark:bg-surface-dark">
        <ContactForm />
      </div>
    </main>
  )
}




