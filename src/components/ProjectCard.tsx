import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { accentStyles } from '../lib/accent'
import Text from './Text'

export default function ProjectCard({ project }: { project: Project }) {
  const a = accentStyles[project.accent]
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1.5 ${a.border}`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br ${a.glow} to-transparent opacity-0 blur-2xl transition duration-500 group-hover:opacity-100`}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between gap-3">
        <p className={`font-mono text-xs tracking-wider uppercase ${a.text}`}>{project.category}</p>
        <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
          <span className={`size-1.5 rounded-full ${a.dot}`} aria-hidden="true" />
          {project.status}
        </span>
      </div>

      <h3 className="relative mt-4 font-display text-2xl font-bold">
        <Link
          to={`/projects/${project.slug}`}
          className="after:absolute after:inset-[-1.5rem] after:content-[''] focus-visible:outline-offset-8"
        >
          {project.name}
        </Link>
      </h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-muted">
        <Text>{project.summary}</Text>
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
        {project.stack.length > 0 ? (
          project.stack.map((t) => (
            <li key={t} className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs text-text">
              {t}
            </li>
          ))
        ) : (
          <li className="text-xs text-muted">
            <Text>{project.stackNote ?? '[[TODO: tech stack]]'}</Text>
          </li>
        )}
      </ul>

      <p className={`relative mt-6 inline-flex items-center gap-1 text-sm font-semibold ${a.text}`}>
        Read case study
        <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </p>
    </article>
  )
}
