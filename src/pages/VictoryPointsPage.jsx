import { useState, useOptimistic, useTransition } from 'react'
import DonjonCard from '../lib/donjon/DonjonCard'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { players as basePlayers } from '../data/gameUiMockData'
import {
  bgDeep, dangerText, gold, goldDim, goldMid, textActive, textFaint,
} from '../lib/donjon/tokens'
import { FireIcon } from '../lib/donjon/icons'

const DEFAULT_MAP_VP = 5
const TARGET_VP = DEFAULT_MAP_VP

const vp = [5, 3, 2, 1, 0, 0]
const players = basePlayers.map((p, i) => ({ ...p, vp: vp[i] }))

function SkullIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
      <path d="M8 1a5 5 0 0 0-5 5c0 2 1 3.5 2.5 4.5V13h5v-2.5A5 5 0 0 0 13 6a5 5 0 0 0-5-5ZM5 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    </svg>
  )
}

function VPBar({ vp, color }) {
  const pct = Math.min(vp / TARGET_VP, 1)
  return (
    <div style={{
      height: 4,
      background: bgDeep,
      borderRadius: 2,
      overflow: 'hidden',
      flex: 1,
    }}>
      <div style={{
        height: '100%',
        width: `${pct * 100}%`,
        background: color,
        borderRadius: 2,
        boxShadow: `0 0 6px ${color}88`,
        transition: 'width 400ms ease',
      }} />
    </div>
  )
}

const sorted = [...players].sort((a, b) => b.vp - a.vp)

/* ── useOptimistic demo ─────────────────────────────────────────────────
   Simuluje přidání VP: klik → okamžitá optimistická aktualizace →
   "server" potvrdí po 1,2 s. Pending stav je vizuálně odlišen.
   ─────────────────────────────────────────────────────────────────────── */
const DEMO_PLAYERS = basePlayers.slice(0, 2).map((p, i) => ({
  ...p,
  vp: i === 0 ? 3 : 1,
}))

function OptimisticVPDemo() {
  const [scores, setScores] = useState(
    () => Object.fromEntries(DEMO_PLAYERS.map(p => [p.id, p.vp]))
  )
  const [isPending, startTransition] = useTransition()

  const [optimisticScores, addOptimisticVP] = useOptimistic(
    scores,
    (current, { id }) => ({ ...current, [id]: (current[id] ?? 0) + 1 }),
  )

  const handleAddVP = (playerId) => {
    addOptimisticVP({ id: playerId })
    startTransition(async () => {
      // simulace latence serveru
      await new Promise(r => setTimeout(r, 1200))
      setScores(prev => ({ ...prev, [playerId]: (prev[playerId] ?? 0) + 1 }))
    })
  }

  return (
    <DonjonCard title="Přidání VP — optimistická aktualizace" description="Klikni na +1 VP → skóre se změní okamžitě, server potvrdí po 1,2 s">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DEMO_PLAYERS.map(player => {
          const displayed = optimisticScores[player.id] ?? 0
          const confirmed = scores[player.id] ?? 0
          const isOptimistic = displayed !== confirmed
          return (
            <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Color chip */}
              <div style={{
                width: 10, height: 10, borderRadius: 2,
                background: player.color, flexShrink: 0,
                boxShadow: `0 0 4px ${player.color}66`,
              }} />
              {/* Name */}
              <span style={{ fontSize: '0.75rem', color: goldDim, width: 64, flexShrink: 0 }}>
                {player.label}
              </span>
              {/* Score */}
              <span style={{
                fontSize: '0.875rem', fontWeight: 700,
                color: isOptimistic ? player.color : textActive,
                width: 48, flexShrink: 0,
                transition: 'color 0.3s',
                opacity: isOptimistic ? 0.8 : 1,
              }}>
                {displayed} VP
                {isOptimistic && (
                  <span style={{ fontSize: '0.625rem', marginLeft: 4, color: player.color, opacity: 0.7 }}>
                    ●
                  </span>
                )}
              </span>
              {/* Button */}
              <button
                onClick={() => handleAddVP(player.id)}
                disabled={isPending && displayed !== confirmed}
                style={{
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: `${player.color}18`,
                  border: `1px solid ${player.color}44`,
                  borderRadius: 4,
                  color: player.color,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  opacity: (isPending && displayed !== confirmed) ? 0.5 : 1,
                }}
              >
                +1 VP
              </button>
            </div>
          )
        })}
        <p style={{ margin: '4px 0 0', fontSize: '0.6875rem', color: textFaint }}>
          ● = optimistická hodnota (čeká na potvrzení serveru)
        </p>
      </div>
    </DonjonCard>
  )
}

