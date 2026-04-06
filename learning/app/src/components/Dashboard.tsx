import type { TracksConfig, Schedule } from '../types'
import { ScheduleWidget } from './ScheduleWidget'
import { TrackCard } from './TrackCard'
import { trackProgress } from '../utils/progress'

interface DashboardProps {
  tracks: TracksConfig
  schedule: Schedule
}

export function Dashboard({ tracks, schedule }: DashboardProps) {
  const sortedTracks = [...tracks.tracks].sort((a, b) => a.priority - b.priority)
  const overallProgress = sortedTracks.length > 0
    ? Math.round(sortedTracks.reduce((sum, t) => sum + trackProgress(t), 0) / sortedTracks.length)
    : 0

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text tracking-tight">Learning Dashboard</h1>
            <p className="text-xs text-text-dim mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-text">{overallProgress}%</div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider">Overall</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border">
              <div className="text-[10px] text-text-muted uppercase tracking-wider">Cycle</div>
              <div className="text-sm font-semibold text-text">
                {schedule.current_cycle}.{schedule.current_week}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Schedule Strip */}
        <ScheduleWidget schedule={schedule} />

        {/* Track Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedTracks.map((track) => (
            <TrackCard key={track.id} track={track} schedule={schedule} />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-xs text-text-muted">
          Edit <code className="px-1.5 py-0.5 rounded bg-surface-2 text-text-dim font-mono text-[11px]">config/tracks.yaml</code> to update progress &middot; Changes hot-reload instantly
        </footer>
      </main>
    </div>
  )
}
