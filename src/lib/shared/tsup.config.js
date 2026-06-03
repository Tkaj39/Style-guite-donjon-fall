/* tsup build config for @tkaj/donjon-shared.
   Produces dist/ with ESM + CJS bundles + .d.ts from JSDoc.
   App + tests keep using ./ source (Vite resolve.conditions includes "source"). */
import { defineConfig } from 'tsup'

const entries = {
  index:               './index.js',
  tokens:              './tokens.js',
  octagon:             './octagon.js',
  polygon:             './polygon.js',
  sizes:               './sizes.js',
  contrast:            './contrast.js',
  toastContext:        './toastContext.jsx',
  tooltipUtils:        './tooltipUtils.jsx',
  useModalPageInert:   './useModalPageInert.js',
  useBreakpoint:       './useBreakpoint.js',
}

export default defineConfig({
  entry: entries,
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  loader: { '.jsx': 'jsx' },
})
