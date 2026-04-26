# Shortest Path Algorithms

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

- Find the shortest (or minimum-cost) path between vertices.
- Common variants by weight structure:
  - **Unweighted** → BFS.
  - **0/1 weights** → 0-1 BFS (deque).
  - **Non-negative** → Dijkstra.
  - **Negative allowed, no negative cycles** → Bellman-Ford.
  - **All pairs, dense** → Floyd-Warshall.
  - **DAG** → topological-order relaxation (handles negatives in `O(V+E)`).
  - **Heuristic available** → A*.

Practical cross-refs: [`../../data-structures/graph/graph-algorithms.md`](../../data-structures/graph/graph-algorithms.md) has the quick templates; this page is the variant/complexity/real-world deep dive.

## Interview View

### Dijkstra (non-negative weights)

```python
import heapq

def dijkstra(n, adj, src):
    dist = [float('inf')] * n
    dist[src] = 0
    heap = [(0, src)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue            # stale
        for v, w in adj[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(heap, (nd, v))
    return dist
```

### Bellman-Ford (handles negative edges, detects negative cycles)

```python
def bellman_ford(n, edges, src):
    dist = [float('inf')] * n
    dist[src] = 0
    for _ in range(n - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated: break
    # one more pass to detect negative cycles
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return None   # negative cycle reachable from src
    return dist
```

### Floyd-Warshall (all-pairs, dense)

```python
def floyd_warshall(n, edges):
    INF = float('inf')
    d = [[INF]*n for _ in range(n)]
    for i in range(n): d[i][i] = 0
    for u, v, w in edges:
        d[u][v] = min(d[u][v], w)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if d[i][k] + d[k][j] < d[i][j]:
                    d[i][j] = d[i][k] + d[k][j]
    return d
```

### 0-1 BFS (weights ∈ {0, 1})

```python
from collections import deque

def zero_one_bfs(n, adj, src):
    dist = [float('inf')] * n
    dist[src] = 0
    dq = deque([src])
    while dq:
        u = dq.popleft()
        for v, w in adj[u]:
            nd = dist[u] + w
            if nd < dist[v]:
                dist[v] = nd
                if w == 0:
                    dq.appendleft(v)      # priority front
                else:
                    dq.append(v)
    return dist
```

### A* (greedy-best-first with admissible heuristic)

```python
import heapq

def astar(start, goal, neighbors, heuristic):
    heap = [(heuristic(start), 0, start)]
    g = {start: 0}
    while heap:
        f, gscore, u = heapq.heappop(heap)
        if u == goal: return gscore
        for v, w in neighbors(u):
            ng = gscore + w
            if ng < g.get(v, float('inf')):
                g[v] = ng
                heapq.heappush(heap, (ng + heuristic(v), ng, v))
    return -1
```

### Classic problems

| Problem | Algorithm |
|---|---|
| Shortest path (unweighted) | BFS |
| Shortest path (non-neg) | Dijkstra |
| Shortest path (with negatives) | Bellman-Ford |
| All pairs shortest path (dense) | Floyd-Warshall |
| Shortest path in DAG | topo + relax |
| Shortest path in 01-weighted graph | 0-1 BFS |
| Shortest path with heuristic | A* |
| K-shortest paths | Yen's / Eppstein's |
| Currency arbitrage (negative cycle) | Bellman-Ford |
| Word ladder | BFS on implicit graph |

## Reference View

### Algorithm summary

| Algorithm | Graph type | Time | Space | Notes |
|---|---|---|---|---|
| BFS | unweighted | `O(V + E)` | `O(V)` | simplest |
| 0-1 BFS | weights ∈ {0,1} | `O(V + E)` | `O(V)` | deque trick |
| Dijkstra (binary heap) | non-neg weights | `O((V+E) log V)` | `O(V)` | standard |
| Dijkstra (Fib heap) | non-neg weights | `O(E + V log V)` | `O(V)` | theoretical |
| Bellman-Ford | any (incl. negative) | `O(V·E)` | `O(V)` | detects neg cycles |
| SPFA (queue-based Bellman-Ford) | any | `O(V·E)` worst, fast avg | `O(V)` | fast in practice, bad worst-case |
| Floyd-Warshall | any (no neg cycle) | `O(V³)` | `O(V²)` | all pairs, dense |
| Johnson's | any (no neg cycle, sparse) | `O(V² log V + V·E)` | `O(V²)` | reweight + Dijkstra per source |
| DAG relaxation | DAG (any weights) | `O(V + E)` | `O(V)` | handles negatives! |
| A* | heuristic available | `O(b^d)` worst | `O(V)` | optimal if admissible |

