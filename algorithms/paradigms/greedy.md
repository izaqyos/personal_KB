# Greedy

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

- At each step, one locally optimal choice can be proven to lead to a globally optimal solution.
- The problem has a **matroid** structure, or you can prove correctness with an **exchange argument** or **induction**.
- Signals: sort-by-something then scan, pick-smallest-first / pick-biggest-first, event-driven choices.

**Greedy's Achilles' heel:** it's fast and clean when it works, but *proving* it works is the hard part. Many "obviously greedy" problems are actually DP.

## Interview View

### Template — sort + scan

```python
def max_intervals_no_overlap(intervals):
    """Max number of non-overlapping intervals. Classic: sort by end time."""
    intervals.sort(key=lambda x: x[1])
    count = 0
    cur_end = float('-inf')
    for s, e in intervals:
        if s >= cur_end:
            count += 1
            cur_end = e
    return count
```

**Why it works (exchange argument):** Any optimal solution's first chosen interval can be swapped with the one ending earliest — the swap doesn't break feasibility (next interval still fits after the earlier-ending one) and doesn't lose any intervals.

### Template — priority queue (Huffman-style)

```python
import heapq

def huffman_cost(freqs):
    """Sum of weighted path lengths of an optimal prefix code."""
    heap = list(freqs)
    heapq.heapify(heap)
    total = 0
    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        s = a + b
        total += s
        heapq.heappush(heap, s)
    return total
```

### Template — fractional knapsack

```python
def fractional_knapsack(items, cap):
    """items: list of (value, weight). Returns max value."""
    items.sort(key=lambda iw: iw[0] / iw[1], reverse=True)
    total = 0.0
    for v, w in items:
        if cap >= w:
            total += v; cap -= w
        else:
            total += v * (cap / w); break
    return total
```

(Note: 0/1 knapsack is **not** greedy-solvable — that's DP.)

### Classic problems

| Problem | Strategy | Proof style |
|---|---|---|
| Activity Selection / Meeting Rooms | sort by end, pick earliest-ending | exchange |
| Huffman coding | combine two smallest | optimal substructure + exchange |
| Dijkstra | pick closest unvisited | cut property |
| Prim's / Kruskal's MST | lightest edge that doesn't form cycle | cut property / matroid |
| Jump Game | furthest reachable so far | induction |
| Gas Station | start after any deficit prefix | invariant |
| Task Scheduler with cooldown | most-frequent first | frequency argument |
| Candy (ratings) | two sweeps | invariant |
| Minimum Platforms / Merge Intervals | sort by start | sweep |
| Fractional Knapsack | value/weight ratio | exchange |
| Gas up to hit target | furthest-reachable max-heap | exchange |

## Reference View

### Proving a greedy is correct

Three standard techniques:

1. **Greedy-stays-ahead.** Show that at every step, your greedy's partial solution is at least as good as any optimal's partial solution. Activity selection: after `k` picks, your chosen intervals end no later than any other `k`-size solution's.

2. **Exchange argument.** Start from any optimal solution; swap one of its choices with greedy's; show the solution stays feasible and at least as good. Repeat until you reach greedy's solution.

3. **Matroid theorem.** If the problem's feasible sets form a matroid, the greedy that picks the largest-weight independent element always gives optimum. MST is the canonical matroid.

Without *one of these*, you don't have proof — you have hope. Write small test cases with structure (powers of 2, adversarial ratios) to try to break a suspected greedy.

### Variants

- **Exchange-argument greedy** — activity selection, scheduling.
- **Priority-queue greedy** — Huffman, Dijkstra, minimum platforms.
- **Two-pass greedy** — Candy (ratings), array rotations.
- **Greedy on sorted** — fractional knapsack, coin change with standard denominations.
- **Regret-based greedy** — "add the best you can now; revise later if you regret it" (e.g., Prim's with decrease-key).

### Greedy vs DP: how to tell

| Question | Greedy | DP |
|---|---|---|
| Is the "locally best" provably globally best? | yes | no |
| Does a choice at step `i` change what's optimal at step `i+1`? | no | yes |
| Counting problem (number of ways)? | rare | usual |
| Matroid structure? | yes (Kruskal) | no |

The classic trap: **coin change** with arbitrary denominations is DP; with "standard" coin systems (1, 5, 10, 25), greedy works. Problem phrasing matters.

### Complexity

Usually `O(n log n)` — dominated by a sort or a heap. Two notable exceptions:

- Dijkstra with binary heap: `O((V+E) log V)`.
- Prim's with Fibonacci heap: `O(E + V log V)` (theoretical best).

### Pitfalls

- **Assuming greedy works without a proof.** For "coin change ways," greedy is plausible and wrong. Test edge cases.
- **Wrong sort key.** Activity selection by start time fails; by end time works.
- **Ties.** Your greedy may produce different answers depending on tie-break; the correct answer may *require* a specific tie-break.
- **Updating state after a choice.** Forgetting to advance `cur_end`, forgetting to decrement capacity, etc. — sounds trivial, trips people.
- **Greedy on a global constraint.** If your choice at step `i` affects future feasibility in non-obvious ways (e.g., "pick K elements with sum ≤ B, maximize product"), greedy usually fails.

### Real-world uses

- **Network routing (Dijkstra/OSPF)** — shortest-path as greedy.
- **Scheduling at OS level** — shortest-job-first, earliest-deadline-first.
- **Compiler register allocation** — linear-scan allocator is greedy.
- **Compression — Huffman codes** in zlib/gzip.
- **Load balancing — join-the-shortest-queue and power-of-two-choices** (approximate greedy).
- **Greedy string matching** — Z-algorithm, KMP (indirectly).
- **Approximation algorithms for NP-hard problems** — set cover (`ln n` approx), vertex cover (2-approx).

### When *not* to use

- You can't produce a proof and you have counterexamples.
- Problem requires counting / all solutions / full optimization over interacting choices → DP.
- State space is discrete but has complex feasibility coupling → backtracking with pruning.

## See Also

- [`dynamic-programming.md`](dynamic-programming.md) — when greedy isn't enough.
- [`divide-and-conquer.md`](divide-and-conquer.md) — "combine step" vs "choice step."
- [`approximation.md`](approximation.md) — greedy is the backbone of many approx algorithms.
- [`../graph/shortest-path.md`](../graph/shortest-path.md) — Dijkstra.
- [`../graph/mst.md`](../graph/mst.md) — Prim / Kruskal.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
