# Plan konzistence UI v donjon knihovně

## Cíl

Sjednotit vizuální logiku `src/lib/donjon/` tak, aby:

- plain zlatý rám fungoval jako základní, nejméně dekorovaný shell,
- komponenty, které dnes existují jen v ornamentální podobě, dostaly i plain variantu,
- API pro zapnutí/vypnutí ornaments bylo stejné napříč knihovnou,
- showcase stránky a dokumentace jasně ukazovaly oba režimy.

## Validace proti CLAUDE.md

Plán je směrně správný, ale při realizaci musí být výslovně svázaný s pravidly z `CLAUDE.md`. Bez toho hrozí, že implementace sice sjednotí ornamenty, ale rozbije lokální konvence knihovny.

Závěr validace:

- architektonický směr je správný,
- scope pro první iteraci je správně úzký,
- ale plán musí explicitně obsahovat implementační guardrails, validační kroky a showcase strategii podle projektu.

## Povinné guardrails z CLAUDE.md

### Barvy a tokeny

Každá změna v donjon komponentách musí držet tohle:

- všechny barvy importovat výhradně z `./tokens`,
- nepřidávat hardcoded hex hodnoty do komponent,
- pokud bude potřeba průhlednost, používat jen token-based zápis typu `${gold}30`.

Tohle musí být v implementaci brané jako hard constraint, ne doporučení.

### Tvar a shell komponent

Plain režim nesmí znamenat návrat k TkajUI vzhledu. Musí zůstat zachováno:

- donjon clip-path logika,
- donjon spacing a proporce,
- donjon border trick: outer wrapper = border barva, inner wrapper = fill barva,
- donjon tokeny a teplá paleta.

Plain tedy znamená „bez ornaments“, ne „bez donjon identity“.

### Animace a `<style>`

Pokud by implementace plain/decorated režimu vyžadovala nové animace nebo nové keyframes, platí:

- `@keyframes` nepatří do komponent,
- musí jít do `src/index.css`,
- inline `<style>` tagy nejsou správná cesta pro nový ornament toggle behavior.

Prakticky: první iterace by se měla obejít bez nových keyframes.

### Showcase integrace

Pro existující veřejné komponenty se nemají zakládat nové showcase stránky, pokud už odpovídající stránka existuje. Správný postup je:

- upravit existující page,
- použít `ShowcasePage`, `Section`, `Preview`, `CodeBlock`,
- pokud stránka už řeší tkajui + donjon variantu, držet se existujícího `useLibVariant()` flow.

To znamená:

- `ButtonsPage`
- `ButtonGroupsPage`
- `CardsPage`
- `ModalPage`

mají být rozšířeny, ne duplikovány.

## Lokální zjištění

### Plain zlatý shell už v knihovně existuje

Jako referenční základ už dnes fungují komponenty, které staví hlavně na zlatém borderu / gradientu bez Side/Hex ornaments. Typicky:

- `ActionTile`
- `ResourceBar`
- `NumericDisplay`
- `PlayerPanel`
- část formulářových a status prvků

To je dobrý základ pro výchozí „méně dekorovaný“ režim.

### Ornamentální vrstva je dnes natvrdo v těchto komponentech

Podle aktuálních importů `SideOrnament` / `HexOrnament` v `src/lib/donjon/*.jsx` jsou ornamenty přímo zabudované tady:

- `DonjonButton`
- `DonjonButtonGroup`
- `DonjonCard`
- `DonjonModal`
- `DonjonTabs`

Poznámky k současnému stavu:

- `DonjonButton`, `DonjonButtonGroup`, `DonjonCard`, `DonjonModal` jsou dnes fakticky ornaments-only.
- `DonjonTabs` je smíšený případ:
  - `pills` používá ornamentální rámování,
  - `underline` / `topline` už jsou střídmější, ale stále používají hex motiv jako součást indikátoru.

## Pracovní rozhodnutí

### 1. Plain režim definovat jako standardní baseline

Plain režim má znamenat:

- žádné `SideOrnament`,
- žádné `HexOrnament`,
- zachovaný donjon tvar, barvy, gradienty a zlatý border,
- zachovaná čitelnost hierarchy bez dekorativní vrstvy.

Jinými slovy: ne „odebrat identitu“, ale „ponechat donjon skin bez ornamentální nadstavby“.

### 2. Pro všechny ornamentální komponenty zavést stejné API

Doporučení: nepřidávat různá jména propů po komponentách. Zvolit jeden společný přepínač.

Preferovaná varianta:

```jsx
ornament="plain" | "decorated"
```

nebo ekvivalentně:

```jsx
ornaments={true | false}
```

Doporučení pro implementaci:

