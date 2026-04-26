# Timsort

- **Source:** distilled from Python/Java documentation + Tim Peters' design notes
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

- You're using Python or Java — you're already using Timsort via `sorted()`, `list.sort()`, `Arrays.sort(Object[])`.
- Input may have partially sorted runs (often true in real data — logs are near-timestamp-sorted, dashboards fetch sorted chunks, etc.).
- You need stability.
- You want `O(n)` on already-sorted or reverse-sorted input.

It's designed for *real* data, not adversarial worst case — and real data tends to have structure.

## Interview View

### What Timsort does (one sentence)

Find pre-existing sorted "runs" in the input; extend them to a minimum length with insertion sort; merge runs using a merge strategy that keeps the run-stack balanced.

### Key constants

- **`minrun`** — typically in `[32, 64]`; computed so that `n / minrun` is close to a power of 2.
- **Galloping threshold** — how many consecutive "one side always wins" merge decisions before we switch to exponential search.

### Python usage (what you actually write)

```python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Ascending, stable:
nums.sort()

# Descending, stable:
nums.sort(reverse=True)

# By key (stable):
words = ["apple", "bat", "banana"]
words.sort(key=len)    # ['bat', 'apple', 'banana']

# Complex multi-key:
rows = [('alice', 30), ('bob', 25), ('alice', 25)]
rows.sort(key=lambda r: (r[0], r[1]))
```

Because Timsort is stable, a sequence of single-key sorts from least- to most-significant gives the right multi-key order.

### Classic problems where Timsort shines

| Problem | Why |
|---|---|
| Log files (near-sorted by time) | detects existing runs → `O(n)` merge |
| Concatenation of sorted chunks | two long runs → one merge |
| Reverse-sorted input | detected as a descending run, reversed once |
| Already sorted | single run, no merges |
| Sort by multiple keys | stability guarantees order |

## Reference View

### Algorithm overview

1. **Scan for runs.** Walk the array; identify consecutive ascending (or strictly descending) subsequences. Descending runs are reversed in place to ascending.
2. **Extend short runs.** If a natural run is shorter than `minrun`, extend it to `minrun` using binary-insertion sort.
3. **Push runs onto a stack.** Maintain invariants on run lengths that keep the merge pattern balanced (see below).
4. **Merge.** When invariants are violated, merge adjacent runs. The merge is stable and uses galloping mode for efficiency on highly-unbalanced runs.

### Stack invariants (balanced-merge condition)

For the top three runs on the stack (A, B, C with C on top):

- `|A| > |B| + |C|`
- `|B| > |C|`

If an invariant is violated, merge the smaller of `A,C` into `B` and recheck. This keeps merge trees roughly balanced and avoids quadratic worst cases.

(A subtle bug in this logic was discovered in 2015 — Python and Java fixed it independently. Formal verification found it; a good reminder that even battle-tested algorithms have subtle edge cases.)

### Galloping mode

In binary merge, if one side keeps winning, we suspect the other side has a long block about to start. Switch from element-by-element to exponential search + binary search: jump ahead `1, 2, 4, 8, ...` on the winning side, then binary search the exact merge point. Reduces comparisons from `O(n)` to `O(log n)` for that block.

### Minrun choice

Aim for `n/minrun` close to a power of 2 so that the merge tree is balanced. Example: `n = 2500`, then `minrun = 40` gives `2500/40 ≈ 64` runs.

### Complexity

| Case | Time |
|---|---|
| best (already sorted or reverse) | `O(n)` |
| average | `O(n log n)` |
| worst | `O(n log n)` |
| space | `O(n)` auxiliary for merges |

Stable, and outperforms plain mergesort on real-world data by ~50% typically due to run detection + galloping.

### Pitfalls

- **`sorted(..., key=...)` with mutable keys** — keys computed once per element; that's what you want, but side effects in `key` are surprising.
- **`key=` vs `cmp=`.** Python 3 dropped `cmp`. Use `functools.cmp_to_key` if you must.
- **Instability on custom `__lt__`** — if your comparator isn't a total order, Timsort may produce arbitrary results or loop. NaN is a classic offender in float arrays.
- **Large stable sort uses `O(n)` aux memory** — can spike memory in Java/Python. Use numpy's `np.sort(kind='quicksort')` if you need less memory and don't require stability.
- **Sorting huge objects by expensive `key`** — precompute keys explicitly and sort indices (`schwartzian transform`) if you care about constants.

### Real-world uses

- **Python `list.sort` / `sorted`** — Timsort since 2002.
- **Java `Arrays.sort(Object[])`, `List.sort`** — Timsort since JDK 7.
- **Android** — same as Java.
- **Octave** — Timsort for arrays of handles.
- **Rust `slice::sort`** — a Timsort-inspired "adaptive" pattern-defeating sort.
- **V8 (JS) `Array.prototype.sort`** — Timsort-like since 2018 (previously quicksort, unstable).

### When *not* to use

- You have numpy arrays of ints/floats → use `np.sort` (often faster, non-stable quicksort or heap).
- You need guaranteed in-place constant-space sort → heapsort / introsort.
- You're writing a very tight inner loop in C → introsort (libstdc++'s `std::sort`) usually wins on raw throughput for cold, random input.
- You need parallelism — Timsort isn't naturally parallel; use `np.sort(kind='stable')` with multiprocessing, or Spark's sort for distributed.

## See Also

- [`comparison-sorts.md`](comparison-sorts.md) — broader context.
- [`external-sort.md`](external-sort.md) — when data doesn't fit.
- [`non-comparison-sorts.md`](non-comparison-sorts.md) — faster when keys are integers.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
