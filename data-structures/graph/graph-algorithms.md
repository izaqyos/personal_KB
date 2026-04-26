# Graph Algorithms

> **Source:** Personal notes + CLRS
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

See [graph-representations.md](graph-representations.md) for the underlying data structures. This file is a reference for common graph algorithms with Python implementations.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

Pick by what you're asking about:

| Question | Algorithm |
|----------|-----------|
| Reachability / all nodes visited | BFS / DFS |
| Shortest path, unweighted | **BFS** |
| Shortest path, non-negative weights | **Dijkstra** |
| Shortest path, any weights (detect neg cycles) | **Bellman-Ford** |
| All-pairs shortest path | **Floyd-Warshall** |
| Ordering with dependencies | **Topological sort** |
| Min cost to connect all vertices | **Kruskal / Prim (MST)** |
| Cycle detection | **DFS with colors** (directed) / **Union-Find** (undirected) |
| Strongly connected components | **Tarjan / Kosaraju** |
| Bipartite check | **BFS 2-coloring** |
| Max flow / min cut | **Ford-Fulkerson / Edmonds-Karp** |

---

## Interview View

### BFS — shortest path unweighted

```python
from collections import deque

def bfs_dist(g, src):
    dist = {src: 0}
    q = deque([src])
    while q:
        u = q.popleft()
        for v in g[u]:
            if v not in dist:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist
```

### DFS — recursive and iterative

```python
def dfs(g, u, visited):
    visited.add(u)
    for v in g[u]:
        if v not in visited:
            dfs(g, v, visited)

def dfs_iter(g, start):
    visited, stack = set(), [start]
    while stack:
        u = stack.pop()
        if u in visited: continue
        visited.add(u)
        stack.extend(g[u])
    return visited
```

### Dijkstra — non-negative weights, O((V+E) log V)

```python
import heapq

def dijkstra(g, src):
    """g[u] = [(v, weight), ...]"""
    dist = {src: 0}
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue      # stale entry
        for v, w in g[u]:
            nd = d + w
            if nd < dist.get(v, float('inf')):
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist
```

**Pitfall:** Dijkstra is **wrong on negative edges**. Use Bellman-Ford.

### Bellman-Ford — O(V·E), detects negative cycles

```python
def bellman_ford(n, edges, src):
    dist = [float('inf')] * n
    dist[src] = 0
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    # One more pass — if anything still improves, negative cycle exists
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return None  # negative cycle reachable
    return dist
```

### Topological Sort — Kahn's (BFS) — O(V + E)

```python
from collections import deque, defaultdict

def topo_sort(g, V):
    indeg = defaultdict(int)
    for u in g:
        for v in g[u]:
            indeg[v] += 1
    q = deque([v for v in range(V) if indeg[v] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in g[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    if len(order) < V:
        return None  # cycle
    return order
```

### Topo Sort — DFS

```python
def topo_dfs(g, V):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * V
    order = []
    has_cycle = False

    def dfs(u):
        nonlocal has_cycle
        color[u] = GRAY
        for v in g[u]:
            if color[v] == GRAY:
                has_cycle = True
            elif color[v] == WHITE:
                dfs(v)
        color[u] = BLACK
        order.append(u)

    for u in range(V):
        if color[u] == WHITE:
            dfs(u)
    return None if has_cycle else order[::-1]
```

### Cycle Detection

**Directed graph** — DFS with three colors (white/gray/black). A gray→gray edge = back edge = cycle.

**Undirected graph** — DFS, parent-aware: a visited neighbor that isn't parent = cycle. Or use [Union-Find](../sets-and-disjoint/disjoint-set.md).

### Kruskal's MST — O(E log E) — uses [Union-Find](../sets-and-disjoint/disjoint-set.md)

```python
def kruskal(n, edges):
    edges.sort(key=lambda e: e[2])  # (u, v, w)
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    mst, cost = [], 0
    for u, v, w in edges:
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            mst.append((u, v, w))
            cost += w
    return mst, cost
```

### Prim's MST — O((V+E) log V)

```python
import heapq

def prim(g, n):
    in_mst = [False] * n
    pq = [(0, 0)]  # (cost, vertex)
    cost = 0
    while pq:
        c, u = heapq.heappop(pq)
        if in_mst[u]: continue
        in_mst[u] = True
        cost += c
        for v, w in g[u]:
            if not in_mst[v]:
                heapq.heappush(pq, (w, v))
    return cost
```

### Connected Components

```python
def components(g, V):
    seen = set()
    comps = []
    for u in range(V):
        if u in seen: continue
        comp = []
        stack = [u]
        while stack:
            x = stack.pop()
            if x in seen: continue
            seen.add(x); comp.append(x)
            stack.extend(g[x])
        comps.append(comp)
    return comps
```

