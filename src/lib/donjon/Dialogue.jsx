/* ── Dialogue (donjon-fall-ui) ───────────────────────────────────────
   NPC speech panel — portrait (optional) + name + body text + optional
   list of choices. Donjon-themed: gold border, octagon clip, bg2 fill.

   For multi-step conversations drive `text` from your own dialogue
   engine; this component is purely presentational.
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../../utils/octagon'
import { bg2, bg3, gold, goldDim, textHigh, textMid, borderDefault } from './tokens'
import Avatar from '../tkajui/Avatar'
import Button from '../tkajui/Button'

/**
 * @typedef {object} DialogueChoice
 * @prop {string} id
 * @prop {React.ReactNode} label
 * @prop {React.ReactNode} [hint]  Side-effect/consequence preview.
 * @prop {boolean} [disabled]
 * @prop {() => void} [onClick]
 */

/**
 * @param {string} [portraitSrc]    URL of portrait. Omit for icon-only or text-only.
 * @param {React.ReactNode} [portrait]  Override the portrait slot (e.g. <FramedImage>).
 * @param {string} name             Speaker name.
 * @param {React.ReactNode} text    Body of the speech.
 * @param {DialogueChoice[]} [choices]
 * @param {React.ReactNode} [footer]  Slot below choices (Continue / Skip).
 * @param {'left'|'right'} [portraitSide='left']
 */
export default function Dialogue({
  portraitSrc,
  portrait,
  name,
  text,
  choices = [],
  footer,
  portraitSide = 'left',
  className,
  style,
  ...rest
}) {
  const cx = 14
  const portraitNode = portrait ?? (portraitSrc
    ? <Avatar src={portraitSrc} size="lg" shape="octagon" name={name} />
    : null)

  return (
    <div
      role="dialog"
      aria-label={`${name} speaks`}
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
          padding: 20,
          display: 'flex',
          gap: 16,
          flexDirection: portraitSide === 'right' ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          minHeight: 120,
        }}
      >
        {portraitNode && (
          <div style={{ flex: '0 0 auto' }}>{portraitNode}</div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: gold,
            fontWeight: 700,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: 0.6,
            marginBottom: 4,
          }}>
            {name}
          </div>
          <div style={{
            color: textHigh,
            fontSize: '0.9375rem',
            lineHeight: 1.55,
            fontStyle: 'italic',
          }}>
            “{text}”
          </div>
          {choices.length > 0 && (
            <ul style={{
              listStyle: 'none',
              margin: '14px 0 0',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              {choices.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    disabled={c.disabled}
                    onClick={c.onClick}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: bg3,
                      color: c.disabled ? textMid : textHigh,
                      border: `1px solid ${borderDefault}`,
                      borderLeft: `3px solid ${goldDim}`,
                      padding: '10px 14px',
                      cursor: c.disabled ? 'not-allowed' : 'pointer',
                      opacity: c.disabled ? 0.55 : 1,
                      fontFamily: 'inherit',
                      fontSize: '0.875rem',
                      transition: 'border-color 80ms, background 80ms',
                    }}
                    onMouseEnter={(e) => { if (!c.disabled) { e.currentTarget.style.borderLeftColor = gold } }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = goldDim }}
                  >
                    <span style={{ color: gold, marginRight: 8, fontWeight: 700 }}>{i + 1}.</span>
                    <span>{c.label}</span>
                    {c.hint && (
                      <span style={{ display: 'block', marginTop: 4, color: textMid, fontSize: '0.75rem', fontStyle: 'italic' }}>
                        → {c.hint}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {footer && <div style={{ marginTop: 14 }}>{footer}</div>}
        </div>
      </div>
    </div>
  )
}

Dialogue.Continue = function DialogueContinue({ onClick, children = 'Continue' }) {
  return <Button variant="success" onClick={onClick}>{children}</Button>
}
