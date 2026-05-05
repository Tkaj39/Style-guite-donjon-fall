import Button from '../components/Button'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
    />
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.712Z"
    />
  </svg>
)

export default function ButtonsPage() {
  return (
    <ShowcasePage
      title="Buttons"
      description="Tlačítka jsou základní interaktivní prvky. Každá varianta nese sémantický význam — nepoužívej je jen vizuálně."
    >
      {/* Variants */}
      <Section
        title="Variants"
        description="Sedm základních variant pro různé kontexty a důrazy."
      >
        <Preview>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-outline">Danger Outline</Button>
          <Button variant="success">Success</Button>
        </Preview>
        <CodeBlock code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger-outline">Danger Outline</Button>
<Button variant="success">Success</Button>`} />
      </Section>

      {/* Sizes */}
      <Section
        title="Sizes"
        description="Pět velikostí od xs do xl pro různá použití v layoutu."
      >
        <Preview>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </Preview>
        <CodeBlock code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`} />
      </Section>

      {/* Icons */}
      <Section
        title="With Icons"
        description="Ikony mohou být vlevo (leading), vpravo (trailing), nebo obě."
      >
        <Preview>
          <Button leadingIcon={<PlusIcon />}>Add Item</Button>
          <Button variant="secondary" trailingIcon={<ArrowRightIcon />}>Continue</Button>
          <Button variant="outline" leadingIcon={<PlusIcon />} trailingIcon={<ArrowRightIcon />}>
            Both Icons
          </Button>
          <Button variant="danger" leadingIcon={<TrashIcon />}>Delete</Button>
        </Preview>
        <CodeBlock code={`<Button leadingIcon={<PlusIcon />}>Add Item</Button>
<Button variant="secondary" trailingIcon={<ArrowRightIcon />}>Continue</Button>
<Button variant="danger" leadingIcon={<TrashIcon />}>Delete</Button>`} />
      </Section>

      {/* Icon-only */}
      <Section
        title="Icon-only"
        description="Čtvercová tlačítka — ideální pro toolbary. Vždy přidej aria-label."
      >
        <Preview>
          <Button iconOnly size="xs" aria-label="Add"><PlusIcon /></Button>
          <Button iconOnly size="sm" aria-label="Add"><PlusIcon /></Button>
          <Button iconOnly size="md" aria-label="Add"><PlusIcon /></Button>
          <Button iconOnly size="lg" aria-label="Add"><PlusIcon /></Button>
          <Button iconOnly variant="outline" aria-label="Delete"><TrashIcon /></Button>
          <Button iconOnly variant="ghost" aria-label="Next"><ArrowRightIcon /></Button>
          <Button iconOnly variant="danger" aria-label="Delete"><TrashIcon /></Button>
        </Preview>
        <CodeBlock code={`<Button iconOnly size="md" aria-label="Add">
  <PlusIcon />
</Button>
<Button iconOnly variant="danger" aria-label="Delete">
  <TrashIcon />
</Button>`} />
      </Section>

      {/* Loading */}
      <Section
        title="Loading State"
        description="Při loading=true je tlačítko disabled a zobrazí spinner."
      >
        <Preview>
          <Button loading>Saving…</Button>
          <Button loading variant="secondary">Processing</Button>
          <Button loading variant="outline">Loading</Button>
          <Button loading iconOnly aria-label="Loading" />
        </Preview>
        <CodeBlock code={`<Button loading>Saving…</Button>
<Button loading iconOnly aria-label="Loading" />`} />
      </Section>

      {/* Disabled */}
      <Section
        title="Disabled State"
        description="Disabled tlačítka nejsou klikatelná a mají sníženou opacitu."
      >
        <Preview>
          <Button disabled>Primary</Button>
          <Button disabled variant="secondary">Secondary</Button>
          <Button disabled variant="outline">Outline</Button>
          <Button disabled variant="ghost">Ghost</Button>
          <Button disabled variant="danger">Danger</Button>
        </Preview>
        <CodeBlock code={`<Button disabled>Primary</Button>`} />
      </Section>

      {/* Full Width */}
      <Section
        title="Full Width"
        description="Tlačítko roztažené na celou šířku kontejneru."
      >
        <Preview>
          <div className="w-full flex flex-col gap-3">
            <Button fullWidth>Full Width Primary</Button>
            <Button fullWidth variant="outline">Full Width Outline</Button>
          </div>
        </Preview>
        <CodeBlock code={`<Button fullWidth>Full Width Primary</Button>`} />
      </Section>

      {/* Link variant */}
      <Section
        title="Link Variant"
        description="Inline tlačítko stylizované jako odkaz — bez padding, bez pozadí."
      >
        <Preview>
          <p className="text-neutral-300 text-sm">
            Souhlasíš s{' '}
            <Button variant="link" size="sm">podmínkami použití</Button>
            {' '}a{' '}
            <Button variant="link" size="sm">zásadami ochrany soukromí</Button>.
          </p>
        </Preview>
        <CodeBlock code={`<Button variant="link" size="sm">podmínkami použití</Button>`} />
      </Section>
    </ShowcasePage>
  )
}
