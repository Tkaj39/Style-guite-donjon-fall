/**
 * donjon-fall-ui — Herní UI knihovna
 *
 * Importuj tokeny zvlášť:
 *   import { gold, bg2, borderDefault } from './tokens'
 *
 * Nebo CSS custom properties:
 *   @import './donjon.css';  → var(--donjon-gold)
 */

// ── Tlačítka & formuláře ──────────────────────────────────────────────────

/**
 * Primární herní tlačítko s oktagonálním tvarem a zlatým gradientem.
 * @prop {'sm'|'md'|'lg'} size - Velikost (default: 'md')
 * @prop {'default'|'danger'|'success'|'warning'} variant - Barevná varianta
 * @prop {boolean} disabled - Deaktivuje tlačítko
 * @example <DonjonButton variant="default">Nová hra</DonjonButton>
 */
export { default as DonjonButton }      from './DonjonButton'

/**
 * Skupina sousedních herních tlačítek sdílejících okraje.
 * @prop {React.ReactNode} children - Položky musí být DonjonButton
 * @example <DonjonButtonGroup><DonjonButton>A</DonjonButton><DonjonButton>B</DonjonButton></DonjonButtonGroup>
 */
export { default as DonjonButtonGroup } from './DonjonButtonGroup'

/**
 * Herní textový vstup s donjon estetikouou.
 * @prop {string} value - Aktuální hodnota
 * @prop {(v: string) => void} onChange - Callback při změně
 * @prop {string} label - Popisek nad inputem
 * @prop {string} placeholder - Placeholder text
 * @prop {'default'|'danger'|'success'} variant - Stav/barva
 */
export { default as DonjonInput }       from './DonjonInput'

/**
 * Herní HP bar s automatickými barevnými prahy a volitelnými ticky.
 * Barva se automaticky mění: >50% zelená → 25–50% zlatá → <25% červená.
 * @prop {number} value - Aktuální hodnota (0–max)
 * @prop {number} max - Maximum (default: 100)
 * @prop {'sm'|'md'|'lg'} size - Výška baru
 * @prop {string} label - Popisek (např. "HP", "Mana")
 * @prop {boolean} showValue - Zobrazí číselnou hodnotu
 * @prop {number} ticks - Počet dělicích čar (0 = žádné)
 * @prop {boolean} flash - Aktivuje damage flash animaci
 * @prop {'hp'|'mana'|'stamina'|'xp'} variant - Barevný preset (přepisuje threshold logiku)
 * @example <DonjonProgressBar value={72} max={100} label="HP" ticks={10} />
 */
export { default as DonjonProgressBar } from './DonjonProgressBar'

/**
 * Herní slider se zlatým thumbem a tmavou drážkou.
 * @prop {number} value - Aktuální hodnota
 * @prop {(v: number) => void} onChange - Callback při posunu
 * @prop {number} min - Minimum (default: 0)
 * @prop {number} max - Maximum (default: 100)
 * @prop {number} step - Krok (default: 1)
 * @prop {string} label - Popisek
 * @prop {boolean} showValue - Zobrazí aktuální hodnotu
 * @prop {(v: number) => string} formatValue - Formátovací funkce hodnoty
 * @example <DonjonSlider value={volume} onChange={setVolume} label="Hudba" showValue />
 */
export { default as DonjonSlider }      from './DonjonSlider'

/**
 * Herní přepínač on/off se zlatým stavem a tmavou základnou.
 * @prop {boolean} checked - Aktuální stav
 * @prop {(v: boolean) => void} onChange - Callback při přepnutí
 * @prop {string} label - Popisek vedle přepínače
 * @prop {'left'|'right'} labelPosition - Pozice popisku (default: 'right')
 * @prop {'sm'|'md'} size - Velikost
 * @prop {boolean} disabled - Deaktivuje přepínač
 * @example <DonjonToggle checked={sfxOn} onChange={setSfxOn} label="Zvukové efekty" />
 */
export { default as DonjonToggle }      from './DonjonToggle'

