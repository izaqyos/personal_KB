# Minimum Spanning Tree (MST)

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

- Undirected weighted graph — connect all vertices with minimum total edge weight.
- Useful as preprocessing: cluster merging (single-linkage hierarchical clustering = Kruskal's stopping early), approximate TSP lower bound (Christofides uses MST).
- Cable/pipe/network layout that minimizes length.
- Maze generation (randomized MST variants).

## Interview View

### Kruskal's — sort edges + union-find

```python
class UF:
    def __init__(self, n):
        self.p = list(range(n)); self.r = [0]*n
    def find(self, x):
        while self.p[x] != x:
            self.p[x] = self.p[self.p[x]]
            x = self.p[x]
        return x
    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb: return False
        if self.r[ra] < self.r[rb]: ra, rb = rb, ra
        self.p[rb] = ra
        if self.r[ra] == self.r[rb]: self.r[ra] += 1
        return True

def kruskal(n, edges):
    edges.sort(key=lambda e: e[2])
    uf = UF(n)
    total = 0; picked = []
    for u, v, w in edges:
        if uf.union(u, v):
            total += w
            picked.append((u, v, w))
            if len(picked) == n - 1: break
    return total if len(picked) == n - 1 else -1, picked
```

`O(E log E)` dominated by the sort. Clean, disconnected-component-aware.

### Prim's — grow from a seed using a heap

```python
import heapq
from collections import defaultdict

def prim(n, edges):
    g = defaultdict(list)
    for u, v, w in edges:
        g[u].append((w, v)); g[v].append((w, u))
    in_tree = [False] * n
    heap = [(0, 0)]
    total = 0; count = 0
    while heap and count < n:
        w, u = heapq.heappop(heap)
        if in_tree[u]: continue
        in_tree[u] = True
        total += w
        count += 1
        for ew, v in g[u]:
            if not in_tree[v]:
                heapq.heappush(heap, (ew, v))
    return total if count == n else -1
```

`O(E log V)` with binary heap. Good when graph is dense and represented by adjacency lists.

### Classic problems

| Problem | Fit |
|---|---|
| Minimum Spanning Tree | Kruskal / Prim |
| Connecting Cities with Minimum Cost | Kruskal |
| Min Cost to Connect Points (Manhattan grid) | Prim with `O(n²)` dense edge set |
| Critical / Pseudo-critical Edges (LeetCode 1489) | Kruskal with forced-in / forced-out edge |
| Maze generation | randomized Kruskal / Prim |
| Single-linkage clustering | Kruskal (stop after k-1 unions) |

## Reference View

### Why MSTs are "easy" — matroid structure

The MST problem is a special case of "find a max-weight independent set in a matroid" (edges, with independence = acyclic). Greedy on sorted weights is optimal for any matroid — this is the exchange-argument theorem that makes Kruskal's correctness immediate.

### Cut property (used by Prim's)

For any cut `(S, V\S)`, the minimum-weight edge crossing the cut is in some MST. Prim's exploits this: "add the cheapest edge leaving the current tree."

### Cycle property (used by Kruskal's)

The heaviest edge in any cycle is never in an MST. Kruskal's implicitly uses this: it skips any edge that would form a cycle.

### Algorithm comparison

| | Kruskal | Prim (binary heap) | Prim (Fib heap) | Borůvka |
|---|---|---|---|---|
| Time | `O(E log E)` | `O(E log V)` | `O(E + V log V)` | `O(E log V)` |
| Space | `O(V + E)` | `O(V + E)` | `O(V + E)` | `O(V + E)` |
| Best for | sparse | dense (or when you want to grow from a seed) | theoretical | parallel |
| Disconnected | handles | grows one component | handles | handles |

### Borůvka's algorithm

Each round, every component picks its cheapest outgoing edge; all picked edges are added. `O(log V)` rounds, each `O(E)`. Good for parallelism — rounds are embarrassingly parallel over components.

### Randomized MST: near-linear

Karger-Klein-Tarjan (1995): `O(E)` expected time, not in textbooks. Usually not implemented; classical methods fast enough.

### Second-best MST

For each MST edge `e = (u, v)`: remove it, find the max-weight MST edge on the path between `u` and `v` in the remaining tree, swap. Binary lifting or link-cut tree for efficient path-max queries. Total `O(E log V)`.

### Complexity

| Algorithm | Time | Space |
|---|---|---|
| Kruskal | `O(E log E) = O(E log V)` | `O(V + E)` |
| Prim (binary heap) | `O(E log V)` | `O(V + E)` |
| Prim (Fibonacci heap) | `O(E + V log V)` | `O(V + E)` |
| Borůvka | `O(E log V)` | `O(V + E)` |

### Pitfalls

- **Negative weights are fine** for MST — no shortest-path issues.
- **Disconnected graph** — Kruskal returns a spanning forest, but the problem may want "no answer"; check `count == n - 1`.
- **Duplicate edges / multigraph** — MST doesn't care; min-weight edge wins.
- **Directed graph** — MST is undefined; use arborescence (Edmonds' algorithm for minimum spanning arborescence).
- **Prim without tracking in_tree** — you'll process the same vertex twice and pay more.
- **Tie-breaking** — MST isn't unique if there are tied weights; don't assume a specific MST.

### Real-world uses

- **Network design** — minimize total cable / fiber length. Classic backbone-topology problem.
- **Hierarchical clustering** — single-linkage clustering = Kruskal stopped at `k` components.
- **Image segmentation** — graph-based (Felzenszwalb-Huttenlocher) uses MST-like edge-weight hierarchy.
- **Approximation for TSP (Christofides)** — MST + matching on odd-degree vertices.
- **Maze generation** — randomized MST produces a perfect maze.
- **Circuit layout / PCB routing** — Steiner trees, related to MST.
- **Astronomy — MST of galaxy distributions** to identify filaments in cosmic web.
- **Phylogenetics** — MST-based tree approximations.

### When *not* to use

- Directed graph with directional cost → minimum spanning arborescence / Chu-Liu-Edmonds.
- You need *shortest* path, not spanning tree — different algorithm.
- Steiner tree (some vertices optional) — NP-hard; use approximation.
- Online streaming updates — MST under edge insertions uses link-cut trees, rare.

## See Also

- [`shortest-path.md`](shortest-path.md) — different problem, different algorithms.
- [`connectivity-scc.md`](connectivity-scc.md) — MST on subgraphs.
- [`../../data-structures/sets-and-disjoint/disjoint-set.md`](../../data-structures/sets-and-disjoint/disjoint-set.md) — underlying DS for Kruskal.
- [`../../data-structures/trees/heap.md`](../../data-structures/trees/heap.md) — underlying DS for Prim.
- [`../paradigms/greedy.md`](../paradigms/greedy.md) — MST as a matroid.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