### Bipartite Check

```python
def is_bipartite(g, V):
    color = {}
    for s in range(V):
        if s in color: continue
        color[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v in g[u]:
                if v not in color:
                    color[v] = 1 - color[u]
                    q.append(v)
                elif color[v] == color[u]:
                    return False
    return True
```

---

## Reference View

### Complexity Summary

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| BFS | O(V + E) | O(V) | Unweighted shortest path |
| DFS | O(V + E) | O(V) | Recursion depth |
| Dijkstra (heap) | O((V+E) log V) | O(V) | Non-negative weights |
| Dijkstra (Fibonacci heap) | O(E + V log V) | O(V) | Theoretical |
| Bellman-Ford | O(V·E) | O(V) | Detects negative cycles |
| Floyd-Warshall | O(V³) | O(V²) | All-pairs |
| Kruskal | O(E log E) | O(V) | MST, sparse graphs |
| Prim (heap) | O((V+E) log V) | O(V) | MST, dense graphs OK |
| Topo sort | O(V + E) | O(V) | DAG required |
| Tarjan SCC | O(V + E) | O(V) | Single DFS pass |
| Edmonds-Karp max-flow | O(V·E²) | O(V²) | BFS-based Ford-Fulkerson |

### Shortest Path Decision Tree

```
Weighted?
├─ No → BFS
└─ Yes → All edges non-negative?
          ├─ Yes → Dijkstra
          └─ No → Need neg-cycle detection?
                  ├─ Yes → Bellman-Ford
                  └─ No  → Bellman-Ford (or Johnson's for all-pairs)
All-pairs needed?
  ├─ V small → Floyd-Warshall
  └─ Large + sparse → run Dijkstra V times (with Johnson's reweight if needed)
```

### DFS Tree Edges (Directed)

- **Tree edge** — to unvisited
- **Back edge** — to ancestor (gray) → indicates cycle
- **Forward edge** — to descendant (already black)
- **Cross edge** — to sibling / different subtree (black, earlier finish)

### Strongly Connected Components

- **Kosaraju** — 2 DFS passes: on G, then on G transposed
- **Tarjan** — 1 DFS pass using lowlink values; elegant but tricky

### Max Flow / Min Cut

- **Ford-Fulkerson** — repeatedly find augmenting paths in residual graph
- **Edmonds-Karp** — Ford-Fulkerson with BFS for augmenting paths
- **Dinic's** — layered BFS + blocking flows; O(V²E)
- Min cut = max flow (by max-flow min-cut theorem)

### Real-World Applications

- **BFS** — crawling, shortest-hop routing, social-network friends-of-friends
- **Dijkstra** — Google Maps, OSPF routing, network latency
- **A\*** — Dijkstra + heuristic; pathfinding in games, robotics
- **Topological sort** — build systems (make, npm), task scheduling, spreadsheet recalc
- **MST** — network design (laying cable), clustering
- **SCC** — web graph analysis, program call graphs
- **Max flow** — bipartite matching, assignment problems, network capacity planning
- **PageRank** — random walk on web graph (eigenvector of transition matrix)

### Common Pitfalls

1. **Dijkstra with negative weights** — silently wrong. Always check weight signs.
2. **Forgetting `if d > dist[u]: continue`** in heap-based Dijkstra — stale entries inflate runtime
3. **Recursion depth** on large graphs → use iterative DFS
4. **Topological sort on non-DAG** — detect and fail, don't produce garbage
5. **Modifying graph during traversal** — snapshot neighbors first

---

## See Also

- [graph-representations.md](graph-representations.md) — how to store graphs
- [../trees/heap.md](../trees/heap.md) — priority queue for Dijkstra/Prim
- [../sets-and-disjoint/disjoint-set.md](../sets-and-disjoint/disjoint-set.md) — Kruskal, cycle detection
- [../../interviews/algorithms-ds.md](../../interviews/algorithms-ds.md) — TypeScript versions
- [../README.md](../README.md) — decision table
- [../../algorithms/graph/shortest-path.md](../../algorithms/graph/shortest-path.md) — deeper: Dijkstra, Bellman-Ford, Floyd, 0-1 BFS, A*
- [../../algorithms/graph/mst.md](../../algorithms/graph/mst.md) — Kruskal, Prim, Borůvka, cut/cycle properties
- [../../algorithms/graph/connectivity-scc.md](../../algorithms/graph/connectivity-scc.md) — Tarjan/Kosaraju, bridges, articulation points, 2-SAT
- [../../algorithms/graph/matching.md](../../algorithms/graph/matching.md) — bipartite matching, Hopcroft-Karp, Hungarian
- [../../algorithms/graph/flows.md](../../algorithms/graph/flows.md) — max-flow, min-cut, min-cost flow
