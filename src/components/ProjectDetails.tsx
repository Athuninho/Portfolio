import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ExternalLink, Smartphone } from 'lucide-react'
import type { Project } from '../data/projects'
import { accentStyles } from '../lib/accent'
import Reveal from './Reveal'
import ScreenshotSlot from './ScreenshotSlot'
import Text from './Text'
import { GitHubIcon } from './Icons'

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="border-t border-line py-10">
      <h2 className="flex items-baseline gap-4 font-display text-2xl font-bold">
        <span className="font-mono text-sm text-teal">{n}</span>
        {title}
      </h2>
      <div className="mt-4 max-w-3xl leading-relaxed text-muted">{children}</div>
    </Reveal>
  )
}

export default function ProjectDetails({ project, next }: { project: Project; next: Project }) {
  const a = accentStyles[project.accent]
  const shots = project.screenshots.length ? project.screenshots : [undefined, undefined]
  const repoLink = project.links.find((l) => l.kind === 'repo')

  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-text">
        <ArrowLeft size={16} /> All projects
      </Link>

      <header className="mt-8">
        <p className={`font-mono text-sm tracking-wider uppercase ${a.text}`}>{project.category}</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">{project.name}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          <Text>{project.summary}</Text>
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <dt className="font-mono text-xs text-muted uppercase">Status</dt>
            <dd className="mt-1 font-semibold">{project.status}</dd>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <dt className="font-mono text-xs text-muted uppercase">My role</dt>
            <dd className="mt-1 font-semibold">{project.role}</dd>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <dt className="font-mono text-xs text-muted uppercase">Stack</dt>
            <dd className="mt-1 font-semibold">
              {project.stack.length ? project.stack.join(', ') : <Text>{project.stackNote ?? '[[TODO: stack]]'}</Text>}
            </dd>
          </div>
        </dl>

        {(project.links.length > 0 || !repoLink) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                {l.kind === 'store' ? <Smartphone size={16} /> : l.kind === 'repo' ? <GitHubIcon className="size-4" /> : <ExternalLink size={16} />}
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            {!repoLink && (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-teal/50 px-5 py-2.5 text-sm text-teal">
                <GitHubIcon className="size-4" /> TODO: repository link, if public
              </span>
            )}
          </div>
        )}
      </header>

      <div className="mt-12">
        <Block n="01" title="Project overview">
          <p><Text>{project.overview}</Text></p>
        </Block>
        <Block n="02" title="Problem statement">
          <p><Text>{project.problem}</Text></p>
        </Block>
        <Block n="03" title="Intended users">
          <p><Text>{project.users}</Text></p>
        </Block>
        <Block n="04" title="Solution and implemented features">
          {project.features.length ? (
            <ul className="list-disc space-y-2 pl-5">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : (
            <p>
              <Text>[[TODO: list the features you have confirmed work. Only verified features appear here.]]</Text>
            </p>
          )}
        </Block>
        <Block n="05" title="Technology stack">
          {project.stack.length ? (
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="rounded-md bg-surface-2 px-3 py-1.5 font-mono text-sm text-text">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p><Text>{project.stackNote ?? '[[TODO: stack]]'}</Text></p>
          )}
        </Block>
        <Block n="06" title="My specific contribution">
          <p><Text>{project.contribution}</Text></p>
        </Block>
        <Block n="07" title="Technical challenges and solutions">
          <ul className="space-y-4">
            {project.challenges.map((c, i) => (
              <li key={i} className="rounded-xl border border-line bg-surface p-4">
                <p className="text-text"><span className="font-semibold">Challenge: </span><Text>{c.challenge}</Text></p>
                <p className="mt-2"><span className="font-semibold text-text">Solution: </span><Text>{c.solution}</Text></p>
              </li>
            ))}
          </ul>
        </Block>
        <Block n="08" title="Screenshots and interface previews">
          <div className="grid gap-4 sm:grid-cols-2">
            {shots.map((s, i) => (
              <ScreenshotSlot key={i} shot={s} project={project.name} />
            ))}
          </div>
        </Block>
        <Block n="09" title="Lessons learned">
          <p><Text>{project.lessons}</Text></p>
        </Block>
      </div>

      <Reveal className="mt-6 border-t border-line pt-10">
        <p className="font-mono text-xs text-muted uppercase">Next project</p>
        <Link
          to={`/projects/${next.slug}`}
          className="mt-2 inline-flex items-center gap-2 font-display text-3xl font-bold transition hover:text-violet-soft"
        >
          {next.name} <ArrowUpRight />
        </Link>
      </Reveal>
    </article>
  )
}
