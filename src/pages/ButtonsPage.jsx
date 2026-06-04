import { useState } from 'react'
import Button from '../lib/tkajui/Button'
import DonjonButton from '../lib/donjon/DonjonButton'
import ButtonGroup from '../lib/tkajui/ButtonGroup'
import DonjonButtonGroup from '../lib/donjon/DonjonButtonGroup'
import IconButton from '../lib/tkajui/IconButton'
import SubmitButton from '../lib/tkajui/SubmitButton'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { textMid, textLow } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

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

/* ── ButtonGroup demo (consumes lib variant) ── */
function ButtonGroupDemo() {
  const lib  = useLibVariant()
  const Grp  = lib === 'donjon' ? DonjonButtonGroup : ButtonGroup
  const [view, setView] = useState('map')
  const [size, setSize] = useState('md')
  return (
    <Stack gap="lg">
      <Grp
        items={[
          { value: 'map',  label: 'Map' },
          { value: 'list', label: 'List' },
          { value: 'tree', label: 'Tree' },
        ]}
        value={view}
        onChange={setView}
      />
      <Grp
        items={[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ]}
        value={size}
        onChange={setSize}
        variant="tabs"
      />
    </Stack>
  )
}

/* ── Obsah stránky — čte aktivní variantu přes hook ── */
function ButtonContent() {
  const lib = useLibVariant()                      // 'donjon' | 'tkajui'
  const Btn = lib === 'tkajui' ? Button : DonjonButton
  const cmp = lib === 'tkajui' ? 'Button' : 'DonjonButton'

  const [previewText, setPreviewText] = useState('Start')

  return (
    <>
      {/* Sizes */}
      <Section
        title="Sizes"
        description="Čtyři pevné výšky. Rohy jsou vždy stejný pixel cut bez deformace."
      >
        <Preview>
          <Btn size="xs">Extra Small</Btn>
          <Btn size="sm">Small</Btn>
          <Btn size="md">Medium</Btn>
          <Btn size="lg">Large</Btn>
        </Preview>
        <CodeBlock code={`<${cmp} size="xs">Extra Small</${cmp}>
<${cmp} size="sm">Small</${cmp}>
<${cmp} size="md">Medium</${cmp}>
<${cmp} size="lg">Large</${cmp}>`} />
      </Section>

      {/* Variants */}
      <Section
        title="Variants"
        description="default · danger · success · link"
      >
        <Preview>
          <Btn variant="default">Default</Btn>
          <Btn variant="danger">Danger</Btn>
          <Btn variant="success">Success</Btn>
          <p className="text-neutral-300 text-sm w-full">
            Souhlasím s{' '}
            <Btn variant="link" size="sm">podmínkami</Btn>
            {' '}a{' '}
            <Btn variant="link" size="sm">ochranou soukromí</Btn>.
          </p>
        </Preview>
        <CodeBlock code={`<${cmp} variant="default">Default</${cmp}>
<${cmp} variant="danger">Danger</${cmp}>
<${cmp} variant="success">Success</${cmp}>
<${cmp} variant="link" size="sm">podmínkami</${cmp}>`} />
      </Section>

      {lib === 'donjon' && (
        <Section
          title="Decorated vs Plain"
          description="DonjonButton nově umí běžet i bez ornamentů. Default zůstává decorated, plain je opt-in režim se stejným shell a tokeny."
        >
          <Preview>
            <DonjonButton onClick={() => alert('Decorated kliknuto')}>Decorated</DonjonButton>
            <DonjonButton ornament="plain" onClick={() => alert('Plain kliknuto')}>Plain</DonjonButton>
            <DonjonButton leadingIcon={<PlusIcon />}>Decorated + icon</DonjonButton>
            <DonjonButton ornament="plain" leadingIcon={<PlusIcon />}>Plain + icon</DonjonButton>
          </Preview>
          <CodeBlock code={`<DonjonButton>Decorated</DonjonButton>
<DonjonButton ornament="plain">Plain</DonjonButton>
<DonjonButton leadingIcon={<PlusIcon />}>Decorated + icon</DonjonButton>
<DonjonButton ornament="plain" leadingIcon={<PlusIcon />}>Plain + icon</DonjonButton>`} />
        </Section>
      )}


      {/* Content */}
      <Section
        title="Content"
        description="text · ikona + text · text + ikona · jen ikona"
      >
        <Preview>
          <Btn>Jen text</Btn>
          <Btn leadingIcon={<PlusIcon />}>Ikona + text</Btn>
          <Btn trailingIcon={<ArrowRightIcon />}>Text + ikona</Btn>
          <Btn iconOnly aria-label="Přidat"><PlusIcon /></Btn>
          <Btn iconOnly aria-label="Smazat"><TrashIcon /></Btn>
        </Preview>
        <CodeBlock code={`<${cmp}>Text</${cmp}>
<${cmp} leadingIcon={<PlusIcon />}>Ikona + text</${cmp}>
<${cmp} trailingIcon={<ArrowRightIcon />}>Text + ikona</${cmp}>
<${cmp} iconOnly aria-label="Přidat"><PlusIcon /></${cmp}>`} />
      </Section>

      {/* Interactive States */}
      <Section
        title="Interaktivní stavy"
        description="Vizuální stav tlačítka při hover, stisknutí a fokus — simulované pro přehled."
      >
        <Preview>
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'idle',    filter: 'none',              shadow: 'none'                     },
              { label: 'hover',   filter: 'brightness(1.1)',   shadow: 'none'                     },
              { label: 'active',  filter: 'brightness(0.9)',   shadow: 'none'                     },
              { label: 'focus',   filter: 'none',              shadow: '0 0 8px #FFC183AA'        },
              { label: 'disabled',filter: 'opacity(0.4)',      shadow: 'none', disabled: true     },
            ].map(({ label, filter, shadow, disabled: dis }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span
                  style={{
                    display: 'inline-flex',
                    filter: [filter !== 'none' ? filter : null, shadow !== 'none' ? `drop-shadow(${shadow})` : null].filter(Boolean).join(' ') || 'none',
                    pointerEvents: 'none',
                  }}
                >
                  <Btn disabled={dis} tabIndex={-1}>Akce</Btn>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">{label}</span>
              </div>
            ))}
          </div>
        </Preview>
        {/* eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal) */}
        <CodeBlock code={`// hover  → filter: brightness(1.1)
// active → filter: brightness(0.9)
// focus  → filter: drop-shadow(0 0 8px #FFC183AA)
// disabled → opacity: 0.4 + pointer-events: none`} />
      </Section>

      {/* Loading */}
      <Section
        title="Loading State"
        description="Při loading=true je tlačítko disabled a zobrazí zlatý spinner."
      >
        <Preview>
          <Btn size="xs" loading>Ukládám</Btn>
          <Btn size="sm" loading>Ukládám</Btn>
          <Btn size="md" loading>Zpracovávám</Btn>
          <Btn size="lg" loading>Načítám</Btn>
          <Btn size="md" loading iconOnly aria-label="Načítání" />
        </Preview>
        <CodeBlock code={`<${cmp} loading>Ukládám</${cmp}>
<${cmp} loading iconOnly aria-label="Načítání" />`} />
      </Section>

      {/* Disabled */}
      <Section
        title="Disabled State"
        description="Disabled tlačítka nejsou klikatelná a mají sníženou opacitu."
      >
        <Preview>
          <Btn disabled>Default</Btn>
          <Btn disabled variant="danger">Danger</Btn>
          <Btn disabled variant="success">Success</Btn>
          <Btn disabled leadingIcon={<PlusIcon />}>S ikonou</Btn>
          <Btn disabled iconOnly aria-label="Disabled"><TrashIcon /></Btn>
        </Preview>
        <CodeBlock code={`<${cmp} disabled>Disabled</${cmp}>`} />
      </Section>

      {/* Full Width */}
      <Section
        title="Full Width"
        description="Tlačítko roztažené na celou šířku kontejneru."
      >
        <Preview>
          <div className="w-full flex flex-col gap-3">
            <Btn fullWidth>Full Width Default</Btn>
            <Btn fullWidth variant="danger">Full Width Danger</Btn>
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} fullWidth>Full Width</${cmp}>`} />
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
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
        />
        <Preview>
          <div className="w-full flex flex-col items-start gap-4">
            {['xs', 'sm', 'md', 'lg'].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs text-neutral-500 w-6 shrink-0">{size}</span>
                <Btn size={size}>{previewText || 'Text'}</Btn>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Variants × States matrix */}
      <Section
        title="Varianty × stavy"
        description="Přehledná mřížka — každá varianta tlačítka ve všech stavech najednou."
      >
        <Preview>
          <div className="w-full overflow-x-auto">
            <table className="text-xs text-neutral-500 border-collapse w-full min-w-[520px]">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 font-normal text-neutral-600 w-20">variant</th>
                  {['idle','hover','active','focus','disabled'].map(s => (
                    <th key={s} className="py-2 px-3 font-mono font-normal text-neutral-600 text-center">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(lib === 'tkajui'
                  ? ['default','primary','danger','success']
                  : ['default','danger','success']
                ).map(variant => (
                  <tr key={variant} className="border-t border-neutral-800/50">
                    <td className="py-3 pr-4 font-mono text-[10px] text-neutral-600">{variant}</td>
                    {[
                      { filter: 'none',           shadow: 'none' },
                      { filter: 'brightness(1.1)', shadow: 'none' },
                      { filter: 'brightness(0.9)', shadow: 'none' },
                      { filter: 'none',            shadow: '0 0 8px #FFC183AA' },
                      { filter: 'opacity(0.4)',    shadow: 'none', disabled: true },
                    ].map(({ filter, shadow, disabled: dis }, i) => (
                      <td key={i} className="py-3 px-3 text-center">
                        <span
                          style={{
                            display: 'inline-flex',
                            filter: [
                              filter !== 'none' ? filter : null,
                              shadow !== 'none' ? `drop-shadow(${shadow})` : null,
                            ].filter(Boolean).join(' ') || 'none',
                            pointerEvents: 'none',
                          }}
                        >
                          <Btn size="sm" variant={variant} disabled={dis} tabIndex={-1}>Text</Btn>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Preview>
      </Section>

      {/* ── IconButton ────────────────────────────────────────────── */}
      <Section
        id="icon-button"
        title="IconButton — square icon-only action"
        description="Stejný octagonální silhouette jako Button, ale width=height. Vyžaduje `ariaLabel`. `active` prop pro toggle (mute, pin). Pro ikona+text → použij regulární Button s `leadingIcon`."
      >
        <Preview>
          <Stack gap="md">
            <Inline gap="md" align="center">
              {['xs', 'sm', 'md', 'lg'].map(sz => (
                <Stack key={sz} gap="xs" align="center">
                  <IconButton size={sz} ariaLabel="Settings">⚙</IconButton>
                  <span style={{ fontSize: '0.7rem', color: textLow }}>{sz}</span>
                </Stack>
              ))}
            </Inline>
            <Inline gap="sm">
              <IconButton ariaLabel="Confirm" variant="success">✓</IconButton>
              <IconButton ariaLabel="Delete"  variant="danger">×</IconButton>
              <IconButton ariaLabel="Warning" variant="warning">!</IconButton>
              <IconButton ariaLabel="Info"    variant="info">ⓘ</IconButton>
              <IconButton ariaLabel="Disabled" disabled>↻</IconButton>
            </Inline>
          </Stack>
        </Preview>
        <CodeBlock code={`<IconButton ariaLabel="Settings">⚙</IconButton>
