import { ShowcasePage, Section } from '../components/layout/ShowcasePage'
import HexTile from '../components/game-assets/HexTile'
import ButtonGroup from '../components/ButtonGroup'
import { players } from '../data/gameUiMockData'

// ─── Action icons ─────────────────────────────────────────────────────────────

function MoveDieIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path fillRule="evenodd" d="M8 1a.75.75 0 0 1 .53.22l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 3.56V14.25a.75.75 0 0 1-1.5 0V3.56L4.03 6.78a.75.75 0 0 1-1.06-1.06l4.5-4.5A.75.75 0 0 1 8 1Z" />
    </svg>
  )
}

function MoveTowerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path d="M2 11.5A1.5 1.5 0 0 1 3.5 10h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 2 11.5ZM4 7.5A1.5 1.5 0 0 1 5.5 6h5A1.5 1.5 0 0 1 12 7.5v.5H4v-.5ZM6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5V4H6v-.5Z" />
    </svg>
  )
}

function CollapseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .75.75v8.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V2.5A.75.75 0 0 1 8 1.75Z" />
    </svg>
  )
}

function RerollIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.75.75 0 0 1 1.36-.636A6.5 6.5 0 1 1 8 1.5v-.75a.75.75 0 0 1 1.28-.53l2 2a.75.75 0 0 1 0 1.06l-2 2A.75.75 0 0 1 8 4.75V3Z" />
    </svg>
  )
}

// ─── Demo data ────────────────────────────────────────────────────────────────

const P1 = players[0] // red
const P2 = players[1] // blue

const demoTurn = { player: P1, turnNumber: 3, phase: 'Akce' }

const actionItems = [
  { value: 'move-die',   label: '', icon: <MoveDieIcon /> },
  { value: 'move-tower', label: '', icon: <MoveTowerIcon /> },
  { value: 'collapse',   label: '', icon: <CollapseIcon /> },
  { value: 'reroll',     label: '', icon: <RerollIcon /> },
]

const demoScore = [
  { player: P1, vp: 3 },
  { player: P2, vp: 2 },
]

// ─── Pomocné rozměry ──────────────────────────────────────────────────────────

const hexDims = {
  sm: { w: 42, h: 48 },
  md: { w: 62, h: 72 },
  lg: { w: 83, h: 96 },
}

// ─── Full map (61 hexů, 6-7-8-9-8-7-6) ───────────────────────────────────────

const FULL_ROW_SIZES = [5, 6, 7, 8, 9, 8, 7, 6, 5]  // 9 řad, 61 hexů
const FULL_MAP_MAX_COLS = 9
const FULL_HEX_W = 42
const FULL_HEX_H = 48
const FULL_HEX_OFFSET_X = 42       // = HEX_W
const FULL_HEX_OFFSET_Y = 36       // = HEX_H * 0.75
// přirozené rozměry (bez scale)
const FULL_MAP_W = (FULL_MAP_MAX_COLS - 1) * FULL_HEX_OFFSET_X + FULL_HEX_W        // 378
const FULL_MAP_H = FULL_ROW_SIZES.length * FULL_HEX_OFFSET_Y + (FULL_HEX_H - FULL_HEX_OFFSET_Y) // 336

function getFullHexState(row, col) {
  if (row === 0) return { state: 'base',         owner: P1.color }
  if (row === 8) return { state: 'base',         owner: P2.color }
  if (row === 4 && col === 4) return { state: 'focal-active',  owner: null }
  if (row === 4 && col === 1) return { state: 'focal-passive', owner: null }
  if (row === 4 && col === 7) return { state: 'focal-passive', owner: null }
  return { state: 'empty', owner: null }
}

