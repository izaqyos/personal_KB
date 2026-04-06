import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScheduleWidget } from './ScheduleWidget'
import { mockSchedule, mockScheduleWeek3 } from '../test/fixtures'

describe('ScheduleWidget', () => {
  it('renders the 8-Week Cycle heading', () => {
    render(<ScheduleWidget schedule={mockSchedule} />)
    expect(screen.getByText('8-Week Cycle')).toBeInTheDocument()
  })

  it('displays current cycle and week badge', () => {
    render(<ScheduleWidget schedule={mockSchedule} />)
    expect(screen.getByText(/Cycle 1/)).toBeInTheDocument()
    expect(screen.getByText(/Week 1/)).toBeInTheDocument()
  })

  it('renders all 8 week labels', () => {
    render(<ScheduleWidget schedule={mockSchedule} />)
    expect(screen.getByText('W1')).toBeInTheDocument()
    expect(screen.getByText('W2')).toBeInTheDocument()
    expect(screen.getByText('W3')).toBeInTheDocument()
    expect(screen.getByText('W4')).toBeInTheDocument()
    expect(screen.getByText('W5')).toBeInTheDocument()
    expect(screen.getByText('W6')).toBeInTheDocument()
    expect(screen.getByText('W7')).toBeInTheDocument()
    expect(screen.getByText('W8')).toBeInTheDocument()
  })

  it('renders track labels', () => {
    render(<ScheduleWidget schedule={mockSchedule} />)
    expect(screen.getAllByText('Udemy AI/Bedrock')).toHaveLength(2)
    expect(screen.getAllByText('LeetCode')).toHaveLength(2)
    expect(screen.getAllByText('ML Models')).toHaveLength(2)
    expect(screen.getByText('Python Practice')).toBeInTheDocument()
    expect(screen.getByText('Rotate: Rust / SysDes')).toBeInTheDocument()
  })

  it('highlights week 3 when current_week is 3', () => {
    const { container } = render(<ScheduleWidget schedule={mockScheduleWeek3} />)
    expect(screen.getByText(/Week 3/)).toBeInTheDocument()
    const dots = container.querySelectorAll('.rounded-full.mx-auto')
    expect(dots.length).toBeGreaterThan(0)
  })

  it('does not crash with minimal schedule', () => {
    const minimal: typeof mockSchedule = {
      cycle_length: 2,
      current_cycle: 1,
      current_week: 1,
      start_date: '2026-01-01',
      weeks: [
        { week: 1, track: 'udemy', label: 'Udemy' },
        { week: 2, track: 'ml', label: 'ML' },
      ],
    }
    render(<ScheduleWidget schedule={minimal} />)
    expect(screen.getByText('W1')).toBeInTheDocument()
    expect(screen.getByText('W2')).toBeInTheDocument()
  })
})