<IconButton ariaLabel="Confirm" variant="success">✓</IconButton>
<IconButton ariaLabel="Mute" active={muted} onClick={toggle}>🔇</IconButton>`} />
      </Section>

      {/* ── ButtonGroup ───────────────────────────────────────────── */}
      <Section
        id="button-group"
        title="ButtonGroup — segmented control"
        description="Single-select skupina tlačítek. Items obsahují value + label (+ ikonu). Pro toggle filtry, view switchers, segmentované volby. donjon variant má side ornamenty na krajích."
      >
        <Preview>
          <ButtonGroupDemo />
        </Preview>
        <CodeBlock code={`<ButtonGroup
  items={[
    { value: 'map',  label: 'Map' },
    { value: 'list', label: 'List' },
  ]}
  value={view}
  onChange={setView}
/>`} />
      </Section>

      {/* ── SubmitButton ──────────────────────────────────────────── */}
      <Section
        id="submit-button"
        title="SubmitButton — pending state via useFormStatus"
        description="`type='submit'` Button uvnitř <form>. Při pending state zamění label za `loadingLabel`. Postaveno na useFormStatus z React 19. Použij uvnitř <form action={action}>."
      >
        <Preview>
          <Stack gap="md">
            <form><SubmitButton loadingLabel="Saving…">Save</SubmitButton></form>
            <form>
              <Inline gap="sm">
                <SubmitButton variant="success">Sign up</SubmitButton>
                <SubmitButton variant="danger" loadingLabel="Deleting…">Delete</SubmitButton>
              </Inline>
            </form>
          </Stack>
        </Preview>
        <CodeBlock code={`<form action={saveAction}>
  <SubmitButton loadingLabel="Saving…">Save</SubmitButton>
