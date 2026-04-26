# Connectivity, SCC, Bridges, Articulation Points

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

- Determine whether a graph (or subgraph) is connected.
- **Strongly connected components (SCCs)** in directed graphs — condense a directed graph to a DAG of SCCs.
- **Bridges** (cut edges) — edges whose removal disconnects the graph. Useful for single-points-of-failure in networks.
- **Articulation points** (cut vertices) — vertices whose removal disconnects the graph.
- **Biconnected components** — 2-edge-connected or 2-vertex-connected subgraphs.
- **Bipartiteness** — 2-coloring test; useful preflight for bipartite matching.

## Interview View

### Connected components (undirected, BFS/DFS)

```python
from collections import defaultdict, deque

def connected_components(n, edges):
    g = defaultdict(list)
    for u, v in edges:
        g[u].append(v); g[v].append(u)
    seen = [False] * n
    comps = []
    for i in range(n):
        if not seen[i]:
            q = deque([i]); comp = []
            seen[i] = True
            while q:
                u = q.popleft(); comp.append(u)
                for v in g[u]:
                    if not seen[v]:
                        seen[v] = True; q.append(v)
            comps.append(comp)
    return comps
```

Or with Union-Find — see [`../../data-structures/sets-and-disjoint/disjoint-set.md`](../../data-structures/sets-and-disjoint/disjoint-set.md).

### SCC — Kosaraju's (two DFS passes)

```python
def kosaraju(n, adj):
    adj_rev = [[] for _ in range(n)]
    for u in range(n):
        for v in adj[u]:
            adj_rev[v].append(u)

    order = []
    visited = [False] * n
    def dfs1(u):
        stack = [(u, iter(adj[u]))]
        visited[u] = True
        while stack:
            node, it = stack[-1]
            nxt = next(it, None)
            if nxt is None:
                order.append(node)
                stack.pop()
            elif not visited[nxt]:
                visited[nxt] = True
                stack.append((nxt, iter(adj[nxt])))

    for u in range(n):
        if not visited[u]:
            dfs1(u)

    comp = [-1] * n
    def dfs2(u, c):
        stack = [u]; comp[u] = c
        while stack:
            node = stack.pop()
            for v in adj_rev[node]:
                if comp[v] == -1:
                    comp[v] = c
                    stack.append(v)

    c = 0
    for u in reversed(order):
        if comp[u] == -1:
            dfs2(u, c); c += 1
    return comp, c       # comp[v] = SCC index, c = number of SCCs
```

### SCC — Tarjan's (one DFS pass)

```python
def tarjan(n, adj):
    index = [0]; stk = []; on_stk = [False]*n
    idx = [-1]*n; low = [0]*n
    comp = [-1]*n; c = [0]

    def dfs(start):
        call = [(start, iter(adj[start]))]
        idx[start] = index[0]; low[start] = index[0]; index[0] += 1
        stk.append(start); on_stk[start] = True
        while call:
            u, it = call[-1]
            v = next(it, None)
            if v is None:
                if low[u] == idx[u]:
                    while True:
                        w = stk.pop(); on_stk[w] = False
                        comp[w] = c[0]
                        if w == u: break
                    c[0] += 1
                call.pop()
                if call:
                    p = call[-1][0]
                    low[p] = min(low[p], low[u])
            else:
                if idx[v] == -1:
                    idx[v] = index[0]; low[v] = index[0]; index[0] += 1
                    stk.append(v); on_stk[v] = True
                    call.append((v, iter(adj[v])))
                elif on_stk[v]:
                    low[u] = min(low[u], idx[v])

    for u in range(n):
        if idx[u] == -1:
            dfs(u)
    return comp, c[0]
```

### Bridges (Tarjan)

```python
def find_bridges(n, adj):
    timer = [0]; tin = [-1]*n; low = [0]*n
    bridges = []
    def dfs(u, parent):
        tin[u] = low[u] = timer[0]; timer[0] += 1
        for v in adj[u]:
            if v == parent: continue
            if tin[v] != -1:
                low[u] = min(low[u], tin[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > tin[u]:
                    bridges.append((u, v))
    for u in range(n):
        if tin[u] == -1: dfs(u, -1)
    return bridges
```

### Articulation points

```python
def articulation_points(n, adj):
    timer = [0]; tin = [-1]*n; low = [0]*n
    ap = set()
    def dfs(u, parent):
        tin[u] = low[u] = timer[0]; timer[0] += 1
        children = 0
        for v in adj[u]:
            if v == parent: continue
            if tin[v] != -1:
                low[u] = min(low[u], tin[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] >= tin[u] and parent != -1:
                    ap.add(u)
                children += 1
        if parent == -1 and children > 1:
            ap.add(u)
    for u in range(n):
        if tin[u] == -1: dfs(u, -1)
    return ap
```

