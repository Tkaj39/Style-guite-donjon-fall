import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import DieFace from '../components/game-assets/DieFace'
import HexTile from '../components/game-assets/HexTile'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import { players } from '../data/gameUiMockData'

function AnimSpec({ duration, easing, trigger, description, children }) {
  return (
    <DonjonCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <DonjonBadge variant="default">{duration}</DonjonBadge>
          <DonjonBadge variant="default">{easing}</DonjonBadge>
          <DonjonBadge variant="info">{trigger}</DonjonBadge>
        </div>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
          {description}
        </p>
        {children && (
          <div style={{ borderTop: '1px solid #2A2948', paddingTop: 12 }}>
            {children}
          </div>
        )}
      </div>
    </DonjonCard>
  )
}

function Arrow() {
  return <span style={{ color: '#4A4560', fontSize: '1.1rem', lineHeight: 1, flexShrink: 0 }}>→</span>
}

function FrameRow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {children}
    </div>
  )
}

const p1 = players[0]
const p2 = players[1]

export default function AnimacePage() {
  return (
    <ShowcasePage
      title="Animace"
      description="Specifikace herních animací — trigger, trvání, easing a popis efektu. Statické klíčové snímky (before → after)."
    >
      <Section
        id="pohyb-kostky"
        title="Pohyb kostky"
        description="Move die — kostka se přesune z jednoho hexu na druhý."
      >
        <Preview>
          <AnimSpec
            duration="280 ms"
            easing="ease-out"
            trigger="Výběr cílového hexu"
            description="Kostka se přesune po oblouku nad herní plochou z výchozího hexu na cílový. Pohyb naznačuje taktický záměr — ne přímá lineární trajektorie."
          >
            <FrameRow>
              <HexTile state="selected" size="sm" />
              <DieFace value={4} playerColor={p1.color} size="sm" />
              <Arrow />
              <HexTile state="move" size="sm" />
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </FrameRow>
          </AnimSpec>
        </Preview>
      </Section>

      <Section
        id="pohyb-veze"
        title="Pohyb věže"
        description="Move tower — celá věž (2+ kostek) se přesune jako celek."
      >
        <Preview>
          <AnimSpec
            duration="360 ms"
            easing="ease-in-out"
            trigger="Výběr cílového hexu pro věž"
            description="Věž se přesune jako celek — pomalejší než solo kostka. Vizuálně naznačuje váhu stohovaných kostek. Věž nemůže procházet jinými kostkami."
          >
            <FrameRow>
              <HexTile state="selected" size="sm" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={2} playerColor={p1.color} size="sm" />
              </div>
              <Arrow />
              <HexTile state="move" size="sm" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={2} playerColor={p1.color} size="sm" />
              </div>
            </FrameRow>
          </AnimSpec>
        </Preview>
      </Section>

      <Section
        id="souboj-push"
        title="Souboj — Push"
        description="Útočník vstoupí na nepřátelské pole, fáze 1 proběhne, nepřátelská formace je odtlačena."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="180 ms"
              easing="ease-in"
              trigger="Pohyb na nepřátelské pole (Fáze 1)"
              description="Útočná kostka blikne a sníží hodnotu o 1. Krátký shake efekt naznačuje impakt."
            >
              <FrameRow>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <Arrow />
                <DieFace value={4} playerColor={p1.color} size="sm" />
                <span style={{ fontSize: '0.75rem', color: '#E05C5C', fontWeight: 700 }}>−1</span>
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="320 ms"
              easing="ease-out"
              trigger="Výběr Push (Fáze 2)"
              description="Nepřátelská formace se posune o jeden hex ve směru útoku. Slide animace s mírným bounce na konci."
            >
              <FrameRow>
                <DieFace value={2} playerColor={p2.color} size="sm" />
                <span style={{ fontSize: '0.75rem', color: '#4A4560' }}>na hex</span>
                <Arrow />
                <HexTile state="empty" size="sm" />
                <span style={{ fontSize: '0.75rem', color: '#4A4560' }}>/ zničení</span>
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
      </Section>

      <Section
        id="souboj-occupy"
        title="Souboj — Occupy"
        description="Solo útočná kostka naskočí na vrchol nepřátelské kostky/věže."
      >
        <Preview>
          <AnimSpec
            duration="240 ms"
            easing="ease-in-out"
            trigger="Výběr Occupy (Fáze 2)"
            description="Útočná kostka se přesune na vrchol obráncovy pozice — plynulý drop efekt shora dolů. Vytvoří smíšenou věž."
          >
            <FrameRow>
              <DieFace value={4} playerColor={p1.color} size="sm" />
              <Arrow />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={4} playerColor={p1.color} size="sm" />
                <DieFace value={2} playerColor={p2.color} size="sm" />
              </div>
              <DonjonBadge variant="warning">Smíšená věž</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
      </Section>

      <Section
        id="prehazovani"
        title="Přehazování"
        description="Reroll — kostka se přehodí, hodnota může jen crescendo."
      >
        <Preview>
          <AnimSpec
            duration="400 ms"
            easing="ease-out"
            trigger="Akce Přehazování"
            description="Kostka rotuje kolem vlastní osy (3D flip efekt) a zobrazí novou hodnotu. Pokud hodnota zůstane stejná, krátký pulse naznačí neúspěšný hod."
          >
            <FrameRow>
              <DieFace value={3} playerColor={p1.color} size="sm" state="rerolled" />
              <Arrow />
              <DieFace value={5} playerColor={p1.color} size="sm" />
              <DonjonBadge variant="success">+2</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
      </Section>

      <Section
        id="kolaps-veze"
        title="Kolaps věže"
        description="Tower collapse — spodní kostka je odebrána ze hry."
      >
        <Preview>
          <AnimSpec
            duration="300 ms"
            easing="ease-in"
            trigger="Akce Kolaps věže"
            description="Spodní kostka fade-out a klesne dolů pod hrací plochu. Zbylé kostky se plynule posunou dolů a věž se vizuálně zkrátí."
          >
            <FrameRow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={3} playerColor={p1.color} size="sm" />
                <DieFace value={1} playerColor={p2.color} size="sm" state="damaged" />
              </div>
              <Arrow />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={3} playerColor={p1.color} size="sm" />
              </div>
              <DonjonBadge variant="danger">+1 VP</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
      </Section>

      <Section
        id="ohnisko"
        title="Ohnisko"
        description="Focal point — vizuální zpětná vazba při zisku VP z aktivního ohniska a přepnutí stavu."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="500 ms"
              easing="ease-out"
              trigger="Vyhodnocení ohniska — zisk VP"
              description="Aktivní ohnisko pulzuje zlatou záři, zobrazí +1 VP text a poté přejde do pasivního stavu. Jiné ohnisko ve skupině přejde z pasivního na aktivní."
            >
              <FrameRow>
                <HexTile state="focal-active" size="sm" />
                <DonjonBadge variant="warning">+1 VP</DonjonBadge>
                <Arrow />
                <HexTile state="focal-passive" size="sm" />
                <span style={{ color: '#4A4560', fontSize: '0.75rem' }}>+</span>
                <HexTile state="focal-active" size="sm" />
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
