export const players = [
  { id: 1, color: '#E05C5C', label: 'Hráč 1' },
  { id: 2, color: '#4D8FE0', label: 'Hráč 2' },
  { id: 3, color: '#50B86C', label: 'Hráč 3' },
  { id: 4, color: '#D4A830', label: 'Hráč 4' },
  { id: 5, color: '#9B6CC8', label: 'Hráč 5' },
  { id: 6, color: '#E07840', label: 'Hráč 6' },
]

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
