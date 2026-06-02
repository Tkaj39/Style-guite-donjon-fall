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
import { useId } from 'react'
import {
  resolveSpace, resolveContainerWidth,
  bpMobile, bpTablet, bpDesktop, bpWide,
} from './tokens'

const COLS_BREAKPOINTS = { base: 0, sm: bpMobile, md: bpTablet, lg: bpDesktop, xl: bpWide }

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

/* ── Grid ─────────────────────────────────────────────────────────────
   CSS Grid wrapper with N equal-width columns + tokenized gap. For
   responsive column counts pass an object: `cols={{ base: 1, md: 2, lg: 3 }}`
   and we'll build a tiny CSS media query stack via inline <style>. For
   simple uses pass a single number.
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {number|{base?:number, sm?:number, md?:number, lg?:number, xl?:number}} [cols=2]
 *   Either a single column count or an object mapping breakpoint → cols.
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [gap='md']
 * @param {string|number} [rowGap]  Override the row gap (defaults to gap).
 * @param {string|number} [colGap]  Override the column gap (defaults to gap).
 * @param {'start'|'center'|'end'|'stretch'} [alignItems='stretch']
 * @param {string|React.ElementType} [as='div']
 */
export function Grid({
  cols = 2,
  gap = 'md',
  rowGap,
  colGap,
  alignItems = 'stretch',
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}) {
  const rawId = useId()
  const id = `tkajui-grid-${rawId.replace(/:/g, '')}`
  const gapPx = resolveSpace(gap)
  const baseCols = typeof cols === 'number' ? cols : (cols.base ?? 1)

  // Responsive column count via inline media queries.
  const isResponsive = typeof cols === 'object' && cols !== null
  let mediaCss = ''
  if (isResponsive) {
    for (const key of ['sm', 'md', 'lg', 'xl']) {
      if (cols[key] == null) continue
      mediaCss += `@media (min-width: ${COLS_BREAKPOINTS[key]}px){.${id}{grid-template-columns:repeat(${cols[key]},minmax(0,1fr))}}`
    }
  }

  return (
    <>
      {mediaCss && (
        <style href={id} precedence="low">{mediaCss}</style>
      )}
      <Tag
        className={[id, className].filter(Boolean).join(' ')}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${baseCols}, minmax(0, 1fr))`,
          gap: gapPx,
          rowGap: rowGap != null ? resolveSpace(rowGap) : undefined,
          columnGap: colGap != null ? resolveSpace(colGap) : undefined,
          alignItems: resolveAlign(alignItems, 'stretch'),
          ...style,
        }}
        {...rest}
      >
        {children}
      </Tag>
    </>
  )
}

/* ── Container ────────────────────────────────────────────────────────
   Centered page wrapper with consistent max-width + horizontal padding.
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {'sm'|'md'|'lg'|'xl'|'full'|number} [maxWidth='lg']
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [padding='md']
 * @param {string|React.ElementType} [as='div']
 */
export function Container({
  maxWidth = 'lg',
  padding = 'md',
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}) {
  const mw = resolveContainerWidth(maxWidth)
  const pad = resolveSpace(padding)
  return (
    <Tag
      className={className}
      style={{
        maxWidth: mw,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: pad,
        paddingRight: pad,
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ── Box ──────────────────────────────────────────────────────────────
   Generic surface primitive — background, border, padding, radius. The
   color tokens are passed in explicitly (Box lives in tkajui but doesn't
   know about lib-specific surface/border tokens, so the caller imports
   their preferred token and forwards the value).
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {string} [bg]            CSS color (typically a surface/bg token).
 * @param {string} [borderColor]   CSS color (typically a border token).
 * @param {number} [borderWidth=1] Border thickness in px (only applied when borderColor is set).
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [padding='md']
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [paddingX]  Override horizontal padding.
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [paddingY]  Override vertical padding.
 * @param {number} [radius=0]      Border radius in px.
 * @param {string|React.ElementType} [as='div']
 */
export function Box({
  bg,
  borderColor,
  borderWidth = 1,
  padding = 'md',
  paddingX,
  paddingY,
  radius = 0,
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}) {
  const padAll = resolveSpace(padding)
  const padX = paddingX != null ? resolveSpace(paddingX) : padAll
  const padY = paddingY != null ? resolveSpace(paddingY) : padAll
  return (
    <Tag
      className={className}
      style={{
        background: bg,
        border: borderColor ? `${borderWidth}px solid ${borderColor}` : undefined,
        paddingTop: padY,
        paddingBottom: padY,
        paddingLeft: padX,
        paddingRight: padX,
        borderRadius: radius,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ── Spacer ───────────────────────────────────────────────────────────
   Flexible space that fills available room between siblings inside a
   flex parent. Use to push items apart without computing margins.
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {number} [grow=1]  flex-grow value. Higher = takes more space when
 *   competing with other flex children.
 * @param {'horizontal'|'vertical'} [axis]  Optional minimum dimension hint
 *   for non-flex parents. Usually unnecessary inside Inline/Stack.
 */
export function Spacer({ grow = 1, axis, style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: `${grow} ${grow} 0`,
        minWidth: axis === 'horizontal' ? 1 : 0,
        minHeight: axis === 'vertical' ? 1 : 0,
        ...style,
      }}
      {...rest}
    />
  )
}

/* ── Split ────────────────────────────────────────────────────────────
   Two-column (or two-row) layout with an optional divider line between
   the two children. Equal sizing by default; `ratio` lets you skew (e.g.
   `ratio={[1, 3]}` for sidebar:content).
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {'horizontal'|'vertical'} [direction='horizontal']
 * @param {'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|number} [gap='md']
 * @param {string} [dividerColor]  When set, draws a 1px line between children.
 * @param {[number, number]} [ratio=[1, 1]]  Relative size weights for the two slots.
 * @param {string|React.ElementType} [as='div']
 */
export function Split({
  direction = 'horizontal',
  gap = 'md',
  dividerColor,
  ratio = [1, 1],
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}) {
  const isRow = direction === 'horizontal'
  const childArr = Array.isArray(children) ? children : [children]
  const items = childArr.slice(0, 2)
  return (
    <Tag
      className={className}
      style={{
        display: 'flex',
        flexDirection: isRow ? 'row' : 'column',
        gap: resolveSpace(gap),
        alignItems: isRow ? 'stretch' : 'stretch',
        ...style,
      }}
      {...rest}
    >
      {items.map((child, i) => (
        // Split always has fixed 2 slots, so the index IS the stable key.
        <div key={`slot-${i}`} style={{ flex: `${ratio[i] ?? 1} ${ratio[i] ?? 1} 0`, minWidth: 0, minHeight: 0 }}>
          {child}
        </div>
      ))}
      {dividerColor && items.length === 2 && (
        <span
          aria-hidden="true"
          style={{
            background: dividerColor,
            // Position between the two slots — visible via flex order trick.
            order: 1,
            [isRow ? 'width' : 'height']: 1,
            [isRow ? 'alignSelf' : 'justifySelf']: 'stretch',
          }}
        />
      )}
    </Tag>
  )
}

/* ── Center ───────────────────────────────────────────────────────────
   Center content both horizontally and vertically. Most common for
   loading screens, empty states, login forms.
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {string|number} [minHeight]  e.g. '100vh', '50dvh', or px number.
 * @param {string|React.ElementType} [as='div']
 */
export function Center({
  minHeight,
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
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
