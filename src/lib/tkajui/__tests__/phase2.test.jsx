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
  it('renders a <span> with display inline-flex', () => {
    const { container } = render(<Pictogram icon={MockIcon} />)
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
    expect(span.style.display).toBe('inline-flex')
  })

  it('icon is rendered (data-testid="icon" is in the DOM)', () => {
    render(<Pictogram icon={MockIcon} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('size="sm" → icon gets a smaller width than size="lg"', () => {
    const { rerender } = render(<Pictogram icon={MockIcon} size="sm" />)
    const wSm = Number(screen.getByTestId('icon').getAttribute('width'))
    rerender(<Pictogram icon={MockIcon} size="lg" />)
    const wLg = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(wSm).toBeLessThan(wLg)
  })

  it('size="md" → icon gets a smaller width than size="xl"', () => {
    const { rerender } = render(<Pictogram icon={MockIcon} size="md" />)
    const wMd = Number(screen.getByTestId('icon').getAttribute('width'))
    rerender(<Pictogram icon={MockIcon} size="xl" />)
    const wXl = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(wMd).toBeLessThan(wXl)
  })

  it('size missing → renders without crashing (falls back to md)', () => {
    expect(() => render(<Pictogram icon={MockIcon} />)).not.toThrow()
    const w = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(w).toBe(SIZES.md)
  })

  it('unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<Pictogram icon={MockIcon} size="xxl" />)).not.toThrow()
    // falls back to md
    const w = Number(screen.getByTestId('icon').getAttribute('width'))
    expect(w).toBe(SIZES.md)
  })

  it('color="#FFC183" → style.color on the span', () => {
    const { container } = render(<Pictogram icon={MockIcon} color="#FFC183" />)
    expect(container.querySelector('span').style.color).toBe('rgb(255, 193, 131)')
  })

  it('color missing → renders without crashing', () => {
    expect(() => render(<Pictogram icon={MockIcon} />)).not.toThrow()
  })

  it('className="custom" → span has the custom class', () => {
    const { container } = render(<Pictogram icon={MockIcon} className="custom" />)
    expect(container.querySelector('span')).toHaveClass('custom')
  })

  it('style={{ marginTop: 8 }} → applied on the span', () => {
    const { container } = render(<Pictogram icon={MockIcon} style={{ marginTop: 8 }} />)
    expect(container.querySelector('span').style.marginTop).toBe('8px')
  })
})

// ─── ProgressBar ───────────────────────────────────────────────────────────

