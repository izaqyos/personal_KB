import type { Track, Schedule } from '../types'
import { trackProgress, countByStatus } from '../utils/progress'
import { ProgressRing } from './ProgressRing'
import { CourseList } from './CourseList'
import { PhaseChecklist } from './PhaseChecklist'

interface TrackCardProps {
  track: Track
  schedule: Schedule
}

const colorMap: Record<string, string> = {
  'accent-udemy': 'text-accent-udemy',
  'accent-leetcode': 'text-accent-leetcode',
  'accent-ml': 'text-accent-ml',
  'accent-python': 'text-accent-python',
  'accent-other': 'text-accent-other',
}

const borderColorMap: Record<string, string> = {
  'accent-udemy': 'border-accent-udemy/30',
  'accent-leetcode': 'border-accent-leetcode/30',
  'accent-ml': 'border-accent-ml/30',
  'accent-python': 'border-accent-python/30',
  'accent-other': 'border-accent-other/30',
}

function isActiveTrack(trackId: string, schedule: Schedule): boolean {
  const currentWeek = schedule.weeks.find(w => w.week === schedule.current_week)
  return currentWeek?.track === trackId
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    done: 'bg-done',
    in_progress: 'bg-in-progress',
    not_started: 'bg-not-started',
  }
  return <div className={`w-2 h-2 rounded-full ${colors[status] || 'bg-text-muted'}`} />
}

export function TrackCard({ track, schedule }: TrackCardProps) {
  const progress = trackProgress(track)
  const active = isActiveTrack(track.id, schedule)
  const textColor = colorMap[track.color] || 'text-text'
  const borderColor = borderColorMap[track.color] || 'border-border'

  return (
    <div className={`bg-surface-2 rounded-xl border ${active ? `border-2 ${borderColor}` : 'border-border'} overflow-hidden transition-all`}>
      {/* Header */}
      <div className="p-5 flex items-center gap-4">
        <ProgressRing percent={progress} colorClass={textColor} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-semibold ${textColor}`}>{track.name}</h3>
            {active && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-3 text-text font-bold uppercase tracking-wider animate-pulse">
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-text-dim mt-0.5">{track.subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-text">{progress}%</div>
          <div className="text-[10px] text-text-muted uppercase tracking-wider">Complete</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        {/* Udemy: tier-based course list */}
        {track.tiers && <CourseList tiers={track.tiers} />}

        {/* LeetCode: simple topic list */}
        {track.items && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Topics
              </span>
              <span className="text-[10px] text-text-dim">
                {countByStatus(track.items).done}/{track.items.length} completed
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {track.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg bg-surface hover:bg-surface-3 transition-colors">
                  <StatusDot status={item.status} />
                  <span className={`text-sm ${item.status === 'done' ? 'text-text-dim line-through' : 'text-text'}`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ML: phase-based checklist */}
        {track.phases && (
          <PhaseChecklist phases={track.phases} llmComponents={track.llm_components} />
        )}

        {/* Python: cycle progress */}
        {track.cycles && (
          <div className="space-y-3">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-accent-python">
                W{track.current_week}D{track.current_day}
              </span>
              <span className="text-xs text-text-dim">of {track.total_weeks} weeks</span>
            </div>
            <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-python rounded-full transition-all duration-500"
                style={{ width: `${((track.current_week ?? 1) / (track.total_weeks ?? 48)) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {track.cycles.map((cycle) => (
                <div key={cycle.cycle} className="flex items-center gap-2 p-2.5 rounded-lg bg-surface">
                  <StatusDot status={cycle.status} />
                  <div>
                    <div className="text-xs font-medium text-text">Cycle {cycle.cycle} (Wk {cycle.weeks})</div>
                    <div className="text-[10px] text-text-muted">{cycle.focus}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other: sections */}
        {track.sections && (
          <div className="space-y-1.5">
            {track.sections.map((section) => (
              <div key={section.name} className="flex items-center gap-3 p-3 rounded-lg bg-surface hover:bg-surface-3 transition-colors">
                <StatusDot status={section.status} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text">{section.name}</div>
                  {section.notes && (
                    <div className="text-[11px] text-text-muted">{section.notes}</div>
                  )}
                </div>
                {section.progress !== undefined && section.progress > 0 && (
                  <span className="text-xs text-text-dim">{section.progress}%</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Detail paths */}
        {track.detail_paths && track.detail_paths.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border">
            <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">
              Detailed Plans
            </div>
            {track.detail_paths.map((p) => (
              <div key={p} className="text-[11px] text-text-dim font-mono truncate">{p}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
