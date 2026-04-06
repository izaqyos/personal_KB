import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CourseList } from './CourseList'
import { mockTiers } from '../test/fixtures'

describe('CourseList', () => {
  it('renders tier labels', () => {
    render(<CourseList tiers={mockTiers} />)
    expect(screen.getByText(/Tier 1/)).toBeInTheDocument()
    expect(screen.getByText(/Finish & AI\/Bedrock/)).toBeInTheDocument()
    expect(screen.getByText(/Tier 2/)).toBeInTheDocument()
    expect(screen.getByText(/Data Science/)).toBeInTheDocument()
  })

  it('renders course names', () => {
    render(<CourseList tiers={mockTiers} />)
    expect(screen.getByText('Claude Code')).toBeInTheDocument()
    expect(screen.getByText('Amazon Bedrock')).toBeInTheDocument()
    expect(screen.getByText('ML Bootcamp')).toBeInTheDocument()
  })

  it('renders instructor names', () => {
    render(<CourseList tiers={mockTiers} />)
    expect(screen.getByText('Academind')).toBeInTheDocument()
    expect(screen.getByText('Alex Dan')).toBeInTheDocument()
    expect(screen.getByText('Krish Naik')).toBeInTheDocument()
  })

  it('shows progress badge for in_progress courses', () => {
    render(<CourseList tiers={mockTiers} />)
    expect(screen.getByText('76%')).toBeInTheDocument()
  })

  it('shows Done badge for completed courses', () => {
    render(<CourseList tiers={mockTiers} />)
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('shows Not Started badge', () => {
    render(<CourseList tiers={mockTiers} />)
    expect(screen.getByText('Not Started')).toBeInTheDocument()
  })

  it('renders progress bar for in_progress courses', () => {
    const { container } = render(<CourseList tiers={mockTiers} />)
    const progressBars = container.querySelectorAll('[style*="width: 76%"]')
    expect(progressBars).toHaveLength(1)
  })

  it('does not render progress bar for done courses', () => {
    const { container } = render(<CourseList tiers={[{
      tier: 1,
      label: 'Test',
      items: [{ name: 'Done Course', status: 'done', progress: 100 }],
    }]} />)
    const progressBars = container.querySelectorAll('[style*="width: 100%"]')
    expect(progressBars).toHaveLength(0)
  })

  it('handles empty tiers array', () => {
    const { container } = render(<CourseList tiers={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('shows default 50% for in_progress without explicit progress', () => {
    render(<CourseList tiers={[{
      tier: 1,
      label: 'Test',
      items: [{ name: 'No Progress', status: 'in_progress' }],
    }]} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})
