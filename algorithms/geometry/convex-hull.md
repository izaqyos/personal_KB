# Convex Hull

- **Source:** distilled from CLRS Ch. 33 + CP patterns
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

- Smallest convex polygon containing all points — e.g., bounding region, collision bounds.
- Preprocessing for closest / farthest pair, diameter of a point set.
- Feature of many geometry pipelines: optimization (LP), pattern recognition, GIS.

## Interview View

### Andrew's monotone chain — `O(n log n)`

```python
def convex_hull(points):
    """Returns vertices of convex hull in CCW order. Input: list of (x, y)."""
    pts = sorted(set(map(tuple, points)))
    if len(pts) <= 1: return pts

    def cross(o, a, b):
        return (a[0]-o[0]) * (b[1]-o[1]) - (a[1]-o[1]) * (b[0]-o[0])

    # Lower hull
    lower = []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    # Upper hull
    upper = []
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    return lower[:-1] + upper[:-1]
```

Use `<= 0` to drop collinear points; use `< 0` to keep them on the hull.

### Graham scan (alternative, same complexity)

Pick lowest-y (then lowest-x) point `p0`; sort others by polar angle around `p0`; push/pop like above.

### Diameter of point set — rotating calipers

```python
def diameter(hull):
    """Diameter of a convex polygon in O(n)."""
    n = len(hull)
    if n == 1: return 0
    if n == 2:
        return (hull[0][0] - hull[1][0])**2 + (hull[0][1] - hull[1][1])**2

    def dist2(a, b):
        return (a[0]-b[0])**2 + (a[1]-b[1])**2

    def area2(o, a, b):
        return abs((a[0]-o[0]) * (b[1]-o[1]) - (a[1]-o[1]) * (b[0]-o[0]))

    k, best = 1, 0
    for i in range(n):
        j = (i + 1) % n
        while area2(hull[i], hull[j], hull[(k+1) % n]) > area2(hull[i], hull[j], hull[k]):
            k = (k + 1) % n
        best = max(best, dist2(hull[i], hull[k]), dist2(hull[j], hull[k]))
    return best
```

### Classic problems

| Problem | Approach |
|---|---|
| Smallest enclosing convex polygon | convex hull |
| Diameter of point set | hull + rotating calipers |
| Is point inside polygon (convex) | binary search on hull |
| Farthest pair on hull | rotating calipers |
| Minimum enclosing rectangle | rotating calipers |
| Onion peeling (layers of hulls) | repeat until empty |

## Reference View

### Algorithmic landscape

| Algorithm | Time | Notes |
|---|---|---|
| Gift wrapping (Jarvis march) | `O(n · h)` where `h` = hull size | Output-sensitive; great if hull small |
| Graham scan | `O(n log n)` | Classic; sort by polar angle |
| Andrew's monotone chain | `O(n log n)` | Most implemented; sort by x, y |
| Quickhull | `O(n log n)` avg, `O(n²)` worst | D&C; good in practice |
| Chan's algorithm | `O(n log h)` | Optimal output-sensitive |
| Incremental / randomized | `O(n log n)` avg | Elegant; adapts to 3D |

For interviews and 2D: **Andrew's monotone chain**. For 3D: convex hull gets hard (`O(n log n)` possible, implementations are ugly — use a library).

### What the cross test means during hull building

When three consecutive points make a right turn (`cross < 0`) or go straight (`cross == 0`), the middle point is inside / on the hull and should be popped. Equivalent to "keep only left turns (CCW)".

### Numerical robustness

- **Collinear points** choice — include or exclude affects `area = 0` polygons and downstream ops.
- **Duplicate points** — dedup before sorting to avoid zero-length edges.
- **Floating-point** — `cross == 0` is brittle; use `abs(cross) < eps` or exact arithmetic with integer coords.

### Upper / lower hull decomposition

Sorting points by x (then y) and sweeping gives "lower hull" then reversed sweep gives "upper hull". Each has `O(n log n)` build, each point pushed and popped at most once → `O(n)` per half → `O(n log n)` total dominated by sort.

### Complexity

| Task | Time |
|---|---|
| Build hull (Andrew) | `O(n log n)` |
| Rotating calipers queries on hull | `O(n)` total |
| Point-in-convex-polygon query | `O(log n)` |
| Dynamic convex hull (insert/delete) | `O(log² n)` |
| 3D convex hull | `O(n log n)` possible; hard to implement |

### Pitfalls

- **Not deduplicating input** — duplicates cause ambiguous orientation tests.
- **Wrong orientation convention** — some code returns CW, some CCW. Pick one and document.
- **Collinear edge cases** — decide whether to keep collinear points on the hull; match the problem requirement.
- **Not handling `n ≤ 2`** — return points themselves; skipping this crashes later code.
- **Float precision** on near-collinear real-world data — hull jitters; use ε or integer scaling.

### Real-world uses

- **Computer graphics** — bounding volumes, view frustum culling.
- **GIS** — convex approximations of footprints.
- **Pattern recognition / CV** — shape descriptors, hand gesture bounds.
- **Game dev collision** — broad phase.
- **Robot path planning** — convex obstacle approximations.
- **Facility location** — service area estimation.
- **Linear programming** — feasible region vertices = convex hull of constraints' intersections (in 2D).

### When *not* to use

- Point set is tiny (≤ 3) — trivially the hull.
- You need *the exact* polygon (with concavities) — use concave hull / alpha shape instead.
- Very high dimensions — convex hull blows up combinatorially (`O(n^{⌊d/2⌋})`). Use `scipy.spatial.ConvexHull` and cap dimensions.
- Dynamic point set with frequent changes — rebuilding is expensive; use dynamic structures or acceptable approximations.

## See Also

- [`orientation-segments.md`](orientation-segments.md) — cross / orient primitives.
- [`polygon.md`](polygon.md) — general polygon ops.
- [`closest-pair.md`](closest-pair.md) — D&C on sorted points (complementary).
- [`../paradigms/divide-and-conquer.md`](../paradigms/divide-and-conquer.md) — D&C hulls, quickhull.
- [`../patterns/line-sweep.md`](../patterns/line-sweep.md) — related sweep ideas.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
