'use server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function submitContact(values: unknown): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = schema.safeParse(values)
  if (!parsed.success) return { ok: false, error: 'Invalid input' }
  const { name, email, message } = parsed.data
  const apiKey = process.env.RESEND_API_KEY
  try {
    if (apiKey) {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'CivilPro <noreply@civilpro.app>',
        to: ['owner@example.com'],
        subject: `Contact form: ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      })
    } else {
      console.log('[Contact] (no RESEND_API_KEY):', { name, email, message })
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: 'Server error' }
  }
}






