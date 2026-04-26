# Non-Comparison Sorts

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

- Keys are integers (or fixed-format things like strings of known length) with a **bounded range**.
- You want to beat the `Ω(n log n)` comparison-sort lower bound.
- Input distribution is known well enough to choose buckets.

If keys are `O(n)` in range, counting/radix sort runs in `O(n)`. If keys are much bigger than `n`, you're paying for the range — comparison sort might win.

## Interview View

### Counting sort

```python
def counting_sort(a, k=None):
    """Sort integers in [0, k]. If k omitted, inferred from max."""
    if not a: return a[:]
    if k is None: k = max(a)
    count = [0] * (k + 1)
    for x in a:
        count[x] += 1
    # prefix sums give final positions (stable version)
    for i in range(1, k + 1):
        count[i] += count[i-1]
    out = [0] * len(a)
    for x in reversed(a):           # reverse to preserve stability
        count[x] -= 1
        out[count[x]] = x
    return out
```

`O(n + k)` time, `O(n + k)` space. Stable.

### Radix sort (LSD, base 10)

```python
def radix_sort(a):
    if not a: return a[:]
    out = a[:]
    exp = 1
    mx = max(out)
    while mx // exp > 0:
        out = counting_sort_by_digit(out, exp)
        exp *= 10
    return out

def counting_sort_by_digit(a, exp):
    count = [0] * 10
    for x in a:
        count[(x // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i-1]
    out = [0] * len(a)
    for x in reversed(a):
        d = (x // exp) % 10
        count[d] -= 1
        out[count[d]] = x
    return out
```

`O(d(n + b))` where `d` = number of digits, `b` = base. For 64-bit ints with base 256, that's 8 passes → `O(n)` effectively.

### Bucket sort

```python
def bucket_sort(a, num_buckets=None):
    """Assumes input is uniformly distributed in [0, 1)."""
    if not a: return a[:]
    if num_buckets is None: num_buckets = len(a)
    buckets = [[] for _ in range(num_buckets)]
    for x in a:
        idx = min(int(x * num_buckets), num_buckets - 1)
        buckets[idx].append(x)
    out = []
    for b in buckets:
        b.sort()                    # insertion sort if small, quicksort otherwise
        out.extend(b)
    return out
```

Expected `O(n)` on uniform input; worst `O(n²)` if all values fall in one bucket.

### Classic problems

| Problem | Fit |
|---|---|
| Sort scores in `[0, 100]` | counting |
| Sort 32-bit unsigned ints | radix (8 passes base 256) |
| Sort strings of equal length | MSD radix or LSD radix |
| Sort floats uniformly distributed | bucket |
| Sort by frequency (bucket-by-count) | counting-like "bucket sort" pattern |
| Top K frequent elements | bucket sort buckets indexed by frequency |

## Reference View

### Summary

| Algorithm | Time | Space | Stable | Requires |
|---|---|---|---|---|
| Counting | `O(n + k)` | `O(n + k)` | ✅ | integer keys, small `k` |
| Radix (LSD) | `O(d(n + b))` | `O(n + b)` | ✅ | fixed-length keys |
| Bucket | `O(n + k)` exp | `O(n + k)` | ✅ (if stable inner sort) | roughly uniform input |

### Counting sort details

- Stable variant uses prefix sums and iterates input in reverse.
- Pigeonhole sort is counting sort when keys are unique — just place at position `key`.
- If `k ≫ n`, counting sort wastes memory. Switch to radix.

### Radix sort: LSD vs MSD

- **LSD (Least Significant Digit first).** Sort by digit 0, then digit 1, ... using stable sort (counting). Good for fixed-length keys.
- **MSD (Most Significant Digit first).** Partition by top digit, recurse. Good for variable-length strings; can early-terminate when partitions are singletons.

Base choice: larger base → fewer passes but bigger `count` array. `b = 256` (1 byte) is the sweet spot for integers.

### Bucket sort with linked lists

Use bucket lists and merge at the end. For stream processing, insertion into each bucket at the proper position is insertion-sort-ish.

### Bucketing as a pattern (top-K frequent)

```python
from collections import Counter

def top_k_frequent(nums, k):
    cnt = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in cnt.items():
        buckets[freq].append(num)
    out = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            out.append(num)
            if len(out) == k:
                return out
    return out
```

Linear time; an example where "counting-sort-like bucketing" wins over a heap.

### Complexity lower-bound escape

Comparison sort is `Ω(n log n)` *only* because its only operation is comparison. Counting/radix use **key value** directly — they're working under different assumptions. Hence the "beat `n log n`" isn't magic; it trades generality for structure.

### Pitfalls

- **Integer overflow** in digit extraction — not Python's problem, but in C `x / 10^k` can overflow.
- **Stability not preserved** if you iterate forward in the classic counting sort — you must iterate reverse.
- **Bucket sort on adversarial input** (everything in one bucket) → `O(n²)`. If input isn't uniform, prefer radix.
- **Negative numbers** — adjust by a bias, or use sign-magnitude pass in radix.
- **Floats** — IEEE 754 is comparable as integer bit-patterns only if you flip sign bits appropriately. Radix-sorting floats directly is error-prone.
- **Key much larger than `n`** — counting sort's `O(k)` space blows up.

### Real-world uses

- **Card sorting machines** (original use case — Hollerith, 19th century).
- **Distributed sorting** — many MapReduce sorts use radix-like bucketing on key prefixes.
- **Redis `SORT BY`** can use counting-like optimization when given constraints.
- **Databases sorting fixed-width columns** (INTEGER, DATE) often use radix internally.
- **GPU sorts (Thrust, CUB)** — radix sort dominates because it's embarrassingly parallel and branchless.
- **Columnar analytics (ClickHouse, DuckDB)** — radix/counting sort on encoded columns.
- **String sorting** — burst-sort (MSD radix with per-bucket dynamic structures).

### When *not* to use

- Keys are abstract objects, not integers.
- Key range is huge (`k ≫ n`) — counting sort's space dominates.
- You need a general-purpose routine — comparison sort adapts to any comparable type.
- Input is small (`n < ~30`) — insertion sort wins on overhead.

## See Also

- [`comparison-sorts.md`](comparison-sorts.md) — general-purpose alternatives.
- [`external-sort.md`](external-sort.md) — when memory is the constraint.
- [`timsort.md`](timsort.md) — Python's default.
- [`../../data-structures/hash-based/hash-tables.md`](../../data-structures/hash-based/hash-tables.md) — bucket-style indexing.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
