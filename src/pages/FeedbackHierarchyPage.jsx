import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Priority stack diagram ── */
const LEVELS = [
  { label: 'Modal / Dialog',  z: 1000, color: '#8F7458', bg: '#2E2B50', desc: 'Blokuje veškerou interakci. Vyžaduje přímou odpověď uživatele.', examples: 'Potvrzení smazání, výhra hry, kritická chyba' },
  { label: 'Toast / Notifikace', z: 2000, color: '#40A055', bg: '#183D20', desc: 'Nezablokuje UI. Automaticky zmizí nebo vyžaduje × kliknutí.', examples: 'Uložení proběhlo, chyba sítě, výsledek akce' },
  { label: 'Inline feedback', z: 0,    color: '#4080C0', bg: '#182A3D', desc: 'Přímo u prvku — error u inputu, helper text, stavový badge.', examples: 'Validační chyba formuláře, disabled hint, stav hexu' },
  { label: 'Tooltip',         z: 3000, color: '#C08040', bg: '#3D2E10', desc: 'Kontextová nápověda na hover/focus. Nepřerušuje flow.', examples: 'Vysvětlení ikony, herní termín, pravidlo akce' },
]

function LevelCard({ label, z, color, bg, desc, examples, rank }) {
  return (
    <div style={{
      display: 'flex', gap: 14, padding: '14px 16px',
      background: bg, border: `1px solid ${color}44`,
      borderRadius: 4, borderLeft: `3px solid ${color}`,
    }}>
      <div style={{
        flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
        background: `${color}22`, border: `1.5px solid ${color}66`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.875rem', fontWeight: 700, color,
      }}>
        {rank}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#F0E6D3' }}>{label}</span>
          <code style={{ fontSize: '0.6875rem', color: '#4A4870' }}>z:{z}</code>
        </div>
        <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{desc}</p>
        <p style={{ margin: 0, fontSize: '0.6875rem', color: '#4A4870' }}><em>Příklady: {examples}</em></p>
      </div>
    </div>
  )
}

