import DieFace from '../components/game-assets/DieFace'
import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { players } from '../data/gameUiMockData'

function statLabel(s) {
  const labels = { default: 'Default', selected: 'Vybraný', rerolled: 'Přehozeno', damaged: 'Poškozeno' }
  return labels[s] ?? s
}

function TowerStack({ dice }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 3, alignItems: 'center' }}>
      {dice.map((die, i) => {
        const p = players.find(p => p.id === die.owner)
        const isTop = i === dice.length - 1
        return (
          <div key={i} style={{ opacity: isTop ? 1 : 0.85, transform: isTop ? 'none' : 'scale(0.96)' }}>
            <DieFace value={die.value} playerColor={p?.color ?? '#8F7458'} size="md" state={isTop ? 'default' : 'default'} />
          </div>
        )
      })}
    </div>
  )
}

function StatPill({ label, value, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: '#1B1A30', borderRadius: 4, padding: '4px 10px',
      border: `1px solid ${color ?? '#3A3858'}33`,
    }}>
      <span style={{ fontSize: '0.5625rem', color: '#4A4560', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: color ?? '#F0E6D3' }}>{value}</span>
    </div>
  )
}

// Combat power: F + S - E (F=top face, S=same-owner supporters, E=enemy dice)
function calcCombatPower(dice) {
  const top = dice[dice.length - 1]
  const rest = dice.slice(0, -1)
  const S = rest.filter(d => d.owner === top.owner).length
  const E = rest.filter(d => d.owner !== top.owner).length
  return top.value + S - E
}

// Tower movement range: max(O - E, 1)
function calcMovementRange(dice) {
  const top = dice[dice.length - 1]
  const rest = dice.slice(0, -1)
  const O = dice.filter(d => d.owner === top.owner).length
  const E = rest.filter(d => d.owner !== top.owner).length
  return Math.max(O - E, 1)
}

const cleanTower = [
  { owner: 1, value: 2 },
  { owner: 1, value: 4 },
  { owner: 1, value: 5 },
]

const mixedTower = [
  { owner: 2, value: 3 },
  { owner: 1, value: 1 },
  { owner: 1, value: 6 },
]

// Push chain example: attacker → enemy die → result
function PushChainDemo({ variant }) {
  const p1 = players[0] // red attacker
  const p2 = players[1] // blue defender

  const configs = {
    free: {
      label: 'Volný hex za formací',
      result: <DieFace value={2} playerColor={p2.color} size="md" />,
      resultLabel: 'Přesunuto',
      resultColor: '#8F7458',
    },
    border: {
      label: 'Okraj mapy za formací',
      result: (
        <div style={{ opacity: 0.3, position: 'relative' }}>
          <DieFace value={2} playerColor={p2.color} size="md" />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', color: '#E05C5C', fontWeight: 900,
          }}>×</div>
        </div>
      ),
      resultLabel: 'Zničeno',
      resultColor: '#E05C5C',
    },
    encircle: {
      label: 'Vlastní kostka za formací (obklíčení)',
      result: (
        <div style={{ opacity: 0.3, position: 'relative' }}>
          <DieFace value={2} playerColor={p2.color} size="md" />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', color: '#E05C5C', fontWeight: 900,
          }}>×</div>
        </div>
      ),
      resultLabel: '+1 VP',
      resultColor: '#FFC183',
    },
  }

  const cfg = configs[variant]
  const arrow = <span style={{ color: '#4A4560', fontSize: '1.2rem', lineHeight: 1 }}>→</span>

  return (
    <DonjonCard title={cfg.label} description="Push — Fáze 2">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <DieFace value={5} playerColor={p1.color} size="md" />
            <span style={{ fontSize: '0.5625rem', color: '#4A4560', textTransform: 'uppercase' }}>Útočník</span>
          </div>
          {arrow}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <DieFace value={2} playerColor={p2.color} size="md" />
            <span style={{ fontSize: '0.5625rem', color: '#4A4560', textTransform: 'uppercase' }}>Obránce</span>
          </div>
          {arrow}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {cfg.result}
            <span style={{ fontSize: '0.5625rem', color: cfg.resultColor, textTransform: 'uppercase' }}>{cfg.resultLabel}</span>
          </div>
          {variant === 'encircle' && (
            <>
              {arrow}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <DieFace value={3} playerColor={p1.color} size="md" />
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', textTransform: 'uppercase' }}>Obklíčení</span>
              </div>
            </>
          )}
        </div>
        {(variant === 'border' || variant === 'encircle') && (
          <DonjonBadge variant="danger">+1 VP za zničenou kostku</DonjonBadge>
        )}
      </div>
    </DonjonCard>
  )
}

