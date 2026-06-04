import { useState, useEffect } from 'react'
import Spinner from '../lib/tkajui/Spinner'
import Skeleton from '../lib/tkajui/Skeleton'
import Alert from '../lib/tkajui/Alert'
import Banner from '../lib/tkajui/Banner'
import Button from '../lib/tkajui/Button'
import ProgressBar from '../lib/tkajui/ProgressBar'
import DonjonProgressBar from '../lib/donjon/DonjonProgressBar'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

function SpinnerDemo() {
  return (
    <Stack gap="lg">
      <Inline gap="lg" align="center">
        {['xs', 'sm', 'md', 'lg', 'xl'].map(sz => (
          <Stack key={sz} gap="xs" align="center">
            <Spinner size={sz} />
            <span style={{ fontSize: '0.7rem', color: textLow }}>{sz}</span>
          </Stack>
        ))}
      </Inline>
      <Stack gap="sm">
        <Spinner label="Saving changes…" />
        <Spinner label="Loading game…" size="lg" />
      </Stack>
    </Stack>
  )
}

function SkeletonDemo() {
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Text variant — 3 lines</span>
        <Skeleton variant="text" lines={3} />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Block variant — card placeholder</span>
        <Skeleton variant="block" height={120} />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Compound — avatar + title + body</span>
        <Inline gap="md" align="start">
          <Skeleton variant="circle" width={48} />
          <Stack gap="xs" style={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" lines={2} />
          </Stack>
        </Inline>
      </Stack>
    </Stack>
  )
}

function AlertDemo() {
  const [dismissed, setDismissed] = useState(false)
  return (
    <Stack gap="md">
      <Alert variant="info" title="Heads up">
        Your save file is from version 1.4 — it will be auto-upgraded on first load.
      </Alert>
      <Alert variant="success">Settings saved successfully.</Alert>
      <Alert variant="warning" title="Storage almost full" action={<Button size="sm" variant="link">Manage</Button>}>
        You've used 92 % of your cloud save quota.
      </Alert>
      <Alert variant="danger" title="Login failed">
        Wrong password. Try again or reset via email.
      </Alert>
      {!dismissed && (
        <Alert variant="info" onDismiss={() => setDismissed(true)}>
          Dismissible info — close me with the × button.
        </Alert>
      )}
    </Stack>
  )
}

function BannerDemo() {
  const [show, setShow] = useState(true)
  return (
    <Stack gap="md">
      <Banner variant="info" title="New" action={<Button size="sm" variant="default">View notes</Button>}>
        Patch 2.1 is live — new map, balance changes, bugfixes.
      </Banner>
      <Banner variant="warning" title="Maintenance">
        Servers will restart at 22:00 UTC for a 15-minute window.
      </Banner>
      <Banner variant="danger">Connection lost. Reconnecting…</Banner>
      <Banner variant="success">All systems operational.</Banner>
      {show && (
        <Banner variant="info" onDismiss={() => setShow(false)} title="Dismissible">
          Click the × on the right to close this banner.
        </Banner>
      )}
    </Stack>
  )
}

function ProgressBarDemo() {
  const lib = useLibVariant()
  const P = lib === 'donjon' ? DonjonProgressBar : ProgressBar
  const [value, setValue] = useState(40)
  useEffect(() => {
    const t = setInterval(() => setValue(v => (v >= 100 ? 0 : v + 5)), 350)
    return () => clearInterval(t)
  }, [])
  return (
    <Stack gap="lg">
      <P value={value} variant="default" showValue />
      <P value={70} variant="success" showValue label="Download" />
      <P value={28} variant="warning" showValue label="Low HP" />
      <P value={92} variant="danger"  showValue label="Almost dead" />
      <Inline gap="md" align="end">
        {['xs', 'sm', 'md', 'lg'].map(sz => (
          <P key={sz} size={sz} value={value} style={{ minWidth: 120 }} showValue />
        ))}
      </Inline>
    </Stack>
  )
}

