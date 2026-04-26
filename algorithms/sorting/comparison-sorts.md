# Comparison Sorts

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

- You have a set of items comparable via `<`, `==` (total order).
- You'd like `O(n log n)` and can afford the associated constant factor.
- Integer/key-specific tricks (counting/radix) don't fit (keys are non-integer, huge range, or you need stability with complex keys).

Anything comparable can be sorted with these algorithms, whereas non-comparison sorts need structured keys (integers, fixed-length strings). See [`non-comparison-sorts.md`](non-comparison-sorts.md).

## Interview View

### Merge sort

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr[:]
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(a, b):
    out = []; i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:]); out.extend(b[j:])
    return out
```

- `O(n log n)` always. Stable. Needs `O(n)` auxiliary space.

### Quicksort (Lomuto + random pivot)

```python
import random

def quicksort(arr, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo < hi:
        p = random.randint(lo, hi)
        arr[p], arr[hi] = arr[hi], arr[p]
        pivot = arr[hi]
        store = lo
        for i in range(lo, hi):
            if arr[i] < pivot:
                arr[store], arr[i] = arr[i], arr[store]
                store += 1
        arr[store], arr[hi] = arr[hi], arr[store]
        quicksort(arr, lo, store - 1)
        quicksort(arr, store + 1, hi)
```

- Expected `O(n log n)`, worst `O(n²)`. In-place. Not stable. Very cache-friendly → smallest constants in practice.

### Heapsort

```python
import heapq

def heapsort(arr):
    heapq.heapify(arr)          # O(n)
    return [heapq.heappop(arr) for _ in range(len(arr))]  # n × O(log n)
```

Or the in-place classical version:

```python
def heapsort_inplace(a):
    def sift_down(start, end):
        root = start
        while 2*root + 1 <= end:
            child = 2*root + 1
            if child + 1 <= end and a[child] < a[child+1]:
                child += 1
            if a[root] < a[child]:
                a[root], a[child] = a[child], a[root]
                root = child
            else: return
    n = len(a)
    for start in range(n//2 - 1, -1, -1):
        sift_down(start, n - 1)
    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        sift_down(0, end - 1)
```

- `O(n log n)` always. In-place. Not stable. Worse cache behavior than quicksort.

### Insertion sort

```python
def insertion_sort(a):
    for i in range(1, len(a)):
        x = a[i]; j = i - 1
        while j >= 0 and a[j] > x:
            a[j+1] = a[j]; j -= 1
        a[j+1] = x
```

- `O(n²)` worst, `O(n)` on nearly-sorted inputs. Stable, in-place, tiny constants → fastest for small `n` (used in Timsort/introsort as a cutover).

### Classic problems

| Problem | Choice |
|---|---|
| General-purpose | quicksort / Timsort |
| Need stability | merge sort / Timsort |
| Memory-constrained | heapsort / quicksort |
| Small `n` (`n ≤ ~50`) | insertion sort |
| Nearly-sorted input | insertion sort / Timsort |
| Worst-case guarantee | heapsort / merge sort |
| Sort by multiple keys | stable sort with composite key |

## Reference View

### Comparison sort lower bound

Any comparison-based sort on `n` items makes at least `⌈log₂(n!)⌉ = Ω(n log n)` comparisons. The decision-tree argument: there are `n!` orderings, so the tree has depth at least `log₂(n!)`. Consequence: no comparison sort beats `Θ(n log n)`.

### Algorithm summary

| Algorithm | Best | Avg | Worst | Space | Stable | In-place | Notes |
|---|---|---|---|---|---|---|---|
| Insertion | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | ✅ | ✅ | great on small/near-sorted |
| Selection | `O(n²)` | `O(n²)` | `O(n²)` | `O(1)` | ❌ | ✅ | few writes |
| Bubble | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | ✅ | ✅ | teaching only |
| Shell | `O(n log² n)` | varies | `Θ(n^{4/3})` (Ciura) | `O(1)` | ❌ | ✅ | generalized insertion |
| Merge | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | ✅ | ❌ | predictable |
| Quicksort | `O(n log n)` | `O(n log n)` | `O(n²)` | `O(log n)` | ❌ | ✅ | fastest in practice |
| Heapsort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)` | ❌ | ✅ | worst-case safe |
| Timsort | `O(n)` | `O(n log n)` | `O(n log n)` | `O(n)` | ✅ | ❌ | Python/Java default |
| Introsort | — | — | `O(n log n)` | `O(log n)` | ❌ | ✅ | C++ std::sort |

### Stability

A sort is **stable** if equal keys retain their relative input order. Matters when you're doing multi-key sort by repeated single-key passes (last key sorted becomes primary key — so sort from **least** significant to most significant).

### Quicksort details that matter

- **Pivot choice.** Median-of-three, ninther, or random — avoid picking `a[lo]` or `a[hi]` on already-sorted input (that's the `O(n²)` trap).
- **3-way partition (Dutch national flag).** Critical for inputs with many duplicates — plain partitions degrade to `O(n²)`.
- **Tail recursion elimination.** Recurse into the smaller partition, loop for the bigger → stack depth `O(log n)`.
- **Introsort.** Quicksort until recursion depth > `2·log₂(n)`, then switch to heapsort. Guarantees `O(n log n)`. Used by `std::sort`.

### Heap sort details

- Heap-ify is `O(n)` (not `O(n log n)`) — classical proof by summing `Σ i · 2^{d-i}`.
- Cache-unfriendly: swaps jump around memory every level.
- Stable variant exists but adds overhead — seldom used.

### Merge sort details

- Natural on linked lists (no random access needed).
- Good for **external sort** (disk/SSD) — see [`external-sort.md`](external-sort.md).
- Pairs with parallelism — each half goes to a thread.

### Pitfalls

- `sort()` vs `sorted()` in Python: `sort()` mutates; `sorted()` returns a new list. Both are Timsort.
- Sorting with `cmp` in Python 3 — removed; use `key=` (lambda or `functools.cmp_to_key`).
- Instability bites when you didn't notice — `sorted(pairs, key=lambda p: p[0])` is stable in Python; relying on that needs awareness that other languages' default may not be.
- Sorting custom objects — define `__lt__` (not `__cmp__`). `total_ordering` decorator if you want all 6 comparisons.
- `NaN` breaks total-ordering assumptions — `NaN < x` is False for all x, and `NaN > x` is False → sort is unstable and unpredictable.

### Real-world uses

- **Python `sorted`, `list.sort` — Timsort.**
- **Java `Arrays.sort(Object[])` — Timsort; `Arrays.sort(int[])` — Dual-pivot quicksort.**
- **C++ `std::sort` — introsort.**
- **Git — merge-sort over commits** for blame, log.
- **Databases — sort-merge joins** on ordered inputs.
- **Distributed systems — sort-based shuffles in MapReduce/Spark.**

### When *not* to use

- Keys are small-range integers → counting/radix sort, `O(n)`. See [`non-comparison-sorts.md`](non-comparison-sorts.md).
- Data doesn't fit in memory → external sort. See [`external-sort.md`](external-sort.md).
- You only need top-K → heap-based `O(n log k)` with `heapq.nsmallest`.
- You only need a particular order (kth smallest) → Quickselect `O(n)` expected.

## See Also

- [`non-comparison-sorts.md`](non-comparison-sorts.md) — counting, radix, bucket.
- [`external-sort.md`](external-sort.md) — when data doesn't fit in RAM.
- [`timsort.md`](timsort.md) — Python's default in depth.
- [`../paradigms/divide-and-conquer.md`](../paradigms/divide-and-conquer.md) — mergesort/quicksort framing.
- [`../paradigms/randomized.md`](../paradigms/randomized.md) — random-pivot quicksort.
- [`../../data-structures/trees/heap.md`](../../data-structures/trees/heap.md) — backing structure for heapsort.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
