import { useLibVariant, ShowcasePage, Section } from '../styleguide/ShowcasePage'
import * as T from '../lib/tkajui/tokens'
import * as D from '../lib/donjon/tokens'

/* ── Swatch ── */
function Swatch({ name, hex, note, large = false, textPreview }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`rounded-sm border border-white/8 w-full ${large ? 'h-16' : 'h-10'} flex items-center justify-center`}
        style={{ background: hex }}
      >
        {textPreview && (
          <span style={{ fontSize: '0.625rem', fontWeight: 600, color: '#ffffff88' }}>
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

const players = [
  { label: 'Hráč 1', name: 'Červená',   primary: '#C04040', light: '#F9C0C0', dark: '#3D1818' },
  { label: 'Hráč 2', name: 'Modrá',     primary: '#4070C8', light: '#C0D0F9', dark: '#182040' },
  { label: 'Hráč 3', name: 'Zelená',    primary: '#2A8040', light: '#B0F0C8', dark: '#0F2818' },
  { label: 'Hráč 4', name: 'Fialová',   primary: '#7040C0', light: '#D0B0F9', dark: '#281040' },
  { label: 'Hráč 5', name: 'Žlutá',     primary: '#A09020', light: '#F0E890', dark: '#302800' },
  { label: 'Hráč 6', name: 'Ocelová',   primary: '#5080A0', light: '#B8D8F0', dark: '#142030' },
]

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
          <div className="size-2 rounded-full bg-[#FFC183] shrink-0" />
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
          { name: 'Background', hex: '#0F0E1A',      note: 'Stránka'        },
          { name: 'Surface',    hex: '#1A1928',      note: 'Základní'       },
          { name: 'Surface +1', hex: D.bgInactive,   note: 'Komponenty'     },
          { name: 'Surface +2', hex: D.bg4,          note: 'Zvýšené'        },
          { name: 'Surface +3', hex: D.borderDefault,note: 'Aktivní/border' },
          { name: 'Surface +4', hex: '#3D3A5C',      note: 'Header panely'  },
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
          { name: 'Primární',  hex: '#F9F9F9',       note: 'Nadpisy',          textPreview: 'Aa' },
          { name: 'Teplá',     hex: D.textActive,    note: 'Tělo, inputy',     textPreview: 'Aa' },
          { name: 'Ztlumená',  hex: D.textDisabled,  note: 'Popisy, nápověda', textPreview: 'Aa' },
          { name: 'Disabled',  hex: '#3A3A52',       note: 'Neaktivní',        textPreview: 'Aa' },
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
          { name: 'Ohnisko pasivní', hex: '#2E2D4A'      },
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
        { name: 'Souboj možný',  note: 'Primární barva hráče při 31%',         hex: '#C04040',       alpha: 0.31, fixed: false },
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
    </ShowcasePage>
  )
}
