/**
 * Builds the PDF portfolio from the same data files the website uses.
 *   npm run build:pdf  ->  public/Athman_Suba_Portfolio.pdf
 * Edit src/data/*.ts, run the command again, and the PDF updates.
 */
import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import { profile } from '../src/data/profile.ts'
import { projects } from '../src/data/projects.ts'
import { skillGroups } from '../src/data/skills.ts'
import { splitTodo } from '../src/lib/placeholder.ts'

const OUT = path.resolve('public', 'Athman_Suba_Portfolio.pdf')

const C = {
  ink: '#0b0b14',
  violet: '#7c3aed',
  violetSoft: '#c4b5fd',
  teal: '#0f9488',
  tealBright: '#2dd4bf',
  text: '#1c1a2e',
  muted: '#5b5878',
  line: '#e2e0f0',
  tint: '#f5f3ff',
}

const PAGE_W = 595.28
const PAGE_H = 841.89
const M = 54
const W = PAGE_W - M * 2

const doc = new PDFDocument({
  size: 'A4',
  margin: M,
  bufferPages: true,
  info: {
    Title: `${profile.fullName} - Portfolio`,
    Author: profile.fullName,
    Subject: 'Software developer portfolio',
  },
})
fs.mkdirSync(path.dirname(OUT), { recursive: true })
doc.pipe(fs.createWriteStream(OUT))

/** Writes text, drawing [[TODO: ...]] markers as visible teal placeholders. */
function rich(
  text: string,
  opts: { size?: number; color?: string; font?: string; width?: number; x?: number; gap?: number; link?: string } = {},
) {
  const { size = 10, color = C.text, font = 'Helvetica', width = W, x = M, gap = 0, link } = opts
  const parts = splitTodo(text)
  const startY = doc.y
  parts.forEach((p, i) => {
    doc
      .font(p.todo ? 'Helvetica-Oblique' : font)
      .fontSize(size)
      .fillColor(p.todo ? C.teal : color)
      .text(p.todo ? `[to add: ${p.text}]` : p.text, i === 0 ? x : undefined, i === 0 ? startY : undefined, {
        width,
        continued: i < parts.length - 1,
        lineGap: 2.5,
        link: link && !p.todo ? link : undefined,
        underline: !!link && !p.todo,
      })
  })
  if (gap) doc.moveDown(gap / (size + 2.5))
}

function ensure(height: number) {
  if (doc.y + height > PAGE_H - M - 24) doc.addPage()
}

function sectionTitle(title: string) {
  ensure(60)
  doc.moveDown(0.6)
  const y = doc.y
  doc.rect(M, y + 2, 4, 15).fill(C.violet)
  doc.font('Helvetica-Bold').fontSize(14).fillColor(C.ink).text(title, M + 14, y, { width: W - 14 })
  doc.moveDown(0.5)
}

// ---------- Cover ----------
doc.rect(0, 0, PAGE_W, PAGE_H).fill(C.ink)
doc.circle(PAGE_W - 40, 140, 190).fillOpacity(0.18).fill(C.violet).fillOpacity(1)
doc.circle(60, PAGE_H - 120, 160).fillOpacity(0.12).fill(C.tealBright).fillOpacity(1)

doc.font('Courier').fontSize(11).fillColor(C.tealBright).text('PORTFOLIO', M, 150, { characterSpacing: 4 })
doc.font('Helvetica-Bold').fontSize(54).fillColor('#ffffff').text(profile.brand, M, 180)
doc.font('Helvetica').fontSize(20).fillColor(C.violetSoft).text(profile.fullName, M, 250)
doc.moveTo(M, 292).lineTo(M + 90, 292).lineWidth(3).stroke(C.tealBright)
doc.font('Helvetica').fontSize(14).fillColor('#d9d7ee').text(profile.title, M, 312, { width: W })
doc.fontSize(11).fillColor('#a8a6c4').text(
  `Applied Computer Science, Egerton University\n${profile.location}  ·  Open to internships and junior roles across Kenya`,
  M,
  340,
  { width: W, lineGap: 4 },
)

const coverY = PAGE_H - 190
doc.font('Helvetica').fontSize(11).fillColor('#ecebf7')
doc.text(profile.email, M, coverY, { link: `mailto:${profile.email}`, underline: false })
doc.text(profile.phone, M, coverY + 20, { link: `tel:${profile.phoneHref}` })
doc.text(`github.com/${profile.githubHandle}`, M, coverY + 40, { link: profile.github })
doc.text('linkedin.com/in/athman-rajab-212921372', M, coverY + 60, { link: profile.linkedin })

// ---------- Interior pages ----------
doc.addPage()

sectionTitle('Professional summary')
rich(profile.bio.join(' '), { size: 10.5 })
doc.moveDown(0.6)
rich(profile.intro, { size: 10.5, color: C.muted })

