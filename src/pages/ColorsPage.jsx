import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

function Swatch({ name, hex, large = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`rounded border border-white/10 w-full ${large ? 'h-16' : 'h-10'}`}
        style={{ background: hex }}
      />
      <div>
        <p className="text-xs font-medium text-neutral-300 leading-tight">{name}</p>
        <p className="text-xs text-neutral-500 font-mono">{hex}</p>
      </div>
    </div>
  )
}

function SwatchRow({ swatches }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {swatches.map((s) => (
          <Swatch key={s.hex + s.name} {...s} />
        ))}
      </div>
    </div>
  )
}

const players = [
  { label: 'Hráč 1', name: 'Červená',   primary: '#C04040', light: '#F9C0C0', dark: '#3D1818' },
  { label: 'Hráč 2', name: 'Modrá',     primary: '#4070C8', light: '#C0D0F9', dark: '#182040' },
  { label: 'Hráč 3', name: 'Zelená',    primary: '#2A8040', light: '#B0F0C8', dark: '#0F2818' },
  { label: 'Hráč 4', name: 'Fialová',   primary: '#7040C0', light: '#D0B0F9', dark: '#281040' },
  { label: 'Hráč 5', name: 'Žlutá',     primary: '#A09020', light: '#F0E890', dark: '#302800' },
  { label: 'Hráč 6', name: 'Ocelová',   primary: '#5080A0', light: '#B8D8F0', dark: '#142030' },
]

