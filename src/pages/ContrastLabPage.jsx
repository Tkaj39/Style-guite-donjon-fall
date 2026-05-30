/**
 * ContrastLabPage — playground pro ladění textových barev na různých pozadích.
 *
 * Cíl: vizuální matice text level × background. Každá buňka vykreslí
 * skutečné headings (H1–H6), p a small s aktuálními tokeny + spočítá
 * WCAG 2.1 contrast ratio a označí AA/AAA stav.
 *
 * Přepínání mezi paletami knihoven přes variants v ShowcasePage.
 *
 * Účel: rychlá identifikace problémových párů (token text × token bg),
 * abychom je mohli systémově opravit.
 */
import { ShowcasePage, Section, useLibVariant } from '../styleguide/ShowcasePage'
import * as T from '../lib/tkajui/tokens'
import * as D from '../lib/donjon/tokens'
import { contrastRatio, meetsContrast } from '../lib/shared/contrast'

/* ── Konfigurace text levelů & pozadí ────────────────────────────────── */

const TEXT_LEVELS = [
  { tag: 'h1',    size: '1.875rem', weight: 800, label: 'H1', large: true  },
  { tag: 'h2',    size: '1.5rem',   weight: 700, label: 'H2', large: true  },
  { tag: 'h3',    size: '1.25rem',  weight: 700, label: 'H3', large: true  },
  { tag: 'h4',    size: '1.0625rem',weight: 600, label: 'H4', large: false },
  { tag: 'p',     size: '0.9375rem',weight: 400, label: 'p',  large: false },
  { tag: 'small', size: '0.75rem',  weight: 400, label: 'small', large: false },
]

/* ── Konfigurace tokenů per knihovna ─────────────────────────────────── */

function getConfig(lib) {
  if (lib === 'tkajui') return {
    backgrounds: [
      { name: 'surface0',    hex: T.surface0 },
      { name: 'surface1',    hex: T.surface1 },
      { name: 'surface2',    hex: T.surface2 },
      { name: 'surface3',    hex: T.surface3 },
      { name: 'surface4',    hex: T.surface4 },
      { name: 'accent',      hex: T.accent },
      { name: 'accentDim',   hex: T.accentDim },
      { name: 'successBg',   hex: T.successBg },
      { name: 'success',     hex: T.successColor },
      { name: 'dangerBg',    hex: T.dangerBg },
      { name: 'danger',      hex: T.dangerColor },
      { name: 'warningBg',   hex: T.warningBg },
      { name: 'warning',     hex: T.warningColor },
      { name: 'infoBg',      hex: T.infoBg },
      { name: 'info',        hex: T.infoColor },
    ],
    textColors: [
      { name: 'textHigh',     hex: T.textHigh },
      { name: 'textMid',      hex: T.textMid },
      { name: 'textLow',      hex: T.textLow },
      { name: 'accent',       hex: T.accent },
      { name: 'accentLight',  hex: T.accentLight },
      { name: 'primaryText',  hex: T.primaryText },
    ],
  }
  return {
    backgrounds: [
      { name: 'bg0',         hex: D.bg0 },
      { name: 'bg1',         hex: D.bg1 },
      { name: 'bg2',         hex: D.bg2 },
      { name: 'bg3',         hex: D.bg3 },
      { name: 'bg4',         hex: D.bg4 },
      { name: 'gold',        hex: D.gold },
      { name: 'goldMid',     hex: D.goldMid },
      { name: 'goldDim',     hex: D.goldDim },
      { name: 'successColor',hex: D.successColor },
      { name: 'dangerColor', hex: D.dangerColor },
      { name: 'warningColor',hex: D.warningColor },
      { name: 'infoColor',   hex: D.infoColor },
    ],
    textColors: [
      { name: 'textHighest',  hex: D.textHighest },
      { name: 'textHigh',     hex: D.textHigh },
      { name: 'textMid',      hex: D.textMid },
      { name: 'textLow',      hex: D.textLow },
      { name: 'textParchment',hex: D.textParchment },
      { name: 'textCool',     hex: D.textCool },
      { name: 'gold',         hex: D.gold },
      { name: 'goldMid',      hex: D.goldMid },
      { name: 'goldDim',      hex: D.goldDim },
    ],
  }
}

