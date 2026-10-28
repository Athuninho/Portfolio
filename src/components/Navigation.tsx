import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Resume', id: 'resume' },
  { label: 'Contact', id: 'contact' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback((returnFocus = false) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }, [])

  // Escape closes, Tab stays inside the open menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true)
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = [
          buttonRef.current,
          ...Array.from(menuRef.current.querySelectorAll<HTMLElement>('a,button')),
        ].filter(Boolean) as HTMLElement[]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    close()
    if (pathname === '/') {
      if (id === 'home') window.scrollTo({ top: 0 })
      else document.getElementById(id)?.scrollIntoView()
      history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`)
    } else {
      navigate(id === 'home' ? '/' : `/#${id}`)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" onClick={go('home')} className="flex items-center gap-2.5 font-display text-lg font-bold">
          <img src="/favicon.svg" alt="" width={28} height={28} className="rounded-md" />
          <span className="text-gradient">{profile.brand}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.id === 'home' ? '/' : `/#${l.id}`}
                onClick={go(l.id)}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            onClick={go('contact')}
            className="hidden rounded-full bg-violet px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet/90 sm:inline-block"
          >
            Let’s Connect
          </a>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-lg border border-line text-text lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="border-t border-line bg-ink/95 px-5 pb-6 pt-3 backdrop-blur-lg lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.id === 'home' ? '/' : `/#${l.id}`}
                  onClick={go(l.id)}
                  className="block rounded-lg px-3 py-3 text-lg text-text hover:bg-surface"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/#contact"
            onClick={go('contact')}
            className="mt-3 block rounded-full bg-violet px-5 py-3 text-center font-semibold text-white"
          >
            Let’s Connect
          </a>
        </div>
      )}
    </header>
  )
}
