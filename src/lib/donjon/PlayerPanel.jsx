/* ── PlayerPanel ───────────────────────────────────────────────────────────
   Mini karta hráče — erb, jméno, VP, resource bary.
   Aktivní stav: zlatý border + glow (signalizuje: na tahu).
   ─────────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { Shield } from './Erb'
import ResourceBar from './ResourceBar'
import DonjonBadge from './DonjonBadge'
import { RohOrnament } from './Ornaments'
import { octagon } from '../../utils/octagon'
import {
  gold, goldDim,
  bg2, bg3, bg4,
  borderDefault,
  textHigh, textMid, textLow, dangerColor, infoColor,
} from './tokens'

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

export default function PlayerPanel({
  name,
  color          = infoColor,
  symbol         = 'sword',   // 'sword' | 'shield' | 'tower'
  vp             = 0,
  hp,
  maxHp          = 100,
  mana,
  maxMana        = 100,
  stamina,
  maxStamina     = 100,
  isActive       = false,     // je na tahu
  eliminated     = false,
  size           = 'md',
  ornament       = 'plain',   // 'plain' | 'decorated'
  style,
  className,
}) {
  const uid          = useId().replace(/:/g, '')
  const s            = SIZES[size] ?? SIZES.md
  const hasOrnaments = ornament === 'decorated'
  const borderColor  = isActive ? goldDim : borderDefault

  const inner = (
    <div
      style={{
        position: 'relative',
        background: isActive ? bg4 : bg3,
        ...(hasOrnaments ? {
          clipPath: octagon(CX - 1),
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
      {/* Rohové ornamentální závorky */}
      {hasOrnaments && <RohOrnament h={66} uid={`${uid}l`} />}
      {hasOrnaments && <RohOrnament h={66} uid={`${uid}r`} flip />}

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
      <div style={{ display: 'flex', alignItems: 'center', gap: s.gap, marginBottom: hp != null || mana != null ? 10 : 0 }}>
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
      {(hp != null || mana != null || stamina != null) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {hp != null && (
            <ResourceBar
              value={hp} max={maxHp}
              variant="hp" size={s.barSize}
              label="HP" showValue zones
            />
          )}
          {mana != null && (
            <ResourceBar
              value={mana} max={maxMana}
              variant="mana" size={s.barSize}
              label="Mana" showValue zones={false}
            />
          )}
          {stamina != null && (
            <ResourceBar
              value={stamina} max={maxStamina}
              variant="stamina" size={s.barSize}
              label="Stam" showValue zones={false}
            />
          )}
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
