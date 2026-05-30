/**
 * LibraryBadges — značky knihoven vedle Sidebar položek.
 *
 * Renderuje 0, 1 nebo 2 SVG loga podle hodnoty `library`:
 *   - 'tkajui' → TkajuiLogoIcon
 *   - 'donjon' → DonjonLogoIcon
 *   - 'both'   → obě vedle sebe (TkajUI první, donjon druhý)
 *   - undefined/null → nic
 *
 * Velikost a barevné tinting jsou jednotné napříč Sidebarem.
 * Pro a11y: `aria-label` souhrnně místo per-logo, ať screen reader neopakuje.
 *
 * @param {'tkajui'|'donjon'|'both'} library
 * @param {number} size - px velikost loga (default 11 — sidebar)
 *
 * @example
 * <LibraryBadges library="tkajui" />
 * <LibraryBadges library="both" size={12} />
 */
import { TkajuiLogoIcon, DonjonLogoIcon } from '../lib/donjon/icons'
import { gold } from '../lib/donjon/tokens'

// TkajUI brand color v cross-library kontextu — Sidebar zobrazuje obě
// knihovny vedle sebe a potřebuje brand barvu mimo donjon paletu.
// (ESLint rule donjon/no-hardcoded-hex není v src/styleguide aktivní.)
const TKAJUI_BRAND = '#7BAED4'

export default function LibraryBadges({ library, size = 11 }) {
  if (!library) return null

  const showTkajui = library === 'tkajui' || library === 'both'
  const showDonjon = library === 'donjon' || library === 'both'

  if (!showTkajui && !showDonjon) return null

  const ariaLabel =
    library === 'both' ? 'TkajUI a donjon-fall-ui'
    : library === 'tkajui' ? 'TkajUI'
    : 'donjon-fall-ui'

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        flexShrink: 0,
        lineHeight: 0,
      }}
    >
      {showTkajui && (
        <span style={{ display: 'inline-flex', color: TKAJUI_BRAND }}>
          <TkajuiLogoIcon width={size} height={size} />
        </span>
      )}
      {showDonjon && (
        <span style={{ display: 'inline-flex', color: gold }}>
          <DonjonLogoIcon width={size} height={size} />
        </span>
      )}
    </span>
  )
}
