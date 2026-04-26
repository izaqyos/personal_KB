# Matching

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

- Pair elements from two groups optimally: workers ↔ jobs, students ↔ dorms, ads ↔ slots.
- Bipartite matching: two disjoint groups, pair only across.
- Assignment: bipartite with weights, find minimum-cost perfect matching.
- General matching: pairs within a single set (blossom algorithm, complex).

Matching is a classic graph problem. Unweighted bipartite is `O(E√V)` (Hopcroft-Karp). Weighted bipartite (assignment) is `O(V³)` (Hungarian). General non-bipartite is `O(V³)` (Edmonds' blossom).

## Interview View

### Bipartite matching — augmenting paths (Hungarian-lite, simple DFS)

```python
from collections import defaultdict

def bipartite_match(n, m, edges):
    """n = left size, m = right size. Returns max matching size."""
    g = defaultdict(list)
    for u, v in edges:
        g[u].append(v)
    match_r = [-1] * m
    def try_kuhn(u, visited):
        for v in g[u]:
            if visited[v]: continue
            visited[v] = True
            if match_r[v] == -1 or try_kuhn(match_r[v], visited):
                match_r[v] = u
                return True
        return False
    result = 0
    for u in range(n):
        visited = [False] * m
        if try_kuhn(u, visited):
            result += 1
    return result
```

`O(V·E)` — fine for small-to-moderate graphs.

### Hopcroft-Karp (O(E√V), advanced)

Two phases per round: BFS to build a layered graph, then DFS to find multiple augmenting paths simultaneously. Benefits from vertex-disjoint augmentations.

```python
from collections import deque

def hopcroft_karp(adj, n, m):
    pair_u = [-1] * n
    pair_v = [-1] * m
    INF = float('inf')
    dist = [0] * n

    def bfs():
        q = deque()
        for u in range(n):
            if pair_u[u] == -1:
                dist[u] = 0; q.append(u)
            else:
                dist[u] = INF
        found = False
        while q:
            u = q.popleft()
            for v in adj[u]:
                p = pair_v[v]
                if p == -1:
                    found = True
                elif dist[p] == INF:
                    dist[p] = dist[u] + 1
                    q.append(p)
        return found

    def dfs(u):
        for v in adj[u]:
            p = pair_v[v]
            if p == -1 or (dist[p] == dist[u] + 1 and dfs(p)):
                pair_u[u] = v; pair_v[v] = u
                return True
        dist[u] = INF
        return False

    result = 0
    while bfs():
        for u in range(n):
            if pair_u[u] == -1 and dfs(u):
                result += 1
    return result
```

### Assignment problem — scipy Hungarian

```python
from scipy.optimize import linear_sum_assignment
import numpy as np

def min_cost_assignment(cost_matrix):
    cost = np.array(cost_matrix)
    row_ind, col_ind = linear_sum_assignment(cost)
    total = cost[row_ind, col_ind].sum()
    return total, list(zip(row_ind.tolist(), col_ind.tolist()))
```

For small instances (`n ≤ ~20`), bitmask DP ([`../dp-patterns/bitmask-dp.md`](../dp-patterns/bitmask-dp.md)) is simpler and runs in `O(2^n · n)`.

### Classic problems

| Problem | Algorithm |
|---|---|
| Bipartite max matching | Kuhn's / Hopcroft-Karp |
| Assignment problem (min cost) | Hungarian / bitmask DP |
| Job sequencing with deadlines | greedy or bipartite matching |
| Minimum vertex cover (bipartite) | König's theorem → max matching |
| Maximum independent set (bipartite) | complement of min vertex cover |
| Dominoes on grid with holes | bipartite matching on colored cells |
| Maximum weight matching (general) | blossom (rare in interviews) |

## Reference View

### König's theorem (bipartite)

In a bipartite graph:

```
|max matching| = |min vertex cover|
```

Constructive: find max matching; then min vertex cover = (right side matched) ∪ (left side unmatched and unreachable from unmatched-left via alternating paths). Powerful reduction for problems phrased as "min vertices hit all edges."

### Hall's theorem

A bipartite graph has a perfect matching on the left side iff for every subset `S` of the left, `|N(S)| ≥ |S|`. "Marriage theorem." Used to prove feasibility of matchings.

### Augmenting paths

Given a matching `M`, an **augmenting path** alternates between unmatched and matched edges, starting and ending at unmatched vertices. Flipping all edges along it increases `|M|` by one. Berge's theorem: `M` is maximum iff no augmenting path exists. Algorithms are essentially about finding such paths efficiently.

### Weighted matching (assignment problem)

Hungarian algorithm, `O(V³)`: maintain feasible potentials (dual variables); find augmenting path in tight edges (slack 0); update potentials to keep feasibility and create new tight edges. Equivalent to LP primal-dual.

### General matching (non-bipartite)

Edmonds' **blossom algorithm**: when augmenting paths hit odd cycles ("blossoms"), contract them. `O(V³)` or `O(V^{2.5}/√log V)` (Micali-Vazirani). Rare in interviews; Google/meta-scale production matching often uses bipartite anyway (or approximations).

### Complexity

| Problem | Algorithm | Time |
|---|---|---|
| Bipartite max matching | Kuhn | `O(V·E)` |
| Bipartite max matching | Hopcroft-Karp | `O(E√V)` |
| Assignment (weighted) | Hungarian | `O(V³)` |
| Assignment (small n) | bitmask DP | `O(2^n · n)` |
| General max matching | Blossom | `O(V³)` |
| Weighted general matching | Edmonds | `O(V³)` or `O(VE log V)` |

### Pitfalls

- **Forgetting bipartiteness check** — Kuhn's gives wrong answers on general graphs.
- **Dense bipartite with Kuhn** — `V·E` can be `V³` when `E = V²`. Switch to Hopcroft-Karp.
- **Counting assignment problem cost as max vs min** — negate to swap.
- **Hungarian on non-square** — pad with dummy nodes of cost 0 (or large cost) depending on problem.
- **Floating point in Hungarian** — use scaled integers if all weights are rational.
- **Confusing matching with flow** — bipartite matching reduces to max-flow; edge case: what counts as a valid match edge.

### Real-world uses

- **Ride-sharing (Uber/Lyft) driver-rider assignment** — min-cost bipartite matching at scale.
- **Ad auctions** — advertisers ↔ impression slots, bipartite matching with bid weights.
- **Hospital residency matching (NRMP)** — stable marriage / Gale-Shapley (related but not same).
- **Kidney exchange programs** — general matching with blossoms.
- **OR-tools at Google** — assignment for internal scheduling / shift planning.
- **Dating / matchmaking** — bipartite with preference scores.
- **School choice / college admissions** — stable matching variants.
- **Task allocation in distributed systems** — bin-packing / assignment hybrids.
- **Image matching (stereo/feature correspondence)** — bipartite on feature points.

### When *not* to use

- Decisions are independent (no conflicts) → just assign greedily.
- Number of elements is huge and you only need approximate matching — use locality-sensitive hashing, reservoir sampling.
- Preferences matter more than cost → stable matching (Gale-Shapley).
- You have temporal / streaming constraints → online matching algorithms (RANKING, etc.) instead of offline bipartite.

## See Also

- [`flows.md`](flows.md) — bipartite matching reduces to max-flow.
- [`shortest-path.md`](shortest-path.md) — augmenting-path search is often BFS.
- [`../paradigms/greedy.md`](../paradigms/greedy.md) — naive approaches when applicable.
- [`../dp-patterns/bitmask-dp.md`](../dp-patterns/bitmask-dp.md) — small assignment.
- [`connectivity-scc.md`](connectivity-scc.md) — bipartiteness preflight.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
