import HexTile from '../components/game-assets/HexTile'
import DieFace from '../components/game-assets/DieFace'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import DeviceFrame, { FRAME } from '../components/layout/DeviceFrame'
import { players } from '../data/gameUiMockData'

const p1 = players[0] // červený
const p2 = players[1] // modrý

/* ── Sdílená demo data ── */
const DEMO_TURN  = 3
const DEMO_PHASE = 'Akce'
const DEMO_VP    = [3, 2]

/* ── 3×3 hex mapa — statická scéna ──
   [0] prázdný  [1] p1/4    [2] prázdný
   [3] p2/3     [4] ohnisko [5] p1/2
   [6] prázdný  [7] p2/5    [8] prázdný   */
const HEXES = [
  { state: 'empty' },
  { state: 'base',         owner: p1.color, die: { v: 4, c: p1.color } },
  { state: 'empty' },
  { state: 'base',         owner: p2.color, die: { v: 3, c: p2.color } },
  { state: 'focal-active' },
  { state: 'base',         owner: p1.color, die: { v: 2, c: p1.color } },
  { state: 'empty' },
  { state: 'base',         owner: p2.color, die: { v: 5, c: p2.color } },
  { state: 'empty' },
]

/* ── 3×3 hex grid ──
   Pointy-top hexes, liché řady posunuty doprava o půl kroku.
   dieTop = vzdálenost top od vrcholu hexu kde má být střed xs die (24px → top=12). */
