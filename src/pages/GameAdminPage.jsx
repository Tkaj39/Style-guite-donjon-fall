/* ── GameAdminPage ─────────────────────────────────────────────────────────
   QA/debug surface that mirrors the game screen and lets an admin
   manipulate the turn phase, die values and die positions. TkajUI
   (cool-blue) tooling panel on the right, warm-gold donjon game view on
   the left inside a desktop DeviceFrame. Not production gameplay. */
import { useMemo, useState } from 'react'
import { ShowcasePage, Section } from '../styleguide/ShowcasePage'
import DeviceFrame from '../styleguide/DeviceFrame'
import VPCounter from '../lib/donjon/VPCounter'
import ActionBar from '../lib/donjon/ActionBar'
import { playerColors } from '../lib/donjon/playerColors'
import {
  MoveIcon, SwordIcon, ShieldIcon,
  TowerIcon, TowerCollapseIcon, RerollIcon,
} from '../lib/donjon/icons'
import Card from '../lib/tkajui/Card'
import { textMid, textLow, surface2, borderDefault } from '../lib/tkajui/tokens'

import EditableGameBoard from './game-admin/EditableGameBoard'
import AdminPhaseTool from './game-admin/AdminPhaseTool'
import AdminDieEditorBar from './game-admin/AdminDieEditorBar'
import DieChipPicker from './game-admin/DieChipPicker'

const FAZE_TAHU = [
  { id: 'pohyb',  label: 'Pohyb' },
  { id: 'akce',   label: 'Akce' },
  { id: 'souboj', label: 'Souboj' },
  { id: 'konec',  label: 'Konec' },
]

const p1 = playerColors[0]
const p2 = playerColors[1]
const PLAYER_ICONS = [<SwordIcon />, <ShieldIcon />]

/* ── Initial board ────────────────────────────────────────────────────────
   Same structure as ScreensPage BOARD_ROWS, trimmed for the editable
   surface: base cells carry dice; focal cells stay focal; everything else
   is empty. */
const _ = (state, opts = {}) => ({ state, ...opts })
const E = () => _('empty')
const FP_ACT = () => ({ property: 'focal', focal: 'active'  })
const FP_PAS = () => ({ property: 'focal', focal: 'passive' })
const B1 = (v) => ({ property: 'base', owner: p1.primary, die: { v, c: p1.primary } })
const B2 = (v) => ({ property: 'base', owner: p2.primary, die: { v, c: p2.primary } })

const INITIAL_BOARD = [
  [B1(5), B1(4), B1(3), B1(2), B1(1)],
  [E(), E(), E(), E(), E(), E()],
  [E(), E(), E(), E(), E(), E(), E()],
  [E(), E(), E(), E(), E(), E(), E(), E()],
  [E(), FP_PAS(), E(), E(), FP_ACT(), E(), E(), FP_PAS(), E()],
  [E(), E(), E(), E(), E(), E(), E(), E()],
  [E(), E(), E(), E(), E(), E(), E()],
  [E(), E(), E(), E(), E(), E()],
  [B2(1), B2(2), B2(3), B2(4), B2(5)],
]

const SCREEN_ACTIONS = [
  { label: 'Pohyb kostky', icon: <MoveIcon />,          variant: 'move'    },
  { label: 'Pohyb věže',   icon: <TowerIcon />,         variant: 'default' },
  { label: 'Kolaps věže',  icon: <TowerCollapseIcon />, variant: 'attack'  },
  { label: 'Přehazování',  icon: <RerollIcon />,        variant: 'special' },
]

function dieId(row, col) { return `d-${row}-${col}` }

/* Flatten the board into a list of dice with their current position +
   stable id derived from (row, col). Used by both admin tools and for
   mapping the chip picker's selection back to a board cell. */
function collectDice(board) {
  const out = []
  for (let r = 0; r < board.length; r++) {
    const row = board[r]
    for (let c = 0; c < row.length; c++) {
      const cell = row[c]
      if (cell.die) {
        out.push({
          id: dieId(r, c),
          row: r,
          col: c,
          value: cell.die.v,
          playerColor: cell.die.c,
        })
      }
    }
  }
  return out
}

/* Attach stable ids onto each cell's die so EditableGameBoard can match
   the selected chip to the correct cell by id (robust against the board
   being re-indexed while a die moves). */
function withDieIds(board) {
  return board.map((row, r) =>
    row.map((cell, c) => (
      cell.die
        ? { ...cell, die: { ...cell.die, id: dieId(r, c) } }
        : cell
    ))
  )
}

