# Dynamic Programming

- **Source:** distilled from CLRS + CP + LeetCode patterns
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

Two conditions must both hold:

1. **Optimal substructure** — answer to the full problem is built from answers to smaller subproblems of the same shape.
2. **Overlapping subproblems** — the same subproblem appears many times in a naive recursion. This is what makes memoization pay off (distinguishes DP from plain D&C).

If you can describe the problem as "at state `s`, make choice `c`, transition to state `s'`," and the same `s'` shows up many times, it's DP.

Signals: "count the number of ways," "maximize / minimize," constrained choices over a sequence or grid, monotone parameters (length, index, capacity, mask).

## Interview View

### The DP recipe (memorize this)

1. **Define state** — what parameters uniquely identify a subproblem? (index, capacity, mask, …)
2. **Write the recurrence** — how does `dp[state]` depend on smaller states?
3. **Identify the base case(s)** — what's the answer for the smallest state?
4. **Choose an order** — bottom-up (iterate smaller → bigger) or top-down with memoization.
5. **Reconstruct (if needed)** — parent pointers or backtrack the decisions.

### Template — top-down with memoization

```python
from functools import cache

def climb_stairs(n):
    @cache
    def dp(i):
        if i <= 1:
            return 1
        return dp(i - 1) + dp(i - 2)
    return dp(n)
```

`@cache` turns exponential recursion into linear time — you solve each `i` once.

### Template — bottom-up 1D

```python
def climb_stairs_bu(n):
    if n <= 1:
        return 1
    a, b = 1, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

### Template — 2D grid DP

```python
def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]
```

### Template — knapsack 0/1

```python
def knapsack(weights, values, cap):
    dp = [0] * (cap + 1)
    for w, v in zip(weights, values):
        for c in range(cap, w - 1, -1):  # reverse: each item used at most once
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]
```

### Template — LIS (`O(n log n)`)

```python
from bisect import bisect_left

def lis(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)
```

### Classic problems (catalog pointer to deeper files)

| Problem | Pattern | Link |
|---|---|---|
| Knapsack 0/1, Unbounded, Bounded | capacity DP | [`../dp-patterns/knapsack.md`](../dp-patterns/knapsack.md) |
| LIS, LCS, Edit Distance | sequence DP | [`../dp-patterns/lis-lcs.md`](../dp-patterns/lis-lcs.md) |
| Coin change (ways / min) | unbounded knapsack variants | [`../dp-patterns/coin-change.md`](../dp-patterns/coin-change.md) |
| Matrix chain / burst balloons | interval DP | [`../dp-patterns/matrix-chain.md`](../dp-patterns/matrix-chain.md) |
| DP on trees (rerooting) | tree DP | [`../dp-patterns/dp-on-trees.md`](../dp-patterns/dp-on-trees.md) |
| DP on DAG | topological + DP | [`../dp-patterns/dp-on-dag.md`](../dp-patterns/dp-on-dag.md) |
| TSP-like subset problems | bitmask DP | [`../dp-patterns/bitmask-dp.md`](../dp-patterns/bitmask-dp.md) |
| Digit DP (count numbers ≤ N with constraints) | digit DP | [`../dp-patterns/digit-dp.md`](../dp-patterns/digit-dp.md) |

## Reference View

### Identifying state

Good state = the minimum information that lets you describe the remaining subproblem. Examples:

- **Linear** — `dp[i]` = answer considering prefix up to `i`.
- **Linear + aux** — `dp[i][k]` = "prefix `i`, used `k` resources so far."
- **Interval** — `dp[l][r]` = answer for subarray `[l..r]`.
- **Subset/bitmask** — `dp[mask]` = best over a subset.
- **Tree** — `dp[v]` = answer rooted at `v`.
- **Grid + direction** — `dp[i][j][dir]`.
- **Digit** — `dp[pos][tight][other_flags]`.

If you can't state the recurrence in one line, the state is wrong.

### Top-down vs bottom-up

| | Top-down (memo) | Bottom-up (tabulation) |
|---|---|---|
| readability | close to the math | more alien |
| recursion limit | can stack-overflow | never |
| constant factor | overhead of function calls, dict lookups | tight loop, fast |
| partial computation | only computes states you hit | fills everything |
| space optimization | harder | easier (sliding window over `i`) |

Rule of thumb: top-down first to confirm correctness, then bottom-up if constants or memory matter.

### Space optimization

If `dp[i]` only depends on `dp[i-1]`, keep two rows or even a single updated array (with the right iteration order, as in knapsack). `O(n·W)` → `O(W)`.

### Reconstructing the solution

Keep a `parent[i]` table alongside `dp[i]` storing which choice was optimal. After computing `dp`, backtrack from the terminal state.

### Complexity sanity

| DP class | Typical states × transitions |
|---|---|
| Linear | `O(n)` × `O(1)` = `O(n)` |
| 1D with choices | `O(n)` × `O(n)` = `O(n²)` |
| Grid | `O(mn)` × `O(1)` = `O(mn)` |
| Interval | `O(n²)` × `O(n)` = `O(n³)` |
| Knapsack | `O(nW)` |
| Bitmask | `O(2^n · n)` |
| Digit | `O(len · states)` per number |
| Tree | `O(n)` with children merge (sometimes `O(n²)` naive) |

Before coding, multiply state-count × transition cost and sanity-check against input bounds.

### Pitfalls

- **Forgot base case** → infinite recursion or wrong answer at boundaries.
- **State too big** — forgetting to drop variables that don't affect the future.
- **Iteration order wrong in tabulation** — reading `dp[...]` you haven't written yet.
- **Counting vs optimizing** — `+=` for count DP, `max/min` for optimization. Mixing these creates subtle bugs.
- **Double counting** — in "number of ways" problems, ordering of choices. Knapsack-count needs items outer loop / capacity inner loop *exactly*.
- **Floating-point DP** — usually wrong (loss of precision across transitions); use fractions or rationals.
- **Overflow in counting** — Python is fine; elsewhere mod `10^9 + 7`.

### Real-world uses

- **Sequence alignment (bioinformatics)** — Needleman-Wunsch, Smith-Waterman: edit distance.
- **Speech / NLP decoding** — Viterbi is DP over HMM states.
- **Operations research** — inventory, scheduling, resource allocation.
- **Compilers — register allocation, instruction selection (tree DP on expression trees)**.
- **Game AI — minimax with memoization of positions**.
- **Finance — Bellman equations in option pricing and portfolio optimization**.
- **Networking — shortest path via Bellman-Ford is DP on edges**.

### When *not* to use

- Subproblems don't overlap → D&C is enough.
- A greedy choice is provably optimal (matroid structure, exchange argument) → greedy is simpler.
- State space is too large to memoize usefully → maybe approximation / heuristic search.

## See Also

- [`divide-and-conquer.md`](divide-and-conquer.md) — DP's cousin, no overlap.
- [`greedy.md`](greedy.md) — when a single choice suffices.
- [`../dp-patterns/`](../dp-patterns/) — every DP flavor in depth.
- [`../graph/shortest-path.md`](../graph/shortest-path.md) — Bellman-Ford / Floyd are DP.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
