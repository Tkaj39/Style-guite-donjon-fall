import { useState } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'
import DonjonCard from '../components/DonjonCard'
import DonjonButton from '../components/DonjonButton'
import DonjonBadge from '../components/DonjonBadge'
import ButtonGroup from '../components/ButtonGroup'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { actions } from '../data/gameUiMockData'

function MoveDieIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M8 1a.75.75 0 0 1 .53.22l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 3.56V14.25a.75.75 0 0 1-1.5 0V3.56L4.03 6.78a.75.75 0 0 1-1.06-1.06l4.5-4.5A.75.75 0 0 1 8 1Z" />
    </svg>
  )
}

function MoveTowerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path d="M2 11.5A1.5 1.5 0 0 1 3.5 10h9a1.5 1.5 0 0 1 0 3h-9A1.5 1.5 0 0 1 2 11.5ZM4 7.5A1.5 1.5 0 0 1 5.5 6h5A1.5 1.5 0 0 1 12 7.5v.5H4v-.5ZM6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5V4H6v-.5Z" />
    </svg>
  )
}

function CollapseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .75.75v8.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V2.5A.75.75 0 0 1 8 1.75Z" />
    </svg>
  )
}

function RerollIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.75.75 0 0 1 1.36-.636A6.5 6.5 0 1 1 8 1.5v-.75a.75.75 0 0 1 1.28-.53l2 2a.75.75 0 0 1 0 1.06l-2 2A.75.75 0 0 1 8 4.75V3Z" />
    </svg>
  )
}

const iconMap = {
  'move-die':    <MoveDieIcon />,
  'move-tower':  <MoveTowerIcon />,
  'collapse':    <CollapseIcon />,
  'reroll':      <RerollIcon />,
}

const actionItems = actions.map(a => ({ value: a.value, label: a.label, icon: iconMap[a.value] }))

