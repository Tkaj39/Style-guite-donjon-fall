import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Resolve the absolute install path of a package — handles workspaces. */
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  framework: getAbsolutePath('@storybook/react-vite'),
  // Pick up *.stories.{js,jsx,mjs,ts,tsx} + MDX from src/. Component
  // stories live under src/lib/{tkajui,donjon}/__stories__/ next to the
  // component source.
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  // Kept lean: only a11y panel + docs. addon-vitest / addon-mcp /
  // chromatic-com were dropped at setup time — addon-vitest depends on
  // the multi-project vitest config we reverted; chromatic + mcp are
  // optional CI integrations the project doesn't use yet.
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
}

export default config
