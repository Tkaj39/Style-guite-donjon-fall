import DonjonButton from '../DonjonButton'

export default {
  title: 'donjon-fall-ui/Basic/DonjonButton',
  component: DonjonButton,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['default', 'primary', 'danger', 'success', 'warning', 'link'] },
    size:     { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    ornament: { control: 'select', options: ['decorated', 'plain'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    variant:  'default',
    size:     'md',
    ornament: 'decorated',
    children: 'End turn',
  },
}

export const Default  = {}
export const Primary  = { args: { variant: 'primary', children: 'Attack' } }
export const Success  = { args: { variant: 'success', children: 'Take loot' } }
export const Danger   = { args: { variant: 'danger',  children: 'Surrender' } }
export const Plain    = { args: { ornament: 'plain',  children: 'Plain (no ornaments)' } }

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <DonjonButton variant="default">Default</DonjonButton>
      <DonjonButton variant="primary">Primary</DonjonButton>
      <DonjonButton variant="success">Success</DonjonButton>
      <DonjonButton variant="warning">Warning</DonjonButton>
      <DonjonButton variant="danger">Danger</DonjonButton>
      <DonjonButton variant="link">Link</DonjonButton>
    </div>
  ),
}
