# Segment Tree

> **Source:** Competitive programming lore + CLRS
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Range queries (sum, min, max, gcd, …) **and** point or range updates, all in **O(log n)**.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- Range-aggregate queries over an array that **mutates**
- Any associative operation: sum, min, max, gcd, xor, matrix product
- Range-update problems (with lazy propagation)
- **Not** for: static arrays (prefix sums are O(1) queries after O(n) build); simple sum-only mutable arrays (use [Fenwick tree](fenwick-tree.md) — simpler code)

---

## Interview View

### Problem Setup

Given `arr = [a_0, a_1, ..., a_{n-1}]`, support:
- `update(i, v)` — set `arr[i] = v`
- `query(l, r)` — return `f(arr[l..r])` for some associative f (sum, min, max, ...)

Naive:
- Array: update O(1), query O(n)
- Prefix sum: update O(n) (rebuild), query O(1)

Segment tree: **both in O(log n)**.

### Structure

A binary tree where:
- Each leaf corresponds to one array element
- Each internal node stores `f(children)` — the aggregate of its subtree's range

For n = 8 (sum):

```
                  [sum 0..7]
                 /          \
           [0..3]            [4..7]
           /    \            /    \
         [0..1][2..3]     [4..5][6..7]
         / \    / \       / \    / \
        a0 a1 a2 a3      a4 a5 a6 a7
```

### Array-Backed Segment Tree

Use an array of size `4n` (safe upper bound), nodes at `2i+1, 2i+2`.

```python
class SegTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, node, lo, hi):
        if lo == hi:
            self.tree[node] = arr[lo]
            return
        mid = (lo + hi) // 2
        self._build(arr, 2*node+1, lo, mid)
        self._build(arr, 2*node+2, mid+1, hi)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def update(self, i, val):
        self._update(0, 0, self.n - 1, i, val)

    def _update(self, node, lo, hi, i, val):
        if lo == hi:
            self.tree[node] = val
            return
        mid = (lo + hi) // 2
        if i <= mid:
            self._update(2*node+1, lo, mid, i, val)
        else:
            self._update(2*node+2, mid+1, hi, i, val)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def query(self, l, r):
        return self._query(0, 0, self.n - 1, l, r)

    def _query(self, node, lo, hi, l, r):
        if r < lo or hi < l:
            return 0                         # identity for sum
        if l <= lo and hi <= r:
            return self.tree[node]
        mid = (lo + hi) // 2
        return self._query(2*node+1, lo, mid, l, r) + \
               self._query(2*node+2, mid+1, hi, l, r)
```

### Changing the Operation

Replace `+` with:
- `min` — use `+inf` as identity
- `max` — use `-inf`
- `gcd` — use `0`
- `xor` — use `0`

The tree structure is the same; only merge function + identity change.

### Lazy Propagation — Range Updates

Problem: `range_update(l, r, val)` — add `val` to every element in `[l, r]`.

Without lazy: touch every index → O(n) worst case. **Lazy propagation** stores pending updates at internal nodes and pushes them down only when needed.

```python
class SegTreeLazy:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, node, lo, hi):
        if lo == hi:
            self.tree[node] = arr[lo]; return
        m = (lo + hi) // 2
        self._build(arr, 2*node+1, lo, m)
        self._build(arr, 2*node+2, m+1, hi)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def _push(self, node, lo, hi):
        if self.lazy[node] == 0: return
        m = (lo + hi) // 2
        lc, rc = 2*node+1, 2*node+2
        self.tree[lc] += self.lazy[node] * (m - lo + 1)
        self.tree[rc] += self.lazy[node] * (hi - m)
        self.lazy[lc] += self.lazy[node]
        self.lazy[rc] += self.lazy[node]
        self.lazy[node] = 0

    def range_add(self, l, r, val):
        self._add(0, 0, self.n - 1, l, r, val)

    def _add(self, node, lo, hi, l, r, val):
        if r < lo or hi < l: return
        if l <= lo and hi <= r:
            self.tree[node] += val * (hi - lo + 1)
            self.lazy[node] += val
            return
        self._push(node, lo, hi)
        m = (lo + hi) // 2
        self._add(2*node+1, lo, m, l, r, val)
        self._add(2*node+2, m+1, hi, l, r, val)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def range_sum(self, l, r):
        return self._sum(0, 0, self.n - 1, l, r)

    def _sum(self, node, lo, hi, l, r):
        if r < lo or hi < l: return 0
        if l <= lo and hi <= r: return self.tree[node]
        self._push(node, lo, hi)
        m = (lo + hi) // 2
        return self._sum(2*node+1, lo, m, l, r) + self._sum(2*node+2, m+1, hi, l, r)
```

---

## Reference View

### Complexity

| Op | Time | Space |
|----|------|-------|
| Build | O(n) | O(n) |
| Point update | O(log n) | — |
| Range update (lazy) | O(log n) | — |
| Range query | O(log n) | — |
| Total memory | 4n slots | — |

### Variants

| Variant | Use |
|---------|-----|
| **Classic** | Point update + range query |
| **Lazy propagation** | Range update + range query |
| **Persistent seg tree** | Historical versions; O(log n) per op, O(n log n) memory for n versions |
| **Dynamic / Sparse seg tree** | Coordinates too large to materialize; lazy-create nodes |
| **2D seg tree** | Rectangle queries; O(log² n) per op |
| **Merge Sort Tree** | Each node stores sorted merge of children; range k-th order queries |
| **Sqrt decomposition** | Simpler alternative; O(√n) per op |

### Segment Tree vs Fenwick Tree (BIT)

| | Segment Tree | [Fenwick Tree](fenwick-tree.md) |
|-|--------------|----------------------------------|
| Code size | ~50 lines | ~15 lines |
| Memory | 4n | n |
| Operations supported | any associative | prefix-invertible (sum, xor) mostly |
| Range update | With lazy propagation | Possible with 2 BITs, only for sum |
| Speed (constant factor) | Slower | Faster |

**Rule:** if it's just prefix sums or XOR, use Fenwick. Otherwise segment tree.

### Segment Tree vs Sparse Table

| | Segment tree | Sparse table |
|-|--------------|--------------|
| Updates | Supported | **No** (immutable) |
| Build | O(n) | O(n log n) |
| Query | O(log n) | **O(1)** for idempotent ops (min, max, gcd) |

Use sparse table when the array is **static** and operation is idempotent.

### Real-World / Problem-Solving Uses

- **Competitive programming** — "range update + range sum" is a staple
- **Databases** — approximate summary structures for OLAP rollups
- **Computational geometry** — interval trees / range trees (close cousins)
- **Version control** — persistent segment trees power some CRDT / time-travel scans
- **Game engines** — spatial partitioning for collision (more commonly k-d tree or BVH)

### Common Pitfalls

1. **Array size `2n` too small** — use `4n`. (Safe upper bound for non-power-of-2 n.)
2. **Forgetting to push lazy** before descending / reading children
3. **Using wrong identity** — e.g. returning 0 for out-of-range `min` query gives wrong answer
4. **Integer overflow** in sum queries on large arrays — use `long` in C++; fine in Python
5. **Off-by-one** with inclusive `r` — be consistent throughout

---

## See Also

- [fenwick-tree.md](fenwick-tree.md) — simpler cousin for sums
- [../trees/binary-tree.md](../trees/binary-tree.md)
- [../README.md](../README.md) — decision table