/**
 * Herní dropdown s zlatým borderem a tmavým pozadím.
 * @prop {string|number} value - Vybraná hodnota
 * @prop {(v: string|number) => void} onChange - Callback při výběru
 * @prop {Array<{value, label, disabled?}>} options - Možnosti výběru
 * @prop {string} placeholder - Text když nic není vybráno
 * @prop {string} label - Popisek nad dropdownem
 * @prop {'sm'|'md'|'lg'} size - Velikost
 * @example <DonjonSelect value={lang} onChange={setLang} options={[{value:'cs', label:'Čeština'}]} />
 */
export { default as DonjonSelect }      from './DonjonSelect'

// ── Karty & overlaye ─────────────────────────────────────────────────────

/**
 * Herní panel/karta s ornamentálním rámcem a zlatým nadpisem.
 * @prop {string} title - Nadpis karty
 * @prop {'default'|'danger'|'success'|'warning'} variant - Barevná varianta
 * @prop {React.ReactNode} children - Obsah karty
 * @example <DonjonCard title="Výběr akce">obsah</DonjonCard>
 */
export { default as DonjonCard }        from './DonjonCard'

/**
 * Herní modální dialog — přes tmavý overlay s pergamenovým stylem.
 * @prop {boolean} open - Viditelnost modálu
 * @prop {() => void} onClose - Callback při zavření
 * @prop {string} title - Nadpis modálu
 * @prop {React.ReactNode} children - Obsah
 * @prop {React.ReactNode} footer - Tlačítka dole (optional)
 */
export { default as DonjonModal }       from './DonjonModal'

/**
 * Herní tab navigace s ornamentálním shell rámem.
 * @prop {Array<{value, label, icon?, badge?, disabled?}>} items - Definice záložek
 * @prop {string} value - Aktivní hodnota
 * @prop {(value: string) => void} onChange - Callback při změně aktivní záložky
 * @prop {'underline'|'pills'} variant - Vizuální styl tabů
 */
export { default as DonjonTabs }        from './DonjonTabs'

/**
 * Herní tooltip s pergamenovým stylem a zlatým borderem.
 * @prop {React.ReactNode} children - Trigger element
 * @prop {string|React.ReactNode} content - Obsah tooltipu
 * @prop {string} title - Nadpis tooltipu (optional)
 * @prop {'top'|'bottom'|'left'|'right'} placement - Pozice
 * @prop {number} delay - Prodleva zobrazení v ms (default: 120)
 * @example <DonjonTooltip content="Způsobí 3 poškození" title="Útok mečem">...</DonjonTooltip>
 */
export { default as DonjonTooltip }     from './DonjonTooltip'

/**
 * Herní toast notifikace — Provider + hook.
 * Varianty: 'default'(zlatá) | 'gain'(zelená) | 'loss'(červená) | 'warning'(amber) | 'event'(modrá)
 * @example
 * // 1. Wrap aplikace:
 * <DonjonToastProvider><App /></DonjonToastProvider>
 *
 * // 2. V komponentě:
 * const { addToast } = useDonjonToast()
 * addToast({ title: '+5 VP', message: 'Obsadil jsi základnu', variant: 'gain' })
 */
export { ToastProvider as DonjonToastProvider, useToast as useDonjonToast } from './DonjonToast'

// ── Odznaky & ikony ───────────────────────────────────────────────────────

/**
 * Herní odznak/chip s barevnými variantami a ikonou.
 * @prop {'default'|'warning'|'danger'|'success'|'muted'} variant
 * @prop {React.ReactNode} children - Text odznaku
 * @example <DonjonBadge variant="warning">Disabled</DonjonBadge>
 */
export { default as DonjonBadge }       from './DonjonBadge'

/**
 * Herní piktogram — ikona z herní sady s volitelnou barvou.
 * @prop {string} name - Název piktogramu
 * @prop {number} size - Velikost v px (default: 24)
 * @prop {string} color - CSS barva (default: 'currentColor')
 */
export { default as DonjonPictogram }   from './DonjonPictogram'

/**
 * Sada SVG herních ikon: meč, štít, věž.
 * @example import { SwordIcon, ShieldIcon, TowerIcon } from 'donjon-fall-ui'
 */
