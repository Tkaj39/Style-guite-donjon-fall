/**
 * donjon-fall-ui — Game UI library
 *
 * Import tokens separately:
 *   import { gold, bg2, borderDefault } from './tokens'
 *
 * Or as CSS custom properties:
 *   @import './donjon.css';  → var(--donjon-gold)
 */

// ── Buttons & form controls ──────────────────────────────────────────────

/**
 * Primary game button with an octagonal shape and a gold gradient.
 * @prop {'sm'|'md'|'lg'} size - Size (default: 'md')
 * @prop {'default'|'danger'|'success'|'warning'} variant - Color variant
 * @prop {boolean} disabled - Disables the button
 * @example <DonjonButton variant="default">New Game</DonjonButton>
 */
export { default as DonjonButton }      from './DonjonButton'

/**
 * Submit button wired to React 19 `useFormStatus`. Must live inside
 * a `<form>` — automatically shows a spinner and disables itself
 * while the form action is pending.
 * @prop {string} [loadingLabel]  Text shown while pending. Defaults to children.
 * @prop {...DonjonButtonProps}   Everything DonjonButton accepts.
 * @example
 *   <form action={save}>
 *     <DonjonInput name="name" />
 *     <DonjonSubmitButton loadingLabel="Saving…">Save</DonjonSubmitButton>
 *   </form>
 */
export { default as DonjonSubmitButton } from './DonjonSubmitButton'

// ── Form niche (extends TkajUI TextArea / NumberInput / Combobox) ─────

/**
 * Game variant of TextArea — thin wrapper around DonjonInput with
 * multiline=true. Picks up the donjon octagon shell + gold focus +
 * field-sizing:content auto-grow from DonjonInput.
 */
export { default as DonjonTextArea }     from './DonjonTextArea'

/**
 * Game variant of NumberInput — − / + stepper with bgDeep buttons +
 * gold glyphs sitting inside a donjon octagon shell. Same controlled
 * value / min / max / step / precision / partial-typing behavior as
 * the TkajUI NumberInput.
 */
export { default as DonjonNumberInput }  from './DonjonNumberInput'

/**
 * Game variant of Combobox — searchable single-select with parchment
 * panel (bg2 on gold border, octagon clip), gold selected ✓ + bg3
 * highlight row, CloseIcon clear button. Same keyboard behavior
 * (ArrowUp/Down, Enter, Esc, Backspace-clear) as TkajUI Combobox.
 */
export { default as DonjonCombobox }     from './DonjonCombobox'

/**
 * A group of adjacent game buttons sharing borders.
 * @prop {React.ReactNode} children - Items must be DonjonButton
 * @example <DonjonButtonGroup><DonjonButton>A</DonjonButton><DonjonButton>B</DonjonButton></DonjonButtonGroup>
 */
export { default as DonjonButtonGroup } from './DonjonButtonGroup'

/**
 * Game-themed text input with the donjon aesthetic.
 * @prop {string} value - Current value
 * @prop {(v: string) => void} onChange - Change callback
 * @prop {string} label - Label above the input
 * @prop {string} placeholder - Placeholder text
 * @prop {'default'|'danger'|'success'} variant - State/color
 */
export { default as DonjonInput }       from './DonjonInput'

/**
 * Game HP bar with automatic color thresholds and optional ticks.
 * The color changes automatically: >50% green → 25–50% gold → <25% red.
 * @prop {number} value - Current value (0–max)
 * @prop {number} max - Maximum (default: 100)
 * @prop {'sm'|'md'|'lg'} size - Bar height
 * @prop {string} label - Label (e.g. "HP", "Mana")
 * @prop {boolean} showValue - Render the numeric value
 * @prop {number} ticks - Tick count (0 = none)
 * @prop {boolean} flash - Triggers a damage flash animation
 * @prop {'hp'|'mana'|'stamina'|'xp'} variant - Color preset (overrides threshold logic)
 * @example <DonjonProgressBar value={72} max={100} label="HP" ticks={10} />
 */
export { default as DonjonProgressBar } from './DonjonProgressBar'

