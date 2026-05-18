/* ── Sdílená DeviceFrame komponenta + ComparisonRow ──
   Exportuje FRAME config, DeviceFrame a ComparisonRow.
   Původně definováno v ScreensPage.jsx, přesunuto sem pro sdílení. */

export const FRAME = {
  desktop: { w: 840, h: 500, rx: 8,  chromeH: 28, label: 'PC / Desktop — 1280px+' },
  tablet:  { w: 400, h: 580, rx: 20, chromeH: 40, label: 'Tablet — 768px' },
  mobile:  { w: 230, h: 470, rx: 28, chromeH: 40, label: 'Mobil — 375px' },
}

export default function DeviceFrame({ type, children }) {
  const c = FRAME[type]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
      <p style={{
        margin: 0, fontSize: '0.625rem', color: '#8F7458',
        fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {c.label}
      </p>
      <div style={{
        width: c.w, height: c.h,
        border: '2px solid #3A3858',
        borderRadius: c.rx,
        background: '#12111F',
        boxShadow: '0 12px 48px #00000077, inset 0 0 0 1px #2A2948',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', flexShrink: 0,
      }}>
        {/* Chrome bar */}
        <div style={{
          height: c.chromeH,
          background: '#161525',
          borderBottom: '1px solid #2A2948',
          display: 'flex', alignItems: 'center',
          padding: '0 12px', gap: 6, flexShrink: 0,
        }}>
          {type === 'desktop' ? (
            <>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A3858' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A3858' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A3858' }} />
              <div style={{ flex: 1, height: 14, background: '#1B1A30', borderRadius: 3, marginLeft: 8 }} />
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: type === 'mobile' ? 36 : 48,
                height: 8, borderRadius: 4, background: '#0D0C1A',
              }} />
            </div>
          )}
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* Renders all three device frames scaled down side by side.
   Pass the same JSX elements as desktop/tablet/mobile props. */
export function ComparisonRow({ desktop, tablet, mobile }) {
  const SCALES  = { desktop: 0.38, tablet: 0.50, mobile: 0.65 }
  const LABELS  = { desktop: 'PC', tablet: 'Tablet', mobile: 'Mobil' }
  const layouts = { desktop, tablet, mobile }

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {['desktop', 'tablet', 'mobile'].map(type => {
        const scale = SCALES[type]
        const c     = FRAME[type]
        return (
          <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{
              margin: 0, fontSize: '0.5625rem', color: '#8F7458',
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {LABELS[type]}
            </p>
            <div style={{
              width:  Math.round(c.w * scale),
              height: Math.round(c.h * scale),
              flexShrink: 0,
            }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <DeviceFrame type={type}>{layouts[type]}</DeviceFrame>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
