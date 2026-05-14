# Fáze 1 — Setup + Utility testy (~75 min)

## Krok 1 — Konfigurace (15 min)

Viz [plan-test.md](./plan-test.md) — stack, install, vite.config, setup.js, package.json scripts.

---

## Krok 2 — `src/utils/octagon.test.js` (60 min)

Čisté funkce, žádný DOM, žádný React. Nejvyšší ROI v celém plánu.

### `octagon(cx)`
```
✓ vrací string začínající 'polygon('
✓ cx=9.61 → string obsahuje '9.61px'
✓ cx=0 → necrashne (degenerovaný případ)
✓ výsledek má přesně 8 bodů (7 čárek — N bodů = N−1 čárek)
✓ octagon(15.62) odpovídá SHAPE_SIZES['md'].cut
```

### `clipLeft(cx)` / `clipRight(cx)`
```
✓ clipLeft — začíná '${cx}px 0px' (levý horní roh zkosený)
✓ clipLeft — obsahuje '100% 0px' (pravý horní roh NENÍ zkosený)
✓ clipRight — začíná '0px 0px' (levý horní roh NENÍ zkosený)
✓ clipRight — obsahuje 'calc(100% - ${cx}px) 0px'
✓ clipLeft(9) !== clipRight(9)
✓ clipLeft(0) — necrashne
```

### `roundRect(r)`
```
✓ vrací přesně 'inset(0 round ${r}px)'
✓ r=0 → 'inset(0 round 0px)'
✓ r=8 → 'inset(0 round 8px)'
```

### `pill()`
```
✓ vrací 'inset(0 round 9999px)'
✓ volání bez argumentů — necrashne, vrací string
```

### `scoopPath(w, h, r)`
```
✓ vrací string začínající "path('"
✓ vrací string končící "Z')"
✓ obsahuje 'M ${r},0' na začátku path dat
✓ obsahuje hodnoty w (${w - r}), h (${h - r})
✓ scoopPath(170, 52, 13) → referenční snapshot (SHAPE_SIZES['md'])
✓ r=0 → necrashne
✓ r > w/2 → necrashne (extrémní případ)
```

### `scoopBBPath(r)`
```
✓ vrací string BEZ 'path(' prefixu (čistá SVG d data)
✓ začíná 'M ${r},0'
✓ končí 'Z'
✓ r=0.25 → všechny souřadnice jsou v rozsahu 0–1
✓ r=0 → necrashne
✓ r=0.5 → necrashne
```

### `octagonWithNotch(cx, nw, nh, side)`
```
✓ 'bottom' — obsahuje '50% calc(100% - ${nh}px)' (špička notche)
✓ 'top'    — obsahuje '50% ${nh}px'
✓ 'left'   — obsahuje '${nh}px 50%'
✓ 'right'  — obsahuje 'calc(100% - ${nh}px) 50%'
✓ notch je symetrický: calc(50% - ${nw/2}px) a calc(50% + ${nw/2}px)
✓ neznámý side → vrátí stejný výsledek jako octagon(cx)
✓ výchozí parametry (jen cx) → necrashne
✓ nw=0 → necrashne
```

### `SHAPE_SIZES`
```
✓ existují klíče: xs, sm, md, lg, card
✓ každá velikost má: w, h, cut, round, scoop, bb
✓ všechny hodnoty jsou kladná čísla
✓ poměr cut/h ≈ 0.30 pro xs/sm/md/lg (tolerance ±0.015)
✓ poměr scoop/h ≈ 0.24 pro xs/sm/md/lg (tolerance ±0.02)
✓ bb = 0.25 pro xs/sm/md/lg, 0.23 pro card
✓ w > h pro všechny velikosti
```