export { SwordIcon, ShieldIcon, TowerIcon } from './icons'

// ── Herní primitiva ───────────────────────────────────────────────────────

/**
 * HP/mana/stamina bar s vizuálními zónami v pozadí traku.
 * Klíčový rozdíl od DonjonProgressBar: hranice danger/warning zón jsou vždy viditelné
 * — i při plném HP hráč vidí, kam zóny začínají. Hranice na zIndex 2 (viditelné přes fill).
 * @prop {number} value - Aktuální hodnota (0–max)
 * @prop {number} max - Maximum (default: 100)
 * @prop {'hp'|'mana'|'stamina'|'xp'|'shield'|'default'} variant - Typ zdroje
 * @prop {'sm'|'md'|'lg'} size - Výška baru
 * @prop {string} label - Popisek
 * @prop {boolean} showValue - Zobrazí hodnotu/max
 * @prop {boolean} zones - Zobrazí barevná pásma a hranice (default: true)
 * @prop {any} flashKey - Změna hodnoty spustí damage flash animaci (key-change pattern)
 * @example
 * <ResourceBar value={hp} max={100} variant="hp" label="HP" showValue zones />
 * // Damage flash:
 * <ResourceBar value={hp} max={100} flashKey={flashCounter} />
 */
export { default as ResourceBar } from './ResourceBar'

/**
 * Animované číslo pro herní countery — VP, HP, zdroje.
 * Při změně hodnoty: floating delta badge (+N/−N) + krátký flash pozadí.
 * @prop {number} value - Zobrazovaná hodnota
 * @prop {string} label - Popisek
 * @prop {string} prefix - Text před číslem (např. '⚔')
 * @prop {string} suffix - Text za číslem (např. ' VP')
 * @prop {'sm'|'md'|'lg'} size - Velikost
 * @prop {'default'|'vp'|'resource'|'mana'} variant - Barevná varianta
 * @prop {'top'|'bottom'|'left'|'right'} labelPosition - Pozice popisku (default: 'top')
 * @example
 * <NumericDisplay value={vp} label="VP" variant="vp" size="lg" suffix=" bodů" />
 */
export { default as NumericDisplay } from './NumericDisplay'

/**
 * Mini karta hráče — erb, jméno, VP badge, resource bary (HP/mana/stamina).
 * Aktivní stav (isActive): zlatý border + glow — signalizuje "na tahu".
 * @prop {string} name - Jméno hráče
 * @prop {string} color - Barva hráče (hex)
 * @prop {'sword'|'shield'|'tower'} symbol - Symbol erbu (default: 'sword')
 * @prop {number} vp - Vítězné body
 * @prop {number} hp - Aktuální HP (zobrazí HP bar)
 * @prop {number} maxHp - Maximum HP (default: 100)
 * @prop {number} mana - Aktuální mana (zobrazí Mana bar)
 * @prop {number} stamina - Aktuální stamina (zobrazí Stamina bar)
 * @prop {boolean} isActive - Je na tahu (zlatý border)
 * @prop {boolean} eliminated - Hráč vyřazen (opacity 0.45)
 * @prop {'sm'|'md'} size - Velikost karty
 * @example
 * <PlayerPanel name="Hráč 1" color="#4A90E2" vp={7} hp={72} isActive />
 */
export { default as PlayerPanel } from './PlayerPanel'

/**
 * Klikatelná akční dlaždice — ikona, název, popis, cena akce.
 * Jiná než Button: tile tvar (ne strip), ikona-forward, cost badge v rohu, lock stav.
 * @prop {React.ReactNode} icon - Ikona (SVG nebo komponenta)
 * @prop {string} title - Název akce
 * @prop {string} description - Krátký popis (volitelný)
 * @prop {string|number} cost - Cena akce v rohu (volitelná)
 * @prop {boolean} selected - Vybraná dlaždice
 * @prop {boolean} disabled - Neaktivní (nelze použít)
 * @prop {boolean} locked - Zamčená (zobrazí lock ikonu)
 * @prop {'sm'|'md'|'lg'} size - Velikost dlaždice
 * @prop {'default'|'attack'|'move'|'special'} variant - Barevná varianta
 * @example
 * <ActionTile icon={<SwordIcon />} title="Útok" cost="2" selected={sel === 'attack'} onClick={() => setSel('attack')} />
 */
