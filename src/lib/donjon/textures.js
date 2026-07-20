/* ── Grass tile textures ─────────────────────────────────────────────────
   Seamless meadow tiles for game-screen backgrounds and HexTile `texture`.

   Import:
     import { grassTile1024 } from 'donjon-fall-ui/textures'
     // sibling/source alias (e.g. donjon-fall-redux):
     import { grassTile1024 } from 'style-guide-donjon-fall/donjon/textures'

   Display convention (ScreensPage desktop): use the 1024 source with
     backgroundSize: '256px 256px' + backgroundRepeat: 'repeat'
   — the larger file is a sharper tile, not a full-viewport stretch.
   Pass the same URL into <HexTile texture={…} /> (empty + base cells).

   Why this subpath is different from ./tokens / ./enums / ./playerColors:
   - Those modules are pure JS, built by tsup into dist/*.{js,cjs,d.ts}.
   - This module resolves binary JPGs via `new URL(..., import.meta.url)`.
     It must stay next to the `textures/` folder as shipped source so the
     relative paths keep working for Vite and for npm consumers.
   - package.json therefore points import/require at ./textures.js (not
     dist/), lists `textures/` in `files`, and does NOT add a tsup entry.
   - Intentionally not re-exported from the main barrel (index.js), so a
     bundler cannot fold this into dist/index.js and break import.meta.url.

   JPGs also remain under /public/textures for the style-guide app’s
   absolute `/textures/…` URLs (ScreensPage). Package copies under
   ./textures/ are the source of truth for library consumers.
   ────────────────────────────────────────────────────────────────────── */

/** @type {string} */
export const grassTile1024 = new URL('./textures/grass_tile_1024x1024.jpg', import.meta.url).href
/** @type {string} */
export const grassTile512  = new URL('./textures/grass_tile_512x512.jpg',  import.meta.url).href
/** @type {string} */
export const grassTile256  = new URL('./textures/grass_tile_256x256.jpg',  import.meta.url).href

/** Breakpoint → tile URL, matching ScreensPage GRASS_TEXTURE. */
export const grassTiles = {
  desktop: grassTile1024,
  tablet:  grassTile512,
  mobile:  grassTile256,
}