export default function VictoryPointsPage() {
  return (
    <ShowcasePage
      library="donjon"
      title="Vítězné body"
      description="Systém skórování — body jsou permanentní a nelze je ztratit. Vítěz je první hráč, který dosáhne cílového počtu bodů."
    >
      {/* Scoreboard */}
      <Section
        title="Skóre hráčů"
        description={`Přehled bodů všech hráčů seřazený od nejvyššího. Cíl: ${TARGET_VP} bodů.`}
      >
        <Preview>
          <DonjonCard
            title={`Skóre — cíl ${TARGET_VP} bodů`}
            description="Seřazeno od vedoucího hráče"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sorted.map((player, i) => (
                <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Rank */}
                  <span style={{
                    width: 16,
                    fontSize: '0.625rem',
                    color: i === 0 ? gold : textFaint,
                    fontWeight: 700,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}>
                    {i + 1}.
                  </span>
                  {/* Color chip */}
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: player.color,
                    flexShrink: 0,
                    boxShadow: `0 0 4px ${player.color}66`,
                  }} />
                  {/* Name */}
                  <span style={{
                    fontSize: '0.75rem',
                    color: goldDim,
                    width: 60,
                    flexShrink: 0,
                  }}>
                    {player.label}
                  </span>
                  {/* Progress bar */}
                  <VPBar vp={player.vp} color={player.color} />
                  {/* VP count */}
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: textActive,
                    width: 40,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}>
                    {player.vp} / {TARGET_VP}
                  </span>
                </div>
              ))}
            </div>
          </DonjonCard>
        </Preview>
        <CodeBlock code={`<DonjonCard title="Skóre — cíl 5 bodů" description="Seřazeno od vedoucího hráče">
  {players.map(player => (
    <div key={player.id}>
      <ColorChip color={player.color} />
      <span>{player.label}</span>
      <ProgressBar vp={player.vp} target={5} />
      <span>{player.vp} / 5</span>
    </div>
  ))}
</DonjonCard>`} />
      </Section>

      {/* VP earning methods */}
      <Section
        title="Způsoby získání VP"
        description="Dva způsoby jak získat vítězné body — oba se vyhodnocují v rámci tahu hráče."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <DonjonCard
              title="Zničení kostky"
              description="Za každou zničenou nepřátelskou kostku"
              variant="danger"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <DonjonBadge variant="danger" icon={<SkullIcon />}>+1 VP</DonjonBadge>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: dangerText, lineHeight: 1.5 }}>
                  Za každou nepřátelskou kostku zničenou vytlačením z mapy, obklíčením nebo kolapsem věže.
                </p>
              </div>
            </DonjonCard>

            <DonjonCard
              title="Držení ohniska"
              description="Na začátku tahu — za každé aktivní ohnisko"
              variant="default"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <DonjonBadge variant="warning" icon={<FireIcon width={12} height={12} />}>+1 VP</DonjonBadge>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: goldMid, lineHeight: 1.5 }}>
                    Za každé aktivní ohnisko, na kterém drží kostka/věž hráče na začátku jeho tahu.
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: textFaint, lineHeight: 1.5 }}>
                  Po vyhodnocení se kostka na ohnisku přehodí: nová hodnota = min(hod, původní − 1).
                  Ohnisko se přepne na jiné ze skupiny.
                </p>
              </div>
            </DonjonCard>
          </div>
        </Preview>
        <CodeBlock code={`{/* Zničení kostky */}
<DonjonCard title="Zničení kostky" variant="danger">
  <DonjonBadge variant="danger" icon={<SkullIcon />}>+1 VP</DonjonBadge>
</DonjonCard>

{/* Držení ohniska */}
<DonjonCard title="Držení ohniska">
  <DonjonBadge variant="warning" icon={<FireIcon />}>+1 VP</DonjonBadge>
</DonjonCard>`} />
      </Section>

      {/* Permanence */}
      <Section
        title="Permanentní body"
        description="VP jsou trvalé — nelze je ztratit ani o ně přijít jiným způsobem."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <DonjonBadge variant="success">Body jsou permanentní</DonjonBadge>
            <DonjonBadge variant="danger">Nelze ztratit VP</DonjonBadge>
            <DonjonBadge variant="default">Vítěz = první na cílovém počtu</DonjonBadge>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '0.8125rem', color: textFaint, lineHeight: 1.6 }}>
            Jakmile jsou body připsány, zůstávají. Neexistuje mechanismus odebrání VP — ani porážka na bojišti neubírá body.
            Hra skončí okamžitě, jakmile hráč dosáhne cílového počtu VP.
          </p>
        </Preview>
      </Section>

      {/* useOptimistic demo — React 19 */}
      <Section
        id="optimistic"
        title="useOptimistic — okamžitá odezva"
        description="React 19: useOptimistic + useTransition. Skóre se aktualizuje okamžitě před potvrzením serveru."
      >
        <Preview>
          <OptimisticVPDemo />
        </Preview>
        <CodeBlock code={`import { useState, useOptimistic, useTransition } from 'react'

const [scores, setScores] = useState({ player1: 3, player2: 1 })
const [isPending, startTransition] = useTransition()

const [optimisticScores, addOptimisticVP] = useOptimistic(
  scores,
  (current, { id }) => ({ ...current, [id]: current[id] + 1 }),
)

const handleAddVP = (id) => {
  addOptimisticVP({ id })          // okamžitá optimistická aktualizace
  startTransition(async () => {
    await serverAddVP(id)           // čeká na server
    setScores(prev => ({ ...prev, [id]: prev[id] + 1 }))
  })
}`} />
      </Section>

      {/* Default map note */}
      <Section
        title="Default mapa — cíl 5 VP"
        description="Výchozí mapa pro 2 hráče. Cíl 5 VP."
      >
        <Preview>
          <DonjonCard title="Default mapa" description="61 hexů · 2 hráči · 5 kostek každý">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <DonjonBadge variant="warning">{DEFAULT_MAP_VP} VP</DonjonBadge>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: goldMid, lineHeight: 1.5 }}>
                  Cílový počet vítězných bodů pro výchozí mapu je {DEFAULT_MAP_VP}.
                </p>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: textFaint, lineHeight: 1.5 }}>
                3 ohniska v jedné skupině — střední je aktivní, levé a pravé jsou pasivní.
                Ohniska jsou ve středové řadě hexů.
              </p>
            </div>
          </DonjonCard>
        </Preview>
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Zobrazuj VP score prominentně v HUDu — hráč musí vždy vidět aktuální stav bez scrollování.</p>
          <p>✓ Animuj přírůstek VP (NumericDisplay s delta badge) — vizuální zpětná vazba potvrzuje herní akci.</p>
          <p>✓ Cílový počet VP zobrazuj vedle aktuálního skóre — hráč musí vidět, kolik mu zbývá.</p>
          <p>✓ Při dosažení cíle okamžitě spusť win state — neodkládej výsledek na konec tahu.</p>
          <p>✗ Nepoužívej VP badge bez kontextu — vždy doplň co VP způsobilo (ohnisko, zničení).</p>
          <p>✗ Nezobrazuj záporné VP — minimum je 0, ne -N.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
