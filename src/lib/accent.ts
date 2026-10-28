import type { Project } from '../data/projects'

// Full class names are listed so Tailwind can detect them.
export const accentStyles: Record<Project['accent'], { text: string; border: string; glow: string; dot: string }> = {
  violet: { text: 'text-violet-soft', border: 'hover:border-violet/70', glow: 'from-violet/30', dot: 'bg-violet' },
  teal: { text: 'text-teal', border: 'hover:border-teal/70', glow: 'from-teal/25', dot: 'bg-teal' },
  fuchsia: { text: 'text-fuchsia', border: 'hover:border-fuchsia/70', glow: 'from-fuchsia/25', dot: 'bg-fuchsia' },
  sky: { text: 'text-sky', border: 'hover:border-sky/70', glow: 'from-sky/25', dot: 'bg-sky' },
}
