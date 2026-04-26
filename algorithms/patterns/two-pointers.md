# Two Pointers

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

- Array/string problem and you want to avoid `O(n^2)` nested loops.
- Search for pair/triple with a target sum (sorted input).
- In-place compaction (remove duplicates, move zeroes, partition).
- Palindrome check / expand-from-center.
- Merging two sorted sequences.
- Linked-list problems where you can walk from both ends (use reversed-half trick).

The pattern is "two indices advance under a rule," and the invariant shrinks the search space monotonically — each step eliminates at least one candidate, so it's `O(n)` total.

## Interview View

### Template — opposite ends (sorted array, two-sum style)

```python
def pair_sum(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target:
            return (lo, hi)
        if s < target:
            lo += 1
        else:
            hi -= 1
    return None
```

Why it works: sorting makes `nums[lo]+nums[hi]` monotone under each move — moving `lo` right can only increase, moving `hi` left can only decrease. No candidate pair is skipped.

### Template — same direction (in-place write index)

```python
def remove_duplicates(nums):
    """Keep one copy per value; return new length. Sorted input."""
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write
```

Same idea: `read` scans; `write` only advances when the current element survives.

### Template — 3-sum (outer loop + two pointers inside)

```python
def three_sum(nums):
    nums.sort()
    out = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue  # skip duplicate pivots
        lo, hi = i + 1, n - 1
        while lo < hi:
            s = nums[i] + nums[lo] + nums[hi]
            if s == 0:
                out.append([nums[i], nums[lo], nums[hi]])
                lo += 1
                hi -= 1
                while lo < hi and nums[lo] == nums[lo - 1]: lo += 1
                while lo < hi and nums[hi] == nums[hi + 1]: hi -= 1
            elif s < 0:
                lo += 1
            else:
                hi -= 1
    return out
```

### Classic problems

| Problem | Trick |
|---|---|
| Two Sum II (sorted) | opposite ends |
| 3Sum / 4Sum | outer loop + two pointers |
| Container With Most Water | move shorter side inward |
| Trapping Rain Water | left/right max, two pointers |
| Valid Palindrome | expand from center or converge from ends |
| Merge Sorted Array in-place | write from the back |
| Remove Duplicates / Move Zeroes | read/write pointers |
| Sort Colors (Dutch flag) | three pointers: low/mid/high |

## Reference View

### Variants

- **Opposite-ends (converging)** — sorted array, target sum, palindrome.
- **Same-direction (fast/slow read-write)** — in-place filter.
- **Fast/slow (cycle detection)** — separate pattern, see [`fast-slow-pointers.md`](fast-slow-pointers.md).
- **Three pointers (Dutch national flag)** — partition into <pivot, ==pivot, >pivot.

### Dutch flag partition

```python
def sort_colors(nums):
    """Partition into 0 / 1 / 2 in one pass."""
    lo, mid, hi = 0, 0, len(nums) - 1
    while mid <= hi:
        if nums[mid] == 0:
            nums[lo], nums[mid] = nums[mid], nums[lo]
            lo += 1
            mid += 1
        elif nums[mid] == 2:
            nums[mid], nums[hi] = nums[hi], nums[mid]
            hi -= 1  # don't advance mid — new element unknown
        else:
            mid += 1
```

Invariants: `nums[:lo]` all 0, `nums[lo:mid]` all 1, `nums[hi+1:]` all 2, `nums[mid:hi+1]` unprocessed.

### Complexity

| Flavor | Time | Space |
|---|---|---|
| opposite ends | `O(n)` | `O(1)` |
| same direction | `O(n)` | `O(1)` |
| 3-sum (outer loop) | `O(n^2)` | `O(1)` extra (not counting output) |
| Dutch flag | `O(n)` | `O(1)` |

### Pitfalls

- Forgetting to skip duplicates in 3-sum → duplicate tuples in output.
- In Dutch flag, *don't* advance `mid` when you swap with `hi` — the new `nums[mid]` hasn't been classified yet.
- Two-pointer on unsorted data: usually wrong — most converging-pointer arguments require monotonicity.
- Off-by-one on `while lo < hi` vs `lo <= hi` — use `<` when `lo==hi` shouldn't be considered a "pair."

### Real-world uses

- **Merge step of merge sort** — two pointers into the two halves.
- **Compaction in log-structured storage** — same-direction read/write over records, dropping tombstones.
- **String normalization** — write index collapses runs of whitespace in-place.
- **Database nested-loop join when both inputs are sorted** (sort-merge join) — opposite of nested loop, same convergence idea.

### When *not* to use

- Input is unsorted and sorting would cost more than a hash-based approach (`O(n)` hash vs `O(n log n)` sort).
- You need all pairs, not just one — hash set is usually better.
- The rule for advancing a pointer isn't monotone — you can't prove you don't skip an answer.

## See Also

- [`../../data-structures/linear/arrays.md`](../../data-structures/linear/arrays.md) — underlying container.
- [`sliding-window.md`](sliding-window.md) — related same-direction variant with a window size.
- [`fast-slow-pointers.md`](fast-slow-pointers.md) — cycle/middle detection flavor.
- [`../sorting/`](../sorting/) — when you need to sort before applying two pointers.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview pattern recap.