/**
 * Game-themed slider with a gold thumb and dark groove.
 * @prop {number} value - Current value
 * @prop {(v: number) => void} onChange - Change callback
 * @prop {number} min - Minimum (default: 0)
 * @prop {number} max - Maximum (default: 100)
 * @prop {number} step - Step (default: 1)
 * @prop {string} label - Label
 * @prop {boolean} showValue - Render the current value
 * @prop {(v: number) => string} formatValue - Value formatter
 * @example <DonjonSlider value={volume} onChange={setVolume} label="Music" showValue />
 */
export { default as DonjonSlider }      from './DonjonSlider'

/**
 * Game-themed on/off switch with a gold state and dark base.
 * @prop {boolean} checked - Current state
 * @prop {(v: boolean) => void} onChange - Toggle callback
 * @prop {string} label - Label next to the switch
 * @prop {'left'|'right'} labelPosition - Label position (default: 'right')
 * @prop {'sm'|'md'} size - Size
 * @prop {boolean} disabled - Disables the switch
 * @example <DonjonToggle checked={sfxOn} onChange={setSfxOn} label="Sound effects" />
 */
export { default as DonjonToggle }      from './DonjonToggle'

/**
 * Game-themed dropdown with a gold border and dark background.
 * @prop {string|number} value - Selected value
 * @prop {(v: string|number) => void} onChange - Selection callback
 * @prop {Array<{value, label, disabled?}>} options - Options
 * @prop {string} placeholder - Text shown when nothing is selected
 * @prop {string} label - Label above the dropdown
 * @prop {'sm'|'md'|'lg'} size - Size
 * @example <DonjonSelect value={lang} onChange={setLang} options={[{value:'cs', label:'Czech'}]} />
 */
export { default as DonjonSelect }      from './DonjonSelect'

// ── Cards & overlays ────────────────────────────────────────────────────

/**
 * Game-themed panel/card with an ornamental frame and gold title.
 * @prop {string} title - Card title
 * @prop {'default'|'danger'|'success'|'warning'} variant - Color variant
 * @prop {React.ReactNode} children - Card content
 * @example <DonjonCard title="Choose action">content</DonjonCard>
 */
export { default as DonjonCard }        from './DonjonCard'

/**
 * Game-themed modal dialog — atop a dark overlay with a parchment style.
 * @prop {boolean} open - Modal visibility
 * @prop {() => void} onClose - Close callback
 * @prop {string} title - Modal title
 * @prop {React.ReactNode} children - Content
 * @prop {React.ReactNode} footer - Buttons at the bottom (optional)
 */
export { default as DonjonModal }       from './DonjonModal'

/**
 * Game-themed tab navigation inside an ornamental shell frame.
 * @prop {Array<{value, label, icon?, badge?, disabled?}>} items - Tab definitions
 * @prop {string} value - Active value
 * @prop {(value: string) => void} onChange - Callback when the active tab changes
 * @prop {'underline'|'pills'} variant - Visual tab style
 */
export { default as DonjonTabs }        from './DonjonTabs'

/**
 * Game-themed notched menu — panel with V-notched cutouts along the top
 * edge, each holding a tab or action item. Compound API:
 * `<DonjonNotchMenu><DonjonNotchMenu.Item>...</DonjonNotchMenu.Item><DonjonNotchMenu.Body>...</DonjonNotchMenu.Body></DonjonNotchMenu>`
 * @prop {string|null} value - Active tab value
 * @prop {(value: string) => void} onChange - Tab-change callback
 */
export { default as DonjonNotchMenu }    from './DonjonNotchMenu'

// ── Disclosure group (extends TkajUI Drawer / DropdownMenu / Accordion) ──

/**
 * Game variant of Drawer — bg2 panel on a gold rail, gold uppercase
 * title, CloseIcon dismiss. Same slide-in / focus-trap / ESC behavior
 * as TkajUI Drawer.
 */
export { default as DonjonDrawer }       from './DonjonDrawer'