export { default as ActionTile } from './ActionTile'

/**
 * Seznam herních eventů s automatickým scrollem na nejnovější.
 * Typy: gain(zelená) · loss(červená) · event(zlatá) · warning(jantarová) · system(šedá)
 * @prop {Array<{id?, type, text, detail?, round?}>} events - Záznamy logu
 * @prop {number} maxHeight - Max výška scroll kontejneru v px (default: 280)
 * @prop {string} title - Nadpis logu (default: 'Herní log')
 * @prop {boolean} showTitle - Zobrazí hlavičku (default: true)
 * @prop {boolean} showRound - Zobrazí číslo kola (default: true)
 * @prop {boolean} autoScroll - Auto-scroll na nejnovější (default: true)
 * @example
 * <EventLog events={gameLog} maxHeight={320} />
 * // Záznam: { id: '1', type: 'gain', text: '+5 VP', detail: 'Obsadil základnu', round: 3 }
 */
export { default as EventLog } from './EventLog'

/**
 * Ukazatel fáze hry — kroky tahu nebo globální fáze.
 * Splněné fáze: checkmark. Aktuální: zlatá + glow. Budoucí: faint.
 * Spojovací linky vizualizují progress. Lepší než generický Tabs pro herní kontext.
 * @prop {Array<{id, label, icon?, description?}>} phases - Definice fází
 * @prop {string|number} currentPhase - ID aktuální fáze
 * @prop {'horizontal'|'vertical'} orientation - Rozvržení (default: 'horizontal')
 * @prop {'sm'|'md'} size - Velikost
 * @prop {(id) => void} onPhaseClick - Callback při kliknutí (jen splněné fáze)
 * @example
 * <PhaseIndicator phases={FAZE_TAHU} currentPhase="pohyb" />
 * // Fáze: { id: 'pohyb', label: 'Pohyb', icon: <SwordIcon /> }
 */
export { default as PhaseIndicator } from './PhaseIndicator'

// ── Animace & responzivita ────────────────────────────────────────────────

/**
 * Hook pro Web Animations API herní animace.
 * Připoj `ref` na element, pak volej funkce: shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut, victory.
 * @returns {{ ref, shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut, victory }}
 * @example
 * const { ref, shake, pop } = useGameAnimation()
 * <div ref={ref}>...</div>
 * // Při neúspěchu:
 * onClick={() => shake()}
 * // Při spawnu:
 * useEffect(() => pop(), [])
 */
export { default as useGameAnimation } from './useGameAnimation'

/**
 * Hook pro responzivní breakpointy — vrací aktuální šířku a příznaky isMobile/isTablet/isDesktop.
 * @returns {{ width, isMobile, isTablet, isDesktop, isWide, isTouch }}
 * @example
 * const { isMobile, isTouch } = useBreakpoint()
 * <div style={{ flexDirection: isMobile ? 'column' : 'row' }}>
 *   <ActionTile size={isTouch ? 'lg' : 'md'} />
 * </div>
 */
export { default as useBreakpoint } from './useBreakpoint'

/**
 * Wrapper pro enter/exit animace — montuje/demontuje children s animací.
 * Presety: 'fadeScale' | 'slideUp' | 'slideDown' | 'pop' | 'fade' | 'slideLeft'
 * @prop {boolean} show - Viditelný stav
 * @prop {'fadeScale'|'slideUp'|'slideDown'|'pop'|'fade'|'slideLeft'} preset - Animace
 * @prop {number} [duration=300] - Délka v ms
 * @prop {() => void} [onExited] - Callback po odstranění z DOM
 * @example
 * <GameTransition show={isOpen} preset="slideUp">
 *   <PlayerPanel name="Hráč 1" />
 * </GameTransition>
 */
export { default as GameTransition, gameTransitionPresets } from './GameTransition'

// ── Herní assety ──────────────────────────────────────────────────────────

