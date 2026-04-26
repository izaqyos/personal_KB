# Linked Lists

> **Source:** Distilled from `interview-qs-kb` + personal notes
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

- Frequent insertion/deletion at **known positions** — O(1) once you have the node pointer
- Implementing stack/queue/deque from scratch without a dynamic array
- Building LRU caches, adjacency lists, free lists
- **Not** for: random index access (use array). Cache locality is bad — each node is a separate allocation.

---

## Interview View

### Singly Linked List Node

```python
class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None):
        self.val = val
        self.next = next
```

### Reverse a Linked List (iterative) — O(n) / O(1)

```python
def reverse(head: ListNode | None) -> ListNode | None:
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
```

### Reverse (recursive)

```python
def reverse_rec(head: ListNode | None) -> ListNode | None:
    if not head or not head.next:
        return head
    new_head = reverse_rec(head.next)
    head.next.next = head
    head.next = None
    return new_head
```

### Detect Cycle — Floyd's Tortoise & Hare — O(n) / O(1)

```python
def has_cycle(head: ListNode | None) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

### Find Cycle Start

```python
def cycle_start(head: ListNode | None) -> ListNode | None:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None
    # Reset slow to head, advance both by 1 until they meet
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next
    return slow
```

### Find Middle (same pattern)

```python
def middle(head: ListNode | None) -> ListNode | None:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

### Merge Two Sorted Lists

```python
def merge(a: ListNode | None, b: ListNode | None) -> ListNode | None:
    dummy = ListNode()
    tail = dummy
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next
```

### Partition by Pivot (classic interview Q)

```python
def partition(head: ListNode | None, x: int) -> ListNode | None:
    less_head = ListNode()
    ge_head = ListNode()
    less, ge = less_head, ge_head
    while head:
        if head.val < x:
            less.next = head
            less = less.next
        else:
            ge.next = head
            ge = ge.next
        head = head.next
    ge.next = None
    less.next = ge_head.next
    return less_head.next
```

### Dummy Node Pattern

Nearly every linked-list problem benefits from a dummy/sentinel head: avoids edge cases for empty list or head mutation. Remember: `return dummy.next`.

---

## Reference View

### Variants

| Variant | Forward | Backward | Head/Tail | Use |
|---------|---------|----------|-----------|-----|
| **Singly linked** | ✓ | ✗ | head only | Stack, simple queue, hash table chaining |
| **Doubly linked** | ✓ | ✓ | head + tail | LRU cache, deque, editor undo stack |
| **Circular** | ✓ | ± | tail.next = head | Round-robin schedulers, Josephus problem |
| **XOR linked** | ✓ | ✓ | head + tail | Memory-constrained doubly linked (academic) |
| **Skip list** | ✓ | — | head layers | See [probabilistic/skip-list.md](../probabilistic/skip-list.md) |

### Array vs Linked List Tradeoff

| Criterion | Array | Linked List |
|-----------|-------|-------------|
| Random access by index | O(1) | O(n) |
| Insert/delete at arbitrary position | O(n) | O(1) **with node pointer** |
| Memory overhead | low (just values) | high (pointers, alloc headers) |
| Cache locality | excellent | poor |
| Grow cost | O(n) resize (amortized O(1)) | O(1) per node |

### Real-World Uses

- **Kernel free-list allocators** — O(1) alloc/free without moving memory
- **[LRU cache](../specialized/lru-cache.md)** — doubly linked list + hash map gives O(1) for all ops
- **Adjacency lists** for sparse graphs
- **Hash table chaining** for collision resolution
- **Undo/redo** (doubly linked)
- **Immutable persistent lists** in functional languages (Clojure, Haskell)

### Why Linked Lists Are Often Slower Than You Expect

Big-O hides the constant. A doubly linked list walk of n=10M nodes:

- Array: ~10ms (cache-friendly, prefetcher-happy)
- Linked list: ~200ms (cache miss per node, pointer chase)

**Moral:** Use linked lists for structural reasons (O(1) splice), not because "O(1) insert" sounds good on paper.

### Classic Interview Problem Categories

1. **Pointer manipulation** — reverse, reorder, rotate
2. **Two-pointer** — cycle detection (Floyd), find middle, nth from end
3. **Merge** — merge 2 or k sorted lists (k lists uses heap)
4. **Copy** — copy list with random pointer (hash map of old→new)
5. **Intersect** — find intersection node of two lists

---

## See Also

- [arrays.md](arrays.md) — when to prefer arrays
- [stacks-queues.md](stacks-queues.md) — built on linked lists
- [../specialized/lru-cache.md](../specialized/lru-cache.md) — DLL + hash map
- [../probabilistic/skip-list.md](../probabilistic/skip-list.md) — linked-list-like ordered search
- [../../interview-qs-kb](../../interview-qs-kb) — legacy C-based linked-list Q&A
- [../README.md](../README.md) — decision table
