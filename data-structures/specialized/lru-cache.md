# LRU Cache

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

- Bounded-size cache that evicts **least recently used** items when full
- Gold standard when access patterns exhibit temporal locality
- Alternative eviction policies (below) for specific patterns
- **Not** when: unbounded cache (just use a dict); perfect hit-rate (LRU isn't optimal — [Bélády](#other-eviction-policies) is)

---

## Interview View

### Python's `OrderedDict` — idiomatic

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)   # O(1) mark as MRU
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # pop LRU
```

**All operations O(1).** Since Python 3.7, `dict` also preserves insertion order, but `OrderedDict.move_to_end` is O(1) — use it.

### From Scratch: Doubly Linked List + HashMap

This is the classic interview answer. Explains *why* LRU is O(1).

```python
class Node:
    __slots__ = ("key", "val", "prev", "next")
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.map: dict[int, Node] = {}
        # Sentinel head/tail simplify edge cases
        self.head = Node()  # most-recently-used side
        self.tail = Node()  # least-recently-used side
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, n: Node):
        n.prev.next = n.next
        n.next.prev = n.prev

    def _add_front(self, n: Node):
        n.next = self.head.next
        n.prev = self.head
        self.head.next.prev = n
        self.head.next = n

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        n = self.map[key]
        self._remove(n)
        self._add_front(n)
        return n.val

    def put(self, key: int, val: int) -> None:
        if key in self.map:
            n = self.map[key]
            n.val = val
            self._remove(n)
            self._add_front(n)
            return
        n = Node(key, val)
        self.map[key] = n
        self._add_front(n)
        if len(self.map) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]
```

### Interview Explanation

> **"Hash map gives O(1) lookup. But tracking LRU requires reordering — hash map has no order. Doubly linked list gives O(1) move-to-front and O(1) remove-tail. Together: hash map maps key → node; list maintains recency order. Sentinel head/tail nodes kill edge cases."**

---

## Reference View

### Why Doubly Linked (not Singly)?

When we evict the LRU node, we need O(1) `.prev`. Singly linked list needs a traversal to find predecessor of tail. Doubly linked solves this with extra pointer per node.

### Complexity

| Op | Time | Space |
|----|------|-------|
| get | O(1) | — |
| put | O(1) | — |
| Memory | O(capacity) | — |

### Built-in Alternatives

| Option | Notes |
|--------|-------|
| `functools.lru_cache` | Decorator for function memoization; thread-safe; good default |
| `functools.cache` | Unbounded; Python 3.9+ |
| `cachetools.LRUCache` | PyPI; many variants |
| `OrderedDict` | Manual; most flexible |

```python
from functools import lru_cache

@lru_cache(maxsize=1024)
def expensive(x):
    ...
```

### Other Eviction Policies

| Policy | Eviction criterion | Typical use |
|--------|---------------------|-------------|
| **LRU** | Least recently used | Default; good general purpose |
| **LFU** | Least frequently used | Stable access distributions (CDN edge) |
| **FIFO** | Oldest added | Simple; when recency doesn't matter |
| **MRU** | Most recently used | "If you looked at it once, you won't again" |
| **ARC** (Adaptive Replacement) | Blend of LRU + LFU | IBM zFS, ZFS |
| **2Q** | Two queues: hot + probational | PostgreSQL buffer |
| **TinyLFU / W-TinyLFU** | Count-Min Sketch of recent frequency | Caffeine (Java), modern favorite |
| **CLOCK / CLOCK-Pro** | Approximate LRU, O(1) with circular list | OS page replacement |
| **Bélády's algorithm (OPT)** | Evict item used furthest in future | Theoretical optimum; offline only |

### LRU vs LFU vs ARC Summary

- **LRU:** great for recency-dominated workloads. Bad if one-time scans trash the cache (e.g., full-table scan evicts hot rows).
- **LFU:** immune to scans but slow to adapt to pattern changes; "cache pollution" by once-popular items.
- **ARC / 2Q / TinyLFU:** hybrid, resist both pathologies. State of the art.

### Cache-Coherence Pitfalls

1. **Hotspots** — all traffic hitting one key still bottlenecks the cache lookup. Shard or use local caches.
2. **Stampede** on cold key — many workers hit the cache miss simultaneously. Use request coalescing / singleflight / probabilistic early refresh.
3. **Inconsistency across nodes** — each app server has its own LRU; updates in one don't invalidate others. Use Redis-backed cache with pub/sub invalidation or short TTL.
4. **Cache scan pattern** — a one-time batch job scans the DB and flushes all hot items. Consider scan-resistant policies (ARC) or mark those reads `bypass-cache`.
5. **Memory leaks** — forgetting `maxsize` on `lru_cache` decorator on a method with `self` — entries keep object references alive.

### Real-World Uses

- **OS page cache** — approximate LRU via clock algorithm
- **CPU cache lines** — hardware LRU per set in set-associative caches
- **Database buffer pools** — Postgres (clock-sweep), MySQL InnoDB (modified LRU)
- **Redis** — `maxmemory-policy allkeys-lru` / `allkeys-lfu` / etc.
- **CDN edge caches** — usually TinyLFU or variants
- **Browser HTTP cache** — approximate LRU
- **Function memoization** (`functools.lru_cache`)

### Distributed Cache (Memcached / Redis)

Redis maintains its own LRU approximation (not exact — uses random sampling for speed). To get **exact** LRU in Redis, cost would be O(n). `maxmemory-samples` tunes the approximation.

### LRU Cache as Building Block

- **URL shortener** — cache most-requested short → long mappings
- **Image thumbnails** — recent user viewed images cached in memory
- **DNS resolver** — recently-resolved hostnames
- **Compiler** — type-check / parse-tree cache keyed by file hash
- **Database query plan cache** — recently-seen SQL text → plan

---

## See Also

- [../linear/linked-lists.md](../linear/linked-lists.md) — doubly linked list
- [../hash-based/hash-tables.md](../hash-based/hash-tables.md) — O(1) key lookup
- [../probabilistic/count-min-sketch.md](../probabilistic/count-min-sketch.md) — used in TinyLFU
- [../README.md](../README.md) — decision table
- [../../interviews/algorithms-ds.md](../../interviews/algorithms-ds.md) — TypeScript version
