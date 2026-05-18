import Tooltip from '../lib/tkajui/Tooltip'
import DonjonTooltip from '../lib/donjon/DonjonTooltip'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../components/layout/ShowcasePage'

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
  const cmp = lib === 'tkajui' ? 'Tooltip' : 'DonjonTooltip'

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
            <DonjonButton size="sm">Top</DonjonButton>
          </Tip>
          <Tip content="Umístění dole" placement="bottom">
            <DonjonButton size="sm">Bottom</DonjonButton>
          </Tip>
          <Tip content="Umístění vlevo" placement="left">
            <DonjonButton size="sm">Left</DonjonButton>
          </Tip>
          <Tip content="Umístění vpravo" placement="right">
            <DonjonButton size="sm">Right</DonjonButton>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp} content="Umístění nahoře" placement="top">
  <DonjonButton>Top</DonjonButton>
</${cmp}>

<${cmp} content="Umístění dole" placement="bottom">
  <DonjonButton>Bottom</DonjonButton>
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
            <DonjonButton size="sm" leadingIcon={<InfoIcon />}>Co je ohnisko?</DonjonButton>
          </Tip>
          <Tip
            title="Základna"
            content="Výchozí pozice věže každého hráče. Nelze obsadit cizí základnu."
            placement="bottom"
          >
            <DonjonButton size="sm" leadingIcon={<ShieldIcon />}>Základna</DonjonButton>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp}
  title="Ohnisko"
  content="Aktivní ohnisko dává +1 VP a přehodí vrchol věže na tomto hexu."
  placement="top"
>
  <DonjonButton>Co je ohnisko?</DonjonButton>
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
              <DonjonBadge variant={variant === 'default' ? 'default' : variant}>{label}</DonjonBadge>
            </Tip>
          ))}
        </Preview>
        <CodeBlock code={`<${cmp} content="Nebezpečná akce" variant="danger" placement="top">
  <DonjonBadge variant="danger">Danger</DonjonBadge>
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
            <DonjonButton>Nová hra</DonjonButton>
          </Tip>
          <Tip content="Stavový štítek hráče" placement="top">
            <DonjonBadge dot variant="success">Aktivní</DonjonBadge>
          </Tip>
          <Tip content="Ikonový trigger bez textu" placement="right">
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 4, background: '#2A2948', border: '1px solid #8F7458', cursor: 'help', color: '#8F7458' }}>
              <InfoIcon />
            </span>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp} content="Toto tlačítko zahájí novou hru">
  <DonjonButton>Nová hra</DonjonButton>
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
            <DonjonButton size="sm" disabled>Disabled tooltip</DonjonButton>
          </Tip>
          <Tip content="Tenhle tooltip funguje normálně">
            <DonjonButton size="sm">Aktivní tooltip</DonjonButton>
          </Tip>
        </Preview>
        <CodeBlock code={`<${cmp} content="Skrytý tooltip" disabled>
  <DonjonButton disabled>Disabled</DonjonButton>
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
