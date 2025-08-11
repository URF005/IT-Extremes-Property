import { promises as fs } from 'fs'
import path from 'path'

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
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
