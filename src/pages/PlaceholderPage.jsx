export default function PlaceholderPage({ title }) {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <header className="mb-10 border-b border-neutral-800 pb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-neutral-500 text-base">Coming soon.</p>
      </header>
    </div>
  )
}
