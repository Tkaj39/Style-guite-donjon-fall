import { Component } from 'react'

/**
 * ErrorBoundary — zachytí chyby při renderování lazy stránek.
 * Bez tohoto komponentu React/Suspense tiše spolkne chybu a zobrazí
 * prázdný fallback (černá stránka bez viditelné chybové zprávy).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '40px 24px',
          gap: 16,
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{
            width: 48, height: 48,
            borderRadius: '50%',
            background: '#3D1818',
            border: '1px solid #C04040',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}>
            ✕
          </div>
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <p style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700, color: '#E05C5C' }}>
              Stránka se nepodařila načíst
            </p>
            <p style={{ margin: '0 0 16px', fontSize: '0.875rem', color: '#8F9CB3', lineHeight: 1.5 }}>
              Při renderování stránky nastala chyba. Zkontroluj konzoli pro detaily.
            </p>
            <pre style={{
              margin: 0,
              padding: '10px 14px',
              background: '#0E0D1E',
              border: '1px solid #353751',
              borderRadius: 4,
              fontSize: '0.75rem',
              color: '#C8BFAF',
              textAlign: 'left',
              overflow: 'auto',
              maxHeight: 200,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {this.state.error.message}
            </pre>
          </div>
          <button
            onClick={() => this.setState({ error: null })}
            style={{
              padding: '8px 20px',
              background: 'transparent',
              border: '1px solid #8F7458',
              borderRadius: 4,
              color: '#FFC183',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Zkusit znovu
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
