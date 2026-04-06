import type { Schedule, Track, Item, Tier, Phase, TracksConfig } from '../types'

export const mockSchedule: Schedule = {
  cycle_length: 8,
  current_cycle: 1,
  current_week: 1,
  start_date: '2026-03-23',
  weeks: [
    { week: 1, track: 'udemy', label: 'Udemy AI/Bedrock' },
    { week: 2, track: 'udemy', label: 'Udemy AI/Bedrock' },
    { week: 3, track: 'leetcode', label: 'LeetCode' },
    { week: 4, track: 'ml', label: 'ML Models' },
    { week: 5, track: 'ml', label: 'ML Models' },
    { week: 6, track: 'python', label: 'Python Practice' },
    { week: 7, track: 'leetcode', label: 'LeetCode' },
    { week: 8, track: 'other', label: 'Rotate: Rust / SysDes' },
  ],
}

export const mockScheduleWeek3: Schedule = {
  ...mockSchedule,
  current_week: 3,
}

export const mockItems: Item[] = [
  { name: 'Arrays & Strings', status: 'done' },
  { name: 'Hash Maps', status: 'in_progress' },
  { name: 'Two Pointers', status: 'not_started' },
  { name: 'Sliding Window', status: 'not_started' },
]

export const mockTiers: Tier[] = [
  {
    tier: 1,
    label: 'Finish & AI/Bedrock',
    items: [
      { name: 'Claude Code', instructor: 'Academind', status: 'in_progress', progress: 76 },
      { name: 'Amazon Bedrock', instructor: 'Alex Dan', status: 'not_started', progress: 0 },
    ],
  },
  {
    tier: 2,
    label: 'Data Science',
    items: [
      { name: 'ML Bootcamp', instructor: 'Krish Naik', status: 'done', progress: 100 },
    ],
  },
]

export const mockPhases: Phase[] = [
  {
    name: 'Phase 1: Classical NLP',
    items: [
      { name: 'BOW', detail: 'vectorize in numpy', status: 'done' },
      { name: 'TF-IDF', detail: 'from scratch', status: 'not_started' },
    ],
  },
  {
    name: 'Phase 2: Embeddings',
    items: [
      { name: 'word2vec', detail: 'skip-gram', status: 'not_started' },
    ],
  },
]

export const mockLlmComponents: Item[] = [
  { name: 'Attention Mechanism', status: 'done' },
  { name: 'Positional Encoding', status: 'done' },
  { name: 'Tokenization', status: 'not_started' },
]

export const mockUdemyTrack: Track = {
  id: 'udemy',
  name: 'Udemy Courses',
  subtitle: 'AI & Bedrock Focus',
  priority: 1,
  color: 'accent-udemy',
  tiers: mockTiers,
  detail_paths: ['Udemy.com -- My Learning dashboard'],
}

export const mockLeetcodeTrack: Track = {
  id: 'leetcode',
  name: 'LeetCode',
  subtitle: 'Interview Prep',
  priority: 2,
  color: 'accent-leetcode',
  items: mockItems,
  detail_paths: ['personal_KB/leetcodeKB'],
}

export const mockMlTrack: Track = {
  id: 'ml',
  name: 'ML Models',
  subtitle: 'LDA, BERT, and Beyond',
  priority: 3,
  color: 'accent-ml',
  phases: mockPhases,
  llm_components: mockLlmComponents,
  detail_paths: ['personal_code/code/AI/NLP/nlp_roadmap.md'],
}

export const mockPythonTrack: Track = {
  id: 'python',
  name: 'Python Practice',
  subtitle: '48-Week Curriculum',
  priority: 4,
  color: 'accent-python',
  current_week: 3,
  current_day: 2,
  total_weeks: 48,
  cycles: [
    { cycle: 1, weeks: '1-12', focus: 'Foundation & Idioms', status: 'in_progress' },
    { cycle: 2, weeks: '13-24', focus: 'Advanced Patterns', status: 'not_started' },
    { cycle: 3, weeks: '25-36', focus: 'Expert Topics', status: 'not_started' },
    { cycle: 4, weeks: '37-48', focus: 'Production', status: 'not_started' },
  ],
}

export const mockOtherTrack: Track = {
  id: 'other',
  name: 'Other Plans',
  subtitle: 'Rust, System Design, Perf, Net',
  priority: 5,
  color: 'accent-other',
  sections: [
    { name: 'Rust', status: 'in_progress', progress: 3, notes: '90-day plan + Udemy at 3%' },
    { name: 'System Design', status: 'not_started', notes: '6-week plan' },
    { name: 'Performance', status: 'not_started', notes: '4-week plan' },
    { name: 'Networking', status: 'not_started', notes: 'CCNA/CCNP ready' },
  ],
}

export const mockEmptyTrack: Track = {
  id: 'empty',
  name: 'Empty Track',
  subtitle: 'Nothing here',
  priority: 99,
  color: 'accent-udemy',
}

export const mockTracksConfig: TracksConfig = {
  tracks: [mockUdemyTrack, mockLeetcodeTrack, mockMlTrack, mockPythonTrack, mockOtherTrack],
}
