import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: { presets: [reactCompilerPreset()] },
    }),
  ],
  resolve: {
    // Prefer the workspace package "source" condition so dev + tests
    // read raw .jsx files via the package.json `exports` map. Bundled
    // `dist/*` is what consumers get from npm; we don't need to build
    // before running the app or tests locally.
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
