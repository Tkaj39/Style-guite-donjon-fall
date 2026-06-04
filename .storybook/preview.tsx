import type { Preview } from '@storybook/react-vite'

// Both lib stylesheets so stories using token CSS variables resolve.
// Order: tkajui → donjon (donjon overrides nothing token-wise; both
// provide their own --tkajui-* / --donjon-* custom property namespace).
import '../src/lib/tkajui/tkajui.css'
import '../src/lib/donjon/donjon.css'
// The app's own keyframes (fadeIn / spin / skeletonShimmer / rewardPopIn
// / achievementSlideIn / levelUpPop / …) — needed for any animated story.
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    backgrounds: {
      default: 'donjon',
      values: [
        // eslint-disable-next-line donjon/no-hardcoded-hex -- background canvas color, not a component style
        { name: 'donjon',  value: '#12102A' }, // donjon bg0
        // eslint-disable-next-line donjon/no-hardcoded-hex -- background canvas color, not a component style
        { name: 'tkajui',  value: '#0d0d14' }, // tkajui surface0
        // eslint-disable-next-line donjon/no-hardcoded-hex -- background canvas color, not a component style
        { name: 'light',   value: '#ffffff' },
      ],
    },
    a11y: {
      // 'todo'  — show violations in panel only
      // 'error' — fail CI on violations
      test: 'todo',
    },
  },
}

export default preview
