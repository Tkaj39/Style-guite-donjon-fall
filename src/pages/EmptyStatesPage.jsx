import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonButton from '../components/DonjonButton'
import DonjonBadge from '../components/DonjonBadge'

/* ── Prázdný stav template ── */
function EmptyState({ icon, title, description, cta, ctaLabel = 'Začít', variant = 'default' }) {
  const colors = {
    default: { border: '#8F745430', icon: '#8F7458' },
    info:    { border: '#4080C040', icon: '#4080C0' },
    game:    { border: '#8F745440', icon: '#B8956A' },
  }
  const c = colors[variant] ?? colors.default

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '40px 32px', gap: 12, textAlign: 'center',
      border: `1px dashed ${c.border}`,
      borderRadius: 6, maxWidth: 340,
    }}>
      <div style={{ fontSize: 40, lineHeight: 1, color: c.icon, opacity: 0.8 }}>{icon}</div>
      <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: '#F0E6D3' }}>{title}</p>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F9CB3', lineHeight: 1.5, maxWidth: 260 }}>{description}</p>
      {cta && (
        <DonjonButton size="sm" style={{ marginTop: 4 }}>{ctaLabel}</DonjonButton>
      )}
    </div>
  )
}

/* ── Prázdný seznam ── */
function EmptyList({ rows = 3 }) {
  return (
    <div style={{ width: '100%', maxWidth: 320, border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderBottom: i < rows - 1 ? '1px solid #8F745418' : 'none',
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 3, background: '#1A1830', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ height: 8, borderRadius: 2, background: '#1A1830', width: `${60 + i * 15}%` }} />
            <div style={{ height: 6, borderRadius: 2, background: '#12102A', width: `${40 + i * 10}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function EmptyStatesPage() {
  return (
    <ShowcasePage
      title="Empty States"
      description="Vzory pro stavy bez obsahu — prázdné seznamy, první použití, žádné výsledky hledání. Prázdný stav není chyba — je to příležitost navést uživatele."
    >

      {/* Typy prázdných stavů */}
      <Section
        id="typy"
        title="Typy prázdných stavů"
        description="Každý typ má jiný kontext a jinou primární akci."
      >
        <Preview>
          <EmptyState
            icon="🗺"
            title="Žádné uložené hry"
            description="Zatím nemáš žádnou rozehranou hru. Začni novou partii a ponoř se do boje."
            cta ctaLabel="Nová hra"
            variant="game"
          />
          <EmptyState
            icon="🔍"
            title="Žádné výsledky"
            description="Pro hledaný výraz nebyla nalezena žádná mapa. Zkus jiný název nebo filtr."
            variant="info"
          />
          <EmptyState
            icon="📋"
            title="Žádný log tahů"
            description="Historia tahů se zobrazí po zahájení první hry v tomto kole."
            variant="default"
          />
        </Preview>
      </Section>

      {/* Skeleton vs prázdný stav */}
      <Section
        id="skeleton-vs-empty"
        title="Skeleton vs prázdný stav"
        description="Skeleton = čekáme na data. Prázdný stav = data přišla, ale jsou prázdná."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>Skeleton — data se načítají:</p>
            <EmptyList rows={3} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>Prázdný stav — data přišla, žádné záznamy:</p>
            <EmptyState
              icon="📂"
              title="Prázdná složka"
              description="Tady zatím nic není."
              variant="default"
            />
          </div>
        </Preview>
        <CodeBlock code={`{isLoading ? (
  // Skeleton — zobrazuj strukturu před daty
  <SkeletonList rows={5} />
) : data.length === 0 ? (
  // Prázdný stav — data jsou, ale seznam je prázdný
  <EmptyState
    icon="📂"
    title="Žádné záznamy"
    description="Přidej první položku tlačítkem níže."
    cta={<DonjonButton onClick={handleAdd}>Přidat</DonjonButton>}
  />
) : (
  <ItemList data={data} />
)}`} />
      </Section>

      {/* Anatomie prázdného stavu */}
      <Section
        id="anatomie"
        title="Anatomie prázdného stavu"
        description="Struktura: ikona (atmosféra) + headline (co chybí) + description (proč + co dělat) + CTA (volitelná)."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 520, width: '100%' }}>
            {[
              { part: 'Ikona / ilustrace', required: false, note: 'Emoji nebo SVG — atmosféra, ne kritická informace. Vždy volitelná.' },
              { part: 'Headline',          required: true,  note: 'Co chybí — stručné, max 6 slov. "Žádné uložené hry", "Prázdný inventář".' },
              { part: 'Description',       required: true,  note: 'Proč + co dělat dál. Max 2 věty, konkrétní a akční.' },
              { part: 'CTA tlačítko',      required: false, note: 'Jen pokud existuje jasná primární akce. Nemít raději než mít bezvýznamné.' },
            ].map(({ part, required, note }) => (
              <div key={part} style={{ display: 'grid', gridTemplateColumns: '160px 70px 1fr', gap: 10, padding: '9px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'start' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#B8956A' }}>{part}</span>
                <DonjonBadge variant={required ? 'warning' : 'default'} size="sm">{required ? 'povinné' : 'volitelné'}</DonjonBadge>
                <span style={{ fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Onboarding prázdný stav */}
      <Section
        id="onboarding"
        title="První použití / onboarding"
        description="Speciální případ prázdného stavu — aplikace je prázdná protože uživatel ji ještě nepoužil. CTA je vždy přítomné."
      >
        <Preview>
          <EmptyState
            icon="⚔️"
            title="Vítej v Donjon Fall"
            description="Připrav se na strategický souboj věží. Zahaj první hru a vyber svého protivníka."
            cta ctaLabel="▶  Zahájit první hru"
            variant="game"
          />
        </Preview>
        <CodeBlock code={`{/* Onboarding prázdný stav */}
{!hasPlayedBefore && games.length === 0 && (
  <EmptyState
    icon="⚔️"
    title="Vítej v Donjon Fall"
    description="Připrav se na strategický souboj věží."
    cta={<DonjonButton onClick={startGame}>▶  Zahájit první hru</DonjonButton>}
  />
)}`} />
      </Section>

      {/* Prázdný stav vs error ── */}
      <Section
        id="vs-error"
        title="Prázdný stav vs Error stav"
        description="Záměna těchto dvou stavů je nejčastější chyba."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 560 }}>
            <div style={{ padding: '14px', border: '1px solid #40A05540', borderRadius: 4, background: '#183D2018' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', fontWeight: 700, color: '#40A055', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Prázdný stav</p>
              <p style={{ margin: '0 0 4px', fontSize: '0.8125rem', color: '#F0E6D3', fontWeight: 600 }}>Data přišla, seznam je prázdný</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>HTTP 200, pole data: [] — normální stav, navodni uživatele.</p>
            </div>
            <div style={{ padding: '14px', border: '1px solid #C0404040', borderRadius: 4, background: '#3D181818' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', fontWeight: 700, color: '#C04040', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Error stav</p>
              <p style={{ margin: '0 0 4px', fontSize: '0.8125rem', color: '#F0E6D3', fontWeight: 600 }}>Data nepřišla, nastala chyba</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>HTTP 5xx, síťová chyba — zobraz chybový stav s Retry.</p>
            </div>
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy zobrazuj prázdný stav — prázdný kontejner bez vysvětlení působí jako chyba.</p>
          <p>✓ Headline piš z pohledu uživatele — "Žádné uložené hry", ne "Empty game list".</p>
          <p>✓ CTA přidej jen pokud je akce relevantní a jasná. Prázdný stav pouze pro čtení CTA nemá.</p>
          <p>✓ Onboarding prázdný stav je příležitost — buď přátelský a konkrétní.</p>
          <p>✗ Nezaměňuj prázdný stav s error stavem — mají jiný vizuál i kontext.</p>
          <p>✗ Nezobrazuj skeleton neomezeně — po timeoutu přejdi na error stav s Retry.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
