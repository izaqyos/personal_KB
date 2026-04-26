# Heap (Priority Queue)

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

- Repeatedly get-min (or get-max) in O(1)
- Priority scheduling (Dijkstra, A*, event simulations)
- **Top-k** problems on streams
- **Not** for: arbitrary search (use hash/BST); ordered iteration (use BST)

---

## Interview View

### Python `heapq` — it's a **min-heap** on a list

```python
import heapq

h = []
heapq.heappush(h, 3)      # O(log n)
heapq.heappush(h, 1)
heapq.heappush(h, 2)
heapq.heappop(h)          # 1 — O(log n)
h[0]                      # peek min — O(1)
heapq.heapify([5,2,9,1])  # O(n) — in-place

# Combined push+pop, faster than separate calls
heapq.heappushpop(h, x)   # push then pop
heapq.heapreplace(h, x)   # pop then push

# Top-k conveniences
heapq.nlargest(3, iterable)
heapq.nsmallest(3, iterable)
```

### Max-Heap (negate values)

```python
# Python has no max-heap; invert signs or use tuples
heapq.heappush(h, -x)
max_val = -heapq.heappop(h)
```

### Custom Priority (tuples)

```python
# (priority, tiebreaker, payload). Tiebreaker avoids comparing payloads.
import itertools
counter = itertools.count()
heapq.heappush(h, (priority, next(counter), task))
```

### Classic: Top K Largest — O(n log k)

```python
import heapq

def top_k(nums: list[int], k: int) -> list[int]:
    h = nums[:k]
    heapq.heapify(h)                # min-heap of size k
    for x in nums[k:]:
        if x > h[0]:
            heapq.heapreplace(h, x)
    return h
```

Better than `sorted(nums)[-k:]` which is O(n log n).

### Classic: Kth Largest in a Stream

```python
class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.h = []
        for n in nums:
            self.add(n)

    def add(self, x):
        if len(self.h) < self.k:
            heapq.heappush(self.h, x)
        elif x > self.h[0]:
            heapq.heapreplace(self.h, x)
        return self.h[0]
```

### Merge k Sorted Lists — O(n log k)

```python
def merge_k(lists):
    h = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(h, (lst[0], i, 0))
    out = []
    while h:
        val, i, j = heapq.heappop(h)
        out.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(h, (lists[i][j+1], i, j+1))
    return out
```

### Running Median (Two Heaps)

```python
class MedianFinder:
    def __init__(self):
        self.lo = []   # max-heap (negated) — lower half
        self.hi = []   # min-heap — upper half

    def add(self, x):
        heapq.heappush(self.lo, -heapq.heappushpop(self.hi, x))
        if len(self.lo) > len(self.hi):
            heapq.heappush(self.hi, -heapq.heappop(self.lo))

    def median(self):
        if len(self.hi) > len(self.lo):
            return self.hi[0]
        return (self.hi[0] - self.lo[0]) / 2
```

---

## Reference View

### What Is a Heap?

A **complete binary tree** satisfying the **heap order property**:
- **Min-heap:** parent ≤ children → root is minimum
- **Max-heap:** parent ≥ children → root is maximum

It's **not** a BST — siblings have no ordering relation.

### Array Representation

Because the tree is complete, you can store it in an array:

```
index   0   1   2   3   4   5   6
value   1   3   2   7   5   9   4

            1
          /   \
         3     2
        / \   / \
       7   5 9   4

parent(i) = (i - 1) // 2
left(i)   = 2*i + 1
right(i)  = 2*i + 2
```

No pointers — very cache-friendly.

### Core Operations — min-heap

**Sift-up** (after insert at end):
```python
def sift_up(h, i):
    while i > 0:
        parent = (i - 1) // 2
        if h[i] < h[parent]:
            h[i], h[parent] = h[parent], h[i]
            i = parent
        else:
            break
```

**Sift-down** (after pop: move last to root, then sift):
```python
def sift_down(h, i):
    n = len(h)
    while True:
        l, r = 2*i+1, 2*i+2
        smallest = i
        if l < n and h[l] < h[smallest]: smallest = l
        if r < n and h[r] < h[smallest]: smallest = r
        if smallest == i: break
        h[i], h[smallest] = h[smallest], h[i]
        i = smallest
```

**Heapify** (build-heap) from unordered array — **O(n)**, not O(n log n):

```python
def heapify(h):
    for i in range(len(h)//2 - 1, -1, -1):
        sift_down(h, i)
```

Why O(n)? Lower-level nodes (which dominate) sift down fewer levels.

### Complexity

| Op | Time |
|----|------|
| Find min/max | O(1) |
| Insert | O(log n) |
| Pop | O(log n) |
| Heapify (build from array) | **O(n)** |
| Decrease-key (given index) | O(log n) |
| Delete arbitrary | O(log n) if you know the index |
| Search arbitrary | O(n) — heap is not searchable |

### Heap Variants

| Variant | Feature | Use |
|---------|---------|-----|
| **Binary heap** | Simple, array-backed | Python `heapq`, stdlib default |
| **d-ary heap** | d children instead of 2 | Shallower, faster decrease-key (Dijkstra) |
| **Binomial heap** | Forest of binomial trees | O(log n) merge |
| **Fibonacci heap** | Lazy, amortized O(1) decrease-key | Theoretical for Dijkstra O(V log V + E) |
| **Pairing heap** | Simpler, good practical perf | General-purpose stdlib alternative |
| **Leftist / skew heap** | Easy meld | Functional programming |

**Note:** Fibonacci heaps have wonderful asymptotics but large constants. In practice, binary or d-ary heaps win.

### Priority Queue vs Heap

- A **priority queue** is the abstract data type (insert, get-min)
- A **heap** is the most common implementation
- Can also be implemented with balanced BST, skip list, or unsorted array

### Real-World Uses

- **Dijkstra / A\* / Prim's** — extract-min dominates
- **Event simulation** (discrete events, game loops)
- **OS scheduling** (priority-based schedulers)
- **Top-k on streams** (trending items, logs, alerts)
- **Huffman coding**
- **Task queues** — `heapq` or Celery with priority
- **Median maintenance** (two-heap trick)

### Heap in Language Standard Libraries

| Language | API |
|----------|-----|
| Python | `heapq` module (min-heap only) |
| Java | `java.util.PriorityQueue` |
| C++ | `std::priority_queue` (max-heap default), `std::make_heap` / `push_heap` / `pop_heap` for raw control |
| Go | `container/heap` (requires you implement the interface) |
| Rust | `std::collections::BinaryHeap` (max-heap) |

### Common Pitfalls

1. **Python is min-heap only** — negate for max
2. **Unstable ordering** — equal priorities may pop in any order; include tiebreaker
3. **`heapq` on a list of dicts** — will fail on comparison when priorities tie; use `(prio, counter, obj)` tuples
4. **Mutating the priority** of an already-enqueued item — heap doesn't know. Re-insert with new priority; mark old as stale on pop.

---

## See Also

- [binary-tree.md](binary-tree.md) — heap is a complete binary tree
- [../linear/stacks-queues.md](../linear/stacks-queues.md) — priority queue variant
- [../graph/graph-algorithms.md](../graph/graph-algorithms.md) — Dijkstra, Prim
- [../README.md](../README.md) — decision table
