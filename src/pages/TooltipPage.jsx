import Tooltip from '../lib/tkajui/Tooltip'
import { goldDim, bg4 } from '../lib/donjon/tokens'
import DonjonTooltip from '../lib/donjon/DonjonTooltip'
import Button from '../lib/tkajui/Button'
import DonjonButton from '../lib/donjon/DonjonButton'
import Badge from '../lib/tkajui/Badge'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

const InfoIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-1 4h2v4H7V8Z" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
    <path d="M8 1 2 3.5v4C2 11 5 13.5 8 15c3-1.5 6-4 6-7.5v-4L8 1Z" />
  </svg>
)

function TooltipContent() {
  const lib = useLibVariant()
  const Tip = lib === 'tkajui' ? Tooltip : DonjonTooltip
  const Btn = lib === 'tkajui' ? Button : DonjonButton
  const Bdg = lib === 'tkajui' ? Badge : DonjonBadge
  const cmp = lib === 'tkajui' ? 'Tooltip' : 'DonjonTooltip'
  const btnCmp = lib === 'tkajui' ? 'Button' : 'DonjonButton'
  const bdgCmp = lib === 'tkajui' ? 'Badge' : 'DonjonBadge'

  return (
    <>
      {/* Placement */}
      <Section
        id="placement"
        title="Umístění"
        description="Čtyři směry — top (výchozí), bottom, left, right."
      >
        <Preview>
          <Tip content="Umístění nahoře" placement="top">
            <Btn size="sm">Top</Btn>
          </Tip>
          <Tip content="Umístění dole" placement="bottom">
            <Btn size="sm">Bottom</Btn>
          </Tip>
          <Tip content="Umístění vlevo" placement="left">
            <Btn size="sm">Left</Btn>
          </Tip>
          <Tip content="Umístění vpravo" placement="right">
            <Btn size="sm">Right</Btn>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp} content="Umístění nahoře" placement="top">
  <${btnCmp}>Top</${btnCmp}>
</${cmp}>

<${cmp} content="Umístění dole" placement="bottom">
  <${btnCmp}>Bottom</${btnCmp}>
</${cmp}>`} />
      </Section>

      {/* S titulkem */}
      <Section
        id="title"
        title="S titulkem"
        description="Volitelný titulek pro složitější vysvětlení."
      >
        <Preview>
          <Tip
            title="Ohnisko"
            content="Aktivní ohnisko dává +1 VP a přehodí vrchol věže na tomto hexu."
            placement="top"
          >
            <Btn size="sm" leadingIcon={<InfoIcon />}>Co je ohnisko?</Btn>
          </Tip>
          <Tip
            title="Základna"
            content="Výchozí pozice věže každého hráče. Nelze obsadit cizí základnu."
            placement="bottom"
          >
            <Btn size="sm" leadingIcon={<ShieldIcon />}>Základna</Btn>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp}
  title="Ohnisko"
  content="Aktivní ohnisko dává +1 VP a přehodí vrchol věže na tomto hexu."
  placement="top"
>
  <${btnCmp}>Co je ohnisko?</${btnCmp}>
</${cmp}>`} />
      </Section>

      {/* Varianty */}
      <Section
        id="variants"
        title="Varianty"
        description="Sémantické barevné varianty — default, danger, success, warning, info."
      >
        <Preview>
          {[
            { variant: 'default', label: 'Default',  content: 'Obecná informace' },
            { variant: 'danger',  label: 'Danger',   content: 'Nebezpečná akce' },
            { variant: 'success', label: 'Success',  content: 'Akce proběhla úspěšně' },
            { variant: 'warning', label: 'Warning',  content: 'Pozor, zkontroluj stav' },
            { variant: 'info',    label: 'Info',     content: 'Doplňující informace' },
          ].map(({ variant, label, content }) => (
            <Tip key={variant} content={content} variant={variant} placement="top">
              <Bdg variant={variant === 'default' ? 'default' : variant}>{label}</Bdg>
            </Tip>
          ))}
        </Preview>
        <CodeBlock code={`<${cmp} content="Nebezpečná akce" variant="danger" placement="top">
  <${bdgCmp} variant="danger">Danger</${bdgCmp}>
</${cmp}>`} />
      </Section>

      {/* Na různých prvcích */}
      <Section
        id="usage"
        title="Použití na různých prvcích"
        description="Tooltip funguje na libovolném child elementu."
      >
        <Preview>
          <Tip content="Toto tlačítko zahájí novou hru" placement="top">
            <Btn>Nová hra</Btn>
          </Tip>
          <Tip content="Stavový štítek hráče" placement="top">
            <Bdg dot variant="success">Aktivní</Bdg>
          </Tip>
          <Tip content="Ikonový trigger bez textu" placement="right">
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 4, background: bg4, border: `1px solid ${goldDim}`, cursor: 'help', color: goldDim }}>
              <InfoIcon />
            </span>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp} content="Toto tlačítko zahájí novou hru">
  <${btnCmp}>Nová hra</${btnCmp}>
</${cmp}>

<${cmp} content="Ikonový trigger" placement="right">
  <span>
    <InfoIcon />
  </span>
</${cmp}>`} />
      </Section>

      {/* Disabled */}
      <Section
        id="disabled"
        title="Disabled"
        description="Tooltip lze vypnout prop disabled — hodí se pro dynamické podmínky."
      >
        <Preview>
          <Tip content="Tenhle tooltip se nezobrazí" disabled>
            <Btn size="sm" disabled>Disabled tooltip</Btn>
          </Tip>
          <Tip content="Tenhle tooltip funguje normálně">
            <Btn size="sm">Aktivní tooltip</Btn>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp} content="Skrytý tooltip" disabled>
  <${btnCmp} disabled>Disabled</${btnCmp}>
</${cmp}>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Použij pro ikony bez viditelného popisku — vždy musí mít tooltip nebo aria-label.</p>
          <p>✓ Maximálně 2–3 věty. Pokud potřebuješ víc textu, použij dialog.</p>
          <p>✓ Titulek použij pro složitější herní pojmy, kde název a vysvětlení mají být oddělené.</p>
          <p>✗ Nedávej do tooltipu interaktivní obsah (tlačítka, linky) — není přístupný z klávesnice.</p>
          <p>✗ Nepoužívej tooltip pro kritické informace — uživatel ho může přehlédnout.</p>
        </div>
      </Section>
    </>
  )
}

export default function TooltipPage() {
  return (
    <ShowcasePage
      title="Tooltip"
      description="Kontextová nápověda zobrazená při najetí myší nebo focusu. Krátký text, volitelný titulek, 4 směry umístění a 5 barevných variant."
      componentSlugs={['donjon-tooltip', 'tooltip']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <TooltipContent />
    </ShowcasePage>
  )
}
