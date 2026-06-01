/**
 * Pictogram — generic SVG icon wrapper (TkajUI)
 *
 * Accepts any SVG component as the `icon` prop and renders it at the
 * correct size and color. No background, no decoration — pure icon.
 *
 * @param {React.ComponentType} icon   - SVG component (accepts width, height, color)
 * @param {'sm'|'md'|'lg'|'xl'}  size  - default 'md'
 * @param {string}               color - CSS color, default 'currentColor'
 * @param {string}               className
 * @param {object}               style
 *
 * @example
 * <Pictogram icon={SwordIcon} size="lg" color="#FFC183" />
 */

const SIZES = { sm: 16, md: 24, lg: 32, xl: 48 }

export default function Pictogram({ icon: Icon, size = 'md', color = 'currentColor', className, style = {} }) {
  const px = SIZES[size] ?? SIZES.md

  if (!Icon) return null

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color, ...style }}
    >
      <Icon width={px} height={px} />
    </span>
  )
}

export { SIZES }
