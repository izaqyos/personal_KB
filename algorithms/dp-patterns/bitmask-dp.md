# Bitmask DP

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

- Small universe (typically `n ≤ 20-22`); you need to track "which subset" as state.
- Common shapes:
  - **TSP / shortest Hamiltonian path** — `dp[mask][v]` = min cost to visit set `mask` ending at `v`.
  - **Assignment problem** — assign jobs to workers optimally.
  - **Counting orderings / colorings with constraints**.
  - **Subset-sum enumeration with memoization**.

Feasibility bound: `2^n · n` states × `n` transitions → `2^n · n²`. For `n=20` that's ~4·10⁸ — tight but doable.

## Interview View

### Template — TSP (shortest Hamiltonian cycle)

```python
def tsp(dist, start=0):
    n = len(dist)
    INF = float('inf')
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1 << start][start] = 0
    for mask in range(1 << n):
        for u in range(n):
            if dp[mask][u] == INF or not (mask & (1 << u)):
                continue
            for v in range(n):
                if mask & (1 << v):    # already visited
                    continue
                nm = mask | (1 << v)
                if dp[mask][u] + dist[u][v] < dp[nm][v]:
                    dp[nm][v] = dp[mask][u] + dist[u][v]
    full = (1 << n) - 1
    return min(dp[full][u] + dist[u][start] for u in range(n))
```

### Template — assignment problem (min-cost bipartite matching, small `n`)

```python
def assignment(cost):
    """cost[i][j] = cost of assigning worker i to job j. Returns min total cost."""
    n = len(cost)
    INF = float('inf')
    dp = [INF] * (1 << n)
    dp[0] = 0
    for mask in range(1 << n):
        if dp[mask] == INF: continue
        i = bin(mask).count('1')    # next worker to assign
        if i == n: continue
        for j in range(n):
            if not (mask & (1 << j)):
                nm = mask | (1 << j)
                if dp[mask] + cost[i][j] < dp[nm]:
                    dp[nm] = dp[mask] + cost[i][j]
    return dp[(1 << n) - 1]
```

Interpretation: `mask` = set of jobs already assigned; `i = popcount(mask)` = which worker comes next. Always assigning workers in fixed order avoids double-counting.

### Iterate all subsets of a mask (useful for partition DPs)

```python
# Enumerate all submasks of `mask`
sub = mask
while sub:
    # process `sub`
    sub = (sub - 1) & mask
# don't forget sub == 0 if needed
```

Sum of submasks over all masks is `O(3^n)` — foundational for "partition into groups" DPs.

### Classic problems

| Problem | Bitmask meaning |
|---|---|
| Traveling Salesman | set of visited cities |
| Assignment Problem | set of assigned jobs |
| Shortest Superstring | set of included strings |
| Minimum Cost to Connect Sticks | set of remaining sticks |
| Stickers to Spell a Word | set of letters still needed |
| Partition to K equal subsets | subsets whose sum = target |
| Can I Win (game theory) | set of used integers |
| Parallel Courses II | set of completed courses |

## Reference View

### State size and transitions

| State | Size | Transitions | Total |
|---|---|---|---|
| `dp[mask]` | `2^n` | `O(n)` per mask | `O(2^n · n)` |
| `dp[mask][v]` (TSP-like) | `2^n · n` | `O(n)` per | `O(2^n · n²)` |
| `dp[mask][sum_info]` | explodes | — | limited to small extras |

### Enumerating submasks

```python
sub = mask
while True:
    # process sub
    if sub == 0: break
    sub = (sub - 1) & mask
```

Why `(s-1) & mask` works: subtracting 1 flips the lowest set bit and the ones below; AND with `mask` reconfines to the mask's bits.

Total work across all masks = `Σ 2^{popcount(m)} = 3^n`. So subset-over-mask DPs are `O(3^n)` — feasible up to `n ≈ 18-20`.

### SOS (Sum Over Subsets) DP

Given `f[S]`, compute `g[S] = Σ_{T ⊆ S} f[T]` in `O(n · 2^n)` instead of `O(3^n)`:

```python
def sos_dp(f, n):
    g = f[:]  # copy
    for i in range(n):
        for mask in range(1 << n):
            if mask & (1 << i):
                g[mask] += g[mask ^ (1 << i)]
    return g
```

Used for counting subset aggregates, inclusion-exclusion variants, etc.

### Bit tricks

- Low bit: `mask & -mask`.
- Pop low bit: `mask & (mask - 1)`.
- Set `i`-th bit: `mask | (1 << i)`.
- Unset: `mask & ~(1 << i)`.
- Check: `mask >> i & 1`.
- Popcount: `bin(mask).count('1')` (or `mask.bit_count()` in Py 3.10+).

### Complexity

| Problem | Time |
|---|---|
| TSP / Hamiltonian | `O(2^n · n²)` |
| Assignment | `O(2^n · n)` |
| SOS DP | `O(n · 2^n)` |
| Submask iteration | `O(3^n)` |
| Partition into K equal subsets | `O(2^n · n)` |

For `n=20`, `2^20 = 10^6`; times `n = 20`, that's `2·10^7` — fast.
For `n=22`, `4·10^6 * 22 ≈ 10^8` — borderline.

### Pitfalls

- **n too big** — `2^24` is already 16M states, each needing more computation. Always check `n ≤ ~22`.
- **Forgetting to check `mask & (1 << u)`** before transitioning from `u` — you'd transition from unvisited nodes.
- **Integer overflow** — Python fine; in C/C++ `long long` needed for `2^n * max_cost`.
- **Wrong DP dimension** — "which next to pick" can sometimes be derived from `popcount(mask)` (as in assignment), saving an index.
- **Iteration order** — in TSP, iterate `mask` ascending; smaller masks feed larger ones.

### Real-world uses

- **Mask-based scheduling** — which machines are busy, which tasks done.
- **Traveling salesman / vehicle routing** with ≤20 stops — bitmask DP gives exact optimum.
- **Chip layout — small module placement** (block-based) for low module counts.
- **Bioinformatics — small-scale motif enumeration** over a set of positions.
- **Puzzle solvers** — state = bitmask of occupied cells (e.g., polyomino packing for small boards).
- **Compilers — instruction scheduling** with small window DPs using bitmask of available registers.
- **Distributed consensus — set of acknowledged nodes** encoded as bitmask (small cluster).
- **Game AI — "which cards / units have moved"** when state-space is tight.

### When *not* to use

- `n > ~22` — `2^n` blows up.
- State requires more than "set of visited" — may need mask + additional dimension, exploding state.
- Problem has polynomial-time structure (graph is a tree, input has extra structure) — exploit it instead.
- You need all optima / enumerate all subsets in the answer — may need branch-and-bound.

## See Also

- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../patterns/meet-in-the-middle.md`](../patterns/meet-in-the-middle.md) — alternative for `n = 40`.
- [`../number-theory/bit-manipulation.md`](../number-theory/bit-manipulation.md) — bit tricks catalog.
- [`dp-on-dag.md`](dp-on-dag.md) — state graph framing.
- [`../graph/shortest-path.md`](../graph/shortest-path.md) — for non-bitmask variants.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
