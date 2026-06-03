/* ── ChoicePanel (donjon-fall-ui) ────────────────────────────────────
   Player picks one of N options. Each option is a card with title +
   description + optional "consequence" hint (cost, alignment shift,
   risk preview). For dialogue branches use <Dialogue choices={…}> —
   ChoicePanel is the standalone non-NPC variant (campaign choice,
   level select, branching event).

   Sister of Dialogue but without portrait/speech-bubble framing.
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../shared/octagon'
import { bg2, bg3, gold, goldMid, goldDim, textHigh, textMid, borderDefault, dangerColor, gainColor, infoColor } from './tokens'

const CONSEQUENCE_COLOR = {
  cost:   goldMid,
  gain:   gainColor,
  danger: dangerColor,
  info:   infoColor,
}

/**
 * @typedef {object} ChoiceOption
 * @prop {string} id
 * @prop {React.ReactNode} title
 * @prop {React.ReactNode} [description]
 * @prop {Array<{label: string, type?: 'cost'|'gain'|'danger'|'info'}>} [consequences]
 * @prop {boolean} [disabled]
 * @prop {string} [disabledReason]   Tooltip-style explanation.
 * @prop {React.ReactNode} [icon]
 */

/**
 * @param {React.ReactNode} [title]
 * @param {React.ReactNode} [prompt]      Helper text above the choices.
 * @param {ChoiceOption[]} options
 * @param {string} [selected]              Currently selected id.
 * @param {(id: string, option: ChoiceOption) => void} [onSelect]
 * @param {'list'|'grid'} [layout='list']
 */
export default function ChoicePanel({
  title,
  prompt,
  options = [],
  selected,
  onSelect,
  layout = 'list',
  className,
  style,
  ...rest
}) {
  const cx = 12
  const isGrid = layout === 'grid'

  return (
    <div
      role="radiogroup"
      aria-label={typeof title === 'string' ? title : 'Choice panel'}
      className={className}
      style={{
        background: gold,
        clipPath: octagon(cx),
        padding: 1,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          background: bg2,
          clipPath: octagon(cx),
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {(title || prompt) && (
          <div>
            {title && (
              <h3 style={{
                margin: 0,
                color: gold,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                fontWeight: 700,
              }}>
                {title}
              </h3>
            )}
            {prompt && (
              <p style={{ margin: '4px 0 0', color: textMid, fontSize: '0.875rem', lineHeight: 1.5 }}>
                {prompt}
              </p>
            )}
          </div>
        )}

        <div
          style={{
            display: isGrid ? 'grid' : 'flex',
            flexDirection: isGrid ? undefined : 'column',
            gridTemplateColumns: isGrid ? 'repeat(auto-fit, minmax(220px, 1fr))' : undefined,
            gap: 10,
          }}
        >
          {options.map((opt) => {
            const isSelected = selected === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={opt.disabled || undefined}
                disabled={opt.disabled}
                title={opt.disabled ? opt.disabledReason : undefined}
                onClick={() => !opt.disabled && onSelect?.(opt.id, opt)}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  background: isSelected ? bg3 : 'transparent',
                  color: textHigh,
                  border: `1px solid ${isSelected ? gold : borderDefault}`,
                  borderLeft: `3px solid ${isSelected ? gold : goldDim}`,
                  padding: '12px 14px',
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  opacity: opt.disabled ? 0.5 : 1,
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  transition: 'background 80ms, border-color 80ms',
                }}
                onMouseEnter={(e) => { if (!opt.disabled && !isSelected) { e.currentTarget.style.background = bg3 } }}
                onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.background = 'transparent' } }}
              >
                {opt.icon != null && (
                  <span aria-hidden="true" style={{ flex: '0 0 auto', color: gold, fontSize: '1.25rem', lineHeight: 1.1 }}>
                    {opt.icon}
                  </span>
                )}
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', color: textHigh, fontWeight: 600 }}>
                    {opt.title}
                  </span>
                  {opt.description && (
                    <span style={{ display: 'block', marginTop: 4, color: textMid, fontSize: '0.8125rem', lineHeight: 1.45 }}>
                      {opt.description}
                    </span>
                  )}
                  {opt.consequences && opt.consequences.length > 0 && (
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', marginTop: 6, fontSize: '0.75rem' }}>
                      {opt.consequences.map((c, i) => (
                        <span
                          key={i}
                          style={{
                            color: CONSEQUENCE_COLOR[c.type ?? 'info'],
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span aria-hidden="true">●</span>
                          {c.label}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
