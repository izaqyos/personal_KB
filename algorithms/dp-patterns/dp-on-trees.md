# DP on Trees

- **Source:** distilled from CP patterns
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

- The input is a tree (connected acyclic graph) and you need an aggregate defined recursively per subtree.
- State is "answer for the subtree rooted at `v`."
- Two common shapes:
  - **Subtree DP** — root the tree, compute from leaves up.
  - **Rerooting** — compute answers for *every* node as root, in total `O(n)` or `O(n log n)`.

Typical quantities: max sum path, count of paths with property, diameter, distances, matching/cover.

## Interview View

### Template — subtree DP with DFS

```python
import sys
from collections import defaultdict
sys.setrecursionlimit(10**6)

def subtree_dp(n, edges, values):
    g = defaultdict(list)
    for u, v in edges:
        g[u].append(v); g[v].append(u)

    dp = [0] * n
    def dfs(u, parent):
        dp[u] = values[u]
        for v in g[u]:
            if v != parent:
                dfs(v, u)
                dp[u] += dp[v]          # combine: subtree sum
        return dp[u]

    dfs(0, -1)
    return dp
```

### Tree diameter (longest path)

```python
def tree_diameter(n, edges):
    g = defaultdict(list)
    for u, v in edges:
        g[u].append(v); g[v].append(u)
    best = [0]
    def dfs(u, p):
        longest1 = longest2 = 0
        for v in g[u]:
            if v == p: continue
            d = dfs(v, u) + 1
            if d > longest1:
                longest2, longest1 = longest1, d
            elif d > longest2:
                longest2 = d
        best[0] = max(best[0], longest1 + longest2)
        return longest1
    dfs(0, -1)
    return best[0]
```

Each node considers its top-2 downward depths; the sum is a candidate diameter passing through that node.

### House Robber III (independent set on tree)

```python
def rob_tree(root):
    """Return max money, can't rob adjacent nodes."""
    def dfs(node):
        if node is None:
            return (0, 0)       # (rob_here, skip_here)
        l_rob, l_skip = dfs(node.left)
        r_rob, r_skip = dfs(node.right)
        rob_here = node.val + l_skip + r_skip
        skip_here = max(l_rob, l_skip) + max(r_rob, r_skip)
        return (rob_here, skip_here)
    return max(dfs(root))
```

Two states per node: "took it" vs "didn't take it."

### Rerooting — sum of distances in tree

```python
def sum_of_distances(n, edges):
    g = defaultdict(list)
    for u, v in edges:
        g[u].append(v); g[v].append(u)

    count = [1] * n         # size of subtree
    ans = [0] * n           # sum of distances in subtree rooted at v

    def dfs1(u, p):
        for v in g[u]:
            if v == p: continue
            dfs1(v, u)
            count[u] += count[v]
            ans[u] += ans[v] + count[v]

    def dfs2(u, p):
        for v in g[u]:
            if v == p: continue
            # ans[v] = ans[u] + (n - count[v]) - count[v]
            ans[v] = ans[u] + n - 2 * count[v]
            dfs2(v, u)

    dfs1(0, -1)
    dfs2(0, -1)
    return ans
```

Two DFS passes: first computes the answer for the root; second "rerolls" the answer when moving parent→child. Total `O(n)`.

### Classic problems

| Problem | Shape |
|---|---|
| Tree diameter | top-2 depths |
| Tree max path sum (binary tree) | top-2 downward, can take neg or not |
| Count subtrees | multiplicative combine |
| Distribute coins in binary tree | flow of excess coins |
| House Robber III | independent-set DP |
| Sum of distances in tree | rerooting |
| Binary tree cameras | states = "covered / not covered / camera here" |
| Tree coloring / matching / domination | similar multi-state DP |

## Reference View

### Why trees are friendly for DP

No cycles → a natural topological order (post-order of DFS). Every edge is used exactly twice (once going in, once coming back). Total work is `O(n + E) = O(n)` for trees.

### Rerooting pattern, abstractly

1. **Root at any node (say `0`)**; compute `f[v]` = answer if we root at `v` with children defined by this rooting.
2. **Second pass**: for each edge `(u, v)` (u = parent), rederive the answer if we re-root at `v`. Usually: subtract `v`'s contribution from `u`, then `v` takes `u` as its new child.

Formula depends on the aggregation. For sums, simple additive adjustments; for max, you usually need "top two" from each node to be safe when one child becomes a parent.

### Multi-state DPs

Tree DP often has multiple "states" per node — a small tuple:

- Max path sum: `(longest down-path from v, best answer including v as apex)`.
- Independent set: `(took v, skipped v)`.
- Cameras: `(covered-by-child, camera-here, not-covered)`.

Child state → parent state transitions are small local rules.

### Complexity

| Variant | Time | Space |
|---|---|---|
| Subtree DP | `O(n)` | `O(n)` |
| Rerooting | `O(n)` | `O(n)` |
| Multi-state (constant states) | `O(n · k²)` where `k` = states | `O(n · k)` |
| Small-to-large merging (set/map per subtree) | `O(n log² n)` or `O(n log n)` | `O(n)` |
| Tree DP with HLD + segment tree (path queries) | `O((n + q) log² n)` | `O(n)` |

### Pitfalls

- **Recursion depth** — chain-like trees cause Python stack overflow. Raise `sys.setrecursionlimit` or convert to iterative DFS.
- **Parent tracking** — in undirected trees, pass `parent` so you don't traverse back.
- **Rerooting with non-additive aggregates** — you often need "top-2" to handle removing the contribution of the current child cleanly.
- **Floating answers across subtrees** — state must be "answer for subtree rooted at `v`," not "answer for the whole tree." Mixing these is the classic bug.
- **Re-rooting identity** — when the aggregation isn't invertible (e.g., `max`), you can't just subtract — hence top-2.

### Real-world uses

- **Filesystem aggregation** — directory sizes, file counts → subtree DP.
- **Organizational trees** — salary sums, head-count per division.
- **HTML/DOM traversal** — compute layout, sum of text lengths per subtree.
- **XML/JSON query planning** — subtree cost estimation.
- **Phylogenetic analysis** — probabilities over evolutionary trees (Felsenstein's pruning is tree DP).
- **Router/switch path optimization on tree topologies.**
- **Decision-tree inference** — bottom-up pruning (cost-complexity pruning).
- **Game tree evaluation — minimax** is a tree DP.

### When *not* to use

- Graph has cycles → it's not a tree; use general graph algorithms (DFS + SCC, Dijkstra, etc.).
- Subtree decomposition gives no leverage — problem isn't recursive.
- You need path queries between arbitrary nodes at scale — use LCA + Euler tour + BIT, or HLD.

## See Also

- [`dp-on-dag.md`](dp-on-dag.md) — DAG generalization.
- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../../data-structures/trees/binary-tree.md`](../../data-structures/trees/binary-tree.md) — base DS.
- [`../graph/connectivity-scc.md`](../graph/connectivity-scc.md) — when graph isn't a tree.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
