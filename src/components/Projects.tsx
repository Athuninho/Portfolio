import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        id="projects-title"
        lead="Four projects, each with a case study that states my role and what I actually did."
      />
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 0.1}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
