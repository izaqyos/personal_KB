# Meet in the Middle

- **Source:** distilled from CP patterns
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

- Brute force is `O(2^n)` but `n` is "medium" (≈ 30–40) — too big for plain exponential, too small for polynomial DP.
- You can split the input into two halves, enumerate each half independently, then combine.
- Typical signals: subset sum with `n ≤ 40`, k-sum on large arrays (4-sum variant), knapsack with huge weights but few items.

The trick: split `n` items into two halves of `n/2`. Enumerate all `2^{n/2}` subsets of each half (that's ~10⁶ for `n=40`). Combine by sorting/hashing one half and querying from the other — total `O(2^{n/2} * log(2^{n/2}))`.

## Interview View

### Template — subset sum (does any subset sum to `T`?)

```python
from itertools import combinations

def subset_sum_exists(nums, target):
    n = len(nums)
    half = n // 2
    left, right = nums[:half], nums[half:]

    def all_sums(arr):
        sums = []
        for r in range(len(arr) + 1):
            for combo in combinations(arr, r):
                sums.append(sum(combo))
        return sums

    # Alt. same idea, iterative:
    def all_sums_bitmask(arr):
        m = len(arr)
        out = [0] * (1 << m)
        for mask in range(1, 1 << m):
            low = mask & -mask
            idx = low.bit_length() - 1
            out[mask] = out[mask ^ low] + arr[idx]
        return out

    left_sums = set(all_sums_bitmask(left))
    for s in all_sums_bitmask(right):
        if target - s in left_sums:
            return True
    return False
```

### Template — count subsets summing to `T` (sorted + two-pointer combine)

```python
def count_subset_sum(nums, target):
    mid = len(nums) // 2
    def all_sums(a):
        s = [0]
        for x in a:
            s += [v + x for v in s]
        return s
    L = sorted(all_sums(nums[:mid]))
    R = sorted(all_sums(nums[mid:]))
    # Count pairs (l, r) with L[l] + R[r] == target
    i, j = 0, len(R) - 1
    count = 0
    while i < len(L) and j >= 0:
        s = L[i] + R[j]
        if s == target:
            # count blocks of equal L[i] and R[j]
            cl = 1
            while i + 1 < len(L) and L[i+1] == L[i]:
                i += 1; cl += 1
            cr = 1
            while j - 1 >= 0 and R[j-1] == R[j]:
                j -= 1; cr += 1
            count += cl * cr
            i += 1; j -= 1
        elif s < target:
            i += 1
        else:
            j -= 1
    return count
```

### Classic problems

| Problem | How MITM helps |
|---|---|
| Subset Sum / Partition Equal Sum (`n ≤ 40`) | split in half, hash one side |
| 4-Sum with distinct arrays | enumerate pairs from left two, look up negation from right two |
| Number of subsets with value within `[lo, hi]` | split, for each `s` in one half binary-search the range in the other |
| Closest pair of subset sums to target | split, sort, two-pointer combine |
| Split array into two subsets minimizing `|S1 - S2|` (`n ≤ 40`) | split, find closest pair summing to `total/2` |

## Reference View

### Why it works

Brute-force subset sum is `O(2^n)`. Meet-in-the-middle replaces that with:

- Enumerate all `2^{n/2}` subset sums of each half: `O(2^{n/2})` total (or with bitmask trick).
- Combine: either hash (`O(2^{n/2})` amortized) or sort + two-pointer (`O(2^{n/2} * n)` for the sort).

Total: `O(n * 2^{n/2})`. For `n=40`, that's ~40 × 10⁶ ≈ feasible. For `n=60`, no longer — 2³⁰ = 10⁹ blows memory and time.

### Variants

- **Hash-based combine** — unordered equality ("exists?"), `O(2^{n/2})` expected.
- **Sorted + binary search** — range queries ("sums in `[lo, hi]`?"), `O(2^{n/2} log 2^{n/2})`.
- **Sorted + two-pointer** — exact target matching, linear after sort.
- **Multi-way split** — occasionally you split into 3 or more pieces to meet memory budget.

### Complexity

| Operation | Cost |
|---|---|
| enumerate all subset sums of one half | `O(2^{n/2})` |
| combine (hash) | `O(2^{n/2})` expected |
| combine (sort + binary search) | `O(n · 2^{n/2})` |
| memory | `O(2^{n/2})` |

For `n=40`: `2^{20}` ≈ 10⁶ — comfortable.
For `n=60`: `2^{30}` ≈ 10⁹ — usually out of memory.

### Pitfalls

- **Memory is often the binding constraint**, not time. `2^{20}` ints = ~8 MB; `2^{25}` = ~256 MB; `2^{30}` blows up.
- Counting duplicates wrong in "count pairs" variants — need block-counts on tie.
- Unbalanced split can hurt — split as evenly as possible.
- Including the empty subset when the problem wants non-empty (off-by-one).
- Overflow when sums are big — Python is fine; in C++ need `int64`.

### Real-world uses

- **Cryptography — birthday attacks on hash functions** (meet-in-the-middle attack on 2DES, for instance): generate half the keyspace forward, half backward, hash-match.
- **Password-cracking with rainbow tables** — precompute chains meeting in the middle.
- **Chess / game endgame databases** — bidirectional search meeting at common states.
- **Route planning with bidirectional Dijkstra** — two searches meet in the middle, explored space ~`sqrt` of one-directional.

### When *not* to use

- `n` is small enough that naive works.
- `n > 50–60` — memory won't fit.
- Problem has polynomial-time DP (e.g., knapsack with small weights).
- State doesn't factor into independent halves (sums do; many DP states don't).

## See Also

- [`../paradigms/divide-and-conquer.md`](../paradigms/divide-and-conquer.md) — MITM is a flavor of D&C for the search space, not the input.
- [`../searching/binary-search.md`](../searching/binary-search.md) — combine step often uses it.
- [`../dp-patterns/knapsack.md`](../dp-patterns/knapsack.md) — when weights are small, prefer DP.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