/**
 * Game variant of DropdownMenu — gold-trimmed trigger, parchment menu
 * panel (bg2 on gold border), gold-tinted icons, bg3 hover rows.
 * Behaviorally identical to TkajUI DropdownMenu.
 */
export { default as DonjonDropdownMenu } from './DonjonDropdownMenu'

/**
 * Game variant of Accordion — octagonal gold shell (border-trick clip),
 * gold left rail on the open section, gold title + chevron, bgDeep
 * content panel. Same single/multi expand + controlled/uncontrolled
 * API as TkajUI Accordion.
 */
export { default as DonjonAccordion }    from './DonjonAccordion'

// ── Navigation group (extends TkajUI Breadcrumb / Pagination / ContextMenu) ──

/**
 * Game variant of Breadcrumb — gold current page label, goldDim
 * separator (›), textMid hover links. No octagon shell — breadcrumb
 * is inline text, no card surface to clip. Same items / linkComponent
 * API as TkajUI Breadcrumb.
 */
export { default as DonjonBreadcrumb }   from './DonjonBreadcrumb'

/**
 * Game variant of Pagination — each page chip is an octagonal tile
 * via the border-trick. Current page = gold-filled octagon
 * (parchment seal); non-current = bg2 + goldDim outline; prev/next
 * chevrons in the same style. Same range builder / controlled API
 * as TkajUI Pagination.
 */
export { default as DonjonPagination }   from './DonjonPagination'

/**
 * Game variant of ContextMenu — parchment popover panel: bg2 inner
 * panel on a full gold border, octagonal clip via the border-trick,
 * gold-tinted icons, bg3 row hover. Same right-click / outside-click
 * / ESC / viewport-clamp behavior as TkajUI ContextMenu.
 */
export { default as DonjonContextMenu }  from './DonjonContextMenu'

// ── Data display group (extends TkajUI Table / List / DescriptionList / Stat) ──

/**
 * Game variant of Table — octagonal gold shell (border-trick),
 * bgDeep header strip with gold uppercase labels, gold sort arrow,
 * goldDim row dividers, bg3 hover. Same columns / data / sort API
 * as TkajUI Table.
 */
export { default as DonjonTable }            from './DonjonTable'

/**
 * Game variant of List — octagonal gold shell, goldDim dividers,
 * gold-tinted leading icon, 3-px gold left rail + gold title on
 * the selected row (mirrors DonjonAccordion). Same items / sizes
 * API as TkajUI List.
 */
export { default as DonjonList }             from './DonjonList'

/**
 * Game variant of DescriptionList — gold uppercase terms (parchment
 * header feel), textHigh descriptions, goldDim row dividers. Same
 * inline / stacked layout API as TkajUI DescriptionList.
 */
export { default as DonjonDescriptionList }  from './DonjonDescriptionList'

/**
 * Game variant of Stat — gold uppercase label, gold value
 * (parchment-numeral feel), donjon gain/danger delta colors,
 * goldDim hint. For animated game counters use NumericDisplay.
 */
export { default as DonjonStat }             from './DonjonStat'

// ─── Layout primitives (re-export from TkajUI base) ────────────────────
// Stack / Inline / Cluster are purely structural — no themed visuals — so
// donjon-fall-ui re-exports them unchanged. Users can write
// `import { Stack, DonjonButton } from 'donjon-fall-ui'` without juggling
// two package imports.
export { Stack, Inline, Cluster, Grid, Container, Box, Spacer, Split, Center, AspectBox } from '../tkajui/Layout'
export { default as Avatar } from '../tkajui/Avatar'

/**
 * FramedImage — image inside a donjon ornamental frame (octagon + gold border
 * + SideOrnament + RohOrnament accents). Game-themed, donjon-only.
 * @prop {string} src
 * @prop {'xs'|'sm'|'md'|'lg'|'xl'|number} size
 * @prop {'decorated'|'plain'} ornament
 */
export { default as FramedImage } from './FramedImage'

