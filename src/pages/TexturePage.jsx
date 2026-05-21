import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { textDeep, textCool, goldMid, bg0, successColor, borderSubtle, goldDim } from '../lib/donjon/tokens'

/* ── Texture preview box ── */
function TextureBox({ label, style, desc, code }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
      <div style={{
        width: 160, height: 100,
        borderRadius: 4,
        border: `1px solid ${goldDim}30`,
        ...style,
      }} />
      <div>
        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, color: goldMid }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: textDeep, lineHeight: 1.3 }}>{desc}</p>
        {code && <code style={{ display: 'block', marginTop: 4, fontSize: '0.5625rem', color: textDeep, wordBreak: 'break-all' }}>{code}</code>}
      </div>
    </div>
  )
}

/* ── Texture aplikace ── */
function TextureLayer({ label, layers, content }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <p style={{ margin: 0, fontSize: '0.75rem', color: textCool }}>{label}</p>
      <div style={{
        width: 200, height: 120,
        borderRadius: 4,
        border: `1px solid ${goldDim}30`,
        position: 'relative',
        overflow: 'hidden',
        ...layers,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {content}
      </div>
    </div>
  )
}

/* ── Noise texture (SVG filter) ── */
const SVG_NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

/* ── Gradient textures ── */
const GRADIENTS = {
  vignette: `radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)`,
  topFade:  `linear-gradient(to bottom, rgba(18,16,42,0.8) 0%, transparent 100%)`,
  botFade:  `linear-gradient(to top,    rgba(18,16,42,0.9) 0%, transparent 60%)`,
  corner:   `radial-gradient(ellipse at 0% 0%, rgba(184,149,106,0.08) 0%, transparent 60%)`,
  diagonal: `linear-gradient(135deg, rgba(184,149,106,0.04) 0%, transparent 60%)`,
  scanline: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)`,
}

export default function TexturePage() {
  return (
    <ShowcasePage
      title="Texture systém"
      description="Vizuální textury pro atmosféru — noise overlay, gradient vignette, scanlines a corner accent. Textury jsou CSS-only, nepoužívají obrázky."
      library="donjon"
    >

      {/* Typy textur */}
      <Section
        id="typy"
        title="Typy textur"
        description="Čtyři rodiny textur — každá má jiný účel a intenzitu."
      >
        <Preview>
          <TextureBox
            label="Noise overlay"
            desc="Šum — organičnost tmavých ploch"
            style={{ background: `${SVG_NOISE}, bg0` }}
            code="SVG feTurbulence @ 4% opacity"
          />
          <TextureBox
            label="Vignette"
            desc="Temná periferie — focus na střed"
            style={{ background: `${GRADIENTS.vignette}, borderSubtle` }}
          />
          <TextureBox
            label="Scanlines"
            desc="CRT efekt — retro herní dojem"
            style={{ background: `${GRADIENTS.scanline}, bg0` }}
          />
          <TextureBox
            label="Corner accent"
            desc="Zlatý roh — luxus, herní prvek"
            style={{ background: `${GRADIENTS.corner}, bg0` }}
          />
          <TextureBox
            label="Diagonal shimmer"
            desc="Jemný zlatý přesah na kartě"
            style={{ background: `${GRADIENTS.diagonal}, #1E1C3A` }}
          />
        </Preview>
      </Section>

      {/* Fade overlaye */}
      <Section
        id="fades"
        title="Fade overlaye"
        description="Přechody pro plynulé zahazování obsahu — scrollovatelné seznamy, edge fade."
      >
        <Preview>
          <TextureBox
            label="Top fade"
            desc="Horní hrana scrollovatelného panelu"
            style={{ background: `${GRADIENTS.topFade}, borderSubtle` }}
          />
          <TextureBox
            label="Bottom fade"
            desc="Dolní hrana — obsah pokračuje dolů"
            style={{ background: `${GRADIENTS.botFade}, borderSubtle` }}
          />
          <TextureBox
            label="Left fade"
            desc="Boční fade pro horizontální scroll"
            style={{ background: `linear-gradient(to right, rgba(18,16,42,0.9) 0%, transparent 60%), borderSubtle` }}
          />
        </Preview>
        <CodeBlock code={`/* Edge fade — pseudo-element přes scrollovatelný obsah */
.scrollable-list {
  position: relative;
  overflow-y: auto;
}

.scrollable-list::after {
  content: '';
  position: sticky;
  bottom: 0;
  display: block;
  height: 48px;
  background: linear-gradient(to top, var(--color-bg) 0%, transparent 100%);
  pointer-events: none; /* fade nepřekáží klikání */
}`} />
      </Section>

      {/* Vrstvení textur */}
      <Section
        id="vrstveni"
        title="Vrstvení textur"
        description="Textury se kombinují přes CSS background — více hodnot oddělených čárkou."
      >
        <Preview>
          <TextureLayer
            label="Jen bg"
            layers={{ background: bg0 }}
            content={<span style={{ fontSize: '0.75rem', color: textDeep }}>čisté</span>}
          />
          <TextureLayer
            label="Bg + noise"
            layers={{ background: `${SVG_NOISE}, bg0` }}
            content={<span style={{ fontSize: '0.75rem', color: textDeep }}>+ šum</span>}
          />
          <TextureLayer
            label="+ vignette"
            layers={{ background: `${GRADIENTS.vignette}, ${SVG_NOISE}, bg0` }}
            content={<span style={{ fontSize: '0.75rem', color: textDeep }}>+ vignette</span>}
          />
          <TextureLayer
            label="+ corner"
            layers={{ background: `${GRADIENTS.corner}, ${GRADIENTS.vignette}, ${SVG_NOISE}, bg0` }}
            content={<span style={{ fontSize: '0.75rem', color: goldMid, fontWeight: 700 }}>plný stack</span>}
          />
        </Preview>
        <CodeBlock code={`/* Vrstvení CSS backgrounds — zprava = nejníže */
.game-bg {
  background:
    /* 1. navrchu — zlatý roh accent */
    radial-gradient(ellipse at 0% 0%, rgba(184,149,106,0.08) 0%, transparent 60%),
    /* 2. vignette — ztmavení periferie */
    radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%),
    /* 3. noise — organický šum */
    url("data:image/svg+xml,..."),
    /* 4. spodní — solid color */
    bg0;
}

/* Tip: noise SVG je data URI — žádný HTTP request */`} />
      </Section>

      {/* Kdy použít */}
      <Section
        id="kdy-pouzit"
        title="Kdy použít texturu"
        description="Textura musí sloužit atmosféře — ne být vizuálním šumem."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { place: 'Herní plocha (hex mapa)',  texture: 'noise + vignette',       intensity: 'střední', note: 'Největší plocha — textura je klíčová pro atmosféru' },
              { place: 'Loading screeny',          texture: 'noise + corner + vignette', intensity: 'silná', note: 'Uživatel se kouká — plný atmosférický efekt' },
              { place: 'Modal pozadí (overlay)',   texture: 'noise',                  intensity: 'jemná', note: 'Pozadí pod modalem — nenápadné' },
              { place: 'Karty / panely',           texture: 'diagonal shimmer',       intensity: 'velmi jemná', note: 'Zlatý přesah — luxusní materiál' },
              { place: 'Sidebar',                  texture: 'žádná',                  intensity: 'none', note: 'Navigační UI — čistota nad atmosférou' },
              { place: 'Formuláře / settings',    texture: 'žádná',                  intensity: 'none', note: 'Srozumitelnost nad estetikou' },
              { place: 'Error / critical overlay', texture: 'žádná',                  intensity: 'none', note: 'Chyba potřebuje jasnost, ne atmosféru' },
            ].map(({ place, texture, intensity, note }) => (
              <div key={place} style={{ display: 'grid', gridTemplateColumns: '180px 160px 90px 1fr', gap: 10, padding: '8px 12px', background: bg0, border: `1px solid ${goldDim}18`, borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: textCool }}>{place}</span>
                <code style={{ fontSize: '0.6875rem', color: goldMid, lineHeight: 1.4 }}>{texture}</code>
                <span style={{ fontSize: '0.75rem', color: intensity === 'none' ? textDeep : successColor }}>{intensity}</span>
                <span style={{ fontSize: '0.6875rem', color: textDeep, lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Textury jsou CSS-only — žádné obrázky, SVG jako data URI.</p>
          <p>✓ Vrstvení: noise vždy níže, vignette nad ním, accenty navrchu.</p>
          <p>✓ Intenzita noise: max 4–6% opacity — textury nesmí přebíjet obsah.</p>
          <p>✓ Fade overlaye: použij pseudo-element <code className="text-neutral-300">::after</code> — fade nepřekáží interakci (<code className="text-neutral-300">pointer-events: none</code>).</p>
          <p>✓ Respektuj <code className="text-neutral-300">prefers-reduced-motion</code> — animované textury (shimmer) vypni.</p>
          <p>✗ Nepoužívej silnou texturu v systémovém UI (formuláře, chybové zprávy, modaly) — srozumitelnost je priorita.</p>
          <p>✗ Nestackuj víc než 4 background vrstvy — výkon a čitelnost kódu trpí.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
