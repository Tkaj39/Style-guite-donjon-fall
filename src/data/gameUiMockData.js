// Mock data pro demo komponenty — barva čerpaná z kanonické palette.
// Single source of truth: src/lib/donjon/playerColors.js
import { playerColors } from '../lib/donjon/playerColors'

export const players = playerColors.map(p => ({
  id: p.id,
  color: p.primary,
  label: p.label,
}))

export const turnPhases = [
  { id: 'focal',  label: 'Ohniska', sub: 'Vyhodnocení aktivních ohnisek' },
  { id: 'action', label: 'Akce',    sub: 'Právě jedna ze 4 akcí' },
  { id: 'combat', label: 'Souboj',  sub: 'Spouští pohyb — není samostatná volba', optional: true },
]

export const actions = [
  {
    value: 'move-die',
    ruleLabel: 'Move die',
    label: 'Pohyb kostky',
    variant: 'default',
    condition: null,
    summary: 'Pohni jednou svou kostkou až na vzdálenost její bojové síly. Pohyb na nepřátelské pole může spustit souboj.',
    cta: 'Vybrat kostku',
  },
  {
    value: 'move-tower',
    ruleLabel: 'Move tower',
    label: 'Pohyb věže',
    variant: 'default',
    condition: null,
    summary: 'Pohni celou věží. Věž nemůže procházet jinými kostkami ani věžemi. Pohyb na nepřátelské pole spustí Push — Occupy není dostupné.',
    cta: 'Vybrat věž',
  },
  {
    value: 'collapse',
    ruleLabel: 'Tower collapse',
    label: 'Kolaps věže',
    variant: 'danger',
    condition: 'Pouze věž se 3 a více kostkami',
    summary: 'Odstraň spodní kostku věže ze hry. Za každou zničenou nepřátelskou kostku získáš 1 VP.',
    cta: 'Vybrat věž',
  },
  {
    value: 'reroll',
    ruleLabel: 'Reroll',
    label: 'Přehazování',
    variant: 'success',
    condition: null,
    summary: 'Přehoď jednu svou kostku (solo nebo vrchol věže). Nová hodnota musí být ≥ původní — kostka může jen posílit nebo zůstat stejná.',
    cta: 'Vybrat kostku',
  },
]
