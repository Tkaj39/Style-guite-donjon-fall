/* ── PlayerPanel ───────────────────────────────────────────────────────────
   Mini karta hráče — erb, jméno, VP, resource bary.
   Aktivní stav: zlatý border + glow (signalizuje: na tahu).

   Dvě API:
     1) Flat props (backward compat) — hp, maxHp, mana, maxMana, stamina, maxStamina
     2) Composition (preferované) — <PlayerPanel><PlayerPanel.Resource ... /></PlayerPanel>
        Otevřené pro libovolné herní zdroje (sanity, hunger, ...).
   ─────────────────────────────────────────────────────────────────────── */
import { Children, isValidElement, useId } from 'react'
import { Shield } from './Erb'
import ResourceBar from './ResourceBar'
import DonjonBadge from './DonjonBadge'
import { RohOrnament, ornamentHForCx } from './Ornaments'
import { octagon, octagonInner } from '../../utils/octagon'
import {
  gold, goldDim,
  bg2, bg3, bg4,
  borderDefault,
  textHigh, textMid, textLow, dangerColor, infoColor,
} from './tokens'

/* ── PlayerPanel.Resource — composition slot pro herní zdroj ── */
function Resource() { return null }  // Marker komponenta, render obstará PlayerPanel
Resource.displayName = 'PlayerPanel.Resource'

const SIZES = {
  sm: {
    padding: '10px 12px', gap: 8, shieldSize: 28,
    nameFontSize: '0.8125rem', fontSize: '0.6875rem',
    barSize: 'sm',
  },
  md: {
    padding: '14px 16px', gap: 10, shieldSize: 36,
    nameFontSize: '0.9375rem', fontSize: '0.75rem',
    barSize: 'sm',
  },
}

const CX = 14

function PlayerPanel({
  name,
  color          = infoColor,
  symbol         = 'sword',   // 'sword' | 'shield' | 'tower'
  vp             = 0,
  // DEPRECATED flat props — preferuj <PlayerPanel.Resource> children
  hp,
  maxHp          = 100,
  mana,
  maxMana        = 100,
  stamina,
  maxStamina     = 100,
  isActive       = false,     // je na tahu
  eliminated     = false,
  size           = 'md',
  ornament       = 'decorated', // 'plain' | 'decorated'
  children,
  style,
  className,
}) {
  const uid          = useId().replace(/:/g, '')
  const s            = SIZES[size] ?? SIZES.md
  const hasOrnaments = ornament === 'decorated'
  const borderColor  = isActive ? goldDim : borderDefault

  // Resource sběr: composition children mají přednost; flat props jsou fallback
  const resourcesFromChildren = Children.toArray(children)
    .filter(c => isValidElement(c) && c.type === Resource)
    .map(c => c.props)

  const flatResources = []
  if (hp != null)      flatResources.push({ variant: 'hp',      value: hp,      max: maxHp,      label: 'HP',   zones: true,  showValue: true })
  if (mana != null)    flatResources.push({ variant: 'mana',    value: mana,    max: maxMana,    label: 'Mana', zones: false, showValue: true })
  if (stamina != null) flatResources.push({ variant: 'stamina', value: stamina, max: maxStamina, label: 'Stam', zones: false, showValue: true })

  const resources = resourcesFromChildren.length > 0 ? resourcesFromChildren : flatResources

  const inner = (
    <div
      style={{
        position: 'relative',
        background: isActive ? bg4 : bg3,
        ...(hasOrnaments ? {
          clipPath: octagonInner(CX),
        } : {
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          boxShadow: isActive ? `0 0 12px ${goldDim}33, 0 0 4px ${goldDim}22` : 'none',
        }),
        padding: s.padding,
        transition: 'background 0.2s',
        opacity: eliminated ? 0.45 : 1,
        ...(!hasOrnaments ? style : {}),
      }}
      className={!hasOrnaments ? className : undefined}
    >
      {/* Rohové ornamentální závorky — výška škálovaná dle CX (šířka ≈ CX) */}
      {hasOrnaments && <RohOrnament h={ornamentHForCx(CX, 'roh')} uid={`${uid}l`} />}
      {hasOrnaments && <RohOrnament h={ornamentHForCx(CX, 'roh')} uid={`${uid}r`} flip />}

      {/* Aktivní indikátor — zlatá tečka vlevo nahoře */}
      {isActive && (
        <div style={{
          position: 'absolute', top: 8, left: 8,
          width: 6, height: 6, borderRadius: '50%',
          background: gold,
          boxShadow: `0 0 6px ${gold}99`,
        }} />
      )}

      {/* Hlavní řádek: erb + info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: s.gap, marginBottom: resources.length > 0 ? 10 : 0 }}>
        <Shield playerColor={color} symbol={symbol} size={s.shieldSize} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
            <span style={{
              fontSize: s.nameFontSize,
              fontWeight: 700,
              color: isActive ? textHigh : textMid,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}>
              {name}
            </span>
            <DonjonBadge variant={isActive ? 'default' : 'muted'}>
              {vp} VP
            </DonjonBadge>
          </div>

          {eliminated && (
            <span style={{ fontSize: '0.6875rem', color: dangerColor, letterSpacing: '0.08em', fontWeight: 600 }}>
              VYŘAZEN
            </span>
          )}
        </div>
      </div>

      {/* Resource bary */}
      {resources.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {resources.map((r, i) => (
            <ResourceBar
              key={i}
              value={r.value} max={r.max}
              variant={r.variant} size={r.size ?? s.barSize}
              label={r.label} showValue={r.showValue ?? true}
              zones={r.zones ?? (r.variant === 'hp')}
              flashKey={r.flashKey}
            />
          ))}
        </div>
      )}
    </div>
  )

  if (!hasOrnaments) return inner

  return (
    <div
      style={{
        clipPath: octagon(CX),
        background: borderColor,
        padding: 1,
        filter: isActive ? `drop-shadow(0 0 12px ${goldDim}33) drop-shadow(0 0 4px ${goldDim}22)` : undefined,
        transition: 'background 0.2s, filter 0.2s',
        opacity: eliminated ? 0.45 : 1,
        ...style,
      }}
      className={className}
    >
      {inner}
    </div>
  )
}

PlayerPanel.Resource = Resource

export default PlayerPanel
