import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { players as basePlayers } from '../data/gameUiMockData'

const TARGET_VP = 10
const DEFAULT_MAP_VP = 5

const vp = [7, 5, 4, 3, 2, 1]
const players = basePlayers.map((p, i) => ({ ...p, vp: vp[i] }))

function FireIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Z" />
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

function VPBar({ vp, color }) {
  const pct = Math.min(vp / TARGET_VP, 1)
  return (
    <div style={{
      height: 4,
      background: '#1B1A30',
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

export default function VictoryPointsPage() {
  return (
    <ShowcasePage
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
                    color: i === 0 ? '#FFC183' : '#4A4560',
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
                    color: '#8F7458',
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
                    color: '#F0E6D3',
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
        <CodeBlock code={`<DonjonCard title="Skóre — cíl 10 bodů" description="Seřazeno od vedoucího hráče">
  {players.map(player => (
    <div key={player.id}>
      <ColorChip color={player.color} />
      <span>{player.label}</span>
      <ProgressBar vp={player.vp} target={10} />
      <span>{player.vp} / 10</span>
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
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F9C0C0', lineHeight: 1.5 }}>
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
                  <DonjonBadge variant="warning" icon={<FireIcon />}>+1 VP</DonjonBadge>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#B8956A', lineHeight: 1.5 }}>
                    Za každé aktivní ohnisko, na kterém drží kostka/věž hráče na začátku jeho tahu.
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.5 }}>
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

      {/* Default map note */}
      <Section
        title="Default mapa — cíl 5 VP"
        description="Výchozí mapa pro 2 hráče. Showcase výše používá 10 VP jako obecný příklad."
      >
        <Preview>
          <DonjonCard title="Default mapa" description="61 hexů · 2 hráči · 5 kostek každý">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <DonjonBadge variant="warning">{DEFAULT_MAP_VP} VP</DonjonBadge>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#B8956A', lineHeight: 1.5 }}>
                  Cílový počet vítězných bodů pro výchozí mapu je {DEFAULT_MAP_VP}.
                </p>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4560', lineHeight: 1.5 }}>
                3 ohniska v jedné skupině — střední je aktivní, levé a pravé jsou pasivní.
                Ohniska jsou ve středové řadě hexů.
              </p>
            </div>
          </DonjonCard>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
