import { useState } from 'react'
import type { FormEvent } from 'react'
import { AlertCircle, Check, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { GitHubIcon, LinkedInIcon } from './Icons'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'mailto'
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

/**
 * Set VITE_FORM_ENDPOINT (see README) to a Formspree / Web3Forms / EmailJS-compatible
 * URL. Without it the form never pretends to send: it opens your email app instead.
 */
const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim()

const field =
  'mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-text placeholder:text-muted/60 transition focus:border-teal focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-teal/40 aria-[invalid=true]:border-fuchsia'

function validate(d: Record<string, string>): Errors {
  const e: Errors = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Please enter a valid email address.'
  if (d.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (d.message.trim().length < 10) e.message = 'Please write at least a sentence (10 characters).'
  return e
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = ev.currentTarget
    const fd = new FormData(form)
    const data = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      subject: String(fd.get('subject') ?? ''),
      message: String(fd.get('message') ?? ''),
    }
    // Honeypot: real visitors never see this field. Bots fill it in.
    if (fd.get('website')) return

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) return

    if (!ENDPOINT) {
      const body = `${data.message}\n\n${data.name}\n${data.email}`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof Errors) => errors[k]

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-12">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-violet/20 blur-[90px]" aria-hidden="true" />
        <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Let’s connect"
              title="Contact"
              id="contact-title"
              lead="Hiring for an internship or junior developer role, or want to collaborate? I would like to hear from you."
            />
            <Reveal>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-text transition hover:text-teal">
                    <Mail size={20} className="text-teal" aria-hidden="true" /> {profile.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${profile.phoneHref}`} className="flex items-center gap-3 text-text transition hover:text-teal">
                    <Phone size={20} className="text-teal" aria-hidden="true" /> {profile.phone}
                  </a>
                </li>
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text transition hover:text-teal">
                    <GitHubIcon className="size-5 text-teal" /> github.com/{profile.githubHandle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text transition hover:text-teal">
                    <LinkedInIcon className="size-5 text-teal" /> LinkedIn profile
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label>
                  Leave this field empty
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="text-sm font-medium">Name</label>
                  <input id="c-name" name="name" autoComplete="name" required aria-invalid={!!err('name')} aria-describedby={err('name') ? 'c-name-e' : undefined} className={field} />
                  {err('name') && <p id="c-name-e" className="mt-1 text-sm text-fuchsia">{err('name')}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="text-sm font-medium">Email</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={!!err('email')} aria-describedby={err('email') ? 'c-email-e' : undefined} className={field} />
                  {err('email') && <p id="c-email-e" className="mt-1 text-sm text-fuchsia">{err('email')}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="c-subject" className="text-sm font-medium">Subject</label>
                <input id="c-subject" name="subject" required aria-invalid={!!err('subject')} aria-describedby={err('subject') ? 'c-subject-e' : undefined} className={field} />
                {err('subject') && <p id="c-subject-e" className="mt-1 text-sm text-fuchsia">{err('subject')}</p>}
              </div>
              <div>
                <label htmlFor="c-message" className="text-sm font-medium">Message</label>
                <textarea id="c-message" name="message" rows={5} required maxLength={4000} aria-invalid={!!err('message')} aria-describedby={err('message') ? 'c-message-e' : undefined} className={field} />
                {err('message') && <p id="c-message-e" className="mt-1 text-sm text-fuchsia">{err('message')}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                <Send size={18} aria-hidden="true" />
                {status === 'submitting' ? 'Sending…' : ENDPOINT ? 'Send message' : 'Compose email'}
              </button>

              {!ENDPOINT && (
                <p className="text-sm text-muted">
                  This form opens your email app with the message ready to send. Direct submission is not enabled yet.
                </p>
              )}

              <div aria-live="polite" role="status">
                {status === 'success' && (
                  <p className="flex items-start gap-2 rounded-xl border border-teal/50 bg-teal/10 p-4 text-teal">
                    <Check size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> Thank you, your message was sent. I will reply as soon as I can.
                  </p>
                )}
                {status === 'mailto' && (
                  <p className="flex items-start gap-2 rounded-xl border border-violet/50 bg-violet/10 p-4 text-violet-soft">
                    <Mail size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> Your email app should have opened. If nothing happened, write to {profile.email} directly.
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="flex items-start gap-2 rounded-xl border border-fuchsia/50 bg-fuchsia/10 p-4 text-fuchsia">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> Something went wrong and your message was not sent. Please email {profile.email} instead.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
