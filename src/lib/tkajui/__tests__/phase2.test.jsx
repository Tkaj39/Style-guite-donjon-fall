import { render, screen } from '@testing-library/react'
import Pictogram, { SIZES } from '../Pictogram'
import ProgressBar from '../ProgressBar'
import ScoopClip from '../ScoopClip'
import CornerOrnament from '../../donjon/CornerOrnament'

// ─── helpers ───────────────────────────────────────────────────────────────

const MockIcon = ({ width, height }) => (
  <svg data-testid="icon" width={width} height={height} />
)

// ─── Pictogram ─────────────────────────────────────────────────────────────

describe('Pictogram', () => {
  it('renderuje <span> s display inline-flex', () => {
    const { container } = render(<Pictogram icon={MockIcon} />)
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
    expect(span.style.display).toBe('inline-flex')
  })

  it('ikona se renderuje (data-testid="icon" je v DOM)', () => {
    render(<Pictogram icon={MockIcon} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('size="sm" → ikona dostane menší width než size="lg"', () => {
    const { rerender } = render(<Pictogram icon={MockIcon} size="sm" />)
    const wSm = Number(screen.getByTestId('icon').getAttribute('width'))
    rerender(<Pictogram icon={MockIcon} size="lg" />)
    const wLg = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(wSm).toBeLessThan(wLg)
  })

  it('size="md" → ikona dostane menší width než size="xl"', () => {
    const { rerender } = render(<Pictogram icon={MockIcon} size="md" />)
    const wMd = Number(screen.getByTestId('icon').getAttribute('width'))
    rerender(<Pictogram icon={MockIcon} size="xl" />)
    const wXl = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(wMd).toBeLessThan(wXl)
  })

  it('size chybí → renderuje bez pádu (fallback na md)', () => {
    expect(() => render(<Pictogram icon={MockIcon} />)).not.toThrow()
    const w = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(w).toBe(SIZES.md)
  })

  it('neznámý size → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Pictogram icon={MockIcon} size="xxl" />)).not.toThrow()
    // fallback na md
    const w = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(w).toBe(SIZES.md)
  })

  it('color="#FFC183" → style.color na span', () => {
    const { container } = render(<Pictogram icon={MockIcon} color="#FFC183" />)
    expect(container.querySelector('span').style.color).toBe('rgb(255, 193, 131)')
  })

  it('color chybí → renderuje bez pádu', () => {
    expect(() => render(<Pictogram icon={MockIcon} />)).not.toThrow()
  })

  it('className="custom" → span má třídu custom', () => {
    const { container } = render(<Pictogram icon={MockIcon} className="custom" />)
    expect(container.querySelector('span')).toHaveClass('custom')
  })

  it('style={{ marginTop: 8 }} → aplikuje se na span', () => {
    const { container } = render(<Pictogram icon={MockIcon} style={{ marginTop: 8 }} />)
    expect(container.querySelector('span').style.marginTop).toBe('8px')
  })
})

// ─── ProgressBar ───────────────────────────────────────────────────────────

describe('ProgressBar', () => {
  it('renderuje element s role="progressbar"', () => {
    render(<ProgressBar value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('value=50, max=100 → aria-valuenow=50', () => {
    render(<ProgressBar value={50} max={100} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
  })

  it('aria-valuemin=0, aria-valuemax=100', () => {
    render(<ProgressBar value={50} max={100} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('value=0 → fill má style.width "0%"', () => {
    const { container } = render(<ProgressBar value={0} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('0%')
  })

  it('value=100 → fill má style.width "100%"', () => {
    const { container } = render(<ProgressBar value={100} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('100%')
  })

  it('value=50 → fill má style.width "50%"', () => {
    const { container } = render(<ProgressBar value={50} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('50%')
  })

  it('value > max → fill nepřekročí 100%', () => {
    const { container } = render(<ProgressBar value={150} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('100%')
  })

  it('value < 0 → fill nemá zápornou šířku (0%)', () => {
    const { container } = render(<ProgressBar value={-10} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('0%')
  })

  it('showValue=true → hodnota je viditelná jako text', () => {
    render(<ProgressBar value={67} max={100} showValue />)
    expect(screen.getByText(/67/)).toBeInTheDocument()
  })

  it('showValue=false → hodnota se nezobrazuje jako text', () => {
    render(<ProgressBar value={67} max={100} showValue={false} />)
    expect(screen.queryByText(/67\s*%/)).not.toBeInTheDocument()
  })

  it('label="Načítání" → text je v dokumentu', () => {
    render(<ProgressBar value={50} label="Načítání" />)
    expect(screen.getByText('Načítání')).toBeInTheDocument()
  })

  it('label chybí → žádný label text', () => {
    render(<ProgressBar value={50} />)
    expect(screen.queryByText('Načítání')).not.toBeInTheDocument()
  })

  it('indeterminate=true → aria-valuenow není přítomno', () => {
    render(<ProgressBar value={50} indeterminate />)
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<ProgressBar value={50} size="sm" />)).not.toThrow()
  })

  it('size="md" → renderuje bez pádu', () => {
    expect(() => render(<ProgressBar value={50} size="md" />)).not.toThrow()
  })

  it('size="lg" → renderuje bez pádu', () => {
    expect(() => render(<ProgressBar value={50} size="lg" />)).not.toThrow()
  })

  it('variant="danger" → renderuje bez pádu', () => {
    expect(() => render(<ProgressBar value={50} variant="danger" />)).not.toThrow()
  })

  it('variant="success" → renderuje bez pádu', () => {
    expect(() => render(<ProgressBar value={50} variant="success" />)).not.toThrow()
  })

  it('variant="warning" → renderuje bez pádu', () => {
    expect(() => render(<ProgressBar value={50} variant="warning" />)).not.toThrow()
  })

  it('variant="info" → renderuje bez pádu', () => {
    expect(() => render(<ProgressBar value={50} variant="info" />)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<ProgressBar value={50} variant="unknown" />)).not.toThrow()
  })

  it('className="custom" → aplikuje se na wrapper', () => {
    const { container } = render(<ProgressBar value={50} className="custom" />)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('style={{ borderRadius: 4 }} → aplikuje se na wrapper', () => {
    const { container } = render(<ProgressBar value={50} style={{ borderRadius: 4 }} />)
    expect(container.firstChild.style.borderRadius).toBe('4px')
  })
})

// ─── ScoopClip ─────────────────────────────────────────────────────────────

describe('ScoopClip', () => {
  it('renderuje wrapper div', () => {
    const { container } = render(<ScoopClip><span>obsah</span></ScoopClip>)
    // ScoopClip renders fragment: svg + div
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  it('children se renderují uvnitř', () => {
    render(<ScoopClip><span data-testid="child">obsah</span></ScoopClip>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('SVG clipPath je přítomno v dokumentu', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    expect(container.querySelector('clipPath')).toBeInTheDocument()
  })

  it('clipPath má clipPathUnits="objectBoundingBox"', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    const cp = container.querySelector('clipPath')
    expect(cp).toHaveAttribute('clipPathUnits', 'objectBoundingBox')
  })

  it('r=0.25 → path data obsahují 0.25', () => {
    const { container } = render(<ScoopClip r={0.25}><span>x</span></ScoopClip>)
    const path = container.querySelector('clipPath path')
    expect(path.getAttribute('d')).toContain('0.25')
  })

  it('wrapper má style.clipPath obsahující url( se scoop id', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    const div = container.querySelector('div')
    // jsdom serializes url(#id) as url("#id") — obě formy jsou validní
    expect(div.style.clipPath).toMatch(/url\(["']?#scoop-/)
  })

  it('skrytý SVG má aria-hidden="true"', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('style={{ height: 48 }} → aplikuje se na wrapper div', () => {
    const { container } = render(<ScoopClip style={{ height: 48 }}><span>x</span></ScoopClip>)
    expect(container.querySelector('div').style.height).toBe('48px')
  })

  it('className="custom" → aplikuje se na wrapper div', () => {
    const { container } = render(<ScoopClip className="custom"><span>x</span></ScoopClip>)
    expect(container.querySelector('div')).toHaveClass('custom')
  })

  it('r=0 → necrashne', () => {
    expect(() => render(<ScoopClip r={0}><span>x</span></ScoopClip>)).not.toThrow()
  })

  it('r=0.5 → necrashne (krajní hodnota)', () => {
    expect(() => render(<ScoopClip r={0.5}><span>x</span></ScoopClip>)).not.toThrow()
  })
})

// ─── CornerOrnament ────────────────────────────────────────────────────────

describe('CornerOrnament', () => {
  it('renderuje <svg>', () => {
    const { container } = render(<CornerOrnament />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('size=24 → svg má width=24, height=24', () => {
    const { container } = render(<CornerOrnament size={24} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('size chybí → svg má width=16, height=16 (default)', () => {
    const { container } = render(<CornerOrnament />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('height', '16')
  })

  it('color="#FFC183" → fill obsahuje #FFC183 někde v SVG', () => {
    const { container } = render(<CornerOrnament color="#FFC183" />)
    // Hledáme libovolný fill atribut s touto barvou v SVG prvcích
    const elements = container.querySelectorAll('[fill="#FFC183"]')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('variant="bracket" → renderuje bez pádu', () => {
    expect(() => render(<CornerOrnament variant="bracket" />)).not.toThrow()
  })

  it('variant="dot" → renderuje bez pádu a obsahuje <circle>', () => {
    const { container } = render(<CornerOrnament variant="dot" />)
    expect(container.querySelector('circle')).toBeInTheDocument()
  })

  it('variant="diamond" → renderuje bez pádu a obsahuje <polygon>', () => {
    const { container } = render(<CornerOrnament variant="diamond" />)
    expect(container.querySelector('polygon')).toBeInTheDocument()
  })

  it('variant="cross" → renderuje bez pádu', () => {
    expect(() => render(<CornerOrnament variant="cross" />)).not.toThrow()
  })

  it('neznámý variant → vrátí null (nic v DOM)', () => {
    const { container } = render(<CornerOrnament variant="unknown" />)
    expect(container.firstChild).toBeNull()
  })

  it('svg má aria-hidden="true"', () => {
    const { container } = render(<CornerOrnament />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('style={{ position: "absolute" }} → aplikuje se na svg', () => {
    const { container } = render(<CornerOrnament style={{ position: 'absolute' }} />)
    expect(container.querySelector('svg').style.position).toBe('absolute')
  })
})
