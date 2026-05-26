/* ── LibPreferenceProvider ─────────────────────────────────────────────────
   Globální preference které knihovny chce uživatel ve výchozím stavu vidět.
   Persistuje v localStorage, sdílí napříč TopNav togglem a ShowcasePage.
   ─────────────────────────────────────────────────────────────────────── */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY  = 'donjon-fall-ui:lib-preference'
const VALID_VALUES = ['tkajui', 'donjon']
const DEFAULT      = 'donjon'

const LibPreferenceContext = createContext(null)

/* Hook — vrací [preference, setPreference]. */
export function useLibPreference() {
  const ctx = useContext(LibPreferenceContext)
  if (!ctx) throw new Error('useLibPreference must be used inside <LibPreferenceProvider>')
  return ctx
}

/* Provider — bootstrapuje hodnotu z localStorage. */
export function LibPreferenceProvider({ children }) {
  const [preference, setPreferenceState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return VALID_VALUES.includes(stored) ? stored : DEFAULT
    } catch {
      return DEFAULT
    }
  })

  /* Sync mezi taby — pokud user změní v jiném tabu, reagujeme. */
  useEffect(() => {
    function onStorage(e) {
      if (e.key !== STORAGE_KEY) return
      if (VALID_VALUES.includes(e.newValue)) setPreferenceState(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setPreference = useCallback((v) => {
    if (!VALID_VALUES.includes(v)) return
    setPreferenceState(v)
    try { window.localStorage.setItem(STORAGE_KEY, v) } catch { /* private mode */ }
  }, [])

  return (
    <LibPreferenceContext.Provider value={[preference, setPreference]}>
      {children}
    </LibPreferenceContext.Provider>
  )
}
