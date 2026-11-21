import { Link } from 'react-router-dom'
import { Section } from './ShowcasePage'
import { gold, goldDim, textMid, bg2, bg3 } from '../lib/donjon/tokens'

/* ── Library labels — krátká jmenovka vedle každého chipu. ── */
const LIB_LABELS = {
  donjon: 'donjon-fall-ui',
  tkajui: 'TkajUI',
  shared: 'shared',
}

/* ── Group order — zachová stabilní pořadí sekcí bez ohledu na vstup. ── */
const LIB_ORDER = ['donjon', 'tkajui', 'shared']

/**
 * ComponentsUsed — seznam komponent potřebných pro implementaci obrazovky.
 *
 * @param {object} props
 * @param {Array<{name: string, library: 'donjon' | 'tkajui' | 'shared', role?: string}>} props.items
 */
export default function ComponentsUsed({ items }) {
  if (!items?.length) return null

  // Group by library, preserving insertion order inside each group.
  const groups = {}
  for (const it of items) {
    const key = it.library ?? 'shared'
    ;(groups[key] ||= []).push(it)
  }
  const presentLibs = LIB_ORDER.filter(l => groups[l]?.length)

  return (
    <Section
      title="Použité komponenty"
      description="Komponenty potřebné pro implementaci této obrazovky."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {presentLibs.map(lib => (
          <div key={lib} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{
              margin: 0,
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: goldDim,
            }}>
              {LIB_LABELS[lib] ?? lib}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {groups[lib].map((it, i) => {
                const chipStyle = {
                  display: 'inline-flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: '6px 10px',
                  borderRadius: 4,
                  border: `1px solid ${goldDim}`,
                  background: bg2,
                  maxWidth: 260,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 120ms, background 120ms',
                }
                const inner = (
                  <>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '0.75rem',
                        color: gold,
                        fontWeight: 600,
                      }}>
                        {it.name}
                      </span>
                      <span style={{
                        fontSize: '0.5625rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: textMid,
                      }}>
                        {LIB_LABELS[it.library] ?? it.library}
                      </span>
                    </div>
                    {it.role && (
                      <span style={{
                        fontSize: '0.6875rem',
                        color: textMid,
                        lineHeight: 1.35,
                      }}>
                        {it.role}
                      </span>
                    )}
                  </>
                )
                if (it.slug) {
                  return (
                    <Link
                      key={`${it.name}-${i}`}
                      to={`/components/${it.slug}`}
                      style={{ ...chipStyle, cursor: 'pointer' }}
                      title={it.role ?? undefined}
                      className="donjon-components-used-chip"
                    >
                      {inner}
                    </Link>
                  )
                }
                return (
                  <div
                    key={`${it.name}-${i}`}
                    style={chipStyle}
                    title={it.role ?? undefined}
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <style href="donjon-components-used-hover" precedence="low">{`
        .donjon-components-used-chip:hover { border-color: ${gold} !important; background: ${bg3} !important; }
      `}</style>
    </Section>
  )
}
