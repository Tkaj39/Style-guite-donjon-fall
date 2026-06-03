/* tsup build config for donjon-fall-ui.
   Produces dist/ with ESM + CJS bundles + .d.ts. The donjon.css ships
   verbatim via the `files` allowlist. */
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index:        './index.js',
    tokens:       './tokens.js',
    enums:        './enums.js',
    playerColors: './playerColors.js',
  },
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom', '@tkaj/donjon-shared', 'tkajui'],
  loader: { '.jsx': 'jsx' },
})
