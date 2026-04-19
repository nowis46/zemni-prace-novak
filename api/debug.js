export default function handler(req, res) {
  const t = process.env.BLOB_READ_WRITE_TOKEN || ''
  return res.json({
    hasToken: t.length > 0,
    tokenPrefix: t.substring(0, 20),
    hasAdminPwd: !!process.env.ADMIN_PASSWORD,
  })
}