// ── Gameplay group ──────────────────────────────────────────────────────
export { default as Dialogue }         from './Dialogue'
export { default as ChoicePanel }      from './ChoicePanel'
export { default as RewardPopup }      from './RewardPopup'
export { default as AchievementToast } from './AchievementToast'
export { default as LevelUp }          from './LevelUp'

// ── Game-specific layout group ─────────────────────────────────────────
export { default as HUDLayout }    from './HUDLayout'
export { default as Scoreboard }   from './Scoreboard'
export { default as Leaderboard }  from './Leaderboard'
export { default as Cooldown }     from './Cooldown'
export { default as Minimap }      from './Minimap'
export { default as Timeline }     from './Timeline'
export { default as Sprite }       from './Sprite'

// ─── Form primitives (re-exported from tkajui) ──────────────────────────
// Field + Form are purely structural (no themed visuals) → reused as-is.
// Radio / Checkbox keep the tkajui re-export for back-compat in code that
// already imports them under the bare names; the donjon-themed versions
// live under DonjonRadio / DonjonCheckbox below (diamond shape, variants
// in parity with DonjonSlider / DonjonToggle).
export { Field, Form, Radio, RadioGroup, Checkbox, CheckboxGroup } from '../tkajui/Form'

/**
 * Game variant of Radio + RadioGroup — diamond-shaped (square rotated 45°)
 * with gold gradient + glow when selected, matching the DonjonSlider thumb
 * aesthetic. Variant-aware: default / danger / success / warning / info.
 * Same standalone + group context API as the TkajUI primitives.
 */
export { DonjonRadio, DonjonRadioGroup, DonjonCheckbox, DonjonCheckboxGroup } from './DonjonForm'
export { default as TextArea }    from '../tkajui/TextArea'
export { default as NumberInput } from '../tkajui/NumberInput'

/**
 * Game-themed tooltip with a parchment style and gold border.
 * @prop {React.ReactNode} children - Trigger element
 * @prop {string|React.ReactNode} content - Tooltip content
 * @prop {string} title - Tooltip title (optional)
 * @prop {'top'|'bottom'|'left'|'right'} placement - Position
 * @prop {number} delay - Show delay in ms (default: 120)
 * @example <DonjonTooltip content="Deals 3 damage" title="Sword attack">...</DonjonTooltip>
 */
export { default as DonjonTooltip }     from './DonjonTooltip'

/**
 * Game-themed toast notifications — Provider + hook.
 * Variants: 'default'(gold) | 'gain'(green) | 'loss'(red) | 'warning'(amber) | 'event'(blue)
 * @example
 * // 1. Wrap the app:
 * <DonjonToastProvider><App /></DonjonToastProvider>
 *
 * // 2. In a component:
 * const { addToast } = useDonjonToast()
 * addToast({ title: '+5 VP', message: 'You captured a base', variant: 'gain' })
 */
export { ToastProvider as DonjonToastProvider, useToast as useDonjonToast } from './DonjonToast'

// ── Badges & icons ───────────────────────────────────────────────────────

/**
 * Game-themed badge/chip with color variants and an icon slot.
 * @prop {'default'|'warning'|'danger'|'success'|'muted'} variant
 * @prop {React.ReactNode} children - Badge text
 * @example <DonjonBadge variant="warning">Disabled</DonjonBadge>
 */
export { default as DonjonBadge }       from './DonjonBadge'

/**
 * Game-themed pictogram — an icon from the game set with an optional color.
 * @prop {string} name - Pictogram name
 * @prop {number} size - Size in px (default: 24)
 * @prop {string} color - CSS color (default: 'currentColor')
 */
export { default as DonjonPictogram }   from './DonjonPictogram'