export default function FeedbackPage() {
  return (
    <ShowcasePage
      title="Feedback"
      description="Spinner + Skeleton + Alert + Banner + ProgressBar — celá sada pro průběžnou komunikaci stavu uživateli. Spinner = unknown duration, Skeleton = layout placeholder, Alert = inline contextual, Banner = page-level announcement, ProgressBar = known progress %."
      componentSlugs={['spinner', 'skeleton', 'alert', 'banner', 'progress-bar', 'donjon-progress-bar']}
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section
        id="spinner"
        title="Spinner — indeterminate loading"
        description="Tenký kruh + rotující čtvrtinový oblouk. Pro známý progress použij ProgressBar. `label` přidá accessible name + viditelný text vedle."
      >
        <Preview>
          <SpinnerDemo />
        </Preview>
        <CodeBlock code={`<Spinner size="md" />
<Spinner label="Saving changes…" size="lg" />
<Spinner size={64} color={warningColor} />`} />
      </Section>

      <Section
        id="skeleton"
        title="Skeleton — content placeholder"
        description="Pravoúhlý/kruhový tvar s shimmer gradientem. Rezervuje layout space před načtením dat → žádný CLS. Varianty: text, block, circle."
      >
        <Preview>
          <SkeletonDemo />
        </Preview>
        <CodeBlock code={`<Skeleton variant="text" lines={3} />
<Skeleton variant="block" height={120} />
<Skeleton variant="circle" width={48} />

{/* Compound — avatar + 2 lines */}
<Inline gap="md">
  <Skeleton variant="circle" width={48} />
  <Stack gap="xs" style={{ flex: 1 }}>
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="text" lines={2} />
  </Stack>
</Inline>`} />
      </Section>

      <Section
        id="alert"
        title="Alert — inline contextual message"
        description="Persistentní (žádný auto-dismiss), pozicovaný inline. Ikona + title + body + akce + dismiss. Varianty: info / success / warning / danger / default."
      >
        <Preview>
          <AlertDemo />
        </Preview>
        <CodeBlock code={`<Alert variant="info" title="Heads up">
  Your save file is from v1.4 — will be auto-upgraded.
</Alert>

<Alert variant="warning" action={<Button size="sm" variant="link">Manage</Button>}>
  Storage 92 % full.
</Alert>

<Alert variant="info" onDismiss={() => setShown(false)}>
  Dismissible
</Alert>`} />
      </Section>

      <Section
        id="banner"
        title="Banner — page-level announcement"
        description="Full-width pruh nahoře stránky/sekce. Silnější vizuální weight než Alert. `sticky` pro `position: sticky; top: 0`."
      >
        <Preview>
          <BannerDemo />
        </Preview>
        <CodeBlock code={`<Banner variant="info" title="New" action={<Button size="sm">View notes</Button>}>
  Patch 2.1 is live.
</Banner>

<Banner variant="warning" sticky>
  Servers restart at 22:00 UTC.
</Banner>`} />
      </Section>

      <Section
        id="progress-bar"
        title="ProgressBar — known progress %"
        description="Pro známý progress (download, save, install). Pokud délka není známá, použij Spinner. Variants pro semantic stavy, sizes, optional label/value."
      >
        <Preview>
          <ProgressBarDemo />
        </Preview>
        <CodeBlock code={`<ProgressBar value={progress} variant="success" showValue label="Download" />

{/* Game contexts — HP, Mana */}
<ProgressBar value={hp} variant="danger" showValue label="HP" />`} />
      </Section>

      <Section id="legacy-routes" title="Legacy URL → anchor map">
        <Stack gap="xs" style={{ fontSize: '0.8125rem', color: textMid }}>
          <p style={{ margin: 0 }}><code>/progress-bar</code> → <code>/feedback#progress-bar</code></p>
          <p style={{ margin: 0, color: textLow }}>/loading-skeleton + /feedback-hierarchy zůstávají jako samostatné recipe stránky.</p>
        </Stack>
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>Spinner</strong> — jediná pending akce, neznámá délka. Pro známý progress → ProgressBar.</p>
          <p style={{ margin: 0 }}>✓ <strong>Skeleton</strong> — vyplňuje budoucí layout, takže nemizí přechod při loadu (no CLS).</p>
          <p style={{ margin: 0 }}>✓ <strong>Alert</strong> — kontext blízko cíle (formulář, sekce). Persistentní.</p>
          <p style={{ margin: 0 }}>✓ <strong>Banner</strong> — page-level, sticky pro global state (maintenance, trial).</p>
          <p style={{ margin: 0 }}>✗ Nepoužívej Spinner uvnitř už-existujícího Skeleton — duplikuje signál.</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie: Toast (transient) → Alert (inline persistent) → Banner (page persistent) → Modal (blocking).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
