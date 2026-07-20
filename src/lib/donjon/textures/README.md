# Grass tile textures

JPG sources for `donjon-fall-ui/textures` (`../textures.js`).

## Why this folder / export looks different

Other donjon subpaths (`./tokens`, `./enums`, `./playerColors`) are pure JS:
tsup builds them into `dist/*.{js,cjs,d.ts}`, and `package.json` `exports`
point `import`/`require` at those built files.

**This is different on purpose.** Consumers need real image URLs for screen
backgrounds and `<HexTile texture={…} />`. Resolution uses
`new URL('./textures/….jpg', import.meta.url)` in `../textures.js`, so:

1. The JPGs must sit next to that module when the package is installed.
2. `textures.js` is **not** a tsup entry and is **not** re-exported from the
   main barrel — bundling it into `dist/` would break those relative URLs.
3. `package.json` therefore maps `./textures` → source `./textures.js` and
   lists this `textures/` directory in `files`.

When aligning new asset exports with the “normal” tsup pipeline, you’d need
extra copy-into-`dist/` steps; until then, treat this subpath as a documented
exception. Full write-up: header comment in `../textures.js`.