/**
 * The SVG game icon set — 39 icons across 8 categories:
 *   - Resources: HeartIcon, DropIcon, BoltIcon
 *   - Actions:   SwordIcon, ShieldIcon, MoveIcon, TargetIcon, MagicIcon, BombIcon
 *   - State:     StarIcon, CrownIcon, DiceIcon, HourglassIcon, TowerIcon,
 *                CastleIcon, FireIcon
 *   - Loot:      PotionIcon, GemIcon, KeyIcon, ScrollIcon, SkullIcon, LockIcon
 *   - Stats:     TrophyIcon, SparkleIcon, StrengthIcon, IntelligenceIcon
 *   - Map:       HexIcon, BaseIcon, FocalPointIcon,
 *                FocalPointActiveIcon, FocalPointPassiveIcon
 *   - Mechanics: PushIcon, OccupyIcon, EncirclementIcon,
 *                TowerCollapseIcon, SuddenDeathIcon, TurnOrderIcon
 *   - Brand:     DonjonLogoIcon, TkajuiLogoIcon (library marks, mirror favicon)
 * @example import { SwordIcon, HexIcon, DonjonLogoIcon } from 'donjon-fall-ui'
 */
export {
  HeartIcon, DropIcon, BoltIcon,
  SwordIcon, ShieldIcon, MoveIcon, TargetIcon, MagicIcon, BombIcon,
  StarIcon, CrownIcon, DiceIcon, HourglassIcon, TowerIcon, CastleIcon, FireIcon,
  // Loot / inventory
  PotionIcon, GemIcon, KeyIcon, ScrollIcon, SkullIcon, LockIcon,
  // Stats / achievements
  TrophyIcon, SparkleIcon, StrengthIcon, IntelligenceIcon,
  HexIcon, BaseIcon, FocalPointIcon, FocalPointActiveIcon, FocalPointPassiveIcon,
  PushIcon, OccupyIcon, EncirclementIcon, TowerCollapseIcon, SuddenDeathIcon, TurnOrderIcon,
  DonjonLogoIcon, TkajuiLogoIcon,
} from './icons'

// ── Game primitives ─────────────────────────────────────────────────────

/**
 * HP/mana/stamina bar with visual zones painted into the track.
 * Key difference from DonjonProgressBar: the danger/warning zone boundaries
 * are always visible — even at full HP the player sees where the zones start.
 * Boundaries are at zIndex 2 (visible over the fill).
 * @prop {number} value - Current value (0–max)
 * @prop {number} max - Maximum (default: 100)
 * @prop {'hp'|'mana'|'stamina'|'xp'|'shield'|'default'} variant - Resource type
 * @prop {'sm'|'md'|'lg'} size - Bar height
 * @prop {string} label - Label
 * @prop {boolean} showValue - Render value/max
 * @prop {boolean} zones - Render colored bands and boundaries (default: true)
 * @prop {any} flashKey - A change in value triggers the damage flash animation (key-change pattern)
 * @example
 * <ResourceBar value={hp} max={100} variant="hp" label="HP" showValue zones />
 * // Damage flash:
 * <ResourceBar value={hp} max={100} flashKey={flashCounter} />
 */
export { default as ResourceBar } from './ResourceBar'

/**
 * Animated number for game counters — VP, HP, resources.
 * When the value changes: a floating delta badge (+N/−N) + a brief background flash.
 * @prop {number} value - Displayed value
 * @prop {string} label - Label
 * @prop {string} prefix - Text before the number (e.g. '⚔')
 * @prop {string} suffix - Text after the number (e.g. ' VP')
 * @prop {'sm'|'md'|'lg'} size - Size
 * @prop {'default'|'vp'|'resource'|'mana'} variant - Color variant
 * @prop {'top'|'bottom'|'left'|'right'} labelPosition - Label position (default: 'top')
 * @example
 * <NumericDisplay value={vp} label="VP" variant="vp" size="lg" suffix=" pts" />
 */
export { default as NumericDisplay } from './NumericDisplay'

/**
 * Mini player card — coat of arms, name, VP badge, resource bars (HP/mana/stamina).
 * Active state (isActive): gold border + glow — signals "on turn".
 * @prop {string} name - Player name
 * @prop {string} color - Player color (hex)
 * @prop {'sword'|'shield'|'tower'} symbol - Crest symbol (default: 'sword')
 * @prop {number} vp - Victory points
 * @prop {number} hp - Current HP (renders the HP bar)
 * @prop {number} maxHp - Maximum HP (default: 100)
 * @prop {number} mana - Current mana (renders the Mana bar)
 * @prop {number} stamina - Current stamina (renders the Stamina bar)
 * @prop {boolean} isActive - On turn (gold border)
 * @prop {boolean} eliminated - Player eliminated (opacity 0.45)
 * @prop {'sm'|'md'} size - Card size
 * @example
 * <PlayerPanel name="Player 1" color="#4D8FE0" vp={7} hp={72} isActive />
 */
