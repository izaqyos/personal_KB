# Binary Search

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

- Sorted array (or any domain with monotone predicate) — find an element, first/last match, or insertion point.
- Answer-by-predicate search — see [`../patterns/binary-search-on-answer.md`](../patterns/binary-search-on-answer.md).
- Infinite / unbounded search — find an upper bound with exponential growth, then binary search within (see [`exponential-jump.md`](exponential-jump.md)).
- Rotated / monotone-piecewise arrays — with a careful pivot check.

Key rule: you must have **monotonicity**. On a sorted array that's automatic. On custom predicates, prove it or your "binary search" silently returns wrong answers.

## Interview View

### Template — exact match

```python
def bsearch(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            return mid
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

### Template — lower_bound (first index with `a[i] >= target`)

```python
def lower_bound(a, target):
    lo, hi = 0, len(a)      # half-open [lo, hi)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo                # may equal len(a) if all < target
```

### Template — upper_bound (first index with `a[i] > target`)

```python
def upper_bound(a, target):
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

### Python's built-in `bisect`

```python
from bisect import bisect_left, bisect_right, insort

bisect_left(a, x)   # = lower_bound
bisect_right(a, x)  # = upper_bound
insort(a, x)        # insert x preserving sort; O(n) because list shift
```

### Rotated sorted array

```python
def search_rotated(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            return mid
        if a[lo] <= a[mid]:          # left half sorted
            if a[lo] <= target < a[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:                        # right half sorted
            if a[mid] < target <= a[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1
```

Handle duplicates by an extra branch `if a[lo] == a[mid] == a[hi]: lo += 1; hi -= 1`.

### Classic problems

| Problem | Variant |
|---|---|
| Search Insert Position | lower_bound |
| First/Last Position of Element | lower_bound / upper_bound - 1 |
| Find Peak Element | binary search on `a[i] < a[i+1]` |
| Search in Rotated Sorted Array | pivot-aware |
| Find Minimum in Rotated Sorted Array | compare to `a[hi]` |
| Median of Two Sorted Arrays | binary search on partition of smaller array |
| Kth Smallest in Sorted Matrix | binary search on answer + count |
| Aggressive Cows / Koko | binary search on answer |

### Median of two sorted arrays

```python
def find_median(a, b):
    if len(a) > len(b): a, b = b, a
    m, n = len(a), len(b)
    half = (m + n + 1) // 2
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        a_left  = a[i-1] if i > 0 else float('-inf')
        a_right = a[i]   if i < m else float('inf')
        b_left  = b[j-1] if j > 0 else float('-inf')
        b_right = b[j]   if j < n else float('inf')
        if a_left <= b_right and b_left <= a_right:
            if (m + n) % 2:
                return max(a_left, b_left)
            return (max(a_left, b_left) + min(a_right, b_right)) / 2
        elif a_left > b_right:
            hi = i - 1
        else:
            lo = i + 1
```

`O(log min(m, n))`.

## Reference View

### The three templates, summarized

| Goal | Loop | Increment |
|---|---|---|
| exact match | `lo <= hi` | `lo = mid+1` or `hi = mid-1` |
| first `a[i] >= x` (lower_bound) | `lo < hi` | `lo = mid+1` or `hi = mid` |
| last `a[i] <= x` / first `>= x` | `lo < hi+1` + `mid = (lo+hi+1)//2` | `lo = mid` or `hi = mid-1` |

Memorize one template well rather than three poorly.

### The `(lo+hi)//2` overflow trap

In Python, integers are unbounded — no overflow. In C/C++/Java, `lo + hi` can overflow. Use `lo + (hi - lo) // 2`.

### Binary search on real numbers

Use fixed iterations, not `hi - lo < eps`:

```python
for _ in range(100):
    mid = (lo + hi) / 2
    if can(mid):
        hi = mid
    else:
        lo = mid
```

`100` iterations gives you `~30` decimal digits of precision — plenty.

### Variants

- **Exact match** (classic).
- **lower_bound / upper_bound** (insertion point).
- **Peak finding** in bitonic arrays — monotone in a different sense.
- **Fractional cascading** — accelerate `k` binary searches into related sorted lists from `O(k log n)` to `O(k + log n)` (advanced).
- **Parametric / binary search on answer** — see [`../patterns/binary-search-on-answer.md`](../patterns/binary-search-on-answer.md).

### Complexity

| Flavor | Time |
|---|---|
| Classic | `O(log n)` |
| Rotated (no duplicates) | `O(log n)` |
| Rotated (with duplicates, worst) | `O(n)` |
| Real-valued + predicate | `O(iters · cost(predicate))` |

### Pitfalls

- **Off-by-one in the loop termination.** Pick a template and use it rigorously — exact match (`<=`, `mid-1`/`mid+1`) vs boundary (`<`, `mid`/`mid+1`) behave differently.
- **Infinite loop when shrinking `hi = mid` with `lo < hi` and `mid = (lo+hi)//2`** — this is fine; but `lo = mid` with the same setup loops forever. Use `(lo+hi+1)//2` for that direction.
- **Assuming sorted when the data isn't.** Always confirm with a precondition.
- **Comparing floats for equality in a binary search** — doesn't terminate reliably.
- **Rotated with duplicates** — can degrade to linear; sometimes the problem expects it.

### Real-world uses

- **Database B-tree traversal** — binary search within each node.
- **Sorted log file seek** — seek to estimated offset, read a record, binary-search-like to refine.
- **Version lookup (git bisect)** — binary search over commits to find the regression.
- **Regression-test binary search** — localize flaky tests.
- **Interpolation search variants** in numeric databases.
- **LSM-tree lookups** — within a sorted SSTable block.
- **Rate-limit lookups on sorted timestamp windows.**

### When *not* to use

- Hash table gives `O(1)` average — use it unless you need order queries.
- Linear scan is fast enough (`n` small).
- Data is a skip list / BST — use its native search.
- Predicate isn't monotone — you'll get wrong answers.

## See Also

- [`ternary-search.md`](ternary-search.md) — unimodal functions.
- [`exponential-jump.md`](exponential-jump.md) — unbounded / infinite search.
- [`../patterns/binary-search-on-answer.md`](../patterns/binary-search-on-answer.md) — search the answer space.
- [`../../data-structures/linear/arrays.md`](../../data-structures/linear/arrays.md) — underlying DS.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
