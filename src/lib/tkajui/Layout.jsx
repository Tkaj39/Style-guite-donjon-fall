/* ── Layout primitives (tkajui) ────────────────────────────────────────
   Three small flex-based wrappers that cover ~90 % of "I just need a row
   / column with consistent spacing" cases. All three accept the same
   spacing token (xs/sm/md/lg/xl/xxl, or a raw px number) so layouts read
   uniformly across the codebase.

   <Stack>   — vertical column with gap. Cross-axis stretches by default.
   <Inline>  — horizontal row with gap. Does NOT wrap by default.
   <Cluster> — horizontal row with gap that DOES wrap (chips, tags, badges).

   Purely structural — no colors, no clip-paths, no themed visuals — so
   they live in TkajUI (base) and are re-exported by donjon-fall-ui
   unchanged.
   ─────────────────────────────────────────────────────────────────────── */
import { resolveSpace } from './tokens'

const ALIGN_MAP = {
  start:   'flex-start',
  center:  'center',
  end:     'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

const JUSTIFY_MAP = {
  start:   'flex-start',
  center:  'center',
  end:     'flex-end',
  between: 'space-between',
  around:  'space-around',
  evenly:  'space-evenly',
}

function resolveAlign(value, fallback) {
  return ALIGN_MAP[value] ?? fallback
}

function resolveJustify(value, fallback) {
  return JUSTIFY_MAP[value] ?? fallback
}

/* ── Stack ────────────────────────────────────────────────────────────
   Vertical column. Children stack top-to-bottom with `gap` between.
   ─────────────────────────────────────────────────────────────────── */
/**
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [gap='md']
 * @param {'start'|'center'|'end'|'stretch'|'baseline'} [align='stretch']
 *   Cross-axis (horizontal) alignment of children.
 * @param {'start'|'center'|'end'|'between'|'around'|'evenly'} [justify='start']
 *   Main-axis (vertical) distribution.
 * @param {string|React.ElementType} [as='div'] - HTML tag / component to render.
 */
export function Stack({
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}) {
  return (
    <Tag
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: resolveSpace(gap),
        alignItems: resolveAlign(align, 'stretch'),
        justifyContent: resolveJustify(justify, 'flex-start'),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ── Inline ───────────────────────────────────────────────────────────
   Horizontal row. Does NOT wrap by default (overflow scrolls / hides).
   Use Cluster when you want auto-wrapping (chips, tags).
   ─────────────────────────────────────────────────────────────────── */
/**
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [gap='md']
 * @param {'start'|'center'|'end'|'stretch'|'baseline'} [align='center']
 *   Cross-axis (vertical) alignment of children.
 * @param {'start'|'center'|'end'|'between'|'around'|'evenly'} [justify='start']
 *   Main-axis (horizontal) distribution.
 * @param {boolean} [wrap=false] - Allow children to wrap to the next line.
 * @param {string|React.ElementType} [as='div']
 */
export function Inline({
  gap = 'md',
  align = 'center',
  justify = 'start',
  wrap = false,
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}) {
  return (
    <Tag
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: resolveSpace(gap),
        alignItems: resolveAlign(align, 'center'),
        justifyContent: resolveJustify(justify, 'flex-start'),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ── Cluster ──────────────────────────────────────────────────────────
   Horizontal row that wraps automatically. Useful for chip / tag / badge
   collections where item count varies and you want clean line wraps.
   Functionally Inline with wrap=true and a sensible default align.
   ─────────────────────────────────────────────────────────────────── */
/**
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [gap='sm']
 * @param {'start'|'center'|'end'|'stretch'|'baseline'} [align='center']
 * @param {'start'|'center'|'end'|'between'|'around'|'evenly'} [justify='start']
 * @param {string|React.ElementType} [as='div']
 */
export function Cluster({
  gap = 'sm',
  align = 'center',
  justify = 'start',
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}) {
  return (
    <Tag
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: resolveSpace(gap),
        alignItems: resolveAlign(align, 'center'),
        justifyContent: resolveJustify(justify, 'flex-start'),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