export default function GameAdminPage() {
  const [turn, setTurn] = useState(3)
  const [phase, setPhase] = useState('akce')
  const [board, setBoard] = useState(INITIAL_BOARD)
  const [selectedDieId, setSelectedDieId] = useState(null)
  const [isPlacingDie, setIsPlacingDie] = useState(false)
  // Active player — 0 = P1 red, 1 = P2 blue.
  const [activePlayerIdx] = useState(0)

  const boardWithIds = useMemo(() => withDieIds(board), [board])
  const dice = useMemo(() => collectDice(boardWithIds), [boardWithIds])
  const selectedDie = useMemo(
    () => dice.find(d => d.id === selectedDieId) ?? null,
    [dice, selectedDieId]
  )

  const scorePlayers = [
    { id: 1, color: p1.primary, vp: 3, icon: PLAYER_ICONS[0], active: activePlayerIdx === 0 },
    { id: 2, color: p2.primary, vp: 2, icon: PLAYER_ICONS[1], active: activePlayerIdx === 1 },
  ]
  const phaseLabel = FAZE_TAHU.find(f => f.id === phase)?.label ?? phase

  const handlePhaseChange = (next) => {
    setPhase(next)
  }

  // Decode id → (row, col) rather than relying on indexOf (cells with
  // equal shape could collide).
  const setDieValue = (id, value) => {
    const match = /^d-(\d+)-(\d+)$/.exec(id)
    if (!match) return
    const [, rs, cs] = match
    const r = Number(rs)
    const c = Number(cs)
    setBoard(prev => prev.map((row, ri) =>
      ri !== r ? row : row.map((cell, ci) => (
        ci !== c || !cell.die
          ? cell
          : { ...cell, die: { ...cell.die, v: value } }
      ))
    ))
  }

  const handleCellClick = (row, col) => {
    const target = board[row]?.[col]
    if (!target) return

    // Placement mode: try to move the selected die to an empty cell.
    if (isPlacingDie && selectedDieId != null) {
      // Only empty cells (non-base, no die) accept a placement.
      if (target.property === 'base' || target.die) return

      const match = /^d-(\d+)-(\d+)$/.exec(selectedDieId)
      if (!match) return
      const fromR = Number(match[1])
      const fromC = Number(match[2])
      if (fromR === row && fromC === col) {
        setIsPlacingDie(false)
        return
      }

      const fromCell = board[fromR][fromC]
      if (!fromCell?.die) return

      setBoard(prev => prev.map((r, ri) =>
        r.map((cell, ci) => {
          if (ri === fromR && ci === fromC) {
            // Leave the owner tint behind so the base hex keeps its player
            // color, but the die itself has moved on.
            const { die: _die, ...rest } = cell
            return rest
          }
          if (ri === row && ci === col) {
            return {
              ...cell,
              die: { v: fromCell.die.v, c: fromCell.die.c },
            }
          }
          return cell
        })
      ))
      // New id after the move:
      setSelectedDieId(dieId(row, col))
      setIsPlacingDie(false)
      return
    }

    // Idle mode: click on a cell with a die selects it. Click on an
    // empty cell clears the selection.
    if (target.die) {
      setSelectedDieId(dieId(row, col))
    } else {
      setSelectedDieId(null)
    }
  }

  const resetBoard = () => {
    setBoard(INITIAL_BOARD)
    setSelectedDieId(null)
    setIsPlacingDie(false)
  }

  return (
    <ShowcasePage
      library="donjon"
      title="Game Admin"
      description="QA/debug surface mirroring the herní obrazovku. Umožňuje měnit číslo tahu, fázi, hodnoty jednotlivých kostek a jejich pozice přímo na plánu."
    >
      <Section
        id="prehled"
        title="Admin panel"
        description="Nahoře nástroj pro posloupnost tahů (ovládá celý výhled), vlevo editovatelná obrazovka v DeviceFrame, vpravo tooling pro manipulaci s kostkami v TkajUI paletě (studené modré = debug nástroje) oproti teplé zlaté hře."
      >
        {/* TOP — turn / phase control (full width) */}
        <div id="phase" style={{ marginBottom: 16 }}>
          <Card title="Posloupnost tahů">
            <div style={{ padding: 16 }}>
              <AdminPhaseTool
                phases={FAZE_TAHU}
                currentPhase={phase}
                onPhaseChange={handlePhaseChange}
                turn={turn}
                onTurnChange={setTurn}
              />
            </div>
          </Card>
        </div>

        <div style={{
          display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap',
        }}>
          {/* LEFT — editable game view with in-frame dice sidebar */}
          <div style={{ flex: '1 1 480px', minWidth: 480 }}>
            <DeviceFrame type="desktop">
              <MiniScoreHeader
                players={scorePlayers}
                turn={turn}
                phaseLabel={phaseLabel}
                activeIdx={activePlayerIdx}
              />
              {/* Board + in-game dice sidebar — fills the vertical space
                  between the score header and the bottom strip. */}
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                gap: 12,
                padding: '8px 8px 0',
                minHeight: 0,
              }}>
                <div style={{
                  flex: 1, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <EditableGameBoard
                    board={boardWithIds}
                    selectedDieId={selectedDieId}
                    isPlacing={isPlacingDie}
                    onCellClick={handleCellClick}
                  />
                </div>
                <div id="dice" style={{
                  flex: '0 0 auto',
                  width: 170,
                  display: 'flex', flexDirection: 'column',
                  gap: 6,
                  padding: '6px 6px 10px',
                  background: `${surface2}dd`,
                  border: `1px solid ${borderDefault}`,
                  borderRadius: 6,
                  overflow: 'auto',
                }}>
                  <p style={{
                    margin: 0, padding: '2px 4px',
                    fontSize: '0.5625rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: textMid,
                  }}>
                    Kostky na plánu
                  </p>
                  <DieChipPicker
                    dice={dice}
                    selectedDieId={selectedDieId}
                    onSelectDie={(id) => { setSelectedDieId(id); setIsPlacingDie(false) }}
                    columns={2}
                  />
                </div>
              </div>
              {/* Bottom strip — context-sensitive.
                  No die selected → normal MiniActionRow.
                  Die selected    → inline value + position editor. */}
              {selectedDie
                ? <AdminDieEditorBar
                    die={selectedDie}
                    isPlacing={isPlacingDie}
                    onChangeValue={(v) => setDieValue(selectedDieId, v)}
                    onStartPlacing={() => setIsPlacingDie(true)}
                    onCancelPlacing={() => setIsPlacingDie(false)}
                    onDeselect={() => { setSelectedDieId(null); setIsPlacingDie(false) }}
                  />
                : <MiniActionRow />}
            </DeviceFrame>
          </div>

          {/* RIGHT — just the reset button, help text */}
          <div style={{
            position: 'sticky', top: 16,
            display: 'flex', flexDirection: 'column', gap: 16,
            flex: '0 0 auto',
            minWidth: 240, maxWidth: 320, width: 280,
          }}>
            <Card title="Ovládání">
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: textLow, lineHeight: 1.4 }}>
                  Vyber kostku kliknutím na plán nebo v seznamu na obrazovce vpravo.
                  Dole se objeví volby pro hodnotu a pozici.
                </p>
              </div>
            </Card>

            <div>
              <button
                type="button"
                onClick={resetBoard}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: surface2,
                  border: `1px solid ${borderDefault}`,
                  color: textMid,
                  borderRadius: 4,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Reset plánu
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="info"
        title="Debug surface — ne produkční gameplay"
        description="Tato stránka slouží k rychlému nastavení herního stavu pro vývojové testování (snapshot scén, animací, ladění herní logiky). Změny se neukládají a nejsou napojené na herní pravidla — pohyb kostky zde nespouští souboj, změna hodnoty neovlivní skóre, fáze jsou volně přepínatelné mimo pořadí."
      >
        <ul style={{
          margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 6,
          fontSize: '0.8125rem', color: textLow,
        }}>
          <li>Posloupnost tahů — number input + PhaseIndicator s kliky na puntíky.</li>
          <li>Hodnota kostky — vyber kostku v chipu a klikni 1–6.</li>
          <li>Pozice kostky — vyber kostku, klikni „Vybrat novou pozici“ a pak na cílový hex. Obsazené a základnové hexy jsou nepovolené.</li>
        </ul>
      </Section>
    </ShowcasePage>
  )
}

/* ── Inlined mini surface pieces ─────────────────────────────────────────
   Trimmed copies of the ScreensPage helpers so GameAdminPage can parametrize
   turn / phase / active player per-render (ScreensPage uses module-level
   constants). */

const MAX_VP = 5

function MiniScoreHeader({ players, turn, phaseLabel, activeIdx }) {
  return (
    <div style={{ padding: '8px 8px 0', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
      <VPCounter
        players={players}
        max={MAX_VP}
        title={`Tah ${turn} · ${phaseLabel}\nHráč ${activeIdx + 1} na tahu`}
        layout="row"
        minWidth={260}
        centerValue={turn}
      />
    </div>
  )
}

function MiniActionRow() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0, paddingBottom: 6 }}>
      <ActionBar
        actions={SCREEN_ACTIONS}
        size="xs"
        bordered={false}
        showLabel={false}
        showKeycap={false}
      />
    </div>
  )
}

