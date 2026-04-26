# Monotonic Stack / Queue

- **Source:** distilled from LeetCode/CP patterns
- **Author:** Yosi Izaq
- **Captured:** 2026-04-23
- **Status:** complete
- **Type:** concept

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

## When to Use

- "Next greater / smaller element" on the left or right of each position.
- "Largest rectangle in histogram" and its 2D cousin (maximal rectangle in a binary matrix).
- Stock-span / online building visibility.
- Sliding window max/min in `O(n)` (monotonic deque).
- Removing elements to get a lexicographically smallest result ("Remove K digits").

Mental model: you maintain a stack (or deque) whose contents are monotonic (strictly increasing or strictly decreasing). When a new element breaks the invariant, you pop — and that pop usually *is* the answer for something.

## Interview View

### Template — next greater element (to the right)

```python
def next_greater_right(nums):
    """For each i, index of first j>i with nums[j]>nums[i], or -1."""
    n = len(nums)
    out = [-1] * n
    stack = []  # indices with strictly decreasing nums values
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            out[stack.pop()] = i
        stack.append(i)
    return out
```

Each index is pushed once and popped at most once → `O(n)`.

### Template — largest rectangle in histogram

```python
def largest_rectangle(heights):
    stack = []  # indices with strictly increasing heights
    best = 0
    heights = heights + [0]  # sentinel to flush
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            top = stack.pop()
            left = stack[-1] if stack else -1
            width = i - left - 1
            best = max(best, heights[top] * width)
        stack.append(i)
    return best
```

The bar at `top` couldn't extend right past `i` (blocked by `h`) and couldn't extend left past `left` (blocked when we pushed).

### Template — monotonic deque (sliding window max)

```python
from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # indices; nums at these indices are strictly decreasing
    out = []
    for i, x in enumerate(nums):
        while dq and dq[0] <= i - k:
            dq.popleft()
        while dq and nums[dq[-1]] < x:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out
```

### Classic problems

| Problem | Stack type |
|---|---|
| Next Greater Element I / II | decreasing stack, one/two passes |
| Daily Temperatures | decreasing stack |
| Largest Rectangle in Histogram | increasing stack + sentinel |
| Maximal Rectangle (binary matrix) | row-by-row histogram |
| Trapping Rain Water (stack variant) | decreasing stack |
| Remove K Digits (smallest number) | increasing stack, pop when bigger than next |
| Sum of Subarray Minimums | track prev/next smaller per index |
| Sliding Window Maximum | monotonic deque |
| Stock Span | decreasing stack of (price, span) |

## Reference View

### Variants

- **Decreasing stack** → answers "next greater" queries.
- **Increasing stack** → answers "next smaller" queries (and the histogram problem).
- **Monotonic deque** — sliding window max/min. Push on one end, pop from both.
- **Stack with (value, count)** — subarray-minimum sums (how many subarrays have `x` as their minimum).

### Contribution technique (sum of subarray minimums)

```python
def sum_subarray_mins(nums, mod=10**9 + 7):
    """Sum over all subarrays of min(subarray)."""
    n = len(nums)
    left = [-1] * n   # prev strictly-smaller index
    right = [n] * n   # next less-or-equal index (break ties)
    stack = []
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] > x:
            stack.pop()
        left[i] = stack[-1] if stack else -1
        stack.append(i)
    stack.clear()
    for i in range(n - 1, -1, -1):
        while stack and nums[stack[-1]] >= nums[i]:
            stack.pop()
        right[i] = stack[-1] if stack else n
        stack.append(i)
    total = 0
    for i, x in enumerate(nums):
        total = (total + x * (i - left[i]) * (right[i] - i)) % mod
    return total
```

Tie-break (`>` on one side, `>=` on the other) prevents double-counting when equal values are the min of the same subarray.

### Complexity

| Variant | Time | Space |
|---|---|---|
| next greater (one pass) | `O(n)` | `O(n)` |
| histogram | `O(n)` | `O(n)` |
| monotonic deque window | `O(n)` | `O(k)` |
| contribution / sum-of-mins | `O(n)` | `O(n)` |

Despite nested `while` inside a `for`, amortized cost is `O(n)` because each index enters/leaves the stack once.

### Pitfalls

- **Circular arrays** ("next greater in a circle") — iterate `2n` and use `i % n`.
- Tie-break in contribution problems — getting `>` vs `>=` wrong double-counts or drops subarrays.
- Sliding window: always check `dq[0]` expiry *before* reading the answer (front element could be out of window).
- Sentinel value: easy to forget and your last bar never gets processed.
- Storing values vs indices: indices are more flexible (distance calculations) and let you recover the value when needed.

### Real-world uses

- **Expression parsing (Shunting-yard)** — operator-precedence stack behaves monotonically with operator precedence.
- **HTTP/2 HPACK header decoding** — tracking of prior references.
- **Browser visit / history stacks with "furthest you can jump back"** — monotonic stack of indices.
- **Stock charting (span, peaks, support levels)** — direct stack-span algorithm.
- **Compilers: max rectangle in a register-allocation conflict matrix** — histogram trick.
- **Window-based anomaly detection (min/max over last N events)** — monotonic deque.

### When *not* to use

- You need an aggregate that isn't "next greater / smaller" style (e.g., sum of window) — prefix sums or a different structure.
- Query isn't about *nearest* greater/smaller — e.g., "k-th greater" needs a different approach.
- Elements are inserted/removed in arbitrary positions (not append-only) — stack structure doesn't apply.

## See Also

- [`../../data-structures/linear/stacks-queues.md`](../../data-structures/linear/stacks-queues.md) — underlying DS, including deque.
- [`sliding-window.md`](sliding-window.md) — deque-backed max/min.
- [`two-pointers.md`](two-pointers.md) — when nearest-neighbor queries reduce to converging pointers.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
