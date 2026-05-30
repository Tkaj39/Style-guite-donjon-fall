import { useLibVariant, ShowcasePage, Section, CodeBlock } from '../styleguide/ShowcasePage'
import * as T from '../lib/tkajui/tokens'
import * as D from '../lib/donjon/tokens'
import { playerColors } from '../lib/donjon/playerColors'
import { pickContrastText } from '../lib/shared/contrast'

/* ── Swatch ── */
function Swatch({ name, hex, note, large = false, textPreview }) {
  // Kontrastní text preview ('Aa') přes WCAG luma — knihovní textHigh
  // jako tmavá/světlá varianta podle pozadí swatche.
  const previewColor = pickContrastText(hex, {
    onDark:  T.textHigh,    // světlý text na tmavém swatchi
    onLight: D.bg0,         // tmavý text na světlém swatchi (textHigh, parchment)
  })
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`rounded-sm border border-white/8 w-full ${large ? 'h-16' : 'h-10'} flex items-center justify-center`}
        style={{ background: hex }}
      >
        {textPreview && (
          <span style={{ fontSize: '0.625rem', fontWeight: 600, color: previewColor }}>
            {textPreview}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-neutral-300 leading-tight">{name}</p>
        {note && <p className="text-xs text-neutral-600 leading-tight">{note}</p>}
        <p className="text-xs text-neutral-500 font-mono">{hex}</p>
      </div>
    </div>
  )
}

function Block({ label, description, swatches, cols = 'grid-cols-3 sm:grid-cols-6' }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
      {description && <p className="text-xs text-neutral-600 mb-4">{description}</p>}
      <div className={`grid ${cols} gap-3`}>
        {swatches.map(s => <Swatch key={s.hex + s.name} {...s} />)}
      </div>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-neutral-800" />
}

// Hráčské barvy — čerpáno z kanonického zdroje (src/lib/donjon/playerColors.js).
// Žádné lokální duplikáty — když chceš změnit barvu, edituj playerColors.js.
const players = playerColors

/* ── TkajUI ── */
function TkajuiPaleta() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6 flex flex-col gap-6">
      <Block
        label="Pozadí & povrchy"
        description="Chladné slate odstíny — kontrast skrze kroky, žádné teplé fialové tóny."
        cols="grid-cols-3 sm:grid-cols-6"
        swatches={[
          { name: 'surface0', hex: T.surface0,      note: 'Stránka' },
          { name: 'surface1', hex: T.surface1,      note: 'Base dark' },
          { name: 'surface2', hex: T.surface2,      note: 'Input / card' },
          { name: 'surface3', hex: T.surface3,      note: 'Elevated' },
          { name: 'surface4', hex: T.surface4,      note: 'Hover' },
          { name: 'border',   hex: T.borderDefault, note: 'Default border' },
        ]}
      />
      <Divider />
      <Block
        label="Akcent — interaktivní modrá"
        description="Focus ring, checked stav, primary button, caret, links."
        cols="grid-cols-3"
        swatches={[
          { name: 'accent',       hex: T.accent,      note: 'Primární', large: true },
          { name: 'accentLight',  hex: T.accentLight, note: 'Hover',    large: true },
          { name: 'accentDim',    hex: T.accentDim,   note: 'Pressed',  large: true },
        ]}
      />
      <Divider />
      <Block
        label="Texty"
        description="Hierarchie přes odstíny — žádné teplé tóny."
        cols="grid-cols-2 sm:grid-cols-4"
        swatches={[
          { name: 'textHigh',     hex: T.textHigh,     note: 'Nadpisy, obsah',    textPreview: 'Aa' },
          { name: 'textMid',      hex: T.textMid,      note: 'Labely, hints',     textPreview: 'Aa' },
          { name: 'textLow',      hex: T.textLow,      note: 'Placeholder',       textPreview: 'Aa' },
          { name: 'textDisabled', hex: T.textDisabled, note: 'Neaktivní',         textPreview: 'Aa' },
        ]}
      />
      <Divider />
      <Block
        label="Sémantické barvy"
        cols="grid-cols-2 sm:grid-cols-4"
        swatches={[
          { name: 'success', hex: T.successColor, note: 'Úspěch',    large: true },
          { name: 'danger',  hex: T.dangerColor,  note: 'Chyba',     large: true },
          { name: 'warning', hex: T.warningColor, note: 'Varování',  large: true },
          { name: 'info',    hex: T.infoColor,    note: 'Informace', large: true },
        ]}
      />
      <Divider />
      <Block
        label="Sémantická pozadí"
        description="Pro badge / toast / alert kontejnery."
        cols="grid-cols-2 sm:grid-cols-4"
        swatches={[
          { name: 'successBg', hex: T.successBg, note: 'Success' },
          { name: 'dangerBg',  hex: T.dangerBg,  note: 'Danger'  },
          { name: 'warningBg', hex: T.warningBg, note: 'Warning' },
          { name: 'infoBg',    hex: T.infoBg,    note: 'Info'    },
        ]}
      />
    </div>
  )
}

