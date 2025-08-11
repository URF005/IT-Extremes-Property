import { promises as fs } from 'fs'
import path from 'path'

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
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
