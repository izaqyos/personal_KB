# Balanced Search Trees (AVL, Red-Black)

> **Source:** Personal notes + CLRS
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

- Need **worst-case O(log n)** for insert/delete/search (not just average)
- Ordered iteration + range queries + guaranteed performance
- Real-time / latency-sensitive systems where O(n) tail is unacceptable
- **In practice** you use the language's stdlib (`std::map`, `TreeMap`, `sortedcontainers`). Rarely re-implemented in production code, but asked about in interviews.

---

## Interview View

> **Note:** You typically **don't** implement full rotation logic in interviews unless explicitly asked. Know the intuition, rotations, and tradeoffs.

### Rotations — the only primitive you need

A rotation preserves the BST invariant while changing the tree's shape.

```
     y                       x
    / \      right rotate   / \
   x   C    ─────────────▶ A   y
  / \       ◀───────────      / \
 A   B       left rotate     B   C
```

```python
def right_rotate(y):
    x = y.left
    y.left = x.right
    x.right = y
    # update heights / colors as needed
    return x  # new subtree root
```

### AVL Insert (intuition)

1. Standard BST insert
2. Walk back up to root, updating heights
3. If balance factor (left.height − right.height) becomes ±2, perform rotation(s):
   - LL case → right rotate
   - RR case → left rotate
   - LR case → left rotate child, then right rotate self
   - RL case → right rotate child, then left rotate self

Max 2 rotations per insert, O(log n) traversal.

### Red-Black Tree Properties

Every node is **red** or **black**, with invariants:

1. Root is black.
2. Every leaf (conceptual NIL) is black.
3. Red nodes have black children (no two reds in a row).
4. Every root-to-leaf path has the same number of black nodes (**black-height**).

⇒ Longest path ≤ 2× shortest path ⇒ height ≤ 2·log(n+1) ⇒ O(log n) operations.

Insertion/deletion uses **recoloring + rotations**. Up to 2 rotations per insert, 3 per delete (with recoloring that can propagate up).

### Quick Interview Answers

| Question | Answer |
|----------|--------|
| Why balance? | Unbalanced BST degrades to O(n) |
| AVL vs Red-Black: which is taller? | AVL is stricter → shorter → faster lookup |
| AVL vs Red-Black: which is faster to insert? | RB — fewer rotations per insert |
| When prefer AVL? | Read-heavy workloads |
| When prefer RB? | Write-heavy / balanced workloads |
| Height of an AVL tree with n nodes? | ≤ 1.44·log₂(n+2) |
| Height of an RB tree with n nodes? | ≤ 2·log₂(n+1) |

---

## Reference View

### AVL Trees (Adelson-Velsky, Landis, 1962)

- **Invariant:** for every node, `|height(left) − height(right)| ≤ 1`
- **Maintained by:** rotations on insert/delete
- **Height:** ≤ 1.44·log₂(n), so lookups are slightly faster than RB
- **Downside:** strict invariant ⇒ more rotations on writes

### Red-Black Trees (Bayer, 1972; Guibas & Sedgewick, 1978)

- **Invariant:** 4 color rules above
- **Height:** ≤ 2·log₂(n+1) — slightly taller than AVL
- **Upside:** fewer rotations per insert/delete (amortized O(1) rotations)
- **Used everywhere:** Linux kernel (CFS scheduler, epoll, RB-tree API), Java `TreeMap`/`TreeSet`, C++ `std::map`/`std::multimap`/`std::set`

### AVL vs Red-Black Tradeoff

| Aspect | AVL | Red-Black |
|--------|-----|-----------|
| Balance | Strict (±1) | Loose (2× path ratio) |
| Height | ~1.44·log n | ~2·log n |
| Lookup speed | Slightly faster | Slightly slower |
| Insert rotations | Up to 2, more often | Amortized O(1) |
| Delete rotations | Up to 2 | Up to 3 |
| Implementation complexity | Moderate | High (delete is notoriously tricky) |
| Memory per node | 1 int (height) | 1 bit (color) |
| Typical use | Databases that index in RAM, AVL-friendly reads | General-purpose stdlib |

### Other Balanced Trees

- **[B-Tree / B+Tree](b-tree.md)** — generalization for disk (high fanout)
- **Treap** — BST + heap on random priorities; probabilistically balanced. Simple to implement.
- **Splay tree** — self-adjusting BST; recently accessed nodes move to root. Amortized O(log n). Cache-like behavior.
- **Scapegoat tree** — rebuild unbalanced subtrees wholesale rather than rotate.
- **Weight-balanced tree** — balance by subtree sizes rather than height.
- **[Skip list](../probabilistic/skip-list.md)** — not a tree, but same interface with probabilistic balance, much simpler code.

### Real-World Examples

- **Linux kernel `rbtree.h`** — used for:
  - CFS scheduler (tasks by vruntime)
  - Deadline scheduler
  - Memory map (VMAs)
  - `epoll` watchlist
  - I/O schedulers
- **Java `TreeMap`** — Red-Black
- **C++ `std::map`, `std::set`** — typically RB
- **PostgreSQL / MySQL** — use B-trees on disk; internal structures may use RB in RAM

### Why You Rarely Implement These Yourself

- Stdlib implementations are battle-tested and fast (written in C)
- Delete-with-rebalance is ~200 lines of tricky code with many cases
- A [skip list](../probabilistic/skip-list.md) or simple treap is easier and often just as fast

In Python, prefer:
- `sortedcontainers.SortedDict` / `SortedList` — uses list-of-sorted-lists; O(log n) ops; usually faster than a Python-coded BST because it's cache-friendly
- `heapq` for priority queues (not a BST, but often the actual need)

---

## See Also

- [bst.md](bst.md) — base before balancing
- [binary-tree.md](binary-tree.md)
- [b-tree.md](b-tree.md) — disk-oriented cousin
- [../probabilistic/skip-list.md](../probabilistic/skip-list.md) — probabilistic alternative
- [../README.md](../README.md) — decision table
