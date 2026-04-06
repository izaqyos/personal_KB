import { describe, it, expect } from 'vitest'
import { statusToPercent, trackProgress, countByStatus } from './progress'
import {
  mockUdemyTrack,
  mockLeetcodeTrack,
  mockMlTrack,
  mockPythonTrack,
  mockOtherTrack,
  mockEmptyTrack,
  mockItems,
} from '../test/fixtures'

describe('statusToPercent', () => {
  it('returns 100 for done', () => {
    expect(statusToPercent('done')).toBe(100)
  })

  it('returns 50 for in_progress', () => {
    expect(statusToPercent('in_progress')).toBe(50)
  })

  it('returns 0 for not_started', () => {
    expect(statusToPercent('not_started')).toBe(0)
  })

  it('uses explicit progress when provided', () => {
    expect(statusToPercent('in_progress', 76)).toBe(76)
  })

  it('uses explicit progress=0 over status', () => {
    expect(statusToPercent('done', 0)).toBe(0)
  })

  it('uses explicit progress=100 over status', () => {
    expect(statusToPercent('not_started', 100)).toBe(100)
  })
})

describe('trackProgress', () => {
  it('computes progress for tier-based track (Udemy)', () => {
    const result = trackProgress(mockUdemyTrack)
    // Tier 1: (76 + 0) / 2 = 38, Tier 2: 100/1 = 100
    // All items: (76 + 0 + 100) / 3 = 58.67 -> 59
    expect(result).toBe(59)
  })

  it('computes progress for items-based track (LeetCode)', () => {
    const result = trackProgress(mockLeetcodeTrack)
    // done(100) + in_progress(50) + not_started(0) + not_started(0) = 150 / 4 = 37.5 -> 38
    expect(result).toBe(38)
  })

  it('computes progress for phase-based track (ML)', () => {
    const result = trackProgress(mockMlTrack)
    // Phase 1: done(100) + not_started(0) = 100, Phase 2: not_started(0)
    // All items: (100 + 0 + 0) / 3 = 33.33 -> 33
    expect(result).toBe(33)
  })

  it('computes progress for python track with cycles', () => {
    const result = trackProgress(mockPythonTrack)
    // (3-1) / 48 * 100 = 4.17 -> 4
    expect(result).toBe(4)
  })

  it('computes progress for sections-based track (Other)', () => {
    const result = trackProgress(mockOtherTrack)
    // Rust: progress=3, SysDes: 0, Perf: 0, Net: 0
    // (3 + 0 + 0 + 0) / 4 = 0.75 -> 1
    expect(result).toBe(1)
  })

  it('returns 0 for empty track', () => {
    expect(trackProgress(mockEmptyTrack)).toBe(0)
  })

  it('returns 0 for track with empty items', () => {
    const track = { ...mockLeetcodeTrack, items: [] }
    expect(trackProgress(track)).toBe(0)
  })

  it('returns 100 for all-done items track', () => {
    const track = {
      ...mockLeetcodeTrack,
      items: [
        { name: 'A', status: 'done' as const },
        { name: 'B', status: 'done' as const },
      ],
    }
    expect(trackProgress(track)).toBe(100)
  })

  it('handles python track at week 1', () => {
    const track = { ...mockPythonTrack, current_week: 1 }
    // (1-1)/48*100 = 0
    expect(trackProgress(track)).toBe(0)
  })

  it('handles python track at last week', () => {
    const track = { ...mockPythonTrack, current_week: 48 }
    // (48-1)/48*100 = 97.9 -> 98
    expect(trackProgress(track)).toBe(98)
  })
})

describe('countByStatus', () => {
  it('counts items by status correctly', () => {
    const counts = countByStatus(mockItems)
    expect(counts.done).toBe(1)
    expect(counts.in_progress).toBe(1)
    expect(counts.not_started).toBe(2)
    expect(counts.total).toBe(4)
  })

  it('returns all zeros for empty array', () => {
    const counts = countByStatus([])
    expect(counts.done).toBe(0)
    expect(counts.in_progress).toBe(0)
    expect(counts.not_started).toBe(0)
    expect(counts.total).toBe(0)
  })

  it('handles all done', () => {
    const items = [
      { name: 'A', status: 'done' as const },
      { name: 'B', status: 'done' as const },
    ]
    const counts = countByStatus(items)
    expect(counts.done).toBe(2)
    expect(counts.in_progress).toBe(0)
    expect(counts.not_started).toBe(0)
    expect(counts.total).toBe(2)
  })

  it('handles all not_started', () => {
    const items = [
      { name: 'A', status: 'not_started' as const },
      { name: 'B', status: 'not_started' as const },
      { name: 'C', status: 'not_started' as const },
    ]
    const counts = countByStatus(items)
    expect(counts.done).toBe(0)
    expect(counts.not_started).toBe(3)
    expect(counts.total).toBe(3)
  })

  it('handles single item', () => {
    const items = [{ name: 'X', status: 'in_progress' as const }]
    const counts = countByStatus(items)
    expect(counts.in_progress).toBe(1)
    expect(counts.total).toBe(1)
  })
})
