# Binary Tree

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

- Hierarchical data: DOM, file system, org chart, parse tree
- Divide-and-conquer recursion (each subtree solves the same problem)
- Precursor to BST, heap, segment tree, trie

A plain binary tree has no ordering invariant. For ordered search, use a [BST](bst.md). For heap-ordered, see [heap](heap.md).

---

## Interview View

### Node

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

### Traversals — Recursive

```python
def inorder(node, out):
    if not node: return
    inorder(node.left, out)
    out.append(node.val)
    inorder(node.right, out)

def preorder(node, out):
    if not node: return
    out.append(node.val)
    preorder(node.left, out)
    preorder(node.right, out)

def postorder(node, out):
    if not node: return
    postorder(node.left, out)
    postorder(node.right, out)
    out.append(node.val)
```

Rule of thumb:
- **Inorder** = sorted order for BST
- **Preorder** = serialize / clone
- **Postorder** = compute with dependency on children (e.g. delete tree, evaluate expression)

### Level Order (BFS)

```python
from collections import deque

def level_order(root):
    if not root: return []
    out, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            n = q.popleft()
            level.append(n.val)
            if n.left: q.append(n.left)
            if n.right: q.append(n.right)
        out.append(level)
    return out
```

### Iterative Inorder (stack)

```python
def inorder_iter(root):
    out, stack = [], []
    node = root
    while node or stack:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        out.append(node.val)
        node = node.right
    return out
```

### Classic Recursion Patterns

**Height / depth**
```python
def height(node):
    if not node: return 0
    return 1 + max(height(node.left), height(node.right))
```

**Check balanced** (returns height or -1 if unbalanced — single pass)
```python
def check(node):
    if not node: return 0
    lh = check(node.left)
    if lh < 0: return -1
    rh = check(node.right)
    if rh < 0 or abs(lh - rh) > 1: return -1
    return 1 + max(lh, rh)

def is_balanced(root): return check(root) >= 0
```

**Lowest Common Ancestor (generic binary tree)**
```python
def lca(root, p, q):
    if not root or root is p or root is q:
        return root
    L = lca(root.left, p, q)
    R = lca(root.right, p, q)
    if L and R: return root
    return L or R
```

**Diameter** (longest path between any two nodes)
```python
def diameter(root):
    best = 0
    def depth(n):
        nonlocal best
        if not n: return 0
        L, R = depth(n.left), depth(n.right)
        best = max(best, L + R)
        return 1 + max(L, R)
    depth(root)
    return best
```

**Serialize / Deserialize (preorder with sentinels)**
```python
def serialize(root):
    out = []
    def go(n):
        if not n:
            out.append("#")
            return
        out.append(str(n.val))
        go(n.left)
        go(n.right)
    go(root)
    return ",".join(out)

def deserialize(s):
    it = iter(s.split(","))
    def go():
        v = next(it)
        if v == "#": return None
        n = TreeNode(int(v))
        n.left = go()
        n.right = go()
        return n
    return go()
```

---

## Reference View

### Tree Vocabulary

| Term | Meaning |
|------|---------|
| Root | Top node (only node with no parent) |
| Leaf | Node with no children |
| Depth of node | Edges from root to node |
| Height of node | Edges from node to deepest leaf |
| Height of tree | Height of root |
| Complete tree | All levels full except possibly last, which fills left-to-right |
| Full binary tree | Every node has 0 or 2 children |
| Perfect binary tree | All internal nodes have 2 children, all leaves same depth |
| Balanced tree | Heights of subtrees differ by ≤ 1 at every node |

### Shape Implications

- **Complete** → can be array-backed (see [heap](heap.md))
- **Balanced** → O(log n) height → efficient search
- **Skewed** (linked-list shape) → O(n) height → bad for search; self-balancing trees (AVL, RB) avoid this

### Array Representation

For a complete binary tree stored at index `i` (0-based):
- left child: `2i + 1`
- right child: `2i + 2`
- parent: `(i - 1) // 2`

Used by heaps and segment trees.

### Traversal Summary

| Traversal | Order | Common Use |
|-----------|-------|------------|
| Preorder | Root, L, R | Copy / serialize |
| Inorder | L, Root, R | BST → sorted |
| Postorder | L, R, Root | Compute from children (delete, evaluate) |
| Level order | BFS | Minimum depth, shortest path |

### Real-World Uses

- **Parse trees / AST** in compilers and interpreters
- **DOM** in browsers
- **Decision trees** in ML
- **Expression trees** (infix ↔ postfix)
- **File systems** (hierarchical directory trees)
- **Merkle trees** for integrity (Git, Bitcoin, IPFS)

### Common Pitfalls

1. **Recursion depth** — Python default limit is 1000. Deep trees need iterative traversal or `sys.setrecursionlimit`.
2. **Shared mutable state** in recursion — use `nonlocal`, a container, or return values.
3. **Returning None vs 0** in base cases — height of empty tree is 0; None often distinct.
4. **Preorder serialization without sentinels** — ambiguous. Always include `#` for null.

---

## See Also

- [bst.md](bst.md) — ordering invariant
- [balanced-trees.md](balanced-trees.md) — AVL, Red-Black
- [heap.md](heap.md) — heap-ordered complete binary tree
- [trie.md](trie.md) — tree over string alphabet
- [../graph/graph-algorithms.md](../graph/graph-algorithms.md) — trees are special graphs
- [../README.md](../README.md) — decision table
