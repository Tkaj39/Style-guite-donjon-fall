import { useState, Fragment } from 'react'
import DonjonCard from '../lib/donjon/DonjonCard'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { players, turnPhases } from '../data/gameUiMockData'

function TurnPhaseTimeline({ activeStep = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', maxWidth: 500 }}>
      {turnPhases.map((step, i) => {
        const active = i === activeStep
        const past = i < activeStep
        return (
          <Fragment key={step.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: active ? 'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)' : '#1B1A30',
                border: `2px solid ${active ? '#FFC183' : past ? '#8F745866' : '#3A3858'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700,
                color: active ? '#FFC183' : past ? '#8F7458' : '#3A3858',
                boxShadow: active ? '0 0 12px #FFC18330' : 'none',
              }}>
                {i + 1}
              </div>
              <div style={{ textAlign: 'center', paddingLeft: 4, paddingRight: 4 }}>
                <p style={{
                  margin: 0, fontSize: '0.6875rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.2,
                  color: active ? '#F0E6D3' : past ? '#8F7458' : '#4A4560',
                }}>{step.label}</p>
                <p style={{
                  margin: '4px 0 0', fontSize: '0.5625rem', lineHeight: 1.4,
                  color: active ? '#8F7458' : '#3A3858',
                }}>{step.sub}</p>
                {step.optional && (
                  <span style={{
                    display: 'inline-block', marginTop: 4,
                    fontSize: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: active ? '#5A5880' : '#3A3858',
                    background: '#1B1A30', padding: '1px 5px', borderRadius: 2,
                  }}>volitelné</span>
                )}
              </div>
            </div>
            {i < turnPhases.length - 1 && (
              <div style={{
                marginTop: 16, height: 2, width: 20, flexShrink: 0,
                background: past ? '#8F745866' : '#2A2948',
              }} />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

function EndTurnIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" />
    </svg>
  )
}

function TurnCard({ player, turn }) {
  return (
    <DonjonCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 4,
          background: player.color, flexShrink: 0,
          boxShadow: `0 0 12px ${player.color}66`,
        }} />
        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0, fontSize: '0.8125rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            background: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1.2,
          }}>{player.label}</p>
          <p style={{ margin: '4px 0 0', fontSize: '0.6875rem', color: '#8F7458', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Na tahu
          </p>
        </div>
        <DonjonBadge size="sm" variant="default">Tah {turn}</DonjonBadge>
      </div>
    </DonjonCard>
  )
}

export default function TahPage() {
  const [activeTurn, setActiveTurn] = useState(0)
  const [phaseDemo, setPhaseDemo] = useState(0)

  return (
    <ShowcasePage
      title="Tah"
      description="Každý tah má 3 fáze: vyhodnocení ohnisek, výběr akce a souboj (pokud ho pohyb spustil). Souboj není samostatná volba."
    >
      <Section
        id="struktura-tahu"
        title="Struktura tahu"
        description="Tah je vždy lineární. Souboj nastane automaticky — hráč ho nezvolí jako akci."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {turnPhases.map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Aktivní: {turnPhases[i].label}
                </p>
                <TurnPhaseTimeline activeStep={i} />
              </div>
            ))}
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <TurnPhaseTimeline activeStep={phaseDemo} />
            <div style={{ display: 'flex', gap: 8 }}>
              {turnPhases.map((step, i) => (
                <DonjonButton key={i} size="xs" onClick={() => setPhaseDemo(i)}>
                  {step.label}
                </DonjonButton>
              ))}
            </div>
          </div>
        </Preview>

        <CodeBlock code={`<TurnPhaseTimeline activeStep={0} /> {/* Ohniska */}
<TurnPhaseTimeline activeStep={1} /> {/* Akce */}
<TurnPhaseTimeline activeStep={2} /> {/* Souboj */}`} />
      </Section>

      <Section
        id="indikator-hrace"
        title="Indikátor hráče"
        description="Zobrazuje aktuálního hráče, barvu z mapy a číslo tahu."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {players.map((player, i) => (
              <TurnCard key={player.id} player={player} turn={i + 1} />
            ))}
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <TurnCard player={players[activeTurn]} turn={activeTurn + 1} />
            <DonjonButton
              size="sm"
              trailingIcon={<EndTurnIcon />}
              onClick={() => setActiveTurn(t => (t + 1) % players.length)}
            >
              Konec tahu
            </DonjonButton>
          </div>
        </Preview>

        <CodeBlock code={`<DonjonCard>
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 40, height: 40, background: player.color }} />
    <div>
      <p>{player.label}</p>
      <p>Na tahu</p>
    </div>
    <DonjonBadge size="sm">Tah {turn}</DonjonBadge>
  </div>
</DonjonCard>`} />
      </Section>

      <Section
        id="scenare"
        title="Flow scénáře"
        description="Tři typické průběhy tahu — každý začíná ohniskem, ale fáze souboje nastane jen při pohybu na nepřátelské pole."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Scénář A */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Scénář A — tah bez ohniska
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <DonjonBadge variant="default">Ohnisko — přeskočeno</DonjonBadge>
                <span style={{ color: '#2A2948', fontSize: '1rem' }}>→</span>
                <DonjonBadge variant="info">Akce</DonjonBadge>
                <span style={{ color: '#2A2948', fontSize: '1rem' }}>→</span>
                <DonjonBadge variant="default">Konec tahu</DonjonBadge>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.5 }}>
                Hráč nemá kostku na aktivním ohnisku. Fáze ohniska se přeskočí, tah přechází přímo na výběr akce.
              </p>
            </div>

            <div style={{ height: 1, background: '#2A2948' }} />

            {/* Scénář B */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#FFC18388', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Scénář B — tah s ohniskem
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                  <DonjonBadge variant="warning">Ohnisko → +1 VP</DonjonBadge>
                  <span style={{ fontSize: '0.5625rem', color: '#6A6040' }}>kostka přehozena</span>
                </div>
                <span style={{ color: '#2A2948', fontSize: '1rem' }}>→</span>
                <DonjonBadge variant="info">Akce</DonjonBadge>
                <span style={{ color: '#2A2948', fontSize: '1rem' }}>→</span>
                <DonjonBadge variant="default">Konec tahu</DonjonBadge>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.5 }}>
                Hráč drží kostku/věž na aktivním ohnisku. Na začátku tahu získá 1 VP, kostka se přehodí (nová hodnota ≤ původní − 1) a ohnisko se přepne.
              </p>
            </div>

            <div style={{ height: 1, background: '#2A2948' }} />

            {/* Scénář C */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#E05C5C88', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Scénář C — akce spustí souboj
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <DonjonBadge variant="default">Ohnisko</DonjonBadge>
                <span style={{ color: '#2A2948', fontSize: '1rem' }}>→</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                  <DonjonBadge variant="info">Akce: Pohyb</DonjonBadge>
                  <span style={{ fontSize: '0.5625rem', color: '#4A4560' }}>vstup na nepřátelské pole</span>
                </div>
                <span style={{ color: '#2A2948', fontSize: '1rem' }}>→</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                  <DonjonBadge variant="danger">Souboj — automaticky</DonjonBadge>
                  <span style={{ fontSize: '0.5625rem', color: '#803030' }}>Push nebo Occupy</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.5 }}>
                Pohyb kostky nebo věže na nepřátelské pole spustí souboj automaticky. Hráč souboj nevolí — je důsledkem pohybu.
              </p>
            </div>
          </div>
        </Preview>
      </Section>

      <Section
        id="ohnisko"
        title="Vyhodnocení ohniska"
        description="První fáze tahu. Pokud hráč drží kostku/věž na aktivním ohnisku, získá VP a ohnisko se přepíná."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <DonjonCard title="Bez aktivního ohniska" description="Hráč nekontroluje žádné aktivní ohnisko">
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                Fáze ohniska se přeskočí. Hra přechází přímo na výběr akce.
              </p>
            </DonjonCard>

            <DonjonCard title="Aktivní ohnisko — vyhodnocení" description="Hráč drží kostku/věž na aktivním ohnisku">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <DonjonBadge variant="warning">+1 VP</DonjonBadge>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#B8956A', lineHeight: 1.5 }}>
                    Hráč získá 1 vítězný bod.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <DonjonBadge variant="info">Přehoz</DonjonBadge>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.5 }}>
                    Kostka na ohnisku se přehodí: nová hodnota = min(hod, původní − 1).
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <DonjonBadge variant="default">Přepnutí</DonjonBadge>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.5 }}>
                    Náhodné pasivní ohnisko ze skupiny se stane aktivní; toto se stane pasivní.
                  </p>
                </div>
              </div>
            </DonjonCard>
          </div>
        </Preview>
      </Section>

      <Section
        id="souboj"
        title="Souboj"
        description="Souboj není akcí — spouští ho pohyb kostky nebo věže na pole obsazené nepřítelem s nižší bojovou silou."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <DonjonCard title="Pohyb bez souboje" description="Cílové pole je prázdné">
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                Pohyb proběhne bez dalšího vyhodnocení. Tah přechází na výběr akce (nebo souboj nenastane).
              </p>
            </DonjonCard>
            <DonjonCard title="Pohyb → souboj" description="Cílové pole obsazeno nepřítelem" variant="danger">
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F9C0C0', lineHeight: 1.6 }}>
                Pokud bojová síla útočníka převyšuje obranu, pohyb automaticky spustí souboj. Hráč následně volí Push nebo Occupy.
              </p>
            </DonjonCard>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
