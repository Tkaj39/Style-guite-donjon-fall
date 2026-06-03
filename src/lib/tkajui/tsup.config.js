/* tsup build config for tkajui.
   Produces dist/ with ESM + CJS bundles + .d.ts. The tkajui.css ships
   verbatim (copied via the `files` allowlist in package.json).
   App + tests keep using ./ source via Vite resolve.conditions. */
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index:  './index.js',
    tokens: './tokens.js',
    enums:  './enums.js',
  },
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  // React + shared package + donjon (if any cross-ref) are externals so the
  // bundle stays small and consumers dedupe their copies.
  external: ['react', 'react-dom', '@tkaj/donjon-shared'],
  loader: { '.jsx': 'jsx' },
})
