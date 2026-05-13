import Tooltip from '../components/Tooltip'
import DonjonButton from '../components/DonjonButton'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

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

export default function TooltipPage() {
  return (
    <ShowcasePage
      title="Tooltip"
      description="Kontextová nápověda zobrazená při najetí myší nebo focusu. Krátký text, volitelný titulek, 4 směry umístění a 5 barevných variant."
      componentSlug="tooltip"
    >
      {/* Placement */}
      <Section
        id="placement"
        title="Umístění"
        description="Čtyři směry — top (výchozí), bottom, left, right."
      >
        <Preview>
          <Tooltip content="Umístění nahoře" placement="top">
            <DonjonButton size="sm">Top</DonjonButton>
          </Tooltip>
          <Tooltip content="Umístění dole" placement="bottom">
            <DonjonButton size="sm">Bottom</DonjonButton>
          </Tooltip>
          <Tooltip content="Umístění vlevo" placement="left">
            <DonjonButton size="sm">Left</DonjonButton>
          </Tooltip>
          <Tooltip content="Umístění vpravo" placement="right">
            <DonjonButton size="sm">Right</DonjonButton>
          </Tooltip>
        </Preview>
        <CodeBlock code={`<Tooltip content="Umístění nahoře" placement="top">
  <DonjonButton>Top</DonjonButton>
</Tooltip>

<Tooltip content="Umístění dole" placement="bottom">
  <DonjonButton>Bottom</DonjonButton>
</Tooltip>`} />
      </Section>

      {/* S titulkem */}
      <Section
        id="title"
        title="S titulkem"
        description="Volitelný titulek pro složitější vysvětlení."
      >
        <Preview>
          <Tooltip
            title="Ohnisko"
            content="Aktivní ohnisko dává +1 VP a přehodí vrchol věže na tomto hexu."
            placement="top"
          >
            <DonjonButton size="sm" leadingIcon={<InfoIcon />}>Co je ohnisko?</DonjonButton>
          </Tooltip>
          <Tooltip
            title="Základna"
            content="Výchozí pozice věže každého hráče. Nelze obsadit cizí základnu."
            placement="bottom"
          >
            <DonjonButton size="sm" leadingIcon={<ShieldIcon />}>Základna</DonjonButton>
          </Tooltip>
        </Preview>
        <CodeBlock code={`<Tooltip
  title="Ohnisko"
  content="Aktivní ohnisko dává +1 VP a přehodí vrchol věže na tomto hexu."
  placement="top"
>
  <DonjonButton>Co je ohnisko?</DonjonButton>
</Tooltip>`} />
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
            <Tooltip key={variant} content={content} variant={variant} placement="top">
              <DonjonBadge variant={variant === 'default' ? 'default' : variant}>{label}</DonjonBadge>
            </Tooltip>
          ))}
        </Preview>
        <CodeBlock code={`<Tooltip content="Nebezpečná akce" variant="danger" placement="top">
  <DonjonBadge variant="danger">Danger</DonjonBadge>
</Tooltip>`} />
      </Section>

      {/* Na různých prvcích */}
      <Section
        id="usage"
        title="Použití na různých prvcích"
        description="Tooltip funguje na libovolném child elementu."
      >
        <Preview>
          <Tooltip content="Toto tlačítko zahájí novou hru" placement="top">
            <DonjonButton>Nová hra</DonjonButton>
          </Tooltip>
          <Tooltip content="Stavový štítek hráče" placement="top">
            <DonjonBadge dot variant="success">Aktivní</DonjonBadge>
          </Tooltip>
          <Tooltip content="Ikonový trigger bez textu" placement="right">
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 4, background: '#2A2948', border: '1px solid #8F7458', cursor: 'help', color: '#8F7458' }}>
              <InfoIcon />
            </span>
          </Tooltip>
        </Preview>
        <CodeBlock code={`<Tooltip content="Toto tlačítko zahájí novou hru">
  <DonjonButton>Nová hra</DonjonButton>
</Tooltip>

<Tooltip content="Ikonový trigger" placement="right">
  <span>
    <InfoIcon />
  </span>
</Tooltip>`} />
      </Section>

      {/* Disabled */}
      <Section
        id="disabled"
        title="Disabled"
        description="Tooltip lze vypnout prop disabled — hodí se pro dynamické podmínky."
      >
        <Preview>
          <Tooltip content="Tenhle tooltip se nezobrazí" disabled>
            <DonjonButton size="sm" disabled>Disabled tooltip</DonjonButton>
          </Tooltip>
          <Tooltip content="Tenhle tooltip funguje normálně">
            <DonjonButton size="sm">Aktivní tooltip</DonjonButton>
          </Tooltip>
        </Preview>
        <CodeBlock code={`<Tooltip content="Skrytý tooltip" disabled>
  <DonjonButton disabled>Disabled</DonjonButton>
</Tooltip>`} />
      </Section>

      {/* Pravidla */}
      <Section
        id="pravidla"
        title="Pravidla použití"
      >
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Použij pro ikony bez viditelného popisku — vždy musí mít tooltip nebo aria-label.</p>
          <p>✓ Maximálně 2–3 věty. Pokud potřebuješ víc textu, použij dialog.</p>
          <p>✓ Titulek použij pro složitější herní pojmy, kde název a vysvětlení mají být oddělené.</p>
          <p>✗ Nedávej do tooltipu interaktivní obsah (tlačítka, linky) — není přístupný z klávesnice.</p>
          <p>✗ Nepoužívej tooltip pro kritické informace — uživatel ho může přehlédnout.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
