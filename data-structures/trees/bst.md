# Binary Search Tree (BST)

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

- Ordered collection with fast lookup, insert, delete
- Need **in-order iteration** (sorted traversal) + membership
- Range queries on ordered keys
- **Not** for: unordered key-value (use [hash table](../hash-based/hash-tables.md)); guaranteed worst-case O(log n) (use [balanced tree](balanced-trees.md))

---

## Interview View

### Invariant

For every node:
- **All keys in the left subtree are <** node.key
- **All keys in the right subtree are >** node.key
- No duplicates (conventional; duplicates typically go right or rejected)

### Node

```python
class BSTNode:
    def __init__(self, key, val=None):
        self.key = key
        self.val = val
        self.left = None
        self.right = None
```

### Search — O(log n) avg, O(n) worst

```python
def search(node, key):
    while node:
        if key == node.key:
            return node
        node = node.left if key < node.key else node.right
    return None
```

### Insert

```python
def insert(node, key, val=None):
    if not node:
        return BSTNode(key, val)
    if key < node.key:
        node.left = insert(node.left, key, val)
    elif key > node.key:
        node.right = insert(node.right, key, val)
    else:
        node.val = val  # update
    return node
```

### Delete — three cases

```python
def delete(node, key):
    if not node:
        return None
    if key < node.key:
        node.left = delete(node.left, key)
    elif key > node.key:
        node.right = delete(node.right, key)
    else:
        # Found — three cases
        if not node.left:
            return node.right
        if not node.right:
            return node.left
        # Two children: replace with in-order successor (smallest in right subtree)
        succ = node.right
        while succ.left:
            succ = succ.left
        node.key, node.val = succ.key, succ.val
        node.right = delete(node.right, succ.key)
    return node
```

### Min / Max

```python
def find_min(node):
    while node.left: node = node.left
    return node
```

### Inorder → sorted list

```python
def inorder(node, out):
    if not node: return
    inorder(node.left, out)
    out.append(node.key)
    inorder(node.right, out)
```

### Validate BST (classic interview problem)

```python
def is_bst(node, lo=float("-inf"), hi=float("inf")):
    if not node: return True
    if not (lo < node.key < hi): return False
    return is_bst(node.left, lo, node.key) and is_bst(node.right, node.key, hi)
```

**Pitfall:** checking only `node.left.key < node.key` is wrong. A node in the left subtree of the root can be > root if just the immediate child check passes.

### Kth Smallest (inorder with early stop)

```python
def kth_smallest(root, k):
    stack, node = [], root
    while stack or node:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.key
        node = node.right
```

### Range Query: keys in [lo, hi]

```python
def range_query(node, lo, hi, out):
    if not node: return
    if lo < node.key:
        range_query(node.left, lo, hi, out)
    if lo <= node.key <= hi:
        out.append(node.key)
    if node.key < hi:
        range_query(node.right, lo, hi, out)
```

---

## Reference View

### The Balance Problem

```
Insert 1, 2, 3, 4, 5 in order:

         1
          \
           2
            \
             3       ← degenerates to linked list
              \
               4
                \
                 5
```

Unbalanced BST degrades to O(n). Solutions:
- **Self-balancing trees** — [AVL, Red-Black](balanced-trees.md)
- **Probabilistic balance** — [Skip list](../probabilistic/skip-list.md)
- **Randomized insertion** — treap (BST + heap on random priorities)

### Complexity Summary

| Op | Average | Worst (unbalanced) | Worst (balanced) |
|----|---------|--------------------|--------------------|
| Search | O(log n) | O(n) | O(log n) |
| Insert | O(log n) | O(n) | O(log n) |
| Delete | O(log n) | O(n) | O(log n) |
| Min/Max | O(log n) | O(n) | O(log n) |
| Inorder traversal | O(n) | O(n) | O(n) |

### Successor & Predecessor

- **In-order successor** of node x:
  - If x has a right subtree → leftmost node in right subtree
  - Else → lowest ancestor for which x is in the left subtree
- Used in deletion with two children

### BST vs Hash Table

| Need | Winner |
|------|--------|
| O(1) avg lookup | Hash table |
| Sorted iteration | BST |
| Range queries | BST |
| Worst-case guarantees | Balanced BST |
| Ordered min/max | BST |
| Simplicity | Hash table |

### Real-World Uses

- **Database indexes** — B-trees (generalization of BST) dominate, but in-memory indexes use red-black trees
- **Language stdlib ordered map** — C++ `std::map`/`std::set`, Java `TreeMap`/`TreeSet`
- **Kernel scheduler** — Linux CFS uses a red-black tree of runnable tasks ordered by vruntime
- **Python `sortedcontainers.SortedDict`** — actually uses a list-of-lists, not a BST, but same interface

### Common Pitfalls

1. **Assuming BST = balanced** — plain BST is not; use AVL/RB for guarantees
2. **Comparing floats as keys** — precision issues; use integers or `decimal`
3. **Duplicates** — decide upfront: reject, right-lean, or store counts
4. **Iterator invalidation** — mutating during iteration may skip/revisit nodes

---

## See Also

- [binary-tree.md](binary-tree.md) — fundamentals
- [balanced-trees.md](balanced-trees.md) — AVL, Red-Black for worst-case O(log n)
- [b-tree.md](b-tree.md) — disk-oriented generalization
- [../probabilistic/skip-list.md](../probabilistic/skip-list.md) — probabilistic alternative
- [../hash-based/hash-tables.md](../hash-based/hash-tables.md) — unordered alternative
- [../README.md](../README.md) — decision table
