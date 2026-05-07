import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

function Swatch({ name, hex, textDark = false, large = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`rounded-lg border border-white/10 ${large ? 'h-20' : 'h-12'} w-full min-w-[80px]`}
        style={{ background: hex }}
      />
      <div>
        <p className={`text-xs font-medium ${large ? 'text-neutral-200' : 'text-neutral-300'}`}>{name}</p>
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

function PlayerPair({ label, swatches }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{label}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {swatches.map((s) => (
          <Swatch key={s.hex + s.name} {...s} large />
        ))}
      </div>
    </div>
  )
}

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
        description="Každý hráč má přiřazenou sadu barev použitých na kostkách, základně i UI prvcích."
      >
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6 flex flex-col gap-6">
          <PlayerPair label="Hráč 1 — Červený" swatches={[
            { name: 'Primární',   hex: '#C04040' },
            { name: 'Světlá',     hex: '#F9C0C0' },
            { name: 'Tmavá',      hex: '#3D1818' },
          ]} />
          <div className="border-t border-neutral-800" />
          <PlayerPair label="Hráč 2 — Modrý" swatches={[
            { name: 'Primární',   hex: '#4070C8' },
            { name: 'Světlá',     hex: '#C0D0F9' },
            { name: 'Tmavá',      hex: '#182040' },
          ]} />
        </div>
      </Section>

      {/* Stavy hexů */}
      <Section
        id="stavy-hexu"
        title="Stavy hexů"
        description="Barvy políček na herní mapě podle jejich stavu."
      >
        <SwatchRow swatches={[
          { name: 'Prázdný',           hex: '#2A2948' },
          { name: 'Základna červená',   hex: '#3D1818' },
          { name: 'Základna modrá',     hex: '#182040' },
          { name: 'Ohnisko pasivní',    hex: '#2E2D4A' },
          { name: 'Ohnisko aktivní',    hex: '#FFC183' },
          { name: 'Okraj hexu',         hex: '#353751' },
        ]} />
      </Section>

      {/* Plánování tahu */}
      <Section
        id="planovani-tahu"
        title="Plánování tahu"
        description="Zvýraznění políček při výběru akce — pohyb, dosah souboje, blokování."
      >
        <SwatchRow swatches={[
          { name: 'Vybraný hex',        hex: '#FFC18350' },
          { name: 'Dosah pohybu',       hex: '#4070C840' },
          { name: 'Souboj možný',       hex: '#C0404050' },
          { name: 'Zablokovaný',        hex: '#3A3A4A' },
          { name: 'Occupied friendly',  hex: '#40A05540' },
          { name: 'Hover',              hex: '#FFFFFF15' },
        ]} />
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'Background',   hex: '#0F0E1A' },
                { name: 'Surface',      hex: '#1A1928' },
                { name: 'Surface +1',   hex: '#222136' },
                { name: 'Border',       hex: '#353751' },
              ].map(s => <Swatch key={s.hex} {...s} />)}
            </div>
          </div>
          <div className="border-t border-neutral-800" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Zlaté akcenty</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'Gold 300',  hex: '#FFC183' },
                { name: 'Gold 500',  hex: '#B8956A' },
                { name: 'Gold 700',  hex: '#8F7458' },
              ].map(s => <Swatch key={s.hex} {...s} large />)}
            </div>
          </div>
          <div className="border-t border-neutral-800" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Texty</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'Text primární',    hex: '#F9F9F9' },
                { name: 'Text sekundární',  hex: '#B8956A' },
                { name: 'Text terciární',   hex: '#6B6A82' },
                { name: 'Text disabled',    hex: '#3A3A52' },
              ].map(s => <Swatch key={s.hex} {...s} />)}
            </div>
          </div>
        </div>
      </Section>
    </ShowcasePage>
  )
}
