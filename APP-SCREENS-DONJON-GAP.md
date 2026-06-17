# App screens — donjon vizuální rozkol

## Problém

Sekce **"Obrazovky aplikace"** v sidebaru má reprezentovat ukázky reálných
obrazovek hry donjon-fall-ui (hlavní menu, výběr mapy, načítání, nastavení).
Mají vypadat jako **autentický herní UI** — chamfer/octagon rohy, ornamenty
(HexOrnament, ScoopOrnament, SideOrnament, CornerOrnament, Erb), gold-on-dark
parchment paletu.

Stávající stránky importují tokeny a sem tam `<DonjonBadge>` / `<DonjonCard>`,
ale **renderují generic dark-theme dashboard se zaoblenými rohy** (CSS
`borderRadius:`) místo octagonálního clip-pathu. Vůbec nepoužívají ornaments
(s výjimkou MapSelectPage, který má 2 octagon výskyty).

To je významný design-system rozkol — obrazovky aplikace mají být **flagship
demo donjon knihovny**, ale prakticky nevypadají jinak než generic UI.

## Metrika — počty výskytů

Audit z `grep -cE` na každé stránce:

| Page | `clipPath: octagon(...)` + ornaments | `borderRadius:` (rounded) | Verdict |
|------|--------------------------------------|----------------------------|---------|
| **MenuPage** | 0 | 1 | Žádný donjon vizuál |
| **MapSelectPage** | 2 | 6 | Trochu, ale dominuje round |
| **LoadingAppPage** | 0 | 2 | Žádný donjon vizuál |
| **LoadingGamePage** | 0 | 5 | Žádný donjon vizuál |
| **SettingsPage** | 1 | **15** | Worst offender |

## Co by tam mělo být místo `borderRadius`

Per `CLAUDE.md` → "Component shape (clip-path)":

- **Donjon**: `octagon(cx)` s `cx=10–14` podle velikosti panelu
- **Border trick**: outer wrapper = `background: borderColor`, inner wrapper =
  `background: fillColor`, `padding: borderWidth`
- **Ornaments na rozích**: `<CornerOrnament corner="tl|tr|bl|br" />` (a 3 další)
- **Ornaments na hraně**: `<SideOrnament side="..." />`, `<HexOrnament />`,
  `<ScoopOrnament />`
- **Player identity**: `<Erb />` nebo `<PlayerIdentityBadge />` (ne generic
  avatar kruh)

## Doporučený rework

Pořadí podle dopadu (worst-first):

1. **SettingsPage** — 15 rounded vs 1 octagon. Tabs, slidery, checkboxy
   v generic stylu. Měly by používat `<DonjonTabs ornament="decorated">`,
   `<DonjonSlider thumbShape="diamond">`, `<DonjonCheckbox>`.
2. **MenuPage** — first impression hry. Žádné ornamenty na hlavních CTA,
   buttony bez octagonu. Měly by být `<DonjonButton size="lg" ornament="decorated">`.
3. **LoadingGamePage** — herní loading screen, hodí se ScoopOrnament rámeček
   + Erb pro identitu hráče.
4. **LoadingAppPage** — app-level loading; minimum donjon vizuálu (logo +
   progress) je OK, ale měl by alespoň používat octagonální `<DonjonProgressBar>`
   místo CSS bar.
5. **MapSelectPage** — už má 2 octagon výskyty (karta mapy?), zbytek je
   generic. `<DonjonCard ornament="decorated">` na karty map, ornament rámeček
   kolem celého layoutu.

## Workflow

Per `CLAUDE.md`: každá stránka na vlastní `feat/<page>-donjon-rework` branch,
merge `--no-ff`. Doporučená scope per PR: 1 stránka = 1 PR. Hrubý odhad
~2–4 hodiny na stránku (komplexní rework layoutu).

Alternativa: vytvořit jednu **sdílenou `<AppScreenShell>` komponentu** ve
`styleguide/` s octagon shellem + corner ornaments + parchment bg, pak ji
aplikovat na všech 5 stránek najednou. Menší code surface, rychlejší rollout.
