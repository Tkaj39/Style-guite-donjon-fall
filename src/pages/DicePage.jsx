import DieFace from '../components/game-assets/DieFace'
import HexTile from '../components/game-assets/HexTile'
import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { players } from '../data/gameUiMockData'
import { useBreakpoint } from '../hooks/useBreakpoint'

function statLabel(s) {
  const labels = { default: 'Default', selected: 'Vybraný', rerolled: 'Přehozeno', damaged: 'Poškozeno' }
  return labels[s] ?? s
}

// PEEK and box per size — coordinated with HexTile sizeMap so tower fits on hex
const towerSizeConfig = {
  xs: { box: 24, peek: 10 }, // tower of 3: 44px ≤ sm hex height 48px
  sm: { box: 32, peek: 16 }, // tower of 3: 64px ≤ md hex height 72px
  md: { box: 48, peek: 20 }, // tower of 3: 88px ≤ lg hex height 96px
  lg: { box: 64, peek: 26 },
}

function TowerStack({ dice, size = 'md' }) {
  const cfg = towerSizeConfig[size] ?? towerSizeConfig.md
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {[...dice].reverse().map((die, i) => {
        const p = players.find(p => p.id === die.owner)
        return (
          <div key={i} style={{
            position: 'relative',
            zIndex: dice.length - i,
            marginTop: i === 0 ? 0 : -(cfg.box - cfg.peek),
          }}>
            <DieFace value={die.value} playerColor={p?.color ?? '#8F7458'} size={size} />
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

const hexDims = { sm: { w: 42, h: 48 }, md: { w: 62, h: 72 }, lg: { w: 83, h: 96 } }

function DieOnHex({ dieValue = 4, dieSize = 'xs', playerColor, hexState = 'empty', hexSize = 'sm', owner }) {
  const p = owner != null ? players.find(p => p.id === owner) : players[0]
  const color = playerColor ?? p?.color ?? '#8F7458'
  const { w, h } = hexDims[hexSize] ?? hexDims.sm
  return (
    <div style={{ position: 'relative', width: w, height: h, flexShrink: 0 }}>
      <HexTile state={hexState} owner={color} size={hexSize} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <DieFace value={dieValue} playerColor={color} size={dieSize} />
      </div>
    </div>
  )
}

function TowerOnHex({ tower, dieSize = 'xs', hexState = 'empty', hexSize = 'sm' }) {
  const { w, h } = hexDims[hexSize] ?? hexDims.sm
  const cfg = towerSizeConfig[dieSize] ?? towerSizeConfig.xs
  const n = tower.length
  // bottom die center from top of tower = (n-1)*peek + box/2
  const bottomDieCenter = (n - 1) * cfg.peek + cfg.box / 2
  // align bottom die center with hex vertical center
  const topOffset = h / 2 - bottomDieCenter

  return (
    <div style={{ position: 'relative', width: w, height: h, flexShrink: 0 }}>
      <HexTile state={hexState} size={hexSize} />
      <div style={{ position: 'absolute', top: topOffset, left: '50%', transform: 'translateX(-50%)' }}>
        <TowerStack dice={tower} size={dieSize} />
      </div>
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
            <DieFace value={2} playerColor={p2.color} size="md" state="rerolled" />
            <DonjonBadge size="sm" variant="default">min(hod, původní)</DonjonBadge>
            <span style={{ fontSize: '0.5625rem', color: '#8F7458', textTransform: 'uppercase' }}>Reroll</span>
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
  const isDesktop = useBreakpoint()
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
              <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto' }}>
                <span style={{ fontSize: '0.625rem', color: '#4A4560', width: 50, textAlign: 'right', flexShrink: 0, letterSpacing: '0.08em' }}>
                  {player.label}
                </span>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
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
          <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <TowerStack dice={cleanTower} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <StatPill label="Combat Power" value={`${calcCombatPower(cleanTower)} (${cleanTower[cleanTower.length-1].value}+${cleanTower.slice(0,-1).filter(d=>d.owner===cleanTower[cleanTower.length-1].owner).length}−0)`} color={players[0].color} />
                <StatPill label="Pohyb věže" value={calcMovementRange(cleanTower)} color="#8F7458" />
                <StatPill label="Pohyb vrcholu (skok)" value={cleanTower[cleanTower.length-1].value} color="#4D8FE0" />
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
          <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <TowerStack dice={mixedTower} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <StatPill label="Combat Power" value={`${calcCombatPower(mixedTower)} (${mixedTower[mixedTower.length-1].value}+${mixedTower.slice(0,-1).filter(d=>d.owner===mixedTower[mixedTower.length-1].owner).length}−${mixedTower.slice(0,-1).filter(d=>d.owner!==mixedTower[mixedTower.length-1].owner).length})`} color={players[0].color} />
                <StatPill label="Pohyb věže" value={calcMovementRange(mixedTower)} color="#8F7458" />
                <StatPill label="Pohyb vrcholu (skok)" value={mixedTower[mixedTower.length-1].value} color="#4D8FE0" />
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

      <Section
        id="kostka-na-hexu"
        title="Kostka na hexu"
        description="Koordinované velikosti — xs kostka na sm hexu, sm na md, md na lg. Věž 3 kostek se vejde do výšky hexu."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Single die on hex */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Kostka na hexu</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <DieOnHex dieValue={5} dieSize="xs" hexSize="sm" owner={1} />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>xs / sm hex</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <DieOnHex dieValue={3} dieSize="xs" hexSize="sm" owner={2} />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>xs / sm hex</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <DieOnHex dieValue={4} dieSize="sm" hexSize="md" owner={1} />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>sm / md hex</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <DieOnHex dieValue={6} dieSize="md" hexSize="lg" owner={1} />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>md / lg hex</span>
                </div>
              </div>
            </div>

            {/* Tower on hex */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Věž na hexu — 3 kostky</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <TowerOnHex tower={[{ owner:1,value:2 },{ owner:1,value:4 },{ owner:1,value:5 }]} dieSize="xs" hexSize="sm" />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>xs / sm hex</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <TowerOnHex tower={[{ owner:2,value:3 },{ owner:1,value:1 },{ owner:1,value:6 }]} dieSize="xs" hexSize="sm" />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>smíšená / sm hex</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <TowerOnHex tower={[{ owner:1,value:2 },{ owner:1,value:4 },{ owner:1,value:5 }]} dieSize="sm" hexSize="md" />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>sm / md hex</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <TowerOnHex tower={[{ owner:1,value:2 },{ owner:1,value:4 },{ owner:1,value:5 }]} dieSize="md" hexSize="lg" />
                  <span style={{ fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>md / lg hex</span>
                </div>
              </div>
            </div>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
