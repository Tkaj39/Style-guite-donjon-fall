/* WCAG contrast audit across the design-system text × background pairs.
   Not a behavioral test — this file is a regression guardrail + a
   readable report of every canonical pairing the libs use.

   Each table row asserts the pair clears the chosen WCAG level. Failing
   pairs print a row like
       FAIL  4.12  text=tkajui.textMid  bg=tkajui.surface2  needs AA(4.5)
   so a designer can read it without opening the file.

   Bumping a token color? Run `npm run test:run -- contrast-audit` —
   the table will show whether you broke any pair. */
import { describe, it, expect } from 'vitest'
import { contrastRatio } from '../contrast'

import * as tkajui from '../../tkajui/tokens'
import * as donjon from '../../donjon/tokens'

// ── Audit pairings ──────────────────────────────────────────────────────
// Each row: text-token × bg-token × required level × use case.
// Required level reflects how the pair is actually used in the lib.
//
// WCAG thresholds we enforce:
//   AA-large = 3.0    (≥18 pt regular or 14 pt bold)
//   AA       = 4.5    (default body text)
//   AAA      = 7.0    (target for high-importance text)

const LEVELS = { 'AA-large': 3.0, AA: 4.5, AAA: 7.0 }

const PAIRS = [
  // ─── TkajUI core text × surface ───────────────────────────────────────
  ['tkajui.textHigh', tkajui.textHigh, 'tkajui.surface0', tkajui.surface0, 'AA'],
  ['tkajui.textHigh', tkajui.textHigh, 'tkajui.surface1', tkajui.surface1, 'AA'],
  ['tkajui.textHigh', tkajui.textHigh, 'tkajui.surface2', tkajui.surface2, 'AA'],
  ['tkajui.textHigh', tkajui.textHigh, 'tkajui.surface3', tkajui.surface3, 'AA'],
  ['tkajui.textHigh', tkajui.textHigh, 'tkajui.surface4', tkajui.surface4, 'AA'],
  ['tkajui.textMid',  tkajui.textMid,  'tkajui.surface2', tkajui.surface2, 'AA-large'],
  ['tkajui.textMid',  tkajui.textMid,  'tkajui.surface3', tkajui.surface3, 'AA-large'],
  ['tkajui.textLow',  tkajui.textLow,  'tkajui.surface2', tkajui.surface2, 'AA-large'],

  // ─── TkajUI variant text × variant bg ─────────────────────────────────
  ['tkajui.successText',  tkajui.successText,  'tkajui.successBg',  tkajui.successBg,  'AA'],
  ['tkajui.dangerText',   tkajui.dangerText,   'tkajui.dangerBg',   tkajui.dangerBg,   'AA'],
  ['tkajui.warningText',  tkajui.warningText,  'tkajui.warningBg',  tkajui.warningBg,  'AA'],
  ['tkajui.infoText',     tkajui.infoText,     'tkajui.infoBg',     tkajui.infoBg,     'AA'],

  // ─── TkajUI variant text on default surface (Alert/Banner title) ──────
  ['tkajui.successText',  tkajui.successText,  'tkajui.surface2',   tkajui.surface2,   'AA'],
  ['tkajui.dangerText',   tkajui.dangerText,   'tkajui.surface2',   tkajui.surface2,   'AA'],
  ['tkajui.warningText',  tkajui.warningText,  'tkajui.surface2',   tkajui.surface2,   'AA'],
  ['tkajui.infoText',     tkajui.infoText,     'tkajui.surface2',   tkajui.surface2,   'AA'],

  // ─── TkajUI primary (white) on accent ─────────────────────────────────
  // AA-large because primary buttons render text at >=14px bold or >=18px
  // regular. White-on-accent measures 3.76:1 which clears AA-large (3.0)
  // but not AA (4.5). Tighten the accent if you need to render thin
  // captions on the accent surface.
  ['tkajui.primaryText',  tkajui.primaryText,  'tkajui.accent',     tkajui.accent,     'AA-large'],

  // ─── donjon core text × bg ────────────────────────────────────────────
  ['donjon.textHigh', donjon.textHigh, 'donjon.bg0', donjon.bg0, 'AA'],
  ['donjon.textHigh', donjon.textHigh, 'donjon.bg2', donjon.bg2, 'AA'],
  ['donjon.textHigh', donjon.textHigh, 'donjon.bg3', donjon.bg3, 'AA'],
  ['donjon.textMid',  donjon.textMid,  'donjon.bg2', donjon.bg2, 'AA'],
  ['donjon.textMid',  donjon.textMid,  'donjon.bg3', donjon.bg3, 'AA-large'],
  ['donjon.textLow',  donjon.textLow,  'donjon.bg2', donjon.bg2, 'AA-large'],

  // ─── donjon gold accent ────────────────────────────────────────────────
  ['donjon.gold',    donjon.gold,    'donjon.bg0', donjon.bg0, 'AA'],
  ['donjon.gold',    donjon.gold,    'donjon.bg2', donjon.bg2, 'AA'],
  ['donjon.gold',    donjon.gold,    'donjon.bg3', donjon.bg3, 'AA'],
  ['donjon.goldMid', donjon.goldMid, 'donjon.bg2', donjon.bg2, 'AA-large'],

  // ─── donjon variant text on tinted bg (parity with tkajui) ────────────
  ['donjon.dangerText',  donjon.dangerText,  'donjon.bg2', donjon.bg2, 'AA'],
  ['donjon.successText', donjon.successText, 'donjon.bg2', donjon.bg2, 'AA'],
  ['donjon.warningText', donjon.warningText, 'donjon.bg2', donjon.bg2, 'AA'],
  ['donjon.infoText',    donjon.infoText,    'donjon.bg2', donjon.bg2, 'AA'],
]

describe('WCAG contrast audit', () => {
  // Build a sorted table once, log it during the run as a report.
  const rows = PAIRS.map(([fgName, fg, bgName, bg, level]) => {
    const ratio = contrastRatio(fg, bg)
    const threshold = LEVELS[level]
    const passes = ratio >= threshold
    return { fgName, fg, bgName, bg, level, threshold, ratio, passes }
  })

  // Pretty report printed once before the table of assertions.
  it('prints a contrast report', () => {
    const lines = ['', '┌── WCAG contrast audit ────────────────────────────────────────────']
    const longestFg = Math.max(...rows.map(r => r.fgName.length))
    const longestBg = Math.max(...rows.map(r => r.bgName.length))
    for (const r of rows) {
      const status = r.passes ? '✓' : '✗'
      const ratio = r.ratio.toFixed(2).padStart(5, ' ')
      lines.push(
        `│ ${status} ${ratio}  ${r.fgName.padEnd(longestFg)} on ${r.bgName.padEnd(longestBg)}  ${r.level} (≥${r.threshold})`,
      )
    }
    lines.push('└────────────────────────────────────────────────────────────────────')
     
    console.log(lines.join('\n'))
    expect(rows.length).toBeGreaterThan(0)
  })

  // One assertion per pair, so each failure is reported individually with
  // the actual pair shown in the test name.
  for (const r of rows) {
    it(`${r.fgName} on ${r.bgName} meets ${r.level} (≥${r.threshold})`, () => {
      expect(r.ratio, `contrast ${r.ratio.toFixed(2)} < ${r.threshold}`).toBeGreaterThanOrEqual(r.threshold)
    })
  }
})
