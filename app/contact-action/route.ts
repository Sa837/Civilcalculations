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
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}






