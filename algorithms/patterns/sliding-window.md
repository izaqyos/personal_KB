# Sliding Window

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

- Contiguous subarray or substring under a constraint (sum ≤ K, distinct chars ≤ K, all 1s after flipping K 0s, …).
- You want `O(n)` where the brute force is `O(n^2)` or `O(n^3)`.
- The constraint is *monotone in window size*: once invalid, growing further keeps it invalid (so shrink from the left until valid again).

Rule of thumb: if brute force is "try every pair `(i, j)` and check the segment," and the check can be incrementally maintained as `j` moves right and `i` catches up, use a sliding window.

## Interview View

### Template — variable-size window (shrink-on-violation)

```python
def longest_substring_k_distinct(s, k):
    from collections import defaultdict
    count = defaultdict(int)
    left = 0
    best = 0
    for right, ch in enumerate(s):
        count[ch] += 1
        while len(count) > k:          # violation → shrink
            count[s[left]] -= 1
            if count[s[left]] == 0:
                del count[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best
```

Invariant: at the end of each iteration, `s[left:right+1]` satisfies the constraint. Every index is added and removed at most once → `O(n)`.

### Template — fixed-size window

```python
def max_sum_subarray_k(nums, k):
    s = sum(nums[:k])
    best = s
    for i in range(k, len(nums)):
        s += nums[i] - nums[i - k]     # slide: add new, drop old
        best = max(best, s)
    return best
```

### Template — count-matching window (anagram / permutation)

```python
def find_anagrams(s, p):
    from collections import Counter
    need = Counter(p)
    window = Counter()
    out = []
    for right, ch in enumerate(s):
        window[ch] += 1
        if right >= len(p):
            left_ch = s[right - len(p)]
            window[left_ch] -= 1
            if window[left_ch] == 0:
                del window[left_ch]
        if window == need:
            out.append(right - len(p) + 1)
    return out
```

### Classic problems

| Problem | Window type |
|---|---|
| Longest substring without repeating | variable, shrink on duplicate |
| Longest substring with at most K distinct | variable |
| Minimum window substring | variable, track `need` vs `have` |
| Maximum sum subarray of size K | fixed |
| Find all anagrams | fixed + counter compare |
| Longest repeating char replacement (≤K flips) | variable, shrink when `window - maxFreq > k` |
| Subarrays with sum = K (positives only) | variable; *negatives* need prefix sum + hash |
| Max sliding window (max in each K-window) | fixed + monotonic deque |

## Reference View

### Variants

- **Fixed size** — window length is given.
- **Variable, "at most K"** — grow freely, shrink on violation, track max length.
- **Variable, "exactly K"** — `atMost(K) - atMost(K-1)` is a standard trick.
- **Minimum window** — shrink greedily while valid; track min.
- **Max in window** — monotonic deque keeps candidates, see [`monotonic-stack-queue.md`](monotonic-stack-queue.md).

### `atMost` trick

```python
def subarrays_with_k_distinct(nums, k):
    def at_most(limit):
        from collections import defaultdict
        count = defaultdict(int)
        left = res = 0
        for right, x in enumerate(nums):
            count[x] += 1
            while len(count) > limit:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    del count[nums[left]]
                left += 1
            res += right - left + 1
        return res
    return at_most(k) - at_most(k - 1)
```

### Monotonic-deque window max

```python
from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # stores indices, nums[dq] is decreasing
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

### Complexity

| Flavor | Time | Space |
|---|---|---|
| fixed window sum | `O(n)` | `O(1)` |
| variable window with hash | `O(n)` amortized | `O(alphabet)` or `O(k)` |
| window max via deque | `O(n)` | `O(k)` |
| `atMost(K) - atMost(K-1)` | `O(n)` | `O(k)` |

### Pitfalls

- **Negative numbers break "shrink when sum > K"** — the sum isn't monotone. Use prefix sum + hash instead.
- Forgetting to remove zero-count keys → `len(count)` lies about distinct chars.
- In "min window," updating `best` *after* shrinking, not before.
- Fixed window: off-by-one in the slide (`nums[i] - nums[i - k]`).
- Counter equality (`window == need`) is `O(26)` but still a constant — fine for lowercase, careful for unbounded alphabets.

### Real-world uses

- **Rate limiting** — count requests in a rolling time window (see [`../../system-design/rate-limiting/`](../../system-design/rate-limiting/) if present; also HN rolling counters).
- **Network packet inspection** — rolling checksum over a sliding byte window (rsync's rolling Adler-32).
- **Stream deduplication** — a bounded window of "recently seen" IDs.
- **Metrics aggregation (p50/p99 over last N seconds)** — window over timestamped events.
- **Time-series anomaly detection** — moving average / moving stddev.

### When *not* to use

- Subarrays can be non-contiguous — that's subset/DP territory.
- The constraint isn't monotone (negatives in sum problems, for example).
- You need *all* subarrays matching, not counts or the best — consider prefix sums + hash.

## See Also

- [`two-pointers.md`](two-pointers.md) — degenerate sliding window (no counter, just two indices).
- [`monotonic-stack-queue.md`](monotonic-stack-queue.md) — window max/min in `O(n)`.
- [`prefix-suffix.md`](prefix-suffix.md) — alternative when the window must support negatives.
- [`../../data-structures/hash-based/hash-tables.md`](../../data-structures/hash-based/hash-tables.md) — tracking window contents.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
