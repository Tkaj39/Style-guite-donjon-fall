# Plan rozšíření style guidu

Tento dokument shrnuje návrh dalších komponent a dokumentačních sekcí, které dávají smysl doplnit do style guidu Donjon Fall. Cíl je rozšířit knihovnu o prvky, které jsou běžné napříč hrami, a současně doplnit systémové zásady, které dnes v dokumentaci chybí.

## Architektura knihovny

Projekt je navržen jako dvouvrstvá knihovna. Obě vrstvy jsou samostatné npm balíčky.

### TkajUI — core knihovna

Generická herní UI knihovna bez vizuální závislosti na konkrétní hře.

**npm:** `tkaj-ui`

**Obsah:**

- Komponenty: Button, Card, Badge, Input, Modal, Toast, Tooltip, Toggle, ProgressBar
- Animace jako principy a utility — timing tokeny, easing křivky, generické přechody (Fade, Slide, Scale)
- Zvuky jako generické API — správce zvuků, kategorie, volume management, hooks (`useSound`) — bez konkrétních audio souborů
- HUD elementy genericky — progress bar, stat display, timer
- Interaction states, Accessibility
- Shapes systém — octagon utility a rozšíření (cut, round, scoop, notch)

**Cíl:** Jiný vývojář her může použít TkajUI a přinést si vlastní vizuální téma.

---

### donjon-fall-ui — Donjon Fall téma

Rozšíření TkajUI o kompletní vizuální jazyk hry Donjon Fall.

**npm:** `donjon-fall-ui`

**Závisí na:** `tkaj-ui`

**Obsah:**

