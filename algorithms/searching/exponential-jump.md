# Exponential Search / Galloping / Jump Search

- **Source:** distilled from CP patterns + Timsort notes
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

- Unbounded / infinite sorted sequence — you don't know `n`, you can just probe.
- Sorted array where the target is **near the front** — exponential search beats classic binary search by a constant.
- Merging two sorted sequences where one side's items tend to cluster — Timsort's **galloping** mode.
- Jump search on disk-like structures with non-uniform access cost.

Core idea: start with a small window and grow it geometrically (`2, 4, 8, ...`) until you overshoot, then binary-search inside the last window.

## Interview View

### Template — exponential search (find target in unbounded sorted sequence)

```python
def exponential_search(probe, target):
    """`probe(i)` returns a[i] or raises IndexError / returns sentinel if out of range."""
    if probe(0) == target:
        return 0
    i = 1
    while True:
        try:
            v = probe(i)
        except IndexError:
            break
        if v >= target:
            break
        i *= 2
    # Now target is in (i//2, min(i, n)]
    return binary_search_range(probe, target, i // 2, i)

def binary_search_range(probe, target, lo, hi):
    while lo <= hi:
        mid = (lo + hi) // 2
        try:
            v = probe(mid)
        except IndexError:
            hi = mid - 1
            continue
        if v == target:
            return mid
        if v < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

### Template — galloping merge step

```python
def gallop_find(a, target, start):
    """In sorted `a`, find first index i>=start with a[i] >= target."""
    i = start
    step = 1
    while i < len(a) and a[i] < target:
        i += step
        step *= 2
    lo = start if step == 1 else (i - step // 2 + 1)
    hi = min(i, len(a) - 1)
    # binary search in [lo, hi]
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo
```

This is the move Timsort uses inside its merge: when one side keeps winning, gallop past a block on the losing side.

### Jump search (classic, for fixed-size arrays)

```python
import math

def jump_search(a, target):
    n = len(a)
    step = int(math.sqrt(n))
    prev = 0
    while prev < n and a[min(prev + step, n) - 1] < target:
        prev += step
    for i in range(prev, min(prev + step, n)):
        if a[i] == target:
            return i
    return -1
```

Two phases: jump by `√n` blocks, then linear scan inside the last block. `O(√n)`. Rarely used today — binary search dominates on fast RAM.

### Classic problems

| Problem | Fit |
|---|---|
| Search in infinite sorted stream | exponential search |
| Find index where value first exceeds X in a huge sorted file | exponential + binary |
| Timsort merge phase | galloping |
| Searching versioned data when most queries hit recent versions | exponential from the front |

## Reference View

### Complexity

| Variant | Time |
|---|---|
| Exponential search (target at index `p`) | `O(log p)` |
| Binary search on full `n` items | `O(log n)` |
| Jump search | `O(√n)` |
| Galloping step (advancing one run) | `O(log k)` where `k` is how far it gallops |

Exponential wins when `p ≪ n`: `log p` vs `log n`. For `n=10^9` and `p=10^3`, ~10 vs ~30 probes.

### Why exponential's bound is tight

Phase 1 (doubling) does `⌈log₂ p⌉ + 1` probes before overshooting.
Phase 2 (binary search in the last doubled window) does `log₂(p)` probes (window size ≈ p).
Total `O(log p)`.

### Galloping in Timsort, precisely

When one run's "stay" counter hits the galloping threshold (`MIN_GALLOP`, typically 7), switch modes: for the *next* element from that run, exponentially search for its insertion point in the other run, then binary-search to refine. This "teleports past" long prefixes of the same side → few comparisons per output element.

### Variants

- **Exponential search** — outer phase uses powers of 2.
- **Galloping** — exponential search used inside merge.
- **Jump search** — `√n` step size, linear finish. Mostly historical on disk media.
- **Unbounded binary search** — exponential search with `O(1)` extra state; used for "search in sorted infinite array" interview problems.

### Pitfalls

- **Probe raising on out-of-range** — handle `IndexError` or define a sentinel for "past the end." Don't assume `len` is known.
- **Integer overflow when doubling `i`** — not Python, but be aware in C/C++.
- **Off-by-one in the bounds `(i//2, i)`** when running the inner binary search — usually half-open is cleaner.
- **Jump search on RAM data is rarely beneficial** — cache-friendliness doesn't save it vs binary search's `log n`.

### Real-world uses

- **Timsort galloping** — Python/Java merge step.
- **Version control / time-series archives** — recent queries hit near the head of a log; exponential search beats binary.
- **Filesystem / object-store seek** — when you don't know exact file size; probe end, double, binary-search.
- **Skip lists** conceptually do exponential-style probing via express lanes.
- **Append-only logs / event sourcing** — look up the first event after a timestamp via exponential search from a known anchor.

### When *not* to use

- `n` is known and small — plain binary search is simpler.
- Access cost is wildly non-uniform (random-access beats sequential by orders of magnitude) — tune step-size specifically.
- Data isn't sorted — all these assume monotonicity.

## See Also

- [`binary-search.md`](binary-search.md) — used as the inner phase.
- [`ternary-search.md`](ternary-search.md) — for unimodal functions.
- [`../sorting/timsort.md`](../sorting/timsort.md) — galloping in practice.
- [`../../data-structures/probabilistic/skip-list.md`](../../data-structures/probabilistic/skip-list.md) — exponential-ish navigation.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
