/**
 * Lists every placeholder still in the project.
 *   npm run check:placeholders            (informational)
 *   npm run check:placeholders -- --strict (exit code 1 if any remain, for CI)
 */
import fs from 'node:fs'
import path from 'node:path'

const files = [
  ...fs.readdirSync('src/data').map((f) => path.join('src/data', f)),
  'index.html',
  'public/robots.txt',
  'public/sitemap.xml',
]
const patterns = [/\[\[TODO[^\]]*\]\]/g, /YOUR-DOMAIN\.example/g, /<!-- TODO[^>]*-->/g]

let total = 0
for (const f of files) {
  if (!fs.existsSync(f)) continue
  fs.readFileSync(f, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const re of patterns) {
        for (const m of line.matchAll(re)) {
          total++
          console.log(`${f}:${i + 1}  ${m[0]}`)
        }
      }
    })
}
console.log(`\n${total} placeholder(s) remaining.`)
if (process.argv.includes('--strict') && total > 0) process.exit(1)
