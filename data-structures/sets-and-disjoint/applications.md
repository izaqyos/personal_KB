# Union-Find — Applied Patterns

> **Source:** Personal notes + CLRS + Sedgewick *Algorithms* + Felzenszwalb-Huttenlocher 2004 + Hindley-Milner literature
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

A catalog of the five canonical workloads where Disjoint Set Union (DSU) is the right hammer, with scenario, "why DSU fits," code, and practical notes.

---

## Table of Contents

- [When to Use This File](#when-to-use-this-file)
- [1. Incremental Graph Connectivity](#1-incremental-graph-connectivity)
- [2. Kruskal's MST](#2-kruskals-mst)
- [3. Image Segmentation](#3-image-segmentation)
- [4. Type Unification in Compilers](#4-type-unification-in-compilers)
- [5. Percolation Simulations](#5-percolation-simulations)
- [Shared Pitfalls Across All Five](#shared-pitfalls-across-all-five)
- [See Also](#see-also)

---

## When to Use This File

You've seen the DSU data structure in [`disjoint-set.md`](disjoint-set.md) and want the canonical patterns that made Union-Find famous. Each section here is a self-contained recipe: problem, mapping to DSU, code, gotchas.

If your problem resembles one of these — or you're trying to figure out whether DSU is the right tool — read the matching section first.

---

## 1. Incremental Graph Connectivity

### Scenario

Edges arrive in a stream. After each edge (or at arbitrary query points), answer **"are nodes `a` and `b` in the same connected component now?"**

Real examples:

- **Live network topology** — hosts join, links come up. Is host A reachable from host B through currently-up links?
- **Social graph online clustering** — users form friendships; does member A share a community with member B?
- **Distributed system shard merging** — as shards are merged for hot-key rebalancing, which keys are now co-located?
- **Dynamic equivalence classes** — streaming "X ≡ Y" facts; maintain the resulting partition.
- **Offline dynamic connectivity** — queries interleaved with edge additions, answered in one pass.

### Why DSU fits

Every new edge only ever **merges** components; it never splits. DSU is literally a data structure for "merge sets, check membership." Both ops amortized O(α(n)) ≈ O(1).

The alternative — maintain adjacency lists and run BFS/DFS per query — is O(V + E) per query. For a stream of `m` queries on `n` nodes, DSU gives `O((n + m) · α(n))` vs `O(m · (V + E))`. Orders of magnitude difference at scale.

### Code

```python
class ConnectivityTracker:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def add_edge(self, u, v) -> bool:
        ru, rv = self.find(u), self.find(v)
        if ru == rv: return False
        if self.size[ru] < self.size[rv]: ru, rv = rv, ru
        self.parent[rv] = ru
        self.size[ru] += self.size[rv]
        self.components -= 1
        return True

    def connected(self, a, b) -> bool:
        return self.find(a) == self.find(b)

    def component_size(self, x) -> int:
        return self.size[self.find(x)]
```

### Practical notes

- Cannot handle **edge removal** efficiently — requires link-cut trees or offline rollback DSU.
- `add_edge` returns `bool` — you can detect cycle closure for free.
- Track `components` count to answer "how many clusters now?" in O(1).
- For string-named nodes, wrap with a `name_to_index` dict.
- **LeetCode representatives:** 261 (Graph Valid Tree), 323 (Number of Connected Components), 547 (Number of Provinces), 684 (Redundant Connection), 721 (Accounts Merge), 803 (Bricks), 952 (Largest Component by Common Factor), 1319 (Connecting Networks), 1971 (Find if Path Exists).

---

## 2. Kruskal's MST

### Scenario

Given a weighted undirected graph, find a **minimum spanning tree** — the subset of `n − 1` edges of minimum total weight that connects all `n` nodes.

Use cases:

- **Network backbone design** — cheapest wiring that reaches every node.
- **Clustering via single-linkage** — cut the `k−1` heaviest MST edges to get `k` clusters.
- **Approximation for TSP** — 2-approx via MST (double tree + shortcut).
- **Boruvka's / multi-level graph algorithms** — MST appears as a substructure.

### Why DSU fits

Kruskal's algorithm is:

1. Sort edges by weight ascending.
2. Scan edges in order; include an edge iff it connects two currently-different components.
3. Stop after `n − 1` edges.

Step 2 is exactly DSU's `union` + "was a real merge?" return value. The algorithm's correctness rests on the **cut property**: the minimum-weight edge crossing any cut is safe to include. DSU tells us in O(α(n)) whether an edge crosses a cut.

### Code

```python
def kruskal(n, edges):
    """edges: list of (u, v, weight). Returns (total_weight, mst_edges)."""
    edges = sorted(edges, key=lambda e: e[2])
    dsu = ConnectivityTracker(n)
    total, mst = 0, []
    for u, v, w in edges:
        if dsu.add_edge(u, v):
            total += w
            mst.append((u, v, w))
            if len(mst) == n - 1:
                break
    return total, mst
```

### Practical notes

- Complexity: `O(E log E)` from the sort, plus `O(E · α(V))` DSU ops. Sort dominates.
- Compare to **Prim's** (`O(E log V)` with a heap): Kruskal is better on sparse graphs and is simpler to parallelize at edge-sort level. Prim wins on dense graphs and naturally integrates with priority queues for other purposes.
- For **MST on streaming edges** (edge weights revealed over time): Kruskal is offline by nature. Dynamic MST needs link-cut trees.
- **Negative weights:** no issue — MST still well-defined.
- **Disconnected input:** you get a **minimum spanning forest**; stop when no more merges happen rather than requiring `n − 1` edges.

---

## 3. Image Segmentation

### Scenario

Partition an image into regions of visually similar pixels. Each region should be internally coherent and meaningfully different from its neighbors.

Used in:

- **Object detection preprocessing** — cut images into candidate regions before classification.
- **Medical imaging** — segment organs, lesions, tissue types.
- **Satellite / remote sensing** — separate land cover types.
- **Graph-cut-style matting / background removal.**

### Why DSU fits

The **Felzenszwalb-Huttenlocher algorithm (2004)** is the classic DSU-based method:

1. Treat each pixel as a graph node. Add an edge to each 4- or 8-neighbor weighted by color difference.
2. Sort edges by weight ascending.
3. Scan in order; **merge** the two pixels' components iff the edge weight is "small enough" by a size-adjusted threshold.
4. Final DSU partition = segmentation.

The merge predicate (from the paper) is:

```
merge iff  w(u, v) ≤ min(Int(C_u) + τ(|C_u|),  Int(C_v) + τ(|C_v|))
```

where `Int(C)` is the max edge weight inside `C` (tracked per root), and `τ(s) = k / s` is a size penalty — big components need stronger evidence to keep absorbing things.

### Code (sketch)

```python
def felzenszwalb(image, k=300):
    """image: 2D array of intensities. k: size penalty (larger → larger segments)."""
    h, w = image.shape
    n = h * w
    # Build edges: 4-neighborhood, weight = |intensity difference|
    edges = []
    for r in range(h):
        for c in range(w):
            idx = r * w + c
            if c + 1 < w:
                edges.append((idx, idx + 1, abs(int(image[r, c]) - int(image[r, c + 1]))))
            if r + 1 < h:
                edges.append((idx, idx + w, abs(int(image[r, c]) - int(image[r + 1, c]))))
    edges.sort(key=lambda e: e[2])

    parent = list(range(n))
    size = [1] * n
    internal = [0] * n   # max edge inside component, indexed by root

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def merge_threshold(root):
        return internal[root] + k / size[root]

    for u, v, wt in edges:
        ru, rv = find(u), find(v)
        if ru == rv: continue
        if wt <= min(merge_threshold(ru), merge_threshold(rv)):
            if size[ru] < size[rv]: ru, rv = rv, ru
            parent[rv] = ru
            size[ru] += size[rv]
            internal[ru] = wt   # the just-added edge is the new internal max

    # Final segmentation: map each pixel to its root
    return [find(i) for i in range(n)]
```

### Practical notes

- Grayscale example above; for color use Euclidean RGB (or LAB) distance.
- Complexity `O(n log n)` from the edge sort, dominating the DSU work.
- `k` trades off granularity vs. merge aggressiveness. Rule of thumb: `k = 300` for 256-level grayscale.
- **Post-processing:** remove components smaller than some `min_size` by merging with their best neighbor. (Common addition, not in the paper.)
- Modern deep-learning segmentation (Mask R-CNN, SAM) has superseded this for complex tasks, but Felzenszwalb-Huttenlocher is still used for **preprocessing**, **superpixel generation**, and anywhere speed matters more than semantic understanding.

---

## 4. Type Unification in Compilers

### Scenario

In **Hindley-Milner (HM) type inference** — the backbone of ML, Haskell, OCaml, Elm, PureScript, and parts of Rust — the compiler doesn't require annotations. It infers types by generating and solving **equality constraints** between types.

Typical constraint fragment:

```
α = β → γ
β = Int
```

Solving means answering "what does each type variable eventually resolve to?" That process is called **unification**.

### Why DSU fits

Each type variable is a DSU node. "These two types must be equal" is a `union`. "What's the current representative for this variable?" is a `find`. The final substitution is read off the root of each class.

The subtlety: type variables can stand for **structured types** (e.g., `α = Int → β`). Unification must:

1. Find the roots of both sides.
2. If both roots are variables: `union`.
3. If one root is a variable and the other is a structured type: **point the variable at the structured type** (with the **occurs check** — if `α` appears inside the structure it's unifying against, fail: you'd create an infinite type).
4. If both are structured types: unify them **structurally** — same constructor? recursively unify arguments. Different constructors? type error.

### Code (sketch — monomorphic HM)

```python
class Type: pass
class Var(Type):
    def __init__(self, name): self.name = name
class Con(Type):
    def __init__(self, name, args): self.name, self.args = name, args  # e.g. ("->", [a, b])

class Unifier:
    def __init__(self):
        self.parent = {}    # Var → Type (representative; may be Var or Con)

    def find(self, t):
        """Path-compressing find with structural resolution."""
        if isinstance(t, Var) and t in self.parent:
            root = self.find(self.parent[t])
            self.parent[t] = root
            return root
        return t

    def unify(self, a, b):
        a, b = self.find(a), self.find(b)
        if isinstance(a, Var) and isinstance(b, Var) and a is b:
            return
        if isinstance(a, Var):
            if self.occurs(a, b): raise TypeError(f"infinite type: {a.name}")
            self.parent[a] = b
            return
        if isinstance(b, Var):
            return self.unify(b, a)
        # Both structured
        if a.name != b.name or len(a.args) != len(b.args):
            raise TypeError(f"cannot unify {a.name} with {b.name}")
        for x, y in zip(a.args, b.args):
            self.unify(x, y)

    def occurs(self, v, t):
        t = self.find(t)
        if isinstance(t, Var): return t is v
        return any(self.occurs(v, a) for a in t.args)
```

### Practical notes

- This is the **core** of GHC's, OCaml's, and Elm's type checkers (with heavy embellishments: let-generalization, type classes, row polymorphism, effects).
- The `parent` map is DSU-shaped but stores either another variable or a concrete type — a "tagged union" twist.
- **Occurs check** is essential and sometimes expensive; modern implementations defer it or use ranked unification to amortize.
- **Rust's borrow checker & trait solver** use related (but more elaborate) unification machinery — region variables, associated types.
- **Prolog** unification is the same algorithm, operating on terms.
- Classic papers: Robinson 1965 (first-order unification), Milner 1978 (Algorithm W), Damas & Milner 1982.

---

## 5. Percolation Simulations

### Scenario

Statistical-physics model of flow through a disordered medium. Classic setup:

- An `n × n` lattice of sites, all initially **blocked**.
- Repeatedly **open** a random site. An open site is **full** if it's connected through open sites to the top row. The system **percolates** when any bottom-row site is full.
- Question: what fraction of sites must be open before percolation occurs?

The percolation threshold `p*` is a fundamental constant in statistical physics (`p* ≈ 0.5927` for 2D site percolation on a square lattice). It governs:

- **Forest fire spread** — `p` is flammability.
- **Porous rock flow** — `p` is open-pore fraction.
- **Epidemic outbreak onset** — `p` is infection probability.
- **Polymer gelation** — monomer crosslinking.
- **Conductor vs. insulator transitions** — `p` is metallic site density.
- **Neural criticality** — `p` is synaptic efficacy.

### Why DSU fits

As sites are opened, connected clusters **grow**. You need to ask "does the top connect to the bottom yet?" after each open. Exactly DSU's forte.

The classic trick: add two **virtual nodes** — a "top" super-node (connected to every opened top-row site) and a "bottom" super-node (connected to every opened bottom-row site). The system percolates iff `connected(top, bottom)`. One DSU query per step.

### Code

```python
import random

class Percolation:
    def __init__(self, n):
        self.n = n
        self.open_ = [[False] * n for _ in range(n)]
        self.parent = list(range(n * n + 2))   # +2 virtual nodes
        self.size = [1] * (n * n + 2)
        self.TOP = n * n
        self.BOTTOM = n * n + 1

    def _idx(self, r, c): return r * self.n + c

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb: return
        if self.size[ra] < self.size[rb]: ra, rb = rb, ra
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]

    def open(self, r, c):
        if self.open_[r][c]: return
        self.open_[r][c] = True
        idx = self._idx(r, c)
        if r == 0: self.union(idx, self.TOP)
        if r == self.n - 1: self.union(idx, self.BOTTOM)
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < self.n and 0 <= nc < self.n and self.open_[nr][nc]:
                self.union(idx, self._idx(nr, nc))

    def percolates(self) -> bool:
        return self.find(self.TOP) == self.find(self.BOTTOM)


def estimate_threshold(n=50, trials=100):
    results = []
    for _ in range(trials):
        p = Percolation(n)
        sites = [(r, c) for r in range(n) for c in range(n)]
        random.shuffle(sites)
        opened = 0
        for r, c in sites:
            p.open(r, c)
            opened += 1
            if p.percolates():
                results.append(opened / (n * n))
                break
    return sum(results) / len(results)

# estimate_threshold(50, 1000) → ~0.593, the percolation threshold
```

### Practical notes

- The **backwash bug**: if you use a single `BOTTOM` virtual node and want to ask "is this specific site full (connected to top)?" you'll get false positives — sites connected to bottom via open clusters that go top→bottom→up will look full when they shouldn't. Fix: two DSUs, one with top-only virtual, one with both.
- Percolation runs easily go into the billions of site-openings. α(n) amortization makes the difference between tractable and infeasible.
- Monte Carlo threshold estimation requires many trials (100s–1000s) to stabilize.
- **Bond percolation** (edges opened, not sites) is the directly-analogous version of Kruskal's MST.
- Extensions: 3D lattice (needs 6-neighbors), Bethe lattices (analytical threshold), continuum percolation.

---

## Shared Pitfalls Across All Five

1. **No deletions.** All five patterns are monotonic — edges/merges only accumulate. The moment your problem needs "undo," you're out of plain DSU territory (use rollback DSU or link-cut trees).
2. **Recursive `find` in Python hits recursion limit** on deep trees before path compression kicks in. Iterate.
3. **String-keyed items** — maintain a `name_to_index` dict. `parent` must be an integer-indexed array for performance.
4. **Forgetting union-by-size** loses asymptotic guarantees. Path compression alone gives O(log n) amortized, which is still good but not α(n).
5. **Returning void from `union`** — every one of the five patterns relies on knowing "did this op actually merge anything?" for either cycle detection (Kruskal, connectivity), iteration termination (MST), or triggering queries (percolation). Always return `bool`.

---

## See Also

- [disjoint-set.md](disjoint-set.md) — the core data structure
- [../graph/graph-algorithms.md](../graph/graph-algorithms.md) — Kruskal, BFS/DFS alternatives
- [../../algorithms/graph/mst.md](../../algorithms/graph/mst.md) — MST algorithms in depth (Kruskal/Prim/Boruvka)
- [../../algorithms/paradigms/greedy.md](../../algorithms/paradigms/greedy.md) — Kruskal as canonical greedy algorithm
- [../trees/binary-tree.md](../trees/binary-tree.md) — recursive find patterns
- [../README.md](../README.md) — top-level decision table