### Why Dijkstra needs non-negative weights

Dijkstra's core lemma: once a vertex `u` is finalized (pulled from the PQ), `dist[u]` is correct. This relies on "there's no shorter route through a vertex not yet finalized." With negative edges that argument breaks: a later, unfinalized vertex could have an edge into `u` that improves `dist[u]`.

### Bellman-Ford's correctness

After `k` passes of edge relaxation, `dist[v]` is the shortest path using at most `k` edges. Any simple path has ≤ `V-1` edges → `V-1` passes suffice. A `V`-th improvement implies a negative cycle.

### Floyd-Warshall trick: `k` as the middle vertex

`d[k][i][j] = min(d[k-1][i][j], d[k-1][i][k] + d[k-1][k][j])`. The `k` loop must be outermost — it represents "allowed intermediate vertices" and `k-1` → `k`. Rolling `k` dimension: same array works in-place.

### Extensions / variants

- **Bidirectional Dijkstra** — search from both ends, meet in the middle. Expected speedup `sqrt` for road-network-like graphs.
- **Contraction hierarchies** — preprocess for very fast queries on road networks.
- **Yen's K-shortest** — find K alternate paths.
- **Eppstein's K-shortest** — theoretical optimum.
- **Lazy Dijkstra** — don't decrease-key, just reinsert; `O((V+E) log E)`.
- **SPFA** — queue-based Bellman-Ford; faster average but same worst case.

### Pitfalls

- **Dijkstra on negative edges** — silently wrong. Use Bellman-Ford or reweight (Johnson's).
- **Stale entries in PQ** — check `if d > dist[u]: continue`.
- **Integer overflow** — Python fine; elsewhere `INT_MAX + w` overflows.
- **Undirected graph with negative edge** — any undirected negative edge is a negative cycle (edge back and forth). Bellman-Ford sees it; be explicit.
- **Floyd-Warshall loop order** — `k` must be outermost.
- **A* with inadmissible heuristic** — no longer optimal; still finds *a* path.
- **Grid BFS 4-connectivity vs 8-connectivity** — a classic confusion.

### Real-world uses

- **Routing (OSPF, IS-IS)** — Dijkstra within an area.
- **BGP path selection** — approximates shortest path with policy layers.
- **Maps / navigation** — bidirectional Dijkstra + contraction hierarchies.
- **Currency arbitrage detection** — Bellman-Ford on log-rates, negative cycle = profitable arbitrage.
- **Game AI** — A* on game grids (or hierarchical A* on abstractions).
- **Network flow preprocessing** — repeated shortest-path augmentations in min-cost flow.
- **Compilers — instruction scheduling on DAGs** — DAG shortest-path.
- **Blockchain routing (Lightning Network)** — Dijkstra with custom weight functions.

### When *not* to use

- For reachability only, simple BFS/DFS suffices.
- Very large graphs where exact shortest is overkill → approximations (landmarks, A* with weak heuristic).
- All-pairs with huge `V` → don't Floyd-Warshall, use repeated Dijkstra with Johnson reweighting.

## See Also

- [`mst.md`](mst.md) — another graph classic.
- [`connectivity-scc.md`](connectivity-scc.md) — preprocessing step before DAG algorithms.
- [`matching.md`](matching.md) — bipartite matching leverages shortest-augmenting paths.
- [`flows.md`](flows.md) — Ford-Fulkerson builds on shortest augmenting paths.
- [`../dp-patterns/dp-on-dag.md`](../dp-patterns/dp-on-dag.md) — DAG shortest path is DP.
- [`../../data-structures/graph/graph-algorithms.md`](../../data-structures/graph/graph-algorithms.md) — interview templates.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
