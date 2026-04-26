# Knapsack DP

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

- Bounded resource (capacity, budget, time) and a set of items each with a "cost" and "value."
- Choose a subset (or multiset) maximizing value subject to capacity.
- Variants: each item at most once (0/1), each unlimited (unbounded), each with bounded count.
- Generalizes to **subset sum** (decision), **partition into two equal subsets**, **target sum** (signed choices), **multi-dimensional** (weight + volume).

Pseudo-polynomial: time is `O(n · W)` — polynomial in `n` and the *value* `W` of capacity (not its bit length). For small `W`, it's fast.

## Interview View

### 0/1 Knapsack (each item at most once)

```python
def knapsack_01(weights, values, cap):
    n = len(weights)
    dp = [0] * (cap + 1)
    for i in range(n):
        # Iterate capacity in reverse so each item is used at most once.
        for c in range(cap, weights[i] - 1, -1):
            dp[c] = max(dp[c], dp[c - weights[i]] + values[i])
    return dp[cap]
```

### Unbounded Knapsack (each item any number of times)

```python
def knapsack_unbounded(weights, values, cap):
    dp = [0] * (cap + 1)
    for c in range(1, cap + 1):
        for w, v in zip(weights, values):
            if c >= w:
                dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]
```

Order of loops doesn't matter for correctness (any order works) but affects counting problems — see below.

### Bounded Knapsack (item `i` at most `k_i` times) — binary decomposition

```python
def knapsack_bounded(weights, values, counts, cap):
    # Decompose item with count k into log(k) "virtual items" of sizes 1,2,4,...
    vw, vv = [], []
    for w, v, k in zip(weights, values, counts):
        power = 1
        while power <= k:
            vw.append(w * power); vv.append(v * power)
            k -= power; power *= 2
        if k > 0:
            vw.append(w * k); vv.append(v * k)
    return knapsack_01(vw, vv, cap)
```

### Subset sum (decision)

```python
def can_sum_to(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for c in range(target, x - 1, -1):
            dp[c] = dp[c] or dp[c - x]
    return dp[target]
```

### Number of ways (counting)

```python
def count_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:                  # coins outer, amount inner → combinations (order-free)
        for c in range(coin, amount + 1):
            dp[c] += dp[c - coin]
    return dp[amount]

def count_ordered(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in range(1, amount + 1):      # amount outer, coin inner → permutations
        for coin in coins:
            if c >= coin:
                dp[c] += dp[c - coin]
    return dp[amount]
```

The loop order is the whole difference between counting combinations and counting permutations.

### Partition equal subset sum

```python
def can_partition(nums):
    total = sum(nums)
    if total % 2: return False
    return can_sum_to(nums, total // 2)
```

### Classic problems

| Problem | Variant |
|---|---|
| 0/1 Knapsack (max value, cap W) | 0/1 |
| Coin Change (min coins / # ways) | unbounded or combinations |
| Partition Equal Subset Sum | subset sum |
| Target Sum (assign +/-) | reduced to subset sum |
| Last Stone Weight II | min `|S1-S2|` via subset sum |
| Ones and Zeroes | 2-D knapsack |
| Profitable Schemes | 2-D knapsack with profit threshold |
| Shopping Offers | bounded + grouped |
| Rod cutting | unbounded knapsack on rod pieces |

## Reference View

### Why iterate capacity in reverse for 0/1

The 1-D DP has `dp[c] = max(dp[c], dp[c-w]+v)`. If you iterate forward, `dp[c-w]` may have already been updated for this same item — effectively using the item twice (unbounded). Iterating backward guarantees `dp[c-w]` is from the previous item, so each item is used ≤1 time.

### 2-D knapsack

For two independent capacity dims (weight + volume, zeros + ones):

```python
def two_d_knapsack(items, cap1, cap2):
    dp = [[0] * (cap2 + 1) for _ in range(cap1 + 1)]
    for w1, w2, v in items:
        for c1 in range(cap1, w1 - 1, -1):
            for c2 in range(cap2, w2 - 1, -1):
                dp[c1][c2] = max(dp[c1][c2], dp[c1 - w1][c2 - w2] + v)
    return dp[cap1][cap2]
```

### Reconstructing the chosen items

Keep a 2-D `dp[i][c]` (don't compress) or a `chosen[i][c]` flag. Then backtrack:

```python
def choose_items(weights, values, cap):
    n = len(weights)
    dp = [[0]*(cap+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for c in range(cap+1):
            dp[i][c] = dp[i-1][c]
            if c >= weights[i-1]:
                dp[i][c] = max(dp[i][c], dp[i-1][c-weights[i-1]] + values[i-1])
    items = []
    c = cap
    for i in range(n, 0, -1):
        if dp[i][c] != dp[i-1][c]:
            items.append(i - 1)
            c -= weights[i-1]
    return items[::-1]
```

### Complexity summary

| Variant | Time | Space (compressed) |
|---|---|---|
| 0/1 | `O(nW)` | `O(W)` |
| Unbounded | `O(nW)` | `O(W)` |
| Bounded (binary decomp) | `O(W · Σ log k_i)` | `O(W)` |
| Counting | `O(nW)` | `O(W)` |
| 2-D | `O(n · W1 · W2)` | `O(W1 · W2)` |

### FPTAS for 0/1 Knapsack

When `W` is huge (exponential in `n`) but values are small: scale values by `ε`, run value-DP in `O(n² · V_max / ε)`. Solution is `(1-ε)`-approximate. See [`../paradigms/approximation.md`](../paradigms/approximation.md).

### Pitfalls

- **Wrong loop order** for 0/1 (forward instead of reverse) → silently becomes unbounded.
- **Wrong loop order** for counting combinations vs permutations.
- **Pseudo-polynomial** — an adversarial `W` (exponential in bit length) makes this slow. NP-hard means no true polynomial algorithm unless P=NP.
- **Negative weights or values** — classical knapsack assumes non-negatives. With negatives, the search space becomes effectively unbounded for counting variants.
- **Subtle off-by-ones** when `W=0` or item with `w=0` — can break `range(cap, w-1, -1)`.

### Real-world uses

- **Cloud capacity planning** — fit VMs of different sizes into host CPU/memory budget.
- **Portfolio optimization (discrete)** — pick investments with budget and score.
- **Ad-auction allocation** — maximize revenue subject to display inventory.
- **Cargo loading, container packing** — 2-D/3-D knapsack variants.
- **Build-system caching** — which artifacts to cache given disk budget and hit rate.
- **Coin problem in vending machines** — change-making.
- **Cryptography — subset sum used to be a basis (Merkle-Hellman cryptosystem; broken)**.

### When *not* to use

- `W` is huge and values are huge → genuinely NP-hard; use FPTAS or branch-and-bound.
- Items are continuous (fractional knapsack) → greedy by value/weight ratio.
- Constraints are non-linear in items — need integer programming.

## See Also

- [`coin-change.md`](coin-change.md) — closely related unbounded variants.
- [`lis-lcs.md`](lis-lcs.md) — another foundational DP.
- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../paradigms/approximation.md`](../paradigms/approximation.md) — FPTAS.
- [`../paradigms/greedy.md`](../paradigms/greedy.md) — fractional knapsack alternative.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
