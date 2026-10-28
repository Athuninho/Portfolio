import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-teal">404</p>
        <h1 className="mt-3 font-display text-5xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted">That page does not exist. Head back to the portfolio.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-violet px-6 py-3 font-semibold text-white">
          Back home
        </Link>
      </div>
    </section>
  )
}
