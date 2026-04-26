# Binary Search on the Answer

- **Source:** distilled from LeetCode/CP patterns
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

- The answer is a number (int or float), and a **feasibility check** `can(x)` is easy.
- `can(x)` is monotone in `x` — if it's true for `x`, it's true for all `y > x` (or vice versa).
- You want the smallest (or largest) `x` for which `can(x)` holds.

Typical phrasing: "minimize/maximize the worst case / the largest piece / the wait time…" where you can binary-search the answer and check feasibility in `O(n)` or `O(n log n)`.

## Interview View

### Template — minimize the maximum

```python
def smallest_feasible(lo, hi, can):
    """Find smallest x in [lo, hi] with can(x)==True. Assumes feasibility is monotone True↑."""
    while lo < hi:
        mid = (lo + hi) // 2
        if can(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

### Classic — split array into K parts, minimize largest sum

```python
def split_array(nums, k):
    def can(limit):
        parts, cur = 1, 0
        for x in nums:
            if cur + x > limit:
                parts += 1
                cur = x
                if parts > k:
                    return False
            else:
                cur += x
        return True
    return smallest_feasible(max(nums), sum(nums), can)
```

Any `limit ≥ max(nums)` that's feasible stays feasible when you increase it → monotone.

### Classic — Koko eating bananas (find min hourly rate)

```python
import math
def min_eating_speed(piles, h):
    def can(k):
        return sum(math.ceil(p / k) for p in piles) <= h
    return smallest_feasible(1, max(piles), can)
```

### Classic — kth smallest in sorted matrix

```python
def kth_smallest(matrix, k):
    n = len(matrix)
    lo, hi = matrix[0][0], matrix[-1][-1]
    def count_le(x):
        c = 0; r = n - 1; col = 0
        while r >= 0 and col < n:
            if matrix[r][col] <= x:
                c += r + 1
                col += 1
            else:
                r -= 1
        return c
    while lo < hi:
        mid = (lo + hi) // 2
        if count_le(mid) >= k:
            hi = mid
        else:
            lo = mid + 1
    return lo
```

### Classic problems

| Problem | Predicate |
|---|---|
| Split Array Largest Sum | can split into ≤ K with max part ≤ x |
| Capacity to Ship in D Days | can ship with capacity x in ≤ D days |
| Minimum Speed to Arrive On Time | total time at speed x ≤ deadline |
| Koko Eating Bananas | hours at rate x ≤ h |
| Aggressive Cows (spacing) | can place K cows with min gap ≥ x |
| Kth Smallest in Sorted Matrix | `count_le(x) ≥ k` |
| Find the Smallest Divisor | sum of ceilings ≤ threshold |

## Reference View

### Monotonicity check — the only thing that matters

Before reaching for binary search, verify: "if the answer works at `x`, does it work at all larger (or smaller) `x`?" If that's not obviously true, sketch a proof. Many wrong submissions come from assuming monotonicity that isn't there.

### Integer vs real

**Integer** — classic `lo, hi` with `lo < hi` loop; answer is `lo` at end.

**Real** — loop a fixed number of times (60–100 iterations for `1e-9` precision) or until `hi - lo < eps`:

```python
def bs_real(lo, hi, can, iters=100):
    for _ in range(iters):
        mid = (lo + hi) / 2
        if can(mid):
            hi = mid
        else:
            lo = mid
    return lo
```

Fixed iterations avoid floating-point traps where `hi - lo` never quite reaches `eps`.

### Variants

- **Smallest feasible** — `if can(mid): hi = mid else: lo = mid+1`.
- **Largest feasible** — `if can(mid): lo = mid else: hi = mid-1` (needs `mid = (lo+hi+1)//2` to avoid infinite loop).
- **Parametric search** — stacked binary searches where `can` itself contains a binary search (e.g., kth smallest in BST of sorted arrays).
- **Ternary search** — unimodal functions (see [`../searching/ternary-search.md`](../searching/ternary-search.md)).

### Complexity

| Setup | Cost |
|---|---|
| integer range `[lo, hi]`, `can` in `O(f(n))` | `O(f(n) · log(hi - lo))` |
| real range, fixed iters | `O(f(n) · iters)` |

### Pitfalls

- **Picking bounds that don't include the answer** — `max(nums)` as `lo` for "minimize max part" — any `< max(nums)` infeasible.
- **Loop that doesn't terminate for "largest feasible"** — `mid = (lo+hi)//2` with `lo = mid` is the classic infinite-loop trap. Use `(lo+hi+1)//2`.
- **Predicate not monotone** — you'll get *a* number but not the right one. Test with small inputs.
- **Overflow on `(lo+hi)//2`** — not a Python issue, but `lo + (hi-lo)//2` is the safe idiom in other languages.
- **Float precision** — don't use `hi - lo < eps` with adversarial inputs; fixed iterations are safer.

### Real-world uses

- **Database query planner** — choose parameters (join batch size, fetch size) where feasibility = "fits in memory budget."
- **Capacity planning** — "smallest cluster size such that p99 latency ≤ target" when you have a load simulator.
- **Packing / bin sizing** — smallest bin size that lets N items fit in ≤ K bins.
- **Scheduling** — smallest deadline/ speed that satisfies constraints.
- **Game AI** — binary search on "how deep can I search in this time budget."

### When *not* to use

- Answer isn't numeric, or isn't obviously monotone.
- The feasibility check is almost as expensive as a direct solve.
- Search space is tiny — just enumerate.

## See Also

- [`../searching/binary-search.md`](../searching/binary-search.md) — the basic tool.
- [`../searching/ternary-search.md`](../searching/ternary-search.md) — unimodal variant.
- [`../paradigms/greedy.md`](../paradigms/greedy.md) — feasibility check is usually a greedy pass.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
