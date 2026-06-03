import { useState } from 'react'
import Breadcrumb from '../lib/tkajui/Breadcrumb'
import Pagination from '../lib/tkajui/Pagination'
import ContextMenu from '../lib/tkajui/ContextMenu'
import { Stack } from '../lib/tkajui/Layout'
import { surface2, surface3, borderDefault, textMid, textLow, textHigh } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

function BreadcrumbDemo() {
  return (
    <Stack gap="md">
      <Breadcrumb
        items={[
          { label: 'Home',     href: '#', onClick: (e) => e.preventDefault() },
          { label: 'Library',  href: '#', onClick: (e) => e.preventDefault() },
          { label: 'Weapons',  href: '#', onClick: (e) => e.preventDefault() },
          { label: 'Iron Sword' },
        ]}
      />
      <Breadcrumb
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
  const [page, setPage] = useState(1)
  const [bigPage, setBigPage] = useState(42)
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Small total (5 pages)</span>
        <Pagination page={page} total={5} onChange={setPage} />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Big total (88 pages, siblingCount=1)</span>
        <Pagination page={bigPage} total={88} onChange={setBigPage} />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Size variants</span>
        <Pagination page={3} total={10} onChange={() => {}} size="sm" />
        <Pagination page={3} total={10} onChange={() => {}} size="md" />
        <Pagination page={3} total={10} onChange={() => {}} size="lg" />
      </Stack>
    </Stack>
  )
}

function ContextMenuDemo() {
  const [log, setLog] = useState('(right-click v boxu)')
  return (
    <Stack gap="md">
      <ContextMenu
        items={[
          { label: 'View',     icon: '👁',  shortcut: 'V',     onClick: () => setLog('View') },
          { label: 'Rename',   icon: '✎',   shortcut: 'F2',    onClick: () => setLog('Rename') },
          { label: 'Duplicate', icon: '⎘',  shortcut: 'Ctrl+D', onClick: () => setLog('Duplicate') },
          { divider: true },
          { label: 'Properties', icon: 'ⓘ', disabled: true },
          { divider: true },
          { label: 'Delete',   icon: '🗑',  shortcut: 'Del', danger: true, onClick: () => setLog('Delete') },
        ]}
      >
        <div style={{
          height: 160,
          background: surface3,
          border: `1px dashed ${borderDefault}`,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: textMid,
          fontSize: '0.875rem',
          userSelect: 'none',
        }}>
          Right-click anywhere in this box
        </div>
      </ContextMenu>
      <span style={{ fontSize: '0.75rem', color: textHigh }}>Last action: <strong>{log}</strong></span>
    </Stack>
  )
}

export default function NavigationPage() {
  return (
    <ShowcasePage
      title="Navigation"
      description="Breadcrumb + Pagination + ContextMenu — sada pro orientaci v hierarchii, stránkování dlouhých listů, right-click menu."
      componentSlugs={['breadcrumb', 'pagination', 'context-menu']}
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
        description="Controlled (page + total + onChange). Vždy zobrazí první/poslední, kolem aktuální `siblingCount` (default 1), zbytek ellipses (…). Tabular-nums pro stabilní šířku čísel."
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
        description="Obklopí oblast; `onContextMenu` otevře popover na pozici kurzoru. Stejný item formát jako DropdownMenu (label, icon, shortcut, danger, divider, disabled). Auto-clamp uvnitř viewportu."
      >
        <Preview>
          <ContextMenuDemo />
        </Preview>
        <CodeBlock code={`<ContextMenu items={[
  { label: 'View',      icon: '👁',  shortcut: 'V',   onClick: open },
  { label: 'Rename',    icon: '✎',   shortcut: 'F2', onClick: rename },
  { divider: true },
  { label: 'Delete',    icon: '🗑', shortcut: 'Del', danger: true, onClick: del },
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
