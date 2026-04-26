# Prefix / Suffix Aggregates

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

- Range aggregate queries on a static array (sum, min if you accept `O(n log n)` with sparse table, xor, product).
- Any query of the form "something about `arr[i..j]`" that you want to answer in `O(1)` after `O(n)` preprocessing.
- Subarray sum = K (including negatives): pair prefix-sum with a hash map.
- "For each `i`, best on the left / right of `i`" — compute left pass and right pass, combine.

Key identity: `sum(arr[l..r]) = prefix[r+1] - prefix[l]`. This converts "subarray sum" into "pair of prefix values with a specific difference," which is where the hash map trick comes from.

## Interview View

### Template — prefix sum

```python
def build_prefix(nums):
    p = [0] * (len(nums) + 1)
    for i, x in enumerate(nums):
        p[i + 1] = p[i] + x
    return p

def range_sum(p, l, r):  # inclusive [l, r]
    return p[r + 1] - p[l]
```

### Template — subarray sum equals K (with negatives)

```python
def subarray_sum_k(nums, k):
    from collections import defaultdict
    count = defaultdict(int)
    count[0] = 1  # empty prefix
    s = res = 0
    for x in nums:
        s += x
        res += count[s - k]
        count[s] += 1
    return res
```

Why: if `prefix[j] - prefix[i] == k`, then `nums[i..j-1]` sums to `k`. For each `j`, count how many earlier prefixes equal `s - k`.

### Template — product except self (two passes)

```python
def product_except_self(nums):
    n = len(nums)
    out = [1] * n
    left = 1
    for i in range(n):
        out[i] = left
        left *= nums[i]
    right = 1
    for i in range(n - 1, -1, -1):
        out[i] *= right
        right *= nums[i]
    return out
```

### Template — 2D prefix sum

```python
def build_2d(mat):
    r, c = len(mat), len(mat[0])
    p = [[0] * (c + 1) for _ in range(r + 1)]
    for i in range(r):
        for j in range(c):
            p[i+1][j+1] = mat[i][j] + p[i][j+1] + p[i+1][j] - p[i][j]
    return p

def rect_sum(p, r1, c1, r2, c2):  # inclusive
    return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]
```

### Classic problems

| Problem | Trick |
|---|---|
| Range Sum Query (static) | 1D prefix |
| Range Sum Query 2D (static) | 2D prefix with inclusion-exclusion |
| Subarray Sum Equals K | prefix + hash |
| Continuous Subarray Sum (multiple of K) | prefix mod K + hash |
| Contiguous Array (equal 0/1) | map 0→−1, prefix + hash for first occurrence |
| Product of Array Except Self | left-product + right-product |
| Longest subarray with sum ≤ K (positives) | sliding window, not prefix |
| Range XOR | prefix xor |

## Reference View

### Variants

- **Prefix sum** — range sum.
- **Prefix xor** — range xor.
- **Prefix min / max** — only meaningful for "min/max up to i," not arbitrary ranges.
- **Difference array** — the *inverse* of prefix sum; range *updates* in `O(1)`, final array in `O(n)`.
- **Fenwick / BIT** — if you need both updates *and* queries, see [`../../data-structures/specialized/fenwick-tree.md`](../../data-structures/specialized/fenwick-tree.md).

### Difference array (range-update, point-query)

```python
def range_update(diff, l, r, delta):
    diff[l] += delta
    if r + 1 < len(diff):
        diff[r + 1] -= delta

def materialize(diff):
    out = diff[:]
    for i in range(1, len(out)):
        out[i] += out[i - 1]
    return out
```

Use case: "increment `arr[l..r]` by `v`, `m` times, then print final array" in `O(n + m)` instead of `O(n*m)`.

### Prefix mod trick

"Subarray sum divisible by K" — store `prefix[i] % K` and count pairs with the same remainder. `prefix[j] - prefix[i] ≡ 0 (mod K)` iff they share remainder.

### Complexity

| Operation | Prefix sum | Fenwick | Segment tree |
|---|---|---|---|
| build | `O(n)` | `O(n log n)` | `O(n)` |
| range query | `O(1)` | `O(log n)` | `O(log n)` |
| point update | `O(n)` | `O(log n)` | `O(log n)` |
| range update + range query | `O(n)` per update | `O(log n)` (with two BITs) | `O(log n)` (lazy prop) |

### Pitfalls

- Off-by-one: inclusive `[l, r]` with `prefix` array of size `n+1` → `p[r+1] - p[l]`. Writing `p[r] - p[l]` is the classic bug.
- Integer overflow in C/C++/Java — not an issue in Python but worth noting when porting.
- 2D prefix: forgetting the `+ p[r1][c1]` inclusion-exclusion term.
- "Subarray sum = K" with positives *and* sliding window → wrong (sum isn't monotone). Must use prefix + hash.
- Counting *first occurrence* vs *all occurrences* — "longest subarray summing to K" stores first index; "number of subarrays summing to K" stores counts.

### Real-world uses

- **Time-series range aggregates** — precomputed cumulative metrics for O(1) range queries in dashboards.
- **Image integral images (summed-area tables)** — Viola-Jones face detection, box filters.
- **OLAP cube materialization** — cumulative sums over dimensions.
- **Financial cumulative returns** — `prefix_product` of `(1+r)`.
- **Checkpointed log replay** — difference arrays to batch range mutations.

### When *not* to use

- Array is being mutated between queries — switch to Fenwick or segment tree.
- Aggregate isn't invertible (min/max over arbitrary range) — use sparse table (idempotent ops) or segment tree.
- You only need the total once — no need to build a prefix array.

## See Also

- [`sliding-window.md`](sliding-window.md) — faster when constraint is monotone.
- [`../../data-structures/specialized/fenwick-tree.md`](../../data-structures/specialized/fenwick-tree.md) — dynamic prefix sums.
- [`../../data-structures/specialized/segment-tree.md`](../../data-structures/specialized/segment-tree.md) — dynamic range queries for non-invertible aggregates.
- [`../../data-structures/hash-based/hash-tables.md`](../../data-structures/hash-based/hash-tables.md) — prefix-sum + hash pattern.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
