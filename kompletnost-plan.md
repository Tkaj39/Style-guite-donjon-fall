# Plán kompletnosti komponent

Cíl: každá veřejná komponenta má (1) entry v componentMeta, (2) showcase stránku
s variant switcherem, sekcemi a Pravidly použití.

---

## Co "kompletní" znamená

### componentMeta.js entry
- `description` — 1–2 věty popis
- `props[]` — všechny props s type, required, default, description
- `showcaseRoute` — cesta ke showcase stránce
- `relatedSlugs[]` — vazby na příbuzné komponenty
- `status: 'documented'`

### Showcase stránka
- `variants={[...]}` přepínač TkajUI ↔ donjon (pokud existuje donjon varianta)
- Sekce: variants/sizes/states + code příklady (`<CodeBlock>`)
- `id="pravidla"` sekce — pravidla použití (✓ dělat / ✗ nedělat)
- Trigger/child elementy přepínají s variantou (žádné hardcoded `<DonjonButton>`)

---

## Audit výsledky

### A — chybí v componentMeta (4 komponenty)

Soubory existují, showcase stránky existují, ale žádná meta entry:

| Slug | Soubor | Showcase stránka |
|------|--------|------------------|
| `badge` | `src/lib/tkajui/Badge.jsx` | `BadgesPage` → `/badges` |
| `button` | `src/lib/tkajui/Button.jsx` | `ButtonsPage` → `/buttons` |
| `card` | `src/lib/tkajui/Card.jsx` | `CardsPage` → `/cards` |
| `input` | `src/lib/tkajui/Input.jsx` | `InputsPage` → `/inputs` |

**Akce:** doplnit 4 záznamy do `src/data/componentMeta.js`

---

### B — chybí "Pravidla použití" sekce (5 stránek)

Stránky mají sekce a variant switcher, ale nemají závěrečnou sekci s pravidly:

| Stránka | Sekce | Má switcher | Má pravidla |
|---------|-------|-------------|-------------|
| `BadgesPage` | 5 | ✓ | ✗ |
| `ButtonsPage` | 7 | ✓ | ✗ |
| `ButtonGroupsPage` | 6 | ✓ | ✗ |
| `CardsPage` | 5 | ✓ | ✗ |
| `InputsPage` | 4 | ✓ | ✗ |

Stránky které již pravidla mají (reference): Modal, Tabs, Select, Slider,
Toggle, ProgressBar, Tooltip, Toast.

**Akce:** přidat `<Section id="pravidla" title="Pravidla použití">` na konec
každé z 5 stránek.

---

### C — vše ostatní je OK

| Co | Stav |
|----|------|
| 27 komponent v componentMeta | ✓ documented |
| Variant switcher na 13 stránkách | ✓ |
| Hardcoded DonjonButton v showcase | ✓ opraveno (dnešní session) |
| Re-export vs self-contained struktura | ✓ |
| src/styleguide/ pojmenování | ✓ |
| Build | ✓ |

---

## Pořadí implementace

### Krok 1 — componentMeta entries (4 komponenty)

Doplnit do `src/data/componentMeta.js` záznamy pro `badge`, `button`, `card`, `input`.

Vzor podle existujícího záznamu (např. `tabs`):
```js
'button': {
  description: '...',
  status: 'documented',
  showcaseRoute: '/buttons',
  props: [
    { name: 'variant', type: "'default'|'danger'|...", required: false, default: "'default'", description: '...' },
    // ...
  ],
  relatedSlugs: ['donjon-button', 'button-group'],
},
```

Potřebné props pro každou komponentu zjistit z JSX souboru.

### Krok 2 — Pravidla použití (5 stránek)

Přidat na konec každé stránky (před uzavírací `</>` v `*Content` funkci):

```jsx
<Section id="pravidla" title="Pravidla použití">
  <div className="flex flex-col gap-2 text-sm text-neutral-400">
    <p>✓ ...</p>
    <p>✗ ...</p>
  </div>
</Section>
```

Obsah pravidel pro každou stránku:

**Badges:**
- ✓ Používej pro stavové štítky — stav úkolu, herní role, výsledek akce
- ✓ Kombinuj s `dot` pro "živý" stav (hráč online, aktivní ohnisko)
- ✓ Drž text krátký — 1–3 slova
- ✗ Nepoužívej badge jako náhrada tlačítka — badge není klikatelný prvek
- ✗ Nepřeplňuj kartu víc než 2–3 badge najednou

**Buttons:**
- ✓ Primární akce (nová hra, potvrzení) → `variant="default"` nebo `"success"`
- ✓ Destruktivní akce (smazat, opustit) → `variant="danger"`
- ✓ Ikony používej pro posílení kontextu — `leadingIcon` pro akci, `trailingIcon` pro směr/výstup
- ✗ Nestackuj víc než 3 tlačítka v řadě — použij ButtonGroup
- ✗ Nepoužívej `disabled` bez vysvětlení proč — přidej tooltip

**ButtonGroups:**
- ✓ Používej pro sady vzájemně se vylučujících akcí (výběr zobrazení, filtr)
- ✓ Maximálně 4–5 položek — víc je matoucí
- ✗ Nemíchej ButtonGroup s izolovanými tlačítky ve stejné řadě akcí
- ✗ Nepoužívej ButtonGroup pro navigaci — k tomu slouží Tabs

**Cards:**
- ✓ Card = kontejner pro tematicky příbuzné informace — quest, hráč, lokace
- ✓ Footer používej pro akční tlačítka vztahující se ke kartě
- ✓ Variantu `danger` pro hrozby, `success` pro úspěchy/odměny
- ✗ Nedávej do karty nekonečně scrollující obsah — ohraničuj max-height
- ✗ Nehnízduj karty do karet

**Inputs:**
- ✓ Vždy přidej `label` — i když je label vizuálně skrytý, musí být pro a11y
- ✓ `error` stav pro nevalidní vstup, `hint` pro nápovědu před chybou
- ✓ `leadingIcon` pro kontext pole (🔍 hledat, 👤 jméno hráče)
- ✗ Nepoužívej placeholder jako náhradu labelu
- ✗ Neblokuj submit jen proto, že pole je prázdné — zobraz error až po interakci

---

## Ověření po dokončení

```bash
# Všechny 4 nové slugy musí být v meta
node -e "
const fs = require('fs');
const c = fs.readFileSync('src/data/componentMeta.js', 'utf8');
['badge','button','card','input'].forEach(s => 
  console.log(s + ': ' + (c.includes(\"'\" + s + \"'\") ? 'OK' : 'CHYBÍ'))
);
"

# Všechny 5 stránek musí mít pravidla
grep -l "pravidla" \
  src/pages/BadgesPage.jsx \
  src/pages/ButtonsPage.jsx \
  src/pages/ButtonGroupsPage.jsx \
  src/pages/CardsPage.jsx \
  src/pages/InputsPage.jsx | wc -l
# Očekáváno: 5

# Build
npx vite build 2>&1 | grep "built in"
```
