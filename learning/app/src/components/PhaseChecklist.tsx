import { useState } from 'react'
import type { Phase, Item } from '../types'
import { countByStatus } from '../utils/progress'

interface PhaseChecklistProps {
  phases: Phase[]
  llmComponents?: Item[]
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'done') {
    return (
      <svg className="w-4 h-4 text-done flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )
  }
  if (status === 'in_progress') {
    return <div className="w-3.5 h-3.5 rounded-full border-2 border-in-progress flex-shrink-0 m-0.5" />
  }
  return <div className="w-3.5 h-3.5 rounded-full border-2 border-text-muted flex-shrink-0 m-0.5" />
}

export function PhaseChecklist({ phases, llmComponents }: PhaseChecklistProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(phases[0]?.name ?? null)
  const [showLlm, setShowLlm] = useState(false)

  return (
    <div className="space-y-2">
      {phases.map((phase) => {
        const counts = countByStatus(phase.items)
        const isOpen = expandedPhase === phase.name
        return (
          <div key={phase.name} className="rounded-lg bg-surface overflow-hidden">
            <button
              onClick={() => setExpandedPhase(isOpen ? null : phase.name)}
              className="w-full flex items-center justify-between p-3 hover:bg-surface-3 transition-colors"
            >
              <span className="text-sm font-medium text-text">{phase.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-muted">
                  {counts.done}/{counts.total}
                </span>
                <svg
                  className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
            {isOpen && (
              <div className="px-3 pb-3 space-y-1.5">
                {phase.items.map((item) => (
                  <div key={item.name} className="flex items-start gap-2.5 py-1">
                    <StatusIcon status={item.status} />
                    <div>
                      <div className={`text-sm ${item.status === 'done' ? 'text-text-dim line-through' : 'text-text'}`}>
                        {item.name}
                      </div>
                      {item.detail && (
                        <div className="text-[11px] text-text-muted">{item.detail}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {llmComponents && llmComponents.length > 0 && (
        <div className="rounded-lg bg-surface overflow-hidden">
          <button
            onClick={() => setShowLlm(!showLlm)}
            className="w-full flex items-center justify-between p-3 hover:bg-surface-3 transition-colors"
          >
            <span className="text-sm font-medium text-text">LLM Components</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-text-muted">
                {countByStatus(llmComponents).done}/{llmComponents.length}
              </span>
              <svg
                className={`w-4 h-4 text-text-muted transition-transform ${showLlm ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          {showLlm && (
            <div className="px-3 pb-3 space-y-1.5">
              {llmComponents.map((item) => (
                <div key={item.name} className="flex items-center gap-2.5 py-1">
                  <StatusIcon status={item.status} />
                  <span className={`text-sm ${item.status === 'done' ? 'text-text-dim line-through' : 'text-text'}`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