/* ── WCAG badge ── */
function WcagBadge({ ratio, large }) {
  const aa  = ratio >= (large ? 3.0 : 4.5)
  const aaa = ratio >= (large ? 4.5 : 7.0)
  // Semantická mapování stejně jako u donjon notifikací: AAA=gain, AA=warning, FAIL=danger
  const color = aaa ? D.gainColor : aa ? D.warningColor : D.dangerColor
  const label = aaa ? 'AAA' : aa ? 'AA' : 'FAIL'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '1px 5px', borderRadius: 3,
      background: `${color}22`, color,
      fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.04em',
      fontFamily: 'monospace', textTransform: 'uppercase',
    }}>
      {ratio.toFixed(2)} · {label}
    </span>
  )
}

/* ── Jedna buňka — text na pozadí ── */
function Cell({ bg, fg, level }) {
  const ratio = contrastRatio(fg.hex, bg.hex)
  const aaFail = !meetsContrast(fg.hex, bg.hex, 'AA', level.large ? 'large' : 'normal')

  return (
    <div style={{
      background: bg.hex,
      padding: '12px 14px',
      borderRadius: 4,
      border: aaFail ? `2px solid ${D.dangerColor}` : `1px solid ${D.textHigh}10`,
      display: 'flex', flexDirection: 'column', gap: 8,
      minHeight: 90,
    }}>
      <div style={{
        color: fg.hex,
        fontSize: level.size,
        fontWeight: level.weight,
        lineHeight: 1.2,
      }}>
        {level.label === 'p' || level.label === 'small'
          ? 'Lorem ipsum dolor sit amet'
          : `${level.label} — Donjon Fall`}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
        <span style={{
          fontSize: '0.5rem', fontFamily: 'monospace',
          color: `${D.textHigh}66`, letterSpacing: '0.04em',
        }}>
          {fg.name}
        </span>
        <WcagBadge ratio={ratio} large={level.large} />
      </div>
    </div>
  )
}

/* ── Matice pro jedno pozadí ── */
function BackgroundRow({ bg, textColors }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 6,
      paddingBottom: 24, borderBottom: '1px solid #ffffff10',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 4,
          background: bg.hex, border: `1px solid ${D.textHigh}20`,
        }} />
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: D.textHigh }}>
            background: <span style={{ fontFamily: 'monospace', color: D.gold }}>{bg.name}</span>
          </div>
          <div style={{ fontSize: '0.625rem', fontFamily: 'monospace', color: D.textLow }}>
            {bg.hex}
          </div>
        </div>
      </div>

      {/* Grid: text levels × text colors */}
      {textColors.map(fg => (
        <div key={fg.name} style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${TEXT_LEVELS.length}, minmax(180px, 1fr))`,
          gap: 6,
        }}>
          {TEXT_LEVELS.map(level => (
            <Cell key={`${bg.name}-${fg.name}-${level.tag}`} bg={bg} fg={fg} level={level} />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Content ── */
function LabContent() {
  const lib = useLibVariant()
  const { backgrounds, textColors } = getConfig(lib)

  return (
    <Section
      id="matice"
      title="Matice kontrastu"
      description={`Každý řádek = jedno pozadí. Sloupce = text levely (H1, H2, … p, small). Pro každou kombinaci text-color × bg vidíš WCAG poměr a AA/AAA stav. ${
        lib === 'tkajui' ? 'TkajUI paleta.' : 'donjon-fall-ui paleta.'
      }`}
    >
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 1100, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {backgrounds.map(bg => (
            <BackgroundRow key={bg.name} bg={bg} textColors={textColors} />
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── Page ── */
export default function ContrastLabPage() {
  return (
    <ShowcasePage
      title="Contrast Lab"
      description="Playground pro ladění čitelnosti textu na různých pozadích. Každá buňka renderuje skutečný text s aktuálním tokenem + WCAG poměr. AAA = výborný, AA = OK, FAIL = červený rámeček."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <LabContent />

      <Section id="legenda" title="Legenda">
        <ul style={{ fontSize: '0.875rem', lineHeight: 1.6, color: D.textMid }}>
          <li><strong style={{ color: D.gainColor }}>AAA</strong> — poměr ≥ 7.0 (≥ 4.5 pro large text) — WCAG AAA</li>
          <li><strong style={{ color: D.warningColor }}>AA</strong> — poměr ≥ 4.5 (≥ 3.0 pro large text) — WCAG AA</li>
          <li><strong style={{ color: D.dangerColor }}>FAIL</strong> — neprošlo AA, červený rámeček buňky</li>
          <li><em>large</em> = H1–H3 (≥ 18pt nebo 14pt+ bold)</li>
        </ul>
      </Section>
    </ShowcasePage>
  )
}
