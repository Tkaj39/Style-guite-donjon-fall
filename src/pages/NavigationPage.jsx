import { useState } from 'react'
import Breadcrumb from '../lib/tkajui/Breadcrumb'
import Pagination from '../lib/tkajui/Pagination'
import ContextMenu from '../lib/tkajui/ContextMenu'
import { Stack } from '../lib/tkajui/Layout'
import { surface2, surface3, borderDefault, textMid, textLow, textHigh } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'
import {
  SearchIcon, EditIcon, CopyIcon, InfoIcon, TrashIcon,
} from '../lib/tkajui'
import {
  DonjonBreadcrumb, DonjonPagination, DonjonContextMenu,
} from '../lib/donjon'
import { bg3, goldDim, textMid as donjonTextMid, goldMid } from '../lib/donjon/tokens'

const ICON_SIZE = { width: 14, height: 14 }

function BreadcrumbDemo() {
  const lib = useLibVariant()
  const BreadcrumbC = lib === 'donjon' ? DonjonBreadcrumb : Breadcrumb
  return (
    <Stack gap="md">
      <BreadcrumbC
        items={[
          { label: 'Home',     href: '#', onClick: (e) => e.preventDefault() },
          { label: 'Library',  href: '#', onClick: (e) => e.preventDefault() },
          { label: 'Weapons',  href: '#', onClick: (e) => e.preventDefault() },
          { label: 'Iron Sword' },
        ]}
      />
      <BreadcrumbC
        separator="/"
        items={[
          { label: 'Settings', href: '#', onClick: (e) => e.preventDefault() },
          { label: 'Audio' },
        ]}
      />
    </Stack>
  )
}

function PaginationDemo() {
  const lib = useLibVariant()
  const PaginationC = lib === 'donjon' ? DonjonPagination : Pagination
  const labelColor = lib === 'donjon' ? goldMid : textLow
  const [page, setPage] = useState(1)
  const [bigPage, setBigPage] = useState(42)
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: labelColor }}>Small total (5 pages)</span>
        <PaginationC page={page} total={5} onChange={setPage} />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: labelColor }}>Big total (88 pages, siblingCount=1)</span>
        <PaginationC page={bigPage} total={88} onChange={setBigPage} />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: labelColor }}>Size variants</span>
        <PaginationC page={3} total={10} onChange={() => {}} size="sm" />
        <PaginationC page={3} total={10} onChange={() => {}} size="md" />
        <PaginationC page={3} total={10} onChange={() => {}} size="lg" />
      </Stack>
    </Stack>
  )
}

function ContextMenuDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const ContextMenuC = isDonjon ? DonjonContextMenu : ContextMenu
  const [log, setLog] = useState('(right-click v boxu)')

  // Themed colors for the right-click target box so it reads in either palette.
  const boxBg     = isDonjon ? bg3 : surface3
  const boxBorder = isDonjon ? goldDim : borderDefault
  const boxText   = isDonjon ? donjonTextMid : textMid

  return (
    <Stack gap="md">
      <ContextMenuC
        items={[
          { label: 'View',      icon: <SearchIcon {...ICON_SIZE} />, shortcut: 'V',     onClick: () => setLog('View') },
          { label: 'Rename',    icon: <EditIcon {...ICON_SIZE} />,   shortcut: 'F2',    onClick: () => setLog('Rename') },
          { label: 'Duplicate', icon: <CopyIcon {...ICON_SIZE} />,   shortcut: 'Ctrl+D', onClick: () => setLog('Duplicate') },
          { divider: true },
          { label: 'Properties', icon: <InfoIcon {...ICON_SIZE} />, disabled: true },
          { divider: true },
          { label: 'Delete',    icon: <TrashIcon {...ICON_SIZE} />,  shortcut: 'Del', danger: true, onClick: () => setLog('Delete') },
        ]}
      >
        <div style={{
          height: 160,
          background: boxBg,
          border: `1px dashed ${boxBorder}`,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: boxText,
          fontSize: '0.875rem',
          userSelect: 'none',
        }}>
          Right-click anywhere in this box
        </div>
      </ContextMenuC>
      <span style={{ fontSize: '0.75rem', color: textHigh }}>Last action: <strong>{log}</strong></span>
    </Stack>
  )
}

