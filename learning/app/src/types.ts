export type Status = 'not_started' | 'in_progress' | 'done'

export interface ScheduleWeek {
  week: number
  track: string
  label: string
}

export interface Schedule {
  cycle_length: number
  current_cycle: number
  current_week: number
  start_date: string
  weeks: ScheduleWeek[]
}

export interface Item {
  name: string
  status: Status
  progress?: number
  detail?: string
  instructor?: string
  notes?: string
}

export interface Tier {
  tier: number
  label: string
  items: Item[]
}

export interface Phase {
  name: string
  items: Item[]
}

export interface PythonCycle {
  cycle: number
  weeks: string
  focus: string
  status: Status
}

export interface OtherSection {
  name: string
  status: Status
  progress?: number
  detail_paths?: string[]
  notes?: string
}

export interface Track {
  id: string
  name: string
  subtitle: string
  priority: number
  color: string
  detail_paths?: string[]

  // Udemy-specific
  tiers?: Tier[]

  // Generic items (LeetCode)
  items?: Item[]

  // ML-specific
  phases?: Phase[]
  llm_components?: Item[]

  // Python-specific
  current_week?: number
  current_day?: number
  total_weeks?: number
  cycles?: PythonCycle[]

  // Other-specific
  sections?: OtherSection[]
}

export interface TracksConfig {
  tracks: Track[]
}
