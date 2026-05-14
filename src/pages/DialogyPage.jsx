import { useState } from 'react'
import DonjonCard from '../components/DonjonCard'
import DonjonButton from '../components/DonjonButton'
import DonjonBadge from '../components/DonjonBadge'
import ButtonGroup from '../lib/tkajui/ButtonGroup'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import { players } from '../data/gameUiMockData'

function PushIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" />
    </svg>
  )
}

function OccupyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
    </svg>
  )
}

function SkullIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
      <path d="M8 1a5 5 0 0 0-5 5c0 2 1 3.5 2.5 4.5V13h5v-2.5A5 5 0 0 0 13 6a5 5 0 0 0-5-5ZM5 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    </svg>
  )
}

function FireIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Z" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
      <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v1C1 5.43 2.044 7.01 3.59 7.743A5.002 5.002 0 0 0 7.25 11.5H7v1.25H5.5a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5H9v-1.25h-.25a5.002 5.002 0 0 0 3.66-3.757C13.956 7.01 15 5.43 15 3.5v-1A1.5 1.5 0 0 0 13.5 1h-11ZM2.5 2.5h11v1c0 1.374-.673 2.604-1.725 3.374a3.502 3.502 0 0 1-7.55 0C3.173 6.104 2.5 4.874 2.5 3.5v-1Z" />
    </svg>
  )
}

const combatItems = [
  { value: 'push',   label: 'Push',   icon: <PushIcon /> },
  { value: 'occupy', label: 'Occupy', icon: <OccupyIcon /> },
]

const pushOutcomes = [
  {
    title: 'Volný hex',
    description: 'Za formací je prázdné pole',
    variant: 'default',
    body: 'Nepřátelská formace se posune o jeden hex ve směru útoku. Útočník zůstane na obsazeném poli.',
  },
  {
    title: 'Okraj mapy — zničení',
    description: 'Za formací je hranice mapy',
    variant: 'danger',
    body: 'Poslední kostka/věž ve formaci je vytlačena z mapy a zničena. Za každou zničenou nepřátelskou kostku hráč získá +1 VP.',
  },
  {
    title: 'Obklíčení',
    description: 'Za formací je vlastní kostka/věž',
    variant: 'danger',
    body: 'Poslední kostka/věž formace je obklíčena a zničena. Za každou zničenou nepřátelskou kostku hráč získá +1 VP.',
  },
]

