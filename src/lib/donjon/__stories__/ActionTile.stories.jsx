import { useState } from 'react'
import ActionTile from '../ActionTile'
import { SwordIcon, ShieldIcon, MagicIcon, TargetIcon } from '../Icons'

export default {
  title: 'donjon-fall-ui/Game/ActionTile',
  component: ActionTile,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    title:    { control: 'text' },
    cost:     { control: 'number' },
  },
  args: {
    title:    'Attack',
    cost:     2,
    size:     'md',
    icon:     <SwordIcon width={28} height={28} />,
  },
}

export const Default = {}
export const Selected = { args: { selected: true } }
export const Disabled = { args: { disabled: true, title: 'Mana too low' } }

export const ActionBar = {
  render: () => {
    const [pick, setPick] = useState('attack')
    return (
      <div style={{ display: 'flex', gap: 12 }}>
        <ActionTile icon={<SwordIcon  width={28} height={28} />} title="Attack" cost={2} selected={pick === 'attack'} onClick={() => setPick('attack')} />
        <ActionTile icon={<ShieldIcon width={28} height={28} />} title="Defend" cost={1} selected={pick === 'defend'} onClick={() => setPick('defend')} />
        <ActionTile icon={<MagicIcon  width={28} height={28} />} title="Spell"  cost={4} selected={pick === 'spell'}  onClick={() => setPick('spell')} />
        <ActionTile icon={<TargetIcon width={28} height={28} />} title="Aim"    cost={1} disabled />
      </div>
    )
  },
}
