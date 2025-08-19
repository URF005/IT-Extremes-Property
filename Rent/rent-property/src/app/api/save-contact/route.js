import { promises as fs } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const body = await req.json()
    const contact = body?.contact
    if (!contact) return new Response('Missing contact data', { status: 400 })

    const dir = path.join(process.cwd(), 'src', 'useinformation')
    await fs.mkdir(dir, { recursive: true })

    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `${stamp}_${(contact.name || 'anon').replace(/[^a-z0-9]/gi, '_')}.json`
    const filePath = path.join(dir, filename)

    await fs.writeFile(filePath, JSON.stringify({ createdAt: new Date(), contact }, null, 2))

    // ---- SEND EMAIL NOTIFICATION (Gmail via App Password) ----
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
        const html = `
          <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${esc(contact.name)}</p>
            <p><strong>Email:</strong> ${esc(contact.email)}</p>
            <p><strong>Mobile:</strong> ${esc(contact.mobile)}</p>
            <p><strong>Message:</strong><br/>${esc(contact.message).replace(/\n/g, '<br/>')}</p>
            <hr/>
            <small>Saved file: ${esc(filename)}</small>
          </div>
        `

        await transporter.sendMail({
          from: SMTP_USER,
          to: CONTACT_TO,
          subject: `New contact form submission — ${contact.name || 'Unknown'}`,
          text: [
            `Name: ${contact.name || ''}`,
            `Email: ${contact.email || ''}`,
            `Mobile: ${contact.mobile || ''}`,
            `Message: ${contact.message || ''}`,
            `Saved file: ${filename}`,
          ].join('\n'),
          html,
          replyTo: contact.email || undefined,
        })
      }
    } catch (mailErr) {
      console.error('Email send failed:', mailErr)
      // intentionally do not fail the request if email fails
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
