import { promises as fs } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const body = await req.json()
    const booking = body?.booking
    if (!booking) return new Response('Missing booking data', { status: 400 })

    const dir = path.join(process.cwd(), 'src', 'userdata')
    await fs.mkdir(dir, { recursive: true })

    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `${stamp}_${(booking.name || 'guest').replace(/[^a-z0-9]/gi, '_')}.json`
    const filePath = path.join(dir, filename)

    await fs.writeFile(filePath, JSON.stringify({ createdAt: new Date(), booking }, null, 2))

    // ---- SEND EMAIL NOTIFICATION (includes all widget fields) ----
    try {
      const { SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
      if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
        console.warn('Missing SMTP_USER / SMTP_PASS / CONTACT_TO env vars, email not sent')
      } else {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        })

        const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')

        // Pull fields exactly as sent by your widget
        const ci = booking.checkIn || {}
        const co = booking.checkOut || {}
        const guests = booking.guests ?? ''
        const name = booking.name || ''
        const mobile = booking.mobile || ''

        const text = [
          `New Booking Submission`,
          `----------------------`,
          `Name: ${name}`,
          `Mobile: ${mobile}`,
          `Guests: ${guests}`,
          `Check-In: ${ci.date || ''} ${ci.time || ''}`,
          `Check-Out: ${co.date || ''} ${co.time || ''}`,
          ``,
          `Saved file: ${filename}`,
        ].join('\n')

        const html = `
          <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
            <h2>New Booking Submission</h2>
            <p><strong>Name:</strong> ${esc(name)}</p>
            <p><strong>Mobile:</strong> ${esc(mobile)}</p>
            <p><strong>Guests:</strong> ${esc(guests)}</p>
            <p><strong>Check-In:</strong> ${esc(ci.date || '')} ${esc(ci.time || '')}</p>
            <p><strong>Check-Out:</strong> ${esc(co.date || '')} ${esc(co.time || '')}</p>
            <hr/>
            <small>Saved file: ${esc(filename)}</small>
          </div>
        `

        await transporter.sendMail({
          from: SMTP_USER,
          to: CONTACT_TO,
          subject: `New booking — ${name || 'Guest'}`,
          text,
          html,
          replyTo: undefined, // (no email field in widget; add if you add email later)
        })
      }
    } catch (mailErr) {
      console.error('Email send failed:', mailErr)
      // don't block the request if email fails
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
