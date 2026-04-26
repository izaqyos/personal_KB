# Line Sweep (Sweep Line)

- **Source:** distilled from CP/computational-geometry patterns
- **Author:** Yosi Izaq
- **Captured:** 2026-04-23
- **Status:** complete
- **Type:** concept

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

## When to Use

- Interval problems (merging, counting overlaps, meeting rooms, calendars).
- Geometric problems: segment intersection, rectangle union area, skyline.
- Event scheduling where you need "how many active things at time `t`."
- 2D problems that become 1D once you sweep along one axis.

Mental model: process events sorted by their position (time/x-coordinate). Maintain a "status" structure (counter, sorted set, segment tree) that captures what's currently *active*. Each event updates the status; answers are read during or after the sweep.

## Interview View

### Template — interval overlap / meeting rooms count

```python
def min_meeting_rooms(intervals):
    events = []
    for start, end in intervals:
        events.append((start, +1))  # start: add a room
        events.append((end, -1))    # end: release a room
    # Tie-break: end before start at the same timestamp (so adjacent meetings share a room)
    events.sort(key=lambda e: (e[0], e[1]))
    active = best = 0
    for _, delta in events:
        active += delta
        best = max(best, active)
    return best
```

Events are `(time, delta)`. Sort, sweep, track max active. `O(n log n)`.

### Template — merge intervals (sort by start)

```python
def merge(intervals):
    intervals.sort()
    out = []
    for s, e in intervals:
        if out and s <= out[-1][1]:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return out
```

### Template — skyline

```python
import heapq

def skyline(buildings):
    # buildings: [(L, R, H)]
    events = []
    for L, R, H in buildings:
        events.append((L, -H, R))  # start: negative height for "higher first"
        events.append((R, 0, 0))   # end marker
    events.sort()
    out = []
    heap = [(0, float('inf'))]     # (neg-height, end-x)
    for x, negH, R in events:
        if negH:
            heapq.heappush(heap, (negH, R))
        while heap[0][1] <= x:
            heapq.heappop(heap)
        cur = -heap[0][0]
        if not out or out[-1][1] != cur:
            out.append([x, cur])
    return out
```

### Classic problems

| Problem | Sweep variable |
|---|---|
| Merge Intervals | start time, running interval |
| Insert Interval | start time, running interval |
| Meeting Rooms II | time, counter |
| Employee Free Time | time, counter (or heap of endpoints) |
| Skyline Problem | x, heap of active heights |
| Rectangle Union Area | x, segment tree over y |
| Count Intersecting Segments | x, BIT/set over y |
| Car Pooling | km or time, counter |
| Range Module (add/query/remove) | running intervals via `SortedList` |

## Reference View

### The sweep algorithm

1. **Discretize** events along the sweep axis (usually x or time).
2. **Sort** them. Mind the tie-breaking: "end before start at the same time" if touching intervals shouldn't double-count.
3. **Maintain status** = what's active at the current sweep position. Choice of DS:
   - Counter / int → just overlaps.
   - Max-heap → "highest active" (skyline).
   - Sorted set / BIT / segment tree → range queries over the other dimension.
4. **Update on events**, **read answer** at or between events.

### Variants

- **Event-driven sweep** — events = start/end markers, `O(n log n)`.
- **Coordinate-compression sweep** — map large coordinates to ranks, then run segment tree over ranks.
- **Sweep + segment tree** — rectangle union area, counting segment intersections.
- **Angular sweep** — rotate a radial line; used in convex-hull trick, visibility polygons.

### Complexity

| Variant | Time | Space |
|---|---|---|
| counter sweep | `O(n log n)` (sort) | `O(n)` |
| heap sweep (skyline) | `O(n log n)` | `O(n)` |
| segment-tree sweep (rect union) | `O(n log n)` | `O(n)` |

### Pitfalls

- **Tie-break** at equal timestamps changes answers:
  - `end` before `start` → touching intervals `[1,2]` and `[2,3]` don't share a room.
  - `start` before `end` → they overlap at `t=2`.
  Match the problem statement carefully.
- **Off-by-one on half-open vs closed intervals** — `[l, r)` changes merging/overlap rules.
- Forgetting to **coordinate-compress** for big ranges → TLE or memory blowup.
- Reading the answer at the wrong moment (after sweep ends vs during) — for max active, track as you update.
- Removing items from a heap — lazy deletion is usual; active-check before reading top.

### Real-world uses

- **Calendar conflict detection / meeting schedulers** — direct application.
- **Network interval analysis** — "how many connections open at time t," "overlapping maintenance windows."
- **Renderers: painter's algorithm / visibility** — sweep along viewing direction.
- **Databases: range-overlap joins** — interval sweep-merge.
- **Billing / time-series** — running count of active subscriptions by day.
- **Auction matching** — events are bids entering / leaving the book.

### When *not* to use

- Intervals are few — just pairwise compare.
- Fully dynamic with insertions/queries arbitrary — use interval tree or segment tree directly, no sweep.
- Aggregate isn't compositional under the sweep (rare, but some geometric queries need rotational sweep, not linear).

## See Also

- [`../../data-structures/linear/stacks-queues.md`](../../data-structures/linear/stacks-queues.md) — event queue basis.
- [`../../data-structures/specialized/segment-tree.md`](../../data-structures/specialized/segment-tree.md) — 2D rectangle sweep.
- [`../../data-structures/trees/heap.md`](../../data-structures/trees/heap.md) — skyline-style sweeps.
- [`../geometry/`](../geometry/) — segment intersection, polygon, convex hull.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
