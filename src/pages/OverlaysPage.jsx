/* ── Overlays hub ────────────────────────────────────────────────────
   Landing page for the floating-layer family. Doesn't host showcases
   itself — each component still has its own detailed route — but
   centralises the entry point so the sidebar isn't flooded with 6
   sibling links.

   If a sub-page ever shrinks to <100 lines and has only a single
   canonical demo, it's a candidate for being inlined here. Until then
   the link cards below stand.
   ─────────────────────────────────────────────────────────────────── */
import { Link } from 'react-router-dom'
import { ShowcasePage, Section } from '../styleguide/ShowcasePage'
import { Stack, Grid } from '../lib/tkajui/Layout'
import { surface2, surface3, surface4, borderDefault, accent, textHigh, textMid, textLow } from '../lib/tkajui/tokens'

const OVERLAYS = [
  {
    to: '/modal',
    title: 'Modal',
    line: 'Blocking dialog. Native <dialog> top-layer, focus trap, inert background, octagon panel.',
    badge: 'tkajui + donjon',
  },
  {
    to: '/tooltip',
    title: 'Tooltip',
    line: 'Hover/focus hint. 4-side placement with auto-flip, follow-cursor mode, optional arrow.',
    badge: 'tkajui + donjon',
  },
  {
    to: '/toast',
    title: 'Toast',
    line: 'Auto-dismiss notification. Provider + useToast() hook, 4 corner positions, variant + progress.',
    badge: 'tkajui + donjon',
  },
  {
    to: '/notification-center',
    title: 'NotificationCenter',
    line: 'Persistent feed of notifications. Bell trigger, archive/unread split, donjon-only for now.',
    badge: 'donjon',
  },
  {
    to: '/notch-menu',
    title: 'NotchMenu',
    line: 'Shape-driven side menu with notched octagon corners. Items dock to top/bottom edges.',
    badge: 'tkajui + donjon',
  },
  {
    to: '/disclosure',
    title: 'Drawer · DropdownMenu · Accordion',
    line: 'Three progressive-disclosure controls in one showcase. Slide-in panel, popover menu, collapsible sections.',
    badge: 'tkajui',
  },
]

function OverlayCard({ to, title, line, badge }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 16,
        background: surface3,
        border: `1px solid ${borderDefault}`,
        borderRadius: 6,
        textDecoration: 'none',
        transition: 'background 80ms, border-color 80ms',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = surface4; e.currentTarget.style.borderColor = accent }}
      onMouseLeave={(e) => { e.currentTarget.style.background = surface3; e.currentTarget.style.borderColor = borderDefault }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <strong style={{ color: textHigh, fontSize: '0.9375rem' }}>{title}</strong>
        <span style={{ fontSize: '0.625rem', color: textLow, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {badge}
        </span>
      </div>
      <p style={{ margin: 0, color: textMid, fontSize: '0.8125rem', lineHeight: 1.5 }}>
        {line}
      </p>
      <span style={{ color: accent, fontSize: '0.75rem', marginTop: 'auto' }}>
        Otevřít detail →
      </span>
    </Link>
  )
}

export default function OverlaysPage() {
  return (
    <ShowcasePage
      title="Overlays"
      description="Komponenty co se zobrazují NAD základním layoutem — modaly, tooltips, toasty, notifikace, slide-in panely. Každá má vlastní detailní stránku, tady je rozcestník."
    >
      <Section id="overview" title="6 overlay typů">
        <Grid columns={2} gap="md">
          {OVERLAYS.map(o => <OverlayCard key={o.to} {...o} />)}
        </Grid>
      </Section>

      <Section id="layering" title="Z-index hierarchie">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>Z-index pořadí (zdola nahoru):</p>
          <p style={{ margin: 0 }}>1. <strong>Drawer / NotchMenu</strong> (zDropdown = 900) — side panely</p>
          <p style={{ margin: 0 }}>2. <strong>Modal</strong> (native &lt;dialog&gt; top-layer) — blokuje pozadí</p>
          <p style={{ margin: 0 }}>3. <strong>NotificationCenter</strong> (zNotification = 1900)</p>
          <p style={{ margin: 0 }}>4. <strong>Toast</strong> (zToast = 2000)</p>
          <p style={{ margin: 0 }}>5. <strong>Tooltip</strong> (zTooltip = 2100) — vždy nejvýš</p>
          <p style={{ margin: 0, color: textLow }}>Sdíleno přes <code>@tkaj/donjon-shared/tokens</code>. Modal nepoužívá z-index — native &lt;dialog&gt; má vlastní top-layer.</p>
        </Stack>
      </Section>

      <Section id="kdy-co" title="Kdy použít co">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>Modal</strong> — kritická akce vyžadující potvrzení (delete, sign out, confirm).</p>
          <p style={{ margin: 0 }}>✓ <strong>Tooltip</strong> — krátký hint co je trigger. Žádné akce uvnitř.</p>
          <p style={{ margin: 0 }}>✓ <strong>Toast</strong> — transient zpráva o dokončené akci (save success). Auto-dismiss.</p>
          <p style={{ margin: 0 }}>✓ <strong>NotificationCenter</strong> — historie toastů + push notifs. Persistent, archivable.</p>
          <p style={{ margin: 0 }}>✓ <strong>NotchMenu</strong> — side panel s shape-driven dock. Pro game settings, character sheet.</p>
          <p style={{ margin: 0 }}>✓ <strong>Drawer</strong> — slide-in panel kdykoli (z disclosure stránky). Mobile nav, properties panel.</p>
          <p style={{ margin: 0 }}>✓ <strong>DropdownMenu</strong> — click trigger + items s ikonou/shortcut/danger. (disclosure)</p>
          <p style={{ margin: 0 }}>✓ <strong>Accordion</strong> — collapsible sekce v document flow. FAQ, settings. (disclosure)</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
