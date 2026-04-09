import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      answer?: 'yes' | 'no'
      name?: string
      chapter?: string
      timestamp?: string
    }

    if (!body.answer) {
      return NextResponse.json({ ok: false, error: 'Missing answer' }, { status: 400 })
    }

    const payload = {
      answer: body.answer,
      name: body.name ?? 'Taran',
      chapter: body.chapter ?? 'Final Page',
      timestamp: body.timestamp ?? new Date().toISOString()
    }

    const resendKey = process.env.RESEND_API_KEY
    const notifyEmail = process.env.NOTIFY_EMAIL

    if (resendKey && notifyEmail) {
      const html = `
        <div style="font-family:Georgia,serif;padding:24px;background:#fff7fb;color:#4a2a35">
          <h2 style="margin-top:0">Website response received 💌</h2>
          <p><strong>${payload.name}</strong> clicked <strong>${payload.answer.toUpperCase()}</strong>.</p>
          <p><strong>Chapter:</strong> ${payload.chapter}</p>
          <p><strong>Time:</strong> ${payload.timestamp}</p>
        </div>
      `

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL ?? 'Love Story <onboarding@resend.dev>',
          to: [notifyEmail],
          subject: `Taran clicked ${payload.answer.toUpperCase()} on the sorry website`,
          html
        })
      })

      if (!resendResponse.ok) {
        const detail = await resendResponse.text()
        console.error('Notification send failed:', detail)
        return NextResponse.json({ ok: false, error: 'Notification failed', detail }, { status: 500 })
      }

      return NextResponse.json({ ok: true, notified: true })
    }

    console.log('Response received without email notification configured:', payload)
    return NextResponse.json({
      ok: true,
      notified: false,
      message: 'Saved to Vercel logs only. Add RESEND_API_KEY and NOTIFY_EMAIL to get email alerts.'
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}
