import { Download, GraduationCap } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { GitHubIcon, LinkedInIcon } from './Icons'

export default function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Background" title="Resume" id="resume-title" />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
              <GraduationCap className="text-teal" size={22} aria-hidden="true" /> Education
            </h3>
            <ol className="mt-6 space-y-6 border-l border-line pl-6">
              {profile.education.map((e) => (
                <li key={e.school} className="relative">
                  <span className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full bg-violet" aria-hidden="true" />
                  <p className="font-mono text-xs text-teal">{e.period}</p>
                  <p className="mt-1 font-semibold">{e.award}</p>
                  <p className="text-muted">{e.school}</p>
                  {e.note && <p className="mt-2 text-sm leading-relaxed text-muted">{e.note}</p>}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-violet/40 bg-gradient-to-br from-violet/15 to-teal/10 p-6 sm:p-8">
            <div>
              <h3 className="font-display text-xl font-semibold">Full CV</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Education, skills, projects and contact details in a one-page PDF.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href={profile.cvFile}
                download={profile.cvFileName}
                className="flex items-center justify-center gap-2 rounded-full bg-violet px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                <Download size={18} /> Download CV (PDF)
              </a>
              <a
                href="/Athman_Suba_Portfolio.pdf"
                download="Athman_Suba_Portfolio.pdf"
                className="flex items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-teal/60"
              >
                <Download size={16} /> Portfolio PDF (projects)
              </a>
              <div className="flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition hover:border-teal/60"
                >
                  <GitHubIcon className="size-4" /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition hover:border-teal/60"
                >
                  <LinkedInIcon className="size-4" /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
