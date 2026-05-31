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
      { status: 'todo', text: 'Audit orphan hexů na tkajui straně (zatím provedeno jen pro donjon)' },
      { status: 'todo', text: 'Migrace #000000/#FFFFFF alpha overlays na tokeny nebo strukturální výjimky' },
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
      { status: 'todo', text: 'WCAG audit napříč komponentami — vyhodnotit textHigh×bg páry na všech surface tokenech' },
      { status: 'todo', text: 'ESLint pravidlo donjon/contrast-check pro inline style barvy' },
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
      { status: 'todo', text: 'Stack — vertikální flex s gap tokenem (<Stack gap={4}>)' },
      { status: 'todo', text: 'Inline — horizontální flex s gap + wrap' },
      { status: 'todo', text: 'Cluster — inline s auto-wrap (tag clouds, badges, chips)' },
      { status: 'todo', text: 'Grid — CSS Grid wrapper s tokenizovaným gap + responzivní cols' },
      { status: 'todo', text: 'Container — konzistentní max-width + padding (page wrapper)' },
      { status: 'todo', text: 'Box — surface primitivum (background/border/padding tokeny)' },
      { status: 'todo', text: 'Spacer — vyplní available space mezi prvky' },
      { status: 'todo', text: 'Split — dvousloupcový layout s dividerem' },
      { status: 'todo', text: 'Center — vertikální + horizontální centrování (loading screens)' },
      // Image essentials — game UI musí mít portréty
      { status: 'todo', text: 'Avatar — portrét hráče/NPC, kruhový/oktagonální rám, fallback iniciály' },
      { status: 'todo', text: 'FramedImage — obrázek s ornamentálním rámem (heraldický)' },
      { status: 'todo', text: 'AspectBox — container s pevným poměrem stran (16:9, 1:1)' },
      // Form primitives — gaps blokují reálné formuláře
      { status: 'todo', text: 'Field — label + input + error + hint composer' },
      { status: 'todo', text: 'Radio + RadioGroup — single-choice (difficulty, genre)' },
      { status: 'todo', text: 'Checkbox + CheckboxGroup — multi-choice (options, flags)' },
      { status: 'todo', text: 'Form — wrapper s submit handlerem + validační state' },
    ],
  },
  {
    group: 'Chybějící komponenty — 🟡 vysoká priorita (běžné app patterns)',
    items: [
      // Loading/feedback
      { status: 'todo', text: 'Spinner — loading indikátor (kruhový/lineární)' },
      { status: 'todo', text: 'Skeleton — máme dokumentaci, chybí komponenta' },
      { status: 'todo', text: 'Banner — top-of-page persistent notice' },
      { status: 'todo', text: 'Alert — inline banner s ikonou + title + body' },
      // Media + buttons
      { status: 'todo', text: 'IconButton — tlačítko jen s ikonou (HUD, toolbar)' },
      { status: 'todo', text: 'HeroImage / Banner — velká ilustrace s overlay textem (menu, loading)' },
      { status: 'todo', text: 'Backdrop — full-screen pozadí s content overlay (modální fond hry)' },
      { status: 'todo', text: 'Thumbnail — klikatelný preview (mapy, save sloty)' },
      // Inventory pattern (core game)
      { status: 'todo', text: 'InventorySlot — buňka s rarity border + count badge' },
      { status: 'todo', text: 'InventoryGrid — mřížka s drag/drop supportem' },
      // Layout — sticky
      { status: 'todo', text: 'StickyBar — top/bottom anchor (HUD topbar, actionbar)' },
      { status: 'todo', text: 'SidebarLayout — left-nav + content (settings, codex)' },
      // Forms — secondary
      { status: 'todo', text: 'TextArea — multi-line text input' },
      { status: 'todo', text: 'NumberInput — s stepper buttons (settings hodnoty)' },
      // Navigation
      { status: 'todo', text: 'Drawer — side panel (inventory, character sheet)' },
      { status: 'todo', text: 'DropdownMenu — generic dropdown s items' },
      { status: 'todo', text: 'Accordion — collapsible sekce (codex, settings)' },
    ],
  },
  {
    group: 'Chybějící komponenty — 🟢 střední priorita (specifické use cases)',
    items: [
      // Game-specific gameplay
      { status: 'todo', text: 'Dialogue — NPC speech bublina s portrétem' },
      { status: 'todo', text: 'ChoicePanel — hráč vybírá z N možností s consequences hints' },
      { status: 'todo', text: 'RewardPopup — animovaný drop itemu / VP gain' },
      { status: 'todo', text: 'AchievementToast — speciální toast pro unlocky' },
      { status: 'todo', text: 'LevelUp — celebrace s animací' },
      // Game-specific layout
      { status: 'todo', text: 'HUDLayout — top bar + bottom bar + center action area composition' },
      { status: 'todo', text: 'Scoreboard — multi-player score grid' },
      { status: 'todo', text: 'Leaderboard — ranked list s pozicemi' },
      { status: 'todo', text: 'Cooldown — kruhový/lineární timer' },
      { status: 'todo', text: 'Minimap — malá mapa s viewport overlay' },
      { status: 'todo', text: 'Timeline — sekvence událostí (tah history)' },
      { status: 'todo', text: 'Sprite — animovaná/stateful postava/objekt (animation frames)' },
      // Data display
      { status: 'todo', text: 'Table — sortable rows (leaderboard, stats)' },
      { status: 'todo', text: 'List — itemy s dividers + hover' },
      { status: 'todo', text: 'DescriptionList — key-value páry (character sheet)' },
      { status: 'todo', text: 'Stat — label + big number (generic verze NumericDisplay)' },
      // Forms — niche
      { status: 'todo', text: 'Combobox — search + select' },
      // Navigation
      { status: 'todo', text: 'Breadcrumb — cesta v menu hierarchii' },
      { status: 'todo', text: 'Pagination — stránkování dlouhých listů' },
      { status: 'todo', text: 'ContextMenu — right-click menu' },
    ],
  },
  {
    group: 'Lib publish — Fáze 1: decoupling (blocker)',
    items: [
      { status: 'todo', text: 'Audit Tailwind classes v src/lib/** — najít všechny className="..." a převést na inline style (kolega bez Tailwindu se rozbije)' },
      { status: 'todo', text: 'Audit react-router-dom v src/lib/** — Link nahradit `as` prop patternem nebo <a>' },
      { status: 'todo', text: 'Audit absolute imports mimo lib/ — `import "../utils/octagon"` musí být součást balíčku' },
      { status: 'todo', text: 'Audit @keyframes inline v komponentách (vs src/index.css) — CSS musí ven z app bundle' },
      { status: 'todo', text: 'Inventarizace peer dependencies (react, react-dom, optional react-router-dom)' },
    ],
  },
  {
    group: 'Lib publish — Fáze 2: package metadata',
    items: [
      { status: 'todo', text: 'src/lib/donjon/package.json — name, version, type, main, exports, peerDependencies, sideEffects' },
      { status: 'todo', text: 'src/lib/tkajui/package.json — paritní struktura' },
      { status: 'todo', text: 'src/lib/shared/package.json — privátní nebo public companion' },
      { status: 'todo', text: 'Root package.json — npm/pnpm workspaces config' },
      { status: 'todo', text: 'Subpath exports — `./tokens`, `./styles`, `./icons`' },
      { status: 'todo', text: 'README per package — install + quick start + link na style guide' },
      { status: 'todo', text: 'LICENSE soubor (MIT?)' },
      { status: 'todo', text: '.npmignore nebo files allowlist' },
    ],
  },
  {
    group: 'Lib publish — Fáze 3: build pipeline',
    items: [
      { status: 'todo', text: 'Build tool výběr — tsup (doporučeno, JSDoc → .d.ts) vs vite build --lib vs Rollup' },
      { status: 'todo', text: 'ESM + CJS bundles per package' },
      { status: 'todo', text: 'TypeScript .d.ts generování z JSDoc' },
      { status: 'todo', text: 'Tree-shaking validation (sideEffects: false / explicit list)' },
      { status: 'todo', text: 'CSS bundling strategy (separate .css file vs CSS-in-JS)' },
      { status: 'todo', text: 'Bundle size baseline + monitoring (size-limit / bundlewatch)' },
      { status: 'todo', text: 'Lokální test přes `npm link` do kolegova projektu' },
    ],
  },
  {
    group: 'Lib publish — Fáze 4: publish & maintenance',
    items: [
      { status: 'todo', text: 'GitHub Actions CI — test + lint na PR' },
      { status: 'todo', text: 'GitHub Actions CD — auto-publish na npm při tagu' },
      { status: 'todo', text: 'Changeset nebo release-please — auto-changelog + semver bumpy' },
      { status: 'todo', text: 'NPM 2FA + publish token v repo secrets' },
      { status: 'todo', text: 'CHANGELOG.md — counvention (Keep a Changelog / Conventional Commits)' },
      { status: 'todo', text: 'Style guide deploy jako separátní web (Vercel/Netlify) — link z README' },
      { status: 'todo', text: 'Migration guide v0 → v1 pro early adopters' },
      { status: 'todo', text: 'NPM publish 0.1.0 (initial release pro kolegu)' },
      { status: 'todo', text: 'NPM publish 1.0.0 (stable, po feedback z 0.1.x)' },
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