function FullMap({ scale = 1 }) {
  return (
    <div style={{
      width:     FULL_MAP_W * scale,
      height:    FULL_MAP_H * scale,
      flexShrink: 0,
      overflow:  'visible',
    }}>
      <div style={{
        position:        'relative',
        width:           FULL_MAP_W,
        height:          FULL_MAP_H,
        transform:       `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        {FULL_ROW_SIZES.map((cols, row) => {
          const offsetX = (FULL_MAP_MAX_COLS - cols) / 2 * FULL_HEX_OFFSET_X
          const y = row * FULL_HEX_OFFSET_Y
          return Array.from({ length: cols }, (_, col) => {
            const { state, owner } = getFullHexState(row, col)
            return (
              <div
                key={`${row}-${col}`}
                style={{ position: 'absolute', left: offsetX + col * FULL_HEX_OFFSET_X, top: y }}
              >
                <HexTile state={state} owner={owner} size="sm" />
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}

// ─── Shields ──────────────────────────────────────────────────────────────────

const SHIELD_CLIP = 'polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%)'
const shieldSymbols = ['I', 'II', 'III', 'IV', 'V', 'VI']

const shieldSizeMap = {
  xs: { w: 24, h: 28 },
  sm: { w: 40, h: 47 },
  md: { w: 64, h: 75 },
}

function Shield({ player, size = 'sm' }) {
  const s = shieldSizeMap[size]
  return (
    <div style={{ display: 'inline-block', filter: `drop-shadow(0 0 8px ${player.color}66)` }}>
      <div style={{ width: s.w, height: s.h, clipPath: SHIELD_CLIP, background: player.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: s.w - 3, height: s.h - 3, clipPath: SHIELD_CLIP, background: player.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: player.color, fontWeight: 900, fontSize: s.w * 0.28, letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none', textShadow: `0 0 8px ${player.color}88` }}>
            {shieldSymbols[player.id - 1]}
          </span>
        </div>
      </div>
    </div>
  )
}

function MiniShield({ color, size = 18 }) {
  const h = Math.round(size * 1.17)
  return (
    <div style={{
      width: size, height: h,
      clipPath: SHIELD_CLIP,
      background: color,
      flexShrink: 0,
      filter: `drop-shadow(0 0 4px ${color}66)`,
    }} />
  )
}

// ─── Map info panel (top-left) ────────────────────────────────────────────────

function ValueOnHex({ value, playerColor, hexSize = 'sm', hexState = 'selected' }) {
  const { w, h } = hexDims[hexSize]
  const fontSize = hexSize === 'sm' ? '1rem' : hexSize === 'md' ? '1.4rem' : '1rem'
  return (
    <div style={{ position: 'relative', width: w, height: h, flexShrink: 0 }}>
      <HexTile state={hexState} size={hexSize} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <span style={{
          fontSize,
          fontWeight: 900,
          lineHeight: 1,
          color: playerColor,
          textShadow: `0 0 8px ${playerColor}88`,
          letterSpacing: '-0.02em',
          userSelect: 'none',
        }}>{value}</span>
      </div>
    </div>
  )
}

function MapInfoPanel({ hexSize = 'sm', combat = true }) {
  const gap = hexSize === 'sm' ? 4 : 6
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap, alignItems: 'flex-start' }}>
      {/* Vlastní hodnota vybraného pole (včetně bonusů) */}
      <ValueOnHex value={7} playerColor={P1.color} hexSize={hexSize} hexState="selected" />
      {/* Nepřátelská hodnota — viditelná jen při souboji */}
      {combat && (
        <ValueOnHex value={5} playerColor={P2.color} hexSize={hexSize} hexState="attack" />
      )}
    </div>
  )
}

function PlayerScorePanel({ compact = false }) {
  const fontSize = compact ? '0.6rem' : '0.7rem'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14 }}>
      {demoScore.map(({ player, vp }) => {
        const isActive = player.id === P1.id
        return (
          <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: compact ? 3 : 5 }}>
            {isActive
              ? <Shield player={player} size={compact ? 'xs' : 'sm'} />
              : <MiniShield color={player.color} size={compact ? 13 : 17} />
            }
            <span style={{
              fontSize: isActive ? (compact ? '0.75rem' : '0.9rem') : fontSize,
              fontWeight: 700,
              color: player.color,
              lineHeight: 1,
              textShadow: isActive ? `0 0 6px ${player.color}66` : undefined,
            }}>{vp}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Top bar ─────────────────────────────────────────────────────────────────

function HexLogoIcon({ size = 18 }) {
  const h = Math.round(size * 1.155)
  return (
    <svg viewBox="0 0 20 23" fill="none" width={size} height={h}>
      <path d="M10 1.5L18.5 6.25V15.75L10 20.5L1.5 15.75V6.25Z"
        stroke="#8F7458" strokeWidth="1.2" fill="none" />
      <path d="M10 5.5L15 8.4V14.2L10 17.1L5 14.2V8.4Z"
        fill="#FFC18318" stroke="#FFC18355" strokeWidth="0.8" />
    </svg>
  )
}

function TopBarScores({ compact = false }) {
  const activeSize  = compact ? 14 : 20
  const inactiveSize = compact ? 10 : 14
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 7 : 12 }}>
      {demoScore.map(({ player, vp }) => {
        const isActive = player.id === P1.id
        const sz = isActive ? activeSize : inactiveSize
        return (
          <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: compact ? 3 : 4 }}>
            <MiniShield color={player.color} size={sz} />
            <span style={{
              fontSize: isActive ? (compact ? '0.6rem' : '0.72rem') : (compact ? '0.48rem' : '0.58rem'),
              fontWeight: isActive ? 700 : 600,
              color: isActive ? player.color : player.color + 'AA',
              lineHeight: 1,
              textShadow: isActive ? `0 0 6px ${player.color}55` : undefined,
            }}>{vp}</span>
          </div>
        )
      })}
    </div>
  )
}

function Divider({ h = 14 }) {
  return <div style={{ width: 1, height: h, background: '#2A2840', flexShrink: 0 }} />
}

function HamburgerIcon({ size = 16 }) {
  const gap = size * 0.28
  const w = size
  const h = size * 0.7
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" width={w} height={h}>
      <rect x="0" y="0"             width={w} height={1.5} rx="0.75" fill="#6A5C44" />
      <rect x="0" y={h/2 - 0.75}   width={w} height={1.5} rx="0.75" fill="#6A5C44" />
      <rect x="0" y={h - 1.5}      width={w} height={1.5} rx="0.75" fill="#6A5C44" />
    </svg>
  )
}

function TurnHUD({ compact = false }) {
  const { turnNumber } = demoTurn
  const barH = compact ? 30 : 38
  const px   = compact ? 10 : 16

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: barH,
      padding: `0 ${px}px`,
      background: '#11101C',
      borderBottom: '1px solid #252340',
      flexShrink: 0,
      gap: 8,
    }}>

      {/* ── Logo (levá strana) ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 7 }}>
        <HexLogoIcon size={compact ? 13 : 17} />
        <span style={{
          fontSize: compact ? '0.48rem' : '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#6A5C44',
        }}>Donjon&nbsp;Fall</span>
      </div>

      {/* ── Menu (pravá strana) ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 7 : 12 }}>
        <span style={{
          fontSize: compact ? '0.44rem' : '0.54rem',
          color: '#3A3858',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>Tah&nbsp;{turnNumber}</span>
        <Divider h={compact ? 12 : 16} />
        <HamburgerIcon size={compact ? 13 : 17} />
      </div>

    </div>
  )
}

// ─── Device frame ─────────────────────────────────────────────────────────────

const frameConfig = {
  desktop: { w: 900, h: 520, rx: 8,  chromeH: 28 },
  tablet:  { w: 460, h: 640, rx: 20, chromeH: 38 },
  mobile:  { w: 240, h: 480, rx: 28, chromeH: 34 },
}

function DeviceFrame({ type, children }) {
  const cfg = frameConfig[type]
  return (
    <div style={{
      width: cfg.w,
      height: cfg.h,
      borderRadius: cfg.rx,
      border: '2px solid #3A3858',
      background: '#0D0C1A',
      boxShadow: '0 8px 40px #00000088, 0 2px 8px #0D0C1A',
      overflow: 'hidden',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Chrome bar */}
      <div style={{
        height: cfg.chromeH,
        background: '#13121E',
        borderBottom: '1px solid #2A2840',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 6,
        flexShrink: 0,
      }}>
        {type === 'desktop' && (
          <>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A3858' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A3858' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A3858' }} />
            <div style={{ flex: 1, height: 14, background: '#1B1A30', borderRadius: 3, margin: '0 8px' }} />
          </>
        )}
        {type === 'tablet' && (
          <div style={{ margin: '0 auto', width: 24, height: 4, background: '#2A2840', borderRadius: 2 }} />
        )}
        {type === 'mobile' && (
          <div style={{ margin: '0 auto', width: 40, height: 4, background: '#2A2840', borderRadius: 2 }} />
        )}
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

// ─── Layout: Desktop ──────────────────────────────────────────────────────────

function DesktopLayout() {
  return (
    <DeviceFrame type="desktop">
      <TurnHUD />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Main — hex map + bottom action bar */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#0D0C1A',
          overflow: 'hidden',
        }}>
          {/* Hex map */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <FullMap scale={1.0} />
            <div style={{ position: 'absolute', top: 10, left: 12 }}>
              <MapInfoPanel hexSize="sm" combat />
            </div>
            <div style={{ position: 'absolute', top: 10, right: 12 }}>
              <PlayerScorePanel compact={false} />
            </div>
          </div>

          {/* Bottom action bar */}
          <div style={{
            flexShrink: 0,
            borderTop: '1px solid #2A2840',
            background: '#13121E',
            padding: '8px 16px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ButtonGroup variant="tabs" items={actionItems} value="move-die" onChange={() => {}} />
          </div>
        </div>

      </div>
    </DeviceFrame>
  )
}

// ─── Layout: Tablet ───────────────────────────────────────────────────────────

function TabletLayout() {
  return (
    <DeviceFrame type="tablet">
      <TurnHUD compact />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Hex map centered */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
          <FullMap scale={1.1} />
          <div style={{ position: 'absolute', top: 8, left: 10 }}>
            <MapInfoPanel hexSize="sm" combat />
          </div>
          <div style={{ position: 'absolute', top: 8, right: 10 }}>
            <PlayerScorePanel compact />
          </div>
        </div>

        {/* Bottom action bar */}
        <div style={{
          flexShrink: 0,
          borderTop: '1px solid #2A2840',
          background: '#13121E',
          padding: '6px 12px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ButtonGroup variant="tabs" size="sm" items={actionItems} value="move-die" onChange={() => {}} />
        </div>
      </div>
    </DeviceFrame>
  )
}

// ─── Layout: Mobile ───────────────────────────────────────────────────────────

function MobileLayout() {
  return (
    <DeviceFrame type="mobile">
      <TurnHUD compact />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Full hex map — scaled to fit */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
          <FullMap scale={0.6} />
          <div style={{ position: 'absolute', top: 4, left: 6 }}>
            <MapInfoPanel hexSize="sm" combat />
          </div>
          <div style={{ position: 'absolute', top: 4, right: 6 }}>
            <PlayerScorePanel compact />
          </div>
        </div>

        {/* Bottom action bar */}
        <div style={{
          flexShrink: 0,
          borderTop: '1px solid #2A2840',
          background: '#13121E',
          padding: '5px 8px 7px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ButtonGroup variant="tabs" size="xs" items={actionItems} value="move-die" onChange={() => {}} />
        </div>
      </div>
    </DeviceFrame>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScreensPage() {
  return (
    <ShowcasePage
      title="Obrazovky"
      description="Herní rozložení pro různá zařízení — PC, tablet a mobil."
    >
      <Section
        id="desktop"
        title="PC (1280px+)"
        description="Třísloupkové rozložení — sidebar s akcemi, centrální mapa, pravý panel se skóre a fázemi tahu."
      >
        <div style={{ overflowX: 'auto' }}>
          <DesktopLayout />
        </div>
      </Section>

      <Section
        id="tablet"
        title="Tablet (~768px)"
        description="Mapa nahoře, akce a skóre ve spodní části. Méně panelů, více prostoru pro mapu."
      >
        <div style={{ display: 'flex' }}>
          <TabletLayout />
        </div>
      </Section>

      <Section
        id="mobile"
        title="Mobil (~375px)"
        description="Kompaktní rozložení — zkrácená mapa, action tagy, minimální skóre."
      >
        <div style={{ display: 'flex' }}>
          <MobileLayout />
        </div>
      </Section>

      <Section
        id="srovnani"
        title="Srovnání zařízení"
        description="Všechna tři rozložení vedle sebe ve zmenšeném měřítku."
      >
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {[
              { label: 'PC', el: <DesktopLayout />, cfg: frameConfig.desktop },
              { label: 'Tablet', el: <TabletLayout />, cfg: frameConfig.tablet },
              { label: 'Mobil', el: <MobileLayout />, cfg: frameConfig.mobile },
            ].map(({ label, el, cfg }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={{ transform: 'scale(0.38)', transformOrigin: 'top center', width: cfg.w, height: cfg.h }}>
                  {el}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: -(cfg.h * (1 - 0.38)) }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </ShowcasePage>
  )
}
