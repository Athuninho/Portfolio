import { skillGroups } from '../data/skills'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Text from './Text'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Toolbox"
        title="Skills and technologies"
        id="skills-title"
        lead="Technologies I have used in my coursework and projects. Dashed items are still to be confirmed."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Reveal as="li" key={g.id} delay={(i % 4) * 0.06}>
            <div className="h-full rounded-2xl border border-line bg-surface p-5">
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm transition hover:border-teal/60"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              {g.todo && (
                <p className="mt-3 text-sm">
                  <Text>{g.todo}</Text>
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
