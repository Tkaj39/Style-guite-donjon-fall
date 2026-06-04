import { useState } from 'react'
import Input from '../Input'

export default {
  title: 'TkajUI/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    label: { control: 'text' },
    hint:  { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    label: 'Username',
    placeholder: 'Type something…',
  },
  render: (args) => {
    const [v, setV] = useState('Aragorn')
    return <Input {...args} value={v} onChange={setV} />
  },
}

export const Default = {}
export const WithHint  = { args: { hint: 'At least 3 characters.' } }
export const WithError = { args: { error: 'Username already taken.' } }
export const Disabled  = { args: { disabled: true } }
export const Multiline = { args: { multiline: true, rows: 3, label: 'Bio' } }
