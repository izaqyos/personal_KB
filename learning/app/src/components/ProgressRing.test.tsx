import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressRing } from './ProgressRing'

describe('ProgressRing', () => {
  it('renders the percentage text', () => {
    render(<ProgressRing percent={42} />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('renders 0%', () => {
    render(<ProgressRing percent={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('renders 100%', () => {
    render(<ProgressRing percent={100} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('renders an SVG with two circles', () => {
    const { container } = render(<ProgressRing percent={50} />)
    const circles = container.querySelectorAll('circle')
    expect(circles).toHaveLength(2)
  })

  it('applies custom size', () => {
    const { container } = render(<ProgressRing percent={50} size={100} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '100')
    expect(svg).toHaveAttribute('height', '100')
  })

  it('applies custom color class', () => {
    const { container } = render(<ProgressRing percent={50} colorClass="text-accent-ml" />)
    const foregroundCircle = container.querySelectorAll('circle')[1]
    expect(foregroundCircle).toHaveClass('text-accent-ml')
  })

  it('uses default color class when none provided', () => {
    const { container } = render(<ProgressRing percent={50} />)
    const foregroundCircle = container.querySelectorAll('circle')[1]
    expect(foregroundCircle).toHaveClass('text-accent-udemy')
  })

  it('calculates correct stroke-dashoffset for 0%', () => {
    const { container } = render(<ProgressRing percent={0} size={64} strokeWidth={5} />)
    const foregroundCircle = container.querySelectorAll('circle')[1]
    const radius = (64 - 5) / 2
    const circumference = 2 * Math.PI * radius
    expect(foregroundCircle.getAttribute('stroke-dashoffset')).toBe(String(circumference))
  })

  it('calculates correct stroke-dashoffset for 100%', () => {
    const { container } = render(<ProgressRing percent={100} size={64} strokeWidth={5} />)
    const foregroundCircle = container.querySelectorAll('circle')[1]
    expect(foregroundCircle.getAttribute('stroke-dashoffset')).toBe('0')
  })

  it('sets correct stroke-dasharray', () => {
    const size = 64
    const strokeWidth = 5
    const { container } = render(<ProgressRing percent={50} size={size} strokeWidth={strokeWidth} />)
    const foregroundCircle = container.querySelectorAll('circle')[1]
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    expect(foregroundCircle.getAttribute('stroke-dasharray')).toBe(String(circumference))
  })
})
