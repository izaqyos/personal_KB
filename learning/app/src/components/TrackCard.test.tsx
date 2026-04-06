import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrackCard } from './TrackCard'
import {
  mockSchedule,
  mockScheduleWeek3,
  mockUdemyTrack,
  mockLeetcodeTrack,
  mockMlTrack,
  mockPythonTrack,
  mockOtherTrack,
  mockEmptyTrack,
} from '../test/fixtures'

describe('TrackCard', () => {
  describe('header', () => {
    it('renders track name and subtitle', () => {
      render(<TrackCard track={mockUdemyTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Udemy Courses')).toBeInTheDocument()
      expect(screen.getByText('AI & Bedrock Focus')).toBeInTheDocument()
    })

    it('shows progress percentage', () => {
      render(<TrackCard track={mockUdemyTrack} schedule={mockSchedule} />)
      const percentElements = screen.getAllByText('59%')
      expect(percentElements.length).toBeGreaterThanOrEqual(2)
      expect(screen.getByText('Complete')).toBeInTheDocument()
    })

    it('shows Active badge for current week track', () => {
      render(<TrackCard track={mockUdemyTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('does not show Active badge for non-current track', () => {
      render(<TrackCard track={mockLeetcodeTrack} schedule={mockSchedule} />)
      expect(screen.queryByText('Active')).not.toBeInTheDocument()
    })

    it('shows Active on leetcode when week 3', () => {
      render(<TrackCard track={mockLeetcodeTrack} schedule={mockScheduleWeek3} />)
      expect(screen.getByText('Active')).toBeInTheDocument()
    })
  })

  describe('Udemy track (tiers)', () => {
    it('renders course list with tiers', () => {
      render(<TrackCard track={mockUdemyTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Claude Code')).toBeInTheDocument()
      expect(screen.getByText('Amazon Bedrock')).toBeInTheDocument()
      expect(screen.getByText('ML Bootcamp')).toBeInTheDocument()
    })

    it('renders detail paths', () => {
      render(<TrackCard track={mockUdemyTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Detailed Plans')).toBeInTheDocument()
      expect(screen.getByText('Udemy.com -- My Learning dashboard')).toBeInTheDocument()
    })
  })

  describe('LeetCode track (items)', () => {
    it('renders topic items in grid', () => {
      render(<TrackCard track={mockLeetcodeTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Arrays & Strings')).toBeInTheDocument()
      expect(screen.getByText('Hash Maps')).toBeInTheDocument()
      expect(screen.getByText('Two Pointers')).toBeInTheDocument()
      expect(screen.getByText('Sliding Window')).toBeInTheDocument()
    })

    it('shows completed count', () => {
      render(<TrackCard track={mockLeetcodeTrack} schedule={mockSchedule} />)
      expect(screen.getByText('1/4 completed')).toBeInTheDocument()
    })

    it('applies line-through to done items', () => {
      render(<TrackCard track={mockLeetcodeTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Arrays & Strings')).toHaveClass('line-through')
    })
  })

  describe('ML track (phases)', () => {
    it('renders phase checklist', () => {
      render(<TrackCard track={mockMlTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Phase 1: Classical NLP')).toBeInTheDocument()
      expect(screen.getByText('Phase 2: Embeddings')).toBeInTheDocument()
    })

    it('renders LLM Components section', () => {
      render(<TrackCard track={mockMlTrack} schedule={mockSchedule} />)
      expect(screen.getByText('LLM Components')).toBeInTheDocument()
    })
  })

  describe('Python track (cycles)', () => {
    it('renders current week and day', () => {
      render(<TrackCard track={mockPythonTrack} schedule={mockSchedule} />)
      expect(screen.getByText(/W3/)).toBeInTheDocument()
      expect(screen.getByText(/D2/)).toBeInTheDocument()
    })

    it('renders total weeks', () => {
      render(<TrackCard track={mockPythonTrack} schedule={mockSchedule} />)
      expect(screen.getByText(/of 48 weeks/)).toBeInTheDocument()
    })

    it('renders all 4 cycles', () => {
      render(<TrackCard track={mockPythonTrack} schedule={mockSchedule} />)
      expect(screen.getByText(/Cycle 1/)).toBeInTheDocument()
      expect(screen.getByText(/Cycle 2/)).toBeInTheDocument()
      expect(screen.getByText(/Cycle 3/)).toBeInTheDocument()
      expect(screen.getByText(/Cycle 4/)).toBeInTheDocument()
    })

    it('renders cycle focus areas', () => {
      render(<TrackCard track={mockPythonTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Foundation & Idioms')).toBeInTheDocument()
      expect(screen.getByText('Advanced Patterns')).toBeInTheDocument()
    })
  })

  describe('Other track (sections)', () => {
    it('renders all sections', () => {
      render(<TrackCard track={mockOtherTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Rust')).toBeInTheDocument()
      expect(screen.getByText('System Design')).toBeInTheDocument()
      expect(screen.getByText('Performance')).toBeInTheDocument()
      expect(screen.getByText('Networking')).toBeInTheDocument()
    })

    it('renders section notes', () => {
      render(<TrackCard track={mockOtherTrack} schedule={mockSchedule} />)
      expect(screen.getByText('90-day plan + Udemy at 3%')).toBeInTheDocument()
      expect(screen.getByText('CCNA/CCNP ready')).toBeInTheDocument()
    })

    it('shows progress for sections that have it', () => {
      render(<TrackCard track={mockOtherTrack} schedule={mockSchedule} />)
      expect(screen.getByText('3%')).toBeInTheDocument()
    })
  })

  describe('empty track', () => {
    it('renders without crashing', () => {
      render(<TrackCard track={mockEmptyTrack} schedule={mockSchedule} />)
      expect(screen.getByText('Empty Track')).toBeInTheDocument()
      const zeroPercent = screen.getAllByText('0%')
      expect(zeroPercent.length).toBeGreaterThanOrEqual(2)
    })
  })
})
