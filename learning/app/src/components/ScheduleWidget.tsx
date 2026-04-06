import type { Schedule } from '../types'

interface ScheduleWidgetProps {
  schedule: Schedule
}

const trackColors: Record<string, string> = {
  udemy: 'bg-accent-udemy',
  leetcode: 'bg-accent-leetcode',
  ml: 'bg-accent-ml',
  python: 'bg-accent-python',
  other: 'bg-accent-other',
}

const trackColorsBorder: Record<string, string> = {
  udemy: 'border-accent-udemy',
  leetcode: 'border-accent-leetcode',
  ml: 'border-accent-ml',
  python: 'border-accent-python',
  other: 'border-accent-other',
}

export function ScheduleWidget({ schedule }: ScheduleWidgetProps) {
  return (
    <div className="bg-surface-2 rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
          8-Week Cycle
        </h2>
        <span className="text-xs px-3 py-1 rounded-full bg-surface-3 text-text-dim font-medium">
          Cycle {schedule.current_cycle} &middot; Week {schedule.current_week}
        </span>
      </div>
      <div className="flex gap-1.5">
        {schedule.weeks.map((w) => {
          const isCurrent = w.week === schedule.current_week
          const bg = trackColors[w.track] || 'bg-text-muted'
          const border = trackColorsBorder[w.track] || 'border-text-muted'
          return (
            <div
              key={w.week}
              className={`flex-1 rounded-lg p-2.5 text-center transition-all ${
                isCurrent
                  ? `${bg} bg-opacity-20 border-2 ${border} scale-105 shadow-lg`
                  : 'bg-surface-3 border border-transparent hover:border-border'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isCurrent ? 'text-text' : 'text-text-muted'}`}>
                W{w.week}
              </div>
              <div className={`text-[10px] leading-tight ${isCurrent ? 'text-text font-medium' : 'text-text-dim'}`}>
                {w.label}
              </div>
              {isCurrent && (
                <div className={`w-1.5 h-1.5 rounded-full ${bg} mx-auto mt-1.5`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