export default function AkcePage() {
  const [selected, setSelected] = useState('move-die')
  const isDesktop = useBreakpoint()
  const action = actions.find(a => a.value === selected)

  return (
    <ShowcasePage
      title="Akce"
      description="Hráč musí každý tah zvolit právě jednu ze 4 akcí. Souboj není akce — spouští ho pohyb."
    >
      <Section
        id="pohyb-kostky"
        title="Pohyb kostky"
        description="Move die — pohyb jedné kostky až na vzdálenost její bojové síly."
      >
        <Preview>
          <DonjonCard
            title="Pohyb kostky"
            description="Move die"
            footer={<DonjonButton size="sm" variant="default">Vybrat kostku</DonjonButton>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                Pohni jednou svou kostkou až na vzdálenost její bojové síly. Pohyb může měnit směr.
                Přátelskými kostkami/věžemi lze procházet jen pokud má pohybující se kostka vyšší bojovou sílu.
                Nepřátelskými kostkami nelze procházet vůbec.
                Pohyb na nepřátelské pole spustí souboj — je legální jen pokud vaše bojová síla překračuje nepřátelskou.
              </p>
            </div>
          </DonjonCard>
        </Preview>

        <Preview>
          <DonjonCard
            title="Skok z věže"
            description="Jump from tower — speciální případ pohybu kostky"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                Kostka na vrcholu vlastní věže může odskočit a samostatně se pohybovat. Dosah pohybu = face value vrcholu.
                Uvnitř dosahu původní věže si nese bojovou sílu celé věže.
                Za hranicí dosahu věže se bojová síla vrátí na normální (solo hodnota).
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <DonjonBadge variant="default">Pohyb = face value vrcholu</DonjonBadge>
                <DonjonBadge variant="warning">CP věže uvnitř dosahu věže</DonjonBadge>
                <DonjonBadge variant="default">CP solo za hranicí dosahu</DonjonBadge>
              </div>
            </div>
          </DonjonCard>
        </Preview>
      </Section>

      <Section
        id="pohyb-veze"
        title="Pohyb věže"
        description="Move tower — pohyb celé věže, Occupy není dostupné."
      >
        <Preview>
          <DonjonCard
            title="Pohyb věže"
            description="Move tower"
            footer={<DonjonButton size="sm" variant="default">Vybrat věž</DonjonButton>}
          >
            <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
              Pohni celou věží. Věž nemůže procházet jinými kostkami ani věžemi (přátelskými nebo nepřátelskými).
              Pohyb na nepřátelské pole spustí Push — Occupy není pro věž dostupné.
            </p>
          </DonjonCard>
        </Preview>
      </Section>

      <Section
        id="kolaps-veze"
        title="Kolaps věže"
        description="Tower collapse — dostupné jen pro věž se 3 a více kostkami."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: 16 }}>
            <DonjonCard
              title="Kolaps věže"
              description="Tower collapse — věž má 3+ kostky"
              variant="danger"
              footer={<DonjonButton size="sm" variant="danger">Vybrat věž</DonjonButton>}
            >
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F9C0C0', lineHeight: 1.6 }}>
                Odstraň spodní kostku věže ze hry. Za každou zničenou nepřátelskou kostku získáš 1 VP.
              </p>
            </DonjonCard>

            <DonjonCard
              title="Kolaps věže"
              description="Nedostupné — věž má méně než 3 kostky"
              variant="danger"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <DonjonBadge variant="danger">Nedostupné</DonjonBadge>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                  Kolaps věže vyžaduje věž se 3 a více kostkami. Solo kostka ani věž ze dvou kostek tuto akci neumožňují.
                </p>
                <DonjonButton size="sm" variant="danger" disabled>Vybrat věž</DonjonButton>
              </div>
            </DonjonCard>
          </div>
        </Preview>
      </Section>

      <Section
        id="prehazovani"
        title="Přehazování"
        description="Reroll — posílení vlastní kostky, hodnota může jen růst nebo zůstat stejná."
      >
        <Preview>
          <DonjonCard
            title="Přehazování"
            description="Reroll"
            variant="success"
            footer={<DonjonButton size="sm" variant="success">Vybrat kostku</DonjonButton>}
          >
            <p style={{ margin: 0, fontSize: '0.8125rem', color: '#C0F0C8', lineHeight: 1.6 }}>
              Přehoď jednu svou kostku (solo nebo vrchol věže). Pokud nový hod je nižší než původní hodnota,
              ponech původní. Kostka může jen posílit nebo zůstat stejná. Přehazování kostky s hodnotou 6 je legální akce.
            </p>
          </DonjonCard>
        </Preview>
      </Section>

      <Section
        title="Výběr akce"
        description="ButtonGroup se 4 akcemi — ukázka všech stavů."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {actions.map(a => (
              <div key={a.value} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Vybrán: {a.label}
                </p>
                <ButtonGroup variant="tabs" items={actionItems} value={a.value} onChange={() => {}} />
              </div>
            ))}
          </div>
        </Preview>

        <CodeBlock code={`<ButtonGroup
  items={[
    { value: 'move-die',    label: 'Pohyb kostky', icon: <MoveDieIcon /> },
    { value: 'move-tower',  label: 'Pohyb věže',   icon: <MoveTowerIcon /> },
    { value: 'collapse',    label: 'Kolaps věže',  icon: <CollapseIcon /> },
    { value: 'reroll',      label: 'Přehazování',  icon: <RerollIcon /> },
  ]}
  value={selected}
  onChange={setSelected}
/>`} />
      </Section>

      <Section
        title="Živá kompozice"
        description="Interaktivní spojení výběru akce a detailní karty."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <ButtonGroup variant="tabs" items={actionItems} value={selected} onChange={setSelected} />
            <DonjonCard
              title={action.label}
              description={action.ruleLabel}
              variant={action.variant}
              footer={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <DonjonButton size="sm" variant={action.variant}>
                    {action.cta}
                  </DonjonButton>
                  {action.condition && (
                    <DonjonBadge variant="warning">{action.condition}</DonjonBadge>
                  )}
                </div>
              }
            >
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                {action.summary}
              </p>
            </DonjonCard>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
