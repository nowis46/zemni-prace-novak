// Injects the server-rendered homepage into dist/index.html.
// Content comes from the live admin store; falls back to defaults if unreachable.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const SITE = 'https://jannovakzemniprace.cz'

async function loadContent() {
  try {
    const res = await fetch(`${SITE}/api/content`, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('prerender: live content unavailable, using defaults —', err.message)
    return {}
  }
}

const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

// Admin page stays a plain client-rendered shell
fs.writeFileSync(path.join(dist, 'admin.html'), template)

const content = await loadContent()
const appHtml = render(content)
const json = JSON.stringify(content).replace(/</g, '\\u003c')

const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error('prerender: root marker not found')
const html = template.replace(
  marker,
  `<div id="root">${appHtml}</div>\n    <script>window.__CONTENT__=${json}</script>`,
)
fs.writeFileSync(path.join(dist, 'index.html'), html)
console.log(`prerender: index.html written (${appHtml.length} chars of HTML)`)