sectionTitle('Education')
for (const e of profile.education) {
  ensure(70)
  doc.font('Helvetica-Bold').fontSize(11).fillColor(C.ink).text(e.award, M, doc.y, { width: W })
  doc.font('Helvetica').fontSize(10).fillColor(C.muted).text(`${e.school}  ·  ${e.period}`, { width: W })
  if (e.note) {
    doc.moveDown(0.3)
    rich(e.note, { size: 9.5, color: C.muted })
  }
  doc.moveDown(0.7)
}

sectionTitle('Technical skills')
for (const g of skillGroups) {
  ensure(26)
  const y = doc.y
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(C.violet).text(g.title, M, y, { width: 150 })
  doc.y = y
  const text = g.items.join(', ') + (g.todo ? `  ${g.todo}` : '')
  rich(text, { size: 9.5, x: M + 160, width: W - 160 })
  doc.moveDown(0.35)
}
doc.moveDown(0.3)
rich(`Languages: ${profile.languages.join(', ')}`, { size: 9.5, color: C.muted })

// ---------- Projects ----------
ensure(300) // keep the heading together with the first project
sectionTitle('Featured projects')
doc.font('Helvetica').fontSize(9.5).fillColor(C.muted).text(
  'Each entry states my role. Items shown as [to add: ...] are details still to be confirmed.',
  M,
  doc.y,
  { width: W },
)
doc.moveDown(0.8)

projects.forEach((p, idx) => {
  ensure(190)
  const top = doc.y
  doc.roundedRect(M, top, W, 4, 2).fill(idx % 2 === 0 ? C.violet : C.teal)
  doc.y = top + 14
  doc.font('Helvetica-Bold').fontSize(14).fillColor(C.ink).text(p.name, M, doc.y, { width: W, continued: true })
  doc.font('Helvetica').fontSize(9.5).fillColor(C.muted).text(`   ${p.category}  ·  ${p.status}`)
  doc.moveDown(0.3)
  rich(`Role: ${p.role}`, { size: 10, font: 'Helvetica-Bold', color: C.violet })
  doc.moveDown(0.15)
  rich(p.overview, { size: 10 })
  doc.moveDown(0.25)
  rich(p.contribution, { size: 10, color: C.muted })
  doc.moveDown(0.25)
  rich(`Stack: ${p.stack.length ? p.stack.join(', ') : (p.stackNote ?? '[[TODO: stack]]')}`, { size: 9.5 })
  if (p.links.length) {
    doc.moveDown(0.25)
    p.links.forEach((l) => {
      doc.font('Helvetica').fontSize(9.5).fillColor(C.violet).text(`${l.label}: ${l.href.replace(/^https?:\/\//, '')}`, M, doc.y, {
        width: W,
        link: l.href,
        underline: true,
      })
    })
  }
  doc.moveDown(1.1)
})

// ---------- Contact ----------
ensure(130)
sectionTitle('Contact')
const rows: [string, string, string][] = [
  ['Email', profile.email, `mailto:${profile.email}`],
  ['Phone', profile.phone, `tel:${profile.phoneHref}`],
  ['GitHub', `github.com/${profile.githubHandle}`, profile.github],
  ['LinkedIn', 'linkedin.com/in/athman-rajab-212921372', profile.linkedin],
  ['Location', `${profile.location}. Available anywhere in Kenya.`, ''],
]
for (const [k, v, href] of rows) {
  const y = doc.y
  doc.font('Helvetica-Bold').fontSize(10).fillColor(C.ink).text(k, M, y, { width: 70 })
  doc.font('Helvetica').fontSize(10).fillColor(href ? C.violet : C.text).text(v, M + 80, y, {
    width: W - 80,
    link: href || undefined,
    underline: !!href,
  })
  doc.moveDown(0.3)
}

// ---------- Page furniture (all interior pages) ----------
const range = doc.bufferedPageRange()
for (let i = 1; i < range.count; i++) {
  doc.switchToPage(range.start + i)
  doc.page.margins.bottom = 0 // footer sits inside the bottom margin; without this pdfkit adds blank pages
  doc.rect(0, 0, PAGE_W, 6).fill(C.violet)
  doc.rect(PAGE_W * 0.6, 0, PAGE_W * 0.4, 6).fill(C.tealBright)
  doc.font('Helvetica').fontSize(8).fillColor(C.muted)
  doc.text(`${profile.brand}  ·  ${profile.fullName}`, M, PAGE_H - 40, { width: W / 2, lineBreak: false })
  doc.text(`${i + 1} / ${range.count}`, M + W / 2, PAGE_H - 40, { width: W / 2, align: 'right', lineBreak: false })
}

doc.end()
doc.on('end', () => console.log(`Wrote ${path.relative(process.cwd(), OUT)} (${range.count} pages)`))
