// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import noHardcodedHex from './scripts/eslint-rules/no-hardcoded-hex.js'
import noComponentInRender from './scripts/eslint-rules/no-component-in-render.js'
import contrastCheck from './scripts/eslint-rules/contrast-check.js'

/** Lokální plugin — donjon pravidla */
const donjonPlugin = {
  rules: {
    'no-hardcoded-hex':      noHardcodedHex,
    'no-component-in-render': noComponentInRender,
    'contrast-check':         contrastCheck,
  },
}

export default [
  // ── Ignorované cesty ──────────────────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      '**/dist/**',          // workspace package builds (src/lib/*/dist)
      'node_modules/**',
      '**/node_modules/**',
    ],
  },
  // ── Testovací soubory — Vitest globály ────────────────────────────────────
  {
    files: ['src/**/*.test.{js,jsx}', 'src/**/__tests__/**/*.{js,jsx}', 'src/test/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        // Vitest test globals
        describe: 'readonly',
        it:       'readonly',
        test:     'readonly',
        expect:   'readonly',
        beforeEach: 'readonly',
        afterEach:  'readonly',
        beforeAll:  'readonly',
        afterAll:   'readonly',
        vi:         'readonly',
      },
    },
  },
  // ── Základní JS pravidla pro celý projekt ─────────────────────────────────
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType:  'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      // React hooks pravidla — zachytí nesprávné deps pole a podmíněné hooky
      'react-hooks/rules-of-hooks':  'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Nehlásit unused vars se _prefix (helper/ignored params)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },
  // ── DONJON pravidlo 1: žádné hardcoded hex v lib/ a pages/ ────────────────
  // Výjimka: tokens.js samotný (tam hex být musí) + ColorsPage (paleta demo).
  // Scope rozšířen na src/pages/ — kolega reportoval že hex v pages neslipne
  // přes review (eslint rule scope byl příliš úzký).
  {
    files: [
      'src/lib/**/*.jsx',
      'src/lib/**/*.js',
      'src/pages/**/*.jsx',
    ],
    ignores: [
      'src/lib/donjon/tokens.js',
      'src/lib/tkajui/tokens.js',
      'src/lib/**/__tests__/**',
      'src/lib/**/*.test.{js,jsx}',
      // ColorsPage je palette demonstration — hex hodnoty jsou předmět ukázky.
      // Vnitřně používá eslint-disable kde to potřebuje.
      'src/pages/ColorsPage.jsx',
    ],
    plugins: { donjon: donjonPlugin },
    rules: {
      'donjon/no-hardcoded-hex': 'error',
    },
  },
  // ── DONJON pravidlo 2: žádné komponenty s hooky uvnitř render funkce ──────
  {
    files: ['src/pages/**/*.jsx', 'src/lib/**/*.jsx'],
    plugins: { donjon: donjonPlugin },
    rules: {
      'donjon/no-component-in-render': 'error',
    },
  },
  // ── DONJON pravidlo 3: WCAG contrast check pro inline style ───────────────
  // Warning, ne error — false-positive ratio existuje (gradients,
  // semi-transparent backgrounds). Eskaluj na 'error' až po validaci.
  {
    files: ['src/lib/**/*.jsx', 'src/pages/**/*.jsx'],
    ignores: ['src/pages/ColorsPage.jsx'],
    plugins: { donjon: donjonPlugin },
    rules: {
      'donjon/contrast-check': ['warn', { level: 'AA-large' }],
    },
  },
  ...storybook.configs["flat/recommended"]
];