/**
 * Hexagonální dlaždice herního plánu.
 * @prop {'empty'|'base'|'focal-active'|'focal-passive'|'selected'|'move'|'attack'} state - Vizuální stav
 * @prop {'sm'|'md'|'lg'} size - Velikost dlaždice
 * @prop {string} playerColor - Barva hráče (hex) — zobrazí se v base a focal stavech
 * @example <HexTile state="focal-active" playerColor="#4A90E2" size="md" />
 */
export { default as HexTile }           from './HexTile'

/**
 * Plocha kostky — SVG zobrazení hodnoty 1–6.
 * @prop {1|2|3|4|5|6} value - Hodnota kostky
 * @prop {'sm'|'md'|'lg'} size - Velikost
 * @prop {string} playerColor - Barva hráče (tónuje pozadí)
 * @example <DieFace value={6} size="md" playerColor="#C84A4A" />
 */
export { default as DieFace }           from './DieFace'

/**
 * Plovoucí herní feedback — animuje se nahoru a zmizí za 700 ms.
 * POZOR: Parent musí mít position: relative.
 * @prop {string} text - Zobrazovaný text ("+1", "−1 HP", "+1 VP")
 * @prop {'gain'|'loss'|'vp'|'neutral'} variant - Barevná varianta
 * @prop {boolean} visible - Pokud false, element není v DOM
 * @prop {string|number} animKey - Změna restartuje animaci
 * @prop {() => void} onDone - Callback po skončení animace
 * @example
 * <div style={{ position: 'relative' }}>
 *   <HexTile />
 *   <FloatFeedback text="+1 VP" variant="vp" visible={visible} animKey={key} onDone={() => setVisible(false)} />
 * </div>
 */
export { default as FloatFeedback }     from './FloatFeedback'

// ── Heraldika ─────────────────────────────────────────────────────────────

/**
 * Heraldický štít hráče a PlayerIdentityBadge karta.
 * @example
 * import { Shield, PlayerIdentityBadge } from 'donjon-fall-ui'
 * <Shield playerColor="#4A90E2" symbol="sword" size={48} />
 * <PlayerIdentityBadge name="Hráč 1" color="#4A90E2" vp={7} />
 */
export { Shield, PlayerIdentityBadge }  from './Erb'

// ── Dekorace ─────────────────────────────────────────────────────────────

/**
 * Dekorativní rohová ozdoba — L-bracket, dot, diamond nebo cross.
 * Umisťuje se absolutně; ostatní rohy přes CSS transform: scaleX(-1), scaleY(-1), scale(-1).
 * @prop {number} size - Rozměr v px (default: 16)
 * @prop {string} color - CSS barva (default: 'currentColor')
 * @prop {'bracket'|'dot'|'diamond'|'cross'} variant - Tvar
 * @prop {'cut'|'round'|'scoop'} cornerType - Geometrie lokte (jen bracket)
 * @example
 * <CornerOrnament size={14} color={goldDim} style={{ position: 'absolute', top: 5, left: 5 }} />
 */
export { default as CornerOrnament }    from './CornerOrnament'

/**
 * Vertikální dekorativní lišta — umístí se na levý/pravý okraj panelu.
 * Parent musí mít position: relative. Vždy předej unikátní uid (useId()).
 * @prop {number} h - Výška v px
 * @prop {string} uid - Unikátní ID prefix (pro SVG gradienty)
 * @prop {boolean} flip - Zrcadlí pro pravou stranu
 *
 * Horizontální dekorativní lišta — umístí se na horní/dolní okraj.
 * @prop {string} uid - Unikátní ID prefix
 * @prop {boolean} flip - Otočí pro spodní okraj
 * @prop {number} edgePadL - Odsazení vnější čáry zleva (default: 16)
 */
export { SideOrnament, HexOrnament, ScoopOrnament, HrotErbu } from './Ornaments'

// ── Tokeny ────────────────────────────────────────────────────────────────

/**
 * Design tokeny jako JS konstanty.
 * @example import { gold, goldDim, bg2, textHigh, borderDefault } from 'donjon-fall-ui/tokens'
 */
export * from './tokens'
