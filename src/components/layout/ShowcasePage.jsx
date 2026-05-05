export function ShowcasePage({ title, description, children }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <header className="mb-8 lg:mb-10 border-b border-neutral-800 pb-6 lg:pb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{title}</h2>
        {description && (
          <p className="text-neutral-400 text-sm lg:text-base">{description}</p>
        )}
      </header>
      <div className="flex flex-col gap-10 lg:gap-12">{children}</div>
    </div>
  )
}

export function Section({ title, description, children }) {
  return (
    <section className="flex flex-col gap-3 lg:gap-4">
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
      className={`rounded-xl border border-neutral-800 p-4 sm:p-6 lg:p-8 flex flex-wrap items-center gap-3 lg:gap-4 ${
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
