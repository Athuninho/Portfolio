import { ImageIcon } from 'lucide-react'

export default function ScreenshotSlot({
  shot,
  project,
}: {
  shot?: { src: string; alt: string }
  project: string
}) {
  if (shot) {
    return (
      <img
        src={shot.src}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full rounded-xl border border-line object-cover"
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={`Screenshot placeholder for ${project}`}
      className="grid aspect-video place-items-center rounded-xl border border-dashed border-teal/50 bg-surface text-center"
    >
      <div className="px-4">
        <ImageIcon className="mx-auto text-teal" size={28} aria-hidden="true" />
        <p className="mt-2 font-mono text-xs text-teal">TODO: add a screenshot of {project}</p>
      </div>
    </div>
  )
}
