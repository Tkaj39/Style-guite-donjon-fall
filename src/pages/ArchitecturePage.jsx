/* ── ArchitecturePage ──────────────────────────────────────────────────────
   Plnohodnotná dokumentace architektury knihovny:
     1. Závislostní směr (shared → tkajui → donjon)
     2. Naming kontrakt (Donjon* prefix ↔ subcategory)
     3. Tabulka 13 extends-tkajui párů
     4. Sdílené tokeny ze shared/

   Zdroj pravdy: CLAUDE.md, componentMeta, lib/shared/tokens.js,
   architectureContract.test.js.
   ─────────────────────────────────────────────────────────────────────── */

import { Link } from 'react-router-dom'
import { ShowcasePage, Section, CodeBlock } from '../styleguide/ShowcasePage'
import ArchDiagram, { ARCH_BRAND } from '../styleguide/ArchDiagram'
import LibraryLogo from '../styleguide/LibraryLogo'
import { componentMeta } from '../data/componentMeta'
import { registry } from '../data/componentRegistry'
import { gold, goldDim, bg2, bg3, bgDeep, borderDefault, borderMid, textHigh, textMid, textLow, gainColor, dangerColor } from '../lib/donjon/tokens'

/* ── Helpers ── */

function getExtendsPairs() {
  return Object.entries(componentMeta)
    .filter(([, meta]) => meta.subcategory === 'extends-tkajui' && meta.extendsSlug)
    .map(([slug, meta]) => ({
      donjonSlug: slug,
      tkajuiSlug: meta.extendsSlug,
      donjonEntry: registry.find(c => c.slug === slug),
      tkajuiEntry: registry.find(c => c.slug === meta.extendsSlug),
      differences: meta.differencesFromBase ?? [],
    }))
    .sort((a, b) => (a.donjonEntry?.name ?? '').localeCompare(b.donjonEntry?.name ?? '', 'cs'))
}

function getExclusiveDonjon() {
  return Object.entries(componentMeta)
    .filter(([, meta]) => meta.subcategory === 'exclusive')
    .map(([slug]) => registry.find(c => c.slug === slug))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name, 'cs'))
}

/* ── Visual primitives ── */

function Pill({ children, color, filled }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 8px',
      fontSize: '0.6875rem', fontWeight: 600,
      letterSpacing: '0.04em',
      background: filled ? `${color}22` : `${color}11`,
      border: `1px solid ${color}55`,
      color,
      borderRadius: 3,
    }}>
      {children}
    </span>
  )
}

