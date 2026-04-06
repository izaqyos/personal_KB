import type { Track, Item, Status } from '../types'

export function statusToPercent(status: Status, progress?: number): number {
  if (progress !== undefined) return progress
  switch (status) {
    case 'done': return 100
    case 'in_progress': return 50
    case 'not_started': return 0
  }
}

function itemsProgress(items: Item[]): number {
  if (items.length === 0) return 0
  const total = items.reduce((sum, item) => sum + statusToPercent(item.status, item.progress), 0)
  return Math.round(total / items.length)
}

export function trackProgress(track: Track): number {
  if (track.tiers) {
    const allItems = track.tiers.flatMap(t => t.items)
    return itemsProgress(allItems)
  }
  if (track.items) {
    return itemsProgress(track.items)
  }
  if (track.phases) {
    const allItems = track.phases.flatMap(p => p.items)
    return itemsProgress(allItems)
  }
  if (track.cycles && track.current_week && track.total_weeks) {
    return Math.round(((track.current_week - 1) / track.total_weeks) * 100)
  }
  if (track.sections) {
    const vals = track.sections.map(s => statusToPercent(s.status, s.progress))
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
  }
  return 0
}

export function countByStatus(items: Item[]): { done: number; in_progress: number; not_started: number; total: number } {
  return {
    done: items.filter(i => i.status === 'done').length,
    in_progress: items.filter(i => i.status === 'in_progress').length,
    not_started: items.filter(i => i.status === 'not_started').length,
    total: items.length,
  }
}