</form>`} />
      </Section>

      {/* Legacy URL map */}
      <Section id="legacy-routes" title="Legacy URL → anchor map">
        <Stack gap="xs" style={{ fontSize: '0.8125rem', color: textMid }}>
          <p style={{ margin: 0 }}><code>/button-groups</code> → <code>/buttons#button-group</code></p>
          <p style={{ margin: 0, color: textLow }}>Staré routes jsou Navigate redirects.</p>
        </Stack>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Primární akce (nová hra, potvrzení) → <code className="text-brand-300">variant="default"</code> nebo <code className="text-brand-300">"success"</code>.</p>
          <p>✓ Destruktivní akce (smazat, opustit hru) → <code className="text-brand-300">variant="danger"</code>.</p>
          <p>✓ Ikony používej pro posílení kontextu — <code className="text-brand-300">leadingIcon</code> pro akci, <code className="text-brand-300">trailingIcon</code> pro směr/výstup.</p>
          <p>✓ Pro ikonová tlačítka bez textu vždy přidej <code className="text-brand-300">aria-label</code>.</p>
          <p>✗ Nestackuj víc než 3 tlačítka v řadě — použij ButtonGroup nebo oddělení mezerou.</p>
          <p>✗ Nepoužívej <code className="text-brand-300">disabled</code> bez kontextu — pokud to není zřejmé, přidej Tooltip s vysvětlením.</p>
          <p>✗ Nepoužívej <code className="text-brand-300">variant="link"</code> pro navigaci — to patří do routeru, ne do akčního tlačítka.</p>
        </div>
      </Section>
    </>
  )
}

/* ── Page ── */
export default function ButtonsPage() {
  return (
    <ShowcasePage
      title="Buttons"
      description="Herní tlačítka Donjon Fall — osmihranný tvar. donjon-fall-ui umí dekorovaný ornamentální režim i plain gold-frame režim, TkajUI základ zůstává čistý bez ornamentů."
      componentSlugs={['donjon-button', 'button', 'button-group', 'donjon-button-group', 'icon-button', 'submit-button']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <ButtonContent />
    </ShowcasePage>
  )
}
