# Kontrolní plán — konzistence po dnešní session

Tento plán pokrývá změny provedené v session 2026-05-18:
DonjonTabs ornaments, oprava TkajUI Modal, donjon varianty 7 komponent,
oprava hardcoded trigger elementů, přejmenování `components/layout/` → `styleguide/`.

---

## 1. Knihovní oddělení — TkajUI nesmí znát Donjon

**Co kontrolovat:** žádný soubor v `src/lib/tkajui/` nesmí importovat ornamenty
nebo cokoliv z `src/lib/donjon/`.

```bash
grep -rn "donjon\|SideOrnament\|HexOrnament" src/lib/tkajui/*.jsx \
  | grep -v "^.*Ornaments\.jsx\|komentář\|^\s*\*"
```

**Očekávaný výsledek:** žádný výstup (kromě komentářů v Button.jsx a Card.jsx
které popisují co donjon varianta *přidává* — ty jsou OK).

**Soubory ke kontrole ručně:**
- [ ] `src/lib/tkajui/Modal.jsx` — nesmí mít `renderPanelOrnaments` ani žádný jiný render prop pro ornamenty
- [ ] `src/lib/tkajui/Button.jsx` — žádný import z Ornaments
- [ ] `src/lib/tkajui/Card.jsx` — žádný import z Ornaments

---

## 2. Donjon odvozování — re-export vs. self-contained

### 2a. Re-exporty (donjon = vizuálně identické s TkajUI)

Tyto soubory musí obsahovat **jen** re-export řádek, nic jiného:

| Soubor | Očekávaný obsah |
|--------|-----------------|
| `DonjonBadge.jsx` | `export { default } from '../tkajui/Badge'` |
| `DonjonInput.jsx` | `export { default } from '../tkajui/Input'` |
| `DonjonSelect.jsx` | `export { default } from '../tkajui/Select'` |
| `DonjonSlider.jsx` | `export { default } from '../tkajui/Slider'` |
| `DonjonToggle.jsx` | `export { default } from '../tkajui/Toggle'` |
| `DonjonProgressBar.jsx` | `export { default } from '../tkajui/ProgressBar'` |
| `DonjonTooltip.jsx` | `export { default } from '../tkajui/Tooltip'` |
| `DonjonToast.jsx` | `export { ToastProvider, useToast } from '../tkajui/Toast'` |

```bash
# Rychlá kontrola — každý soubor by měl mít max ~5 řádků
wc -l src/lib/donjon/DonjonBadge.jsx src/lib/donjon/DonjonInput.jsx \
       src/lib/donjon/DonjonSelect.jsx src/lib/donjon/DonjonSlider.jsx \
       src/lib/donjon/DonjonToggle.jsx src/lib/donjon/DonjonProgressBar.jsx \
       src/lib/donjon/DonjonTooltip.jsx src/lib/donjon/DonjonToast.jsx
```

### 2b. Self-contained (donjon přidává ornamenty)

Tyto soubory musí **importovat** ornamenty a implementovat komponenty samostatně:

| Soubor | Musí importovat | Nesmí importovat |
|--------|-----------------|------------------|
| `DonjonButton.jsx` | `SideOrnament`, `HexOrnament` | TkajUI Button |
| `DonjonCard.jsx` | `SideOrnament`, `HexOrnament` | TkajUI Card |
| `DonjonModal.jsx` | `SideOrnament`, `HexOrnament` | TkajUI Modal |
| `DonjonTabs.jsx` | `HexOrnament` | TkajUI Tabs |

```bash
grep -n "import" src/lib/donjon/DonjonButton.jsx src/lib/donjon/DonjonCard.jsx \
                 src/lib/donjon/DonjonModal.jsx src/lib/donjon/DonjonTabs.jsx
```

**DonjonTabs specificky:** zkontroluj, že **není** re-export z `../tkajui/Tabs`.

---

## 3. Showcase stránky — přepínač TkajUI / donjon

### 3a. Stránky s variant switcherem

Tyto stránky mají `variants={[...]}` v ShowcasePage. Pro každou zkontroluj:

| Stránka | Klíčová proměnná | Trigger komponenty |
|---------|------------------|--------------------|
| `ButtonsPage` | `Btn` | — (je to přímo showcase tlačítek) |
| `BadgesPage` | `B` | — (přímo showcase) |
| `ButtonGroupsPage` | `BG` | — |
| `CardsPage` | `C`, `Btn`, `Bdg` | uvnitř karet |
| `InputsPage` | `I` | — |
| `ModalPage` | `ModalCmp`, `Btn` | trigger tlačítka |
| `ProgressBarPage` | `PB`, `Btn` | AnimatedDemo tlačítka |
| `SelectPage` | `S` | — |
| `SliderPage` | `Sl` | — |
| `TabsPage` | `T` | — |
| `ToastPage` | `Btn` (prop) | demo helper komponenty |
| `TogglePage` | `To` | — |
| `TooltipPage` | `Tip`, `Btn`, `Bdg` | trigger wrappery |

### 3b. Jak hledat problémy