- Vše z TkajUI + Donjon Fall styling — octagon tvar, zlaté gradienty (#FFC183 → #8F7458), ornamenty, tmavá paleta
- Game Assets specifické pro Donjon Fall — HexTile, DieFace, FloatFeedback
- Konkrétní animace — hod kostkou, kolaps věže, ohnisko, souboj
- Konkrétní zvukový design — Donjon Fall audio soubory a sound mapping
- Piktogramy — Donjon Fall sada ikon postavená na TkajUI icon API
- Erb, Mapa a další Donjon Fall-specifické komponenty

**Cíl:** Kompletní Donjon Fall vizuální systém připravený k použití v dalších projektech hry.

---

### Co nepatří do TkajUI

- Game Assets (HexTile, DieFace, FloatFeedback) — příliš specifické pro Donjon Fall
- Konkrétní animace tahové hry — patří do donjon-fall-ui
- Konkrétní audio soubory — patří do donjon-fall-ui
- Erb, Mapa — Donjon Fall-specifické vizuální prvky
- Konkrétní piktogramy — Donjon Fall piktogramy patří do donjon-fall-ui; TkajUI poskytuje pouze generické icon API (způsob registrace a použití ikon)

TkajUI tedy definuje **jak ikony fungují**, donjon-fall-ui dodává **které ikony existují**.

---

### Co donjon-fall-ui přepisuje nad TkajUI

| Oblast | TkajUI | donjon-fall-ui |
|---|---|---|
| Barvy | neutrální paleta | zlatá/bronz (#FFC183 → #8F7458), tmavé pozadí |
| Tvary | obecné (žádný default) | octagon systém (cut/round/scoop, 5 velikostí) |
| Fonty | systémové / neutrální | fantasy/herní font pro nadpisy, specifický pro čísla |
| Focus ring | modrý (browser default) | zlatý (brand-500) |
| Glow / shadow | neutrální stíny | brand glow na hover, selected a active stavech |
| Ikony | generické icon API | Donjon Fall piktogramy |
| Kurzor | default OS kurzor | herní varianty (výběr, útok, pohyb, blocked) |
| Scrollbar | browser default | tmavý stylovaný scrollbar |
| Easing křivky | standardní ease-in-out | těžší, dramatičtější easing pro herní animace |
| Animace | generické přechody | konkrétní herní animace (hod kostkou, kolaps věže…) |
| Zvuky | generické audio API | Donjon Fall sound design a audio soubory |
| Piktogramy | icon API bez obsahu | Donjon Fall sada piktogramů |
| Ornaments | žádné | SideOrnament, HexOrnament, CornerOrnament |
| Game Assets | žádné | HexTile, DieFace, FloatFeedback, Erb, Mapa |
| Výběr textu | browser default | zlatá (::selection barva) |
| Textury | žádné | atmosférické textury panelů, karet a pozadí |

### Distribuce

Obě knihovny budou distribuované jako npm balíčky s prebuildnutým CSS:

```js
// TkajUI
import { Button, Modal, Toast } from 'tkaj-ui'
import 'tkaj-ui/dist/styles.css'

// donjon-fall-ui
import { HexTile, DieFace, DonjonButton } from 'donjon-fall-ui'
import 'donjon-fall-ui/dist/styles.css'
```

Formát balíčku je identický pro lokální použití (`npm install file:../tkaj-ui`) i pro publikování na npm (`npm publish`).

## Cíl plánu

- doplnit chybějící reusable komponenty
- doplnit obecné systémové sekce, které nejsou vázané jen na jeden screen
- rozšířit style guide o herně specifické stavební bloky
- připravit podklad pro budoucí implementaci i dokumentaci

## Prioritní směry

Plán je rozdělený do tří hlavních oblastí.

1. Komponenty, které skoro každá hra potřebuje.
2. Dokumentační sekce, které chybí na úrovni principů.
3. Herně specifické prvky pro interakci a HUD.

## Komponenty které skoro každá hra potřebuje

### Tooltip

**Stav dnes**

Zatím chybí úplně jako samostatná komponenta.

**Proč doplnit**

- vysvětlování ikon, statistik a efektů
- krátké kontextové nápovědy bez nutnosti otevírat dialog
- použití v HUD, mapě, inventáři i menu

**Co má budoucí komponenta pokrýt**

- krátký textový obsah
- volitelný titulek
- umístění vůči cílovému prvku
- chování na hover, focus a případně click
- bezpečné vrstvení nad ostatním UI

**Dokumentace má řešit**

- kdy tooltip použít a kdy už je vhodnější dialog
- doporučenou délku obsahu
- chování na desktopu a mobilu
- přístupnost pro keyboard a screen readery

### Modal / Dialog

**Stav dnes**

Dialogy jsou popsané jako vzory, ale neexistuje reusable komponenta.

**Proč doplnit**

- potvrzovací akce
- výhra, prohra, upozornění, rozhodnutí hráče
- jednotná práce s overlayem, fokusem a zavřením

**Co má budoucí komponenta pokrýt**

- overlay
- hlavičku, tělo a patičku
- zavření tlačítkem, backdropem a klávesou Escape
- velikostní varianty
- focus management

**Dokumentace má řešit**

- rozdíl mezi modalem a lehkým potvrzovacím dialogem
- destruktivní versus informační použití
- pravidla pro primární a sekundární akce
- blokování podkladového obsahu

### Toast / Notification

**Stav dnes**

Chybí samostatná notifikační komponenta.

**Proč doplnit**

- herní eventy
- úspěchy a odměny
- chybové zprávy
- potvrzení úspěšné akce bez přerušení flow

**Co má budoucí komponenta pokrýt**

- varianty podle typu zprávy
- automatické skrytí i manuální zavření
- pozici na obrazovce
- frontu nebo stack více zpráv
- volitelnou ikonu a akci

**Dokumentace má řešit**

- kdy použít toast a kdy dialog
- doporučenou délku zprávy
- prioritu a pořadí zpráv
- chování během intenzivní herní akce

### Progress bar

**Stav dnes**

Naznačený na LoadingGame, ale neexistuje jako samostatná komponenta.

**Proč doplnit**

- zdraví
- mana nebo energie
- načítání
- zkušenosti nebo postup mise

**Co má budoucí komponenta pokrýt**

- aktuální hodnota a maximum
- determinate i indeterminate režim
- barevné varianty podle významu
- volitelný štítek nebo číslo
- horizontální a případně kompaktní variantu

**Dokumentace má řešit**

- rozdíl mezi loading barem a stavovým indikátorem
- minimální čitelnost při malých velikostech
- kdy zobrazovat čísla a kdy jen vizuální postup

### Toggle / Switch

**Stav dnes**

Je použitý ve SettingsPage, ale není jako standalone komponenta.

**Proč doplnit**

- nastavení zvuku, grafiky a ovládání
- rychlé binární přepínání v menu
- opakovaně použitelný formulářový prvek

**Co má budoucí komponenta pokrýt**

- zapnutý a vypnutý stav
- disabled stav
- label a pomocný text
- velikostní varianty
- keyboard ovládání

**Dokumentace má řešit**

- rozdíl mezi switch a checkboxem
- vhodné formulace popisků
- chování při focusu a ovládání z klávesnice

## Sekce které chybí jako dokumentace

### Motion principles

**Stav dnes**

Existují konkrétní animace, ale chybí obecná pravidla animací.

**Proč doplnit**

- sjednocení trvání animací
- sjednocení easing křivek
- jasná pravidla co animovat a co ne
- omezení vizuálního šumu

**Sekce má pokrýt**

- základní délky animací podle typu interakce
- doporučené easing křivky
- pravidla pro micro interaction versus výraznou herní animaci
- animace vstupu, výstupu a změny stavu
- reduced motion přístup

### Accessibility

**Stav dnes**

Chybí obecná sekce přístupnosti.

**Proč doplnit**

- kontrastní poměry
- keyboard navigace
- focus management
- čitelnost UI v různých stavech

**Sekce má pokrýt**

- kontrast textu a interaktivních prvků
- focus states napříč komponentami
- navigaci bez myši
- semantiku základních prvků
- doporučení pro tooltipy, dialogy a notifikace

### Spacing rules

**Stav dnes**

Existují spacing tokeny a samostatná stránka ke spacingu, ale chybí pravidla použití. Vývojář tak neví, kdy použít margin, padding nebo gap, a musí si to odhadovat podle situace.

**Proč doplnit**

- zpřesnění layout pravidel napříč celým systémem
- sjednocení spacingu uvnitř komponent i mezi bloky
- omezení nekonzistentního použití marginů mezi sourozenci
- jasnější pravidla pro responzivní chování rozestupů

**Sekce má pokrýt**

- rozdíl mezi `padding`, `gap` a `margin`
- pravidlo, že `padding` slouží pro vnitřní prostor komponenty
- pravidlo, že `gap` je preferovaný nástroj pro mezery mezi children ve flex a grid layoutu
- pravidlo, že `margin` patří hlavně na layout úroveň a nemá nahrazovat vnitřní spacing komponenty
- doporučené výjimky, kdy je margin stále vhodný

**Sémantické skupiny**

- `component spacing`: vnitřní rozestupy uvnitř komponent
- `layout spacing`: mezery mezi sekcemi, bloky a většími layout celky
- `responsive spacing`: pravidla pro změnu rozestupů mezi desktopem, tabletem a mobilem

**Sekce má dále řešit**

- jak mapovat spacing tokeny na konkrétní use case
- doporučené rozestupy pro stack sekcí, formulářové skupiny, karty a navigační bloky
- pravidla pro zmenšování spacingu na menších breakpoint ech
- příklady typu „na mobilu snížit rozestup o jeden stupeň“, pokud to odpovídá systému

### Shapes system extension

**Stav dnes**

Shapes jsou v systému přítomné, ale chybí rozšířený model pro různé intenzity zkosení a různé typy rohů. Současný přístup je prakticky navázaný hlavně na současný `cut` styl.

**Proč doplnit**

- větší variabilita vizuální identity komponent
- přesnější rozlišení mezi jemným a výrazným tvarovým jazykem
- možnost použít odlišný roh podle významu komponenty nebo vrstvy UI
- lepší návaznost mezi Shapes stránkou a reálnými komponentami

**Sekce má pokrýt**

- definici velikosti zkosení
- definici typu rohu
- doporučení, kdy použít jemnější a kdy výraznější tvar
- návaznost shapes systému na Buttons, Cards, Inputs a další povrchové komponenty

**Navržené velikosti zkosení**

- `0` → žádný roh navíc, čistý čtverec nebo obdélník
- `1` → `xs`, sotva znatelné zkosení
- `2` → `sm`
- `3` → `md`, přibližně současný výchozí stav
- `4` → `lg`
- `5` → `xl`, výrazný střih

**Navržené typy rohů**

- `cut` → současný úhlopříčný střih založený na polygonu
- `round` → oblý roh založený na `border-radius`
- `scoop` → konkávní výřez směrem dovnitř

**Technická realita a omezení**

`cut`:

- nejjednodušší varianta
- jde rozšířit přímo ze současného přístupu v `octagon.js`
- dobře funguje pro současné komponenty založené na `clip-path`

`round`:

- technicky jednoduché samo o sobě
- naráží na konflikt s komponentami, které dnes používají `clip-path`
- pokud komponenta používá `clip-path`, běžné `border-radius` se neuplatní podle očekávání
- pro skutečný `round` režim by některé komponenty musely přejít z `clip-path` přístupu na řešení založené čistě na `border-radius`

`scoop`:

- technicky nejnáročnější varianta
- konkávní tvar v CSS `clip-path` vyžaduje přesnější práci s `path()` a absolutními souřadnicemi
- u fixních rozměrů, například u tlačítek s pevnou výškou, je řešení reálné
- u prvků s proměnlivou šířkou je implementace výrazně složitější
- alternativně může být potřeba SVG maska nebo pseudo-element řešení

**Doporučení pro implementaci**

- první implementační fázi stavět na typu `cut`
- `round` navrhovat jen tam, kde nebude konflikt s existující architekturou komponent
- `scoop` považovat za pokročilé rozšíření až po ověření konkrétních use case
- oddělit dokumentační návrh tvarového systému od okamžité implementace všech variant

### Shapes notch extension

**Stav dnes**

Shapes systém umí řešit zkosení rohů, ale neumí výřez na hraně komponenty pro zasazení badge, indikátoru nebo jiného vloženého prvku.

**Proč doplnit**

- umožní přesně integrovat prvky jako VP badge nebo stavový indikátor do obrysu komponenty
- rozšíří shape systém z rohů i na aktivní práci s hranou komponenty
- zlepší vazbu mezi tvarem komponenty a obsahem, který na ni sedí

**Jednoduchý implementační plán**

1. Přidat funkci `octagonWithNotch(outerCx, notch)`.
2. Přidat wrapper komponentu `NotchedBox`.
3. Vyřešit automatické pozicování slotu do středu výřezu.
4. Doplnit dokumentaci do ShapesPage.

**Funkce `octagonWithNotch(outerCx, notch)`**

Navržené vstupní API:

```js
notch: {
	edge: 'top' | 'bottom' | 'left' | 'right',
	align: 'start' | 'center' | 'end',
	reference?: 'edge-center' | 'vertex',
	position?: number,
	size: number,
	sizeMode?: 'fixed' | 'responsive' | 'content-fit',
	offset?: number,
	minSize?: number,
	maxSize?: number,
	safeInset?: number
}
```

Požadované chování:

- vrací SVG `clipPath` s obrysem komponenty a výřezem
- používá dvě cesty a `evenodd` pravidlo pro odečtení výřezu
- zachovává současný oktagonový jazyk a jen ho rozšiřuje o notch

**Rozšíření chování notche**

- `size` určuje základní velikost výřezu
- `reference: edge-center` znamená, že střed výřezu se počítá vůči středu příslušné strany shape
- `reference: vertex` znamená, že střed výřezu se vztahuje k vrcholu nebo rohovému bodu shape na dané straně
- `position` umožňuje kontinuální umístění po délce hrany v rozsahu `0..1`
- `sizeMode: fixed` znamená pevnou velikost bez ohledu na rozměr komponenty
- `sizeMode: responsive` umožňuje měnit velikost výřezu podle breakpointu nebo velikosti wrapperu
- `sizeMode: content-fit` znamená, že velikost výřezu se odvozuje od rozměru obsahu ve slotu
- `offset` slouží pro jemné posunutí výřezu mimo čisté zarovnání `start | center | end`
- `minSize` a `maxSize` omezují roztažení výřezu, aby zůstal vizuálně stabilní
- `safeInset` určuje minimální bezpečnou vzdálenost výřezu od rohů, ornamentů nebo kritických hran

**Pravidla pro umístění**

- `align + offset` pokrývá běžné zarovnání bez potřeby přesné geometrické hodnoty
- `position` slouží pro případy, kdy je potřeba umístit výřez na přesné místo po délce hrany
- pokud je zadané `position`, má mít přednost před jednoduchým modelem `align`
- `position = 0` znamená začátek hrany, `0.5` střed a `1` konec hrany

**Komponenta `NotchedBox`**

Navržené rozhraní:

```jsx
<NotchedBox
	cx={15}
	notch={{ edge: 'top', align: 'end', reference: 'vertex', size: 8, sizeMode: 'fixed' }}
>
	<content />
	<NotchedBox.Slot>
		<VPBadge />
	</NotchedBox.Slot>
</NotchedBox>
```

Požadované chování:

- wrapper aplikuje příslušný `clipPath`
- hlavní obsah se vykresluje uvnitř tvaru
- `NotchedBox.Slot` slouží pro element, který sedí přímo do výřezu
- wrapper musí umět pracovat s fixní i proměnlivou šířkou komponenty
- API má být použitelné pro malé boxy i full-width komponenty

**Možné budoucí rozšíření API**

- pro pokročilé případy může systém v budoucnu podporovat více výřezů současně
- to může znamenat rozšíření z `notch` na `notches: []`
- první verze má ale zůstat u jednoho výřezu, aby byla geometrie i slotování udržitelné

**Pozicování slotu**

- slot má být absolutně pozicovaný podle kombinace `edge + align`
- slot má být absolutně pozicovaný podle kombinace `edge + align + reference`
- prvek ve slotu má sedět přesně do středu výřezu
- je potřeba zajistit konzistentní pozici pro `top`, `bottom`, `left` i `right`
- pozicování musí fungovat i pro různé velikosti výřezu

**Referenční bod výřezu**

- systém má explicitně rozlišovat, jestli se výřez vztahuje ke středu strany, nebo ke vrcholu shape
- `reference: edge-center` je vhodné pro badge a indikátory navázané na rovnou hranu
- `reference: vertex` je vhodné pro případy, kdy má výřez opticky navazovat na roh nebo zkosený přechod
- u oktagonových tvarů je potřeba přesně definovat, který vrchol je pro danou kombinaci `edge + align` referenční

**Škálování a rozměrová pravidla**

- systém musí explicitně určit, jestli se výřez jen drží pevné velikosti, nebo se může škálovat s komponentou
- u úzkých komponent musí existovat ochrana proti příliš velkému výřezu vzhledem k hraně
- u širokých nebo full-width komponent musí být jasné, jestli se výřez drží fixní velikosti, nebo se adaptuje
- velikost výřezu nesmí narušit čitelnost obsahu ani stabilitu shape obrysu

**Bezpečné zóny a kolize**

- výřez musí respektovat minimální vzdálenost od rohů a zkosení
- výřez nesmí kolidovat s ornamenty nebo jinými dekorativními prvky na hraně
- pokud se výřez nevejde do bezpečné oblasti, systém musí mít fallback pravidlo
- fallback může znamenat zmenšení, posun nebo odmítnutí dané konfigurace

**Vazba mezi slotem a výřezem**

- je potřeba rozhodnout, jestli je autoritativní velikost výřezu, nebo velikost obsahu ve slotu
- v režimu `content-fit` se výřez odvozuje od rozměru slotu s přidanou bezpečnou rezervou
- ve fixním režimu se slot musí přizpůsobit definované velikosti výřezu
- pokud obsah slotu překročí dostupný prostor, systém musí mít fallback pravidlo

**Dokumentace má pokrýt**

- novou sekci na ShapesPage
- přehled kombinací `edge × align`
- přehled kombinací `edge × align × reference`
- přehled kombinací `edge × align × sizeMode`
- přehled kombinací s kontinuální `position`
- doporučení, kdy použít notch a kdy raději běžný overlay nebo badge mimo obrys
- návaznost na badges, indikátory a další prvky vázané na hranu komponenty
- ukázky chování na úzké i široké komponentě
- ukázky limitních stavů, kdy se výřez blíží rohu nebo ornamentu

**Technická realita a omezení**

- notch je výrazně jednodušší než obecný konkávní shape, protože je lokalizovaný jen na jednu hranu
- SVG `clipPath` s `evenodd` je pro tenhle případ vhodnější než snaha skládat tvar jen přes CSS polygon
- u slotu je potřeba pečlivě řešit stacking, overflow a interakci s obsahem komponenty
- výřez musí být navržený tak, aby nepoškodil čitelnost textu nebo ornamentů v blízkosti hrany
- proměnlivá šířka komponenty komplikuje přesné chování notche, pokud má být velikost nebo pozice odvozovaná dynamicky
- referencování k vrcholu je geometričtější a může vyžadovat odlišný výpočet než zarovnání ke středu strany
- `content-fit` režim může vyžadovat měření obsahu slotu a následný přepočet clipPath
- plně kontinuální `position` zvyšuje flexibilitu, ale i nároky na kolizní logiku a bezpečné zóny
- pokud by se systém měl rozšířit i na diagonální hrany shape, bude potřeba samostatně modelovat typ hrany a její geometrii

**Doporučení pro implementaci**

- začít jedním edge směrem, ideálně `top`
- nejdřív ověřit varianty `start`, `center`, `end` na jedné hraně
- nejdřív ověřit režim `reference: edge-center`, teprve potom přidat `reference: vertex`
- první verzi držet v režimu `sizeMode: fixed`
- první verzi držet bez kontinuální `position`, pouze s `align + offset`
- `responsive` a `content-fit` řešit až po ověření základní geometrie a slotování
- kontinuální `position`, bezpečné zóny a vícenásobné výřezy řešit až v pokročilé fázi
- teprve potom rozšířit na všechny čtyři hrany
- API navrhnout od začátku obecně, ale první implementaci držet co nejmenší

### Ornaments corner extension

**Stav dnes**

Ornaments řeší hlavně boční a horizontální dekorativní prvky, ale chybí samostatný rohový ornament, který by reagoval na typ rohu komponenty.

**Proč doplnit**

- lepší provázání ornament systému se shapes systémem
- možnost dekorovat rohy tlačítek, karet a dalších povrchů konzistentním způsobem
- sjednocení chování ornamentů pro `cut`, `round` i `scoop` rohy

**Návrh rozšíření**

Je potřeba navrhnout rohový ornament pro každý podporovaný typ rohu:

- `cut` → ornament sleduje úhlopříčný střih
- `round` → ornament se přizpůsobí oblému rohu
- `scoop` → ornament reaguje na konkávní výřez

**SVG podklad**

- pro každý typ rohu vytvořit vlastní SVG cestu
- ornament má být čtvercový, například `24 × 24 px`
- stejný základ se má dát otáčet podle pozice rohu
- gradienty a dekorativní linie musí zůstat čitelné i po otočení

**Budoucí komponenta**

Do `Ornaments.jsx` se má přidat nová komponenta `CornerOrnament`.

Požadované rozhraní:

```jsx
<CornerOrnament
	position="top-left"
	cornerType="cut"
	size="md"
	uid="unique-id"
/>
```

Podporované props:

- `position` → `top-left | top-right | bottom-left | bottom-right`
- `cornerType` → `cut | round | scoop`
- `size` → `sm | md | lg`
- `uid` → unikátní identifikátor pro SVG gradienty a masky

**Dokumentace má pokrýt**

- novou sekci v OrnamentsPage
- přehled všech kombinací `4 pozice × 3 typy rohů`
- doporučení, které typy ornamentů se mají párovat s jakým tvarem komponenty
- návaznost na Shapes stránku a rozšíření shape systému

**Metadata a systémová návaznost**

- doplnit nové props do `src/data/componentMeta.js`
- rozšířit metadata pro `Ornaments` o `CornerOrnament`
- zajistit, aby nový ornament byl dohledatelný v dokumentaci stejně jako ostatní subkomponenty ornament systému

**Technická realita a omezení**

- `cut` varianta je nejpřímější, protože navazuje na současný polygonový jazyk
- `round` varianta musí vizuálně sedět s komponentami, které případně přejdou na `border-radius`
- `scoop` varianta bude nejobtížnější na sladění s konkávním rohem a může vyžadovat vlastní SVG logiku místo jednoduchého zrcadlení
- je potřeba hlídat, aby ornament nebyl jen dekorativně správný v izolaci, ale i přesně seděl na skutečném rohu komponenty

**Doporučení pro implementaci**

- začít návrhem a implementací `cut` varianty
- připravit API komponenty tak, aby podporovalo i `round` a `scoop`, i když se neudělají hned všechny varianty najednou
- dokumentaci a metadata navrhnout už od začátku pro plný model `position × cornerType × size`

### Loading and skeleton states

**Stav dnes**

Existují loading obrazovky a progress bar motivy, ale chybí obecná pravidla pro loading stavy a skeletony jako samostatná dokumentační oblast.

**Proč doplnit**

- sjednocení chování během načítání dat
- lepší návaznost mezi progress barem, loading screenem a placeholder obsahem
- omezení vizuálního chaosu při čekání na data

**Sekce má pokrýt**

- kdy použít spinner, progress bar, skeleton nebo plný loading screen
- rozdíl mezi krátkým loading stavem a delším čekáním
- pravidla pro placeholder obsah v seznamech, kartách a detailních panelech
- návaznost loading stavu na empty state a error state

### Validation patterns

**Stav dnes**

Validace je řešená lokálně u jednotlivých vstupů, ale chybí obecná dokumentace validačních vzorů napříč systémem.

**Proč doplnit**

- sjednocení formulářového chování
- jasnější pravidla pro error, warning a success stavy
- předvídatelnější UX u nastavení a vstupních formulářů

**Sekce má pokrýt**

- inline validační chyby
- warning a success stavy
- kdy validovat okamžitě a kdy až po potvrzení
- návaznost na helper texty a focus management

### Interaction states

**Stav dnes**

Interakční stavy jsou řešené po jednotlivých komponentách, ale chybí jejich systémový přehled napříč celým UI.

**Proč doplnit**

- sjednocení chování všech interaktivních prvků
- konzistentní reakce na hover, focus, active a disabled
- jasná pravidla pro selected, loading a blocked stavy

**Sekce má pokrýt**

- `hover`
- `focus`
- `active`
- `disabled`
- `selected`
- `loading`
- `blocked`
- doporučení, které stavy mají být povinné pro které typy komponent

### Content and microcopy rules

**Stav dnes**

Chybí jednotná pravidla pro texty v UI, takže i vizuálně konzistentní systém může působit textově nejednotně.

**Proč doplnit**

- sjednocení stylu popisků, tlačítek a stavových zpráv
- lepší čitelnost krátkých textů v herním UI
- menší riziko nekonzistentních formulací mezi stránkami

**Sekce má pokrýt**

- pravidla pro labely
- pravidla pro CTA texty v tlačítkách
- pravidla pro error texty
- pravidla pro tooltipy a potvrzovací dialogy
- pravidla pro empty state a notification copy

### Responsive behavior rules

**Stav dnes**

Existují device framy a jednotlivé screeny, ale chybí obecná pravidla responzivního chování systému.

**Proč doplnit**

- sjednocení rozhodování mezi desktopem, tabletem a mobilem
- menší riziko nahodilých layout změn
- lepší návaznost na spacing a navigační pravidla

**Sekce má pokrýt**

- co se na menších zařízeních skládá pod sebe
- co se zjednodušuje nebo skrývá
- které prvky musí zůstat vždy viditelné
- návaznost na responsive spacing a device framy

### Feedback hierarchy

**Stav dnes**

Chybí pravidla priorit mezi různými typy zpětné vazby a překryvných stavů.

**Proč doplnit**

- zabránění konfliktům mezi modalem, toastem, tooltipem a inline chybou
- jasnější priority při více stavech najednou
- lepší čitelnost herní zpětné vazby

**Sekce má pokrýt**

- co má prioritu nad čím
- kdy toast nesmí konkurovat modalu
- kdy tooltip ustupuje error nebo blocked stavu
- návaznost loading, disabled a error stavů

### Design token governance

**Stav dnes**

Chybí pravidla, jak systém dále rozšiřovat bez nekontrolovaného přidávání nových tokenů a hodnot.

**Proč doplnit**

- ochrana konzistence design systému
- jasné rozhodování, kdy použít existující token a kdy přidat nový
- lepší správa spacingu, z-indexu, motion i barev

**Sekce má pokrýt**

- kdy rozšířit token škálu
- kdy použít existující hodnotu
- jak navrhovat nové tokeny
- jak dokumentovat změny v design systému

### Empty states

**Stav dnes**

Chybí samostatná dokumentace pro stavy bez obsahu.

**Proč doplnit**

- prázdné seznamy
- chybějící uložené hry
- prázdný inventář nebo přehled misí
- onboardingové stavy

**Sekce má pokrýt**

- jak formulovat headline a supporting text
- kdy nabídnout primární akci
- vizuální hierarchii prázdného stavu
- rozdíl mezi empty state a error state

### Error states

**Stav dnes**

Chybí samostatná dokumentace pro chybové stavy.

**Proč doplnit**

- síťová chyba
- neplatná akce
- timeout
- selhání načítání nebo synchronizace

**Sekce má pokrýt**

- rozdělení chyb podle závažnosti
- doporučené textace
- kdy použít inline error, toast nebo dialog
- doporučené akce pro recovery

### Z-index škála

**Stav dnes**

Chybí systém pro vrstvení překryvných prvků.

**Proč doplnit**

- overlaye
- modaly
- tooltipy
- notifikace
- floating feedback a další překryvné vrstvy

**Sekce má pokrýt**

- jednotnou škálu vrstev
- které prvky mají být nad kterými
- zásady pro nové overlay komponenty
- prevenci konfliktů mezi tooltipem, modalem a toastem

## Vizuální systém — chybějící sekce

Tyto oblasti jsou definované v tabulce override TkajUI → donjon-fall-ui, ale dosud nemají vlastní dokumentaci ani implementaci.

### Typografie — volba fontů

**Stav dnes**

Typography stránka existuje, ale řeší hlavně škálu velikostí a vah. Chybí dokumentace volby konkrétních fontů pro TkajUI a donjon-fall-ui.

**Co má pokrýt**

- výchozí systémový font stack pro TkajUI
- fantasy / herní font pro nadpisy v donjon-fall-ui
- specifický font pro číselné hodnoty (kostky, VP, statistiky)
- jak fonty registrovat a přepsat v tématu

### Focus ring systém

**Stav dnes**

Focus stavy jsou zmíněné v Accessibility, ale chybí samostatná specifikace jak focus ring vypadá a jak se mění podle tématu.

**Co má pokrýt**

- výchozí neutrální focus ring pro TkajUI (offset, šířka, barva)
- zlatý focus ring pro donjon-fall-ui
- chování u různých typů komponent (button, input, card, modal)
- pravidlo kdy focus ring zobrazit (jen keyboard, vždy)

### Glow a shadow systém

**Stav dnes**

Glow efekty se používají v komponentách, ale nejsou zdokumentované jako systém.

**Co má pokrýt**

- škála shadow tokenů pro TkajUI (neutrální stíny)
- brand glow tokeny pro donjon-fall-ui (hover, selected, active, danger)
- pravidla kdy použít glow a kdy stín
- návaznost na barevné varianty komponent

### Scrollbar

**Stav dnes**

Scrollbar není nikde dokumentovaný ani stylovaný.

**Co má pokrýt**

- výchozí scrollbar pro TkajUI (minimální, neutrální)
- tmavý stylovaný scrollbar pro donjon-fall-ui
- CSS vlastnosti: `scrollbar-width`, `scrollbar-color`, `::-webkit-scrollbar`
- pravidla pro kdy scrollbar zobrazit (vždy, hover, auto)

### Texturový systém

**Stav dnes**

Textury v systému zatím neexistují. Komponenty používají barevné gradienty, ale žádnou povrchovou texturu.

**Proč doplnit**

- atmosférická hloubka herního UI — pergamen, kámen, kov, kůže
- vizuální odlišení vrstev UI (pozadí, panel, dialog, HUD)
- silnější vizuální identita Donjon Fall bez závislosti jen na barvách

**Co má pokrýt**

- katalog dostupných textur a jejich pojmenování
- pravidla kde textury použít a kde ne (co má zůstat čisté)
- jak textury kombinovat s gradienty a ornamenty
- technické formáty — CSS noise, SVG filter nebo PNG/WebP overlay
- pravidla pro opacity textury podle vrstvy UI
- přístupnost — textura nesmí snižovat čitelnost textu

**Navržené vrstvy použití**

- `background` — atmosférické pozadí aplikace (nejsilnější textura)
- `surface` — povrch panelů a karet (střední intenzita)
- `overlay` — modaly a dialogy (jemnější textura)
- `hud` — herní HUD prvky (velmi jemná nebo žádná)

**Technické možnosti**

- CSS `noise` přes SVG `feTurbulence` filter — žádný extra soubor, generované v prohlížeči
- PNG/WebP overlay s `mix-blend-mode: overlay` nebo `multiply`
- CSS `background-image` s opakujícím se vzorem

**Návaznost na donjon-fall-ui**

Textury jsou výhradně součástí donjon-fall-ui tématu. TkajUI žádné textury neobsahuje — povrchy komponent jsou čisté.

### Text selection

**Stav dnes**

`::selection` barva není nikde řešená.

**Co má pokrýt**

- výchozí selection pro TkajUI (neutrální)
- zlatá selection pro donjon-fall-ui (`::selection` background + color)
- doporučení pro čitelnost textu při selektu

## Herně specifické věci

### HUD elementy

**Proč doplnit**

- live indikátory zdraví, many, času a dalších herních zdrojů
- opakovaně použitelné bloky pro gameplay UI
- lepší oddělení systémových HUD prvků od konkrétních obrazovek

**Co by měla oblast pokrýt**

- indikátory hodnot
- kompaktní status panely
- ikonové a textové kombinace
- upozornění na kritický stav

### Cursor states

**Proč doplnit**

- hry často používají vlastní stav kurzoru podle akce
- pomáhá to rozlišit výběr, útok, pohyb nebo zakázanou akci

**Co by měla oblast pokrýt**

- default stav
- hover stav nad interaktivním objektem
- attack stav
- move stav
- disabled nebo blocked stav

### Cursor / pointer

**Proč doplnit**

- kurzor je v herním UI často samostatný nosič informace
- bývá navázaný na logiku interakce, ne jen na vizuální téma

**Co by měla oblast pokrýt**

- výběr cíle
- útok
- pohyb
- kontextové pointer varianty
- návaznost na tooltipy, mapu a akční stavy

## Doporučená priorita

Pokud se má plán zpracovávat postupně, doporučené pořadí je následující.

1. Tooltip
2. Modal / Dialog
3. Toast / Notification
4. Toggle / Switch
5. Progress bar
6. Accessibility
7. Spacing rules
8. Shapes system extension
9. Shapes notch extension
10. Ornaments corner extension
11. Interaction states
12. Loading and skeleton states
13. Motion principles
14. Error states
15. Validation patterns
16. Empty states
17. Content and microcopy rules
18. Responsive behavior rules
19. Feedback hierarchy
20. Z-index škála
21. Design token governance
22. HUD elementy
23. Cursor states
24. Cursor / pointer

## Návrh dalšího kroku

Nejpraktičtější pokračování je rozdělit tento plán do dvou navazujících dokumentů nebo fází práce.

### Fáze A: nové reusable komponenty

- Tooltip
- Modal / Dialog
- Toast / Notification
- Progress bar
- Toggle / Switch

### Fáze B: systémová dokumentace a herní principy

- Motion principles
- Accessibility
- Spacing rules
- Shapes system extension
- Shapes notch extension
- Ornaments corner extension
- Loading and skeleton states
- Validation patterns
- Interaction states
- Empty states
- Error states
- Content and microcopy rules
- Responsive behavior rules
- Feedback hierarchy
- Z-index škála
- Design token governance
- HUD elementy
- Cursor states
- Cursor / pointer

## Možná budoucí evoluce systému

Tato část neslouží jako bezprostřední scope první implementace. Je to výhled dalších směrů, které mohou být užitečné, pokud se style guide a komponentový systém budou dál prohlubovat.

### Vícevrstvý shape systém

- podpora více výřezů na jednom prvku
- kombinace notch, corner type a ornamentu v jednom surface modelu
- možnost pracovat i s diagonálními hranami jako plnohodnotnými cíli pro výřezy a dekorace

### Adaptivní ornament systém

- ornament reaguje na velikost komponenty
- ornament reaguje na variantu nebo stav komponenty
- systém může řídit hustotu dekorace podle významu prvku

### Tokenizace shape jazyka

- zavedení shape tokenů pro rohy, výřezy a ornamenty
- sjednocení parametrů napříč Buttons, Cards, Inputs, HUD a dalšími surfaces
- lepší správa konzistence bez ručního opakování hodnot

### Kompoziční API pro surface komponenty

- vznik vyšší vrstvy typu `Surface`, `DecoratedSurface` nebo `InteractiveSurface`
- možnost stavět více komponent na společném shape a ornament základu
- menší duplicita v implementaci tlačítek, karet, dialogů a dalších boxových prvků

### Metadata-driven dokumentace

- dokumentace generovaná z metadat a podporovaných kombinací
- výpis povolených props, variant a omezení přímo z datového zdroje
- silnější návaznost na `componentMeta.js` a budoucí systém metadat

### Constraint rules pro kombinace

- explicitní pravidla pro povolené a zakázané kombinace shape, notch a ornament variant
- možnost zabránit vizuálně nevhodným nebo technicky problematickým kombinacím
- lepší přenos design pravidel do implementace i dokumentace

### Interaktivní playground

- konfigurátor pro corner type, notch, ornament a další parametry
- rychlé ověření kombinací a slabých míst API
- užitečné jak pro návrh systému, tak pro jeho dokumentaci

### Herně specifické surface profily

- odlišné tvarové a dekorativní profily pro combat UI, economy UI, lore UI nebo mapu
- možnost používat různou intenzitu shape language podle herního kontextu

### Stavově řízené dekorace

- shape a ornament reagují na stav jako `selected`, `danger`, `warning`, `blocked`
- tvar pak není jen estetický prvek, ale i nosič systémové informace

### Render strategie a fallbacky

- předem popsané fallbacky mezi CSS polygon, SVG clipPath, SVG mask a dalšími technikami
- možnost přizpůsobit implementaci technickým limitům konkrétního komponentu
- lepší kontrola nad tím, kdy zvolit jednodušší a kdy pokročilejší renderovací přístup

## Poznámka k implementaci

Každá nově přidaná komponenta nebo sekce by měla mít:

- vlastní stránku nebo sekci v navigaci
- jasně popsaný účel
- seznam stavů a variant
- pravidla použití
- vazbu na existující komponenty a obrazovky

Tento dokument je záměr pro další rozšíření style guidu, ne finální technická specifikace. Pokud se některá oblast schválí k realizaci, je vhodné pro ni vytvořit samostatný implementační plán stejně jako u přehledu komponent.