export { default as PlayerPanel } from './PlayerPanel'

/**
 * Clickable action tile — icon, title, description, action cost.
 * Different from Button: tile shape (not strip), icon-forward, cost badge in the corner, lock state.
 * @prop {React.ReactNode} icon - Icon (SVG or component)
 * @prop {string} title - Action title
 * @prop {string} description - Short description (optional)
 * @prop {string|number} cost - Action cost shown in the corner (optional)
 * @prop {boolean} selected - Selected tile
 * @prop {boolean} disabled - Inactive (cannot be used)
 * @prop {boolean} locked - Locked (renders a lock icon)
 * @prop {'sm'|'md'|'lg'} size - Tile size
 * @prop {'default'|'attack'|'move'|'special'} variant - Color variant
 * @example
 * <ActionTile icon={<SwordIcon />} title="Attack" cost="2" selected={sel === 'attack'} onClick={() => setSel('attack')} />
 */
export { default as ActionTile } from './ActionTile'

/**
 * List of game events with auto-scroll to the most recent.
 * Types: gain(green) · loss(red) · event(gold) · warning(amber) · system(grey)
 * @prop {Array<{id?, type, text, detail?, round?}>} events - Log entries
 * @prop {number} maxHeight - Max scroll container height in px (default: 280)
 * @prop {string} title - Log title (default: 'Game log')
 * @prop {boolean} showTitle - Render the header (default: true)
 * @prop {boolean} showRound - Render the round number (default: true)
 * @prop {boolean} autoScroll - Auto-scroll to newest (default: true)
 * @example
 * <EventLog events={gameLog} maxHeight={320} />
 * // Entry: { id: '1', type: 'gain', text: '+5 VP', detail: 'Captured base', round: 3 }
 */
export { default as EventLog } from './EventLog'

/**
 * Game phase indicator — turn steps or global phases.
 * Completed phases: checkmark. Current: gold + glow. Future: faint.
 * Connecting lines visualize progress. Better than a generic Tabs for game context.
 * @prop {Array<{id, label, icon?, description?}>} phases - Phase definitions
 * @prop {string|number} currentPhase - ID of the current phase
 * @prop {'horizontal'|'vertical'} orientation - Layout (default: 'horizontal')
 * @prop {'sm'|'md'} size - Size
 * @prop {(id) => void} onPhaseClick - Click callback (only for completed phases)
 * @example
 * <PhaseIndicator phases={TURN_PHASES} currentPhase="move" />
 * // Phase: { id: 'move', label: 'Move', icon: <SwordIcon /> }
 */
export { default as PhaseIndicator } from './PhaseIndicator'

// ── Animation & responsive ──────────────────────────────────────────────

/**
 * Hook for Web Animations API game animations.
 * Attach `ref` to an element, then call: shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut, victory.
 * @returns {{ ref, shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut, victory }}
 * @example
 * const { ref, shake, pop } = useGameAnimation()
 * <div ref={ref}>...</div>
 * // On failure:
 * onClick={() => shake()}
 * // On spawn:
 * useEffect(() => pop(), [])
 */
export { default as useGameAnimation } from './useGameAnimation'

/**
 * Hook for responsive breakpoints — returns current width plus
 * isMobile/isTablet/isDesktop flags.
 * @returns {{ width, isMobile, isTablet, isDesktop, isWide, isTouch }}
 * @example
 * const { isMobile, isTouch } = useBreakpoint()
 * <div style={{ flexDirection: isMobile ? 'column' : 'row' }}>
 *   <ActionTile size={isTouch ? 'lg' : 'md'} />
 * </div>
 */
