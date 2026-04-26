# Arrays

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

- Index-based random access needed — O(1) `arr[i]`
- Memory locality matters (cache-friendly iteration)
- Size known, or append-only workload (dynamic array amortized O(1))
- **Not** for: frequent insert/delete at arbitrary positions (O(n)) — use linked list

---

## Interview View

### Core Operations (Python `list`)

```python
arr = []
arr.append(1)       # O(1) amortized
arr.pop()           # O(1)
arr.insert(0, 1)    # O(n) — shifts elements
arr.pop(0)          # O(n) — shifts elements
arr[5]              # O(1)
5 in arr            # O(n) — linear scan
arr.index(5)        # O(n)
len(arr)            # O(1)
arr[1:4]            # O(k) — k = slice size
```

### Two-Pointer Template

```python
def two_sum_sorted(arr: list[int], target: int) -> tuple[int, int] | None:
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return (left, right)
        elif s < target:
            left += 1
        else:
            right -= 1
    return None
```

### Sliding Window Template

```python
def max_subarray_sum(arr: list[int], k: int) -> int:
    window = sum(arr[:k])
    best = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]
        best = max(best, window)
    return best
```

### Prefix Sum (range queries)

```python
def prefix_sum(arr: list[int]) -> list[int]:
    ps = [0] * (len(arr) + 1)
    for i, x in enumerate(arr):
        ps[i + 1] = ps[i] + x
    return ps

# Range sum arr[l..r] inclusive = ps[r+1] - ps[l]
```

---

## Reference View

### Static vs Dynamic

| Type | Size | Insert at End | Example |
|------|------|---------------|---------|
| **Static** | Fixed at creation | — | C `int arr[10]`, NumPy arrays |
| **Dynamic** | Grows as needed | O(1) amortized | Python `list`, Java `ArrayList`, C++ `std::vector` |

### Amortized O(1) Append — Why?

Dynamic arrays double capacity when full. Copying n elements happens every n appends, so total cost across n appends = O(n), giving **O(1) amortized** per append.

```
capacity: 1  → 2  → 4  → 8  → 16 ...
copies:   1    2    4    8    16     total ≈ 2n
```

### Memory Layout

Contiguous memory → **cache-friendly**. A linear scan of an array is often 10× faster than the same scan of a linked list, even though both are O(n), because CPU prefetches cache lines.

### Python-specific Notes

- `list` is dynamic array of `PyObject*` pointers (not values). Each element is a boxed object → heavier than C array
- Use `array.array` for homogeneous numeric data (still Python-level)
- Use **NumPy** `ndarray` for performance-critical numeric work — dense, contiguous C-level storage
- `collections.deque` when you need O(1) at both ends

### Common Pitfalls

1. **`list.insert(0, x)`** — O(n), not O(1). Use `collections.deque` for O(1) prepend
2. **Default mutable args** — `def f(a=[])` shares one list across calls
3. **Slicing copies** — `arr[:]` is O(n), not O(1)
4. **`in` operator** — O(n) on list, O(1) on set / dict

### Real-World Uses

- Flat numeric storage (NumPy, Pandas backing stores)
- Image pixel buffers
- Ring buffers (fixed-size deque for logs, audio samples)
- Backing store for heaps (binary heap = array)
- Stack implementation

---

## See Also

- [linked-lists.md](linked-lists.md) — when NOT to use an array
- [stacks-queues.md](stacks-queues.md) — array-backed stack/queue
- [../trees/heap.md](../trees/heap.md) — heap as array
- [../README.md](../README.md) — decision table
- [../../interviews/algorithms-ds.md](../../interviews/algorithms-ds.md) — TypeScript patterns
