/**
 * LibraryLogo — značka pro rozlišení knihoven.
 *
 * Wrapper kolem ikon `DonjonLogoIcon` / `TkajuiLogoIcon` z `lib/donjon/icons`:
 *   - poskytne `currentColor` přes inline style
 *   - vyřeší a11y (`title` → role+aria-label, jinak aria-hidden)
 *   - jednotný `display: block` + `flex-shrink: 0` na svg
 *
 * Pokud chceš jen raw ikonu (bez tinting a a11y wrapperu), importuj přímo
 * `DonjonLogoIcon` / `TkajuiLogoIcon` z `donjon/icons` a použij přes
 * `<Pictogram icon={…}>` nebo `<DonjonPictogram icon={…}>`.
 *
 * @param {'tkajui'|'donjon'} brand   - Která knihovna
 * @param {number}             size   - Px velikost (default 24)
 * @param {string}             color  - Barva siluety (default '#FABF84' = favicon zlatá)
 * @param {string}             title  - Accessible name (jinak aria-hidden)
 *
 * @example
 * <LibraryLogo brand="tkajui" size={32} />
 * <LibraryLogo brand="donjon" size={40} color={gold} title="donjon-fall-ui" />
 */
import { DonjonLogoIcon, TkajuiLogoIcon } from '../lib/donjon/icons'

export default function LibraryLogo({
  brand,
  size = 24,
  color = '#FABF84',
  title,
}) {
  const Icon = brand === 'donjon' ? DonjonLogoIcon : TkajuiLogoIcon
  const ariaProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': 'true' }

  return (
    <span
      style={{ display: 'inline-flex', color, flexShrink: 0, lineHeight: 0 }}
      {...ariaProps}
    >
      {title && <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{title}</span>}
      <Icon width={size} height={size} />
    </span>
  )
}
