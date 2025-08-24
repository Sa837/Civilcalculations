"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

type FormValues = z.infer<typeof schema>

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle')
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch('/contact-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
      <div>
        <label className="block font-display text-sm font-semibold text-heading dark:text-heading-dark mb-3">
          Name
        </label>
        <input 
          aria-invalid={!!errors.name} 
          {...register('name')} 
          className="w-full rounded-xl border-2 border-slate-300 bg-surface px-5 py-4 font-sans text-lg transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-slate-700 dark:bg-surface-dark dark:focus:border-primary dark:focus:ring-primary/20" 
        />
        {errors.name && <p className="mt-3 font-sans text-sm text-error dark:text-error">{errors.name.message}</p>}
      </div>
      
      <div>
        <label className="block font-display text-sm font-semibold text-heading dark:text-heading-dark mb-3">
          Email
        </label>
        <input 
          aria-invalid={!!errors.email} 
          {...register('email')} 
          type="email" 
          className="w-full rounded-xl border-2 border-slate-300 bg-surface px-5 py-4 font-sans text-lg transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-slate-700 dark:bg-surface-dark dark:focus:border-primary dark:focus:ring-primary/20" 
        />
        {errors.email && <p className="mt-3 font-sans text-sm text-error dark:text-error">{errors.email.message}</p>}
      </div>
      
      <div>
        <label className="block font-display text-sm font-semibold text-heading dark:text-heading-dark mb-3">
          Message
        </label>
        <textarea 
          aria-invalid={!!errors.message} 
          {...register('message')} 
          rows={6} 
          className="w-full rounded-xl border-2 border-slate-300 bg-surface px-5 py-4 font-sans text-lg transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-slate-700 dark:bg-surface-dark dark:focus:border-primary dark:focus:ring-primary/20" 
        />
        {errors.message && <p className="mt-3 font-sans text-sm text-error dark:text-error">{errors.message.message}</p>}
      </div>
      
      <button 
        disabled={isSubmitting} 
        className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 font-display font-semibold text-white shadow-soft transition-all hover:bg-primary/90 hover:shadow-hover disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
      
      {status === 'success' && (
        <div className="rounded-xl bg-secondary/10 p-4 text-center dark:bg-secondary/20">
          <p className="font-sans text-sm text-secondary dark:text-secondary">
            Message sent successfully! We will get back to you soon.
          </p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="rounded-xl bg-error/10 p-4 text-center dark:bg-error/20">
          <p className="font-sans text-sm text-error dark:text-error">
            Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}
    </form>
  )
}


