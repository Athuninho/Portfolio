import { BookOpen, Compass, GraduationCap, Target, Wrench } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const cards = [
  { Icon: GraduationCap, title: 'Background', body: profile.about.background },
  { Icon: Wrench, title: 'How I solve problems', body: profile.about.approach },
  { Icon: Compass, title: 'What interests me', body: profile.about.interest },
  { Icon: BookOpen, title: 'How I learn', body: profile.about.learning },
  { Icon: Target, title: 'Where I am heading', body: profile.about.goals },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Who I am" title="About me" id="about-title" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          {profile.photo && (
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.fullName}`}
              loading="lazy"
              className="mb-6 aspect-square w-48 rounded-2xl border border-line object-cover"
            />
          )}
          <div className="space-y-4 text-lg leading-relaxed text-text/90">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            <span className="font-semibold text-text">Languages: </span>
            {profile.languages.join(' · ')}
          </p>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.06} className={i === cards.length - 1 ? 'sm:col-span-2' : ''}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5 transition hover:border-violet/50">
                <Icon className="text-teal" size={22} aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