function TkajuiVsDonjon() {
  return (
    <div className="rounded-xl border border-neutral-800 overflow-hidden">
      <div className="grid grid-cols-2 border-b border-neutral-800 bg-neutral-950">
        <div className="p-3 flex items-center gap-2 border-r border-neutral-800">
          <div className="size-2 rounded-full bg-brand-500 shrink-0" />
          <span className="text-xs font-semibold text-neutral-300">TkajUI</span>
        </div>
        <div className="p-3 flex items-center gap-2">
          <div className="size-2 rounded-full bg-[gold] shrink-0" />
          <span className="text-xs font-semibold text-neutral-300">donjon-fall-ui</span>
        </div>
      </div>
      {[
        { label: 'Akcent',    tkajui: T.accent,        tkNote: 'Chladná modrá',    donjon: D.gold,      dnNote: 'Teplá zlatá'   },
        { label: 'Surface',   tkajui: T.surface2,      tkNote: 'Slate, bez tónu',  donjon: D.bgInactive,dnNote: 'Teplá fialová' },
        { label: 'Border',    tkajui: T.borderDefault, tkNote: 'Neutrální šedá',   donjon: D.goldDim,   dnNote: 'Bronze / gold' },
        { label: 'Text mid',  tkajui: T.textMid,       tkNote: 'Cool grey',        donjon: D.goldMid,   dnNote: 'Muted gold'    },
        { label: 'Text caret',tkajui: T.accent,        tkNote: 'Accent blue',      donjon: D.gold,      dnNote: 'Gold 300'      },
      ].map((row) => (
        <div key={row.label} className="grid grid-cols-2 not-last:border-b not-last:border-neutral-800">
          <div className="p-3 flex items-center gap-3 border-r border-neutral-800">
            <div className="size-8 rounded-sm shrink-0 border border-white/10" style={{ background: row.tkajui }} />
            <div>
              <p className="text-xs font-medium text-neutral-300">{row.label}</p>
              <p className="text-[10px] text-neutral-500">{row.tkNote}</p>
              <p className="text-[10px] font-mono text-neutral-600">{row.tkajui}</p>
            </div>
          </div>
          <div className="p-3 flex items-center gap-3">
            <div className="size-8 rounded-sm shrink-0 border border-white/10" style={{ background: row.donjon }} />
            <div>
              <p className="text-xs font-medium text-neutral-300">{row.label}</p>
              <p className="text-[10px] text-neutral-500">{row.dnNote}</p>
              <p className="text-[10px] font-mono text-neutral-600">{row.donjon}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── donjon-fall-ui ── */
function DonjonPaleta() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6 flex flex-col gap-6">
      <Block
        label="Pozadí & povrchy"
        description="Teplé fialové — atmosféra hlubokého dungeonu. Komponenty používají gradienty mezi kroky."
        cols="grid-cols-3 sm:grid-cols-6"
        swatches={[
          { name: 'bg0',           hex: D.bg0,           note: 'Stránka'        },
          { name: 'bg2',           hex: D.bg2,           note: 'Karta'          },
          { name: 'bg3',           hex: D.bg3,           note: 'Elevated panel' },
          { name: 'bg4',           hex: D.bg4,           note: 'Hover / raised' },
          { name: 'borderDefault', hex: D.borderDefault, note: 'Hranice panelu' },
          { name: 'headerBgStart', hex: D.headerBgStart, note: 'Header gradient (start)' },
        ]}
      />
      <Divider />
      <Block
        label="Zlaté akcenty"
        description='Teplý amber — herní "prestige" feeling. Záměrně odlišné od hráčské žluté #A09020.'
        cols="grid-cols-3"
        swatches={[
          { name: 'Gold 300', hex: D.gold,    note: 'Focus, ikony, caret', large: true },
          { name: 'Gold 500', hex: D.goldMid, note: 'Labely, text',        large: true },
          { name: 'Gold 700', hex: D.goldDim, note: 'Bordery, muted',      large: true },
        ]}
      />
      <Divider />
      <Block
        label="Texty"
        description="Teplá bílá — atmosférické, ne klinicky čisté."
        cols="grid-cols-2 sm:grid-cols-4"
        swatches={[
          { name: 'textHighest',  hex: D.textHighest,  note: 'Nadpisy, max kontrast', textPreview: 'Aa' },
          { name: 'textActive',   hex: D.textActive,   note: 'Aktivní tab',           textPreview: 'Aa' },
          { name: 'textHigh',     hex: D.textHigh,     note: 'Tělo, inputy',          textPreview: 'Aa' },
          { name: 'textMid',      hex: D.textMid,      note: 'Labely, popisy',        textPreview: 'Aa' },
          { name: 'textLow',      hex: D.textLow,      note: 'Hints, muted',          textPreview: 'Aa' },
          { name: 'textDisabled', hex: D.textDisabled, note: 'Disabled, inactive',    textPreview: 'Aa' },
          { name: 'textCaption',  hex: D.textCaption,  note: 'Dekorativní (demo)',    textPreview: 'Aa' },
          { name: 'textFaint',    hex: D.textFaint,    note: 'Ultra-muted',           textPreview: 'Aa' },
        ]}
      />
    </div>
  )
}

function DonjonHraci() {
  return (
    <div className="flex flex-col gap-4">
      {/* Tabulka trojic */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
        <div className="grid grid-cols-[140px_1fr_1fr_1fr] border-b border-neutral-800 bg-neutral-950 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Hráč</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Primární</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Světlá</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Tmavá</p>
        </div>
        {players.map((p, i) => (
          <div
            key={p.label}
            className={`grid grid-cols-[140px_1fr_1fr_1fr] px-4 py-3 items-center ${i < players.length - 1 ? 'border-b border-neutral-800/60' : ''}`}
          >
            <div>
              <p className="text-xs font-semibold text-neutral-300">{p.label}</p>
              <p className="text-xs text-neutral-600">{p.name}</p>
            </div>
            {[p.primary, p.light, p.dark].map((hex) => (
              <div key={hex} className="flex items-center gap-2.5">
                <div className="size-7 rounded-sm shrink-0 border border-white/10" style={{ background: hex }} />
                <p className="text-xs font-mono text-neutral-500 hidden sm:block">{hex}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Rychlý přehled — primární barvy */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3">Primární — přehled</p>
        <div className="grid grid-cols-6 gap-2">
          {players.map((p) => (
            <div key={p.label} className="flex flex-col gap-1.5">
              <div className="h-10 rounded-sm border border-white/10" style={{ background: p.primary }} />
              <p className="text-[10px] text-neutral-500 text-center font-mono">{p.primary}</p>
              <p className="text-[10px] text-neutral-600 text-center">{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DonjonHexy() {
  return (
    <div className="flex flex-col gap-4">
      <Block
        label="Stav políčka"
        cols="grid-cols-2 sm:grid-cols-4"
        swatches={[
          { name: 'Prázdný',         hex: D.bg4          },
          { name: 'Ohnisko pasivní', hex: D.hexFocalPassive },
          { name: 'Ohnisko aktivní', hex: D.gold         },
          { name: 'Okraj hexu',      hex: D.borderDefault},
        ]}
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">Základna — tmavá barva hráče</p>
        <div className="grid grid-cols-6 gap-2">
          {players.map((p) => (
            <div key={p.label} className="flex flex-col gap-1.5">
              <div className="h-9 rounded-sm border border-white/10" style={{ background: p.dark }} />
              <p className="text-[10px] font-mono text-neutral-500 text-center">{p.dark}</p>
              <p className="text-[10px] text-neutral-600 text-center">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DonjonPlanovani() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
      <div className="grid grid-cols-[1fr_auto_auto] border-b border-neutral-800 bg-neutral-950 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Stav</p>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 w-24 text-center">Barva</p>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 w-20 text-right">Typ</p>
      </div>
      {[
        { name: 'Vybraný hex',   note: 'UI gold při 31% opacity',              hex: D.gold,          alpha: 0.31, fixed: true  },
        { name: 'Mimo dosah',    note: 'Černá při 55% opacity',                hex: '#000000',       alpha: 0.55, fixed: true  },
        { name: 'Souboj možný',  note: 'Primární barva hráče při 31%',         hex: D.dangerColor,   alpha: 0.31, fixed: false },
        { name: 'Posílení',      note: 'Zelená při 31% opacity',               hex: D.successColor,  alpha: 0.31, fixed: true  },
        { name: 'Hover',         note: 'Bílá při 8% opacity',                  hex: '#FFFFFF',       alpha: 0.08, fixed: true  },
      ].map((row, i, arr) => (
        <div key={row.name} className={`grid grid-cols-[1fr_auto_auto] px-4 py-3 items-center ${i < arr.length - 1 ? 'border-b border-neutral-800/60' : ''}`}>
          <div>
            <p className="text-xs font-semibold text-neutral-300">{row.name}</p>
            <p className="text-xs text-neutral-600 mt-0.5">{row.note}</p>
          </div>
          <div className="w-24 flex justify-center">
            <div className="w-10 h-8 rounded-sm border border-white/10" style={{ background: `${row.hex}${Math.round(row.alpha * 255).toString(16).padStart(2, '0')}` }} />
          </div>
          <div className="w-20 flex justify-end">
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded-sm ${row.fixed ? 'bg-neutral-800 text-neutral-400' : 'bg-amber-950/60 text-amber-500'}`}>
              {row.fixed ? 'fixní' : 'hráč'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Obsah stránky ── */
function ColorsContent() {
  const lib = useLibVariant()

  if (lib === 'tkajui') {
    return (
      <>
        <Section
          id="tkajui-paleta"
          title="TkajUI paleta"
          description="Chladné slate povrchy + modrý interaktivní akcent. Kontrast skrze odstíny — žádné herní gradientní tóny."
        >
          <TkajuiPaleta />
        </Section>

        <Section
          id="tkajui-vs-donjon"
          title="TkajUI vs donjon-fall-ui"
          description="Klíčový rozdíl na první pohled — stejné role, opačný charakter."
        >
          <TkajuiVsDonjon />
        </Section>

        <Section
          id="tkajui-pouziti"
          title="Použití v kódu"
          description="Dvě cesty: JS import konstant pro inline style/JSX, nebo CSS custom properties pro stylesheets."
        >
          <CodeBlock code={`// 1. JS import — pro inline style, JSX, styled-components
import { accent, surface2, borderDefault, textHigh, dangerColor } from 'tkajui/tokens'

<button style={{
  background: accent,
  color: textHigh,
  border: \`1px solid \${borderDefault}\`,
  padding: '8px 14px',
}}>
  Potvrdit
</button>

// 2. CSS custom properties — pro .css soubory
@import 'tkajui/tkajui.css';

.my-card {
  background: var(--tkajui-surface2);
  border: 1px solid var(--tkajui-border-default);
  color: var(--tkajui-text-high);
}
.my-card:hover { background: var(--tkajui-surface3); }
.my-card.error { border-color: var(--tkajui-danger); }`} />
        </Section>
      </>
    )
  }

  return (
    <>
      <Section
        id="barvy-hry"
        title="Základní paleta"
        description="Teplé fialové povrchy + zlatý akcent — herní atmosféra dungeonu."
      >
        <DonjonPaleta />
      </Section>

      <Section
        id="barvy-hracu"
        title="Barvy hráčů"
        description="Hra podporuje 2–6 hráčů. Každý hráč má trojici: primární (kostky, UI akcenty), světlá (text na tmavém), tmavá (základna na mapě)."
      >
        <DonjonHraci />
      </Section>

      <Section
        id="stavy-hexu"
        title="Stavy hexů"
        description="Barvy políček na herní mapě podle jejich stavu."
      >
        <DonjonHexy />
      </Section>

      <Section
        id="planovani-tahu"
        title="Plánování tahu"
        description="Překryvy políček při výběru akce — fixní barvy jsou vždy stejné, dynamické se odvíjí od primární barvy aktivního hráče."
      >
        <DonjonPlanovani />
      </Section>

      <Section
        id="donjon-pouziti"
        title="Použití v kódu"
        description="Dvě cesty: JS import konstant pro inline style/JSX, nebo CSS custom properties pro stylesheets."
      >
        <CodeBlock code={`// 1. JS import — pro inline style, JSX, styled-components
import { gold, goldDim, bg2, borderDefault, textHigh, dangerColor } from 'donjon-fall-ui/tokens'
// Player palette — barvy hráčů (red/blue/green/yellow/purple/orange + Light/Dark varianty)
import { red, blueDark, playerColors, playerColorsByKey } from 'donjon-fall-ui'

<div style={{
  background: bg2,
  border: \`1px solid \${borderDefault}\`,
  color: textHigh,
  boxShadow: \`0 0 12px \${gold}55\`,
}}>
  <h3 style={{ color: gold }}>Souboj</h3>
  <p style={{ color: goldDim }}>Hoď kostkou pro útok</p>
</div>

// 2. CSS custom properties — pro .css soubory
@import 'donjon-fall-ui/donjon.css';

.donjon-panel {
  background: var(--donjon-bg2);
  border: 1px solid var(--donjon-border-default);
  color: var(--donjon-text-high);
  box-shadow: var(--donjon-glow-gold);
}
.donjon-panel.danger { border-color: var(--donjon-danger); }
.donjon-panel h3     { color: var(--donjon-gold); }`} />
      </Section>
    </>
  )
}

export default function ColorsPage() {
  return (
    <ShowcasePage
      title="Colors"
      description="Barevné palety obou knihoven — každá má vlastní vizuální jazyk."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <ColorsContent />
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Zlato (gold/goldMid/goldDim) je primární akcent — používej ho pro aktivní prvky, ikony, linky.</p>
          <p>✓ Sémantické barvy (danger/success/warning) mají fixní mapování — nepoužívej je pro dekoraci.</p>
          <p>✓ Hráčské barvy jsou dynamické — definuj je jako prop, nikdy jako hardcoded hex v komponentě.</p>
          <p>✓ Kontrast textu na tmavém pozadí: textHigh pro primární, textMid pro sekundární, textLow pro hints.</p>
          <p>✗ Nevkládej nové hardcoded hex hodnoty do komponent — přidej token do tokens.js a použij ho.</p>
          <p>✗ Nepoužívej světlé barvy (textActive, gold) na středním pozadí (bg3/bg4) bez ověření kontrastu.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
