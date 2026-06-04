import FramedImage from '../FramedImage'

export default {
  title: 'donjon-fall-ui/Game/FramedImage',
  component: FramedImage,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    ornament: { control: 'select', options: ['decorated', 'plain'] },
  },
  args: {
    src: 'https://picsum.photos/seed/aragorn/400/400',
    alt: 'Aragorn',
    size: 'md',
  },
}

export const Default = {}
export const Plain   = { args: { ornament: 'plain' } }

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      <FramedImage src="https://picsum.photos/seed/a/200/200" size="xs" />
      <FramedImage src="https://picsum.photos/seed/b/200/200" size="sm" />
      <FramedImage src="https://picsum.photos/seed/c/200/200" size="md" />
      <FramedImage src="https://picsum.photos/seed/d/200/200" size="lg" />
      <FramedImage src="https://picsum.photos/seed/e/200/200" size="xl" />
    </div>
  ),
}
