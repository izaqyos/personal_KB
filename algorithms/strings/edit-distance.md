# Edit Distance

- **Source:** distilled from CLRS + bioinformatics references
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

- Measure how "close" two sequences are — strings, DNA, tokens, bytes.
- Approximate string matching — find substrings within a text that are within `k` edits of a pattern.
- Typo tolerance, autocorrect, spell-check, fuzzy search.
- Sequence alignment in bioinformatics (Needleman-Wunsch global, Smith-Waterman local).
- Diff algorithms (git / diff tools) — typically specialized variants.

## Interview View

### Levenshtein — 2-D DP `O(mn)` time / `O(mn)` space

```python
def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],     # delete from a
                    dp[i][j-1],     # insert into a
                    dp[i-1][j-1]    # replace
                )
    return dp[m][n]
```

### Levenshtein — `O(min(m, n))` space

```python
def edit_distance_rolling(a, b):
    if len(a) < len(b): a, b = b, a
    m, n = len(a), len(b)
    prev = list(range(n + 1))
    for i in range(1, m + 1):
        cur = [i] + [0] * n
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                cur[j] = prev[j-1]
            else:
                cur[j] = 1 + min(prev[j], cur[j-1], prev[j-1])
        prev = cur
    return prev[n]
```

### Reconstructing the edit script

```python
def edit_script(a, b):
    m, n = len(a), len(b)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    # backtrack
    ops = []
    i, j = m, n
    while i > 0 or j > 0:
        if i and j and a[i-1] == b[j-1]:
            i -= 1; j -= 1
        elif i and dp[i][j] == dp[i-1][j] + 1:
            ops.append(('del', a[i-1])); i -= 1
        elif j and dp[i][j] == dp[i][j-1] + 1:
            ops.append(('ins', b[j-1])); j -= 1
        else:
            ops.append(('sub', a[i-1], b[j-1])); i -= 1; j -= 1
    return list(reversed(ops))
```

### Early termination with bounded distance `k`

Only fill diagonals within `k` of the main diagonal — `O(k · min(m, n))` time.

```python
def edit_distance_bounded(a, b, k):
    m, n = len(a), len(b)
    if abs(m - n) > k: return k + 1
    INF = k + 1
    prev = [j if j <= k else INF for j in range(n + 1)]
    for i in range(1, m + 1):
        cur = [i if i <= k else INF] + [INF] * n
        lo = max(1, i - k); hi = min(n, i + k)
        for j in range(lo, hi + 1):
            if a[i-1] == b[j-1]:
                cur[j] = prev[j-1]
            else:
                cur[j] = 1 + min(prev[j], cur[j-1], prev[j-1])
        prev = cur
        if min(prev[lo:hi+1]) > k: return k + 1
    return prev[n] if prev[n] <= k else k + 1
```

### Classic problems

| Problem | Variant |
|---|---|
| Edit Distance (Leetcode) | Levenshtein |
| One Edit Distance | shortcut `O(n)` |
| Minimum Window with K edits | bounded edit + sliding window |
| Spell-check suggestions | Levenshtein against dictionary |
| DNA sequence alignment | Needleman-Wunsch (global), Smith-Waterman (local) |
| Fuzzy search in large corpora | BK-tree / trie-based approximate search |

## Reference View

### Variants of "edit distance"

| Name | Allowed operations |
|---|---|
| Hamming | replace (same length) |
| Levenshtein | insert, delete, replace (each cost 1) |
| Damerau-Levenshtein | + adjacent transposition |
| Longest Common Subsequence (LCS) | insert, delete (no replace) |
| Weighted edit | custom costs per op (maybe per pair) |
| Episode matching | sequence `p` must appear as subsequence of `t` |

Same DP shape; different costs or transitions.

### Smith-Waterman (local alignment)

For two strings, find the pair of substrings with the highest alignment score. Same DP but:

1. Scores (positive for match, negative for mismatch/gap).
2. `dp[i][j] = max(0, ...)` — zero floor.
3. Answer = max over the entire table, not just `dp[m][n]`.

Used in bioinformatics to find homologous regions.

### Myers' bit-parallel algorithm

For alphabets `σ ≤ 64` (fits in a word), edit distance can be computed in `O(m · n / w)` bit operations where `w` is word size. ~64× speedup on modern CPUs. Used in grep variants, BLAST-related tools.

### Myers' diff (O((m+n)d))

Finds the edit script between two sequences in time proportional to the *output* (edit distance `d`), not `m · n`. Used by `git diff` for file-level diffs. Fast when files are similar, slower when they diverge.

### Complexity

| Variant | Time | Space |
|---|---|---|
| Levenshtein DP | `O(mn)` | `O(mn)` or `O(min(m,n))` |
| Hirschberg | `O(mn)` | `O(m + n)` (and recovers the script!) |
| Bounded by `k` | `O(k · min(m, n))` | `O(min(m, n))` |
| Myers bit-parallel | `O(mn / w)` | `O(mn)` |
| Myers' diff | `O((m+n)d)` | `O((m+n)d)` |

### Pitfalls

- **Initialization** — first row/column must be `0..n` / `0..m`, not all zeros.
- **Space rolling** — easy to off-by-one when switching from 2D to 1D.
- **Weighted edits** — ensure triangle inequality holds if you want metric properties.
- **Unicode** — edit distance on UTF-8 bytes is not the same as on codepoints; normalize first.
- **Case sensitivity / locale** — often want case-fold before computing distance.
- **Approximate matching at scale** — for big dictionaries, naive per-pair is `O(V · mn)`; use BK-trees, Levenshtein automata, or SymSpell.

### Real-world uses

- **Spell checkers / autocomplete** — top-k candidates by Levenshtein distance, often capped (`k ≤ 2`).
- **Git diff, diff / patch** — Myers' diff algorithm.
- **Bioinformatics** — Needleman-Wunsch (global), Smith-Waterman (local), BLAST (heuristic).
- **OCR and speech recognition** — edit distance on confusable characters / phonemes.
- **Plagiarism detection** — edit distance on token streams.
- **Typo-squatting detection** — flag domain names within small edit distance of brand names.
- **Record linkage / deduplication** — fuzzy matching of names/addresses.
- **DNA read mapping** — allow few mismatches between short reads and reference.

### When *not* to use

- Exact match is enough — `==` / hash / pattern matching is cheaper.
- One string is much longer and you need approximate substring matching — specialized algorithms (bitap, Myers bit-parallel, k-mer indexing).
- Very large strings with small edit distance — use Myers' `O((m+n)d)`.
- You want similarity as a probability, not count — consider SimHash, Jaccard, cosine.

## See Also

- [`pattern-matching.md`](pattern-matching.md) — exact matching alternative.
- [`../dp-patterns/lis-lcs.md`](../dp-patterns/lis-lcs.md) — LCS-shaped DPs.
- [`suffix-structures.md`](suffix-structures.md) — for approximate substring at scale.
- [`../../data-structures/probabilistic/minhash.md`](../../data-structures/probabilistic/minhash.md) — set-level similarity alternative.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
