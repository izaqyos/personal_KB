import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { mockTracksConfig, mockSchedule } from '../test/fixtures'
import type { TracksConfig } from '../types'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-03-23T12:00:00'))
})

describe('Dashboard', () => {
  it('renders the main heading', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    expect(screen.getByText('Learning Dashboard')).toBeInTheDocument()
  })

  it('renders the current date', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    expect(screen.getByText('Monday, March 23, 2026')).toBeInTheDocument()
  })

  it('renders overall progress', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    expect(screen.getByText('Overall')).toBeInTheDocument()
  })

  it('renders cycle indicator', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    expect(screen.getByText('1.1')).toBeInTheDocument()
    expect(screen.getByText('Cycle')).toBeInTheDocument()
  })

  it('renders the schedule widget', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    expect(screen.getByText('8-Week Cycle')).toBeInTheDocument()
  })

  it('renders all 5 track cards', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    expect(screen.getByRole('heading', { name: 'Udemy Courses' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'LeetCode' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ML Models' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Python Practice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Other Plans' })).toBeInTheDocument()
  })

  it('renders tracks sorted by priority', () => {
    const { container } = render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    const headings = container.querySelectorAll('h3')
    const names = Array.from(headings).map(h => h.textContent)
    expect(names).toEqual(['Udemy Courses', 'LeetCode', 'ML Models', 'Python Practice', 'Other Plans'])
  })

  it('renders footer with YAML editing hint', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    expect(screen.getByText('config/tracks.yaml')).toBeInTheDocument()
  })

  it('handles empty tracks array', () => {
    const empty: TracksConfig = { tracks: [] }
    render(<Dashboard tracks={empty} schedule={mockSchedule} />)
    expect(screen.getByText('Learning Dashboard')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('handles single track', () => {
    const single: TracksConfig = { tracks: [mockTracksConfig.tracks[0]] }
    render(<Dashboard tracks={single} schedule={mockSchedule} />)
    expect(screen.getByText('Udemy Courses')).toBeInTheDocument()
  })

  it('computes overall progress as average of track progresses', () => {
    render(<Dashboard tracks={mockTracksConfig} schedule={mockSchedule} />)
    const overallElements = screen.getAllByText('Overall')
    expect(overallElements).toHaveLength(1)
  })
})
