# Stacks & Queues

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

- **Stack (LIFO):** anything with nesting — function calls, parentheses, undo, DFS
- **Queue (FIFO):** order-preserving buffers — BFS, task scheduler, rate limiter, producer/consumer
- **Deque:** sliding window maxima, work-stealing
- **Priority queue:** top-k problems, Dijkstra, scheduling → see [heap.md](../trees/heap.md)

---

## Interview View

### Stack — Python idioms

```python
stack = []
stack.append(x)     # push — O(1)
x = stack.pop()     # pop  — O(1)
top = stack[-1]     # peek — O(1)
empty = not stack
```

### Queue — use `collections.deque`

```python
from collections import deque

q = deque()
q.append(x)         # enqueue — O(1)
x = q.popleft()     # dequeue — O(1)
front = q[0]        # peek front

# DO NOT use list.pop(0) — it's O(n).
```

### Classic Problem: Valid Parentheses

```python
def is_valid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for c in s:
        if c in "([{":
            stack.append(c)
        elif c in ")]}":
            if not stack or stack.pop() != pairs[c]:
                return False
    return not stack
```

### Monotonic Stack (Next Greater Element)

```python
def next_greater(arr: list[int]) -> list[int]:
    res = [-1] * len(arr)
    stack = []  # indices, values decreasing
    for i, x in enumerate(arr):
        while stack and arr[stack[-1]] < x:
            res[stack.pop()] = x
        stack.append(i)
    return res
```

**Pattern:** monotonic stack solves "next greater / smaller" in O(n) total — each element pushed and popped at most once.

### Monotonic Deque (Sliding Window Max)

```python
from collections import deque

def sliding_window_max(arr: list[int], k: int) -> list[int]:
    q = deque()  # stores indices; values decreasing
    out = []
    for i, x in enumerate(arr):
        while q and arr[q[-1]] <= x:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            out.append(arr[q[0]])
    return out
```

### Stack-Based Iterative Tree DFS

```python
def inorder(root):
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

### Implementing Queue with Two Stacks

```python
class Queue:
    def __init__(self):
        self.inbox, self.outbox = [], []

    def enqueue(self, x):
        self.inbox.append(x)

    def dequeue(self):
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())
        return self.outbox.pop()  # amortized O(1)
```

---

## Reference View

### Stack vs Queue

| Property | Stack | Queue |
|----------|-------|-------|
| Order | LIFO | FIFO |
| Push / Pop | same end | opposite ends |
| Python impl | `list` | `collections.deque` |
| Typical use | recursion, backtracking | BFS, pipelines |

### Variants

| Variant | Description | Typical Use |
|---------|-------------|-------------|
| Stack | LIFO | expression eval, DFS, undo |
| Queue | FIFO | BFS, scheduler, buffers |
| Deque | Double-ended | sliding window, work-stealing |
| Circular queue | Fixed-size ring | audio/log buffers, streaming |
| Priority queue | Min/max-first | Dijkstra, top-k → [heap](../trees/heap.md) |
| Monotonic stack/deque | Maintains order invariant | O(n) next-greater, window max |
| Lock-free queue | Atomic ops | Multi-producer/consumer |

### Call Stack (Implementation Detail)

Every function call pushes a **stack frame** containing: return address, local vars, saved registers. Stack overflow = too-deep recursion. Convert deep recursion to iterative + explicit stack to avoid.

### Real-World Uses

- **Stack**
  - Undo/redo in editors
  - Expression evaluation (RPN, Shunting-yard)
  - Backtracking (sudoku, N-queens)
  - Browser back button
  - DFS traversal
- **Queue**
  - BFS traversal
  - Task scheduling (OS ready queue, thread pool)
  - Producer-consumer (Kafka, RabbitMQ, Go channels)
  - Rate limiting (token bucket refill)
  - Print spooler, keyboard buffer
- **Deque**
  - Work-stealing schedulers (each worker has a local deque)
  - Monotonic deque for sliding-window problems

### Queue Implementations in the Wild

| Queue | Structure | Notes |
|-------|-----------|-------|
| Python `queue.Queue` | Thread-safe | Blocking get/put for threads |
| `asyncio.Queue` | Async | For coroutines |
| `multiprocessing.Queue` | IPC | Pickle-based across processes |
| Kafka topic partition | Log | Consumer offset tracks position |
| Redis list (LPUSH/RPOP) | In-memory | Simple FIFO or LIFO |

---

## See Also

- [linked-lists.md](linked-lists.md) — underlying structure for queues
- [../trees/heap.md](../trees/heap.md) — priority queue
- [../graph/graph-algorithms.md](../graph/graph-algorithms.md) — BFS uses queue, DFS uses stack
- [../../interviews/algorithms-ds.md](../../interviews/algorithms-ds.md) — TypeScript versions
- [../README.md](../README.md) — decision table