- pokud chceme srozumitelnější API: `ornament="decorated" | "plain"`
- pokud chceme menší diff: `ornaments={true|false}`

Můj preferovaný směr je `ornament`, protože:

- je čitelnější v showcase i dokumentaci,
- jde případně rozšířit později o třetí režim,
- vyhne se nejednoznačnosti typu `ornaments={false}` + další vizuální prop.

### 3. Default se v první iteraci nemění

Tohle je důležitá seniorní pojistka.

V první iteraci se nemá měnit default vizuálního režimu u existujících donjon komponent. To znamená:

- stávající usage musí po nasazení vypadat stejně jako dnes,
- nový plain režim je jen opt-in,
- případná změna defaultu může přijít až po auditu showcase stránek a reálného usage v app flow.

To snižuje regresní riziko a drží změnu v bezpečném rozsahu.

## Návrh cílového chování po komponentách

### Priorita A: ornaments-only komponenty

#### `DonjonButton`

Současný stav:

- ornamenty jsou vždy renderované,
- layout už s nimi počítá přes horizontální padding navýšený o ornament width.

Cílový stav:

- přidat `ornament="decorated" | "plain"`,
- v `plain` režimu:
  - nerenderovat `SideOrnament` ani `HexOrnament`,
  - zmenšit horizontální padding na přirozený text/icon layout,
  - zachovat pozadí, clip-path, gradient text a hover/focus chování.

Riziko:

- plain varianta nesmí vypadat opticky „prázdně“ oproti ornamentální.

#### `DonjonButtonGroup`

Současný stav:

- ornamenty drží krajní hrany skupiny a horní/spodní hex linky,
- spacing je na ně navázaný přes `ornW`, `edgePadL`, `edgePadR`.

Cílový stav:

- přidat stejný prop jako u `DonjonButton`,
- v `plain` režimu:
  - odstranit ornamenty,
  - vrátit padding k čistému button-group shellu,
  - zachovat aktivní gradient, clipLeft/clipRight a segmentovanou logiku.

Riziko:

- plain group nesmí rozpadnout rytmus prvního/posledního itemu.

#### `DonjonCard`

Současný stav:

- ornamenty jsou součástí header/body/footer kompozice,
- bez headeru zůstává top hex stále v body.

Cílový stav:

- přidat prop pro plain/decorated,
- v `plain` režimu:
  - vypnout boční i horní/spodní ornaments,
  - zachovat outer border shell, header background, footer separator,
  - případně lehce přenastavit padding headeru z `40px` na užší plain variantu.

Riziko:

- bez ornamentů může být header opticky moc vysoký nebo prázdný.

#### `DonjonModal`

Současný stav:

- velmi podobná skladba jako `DonjonCard`, ale navíc close button layout a dialog shell.

Cílový stav:

- stejné API jako `DonjonCard`,
- plain režim má sdílet stejnou logiku ornament vypnutí,
- hlídat, aby header/body/footer spacing po vypnutí ornamentů seděl i s close buttonem.

Riziko:

- modal a card by se po rozvětvení neměly vizuálně rozejít jiným tempem.

### Priorita B: smíšený případ

#### `DonjonTabs`

Současný stav:

- `pills` je ornamentální,
- `underline` a `topline` jsou už střídmější, ale používají hex motiv v indikátoru.

Cílový stav:

- rozhodnout, jestli:
  - `underline` / `topline` už považujeme za plain baseline,
  - nebo i tady chceme úplně bez hex motivu.

Doporučení:

- první iterace: neřešit `underline` / `topline` jako problém,
- plain/decorated řešit jen pro `pills`,
- až potom případně dělat druhé rozhodnutí nad „hex-indicator minimalismem“.

Tím se scope zmenší a nevznikne zbytečně redesign tabs systému.

## Doporučené pořadí práce

### Fáze 1: audit a API kontrakt

Udělá se:

- potvrdit společný prop (`ornament` vs `ornaments`),
- potvrdit default chování kvůli zpětné kompatibilitě.

Doporučení defaultu:

- krátkodobě ponechat `decorated` jako default, aby se nerozbily stávající showcase a usage,
- plain režim přidat jako opt-in,
- teprve po otestování případně zvážit opačný default.

Výstup:

- jednoznačné API rozhodnutí pro všechny ornamentální komponenty.

### Fáze 2: shared ornament gating

Udělá se:

- vytáhnout opakující se podmínku pro render ornaments do jednoduchého společného patternu,
- sjednotit názvosloví a default prop handling ve všech 4 hlavních komponentech:
  - `DonjonButton`
  - `DonjonButtonGroup`
  - `DonjonCard`
  - `DonjonModal`

Cíl:

