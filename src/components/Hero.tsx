import { m } from 'motion/react'
import { ArrowRight, Database, Download, Mail, MapPin, Server, Terminal, Code2 } from 'lucide-react'
import { profile } from '../data/profile'

const orbiters = [
  { Icon: Code2, label: 'React', pos: 'left-[6%] top-[8%]' },
  { Icon: Server, label: 'Node.js', pos: 'right-[2%] top-[30%]' },
  { Icon: Database, label: 'PostgreSQL', pos: 'left-[2%] bottom-[14%]' },
  { Icon: Terminal, label: 'Git', pos: 'right-[10%] bottom-[2%]' },
]

const codeLines: { indent: number; parts: [string, string][] }[] = [
  { indent: 0, parts: [['text-violet-soft', 'const '], ['text-teal', 'developer'], ['text-muted', ' = {']] },
  { indent: 1, parts: [['text-muted', 'name: '], ['text-fuchsia', `"${profile.fullName}"`], ['text-muted', ',']] },
  { indent: 1, parts: [['text-muted', 'studying: '], ['text-fuchsia', '"Applied Computer Science"'], ['text-muted', ',']] },
  { indent: 1, parts: [['text-muted', 'stack: '], ['text-fuchsia', '["React", "Node.js", "PostgreSQL"]'], ['text-muted', ',']] },
  { indent: 1, parts: [['text-muted', 'lookingFor: '], ['text-fuchsia', '"internship"'], ['text-muted', ',']] },
  { indent: 0, parts: [['text-muted', '}']] },
]

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute -left-40 top-10 -z-10 size-[28rem] rounded-full bg-violet/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 top-40 -z-10 size-[24rem] rounded-full bg-teal/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-muted"
          >
            <span className="size-2 rounded-full bg-teal" aria-hidden="true" />
            {profile.fullName} · {profile.title}
          </m.p>

          <m.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Building <span className="text-gradient">Useful Software</span> for the Real World.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.intro}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView()
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 font-semibold text-white glow-violet transition hover:-translate-y-0.5"
            >
              Explore My Projects
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href={profile.cvFile}
              download={profile.cvFileName}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-teal/60"
            >
              <Download size={18} />
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 font-medium text-muted transition hover:text-text"
            >
              <Mail size={18} />
              Email me
            </a>
          </m.div>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"
          >
            <MapPin size={16} className="text-teal" aria-hidden="true" />
            {profile.location}
            <span aria-hidden="true">·</span>
            {profile.availability}
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-full max-w-md"
          aria-hidden="true"
        >
          <div className="orbit absolute inset-[-8%]">
            {orbiters.map(({ Icon, label, pos }) => (
              <div
                key={label}
                className={`orbit-rev absolute ${pos} flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs text-muted shadow-lg`}
              >
                <Icon size={14} className="text-teal" />
                {label}
              </div>
            ))}
          </div>

          <div className="float glow-violet relative rounded-2xl border border-line bg-surface/90 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="size-3 rounded-full bg-fuchsia/70" />
              <span className="size-3 rounded-full bg-violet/70" />
              <span className="size-3 rounded-full bg-teal/70" />
              <span className="ml-3 font-mono text-xs text-muted">developer.ts</span>
            </div>
            <pre className="overflow-hidden p-5 font-mono text-[13px] leading-7 sm:text-sm">
              {codeLines.map((line, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.18, duration: 0.4 }}
                  style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                  className="whitespace-pre-wrap break-words"
                >
                  {line.parts.map(([cls, text], j) => (
                    <span key={j} className={cls}>
                      {text}
                    </span>
                  ))}
                  {i === codeLines.length - 1 && <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-teal" />}
                </m.div>
              ))}
            </pre>
          </div>
        </m.div>
      </div>
    </section>
  )
}
