# DP on DAG

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

- The state-transition graph is a **DAG** (no cycles).
- You need: longest/shortest path, number of paths, sum over paths, reachability, critical path.
- You can reduce a non-graph DP to a DAG (each state = node, each transition = edge).

Canonical applications: task scheduling with prerequisites, build dependency ordering, longest path in DAGs, PERT/CPM critical path, course scheduling.

## Interview View

### Template — DP over topological order

```python
from collections import defaultdict, deque

def longest_path_dag(n, edges, weight):
    """Longest path from any node to any node. `weight[(u,v)]` = edge weight."""
    g = defaultdict(list)
    indeg = [0] * n
    for u, v in edges:
        g[u].append(v)
        indeg[v] += 1

    # Kahn's topological sort
    q = deque(i for i in range(n) if indeg[i] == 0)
    topo = []
    while q:
        u = q.popleft()
        topo.append(u)
        for v in g[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

    dp = [0] * n  # longest path ending at u
    for u in topo:
        for v in g[u]:
            dp[v] = max(dp[v], dp[u] + weight[(u, v)])
    return max(dp)
```

### Number of paths in a DAG from `s` to `t`

```python
def count_paths(n, edges, s, t):
    g = defaultdict(list)
    indeg = [0] * n
    for u, v in edges:
        g[u].append(v); indeg[v] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    topo = []
    while q:
        u = q.popleft(); topo.append(u)
        for v in g[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    paths = [0] * n
    paths[s] = 1
    for u in topo:
        if paths[u]:
            for v in g[u]:
                paths[v] += paths[u]
    return paths[t]
```

### Shortest path in a DAG (works with negative weights; no need for Bellman-Ford)

```python
def shortest_path_dag(n, edges, src):
    g = defaultdict(list)
    indeg = [0] * n
    for u, v, w in edges:
        g[u].append((v, w)); indeg[v] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    topo = []
    while q:
        u = q.popleft(); topo.append(u)
        for v, _ in g[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0
    for u in topo:
        if dist[u] != INF:
            for v, w in g[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
    return dist
```

`O(V + E)` — beats Dijkstra's `O((V+E) log V)` when input is a DAG, handles negatives too.

### Classic problems

| Problem | Shape |
|---|---|
| Longest Path in DAG | topo + relax |
| Shortest Path in DAG | topo + relax (handles negatives) |
| Counting paths from `s` to `t` | topo + additive |
| Critical path method (PERT) | earliest start / latest start |
| Course Schedule II | topo order itself is the DP |
| Parallel Courses | BFS levels in DAG |
| Longest increasing path in a matrix | implicit DAG, memoized DFS |
| Kahn + count orderings | with factorial of indegrees=0 at each step |

### Longest increasing path in a matrix (implicit DAG)

```python
from functools import cache

def longest_increasing_path(matrix):
    if not matrix: return 0
    m, n = len(matrix), len(matrix[0])

    @cache
    def dfs(i, j):
        best = 1
        for di, dj in ((-1,0),(1,0),(0,-1),(0,1)):
            ni, nj = i + di, j + dj
            if 0 <= ni < m and 0 <= nj < n and matrix[ni][nj] > matrix[i][j]:
                best = max(best, 1 + dfs(ni, nj))
        return best

    return max(dfs(i, j) for i in range(m) for j in range(n))
```

The "increasing" constraint induces a DAG without cycles.

## Reference View

### Why topological order works

Each DP value `dp[v]` depends only on `dp[u]` for predecessors `u`. If we process in topological order, all predecessors are computed before `v`. This is exactly Bellman-Ford relaxation but with the DAG order eliminating the need for repeated passes.

### Topological sort — two algorithms

- **Kahn's (BFS-based)** — start with indegree-0 nodes; decrement as you remove. Great for "levels" (parallel execution rounds).
- **DFS-based** — post-order of DFS gives reverse topological order. Easier to reason about recursion.

```python
def topo_sort_dfs(n, g):
    visited = [False] * n
    out = []
    def dfs(u):
        visited[u] = True
        for v in g[u]:
            if not visited[v]: dfs(v)
        out.append(u)
    for u in range(n):
        if not visited[u]: dfs(u)
    return out[::-1]
```

### Detecting cycles

Kahn's fails to drain if there's a cycle: `len(topo) < n` → cycle. DFS-based: three colors (white/gray/black); a gray-to-gray edge is a back-edge → cycle.

### Critical Path Method (CPM)

Given a DAG of tasks with durations:

1. **Earliest start** = longest path from source to node → `ES[v] = max(ES[u] + dur(u,v))`.
2. **Latest start** = sink's earliest finish minus longest path from node to sink.
3. **Slack** = `LS - ES`; tasks with zero slack are on the critical path.

### Complexity

| Problem | Time |
|---|---|
| Topological sort | `O(V + E)` |
| Longest/shortest path in DAG | `O(V + E)` |
| Number of paths | `O(V + E)` (add, watch overflow) |
| Critical path | `O(V + E)` |
| Longest path in general graph | NP-hard (non-DAG!) |

### Pitfalls

- **Cycles in the supposed DAG** → Kahn's `len(topo) < n`; handle explicitly.
- **Longest path in general graphs is NP-hard** — only easy on DAGs.
- **Counting paths overflow** — numbers grow as the Fibonacci-like product of indegrees × outdegrees. Use `mod` or big ints.
- **Implicit DAGs** with a DP state graph can still have cycles if you model wrong — e.g., "you can revisit with extra gas" isn't a DAG.
- **Memoized DFS on DAGs** is DP on DAGs with a different syntax — same thing.

### Real-world uses

- **Build systems (make, bazel, ninja)** — DAG of targets; topological order drives build sequence.
- **Task schedulers (airflow, luigi, temporal)** — DAG of tasks, earliest-start / critical path.
- **Spreadsheet recomputation** — formula dependency DAG.
- **Reactive UI (React/Signals)** — recomputation DAG.
- **Package managers (pip, npm, apt)** — dependency resolution + install order.
- **Compilers — instruction scheduling** is DP on DAG (list scheduling + critical path).
- **Project management — PERT/Gantt critical-path analysis**.
- **Data pipelines (dbt)** — SQL-model DAG.

### When *not* to use

- Graph has cycles — run SCC condensation first, then DP on the DAG of SCCs. See [`../graph/connectivity-scc.md`](../graph/connectivity-scc.md).
- Graph is a tree — simpler formulation applies, see [`dp-on-trees.md`](dp-on-trees.md).
- DP doesn't fit the DAG shape — maybe interval or bitmask DP.

## See Also

- [`dp-on-trees.md`](dp-on-trees.md) — DAGs where everything has ≤1 parent.
- [`../graph/shortest-path.md`](../graph/shortest-path.md) — when graph isn't a DAG.
- [`../graph/connectivity-scc.md`](../graph/connectivity-scc.md) — condense to DAG first.
- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../../data-structures/graph/graph-algorithms.md`](../../data-structures/graph/graph-algorithms.md) — topo sort primer.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
