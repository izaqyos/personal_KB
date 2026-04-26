# Orientation, Cross Products, Segments

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

- Determine relative orientation of three points (CCW, CW, collinear).
- Segment-segment intersection test.
- Point-in-polygon, point-on-segment.
- Foundational primitives for convex hull, line sweep, polygon ops.

Most computational geometry reduces to **cross products** and **orientation tests**.

## Interview View

### Cross product (2D signed area)

```python
def cross(o, a, b):
    """Returns 2 * signed area of triangle (o, a, b).
    > 0 → counterclockwise; < 0 → clockwise; = 0 → collinear."""
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
```

### Orientation

```python
def orient(p, q, r):
    c = cross(p, q, r)
    if c > 0: return 1       # CCW (left turn)
    if c < 0: return -1      # CW (right turn)
    return 0                 # collinear
```

### Segment-segment intersection (proper + boundary)

```python
def on_segment(p, q, r):
    """r is on segment pq, assuming they are collinear."""
    return min(p[0], q[0]) <= r[0] <= max(p[0], q[0]) and \
           min(p[1], q[1]) <= r[1] <= max(p[1], q[1])

def segments_intersect(p1, q1, p2, q2):
    o1 = orient(p1, q1, p2)
    o2 = orient(p1, q1, q2)
    o3 = orient(p2, q2, p1)
    o4 = orient(p2, q2, q1)
    if o1 != o2 and o3 != o4: return True     # proper cross
    # collinear / touching
    if o1 == 0 and on_segment(p1, q1, p2): return True
    if o2 == 0 and on_segment(p1, q1, q2): return True
    if o3 == 0 and on_segment(p2, q2, p1): return True
    if o4 == 0 and on_segment(p2, q2, q1): return True
    return False
```

### Point-in-segment

```python
def point_on_segment(p, q, r, eps=1e-9):
    if abs(cross(p, q, r)) > eps: return False
    return on_segment(p, q, r)
```

### Distance from point to line / segment

```python
import math

def dist_point_to_segment(p, a, b):
    ax, ay = a; bx, by = b; px, py = p
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return math.hypot(px - ax, py - ay)
    t = ((px - ax) * dx + (py - ay) * dy) / (dx*dx + dy*dy)
    t = max(0, min(1, t))
    x, y = ax + t * dx, ay + t * dy
    return math.hypot(px - x, py - y)
```

### Classic problems

| Problem | Use |
|---|---|
| Three points CCW / CW? | cross product |
| Segment intersection | orient + on_segment |
| Any two of `n` segments intersect? | Bentley-Ottmann line sweep |
| Area of polygon | shoelace formula |
| Point in polygon | ray casting or winding number |
| Convex hull | Graham scan / Andrew's monotone chain |

## Reference View

### What cross product measures

In 2D, `cross(a - o, b - o) = |a-o| · |b-o| · sin(θ)`, where `θ` is the signed angle from `a-o` to `b-o`. So:

- Positive → `b` is CCW from `a` about `o`.
- Negative → `b` is CW from `a` about `o`.
- Zero → collinear.

Also equals twice the signed area of triangle `o, a, b`, so it's useful for area computations (shoelace).

### Shoelace formula (polygon area)

```python
def polygon_area(poly):
    n = len(poly)
    s = 0
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i+1) % n]
        s += x1 * y2 - x2 * y1
    return abs(s) / 2
```

Sign of `s` tells CCW vs CW orientation.

### Robustness / numerical issues

- **Floating-point epsilon** — compare `|cross(..)| < eps` rather than `== 0`.
- **Integer coordinates** — use exact arithmetic when coords are integers. Python big-ints are free; in C, multiply two `int32`s without widening and you'll overflow.
- **Degenerate inputs** — duplicate points, zero-length segments, three points collinear. Explicit checks pay off.

### Line representations

- **Two points** `(a, b)` — most general; avoid dividing.
- **Point + direction** `(p, d)` — parametric `p + t·d`.
- **`ax + by = c`** — implicit form. Intersect two such via Cramer's rule.
- **`y = mx + b`** — avoid; breaks for vertical lines.

### Complexity

| Op | Time |
|---|---|
| Cross product / orient | `O(1)` |
| Two-segment intersect | `O(1)` |
| All `n²` segment pairs | `O(n²)` |
| Bentley-Ottmann (any pair?) | `O((n + k) log n)` |
| Polygon area (shoelace) | `O(n)` |

### Pitfalls

- **Collinear-but-not-overlapping segments** — orient returns 0 for all four, but no intersection. `on_segment` handles this.
- **Endpoint coincidence** vs **proper crossing** — some problem statements allow endpoint touches to count, some don't. Read carefully.
- **Integer overflow in `cross`** when coords are around `10^9` — product of two differences is ~`10^{18}`, fits in `int64` but not `int32`.
- **Floating-point `==`** — bug magnet. Use `abs(...) < eps`.
- **Ill-conditioned thin triangles** — cross product close to 0 doesn't mean exactly collinear. Decide whether to treat as collinear.

### Real-world uses

- **GIS** — is a point inside a polygon (parcel boundary)?
- **Collision detection in games** — segment-segment, line-polygon checks.
- **CAD / slicing software** (3D printing) — polygon offsets, intersections.
- **Routing** — checking turn directions.
- **Computer graphics** — orientation for back-face culling, winding order of triangles.
- **Robotics** — obstacle avoidance with polygonal obstacles.

### When *not* to use

- You're on a sphere (GIS at continent scale) — planar geometry fails; use great-circle distance / spherical trig.
- You only need approximate answers — bounding-box checks first, exact second.
- Heavy geometry workload — use a library (Shapely in Python, CGAL in C++) for robust primitives.

## See Also

- [`convex-hull.md`](convex-hull.md) — built on orientation.
- [`polygon.md`](polygon.md) — shoelace, point-in-polygon.
- [`closest-pair.md`](closest-pair.md) — uses distance + divide & conquer.
- [`../patterns/line-sweep.md`](../patterns/line-sweep.md) — Bentley-Ottmann for segment intersection.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
