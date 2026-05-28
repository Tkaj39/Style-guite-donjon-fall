/**
 * Architektonický kontrakt knihovny
 *
 * Tyto testy chrání závislostní směr a naming konvence:
 *
 *   tkajui  → shared    (base library, nezná donjon)
 *   donjon  → shared + tkajui (game layer postavený na base)
 *
 * Naming:
 *   `Donjon*` prefix ↔ subcategory: 'extends-tkajui'   (rozšiřuje TkajUI protějšek)
 *   bez prefixu      ↔ subcategory: 'exclusive'        (herní primitivum)
 *
 * Pokud test selže, znamená to že se knihovny začínají rozjíždět — buď
 * doplň/oprav componentMeta, nebo přejmenuj komponentu.
 */

import { describe, it, expect } from 'vitest'
import { componentMeta } from '../componentMeta'
import { registry } from '../componentRegistry'

describe('Architektonický kontrakt: TkajUI ↔ donjon-fall-ui', () => {

  // ── Pravidlo 1: Naming ⇄ subcategory ────────────────────────────────────
  describe('Donjon* prefix ↔ subcategory', () => {

    it('komponenta začínající "Donjon" má buď subcategory "extends-tkajui" nebo "exclusive"', () => {
      const donjonComponents = registry.filter(c =>
        c.category === 'donjon-fall-ui' && c.name.startsWith('Donjon')
      )
      const violations = donjonComponents.filter(c =>
        c.subcategory !== 'extends-tkajui' && c.subcategory !== 'exclusive'
      )
      if (violations.length > 0) {
        const list = violations.map(v => `  • ${v.name} (${v.slug}) → subcategory: ${v.subcategory}`).join('\n')
        throw new Error(
          `Komponenty s "Donjon" prefixem musí mít subcategory v componentMeta:\n${list}`
        )
      }
    })

    it('subcategory: "extends-tkajui" → odkazovaný extendsSlug existuje v TkajUI', () => {
      const tkajuiSlugs = new Set(
        registry.filter(c => c.category === 'TkajUI').map(c => c.slug)
      )
      const broken = []
      for (const [slug, meta] of Object.entries(componentMeta)) {
        if (meta.subcategory === 'extends-tkajui') {
          if (!meta.extendsSlug) {
            broken.push(`  • '${slug}' chybí extendsSlug`)
          } else if (!tkajuiSlugs.has(meta.extendsSlug)) {
            broken.push(`  • '${slug}' → extendsSlug: '${meta.extendsSlug}' neexistuje v TkajUI`)
          }
        }
      }
      if (broken.length > 0) {
        throw new Error(`extends-tkajui kontrakt:\n${broken.join('\n')}`)
      }
    })

    it('subcategory: "extends-tkajui" → kontract differencesFromBase je pole stringů', () => {
      const broken = []
      for (const [slug, meta] of Object.entries(componentMeta)) {
        if (meta.subcategory === 'extends-tkajui' && meta.differencesFromBase) {
          if (!Array.isArray(meta.differencesFromBase)) {
            broken.push(`  • '${slug}' differencesFromBase není pole`)
          } else if (!meta.differencesFromBase.every(d => typeof d === 'string')) {
            broken.push(`  • '${slug}' differencesFromBase obsahuje non-string`)
          }
        }
      }
      if (broken.length > 0) throw new Error(`differencesFromBase kontrakt:\n${broken.join('\n')}`)
    })
  })

  // ── Pravidlo 2: Závislostní směr ────────────────────────────────────────
  // tkajui smí importovat z shared, ale ne z donjon.
  // (donjon → tkajui je technicky povolené, i když dnes nepoužité.)
  describe('Závislostní směr knihoven', () => {

    it('tkajui/index.js neexportuje nic z ../donjon', async () => {
      // dynamický import — Vite path resolver vrátí všechny exporty
      const TkajUI = await import('../../lib/tkajui/index.js')
      // Tyto symboly patří do donjon — nesmí být v tkajui barrelu:
      expect(TkajUI.CornerOrnament).toBeUndefined()
      expect(TkajUI.SideOrnament).toBeUndefined()
      expect(TkajUI.HexOrnament).toBeUndefined()
      expect(TkajUI.RohOrnament).toBeUndefined()
      expect(TkajUI.ZkosenOrnament).toBeUndefined()
    })
  })

  // ── Pravidlo 5: Palette tokens dostupné v barrel ────────────────────────
  // Hist. bug: tkajui barrel zapomněl `export * from './tokens'` —
  // uživatel `import { accent } from 'tkajui'` dostal undefined.
  // Tento test brání regresi.
  describe('Palette tokens v barrel exportech', () => {

    it('tkajui barrel re-exportuje paletu (accent, surface*, text*)', async () => {
      const TkajUI = await import('../../lib/tkajui/index.js')
      // Accent paleta
      expect(TkajUI.accent).toBeDefined()
      expect(TkajUI.accentLight).toBeDefined()
      expect(TkajUI.accentDim).toBeDefined()
      // Surface škála
      expect(TkajUI.surface0).toBeDefined()
      expect(TkajUI.surface2).toBeDefined()
      expect(TkajUI.surface4).toBeDefined()
      // Border škála
      expect(TkajUI.borderSubtle).toBeDefined()
      expect(TkajUI.borderDefault).toBeDefined()
      expect(TkajUI.borderMid).toBeDefined()
      expect(TkajUI.borderStrong).toBeDefined()
      // Text škála
      expect(TkajUI.textHigh).toBeDefined()
      expect(TkajUI.textMid).toBeDefined()
      // Semantic
      expect(TkajUI.successColor).toBeDefined()
      expect(TkajUI.dangerColor).toBeDefined()
      expect(TkajUI.warningColor).toBeDefined()
      expect(TkajUI.infoColor).toBeDefined()
    })

    it('donjon barrel re-exportuje paletu (gold, bg*, text*)', async () => {
      const donjon = await import('../../lib/donjon/index.js')
      // Gold paleta
      expect(donjon.gold).toBeDefined()
      expect(donjon.goldMid).toBeDefined()
      expect(donjon.goldDim).toBeDefined()
      // Bg škála
      expect(donjon.bg0).toBeDefined()
      expect(donjon.bg2).toBeDefined()
      expect(donjon.bg4).toBeDefined()
      // Text škála
      expect(donjon.textHigh).toBeDefined()
      expect(donjon.textMid).toBeDefined()
      // Herní barvy
      expect(donjon.gainColor).toBeDefined()
      expect(donjon.magicColor).toBeDefined()
    })

    it('shared tokeny dostupné v obou barrelech (motion, breakpoints, z-index)', async () => {
      const TkajUI = await import('../../lib/tkajui/index.js')
      const donjon = await import('../../lib/donjon/index.js')
      // Motion
      expect(TkajUI.animNormal).toBeDefined()
      expect(donjon.animNormal).toBeDefined()
      expect(TkajUI.animNormal).toBe(donjon.animNormal)
      // Breakpoints
      expect(TkajUI.BREAKPOINTS).toBeDefined()
      expect(donjon.BREAKPOINTS).toBeDefined()
      // Z-index
      expect(TkajUI.zTooltip).toBeDefined()
      expect(donjon.zTooltip).toBeDefined()
    })
  })

  // ── Pravidlo 3: Shared tokeny ───────────────────────────────────────────
  describe('Sdílené tokeny mezi knihovnami', () => {

    it('tkajui i donjon mají identické motion tokeny (re-export ze shared)', async () => {
      const tkajui = await import('../../lib/tkajui/tokens.js')
      const donjon = await import('../../lib/donjon/tokens.js')

      // Motion durations
      expect(tkajui.animFast).toBe(donjon.animFast)
      expect(tkajui.animNormal).toBe(donjon.animNormal)
      expect(tkajui.animSlow).toBe(donjon.animSlow)
      expect(tkajui.animDramatic).toBe(donjon.animDramatic)

      // Easings
      expect(tkajui.easingSharp).toBe(donjon.easingSharp)
      expect(tkajui.easingBounce).toBe(donjon.easingBounce)
      expect(tkajui.easingEnter).toBe(donjon.easingEnter)
      expect(tkajui.easingExit).toBe(donjon.easingExit)
    })

    it('tkajui i donjon mají identické breakpointy', async () => {
      const tkajui = await import('../../lib/tkajui/tokens.js')
      const donjon = await import('../../lib/donjon/tokens.js')

      expect(tkajui.bpMobile).toBe(donjon.bpMobile)
      expect(tkajui.bpTablet).toBe(donjon.bpTablet)
      expect(tkajui.bpDesktop).toBe(donjon.bpDesktop)
      expect(tkajui.bpWide).toBe(donjon.bpWide)
      expect(tkajui.BREAKPOINTS).toEqual(donjon.BREAKPOINTS)
    })

    it('tkajui i donjon mají identickou z-index škálu', async () => {
      const tkajui = await import('../../lib/tkajui/tokens.js')
      const donjon = await import('../../lib/donjon/tokens.js')

      expect(tkajui.zDropdown).toBe(donjon.zDropdown)
      expect(tkajui.zNotification).toBe(donjon.zNotification)
      expect(tkajui.zToast).toBe(donjon.zToast)
      expect(tkajui.zTooltip).toBe(donjon.zTooltip)
    })

    it('surface ↔ bg aliasy fungují v obou směrech', async () => {
      const tkajui = await import('../../lib/tkajui/tokens.js')
      const donjon = await import('../../lib/donjon/tokens.js')

      // donjon má surface aliasy → bg0..4
      expect(donjon.surface0).toBe(donjon.bg0)
      expect(donjon.surface2).toBe(donjon.bg2)
      // tkajui má bg aliasy → surface0..4
      expect(tkajui.bg0).toBe(tkajui.surface0)
      expect(tkajui.bg2).toBe(tkajui.surface2)
    })
  })

  // ── Pravidlo 4: Border scale parita ─────────────────────────────────────
  describe('Border scale parita', () => {

    it('obě knihovny exportují borderSubtle/Default/Mid/Strong', async () => {
      const tkajui = await import('../../lib/tkajui/tokens.js')
      const donjon = await import('../../lib/donjon/tokens.js')

      for (const key of ['borderSubtle', 'borderDefault', 'borderMid', 'borderStrong']) {
        expect(tkajui[key], `tkajui chybí ${key}`).toBeDefined()
        expect(donjon[key], `donjon chybí ${key}`).toBeDefined()
      }
    })
  })
})
