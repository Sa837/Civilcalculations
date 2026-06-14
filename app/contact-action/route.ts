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
    const recipientEmail = process.env.CONTACT_FORM_EMAIL || 'sa.9819158546@gmail.com'
    
    // Check if API key is configured
    if (!apiKey) {
      console.error('[Contact] RESEND_API_KEY is not configured in environment variables')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

      try {
        const resend = new Resend(apiKey)
        const result = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: [recipientEmail],
          replyTo: email,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <div>${escapeHtml(message).replace(/\n/g, '<br>')}</div>
          `,
          text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
        })

        if (result.error) {
          console.error('[Contact] Resend error:', result.error)
          return NextResponse.json(
            { error: 'Failed to send email. Please try again.' },
            { status: 500 }
          )
        }

        console.log('[Contact] Email sent successfully:', result.data?.id)
        return NextResponse.json({ ok: true })
      } catch (resendError) {
        console.error('[Contact] Resend service error:', resendError)
        return NextResponse.json(
          { error: 'Email service error. Please try again later.' },
          { status: 500 }
        )
      }
  } catch (e) {
    console.error('[Contact] Unexpected error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
