# LIS / LCS / Edit Distance (Sequence DP)

- **Source:** distilled from CLRS + CP patterns
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

- Problem involves comparing or extracting patterns from sequences.
- You need the **longest**, **shortest**, or **count of** some subsequence/substring property.
- State = "I've processed prefix `a[0..i]` (and sometimes `b[0..j]`)."
- Common: alignment, diffing, autocorrect, version control diffs, plagiarism detection.

## Interview View

### Longest Increasing Subsequence — O(n log n)

```python
from bisect import bisect_left

def lis(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)
```

`tails[i]` = smallest possible last element of an increasing subsequence of length `i+1`. Patience-sort intuition.

### LIS — O(n²) DP (useful when you need to reconstruct)

```python
def lis_with_reconstruction(nums):
    n = len(nums)
    dp = [1] * n
    parent = [-1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j
    end = max(range(n), key=lambda i: dp[i])
    seq = []
    while end != -1:
        seq.append(nums[end])
        end = parent[end]
    return seq[::-1]
```

### Longest Common Subsequence

```python
def lcs_length(a, b):
    m, n = len(a), len(b)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
```

### LCS — 1D rolling arrays

```python
def lcs_length_rolling(a, b):
    if len(a) < len(b): a, b = b, a
    prev = [0] * (len(b) + 1)
    for i in range(1, len(a) + 1):
        cur = [0] * (len(b) + 1)
        for j in range(1, len(b) + 1):
            if a[i-1] == b[j-1]:
                cur[j] = prev[j-1] + 1
            else:
                cur[j] = max(prev[j], cur[j-1])
        prev = cur
    return prev[-1]
```

`O(min(m, n))` space — matters for long strings.

### Edit Distance (Levenshtein)

```python
def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i   # delete all
    for j in range(n+1): dp[0][j] = j   # insert all
    for i in range(1, m+1):
        for j in range(1, n+1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # delete
                    dp[i][j-1],    # insert
                    dp[i-1][j-1]   # replace
                )
    return dp[m][n]
```

### Longest Common Substring (not subsequence — must be contiguous)

```python
def longest_common_substring(a, b):
    m, n = len(a), len(b)
    dp = [[0]*(n+1) for _ in range(m+1)]
    best = 0
    for i in range(1, m+1):
        for j in range(1, n+1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                best = max(best, dp[i][j])
    return best
```

### Classic problems

| Problem | Core DP |
|---|---|
| Longest Increasing Subsequence | LIS |
| Number of LIS | LIS + counts |
| Longest Common Subsequence | LCS |
| Shortest Common Supersequence | `m + n - LCS` |
| Edit Distance | Levenshtein |
| Distinct Subsequences | count of matches |
| Regex Match (`.*`) | 2D DP over pattern × text |
| Wildcard Match (`?*`) | same shape |
| Interleaving String | 2D DP over two strings → interleave into target |
| Longest Palindromic Subsequence | LCS of `s` with reverse of `s` |

## Reference View

### Why LIS in O(n log n) works

`tails[i]` is the smallest possible tail of an increasing subsequence of length `i+1`. Adding a new `x`:

- If `x > tails[-1]`, extend the LIS by one.
- Else, find the smallest `tails[i] ≥ x` and replace it.

Final length of `tails` is the LIS length. `tails` itself is *not* an LIS (it's a "sorted tails" array). To reconstruct one actual LIS, track parent indices during the scan.

### LCS variants

- **LCS length** — basic.
- **Count of LCS** — track counts in a parallel table.
- **Print all LCSs** — DFS over the DP table.
- **Longest Palindromic Subsequence (LPS)** — `LCS(s, reverse(s))`.

### Edit distance variants

- **Levenshtein** — ins/del/replace each cost 1.
- **Damerau-Levenshtein** — adds adjacent transposition.
- **Hamming** — only same-length, replace only.
- **Weighted edit distance** — different costs (e.g., typo-cost tables).
- **Myers' diff algorithm** — `O((N+M)D)` where `D` is edit distance. Used by git, diff tools.

### Reducing space

The 2-D tables only depend on the previous row → 1-D rolling. With care, you can reconstruct the actual sequence even from 1-D via Hirschberg's algorithm (`O(mn)` time, `O(m+n)` space).

### Complexity

| Algorithm | Time | Space |
|---|---|---|
| LIS (bisect) | `O(n log n)` | `O(n)` |
| LIS (DP with reconstruct) | `O(n²)` | `O(n)` |
| LCS | `O(mn)` | `O(mn)` or `O(min(m,n))` |
| Edit distance | `O(mn)` | `O(mn)` |
| Hirschberg (LCS with sequence) | `O(mn)` | `O(m+n)` |
| Myers diff | `O((m+n)D)` | `O((m+n)D)` |

### Pitfalls

- **LIS: strict vs non-strict.** `bisect_left` for strictly increasing; `bisect_right` for non-strictly (allow equal).
- **LIS: the `tails` array isn't an actual LIS.** To print one, keep parent pointers.
- **LCS vs longest common substring** — different problems; substring is contiguous.
- **Edit distance initialization** — first row/column must be `0..n`/`0..m`, not all zeros.
- **Regex match** — empty pattern edge case, `*` handling (can match zero chars).
- **Memory blowup** — `O(mn)` tables are huge for long strings. Use rolling arrays or Hirschberg.
- **Counting variants** — `+=`, not `=`; mod the prime; careful double-count across branches.

### Real-world uses

- **`diff` and `git diff`** — Myers diff (edit-distance variant).
- **Spell-checkers and autocorrect** — Levenshtein distance (usually capped).
- **DNA sequence alignment** — Smith-Waterman, Needleman-Wunsch (scoring matrices).
- **Plagiarism detection** — LCS / edit distance on token streams.
- **Version control merge** — three-way merge using diff algorithms.
- **Fuzzy matching in search bars** — edit distance ≤ K.
- **Compilers — Hirschberg-style 2-pass diff in incremental compilation**.
- **DNS similarity alerts (typosquatting detection)** — bounded edit distance.

### When *not* to use

- You need exact-match only → hash / KMP is faster.
- Sequences are unordered (sets) → set operations.
- Constraints too big for `O(mn)` — move to bit-parallel algorithms, Myers' bit-vector edit distance, or suffix-automaton-based approaches.
- Streaming — LIS/LCS on streams usually needs sliding-window heuristics.

## See Also

- [`knapsack.md`](knapsack.md) — sibling DP.
- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../strings/edit-distance.md`](../strings/edit-distance.md) — deeper coverage.
- [`../strings/pattern-matching.md`](../strings/pattern-matching.md) — when equality suffices.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
