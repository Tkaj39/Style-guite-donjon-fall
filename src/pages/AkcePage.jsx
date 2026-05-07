import { useState } from 'react'
import DonjonCard from '../components/DonjonCard'
import DonjonButton from '../components/DonjonButton'
import ButtonGroup from '../components/ButtonGroup'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

function MoveIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path d="M8 1a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5H1.75a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 8 1Z" />
    </svg>
  )
}

function SwordIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path d="M13.78 1.22a.75.75 0 0 0-1.06 0L9.5 4.44 8.56 3.5a.75.75 0 0 0-1.06 1.06l.47.47-5.5 5.5a2.25 2.25 0 0 0 0 3.182l.354.353a2.25 2.25 0 0 0 3.182 0l5.5-5.5.47.47a.75.75 0 1 0 1.06-1.06l-.94-.94 3.22-3.22a.75.75 0 0 0 0-1.06l-1.5-1.5Z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path d="M8 1 2 4v5c0 3 2.5 4.5 6 5.5 3.5-1 6-2.5 6-5.5V4L8 1Z" />
    </svg>
  )
}

const actions = {
  pohyb: {
    label: 'Pohyb',
    icon: <MoveIcon />,
    variant: 'default',
    title: 'Pohyb',
    description: 'Vyber hex, na který se chceš přesunout.',
    detail: 'Přesuň svoji věž na sousední hex. Každý tah máš k dispozici jeden pohyb.',
    cta: 'Vybrat cíl',
  },
  souboj: {
    label: 'Souboj',
    icon: <SwordIcon />,
    variant: 'danger',
    title: 'Souboj',
    description: 'Vyber nepřátelský hex k útoku.',
    detail: 'Napadni soupeřovu věž na sousedním hexu. Výsledek rozhodnou kostky.',
    cta: 'Vybrat cíl',
  },
  posileni: {
    label: 'Posílení',
    icon: <ShieldIcon />,
    variant: 'success',
    title: 'Posílení',
    description: 'Vyber vlastní hex k posílení.',
    detail: 'Posilni věž na zvoleném hexu přidáním kostky. Silnější věž lépe odolá útokům.',
    cta: 'Vybrat hex',
  },
}

const actionItems = [
  { value: 'pohyb',   label: 'Pohyb',   icon: <MoveIcon /> },
  { value: 'souboj',  label: 'Souboj',  icon: <SwordIcon /> },
  { value: 'posileni', label: 'Posílení', icon: <ShieldIcon /> },
]

export default function AkcePage() {
  const [selected, setSelected] = useState('pohyb')
  const action = actions[selected]

  return (
    <ShowcasePage
      title="Akce"
      description="Výběr herní akce pro aktuální tah — Pohyb, Souboj nebo Posílení."
    >
      {/* ButtonGroup variants static */}
      <Section
        title="Výběr akce"
        description="ButtonGroup se třemi akcemi. Aktivní akce je zvýrazněná."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {Object.entries(actions).map(([key]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Vybrán: {actions[key].label}
                </p>
                <ButtonGroup
                  items={actionItems}
                  value={key}
                  onChange={() => {}}
                />
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<ButtonGroup
  items={[
    { value: 'pohyb',    label: 'Pohyb',    icon: <MoveIcon /> },
    { value: 'souboj',   label: 'Souboj',   icon: <SwordIcon /> },
    { value: 'posileni', label: 'Posílení', icon: <ShieldIcon /> },
  ]}
  value={selected}
  onChange={setSelected}
/>`} />
      </Section>

      {/* Action detail card */}
      <Section
        title="Detail akce"
        description="Pod výběrem se zobrazí karta s popisem a výzvou k akci."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            {Object.entries(actions).map(([key, a]) => (
              <DonjonCard
                key={key}
                title={a.title}
                description={a.description}
                variant={a.variant}
                footer={
                  <DonjonButton size="sm" variant={a.variant}>
                    {a.cta}
                  </DonjonButton>
                }
              >
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                  {a.detail}
                </p>
              </DonjonCard>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<DonjonCard
  title="Souboj"
  description="Vyber nepřátelský hex k útoku."
  variant="danger"
  footer={<DonjonButton size="sm" variant="danger">Vybrat cíl</DonjonButton>}
>
  <p>Napadni soupeřovu věž…</p>
</DonjonCard>`} />
      </Section>

      {/* Interactive composition */}
      <Section
        title="Živá kompozice"
        description="Interaktivní spojení výběru a detailu — takto vypadá v herním UI."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <ButtonGroup
              items={actionItems}
              value={selected}
              onChange={setSelected}
            />
            <DonjonCard
              title={action.title}
              description={action.description}
              variant={action.variant}
              footer={
                <DonjonButton size="sm" variant={action.variant}>
                  {action.cta}
                </DonjonButton>
              }
            >
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                {action.detail}
              </p>
            </DonjonCard>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