function Callout({ kind = 'info', children }) {
  const map = {
    info:    { color: ARCH_BRAND.tkajui, label: 'Pravidlo' },
    warn:    { color: dangerColor,       label: 'Pozor'    },
    success: { color: gainColor,         label: 'Plus'     },
  }
  const c = map[kind]
  return (
    <div style={{
      padding: '12px 16px',
      background: `${c.color}0E`,
      border: `1px solid ${c.color}3A`,
      borderLeft: `3px solid ${c.color}`,
      borderRadius: 5,
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{
        fontSize: '0.6875rem', fontWeight: 700,
        color: c.color, letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {c.label}
      </div>
      <div style={{ fontSize: '0.875rem', color: textMid, lineHeight: 1.55 }}>
        {children}
      </div>
    </div>
  )
}

/* ── Tabulka extends párů ── */
function ExtendsPairsTable({ pairs }) {
  return (
    <div style={{
      borderRadius: 8,
      border: `1px solid ${borderDefault}`,
      overflow: 'hidden',
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.8125rem',
      }}>
        <thead>
          <tr style={{ background: bgDeep }}>
            <th style={thStyle}>
              <span style={{ color: ARCH_BRAND.tkajui, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <LibraryLogo brand="tkajui" size={13} color={ARCH_BRAND.tkajui} /> TkajUI base
              </span>
            </th>
            <th style={thStyle} aria-label="extends" />
            <th style={thStyle}>
              <span style={{ color: ARCH_BRAND.donjon, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <LibraryLogo brand="donjon" size={13} color={ARCH_BRAND.donjon} /> donjon rozšíření
              </span>
            </th>
            <th style={thStyle}>Co donjon přidává</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p, i) => (
            <tr key={p.donjonSlug} style={{
              background: i % 2 === 0 ? 'transparent' : `${bg2}80`,
              borderTop: `1px solid ${borderMid}`,
            }}>
              <td style={tdStyle}>
                {p.tkajuiEntry ? (
                  <Link to={`/components/${p.tkajuiSlug}`} style={linkStyle(ARCH_BRAND.tkajui)}>
                    {p.tkajuiEntry.name}
                  </Link>
                ) : (
                  <span style={{ color: textLow }}>{p.tkajuiSlug}</span>
                )}
              </td>
              <td style={{ ...tdStyle, textAlign: 'center', color: textLow, fontSize: '0.75rem' }}>
                extends
              </td>
              <td style={tdStyle}>
                {p.donjonEntry ? (
                  <Link to={`/components/${p.donjonSlug}`} style={linkStyle(ARCH_BRAND.donjon)}>
                    {p.donjonEntry.name}
                  </Link>
                ) : (
                  <span style={{ color: textLow }}>{p.donjonSlug}</span>
                )}
              </td>
              <td style={{ ...tdStyle, color: textMid, fontSize: '0.75rem', lineHeight: 1.5 }}>
                {p.differences.length > 0 ? (
                  <ul style={{ margin: 0, paddingLeft: 14, listStyle: 'disc' }}>
                    {p.differences.slice(0, 2).map((d, j) => (
                      <li key={j} style={{ marginBottom: 2 }}>
                        {d.replace(/`/g, '')}
                      </li>
                    ))}
                    {p.differences.length > 2 && (
                      <li style={{ color: textLow, fontStyle: 'italic' }}>
                        +{p.differences.length - 2} dalších…
                      </li>
                    )}
                  </ul>
                ) : (
                  <span style={{ color: textLow, fontStyle: 'italic' }}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const thStyle = {
  textAlign: 'left',
  padding: '10px 14px',
  fontSize: '0.6875rem',
  fontWeight: 700,
  color: textMid,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  borderBottom: `1px solid ${borderDefault}`,
}

const tdStyle = {
  padding: '10px 14px',
  verticalAlign: 'top',
}

function linkStyle(color) {
  return {
    color,
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '0.875rem',
  }
}

/* ── Sdílené tokeny tabulka ── */
function SharedTokensTable() {
  const groups = [
    {
      title: 'Motion',
      items: [
        ['animFast',     '80 ms',   'tooltip appear, damage flash'],
        ['animNormal',   '160 ms',  'hover, focus, stav'],
        ['animSlow',     '300 ms',  'otevření panelů, expand, slide'],
        ['animDramatic', '600 ms',  'výsledek souboje, výhry'],
        ['easingSharp',  'cubic-bezier(0.4, 0, 0.6, 1)', 'panely a rozvíjení'],
        ['easingBounce', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'pop, bounce, spawn'],
        ['easingEnter',  'cubic-bezier(0, 0, 0.2, 1)', 'příchozí elementy'],
        ['easingExit',   'cubic-bezier(0.4, 0, 1, 1)', 'odcházející elementy'],
      ],
    },
    {
      title: 'Breakpoints',
      items: [
        ['bpMobile',  '480 px',  'portrait mobile'],
        ['bpTablet',  '768 px',  'tablet / landscape mobile'],
        ['bpDesktop', '1024 px', 'desktop'],
        ['bpWide',    '1280 px', 'wide desktop'],
      ],
    },
    {
      title: 'Z-index',
      items: [
        ['zDropdown',     '900',  'Select dropdown, Combobox'],
        ['zNotification', '1800', 'Notification center'],
        ['zToast',        '2000', 'Toast notification stack'],
        ['zTooltip',      '2100', 'Tooltip (nad toasty)'],
      ],
    },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {groups.map(group => (
        <div key={group.title}>
          <h4 style={{
            margin: '0 0 10px',
            fontSize: '0.75rem', fontWeight: 700,
            color: ARCH_BRAND.tkajui, letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {group.title}
          </h4>
          <div style={{
            borderRadius: 6,
            border: `1px solid ${borderMid}`,
            overflow: 'hidden',
            background: bgDeep,
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <tbody>
                {group.items.map(([name, value, desc], i) => (
                  <tr key={name} style={{
                    borderTop: i === 0 ? 'none' : `1px solid ${borderMid}80`,
                  }}>
                    <td style={{ ...tdStyle, fontFamily: 'ui-monospace, monospace', color: gold, width: 160 }}>
                      {name}
                    </td>
                    <td style={{ ...tdStyle, fontFamily: 'ui-monospace, monospace', color: textHigh, width: 280, fontSize: '0.75rem' }}>
                      {value}
                    </td>
                    <td style={{ ...tdStyle, color: textMid }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── ArchitecturePage ── */
export default function ArchitecturePage() {
  const pairs = getExtendsPairs()
  const exclusive = getExclusiveDonjon()
  const totals = {
    extends: pairs.length,
    exclusive: exclusive.length,
    tkajui: registry.filter(c => c.category === 'TkajUI').length,
  }

  return (
    <ShowcasePage
      title="Architektura"
      description="Závislostní směr, naming kontrakt a vztah mezi TkajUI a donjon-fall-ui."
    >
      {/* ── 1. Závislostní směr ── */}
      <Section
        id="zavislosti"
        title="Závislostní směr"
        description="Tři vrstvy. Šipka jde vždy stejným směrem — proti směru šipek nikdy neimportujeme."
      >
        <ArchDiagram variant="detailed" sharedSub="motion · breakpoints · z-index · shape utility" />

        <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          <Callout kind="info">
            <strong style={{ color: textHigh }}>shared</strong> — strukturálně neutrální tokeny.
            Animační časy (`animFast`/`animNormal`/…), easingy, breakpointy a z-index škála.
            Žádné barvy ani vizuální tokeny. <Link to="/architecture#sdilene-tokeny" style={{ color: ARCH_BRAND.tkajui }}>Viz seznam ↓</Link>
          </Callout>
          <Callout kind="info">
            <strong style={{ color: ARCH_BRAND.tkajui }}>tkajui</strong> — base library.
            Chladná modrá paleta, oktagonální tvary, {totals.tkajui} obecných UI komponent.
            Použitelná samostatně v jakékoli React aplikaci. Importuje ze `shared`.
          </Callout>
          <Callout kind="info">
            <strong style={{ color: ARCH_BRAND.donjon }}>donjon-fall-ui</strong> — game layer.
            Teplá zlatá paleta, středověký feel. {totals.extends} komponent rozšiřuje TkajUI
            protějšky + {totals.exclusive} herních primitiv. Importuje ze `shared` (a smí z `tkajui`).
          </Callout>
          <Callout kind="warn">
            <strong>Co je zakázáno:</strong> tkajui NIKDY neimportuje z donjon. Shared NIKDY
            neimportuje z tkajui ani donjon. Test{' '}
            <code style={codeStyle}>architectureContract.test.js</code> tento směr vynucuje
            — pokud někdo přidá zpětný import, CI selže.
          </Callout>
        </div>
      </Section>

      {/* ── 2. Naming kontrakt ── */}
      <Section
        id="naming"
        title="Naming kontrakt"
        description="Jméno komponenty signalizuje její vztah k TkajUI base. Vynuceno testem."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          <div style={cardStyle(ARCH_BRAND.donjon)}>
            <Pill color={ARCH_BRAND.donjon} filled>Donjon* prefix</Pill>
            <h3 style={cardTitleStyle}>extends-tkajui</h3>
            <p style={cardBodyStyle}>
              Rozšiřuje TkajUI protějšek o herní vrstvu (ornamenty, zlatá paleta, octagon).
              componentMeta MUSÍ obsahovat <code style={codeStyle}>extendsSlug</code> a obvykle{' '}
              <code style={codeStyle}>differencesFromBase</code>.
            </p>
            <div style={{ fontSize: '0.75rem', color: textLow, marginTop: 8 }}>
              Příklady: DonjonButton, DonjonCard, DonjonModal, DonjonInput, DonjonTabs, …
              <br /><strong style={{ color: ARCH_BRAND.donjon }}>{totals.extends} komponent</strong>
            </div>
          </div>

          <div style={cardStyle(gold)}>
            <Pill color={gold} filled>bez prefixu</Pill>
            <h3 style={cardTitleStyle}>exclusive</h3>
            <p style={cardBodyStyle}>
              Herní primitivum bez analogie v TkajUI. Žádný <code style={codeStyle}>extendsSlug</code> —
              komponenta nemá co rozšiřovat.
            </p>
            <div style={{ fontSize: '0.75rem', color: textLow, marginTop: 8 }}>
              Příklady: ActionTile, ResourceBar, PlayerPanel, EventLog, HexTile, …
              <br /><strong style={{ color: gold }}>{totals.exclusive} komponent</strong>
            </div>
          </div>
        </div>

        <Callout kind="success">
          Vztah je <strong>enforceable</strong> — když přidáš novou donjon komponentu, test{' '}
          <code style={codeStyle}>architectureContract.test.js</code> ověří:
          <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
            <li>Donjon* prefix má buď „extends-tkajui" nebo „exclusive"</li>
            <li>„extends-tkajui" má <code style={codeStyle}>extendsSlug</code> mířící na existující TkajUI slug</li>
            <li><code style={codeStyle}>differencesFromBase</code> je pole stringů</li>
          </ul>
        </Callout>
      </Section>

      {/* ── 3. Tabulka extends párů ── */}
      <Section
        id="extends-pairs"
        title={`${totals.extends} párů TkajUI ↔ donjon`}
        description="Každá extends-tkajui komponenta má TkajUI protějšek. Klikni na jméno pro showcase."
      >
        <ExtendsPairsTable pairs={pairs} />
      </Section>

      {/* ── 4. Exclusive seznam ── */}
      <Section
        id="exclusive"
        title={`${totals.exclusive} herních primitiv (exclusive)`}
        description="Donjon komponenty bez TkajUI analogie — specifické pro deskové a tahové hry."
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 10,
        }}>
          {exclusive.map(c => (
            <Link
              key={c.slug}
              to={`/components/${c.slug}`}
              style={{
                padding: '10px 14px',
                background: bg2,
                border: `1px solid ${borderMid}`,
                borderLeft: `3px solid ${gold}`,
                borderRadius: 5,
                textDecoration: 'none',
                transition: 'all 120ms',
                display: 'block',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = goldDim; e.currentTarget.style.background = bg3 }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = borderMid; e.currentTarget.style.background = bg2 }}
            >
              <div style={{ color: gold, fontSize: '0.875rem', fontWeight: 600 }}>
                {c.name}
              </div>
              {c.description && (
                <div style={{
                  color: textLow, fontSize: '0.6875rem',
                  marginTop: 2, lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {c.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      </Section>

      {/* ── 5. Sdílené tokeny ── */}
      <Section
        id="sdilene-tokeny"
        title="Sdílené tokeny ze shared/"
        description="Identické v tkajui i donjon. Změna se projeví v obou knihovnách současně. Test parita vynucuje shodu."
      >
        <SharedTokensTable />

        <div style={{ marginTop: 16 }}>
          <h4 style={{
            margin: '0 0 8px',
            fontSize: '0.75rem', fontWeight: 700,
            color: textMid, letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Import
          </h4>
          <CodeBlock code={`// V obou knihovnách:
import { animNormal, easingEnter, bpMobile, zTooltip } from './tokens'

// Nebo přímo ze shared (pro library-agnostický kód):
import { animNormal, BREAKPOINTS } from '../shared/tokens'`} />
        </div>

        <Callout kind="info">
          Surface aliasy: donjon exportuje <code style={codeStyle}>surface0..4</code> (= <code style={codeStyle}>bg0..4</code>) a
          tkajui exportuje <code style={codeStyle}>bg0..4</code> (= <code style={codeStyle}>surface0..4</code>) —
          pro library-agnostický kód v `src/utils/` nebo `src/hooks/`. V samotných lib komponentách
          preferuj idiomatický název (donjon: <code style={codeStyle}>bg*</code>, tkajui: <code style={codeStyle}>surface*</code>).
        </Callout>
      </Section>

      {/* ── 6. Pravidla pro novou komponentu ── */}
      <Section
        id="pridat-komponentu"
        title="Přidat novou komponentu"
        description="Checklist pro novou veřejnou komponentu — 4 změny v 4 souborech."
      >
        <ol style={{
          margin: 0, paddingLeft: 24,
          display: 'flex', flexDirection: 'column', gap: 10,
          fontSize: '0.875rem', color: textMid, lineHeight: 1.6,
        }}>
          <li>
            <strong style={{ color: textHigh }}>Soubor komponenty</strong> v{' '}
            <code style={codeStyle}>src/lib/donjon/MojeKomponenta.jsx</code> nebo{' '}
            <code style={codeStyle}>src/lib/tkajui/MojeKomponenta.jsx</code>.
            Importuj barvy výhradně z <code style={codeStyle}>./tokens</code>, žádné inline @keyframes
            (do <code style={codeStyle}>src/index.css</code>).
          </li>
          <li>
            <strong style={{ color: textHigh }}>Showcase stránka</strong> v{' '}
            <code style={codeStyle}>src/pages/MojeKomponentaPage.jsx</code> používající{' '}
            <code style={codeStyle}>ShowcasePage</code>, <code style={codeStyle}>Section</code>,{' '}
            <code style={codeStyle}>Preview</code>, <code style={codeStyle}>CodeBlock</code>.
          </li>
          <li>
            <strong style={{ color: textHigh }}>Route v <code style={codeStyle}>App.jsx</code></strong>{' '}
            (lazy import + <code style={codeStyle}>&lt;Route path&gt;</code>).
          </li>
          <li>
            <strong style={{ color: textHigh }}>Záznam v <code style={codeStyle}>componentMeta.js</code></strong> —
            description, subcategory, props tabulka, relatedSlugs, showcaseRoute.
            Pokud je donjon: dodej <code style={codeStyle}>extendsSlug</code> a{' '}
            <code style={codeStyle}>differencesFromBase</code> (pokud extends-tkajui).
          </li>
        </ol>

        <Callout kind="warn">
          Pokud má jméno Donjon* prefix, MUSÍ mít{' '}
          <code style={codeStyle}>subcategory: 'extends-tkajui'</code> nebo{' '}
          <code style={codeStyle}>'exclusive'</code>. Bez toho selže test architektonického
          kontraktu a build neprojde.
        </Callout>

        <Callout kind="success">
          Po všech 4 změnách spusť <code style={codeStyle}>npm run build</code> a{' '}
          <code style={codeStyle}>npm run test:run</code> — musí projít bez chyb.
          Detailní postup je v <code style={codeStyle}>CLAUDE.md</code> v sekci „Přidání nové komponenty".
        </Callout>
      </Section>
    </ShowcasePage>
  )
}

/* ── Styles ── */
const codeStyle = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.8125em',
  padding: '1px 5px',
  background: bgDeep,
  border: `1px solid ${borderMid}`,
  borderRadius: 3,
  color: gold,
}

const cardTitleStyle = {
  margin: '8px 0 6px',
  fontSize: '1rem',
  fontWeight: 700,
  color: textHigh,
  letterSpacing: '-0.01em',
}

const cardBodyStyle = {
  margin: 0,
  fontSize: '0.8125rem',
  color: textMid,
  lineHeight: 1.55,
}

function cardStyle(accentColor) {
  return {
    padding: '16px 18px',
    background: bg2,
    border: `1px solid ${borderDefault}`,
    borderLeft: `3px solid ${accentColor}`,
    borderRadius: 6,
  }
}
