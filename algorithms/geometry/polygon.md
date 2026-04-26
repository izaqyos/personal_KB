# Polygons (Area, Point-in-Polygon, Triangulation)

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

- Compute area of arbitrary polygon (simple, convex, concave).
- Test whether a point is inside / on boundary / outside a polygon.
- Triangulate a polygon for rendering or integration.
- Polygon-polygon ops: intersection, union, clipping.

## Interview View

### Shoelace — polygon area

```python
def polygon_area(poly):
    """Signed area (positive if CCW). Works for simple polygons."""
    n = len(poly)
    s = 0
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return s / 2

def abs_area(poly):
    return abs(polygon_area(poly))
```

### Centroid of simple polygon

```python
def centroid(poly):
    n = len(poly)
    cx = cy = 0
    a = polygon_area(poly)
    for i in range(n):
        x1, y1 = poly[i]; x2, y2 = poly[(i+1) % n]
        factor = x1 * y2 - x2 * y1
        cx += (x1 + x2) * factor
        cy += (y1 + y2) * factor
    return cx / (6 * a), cy / (6 * a)
```

### Point-in-polygon — ray casting

```python
def point_in_polygon(p, poly):
    """True if p is strictly inside the polygon."""
    x, y = p
    n = len(poly)
    inside = False
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]; xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and \
           (x < (xj - xi) * (y - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside
```

Boundary → ambiguous; handle explicitly if needed.

### Point-in-convex-polygon — `O(log n)` via binary search

```python
def cross(o, a, b):
    return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])

def point_in_convex(p, poly):
    """Assumes poly is CCW-ordered convex polygon. O(log n)."""
    n = len(poly)
    if cross(poly[0], poly[1], p) < 0: return False
    if cross(poly[0], poly[-1], p) > 0: return False
    lo, hi = 1, n - 1
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if cross(poly[0], poly[mid], p) >= 0: lo = mid
        else: hi = mid
    return cross(poly[lo], poly[lo+1], p) >= 0
```

### Ear-clipping triangulation (simple polygon, `O(n²)`)

Repeatedly find an "ear" (a triangle with no other vertices inside), remove it, and recurse. Good enough for up to a few thousand vertices; for bigger use sweep-line triangulation.

### Classic problems

| Problem | Approach |
|---|---|
| Area of polygon | shoelace |
| Is polygon convex? | cross products along all edges have same sign |
| Point in polygon | ray cast or winding number |
| Point in convex polygon | binary search |
| Polygon-polygon intersection | Weiler-Atherton or Vatti |
| Triangulate polygon | ear clip; or monotone decomposition |
| Simplify polygon | Douglas-Peucker |
| Minkowski sum (convex) | merge CCW edge sequences |

## Reference View

### Shoelace derivation

For any simple polygon, area equals the sum of signed triangle areas from origin: `½ Σ (x_i · y_{i+1} - x_{i+1} · y_i)`. Works because adjacent triangles either add or subtract to leave only the polygon interior.

### Ray casting correctness

A horizontal ray from `p` crosses the polygon's edges an even number of times iff `p` is outside. The `((yi > y) != (yj > y))` check handles horizontal-edge and boundary cases cleanly. Edge cases:

- Ray passes exactly through a vertex — handled by `>` vs `>=` convention.
- Point exactly on boundary — treat separately; the result is "ambiguous".

### Winding number method (alternative)

Sum the signed angles `θ_i` subtended by polygon edges at point `p`. If the sum is `2π` → inside; if `0` → outside. Works for self-intersecting polygons (gives the "winding number", `0 / ±1 / ±2 / ...`).

### Polygon clipping algorithms

- **Sutherland-Hodgman** — clips any polygon against a convex polygon (e.g., rectangle). `O(n · m)`. Simple.
- **Weiler-Atherton** — clips arbitrary polygons. Handles concave / holes.
- **Vatti / Greiner-Hormann** — general polygon boolean ops (union, intersect, difference).

### Triangulation algorithms

| Algorithm | Time | Handles |
|---|---|---|
| Ear clipping | `O(n²)` | Simple polygons (no holes) |
| Monotone decomposition + tri | `O(n log n)` | Simple polygons |
| Seidel's trapezoidation | `O(n log* n)` expected | Simple polygons |
| Delaunay triangulation | `O(n log n)` | Point set (not polygon) |
| Constrained Delaunay | `O(n log n)` | Polygon with constraints |

For competitive: ear clipping. For production: use a library (e.g., `shapely` + `triangle` or `earcut`).

### Minkowski sum

For convex polygons `A` and `B`, the Minkowski sum `A ⊕ B = {a + b : a ∈ A, b ∈ B}` is another convex polygon with `|A| + |B|` edges, obtainable in `O(|A| + |B|)` by merging CCW-sorted edge sequences.

Used in: collision detection (A collides with B iff `0 ∈ A ⊕ (-B)`), path planning (Minkowski sum of robot with obstacles for configuration space).

### Complexity

| Op | Time |
|---|---|
| Shoelace area | `O(n)` |
| Ray-cast PIP | `O(n)` |
| Convex PIP (sorted) | `O(log n)` |
| Convex-convex intersection | `O(n + m)` |
| Sutherland-Hodgman | `O(n · m)` |
| Ear-clip triangulation | `O(n²)` |
| Convex Minkowski sum | `O(n + m)` |

### Pitfalls

- **Self-intersecting polygons** — shoelace gives algebraic sum (can be negative or wrong). Use winding.
- **Clockwise vs CCW** — convex PIP requires CCW input (or reverse); many bugs from wrong convention.
- **Float ray-cast** — edges exactly passing through the query point. Break ties consistently (`>` strict, `>=` for one side).
- **Polygons with holes** — use "polygon with holes" structure (outer CCW + holes CW), or signed-area subtract.
- **Non-simple polygon** area — ill-defined; split first.
- **Very thin triangles during ear-clipping** — numerical instability; prefer exact arithmetic or scale up integers.

### Real-world uses

- **GIS** — spatial joins, "is coordinate inside this country / parcel".
- **Computer graphics** — fill algorithms, polygon rasterization.
- **CAD / slicing** — polygon booleans for assembly / machining paths.
- **Robotics motion planning** — configuration space as Minkowski sum.
- **Simulation** — region-based queries in 2D physics.
- **Geofencing** — is user inside the delivery zone?
- **VLSI / PCB design** — polygon operations over layout layers.

### When *not* to use

- Non-planar data (earth scale) — use spherical polygon area / PIP.
- Very large polygons with many queries — build spatial index (R-tree, kd-tree) first.
- Arbitrary shapes with curves — approximate with polygons, or use Bezier / implicit geometry libs.
- You need exact geometry on integer coords — use CGAL / exact libraries; native float won't cut it.

## See Also

- [`orientation-segments.md`](orientation-segments.md) — cross primitive.
- [`convex-hull.md`](convex-hull.md) — convex polygon construction.
- [`closest-pair.md`](closest-pair.md) — related geometry D&C.
- [`../patterns/line-sweep.md`](../patterns/line-sweep.md) — polygon intersection via sweep.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
