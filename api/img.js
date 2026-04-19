const token = process.env.BLOB_READ_WRITE_TOKEN
const BLOB_DOMAIN = 'blob.vercel-storage.com'

export default async function handler(req, res) {
  const blobUrl = decodeURIComponent(req.query.u || '')

  if (!blobUrl || !blobUrl.includes(BLOB_DOMAIN)) {
    return res.status(400).end()
  }

  try {
    const blobRes = await fetch(blobUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!blobRes.ok) return res.status(blobRes.status).end()

    const contentType = blobRes.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await blobRes.arrayBuffer())

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600')
    return res.send(buffer)
  } catch (err) {
    console.error('Image proxy error:', err)
    return res.status(500).end()
  }
}