export default function ColorsPage() {
  return (
    <ShowcasePage
      title="Colors"
      description="Barevná paleta Donjon Fall — hráčské barvy, stavy herní plochy, plánování tahu a globální barvy UI."
    >
      {/* Barvy hráčů */}
      <Section
        id="barvy-hracu"
        title="Barvy hráčů"
        description="Hra podporuje 2–6 hráčů. Každý hráč má trojici barev: primární (kostky, UI akcenty), světlá (text na tmavém pozadí) a tmavá (pozadí základny na mapě)."
      >
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-0 border-b border-neutral-800 px-4 py-2 bg-neutral-950">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Hráč</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Primární</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Světlá</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Tmavá</p>
          </div>
          {/* Player rows */}
          {players.map((p, i) => (
            <div
              key={p.label}
              className={`grid grid-cols-4 gap-0 px-4 py-4 items-center ${
                i < players.length - 1 ? 'border-b border-neutral-800/60' : ''
              }`}
            >
              <div>
                <p className="text-xs font-semibold text-neutral-400">{p.label}</p>
                <p className="text-xs text-neutral-600">{p.name}</p>
              </div>
              {[p.primary, p.light, p.dark].map((hex) => (
                <div key={hex} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded flex-shrink-0 border border-white/10"
                    style={{ background: hex }}
                  />
                  <p className="text-xs font-mono text-neutral-400 hidden sm:block">{hex}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Colour chips full-width for quick reference */}
        <div className="grid grid-cols-6 gap-2 mt-2">
          {players.map((p) => (
            <div key={p.label} className="flex flex-col gap-1">
              <div className="h-8 rounded border border-white/10" style={{ background: p.primary }} />
              <p className="text-xs text-neutral-500 text-center">{p.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stavy hexů */}
      <Section
        id="stavy-hexu"
        title="Stavy hexů"
        description="Barvy políček na herní mapě podle jejich stavu."
      >
        <SwatchRow swatches={[
          { name: 'Prázdný',         hex: '#2A2948' },
          { name: 'Ohnisko pasivní', hex: '#2E2D4A' },
          { name: 'Ohnisko aktivní', hex: '#FFC183' },
          { name: 'Okraj hexu',      hex: '#353751' },
        ]} />

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
            Základna — pozadí podle hráče
          </p>
          <div className="grid grid-cols-6 gap-3">
            {players.map((p) => (
              <div key={p.label} className="flex flex-col gap-1.5">
                <div
                  className="h-10 rounded border border-white/10"
                  style={{ background: p.dark }}
                />
                <p className="text-xs font-medium text-neutral-300 leading-tight">{p.label}</p>
                <p className="text-xs text-neutral-500 font-mono">{p.dark}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Plánování tahu */}
      <Section
        id="planovani-tahu"
        title="Plánování tahu"
        description="Překryvy políček při výběru akce. Fixní barvy jsou vždy stejné, dynamické se odvíjí od primární barvy aktivního hráče."
      >
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] gap-0 border-b border-neutral-800 px-4 py-2 bg-neutral-950">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Stav</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 w-24 text-center">Barva</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 w-20 text-right">Typ</p>
          </div>

          {[
            { name: 'Vybraný hex',   note: 'UI gold při 31% opacity — zvýrazní vybranou kostku',                      hex: '#FFC183',  alpha: 0.31, fixed: true  },
            { name: 'Mimo dosah',    note: 'Černá při 55% opacity — políčka kam se nelze dostat se ztmaví',           hex: '#000000',  alpha: 0.55, fixed: true  },
            { name: 'Souboj možný',  note: 'Primární barva hráče při 31% opacity — agrese, útok na nepřítele',        hex: '#C04040',  alpha: 0.31, fixed: false },
            { name: 'Posílení',      note: 'Zelená při 31% opacity — přesun na vlastní kostku, pozitivní akce',       hex: '#40A055',  alpha: 0.31, fixed: true  },
            { name: 'Hover',         note: 'Bílá při 8% opacity — fixní pro všechny stavy',                           hex: '#FFFFFF',  alpha: 0.08, fixed: true  },
          ].map((row, i, arr) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1fr_auto_auto] gap-0 px-4 py-3 items-center ${
                i < arr.length - 1 ? 'border-b border-neutral-800/60' : ''
              }`}
            >
              <div>
                <p className="text-xs font-semibold text-neutral-300">{row.name}</p>
                <p className="text-xs text-neutral-600 mt-0.5">{row.note}</p>
              </div>
              <div className="w-24 flex justify-center">
                <div
                  className="w-10 h-8 rounded border border-white/10"
                  style={{
                    background: `${row.hex}${Math.round(row.alpha * 255).toString(16).padStart(2, '0')}`,
                  }}
                />
              </div>
              <div className="w-20 flex justify-end">
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                  row.fixed
                    ? 'bg-neutral-800 text-neutral-400'
                    : 'bg-amber-950/60 text-amber-500'
                }`}>
                  {row.fixed ? 'fixní' : 'hráč'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-600 -mt-2">
          Příklad dynamické barvy ukazuje červeného hráče — za běhu se dosadí primární barva aktivního hráče.
        </p>
      </Section>

      {/* Barvy hry */}
      <Section
        id="barvy-hry"
        title="Barvy hry"
        description="Globální UI paleta — pozadí, povrchy, zlaté akcenty, texty."
      >
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6 flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Pozadí &amp; povrchy</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Background',  hex: '#0F0E1A' },
                { name: 'Surface',     hex: '#1A1928' },
                { name: 'Surface +1',  hex: '#222136' },
                { name: 'Border',      hex: '#353751' },
              ].map(s => <Swatch key={s.hex} {...s} />)}
            </div>
          </div>
          <div className="border-t border-neutral-800" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Zlaté akcenty UI</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: 'Gold 300', hex: '#FFC183' },
                { name: 'Gold 500', hex: '#B8956A' },
                { name: 'Gold 700', hex: '#8F7458' },
              ].map(s => <Swatch key={s.hex} {...s} large />)}
            </div>
            <p className="text-xs text-neutral-600 mt-3">
              UI zlato je teplé amber — odlišuje se od hráčské žluté (#A09020) záměrně.
            </p>
          </div>
          <div className="border-t border-neutral-800" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Texty</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Primární',   hex: '#F9F9F9' },
                { name: 'Sekundární', hex: '#B8956A' },
                { name: 'Terciární',  hex: '#6B6A82' },
                { name: 'Disabled',   hex: '#3A3A52' },
              ].map(s => <Swatch key={s.hex} {...s} />)}
            </div>
          </div>
        </div>
      </Section>
    </ShowcasePage>
  )
}