describe('ProgressBar', () => {
  it('renders an element with role="progressbar"', () => {
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

  it('value=0 → fill has style.width "0%"', () => {
    const { container } = render(<ProgressBar value={0} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('0%')
  })

  it('value=100 → fill has style.width "100%"', () => {
    const { container } = render(<ProgressBar value={100} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('100%')
  })

  it('value=50 → fill has style.width "50%"', () => {
    const { container } = render(<ProgressBar value={50} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('50%')
  })

  it('value > max → fill does not exceed 100%', () => {
    const { container } = render(<ProgressBar value={150} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('100%')
  })

  it('value < 0 → fill is not negative (0%)', () => {
    const { container } = render(<ProgressBar value={-10} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('0%')
  })

  it('showValue=true → the value is visible as text', () => {
    render(<ProgressBar value={67} max={100} showValue />)
    expect(screen.getByText(/67/)).toBeInTheDocument()
  })

  it('showValue=false → the value is not shown as text', () => {
    render(<ProgressBar value={67} max={100} showValue={false} />)
    expect(screen.queryByText(/67\s*%/)).not.toBeInTheDocument()
  })

  it('label="Loading" → text is in the document', () => {
    render(<ProgressBar value={50} label="Loading" />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('label missing → no label text', () => {
    render(<ProgressBar value={50} />)
    expect(screen.queryByText('Loading')).not.toBeInTheDocument()
  })

  it('indeterminate=true → aria-valuenow is not present', () => {
    render(<ProgressBar value={50} indeterminate />)
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<ProgressBar value={50} size="sm" />)).not.toThrow()
  })

  it('size="md" → renders without crashing', () => {
    expect(() => render(<ProgressBar value={50} size="md" />)).not.toThrow()
  })

  it('size="lg" → renders without crashing', () => {
    expect(() => render(<ProgressBar value={50} size="lg" />)).not.toThrow()
  })

  it('variant="danger" → renders without crashing', () => {
    expect(() => render(<ProgressBar value={50} variant="danger" />)).not.toThrow()
  })

  it('variant="success" → renders without crashing', () => {
    expect(() => render(<ProgressBar value={50} variant="success" />)).not.toThrow()
  })

  it('variant="warning" → renders without crashing', () => {
    expect(() => render(<ProgressBar value={50} variant="warning" />)).not.toThrow()
  })

  it('variant="info" → renders without crashing', () => {
    expect(() => render(<ProgressBar value={50} variant="info" />)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<ProgressBar value={50} variant="unknown" />)).not.toThrow()
  })

  it('className="custom" → applied to the wrapper', () => {
    const { container } = render(<ProgressBar value={50} className="custom" />)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('style={{ borderRadius: 4 }} → applied to the wrapper', () => {
    const { container } = render(<ProgressBar value={50} style={{ borderRadius: 4 }} />)
    expect(container.firstChild.style.borderRadius).toBe('4px')
  })
})

// ─── ScoopClip ─────────────────────────────────────────────────────────────

describe('ScoopClip', () => {
  it('renders a wrapper div', () => {
    const { container } = render(<ScoopClip><span>content</span></ScoopClip>)
    // ScoopClip renders fragment: svg + div
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  it('children render inside', () => {
    render(<ScoopClip><span data-testid="child">content</span></ScoopClip>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('SVG clipPath is present in the document', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    expect(container.querySelector('clipPath')).toBeInTheDocument()
  })

  it('clipPath has clipPathUnits="objectBoundingBox"', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    const cp = container.querySelector('clipPath')
    expect(cp).toHaveAttribute('clipPathUnits', 'objectBoundingBox')
  })

  it('cornerSize=0.25 → path data contains 0.25', () => {
    const { container } = render(<ScoopClip cornerSize={0.25}><span>x</span></ScoopClip>)
    const path = container.querySelector('clipPath path')
    expect(path.getAttribute('d')).toContain('0.25')
  })

  it('deprecated r alias still applies (backward compat)', () => {
    const { container } = render(<ScoopClip r={0.25}><span>x</span></ScoopClip>)
    const path = container.querySelector('clipPath path')
    expect(path.getAttribute('d')).toContain('0.25')
  })

  it('wrapper has style.clipPath containing url( with the scoop id', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    const div = container.querySelector('div')
    // jsdom serializes url(#id) as url("#id") — both forms are valid
    expect(div.style.clipPath).toMatch(/url\(["']?#scoop-/)
  })

  it('hidden SVG has aria-hidden="true"', () => {
    const { container } = render(<ScoopClip><span>x</span></ScoopClip>)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('style={{ height: 48 }} → applied to the wrapper div', () => {
    const { container } = render(<ScoopClip style={{ height: 48 }}><span>x</span></ScoopClip>)
    expect(container.querySelector('div').style.height).toBe('48px')
  })

  it('className="custom" → applied to the wrapper div', () => {
    const { container } = render(<ScoopClip className="custom"><span>x</span></ScoopClip>)
    expect(container.querySelector('div')).toHaveClass('custom')
  })

  it('cornerSize=0 → does not crash', () => {
    expect(() => render(<ScoopClip cornerSize={0}><span>x</span></ScoopClip>)).not.toThrow()
  })

  it('cornerSize=0.5 → does not crash (boundary value)', () => {
    expect(() => render(<ScoopClip cornerSize={0.5}><span>x</span></ScoopClip>)).not.toThrow()
  })
})

// ─── CornerOrnament ────────────────────────────────────────────────────────

describe('CornerOrnament', () => {
  it('renders <svg>', () => {
    const { container } = render(<CornerOrnament />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('size=24 → svg has width=24, height=24', () => {
    const { container } = render(<CornerOrnament size={24} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('size missing → svg has width=16, height=16 (default)', () => {
    const { container } = render(<CornerOrnament />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('height', '16')
  })

  it('color="#FFC183" → fill contains #FFC183 somewhere in the SVG', () => {
    const { container } = render(<CornerOrnament color="#FFC183" />)
    // Look for any fill attribute with this color in SVG elements
    const elements = container.querySelectorAll('[fill="#FFC183"]')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('variant="bracket" → renders without crashing', () => {
    expect(() => render(<CornerOrnament variant="bracket" />)).not.toThrow()
  })

  it('variant="dot" → renders without crashing and contains <circle>', () => {
    const { container } = render(<CornerOrnament variant="dot" />)
    expect(container.querySelector('circle')).toBeInTheDocument()
  })

  it('variant="diamond" → renders without crashing and contains <polygon>', () => {
    const { container } = render(<CornerOrnament variant="diamond" />)
    expect(container.querySelector('polygon')).toBeInTheDocument()
  })

  it('variant="cross" → renders without crashing', () => {
    expect(() => render(<CornerOrnament variant="cross" />)).not.toThrow()
  })

  it('unknown variant → returns null (nothing in DOM)', () => {
    const { container } = render(<CornerOrnament variant="unknown" />)
    expect(container.firstChild).toBeNull()
  })

  it('svg has aria-hidden="true"', () => {
    const { container } = render(<CornerOrnament />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('style={{ position: "absolute" }} → applied to the svg', () => {
    const { container } = render(<CornerOrnament style={{ position: 'absolute' }} />)
    expect(container.querySelector('svg').style.position).toBe('absolute')
  })
})