export default function DicePage() {
  return (
    <ShowcasePage
      title="Kostky"
      description="D6 kostky jako základní herní jednotka. Každý hráč vlastní sadu kostek barevně označených jeho barvou. Kostky se stohují do věží."
    >
      {/* Values */}
      <Section
        id="hodnoty"
        title="Hodnoty 1–6"
        description="Každá kostka zobrazuje hodnotu 1–6 tečkami v standardním D6 rozmístění. Barva kostky odpovídá majiteli."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {players.map(player => (
              <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '0.625rem', color: '#4A4560', width: 50, textAlign: 'right', flexShrink: 0, letterSpacing: '0.08em' }}>
                  {player.label}
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5, 6].map(v => (
                    <DieFace key={v} value={v} playerColor={player.color} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            {[1, 2, 3, 4, 5, 6].map(v => (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <DieFace value={v} playerColor={players[0].color} size="lg" />
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', letterSpacing: '0.1em' }}>{v}</span>
              </div>
            ))}
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            {(['sm', 'md', 'lg']).map(sz => (
              <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <DieFace value={6} playerColor={players[0].color} size={sz} />
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sz}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              {(['default', 'selected', 'rerolled', 'damaged']).map(st => (
                <div key={st} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <DieFace value={4} playerColor={players[0].color} size="md" state={st} />
                  <span style={{ fontSize: '0.5625rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{statLabel(st)}</span>
                </div>
              ))}
            </div>
          </div>
        </Preview>

        <CodeBlock code={`<DieFace value={6} playerColor="#E05C5C" size="md" />
<DieFace value={4} playerColor="#4D8FE0" size="sm" state="selected" />`} />
      </Section>

      {/* Clean tower */}
      <Section
        id="vez-cista"
        title="Věž čistá"
        description="Všechny kostky ve věži patří jednomu hráči. Kontroler = vlastník vrchní kostky."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <TowerStack dice={cleanTower} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <StatPill label="Combat Power" value={`${calcCombatPower(cleanTower)} (${cleanTower[cleanTower.length-1].value}+${cleanTower.slice(0,-1).filter(d=>d.owner===cleanTower[cleanTower.length-1].owner).length}−0)`} color={players[0].color} />
                <StatPill label="Movement Range" value={calcMovementRange(cleanTower)} color="#8F7458" />
                <StatPill label="Kontroler" value={players[0].label} color={players[0].color} />
              </div>
            </div>

            <DonjonCard title="Výpočet — čistá věž" description="Dle rules.txt">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <DonjonBadge variant="default">Combat Power</DonjonBadge>
                  <span style={{ fontSize: '0.8125rem', color: '#8F7458' }}>= F + S − E</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.6 }}>
                  F = face value vrchní kostky<br />
                  S = podpůrné kostky (stejný vlastník jako vrchní)<br />
                  E = nepřátelské kostky (jiný vlastník)<br />
                  Čistá věž: E = 0, každá podpůrná kostka přidává +1
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <DonjonBadge variant="default">Movement Range</DonjonBadge>
                  <span style={{ fontSize: '0.8125rem', color: '#8F7458' }}>= max(O − E, 1)</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.6 }}>
                  O = vlastní kostky (včetně vrchní)<br />
                  E = nepřátelské kostky<br />
                  Minimum je vždy 1.
                </p>
              </div>
            </DonjonCard>
          </div>
        </Preview>

        <Section
          title="Push — výsledky souboje"
          description="Vizualizace Push chain — útočník, obránce a výsledek podle toho co je za formací."
        >
          <Preview>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <DonjonCard title="Fáze 1 — automaticky" description="Útočná kostka −1 hodnota (min. 1)">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <DieFace value={5} playerColor={players[0].color} size="md" />
                    <span style={{ fontSize: '0.5625rem', color: '#4A4560', textTransform: 'uppercase' }}>Před</span>
                  </div>
                  <span style={{ color: '#E05C5C', fontWeight: 700, fontSize: '1rem' }}>−1</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <DieFace value={4} playerColor={players[0].color} size="md" />
                    <span style={{ fontSize: '0.5625rem', color: '#4A4560', textTransform: 'uppercase' }}>Po</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.5, maxWidth: 260 }}>
                    Vrchní kostka útočníka sníží hodnotu o 1 (minimum 1). Proběhne vždy před výběrem Push/Occupy.
                  </p>
                </div>
              </DonjonCard>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <PushChainDemo variant="free" />
                <PushChainDemo variant="border" />
                <PushChainDemo variant="encircle" />
              </div>
            </div>
          </Preview>
        </Section>
      </Section>

      {/* Mixed tower */}
      <Section
        id="vez-smisena"
        title="Věž smíšená"
        description="Věž obsahuje kostky více hráčů — vzniká akcí Occupy. Kontroler = vlastník vrchní kostky."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <TowerStack dice={mixedTower} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <StatPill label="Combat Power" value={`${calcCombatPower(mixedTower)} (${mixedTower[mixedTower.length-1].value}+${mixedTower.slice(0,-1).filter(d=>d.owner===mixedTower[mixedTower.length-1].owner).length}−${mixedTower.slice(0,-1).filter(d=>d.owner!==mixedTower[mixedTower.length-1].owner).length})`} color={players[0].color} />
                <StatPill label="Movement Range" value={calcMovementRange(mixedTower)} color="#8F7458" />
                <StatPill label="Kontroler" value={players[0].label} color={players[0].color} />
              </div>
            </div>

            <DonjonCard title="Smíšená věž — pravidla" description="Mixed tower">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                  Kontroler věže je vždy vlastník <strong style={{ color: '#F0E6D3' }}>vrchní kostky</strong>.
                  Nepřátelské kostky uvnitř věže snižují combat power (−1 za každou) a movement range.
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <DonjonBadge variant="warning">E kostky snižují CP</DonjonBadge>
                  <DonjonBadge variant="danger">Kolaps věže ji zničí</DonjonBadge>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.5 }}>
                  Vlastnictví kostek se nemění — kostka vždy patří svému původnímu hráči.
                  Occupy není dostupné při útoku věží.
                </p>
              </div>
            </DonjonCard>
          </div>
        </Preview>

        <CodeBlock code={`// Čistá věž: 3 kostky hráče 1
const cleanTower = [{ owner:1, value:2 }, { owner:1, value:4 }, { owner:1, value:5 }]
// combat power = 5 + 2 - 0 = 7
// movement range = max(3 - 0, 1) = 3

// Smíšená věž: 2× hráč 1, 1× hráč 2
const mixedTower = [{ owner:2, value:3 }, { owner:1, value:1 }, { owner:1, value:6 }]
// combat power = 6 + 1 - 1 = 6
// movement range = max(2 - 1, 1) = 1`} />
      </Section>
    </ShowcasePage>
  )
}
