# Data Structures

> **Source:** Personal notes + distilled from multiple KB files
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Structured reference for data structures — from fundamentals (arrays, hash maps) to probabilistic DS (Bloom, HLL). Every entry has two subsections:

- **Interview View** — template code, common patterns, complexity, 1-2 leetcode-style problems
- **Reference View** — theory, variants, real-world use cases, tradeoffs

Code samples are in **Python** throughout.

---

## Table of Contents

- [Decision Table — "I need to..."](#decision-table--i-need-to)
- [Complexity Cheat Sheet](#complexity-cheat-sheet)
- [Sections](#sections)
- [See Also](#see-also)

---

## Decision Table — "I need to..."

| Goal | Best Fit | Why |
|------|----------|-----|
| Index-based random access | **Array** / dynamic array | O(1) access |
| Frequent insert/delete at ends | **Deque** / linked list | O(1) at both ends |
| Insert/delete at arbitrary position | **Linked list** | O(1) once positioned; array is O(n) |
| Exact membership — fits in RAM | **Hash set** | O(1) avg lookup |
| **Approximate** membership — huge scale | **[Bloom filter](probabilistic/bloom-filter.md)** | ~10 bits/element vs full object |
| **Exact** cardinality (unique count) | **Hash set** | needs O(n) memory |
| **Approximate** cardinality — streaming | **[HyperLogLog](probabilistic/hyperloglog.md)** | O(log log n) — 12 KB counts billions |
| Frequency of items in a stream | **[Count-Min Sketch](probabilistic/count-min-sketch.md)** | sub-linear memory |
| Uniform sample of unknown-size stream | **[Reservoir Sampling](probabilistic/reservoir-sampling.md)** | O(k) memory |
| Similarity between large sets | **[MinHash](probabilistic/minhash.md)** | Jaccard estimation |
| Ordered iteration + fast lookup | **BST / Skip list** | O(log n) ordered ops |
| Ordered + **guaranteed** balance | **[Balanced trees](trees/balanced-trees.md)** (AVL, RB) | O(log n) worst case |
| Ordered + **probabilistic** balance | **[Skip list](probabilistic/skip-list.md)** | Simpler than RB tree, same avg perf |
| Get-min / get-max in O(1) | **[Heap](trees/heap.md)** (priority queue) | O(log n) insert/pop |
| Prefix search, autocomplete | **[Trie](trees/trie.md)** | O(k) by key length, not set size |
| Range sum / min / max queries | **[Segment tree](specialized/segment-tree.md)** / **[BIT](specialized/fenwick-tree.md)** | O(log n) per query |
| Connected components, cycle detect | **[Disjoint Set](sets-and-disjoint/disjoint-set.md)** (Union-Find) | near-O(1) amortized |
| Shortest path, graph traversal | **[Graph](graph/graph-representations.md)** | depends on weights, density |
| Cache with bounded size | **[LRU Cache](specialized/lru-cache.md)** | O(1) get/put via DLL + hash |
| Disk-resident index | **[B-Tree](trees/b-tree.md)** | minimizes disk reads |

---

## Complexity Cheat Sheet

| Structure | Access | Search | Insert | Delete | Min/Max | Space |
|-----------|--------|--------|--------|--------|---------|-------|
| Array (static) | O(1) | O(n) | O(n) | O(n) | O(n) | O(n) |
| Dynamic array | O(1) | O(n) | O(1) amortized | O(n) | O(n) | O(n) |
| Linked list (singly) | O(n) | O(n) | O(1) at head | O(1) at head | O(n) | O(n) |
| Doubly linked list | O(n) | O(n) | O(1) at ends | O(1) at ends | O(n) | O(n) |
| Stack / Queue | — | O(n) | O(1) | O(1) | O(n) | O(n) |
| Hash table | — | O(1) avg | O(1) avg | O(1) avg | O(n) | O(n) |
| Binary heap | — | O(n) | O(log n) | O(log n) | **O(1)** | O(n) |
| BST (unbalanced) | O(log n) avg / O(n) worst | same | same | same | O(log n) avg | O(n) |
| AVL / Red-Black | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Skip list | — | O(log n) avg | O(log n) avg | O(log n) avg | O(log n) | O(n) |
| Trie | — | O(k) | O(k) | O(k) | — | O(alphabet · n · k) worst |
| B-tree | — | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Disjoint set | — | O(α(n)) ≈ O(1) | O(α(n)) | — | — | O(n) |
| Bloom filter | — | O(k) | O(k) | — (no delete) | — | ~O(n) bits |
| Count-Min Sketch | — | O(k) | O(k) | — | — | O(w·d) sublinear |
| HyperLogLog | — | O(1) add | O(1) | — | — | **O(log log n)** |

*k = number of hash functions (for probabilistic DS) or key length (for trie).*
*α(n) = inverse Ackermann, effectively constant.*

---

## Sections

### [Linear](linear/)
- [arrays.md](linear/arrays.md) — dynamic arrays, amortized analysis
- [linked-lists.md](linear/linked-lists.md) — singly/doubly/circular, patterns (cycle detect, reverse)
- [stacks-queues.md](linear/stacks-queues.md) — LIFO/FIFO + monotonic stack/queue

### [Hash-based](hash-based/)
- [hash-tables.md](hash-based/hash-tables.md) — chaining, open addressing, load factor
- [sets.md](hash-based/sets.md) — operations, use cases

### [Trees](trees/)
- [binary-tree.md](trees/binary-tree.md) — fundamentals, traversals, recursion patterns
- [bst.md](trees/bst.md) — Binary Search Tree operations + pitfalls
- [balanced-trees.md](trees/balanced-trees.md) — AVL, Red-Black
- [heap.md](trees/heap.md) — binary heap + priority queue
- [trie.md](trees/trie.md) — prefix tree, autocomplete
- [b-tree.md](trees/b-tree.md) — disk-oriented index

### [Graph](graph/)
- [graph-representations.md](graph/graph-representations.md) — adjacency list/matrix
- [graph-algorithms.md](graph/graph-algorithms.md) — BFS/DFS/Dijkstra/topological sort

### [Sets & Disjoint Sets](sets-and-disjoint/)
- [disjoint-set.md](sets-and-disjoint/disjoint-set.md) — Union-Find (Kruskal, connected components)

### [Probabilistic](probabilistic/)
- [README.md](probabilistic/README.md) — when to trade accuracy for memory
- [bloom-filter.md](probabilistic/bloom-filter.md) — approximate membership
- [count-min-sketch.md](probabilistic/count-min-sketch.md) — frequency estimation
- [hyperloglog.md](probabilistic/hyperloglog.md) — cardinality in O(log log n)
- [skip-list.md](probabilistic/skip-list.md) — probabilistic balanced search
- [reservoir-sampling.md](probabilistic/reservoir-sampling.md) — streaming sampling
- [minhash.md](probabilistic/minhash.md) — Jaccard similarity

### [Specialized](specialized/)
- [lru-cache.md](specialized/lru-cache.md) — O(1) cache via DLL + hash
- [segment-tree.md](specialized/segment-tree.md) — range queries
- [fenwick-tree.md](specialized/fenwick-tree.md) — Binary Indexed Tree

---

## See Also

- [interviews/algorithms-ds.md](../interviews/algorithms-ds.md) — original cheat sheet (TypeScript)
- [algorithms/](../algorithms/README.md) — companion Algorithms section (patterns, paradigms, sorting, searching, DP, graph, strings, number theory, geometry). DS here; algorithm variants there.
- [interviews/coding-idioms.md](../interviews/coding-idioms.md)
- [leetcode-kb](../leetcode-kb) — practice problems
- [interview-qs-kb](../interview-qs-kb) — older C-based DS Q&A
- [system-design/redis/](../system-design/redis/) — Redis data types (sorted sets use skip lists)