/* ── Conflict matrix ── */
function ConflictRow({ situation, winner, loser, rule }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 1fr', gap: 10, padding: '9px 14px', borderBottom: '1px solid #8F745418', alignItems: 'center' }}>
      <span style={{ fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{situation}</span>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#40A055' }}>{winner} ✓</span>
      <span style={{ fontSize: '0.75rem', color: '#4A4870' }}>{loser} pause</span>
      <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{rule}</span>
    </div>
  )
}

export default function FeedbackHierarchyPage() {
  return (
    <ShowcasePage
      title="Feedback Hierarchy"
      description="Pravidla priorit mezi různými typy zpětné vazby — modal, toast, tooltip a inline feedback. Zabraňuje konfliktům mezi overlaye a zajišťuje čitelnost herní zpětné vazby."
    >

      {/* Priority stack */}
      <Section
        id="priority"
        title="Priority kanálů"
        description="Čtyři kanály zpětné vazby v pořadí od nejsilnějšího po nejjemnější."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 560 }}>
            {LEVELS.map((level, i) => (
              <LevelCard key={level.label} {...level} rank={i + 1} />
            ))}
          </div>
        </Preview>
      </Section>

      {/* Kdy co použít */}
      <Section
        id="decision"
        title="Rozhodovací strom"
        description="Jak vybrat správný kanál pro konkrétní situaci."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 560 }}>
            {[
              { q: 'Vyžaduje akce přímou odpověď (ano/ne)?',       a: '→ Modal',           color: '#8F7458' },
              { q: 'Je akce nevratná (smazat, opustit hru)?',       a: '→ Modal danger',    color: '#C04040' },
              { q: 'Výsledek akce se má potvrdit bez přerušení?',   a: '→ Toast success',   color: '#40A055' },
              { q: 'Chyba sítě nebo systémová chyba?',              a: '→ Toast danger (duration=0)', color: '#C04040' },
              { q: 'Neplatná hodnota ve formuláři?',                 a: '→ Inline error',    color: '#4080C0' },
              { q: 'Ikona nebo zkratka potřebuje vysvětlení?',      a: '→ Tooltip',         color: '#C08040' },
              { q: 'Herní event (VP, pohyb, souboj)?',              a: '→ FloatFeedback',   color: '#B8956A' },
            ].map(({ q, a, color }) => (
              <div key={q} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3', flex: 1 }}>{q}</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color, whiteSpace: 'nowrap' }}>{a}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Konflikty */}
      <Section
        id="konflikty"
        title="Pravidla při konfliktech"
        description="Co se stane když se dva kanály překryjí."
      >
        <Preview dark={false}>
          <div style={{ width: '100%', border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 1fr', gap: 10, padding: '8px 14px', background: '#12102A', borderBottom: '1px solid #8F745430' }}>
              {['Situace', 'Vítěz', 'Pauzuje', 'Pravidlo'].map(h => (
                <span key={h} style={{ fontSize: '0.625rem', color: '#4A4870', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            <ConflictRow
              situation="Modal je otevřený, přijde toast"
              winner="Toast" loser="nic"
              rule="Toast se zobrazí nad modalem (z:2000 > z:1000). Dávej pozor — toast nad modalem je divný. Raději zprávu zobraz uvnitř modálu."
            />
            <ConflictRow
              situation="Tooltip trigger je uvnitř modálu"
              winner="Tooltip" loser="nic"
              rule="Tooltip (z:3000) je vždy nad vším. OK."
            />
            <ConflictRow
              situation="Herní FloatFeedback + toast najednou"
              winner="FloatFeedback" loser="Toast"
              rule="FloatFeedback je herní scéna, toast je UI systém — různé vrstvy, nekolidují."
            />
            <ConflictRow
              situation="Inline error + tooltip na stejném inputu"
              winner="Inline error" loser="Tooltip"
              rule="V error stavu tooltip skryj nebo změň obsah na popis chyby — duplikace matí."
            />
            <ConflictRow
              situation="Stack 4+ toastů naráz"
              winner="Nejnovější 4" loser="Nejstarší"
              rule="Max 4–5 toastů viditelně. Starší se tiše odstraní bez animace."
            />
          </div>
        </Preview>
      </Section>

      {/* Závažnost */}
      <Section
        id="severity"
        title="Závažnost a kanál"
        description="Závažnost zprávy určuje kanál — ne jen variantu."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { severity: 'Kritická',    channel: 'Modal danger',           variant: '#C04040', example: 'Ztráta dat, neplatná hra, systémová chyba' },
              { severity: 'Vysoká',      channel: 'Toast danger (trvalý)',   variant: '#C04040', example: 'Chyba sítě, uložení selhalo' },
              { severity: 'Střední',     channel: 'Toast warning / danger',  variant: '#C08040', example: 'Akce se nepodařila, limit dosažen' },
              { severity: 'Nízká',       channel: 'Toast default / success', variant: '#8F7458', example: 'Uloženo, tah dokončen, připojení OK' },
              { severity: 'Informační',  channel: 'Toast info / inline',     variant: '#4080C0', example: 'Tip, nápověda, stav bez akce' },
              { severity: 'Kontextová',  channel: 'Tooltip',                 variant: '#C08040', example: 'Vysvětlení ikony, herní termín' },
            ].map(({ severity, channel, variant, example }) => (
              <div key={severity} style={{ display: 'grid', gridTemplateColumns: '100px 180px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: variant }}>{severity}</span>
                <code style={{ fontSize: '0.75rem', color: '#B8956A' }}>{channel}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870' }}>{example}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Modal pro rozhodnutí, toast pro informace — nepřehodí je.</p>
          <p>✓ Kritická chyba (ztráta dat) jde vždy do modálu, ne do toastu.</p>
          <p>✓ Toast nad otevřeným modalem je technicky možný, ale vizuálně divný — zprávu raději zobraz uvnitř modálu.</p>
          <p>✓ FloatFeedback (herní scéna) a Toast (UI systém) jsou oddělené vrstvy — nenahrazuj jednu druhou.</p>
          <p>✗ Nepoužívej tooltip pro kritické nebo časově omezené informace — uživatel ho může přehlédnout.</p>
          <p>✗ Nezobrazuj inline error a toast zároveň pro stejnou chybu — jeden kanál stačí.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
