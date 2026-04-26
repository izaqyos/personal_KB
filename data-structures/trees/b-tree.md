# B-Tree / B+Tree

> **Source:** Personal notes + CLRS + PostgreSQL docs
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

- **Disk-resident indexes** — databases, filesystems
- Any ordered index where traversal cost is **dominated by page / block reads**, not CPU
- **Not** for: in-memory ordered set on small N (use RB tree, skip list)

---

## Interview View

> **Note:** You rarely implement a B-tree in interviews. Understand the **shape** and **why it beats BST for disk**.

### Mental Model

A generalization of a BST where each node holds **many keys and many children** (typically 100s-1000s per node).

```
                [30 | 70]
               /    |    \
        [10|20] [40|50|60] [80|90]
```

A node with `t` as minimum degree holds:
- Between `t−1` and `2t−1` keys (root may have fewer)
- Between `t` and `2t` children

Typical `t`: 50-500, tuned so a node fits in a **disk page** (usually 4KB-16KB).

### Why High Fanout?

Disk I/O: one read ≈ 10 ms (HDD), 100 μs (SSD). RAM: 100 ns.
→ 100,000× difference between page read and in-RAM lookup.

For n = 1 billion keys:
- Binary BST: log₂(10⁹) ≈ 30 levels → 30 disk reads
- B-tree, fanout 100: log₁₀₀(10⁹) ≈ 5 levels → 5 disk reads

**Cost is the tree height in page reads, not comparisons.**

### Search Idea

```python
def search(node, key):
    i = 0
    while i < len(node.keys) and key > node.keys[i]:
        i += 1
    if i < len(node.keys) and key == node.keys[i]:
        return (node, i)
    if node.leaf:
        return None
    return search(node.children[i], key)  # follow child pointer → 1 disk read
```

Each level is linear-in-keys-per-node search (often with binary search), but reads only one page per level.

---

## Reference View

### B-Tree vs B+Tree

| Property | B-Tree | B+Tree |
|----------|--------|--------|
| Keys in internal nodes | Yes | **Only in leaves** (internals are routing keys) |
| Values | In every node | Only in leaves |
| Leaves linked? | No | Yes — doubly linked list |
| Range scan | DFS-walk tree | Walk linked leaves linearly |
| Space efficiency | Slightly better | Slightly worse (duplicate routing keys) |
| Typical use | Old filesystems (HFS, NTFS early) | Modern DBs, filesystems |

**Nearly all database indexes are B+trees.** Range scans are the killer feature.

### B+Tree Structure

```
Internal nodes: routing only
         [20 | 50]
        /    |    \
Leaves: [10, 15, 18] → [20, 30, 45] → [50, 70, 90]
           (doubly-linked list of leaves)
```

Range query `WHERE x BETWEEN 18 AND 50`:
1. Traverse down to leaf containing 18
2. Walk the leaf list until you pass 50

### Operations

| Op | Cost |
|----|------|
| Search | O(log_B n) disk reads, log_B n page fetches |
| Insert | O(log_B n) + occasional split propagation |
| Delete | O(log_B n) + occasional merge |
| Range scan of m items | O(log_B n + m/B) |

Here B = branching factor (≈ page size / avg entry size).

### Balance: Keys Per Node

- Every insert that overflows a node **splits** it: push median key to parent
- Every delete that underflows **borrows** from sibling, or **merges** siblings
- Invariant: all leaves are at the same depth — tree is **perfectly balanced**

### Page / Block Alignment

- Node size = OS page size or DB block size
- Typical: 8 KB (Postgres default), 16 KB (MySQL InnoDB)
- Disk controller reads whole pages — half-empty node = wasted I/O

### Real-World Uses

- **PostgreSQL** — default index is B-tree (actually B+tree-like)
- **MySQL InnoDB** — primary keys are clustered B+tree; secondary indexes also B+tree
- **SQLite** — B-tree for tables, B+tree for indexes
- **MongoDB WiredTiger** — B+tree
- **Filesystems** — ext4 (HTree), APFS, Btrfs, NTFS all use B-tree variants
- **Lucene / ElasticSearch** — BKD trees (B+tree cousin for multidim)

### Log-Structured Alternatives

B-trees struggle with write-heavy workloads on SSDs (write amplification from splits). Alternatives:

- **LSM-Tree** (Log-Structured Merge) — used by LevelDB, RocksDB, Cassandra, ScyllaDB, many NoSQL
  - Sequential writes, merged in background
  - Reads may hit multiple SSTables → slower
- **Fractal trees / Bϵ-trees** — hybrid, amortize writes

### Clustered vs Non-clustered Index

- **Clustered index** — data rows are stored in B+tree leaf order (MySQL primary key)
- **Non-clustered / secondary index** — B+tree leaves store pointers (row IDs or primary keys) back to the heap

### Tuning Knobs

- `fillfactor` — leave empty space in nodes for in-place updates (Postgres default 90%)
- **Page size** — OS page vs DB page; usually aligned
- **Bulk load** — build tree bottom-up for fewer splits (CREATE INDEX faster than n INSERTs)

### Common Pitfalls

1. **Not understanding leaf ordering** — range scans only cheap if query matches index order
2. **Over-indexing** — every index costs on writes (update B+tree on every insert)
3. **Low-cardinality indexes** — B+tree on a boolean column is usually useless; bitmap indexes or partial indexes better
4. **Ignoring write amplification** on SSDs → consider LSM for append-heavy workloads

---

## See Also

- [bst.md](bst.md) — simpler cousin
- [balanced-trees.md](balanced-trees.md) — in-RAM balanced trees
- [../README.md](../README.md) — decision table
- [../../system-design/](../../system-design/) — DB internals context
- [../../kb-db](../../kb-db) — database KB
