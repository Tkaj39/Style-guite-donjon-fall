import HexTile from '../lib/donjon/HexTile'
import { textFaint, gold, goldDim, bgDeep } from '../lib/donjon/tokens'
import { octagon } from '../lib/shared/octagon'
import { RohOrnament, ornamentHForCx } from '../lib/donjon/Ornaments'
import DieFace from '../lib/donjon/DieFace'
import { Shield } from '../lib/donjon/Erb'
import ActionTile from '../lib/donjon/ActionTile'
import { MoveIcon, SwordIcon, ShieldIcon, TowerIcon, BombIcon, DiceIcon } from '../lib/donjon/icons'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../styleguide/ShowcasePage'
import DeviceFrame, { FRAME } from '../styleguide/DeviceFrame'
import { players } from '../data/gameUiMockData'

/* Per-player pictograms shown inside the Erb shield in the score header. */
const PLAYER_ICONS = [<SwordIcon />, <ShieldIcon />]
const p1 = players[0] // červený
const p2 = players[1] // modrý

/* ── Sdílená demo data ── */
const DEMO_TURN  = 3
const DEMO_PHASE = 'Akce'
const DEMO_VP    = [3, 2]

/* ── Herní plán — 9-řadý hexagonální cluster (5-6-7-8-9-8-7-6-5) ──
   Per pravidla: 5 startovních hexů hráče 1 (nahoře), 5 hráče 2 (dole),
   3 ohniska v prostřední (9-políčkové) řadě, zbytek prázdné hexy.
   Tvar: hexagonální cluster — řady se rozšiřují ke středu a zase
   zužují, takže centerování naturálně produkuje halfOff zarovnání
   sousedních řad (pointy-top tiling).                                  */
const _ = (state, opts = {}) => ({ state, ...opts })
const E = () => _('empty')
const F = () => _('focal-active')
const B1 = (v) => _('base', { owner: p1.color, die: { v, c: p1.color } })
const B2 = (v) => _('base', { owner: p2.color, die: { v, c: p2.color } })
/* Demo interaction states — colored tints over the grass so the player
   sees what's selected, where they can move, where they can attack. */
const SEL_F = () => ({ property: 'focal', focal: 'active', state: 'selected' })
const MV    = () => ({ property: 'empty', state: 'move' })
const AT    = () => ({ property: 'empty', state: 'attack' })

const BOARD_ROWS = [
  // Row 0 — startovní hexy hráče 1 (5×)
  [B1(5), B1(4), B1(3), B1(2), B1(1)],
  // Row 1 — 6 prázdných
  [E(), E(), E(), E(), E(), E()],
  // Row 2 — 7 prázdných
  [E(), E(), E(), E(), E(), E(), E()],
  // Row 3 — 8 polí (po stranách selected focal jsou move targets)
  [E(), E(), E(), MV(), MV(), E(), E(), E()],
  // Row 4 (střed) — 9 polí, prostřední ohnisko je VYBRANÉ, krajní attack
  [E(), F(), E(), MV(), SEL_F(), MV(), E(), F(), AT()],
  // Row 5 — 8 polí (move targets pod selected)
  [E(), E(), E(), MV(), MV(), E(), E(), E()],
  // Row 6 — 7 prázdných
  [E(), E(), E(), E(), E(), E(), E()],
  // Row 7 — 6 prázdných
  [E(), E(), E(), E(), E(), E()],
  // Row 8 — startovní hexy hráče 2 (5×)
  [B2(1), B2(2), B2(3), B2(4), B2(5)],
]

/* ── Hex grid renderer ──
   Pointy-top hexes, řady horizontálně centrované — protože každá řada
   má jinou šířku, centerování automaticky produkuje halfOff zarovnání
   sousedních řad. Žádná explicitní liché/sudé switch logika nepotřeba.
   dieTop = vzdálenost top od vrcholu hexu kde má být střed xs die. */