### Bipartiteness check (2-coloring)

```python
def is_bipartite(n, adj):
    color = [-1] * n
    for s in range(n):
        if color[s] != -1: continue
        color[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if color[v] == -1:
                    color[v] = 1 - color[u]
                    q.append(v)
                elif color[v] == color[u]:
                    return False
    return True
```

### Classic problems

| Problem | Tool |
|---|---|
| Number of Connected Components | BFS/DFS/UF |
| Number of Islands | grid BFS/DFS |
| Redundant Connection | UF |
| SCC: 2-SAT | Kosaraju/Tarjan |
| Critical Connections (bridges) | Tarjan bridge |
| Critical Nodes (articulation) | Tarjan articulation |
| Is Graph Bipartite? | 2-coloring |
| Possible Bipartition | 2-coloring |
| Course Schedule (cycle?) | DFS / Kahn's |
| Condense directed graph to DAG | SCC + build DAG |

## Reference View

### Why reverse graph in Kosaraju's

After `dfs1`, stack order reflects finish times. Running `dfs2` on the reverse graph in reverse-finish-time order finds exactly the SCCs. Correctness follows because SCCs are preserved under edge reversal, and sinks in the original DAG-of-SCCs become sources in the reverse.

### `low`-link semantics (Tarjan, bridges, articulation)

During DFS, `low[u]` = minimum `tin` reachable from subtree of `u` using at most one back-edge from any descendant. Key inequalities:

- **Bridge**: `low[v] > tin[u]` (no back-edge from `v`'s subtree up to `u` or above).
- **Articulation**: `low[v] ≥ tin[u]` and `u` isn't the root, *or* `u` is the root with >1 DFS child.

### 2-SAT via SCC

For each boolean var `x`, create two nodes `x` and `¬x`. For each clause `a ∨ b`, add implications `¬a → b` and `¬b → a`. 2-SAT is satisfiable iff no variable and its negation are in the same SCC. Assignment: for each variable, pick the one in the SCC that comes later topologically.

### Complexity

| Problem | Algorithm | Time |
|---|---|---|
| Connected components | BFS/DFS/UF | `O(V + E)` |
| SCC | Kosaraju / Tarjan | `O(V + E)` |
| Bridges | Tarjan | `O(V + E)` |
| Articulation points | Tarjan | `O(V + E)` |
| Biconnected components | Tarjan | `O(V + E)` |
| Bipartiteness | BFS 2-coloring | `O(V + E)` |

### Pitfalls

- **Recursion depth** — deep DFS on long chains. Use iterative DFS for Python / big graphs.
- **Undirected edge parent check** — must allow `parent` to be ignored; multigraph edges (two edges between same nodes) need `edge_id` tracking, not just `parent`.
- **Kosaraju stack vs list** — if you use a Python list + `append`, the natural reverse order is correct.
- **Tarjan vs Gabow** — Gabow's uses two stacks, slightly simpler bookkeeping but fewer people know it.
- **Articulation root edge case** — root is articulation iff it has >1 DFS child. Easy to miss.
- **Directed → undirected when finding bridges** — bridges are an undirected concept; directed variant uses SCC.

### Real-world uses

- **Network reliability** — bridges / articulation points = single points of failure in a communication network.
- **Social networks — communities / cut vertices** — articulation points are "connectors" between communities.
- **2-SAT encoding** — scheduling constraints, register allocation feasibility.
- **Compilers — SCC detection for recursion** in function call graphs → cluster mutually recursive functions.
- **Version control — file history graph analysis**.
- **Web graph — strongly connected components of web pages** reveal "core" of the web.
- **Dependency analysis** — SCCs in an import graph show circular modules.
- **Electrical circuits — biconnected components** correspond to fault-tolerant subcircuits.

### When *not* to use

- Graph is a tree — no SCCs/bridges in interesting sense.
- You only need reachability, not components — a single BFS/DFS is fine.
- Massive streaming graphs — offline classical algorithms don't apply; use online approximations.

## See Also

- [`shortest-path.md`](shortest-path.md) — after condensing SCCs, DAG-DP handles distances.
- [`mst.md`](mst.md) — MST implies connectivity.
- [`matching.md`](matching.md) — often preceded by bipartiteness check.
- [`../../data-structures/sets-and-disjoint/disjoint-set.md`](../../data-structures/sets-and-disjoint/disjoint-set.md) — alt for undirected CC.
- [`../dp-patterns/dp-on-dag.md`](../dp-patterns/dp-on-dag.md) — DP on the condensation DAG.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
