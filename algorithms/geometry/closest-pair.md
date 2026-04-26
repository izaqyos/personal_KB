# Closest Pair of Points

- **Source:** distilled from CLRS Ch. 33 + Kleinberg-Tardos
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

- Given `n` points in 2D, find the pair with minimum Euclidean distance — `O(n log n)` via divide and conquer (or sweep).
- Clustering / dedup preprocessing.
- Closest-neighbor queries on static point sets.

Naive `O(n²)` is fine up to `n ~ 10^4`; beyond that, use D&C or kd-tree.

## Interview View

### Divide and conquer — `O(n log n)`

```python
import math

def closest_pair(points):
    """Return (min_dist, (p, q))."""
    pts = sorted(points)                  # by x
    pts_y = sorted(points, key=lambda p: p[1])

    def rec(pts_x):
        n = len(pts_x)
        if n <= 3:
            best = (float('inf'), None)
            for i in range(n):
                for j in range(i+1, n):
                    d = math.dist(pts_x[i], pts_x[j])
                    if d < best[0]:
                        best = (d, (pts_x[i], pts_x[j]))
            return best

        mid = n // 2
        mid_x = pts_x[mid][0]
        d_left = rec(pts_x[:mid])
        d_right = rec(pts_x[mid:])
        d = min(d_left, d_right, key=lambda t: t[0])

        # Strip within d of the dividing line
        strip = [p for p in pts_x if abs(p[0] - mid_x) < d[0]]
        strip.sort(key=lambda p: p[1])
        for i in range(len(strip)):
            for j in range(i+1, min(i+8, len(strip))):
                dd = math.dist(strip[i], strip[j])
                if dd < d[0]:
                    d = (dd, (strip[i], strip[j]))
        return d

    return rec(pts)
```

### Sweep-line variant — `O(n log n)`

Sort by x. Maintain a set of points with x within the current best distance of the sweep point, sorted by y. For each new point, check only the few neighbors in y within the best distance. Each point inserted / removed once.

```python
from sortedcontainers import SortedList
import math

def closest_pair_sweep(points):
    pts = sorted(points)                  # by x
    best = float('inf')
    best_pair = None
    sl = SortedList(key=lambda p: p[1])
    left = 0
    for p in pts:
        while pts[left][0] < p[0] - best:
            sl.remove(pts[left]); left += 1
        # candidates with y in [p.y - best, p.y + best]
        idx = sl.bisect_left((p[0], p[1] - best))
        while idx < len(sl) and sl[idx][1] <= p[1] + best:
            q = sl[idx]
            d = math.dist(p, q)
            if d < best:
                best = d; best_pair = (p, q)
            idx += 1
        sl.add(p)
    return best, best_pair
```

### Classic problems

| Problem | Approach |
|---|---|
| Closest pair | D&C or sweep |
| All pairs within distance `r` | sweep + spatial hash |
| Closest neighbor query for each point | kd-tree |
| Dense region detection | DBSCAN (uses closest-neighbor idea) |
| Nearest point to query (dynamic set) | kd-tree, R-tree, LSH |

## Reference View

### Why only 7 candidates in the strip?

In the combine step, points in the strip (width `2d`) within `d` of each other in y must be considered. An argument using `d × d` grid cells shows at most 7 points can be within distance `d` of each other in the strip, so checking the next 7 points sorted by y suffices.

Implementation detail: some texts say 6, some 7, some 15. Use `min(i+8, n)` to be safe — the constant doesn't affect asymptotic cost.

### Why sort by y once, not per recursion?

If you re-sort at every level, you get `O(n log² n)`. If you pre-sort by y once and pass filtered lists down, it's `O(n log n)`. Python's `sorted` is efficient enough that either works on mid-size inputs; for strict `O(n log n)` use the "pass sorted lists" pattern.

### Kd-tree alternative

Build a kd-tree in `O(n log n)`; query each point's nearest neighbor in `O(log n)` average. Total `O(n log n)` but with bigger constants. Advantages:

- Handles dynamic queries (insert new points after build — with rebalancing).
- Generalizes to higher dimensions (curse of dimensionality hits ~dim 20+).
- Many good libraries (`scipy.spatial.KDTree`, `sklearn.neighbors.KDTree`).

### Farthest pair

For *farthest* pair, you don't need D&C — the farthest pair is always on the convex hull. Use convex hull + rotating calipers: `O(n log n)`.

### Complexity

| Algorithm | Time |
|---|---|
| Naive all pairs | `O(n²)` |
| D&C | `O(n log n)` |
| Sweep line | `O(n log n)` |
| Kd-tree build + nearest-for-all | `O(n log n)` avg |
| Bucketing (when point density known) | `O(n)` expected |

### Pitfalls

- **Integer overflow** — if coords are `10^9`, `d²` fits `int64` but `d⁴` doesn't. Work with `d²` directly.
- **Duplicate points** — distance 0. Handle explicitly or filter.
- **Mixed x-sorted / y-sorted lists** — easy to pass the wrong one in D&C; the bug is silent (wrong answer).
- **Strip needs y-sorting** — otherwise the 7-point property doesn't apply.
- **Very unbalanced splits** — degenerate coords (all on same vertical line). D&C still works but the base case `n ≤ 3` handles it.

### Real-world uses

- **Collision broad-phase** in physics engines — closest-pair queries among dynamic objects.
- **Record linkage / dedup** — find near-duplicate records by coord-like features.
- **Geographic clustering** — cellular network cell assignment.
- **Bioinformatics** — protein structure: closest atoms to infer bonds.
- **Graphics LOD** — merge nearest vertices.
- **Motion capture / tracking** — associate markers frame-to-frame.
- **Nearest-neighbor classifiers** (k-NN) — cousin problem.

### When *not* to use

- Very high dimension (~20+) — D&C doesn't generalize; `O(n²)` or approximate (LSH, annoy).
- Streaming / dynamic points — use kd-tree / R-tree with rebalancing, or approximate.
- Points on a sphere — use great-circle distance; flat D&C gives wrong answers near poles.

## See Also

- [`orientation-segments.md`](orientation-segments.md) — related primitives.
- [`convex-hull.md`](convex-hull.md) — farthest pair uses rotating calipers.
- [`../paradigms/divide-and-conquer.md`](../paradigms/divide-and-conquer.md) — D&C framework.
- [`../patterns/line-sweep.md`](../patterns/line-sweep.md) — sweep variant.
- [`../../data-structures/trees/kd-tree.md`](../../data-structures/trees/kd-tree.md) — kd-tree for spatial queries.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
