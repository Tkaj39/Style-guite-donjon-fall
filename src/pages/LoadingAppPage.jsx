import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import DeviceFrame, { ComparisonRow } from '../components/layout/DeviceFrame'

/* ── Progress bar ── */
function ProgressBar({ pct, width = '100%' }) {
  return (
    <div style={{
      width, height: 4, background: '#1B1A30',
      borderRadius: 2, overflow: 'hidden',
      border: '1px solid #2A2948',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #FFC183 0%, #8F7458 100%)',
        borderRadius: 2,
        boxShadow: '0 0 6px #FFC18355',
      }} />
    </div>
  )
}

/* ── Centrovaný obsah načítací obrazovky ── */
function LoadingContent({ titleSize = '1.5rem', subtitleSize = '0.5rem', statusSize = '0.4375rem', pct = 67 }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 50%, #14132A 0%, #0A0917 100%)',
      padding: '24px 32px', gap: 16, position: 'relative',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          margin: '0 0 5px',
          fontSize: titleSize, fontWeight: 900,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          background: 'linear-gradient(180deg, #FFC183 0%, #8F7458 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1.1,
        }}>
          Donjon Fall
        </p>
        <p style={{
          margin: 0, fontSize: subtitleSize, color: '#4A4560',
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          Tahová strategická hra
        </p>
      </div>

      {/* Progress sekce */}
      <div style={{ width: '100%', maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ProgressBar pct={pct} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: statusSize, color: '#8F7458' }}>Načítání herních dat…</span>
          <span style={{
            fontSize: statusSize, color: '#FFC183', fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {pct}%
          </span>
        </div>
      </div>

      {/* Verze — dole vpravo */}
      <span style={{
        position: 'absolute', bottom: 10, right: 14,
        fontSize: '0.375rem', color: '#2A2948',
        fontWeight: 600, letterSpacing: '0.1em',
      }}>
        v1.0.0
      </span>
    </div>
  )
}

function LoadingAppDesktopLayout() {
  return <LoadingContent titleSize="1.75rem" subtitleSize="0.5625rem" statusSize="0.5rem" pct={67} />
}

function LoadingAppTabletLayout() {
  return <LoadingContent titleSize="1.375rem" subtitleSize="0.5rem" statusSize="0.4375rem" pct={67} />
}

function LoadingAppMobileLayout() {
  return <LoadingContent titleSize="1rem" subtitleSize="0.375rem" statusSize="0.375rem" pct={67} />
}

/* ── Page ── */
export default function LoadingAppPage() {
  return (
    <ShowcasePage
      title="Načítání aplikace"
      description="Úvodní obrazovka při spuštění hry — zobrazí se před načtením herních dat a assetů. Minimální, atmosférický design: logo + progress bar + status. Stejné rozložení na všech zařízeních."
    >
      <Section
        id="desktop"
        title="Desktop — 1280px+"
        description="Logo plné velikosti, progress bar na 67 %, verze v pravém dolním rohu."
      >
        <Preview>
          <DeviceFrame type="desktop">
            <LoadingAppDesktopLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="tablet"
        title="Tablet — 768px"
        description="Stejné rozložení jako desktop, proporčně zmenšené."
      >
        <Preview>
          <DeviceFrame type="tablet">
            <LoadingAppTabletLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="mobile"
        title="Mobil — 375px"
        description="Kompaktní varianta — zmenšené logo, úzký progress bar. Verze v rohu zůstává."
      >
        <Preview>
          <DeviceFrame type="mobile">
            <LoadingAppMobileLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="srovnani"
        title="Srovnání"
        description="Stejný layout přizpůsobený třem device framům — rozložení je identické, liší se pouze velikosti textu a paddingu."
      >
        <Preview>
          <ComparisonRow
            desktop={<LoadingAppDesktopLayout />}
            tablet={<LoadingAppTabletLayout />}
            mobile={<LoadingAppMobileLayout />}
          />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <DonjonBadge variant="default">Centrovaný layout — stejný na všech zařízeních</DonjonBadge>
            <DonjonBadge variant="warning">Progress bar — zlatý gradient #FFC183 → #8F7458</DonjonBadge>
            <DonjonBadge variant="default">Verze — pravý dolní roh, minimální</DonjonBadge>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
