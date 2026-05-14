/* ── Fáze 1 + 2: datová vrstva komponent ─────────────────────────────────
   Fáze 1: Automaticky načítá seznam komponent ze src/components.
   Fáze 2: Merguje ruční metadata z componentMeta.js.

   Zdroj pravdy pro existenci = filesystem.
   Zdroj pravdy pro obsah     = componentMeta.js.

   Kategorizace:
     src/components/*.jsx         → UI Components   (public)
     src/components/game-assets/  → Game Assets     (public)
     src/components/layout/       → Layout          (internal)

   Výjimka visibility:
     Ornaments.jsx je internal i přes umístění v root UI Components.
   ─────────────────────────────────────────────────────────────────────── */

import { componentMeta } from './componentMeta'

/* import.meta.glob — cesty relativní k tomuto souboru (src/data/) */
const ROOT_GLOB       = import.meta.glob('../components/*.jsx')
const GAME_ASSET_GLOB = import.meta.glob('../components/game-assets/*.jsx')
const LAYOUT_GLOB     = import.meta.glob('../components/layout/*.jsx')
// Komponenty přesunuté do lib/ během migrace na TkajUI + donjon-fall-ui
const TKAJUI_GLOB     = import.meta.glob('../lib/tkajui/*.jsx')
const DONJON_GLOB     = import.meta.glob('../lib/donjon/*.jsx')

/* Explicitní override viditelnosti pro konkrétní komponenty */
const VISIBILITY_OVERRIDES = {
  Ornaments: 'internal',
}

/* ── Helpers ── */

/** PascalCase / CamelCase → kebab-case */
function toKebab(name) {
  return name
    .replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)
    .replace(/^-/, '')
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

  const category =
    subdir === 'game-assets' ? 'Game Assets'
    : subdir === 'layout'    ? 'Layout'
    :                          'UI Components'

  const defaultVisibility = category === 'Layout' ? 'internal' : 'public'
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
  }
}

/* ── Sestavení registru ── */
function buildRegistry() {
  const entries = []

  Object.keys(ROOT_GLOB).forEach(path => {
    entries.push(applyMeta(makeEntry(path, 'root')))
  })
  Object.keys(GAME_ASSET_GLOB).forEach(path => {
    entries.push(applyMeta(makeEntry(path, 'game-assets')))
  })
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
export const CATEGORIES = ['UI Components', 'Game Assets', 'Layout']

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
