import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './Icons'

const links = [
  ['Projects', 'projects'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Resume', 'resume'],
  ['Contact', 'contact'],
] as const

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg font-bold text-gradient inline-block">{profile.brand}</p>
          <p className="mt-1 text-sm text-muted">© {YEAR} {profile.fullName}. Built with React and TypeScript.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {links.map(([label, id]) => (
              <li key={id}>
                <Link to={`/#${id}`} className="transition hover:text-text">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-3">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-teal/60 hover:text-text">
            <GitHubIcon className="size-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-teal/60 hover:text-text">
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