export default function DialogyPage() {
  const [combatChoice, setCombatChoice] = useState('push')
  const [vpSource, setVpSource] = useState('destruction')

  return (
    <ShowcasePage
      title="Dialogy"
      description="Systémové herní dialogy — rozhodnutí souboje, zpětná vazba na VP, přechody tahu a výsledky hry."
    >
      <Section
        id="rozhodnuti-souboje"
        title="Rozhodnutí souboje"
        description="Po pohybu na nepřátelské pole nejprve proběhne Fáze 1 automaticky, pak hráč volí Push nebo Occupy."
      >
        <Preview>
          <DonjonCard title="Fáze 1 — automaticky" description="Bez volby hráče">
            <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
              Hodnota útočné kostky (nebo vrcholu věže) se sníží o 1, minimálně na 1. Tato fáze proběhne vždy před výběrem Fáze 2.
            </p>
          </DonjonCard>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            {/* Dostupnost na první pohled */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Push</span>
                <DonjonBadge variant="success">Vždy dostupné</DonjonBadge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Occupy</span>
                <DonjonBadge variant="warning">Pouze solo kostka jako útočník</DonjonBadge>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Fáze 2 — výběr
              </p>
              <ButtonGroup items={combatItems} value={combatChoice} onChange={setCombatChoice} />
            </div>

            {combatChoice === 'push' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <DonjonCard title="Push — vytlačení" description="Dostupné vždy">
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6, marginBottom: 12 }}>
                    První kostka/vrchol věže nepřátelské formace se přehodí — nová hodnota = min(hod, původní).
                    Celá formace se posune o jeden hex ve směru útoku.
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', fontStyle: 'italic' }}>
                    Výsledek závisí na tom, co je za formací:
                  </p>
                </DonjonCard>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {pushOutcomes.map(o => (
                    <DonjonCard key={o.title} title={o.title} description={o.description} variant={o.variant}>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: o.variant === 'danger' ? '#F9C0C0' : '#8F7458', lineHeight: 1.6 }}>
                        {o.body}
                      </p>
                    </DonjonCard>
                  ))}
                </div>
              </div>
            )}

            {combatChoice === 'occupy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <DonjonCard title="Occupy — obsazení" description="Pouze pro solo kostku jako útočník">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <DonjonBadge variant="warning">Solo kostka only</DonjonBadge>
                      <DonjonBadge variant="default">Obránce se nepřehazuje</DonjonBadge>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                      Útočná kostka naskočí na vrchol nepřátelské kostky/věže a vytvoří smíšenou věž.
                    </p>
                  </div>
                </DonjonCard>

                <DonjonCard title="Occupy při útoku věží" description="Nedostupné — věž musí vždy Push" variant="danger">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <DonjonBadge variant="danger">Nedostupné pro věž</DonjonBadge>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                      Věž nemůže použít Occupy — při útoku věží je dostupné výhradně Push.
                    </p>
                  </div>
                </DonjonCard>
              </div>
            )}
          </div>
        </Preview>
      </Section>

      <Section
        id="vitezny-bod"
        title="Vítězný bod"
        description="Zpětná vazba na zisk vítězného bodu — dvě situace, kdy k němu dojde."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <DonjonButton
              size="xs"
              variant={vpSource === 'destruction' ? 'danger' : 'default'}
              onClick={() => setVpSource('destruction')}
            >
              Zničení kostky
            </DonjonButton>
            <DonjonButton
              size="xs"
              variant={vpSource === 'focal' ? 'default' : 'default'}
              onClick={() => setVpSource('focal')}
            >
              Aktivní ohnisko
            </DonjonButton>
          </div>

          {vpSource === 'destruction' && (
            <DonjonCard title="+1 vítězný bod" description="Za zničení nepřátelské kostky" variant="danger">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <DonjonBadge variant="danger" icon={<SkullIcon />}>+1 VP</DonjonBadge>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F9C0C0', lineHeight: 1.5 }}>
                  Kostka zničena vytlačením z mapy, obklíčením nebo kolapsem věže.
                </p>
              </div>
            </DonjonCard>
          )}

          {vpSource === 'focal' && (
            <DonjonCard title="+1 vítězný bod" description="Za aktivní ohnisko na začátku tahu">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <DonjonBadge variant="warning" icon={<FireIcon />}>+1 VP</DonjonBadge>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#B8956A', lineHeight: 1.5 }}>
                  Hráč drží kostku/věž na aktivním ohnisku na začátku svého tahu.
                </p>
              </div>
            </DonjonCard>
          )}
        </Preview>
      </Section>

      <Section
        id="zacatek-tahu"
        title="Začátek tahu"
        description="Dialog přechodu tahu — informuje o novém aktivním hráči a zahajuje fázi ohnisek."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {players.slice(0, 3).map((player, i) => (
              <DonjonCard key={player.id}>
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
                  <DonjonBadge size="sm">Tah {i + 1}</DonjonBadge>
                </div>
              </DonjonCard>
            ))}
          </div>
        </Preview>
      </Section>

      <Section
        id="vyhra-hry"
        title="Výhra hry"
        description="Dialog zobrazený prvnímu hráči, který dosáhne cílového počtu VP."
      >
        <Preview>
          <DonjonCard
            title="Vítěz"
            description="Hráč dosáhl cílového počtu vítězných bodů"
            variant="success"
            footer={<DonjonButton size="sm" variant="success" leadingIcon={<TrophyIcon />}>Nová hra</DonjonButton>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 4,
                  background: players[0].color, flexShrink: 0,
                  boxShadow: `0 0 10px ${players[0].color}88`,
                }} />
                <p style={{
                  margin: 0, fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: 'linear-gradient(180deg,#C0F0C8 0%,#40A055 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{players[0].label}</p>
                <DonjonBadge variant="success" icon={<TrophyIcon />}>5 VP</DonjonBadge>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#C0F0C8', lineHeight: 1.6 }}>
                Hráč dosáhl 5 vítězných bodů a vyhrál hru. Body nelze ztratit — vítěz je první kdo cíle dosáhne.
              </p>
            </div>
          </DonjonCard>
        </Preview>
      </Section>

      <Section
        id="nahla-smrt"
        title="Náhlá smrt"
        description="Hráč, který nemůže provést žádnou legální akci, okamžitě prohrává."
      >
        <Preview>
          <DonjonCard
            title="Náhlá smrt"
            description="Hráč nemůže provést žádnou legální akci"
            variant="danger"
            footer={<DonjonButton size="sm" variant="danger">Konec hry</DonjonButton>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 3,
                  background: players[1].color, flexShrink: 0,
                  opacity: 0.5,
                }} />
                <p style={{
                  margin: 0, fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#F9C0C0',
                }}>{players[1].label}</p>
                <DonjonBadge variant="danger">Prohrál</DonjonBadge>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F9C0C0', lineHeight: 1.6 }}>
                Hráč nemá k dispozici žádnou legální akci. Prohrává okamžitě bez ohledu na počet VP.
                Tato podmínka je nezávislá na VP — nastane kdykoli v průběhu hry.
              </p>
            </div>
          </DonjonCard>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