export { default as useBreakpoint } from './useBreakpoint'

/**
 * Wrapper for enter/exit animations — mounts/unmounts children with an animation.
 * Presets: 'fadeScale' | 'slideUp' | 'slideDown' | 'pop' | 'fade' | 'slideLeft'
 * @prop {boolean} show - Visible state
 * @prop {'fadeScale'|'slideUp'|'slideDown'|'pop'|'fade'|'slideLeft'} preset - Animation
 * @prop {number} [duration=300] - Duration in ms
 * @prop {() => void} [onExited] - Callback after removal from the DOM
 * @example
 * <GameTransition show={isOpen} preset="slideUp">
 *   <PlayerPanel name="Player 1" />
 * </GameTransition>
 */
export { default as GameTransition, gameTransitionPresets } from './GameTransition'

// ── Game assets ─────────────────────────────────────────────────────────

/**
 * Hexagonal tile for the game board. Three orthogonal axes:
 *   `property` = what the cell IS  (empty / focal / base)
 *   `focal`    = focal sub-state   (active / passive)  — game-logic, only for property='focal'
 *   `state`    = player interaction (default / selected / move / attack / blocked)
 * @prop {'empty'|'focal'|'base'} property - Cell role
 * @prop {'active'|'passive'} focal - Focal sub-state (only when property='focal')
 * @prop {'default'|'selected'|'move'|'attack'|'blocked'} state - Interaction state
 * @prop {'sm'|'md'|'lg'} size - Tile size
 * @prop {string} owner - Player color (hex) — used when property="base"
 * @example <HexTile property="focal" focal="active" size="md" />
 * @example <HexTile property="focal" focal="active" state="selected" />
 * @example <HexTile property="base" owner={player.color} />
 */
export { default as HexTile } from './HexTile'
// Enums live in ./tokens (already re-exported below via `export * from './tokens'`).

/**
 * Die face — SVG rendering for values 1–6.
 * @prop {1|2|3|4|5|6} value - Die value
 * @prop {'sm'|'md'|'lg'} size - Size
 * @prop {string} playerColor - Player color (tints the background)
 * @example <DieFace value={6} size="md" playerColor="#E05C5C" />
 */
export { default as DieFace }           from './DieFace'

/**
 * Stacked dice forming a "tower" — the core game piece of Donjon Fall.
 * Each die has its own value (1–6) and playerColor; bottom die is the
 * foundation, top die's owner controls the tower. Mixed colors = a
 * captured / contested tower.
 *
 * Two independent hover targets:
 *   • TOP die (controlling die) — fires `onTopHover` / `onTopClick`
 *   • REST of the stack         — fires `onTowerHover` / `onTowerClick`
 * Mutually exclusive: hovering the top die does NOT count as a tower
 * hover.
 *
 * @prop {Array<{value, playerColor?, state?}>} dice  Stack bottom → top.
 * @prop {'xs'|'sm'|'md'|'lg'} size                   Die size.
 * @prop {boolean} selected                           Highlights the top die.
 * @prop {React.ReactNode} label                       Caption under the tower.
 * @prop {boolean} showBase                            Adds a faint ground shadow.
 * @prop {(hovered: boolean) => void} onTopHover      Cursor enter/leave on the top die.
 * @prop {(hovered: boolean) => void} onTowerHover    Cursor enter/leave on lower peeks.
 * @prop {(e: MouseEvent) => void}    onTopClick      Click on the top die.
 * @prop {(e: MouseEvent) => void}    onTowerClick    Click on lower peeks (or whole tower if splitHover=false).
 * @prop {boolean} splitHover                          (default true) Set false on touch UIs — top die and lower
 *                                                     peeks merge into one hover/click target; the "die vs tower"
 *                                                     choice is offered via visible buttons elsewhere.
 *
 * @example
 *   import { DiceTower, red, blue } from 'donjon-fall-ui'
 *   <DiceTower
 *     dice={[
 *       { value: 4, playerColor: red },
 *       { value: 2, playerColor: red },
 *       { value: 6, playerColor: blue },   // captured!
 *     ]}
 *     onTopHover={(h) => setTopHover(h)}
 *     onTowerHover={(h) => setTowerHover(h)}
 *     onTopClick={() => attackTopOwner()}
 *     onTowerClick={() => inspectTowerHistory()}
 *   />
 */
