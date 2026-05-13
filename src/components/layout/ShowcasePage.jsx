import { Link } from 'react-router-dom'

function ApiChip({ slug }) {
  return (
    <Link
      to={`/components/${slug}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 hover:border-brand-600/60 hover:bg-neutral-700/80 transition-all text-[11px] font-mono text-neutral-400 hover:text-brand-300"
    >
      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="9" height="9">
        <path d="M3 2H1v7h8V7M6 1h3v3M9 1 5 5" />
      </svg>
      API: {slug}
    </Link>
  )
}

export function ShowcasePage({ title, description, children, componentSlug }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <header className="mb-8 lg:mb-10 border-b border-neutral-800 pb-6 lg:pb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">{title}</h2>
            {description && (
              <p className="text-neutral-400 text-sm lg:text-base">{description}</p>
            )}
          </div>
          {componentSlug && <ApiChip slug={componentSlug} />}
        </div>
      </header>
      <div className="flex flex-col gap-10 lg:gap-12">{children}</div>
    </div>
  )
}

export function Section({ id, title, description, children }) {
  return (
    <section id={id} className="flex flex-col gap-3 lg:gap-4">
      <div>
        <h3 className="text-base lg:text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-xs lg:text-sm text-neutral-500 mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export function Preview({ children, dark = true }) {
  return (
    <div
      className={`rounded-xl border border-neutral-800 p-4 sm:p-6 lg:p-8 flex flex-wrap items-start gap-3 lg:gap-4 overflow-x-auto ${
        dark ? 'bg-neutral-900' : 'bg-neutral-100'
      }`}
    >
      {children}
    </div>
  )
}

export function CodeBlock({ code }) {
  return (
    <pre className="rounded-lg bg-neutral-950 border border-neutral-800 px-4 lg:px-5 py-3 lg:py-4 text-xs lg:text-sm text-neutral-300 overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}
