/* ── SnippetsPage ──────────────────────────────────────────────────────────
   Copy-paste vzory pro herní UI — rychlý start bez hledání.
   Každý snippet je hotový blok použitelný přímo v Donjon Fall.
   ─────────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import {
  bg2, bg3, bg4, bgDeep, borderDefault, dangerColor, gainColor, gold, goldDim, goldMid, infoLight, textFaint, textHigh, textLow, textMid, textParchment, warningColor,
} from '../lib/donjon/tokens'
import DonjonButton     from '../lib/donjon/DonjonButton'
import DonjonCard       from '../lib/donjon/DonjonCard'
import DonjonProgressBar from '../lib/donjon/DonjonProgressBar'
import DonjonSlider     from '../lib/donjon/DonjonSlider'
import DonjonToggle     from '../lib/donjon/DonjonToggle'
import DonjonSelect     from '../lib/donjon/DonjonSelect'
import DonjonBadge      from '../lib/donjon/DonjonBadge'
import DonjonTooltip    from '../lib/donjon/DonjonTooltip'
import { Shield, PlayerIdentityBadge } from '../lib/donjon/Erb'
import { CornerOrnament } from '../lib/donjon'
import { red, blue, green } from '../lib/donjon/playerColors'

/* ── Sdílené styly ── */
const PAGE = { padding: '40px 32px', maxWidth: 900, margin: '0 auto' }
const SECTION_GAP = { marginBottom: 56 }
const H1 = { fontSize: '1.5rem', fontWeight: 700, color: gold, letterSpacing: '0.04em', marginBottom: 6 }
const H2 = { fontSize: '1rem', fontWeight: 700, color: gold, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4, marginTop: 0 }
const SUBTITLE = { fontSize: '0.8125rem', color: textMid, marginBottom: 28 }
const SNIPPET_LABEL = { fontSize: '0.6875rem', color: textFaint, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }
const DIVIDER = { height: 1, background: borderDefault, margin: '48px 0', opacity: 0.5 }

function SectionHead({ id, title, desc }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 id={id} style={H2}>{title}</h2>
      {desc && <p style={{ ...SUBTITLE, marginBottom: 0 }}>{desc}</p>}
    </div>
  )
}