export { default as DiceTower }         from './DiceTower'

/**
 * Floating game feedback — animates upward and disappears after 700 ms.
 * NOTE: The parent must have position: relative.
 * @prop {string} text - Displayed text ("+1", "−1 HP", "+1 VP")
 * @prop {'gain'|'loss'|'vp'|'neutral'} variant - Color variant
 * @prop {boolean} visible - When false, the element is not in the DOM
 * @prop {string|number} animKey - A change restarts the animation
 * @prop {() => void} onDone - Callback when the animation ends
 * @example
 * <div style={{ position: 'relative' }}>
 *   <HexTile />
 *   <FloatFeedback text="+1 VP" variant="vp" visible={visible} animKey={key} onDone={() => setVisible(false)} />
 * </div>
 */
export { default as FloatFeedback }     from './FloatFeedback'

// ── Heraldry ────────────────────────────────────────────────────────────

/**
 * Heraldic player shield (Erb) and the PlayerIdentityBadge card.
 * @example
 * import { Shield, PlayerIdentityBadge } from 'donjon-fall-ui'
 * <Shield playerColor="#4D8FE0" symbol="sword" size={48} />
 * <PlayerIdentityBadge name="Player 1" color="#4D8FE0" vp={7} />
 */
export { Shield, PlayerIdentityBadge }  from './Erb'

// ── Decorations ─────────────────────────────────────────────────────────

/**
 * Decorative corner ornament — L-bracket, dot, diamond or cross.
 * Positioned absolutely; other corners via CSS transform: scaleX(-1), scaleY(-1), scale(-1).
 * @prop {number} size - Size in px (default: 16)
 * @prop {string} color - CSS color (default: 'currentColor')
 * @prop {'bracket'|'dot'|'diamond'|'cross'} variant - Shape
 * @prop {'cut'|'round'|'scoop'} cornerType - Elbow geometry (bracket only)
 * @example
 * <CornerOrnament size={14} color={goldDim} style={{ position: 'absolute', top: 5, left: 5 }} />
 */
export { default as CornerOrnament }    from './CornerOrnament'

/**
 * Vertical decorative side ornament — placed on the left/right edge of a panel.
 * The parent must have position: relative. Always pass a unique uid (useId()).
 * @prop {number} h - Height in px
 * @prop {string} uid - Unique ID prefix (for SVG gradients)
 * @prop {boolean} flip - Mirrors for the right side
 *
 * Horizontal decorative ornament — placed on the top/bottom edge.
 * @prop {string} uid - Unique ID prefix
 * @prop {boolean} flip - Flips for the bottom edge
 * @prop {number} edgePadL - Offset of the outer line from the left (default: 16)
 */
export { SideOrnament, HexOrnament, ScoopOrnament, HrotErbu } from './Ornaments'

// ── Tokens ──────────────────────────────────────────────────────────────

/**
 * Design tokens exposed as JS constants.
 * @example import { gold, goldDim, bg2, textHigh, borderDefault } from 'donjon-fall-ui/tokens'
 */
export * from './tokens'

/**
 * Player palette — 6 player colors, each in 3 variants (primary/light/dark).
 * Single source of truth — shared by the ColorsPage demo and the game UI components.
 * @example
 * import { red, blueDark, playerColors, playerColorsByKey } from 'donjon-fall-ui'
 * <Shield playerColor={red} />
 * <HexTile playerColor={playerColors[0].primary} />
 * <Erb playerColor={playerColorsByKey.blue.primary} />
 */
export * from './playerColors'

// Prop enum values (lists of valid prop values like 'xs'|'sm'|'md'|'lg').
// Naming convention: <COMPONENT>_<PROP>_VALUES. See ./enums.js for the full list.
export * from './enums'
