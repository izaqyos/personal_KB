# Skip List

> **Source:** Pugh (1990)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Probabilistically balanced ordered search — **"a balanced BST without rotations"**.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- Ordered collection with fast search, insert, delete
- Simpler code than AVL / Red-Black while getting the same O(log n) behavior
- Concurrent data structure (easier lock-free than trees)
- **Not** when: you want deterministic worst case (still probabilistic; very rare O(n))

---

## Interview View

### Visual

Multiple sorted linked lists stacked; higher levels skip farther. Searching descends a "staircase":

```
level 3:  HEAD ─────────────────▶ 30 ──────────────▶ NULL
level 2:  HEAD ─────────▶ 15 ───▶ 30 ─────▶ 50 ────▶ NULL
level 1:  HEAD ───▶ 10 ─▶ 15 ───▶ 30 ─▶ 40 ▶ 50 ────▶ NULL
level 0:  HEAD ──▶ 5 ─▶ 10 ─▶ 15 ─▶ 20 ─▶ 30 ─▶ 40 ─▶ 50 ─▶ NULL
```

### Insertion Levels

Each new node gets a random height by flipping coins:

```python
import random

def random_level(max_level=16, p=0.5):
    lvl = 0
    while random.random() < p and lvl < max_level - 1:
        lvl += 1
    return lvl
```

With p = 0.5: half the nodes at level 0, a quarter at level 1, an eighth at level 2, ... giving average height O(log n).

### Minimal Implementation

```python
import random

class Node:
    __slots__ = ("key", "val", "forward")
    def __init__(self, key, val, level):
        self.key = key
        self.val = val
        self.forward = [None] * (level + 1)

class SkipList:
    MAX_LEVEL = 16
    P = 0.5

    def __init__(self):
        self.header = Node(None, None, self.MAX_LEVEL)
        self.level = 0

    def _random_level(self):
        lvl = 0
        while random.random() < self.P and lvl < self.MAX_LEVEL - 1:
            lvl += 1
        return lvl

    def search(self, key):
        x = self.header
        for i in range(self.level, -1, -1):
            while x.forward[i] and x.forward[i].key < key:
                x = x.forward[i]
        x = x.forward[0]
        return x.val if x and x.key == key else None

    def insert(self, key, val):
        update = [None] * (self.MAX_LEVEL + 1)
        x = self.header
        for i in range(self.level, -1, -1):
            while x.forward[i] and x.forward[i].key < key:
                x = x.forward[i]
            update[i] = x

        x = x.forward[0]
        if x and x.key == key:
            x.val = val
            return

        lvl = self._random_level()
        if lvl > self.level:
            for i in range(self.level + 1, lvl + 1):
                update[i] = self.header
            self.level = lvl

        new_node = Node(key, val, lvl)
        for i in range(lvl + 1):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node

    def delete(self, key):
        update = [None] * (self.MAX_LEVEL + 1)
        x = self.header
        for i in range(self.level, -1, -1):
            while x.forward[i] and x.forward[i].key < key:
                x = x.forward[i]
            update[i] = x

        x = x.forward[0]
        if not x or x.key != key:
            return False

        for i in range(self.level + 1):
            if update[i].forward[i] != x:
                break
            update[i].forward[i] = x.forward[i]

        while self.level > 0 and self.header.forward[self.level] is None:
            self.level -= 1
        return True
```

---

## Reference View

### Expected Complexity

| Op | Expected | Worst (rare) |
|----|----------|--------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Range scan | O(log n + k) | O(n) |
| Space | O(n) expected | O(n log n) worst |

Worst-case O(n) happens only with extremely unlucky coin flips. With `p = 0.5` and n = 10⁹, the odds of observing it are negligible.

### Skip List vs Balanced BST

| Property | Skip list | AVL / Red-Black |
|----------|-----------|-----------------|
| Code complexity | **Low** (~100 lines) | High (~500 lines for RB with delete) |
| Memory per node | Higher (levels of forward pointers) | Lower (2 children) |
| Cache behavior | Similar to linked list — pointer chase | Same |
| Concurrency | **Easier** (lock per link) | Hard (rotations touch 4+ nodes) |
| Worst case | Probabilistic | Deterministic |
| Range scans | Easy (level-0 linked list) | Harder (in-order) |

### Why Simpler?

Balanced BSTs maintain invariants via rotations — ~6 cases for RB delete, each with a diagram. Skip list has no rotations: just sorted linked lists with random "express lanes". The randomness does the balancing.

### Variants

| Variant | Idea |
|---------|------|
| **Deterministic skip list** | Fixed distribution instead of coin flips |
| **Lock-free skip list** | CAS-based concurrent implementation |
| **Indexable skip list** | Keep subtree-size counts → O(log n) rank-by-index |
| **X-fast / Y-fast tries** | Specialized for integer keys |

### Tuning `p`

- `p = 0.5` — fewer pointers per node, slightly more levels. Default.
- `p = 0.25` — fewer levels, more search per level. Sometimes slightly faster in practice.

### Real-World Uses

| System | Use |
|--------|-----|
| **Redis `ZSET`** (sorted set) | Skip list + hash map for O(log n) rank queries, O(1) score lookup |
| **LevelDB / RocksDB MemTable** | Skip list as in-memory writable index |
| **Apache Cassandra MemTable** | Skip list sorted structure |
| **Java `ConcurrentSkipListMap`** / `ConcurrentSkipListSet` | JDK's concurrent ordered map |
| **Lucene postings lists** | Skip pointers to accelerate posting intersection |

### Redis ZSET: Classic Example

Redis sorted sets combine:
- **Hash table** (member → score, O(1) lookup)
- **Skip list** (score-ordered, O(log n) rank and range ops)

→ `ZADD`, `ZSCORE` O(1); `ZRANGEBYSCORE`, `ZRANK` O(log n + k).

Antirez picked skip list over RB tree in Redis because "they are simpler to implement and match the access patterns" (Redis source comment).

### Pitfalls

1. **Not seeding randomness** — reproducible bugs, adversarial insertion order
2. **Recomputing level per insert** based on key — breaks probabilistic guarantee (must be independent)
3. **Tall nodes waste memory** — cap max level
4. **Sequential access** on huge skip lists is still cache-unfriendly; use a packed array if you never insert

---

## See Also

- [README.md](README.md) — probabilistic overview
- [../trees/bst.md](../trees/bst.md) — deterministic cousin
- [../trees/balanced-trees.md](../trees/balanced-trees.md) — AVL / Red-Black comparison
- [../linear/linked-lists.md](../linear/linked-lists.md) — foundation
- [../../system-design/redis/redis-primer.md](../../system-design/redis/redis-primer.md) — Redis ZSET
- [../README.md](../README.md) — decision table
