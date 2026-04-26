# Interval DP (Matrix Chain / Burst Balloons)

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

- You have a sequence, and you're choosing how to **split** or **combine** intervals to minimize/maximize total cost.
- The choice at each interval is "pick a split point `k` in `[l, r]`."
- Typical indicator: `dp[l][r] = min/max over k in [l,r] of (dp[l][k] + dp[k+1][r] + combine_cost(l, k, r))`.

Classic members: matrix-chain multiplication, burst balloons, optimal BST, palindrome partitioning (min cuts).

## Interview View

### Matrix Chain Multiplication

Given dimensions `p[0], p[1], ..., p[n]` (so matrix `M_i` has dims `p[i-1] × p[i]`), find the minimum number of scalar multiplications to compute the product.

```python
def matrix_chain(p):
    n = len(p) - 1  # number of matrices
    dp = [[0]*n for _ in range(n)]
    for length in range(2, n + 1):          # interval length
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]
                if cost < dp[i][j]:
                    dp[i][j] = cost
    return dp[0][n-1]
```

### Burst Balloons

Given balloons with values; bursting balloon `i` yields `nums[i-1] * nums[i] * nums[i+1]`. Find max coins when bursting in the best order.

```python
def max_coins(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0]*n for _ in range(n)]
    for length in range(2, n):
        for l in range(0, n - length):
            r = l + length
            for k in range(l + 1, r):
                dp[l][r] = max(dp[l][r],
                    dp[l][k] + dp[k][r] + nums[l]*nums[k]*nums[r])
    return dp[0][n-1]
```

Trick: instead of "which balloon to burst first," think **"which balloon to burst last in the interval."** When `k` is last in `(l, r)`, its neighbors at burst time are exactly `l` and `r` (all others in between have already been burst).

### Palindrome Partitioning — Min Cuts

```python
def min_cut(s):
    n = len(s)
    pal = [[False]*n for _ in range(n)]
    for i in range(n):
        for j in range(i+1):
            if s[i] == s[j] and (i - j < 2 or pal[j+1][i-1]):
                pal[j][i] = True
    cuts = [0]*n
    for i in range(n):
        if pal[0][i]:
            cuts[i] = 0
        else:
            cuts[i] = float('inf')
            for j in range(1, i+1):
                if pal[j][i]:
                    cuts[i] = min(cuts[i], cuts[j-1] + 1)
    return cuts[-1]
```

### Optimal BST

Given sorted keys with frequencies, find the BST structure minimizing expected search cost. Same shape: `dp[i][j] = min over root r of (dp[i][r-1] + dp[r+1][j]) + freq_sum(i, j)`.

### Classic problems

| Problem | Choice |
|---|---|
| Matrix Chain Multiplication | last multiplication to do |
| Burst Balloons | last balloon in interval |
| Palindrome Partitioning (min cuts) | first palindrome prefix cut |
| Optimal BST | root of subtree |
| Remove Boxes (hard) | `dp[l][r][k]` — count of equal suffix extending `r` |
| Strange Printer | partitioning + "printing through" equal characters |
| Minimum Cost to Cut a Stick | cut chosen last in interval |
| Polygon triangulation minimum weight | triangulating via interior edges |

## Reference View

### Canonical interval DP recurrence

```
dp[l][r] = min/max over k in (l, r) of (
    dp[l][k] + dp[k+1][r] + cost(l, k, r)
)
```

Iterate by **interval length** from small to large. Smaller intervals feed larger ones.

### Choosing the "last operation in the interval"

For problems like Burst Balloons, the naive "first to burst" formulation doesn't decompose cleanly — after the first burst, the remaining balloons' neighbors depend on history. The **last to burst** formulation does decompose: left and right subintervals become independent because they are processed *before* `k`, when neighbors are still `l` and `r`.

### Knuth's optimization (matrix-chain-like)

For some interval DPs, the optimal split point is monotone: `opt(l, r-1) ≤ opt(l, r) ≤ opt(l+1, r)`. Using this, the cubic `O(n³)` becomes `O(n²)`. Applies when quadrangle inequality `w(a,c) + w(b,d) ≤ w(a,d) + w(b,c)` holds.

### Complexity

| Problem | Time | Space |
|---|---|---|
| Matrix chain | `O(n³)` | `O(n²)` |
| Burst balloons | `O(n³)` | `O(n²)` |
| Optimal BST | `O(n³)` — or `O(n²)` with Knuth | `O(n²)` |
| Palindrome min cuts | `O(n²)` | `O(n²)` |

### Reconstructing the optimal split tree

Keep `split[l][r]` = best `k` for interval `[l, r]`. Recurse:

```python
def print_parenthesization(split, l, r):
    if l == r:
        return f"M{l}"
    k = split[l][r]
    return f"({print_parenthesization(split, l, k)} × {print_parenthesization(split, k+1, r)})"
```

### Pitfalls

- **Iterating by `i, j` instead of by `length`** — smaller intervals must be ready before larger. Len-first loop is the cleanest guarantee.
- **Wrong boundary** — for burst balloons, the sentinels `[1] + nums + [1]` are key; forgetting them breaks the recurrence.
- **Choosing "first operation" framing** when "last" decomposes better.
- **Forgetting base cases** — `dp[i][i]` is 0 or 1 depending on problem.
- **O(n³) TLE** on `n = 10^3`+ — look for Knuth optimization, SMAWK, or divide-and-conquer DP.

### Real-world uses

- **Query optimization in databases** — optimal join order is an interval-DP shape (also tree-DP on join graph). CMU / Selinger's dynamic programming for join ordering is the classic.
- **Compilers — optimal code selection via dynamic programming on expression trees** — tree-DP cousin.
- **Bioinformatics — RNA secondary structure prediction (Nussinov)** — interval DP.
- **Natural language parsing (CYK)** — interval DP over the input sentence.
- **Minimum cost for polygon triangulation** in computer graphics.
- **Vectorized matrix multiplication cost estimation** in GPU kernel compilers.

### When *not* to use

- Choice isn't "pick a split point" — different DP shape.
- Problem decomposes into independent halves without a cost at the split — D&C without DP.
- State space is larger than `O(n²)` intervals — maybe tree DP or bitmask DP.

## See Also

- [`knapsack.md`](knapsack.md) — different DP shape.
- [`dp-on-trees.md`](dp-on-trees.md) — interval-DP cousin for hierarchical data.
- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../paradigms/divide-and-conquer.md`](../paradigms/divide-and-conquer.md) — when splits don't have overlap.
- [`../strings/`](../strings/) — related sequence DPs.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
