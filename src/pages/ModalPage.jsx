import { useState } from 'react'
import Modal from '../lib/tkajui/Modal'
import DonjonModal from '../lib/donjon/DonjonModal'
import Button from '../lib/tkajui/Button'
import DonjonButton from '../lib/donjon/DonjonButton'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

/* ── Obsah stránky — čte aktivní variantu přes hook ── */
function ModalContent() {
  const lib = useLibVariant()                    // 'donjon' | 'tkajui'
  const ModalCmp = lib === 'tkajui' ? Modal : DonjonModal
  const Btn      = lib === 'tkajui' ? Button : DonjonButton
  const cmp      = lib === 'tkajui' ? 'Modal' : 'DonjonModal'

  /* Demo helper — definováno uvnitř ModalContent aby mělo přístup k Btn */
  function ModalDemo({ label, buttonVariant = 'default', ...modalProps }) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Btn variant={buttonVariant} size="sm" onClick={() => setOpen(true)}>
          {label}
        </Btn>
        <ModalCmp isOpen={open} onClose={() => setOpen(false)} {...modalProps} />
      </>
    )
  }

  return (
    <>
      {/* Sizes */}
      <Section
        id="sizes"
        title="Velikosti"
        description="Tři předdefinované šířky — sm (360 px), md (480 px, výchozí), lg (640 px)."
      >
        <Preview>
          <ModalDemo ModalCmp={ModalCmp} label="Small"  size="sm" title="Malý modál"   description="Maximální šířka 360 px.">
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Vhodný pro rychlá potvrzení nebo krátké zprávy, kde nepotřebuješ mnoho obsahu.
            </p>
          </ModalDemo>

          <ModalDemo ModalCmp={ModalCmp} label="Medium (výchozí)" size="md" title="Středný modál" description="Maximální šířka 480 px — výchozí velikost.">
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Standardní volba pro většinu dialogů — dostatečný prostor pro formulář nebo popis akce.
            </p>
          </ModalDemo>

          <ModalDemo ModalCmp={ModalCmp} label="Large" size="lg" title="Velký modál" description="Maximální šířka 640 px.">
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Pro složitější obsah — tabulky, delší formuláře, nastavení s více poli.
            </p>
          </ModalDemo>
        </Preview>
        <CodeBlock code={`<${cmp} isOpen={open} onClose={() => setOpen(false)} size="sm" title="Malý modál">
  …obsah…
</${cmp}>

<${cmp} isOpen={open} onClose={() => setOpen(false)} size="md" title="Středný modál">
  …obsah…
</${cmp}>

<${cmp} isOpen={open} onClose={() => setOpen(false)} size="lg" title="Velký modál">
  …obsah…
</${cmp}>`} />
      </Section>

      {/* Variants */}
      <Section
        id="variants"
        title="Varianty"
        description="Sémantické barevné varianty — default, danger, success, warning."
      >
        <Preview>
          {[
            { variant: 'default', label: 'Default',  buttonVariant: 'default', title: 'Informace',          desc: 'Obecný dialog s neutrálním kontextem.' },
            { variant: 'danger',  label: 'Danger',   buttonVariant: 'danger',  title: 'Nebezpečná akce',    desc: 'Trvalá operace — smazání, reset, opuštění hry.' },
            { variant: 'success', label: 'Success',  buttonVariant: 'success', title: 'Akce úspěšná',       desc: 'Potvrzení dokončené operace nebo výhry.' },
            { variant: 'warning', label: 'Warning',  buttonVariant: 'warning', title: 'Upozornění',         desc: 'Situace vyžadující pozornost před pokračováním.' },
          ].map(({ variant, label, buttonVariant, title, desc }) => (
            <ModalDemo
              key={variant}
              
              label={label}
              buttonVariant={buttonVariant}
              variant={variant}
              title={title}
              description={desc}
            >
              <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                Varianta <strong style={{ color: '#F0E6D3' }}>{variant}</strong> ovlivní barvu borderu,
                pozadí hlavičky a gradient titulku.
              </p>
            </ModalDemo>
          ))}
        </Preview>
        <CodeBlock code={`<${cmp} variant="danger" title="Nebezpečná akce" isOpen={open} onClose={onClose}>
  Tato akce je nevratná.
</${cmp}>

<${cmp} variant="success" title="Úspěch" isOpen={open} onClose={onClose}>
  Operace proběhla úspěšně.
</${cmp}>`} />
      </Section>

      {/* With footer */}
      <Section
        id="footer"
        title="S patičkou"
        description="Prop footer přijímá ReactNode — typicky tlačítka akcí."
      >
        <Preview>
          <ModalDemo
            
            label="S patičkou"
            title="Opustit hru?"
            description="Veškerý postup v aktuálním kole bude ztracen."
            variant="danger"
            buttonVariant="danger"
            footer={
              <>
                <DonjonButton size="sm">Zrušit</DonjonButton>
                <DonjonButton size="sm" variant="danger">Opustit hru</DonjonButton>
              </>
            }
          >
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Aktuální hra bude ukončena. Souboj nebude rozhodnut a žádný hráč nezíská VP za toto kolo.
            </p>
          </ModalDemo>

          <ModalDemo
            
            label="Potvrzení"
            title="Zahájit nové kolo?"
            footer={
              <>
                <DonjonButton size="sm">Zpět</DonjonButton>
                <DonjonButton size="sm" variant="success">Zahájit kolo</DonjonButton>
              </>
            }
          >
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Všichni hráči jsou připraveni. Začíná hráč s nejvyšší hodnotou věže.
            </p>
          </ModalDemo>
        </Preview>
        <CodeBlock code={`<${cmp}
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Opustit hru?"
  variant="danger"
  footer={
    <>
      <DonjonButton size="sm">Zrušit</DonjonButton>
      <DonjonButton size="sm" variant="danger">Opustit hru</DonjonButton>
    </>
  }
>
  Aktuální hra bude ukončena.
</${cmp}>`} />
      </Section>

      {/* No title */}
      <Section
        id="no-title"
        title="Bez hlavičky"
        description="Modál bez prop title — jen čistý obsah s close tlačítkem v těle."
      >
        <Preview>
          <ModalDemo ModalCmp={ModalCmp} label="Bez hlavičky">
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Modál bez title nezobrazí hlavičku. Close tlačítko se přesune do pravého horního rohu těla.
              Vhodné pro obrazové dialogy nebo vlastní layout bez standardní struktury.
            </p>
          </ModalDemo>
        </Preview>
        <CodeBlock code={`<${cmp} isOpen={open} onClose={() => setOpen(false)}>
  Vlastní obsah bez standardní hlavičky.
</${cmp}>`} />
      </Section>

      {/* Close behaviors */}
      <Section
        id="close-behaviors"
        title="Chování zavírání"
        description="Konfigurace způsobů zavření — backdrop, Escape a close tlačítko lze individuálně vypnout."
      >
        <Preview>
          <ModalDemo ModalCmp={ModalCmp} label="Bez Escape" title="Escape nefunguje" description="closeOnEscape={false}" closeOnEscape={false}>
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Modál nelze zavřít klávesou Escape — použij close tlačítko nebo backdrop.
            </p>
          </ModalDemo>

          <ModalDemo ModalCmp={ModalCmp} label="Bez backdrops" title="Backdrop nefunguje" description="closeOnBackdrop={false}" closeOnBackdrop={false}>
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Klik mimo modál ho nezavře — uživatel musí použít close tlačítko nebo Escape.
            </p>
          </ModalDemo>

          <ModalDemo
            
            label="Bez close tlačítka"
            title="Bez close tlačítka"
            description="showCloseButton={false}"
            showCloseButton={false}
            footer={<DonjonButton size="sm" onClick={undefined}>Zavřít</DonjonButton>}
          >
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Tlačítko × je skryto — zavření zajistí vlastní UI v patičce.
            </p>
          </ModalDemo>
        </Preview>
        <CodeBlock code={`{/* Nelze zavřít Escape */}
<${cmp} closeOnEscape={false} …>…</${cmp}>

{/* Nelze zavřít klikem mimo */}
<${cmp} closeOnBackdrop={false} …>…</${cmp}>

{/* Bez × tlačítka */}
<${cmp} showCloseButton={false} …>…</${cmp}>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy poskytni jasnou cestu zavření — alespoň jeden ze způsobů (Escape, backdrop, tlačítko) musí zůstat aktivní.</p>
          <p>✓ Použij variant odpovídající kontextu — danger pro nevratné akce, success pro potvrzení, warning pro varování.</p>
          <p>✓ Footer tlačítka řaď: sekundární akce vlevo, primární vpravo.</p>
          <p>✓ Pro krátká potvrzení (ano/ne) preferuj size="sm", pro formuláře size="md" nebo "lg".</p>
          <p>✗ Nestackuj modály — zobrazuj vždy jen jeden najednou.</p>
          <p>✗ Nedávej do modálu nekonečně scrollující obsah — pokud je obsah dlouhý, zvlášť nastav overflow a max-height na tělo.</p>
          <p>✗ Nepoužívej modál pro rychlé notifikace — na to slouží Toast / FloatFeedback.</p>
        </div>
      </Section>
    </>
  )
}

/* ── Page ── */
export default function ModalPage() {
  return (
    <ShowcasePage
      title="Modal"
      description="Modální dialog s fokusovým uzamčením, Escape zavřením a zamčeným scrollem. Oktagonální border, barevné varianty. DonjonModal rozšiřuje TkajUI Modal o herní ornaments."
      componentSlugs={['donjon-modal', 'modal']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <ModalContent />
    </ShowcasePage>
  )
}
