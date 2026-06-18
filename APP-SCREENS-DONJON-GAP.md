# App screens — donjon vizuální rozkol ✓ vyřešeno

Původní stav (viz historie): 5 stránek v sekci "Obrazovky aplikace"
renderovalo generic dark-theme dashboard se zaoblenými rohy místo
autentického donjon vizuálu — chybělo octagon/clip-path a ornamenty.

**Stav nyní: všech 5 stránek používá donjon vizuální jazyk a/nebo
reálné knihovní komponenty.**

## Před & po — metriky

| Page | clipPath: octagon + ornaments | borderRadius (rounded) | Stav |
|------|------------------------------:|------------------------:|------|
| **SettingsPage**     | 1 → mnoho (4-fázový rework)        | 15 → minimum     | ✓ |
| **MenuPage**         | 0 → DonjonButton ornaments         | 1 → 0            | ✓ |
| **MapSelectPage**    | 2 → DonjonButton + octagon cards   | 6 → minimum      | ✓ |
| **LoadingAppPage**   | 0 → DonjonProgressBar              | 2 → 0            | ✓ |
| **LoadingGamePage**  | 0 → DonjonProgressBar + octagon    | 5 → 0            | ✓ |

## Co se udělalo

### SettingsPage (4 PR — fáze 1-4)
- **Modal shell**: `borderRadius: 6` → `clipPath: octagon(cx)` border-trick
  (cx=12 desktop / 10 tablet / 8 mobile). Gold border + drop-shadow glow.
- **Taby**: flat underline → oktagonové chamfered chips s gold-tint pozadím.
  Separator: `bg4` → `goldDim33`.
- **Slider/Toggle**: kruhové thumby → diamond (rotate 45°). Toggle track:
  pill `borderRadius: 7` → `clipPath: octagon(3)` s border-trick.
- **Footer buttons**: `borderRadius: 3` → border-trick s clipPath: octagon(3).
  Save dostal gold border + drop-shadow glow.

### MenuPage
- Smazaný `MiniMenuBtn` helper (21 řádků hand-rolled `<div>` button stylů).
- Všechny 4 menu položky × 3 viewporty → `<DonjonButton size="xs"
  variant="primary"|disabled fullWidth>` — lib komponenta s vlastními
  octagon ornaments.

### MapSelectPage
- Smazaný `NavBtn` helper (17 řádků).
- "Potvrdit" CTA × 3 viewporty → `<DonjonButton size="xs" variant="primary">`.
- `MapCard`: `borderRadius: 4` → `clipPath: octagon(shellCx)` border-trick
  (cx=4 regulární / 3 compact). Selected stav: gold@88 border + drop-shadow.

### LoadingAppPage
- Smazaný `ProgressBar` helper (18 řádků).
- → `<DonjonProgressBar value={pct} size="sm" />` (4px tall, matches
  původní výšku).

### LoadingGamePage
- Smazaný `ProgressBar` helper (15 řádků).
- → `<DonjonProgressBar value={pct} size="sm" />`.
- `PlayerPill`: `borderRadius: 3` → border-trick octagon (cx=3). Player
  color dot → 6×6 diamond (rotate 45°).
- Outline map kontejner: `borderRadius: 4` → border-trick octagon (cx=5)
  kolem `#0D0C1A` panelu.

## Reference

Po fázi 4 SettingsPage byl audit původně koncipován jako "audit-only",
ale dotaženo do reálné implementace na žádost uživatele (5 commitů
+ 4 fáze SettingsPage).

Použité donjon komponenty:
- `<DonjonButton>` (MenuPage, MapSelectPage)
- `<DonjonProgressBar>` (LoadingAppPage, LoadingGamePage)
- Existující `<HexTile>` a `<DonjonBadge>` zachovány
- `octagon()` + `octagonInner()` border-trick pattern (SettingsPage,
  MapCard, PlayerPill, outline map frame)

## Workflow

Per `CLAUDE.md`: 9 PR (každá fáze/stránka na vlastní `feat/...` branch,
merge `--no-ff` do master). Žádná lint/test regrese.
