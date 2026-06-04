import { useState, useEffect } from 'react'
import ResourceBar from '../ResourceBar'

export default {
  title: 'donjon-fall-ui/Game/ResourceBar',
  component: ResourceBar,
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['hp', 'mana', 'stamina', 'xp', 'shield', 'default'] },
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    value:     { control: 'number' },
    max:       { control: 'number' },
    showValue: { control: 'boolean' },
    zones:     { control: 'boolean' },
  },
  args: {
    variant:   'hp',
    size:      'md',
    value:     68,
    max:       100,
    label:     'HP',
    showValue: true,
    zones:     true,
  },
}

export const HP      = {}
export const Mana    = { args: { variant: 'mana',    label: 'Mana',    value: 32, max: 50 } }
export const Stamina = { args: { variant: 'stamina', label: 'Stamina', value: 75 } }
export const XP      = { args: { variant: 'xp',      label: 'XP',      value: 240, max: 500 } }

export const Live = {
  render: () => {
    const [hp, setHp] = useState(100)
    useEffect(() => {
      const t = setInterval(() => setHp(h => (h <= 0 ? 100 : h - 7)), 700)
      return () => clearInterval(t)
    }, [])
    return <ResourceBar value={hp} max={100} variant="hp" label="HP" showValue zones size="lg" />
  },
}