/* ── Copy button ── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute', top: 10, right: 10,
        padding: '3px 10px',
        fontSize: '0.6875rem',
        background: copied ? `${gainColor}22` : `${bg4}`,
        border: `1px solid ${copied ? gainColor : borderDefault}`,
        borderRadius: 3,
        color: copied ? gainColor : textMid,
        cursor: 'pointer',
        transition: 'all 0.15s',
        letterSpacing: '0.04em',
      }}
    >
      {copied ? '✓ Zkopírováno' : 'Kopírovat'}
    </button>
  )
}

/* ── CodeBlock ── */
function Code({ children }) {
  const code = children.trim()
  return (
    <div style={{ position: 'relative', marginTop: 8 }}>
      <pre style={{
        background: bgDeep,
        border: `1px solid ${borderDefault}`,
        borderRadius: 4,
        padding: '14px 16px',
        fontSize: '0.75rem',
        color: textParchment,
        overflowX: 'auto',
        margin: 0,
        lineHeight: 1.6,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
      }}>
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

/* ── Preview box ── */
function Preview({ children, style }) {
  return (
    <div style={{
      background: bg2,
      border: `1px solid ${borderDefault}`,
      borderRadius: 4,
      padding: 24,
      marginBottom: 8,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ── Snippet container ── */
function Snippet({ label, preview, code, previewStyle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={SNIPPET_LABEL}>{label}</p>
      <Preview style={previewStyle}>{preview}</Preview>
      <Code>{code}</Code>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════ */

export default function SnippetsPage() {
  const [hp, setHp]             = useState(72)
  const [mana, setMana]         = useState(45)
  const [volume, setVolume]     = useState(70)
  const [sfx, setSfx]           = useState(true)
  const [lang, setLang]         = useState('cs')
  const [quality, setQuality]   = useState('high')

  return (
    <div style={PAGE}>
      {/* Hlavička */}
      <h1 style={H1}>Snippety</h1>
      <p style={SUBTITLE}>
        Hotové bloky kódu — zkopíruj, vlož, hotovo. Všechny používají donjon-fall-ui tokeny a komponenty.
      </p>

      {/* ── 1. HP / Resource bary ── */}
      <div style={SECTION_GAP}>
        <SectionHead id="resource-bary" title="Resource bary" desc="HP, Mana, XP — bary s automatickými prahy a hodnotami." />

        <Snippet
          label="HP bar — tři hráči"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
              {[
                { label: 'Hráč 1', value: 80, color: blue  },
                { label: 'Hráč 2', value: 32, color: red   },
                { label: 'Hráč 3', value: 18, color: green },
              ].map(p => (
                <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.75rem', color: textMid, width: 52, flexShrink: 0 }}>{p.label}</span>
                  <div style={{ flex: 1 }}>
                    <DonjonProgressBar value={p.value} max={100} variant="hp" size="sm" showValue />
                  </div>
                </div>
              ))}
            </div>
          }
          code={`import DonjonProgressBar from './src/lib/donjon/DonjonProgressBar'

const players = [
  { label: 'Hráč 1', value: 80 },
  { label: 'Hráč 2', value: 32 },
  { label: 'Hráč 3', value: 18 },
]

{players.map(p => (
  <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <span style={{ width: 52, color: textMid, fontSize: '0.75rem' }}>{p.label}</span>
    <div style={{ flex: 1 }}>
      <DonjonProgressBar value={p.value} max={100} variant="hp" size="sm" showValue />
    </div>
  </div>
))}`}
        />

        <Snippet
          label="Sada resource barů (HP + Mana + XP)"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320 }}>
              <DonjonProgressBar value={hp} max={100} variant="hp"   label="HP"   showValue ticks={4} />
              <DonjonProgressBar value={mana} max={100} variant="mana" label="Mana" showValue ticks={4} />
              <DonjonProgressBar value={60}  max={100} variant="xp"  label="XP"   showValue />
            </div>
          }
          code={`<DonjonProgressBar value={hp}   max={100} variant="hp"   label="HP"   showValue ticks={4} />
<DonjonProgressBar value={mana} max={100} variant="mana" label="Mana" showValue ticks={4} />
<DonjonProgressBar value={xp}   max={100} variant="xp"  label="XP"   showValue />`}
        />
      </div>

      <div style={DIVIDER} />

      {/* ── 2. Settings panel ── */}
      <div style={SECTION_GAP}>
        <SectionHead id="settings-panel" title="Settings panel" desc="Slider + Toggle kombinace pro nastavení zvuku — přímý vzor pro SettingsPage." />

        <Snippet
          label="Zvukové nastavení"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
              <DonjonSlider value={volume} onChange={setVolume} label="Hudba" showValue formatValue={v => `${v} %`} />
              <DonjonSlider value={65} onChange={() => {}} label="Zvukové efekty" showValue formatValue={v => `${v} %`} />
              <div style={{ height: 1, background: borderDefault, opacity: 0.4 }} />
              <DonjonToggle checked={sfx} onChange={setSfx} label="Vypnout vše" />
            </div>
          }
          code={`const [volume, setVolume] = useState(70)
const [sfx, setSfx]       = useState(true)

<DonjonSlider
  value={volume}
  onChange={setVolume}
  label="Hudba"
  showValue
  formatValue={v => \`\${v} %\`}
/>
<DonjonSlider
  value={sfxVolume}
  onChange={setSfxVolume}
  label="Zvukové efekty"
  showValue
  formatValue={v => \`\${v} %\`}
/>
<DonjonToggle checked={muteAll} onChange={setMuteAll} label="Vypnout vše" />`}
        />

        <Snippet
          label="Jazykový výběr"
          preview={
            <div style={{ maxWidth: 220 }}>
              <DonjonSelect
                value={lang}
                onChange={setLang}
                label="Jazyk"
                options={[
                  { value: 'cs', label: '🇨🇿  Čeština' },
                  { value: 'en', label: '🇬🇧  English' },
                  { value: 'de', label: '🇩🇪  Deutsch' },
                  { value: 'sk', label: '🇸🇰  Slovenčina' },
                ]}
              />
            </div>
          }
          code={`const [lang, setLang] = useState('cs')

<DonjonSelect
  value={lang}
  onChange={setLang}
  label="Jazyk"
  options={[
    { value: 'cs', label: 'Čeština' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
  ]}
/>`}
        />

        <Snippet
          label="Grafické nastavení"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 280 }}>
              <DonjonSelect
                value={quality}
                onChange={setQuality}
                label="Kvalita grafiky"
                options={[
                  { value: 'low',    label: 'Nízká' },
                  { value: 'medium', label: 'Střední' },
                  { value: 'high',   label: 'Vysoká' },
                  { value: 'ultra',  label: 'Ultra' },
                ]}
              />
              <DonjonToggle checked={true} onChange={() => {}} label="Animace hexů" />
              <DonjonToggle checked={false} onChange={() => {}} label="Fullscreen" />
            </div>
          }
          code={`<DonjonSelect
  value={quality}
  onChange={setQuality}
  label="Kvalita grafiky"
  options={[
    { value: 'low',    label: 'Nízká' },
    { value: 'medium', label: 'Střední' },
    { value: 'high',   label: 'Vysoká' },
    { value: 'ultra',  label: 'Ultra' },
  ]}
/>
<DonjonToggle checked={animationsOn} onChange={setAnimationsOn} label="Animace hexů" />
<DonjonToggle checked={fullscreen}   onChange={setFullscreen}   label="Fullscreen" />`}
        />
      </div>

      <div style={DIVIDER} />

      {/* ── 3. Player Identity ── */}
      <div style={SECTION_GAP}>
        <SectionHead id="player-identity" title="Identita hráče" desc="Badge + HP bar — základní blok pro HUD a player panel." />

        <Snippet
          label="PlayerIdentityBadge s HP barem"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
              {[
                { name: 'Hráč 1', color: blue, vp: 7, hp: 72 },
                { name: 'Hráč 2', color: red,  vp: 4, hp: 31 },
              ].map(p => (
                <div key={p.name} style={{
                  background: bg3,
                  border: `1px solid ${borderDefault}`,
                  borderRadius: 4,
                  padding: '12px 14px',
                }}>
                  <div style={{ marginBottom: 10 }}>
                    <PlayerIdentityBadge name={p.name} color={p.color} vp={p.vp} />
                  </div>
                  <DonjonProgressBar value={p.hp} max={100} variant="hp" size="sm" showValue />
                </div>
              ))}
            </div>
          }
          code={`import { PlayerIdentityBadge } from './src/lib/donjon/Erb'
import DonjonProgressBar from './src/lib/donjon/DonjonProgressBar'

{players.map(p => (
  <div key={p.id} style={{ background: bg3, border: \`1px solid \${borderDefault}\`, borderRadius: 4, padding: '12px 14px' }}>
    <div style={{ marginBottom: 10 }}>
      <PlayerIdentityBadge name={p.name} color={p.color} vp={p.vp} />
    </div>
    <DonjonProgressBar value={p.hp} max={100} variant="hp" size="sm" showValue />
  </div>
))}`}
        />

        <Snippet
          label="Mini player list (side panel)"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 200 }}>
              {[
                { name: 'Hráč 1', color: blue,  vp: 7,  active: true  },
                { name: 'Hráč 2', color: red,   vp: 4,  active: false },
                { name: 'Hráč 3', color: green, vp: 11, active: false },
              ].map(p => (
                <div key={p.name} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 10px',
                  background: p.active ? bg4 : 'transparent',
                  border: `1px solid ${p.active ? goldDim : 'transparent'}`,
                  borderRadius: 3,
                }}>
                  <Shield playerColor={p.color} symbol="sword" size={22} />
                  <span style={{ fontSize: '0.8125rem', color: p.active ? textHigh : textMid, flex: 1 }}>{p.name}</span>
                  <DonjonBadge variant="default">{p.vp} VP</DonjonBadge>
                </div>
              ))}
            </div>
          }
          code={`import { Shield } from './src/lib/donjon/Erb'
import DonjonBadge from './src/lib/donjon/DonjonBadge'
import { bg4, goldDim, textHigh, textMid } from './src/lib/donjon/tokens'

{players.map(p => (
  <div key={p.id} style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '7px 10px',
    background: p.isActive ? bg4 : 'transparent',
    border: \`1px solid \${p.isActive ? goldDim : 'transparent'}\`,
    borderRadius: 3,
  }}>
    <Shield playerColor={p.color} symbol="sword" size={22} />
    <span style={{ color: p.isActive ? textHigh : textMid, flex: 1 }}>{p.name}</span>
    <DonjonBadge variant="default">{p.vp} VP</DonjonBadge>
  </div>
))}`}
        />
      </div>

      <div style={DIVIDER} />

      {/* ── 4. Akční tlačítka ── */}
      <div style={SECTION_GAP}>
        <SectionHead id="akce" title="Akční tlačítka" desc="Vzory pro potvrzení / zrušení a herní akce s tooltipy." />

        <Snippet
          label="Confirm / Cancel pár"
          preview={
            <div style={{ display: 'flex', gap: 10 }}>
              <DonjonButton variant="danger"  size="sm">Zrušit</DonjonButton>
              <DonjonButton variant="default" size="sm">Potvrdit →</DonjonButton>
            </div>
          }
          code={`<DonjonButton variant="danger"  size="sm" onClick={onCancel}>Zrušit</DonjonButton>
<DonjonButton variant="default" size="sm" onClick={onConfirm}>Potvrdit →</DonjonButton>`}
        />

        <Snippet
          label="Akční tlačítka s tooltipy"
          preview={
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <DonjonTooltip content="Přesune kostku na sousední hex" title="Pohyb kostky">
                <DonjonButton size="sm">Pohyb</DonjonButton>
              </DonjonTooltip>
              <DonjonTooltip content="Přesune věž hráče" title="Pohyb věže">
                <DonjonButton size="sm">Věž</DonjonButton>
              </DonjonTooltip>
              <DonjonTooltip content="Přehodí kostku na soupeřův hex a způsobí souboj" title="Přehazování">
                <DonjonButton size="sm" variant="warning">Přehodit</DonjonButton>
              </DonjonTooltip>
              <DonjonTooltip content="Vzdáte se a ukončíte hru" title="Vzdát se">
                <DonjonButton size="sm" variant="danger">Vzdát se</DonjonButton>
              </DonjonTooltip>
            </div>
          }
          code={`import DonjonTooltip from './src/lib/donjon/DonjonTooltip'

<DonjonTooltip content="Přesune kostku na sousední hex" title="Pohyb kostky">
  <DonjonButton size="sm">Pohyb</DonjonButton>
</DonjonTooltip>

<DonjonTooltip content="Vzdáte se a ukončíte hru" title="Vzdát se">
  <DonjonButton size="sm" variant="danger">Vzdát se</DonjonButton>
</DonjonTooltip>`}
        />
      </div>

      <div style={DIVIDER} />

      {/* ── 5. Dekorativní karta ── */}
      <div style={SECTION_GAP}>
        <SectionHead id="karty" title="Karty a panely" desc="DonjonCard s CornerOrnament dekoracemi — herní panel vzor." />

        <Snippet
          label="Herní panel s rohovou dekorací"
          preview={
            <div style={{ maxWidth: 340 }}>
              <DonjonCard title="Stav hráče" variant="default">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <DonjonProgressBar value={hp}   max={100} variant="hp"   label="HP"   showValue />
                  <DonjonProgressBar value={mana} max={100} variant="mana" label="Mana" showValue />
                  <div style={{ display: 'flex', gap: 6, paddingTop: 4 }}>
                    <DonjonBadge variant="default">Tah 3</DonjonBadge>
                    <DonjonBadge variant="warning">Mana nízká</DonjonBadge>
                  </div>
                </div>
              </DonjonCard>
            </div>
          }
          code={`<DonjonCard title="Stav hráče" variant="default">
  <DonjonProgressBar value={hp}   max={100} variant="hp"   label="HP"   showValue />
  <DonjonProgressBar value={mana} max={100} variant="mana" label="Mana" showValue />
  <div style={{ display: 'flex', gap: 6, paddingTop: 4 }}>
    <DonjonBadge variant="default">Tah 3</DonjonBadge>
    <DonjonBadge variant="warning">Mana nízká</DonjonBadge>
  </div>
</DonjonCard>`}
        />

        <Snippet
          label="Vlastní tmavý panel s CornerOrnament"
          preview={
            <div style={{ maxWidth: 300 }}>
              <div style={{
                position: 'relative',
                background: bg3,
                border: `1px solid ${borderDefault}`,
                borderRadius: 4,
                padding: '20px 24px',
              }}>
                <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', top: 6, left: 6 }} />
                <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />
                <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
                <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />
                <p style={{ margin: 0, color: textMid, fontSize: '0.8125rem', textAlign: 'center' }}>
                  Obsah panelu
                </p>
              </div>
            </div>
          }
          code={`import { CornerOrnament } from './src/lib/donjon'
import { bg3, borderDefault, goldDim } from './src/lib/donjon/tokens'

<div style={{ position: 'relative', background: bg3, border: \`1px solid \${borderDefault}\`, borderRadius: 4, padding: '20px 24px' }}>
  <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', top: 6, left: 6 }} />
  <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />
  <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
  <CornerOrnament size={12} color={goldDim} style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />
  {/* obsah */}
</div>`}
        />
      </div>

      <div style={DIVIDER} />

      {/* ── 6. Toast vzory ── */}
      <div style={SECTION_GAP}>
        <SectionHead id="toasty" title="Toast notifikace" desc="Herní feedback — gain, loss, event. Wrap celou aplikaci DonjonToastProvider." />

        <Snippet
          label="Setup a použití"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { v: 'gain',    title: '+5 VP', msg: 'Obsadil jsi základnu.' },
                { v: 'loss',    title: '−3 HP', msg: 'Hráč 2 způsobil souboj.' },
                { v: 'warning', title: 'Mana nízká', msg: 'Zbývá méně než 25 %.' },
                { v: 'event',   title: 'Nový tah', msg: 'Hráč 2 začíná kolo 4.' },
              ].map(t => {
                const COLORS = { gain: gainColor, loss: dangerColor, warning: warningColor, event: infoLight }
                const c = COLORS[t.v]
                return (
                  <div key={t.v} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    background: bg3,
                    border: `1px solid ${borderDefault}`,
                    borderLeft: `3px solid ${c}`,
                    borderRadius: 3,
                    padding: '9px 12px',
                    width: 260,
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 2px', fontSize: '0.8125rem', fontWeight: 700, color: c }}>{t.title}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: textMid }}>{t.msg}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          }
          code={`// 1. Wrap aplikace v main.jsx nebo App.jsx:
import { DonjonToastProvider } from './src/lib/donjon'
<DonjonToastProvider><App /></DonjonToastProvider>

// 2. V komponentě:
import { useDonjonToast } from './src/lib/donjon'
const { addToast } = useDonjonToast()

// 3. Zavolej:
addToast({ title: '+5 VP',       message: 'Obsadil jsi základnu.', variant: 'gain'    })
addToast({ title: '−3 HP',       message: 'Hráč 2 způsobil souboj.', variant: 'loss' })
addToast({ title: 'Mana nízká',  message: 'Zbývá méně než 25 %.', variant: 'warning' })
addToast({ title: 'Nový tah',    message: 'Hráč 2 začíná kolo 4.', variant: 'event' })

// Varianty: 'default' | 'gain' | 'loss' | 'warning' | 'event'`}
        />
      </div>

      <div style={DIVIDER} />

      {/* ── 7. Import reference ── */}
      <div style={SECTION_GAP}>
        <SectionHead id="imports" title="Import reference" desc="Všechny importy na jednom místě — zkopíruj co potřebuješ." />

        <Snippet
          label="Barrel import — vše z jednoho místa"
          preview={
            <div style={{ color: textMid, fontSize: '0.8125rem', padding: 4 }}>
              <p style={{ margin: '0 0 6px', color: gold, fontWeight: 600 }}>Dostupné exporty z donjon-fall-ui:</p>
              {[
                'DonjonButton, DonjonButtonGroup',
                'DonjonInput, DonjonSelect, DonjonSlider, DonjonToggle',
                'DonjonProgressBar, DonjonCard, DonjonModal',
                'DonjonTooltip, DonjonToastProvider, useDonjonToast',
                'DonjonBadge, DonjonPictogram',
                'HexTile, DieFace, FloatFeedback',
                'Shield, PlayerIdentityBadge',
                'CornerOrnament, SideOrnament, HexOrnament',
                'SwordIcon, ShieldIcon, TowerIcon',
                'gold, goldDim, bg2, borderDefault, textHigh, …',
              ].map(line => (
                <p key={line} style={{ margin: '2px 0', fontSize: '0.75rem', color: textLow }}>{line}</p>
              ))}
            </div>
          }
          code={`import {
  DonjonButton, DonjonButtonGroup,
  DonjonInput, DonjonSelect, DonjonSlider, DonjonToggle,
  DonjonProgressBar, DonjonCard, DonjonModal,
  DonjonTooltip, DonjonToastProvider, useDonjonToast,
  DonjonBadge, DonjonPictogram,
  HexTile, DieFace, FloatFeedback,
  Shield, PlayerIdentityBadge,
  CornerOrnament, SideOrnament, HexOrnament,
  SwordIcon, ShieldIcon, TowerIcon,
  // Tokeny:
  gold, goldDim, goldMid,
  bg0, bg1, bg2, bg3, bg4, bgDeep,
  borderDefault, borderMid, borderSubtle,
  textHigh, textMid, textLow, textFaint, textParchment,
  dangerColor, warningColor, gainColor, successColor,
} from './src/lib/donjon'`}
        />

        <Snippet
          label="CSS custom properties"
          preview={
            <p style={{ margin: 0, color: textMid, fontSize: '0.8125rem' }}>
              Importuj <code style={{ color: gold, background: bgDeep, padding: '1px 5px', borderRadius: 2 }}>donjon.css</code> jednou v <code style={{ color: gold, background: bgDeep, padding: '1px 5px', borderRadius: 2 }}>index.css</code> a používej CSS proměnné kdekoliv.
            </p>
          }
          code={`/* index.css */
@import './src/lib/donjon/donjon.css';

/* Pak v libovolném CSS/styled: */
.my-panel {
  background: var(--donjon-bg2);
  border: 1px solid var(--donjon-border-default);
  color: var(--donjon-text-mid);
}

.active {
  border-color: var(--donjon-gold-dim);
  box-shadow: 0 0 8px var(--donjon-gold)44;
}

/* Dostupné skupiny proměnných:
   --donjon-gold, --donjon-gold-mid, --donjon-gold-dim
   --donjon-bg0 až --donjon-bg4, --donjon-bg-deep
   --donjon-border-subtle/default/mid
   --donjon-text-high/mid/low/faint/cool/parchment
   --donjon-success/danger/warning/gain
   --donjon-glow-gold, --donjon-shadow-panel
   --donjon-z-dropdown/toast/tooltip/modal          */`}
        />
      </div>
    </div>
  )
}
