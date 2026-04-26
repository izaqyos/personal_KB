# Disjoint Set (Union-Find)

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

- Partition items into equivalence classes that merge over time
- "Are these two items in the same group?" **O(α(n))** ≈ O(1)
- Cycle detection in undirected graphs, during graph construction
- [Kruskal's MST](../graph/graph-algorithms.md)
- Connected components on dynamic graph (edges added over time)
- **Not** for: arbitrary set membership (use hash set); splitting groups back apart (UF doesn't support un-union efficiently)

---

## Interview View

### Minimal Implementation (union by rank + path compression)

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        # Path compression — point every visited node directly at root
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, x, y) -> bool:
        """Returns True if x and y were in different sets (merge happened)."""
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        # Union by rank — attach shorter under taller
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True

    def connected(self, x, y) -> bool:
        return self.find(x) == self.find(y)
```

### With Component Count & Size

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False
        if self.size[rx] < self.size[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        self.size[rx] += self.size[ry]
        self.components -= 1
        return True
```

### Classic Problem 1 — Number of Connected Components

```python
def num_components(n, edges):
    dsu = DSU(n)
    for u, v in edges:
        dsu.union(u, v)
    return dsu.components
```

### Classic Problem 2 — Graph Valid Tree

A tree on n nodes has exactly n−1 edges and no cycle:

```python
def valid_tree(n, edges):
    if len(edges) != n - 1:
        return False
    dsu = DSU(n)
    for u, v in edges:
        if not dsu.union(u, v):
            return False  # cycle
    return True
```

### Classic Problem 3 — Kruskal's MST (works with DSU directly)

```python
def kruskal(n, edges):
    edges.sort(key=lambda e: e[2])  # by weight
    dsu = DSU(n)
    total, picked = 0, []
    for u, v, w in edges:
        if dsu.union(u, v):
            total += w
            picked.append((u, v, w))
    return total, picked
```

### Classic Problem 4 — Accounts Merge (LeetCode 721)

Union emails that appear in the same account, then group by root.

### Classic Problem 5 — Redundant Connection (LC 684)

The first edge whose endpoints are already in the same component is the redundant one.

```python
def find_redundant(edges):
    dsu = DSU(len(edges) + 1)
    for u, v in edges:
        if not dsu.union(u, v):
            return [u, v]
```

---

## Reference View

### Operations

| Operation | Description | Time |
|-----------|-------------|------|
| `make_set(x)` | Create new singleton | O(1) |
| `find(x)` | Return representative of x's set | ~O(1) amortized |
| `union(x, y)` | Merge sets containing x and y | ~O(1) amortized |
| `same(x, y)` | find(x) == find(y) | ~O(1) |

**"~O(1)"** means O(α(n)), where α is the **inverse Ackermann function** — less than 5 for any n ≤ 2^(2^65536). Effectively constant.

### Optimizations

**1. Union by rank (or size)** — when merging, make the shorter tree a child of the taller. Keeps trees shallow.

**2. Path compression** — during `find`, point every visited node directly at root. Flattens the tree over time.

**With both together**: O(α(n)) amortized per operation. With just one: O(log n).

### Why It's So Fast

Ackermann function grows insanely fast; its inverse α grows insanely slow:
- α(n) = 4 for any n ≤ 2^(2^64)
- You will never see α(n) > 5 on any real-world data

So treat DSU ops as constant time.

### Variants

| Variant | Extra Feature | Use |
|---------|---------------|-----|
| **Weighted / potential** | Track offset between nodes | "A is 3 greater than B" (LC 399, equation solver) |
| **Persistent DSU** | Undo operations | Offline dynamic connectivity |
| **Rollback DSU** | Without path compression, stack of operations | Offline queries with revert |
| **Small-to-large merging** | Join set contents, not just roots | Merge data payloads per node |

### Weighted DSU (relations with offsets)

Useful for: "A = k · B" or "A is at distance d from B" queries.

```python
class WeightedDSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.weight = [0] * n  # weight[x] = relation of x to its parent

    def find(self, x):
        if self.parent[x] == x:
            return x
        root = self.find(self.parent[x])
        self.weight[x] += self.weight[self.parent[x]]
        self.parent[x] = root
        return root

    def union(self, x, y, w):  # x is "w more than" y
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return self.weight[x] - self.weight[y] == w
        self.parent[rx] = ry
        self.weight[rx] = w + self.weight[y] - self.weight[x]
        return True
```

### What DSU Cannot Do (Well)

- **Un-union** — removing an edge and asking connectivity again. Possible with offline approach or link-cut trees, not basic DSU.
- **Actually list members** of each set without maintaining auxiliary structure
- **Shortest path between two nodes** — DSU knows groups, not graph structure

### Real-World Applications

- **Network connectivity** — "are hosts A and B on the same subnet / VLAN after all these merges?"
- **Image segmentation** — pixel labeling, flood fill, connected components in 2D
- **Percolation / physics sims** — does liquid connect top to bottom?
- **Dynamic equivalence** — type unification in compilers (Hindley-Milner)
- **Kruskal's MST, Boruvka's MST**
- **Offline LCA** — Tarjan's offline LCA uses DSU
- **Game board connectivity** — Go / Hex liberty groups
- **Filesystem union mounts** — merging directory namespaces

### Common Pitfalls

1. **Forgetting path compression** — O(log n) per op instead of O(α(n))
2. **Recursive `find` on large n** — Python recursion limit. Iterate.
3. **Union returns nothing** — lose info about whether merge happened. Return bool.
4. **Assuming `parent[x] == x` means size 1** — only true immediately after init
5. **Using raw int keys** — if your items are strings (emails, etc.), maintain a `name_to_index` map on top

---

## See Also

- [applications.md](applications.md) — canonical DSU workloads walked through end-to-end (connectivity, MST, image segmentation, type unification, percolation)
- [../graph/graph-algorithms.md](../graph/graph-algorithms.md) — Kruskal, connected components
- [../../algorithms/graph/mst.md](../../algorithms/graph/mst.md) — Kruskal proof via cut property
- [../hash-based/sets.md](../hash-based/sets.md)
- [../README.md](../README.md) — decision table
