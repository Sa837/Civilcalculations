import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    const { name, email, message } = data.data
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[Contact] ERROR: RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: 'noreply@civilcalculation.com',
      to: ['paveengineeringofficial@gmail.com'],
      replyTo: email,
      subject: `Contact form: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    })
    if (result.error) {
      console.error('[Contact] Email send error:', result.error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
    console.log('[Contact] Email sent successfully:', result.data?.id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[Contact] Server error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