```bash
# Najdi všechny přímé použití DonjonButton/DonjonBadge mimo import řádky
# v stránkách s variant switcherem
grep -n "<DonjonButton\|<DonjonBadge\|<DonjonCard\|<DonjonInput" \
  src/pages/BadgesPage.jsx \
  src/pages/ButtonGroupsPage.jsx \
  src/pages/ButtonsPage.jsx \
  src/pages/CardsPage.jsx \
  src/pages/InputsPage.jsx \
  src/pages/ModalPage.jsx \
  src/pages/ProgressBarPage.jsx \
  src/pages/SelectPage.jsx \
  src/pages/SliderPage.jsx \
  src/pages/TabsPage.jsx \
  src/pages/ToastPage.jsx \
  src/pages/TogglePage.jsx \
  src/pages/TooltipPage.jsx
```

**Očekávaný výsledek:** žádný výstup — žádné hardcoded JSX tagy.

### 3c. CodeBlock příklady

Na stránkách s přepínačem musí `<CodeBlock code={...}>` používat interpolované
proměnné (`${cmp}`, `${btnCmp}`, `${bdgCmp}`) místo hardcoded názvů komponent.

Ručně zkontroluj zejména:
- [ ] `CardsPage` — sekce "S patičkou" — CodeBlock ukazuje `${bdgCmp}` a `${btnCmp}`
- [ ] `TooltipPage` — všechny CodeBlock příklady ukazují `${cmp}` a `${btnCmp}`
- [ ] `ModalPage` — CodeBlock ukazuje `${cmp}` (ne natvrdo `DonjonModal`)

---

## 4. Export konzistence — index.js obou knihoven

### TkajUI index.js

```bash
# Všechny .jsx soubory v tkajui/ by měly mít odpovídající export v index.js
# (kromě __tests__/)
ls src/lib/tkajui/*.jsx | grep -v __tests__ | xargs -I{} basename {} .jsx
# Porovnej s:
grep "^export" src/lib/tkajui/index.js
```

### Donjon index.js

```bash
grep "^export" src/lib/donjon/index.js
```

Zkontroluj, že jsou exportovány:
- [ ] `DonjonTabs` — přidáno dnes
- [ ] `DonjonSelect`, `DonjonSlider`, `DonjonToggle`, `DonjonProgressBar` — přidáno dnes
- [ ] `DonjonTooltip` — přidáno dnes
- [ ] `DonjonToastProvider`, `useDonjonToast` — přidáno dnes

---

## 5. Struktura složek

```bash
# Stará složka nesmí existovat
ls src/components/ 2>&1  # mělo by vrátit chybu

# Nová složka musí existovat se správnými soubory
ls src/styleguide/
```

**Očekáváno v `src/styleguide/`:** `ShowcasePage.jsx`, `Sidebar.jsx`,
`Layout.jsx`, `DeviceFrame.jsx`

```bash
# Žádný soubor by neměl importovat ze staré cesty
grep -rn "components/layout" src/ --include="*.jsx" --include="*.js"
# Očekávaný výsledek: žádný výstup
```

---

## 6. Build

```bash
npx vite build
```

**Kritéria úspěchu:**
- [ ] Výstup obsahuje `✓ built in`
- [ ] Žádné chyby (`error:` v outputu)
- [ ] Varování o chunk size je OK (existuje před dnešní session)

---

## 7. Ruční vizuální kontrola v prohlížeči

Spusť `npx vite dev` a projdi tyto stránky. Pro každou přepni přepínač
z **donjon-fall-ui** na **TkajUI** a zkontroluj:

| Stránka | Co zkontrolovat v TkajUI módu |
|---------|-------------------------------|
| `/buttons` | žádné SideOrnament/HexOrnament na tlačítkách |
| `/cards` | žádné ornamenty na kartách; tlačítka a badge uvnitř karet jsou čisté |
| `/modal` | trigger tlačítka bez ornamentů; modal bez ornamentů |
| `/tooltip` | trigger tlačítka a badge bez ornamentů |
| `/toast` | trigger tlačítka bez ornamentů |
| `/progress-bar` | Spustit/Reset tlačítka bez ornamentů |
| `/tabs` | tabu bez HexOrnament dekorací |

---

## 8. Rychlý automatizovaný check (bash one-liner)

Spusť jako celkový sanity check:

```bash
echo "=== 1. TkajUI čistota ===" && \
grep -rn "from.*donjon\|SideOrnament\|HexOrnament" src/lib/tkajui/*.jsx \
  | grep -v "Ornaments\.jsx\|^\s*\*\|\/\/" && echo "OK" || true && \
\
echo "=== 2. Hardcoded Donjon v showcase ===" && \
grep -rn "<DonjonButton\|<DonjonBadge\|<DonjonCard" \
  src/pages/BadgesPage.jsx src/pages/ButtonGroupsPage.jsx \
  src/pages/ButtonsPage.jsx src/pages/CardsPage.jsx \
  src/pages/InputsPage.jsx src/pages/ModalPage.jsx \
  src/pages/ProgressBarPage.jsx src/pages/SelectPage.jsx \
  src/pages/SliderPage.jsx src/pages/TabsPage.jsx \
  src/pages/ToastPage.jsx src/pages/TogglePage.jsx \
  src/pages/TooltipPage.jsx && echo "PROBLEM!" || echo "OK" && \
\
echo "=== 3. Stará cesta components/layout ===" && \
grep -rn "components/layout" src/ --include="*.jsx" --include="*.js" \
  && echo "PROBLEM!" || echo "OK" && \
\
echo "=== 4. Build ===" && \
npx vite build 2>&1 | grep -E "✓ built|error:"
```

Výsledek by měl být: tři `OK` + `✓ built in X.XXs`.
