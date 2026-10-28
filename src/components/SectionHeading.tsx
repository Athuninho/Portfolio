import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string
  title: string
  lead?: string
  id?: string
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-sm tracking-wider text-teal uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </Reveal>
  )
}