function HexGrid({ cellW = 42, cellH = 48, gap = 4 }) {
  const dieTop = Math.round(cellH / 2) - 12  // střed hexu - polovina xs die
  const rowH   = Math.round(cellH * 0.75) + gap
  const colW   = cellW + gap
  const halfOff = Math.round(colW / 2)

  const totalW = 3 * colW + halfOff - gap
  const totalH = 2 * rowH + cellH
  const rows   = [[0,1,2],[3,4,5],[6,7,8]]

  return (
    <div style={{ position: 'relative', width: totalW, height: totalH, flexShrink: 0 }}>
      {rows.map((row, ri) =>
        row.map((hi, ci) => {
          const x = ci * colW + (ri % 2 === 1 ? halfOff : 0)
          const y = ri * rowH
          const h = HEXES[hi]
          return (
            <div key={hi} style={{ position: 'absolute', left: x, top: y }}>
              <div style={{ position: 'relative', width: cellW, height: cellH, overflow: 'visible' }}>
                <HexTile state={h.state} owner={h.owner} size="sm" />
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

/* FRAME + DeviceFrame importovány ze sdíleného ../components/layout/DeviceFrame */

/* ── Sdílené mini-UI komponenty ── */

function MiniHUD({ size = 'md' }) {
  const cfg = {
    md:  { h: 34, fs: '0.5625rem', fsSmall: '0.4375rem', dot: 8,  px: 12 },
    sm:  { h: 28, fs: '0.5rem',    fsSmall: '0.4375rem', dot: 6,  px: 10 },
    xs:  { h: 24, fs: '0.4375rem', fsSmall: '0.375rem',  dot: 5,  px: 8  },
  }
  const c = cfg[size] ?? cfg.md

  return (
    <div style={{
      height: c.h, background: '#1B1A30',
      borderBottom: '1px solid #2A2948',
      display: 'flex', alignItems: 'center',
      gap: 7, padding: `0 ${c.px}px`, flexShrink: 0,
    }}>
      <div style={{ width: c.dot, height: c.dot, borderRadius: '50%', background: p1.color, flexShrink: 0 }} />
      <span style={{ fontSize: c.fs, color: '#D4C5A9', fontWeight: 700, letterSpacing: '0.06em' }}>
        HRÁČ 1
      </span>
      {size !== 'xs' && (
        <span style={{ fontSize: c.fsSmall, color: '#4A4560', letterSpacing: '0.05em' }}>
          TAH {DEMO_TURN}
        </span>
      )}
      <div style={{ marginLeft: 'auto' }}>
        <span style={{
          fontSize: c.fsSmall,
          background: '#252342', borderRadius: 2,
          padding: size === 'xs' ? '1px 4px' : '2px 6px',
          color: '#FFC183', fontWeight: 700, letterSpacing: '0.05em',
        }}>
          {DEMO_PHASE.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

function MiniActionBtn({ label, active = false, danger = false, small = false }) {
  return (
    <div style={{
      background: active ? '#2A2948' : '#1B1A30',
      border: `1px solid ${danger ? '#5A2020' : active ? '#5A5878' : '#252342'}`,
      borderRadius: 3,
      padding: small ? '3px 7px' : '5px 10px',
      fontSize: small ? '0.4375rem' : '0.5rem',
      color: danger ? '#803030' : active ? '#D4C5A9' : '#4A4560',
      fontWeight: 600, letterSpacing: '0.05em',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {label}
    </div>
  )
}

function MiniScore({ direction = 'row', size = 'md' }) {
  const fs  = size === 'sm' ? '0.4375rem' : '0.5rem'
  const fvp = size === 'sm' ? '0.5rem'    : '0.5625rem'
  const dot = size === 'sm' ? 5 : 6

  const row = (color, label, vp) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 80 }}>
      <div style={{ width: dot, height: dot, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: fs, color: '#8F7458', fontWeight: 600 }}>{label}</span>
      <span style={{ marginLeft: 'auto', fontSize: fvp, color: '#FFC183', fontWeight: 700 }}>
        {vp} VP
      </span>
    </div>
  )

  return (
    <div style={{
      display: 'flex',
      flexDirection: direction === 'column' ? 'column' : 'row',
      gap: direction === 'column' ? 6 : 16,
      alignItems: direction === 'column' ? 'stretch' : 'center',
    }}>
      {row(p1.color, 'Hráč 1', DEMO_VP[0])}
      {row(p2.color, 'Hráč 2', DEMO_VP[1])}
    </div>
  )
}

/* ── PC layout ── */
function PCLayout() {
  return (
    <>
      <MiniHUD size="md" />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Levý sidebar — akce */}
        <div style={{
          width: 155, borderRight: '1px solid #2A2948',
          background: '#14132A', padding: '10px',
          display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0,
        }}>
          <p style={{ margin: '0 0 3px', fontSize: '0.4375rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Akce
          </p>
          <MiniActionBtn label="Pohyb kostky" active />
          <MiniActionBtn label="Pohyb věže" />
          <MiniActionBtn label="Kolaps věže" danger />
          <MiniActionBtn label="Přehazování" />

          <div style={{ marginTop: 'auto', borderTop: '1px solid #2A2948', paddingTop: 8 }}>
            <p style={{ margin: '0 0 6px', fontSize: '0.4375rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Ohnisko
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <HexTile state="focal-active" size="sm" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: '0.4375rem', color: '#FFC183', fontWeight: 700 }}>Aktivní</span>
                <span style={{ fontSize: '0.375rem', color: '#6A6040' }}>+1 VP / tah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Střed — hex mapa */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#0F0E1E', gap: 10,
        }}>
          <p style={{ margin: 0, fontSize: '0.4375rem', color: '#2A2948', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Herní mapa
          </p>
          <HexGrid />
        </div>

        {/* Pravý panel — skóre */}
        <div style={{
          width: 130, borderLeft: '1px solid #2A2948',
          background: '#14132A', padding: '10px',
          display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0,
        }}>
          <div>
            <p style={{ margin: '0 0 6px', fontSize: '0.4375rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Skóre
            </p>
            <MiniScore direction="column" />
          </div>

          <div style={{ borderTop: '1px solid #2A2948', paddingTop: 8 }}>
            <p style={{ margin: '0 0 4px', fontSize: '0.4375rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Cíl hry
            </p>
            <span style={{ fontSize: '0.5625rem', color: '#D4C5A9', fontWeight: 700 }}>5 VP</span>
          </div>

          <div style={{ borderTop: '1px solid #2A2948', paddingTop: 8, marginTop: 'auto' }}>
            <p style={{ margin: '0 0 4px', fontSize: '0.4375rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Číslo tahu
            </p>
            <span style={{ fontSize: '0.5rem', color: '#8F7458' }}>{DEMO_TURN}</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Tablet layout ── */
function TabletLayout() {
  return (
    <>
      <MiniHUD size="sm" />

      {/* Mapa — vycentrovaná */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0F0E1E',
      }}>
        <HexGrid />
      </div>

      {/* Skóre */}
      <div style={{
        borderTop: '1px solid #2A2948', background: '#14132A',
        padding: '7px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <MiniScore />
      </div>

      {/* Akce — plná řada tlačítek */}
      <div style={{
        borderTop: '1px solid #2A2948', background: '#161525',
        padding: '8px 12px',
        display: 'flex', gap: 6, flexShrink: 0,
        justifyContent: 'center', flexWrap: 'wrap',
      }}>
        <MiniActionBtn label="Pohyb kostky" active small />
        <MiniActionBtn label="Pohyb věže" small />
        <MiniActionBtn label="Kolaps věže" danger small />
        <MiniActionBtn label="Přehazování" small />
      </div>
    </>
  )
}

/* ── Mobile layout ── */
const MOBILE_ACTIONS = [
  { label: 'Pohyb\nkostky', active: true,  danger: false },
  { label: 'Pohyb\nvěže',   active: false, danger: false },
  { label: 'Kolaps\nvěže',  active: false, danger: true  },
  { label: 'Přehaz.',       active: false, danger: false },
]

function MobileLayout() {
  return (
    <>
      <MiniHUD size="xs" />

      {/* Mapa — mírně zmenšena */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0F0E1E', overflow: 'hidden',
      }}>
        <div style={{ transform: 'scale(0.82)', transformOrigin: 'center' }}>
          <HexGrid />
        </div>
      </div>

      {/* Skóre kompaktní */}
      <div style={{
        borderTop: '1px solid #2A2948', background: '#14132A',
        padding: '4px 10px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        {[0, 1].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: players[i].color }} />
            <span style={{ fontSize: '0.375rem', color: '#8F7458', fontWeight: 600 }}>H{i+1}</span>
            <span style={{ fontSize: '0.4375rem', color: '#FFC183', fontWeight: 700 }}>{DEMO_VP[i]} VP</span>
          </div>
        ))}
      </div>

      {/* 4 akční čtverce */}
      <div style={{
        borderTop: '1px solid #2A2948', background: '#161525',
        padding: '6px 8px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 5, flexShrink: 0,
      }}>
        {MOBILE_ACTIONS.map((a, i) => (
          <div key={i} style={{
            background: a.active ? '#2A2948' : '#1B1A30',
            border: `1px solid ${a.danger ? '#5A2020' : a.active ? '#5A5878' : '#252342'}`,
            borderRadius: 4, padding: '5px 4px', minHeight: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.375rem',
            color: a.danger ? '#803030' : a.active ? '#D4C5A9' : '#4A4560',
            fontWeight: 600, letterSpacing: '0.03em',
            textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre-line',
          }}>
            {a.label}
          </div>
        ))}
      </div>
    </>
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
              margin: 0, fontSize: '0.5625rem', color: '#8F7458',
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
      title="Obrazovky"
      description="Ukázka herního rozložení na třech zařízeních — PC, tablet a mobil. Každý breakpoint přizpůsobuje rozmístění herních prvků. Obsah je statický — jde o prioritizaci a rozmístění, ne o živou herní logiku."
    >
      <Section
        id="desktop"
        title="PC — 1280px+"
        description="Třísloupové rozložení: levý sidebar s výběrem akce a stavem ohniska, středová hex mapa, pravý panel se skóre a číslem tahu."
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
        description="Jednosloupcové rozložení: HUD nahoře, mapa uprostřed, skóre a akce ve spodní části. Sidebar odpadá — akce přesunuty pod mapu jako plný řádek tlačítek."
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
        description="Kompaktní jednosloupcové rozložení: miniaturní HUD, zmenšená mapa, čtyři ikonové akční čtverce, skóre v jednom řádku."
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
              <DonjonBadge variant="default">PC — sidebar + 3 sloupce</DonjonBadge>
              <DonjonBadge variant="default">Tablet — mapa nahoře, akce dole</DonjonBadge>
              <DonjonBadge variant="default">Mobil — ikony akcí, kompaktní HUD</DonjonBadge>
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
