/* ── TexturesPage ────────────────────────────────────────────────────
   Scratch / test stránka pro grass textury (public/grass-1.png,
   grass-2.png). Ukazuje obě v různých kontextech, abys viděl, jak se
   chovají jako herní povrch:
     • dlaždice (repeat) ve třech měřítkách
     • herní deska s hexy navrch
     • panel s donjon komponentami navrch (čitelnost přes overlay)
     • cover vs repeat
   ─────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import HexTile from '../lib/donjon/HexTile'
import DonjonCard from '../lib/donjon/DonjonCard'
import DonjonButton from '../lib/donjon/DonjonButton'
import DiceTower from '../lib/donjon/DiceTower'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { gold, goldDim, bg0, bg2, textHigh, textMid, textLow, borderDefault } from '../lib/donjon/tokens'
import { red, blue } from '../lib/donjon/playerColors'

const TEXTURES = [
  { id: 'grass-1',  src: '/grass-1.png',  label: 'grass-1 — realistická tráva' },
  { id: 'grass-12', src: '/grass-12.png', label: 'grass-12 — upravená grass-1' },
  { id: 'grass-2',  src: '/grass-2.png',  label: 'grass-2 — kreslená / leknínová' },
]

const TILE_SIZES = [64, 128, 256]

const H1 = { fontSize: '1.5rem', fontWeight: 700, color: gold, letterSpacing: '0.04em', marginBottom: 4 }
const H2 = { fontSize: '0.875rem', fontWeight: 700, color: gold, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }
const SUB = { fontSize: '0.8125rem', color: textMid, marginBottom: 18, lineHeight: 1.5 }

function Section({ title, desc, children }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <h2 style={H2}>{title}</h2>
      {desc && <p style={SUB}>{desc}</p>}
      {children}
    </section>
  )
}

export default function TexturesPage() {
  const [active, setActive] = useState('grass-1')
  const [tileSize, setTileSize] = useState(128)
  const [overlay, setOverlay] = useState(0.35)
  const tex = TEXTURES.find(t => t.id === active) ?? TEXTURES[0]

  return (
    <>
      <title>Textury · Style Guide</title>
      <div style={{ padding: '40px 32px', maxWidth: 920, margin: '0 auto' }}>
        <h1 style={H1}>Grass textury — test</h1>
        <p style={SUB}>
          Náhled nahraných textur z <code>public/</code> v různých herních kontextech.
          Přepni texturu, měřítko dlaždice a sílu ztmavení panelu.
        </p>

        {/* Ovládání */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center',
          padding: '14px 18px', background: bg2, border: `1px solid ${borderDefault}`,
          borderRadius: 6, marginBottom: 36,
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: '0.6875rem', color: textLow, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Textura</span>
            {TEXTURES.map(t => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  padding: '4px 12px', borderRadius: 4, cursor: 'pointer',
                  fontSize: '0.75rem', fontFamily: 'monospace',
                  border: `1px solid ${active === t.id ? gold : borderDefault}`,
                  background: active === t.id ? `${gold}20` : 'transparent',
                  color: active === t.id ? gold : textMid,
                }}
              >
                {t.id}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: '0.6875rem', color: textLow, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dlaždice</span>
            {TILE_SIZES.map(s => (
              <button
                key={s}
                onClick={() => setTileSize(s)}
                style={{
                  padding: '4px 10px', borderRadius: 4, cursor: 'pointer',
                  fontSize: '0.75rem', fontFamily: 'monospace',
                  border: `1px solid ${tileSize === s ? gold : borderDefault}`,
                  background: tileSize === s ? `${gold}20` : 'transparent',
                  color: tileSize === s ? gold : textMid,
                }}
              >
                {s}px
              </button>
            ))}
          </div>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.75rem', color: textMid }}>
            <span style={{ fontSize: '0.6875rem', color: textLow, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ztmavení panelu</span>
            <input
              type="range" min={0} max={0.8} step={0.05} value={overlay}
              onChange={e => setOverlay(Number(e.target.value))}
              style={{ accentColor: gold }}
            />
            <span style={{ fontVariantNumeric: 'tabular-nums', width: 32 }}>{Math.round(overlay * 100)}%</span>
          </label>
        </div>

        {/* ── 1. Dlaždice ── */}
        <Section title="Dlaždice (repeat)" desc={`${tex.label} — opakovaná dlaždice ${tileSize}px. Sleduj, jestli jsou vidět švy.`}>
          <div style={{
            height: 240,
            borderRadius: 6,
            border: `1px solid ${borderDefault}`,
            backgroundImage: `url(${tex.src})`,
            backgroundSize: `${tileSize}px ${tileSize}px`,
            backgroundRepeat: 'repeat',
          }} />
        </Section>

        {/* ── 2. Herní deska s hexy ── */}
        <Section title="Herní deska — hexy na textuře" desc="Tráva jako board surface, HexTile a věž z kostek navrch.">
          <div style={{
            position: 'relative',
            padding: 28,
            borderRadius: 6,
            border: `1px solid ${goldDim}`,
            backgroundImage: `url(${tex.src})`,
            backgroundSize: `${tileSize}px ${tileSize}px`,
            backgroundRepeat: 'repeat',
            overflow: 'hidden',
          }}>
            {/* jemný vignette aby hexy víc vystoupily */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 50% 50%, transparent 40%, ${bg0}66 100%)`,
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center' }}>
              <HexTile property="empty" size="lg" />
              <HexTile property="focal" focal="active" size="lg" />
              <HexTile property="base" size="lg" owner={red} />
              <DiceTower
                dice={[
                  { value: 4, playerColor: red },
                  { value: 2, playerColor: red },
                  { value: 6, playerColor: blue },
                ]}
                size="md"
                showBase
                label="Vez"
              />
            </div>
          </div>
        </Section>

        {/* ── 3. Panel s komponentami ── */}
        <Section title="Panel — komponenty na textuře" desc="Textura jako pozadí dialogu / HUDu. Ztmavovací overlay řídí čitelnost obsahu — laď posuvníkem nahoře.">
          <div style={{
            position: 'relative',
            padding: 24,
            borderRadius: 8,
            border: `1px solid ${goldDim}`,
            backgroundImage: `url(${tex.src})`,
            backgroundSize: `${tileSize}px ${tileSize}px`,
            backgroundRepeat: 'repeat',
            overflow: 'hidden',
          }}>
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: bg0, opacity: overlay, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <Stack gap="md">
                <h3 style={{ margin: 0, color: gold, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Tábor u řeky</h3>
                <p style={{ margin: 0, color: textHigh, fontSize: '0.875rem', lineHeight: 1.6, textShadow: '0 1px 4px rgba(0,0,0,0.8)', maxWidth: 520 }}>
                  Tvá družina si rozbila tábor na travnaté pláni. Před soumrakem
                  musíš rozhodnout, kam vyrazíte.
                </p>
                <Inline gap="sm">
                  <DonjonButton variant="success" size="sm">Pokračovat</DonjonButton>
                  <DonjonButton variant="default" size="sm">Odpočinout</DonjonButton>
                </Inline>
                <DonjonCard title="Loot v trávě" description="Něco se tu blýská ve stéblech." style={{ maxWidth: 320 }} />
              </Stack>
            </div>
          </div>
        </Section>

        {/* ── 4. Cover vs repeat ── */}
        <Section title="Cover vs repeat" desc="cover = jedna instance roztažená přes plochu (vidíš detail/rozmazání). repeat = dlaždicování.">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ ...SUB, marginBottom: 8 }}>cover</p>
              <div style={{
                height: 180, borderRadius: 6, border: `1px solid ${borderDefault}`,
                backgroundImage: `url(${tex.src})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
            </div>
            <div>
              <p style={{ ...SUB, marginBottom: 8 }}>repeat ({tileSize}px)</p>
              <div style={{
                height: 180, borderRadius: 6, border: `1px solid ${borderDefault}`,
                backgroundImage: `url(${tex.src})`,
                backgroundSize: `${tileSize}px ${tileSize}px`, backgroundRepeat: 'repeat',
              }} />
            </div>
          </div>
        </Section>

        {/* ── 5. Vedle sebe ── */}
        <Section title="Všechny textury vedle sebe" desc="Rychlé porovnání barevnosti a stylu.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {TEXTURES.map(t => (
              <div key={t.id}>
                <p style={{ ...SUB, marginBottom: 8 }}>{t.label}</p>
                <div style={{
                  height: 200, borderRadius: 6, border: `1px solid ${borderDefault}`,
                  backgroundImage: `url(${t.src})`,
                  backgroundSize: `${tileSize}px ${tileSize}px`, backgroundRepeat: 'repeat',
                }} />
              </div>
            ))}
          </div>
        </Section>

      </div>
    </>
  )
}
