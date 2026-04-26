# Divide and Conquer

- **Source:** distilled from CLRS + CP patterns
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

- The problem naturally splits into independent subproblems of the same type.
- The *combine* step is cheaper than solving the original directly.
- No overlap between subproblems (otherwise you want DP with memoization — see [`dynamic-programming.md`](dynamic-programming.md)).

Signals: recurrences like `T(n) = aT(n/b) + f(n)`. Classic wins: sorting, geometric problems, FFT, matrix multiplication, search trees.

## Interview View

### Template — recursive skeleton

```python
def solve(problem):
    if base_case(problem):
        return base_answer(problem)
    subproblems = divide(problem)
    results = [solve(sp) for sp in subproblems]
    return combine(results)
```

### Merge sort

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:]); out.extend(b[j:])
    return out
```

`T(n) = 2T(n/2) + O(n) = O(n log n)`.

### Count inversions (classic D&C)

```python
def count_inversions(arr):
    def sort_count(a):
        if len(a) <= 1:
            return a, 0
        mid = len(a) // 2
        left, li = sort_count(a[:mid])
        right, ri = sort_count(a[mid:])
        merged, si = merge_count(left, right)
        return merged, li + ri + si

    def merge_count(a, b):
        out = []; i = j = inv = 0
        while i < len(a) and j < len(b):
            if a[i] <= b[j]:
                out.append(a[i]); i += 1
            else:
                out.append(b[j]); j += 1
                inv += len(a) - i  # all remaining in `a` form inversions with b[j]
        out.extend(a[i:]); out.extend(b[j:])
        return out, inv

    return sort_count(arr)[1]
```

### Maximum subarray (Kadane beats it, but D&C is instructive)

```python
def max_subarray(nums):
    def helper(l, r):
        if l == r:
            return nums[l], nums[l], nums[l], nums[l]  # best, prefix, suffix, total
        mid = (l + r) // 2
        lb, lp, ls, lt = helper(l, mid)
        rb, rp, rs, rt = helper(mid + 1, r)
        best = max(lb, rb, ls + rp)
        prefix = max(lp, lt + rp)
        suffix = max(rs, rt + ls)
        total = lt + rt
        return best, prefix, suffix, total
    return helper(0, len(nums) - 1)[0]
```

### Classic problems

| Problem | Recurrence | Bound |
|---|---|---|
| Merge sort | `2T(n/2) + O(n)` | `O(n log n)` |
| Quicksort (avg) | `2T(n/2) + O(n)` | `O(n log n)` |
| Quicksort (worst) | `T(n-1) + O(n)` | `O(n²)` |
| Binary search | `T(n/2) + O(1)` | `O(log n)` |
| Closest pair of points | `2T(n/2) + O(n)` | `O(n log n)` |
| Strassen matrix mul | `7T(n/2) + O(n²)` | `O(n^{log₂7}) ≈ O(n^2.81)` |
| FFT | `2T(n/2) + O(n)` | `O(n log n)` |
| Karatsuba multiplication | `3T(n/2) + O(n)` | `O(n^{log₂3}) ≈ O(n^1.58)` |

## Reference View

### Master theorem

For `T(n) = aT(n/b) + f(n)` with `a ≥ 1`, `b > 1`:

- If `f(n) = O(n^{log_b a - ε})` for some `ε > 0`: `T(n) = Θ(n^{log_b a})`.
- If `f(n) = Θ(n^{log_b a})`: `T(n) = Θ(n^{log_b a} log n)`.
- If `f(n) = Ω(n^{log_b a + ε})` and regularity (`a·f(n/b) ≤ c·f(n)` for `c < 1`): `T(n) = Θ(f(n))`.

Quick mental check: which dominates — the branching (`a^k`) or the per-level work (`f(n)·b^k`)?

- Mergesort: `a=b=2`, `f(n)=n`, `log_b a = 1`, matches case 2 → `Θ(n log n)`.
- Binary search: `a=1, b=2`, `f(n)=1`, `log_b a = 0`, matches case 2 → `Θ(log n)`.
- Karatsuba: `a=3, b=2`, `f(n)=n`, `log_b a ≈ 1.58 > 1` → case 1 → `Θ(n^{log₂3})`.

### Variants

- **Straight D&C** — independent subproblems, combine is cheap.
- **Decrease and conquer** — one subproblem, smaller (binary search, Euclid's GCD).
- **D&C with preprocessing** — one-time sort / structure, then recursion.
- **D&C with randomization** — quicksort/quickselect pivot.
- **Parallel D&C** — each subproblem on its own worker (map-reduce, fork-join).

### Closest pair of points (a classical geometric D&C)

1. Sort by `x`; recursively solve left half and right half, get `d = min` of the two.
2. Consider the "strip" of points within `d` of the dividing line.
3. Sort the strip by `y`; for each point, only the next ~7 points by `y` can be closer than `d`.

Total `O(n log n)` — improves on `O(n²)` brute force.

### Complexity

| Tool | Use |
|---|---|
| Master theorem | most `T(n) = aT(n/b) + f(n)` forms |
| Recursion tree | when master theorem doesn't apply |
| Akra-Bazzi | unequal splits, e.g., `T(n) = T(n/3) + T(2n/3) + n` |

### Pitfalls

- **Subproblems not independent** → you'd re-solve the same subproblem many times. That's DP land.
- **Combine step too heavy** → the "win" evaporates. e.g., naive matrix mult combine is `O(n²)` per level → `O(n³)`.
- **Shallow recursion stack assumption** — Python default limit (1000) is trouble for `n > 1000` unbalanced recursions; bump `sys.setrecursionlimit` or iterate.
- Slicing in Python (`arr[:mid]`) copies — `O(n)` per split, so nothing for free. Pass indices instead for strict `O(n log n)`.

### Real-world uses

- **MapReduce / Spark** — map-combine-reduce is D&C pattern.
- **GPU parallel scan / sort** — D&C is embarrassingly parallel when subproblems are independent.
- **Compilers — register allocation via D&C on CFG sub-regions**.
- **Cryptography — FFT-based polynomial multiplication underlies schemes like NTRU / lattice-based KEMs**.
- **Databases — parallel external sort, partitioned joins** — classic D&C.
- **Compression — Burrows-Wheeler uses D&C-style suffix structures**.

### When *not* to use

- Subproblems overlap → use DP.
- Subproblems aren't independent (shared mutable state) → sequential processing.
- `f(n)` dominates the recurrence so hard that a simple one-pass alternative wins (e.g., Kadane beats D&C on max subarray).

## See Also

- [`dynamic-programming.md`](dynamic-programming.md) — overlapping subproblems.
- [`greedy.md`](greedy.md) — single choice, no recursion.
- [`../sorting/comparison-sorts.md`](../sorting/comparison-sorts.md) — mergesort/quicksort.
- [`../patterns/meet-in-the-middle.md`](../patterns/meet-in-the-middle.md) — D&C on the search space.
- [`../searching/binary-search.md`](../searching/binary-search.md) — decrease-and-conquer flavor.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