function HexGrid({ cellW = 42, cellH = 48, gap = 0, texture }) {
  const dieTop = Math.round(cellH / 2) - 12
  const rowH   = Math.round(cellH * 0.75) + gap
  const colW   = cellW + gap

  const maxCols = Math.max(...BOARD_ROWS.map(r => r.length))
  const totalW  = maxCols * colW - gap
  const totalH  = (BOARD_ROWS.length - 1) * rowH + cellH

  return (
    <div style={{ position: 'relative', width: totalW, height: totalH, flexShrink: 0 }}>
      {BOARD_ROWS.map((row, ri) =>
        row.map((h, ci) => {
          const baseX = (maxCols - row.length) * colW / 2
          const x = baseX + ci * colW
          const y = ri * rowH
          return (
            <div key={`${ri}-${ci}`} style={{ position: 'absolute', left: x, top: y }}>
              <div style={{ position: 'relative', width: cellW, height: cellH, overflow: 'visible' }}>
                <HexTile
                  property={h.property} focal={h.focal} state={h.state}
                  owner={h.owner} size="sm" texture={texture}
                />
                {h.die && (
                  <div style={{
                    position: 'absolute',
                    top: dieTop,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}>
                    <DieFace value={h.die.v} playerColor={h.die.c} size="xs" />
                  </div>
                )}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

/* FRAME + DeviceFrame importovány ze sdíleného ../styleguide/DeviceFrame */

/* ── Sdílené mini-UI komponenty ── */

/* ── Skóre header — HUD VP Counter pattern v compact chip podobě ──
   P1 chip (Erb shield + label + 5 progress barů + VP) | turn indikátor |
   P2 chip stejný layout zrcadlený. Aktivní hráč má gold-tint pozadí.       */
const DEMO_ACTIVE_PLAYER = 0  // 0 = P1, 1 = P2
const MAX_VP = 5

/* ── Grass texture per breakpoint ──────────────────────────────────────────
   Same tile, 3 resolutions. Smaller resolutions for mobile/tablet save
   bandwidth; PC gets the crisp 1024 version. */
const GRASS_TEXTURE = {
  desktop: '/textures/grass_tile_1024x1024.jpg',
  tablet:  '/textures/grass_tile_512x512.jpg',
  mobile:  '/textures/grass_tile_256x256.jpg',
}
function MiniScoreHeader({ size = 'md' }) {
  const cfg = {
    md:  { h: 44, fs: '0.5625rem', fsSmall: '0.4375rem', erb: 18, barW: 8, barH: 5, px: 14 },
    sm:  { h: 38, fs: '0.5rem',    fsSmall: '0.4375rem', erb: 16, barW: 6, barH: 4, px: 12 },
    xs:  { h: 32, fs: '0.4375rem', fsSmall: '0.375rem',  erb: 14, barW: 4, barH: 3, px: 8  },
  }
  const c = cfg[size] ?? cfg.md

  const ornH = ornamentHForCx(3, 'roh')
  const Chip = ({ player, vp, active, idx }) => (
    <div style={{ position: 'relative', flexShrink: 0 }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: `${Math.round(c.h * 0.18)}px ${c.px - 2}px`,
      clipPath: octagon(3),
      /* Semi-transparent dark backdrop — readable text on grass, texture
         still subtly visible. Active hráč: gold tint VRSTVENÝ nad solid
         dark bgDeep (ne přes trávu) → kontrast pro gold text zůstává. */
      background: active
        ? `linear-gradient(${gold}55, ${gold}55), ${bgDeep}`
        : `${bgDeep}cc`,
    }}>
      {/* Player marker — Erb shield with player's pictogram (no H1/H2 label) */}
      <Shield playerColor={player.color} size={c.erb} icon={PLAYER_ICONS[idx]} />
      {/* VP progress bary — chamfered pips (mirror HudPage VP Counter pattern) */}
      <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {Array.from({ length: MAX_VP }, (_, i) => (
          <div key={i} style={{
            width: c.barW, height: c.barH,
            clipPath: octagon(1),
            background: i < vp ? player.color : `${goldDim}33`,
            boxShadow: i < vp ? `0 0 3px ${player.color}66` : 'none',
          }} />
        ))}
      </div>
      {/* VP číslo */}
      <span style={{
        fontSize: c.fs,
        color: active ? gold : goldDim,
        fontWeight: 700, fontVariantNumeric: 'tabular-nums',
      }}>{vp}</span>
    </div>
      {/* 4 corner RohOrnament brackets — mirror HudPage VP Counter */}
      <RohOrnament h={ornH} uid={`chip-${idx}-tl`} />
      <RohOrnament h={ornH} uid={`chip-${idx}-tr`} flip />
      <RohOrnament h={ornH} uid={`chip-${idx}-bl`} bottom />
      <RohOrnament h={ornH} uid={`chip-${idx}-br`} flip bottom />
    </div>
  )

  return (
    <div style={{
      height: c.h,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: c.px,
      flexShrink: 0,
    }}>
      <Chip player={p1} vp={DEMO_VP[0]} active={DEMO_ACTIVE_PLAYER === 0} idx={0} />
      <div style={{
        textAlign: 'center', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 1,
        padding: `${Math.round(c.h * 0.12)}px ${c.px - 2}px`,
        clipPath: octagon(3), background: `${bgDeep}cc`,
      }}>
        <span style={{ fontSize: c.fsSmall, color: textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Tah {DEMO_TURN} · {DEMO_PHASE}
        </span>
        <span style={{ fontSize: c.fs, color: gold, fontWeight: 700, letterSpacing: '0.05em' }}>
          Hráč {DEMO_ACTIVE_PLAYER + 1} na tahu
        </span>
      </div>
      <Chip player={p2} vp={DEMO_VP[1]} active={DEMO_ACTIVE_PLAYER === 1} idx={1} />
    </div>
  )
}

/* ── Action Bar — sdílená data pro 3 layouty ──────────────────────────────
   Per uživatel: tlačítka jen s piktogramy, žádný titulek ani shortcut text.
   title prop drží aria-label, ale renderuje empty span — vizuálně jen ikona. */
const SCREEN_ACTIONS = [
  { label: 'Pohyb kostky', icon: <MoveIcon />,  variant: 'move' },
  { label: 'Pohyb věže',   icon: <TowerIcon />, variant: 'default' },
  { label: 'Kolaps věže',  icon: <BombIcon />,  variant: 'attack' },
  { label: 'Přehazování',  icon: <DiceIcon />,  variant: 'special' },
]

/* Wrapper kolem lib <ActionTile> — fixní size="sm" (80×72), per-viewport
   scale na celé řadě (PC 1.0, tablet 0.85, mobil 0.62 — aby 4 tile sedly
   do 230px frame šířky bez overflow). */
function MiniActionRow({ scale = 1 }) {
  return (
    <div style={{
      display: 'flex',
      gap: Math.max(4, Math.round(8 * scale)),
      transform: `scale(${scale})`,
      transformOrigin: 'center top',
    }}>
      {SCREEN_ACTIONS.map(a => (
        <div key={a.label} style={{ width: 48, flexShrink: 0 }} aria-label={a.label}>
          <ActionTile
            icon={a.icon}
            title=""
            variant={a.variant}
            selected={a.selected}
            size="xs"
            ornament="decorated"
          />
        </div>
      ))}
    </div>
  )
}

/* ── PC layout — Skóre nahoře | Mapa | Akce dole ── */
function PCLayout() {
  return (
    /* Grass bg na celém layout containeru → prosvítá pod transparent menus */
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      backgroundImage: `url(${GRASS_TEXTURE.desktop})`,
      backgroundSize: '256px 256px', backgroundRepeat: 'repeat',
    }}>
      <MiniScoreHeader size="md" />
      {/* Mapa — vycentrovaná v celé šířce */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <HexGrid texture={GRASS_TEXTURE.desktop} />
      </div>
      {/* Akce — lib ActionTile row, plná velikost (transparent menu, no padding) */}
      <div style={{
        flexShrink: 0, paddingBottom: 3,
        display: 'flex', justifyContent: 'center',
      }}>
        <MiniActionRow scale={1} />
      </div>
    </div>
  )
}

/* ── Tablet layout — Skóre nahoře | Mapa | Akce dole ── */
function TabletLayout() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      backgroundImage: `url(${GRASS_TEXTURE.tablet})`,
      backgroundSize: '256px 256px', backgroundRepeat: 'repeat',
    }}>
      <MiniScoreHeader size="sm" />
      {/* Mapa — vycentrovaná, scaled na šířku tablet framu */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
          <HexGrid texture={GRASS_TEXTURE.tablet} />
        </div>
      </div>
      {/* Akce — lib ActionTile row, mírně zmenšená (transparent menu, no padding) */}
      <div style={{
        flexShrink: 0, paddingBottom: 3,
        display: 'flex', justifyContent: 'center',
      }}>
        <MiniActionRow scale={0.9} />
      </div>
    </div>
  )
}

/* ── Mobile layout ── */
function MobileLayout() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      backgroundImage: `url(${GRASS_TEXTURE.mobile})`,
      backgroundSize: '256px 256px', backgroundRepeat: 'repeat',
    }}>
      <MiniScoreHeader size="xs" />
      {/* Mapa — mírně zmenšena */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'center' }}>
          <HexGrid texture={GRASS_TEXTURE.mobile} />
        </div>
      </div>
      {/* Akce — lib ActionTile row, scaled na 230px mobil frame (transparent menu, no padding) */}
      <div style={{
        flexShrink: 0, paddingBottom: 3,
        display: 'flex', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <MiniActionRow scale={0.75} />
      </div>
    </div>
  )
}

/* ── Srovnání — všechna tři zmenšena vedle sebe ── */
function ComparisonRow() {
  const items = [
    { type: 'desktop', scale: 0.38, Layout: PCLayout     },
    { type: 'tablet',  scale: 0.50, Layout: TabletLayout  },
    { type: 'mobile',  scale: 0.65, Layout: MobileLayout  },
  ]

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {items.map(({ type, scale, Layout }) => {
        const c = FRAME[type]
        const names = { desktop: 'PC', tablet: 'Tablet', mobile: 'Mobil' }
        return (
          <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{
              margin: 0, fontSize: '0.5625rem', color: goldDim,
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {names[type]}
            </p>
            {/* Wrapper drží místo pro zmenšený rám */}
            <div style={{
              width:  Math.round(c.w * scale),
              height: Math.round(c.h * scale),
              flexShrink: 0,
            }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <DeviceFrame type={type}>
                  <Layout />
                </DeviceFrame>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Page ── */

export default function ScreensPage() {
  return (
    <ShowcasePage
      library="donjon"
      title="Obrazovky"
      description="Ukázka herního rozložení na třech zařízeních — PC, tablet a mobil. Každý breakpoint přizpůsobuje rozmístění herních prvků. Obsah je statický — jde o prioritizaci a rozmístění, ne o živou herní logiku."
    >
      <Section
        id="desktop"
        title="PC — 1280px+"
        description="Skóre nahoře (hráč 1 vlevo, hráč na tahu uprostřed, hráč 2 vpravo), hexagonální herní plán uprostřed, akční tlačítka dole. Aktivní hráč zvýrazněn gold-tint chipem."
      >
        <Preview>
          <DeviceFrame type="desktop">
            <PCLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="tablet"
        title="Tablet — 768px"
        description="Stejné rozložení jako PC — kompaktnější skóre header nahoře, mapa vycentrovaná (scale 0.85 aby se vešla), akce dole."
      >
        <Preview>
          <DeviceFrame type="tablet">
            <TabletLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="mobile"
        title="Mobil — 375px"
        description="Maximálně kompaktní: miniaturní skóre header s diamond chipy, mapa zmenšená (scale 0.5), 4 akční čtverce v gridu dole."
      >
        <Preview>
          <DeviceFrame type="mobile">
            <MobileLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="srovnani"
        title="Srovnání"
        description="Všechna tři zařízení vedle sebe — vizuální srovnání jak se layout přizpůsobuje breakpointům."
      >
        <Preview>
          <ComparisonRow />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <DonjonBadge variant="default">PC — skóre nahoře, mapa, akce dole</DonjonBadge>
              <DonjonBadge variant="default">Tablet — kompaktnější verze stejného vzorce</DonjonBadge>
              <DonjonBadge variant="default">Mobil — diamond chipy, akční čtverce v gridu</DonjonBadge>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <DonjonBadge variant="info">Hráč 1 (červený) na tahu</DonjonBadge>
              <DonjonBadge variant="info">Tah 3 — fáze Akce</DonjonBadge>
              <DonjonBadge variant="warning">Skóre 3 : 2</DonjonBadge>
              <DonjonBadge variant="warning">1 aktivní ohnisko</DonjonBadge>
            </div>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
