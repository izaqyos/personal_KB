# Hash Tables

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

- Fast (O(1) avg) lookup, insert, delete by key
- Deduplication, counting, indexing
- Memoization / caching by key
- **Not** for: ordered iteration (use [BST](../trees/bst.md) or `SortedDict`), memory-constrained workloads (use [Bloom filter](../probabilistic/bloom-filter.md))

---

## Interview View

### Python: `dict` and `set`

```python
d = {}
d["k"] = 1           # O(1) avg
d["k"]               # O(1) avg, KeyError if missing
d.get("k", 0)        # O(1) avg, default if missing
del d["k"]           # O(1) avg
"k" in d             # O(1) avg
len(d)               # O(1)

from collections import defaultdict, Counter
freq = Counter("mississippi")         # {'i': 4, 's': 4, 'p': 2, 'm': 1}
adj = defaultdict(list)
adj[node].append(neighbor)            # no KeyError on first access
```

### Two-Sum Pattern — O(n)

```python
def two_sum(nums: list[int], target: int) -> list[int] | None:
    seen = {}  # value -> index
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return None
```

### Frequency Counting

```python
def most_common_char(s: str) -> str:
    from collections import Counter
    return Counter(s).most_common(1)[0][0]
```

### Group by Canonical Key — Anagrams

```python
from collections import defaultdict

def group_anagrams(words: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for w in words:
        key = tuple(sorted(w))
        groups[key].append(w)
    return list(groups.values())
```

### Sliding Window with Hash Map — Longest Substring No Repeat

```python
def longest_unique(s: str) -> int:
    last = {}
    start = best = 0
    for i, c in enumerate(s):
        if c in last and last[c] >= start:
            start = last[c] + 1
        last[c] = i
        best = max(best, i - start + 1)
    return best
```

---

## Reference View

### How It Works

```
key ── hash(key) ──mod m──▶ bucket index
                              │
                              ├─ bucket 0: [(k1,v1), (k5,v5)]   <- chaining
                              ├─ bucket 1: [(k2,v2)]
                              └─ bucket 2: [...]
```

Two pieces: a **hash function** that maps keys to integers, and a **collision resolution strategy**.

### Hash Function Properties

1. **Deterministic** — same key → same hash
2. **Fast** — typically O(1) for fixed-size keys, O(k) for strings
3. **Uniform** — minimize collisions across buckets
4. **Avalanche** — small input change → large output change
5. **Keyed / randomized** (for security) — defeats HashDoS attacks. Python's `hash()` uses a per-process random seed by default.

### Collision Resolution

**1. Separate Chaining** — each bucket holds a linked list (or list, or small tree)

```
bucket[i] -> [(k,v), (k,v), ...]
```

- Pro: simple, handles high load factor OK
- Con: pointer-chasing, cache-unfriendly
- Used by: Python `dict` (historically), Java `HashMap`

**2. Open Addressing** — on collision, probe for next empty slot

- Linear probing: `h(k), h(k)+1, h(k)+2, ...`
- Quadratic probing: `h(k), h(k)+1², h(k)+2², ...`
- Double hashing: use second hash as step size
- Pro: cache-friendly (contiguous array)
- Con: clustering, must resize earlier (load factor ~0.7)
- Used by: Python `dict` (modern, open addressing with perturbation), Go `map`

### Load Factor

**α = n / m** where n = entries, m = bucket count.

- Chaining: tolerable up to α ≈ 1–2
- Open addressing: resize at α ≈ 0.7
- When exceeded → **rehash**: allocate new larger array, reinsert all keys. Amortized O(1) per insert across many inserts.

### Python dict — Specifics

- Open addressing with **perturbation** probing (not linear)
- **Insertion-order preserving** since Python 3.7 (language guarantee)
- Implemented as a compact array of entries + sparse index array (save memory)
- Keys must be **hashable**: `__hash__` and `__eq__`. Mutables (list, dict, set) are not hashable by default — use `tuple` or `frozenset`.

### HashDoS

If the hash function is public and deterministic, attacker can craft keys that all collide → O(n) lookup → service slow. Mitigation: **randomized hash seed per process** (Python default since 3.3 via `PYTHONHASHSEED`).

### Complexity

| Operation | Average | Worst | Notes |
|-----------|---------|-------|-------|
| Insert | O(1) | O(n) | Worst = all keys collide into one bucket |
| Lookup | O(1) | O(n) | |
| Delete | O(1) | O(n) | |
| Iterate | O(n) | O(n + m) | Open addressing touches empty slots |
| Rehash | — | O(n) | Happens rarely, amortized O(1) per insert |

### Real-World Uses

- **Language runtimes** — Python `dict`, JS object, Java `HashMap`
- **Databases** — hash indexes (e.g., Postgres `hash` index type), hash joins
- **Caching** — memcached, Redis (top-level keys are a hash table)
- **Deduplication** — set membership
- **Symbol tables** in compilers
- **Rate limiters, session stores, feature flags**

### Hash Table vs Alternatives

| If you need... | Use |
|----------------|-----|
| Ordered iteration | BST / `SortedDict` / B-tree |
| Prefix search | [Trie](../trees/trie.md) |
| Approximate membership, tiny memory | [Bloom filter](../probabilistic/bloom-filter.md) |
| Approximate cardinality | [HyperLogLog](../probabilistic/hyperloglog.md) |
| Approximate frequency | [Count-Min Sketch](../probabilistic/count-min-sketch.md) |

---

## See Also

- [sets.md](sets.md)
- [../probabilistic/bloom-filter.md](../probabilistic/bloom-filter.md) — space-efficient alternative
- [../trees/trie.md](../trees/trie.md) — alternative for string keys with prefix ops
- [../README.md](../README.md) — decision table
