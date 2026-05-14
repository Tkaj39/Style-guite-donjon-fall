import { useState } from 'react'
import DonjonButton from '../lib/donjon/DonjonButton'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" />
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.712Z" />
  </svg>
)

export default function ButtonsPage() {
  const [previewText, setPreviewText] = useState('Start')

  return (
    <ShowcasePage
      title="Buttons"
      description="Herní tlačítka Donjon Fall — osmihranný tvar s ornamenty. Každá varianta nese sémantický význam."
      componentSlug="donjon-button"
    >
      {/* Sizes */}
      <Section
        title="Sizes"
        description="Čtyři pevné výšky. Rohy jsou vždy stejný pixel cut bez deformace."
      >
        <Preview>
          <DonjonButton size="xs">Extra Small</DonjonButton>
          <DonjonButton size="sm">Small</DonjonButton>
          <DonjonButton size="md">Medium</DonjonButton>
          <DonjonButton size="lg">Large</DonjonButton>
        </Preview>
        <CodeBlock code={`<DonjonButton size="xs">Extra Small</DonjonButton>
<DonjonButton size="sm">Small</DonjonButton>
<DonjonButton size="md">Medium</DonjonButton>
<DonjonButton size="lg">Large</DonjonButton>`} />
      </Section>

      {/* Variants */}
      <Section
        title="Variants"
        description="default · danger · success · link"
      >
        <Preview>
          <DonjonButton variant="default">Default</DonjonButton>
          <DonjonButton variant="danger">Danger</DonjonButton>
          <DonjonButton variant="success">Success</DonjonButton>
          <p className="text-neutral-300 text-sm w-full">
            Souhlasím s{' '}
            <DonjonButton variant="link" size="sm">podmínkami</DonjonButton>
            {' '}a{' '}
            <DonjonButton variant="link" size="sm">ochranou soukromí</DonjonButton>.
          </p>
        </Preview>
        <CodeBlock code={`<DonjonButton variant="default">Default</DonjonButton>
<DonjonButton variant="danger">Danger</DonjonButton>
<DonjonButton variant="success">Success</DonjonButton>
<DonjonButton variant="link" size="sm">podmínkami</DonjonButton>`} />
      </Section>

      {/* Content */}
      <Section
        title="Content"
        description="text · pictogram + text · text + pictogram · pictogram"
      >
        <Preview>
          <DonjonButton>Jen text</DonjonButton>
          <DonjonButton leadingIcon={<PlusIcon />}>Ikona + text</DonjonButton>
          <DonjonButton trailingIcon={<ArrowRightIcon />}>Text + ikona</DonjonButton>
          <DonjonButton iconOnly aria-label="Přidat"><PlusIcon /></DonjonButton>
          <DonjonButton iconOnly aria-label="Smazat"><TrashIcon /></DonjonButton>
        </Preview>
        <CodeBlock code={`<DonjonButton>Text</DonjonButton>
<DonjonButton leadingIcon={<PlusIcon />}>Ikona + text</DonjonButton>
<DonjonButton trailingIcon={<ArrowRightIcon />}>Text + ikona</DonjonButton>
<DonjonButton iconOnly aria-label="Přidat"><PlusIcon /></DonjonButton>`} />
      </Section>

      {/* Loading */}
      <Section
        title="Loading State"
        description="Při loading=true je tlačítko disabled a zobrazí zlatý spinner."
      >
        <Preview>
          <DonjonButton size="xs" loading>Ukládám</DonjonButton>
          <DonjonButton size="sm" loading>Ukládám</DonjonButton>
          <DonjonButton size="md" loading>Zpracovávám</DonjonButton>
          <DonjonButton size="lg" loading>Načítám</DonjonButton>
          <DonjonButton size="md" loading iconOnly aria-label="Načítání" />
        </Preview>
        <CodeBlock code={`<DonjonButton loading>Ukládám</DonjonButton>
<DonjonButton loading iconOnly aria-label="Načítání" />`} />
      </Section>

      {/* Disabled */}
      <Section
        title="Disabled State"
        description="Disabled tlačítka nejsou klikatelná a mají sníženou opacitu."
      >
        <Preview>
          <DonjonButton disabled>Default</DonjonButton>
          <DonjonButton disabled variant="danger">Danger</DonjonButton>
          <DonjonButton disabled variant="success">Success</DonjonButton>
          <DonjonButton disabled leadingIcon={<PlusIcon />}>S ikonou</DonjonButton>
          <DonjonButton disabled iconOnly aria-label="Disabled"><TrashIcon /></DonjonButton>
        </Preview>
        <CodeBlock code={`<DonjonButton disabled>Disabled</DonjonButton>`} />
      </Section>

      {/* Full Width */}
      <Section
        title="Full Width"
        description="Tlačítko roztažené na celou šířku kontejneru."
      >
        <Preview>
          <div className="w-full flex flex-col gap-3">
            <DonjonButton fullWidth>Full Width Default</DonjonButton>
            <DonjonButton fullWidth variant="danger">Full Width Danger</DonjonButton>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonButton fullWidth>Full Width</DonjonButton>`} />
      </Section>

      {/* Live preview */}
      <Section
        title="Živý náhled textu"
        description="Napiš vlastní text a uvidíš, jak se zobrazí ve všech velikostech."
      >
        <input
          type="text"
          value={previewText}
          onChange={e => setPreviewText(e.target.value)}
          placeholder="Napiš text tlačítka…"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
        />
        <Preview>
          <div className="w-full flex flex-col items-start gap-4">
            {['xs', 'sm', 'md', 'lg'].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs text-neutral-500 w-6 shrink-0">{size}</span>
                <DonjonButton size={size}>{previewText || 'Text'}</DonjonButton>
              </div>
            ))}
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
