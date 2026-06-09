/* ── Datová vrstva komponent ──────────────────────────────────────────────
   Automaticky načítá seznam komponent z lib/ a sestavuje registr.
   Merguje ruční metadata z componentMeta.js.

   Zdroj pravdy pro existenci = filesystem.
   Zdroj pravdy pro obsah     = componentMeta.js.

   Kategorizace:
     src/lib/tkajui/*.jsx   → UI Components   (public)
     src/lib/donjon/*.jsx   → Game Assets     (public)
     src/styleguide/ → Layout          (internal)

   Výjimka visibility:
     Ornaments.jsx je internal i přes umístění v tkajui.
   ─────────────────────────────────────────────────────────────────────── */

import { componentMeta } from './componentMeta'

/* import.meta.glob — cesty relativní k tomuto souboru (src/data/) */
const LAYOUT_GLOB = import.meta.glob('../styleguide/*.jsx')
const TKAJUI_GLOB = import.meta.glob('../lib/tkajui/*.jsx')
const DONJON_GLOB = import.meta.glob('../lib/donjon/*.jsx')

/* Explicitní override viditelnosti pro konkrétní komponenty */
const VISIBILITY_OVERRIDES = {
  Ornaments:           'internal',
  icons:               'internal',   // sada SVG exportů, ne samostatná komponenta
  // Internal helper barrel — co-locates DonjonRadio/RadioGroup/Checkbox/
  // CheckboxGroup (each documented under its own componentMeta slug). The
  // file itself isn't a renderable component, so keep it out of the public
  // index. The companion DonjonForm.jsx file IS public — it owns the
  // documented `donjon-form` slug (Form wrapper + DonjonField).
  DonjonChoiceControls: 'internal',
}

/* Explicitní override kategorie — přesune komponentu do jiné knihovny */
const CATEGORY_OVERRIDES = {
  // Herní dekorace + komponenty které je používají → donjon-fall-ui
  Ornaments:      'donjon-fall-ui',
  CornerOrnament: 'donjon-fall-ui',
}

/* ── Helpers ── */

/** PascalCase / CamelCase → kebab-case.
 *
 * Acronym-aware: HUDLayout → hud-layout (not h-u-d-layout). Two passes:
 *   1) split BEFORE a single-cap-then-lower when preceded by ≥1 cap
 *      (HUDLayout → HUD-Layout)
 *   2) split between lower→Upper boundary
 *      (myThing → my-Thing)
 * Then lowercase.
 */
function toKebab(name) {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/** Extrahuje název komponenty z cesty souboru */
function extractName(filePath) {
  return filePath.split('/').pop().replace(/\.jsx$/, '')
}

/** Převede glob klíč (../components/Foo.jsx) na čitelnou src/ cestu */
function toSrcPath(globKey) {
  return globKey.replace(/^\.\.\//, 'src/')
}

/* ── Builder jedné položky ── */
function makeEntry(globKey, subdir) {
  const name       = extractName(globKey)
  const slug       = toKebab(name)
  const filePath   = toSrcPath(globKey)

  const baseCategory =
    subdir === 'game-assets' ? 'donjon-fall-ui'
    : subdir === 'layout'    ? 'Layout'
    :                          'TkajUI'

  const category = CATEGORY_OVERRIDES[name] ?? baseCategory

  const defaultVisibility = baseCategory === 'Layout' ? 'internal' : 'public'
  const visibility = VISIBILITY_OVERRIDES[name] ?? defaultVisibility

  return {
    name,
    filePath,
    category,
    visibility,     // 'public' | 'internal'
    slug,
    route: `/components/${slug}`,
    showcaseRoute: '',           // Fáze 5: odkaz na existující showcase stránku
    // Fáze 2 doplní: description, props, pravidla použití
    description: '',
    props: [],
    propsSource: 'undocumented', // 'undocumented' | 'manual' | 'parsed'
    status: 'generated',         // 'generated' | 'draft' | 'documented'
    relatedSlugs: [],
    subcategory: null,           // 'extends-tkajui' | 'exclusive' | null
    extendsSlug: null,           // slug základní TkajUI komponenty (jen pro 'extends-tkajui')
    differencesFromBase: [],     // pole rozdílů oproti `extendsSlug` (pro showcase diff)
  }
}

/* ── Merge metadat (Fáze 2) ── */

/**
 * Přijme auto-generovaný entry a překryje ho ručními metadaty z componentMeta.
 * Pole, která componentMeta neobsahuje, zůstávají na výchozích hodnotách.
 */
function applyMeta(entry) {
  const meta = componentMeta[entry.slug]
  if (!meta) return entry   // žádná ruční metadata → zůstává 'generated'

  return {
    ...entry,
    description:   meta.description   ?? entry.description,
    props:         meta.props          ?? entry.props,
    propsSource:   meta.props?.length > 0 ? 'manual' : entry.propsSource,
    status:        meta.status         ?? entry.status,
    relatedSlugs:  meta.relatedSlugs   ?? entry.relatedSlugs,
    showcaseRoute: meta.showcaseRoute  ?? entry.showcaseRoute,
    subcategory:   meta.subcategory    ?? entry.subcategory,
    extendsSlug:   meta.extendsSlug    ?? entry.extendsSlug,
    differencesFromBase: meta.differencesFromBase ?? entry.differencesFromBase,
  }
}

/* ── Sestavení registru ── */
function buildRegistry() {
  const entries = []

  Object.keys(LAYOUT_GLOB).forEach(path => {
    entries.push(applyMeta(makeEntry(path, 'layout')))
  })
  Object.keys(TKAJUI_GLOB).forEach(path => {
    entries.push(applyMeta(makeEntry(path, 'root')))
  })
  Object.keys(DONJON_GLOB).forEach(path => {
    entries.push(applyMeta(makeEntry(path, 'game-assets')))
  })

  return entries.sort((a, b) => a.name.localeCompare(b.name, 'cs'))
}

/* ── Exporty ── */

/** Kompletní seřazený seznam všech komponent. */
export const registry = buildRegistry()

/** Všechny podporované kategorie v pořadí zobrazení. */
export const CATEGORIES = ['TkajUI', 'donjon-fall-ui', 'Layout']

/** Vrátí jednu komponentu podle slug. */
export function getBySlug(slug) {
  return registry.find(c => c.slug === slug) ?? null
}

/** Vrátí komponenty jedné kategorie. */
export function getByCategory(category) {
  return registry.filter(c => c.category === category)
}

/** Vrátí jen public komponenty. */
export function getPublic() {
  return registry.filter(c => c.visibility === 'public')
}

/** Vrátí jen internal komponenty. */
export function getInternal() {
  return registry.filter(c => c.visibility === 'internal')
}

/** Počty podle kategorie — pro rychlou navigaci. */
export function getCategoryCounts() {
  return CATEGORIES.map(cat => ({
    category: cat,
    total:    registry.filter(c => c.category === cat).length,
    public:   registry.filter(c => c.category === cat && c.visibility === 'public').length,
    internal: registry.filter(c => c.category === cat && c.visibility === 'internal').length,
  }))
}
