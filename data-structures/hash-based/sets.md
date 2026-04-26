# Sets

> **Source:** Personal notes
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

- Exact membership test
- Deduplication
- Intersection / union / difference across collections
- **Not** for: ordered iteration (use `SortedSet`), approximate membership at scale (use [Bloom](../probabilistic/bloom-filter.md))

---

## Interview View

### Python `set` / `frozenset`

```python
s = set()
s.add(1)             # O(1)
s.discard(1)         # O(1) — no error if absent
s.remove(1)          # O(1) — KeyError if absent
1 in s               # O(1)

# Set algebra
a | b                # union
a & b                # intersection
a - b                # difference
a ^ b                # symmetric difference

# frozenset: immutable, hashable → usable as dict key
key = frozenset({"a", "b"})
```

### Deduplicate preserving order

```python
def dedup(seq):
    seen = set()
    out = []
    for x in seq:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out
```

### Set Operations as O(min(|a|,|b|))

```python
def intersect(a: set, b: set) -> set:
    # Iterate the smaller set; lookup in the larger
    if len(a) > len(b):
        a, b = b, a
    return {x for x in a if x in b}
```

### Cycle Detection in a Linked List (alt to Floyd)

```python
def has_cycle(head) -> bool:
    seen = set()
    while head:
        if id(head) in seen:
            return True
        seen.add(id(head))
        head = head.next
    return False
```

(Floyd's algorithm is O(1) space — see [linked-lists.md](../linear/linked-lists.md). The set version is O(n) space but simpler.)

---

## Reference View

### Internals

A `set` is a hash table with keys but no values. Python: open addressing with perturbation, same as `dict`. Uses `__hash__` and `__eq__` on elements.

### Set Types

| Type | Ordered? | Mutable? | Hashable? | Typical Use |
|------|----------|----------|-----------|-------------|
| `set` | No | Yes | No | General-purpose mutable set |
| `frozenset` | No | No | Yes | Dict keys, nested sets |
| `SortedSet` (from `sortedcontainers`) | Yes | Yes | No | Ordered membership + range ops |
| `collections.OrderedDict` + None values | Insertion-order | Yes | No | Pre-3.7 ordered sets (obsolete) |

### Complexity

| Op | Average | Worst |
|----|---------|-------|
| `add` | O(1) | O(n) |
| `in` | O(1) | O(n) |
| `remove` / `discard` | O(1) | O(n) |
| `a | b` (union) | O(|a| + |b|) | — |
| `a & b` (intersection) | O(min(|a|, |b|)) | — |
| `a - b` (difference) | O(|a|) | — |
| iterate | O(n) | — |

### Real-World Uses

- **Unique visitors / IPs** (when exact count is needed; use HLL for approx)
- **Blocklists / allowlists**
- **Feature flag audience sets**
- **Deduplication pipelines**
- **SQL `DISTINCT`, `IN (...)` clauses**
- **Graph algorithms** — visited sets during BFS/DFS

### When to Reach for Something Else

| Need | Use |
|------|-----|
| Sorted iteration + membership | [BST](../trees/bst.md) / `SortedSet` |
| Membership + tiny memory (billions of items) | [Bloom filter](../probabilistic/bloom-filter.md) |
| Cardinality only, huge scale | [HyperLogLog](../probabilistic/hyperloglog.md) |
| Jaccard similarity | [MinHash](../probabilistic/minhash.md) |
| Merge/split under "same-group" relation | [Disjoint Set](../sets-and-disjoint/disjoint-set.md) |

---

## See Also

- [hash-tables.md](hash-tables.md)
- [../probabilistic/bloom-filter.md](../probabilistic/bloom-filter.md)
- [../sets-and-disjoint/disjoint-set.md](../sets-and-disjoint/disjoint-set.md)
- [../README.md](../README.md) — decision table
