// Post-build static prerender step.
//
// The app is a client-rendered React SPA (Vite, no server at runtime — it's
// deployed as plain static files on shared hosting). That means crawlers and
// SEO tools that don't execute JS see an empty <div id="root"></div>.
//
// This script boots a tiny static file server over dist/, drives a real
// headless browser through every route, and writes the fully-rendered HTML
// back to disk (dist/index.html, dist/strategy/index.html, etc.) so each
// route ships with real content, a real <h1>, a real <title>/meta
// description, and a real <form> — no JS execution required to see them.
// React then hydrates that markup client-side for interactivity.
import { chromium } from 'playwright'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const routes = [
  { path: '/', out: 'index.html', navText: null },
  { path: '/strategy', out: 'strategy/index.html', navText: 'Strategy' },
  { path: '/solutions', out: 'solutions/index.html', navText: 'Solutions' },
  { path: '/contact', out: 'contact/index.html', navText: 'Contact' },
]

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain',
  '.json': 'application/json',
}

function startServer(root, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url.split('?')[0]
      let filePath = path.join(root, decodeURIComponent(urlPath))
      if (urlPath === '/' || !path.extname(filePath)) filePath = path.join(root, 'index.html')
      fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not found'); return }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' })
        res.end(data)
      })
    })
    server.listen(port, '127.0.0.1', () => resolve(server))
  })
}

async function main() {
  const port = 4173
  const server = await startServer(distDir, port)
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' })

  for (const route of routes) {
    if (route.navText) {
      await page.click(`nav a:has-text("${route.navText}")`)
      await page.waitForFunction(
        (text) => document.title.includes(text) || true,
        route.navText,
      )
    }
    // Let the route settle: title/meta effect + above-fold reveal observers.
    await page.waitForTimeout(400)

    const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML)
    const outPath = path.join(distDir, route.out)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, html)
    const h1 = await page.locator('h1').first().innerText().catch(() => '(no h1)')
    console.log(`  prerendered ${route.path} -> ${route.out}  [h1: ${h1.slice(0, 40).replace(/\n/g, ' ')}]`)
  }

  if (errors.length) {
    console.error('Page errors during prerender:', errors)
    process.exitCode = 1
  }

  await browser.close()
  server.close()
}

main()
