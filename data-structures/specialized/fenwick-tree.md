# Fenwick Tree (Binary Indexed Tree, BIT)

> **Source:** Fenwick (1994)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Tiny, elegant structure for **prefix sums with point updates** in O(log n).

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- Prefix-sum over a **mutable** array
- Count of elements ≤ k online (frequency table + prefix sum)
- Inversions count
- **Not** for: range-max / range-min (use [segment tree](segment-tree.md)); non-invertible aggregates

**Rule of thumb:** any problem solvable with prefix sum on a static array → BIT if the array mutates.

---

## Interview View

### The Trick

Index `i` (1-based) is "responsible" for a range of size equal to the lowest set bit of `i`, often called `lowbit(i) = i & -i`.

```
i      bin      lowbit   covers indices
1      001      1        [1, 1]
2      010      2        [1, 2]
3      011      1        [3, 3]
4      100      4        [1, 4]
5      101      1        [5, 5]
6      110      2        [5, 6]
7      111      1        [7, 7]
8     1000      8        [1, 8]
```

Prefix sum to index `i` = sum of `bit[i] + bit[i - lowbit(i)] + ...` (walk by subtracting lowbit).
Point update at `i` propagates to `bit[i + lowbit(i)], bit[...], ...` (walk by adding lowbit).

### Minimal Python

```python
class BIT:
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)  # 1-indexed

    def update(self, i: int, delta: int):
        """Add delta to position i (1-indexed)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def prefix(self, i: int) -> int:
        """Sum of arr[1..i]."""
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

    def range_sum(self, l: int, r: int) -> int:
        """Sum of arr[l..r], inclusive, 1-indexed."""
        return self.prefix(r) - self.prefix(l - 1)
```

### Initialize from Array in O(n)

```python
def build(arr):
    n = len(arr)
    bit = BIT(n)
    # Naive O(n log n)
    for i, x in enumerate(arr, 1):
        bit.update(i, x)

    # O(n) in-place trick:
    # for i in 1..n: tree[i] = arr[i-1]; then propagate
    for i in range(1, n + 1):
        bit.tree[i] = arr[i - 1]
    for i in range(1, n + 1):
        j = i + (i & -i)
        if j <= n:
            bit.tree[j] += bit.tree[i]
    return bit
```

### Classic Problem — Count of Smaller Numbers After Self

For each `arr[i]`, count elements to the right that are smaller.

```python
def count_smaller(arr):
    # Coordinate compression
    sorted_vals = sorted(set(arr))
    rank = {v: i + 1 for i, v in enumerate(sorted_vals)}
    bit = BIT(len(sorted_vals))
    out = [0] * len(arr)
    for i in range(len(arr) - 1, -1, -1):
        r = rank[arr[i]]
        out[i] = bit.prefix(r - 1)   # how many smaller than arr[i] seen so far
        bit.update(r, 1)
    return out
```

### Classic Problem — Inversion Count

Same idea: iterate from left, for each `arr[i]` count how many *larger* elements have appeared.

```python
def inversions(arr):
    sorted_vals = sorted(set(arr))
    rank = {v: i + 1 for i, v in enumerate(sorted_vals)}
    bit = BIT(len(sorted_vals))
    inv = 0
    for x in arr:
        r = rank[x]
        inv += bit.prefix(len(sorted_vals)) - bit.prefix(r)
        bit.update(r, 1)
    return inv
```

---

## Reference View

### Complexity

| Op | Time |
|----|------|
| `update` | O(log n) |
| `prefix` | O(log n) |
| `range_sum` | O(log n) |
| Build from array | O(n) |
| Memory | O(n) |

### Range Updates + Range Queries (Two BITs Trick)

Basic BIT supports point-update + prefix-query. For range-update + range-query:

Store two BITs, `B1` and `B2`, encoding:

```
sum(1..p) = p * prefix(B1, p) − prefix(B2, p)
```

Update `[l, r]` by `v`:
- `B1.update(l, v)`, `B1.update(r+1, -v)`
- `B2.update(l, v*(l-1))`, `B2.update(r+1, -v*r)`

Beautiful technique but memorize the formula if it's likely on the whiteboard. Otherwise use a [segment tree with lazy propagation](segment-tree.md).

### 2D Fenwick Tree

Straightforward extension for 2D prefix sums (e.g. count of points in a rectangle). O(log² n) per op, O(n·m) memory.

```python
class BIT2D:
    def __init__(self, rows, cols):
        self.tree = [[0] * (cols + 1) for _ in range(rows + 1)]
        self.R = rows; self.C = cols

    def update(self, r, c, delta):
        i = r
        while i <= self.R:
            j = c
            while j <= self.C:
                self.tree[i][j] += delta
                j += j & -j
            i += i & -i

    def prefix(self, r, c):
        s = 0
        i = r
        while i > 0:
            j = c
            while j > 0:
                s += self.tree[i][j]
                j -= j & -j
            i -= i & -i
        return s
```

### Segment Tree vs Fenwick Tree

| | Fenwick | [Segment tree](segment-tree.md) |
|-|---------|--------------------------------|
| Code size | ~15 lines | ~50 lines |
| Memory | n | 4n |
| Constant factor | Low | Higher |
| Prefix-sum style ops | ✓ | ✓ |
| Range max / min | ✗ | ✓ |
| Range updates | With tricks | With lazy propagation |
| 2D extension | Easy | More code |

**When to choose Fenwick:** prefix sums, xor, count-by-rank. **Otherwise:** segment tree.

### Real-World / Problem-Solving Uses

- **Competitive programming** — inversions, count smaller to right, k-th smallest in stream (BIT + binary search)
- **Databases** — approximate "percent rank" queries
- **Game engines** — per-tile event counts in a tilemap (2D BIT)
- **ML feature engineering** — rolling counts with decay (combined with cyclic buffers)

### Pitfalls

1. **0-indexed vs 1-indexed** — BIT is naturally 1-indexed; mixing causes off-by-one in `i & -i`
2. **Forgetting coordinate compression** — if values are sparse/huge, map them to dense indices first
3. **Trying to do range-max** — BIT requires an invertible operation. Use segment tree.
4. **Using for float updates in adversarial inputs** — floating-point accumulated error worse than naive sum

---

## See Also

- [segment-tree.md](segment-tree.md) — more flexible cousin
- [../linear/arrays.md](../linear/arrays.md) — prefix sum on static array
- [../README.md](../README.md) — decision table
