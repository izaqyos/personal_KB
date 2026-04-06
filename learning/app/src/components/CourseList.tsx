import type { Tier } from '../types'

interface CourseListProps {
  tiers: Tier[]
}

function statusBadge(status: string, progress?: number) {
  if (status === 'done') {
    return <span className="text-[10px] px-2 py-0.5 rounded-full bg-done/15 text-done font-medium">Done</span>
  }
  if (status === 'in_progress') {
    return <span className="text-[10px] px-2 py-0.5 rounded-full bg-in-progress/15 text-in-progress font-medium">{progress ?? 50}%</span>
  }
  return <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-3 text-text-muted font-medium">Not Started</span>
}

export function CourseList({ tiers }: CourseListProps) {
  return (
    <div className="space-y-4">
      {tiers.map((tier) => (
        <div key={tier.tier}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
            Tier {tier.tier} &mdash; {tier.label}
          </div>
          <div className="space-y-1.5">
            {tier.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-surface hover:bg-surface-3 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text truncate">{item.name}</div>
                  {item.instructor && (
                    <div className="text-[11px] text-text-muted truncate">{item.instructor}</div>
                  )}
                </div>
                {statusBadge(item.status, item.progress)}
                {item.progress !== undefined && item.progress > 0 && item.status !== 'done' && (
                  <div className="w-20 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-udemy rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
