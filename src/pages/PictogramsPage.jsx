import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

const inter = '"Inter", sans-serif'

function SwordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <path d="M4 20L14 10M14 10L18 4L20 6L14 10M14 10L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 12L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <path d="M12 3L4 7V12C4 16.4 7.4 20.5 12 21C16.6 20.5 20 16.4 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TowerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <rect x="6" y="11" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 11V7H8V9H10V7H14V9H16V7H18V11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 21V17H14V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

const placeholders = [
  { id: 'sword',  label: 'Meč',    icon: <SwordIcon />,  note: 'Útok / souboj' },
  { id: 'shield', label: 'Štít',   icon: <ShieldIcon />, note: 'Obrana / základna' },
  { id: 'tower',  label: 'Věž',    icon: <TowerIcon />,  note: 'Donjon / pevnost' },
]

const sizes = [
  { name: 'sm', px: 16 },
  { name: 'md', px: 24 },
  { name: 'lg', px: 32 },
  { name: 'xl', px: 48 },
]

function PictogramCard({ icon, label, note }) {
  return (
    <div style={{
      background: 'linear-gradient(150deg,#1E1C30 0%,#141324 100%)',
      border: '1px solid #353751',
      borderRadius: 2,
      padding: '28px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
    }}>
      {/* Main display */}
      <div style={{ color: '#FFC183', width: 48, height: 48 }}>
        {icon}
      </div>

      {/* Sizes */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 16,
      }}>
        {sizes.map(s => (
          <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ color: '#8F7458', width: s.px, height: s.px }}>
              {icon}
            </div>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.5625rem', color: '#3A3A52' }}>{s.name}</p>
          </div>
        ))}
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8956A' }}>{label}</p>
        <p style={{ margin: '3px 0 0', fontFamily: inter, fontSize: '0.6875rem', color: '#3A3A52' }}>{note}</p>
      </div>

      {/* Color variants */}
      <div style={{
        display: 'flex',
        gap: 12,
        padding: '12px 16px',
        background: '#0F0E1A',
        borderRadius: 1,
        width: '100%',
        justifyContent: 'center',
      }}>
        {[
          { color: '#FFC183', label: 'Aktivní' },
          { color: '#8F7458', label: 'Pasivní' },
          { color: '#3A3A52', label: 'Disabled' },
          { color: '#C04040', label: 'Danger' },
          { color: '#40A055', label: 'Success' },
        ].map(v => (
          <div key={v.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ color: v.color, width: 20, height: 20 }}>{icon}</div>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.5rem', color: '#3A3A52' }}>{v.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PictogramsPage() {
  return (
    <ShowcasePage
      title="Pictograms"
      description="Ikonový systém hry. Tři výchozí placeholder ikony — finální grafika bude dodána."
    >
      <Section
        title="Ikony"
        description="Každá ikona existuje ve 4 velikostech (sm/md/lg/xl) a 5 barevných stavech."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {placeholders.map(p => (
            <PictogramCard key={p.id} {...p} />
          ))}
        </div>
      </Section>

      <Section
        title="Použití"
        description="Ikony se renderují jako SVG — barva se přebírá z CSS color (currentColor)."
      >
        <div style={{
          background: '#0F0E1A',
          border: '1px solid #1E1C30',
          borderRadius: 2,
          padding: '16px 20px',
        }}>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem', color: '#6B6A82', lineHeight: 1.7 }}>
{`<SwordIcon style={{ width: 24, height: 24, color: '#FFC183' }} />

// nebo jako třída
<SwordIcon className="w-6 h-6 text-gold-300" />`}
          </pre>
        </div>
      </Section>
    </ShowcasePage>
  )
}
