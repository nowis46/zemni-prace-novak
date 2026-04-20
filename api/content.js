import { list, put } from '@vercel/blob'

const BLOB_KEY = 'site/content.json'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 })
      if (!blobs.length) return res.status(200).json({})
      const response = await fetch(blobs[0].url, { cache: 'no-store' })
      if (!response.ok) return res.status(200).json({})
      const content = await response.json()
      return res.status(200).json(content)
    } catch (err) {
      console.error('GET content error:', err)
      return res.status(200).json({})
    }
  }

  if (req.method === 'POST') {
    if (req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
      await put(BLOB_KEY, JSON.stringify(req.body), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error('POST content error:', err)
      return res.status(500).json({ error: err.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