export default function NavigationPage() {
  return (
    <ShowcasePage
      title="Navigation"
      description="Breadcrumb + Pagination + ContextMenu — sada pro orientaci v hierarchii, stránkování dlouhých listů, right-click menu."
      componentSlugs={[
        'breadcrumb', 'donjon-breadcrumb',
        'pagination', 'donjon-pagination',
        'context-menu', 'donjon-context-menu',
      ]}
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section
        id="breadcrumb"
        title="Breadcrumb — hierarchická cesta"
        description="Items[] s {label, href?, onClick?}. Poslední item = current page (`aria-current='page'`, žádný odkaz). `linkComponent` přepíše defaultní &lt;a&gt; na router Link."
      >
        <Preview>
          <BreadcrumbDemo />
        </Preview>
        <CodeBlock code={`<Breadcrumb items={[
  { label: 'Home',    href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'Weapons', href: '/library/weapons' },
  { label: 'Iron Sword' },  // current page
]} />

{/* With React Router */}
<Breadcrumb linkComponent={Link} separator="/" items={…} />`} />
      </Section>

      <Section
        id="pagination"
        title="Pagination — page navigator"
        description="Controlled (page + total + onChange). Vždy zobrazí první/poslední, kolem aktuální `siblingCount` (default 1), zbytek ellipses (…). Tabular-nums pro stabilní šířku čísel. Donjon varianta zaobaluje každý chip do octagonálního tile přes border-trick."
      >
        <Preview>
          <PaginationDemo />
        </Preview>
        <CodeBlock code={`const [page, setPage] = useState(1)

<Pagination page={page} total={88} onChange={setPage} />

{/* More neighbors visible */}
<Pagination page={42} total={88} onChange={setPage} siblingCount={2} />

{/* Hide prev/next arrows */}
<Pagination page={page} total={5} onChange={setPage} showEdges={false} />`} />
      </Section>

      <Section
        id="context-menu"
        title="ContextMenu — right-click menu"
        description="Obklopí oblast; `onContextMenu` otevře popover na pozici kurzoru. Stejný item formát jako DropdownMenu (label, icon, shortcut, danger, divider, disabled). Auto-clamp uvnitř viewportu. Donjon varianta dostává parchment shell — bg2 panel na gold borderu s octagonálním clipem."
      >
        <Preview>
          <ContextMenuDemo />
        </Preview>
        <CodeBlock code={`import { SearchIcon, EditIcon, TrashIcon } from 'tkajui'

<ContextMenu items={[
  { label: 'View',   icon: <SearchIcon width={14} height={14} />, shortcut: 'V',   onClick: open },
  { label: 'Rename', icon: <EditIcon   width={14} height={14} />, shortcut: 'F2', onClick: rename },
  { divider: true },
  { label: 'Delete', icon: <TrashIcon  width={14} height={14} />, shortcut: 'Del', danger: true, onClick: del },
]}>
  <FileTile />
</ContextMenu>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>Breadcrumb</strong> pro 3+ úroveň hierarchie. Pro 1-2 úrovně → back tlačítko stačí.</p>
          <p style={{ margin: 0 }}>✓ <strong>Pagination</strong> má max ~10 vidět čísel — pro nekonečné listy použij Load more / virtual scroll.</p>
          <p style={{ margin: 0 }}>✓ <strong>ContextMenu</strong> jen jako sekundární přístup — primary akce musí být dostupná i bez right-click (touch / mobile / a11y).</p>
          <p style={{ margin: 0 }}>✓ Item formát ContextMenu je identický s DropdownMenu → můžeš sdílet `items` array.</p>
          <p style={{ margin: 0, color: textLow }}>Routing-agnostic: Breadcrumb a Pagination nepředpokládají žádný router. Naroute si je sám přes onClick nebo `linkComponent`.</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
