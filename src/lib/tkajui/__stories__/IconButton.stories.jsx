import { useState } from 'react'
import IconButton from '../IconButton'

export default {
  title: 'TkajUI/Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'danger', 'warning', 'info'] },
    size:    { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    ariaLabel: 'Settings',
    children: '⚙',
    size: 'md',
  },
}

export const Default = {}

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton ariaLabel="Settings"             >⚙</IconButton>
      <IconButton ariaLabel="Confirm" variant="success">✓</IconButton>
      <IconButton ariaLabel="Delete"  variant="danger" >×</IconButton>
      <IconButton ariaLabel="Warning" variant="warning">!</IconButton>
      <IconButton ariaLabel="Info"    variant="info"   >ⓘ</IconButton>
    </div>
  ),
}

export const Toggle = {
  render: () => {
    const [muted, setMuted] = useState(false)
    return (
      <IconButton
        ariaLabel="Mute"
        active={muted}
        onClick={() => setMuted(m => !m)}
      >
        {muted ? '🔇' : '🔊'}
      </IconButton>
    )
  },
}
