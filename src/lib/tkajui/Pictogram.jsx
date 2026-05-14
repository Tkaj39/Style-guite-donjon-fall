/**
 * Pictogram — generický SVG icon wrapper (TkajUI)
 *
 * Přijme libovolnou SVG komponentu jako `icon` prop a vykreslí ji
 * ve správné velikosti a barvě. Bez pozadí, bez dekorace — čistý icon.
 *
 * @param {React.ComponentType} icon   - SVG komponenta (přijímá width, height, color)
 * @param {'sm'|'md'|'lg'|'xl'}  size  - výchozí 'md'
 * @param {string}               color - CSS color, výchozí 'currentColor'
 * @param {string}               className
 * @param {object}               style
 *
 * @example
 * <Pictogram icon={SwordIcon} size="lg" color="#FFC183" />
 */

const SIZES = { sm: 16, md: 24, lg: 32, xl: 48 }

export default function Pictogram({ icon: Icon, size = 'md', color = 'currentColor', className, style = {} }) {
  const px = SIZES[size] ?? SIZES.md

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
