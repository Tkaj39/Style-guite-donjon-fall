import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const ROOT = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: { presets: [reactCompilerPreset()] },
    }),
  ],
  resolve: {
    // The workspace package.json `main`/`module` fields point at `dist/`
    // so npm consumers get the bundled output. For dev + tests we want
    // raw .jsx source so changes hot-reload without rebuilding the lib.
    // Three explicit aliases short-circuit folder resolution back to the
    // source index. The dist/ files still exist (built by tsup) — these
    // aliases are dev-only and have no effect on what consumers receive.
    alias: [
      { find: /^\.\.\/lib\/shared$/, replacement: resolve(ROOT, 'src/lib/shared/index.js') },
      { find: /^\.\.\/lib\/tkajui$/, replacement: resolve(ROOT, 'src/lib/tkajui/index.js') },
      { find: /^\.\.\/lib\/donjon$/, replacement: resolve(ROOT, 'src/lib/donjon/index.js') },
    ],
    // Keep the "source" condition first so any future package.json with
    // a "source" export is also caught.
    conditions: ['source', 'import', 'module', 'default'],
  },
  server: {
    forwardConsole: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
  },
})
