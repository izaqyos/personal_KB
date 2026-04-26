# Graph Representations

> **Source:** Personal notes + CLRS
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

Pick a graph representation based on:
- **Density** — dense graphs favor matrix; sparse favor list
- **Dominant operation** — "edge exists?" (matrix O(1)) vs "iterate neighbors" (list)
- **Size** — matrix is O(V²) memory; list is O(V + E)

---

## Interview View

### Adjacency List (most common)

```python
from collections import defaultdict

# Unweighted directed
graph = defaultdict(list)
graph[u].append(v)
graph[v].append(u)  # make it undirected

# Weighted
graph = defaultdict(list)
graph[u].append((v, weight))
```

### Adjacency Matrix

```python
V = 5
adj = [[0] * V for _ in range(V)]
adj[u][v] = 1       # unweighted
adj[u][v] = weight  # weighted; use float('inf') for no edge
```

### Edge List

```python
edges = [(u, v, w), (u, v, w), ...]
```

Used when the algorithm iterates all edges (Kruskal's MST, Bellman-Ford).

### Build Graph from Input

```python
def build(n: int, edges: list[tuple[int,int]], directed=False):
    g = defaultdict(list)
    for u, v in edges:
        g[u].append(v)
        if not directed:
            g[v].append(u)
    return g
```

### Quick DFS / BFS

```python
def dfs(g, start, visited=None):
    visited = visited or set()
    visited.add(start)
    for nxt in g[start]:
        if nxt not in visited:
            dfs(g, nxt, visited)
    return visited

from collections import deque
def bfs(g, start):
    visited = {start}
    q = deque([start])
    while q:
        u = q.popleft()
        for v in g[u]:
            if v not in visited:
                visited.add(v)
                q.append(v)
    return visited
```

---

## Reference View

### Three Representations Compared

| Representation | Space | Edge exists? | Iterate neighbors | Add edge | Best for |
|----------------|-------|--------------|-------------------|----------|----------|
| Adjacency list | O(V + E) | O(deg(v)) | O(deg(v)) | O(1) | Sparse graphs, traversal-heavy |
| Adjacency matrix | O(V²) | **O(1)** | O(V) | O(1) | Dense graphs, frequent edge queries |
| Edge list | O(E) | O(E) | O(E) | O(1) | Algorithms that process all edges (Kruskal, Bellman-Ford) |
| Incidence matrix | O(V·E) | O(E) | O(E) | O(1) | Rarely used; linear algebra / hypergraphs |

### When to Prefer Each

- **Adjacency list:** social graphs, web links, road networks, most real-world graphs. Default choice.
- **Adjacency matrix:**
  - Dense graphs (E ≈ V²)
  - Floyd-Warshall all-pairs shortest path
  - When you need O(1) edge existence tests frequently
- **Edge list:**
  - Kruskal's MST (sort edges by weight)
  - Bellman-Ford (relax every edge V−1 times)

### Directed vs Undirected

Undirected edge `(u, v)` = two directed edges in adjacency list (store both sides). Adjacency matrix is **symmetric** for undirected graphs.

### Weighted Graphs

- Adjacency list: `(neighbor, weight)` tuples
- Adjacency matrix: `matrix[u][v] = weight` (0 or ∞ for "no edge")
- Edge list: `(u, v, weight)` tuples

### Special Graph Types

| Type | Property | Algorithm |
|------|----------|-----------|
| DAG | Directed, acyclic | Topological sort, DP on DAG |
| Tree | Connected, acyclic, undirected | Any graph algo simplifies |
| Bipartite | Vertices 2-colorable | Matching, BFS 2-coloring |
| Planar | Embeddable in plane | 4-coloring, specialized layout |
| Dense | E ≈ V² | Matrix representation |
| Sparse | E ≈ V | List representation |

### Practical Python Libraries

| Library | Best for |
|---------|----------|
| `networkx` | Research, prototyping — slow but feature-complete |
| `igraph` | Medium-large graphs, statistical analysis |
| `graph-tool` | Large graphs, C++ backend |
| `rustworkx` | Rust-backed, fastest |

For interviews, **always use `dict[int, list[int]]` or `defaultdict(list)`** — libraries are usually not available.

### Memory Considerations

For V = 10⁶ vertices:

- Matrix: 10¹² cells → terabytes (infeasible)
- List: O(V + E) → megabytes if sparse

**Social networks**, road networks, web graphs are all sparse — always use lists.

### Implicit Graphs

Many graph problems don't have an explicit graph. The graph is **defined by a function** `neighbors(state)`:

- **Grid / maze** — each cell has up-to-4 neighbors
- **Word ladder** — each word connects to words differing by 1 letter
- **State-space search** — game states, puzzle states
- **Build dependencies**

Don't materialize — traverse on the fly.

### Real-World Graphs

| Domain | What's a vertex / edge |
|--------|-------------------------|
| Social network | user / friendship or follow |
| Web | URL / hyperlink |
| Road network | intersection / road segment |
| Package manager | package / dependency |
| Git history | commit / parent |
| Neural network | neuron or layer / weighted connection |
| Knowledge graph | entity / relation |

---

## See Also

- [graph-algorithms.md](graph-algorithms.md)
- [../sets-and-disjoint/disjoint-set.md](../sets-and-disjoint/disjoint-set.md) — connectivity
- [../trees/binary-tree.md](../trees/binary-tree.md) — trees are special graphs
- [../README.md](../README.md) — decision table
