import { registry } from '../data/componentRegistry'
import { ShowcasePage, Section } from '../styleguide/ShowcasePage'

/* ──────────────────────────────────────────────────────────────────────────
   RUČNÍ CHECKLIST — přidávej / odebírej / přepisuj položky zde
   status: 'todo' | 'in-progress' | 'done'
   ────────────────────────────────────────────────────────────────────────── */
const MANUAL_TASKS = [
  {
    group: 'Design system — paleta & tokeny',
    items: [
      { status: 'done', text: 'Player palette — sjednoceno do single source (src/lib/donjon/playerColors.js)' },
      { status: 'done', text: 'Player palette — flat exports (red, blue, green, yellow, purple, orange)' },
      { status: 'done', text: 'Player palette — Light/Dark varianty (redLight, blueDark, …)' },
      { status: 'done', text: 'Player palette — playerColors array + playerColorsByKey lookup' },
      { status: 'done', text: 'Player palette — CSS custom properties (--donjon-player-*)' },
      { status: 'done', text: 'Token audit — orphan hex hodnoty zmapovány a nahrazeny tokeny napříč 14 soubory' },
      { status: 'done', text: 'Nové tokeny: borderMuted, borderMutedActive (30+ použití)' },
      { status: 'done', text: 'Nové tokeny: bg1Deep, textCaption' },
      { status: 'done', text: 'Nové tokeny: headerBgStart/End, hexFocalPassive' },
      { status: 'done', text: 'ColorsPage — donjon paleta zobrazuje reálné tokeny (žádné fake hexy)' },
      { status: 'done', text: 'TkajUI — CSS custom properties (tkajui.css)' },
      { status: 'done', text: 'TkajUI — barrel re-export tokenů (parita s donjon)' },
      { status: 'done', text: 'Donjon — barrel re-export player palette' },
      { status: 'done', text: 'ColorsPage — "Použití v kódu" sekce s JS+CSS příklady' },
      { status: 'done', text: 'Audit orphan hexů na tkajui straně — 0 violations (ESLint config rozšířen o **/dist/** ignore, předtím falešně hlásil bundled output)' },
      { status: 'done', text: 'Migrace alpha-black overlays — shadowSm/Md/Lg/Modal/Deep + scrimLight/Mid/Heavy + panelShadow() v shared/tokens, re-exported v obou libs. Popovery (Combobox/DropdownMenu/ContextMenu) + Drawer migrated; ostatní rgba(0,0,0,X) jsou legitimní ad-hoc drop-shadows.' },
    ],
  },
  {
    group: 'Design system — brand identity',
    items: [
      { status: 'done', text: 'LibraryLogo komponenta (src/styleguide/) — sjednocená brand mark z favicon path dat' },
      { status: 'done', text: 'DonjonLogoIcon + TkajuiLogoIcon jako piktogramy v icons.jsx' },
      { status: 'done', text: 'Brand marks skupina v Pictograms showcase' },
      { status: 'done', text: 'HomePage — 🏰⚔ emoji nahrazeno LibraryLogo (hero, CTA, BrandChip, kicker, legend)' },
      { status: 'done', text: 'TopNav — donjon emoji logo → DonjonLogoIcon' },
      { status: 'done', text: 'ArchitecturePage — TkajUI↔donjon pairs table používá LibraryLogo' },
      { status: 'done', text: 'ComponentsPage — info banner používá LibraryLogo' },
      { status: 'done', text: 'Sidebar — LibraryBadges komponenta (1 nebo 2 loga podle library prop)' },
      { status: 'done', text: 'Sidebar — dual-lib položky (Modal, Toast, Buttons, …) ukazují obě loga' },
      { status: 'done', text: 'Sidebar — emoji v labelech (🏛 ⚡ ✦) → Pictogram + sémantická ikona' },
      { status: 'done', text: 'Sidebar — dědění library ze section (Herní UI → donjon automaticky)' },
      { status: 'done', text: 'Foundation pages — rebrand na library="both" (Spacing/Motion/A11y/Cursor/…)' },
      { status: 'done', text: 'ShowcasePage LibraryBadge — podpora library="both" (renderuje obě pilule)' },
    ],
  },
  {
    group: 'Accessibility & contrast',
    items: [
      { status: 'done', text: 'WCAG contrast utility (src/lib/shared/contrast.js) — math helpers + 24 testů' },
      { status: 'done', text: 'Contrast Lab playground (/contrast-lab) — matice text × bg, AA/AAA per cell' },
      { status: 'done', text: 'pickContrastText helper v ColorsPage Swatch (textHigh viditelný na světlém)' },
      { status: 'done', text: 'WCAG audit napříč komponentami — contrast-audit.test.js (32 párů) reportuje ratio + assertions per pair. Našel + opravil 2 issues: textLow #4c4c68 → #6e6e8f (sub AA-large), primaryText×accent reklasifikován na AA-large (button text bold).' },
      { status: 'done', text: 'ESLint pravidlo donjon/contrast-check — AST scan inline style {color, background}, resolves tokeny + literal hexy, kontroluje WCAG (default AA-large). Skipne pokud bg alpha < 50% nebo ratio = 1.0 (decorative). 7 legitimate findings disabled s reasonem, 0 vykřičníků v lib/pages.' },
      { status: 'todo', text: 'Accessibility stránka — sekce o contrast utility + WCAG kontextu' },
    ],
  },
  {
    group: 'Komponenty — showcase stránky',
    items: [
      { status: 'done', text: 'Toggle, Slider, Select, ProgressBar, Modal, Toast, Tooltip, Tabs, ButtonGroup, FloatFeedback' },
      { status: 'done', text: 'ScoopClip — vlastní showcase (teď jen v /shapes)' },
      { status: 'done', text: 'CornerOrnament — vlastní showcase (teď jen v /ornaments)' },
    ],
  },
  {
    group: 'donjon-fall-ui — herní grafické zpracování',
    items: [
      { status: 'done', text: 'DonjonSelect, DonjonSlider, DonjonToggle, DonjonProgressBar, DonjonTooltip, DonjonToast' },
      { status: 'done', text: 'HexTile, DieFace, Erb (štít + prapor + dekorovaný režim s HrotErbu + HexOrnament)' },
      { status: 'done', text: 'Erb — playerColor flat API, ornament="decorated", ornamentColor="gold"|"player"' },
    ],
  },
  {
    group: 'Pictograms — herní ikony',
    items: [
      { status: 'done', text: '26 ikon v 6 kategoriích (Zdroje, Akce, Stav, Mapa, Mechaniky, Brand)' },
      { status: 'done', text: '11 nových herních ikon (Hex/Base/FocalPoint×3/Push/Occupy/Encirclement/TowerCollapse/SuddenDeath/TurnOrder)' },
      { status: 'done', text: 'Library logo ikony (DonjonLogoIcon, TkajuiLogoIcon) — mirror favicon' },
    ],
  },
  {
    group: 'Design tokeny & foundations',
    items: [
      { status: 'done', text: 'Barvy — paleta dokumentována (donjon + TkajUI varianty)' },
      { status: 'done', text: 'Typografie — dokumentována' },
      { status: 'done', text: 'Spacing — dokumentován' },
      { status: 'done', text: 'Shapes — interaktivní demo CornerOrnament variant' },
      { status: 'done', text: 'Tokens — JS exports + CSS custom properties (oba libs)' },
    ],
  },
  {
    group: 'Interakce & pohyb',
    items: [
      { status: 'done', text: 'Animace — kompletní sekce ("Ohnisko", "Sudden death", "Pohyb kostky/věže", …)' },
      { status: 'done', text: 'Motion — easing křivky a délky přechodů (animFast/Normal/Slow/Dramatic)' },
      { status: 'done', text: 'Focus ring — unifikovaný styl across interaktivních komponent' },
    ],
  },
  {
    group: 'Dokumentace & meta',
    items: [
      { status: 'done', text: 'Testovací suite — 528 testů (TkajUI + donjon + shared/contrast)' },
      { status: 'done', text: 'ComponentsPage — přehled s API chipy + inline mini-náhledy' },
      { status: 'done', text: 'componentMeta — zdokumentováno všech 8 herních primitiv' },
      { status: 'done', text: 'CLAUDE.md — lessons learned z mass refactorů (JSX context, CRLF gotcha, …)' },
      { status: 'done', text: 'README na úrovni design-sources/ — workflow SVG → JSX paths' },
      { status: 'todo', text: 'Storybook nebo live sandbox pro izolované demo komponent' },
      { status: 'todo', text: 'Changelog — sledovat změny API mezi verzemi' },
      { status: 'todo', text: 'Migration guide pro kolegy — jak importovat tokeny, palette, ikony' },
    ],
  },
  {
    group: 'Chybějící komponenty — 🔴 kritické (blokátory app buildingu)',
    items: [
      // Layout primitives — bez nich kolega píše flex/grid pořád dokola
      { status: 'done', text: 'Stack — vertikální flex s gap tokenem (xs–xxl) + align/justify' },
      { status: 'done', text: 'Inline — horizontální flex s gap + wrap prop' },
      { status: 'done', text: 'Cluster — inline s auto-wrap (tag clouds, badges, chips)' },
      { status: 'done', text: 'Grid — CSS Grid wrapper + tokenizovaný gap + responzivní cols přes breakpoint object' },
      { status: 'done', text: 'Container — max-width tokeny (sm/md/lg/xl/full) + horizontal padding' },
      { status: 'done', text: 'Box — surface primitivum (bg/borderColor/padding/radius)' },
      { status: 'done', text: 'Spacer — flex grow space mezi sourozenci' },
      { status: 'done', text: 'Split — 2-column/row layout s dividerem a ratio prop' },
      { status: 'done', text: 'Center — full horizontal+vertical centrování s minHeight' },
      // Image essentials — game UI musí mít portréty
      { status: 'done', text: 'Avatar — circle/octagon + initials fallback + color tint (player identity)' },
      { status: 'done', text: 'FramedImage — donjon heraldický rám (octagon + gold border + SideOrnament + RohOrnament)' },
      { status: 'done', text: 'AspectBox — CSS aspect-ratio container (16:9, 1:1, 4:3, 21:9)' },
      // Form primitives — gaps blokují reálné formuláře
      { status: 'done', text: 'Field — label + input + hint + error composer (cloneElement injektuje id + aria-describedby)' },
      { status: 'done', text: 'Radio + RadioGroup — single-choice (controlled value/onChange, vertical/horizontal layout, aria-required)' },
      { status: 'done', text: 'Checkbox + CheckboxGroup — standalone i grouped (array of selected), required marker' },
      { status: 'done', text: 'Form — <form> wrapper s auto-preventDefault + flex column gap' },
    ],
  },
  {
    group: 'Chybějící komponenty — 🟡 vysoká priorita (běžné app patterns)',
    items: [
      // Loading/feedback
      { status: 'done', text: 'Spinner — loading indikátor (kruhový/lineární)' },
      { status: 'done', text: 'Skeleton — máme dokumentaci, chybí komponenta' },
      { status: 'done', text: 'Banner — top-of-page persistent notice' },
      { status: 'done', text: 'Alert — inline banner s ikonou + title + body' },
      // Media + buttons
      { status: 'done', text: 'IconButton — tlačítko jen s ikonou (HUD, toolbar)' },
      { status: 'done', text: 'HeroImage — velká ilustrace s overlay textem (menu, loading)' },
      { status: 'done', text: 'Backdrop — full-screen pozadí s content overlay (modální fond hry)' },
      { status: 'done', text: 'Thumbnail — klikatelný preview (mapy, save sloty)' },
      // Inventory pattern (core game)
      { status: 'done', text: 'InventorySlot — buňka s rarity border + count badge' },
      { status: 'done', text: 'InventoryGrid — N×M layout s padded items (drag/drop deferred)' },
      // Layout — sticky
      { status: 'done', text: 'StickyBar — top/bottom anchor (HUD topbar, actionbar)' },
      { status: 'done', text: 'SidebarLayout — left-nav + content (settings, codex)' },
      // Forms — secondary
      { status: 'done', text: 'TextArea — multi-line text input (thin wrapper over Input multiline)' },
      { status: 'done', text: 'NumberInput — − / + stepper buttons + min/max/step/precision clamping' },
      // Navigation
      { status: 'done', text: 'Drawer — side panel (inventory, character sheet)' },
      { status: 'done', text: 'DropdownMenu — generic dropdown s items' },
      { status: 'done', text: 'Accordion — collapsible sekce (codex, settings)' },
    ],
  },
  {
    group: 'Chybějící komponenty — 🟢 střední priorita (specifické use cases)',
    items: [
      // Game-specific gameplay
      { status: 'done', text: 'Dialogue — NPC speech bublina s portrétem' },
      { status: 'done', text: 'ChoicePanel — hráč vybírá z N možností s consequences hints' },
      { status: 'done', text: 'RewardPopup — animovaný drop itemu / VP gain' },
      { status: 'done', text: 'AchievementToast — speciální toast pro unlocky' },
      { status: 'done', text: 'LevelUp — celebrace s animací' },
      // Game-specific layout
      { status: 'done', text: 'HUDLayout — top bar + bottom bar + center action area composition' },
      { status: 'done', text: 'Scoreboard — multi-player score grid' },
      { status: 'done', text: 'Leaderboard — ranked list s pozicemi' },
      { status: 'done', text: 'Cooldown — kruhový/lineární timer' },
      { status: 'done', text: 'Minimap — malá mapa s viewport overlay' },
      { status: 'done', text: 'Timeline — sekvence událostí (tah history)' },
      { status: 'done', text: 'Sprite — animovaná/stateful postava/objekt (sprite-sheet steps)' },
      // Data display
      { status: 'done', text: 'Table — sortable rows (leaderboard, stats)' },
      { status: 'done', text: 'List — itemy s dividers + hover' },
      { status: 'done', text: 'DescriptionList — key-value páry (character sheet)' },
      { status: 'done', text: 'Stat — label + big number (generic verze NumericDisplay)' },
      // Forms — niche
      { status: 'done', text: 'Combobox — search + select' },
      // Navigation
      { status: 'done', text: 'Breadcrumb — cesta v menu hierarchii' },
      { status: 'done', text: 'Pagination — stránkování dlouhých listů' },
      { status: 'done', text: 'ContextMenu — right-click menu' },
    ],
  },
  {
    group: 'Lib publish — Fáze 1: decoupling (blocker)',
    items: [
      { status: 'done', text: 'Audit Tailwind classes v src/lib/** — text-balance/pretty → inline textWrap, ButtonGroup hover utilities → .tkajui-segment-button / .dj-segment-button v lib stylesheetech, dj-clip-focus přesunut do donjon.css' },
      { status: 'done', text: 'Audit react-router-dom v src/lib/** — 0 výskytů ✓' },
      { status: 'done', text: 'Audit absolute imports mimo lib/ — src/utils/* + src/hooks/* fyzicky přesunuty do src/lib/shared/, 48 importů přepsáno' },
      { status: 'done', text: 'Audit @keyframes inline v komponentách — Drawer keyframes (4 sides) přesunuty do tkajui.css, Sprite refaktorován na Web Animations API' },
      { status: 'done', text: 'Inventarizace peer dependencies — pouze react + react-dom (react-router-dom NEPOTŘEBA v lib/)' },
    ],
  },
  {
    group: 'Lib publish — Fáze 2: package metadata',
    items: [
      { status: 'done', text: 'src/lib/donjon/package.json — name, version, type, main, exports, peerDependencies, sideEffects' },
      { status: 'done', text: 'src/lib/tkajui/package.json — paritní struktura' },
      { status: 'done', text: 'src/lib/shared/package.json — @tkaj/donjon-shared (companion package)' },
      { status: 'done', text: 'Root package.json — npm workspaces nastaveny (src/lib/{shared,tkajui,donjon})' },
      { status: 'done', text: 'Subpath exports — `./tokens`, `./styles`, `./enums`, `./playerColors` (donjon)' },
      { status: 'done', text: 'README per package — install + quick start + link na style guide' },
      { status: 'done', text: 'LICENSE soubor — MIT v rootu + zkopírováno do každého balíčku' },
      { status: 'done', text: '.npmignore — test souborů + dev artifacts' },
    ],
  },
  {
    group: 'Lib publish — Fáze 3: build pipeline',
    items: [
      { status: 'done', text: 'Build tool — tsup zvolen (esbuild + automatický .d.ts z JSDoc)' },
      { status: 'done', text: 'ESM + CJS bundles per package — tsup.config.js v každém balíčku' },
      { status: 'done', text: 'TypeScript .d.ts generování z JSDoc — vše vystaveno (index/tokens/enums/octagon/...)' },
      { status: 'done', text: 'Tree-shaking — sideEffects:false (shared) / [*.css] (tkajui+donjon)' },
      { status: 'done', text: 'CSS bundling — separate tkajui.css / donjon.css (sideEffects flag)' },
      { status: 'todo', text: 'Bundle size baseline + monitoring (size-limit / bundlewatch) — deferred' },
      { status: 'todo', text: 'Lokální test přes `npm link` do kolegova projektu — manuální krok' },
    ],
  },
  {
    group: 'Lib publish — Fáze 4: publish & maintenance',
    items: [
      { status: 'done', text: 'GitHub Actions CI — .github/workflows/ci.yml: lint + test + app build + lib builds na push/PR k master' },
      { status: 'done', text: 'GitHub Actions CD — .github/workflows/release.yml: na tag v* publishne všechny 3 workspace packages s npm provenance' },
      { status: 'todo', text: 'Changeset nebo release-please — deferred, manual version bump na PR zatím stačí' },
      { status: 'todo', text: 'NPM 2FA + publish token v repo secrets — manuální krok (vytvoř token v npmjs.com → Settings → Add NPM_TOKEN secret v repo)' },
      { status: 'done', text: 'CHANGELOG.md — Keep a Changelog format, [Unreleased] sekce připravena pro 0.1.0' },
      { status: 'todo', text: 'Style guide deploy (Vercel/Netlify) — manuální krok' },
      { status: 'done', text: 'Migration guide — MIGRATION.md, install + setup + framework pro 0.2+ entries' },
      { status: 'todo', text: 'NPM publish 0.1.0 — vytvořit tag `v0.1.0` a pushnout (CI udělá rest), nebo manuálně `npm publish --workspaces`' },
      { status: 'todo', text: 'NPM publish 1.0.0 — po feedback z 0.1.x' },
    ],
  },
]

