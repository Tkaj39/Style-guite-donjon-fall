# TkajUI

Generic React component library. Cool neutral palette + blue accent, octagonal silhouettes via CSS `clip-path`, no Tailwind dependency.

## Install

```bash
npm install tkajui react react-dom
```

Peer deps: `react >= 18`, `react-dom >= 18`.

## Quick start

```jsx
import { Button, Card, Input, Stack } from 'tkajui'
import 'tkajui/styles'   // tkajui.css — CSS custom properties + utility classes

export function App() {
  return (
    <Card title="Welcome">
      <Stack gap="md">
        <Input placeholder="Type something…" />
        <Button variant="success">Submit</Button>
      </Stack>
    </Card>
  )
}
```

## Subpath exports

| Import | What it gives you |
|---|---|
| `tkajui` | All React components + enums + token re-exports. |
| `tkajui/tokens` | Palette + spacing tokens as JS constants. |
| `tkajui/enums` | `*_VALUES` arrays for every enum-typed prop (drives select pickers, validation). |
| `tkajui/styles` | The CSS file with `:root { --tkajui-* }` custom properties and `.tkajui-segment-button` / `.dj-clip-focus` utility classes. |

## Components

Basic: `Button`, `Badge`, `Card`, `Input`, `Select`, `Toggle`, `Slider`, `Avatar`, `Pictogram`.
Composite: `Modal`, `Tooltip`, `Toast` (+ `ToastProvider`), `Tabs`, `NotchMenu`, `ButtonGroup`, `SubmitButton`.
Layout: `Stack`, `Inline`, `Cluster`, `Grid`, `Container`, `Box`, `Spacer`, `Split`, `Center`, `AspectBox`.
Form: `Field`, `Form`, `Radio`, `RadioGroup`, `Checkbox`, `CheckboxGroup`, `TextArea`, `NumberInput`, `Combobox`.
Feedback: `Spinner`, `Skeleton`, `Alert`, `Banner`.
Buttons & media: `IconButton`, `HeroImage`, `Backdrop`, `Thumbnail`.
Inventory: `InventorySlot`, `InventoryGrid`.
Layout structures: `StickyBar`, `SidebarLayout`.
Disclosure: `Drawer`, `DropdownMenu`, `Accordion`.
Data display: `Table`, `List`, `DescriptionList`, `Stat`.
Navigation: `Breadcrumb`, `Pagination`, `ContextMenu`.

Full live showcase: [Style guide](https://github.com/Tkaj39/Style-guite-donjon-fall) — every component has a `/component-name` route.

## Architecture

```
shared  ← tkajui     (this package, base layer)
shared  ← donjon-fall-ui  ← tkajui  (game-themed layer on top)
```

`tkajui` may import from `@tkaj/donjon-shared` (clip-path helpers, motion / breakpoint / z-index tokens). It MUST NOT import from `donjon-fall-ui`.

## License

MIT