- stejná prop logika,
- stejné chování plain vs decorated,
- minimální divergence mezi card a modal.

  Doplnění po validaci:

  - pokud se objeví opakující se výpočet paddingů nebo ornament spacingu, má smysl ho vytáhnout do lokální helper vrstvy,
  - ale neotvírat kvůli tomu nový shared abstraction soubor, dokud nebude jasné, že pattern opravdu stabilizoval.

### Fáze 3: spacing pass

Udělá se:

- po vypnutí ornaments upravit padding a layout v plain režimu,
- ohlídat edge cases:
  - iconOnly button,
  - fullWidth button,
  - single-item button group,
  - card bez headeru,
  - modal bez title,
  - footer variants.

Tohle je důležité, protože samotné vypnutí ornaments nebude stačit.

### Fáze 4: showcase a dokumentace

Udělá se:

- doplnit showcase stránky o srovnání `decorated` vs `plain`,
- aktualizovat `componentMeta.js` props pro dotčené komponenty,
- případně upravit `Components` page previewe, aby se tam daly ukázat oba režimy.

Po validaci doplňuju přesnější požadavek:

- u každé dotčené komponenty musí být v showcase minimálně sekce „decorated vs plain",
- code samples musí ukázat přesně nový prop contract,
- metadata v `componentMeta.js` musí přidat nový prop u všech dotčených komponent konzistentně stejným názvem.

Minimálně doplnit showcase pro:

- Buttons
- Button Groups
- Cards
- Modal
- případně Tabs (`pills`)

### Fáze 5: consistency review přes donjon knihovnu

Udělá se finální průchod s otázkou:

- je plain všude opravdu stejný typ vizuálního jazyka?
- nepůsobí některé plain komponenty až moc „tkajui-like“?
- není někde ornamentální varianta přespříliš těžká vedle nového plain základu?

## Praktický checklist pro implementaci

### Audit checklist

- sepsat seznam všech public donjon komponent do dvou skupin:
  - plain baseline
  - ornament-capable
- potvrdit, které mají být dual-mode a které ne

### Implementační checklist

- přidat společný prop do `DonjonButton`
- přidat společný prop do `DonjonButtonGroup`
- přidat společný prop do `DonjonCard`
- přidat společný prop do `DonjonModal`
- rozhodnout scope u `DonjonTabs`
- upravit spacing v plain režimu
- aktualizovat showcase stránky
- aktualizovat metadata props

### Validační checklist

- build prochází
- preview stránky se nerozsypaly layoutově
- dekorovaný režim vypadá stejně jako před změnou
- plain režim nepůsobí jako „useknutá“ ornamentální verze
- focus ring a hover stavy fungují v obou režimech

Po validaci podle CLAUDE.md doplňuju ještě povinné body:

- všechny nové nebo upravené barvy jdou přes `./tokens`
- nevznikl žádný nový inline `@keyframes` blok v komponentách
- card a modal zůstaly vizuálně konzistentní mezi sebou
- plain režim nepřepisuje donjon tvar na tkajui geometrii

### Testovací checklist

I když nejde o nové komponenty, jde o novou větvící logiku v public API. Proto je rozumné přidat aspoň úzké testy pro netriviální kusy.

Doporučené minimum:

- `DonjonButton`: render `decorated` vs `plain`
- `DonjonButtonGroup`: krajní item spacing / přítomnost ornament shellu
- `DonjonCard` nebo `DonjonModal`: header/body/footer v plain režimu bez ornaments

Cíl testů není pixel-perfect snapshot celé knihovny, ale ochrana proti regresi v prop větvení.

## Doporučený scope pro první PR

První PR bych držel úzký:

1. `DonjonButton`
2. `DonjonButtonGroup`
3. `DonjonCard`
4. `DonjonModal`

Do stejného PR bych dal jen minimální showcase update, ne celý redesign ostatních stránek.

Do stejného PR bych naopak už dal:

- aktualizaci `componentMeta.js` pro nový prop,
- alespoň základní testy pro nejrizikovější větvení,
- build + relevantní test run jako finální validaci.

`DonjonTabs` bych nechal do druhého kola, protože je to spíš designové rozhodnutí než čistá konzistence shellu.

## Co bych jako senior výslovně nedělal v první iteraci

- neměnil default z `decorated` na `plain`,
- neřešil současně redesign všech donjon komponent,
- neotvíral nové shared theme abstraction vrstvy,
- neřešil `DonjonTabs` underline/topline bez předchozího designového rozhodnutí,
- nepřidával nové page soubory tam, kde už showcase stránka existuje.

## Doporučený výstupový princip

Po dokončení by měla platit jednoduchá věta:

> Každá výrazně ornamentální donjon komponenta umí běžet i v plain gold-frame režimu, a to přes stejné API a bez rozbití spacingu nebo hierarchy.
