# Network Flow

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

- Maximize total throughput from a source to a sink across a capacity network.
- Problems reducible to flow — a shockingly long list:
  - Bipartite matching → unit-capacity max flow.
  - Vertex-disjoint / edge-disjoint paths.
  - Min cut (by max-flow-min-cut theorem).
  - Project selection (min cut formulation).
  - Image segmentation (min cut).
  - Baseball elimination.
- Min-cost max-flow when edges have costs as well as capacities.

This is one of the most "reductive" areas of algorithms — many problems dissolve once you model them as a flow network.

## Interview View

### Edmonds-Karp (BFS-augmenting path, simple, good enough for interviews)

```python
from collections import defaultdict, deque

def edmonds_karp(n, edges, source, sink):
    """edges: list of (u, v, capacity). Returns max flow."""
    cap = defaultdict(lambda: defaultdict(int))
    for u, v, c in edges:
        cap[u][v] += c

    def bfs():
        parent = {source: None}
        q = deque([source])
        while q:
            u = q.popleft()
            for v, residual in cap[u].items():
                if v not in parent and residual > 0:
                    parent[v] = u
                    if v == sink:
                        return parent
                    q.append(v)
        return None

    flow = 0
    while True:
        parent = bfs()
        if parent is None: break
        # Find bottleneck on the found path
        bottleneck = float('inf')
        v = sink
        while parent[v] is not None:
            u = parent[v]
            bottleneck = min(bottleneck, cap[u][v])
            v = u
        # Augment
        v = sink
        while parent[v] is not None:
            u = parent[v]
            cap[u][v] -= bottleneck
            cap[v][u] += bottleneck
            v = u
        flow += bottleneck
    return flow
```

`O(V · E²)`. Practical for small to moderate graphs.

### Dinic's (layered graph + blocking flow, fast in practice)

Sketch — full implementation is longer.

1. BFS from source to assign levels.
2. DFS finds a blocking flow in the level graph (each augmenting path goes strictly forward in levels).
3. Repeat until no augmenting path exists.

Complexity: `O(V²·E)`. On unit-capacity networks (bipartite matching!): `O(E√V)` — that's exactly Hopcroft-Karp.

### Bipartite matching as max-flow

```
source → each left vertex (cap 1)
each edge → left-to-right (cap 1)
each right vertex → sink (cap 1)
```

Max flow = maximum bipartite matching size.

### Min s-t cut

By max-flow-min-cut theorem, `max flow = min capacity of any s-t cut`. After running max-flow, the cut is found by BFS from `s` in the residual graph: reachable vertices form `S`; unreachable form `T`; edges from `S` to `T` in the original graph are the min cut.

### Classic problems

| Problem | Reduction |
|---|---|
| Bipartite matching | unit-capacity flow |
| Min vertex cover (bipartite) | König: flow → matching |
| Edge-disjoint paths | `k` edge-disjoint ⇔ flow of value `k` |
| Vertex-disjoint paths | split each vertex into two with unit cap |
| Image segmentation | min cut between foreground/background seeds |
| Project selection | build project-payoff flow network, compute min cut |
| Baseball elimination | flow network per "contender" check |
| Minimum cost for perfect matching | min-cost max-flow |
| Maximum number of escape routes | multi-source multi-sink flow |

## Reference View

### Max-flow min-cut theorem

In any network, the maximum flow from `s` to `t` equals the minimum capacity of any `s-t` cut. Proves correctness of augmenting-path algorithms (no augmenting path ⇔ found a cut with capacity = current flow).

### Residual graph

Key concept: when you push `f` units along edge `u→v`, you *reduce* the remaining capacity of `u→v` and *increase* the capacity of the reverse `v→u`. This "undo" edge lets future augmenting paths reroute flow — essential for correctness.

### Algorithm comparison

| Algorithm | Complexity | Notes |
|---|---|---|
| Ford-Fulkerson (any path) | unbounded (irrational caps) / `O(E · max_flow)` | only with integer caps |
| Edmonds-Karp (BFS) | `O(V·E²)` | easy to implement |
| Dinic's | `O(V²·E)` / `O(E√V)` unit caps | standard |
| Push-Relabel | `O(V²·E)` / `O(V²·√E)` with FIFO | best in practice for dense graphs |
| ISAP | `O(V²·E)` | variant of push-relabel, practical |
| Capacity scaling | `O(E² log U)` | for large-value capacities |

### Min-cost max-flow

Find max flow at minimum total edge cost. Augment along shortest-by-cost path using Bellman-Ford or SPFA (supports negative reduced costs). With Johnson reweighting → Dijkstra. Complexity roughly `O(F · (V+E) log V)` where `F` is max flow value.

### Typical reductions at a glance

- **Vertex capacity** → split `v` into `v_in` and `v_out` with an edge of capacity `c_v`.
- **Multi-source multi-sink** → super-source `S` connects to all sources, super-sink `T` from all sinks.
- **Lower bounds on edges** → classical decomposition into a new network.
- **Bipartite matching** → unit-capacity s-t network.
- **Project selection** → built-in min-cut formulation.

### Complexity sanity

For competitive programming / interviews:
- `V, E ≤ 1000-5000`: Edmonds-Karp fine.
- `V, E ≤ 10^4-10^5`: Dinic's.
- Very large / specialized: push-relabel or specific reductions.

### Pitfalls

- **Directed vs undirected** — an undirected edge of capacity `c` is two directed edges each of capacity `c`; but the sum of flows on both is bounded by `c` only if modeled properly.
- **Parallel edges** — merge them or allow multiple edges per `(u,v)` in adjacency structure.
- **Self-loops** — irrelevant (can never contribute to flow).
- **Residual capacity** — don't forget to add reverse edges with initial capacity 0.
- **Integer vs float caps** — stick to integers; float can lead to Ford-Fulkerson non-termination in pathological cases.
- **Max flow infinite** — if source or sink is connected by uncapped edges.
- **Overflow** — Python OK; C++ needs 64-bit.

### Real-world uses

- **Image segmentation (foreground/background)** — min cut with user-marked seeds (GrabCut, interactive tools).
- **Airline / train scheduling** — crews, routes via min-cost flow.
- **Supply-chain planning** — capacities on edges model warehouse/transport limits.
- **Project selection** — profit-maximizing subset of interdependent projects.
- **Data center placement** — flow with capacity constraints on links.
- **Job scheduling on unrelated parallel machines** — bipartite matching variant.
- **Baseball / sports elimination** — flow-based feasibility.
- **Telecommunication network design** — edge-disjoint paths for redundancy.
- **Ad delivery pacing** — budget-constrained flow over impression streams.

### When *not* to use

- Problem doesn't reduce cleanly to a flow network — try greedy / DP first.
- Massive graphs where classical flow is too slow → approximation, LP relaxation.
- Online / streaming settings where edges arrive dynamically — specialized algorithms.

## See Also

- [`matching.md`](matching.md) — bipartite matching as flow.
- [`shortest-path.md`](shortest-path.md) — used inside min-cost flow.
- [`connectivity-scc.md`](connectivity-scc.md) — related structural analysis.
- [`mst.md`](mst.md) — different graph classic.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