/* ── Status konfigurace ── */
const STATUS = {
  'todo':        { label: 'todo',        dot: 'bg-neutral-700',   text: 'text-neutral-500',  badge: 'bg-neutral-800 text-neutral-500 border-neutral-700' },
  'in-progress': { label: 'probíhá',    dot: 'bg-amber-500',     text: 'text-neutral-300',  badge: 'bg-amber-900/40 text-amber-400 border-amber-700/40' },
  'done':        { label: 'hotovo',     dot: 'bg-emerald-600',   text: 'text-neutral-600 line-through',  badge: 'bg-emerald-900/30 text-emerald-600 border-emerald-800/40' },
}

function StatusBadge({ status }) {
  const s = STATUS[status] ?? STATUS.todo
  return (
    <span className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-medium border ${s.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  )
}

function TaskRow({ item }) {
  const s = STATUS[item.status] ?? STATUS.todo
  return (
    <div className="flex items-start gap-3 py-2 border-b border-neutral-800/50 last:border-0">
      <StatusBadge status={item.status} />
      <span className={`text-sm leading-relaxed ${s.text}`}>{item.text}</span>
    </div>
  )
}

/* ── Dynamická sekce — komponenty z registru ── */
function ComponentBacklog() {
  const needsDocs   = registry.filter(c => c.status === 'generated' && c.visibility !== 'internal')
  const draft       = registry.filter(c => c.status === 'draft')
  const noShowcase  = registry.filter(c => c.visibility === 'public' && !c.showcaseRoute)

  if (needsDocs.length === 0 && draft.length === 0 && noShowcase.length === 0) {
    return (
      <p className="text-sm text-emerald-500 flex items-center gap-2">
        <span className="size-2 rounded-full bg-emerald-500" />
        Všechny public komponenty jsou zdokumentované a mají showcase. 🎉
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {needsDocs.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
            Bez dokumentace ({needsDocs.length})
          </p>
          <div className="flex flex-col rounded-lg border border-neutral-800 overflow-hidden">
            {needsDocs.map(c => (
              <div key={c.slug} className="flex items-center justify-between gap-3 px-3 py-2 border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/30 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm text-neutral-400 truncate">{c.name}</span>
                  <code className="text-[10px] text-neutral-700 font-mono hidden sm:block">{c.filePath}</code>
                </div>
                <span className="text-[10px] font-mono text-neutral-700 shrink-0 px-1.5 py-0.5 rounded-sm border border-neutral-800">{c.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {draft.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
            Draft — nedokončená dokumentace ({draft.length})
          </p>
          <div className="flex flex-col rounded-lg border border-amber-900/40 overflow-hidden">
            {draft.map(c => (
              <div key={c.slug} className="flex items-center justify-between gap-3 px-3 py-2 border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/30 transition-colors">
                <span className="text-sm text-neutral-400">{c.name}</span>
                <span className="text-[10px] font-mono text-amber-700 shrink-0">{c.slug}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {noShowcase.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
            Bez showcase stránky ({noShowcase.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {noShowcase.map(c => (
              <span key={c.slug} className="text-[11px] font-mono px-2 py-1 rounded-sm border border-neutral-800 text-neutral-600 bg-neutral-900">
                {c.slug}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Počítadlo progress ── */
function Progress() {
  const all   = MANUAL_TASKS.flatMap(g => g.items)
  const done  = all.filter(i => i.status === 'done').length
  const wip   = all.filter(i => i.status === 'in-progress').length
  const todo  = all.filter(i => i.status === 'todo').length
  const pct   = Math.round((done / all.length) * 100)

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-400">Celkový postup</span>
        <span className="font-semibold text-neutral-100 tabular-nums">{done} / {all.length}</span>
      </div>
      <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex gap-4 text-[11px]">
        <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />{done} hotovo</span>
        <span className="flex items-center gap-1.5 text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{wip} probíhá</span>
        <span className="flex items-center gap-1.5 text-neutral-600"><span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />{todo} todo</span>
      </div>
    </div>
  )
}

/* ── Main ── */
export default function TodoPage() {
  return (
    <ShowcasePage
      title="TODO"
      description="Co ještě zbývá graficky dodělat. Edituj seznam přímo v src/pages/TodoPage.jsx → sekce MANUAL_TASKS."
    >
      {/* Progress bar */}
      <Section id="progress">
        <Progress />
      </Section>

      {/* Ruční checklist */}
      {MANUAL_TASKS.map(group => (
        <Section key={group.group} id={group.group.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}>
          <h2 className="text-base font-semibold text-neutral-100 mb-1">{group.group}</h2>
          <div className="rounded-lg border border-neutral-800 overflow-hidden px-3">
            {group.items.map((item, i) => (
              <TaskRow key={i} item={item} />
            ))}
          </div>
        </Section>
      ))}

      {/* Dynamická sekce z registru */}
      <Section
        id="komponenty-backlog"
        description="Automaticky generováno z componentRegistry — aktualizuje se samo při změně souborů."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Backlog komponent (auto)</h2>
        <ComponentBacklog />
      </Section>

    </ShowcasePage>
  )
}
